#!/usr/bin/env python3
"""Listet alle Loesungspasswoerter des Buches auf.

    python3 tools/passwoerter.py                 # Uebersicht im Terminal
    python3 tools/passwoerter.py --nur web       # nur Seiten, deren Pfad "web" enthaelt
    python3 tools/passwoerter.py --markdown      # als Tabelle zum Weitergeben
    python3 tools/passwoerter.py --markdown > passwoerter.md

Die Loesungen in den Lernpfaden stehen in geschuetzten Bloecken:

    :::protect{password="db-4-3-2" description="Loesung. Erfrage das Passwort …"}

Damit Lehrkraefte die Passwoerter herausgeben koennen, brauchen sie eine
Uebersicht, die sagt, **wozu** ein Passwort gehoert - nicht nur, dass es
existiert. Deshalb steht neben jedem Passwort die Seite und der Abschnitt,
in dem der geschuetzte Block sitzt.

Dies ist ein Bericht, keine Pruefung: `tools/pruefe-alles.py` fuehrt es nicht
aus. Doppelt vergebene Passwoerter meldet es trotzdem, weil sie beim Erstellen
der Uebersicht ohnehin auffallen.
"""

from __future__ import annotations

import argparse
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BOOK = ROOT / "book"

# Nur am Zeilenanfang - sonst faende man auch die Formatbeschreibung in
# mitmachen.md, die den Block als Inline-Code zeigt. Drei Doppelpunkte oder
# mehr: geschachtelte Bloecke (etwa in einem collapsible) brauchen mehr.
PROTECT_RE = re.compile(r'^:{3,}protect\{password="([^"]+)"', re.M)
UEBERSCHRIFT_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*$", re.M)
FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.S)


class Fund:
    def __init__(self, passwort: str, seite: str, titel: str, abschnitt: str, zeile: int):
        self.passwort = passwort
        self.seite = seite
        self.titel = titel
        self.abschnitt = abschnitt
        self.zeile = zeile


def titel_von(text: str, pfad: pathlib.Path) -> str:
    """Der Seitentitel aus dem Frontmatter, sonst die erste Ueberschrift."""
    kopf = FRONTMATTER_RE.match(text)
    if kopf:
        for feld in ("title", "name"):
            treffer = re.search(rf"^{feld}:\s*(.+?)\s*$", kopf.group(1), re.M)
            if treffer:
                return treffer.group(1).strip("\"'")
    erste = UEBERSCHRIFT_RE.search(text)
    return erste.group(2) if erste else pfad.stem


def abschnitt_vor(text: str, pos: int) -> str:
    """Die naechste Ueberschrift oberhalb der Fundstelle.

    Das ist die Angabe, die eine Lehrkraft tatsaechlich braucht: nicht nur
    "Seite X", sondern "der zweite Aufgabenblock auf Seite X".
    """
    letzte = ""
    for m in UEBERSCHRIFT_RE.finditer(text, 0, pos):
        if len(m.group(1)) >= 2:  # die Seitenueberschrift selbst auslassen
            letzte = m.group(2)
    return letzte


def sammle(nur: str | None) -> list[Fund]:
    funde: list[Fund] = []
    for pfad in sorted(BOOK.rglob("*.md")):
        rel = str(pfad.relative_to(BOOK))
        if nur and nur not in rel:
            continue
        text = pfad.read_text(encoding="utf-8")
        if ":::protect" not in text:
            continue
        titel = titel_von(text, pfad)
        for m in PROTECT_RE.finditer(text):
            funde.append(
                Fund(
                    passwort=m.group(1),
                    seite=rel,
                    titel=titel,
                    abschnitt=abschnitt_vor(text, m.start()),
                    zeile=text[: m.start()].count("\n") + 1,
                )
            )
    return funde


def lernpfad_von(seite: str) -> str:
    """Die ersten beiden Pfadebenen - das ist gerade die Ebene eines Lernpfads."""
    teile = seite.split("/")
    return "/".join(teile[:2]) if len(teile) > 2 else teile[0]


def als_text(funde: list[Fund]) -> None:
    pfad_jetzt = ""
    seite_jetzt = ""
    for f in funde:
        pfad = lernpfad_von(f.seite)
        if pfad != pfad_jetzt:
            anzahl = sum(1 for x in funde if lernpfad_von(x.seite) == pfad)
            print(f"\n{pfad}  ({anzahl})")
            print("-" * (len(pfad) + 8))
            pfad_jetzt = pfad
            seite_jetzt = ""
        if f.seite != seite_jetzt:
            print(f"\n  {f.titel}")
            print(f"  {f.seite}")
            seite_jetzt = f.seite
        abschnitt = f" – {f.abschnitt}" if f.abschnitt else ""
        print(f"      {f.passwort:<22}{abschnitt}")


def als_markdown(funde: list[Fund]) -> None:
    print("# Lösungspasswörter\n")
    print("Diese Übersicht ist **nur für Lehrkräfte**. Sie gehört nicht ins Buch.\n")
    pfad_jetzt = ""
    for f in funde:
        pfad = lernpfad_von(f.seite)
        if pfad != pfad_jetzt:
            anzahl = sum(1 for x in funde if lernpfad_von(x.seite) == pfad)
            print(f"\n## {pfad} ({anzahl})\n")
            print("| Seite | Abschnitt | Passwort |")
            print("| --- | --- | --- |")
            pfad_jetzt = pfad
        print(f"| {f.titel} | {f.abschnitt or '–'} | `{f.passwort}` |")


def main() -> int:
    p = argparse.ArgumentParser(description="Listet alle Loesungspasswoerter auf.")
    p.add_argument("--nur", metavar="MUSTER",
                   help="nur Seiten, deren Pfad MUSTER enthaelt")
    p.add_argument("--markdown", action="store_true",
                   help="als Markdown-Tabelle ausgeben")
    args = p.parse_args()

    funde = sammle(args.nur)
    if not funde:
        print("Keine geschuetzten Bloecke gefunden.")
        return 0

    if args.markdown:
        als_markdown(funde)
    else:
        als_text(funde)

    # Doppelte faende man beim Zusammenstellen ohnehin - also gleich melden.
    gesehen: dict[str, Fund] = {}
    doppelt: list[tuple[Fund, Fund]] = []
    for f in funde:
        if f.passwort in gesehen:
            doppelt.append((gesehen[f.passwort], f))
        else:
            gesehen[f.passwort] = f

    trenner = "\n" + "=" * 60
    if args.markdown:
        print(f"\n---\n\n{len(funde)} Passwörter, {len(gesehen)} davon verschieden.")
    else:
        print(f"{trenner}\n{len(funde)} Passwoerter, {len(gesehen)} davon verschieden.")

    if doppelt:
        print(f"\nAchtung: {len(doppelt)} doppelt vergeben:")
        for erst, zweit in doppelt:
            print(f"  {erst.passwort}")
            print(f"    {erst.seite}:{erst.zeile}")
            print(f"    {zweit.seite}:{zweit.zeile}")
        return 1
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        sys.exit(0)
