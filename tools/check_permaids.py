#!/usr/bin/env python3
"""Prueft die Permaids gegen das Schema aus book/mitmachen.md.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/check_permaids.py

Ein Permaid ist die kurze, dauerhafte Adresse einer Seite. Sie steht hinter
dem QR-Code und landet damit auf ausgeteilten Blaettern, die niemand mehr
einsammelt. Deshalb muss sie zweierlei aushalten: dass das Buch sich
darunter umsortiert, und dass niemand sie versehentlich ein zweites Mal
vergibt.

Geprueft wird:

1. **Jede Sektion und jede Lektion hat einen.** Hilfsseiten (404, Impressum,
   wc, die Startseite des Buches, alles unter _probe) brauchen keinen. Leere
   Platzhalterseiten ohne Frontmatter werden uebersprungen und am Ende
   genannt - sie bekommen einen, sobald sie Inhalt haben.
2. **Buchweit eindeutig.** Zwei Seiten mit demselben Permaid sind ein Fehler,
   kein Streitfall.
3. **Keine Ordnungszahl und keine Stellenangabe.** Kein `01-`, kein
   `kapitel-3`, kein `teil-2`, kein `lektion-4` - sonst zeigt der QR-Code ins
   Leere, sobald eine Lektion nach vorne rutscht. Ordnungswoerter, die zur
   Sache gehoeren (`datenbanken-erste-normalform`), bleiben erlaubt.
4. **Zeichenvorrat.** Nur Kleinbuchstaben, Ziffern und Bindestriche; keine
   Umlaute, kein Unterstrich, kein Bindestrich am Anfang oder Ende.
5. **Das Bereichskuerzel passt zum Ort.** Eine Seite unter oberstufe/oop
   faengt mit `java-` an, eine unter mittelstufe/web mit `web-`. Die
   Startseite eines Bereichs traegt das Kuerzel allein.
6. **Laenge.** Ueber 40 Zeichen wird gemeldet: so etwas laesst sich nicht
   mehr diktieren. Zwischen 35 und 40 ist geduldet, deutsche Komposita
   werden nun einmal lang.

Was hier NICHT geprueft werden kann: ob ein Permaid gegenueber frueher
**geaendert** wurde. Das waere der schlimmere Fehler - eine Aenderung macht
gedruckte QR-Codes still ungueltig -, aber dafuer muesste das Skript wissen,
was einmal veroeffentlicht war. Wer einen Permaid anfasst, muss selbst
wissen, was er tut. Beim Verschieben einer Seite wandert er mit.
"""

from __future__ import annotations

import collections
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BOOK = ROOT / "book"

# Ein Kuerzel je Bereich, laengster Pfad gewinnt. Siehe mitmachen.md.
BEREICHE = {
    "unterstufe/daten-und-netze": "daten",
    "unterstufe/spieleentwicklung": "scratch",
    "mittelstufe/python/einfuehrung-mit-turtle": "turtle",
    "mittelstufe/python": "python",
    "mittelstufe/web": "web",
    "mittelstufe/3d-druck": "3d-druck",
    "oberstufe/datenbanken": "datenbanken",
    "oberstufe/oop": "java",
    "oberstufe/oom": "oom",
    "oberstufe/ai": "ai",
    "projekte/amsterdam-webseite": "amsterdam",
    "projekte/bunny-hop": "bunny-hop",
    "projekte/donut-io": "donut-io",
    "projekte/evolutionaere-algorithmen": "evolution",
    "projekte/fotofilter": "fotofilter",
    "projekte/generative-kunst": "genkunst",
    "projekte/messenger": "messenger",
    "projekte/rpg": "rpg",
    "projekte/scratch-autorennen": "autorennen",
    "projekte/scratch-fangspiel": "fangspiel",
    "projekte/smart-home": "smart-home",
    "unterstufe": "unterstufe",
    "mittelstufe": "mittelstufe",
    "oberstufe": "oberstufe",
    "projekte": "projekte",
}

# Seiten ohne eigenen Zweck - sie brauchen keinen Permaid.
OHNE = {"404", "impressum", "wc", "index"}

# Eine Seite kann als Markdown oder als Handlebars-Vorlage vorliegen. Beide
# werden zu einer Seite im Buch, beide brauchen also einen Permaid.
ENDUNGEN = (".md", ".md.hbs")

ERLAUBT_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

# Stellenangaben: eine nackte Zahl als Namensteil oder ein Ordnungswort
# mit Zahl dahinter. "3d", "1000" und "er-diagramme" sind keine.
STELLE_RE = re.compile(
    r"(^|-)(\d+|(kapitel|teil|lektion|seite|schritt|nummer|nr)-\d+)(-|$)"
)

LANG = 35       # ab hier geduldet
ZU_LANG = 40    # ab hier gemeldet

problems: list[str] = []
ohne_frontmatter: list[str] = []

FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---(\n|\Z)", re.S)


def permaid_von(pfad: pathlib.Path) -> str | None:
    """Der Permaid der Seite, "" wenn keiner da ist, None ohne Frontmatter."""
    treffer = FRONTMATTER_RE.match(pfad.read_text(encoding="utf-8"))
    if not treffer:
        return None
    gefunden = re.search(r"^permaid:\s*(.*)$", treffer.group(1), re.M)
    return gefunden.group(1).strip().strip('"') if gefunden else ""


def bereich_von(rel: pathlib.PurePath) -> tuple[str, tuple[str, ...]]:
    """Kuerzel des Bereichs und der Pfadrest darunter."""
    for laenge in range(len(rel.parts), 0, -1):
        praefix = "/".join(rel.parts[:laenge])
        if praefix in BEREICHE:
            return BEREICHE[praefix], rel.parts[laenge:]
    return "", rel.parts


def stamm(name: str) -> str:
    """Der Dateiname ohne Seitenendung: 'index.md.hbs' wird zu 'index'."""
    for endung in ENDUNGEN:
        if name.endswith(endung):
            return name[: -len(endung)]
    return name


def seiten() -> list[pathlib.Path]:
    aus = []
    for pfad in sorted(BOOK.rglob("*")):
        if not pfad.is_file() or not pfad.name.endswith(ENDUNGEN):
            continue
        rel = pfad.relative_to(BOOK)
        if rel.parts[0] == "_probe":
            continue
        if len(rel.parts) == 1 and stamm(rel.name) in OHNE:
            continue
        aus.append(pfad)
    return aus


def pruefe(rel: pathlib.PurePath, pid: str) -> None:
    ort = str(rel)

    if not ERLAUBT_RE.match(pid):
        problems.append(
            f"{ort}: permaid '{pid}' - erlaubt sind nur Kleinbuchstaben, "
            f"Ziffern und einzelne Bindestriche dazwischen"
        )
        return

    stelle = STELLE_RE.search(pid)
    if stelle:
        problems.append(
            f"{ort}: permaid '{pid}' enthaelt eine Stellenangabe "
            f"('{stelle.group(2)}') - der Permaid soll das Umsortieren "
            f"ueberleben"
        )

    if len(pid) > ZU_LANG:
        problems.append(
            f"{ort}: permaid '{pid}' ist {len(pid)} Zeichen lang - "
            f"ueber {ZU_LANG} laesst er sich nicht mehr diktieren"
        )

    bereich, rest = bereich_von(rel)
    if not bereich:
        return                              # Buchseite daneben, kein Praefix
    startseite = not rest or (len(rest) == 1 and stamm(rest[0]) == "index")
    if startseite:
        if pid != bereich:
            problems.append(
                f"{ort}: Startseite des Bereichs - permaid muesste "
                f"'{bereich}' heissen, heisst aber '{pid}'"
            )
    elif not pid.startswith(bereich + "-"):
        problems.append(
            f"{ort}: permaid '{pid}' faengt nicht mit dem Bereichskuerzel "
            f"'{bereich}-' an"
        )


def main() -> int:
    vergeben: dict[str, list[str]] = collections.defaultdict(list)
    geprueft = 0

    for pfad in seiten():
        rel = pfad.relative_to(BOOK)
        pid = permaid_von(pfad)
        if pid is None:
            ohne_frontmatter.append(str(rel))
            continue
        if not pid:
            problems.append(f"{rel}: kein permaid im Frontmatter")
            continue
        geprueft += 1
        vergeben[pid].append(str(rel))
        pruefe(rel, pid)

    for pid, wo in sorted(vergeben.items()):
        if len(wo) > 1:
            problems.append(f"permaid '{pid}' ist mehrfach vergeben: "
                            + ", ".join(wo))

    knapp = [p for p in vergeben if LANG < len(p) <= ZU_LANG]
    print(f"{geprueft} Permaids geprueft, alle aus {len(BEREICHE)} Bereichen.")
    if knapp:
        print(f"{len(knapp)} davon laenger als {LANG} Zeichen (geduldet).")
    if ohne_frontmatter:
        print(f"{len(ohne_frontmatter)} Seite(n) ohne Frontmatter "
              f"uebersprungen:")
        for rel in ohne_frontmatter:
            print(f"  {rel}")

    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Alle Permaids folgen dem Schema und sind eindeutig.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
