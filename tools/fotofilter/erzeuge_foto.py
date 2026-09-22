#!/usr/bin/env python3
"""Erzeugt das 96 x 72 Pixel grosse Foto fuer das Projekt *Fotofilter*.

    python3 tools/fotofilter/erzeuge_foto.py

Die Projektseiten stellen das Ergebnis der Online-IDE mit einer ``@file``-
Direktive als ``fotofilter.png`` bereit. ``Foto.java`` laedt diese Datei zur
Laufzeit in ein ``Bitmap``. Die Farbkanaele werden auf dieselben 64 Stufen wie
in der frueher eingebetteten Java-Zeichenkette reduziert. Dadurch bleiben
Beispielwerte und Ergebnisse der Aufgaben unveraendert.
"""

from __future__ import annotations

import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]

QUELLE = ROOT / "public" / "images" / "willkommen-banner.jpg"
ZIEL = ROOT / "public" / "images" / "fotofilter.png"

# Das Banner ist ein Panorama. Der Ausschnitt beginnt bei diesem x-Wert und
# nimmt die volle Hoehe mit - dort steht die leuchtende LED neben den bunten
# Kabeln. Genau die Mischung braucht das Projekt: eine ueberstrahlte Flaeche
# fuer Helligkeit und Schwellenwert, harte Kanten fuer die Kantensuche,
# kraeftige Farben fuer die Kanaele.
AUSSCHNITT_LINKS = 380
BREITE = 96
HOEHE = 72


def ausschnitt() -> Image.Image:
    bild = Image.open(QUELLE).convert("RGB")
    hoch = bild.height
    breit = int(hoch * BREITE / HOEHE)
    links = AUSSCHNITT_LINKS
    if links + breit > bild.width:
        raise SystemExit(f"Der Ausschnitt ab {links} passt nicht in {QUELLE.name}.")

    bild = bild.crop((links, 0, links + breit, hoch))
    bild = bild.resize((BREITE, HOEHE), Image.Resampling.LANCZOS)

    # Dieselbe Quantisierung wie zuvor in Foto.java: 0, 4, 8, ..., 252.
    return bild.point(lambda wert: wert // 4 * 4)


def main() -> int:
    if not QUELLE.exists():
        print(f"{QUELLE} gibt es nicht.")
        return 1

    ZIEL.parent.mkdir(parents=True, exist_ok=True)
    ausschnitt().save(ZIEL, optimize=True)
    print(f"{ZIEL.relative_to(ROOT)}: {BREITE} x {HOEHE} aus {QUELLE.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
