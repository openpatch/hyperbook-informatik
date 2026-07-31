#!/usr/bin/env python3
"""Prueft den Lernpfad "Datenbanken" auf typische Fehlerquellen.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/datenbank-lernpfad/check_lernpfad.py

Geprueft wird:

1. **Backticks in multievent-Bloecken.** Inline-Code wird von rehype-pretty-code
   zu HTML mit eingebettetem <style>-Block aufgeblasen. Landet das innerhalb der
   {r{...}}-Klammern, zerlegt es die Antwortoption. Ausserdem: Gruppenziffern nur
   bei den Ereignistypen, die sie auswerten, und keine {a{...}}-Dropdowns.
2. **sqlide-Bloecke.** Jeder Block braucht ein db= auf eine vorhandene Datei,
   eine height-Angabe und mindestens einen Code-Fence mit Dateinamen.
3. **SQL-Konstrukte, die die eingebaute IDE nicht uebersetzt** (IS NULL, CASE,
   EXISTS, USING, ...). Siehe NOTIZEN.md.
4. **Bildverweise**, die ins Leere zeigen.
5. **Doppelt vergebene Loesungspasswoerter.**
6. **Selbsttest** am Ende jeder Lektion (Kapitelseiten, Referenz und Projekt
   ausgenommen).
7. **Lehrplanbezuege** stehen in HTML-Kommentaren, nicht im sichtbaren Text.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "oberstufe" / "datenbanken"
DBS = ROOT / "public" / "datenbanken"

problems: list[str] = []

# Nur diese Ereignistypen werten eine Gruppennummer aus (multievent.js).
GROUPED_EVENTS = set("rRcCkKS")

# Konstrukte, die der Uebersetzer der SQL-IDE ablehnt. Statements mit einem
# solchen Fehler werden gar nicht erst ausgefuehrt. (Muster, Ersatz)
UNSUPPORTED_SQL = [
    (r"\bIS\s+(NOT\s+)?NULL\b", "kennt die IDE nicht - die Lernpfad-Datenbanken haben keine NULL-Werte"),
    (r"\bISNULL\b", "kennt die IDE nicht"),
    (r"\bIFNULL\s*\(", "kennt die IDE nicht"),
    (r"\bCOALESCE\s*\(", "kennt die IDE nicht"),
    (r"\bNOT\s+IN\b", "kennt die IDE nicht - Bedingung mit <> und AND umformulieren"),
    (r"\bEXISTS\s*\(", "kennt die IDE nicht - IN (Unterabfrage) nehmen"),
    (r"\bCASE\s+WHEN\b", "kennt die IDE nicht"),
    (r"\bUSING\s*\(", "kennt die IDE nicht - JOIN ... ON schreiben"),
    (r"\bsubstr\s*\(", "kennt die IDE nicht - strftime fuer Datumsteile"),
    (r"\bCAST\s*\(", "kennt die IDE nicht - stattdessen durch 1.0 teilen"),
    (r"\bGROUP_CONCAT\s*\(", "kennt die IDE nicht"),
    (r"\bCHECK\s*\(", "kennt die IDE nicht"),
    (r"CREATE\s+TABLE\s+\w+\s+AS\s+SELECT", "kennt die IDE nicht - CREATE TABLE, danach INSERT ... SELECT"),
]

# UNIQUE direkt hinter einer Spaltendefinition lehnt die IDE ab, als eigene
# Tabellenbedingung UNIQUE (spalte) akzeptiert sie es.
SPALTEN_UNIQUE_RE = re.compile(
    r"^\s*\w+\s+(?:INTEGER|INT|TEXT|REAL|VARCHAR\([^)]*\)|CHAR\([^)]*\)|"
    r"DECIMAL\([^)]*\)|DATE|DATETIME|BOOLEAN)[^,\n]*\bUNIQUE\b",
    re.I | re.M,
)

SQLIDE_RE = re.compile(r"^:::sqlide(\{[^}]*\})?[ \t]*$(.*?)^:::[ \t]*$", re.S | re.M)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)


def line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def ohne_kommentare(sql: str) -> str:
    """Entfernt SQL-Kommentare, damit Hinweise auf nicht unterstuetzte
    Konstrukte im Kommentartext keine Meldung ausloesen."""
    sql = re.sub(r"/\*.*?\*/", "", sql, flags=re.S)
    return re.sub(r"--[^\n]*", "", sql)


def check_multievent(path: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"^::::multievent$(.*?)^::::$", text, re.S | re.M):
        block = match.group(1)
        offset = line_of(text, match.start())

        if "`" in block:
            problems.append(
                f"{path}:{offset}: {block.count('`')} Backtick(s) im "
                f"multievent-Block (Inline-Code zerlegt die Antwortoptionen)"
            )

        for event in re.finditer(r"\{([a-zA-Z])(\d*)\{", block):
            typ, digits = event.group(1), event.group(2)
            if digits and typ not in GROUPED_EVENTS:
                line = offset + block[: event.start()].count("\n")
                problems.append(
                    f"{path}:{line}: {{{typ}{digits}{{ - der Typ {typ} kennt "
                    f"keine Gruppennummer, schreibe {{{typ}{{"
                )

        for event in re.finditer(r"\{[aA]\{", block):
            line = offset + block[: event.start()].count("\n")
            problems.append(
                f"{path}:{line}: {{a{{...}}-Dropdown wird nicht korrekt "
                f"aufgetrennt - nutze {{S1{{...}} oder Radiobuttons"
            )


def check_sqlide(path: pathlib.Path, text: str) -> None:
    for match in SQLIDE_RE.finditer(text):
        attrs = match.group(1) or ""
        body = match.group(2)
        offset = line_of(text, match.start())

        db = re.search(r'db="([^"]+)"', attrs)
        if not db:
            problems.append(
                f"{path}:{offset}: sqlide-Block ohne db= - sonst laedt die IDE "
                f"ihre eingebaute Weltdatenbank"
            )
        else:
            ziel = db.group(1)
            if not ziel.startswith("/datenbanken/"):
                problems.append(
                    f"{path}:{offset}: db={ziel} - die Datenbanken des Lernpfads "
                    f"liegen unter /datenbanken/"
                )
            elif not (DBS / pathlib.PurePosixPath(ziel).name).exists():
                problems.append(
                    f"{path}:{offset}: Datenbank {ziel} gibt es nicht - "
                    f"erzeuge_datenbanken.py laufen lassen"
                )

        if "height=" not in attrs:
            problems.append(
                f"{path}:{offset}: sqlide-Block ohne height= - der Block wird "
                f"sonst fast bildschirmfuellend"
            )

        fences = FENCE_RE.findall(body)
        if not fences:
            problems.append(f"{path}:{offset}: sqlide-Block ohne Code-Fence")
            continue

        hat_sql = False
        for info, code in fences:
            teile = info.split()
            sprache = teile[0] if teile else ""
            if sprache not in ("mysql", "md"):
                problems.append(
                    f"{path}:{offset}: Code-Fence mit Sprache '{sprache}' - "
                    f"erlaubt sind mysql (SQL-Datei) und md (Hinweisdatei)"
                )
                continue
            if len(teile) < 2:
                problems.append(
                    f"{path}:{offset}: Code-Fence ohne Dateiname "
                    f"(erwartet z. B. ```mysql Abfrage.sql)"
                )
                continue
            dateiname = teile[1]
            erwartet = ".sql" if sprache == "mysql" else ".md"
            if not dateiname.endswith(erwartet):
                problems.append(
                    f"{path}:{offset}: Dateiname {dateiname} endet nicht "
                    f"auf {erwartet}"
                )
            if sprache == "mysql":
                hat_sql = True
                check_unsupported_sql(path, offset, dateiname, code)

        if not hat_sql:
            problems.append(
                f"{path}:{offset}: sqlide-Block ohne mysql-Fence - fuer reinen "
                f"Text keinen sqlide-Block nehmen"
            )


def check_unsupported_sql(
    path: pathlib.Path, offset: int, dateiname: str, code: str
) -> None:
    sauber = ohne_kommentare(code)
    for muster, hinweis in UNSUPPORTED_SQL:
        treffer = re.search(muster, sauber, re.I)
        if treffer:
            problems.append(
                f"{path}:{offset}: in {dateiname}: "
                f"{treffer.group(0).strip()} {hinweis}"
            )
    if SPALTEN_UNIQUE_RE.search(sauber):
        problems.append(
            f"{path}:{offset}: in {dateiname}: UNIQUE hinter einer Spalte lehnt "
            f"die IDE ab - UNIQUE (spalte) als eigene Tabellenbedingung schreiben"
        )


def check_loesungs_sql(path: pathlib.Path, text: str) -> None:
    """Auch Loesungen und Beispiele ausserhalb der IDE muessen dort laufen.

    Loesungen stehen als ```sql-Fence in einem protect-Block. Wer sie
    abschreibt, tippt sie in dieselbe IDE - also gelten dieselben Grenzen.
    """
    ohne_sqlide = SQLIDE_RE.sub("", text)
    for info, code in FENCE_RE.findall(ohne_sqlide):
        teile = info.split()
        if not teile or teile[0] != "sql":
            continue
        pos = text.find(code)
        offset = line_of(text, pos) if pos >= 0 else 0
        check_unsupported_sql(path, offset, teile[1] if len(teile) > 1 else "sql-Fence", code)


MERMAID_RE = re.compile(r"^```mermaid\n(.*?)^```[ \t]*$", re.S | re.M)


def check_mermaid(path: pathlib.Path, text: str) -> None:
    """Mermaid stellt Nicht-ASCII-Zeichen in Beschriftungen falsch dar.

    Aus "Fussbereich" wird dort "FuAYbereich", aus einem Geviertstrich ein
    einzelnes Fragezeichen-Zeichen. Der Grund liegt in der Kodierung beim
    Rendern, nicht in der Quelle - beheben laesst es sich hier nur, indem
    Beschriftungen bei ASCII bleiben.
    """
    for match in MERMAID_RE.finditer(text):
        offset = line_of(text, match.start())
        for nr, zeile in enumerate(match.group(1).splitlines(), start=1):
            fremd = {z for z in zeile if ord(z) > 127}
            if fremd:
                problems.append(
                    f"{path}:{offset + nr}: Nicht-ASCII in einem Mermaid-"
                    f"Diagramm ({''.join(sorted(fremd))}) - Mermaid stellt das "
                    f"falsch dar, Beschriftung umformulieren"
                )


def check_lehrplanbezug(path: pathlib.Path, text: str) -> None:
    """Lehrplanbezuege gehoeren in HTML-Kommentare.

    Sie sind fuer Lehrkraefte gedacht und sollen im Hyperbook nicht erscheinen.
    """
    sichtbar = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    for begriff in ("Kernlehrplan", "Kompetenzerwartung", "Inhaltsfeld"):
        if begriff in sichtbar:
            problems.append(
                f"{path}: {begriff} steht sichtbar im Text - "
                f"Lehrplanbezuege gehoeren in einen HTML-Kommentar"
            )


def check_images(path: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        target = match.group(1)
        if target.startswith(("http://", "https://")):
            continue
        if target.startswith("/"):
            if not (ROOT / "public" / target.lstrip("/")).exists():
                problems.append(
                    f"{rel}:{line_of(text, match.start())}: Bild fehlt: {target}"
                )
            continue
        if not (path.parent / target).resolve().exists():
            problems.append(
                f"{rel}:{line_of(text, match.start())}: Bild fehlt: {target}"
            )


def check_selbsttest(path: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    # Kapitelseiten, Referenz und Projekt brauchen keinen Selbsttest - ein
    # Projekt wird am Produkt beurteilt, nicht an Ankreuzfragen.
    if path.name == "index.md" or "referenz" in str(rel) or "projekt" in str(rel):
        return
    if "## Selbsttest" not in text:
        problems.append(f"{rel}: kein Selbsttest am Ende der Lektion")
    elif "::::multievent" not in text:
        problems.append(f"{rel}: Selbsttest ohne multievent-Block")


def check_passwords(files: list[pathlib.Path]) -> None:
    seen: dict[str, pathlib.Path] = {}
    for path in files:
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'protect\{password="([^"]+)"', text):
            password = match.group(1)
            if password in seen:
                problems.append(
                    f"{path.relative_to(ROOT)}: Passwort {password} bereits "
                    f"vergeben in {seen[password].relative_to(ROOT)}"
                )
            else:
                seen[password] = path
    print(f"{len(seen)} eindeutige Loesungspasswoerter.")


def main() -> int:
    if not BOOK.exists():
        print(f"{BOOK} gibt es nicht.")
        return 1
    files = sorted(BOOK.rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT)
        check_multievent(rel, text)
        check_sqlide(rel, text)
        check_loesungs_sql(rel, text)
        check_mermaid(rel, text)
        check_lehrplanbezug(rel, text)
        check_images(path, rel, text)
        check_selbsttest(path, rel, text)
    check_passwords(files)

    print(f"{len(files)} Seiten geprueft.")
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
