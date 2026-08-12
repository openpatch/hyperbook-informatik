#!/usr/bin/env python3
"""Haelt die Online-IDE-Bloecke der Projekte mit den Archiven zusammen.

    python3 tools/projekte/erzeuge_ide_bloecke.py
    python3 tools/projekte/erzeuge_ide_bloecke.py --pruefen

Die Projekte gibt es zweimal: als **Archiv** zum Herunterladen (BlueJ, echtes
Java) und als **Online-IDE-Block** im Buch. Beides von Hand zu pflegen heisst,
dass eines davon irgendwann veraltet.

Deshalb ist das Archiv die **einzige Quelle**. Wer den Quelltext aendert,
aendert die Datei unter `archives/` und laesst dieses Skript laufen; die Bloecke
im Buch werden daraus neu geschrieben. `tools/pruefe-alles.py --generatoren`
meldet, wenn beides auseinanderlaeuft.

## So wird ein Block angemeldet

Im Markdown steht im `onlineide`-Block ein Kommentar mit Archiv und Dateien:

```md
:::onlineide{height="520px"}

<!-- aus archives/smart-home-ereignisse: Event.java, StateChangedEvent.java -->

```java Event.java
```

:::
```

Der Inhalt der aufgefuehrten Fences wird aus dem Archiv ersetzt. Fehlt ein
Fence, wird er ergaenzt. **Andere Fences bleiben unangetastet** - dort steht der
von Hand geschriebene Teil, etwa ein `Main.java` mit dem Hauptprogramm.

## Was dabei angepasst wird

Die Online-IDE ist nicht dasselbe wie ein lokales Java:

| Archiv (BlueJ) | Online-IDE |
| --- | --- |
| `import java.time.LocalDateTime;` | entfaellt - es gibt keine Pakete |
| `import org.openpatch.scratch.*;` | entfaellt - `libraries="scratch"` genuegt |
| `KeyCode.VK_SPACE` | `KeyCode.SPACE` |
| `addAnimation("gehen", "assets/…/bunny1_walk%d.png", 2)` | `addAnimation("gehen", "bunny1_walk", 2)` |

Die letzte Zeile ist der Grund fuer die Tabelle KOSTUEME: Das Archiv liefert
seine Bilder mit, die Online-IDE hat dieselben Sprites eingebaut - nur unter
anderem Namen.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book"
ARCHIVE = ROOT / "archives"

problems: list[str] = []

MARKE_RE = re.compile(
    r"<!--\s*aus\s+archives/([\w.-]+)\s*:\s*([^>]+?)\s*-->", re.I
)
ONLINEIDE_RE = re.compile(
    r"(^:::onlineide(?:\{[^}]*\})?[ \t]*$)(.*?)(^:::[ \t]*$)", re.S | re.M
)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)

# Bildpfade der Archive -> eingebaute Kostuemnamen der Online-IDE.
KOSTUEME = {
    "assets/Players/bunny1_walk%d.png": "bunny1_walk",
    "assets/Players/bunny1_stand.png": "bunny1_stand",
    "assets/Players/bunny1_jump.png": "bunny1_jump",
    "assets/Players/bunny1_hurt.png": "bunny1_hurt",
    "assets/Players/bunny1_ready.png": "bunny1_ready",
    "assets/Environment/ground_grass.png": "ground_grass",
    "assets/Enemies/spikeMan_stand.png": "spikeMan_stand",
    "assets/Enemies/spikeMan_walk%d.png": "spikeMan_walk",
    "assets/rocket.png": "fishGreen",
}


def fuer_online_ide(quelltext: str, dateiname: str) -> str:
    """Uebersetzt eine Archivdatei in die Fassung fuer die Online-IDE."""
    text = quelltext

    # 1. Pakete gibt es nicht.
    text = re.sub(r"^import\s+[^\n]*\n", "", text, flags=re.M)
    text = text.lstrip("\n")

    # 2. Tastencodes heissen ohne VK_-Vorsilbe.
    text = re.sub(r"KeyCode\.VK_([A-Z0-9_]+)", r"KeyCode.\1", text)

    # 3. Mitgelieferte Bilddateien -> eingebaute Kostueme.
    for pfad, kostuem in KOSTUEME.items():
        text = text.replace(f'"{pfad}"', f'"{kostuem}"')

    if "assets/" in text:
        problems.append(
            f"{dateiname}: verweist noch auf assets/ - Kostuemname in KOSTUEME "
            f"ergaenzen ({[z for z in text.splitlines() if 'assets/' in z][:1]})"
        )
    return text.rstrip() + "\n"


def bloecke_einer_seite(text: str) -> list[tuple[str, list[str], re.Match]]:
    """(Archivname, Dateiliste, Treffer) fuer jeden angemeldeten Block."""
    gefunden = []
    for treffer in ONLINEIDE_RE.finditer(text):
        marke = MARKE_RE.search(treffer.group(2))
        if not marke:
            continue
        dateien = [d.strip() for d in marke.group(2).split(",") if d.strip()]
        gefunden.append((marke.group(1), dateien, treffer))
    return gefunden


def neuer_rumpf(rumpf: str, archivname: str, dateien: list[str]) -> str:
    ordner = ARCHIVE / archivname
    if not ordner.is_dir():
        problems.append(f"Archiv fehlt: archives/{archivname}")
        return rumpf

    vorhanden = {}
    for treffer in FENCE_RE.finditer(rumpf):
        teile = treffer.group(1).split()
        if len(teile) > 1:
            vorhanden[teile[1]] = treffer

    ergebnis = rumpf
    fehlende = []
    for datei in dateien:
        quelle = ordner / datei
        if not quelle.is_file():
            problems.append(f"archives/{archivname}/{datei} gibt es nicht")
            continue
        code = fuer_online_ide(quelle.read_text(encoding="utf-8"), datei)
        neu = f"```java {datei}\n{code}```"
        if datei in vorhanden:
            ergebnis = ergebnis.replace(vorhanden[datei].group(0), neu, 1)
        else:
            fehlende.append(neu)

    if fehlende:
        ergebnis = ergebnis.rstrip("\n") + "\n\n" + "\n\n".join(fehlende) + "\n"
    return ergebnis


def bearbeite(pfad: pathlib.Path) -> tuple[str, int]:
    text = pfad.read_text(encoding="utf-8")
    bloecke = bloecke_einer_seite(text)
    if not bloecke:
        return text, 0
    neu = text
    for archivname, dateien, treffer in bloecke:
        rumpf = neuer_rumpf(treffer.group(2), archivname, dateien)
        if rumpf != treffer.group(2):
            neu = neu.replace(
                treffer.group(1) + treffer.group(2) + treffer.group(3),
                treffer.group(1) + rumpf + treffer.group(3),
                1,
            )
    return neu, len(bloecke)


def main() -> int:
    pruefen = "--pruefen" in sys.argv
    seiten = 0
    bloecke = 0
    veraltet: list[str] = []

    for pfad in sorted(BOOK.rglob("*.md")):
        text = pfad.read_text(encoding="utf-8")
        neu, anzahl = bearbeite(pfad)
        if not anzahl:
            continue
        seiten += 1
        bloecke += anzahl
        if neu != text:
            if pruefen:
                veraltet.append(str(pfad.relative_to(ROOT)))
            else:
                pfad.write_text(neu, encoding="utf-8")

    if pruefen and veraltet:
        print("Diese Seiten passen nicht mehr zu ihrem Archiv:")
        for v in veraltet:
            print(f"  {v}")
        print("\npython3 tools/projekte/erzeuge_ide_bloecke.py ausfuehren.")
        return 1

    print(f"{bloecke} Bloecke auf {seiten} Seiten aus den Archiven erzeugt.")
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
