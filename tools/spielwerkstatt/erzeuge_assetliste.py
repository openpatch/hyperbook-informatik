#!/usr/bin/env python3
"""Erzeugt die Liste der Grafiken und Klaenge fuer die Asset-Suche der Spielwerkstatt.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/spielwerkstatt/erzeuge_assetliste.py

Liest book/oberstufe/oop/03-spielwerkstatt/assets und schreibt daneben
assets-liste.json. Die Web-Component asset-suche (public/wc/asset-suche.js)
zeigt daraus eine durchsuchbare Uebersicht und schlaegt zu jeder Datei den
passenden Java-Code vor.

Zu jeder Datei steht in der Liste, wie man sie in Scratch for Java laedt:

- figur:     Figurenblatt der Ninja-Adventure-Figuren, je Blickrichtung eine
             Spalte, die Schritte untereinander (16 x 16).
- streifen:  mehrere gleich grosse, quadratische Bilder nebeneinander - eine
             Animation, wie die Muenze.
- kacheln:   ein Kachelbild aus 16 x 16 grossen Kacheln zum Ausschneiden.
- bild:      ein einzelnes Bild, ein Kostuem.
- klang, musik: Klaenge und Musikstuecke.

Vorschauen (preview.gif und aehnliche) werden der Datei im selben Ordner
zugeordnet, sie selbst erscheinen nicht als eigener Eintrag.
"""

from __future__ import annotations

import json
import pathlib
import struct

ROOT = pathlib.Path(__file__).resolve().parents[2]
WERKSTATT = ROOT / "book" / "oberstufe" / "oop" / "03-spielwerkstatt"
ASSETS = WERKSTATT / "assets"
ZIEL = WERKSTATT / "assets-liste.json"

BEREICHE = [
    ("actor/character/", "Figuren"),
    ("actor/character-animated/", "Figuren"),
    ("actor/monster/", "Monster"),
    ("actor/animal/", "Tiere"),
    ("actor/boss/", "Bosse"),
    ("backgrounds/tilesets/", "Kacheln"),
    ("backgrounds/", "Kulisse"),
    ("items/", "Gegenstände"),
    ("fx/", "Effekte"),
    ("ui/", "Oberfläche"),
    ("audio/sounds/", "Klänge"),
    ("audio/jingles/", "Klänge"),
    ("audio/musics/", "Musik"),
]


def bereich(rel: str) -> str:
    for praefix, name in BEREICHE:
        if rel.startswith(praefix):
            return name
    return "Sonstiges"


def png_groesse(pfad: pathlib.Path) -> tuple[int, int]:
    with pfad.open("rb") as f:
        kopf = f.read(24)
    return struct.unpack(">II", kopf[16:24])


def art_eines_bildes(rel: str, breite: int, hoehe: int) -> dict:
    if rel.startswith("backgrounds/tilesets/") and breite % 16 == 0 and hoehe % 16 == 0:
        return {"art": "kacheln", "kachel": 16}
    # Figuren heissen sprite-sheet.png, manche Monster nach sich selbst (slime.png)
    figur = (rel.startswith("actor/character/") and rel.endswith("/sprite-sheet.png")) \
        or (rel.startswith("actor/monster/") and not rel.endswith("/faceset.png"))
    if figur and breite == 64 and hoehe in (64, 112):
        return {"art": "figur", "kachel": 16}
    if hoehe > 0 and breite % hoehe == 0 and breite // hoehe >= 2:
        return {"art": "streifen", "bilder": breite // hoehe, "kachel": hoehe}
    return {"art": "bild"}


def ist_vorschau(datei: pathlib.Path) -> bool:
    return "preview" in datei.stem


def main() -> int:
    eintraege: list[dict[str, object]] = []
    for datei in sorted(ASSETS.rglob("*")):
        if not datei.is_file() or datei.suffix not in (".png", ".gif", ".ogg"):
            continue
        rel = datei.relative_to(ASSETS).as_posix()
        if datei.suffix == ".gif" or ist_vorschau(datei):
            continue
        eintrag: dict[str, object] = {"pfad": "assets/" + rel, "bereich": bereich(rel)}
        if datei.suffix == ".ogg":
            eintrag["art"] = "musik" if rel.startswith("audio/musics/") else "klang"
        else:
            breite, hoehe = png_groesse(datei)
            eintrag.update({"breite": breite, "hoehe": hoehe})
            eintrag.update(art_eines_bildes(rel, breite, hoehe))
            # eine animierte Vorschau im selben Ordner, falls es genau eine gibt
            gifs = sorted(datei.parent.glob("*.gif"))
            if len(gifs) == 1 and eintrag["art"] in ("figur", "streifen"):
                eintrag["vorschau"] = "assets/" + gifs[0].relative_to(ASSETS).as_posix()
        eintraege.append(eintrag)

    # Sortiert nach Bereich, darin das Brauchbarste zuerst: ganze Figurenblaetter
    # und Animationen vor Einzelbildern, Einzelbilder aus "separate-anim" zuletzt.
    reihenfolge = [name for _, name in BEREICHE]
    rang = {"figur": 0, "streifen": 1, "kacheln": 1, "klang": 1, "musik": 1, "bild": 2}

    def schluessel(e: dict[str, object]) -> tuple:
        pfad = str(e["pfad"])
        return (reihenfolge.index(str(e["bereich"])) if e["bereich"] in reihenfolge else len(reihenfolge),
                rang.get(str(e["art"]), 3) + (2 if "/separate-anim/" in pfad else 0),
                pfad)

    eintraege.sort(key=schluessel)
    inhalt = json.dumps(eintraege, ensure_ascii=False, separators=(",", ":")) + "\n"
    ZIEL.write_text(inhalt, encoding="utf-8")
    arten: dict[str, int] = {}
    for e in eintraege:
        art = str(e["art"])
        arten[art] = arten.get(art, 0) + 1
    print(f"{len(eintraege)} Einträge geschrieben nach {ZIEL.relative_to(ROOT)}: "
          + ", ".join(f"{n} {a}" for a, n in sorted(arten.items())))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
