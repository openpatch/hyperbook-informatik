#!/usr/bin/env python3
"""Rendert die Referenzbilder fuer die Seite "Challenge: Spiele aus Wiederholung".

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/turtle-render/render_spiel_bilder.py

Dieselbe Idee wie in `render_bilder.py`, nur fuer pygame statt Turtle: Jede
Szene bildet genau das nach, was das Programm auf der Seite zeichnet. Aendert
sich das Startgeruest im Markdown, muss auch die Szene hier angepasst und neu
gerendert werden, sonst zeigt das Bild etwas anderes als der Programmierbereich.

Gezeichnet wird mit PIL, nicht mit pygame -- so braucht das Rendern weder einen
Browser noch eine SDL-Umgebung. Die Formen sind simpel genug, dass beide
dasselbe Ergebnis liefern; die Schriftart kann leicht abweichen.
"""

from __future__ import annotations

import pathlib
import sys
from typing import Callable

from PIL import Image, ImageDraw

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from pyide_turtle import _load_font  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "python" / "einfuehrung-mit-turtle"
ZIEL = BOOK / "02-variablen-und-kontrollstrukturen"

# Die Regler aus den Startgeruesten der Seite.
BREITE = 480
HOEHE = 360
RADIUS = 12
SCHLAEGER_B = 70
SCHLAEGER_H = 14
HINTERGRUND = (20, 24, 40)
BALLFARBE = (250, 220, 120)
SCHLAEGERFARBE = (210, 80, 90)
TEXTFARBE = (240, 240, 240)

SCENES: dict[str, Callable[[], Image.Image]] = {}


def scene(name: str):
    def wrap(fn):
        SCENES[name] = fn
        return fn

    return wrap


def spielfeld() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    """Ein leeres Spielfeld in Fenstergroesse -- wie `screen.fill(...)`."""
    img = Image.new("RGB", (BREITE, HOEHE), HINTERGRUND)
    return img, ImageDraw.Draw(img)


def ball(draw, x, y):
    draw.ellipse(
        [x - RADIUS, y - RADIUS, x + RADIUS, y + RADIUS],
        fill=BALLFARBE,
    )


def schlaeger(draw, x, y):
    draw.rectangle([x, y, x + SCHLAEGER_B, y + SCHLAEGER_H], fill=SCHLAEGERFARBE)


@scene("10-koordinaten.png")
def _():
    """Das Koordinatensystem von pygame -- Ursprung oben links, y nach unten.

    Das Bild erklaert die einzige echte Umstellung gegenueber der Turtle und
    steht deshalb bewusst vor der ersten Challenge. Das Fenster sitzt als
    Rahmen in einem Rand, damit die Achsenpfeile am Ursprung nicht an der
    Bildkante abgeschnitten werden.
    """
    rand_x, rand_y = 56, 48
    img = Image.new(
        "RGB",
        (BREITE + 2 * rand_x, HOEHE + 2 * rand_y),
        (12, 14, 24),
    )
    draw = ImageDraw.Draw(img)
    gross = _load_font(20)
    klein = _load_font(15)
    raster = (128, 138, 168)

    def pt(x, y):
        """Fensterkoordinaten in Bildkoordinaten."""
        return (rand_x + x, rand_y + y)

    draw.rectangle([pt(0, 0), pt(BREITE, HOEHE)], fill=HINTERGRUND)
    for x in range(120, BREITE, 120):
        draw.line([pt(x, 0), pt(x, HOEHE)], fill=(45, 50, 72), width=1)
    for y in range(120, HOEHE, 120):
        draw.line([pt(0, y), pt(BREITE, y)], fill=(45, 50, 72), width=1)
    draw.rectangle([pt(0, 0), pt(BREITE, HOEHE)], outline=(90, 98, 124), width=1)

    pfeil = (250, 220, 120)
    draw.line([pt(0, 0), pt(180, 0)], fill=pfeil, width=4)
    draw.polygon([pt(178, -9), pt(178, 9), pt(200, 0)], fill=pfeil)
    draw.text(pt(52, 12), "x wird größer", font=gross, fill=pfeil)

    draw.line([pt(0, 0), pt(0, 180)], fill=pfeil, width=4)
    draw.polygon([pt(-9, 178), pt(9, 178), pt(0, 200)], fill=pfeil)
    draw.text(pt(14, 150), "y wird größer", font=gross, fill=pfeil)

    draw.ellipse([pt(-8, -8), pt(8, 8)], fill=SCHLAEGERFARBE)
    draw.text(
        (16, rand_y - 30),
        "(0 | 0) liegt oben links, in der Ecke des Fensters",
        font=klein,
        fill=raster,
    )

    for x, y, beschriftung in (
        (120, 120, "(120 | 120)"),
        (360, 120, "(360 | 120)"),
        (240, 300, "(240 | 300)"),
    ):
        draw.ellipse([pt(x - 5, y - 5), pt(x + 5, y + 5)], fill=TEXTFARBE)
        draw.text(pt(x + 12, y - 9), beschriftung, font=klein, fill=TEXTFARBE)

    draw.text(
        (16, rand_y + HOEHE + 12),
        f"Das Fenster ist {BREITE} breit und {HOEHE} hoch.",
        font=klein,
        fill=raster,
    )
    return img


@scene("10-schlaeger.png")
def _():
    """Challenge 2: Schlaeger am unteren Rand, Ball unterwegs."""
    img, draw = spielfeld()
    schlaeger(draw, 205, 320)
    ball(draw, 264, 168)
    return img


@scene("10-treffer.png")
def _():
    """Challenge 3: dasselbe Feld, dazu die Punkteanzeige oben links."""
    img, draw = spielfeld()
    schlaeger(draw, 168, 320)
    ball(draw, 196, 284)
    draw.text((12, 12), "Punkte: 7", font=_load_font(28), fill=TEXTFARBE)
    return img


def main() -> None:
    only = sys.argv[1:] or None
    for name, fn in SCENES.items():
        if only and not any(o in name for o in only):
            continue
        img = fn()
        target = ZIEL / name
        img.save(target)
        print(f"{name:30s} {img.width:4d}x{img.height:4d}")
    print(f"\n{len(SCENES)} Szenen definiert.")


if __name__ == "__main__":
    main()
