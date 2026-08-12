#!/usr/bin/env python3
"""Erzeugt die Buchseite mit allen Loesungspasswoertern.

    python3 tools/erzeuge_passwortseite.py
    python3 tools/erzeuge_passwortseite.py --pruefen   # nur melden, ob sie aktuell ist

Geschriebene Datei: book/loesungen.md

Die Seite gehoert zum Buch und richtet sich an **Lernende**: Wer zu Hause eine
Aufgabe bearbeitet hat, soll die Loesung nachlesen koennen, ohne auf die
naechste Stunde zu warten. Damit das etwas nuetzt, muss zu jedem Passwort
dastehen, zu **welchem Block** es gehoert - deshalb steht neben jedem Eintrag
die Aufgabe beziehungsweise die Ueberschrift des Abschnitts.

Die Seite wird **erzeugt**, nicht von Hand gepflegt. Wer einen protect-Block
hinzufuegt, aendert oder verschiebt, laesst dieses Skript neu laufen.
`tools/pruefe-alles.py --generatoren` meldet, wenn die eingecheckte Seite nicht
mehr zum Bestand passt.
"""

from __future__ import annotations

import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from passwoerter import BOOK, ROOT, titel_von, PROTECT_RE, UEBERSCHRIFT_RE  # noqa: E402

ZIEL = BOOK / "loesungen.md"

# Die erste fette Zeile eines Aufgaben-Snippets, etwa "**Aufgabe 2: Zwei Wege**".
AUFGABE_RE = re.compile(r"^:{3,}snippet\{#aufgabe\}\s*\n+\*\*(.+?)\*\*", re.M)

KOPF = """---
name: Lösungspasswörter
permaid: loesungen
keywords:
  - lösungen
  - passwörter
lang: de
---

# Lösungspasswörter

Die Lösungen in den Lernpfaden stecken in Blöcken, die ein Passwort verlangen.
Hier stehen alle Passwörter – damit du auch zu Hause nachsehen kannst, ob deine
Bearbeitung stimmt.

:::snippet{#merken}
**Sieh erst nach, wenn du es wirklich versucht hast.** Eine Lösung zu lesen
fühlt sich an wie Verstehen, ist aber keines. Was du beim Nachlesen gewinnst,
merkst du erst in der Klassenarbeit – und dort steht keine Lösung daneben.

Der Weg, der etwas bringt: Aufgabe bearbeiten, bei Bedarf die **gestuften
Tipps** öffnen, und **danach** vergleichen. Wenn deine Lösung anders aussieht
als die hier, ist sie nicht automatisch falsch – überleg, worin der Unterschied
besteht.
:::

Zu jedem Passwort steht, zu welcher Aufgabe es gehört. Die Seitennamen sind
verlinkt.

"""

FUSS = """
<!--
Diese Seite wird von tools/erzeuge_passwortseite.py erzeugt.
Nicht von Hand bearbeiten - Aenderungen gehen beim naechsten Lauf verloren.
-->
"""


class Eintrag:
    def __init__(self, passwort: str, seite: str, titel: str, marke: str):
        self.passwort = passwort
        self.seite = seite
        self.titel = titel
        self.marke = marke


def kapitelname(pfad: pathlib.Path) -> str:
    """Der name: aus der index.md des Kapitelordners, sonst leer.

    Ohne ihn heissen alle Kapitelabschluesse gleich ("Rueckblick") und die
    Liste waere nicht zu benutzen.
    """
    index = pfad.parent / "index.md"
    if not index.exists():
        return ""
    kopf = re.match(r"\A---\n(.*?)\n---\n", index.read_text(encoding="utf-8"), re.S)
    if not kopf:
        return ""
    treffer = re.search(r"^name:\s*(.+?)\s*$", kopf.group(1), re.M)
    return treffer.group(1).strip("\"'") if treffer else ""


def marke_vor(text: str, pos: int) -> str:
    """Beschreibt den Block, zu dem das Passwort gehoert.

    Bevorzugt die Ueberschrift der zugehoerigen Aufgabe ("Aufgabe 2: ..."),
    sonst die naechste Abschnittsueberschrift darueber. Erst diese Angabe macht
    die Liste brauchbar - eine Seite hat oft mehrere geschuetzte Bloecke.
    """
    ueberschrift = ""
    for m in UEBERSCHRIFT_RE.finditer(text, 0, pos):
        if len(m.group(1)) >= 2:
            ueberschrift = m.group(2).strip()

    aufgabe = ""
    for m in AUFGABE_RE.finditer(text, 0, pos):
        aufgabe = m.group(1).strip()

    # Die Aufgabe zaehlt nur, wenn sie naeher dran ist als die Ueberschrift.
    letzte_ueberschrift = max(
        (m.start() for m in UEBERSCHRIFT_RE.finditer(text, 0, pos)
         if len(m.group(1)) >= 2),
        default=-1,
    )
    letzte_aufgabe = max(
        (m.start() for m in AUFGABE_RE.finditer(text, 0, pos)), default=-1
    )
    if aufgabe and letzte_aufgabe > letzte_ueberschrift:
        return aufgabe
    return ueberschrift


def url_von(rel: str) -> str:
    return "/" + rel.removesuffix(".md").removesuffix("/index")


def lernpfad_von(rel: str) -> str:
    teile = rel.split("/")
    return "/".join(teile[:2]) if len(teile) > 2 else teile[0]


def sammle() -> list[Eintrag]:
    eintraege: list[Eintrag] = []
    for pfad in sorted(BOOK.rglob("*.md")):
        rel = str(pfad.relative_to(BOOK))
        if rel == "loesungen.md":
            continue
        text = pfad.read_text(encoding="utf-8")
        if ":::protect" not in text:
            continue
        titel = titel_von(text, pfad)
        kapitel = kapitelname(pfad)
        if kapitel and kapitel != titel:
            titel = f"{kapitel} – {titel}"
        for m in PROTECT_RE.finditer(text):
            eintraege.append(
                Eintrag(m.group(1), rel, titel, marke_vor(text, m.start()))
            )
    return eintraege


# Anzeigenamen der Lernpfade; alles Uebrige laeuft unter seinem Ordnernamen.
NAMEN = {
    "mittelstufe/python": "Einführung mit Turtle-Grafiken",
    "mittelstufe/web": "Webentwicklung",
    "mittelstufe/3d-druck": "3D-Druck",
    "oberstufe/datenbanken": "Datenbanken",
    "oberstufe/oop": "Programmierung mit Java",
    "unterstufe/spieleentwicklung": "Spieleentwicklung",
}


def baue_seite(eintraege: list[Eintrag]) -> str:
    teile = [KOPF]
    pfade: dict[str, list[Eintrag]] = {}
    for e in eintraege:
        pfade.setdefault(lernpfad_von(e.seite), []).append(e)

    for pfad in sorted(pfade, key=lambda p: NAMEN.get(p, p)):
        gruppe = pfade[pfad]
        name = NAMEN.get(pfad, pfad)
        teile.append(f'::::collapsible{{title="{name} ({len(gruppe)} Lösungen)"}}\n\n')
        seite_jetzt = ""
        for e in gruppe:
            if e.seite != seite_jetzt:
                teile.append(f"\n**[{e.titel}]({url_von(e.seite)})**\n\n")
                teile.append("| Aufgabe | Passwort |\n| --- | --- |\n")
                seite_jetzt = e.seite
            marke = e.marke or "–"
            teile.append(f"| {marke} | `{e.passwort}` |\n")
        teile.append("\n::::\n\n")

    teile.append(f"\nInsgesamt {len(eintraege)} geschützte Lösungen.\n")
    teile.append(FUSS)
    return "".join(teile)


def main() -> int:
    eintraege = sammle()
    seite = baue_seite(eintraege)

    if "--pruefen" in sys.argv:
        vorhanden = ZIEL.read_text(encoding="utf-8") if ZIEL.exists() else ""
        if vorhanden != seite:
            print(
                f"{ZIEL.relative_to(ROOT)} ist nicht aktuell - "
                f"python3 tools/erzeuge_passwortseite.py ausfuehren."
            )
            return 1
        print(f"{ZIEL.relative_to(ROOT)} ist aktuell ({len(eintraege)} Loesungen).")
        return 0

    ZIEL.write_text(seite, encoding="utf-8")
    print(f"{ZIEL.relative_to(ROOT)} geschrieben: {len(eintraege)} Loesungen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
