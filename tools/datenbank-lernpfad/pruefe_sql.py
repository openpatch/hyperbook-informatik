#!/usr/bin/env python3
"""Fuehrt jede SQL-Anweisung des Lernpfads gegen die echte Datenbank aus.

    python3 tools/datenbank-lernpfad/pruefe_sql.py
    python3 tools/datenbank-lernpfad/pruefe_sql.py --ergebnisse
    python3 tools/datenbank-lernpfad/pruefe_sql.py --ergebnisse <datei.md>

Damit fallen Tippfehler in Tabellen- und Spaltennamen auf, bevor jemand die
Seite oeffnet. Jede Datei bekommt eine eigene Kopie der Datenbank im
Arbeitsspeicher, INSERT und DROP wirken sich also nicht auf die naechste
Anweisung einer anderen Aufgabe aus.

Welche Datenbank gilt, steht im db=-Attribut des sqlide-Blocks. Fuer
```sql-Fences ausserhalb (Loesungen, Beispiele) gilt die Datenbank des zuletzt
davor stehenden sqlide-Blocks.

Anweisungen, die absichtlich scheitern sollen (Fremdschluesselverletzung,
doppelter Primaerschluessel), bekommen im Quelltext den Kommentar

    -- SCHEITERT ABSICHTLICH

Unvollstaendige Geruestdateien, in die Lernende erst etwas eintragen sollen,
bekommen

    -- UNGEPRUEFT

Mit --ergebnisse gibt das Skript zu jeder SELECT-Anweisung die Zeilenzahl und
die ersten Treffer aus. Das ist beim Schreiben der Loesungen die schnellste Art,
an belastbare Zahlen zu kommen.
"""

from __future__ import annotations

import argparse
import pathlib
import re
import sqlite3
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "oberstufe" / "datenbanken"
DBS = ROOT / "public" / "datenbanken"

SQLIDE_RE = re.compile(r"^:::sqlide(\{[^}]*\})?[ \t]*$(.*?)^:::[ \t]*$", re.S | re.M)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)


def lade(db_name: str) -> sqlite3.Connection:
    """Frische Kopie der Datenbank im Arbeitsspeicher."""
    quelle = sqlite3.connect(f"file:{DBS / db_name}?mode=ro", uri=True)
    ziel = sqlite3.connect(":memory:")
    quelle.backup(ziel)
    quelle.close()
    ziel.execute("PRAGMA foreign_keys = ON")
    return ziel


def trenne_anweisungen(sql: str) -> list[str]:
    """Zerlegt an Semikola, achtet dabei auf Zeichenketten und Kommentare."""
    anweisungen: list[str] = []
    aktuell: list[str] = []
    i = 0
    while i < len(sql):
        zeichen = sql[i]
        if zeichen == "'":
            j = sql.find("'", i + 1)
            j = len(sql) if j < 0 else j
            aktuell.append(sql[i : j + 1])
            i = j + 1
            continue
        if sql.startswith("--", i):
            j = sql.find("\n", i)
            j = len(sql) if j < 0 else j
            aktuell.append(sql[i:j])
            i = j
            continue
        if sql.startswith("/*", i):
            j = sql.find("*/", i + 2)
            j = len(sql) if j < 0 else j + 2
            aktuell.append(sql[i:j])
            i = j
            continue
        if zeichen == ";":
            anweisungen.append("".join(aktuell))
            aktuell = []
            i += 1
            continue
        aktuell.append(zeichen)
        i += 1
    anweisungen.append("".join(aktuell))
    return [a for a in anweisungen if re.sub(r"--[^\n]*|/\*.*?\*/", "", a, flags=re.S).strip()]


class Fund:
    def __init__(self, datei: str, zeile: int, name: str, db: str, sql: str):
        self.datei = datei
        self.zeile = zeile
        self.name = name
        self.db = db
        self.sql = sql


def sammle(pfad: pathlib.Path) -> list[Fund]:
    """Alle SQL-Fences einer Seite mit der jeweils gueltigen Datenbank."""
    text = pfad.read_text(encoding="utf-8")
    rel = str(pfad.relative_to(ROOT))
    funde: list[Fund] = []
    aktuelle_db = ""

    # Positionen aller sqlide-Bloecke merken, damit ```sql-Fences ausserhalb
    # die Datenbank des vorhergehenden Blocks erben.
    ereignisse: list[tuple[int, str, re.Match[str]]] = []
    for m in SQLIDE_RE.finditer(text):
        ereignisse.append((m.start(), "sqlide", m))
    belegt = [(m.start(), m.end()) for m in SQLIDE_RE.finditer(text)]
    for m in FENCE_RE.finditer(text):
        if any(a <= m.start() < b for a, b in belegt):
            continue
        ereignisse.append((m.start(), "fence", m))
    ereignisse.sort(key=lambda e: e[0])

    for pos, art, m in ereignisse:
        zeile = text[:pos].count("\n") + 1
        if art == "sqlide":
            attrs = m.group(1) or ""
            db = re.search(r'db="/datenbanken/([^"]+)"', attrs)
            if db:
                aktuelle_db = db.group(1)
            for info, code in FENCE_RE.findall(m.group(2)):
                teile = info.split()
                if not teile or teile[0] != "mysql":
                    continue
                name = teile[1] if len(teile) > 1 else "?.sql"
                funde.append(Fund(rel, zeile, name, aktuelle_db, code))
        else:
            teile = (m.group(1) or "").split()
            if not teile or teile[0] != "sql":
                continue
            # Nur benannte Fences sind lauffaehiges SQL. Ein blankes ```sql
            # zeigt ein Schema mit Platzhaltern und wird nicht ausgefuehrt.
            if len(teile) < 2:
                continue
            funde.append(Fund(rel, zeile, teile[1], aktuelle_db, m.group(2)))
    return funde


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("dateien", nargs="*", help="einzelne Markdown-Dateien")
    p.add_argument("--ergebnisse", action="store_true", help="Trefferzahlen anzeigen")
    args = p.parse_args()

    if args.dateien:
        pfade = [pathlib.Path(d).resolve() for d in args.dateien]
    else:
        pfade = sorted(BOOK.rglob("*.md")) if BOOK.exists() else []

    if not pfade:
        print(f"Keine Seiten gefunden ({BOOK}).")
        return 1

    probleme: list[str] = []
    anzahl_anweisungen = 0
    anzahl_fences = 0

    for pfad in pfade:
        for fund in sammle(pfad):
            anzahl_fences += 1
            if "UNGEPRUEFT" in fund.sql.upper():
                continue
            if not fund.db:
                probleme.append(
                    f"{fund.datei}:{fund.zeile}: {fund.name} - keine Datenbank "
                    f"bekannt (sqlide-Block mit db= fehlt davor)"
                )
                continue
            if not (DBS / fund.db).exists():
                probleme.append(
                    f"{fund.datei}:{fund.zeile}: {fund.name} - Datenbank "
                    f"{fund.db} gibt es nicht"
                )
                continue

            con = lade(fund.db)
            for anweisung in trenne_anweisungen(fund.sql):
                anzahl_anweisungen += 1
                soll_scheitern = "SCHEITERT ABSICHTLICH" in anweisung.upper()
                try:
                    cur = con.execute(anweisung)
                    zeilen = cur.fetchall()
                    con.commit()
                except sqlite3.Error as fehler:
                    if soll_scheitern:
                        if args.ergebnisse:
                            print(
                                f"  {fund.datei}:{fund.zeile} {fund.name}: "
                                f"scheitert wie vorgesehen ({fehler})"
                            )
                        continue
                    kurz = " ".join(anweisung.split())[:110]
                    probleme.append(
                        f"{fund.datei}:{fund.zeile}: {fund.name} [{fund.db}]\n"
                        f"      {kurz}\n"
                        f"      -> {fehler}"
                    )
                    continue
                if soll_scheitern:
                    kurz = " ".join(anweisung.split())[:110]
                    probleme.append(
                        f"{fund.datei}:{fund.zeile}: {fund.name} - als "
                        f"'SCHEITERT ABSICHTLICH' markiert, laeuft aber durch\n"
                        f"      {kurz}"
                    )
                elif args.ergebnisse and cur.description:
                    kurz = " ".join(anweisung.split())[:100]
                    spalten = [d[0] for d in cur.description]
                    print(f"  {fund.datei}:{fund.zeile} {fund.name}: {kurz}")
                    print(f"      {len(zeilen)} Zeile(n), Spalten: {spalten}")
                    for z in zeilen[:5]:
                        print(f"      {z}")
            con.close()

    print(
        f"\n{len(pfade)} Seiten, {anzahl_fences} SQL-Dateien, "
        f"{anzahl_anweisungen} Anweisungen geprueft."
    )
    if probleme:
        print(f"\n{len(probleme)} Problem(e):\n")
        for problem in probleme:
            print(f"  {problem}")
        return 1
    print("Alle Anweisungen laufen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
