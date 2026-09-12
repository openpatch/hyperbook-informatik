#!/usr/bin/env python3
"""Rendert alle Referenzbilder fuer den Lernpfad "Einfuehrung mit Turtle".

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/turtle-render/render_bilder.py

Jede Szene entspricht genau einer Musterloesung aus dem Lernpfad. Damit ist
sichergestellt, dass Zielbild und Loesung nie auseinanderlaufen: aendert sich
die Loesung, muss auch die Szene hier angepasst und neu gerendert werden.
"""

from __future__ import annotations

import math
import pathlib
import random
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from pyide_turtle import Screen, Turtle, new_scene  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "python" / "einfuehrung-mit-turtle"

SCENES: dict[str, callable] = {}


def scene(path: str):
    """Registriert eine Szene unter einem Pfad relativ zum Lernpfad-Ordner."""

    def wrap(fn):
        SCENES[path] = fn
        return fn

    return wrap


def start_at(t, x, y, heading=0, draw=True):
    """Setzt die Turtle an den Startpunkt, ohne dabei eine Spur zu ziehen.

    Die Turtle startet mit **abgesenktem** Stift in der Mitte der Flaeche. Ein
    `goto` an den Startpunkt wuerde deshalb eine Linie quer durchs Bild ziehen.
    `draw=False` laesst den Stift oben - fuer Zeichnungen, deren Musterloesung
    die Punkte nicht verbindet.
    """
    t.penup()
    t.goto(x, y)
    t.setheading(heading)
    if draw:
        t.pendown()


# ---------------------------------------------------------------------------
# Kapitel 1 -- Grundlagen
# ---------------------------------------------------------------------------


@scene("01-grundlagen/03-zeichnung-zickzack.png")
def _():
    s, t = new_scene(700, 400)
    t.pensize(2)
    t.left(90)
    for _ in range(2):
        t.forward(50)
        t.right(90)
        t.forward(50)
        t.right(90)
        t.forward(50)
        t.left(90)
        t.forward(50)
        t.left(90)
    t.forward(50)
    return s


@scene("01-grundlagen/03-zeichnung-punktekette.png")
def _():
    s, t = new_scene(700, 300)
    t.pensize(2)
    start_at(t, -150, 0)
    for d in (5, 10, 20, 30, 20, 10, 5):
        t.dot(d)
        t.forward(50)
    return s


@scene("01-grundlagen/03-haus-vom-nikolaus.png")
def _():
    s, t = new_scene(400, 400)
    t.pensize(2)
    _nikolaus(t, 100)
    return s


def _nikolaus(t, a, fill_roof=False):
    """Haus vom Nikolaus mit Seitenlaenge `a`, gezeichnet in einem Zug."""
    d = a * math.sqrt(2)  # Diagonale
    r = a / math.sqrt(2)  # Dachschenkel
    t.left(90)
    t.forward(a)  # linke Wand hoch
    if fill_roof:
        t.fillcolor("red")
        t.begin_fill()
    t.right(45)
    t.forward(r)  # Dach links
    t.right(90)
    t.forward(r)  # Dach rechts
    if fill_roof:
        t.end_fill()
    t.right(135)
    t.forward(a)  # rechte Wand runter
    t.left(135)
    t.forward(d)  # Diagonale nach links oben
    t.right(135)
    t.forward(a)  # Boden
    t.right(135)
    t.forward(d)  # Diagonale nach rechts oben
    t.right(135)
    t.forward(a)  # rechte Wand hoch


@scene("01-grundlagen/04-haus-vom-nikolaus-rotes-dach.png")
def _():
    s, t = new_scene(400, 400)
    t.pensize(2)
    _nikolaus(t, 100, fill_roof=True)
    return s


@scene("01-grundlagen/04-baum.png")
def _():
    s, t = new_scene(400, 400)
    start_at(t, 0, -120, 90)
    t.pensize(40)
    t.pencolor("brown")
    t.forward(100)
    t.pencolor("green")
    t.dot(100)
    return s


@scene("01-grundlagen/04-kerze.png")
def _():
    s, t = new_scene(400, 400)
    start_at(t, 0, -120, 90)
    t.pensize(40)
    t.pencolor("gold")
    t.forward(140)
    t.pensize(3)
    t.pencolor("black")
    t.forward(20)
    t.pencolor("orange")
    t.dot(30)
    return s


@scene("01-grundlagen/04-saeulendiagramm.png")
def _():
    s, t = new_scene(500, 400)
    t.pensize(20)
    start_at(t, -120, -100, 90)
    for h in (40, 60, 20, 100, 80):
        t.forward(h)
        t.backward(h)
        t.penup()
        t.right(90)
        t.forward(20)
        t.left(90)
        t.pendown()
    return s


@scene("01-grundlagen/04-saeulendiagramm-mit-abstand.png")
def _():
    s, t = new_scene(500, 400)
    t.pensize(20)
    start_at(t, -140, -100, 90)
    for h in (40, 60, 20, 100, 80):
        t.forward(h)
        t.backward(h)
        t.penup()
        t.right(90)
        t.forward(40)
        t.left(90)
        t.pendown()
    return s


@scene("01-grundlagen/04-vielecke.png")
def _():
    s, t = new_scene(760, 260)
    t.pensize(2)
    x = -290
    for n in (3, 4, 5, 6):
        t.penup()
        t.goto(x, -60)
        t.setheading(0)
        t.pendown()
        for _ in range(n):
            t.forward(70)
            t.left(360 / n)
        x += 160
    return s


@scene("01-grundlagen/04-koordinatensystem.png")
def _():
    s, t = new_scene(700, 560)
    s.allow_goto_draw = True  # die Achsen werden bewusst mit goto gezeichnet
    t.setfontsize(14)
    t.pensize(2)
    # x-Achse
    t.penup()
    t.goto(-300, 0)
    t.pendown()
    t.goto(300, 0)
    t.penup()
    # Pfeilspitze rechts
    t.pendown()
    t.goto(288, 8)
    t.penup()
    t.goto(300, 0)
    t.pendown()
    t.goto(288, -8)
    t.penup()
    # y-Achse
    t.goto(0, -240)
    t.pendown()
    t.goto(0, 240)
    t.penup()
    t.pendown()
    t.goto(-8, 228)
    t.penup()
    t.goto(0, 240)
    t.pendown()
    t.goto(8, 228)
    t.penup()
    # Beschriftungen
    t.goto(250, 12)
    t.write("(300 | 0)", align="center")
    t.goto(-250, 12)
    t.write("(-300 | 0)", align="center")
    t.goto(40, 215)
    t.write("(0 | 240)", align="left")
    t.goto(40, -225)
    t.write("(0 | -240)", align="left")
    # Beispielpunkt
    t.goto(150, 120)
    t.pencolor("red")
    t.dot(12)
    t.goto(160, 132)
    t.write("(150 | 120)", align="left")
    return s


# ---------------------------------------------------------------------------
# Kapitel 2 -- Variablen und Kontrollstrukturen
# ---------------------------------------------------------------------------


@scene("02-variablen-und-kontrollstrukturen/01-rechteck-mit-punkten.png")
def _():
    s, t = new_scene(400, 300)
    t.pensize(2)
    breite, hoehe, punkt = 160, 100, 16
    start_at(t, -breite / 2, -hoehe / 2)
    for _ in range(2):
        t.dot(punkt)
        t.forward(breite)
        t.dot(punkt)
        t.left(90)
        t.forward(hoehe)
        t.left(90)
    return s


@scene("02-variablen-und-kontrollstrukturen/01-punkte-zwei-farben.png")
def _():
    s, t = new_scene(500, 220)
    erste, zweite = "red", "green"
    start_at(t, -100, 0)
    for i in range(4):
        t.pencolor(erste if i % 2 == 0 else zweite)
        t.forward(50)
        t.dot(20)
    return s


@scene("02-variablen-und-kontrollstrukturen/03-treppe.png")
def _():
    s, t = new_scene(500, 400)
    t.pensize(2)
    start_at(t, -150, -120)
    for _ in range(6):
        t.left(90)
        t.forward(40)
        t.right(90)
        t.forward(40)
    return s


@scene("02-variablen-und-kontrollstrukturen/03-punktekette.png")
def _():
    s, t = new_scene(500, 220)
    start_at(t, -120, 0, draw=False)
    for _ in range(10):
        t.dot(20)
        t.forward(25)
    return s


@scene("02-variablen-und-kontrollstrukturen/03-quadrat.png")
def _():
    s, t = new_scene(400, 400)
    t.pensize(2)
    start_at(t, -50, -50)
    for _ in range(4):
        t.forward(100)
        t.left(90)
    return s


@scene("02-variablen-und-kontrollstrukturen/03-quadratspirale.png")
def _():
    s, t = new_scene(700, 700)
    t.pensize(2)
    laenge = 5
    for _ in range(40):
        t.forward(laenge)
        t.right(90)
        laenge += 5
    return s


@scene("02-variablen-und-kontrollstrukturen/03-punkte-groesser.png")
def _():
    s, t = new_scene(600, 260)
    start_at(t, -200, 0, draw=False)
    groesse = 5
    for _ in range(10):
        t.dot(groesse)
        t.forward(45)
        groesse += 5
    return s


@scene("02-variablen-und-kontrollstrukturen/03-quadrate-ineinander.png")
def _():
    s, t = new_scene(500, 500)
    t.pensize(2)
    for i in range(8):
        seite = 20 + i * 20
        t.penup()
        t.goto(-seite / 2, -seite / 2)
        t.setheading(0)
        t.pendown()
        for _ in range(4):
            t.forward(seite)
            t.left(90)
    return s


@scene("02-variablen-und-kontrollstrukturen/04-quadrat-eingabe.png")
def _():
    s, t = new_scene(400, 400)
    t.pensize(2)
    start_at(t, -60, -60)
    for _ in range(4):
        t.forward(120)
        t.right(90)
    return s


@scene("02-variablen-und-kontrollstrukturen/05-punkte-farbwunsch.png")
def _():
    s, t = new_scene(600, 220)
    start_at(t, -160, 0, draw=False)
    for farbe in ("red", "blue", "green", "magenta", "orange", "purple"):
        t.pencolor(farbe)
        t.dot(20)
        t.forward(20)
    return s


@scene("02-variablen-und-kontrollstrukturen/06-punktefeld.png")
def _():
    s, t = new_scene(400, 400)
    t.penup()
    t.goto(-125, 125)
    for _ in range(10):
        x = t.xcor()
        for _ in range(10):
            t.dot(20)
            t.forward(25)
        t.goto(x, t.ycor() - 25)
    return s


@scene("02-variablen-und-kontrollstrukturen/06-punktefeld-groesser.png")
def _():
    s, t = new_scene(400, 400)
    t.penup()
    t.goto(-125, 125)
    for zeile in range(10):
        x = t.xcor()
        for spalte in range(10):
            t.dot(2 + (zeile + spalte) * 1.5)
            t.forward(25)
        t.goto(x, t.ycor() - 25)
    return s


@scene("02-variablen-und-kontrollstrukturen/06-quadratfeld.png")
def _():
    s, t = new_scene(450, 450)
    t.pensize(2)
    for zeile in range(5):
        for spalte in range(5):
            t.penup()
            t.goto(-150 + spalte * 60, 120 - zeile * 60)
            t.setheading(0)
            t.pendown()
            for _ in range(4):
                t.forward(40)
                t.right(90)
    return s


@scene("02-variablen-und-kontrollstrukturen/07-punkte-rot-blau.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-120, 0)
    t.setheading(0)
    for i in range(10):
        t.pencolor("red" if i % 2 == 0 else "blue")
        t.dot(20)
        t.forward(25)
    return s


@scene("02-variablen-und-kontrollstrukturen/07-punkte-wachsend-zweifarbig.png")
def _():
    s, t = new_scene(700, 300)
    t.penup()
    t.goto(-260, 0)
    t.setheading(0)
    for i in range(12):
        t.pencolor("red" if i < 6 else "blue")
        t.dot(6 + i * 4)
        t.forward(45)
    return s


@scene("02-variablen-und-kontrollstrukturen/07-punkte-rgb.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-140, 0)
    t.setheading(0)
    for i in range(12):
        t.pencolor(("red", "green", "blue")[i % 3])
        t.dot(20)
        t.forward(25)
    return s


# -- Lektion 9: Challenge "Muster aus Wiederholung" -------------------------
#
# Diese Szenen sind Galeriebilder: Sie zeigen *eine* moegliche Einstellung der
# Regler, nicht die eine richtige Loesung. Wer die Regler hier aendert, muss
# auch die Reglerwerte im Markdown anpassen -- sonst zeigt die Galerie etwas
# anderes, als der Text behauptet.


def _rosette(anzahl, winkel, form):
    """Dreht `form` `anzahl` mal um den Ursprung -- das Rosetten-Grundmuster."""
    s, t = new_scene(900, 900)
    t.pensize(2)
    for _ in range(anzahl):
        form(t)
        t.left(winkel)
    return s


@scene("02-variablen-und-kontrollstrukturen/09-rosette-quadrate.png")
def _():
    def quadrat(t):
        for _ in range(4):
            t.forward(140)
            t.right(90)

    return _rosette(36, 10, quadrat)


@scene("02-variablen-und-kontrollstrukturen/09-rosette-kreise.png")
def _():
    return _rosette(24, 15, lambda t: t.circle(90))


@scene("02-variablen-und-kontrollstrukturen/09-rosette-dreiecke.png")
def _():
    return _rosette(18, 20, lambda t: t.circle(110, 3))


def _spirale(winkel):
    """Die Quadratspirale aus Lektion 3 -- nur mit veraenderbarem Winkel."""
    s, t = new_scene(1000, 1000)
    t.pensize(2)
    laenge = 5
    for _ in range(90):
        t.forward(laenge)
        t.right(winkel)
        laenge += 4
    return s


@scene("02-variablen-und-kontrollstrukturen/09-spirale-90.png")
def _():
    return _spirale(90)


@scene("02-variablen-und-kontrollstrukturen/09-spirale-91.png")
def _():
    return _spirale(91)


@scene("02-variablen-und-kontrollstrukturen/09-spirale-121.png")
def _():
    return _spirale(121)


@scene("02-variablen-und-kontrollstrukturen/09-raster.png")
def _():
    s, t = new_scene(500, 500)
    t.penup()
    for zeile in range(12):
        for spalte in range(12):
            t.goto(-165 + spalte * 30, 165 - zeile * 30)
            if spalte < zeile:
                t.pencolor("#d1495b")
            else:
                t.pencolor("#30638e")
            t.dot(4 + (zeile + spalte) * 1.2)
    return s


@scene("02-variablen-und-kontrollstrukturen/09-moire.png")
def _():
    s, t = new_scene(1200, 900)
    t.pensize(1)
    for mitte in (-110, 110):
        for i in range(72):
            t.penup()
            t.goto(mitte, 0)
            t.setheading(i * 5)
            t.pendown()
            t.forward(380)
    return s


# ---------------------------------------------------------------------------
# Kapitel 3 -- Logik
# ---------------------------------------------------------------------------


@scene("03-logik/01-punkte-mit-logik.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-140, 0)
    t.setheading(0)
    for punkt in range(10):
        t.forward(25)
        t.pencolor("red" if punkt % 2 == 0 and punkt < 5 else "blue")
        t.dot(20)
    return s


def _punktequadrat(bedingung):
    s, t = new_scene(400, 400)
    t.penup()
    t.goto(-140, 125)
    t.setheading(0)
    for zeile in range(10):
        x = t.xcor()
        for punkt in range(10):
            t.forward(25)
            t.pencolor("red" if bedingung(zeile, punkt) else "blue")
            t.dot(20)
        t.goto(x, t.ycor() - 25)
    return s


@scene("03-logik/01-punktequadrat.png")
def _():
    return _punktequadrat(lambda zeile, punkt: punkt == 0 and zeile == 0)


@scene("03-logik/01-punktequadrat-variante-a.png")
def _():
    return _punktequadrat(lambda zeile, punkt: punkt == 0 or zeile == 0)


@scene("03-logik/01-punktequadrat-variante-b.png")
def _():
    return _punktequadrat(lambda zeile, punkt: punkt == zeile)


@scene("03-logik/01-punktequadrat-variante-c.png")
def _():
    return _punktequadrat(lambda zeile, punkt: punkt < 5 and zeile < 5)


@scene("03-logik/01-punktequadrat-schachbrett.png")
def _():
    return _punktequadrat(lambda zeile, punkt: (zeile + punkt) % 2 == 0)


@scene("03-logik/02-boolean-turtle.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-140, 0)
    t.setheading(0)
    mache_punkt = True
    for _ in range(10):
        if mache_punkt:
            t.dot(20)
        mache_punkt = not mache_punkt
        t.forward(20)
    return s


@scene("03-logik/02-boolean-turtle-erweitert.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-140, 0)
    t.setheading(0)
    mache_punkt = True
    for _ in range(14):
        t.pencolor("red" if mache_punkt else "blue")
        t.dot(24 if mache_punkt else 10)
        mache_punkt = not mache_punkt
        t.forward(22)
    return s


# -- Lektion 5: Challenge "Bilder aus Bedingungen" -------------------------
#
# Diese Szenen sind Galeriebilder: Sie zeigen *eine* moegliche Einstellung der
# Regler, nicht die eine richtige Loesung. Wer die Regler hier aendert, muss
# auch die Reglerwerte im Markdown anpassen -- sonst zeigt die Galerie etwas
# anderes, als der Text behauptet.

_FARBE_A = "#d1495b"   # gedaempftes Rot
_FARBE_B = "#30638e"   # gedaempftes Blau
_FARBE_C = "#2a9d8f"   # gedaempftes Gruen
_FARBE_D = "#f4a261"   # gedaempftes Orange
_GRAU = "#e9ecef"      # hellgrau


def _raster12(farbe_fuer, punkt_groesse=20):
    """12x12-Punkteraster, Farbe pro Zelle durch farbe_fuer(zeile, spalte)."""
    s, t = new_scene(500, 500)
    t.penup()
    for zeile in range(12):
        for spalte in range(12):
            t.goto(-165 + spalte * 30, 165 - zeile * 30)
            t.pencolor(farbe_fuer(zeile, spalte))
            t.dot(punkt_groesse)
    return s


# Challenge 1: Drei Farben statt zwei

@scene("03-logik/05-dreifarben-quadranten.png")
def _():
    def farbe(zeile, spalte):
        if zeile < 6 and spalte < 6:
            return _FARBE_A
        elif zeile >= 6 and spalte >= 6:
            return _FARBE_B
        else:
            return _FARBE_C
    return _raster12(farbe)


@scene("03-logik/05-dreifarben-kreuz.png")
def _():
    def farbe(zeile, spalte):
        if zeile < 4 or spalte < 4:
            return _FARBE_A
        elif not (zeile < 4 or spalte < 4) and (zeile > 7 and spalte > 7):
            return _FARBE_B
        else:
            return _FARBE_C
    return _raster12(farbe)


@scene("03-logik/05-dreifarben-ring.png")
def _():
    def farbe(zeile, spalte):
        if zeile < 3 or zeile > 8 or spalte < 3 or spalte > 8:
            return _FARBE_A
        elif not (zeile > 4 and zeile < 7 and spalte > 4 and spalte < 7):
            return _FARBE_B
        else:
            return _FARBE_C
    return _raster12(farbe)


# Challenge 2: Der Schalter im Raster

@scene("03-logik/05-schalter-zeilen.png")
def _():
    s, t = new_scene(500, 500)
    t.penup()
    schalter = True
    for zeile in range(12):
        for spalte in range(12):
            t.goto(-165 + spalte * 30, 165 - zeile * 30)
            t.pencolor(_FARBE_A if schalter else _FARBE_B)
            t.dot(20)
        schalter = not schalter
    return s


@scene("03-logik/05-schalter-schachbrett.png")
def _():
    s, t = new_scene(500, 500)
    t.penup()
    schalter_zeile = True
    for zeile in range(12):
        schalter_spalte = schalter_zeile
        for spalte in range(12):
            t.goto(-165 + spalte * 30, 165 - zeile * 30)
            t.pencolor(_FARBE_A if schalter_spalte else _FARBE_B)
            t.dot(20)
            schalter_spalte = not schalter_spalte
        schalter_zeile = not schalter_zeile
    return s


# Challenge 3: Die bedingte Form

@scene("03-logik/05-formen.png")
def _():
    s, t = new_scene(500, 500)
    t.penup()
    for zeile in range(12):
        for spalte in range(12):
            t.goto(-165 + spalte * 30, 165 - zeile * 30)
            bedingung_a = zeile < 6
            bedingung_b = spalte < 6
            if bedingung_a and bedingung_b:
                t.pencolor(_FARBE_A)
                t.dot(24)
            elif bedingung_a or bedingung_b:
                t.pencolor(_FARBE_B)
                t.dot(14)
            else:
                t.pencolor(_FARBE_C)
                t.dot(8)
    return s


# Die Kuer: Das boolesche Territorium

@scene("03-logik/05-territorium.png")
def _():
    s, t = new_scene(500, 500)
    t.penup()
    for zeile in range(16):
        for spalte in range(16):
            t.goto(-225 + spalte * 30, 225 - zeile * 30)
            rand = zeile < 2 or zeile > 13 or spalte < 2 or spalte > 13
            ecke = (zeile < 5 or zeile > 10) and (spalte < 5 or spalte > 10)
            diagonale = zeile == spalte or zeile + spalte == 15
            if rand or ecke:
                t.pencolor(_FARBE_A)
            elif diagonale and not rand:
                t.pencolor(_FARBE_D)
            else:
                t.pencolor(_FARBE_C)
            t.dot(16)
    return s


# ---------------------------------------------------------------------------
# Kapitel 4 -- Funktionen
# ---------------------------------------------------------------------------


def _baum(t, hoehe=100):
    t.pensize(40)
    t.pencolor("brown")
    t.pendown()
    t.forward(hoehe)
    t.pencolor("green")
    t.dot(100)
    t.penup()
    t.backward(hoehe)


def _haus(t):
    t.pensize(2)
    t.pencolor("black")
    t.pendown()
    t.forward(100)
    t.right(90)
    t.fillcolor("red")
    t.begin_fill()
    t.forward(100)
    t.left(135)
    t.forward(71)
    t.left(90)
    t.forward(71)
    t.end_fill()
    t.left(90)
    t.forward(141)
    t.left(135)
    t.forward(100)
    t.left(135)
    t.forward(141)
    t.left(135)
    t.forward(100)
    t.penup()
    t.backward(100)
    t.left(90)


def _abstand(t, weite=100):
    t.right(90)
    t.forward(weite)
    t.left(90)


@scene("04-funktionen/01-dorf.png")
def _():
    s, t = new_scene(800, 400)
    t.penup()
    t.goto(-320, -150)
    t.setheading(90)
    _baum(t)
    _abstand(t, 180)
    _haus(t)
    _abstand(t, 180)
    _baum(t)
    return s


@scene("04-funktionen/02-dorf-mit-parametern.png")
def _():
    s, t = new_scene(860, 500)
    t.penup()
    t.goto(-350, -200)
    t.setheading(90)
    _baum(t, 120)
    _abstand(t, 190)
    _haus(t)
    _abstand(t, 190)
    _baum(t, 180)
    return s


@scene("04-funktionen/03-punkte-mit-xcor.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-100, 0)
    t.setheading(0)
    for _ in range(10):
        t.pencolor("red" if t.xcor() < 0 else "blue")
        t.dot(20)
        t.forward(20)
    return s


@scene("04-funktionen/03-zufallspunkte.png")
def _():
    random.seed(20240722)
    s, t = new_scene(600, 440)
    t.penup()
    for _ in range(100):
        t.goto(random.randint(-290, 290), random.randint(-210, 210))
        t.pencolor("red" if t.xcor() < 0 else "blue")
        t.dot(20)
    return s


@scene("04-funktionen/03-rand-mit-punkten.png")
def _():
    s, t = new_scene(600, 440)
    t.penup()
    t.goto(-280, -200)
    t.setheading(0)
    while t.xcor() < 280:
        t.dot(20)
        t.forward(20)
    t.left(90)
    while t.ycor() < 200:
        t.dot(20)
        t.forward(20)
    t.left(90)
    while t.xcor() > -280:
        t.dot(20)
        t.forward(20)
    t.left(90)
    while t.ycor() > -200:
        t.dot(20)
        t.forward(20)
    return s


# -- Lektion 5: Challenge "Kunst aus Funktionen" -------------------------
#
# Diese Szenen sind Galeriebilder: Sie zeigen *eine* moegliche Einstellung,
# nicht die eine richtige Loesung.

_BLAUEN = ["#2a9d8f", "#1b7461", "#43aa8b", "#588157", "#3a5a40", "#74a892"]


def _blume(t, groesse, farbe):
    """Zeichnet eine Blume: goldener Mittelpunkt + 6 Bluetenblaetter."""
    x, y = t.xcor(), t.ycor()
    t.penup()
    t.pencolor(farbe)
    for i in range(6):
        t.setheading(i * 60)
        t.forward(groesse)
        t.dot(int(groesse * 0.5))
        t.goto(x, y)
    t.pencolor("#f4a261")
    t.dot(int(groesse * 0.7))
    t.goto(x, y)
    t.setheading(0)


def _stern(t, groesse, farbe):
    """Zeichnet einen Stern: 5 Strahlen von der Mitte aus."""
    x, y = t.xcor(), t.ycor()
    t.pencolor(farbe)
    t.pensize(2)
    t.pendown()
    for i in range(5):
        t.setheading(i * 72)
        t.forward(groesse)
        t.backward(groesse)
    t.penup()
    t.dot(int(groesse * 0.3))
    t.goto(x, y)
    t.setheading(0)


# Challenge 1: Der parametrisierte Stempel

@scene("04-funktionen/05-blumenwiese.png")
def _():
    s, t = new_scene(700, 500)
    t.penup()
    farben = ["#d1495b", "#30638e", "#2a9d8f",
              "#e76f51", "#9c89b8", "#f4a261",
              "#7bb3a8", "#c1666b", "#4a7c8a"]
    for zeile in range(3):
        for spalte in range(3):
            t.goto(-200 + spalte * 200, 120 - zeile * 180)
            _blume(t, 25 + (zeile + spalte) * 5, farben[zeile * 3 + spalte])
    return s


@scene("04-funktionen/05-blumenreihe.png")
def _():
    s, t = new_scene(700, 250)
    t.penup()
    farben = ["#d1495b", "#30638e", "#2a9d8f", "#e76f51", "#9c89b8"]
    for i in range(5):
        t.goto(-240 + i * 120, 0)
        _blume(t, 15 + i * 8, farben[i])
    return s


# Challenge 2: Der Zufallswald

@scene("04-funktionen/05-zufallswald.png")
def _():
    random.seed(20240912)
    s, t = new_scene(800, 500)
    t.penup()
    t.goto(-380, -220)
    t.pensize(3)
    t.pencolor("#5a3825")
    t.pendown()
    t.setheading(0)
    t.forward(760)
    t.penup()
    for _ in range(22):
        x = random.randint(-360, 360)
        hoehe = random.randint(100, 240)
        farbe = random.choice(_BLAUEN)
        t.goto(x, -220)
        t.setheading(90)
        t.pensize(max(6, int(hoehe * 0.12)))
        t.pencolor("#6b4226")
        t.pendown()
        t.forward(hoehe)
        t.pencolor(farbe)
        t.dot(int(hoehe * 0.7))
        t.penup()
    return s


# Challenge 3: Sternenfeld

@scene("04-funktionen/05-sternenfeld.png")
def _():
    random.seed(20240913)
    s, t = new_scene(800, 500)
    t.penup()
    for _ in range(60):
        x = random.randint(-380, 380)
        y = random.randint(-100, 220)
        groesse = random.randint(10, 35)
        t.goto(x, y)
        if y > 100:
            farbe = "#f4a261"
        elif y > 0:
            farbe = "#e9c46a"
        else:
            farbe = "#e76f51"
        _stern(t, groesse, farbe)
    return s


# Die Kuer: Komposition

@scene("04-funktionen/05-komposition.png")
def _():
    random.seed(20240914)
    s, t = new_scene(800, 600)
    t.penup()
    blumenfarben = ["#d1495b", "#e76f51", "#9c89b8", "#7bb3a8", "#c1666b"]
    for _ in range(12):
        x = random.randint(-360, 360)
        y = random.randint(-250, -50)
        groesse = random.randint(15, 30)
        farbe = random.choice(blumenfarben)
        t.goto(x, y)
        _blume(t, groesse, farbe)
    sternfarben = ["#f4a261", "#e9c46a", "#e76f51"]
    for _ in range(25):
        x = random.randint(-380, 380)
        y = random.randint(0, 270)
        groesse = random.randint(8, 25)
        farbe = random.choice(sternfarben)
        t.goto(x, y)
        _stern(t, groesse, farbe)
    return s


# ---------------------------------------------------------------------------
# Kapitel 5 -- Listen
# ---------------------------------------------------------------------------


@scene("05-listen/01-saeulen-aus-liste.png")
def _():
    s, t = new_scene(400, 300)
    t.pensize(20)
    start_at(t, -60, -80, 90)
    for h in (40, 60, 20, 100, 80):
        t.forward(h)
        t.backward(h)
        t.penup()
        t.right(90)
        t.forward(20)
        t.left(90)
        t.pendown()
    return s


@scene("05-listen/01-punkte-aus-liste.png")
def _():
    s, t = new_scene(600, 260)
    t.penup()
    t.goto(-180, 0)
    t.setheading(0)
    for d in (50, 80, 40, 100, 40):
        t.dot(d)
        t.forward(90)
    return s


@scene("05-listen/01-baeume-aus-liste.png")
def _():
    s, t = new_scene(700, 340)
    t.penup()
    t.goto(-240, -120)
    for d, h in zip((50, 80, 40, 80, 40), (40, 60, 20, 100, 80)):
        t.setheading(90)
        t.pensize(12)
        t.pencolor("brown")
        t.pendown()
        t.forward(h)
        t.pencolor("green")
        t.dot(d)
        t.penup()
        t.backward(h)
        t.setheading(0)
        t.forward(110)
    return s


@scene("05-listen/01-punkte-bunt-aus-liste.png")
def _():
    s, t = new_scene(600, 220)
    t.penup()
    t.goto(-160, 0)
    t.setheading(0)
    for farbe in ("red", "green", "red", "blue", "magenta"):
        t.pencolor(farbe)
        t.dot(40)
        t.forward(80)
    return s


@scene("05-listen/01-baeume-mit-luecken.png")
def _():
    s, t = new_scene(760, 300)
    t.penup()
    t.goto(-300, -100)
    for da in (True, True, False, True, True, False, False, True):
        if da:
            t.setheading(90)
            t.pensize(12)
            t.pencolor("brown")
            t.pendown()
            t.forward(60)
            t.pencolor("green")
            t.dot(50)
            t.penup()
            t.backward(60)
        t.setheading(0)
        t.forward(80)
    return s


@scene("05-listen/02-saeulen-maximum-markiert.png")
def _():
    s, t = new_scene(560, 360)
    werte = [40, 60, 20, 100, 80, 100, 50]
    groesstes = max(werte)
    t.pensize(20)
    start_x, start_y = -180, -120
    for i, h in enumerate(werte):
        t.penup()
        t.goto(start_x + i * 30, start_y)
        t.setheading(90)
        t.pencolor("red" if h == groesstes else "black")
        t.pendown()
        t.forward(h * 1.6)
        t.penup()
    return s


# -- Lektion 4: Challenge "Kunst aus Listen" ------------------------------
#
# Diese Szenen sind Galeriebilder: Sie zeigen *eine* moegliche Einstellung,
# nicht die eine richtige Loesung.

# Challenge 1: Die Stadtsilhouette

@scene("05-listen/04-skyline.png")
def _():
    s, t = new_scene(800, 400)
    t.pensize(2)
    haeuser = [
        (40, "#30638e"), (80, "#30638e"), (55, "#30638e"),
        (120, "#1b4965"), (35, "#30638e"), (100, "#1b4965"),
        (60, "#30638e"), (140, "#1b4965"), (45, "#30638e"),
        (85, "#30638e"), (110, "#1b4965"), (50, "#30638e"),
    ]
    t.penup()
    t.goto(-380, -130)
    for i, (h, farbe) in enumerate(haeuser):
        t.setheading(0)
        t.pencolor(farbe)
        t.fillcolor(farbe)
        t.pendown()
        t.begin_fill()
        t.left(90)
        t.forward(h)
        t.right(90)
        t.forward(55)
        t.right(90)
        t.forward(h)
        t.end_fill()
        t.penup()
        t.setheading(0)
        t.forward(15)
    return s


@scene("05-listen/04-skyline-mit-fenstern.png")
def _():
    s, t = new_scene(800, 400)
    haeuser = [
        (40, "#30638e"), (80, "#30638e"), (55, "#30638e"),
        (120, "#1b4965"), (35, "#30638e"), (100, "#1b4965"),
        (60, "#30638e"), (140, "#1b4965"), (45, "#30638e"),
        (85, "#30638e"), (110, "#1b4965"), (50, "#30638e"),
    ]
    fenster_aktiv = [
        (True, True, False), (False, True, False), (True, False, True),
        (True, True, True), (False, True, False), (True, False, True),
        (True, True, False), (True, True, True), (False, True, True),
        (True, False, True), (True, True, True), (False, True, False),
    ]
    t.penup()
    t.goto(-380, -130)
    for i, (h, farbe) in enumerate(haeuser):
        t.setheading(0)
        t.pencolor(farbe)
        t.fillcolor(farbe)
        t.pendown()
        t.begin_fill()
        t.left(90)
        t.forward(h)
        t.right(90)
        t.forward(55)
        t.right(90)
        t.forward(h)
        t.end_fill()
        t.penup()

        if i < len(fenster_aktiv):
            sx = -380 + i * 70 + 10
            for zeile in range(3):
                for spalte in range(2):
                    if fenster_aktiv[i][zeile if zeile < len(fenster_aktiv[i]) else 0]:
                        t.goto(sx + spalte * 25, -130 + h - 20 - zeile * 20)
                        t.pencolor("#e9c46a" if fenster_aktiv[i][zeile] else "#2a2a2a")
                        t.dot(6)

        t.setheading(0)
        t.goto(-380 + (i + 1) * 70, -130)
    return s


# Challenge 2: Die Bachpartitur

@scene("05-listen/04-bachpartitur.png")
def _():
    s, t = new_scene(800, 400)
    t.pensize(1)
    noten = [
        ("C", -220, "#e76f51"), ("E", -170, "#e76f51"), ("G", -120, "#e76f51"),
        ("C", -70, "#e76f51"), ("E", -20, "#e76f51"), ("G", 30, "#e76f51"),
        ("A", 80, "#f4a261"), ("G", 130, "#e76f51"), ("E", 180, "#e76f51"),
        ("C", 230, "#e76f51"),
    ]
    tonhoehe = {"C": 20, "D": 40, "E": 60, "F": 80, "G": 100, "A": 120, "H": 140}
    for name, x, farbe in noten:
        y = tonhoehe.get(name, 20)
        t.penup()
        t.goto(x, y)
        t.pencolor(farbe)
        t.dot(22)
        t.setheading(90)
        t.forward(18)
        t.pendown()
        t.forward(30)
        t.penup()
    return s


# Challenge 3: Das Kartenmuster

@scene("05-listen/04-kartenmuster.png")
def _():
    s, t = new_scene(600, 600)
    farben = ["#d1495b", "#30638e", "#2a9d8f", "#e9c46a",
              "#e76f51", "#9c89b8", "#7bb3a8", "#f4a261"]
    t.penup()
    for zeile in range(8):
        for spalte in range(8):
            t.goto(-210 + spalte * 60, 210 - zeile * 60)
            t.pencolor(farben[(zeile + spalte) % len(farben)])
            t.dot(48)
    return s


# Die Kuer: Stadt bei Nacht

@scene("05-listen/04-stadt-nacht.png")
def _():
    s, t = new_scene(800, 600)
    # Himmel als Hintergrund
    t.penup()
    t.goto(-400, -300)
    t.pencolor("#1a1a2e")
    t.pensize(600)
    t.pendown()
    t.setheading(0)
    t.forward(800)
    t.penup()
    t.pensize(1)

    # Mond
    t.goto(280, 200)
    t.pencolor("#e9c46a")
    t.dot(80)

    # Sterne
    random.seed(20240915)
    for _ in range(40):
        t.goto(random.randint(-380, 380), random.randint(50, 270))
        t.pencolor("#e9c46a" if random.random() > 0.3 else "#f4a261")
        t.dot(random.randint(3, 8))

    # Haeuser
    haeuser = [
        (60, "#2d3561"), (120, "#1b2845"), (80, "#2d3561"),
        (160, "#1b2845"), (50, "#2d3561"), (200, "#0f1c2e"),
        (90, "#2d3561"), (140, "#1b2845"), (70, "#2d3561"),
        (180, "#1b2845"), (100, "#2d3561"), (150, "#1b2845"),
        (60, "#2d3561"), (130, "#1b2845"),
    ]
    fenster = [
        [True, False, True], [True, True, False], [False, True, True],
        [True, True, True], [True, False, True], [True, True, True],
        [False, True, True], [True, True, True], [True, False, True],
        [True, True, True], [False, True, False], [True, True, True],
        [True, True, False], [True, False, True],
    ]
    t.goto(-380, -200)
    for i, (h, farbe) in enumerate(haeuser):
        t.setheading(0)
        t.pencolor(farbe)
        t.fillcolor(farbe)
        t.pendown()
        t.begin_fill()
        t.left(90)
        t.forward(h)
        t.right(90)
        t.forward(50)
        t.right(90)
        t.forward(h)
        t.end_fill()
        t.penup()

        if i < len(fenster):
            for zeile in range(3):
                if fenster[i][zeile]:
                    y = -200 + h - 20 - zeile * 18
                    t.goto(-380 + i * 57 + 10, y)
                    t.pencolor("#e9c46a")
                    t.dot(7)
                    t.goto(-380 + i * 57 + 30, y)
                    t.dot(7)

        t.setheading(0)
        t.goto(-380 + (i + 1) * 57, -200)
    return s


# ---------------------------------------------------------------------------
# Kapitel 6 -- Farben
# ---------------------------------------------------------------------------


@scene("06-farben/01-farbnamen.png")
def _():
    """Vergleich: grelle Standardfarbnamen (oben) vs gedämpfte Hex (unten)."""
    s, t = new_scene(800, 400)
    t.penup()
    # Obere Reihe: Standardfarbnamen
    namen = ["red", "green", "blue", "yellow", "magenta", "cyan", "orange", "purple"]
    for i, name in enumerate(namen):
        t.goto(-350 + i * 90, 80)
        t.pencolor(name)
        t.dot(60)
    # Untere Reihe: gedämpfte Hex-Werte
    hexe = ["#d1495b", "#2a9d8f", "#30638e", "#e9c46a",
            "#9c89b8", "#76b4bd", "#f4a261", "#7b5ea7"]
    for i, code in enumerate(hexe):
        t.goto(-350 + i * 90, -80)
        t.pencolor(code)
        t.dot(60)
    return s


@scene("06-farben/01-palette.png")
def _():
    """Eine Palette aus 12 abgestuften Farben."""
    s, t = new_scene(800, 300)
    t.penup()
    farben = ["#264653", "#287271", "#2a9d8f", "#8ab17d",
              "#babb74", "#e9c46a", "#efb366", "#f4a261",
              "#e76f51", "#d1495b", "#9c89b8", "#43505f"]
    for i, code in enumerate(farben):
        t.goto(-360 + i * 65, 0)
        t.pencolor(code)
        t.dot(50)
    return s


@scene("06-farben/01-komplementaer.png")
def _():
    """Komplementärfarben-Paare."""
    s, t = new_scene(800, 400)
    t.penup()
    paare = [
        ("#d1495b", "#2a9d8f"),    # Rot--Gruen
        ("#30638e", "#f4a261"),    # Blau--Orange
        ("#7b5ea7", "#e9c46a"),    # Violett--Gelb
        ("#e76f51", "#43aa8b"),    # Korall--Tuerkis
    ]
    for i, (a, b) in enumerate(paare):
        x = -300 + i * 200
        t.goto(x, 60)
        t.pencolor(a)
        t.dot(80)
        t.goto(x, -60)
        t.pencolor(b)
        t.dot(80)
    return s


@scene("06-farben/01-farbverlauf.png")
def _():
    """Ein Farbverlauf von einer Farbe zur anderen."""
    s, t = new_scene(800, 200)
    t.penup()
    start = (209, 73, 91)    # #d1495b
    ende = (48, 157, 143)    # #2a9d8f
    for i in range(20):
        anteil = i / 19
        r = round(start[0] + (ende[0] - start[0]) * anteil)
        g = round(start[1] + (ende[1] - start[1]) * anteil)
        b = round(start[2] + (ende[2] - start[2]) * anteil)
        t.goto(-360 + i * 38, 0)
        t.pencolor((r / 255, g / 255, b / 255))
        t.dot(34)
    return s


@scene("06-farben/01-analog.png")
def _():
    """Analoge Farben: eine Farbfamilie von dunkel nach hell."""
    s, t = new_scene(800, 200)
    t.penup()
    farben = ["#1b4965", "#287271", "#2a9d8f", "#76b4bd", "#a8dadc"]
    for i, code in enumerate(farben):
        t.goto(-160 + i * 80, 0)
        t.pencolor(code)
        t.dot(60)
    return s


@scene("06-farben/01-beispiel-bild.png")
def _():
    """Beispielbild: eine einfache Komposition mit einer Palette."""
    s, t = new_scene(600, 600)
    t.penup()
    palette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]
    # Hintergrund
    t.pencolor("#f5f0e8")
    t.pensize(600)
    t.goto(-300, 0)
    t.pendown()
    t.setheading(0)
    t.forward(600)
    t.penup()
    t.pensize(1)
    # Sonne
    t.goto(0, 200)
    t.pencolor(palette[3])
    t.dot(120)
    t.pencolor(palette[2])
    t.dot(70)
    # Hügel
    t.goto(-250, -50)
    t.pencolor(palette[1])
    t.pensize(2)
    t.pendown()
    t.fillcolor(palette[1])
    t.begin_fill()
    t.setheading(0)
    t.circle(150, 30)
    t.setheading(0)
    t.forward(200)
    t.setheading(180)
    t.circle(150, 30)
    t.end_fill()
    t.penup()
    # Häuser
    hoehen = [60, 90, 50, 100, 70]
    for i, h in enumerate(hoehen):
        x = -200 + i * 100
        t.goto(x, -150)
        t.pencolor(palette[0])
        t.fillcolor(palette[0])
        t.pendown()
        t.begin_fill()
        t.setheading(0)
        t.left(90)
        t.forward(h)
        t.right(90)
        t.forward(50)
        t.right(90)
        t.forward(h)
        t.end_fill()
        t.penup()
        # Fenster
        t.goto(x + 12, -150 + h - 20)
        t.pencolor(palette[2])
        t.dot(10)
        t.goto(x + 35, -150 + h - 20)
        t.dot(10)
    return s


@scene("06-farben/02-mit-seed.png")
def _():
    """Zufallspunkte mit seed – reproduzierbar."""
    random.seed(42)
    s, t = new_scene(400, 300)
    t.penup()
    for _ in range(30):
        t.goto(random.randint(-180, 180), random.randint(-130, 130))
        t.pencolor(random.choice(["#d1495b", "#30638e", "#2a9d8f", "#e9c46a", "#f4a261"]))
        t.dot(random.randint(8, 24))
    return s


@scene("06-farben/02-ohne-seed.png")
def _():
    """Zufallspunkte ohne seed – sieht anders aus."""
    random.seed(99)  # anderer seed = anderes Bild
    s, t = new_scene(400, 300)
    t.penup()
    for _ in range(30):
        t.goto(random.randint(-180, 180), random.randint(-130, 130))
        t.pencolor(random.choice(["#d1495b", "#30638e", "#2a9d8f", "#e9c46a", "#f4a261"]))
        t.dot(random.randint(8, 24))
    return s


@scene("06-farben/02-drei-seeds.png")
def _():
    """Drei Bilder mit drei seeds – alle gleiches Programm, alle verschieden."""
    s, t = new_scene(900, 320)
    t.penup()
    seeds = [1, 2, 3]
    farben = ["#d1495b", "#30638e", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]
    for k, sd in enumerate(seeds):
        random.seed(sd)
        cx = -300 + k * 300
        for _ in range(20):
            x = cx + random.randint(-120, 120)
            y = random.randint(-120, 120)
            t.goto(x, y)
            t.pencolor(random.choice(farben))
            t.dot(random.randint(6, 20))
    return s


# -- Lektion 3: Random Noise ------------------------------------------------
#
# Diese Szenen zeigen generative Kunst, die mit Zufallswerten arbeitet:
# Rauschen, Verläufe und Texturen.

@scene("06-farben/03-punkte-noise.png")
def _():
    """Pure Zufallspunkte – Random Noise im engeren Sinne."""
    random.seed(20240920)
    s, t = new_scene(600, 600)
    t.penup()
    for _ in range(400):
        x = random.randint(-290, 290)
        y = random.randint(-290, 290)
        t.goto(x, y)
        t.pencolor("#2a9d8f")
        t.dot(random.randint(2, 8))
    return s


@scene("06-farben/03-dichte-noise.png")
def _():
    """Dichte-Variation: viele kleine Punkte, Dichte nach Region."""
    random.seed(20240921)
    s, t = new_scene(600, 600)
    t.penup()
    for _ in range(800):
        x = random.randint(-290, 290)
        y = random.randint(-290, 290)
        # Dichte steigt zur Mitte hin
        abstand = math.hypot(x, y)
        if abstand < 80 or random.random() > 0.5:
            t.goto(x, y)
            t.pencolor("#30638e")
            t.dot(random.randint(2, 5))
    return s


@scene("06-farben/03-farbnoise.png")
def _():
    """Farb-Rauschen: jede Zelle bekommt eine zufällige Farbe aus einer Palette."""
    random.seed(20240922)
    s, t = new_scene(600, 600)
    t.penup()
    palette = ["#264653", "#287271", "#2a9d8f", "#8ab17d",
               "#e9c46a", "#f4a261", "#e76f51", "#d1495b"]
    for zeile in range(20):
        for spalte in range(20):
            x = -280 + spalte * 28
            y = 280 - zeile * 28
            # Nachbar-basierte Farbe: verwende Nachbarwert als Tendenz
            idx = random.randint(0, len(palette) - 1)
            if random.random() > 0.7:
                idx = (idx + random.randint(0, 2)) % len(palette)
            t.goto(x, y)
            t.pencolor(palette[idx])
            t.dot(24)
    return s


@scene("06-farben/03-verlauf-noise.png")
def _():
    """Farbverlauf mit Rauschen: ein glatter Verlauf, gestört durch Zufall."""
    random.seed(20240923)
    s, t = new_scene(600, 600)
    t.penup()
    t.colormode(255) if hasattr(t, 'colormode') else None
    start_farbe = (38, 70, 83)     # #264653
    ende_farbe = (233, 196, 106)   # #e9c46a
    for zeile in range(30):
        for spalte in range(30):
            x = -280 + spalte * 19
            y = 280 - zeile * 19
            anteil = (zeile + spalte) / 58
            # Rauschen hinzufuegen
            noise = random.uniform(-0.15, 0.15)
            anteil = max(0, min(1, anteil + noise))
            r = round(start_farbe[0] + (ende_farbe[0] - start_farbe[0]) * anteil)
            g = round(start_farbe[1] + (ende_farbe[1] - start_farbe[1]) * anteil)
            b = round(start_farbe[2] + (ende_farbe[2] - start_farbe[2]) * anteil)
            t.goto(x, y)
            t.pencolor((r / 255, g / 255, b / 255))
            t.dot(18)
    return s


@scene("06-farben/03-kunstwerk-1.png")
def _():
    """Kunstwerk 1: 'Nebel' – weiche Punktewolken in einer Palette."""
    random.seed(20240924)
    s, t = new_scene(600, 600)
    t.penup()
    palette = ["#1b4965", "#287271", "#2a9d8f", "#76b4bd", "#a8dadc"]
    # Mehrere Zentren
    zentren = [(-150, 150), (100, -50), (-50, -150), (150, 100)]
    for cx, cy in zentren:
        farbe = random.choice(palette)
        for _ in range(80):
            winkel = random.uniform(0, 2 * math.pi)
            radius = random.uniform(0, 120)
            x = cx + radius * math.cos(winkel)
            y = cy + radius * math.sin(winkel)
            t.goto(x, y)
            t.pencolor(farbe)
            t.dot(random.randint(4, 14))
    return s


@scene("06-farben/03-kunstwerk-2.png")
def _():
    """Kunstwerk 2: 'Landschaft' – geschichtete Horizonte mit Noise."""
    random.seed(20240925)
    s, t = new_scene(800, 500)
    t.penup()
    schichten = [
        (-200, "#76b4bd", 60),
        (-100, "#2a9d8f", 80),
        (0, "#287271", 100),
        (120, "#264653", 120),
    ]
    for basis_y, farbe, breite in schichten:
        for _ in range(breite * 3):
            x = random.randint(-390, 390)
            y = basis_y + random.randint(-15, 15) + random.uniform(-8, 8)
            t.goto(x, y)
            t.pencolor(farbe)
            t.dot(random.randint(3, 10))
    return s


@scene("06-farben/03-kunstwerk-3.png")
def _():
    """Kunstwerk 3: 'Inselwelt' – Perlin Noise bestimmt Land und Wasser."""
    s, t = new_scene(600, 600)
    t.penup()
    noise = _PerlinNoise(octaves=4, seed=5)
    for zeile in range(30):
        for spalte in range(30):
            x = -280 + spalte * 19
            y = 280 - zeile * 19
            t.goto(x, y)
            n = noise([zeile / 30, spalte / 30])
            if n < -0.05:
                t.pencolor("#1d3557")   # tiefes Wasser (dunkelblau)
            elif n < 0.05:
                t.pencolor("#457b9d")   # flaches Wasser (helleres blau)
            elif n < 0.12:
                t.pencolor("#e9c46a")   # Sand (gelb)
            elif n < 0.22:
                t.pencolor("#2a9d8f")   # Land/Gras (grün)
            else:
                t.pencolor("#6b4226")   # Berge (braun)
            t.dot(18)
    return s


# -- Perlin Noise ----------------------------------------------------------
#
# Diese Szenen nutzen das Paket perlin-noise, um glattes, organises Rauschen
# zu erzeugen. Im Gegensatz zu purem random()-Noise sind benachbarte Werte
# korreliert – das Bild wirkt wie eine Landschaft, nicht wie Salat.

from perlin_noise import PerlinNoise as _PerlinNoise


@scene("06-farben/03-perlin-vergleich.png")
def _():
    """Vergleich: links reiner Zufall, rechts Perlin-Noise."""
    random.seed(20240927)
    s, t = new_scene(800, 400)
    t.penup()
    # Links: reiner Zufall
    for _ in range(300):
        t.goto(random.randint(-390, -20), random.randint(-180, 180))
        t.pencolor("#30638e")
        t.dot(random.randint(4, 12))
    # Rechts: Perlin-gesteuerte Größe
    noise = _PerlinNoise(octaves=3, seed=42)
    for zeile in range(20):
        for spalte in range(20):
            x = 20 + spalte * 18
            y = -180 + zeile * 18
            n = noise([zeile / 20, spalte / 20])
            groesse = 4 + (n + 0.5) * 14
            t.goto(x, y)
            t.pencolor("#e76f51")
            t.dot(int(groesse))
    return s


@scene("06-farben/03-perlin-landschaft.png")
def _():
    """Perlin-Noise als Höhenkarte: eine Berglandschaft."""
    s, t = new_scene(800, 500)
    t.penup()
    noise = _PerlinNoise(octaves=4, seed=7)
    # Boden
    t.goto(-400, -200)
    t.pencolor("#1a1a2e")
    t.pensize(4)
    t.pendown()
    t.setheading(0)
    t.forward(800)
    t.penup()
    t.pensize(1)
    # Berge als Punkte, Hoehe aus Perlin-Noise
    for x_idx in range(80):
        x = -390 + x_idx * 10
        n = noise([x_idx / 40, 0.5])
        hoehe = int((n + 0.4) * 250)
        if hoehe > 0:
            for schicht in range(hoehe // 4):
                y = -200 + schicht * 4
                anteil = schicht / max(1, hoehe // 4)
                if anteil < 0.3:
                    farbe = "#2a9d8f"
                elif anteil < 0.6:
                    farbe = "#43aa8b"
                elif anteil < 0.85:
                    farbe = "#76b4bd"
                else:
                    farbe = "#e9c46a"
                t.goto(x, y)
                t.pencolor(farbe)
                t.dot(8)
    return s


@scene("06-farben/03-perlin-textur.png")
def _():
    """Perlin-Noise als Farbtextur: glatte Farbübergänge aus Noise."""
    s, t = new_scene(600, 600)
    t.penup()
    noise = _PerlinNoise(octaves=2, seed=3)
    palette = [
        (38, 70, 83),     # #264653
        (40, 114, 113),   # #287271
        (42, 157, 143),   # #2a9d8f
        (118, 180, 189),  # #76b4bd
        (233, 196, 106),  # #e9c46a
    ]
    for zeile in range(30):
        for spalte in range(30):
            x = -280 + spalte * 19
            y = 280 - zeile * 19
            n = noise([zeile / 30, spalte / 30])
            # Noise-Wert (-0.5..0.5) auf Palette abbilden
            idx_f = (n + 0.5) * (len(palette) - 1)
            idx1 = int(idx_f)
            idx2 = min(idx1 + 1, len(palette) - 1)
            anteil = idx_f - idx1
            r = round(palette[idx1][0] + (palette[idx2][0] - palette[idx1][0]) * anteil)
            g = round(palette[idx1][1] + (palette[idx2][1] - palette[idx1][1]) * anteil)
            b = round(palette[idx1][2] + (palette[idx2][2] - palette[idx1][2]) * anteil)
            t.goto(x, y)
            t.pencolor((r / 255, g / 255, b / 255))
            t.dot(18)
    return s


@scene("06-farben/03-perlin-wolken.png")
def _():
    """Perlin-Noise als Wolken: mehrere Oktaven ergeben eine realistische Textur."""
    s, t = new_scene(600, 600)
    t.penup()
    noise = _PerlinNoise(octaves=6, seed=11)
    for zeile in range(30):
        for spalte in range(30):
            x = -280 + spalte * 19
            y = 280 - zeile * 19
            n = noise([zeile / 30, spalte / 30])
            # Helle und dunkle Wolkenschattierungen
            helligkeit = (n + 0.5) * 255
            helligkeit = max(180, min(255, int(helligkeit)))
            grau = helligkeit
            t.goto(x, y)
            t.pencolor((grau / 255, grau / 255, grau / 255))
            t.dot(18)
    return s


# ---------------------------------------------------------------------------
# Kapitel 7 -- Projekte
# ---------------------------------------------------------------------------


@scene("06-projekte/03-memory.png")
def _():
    s, t = new_scene(420, 300)
    farben = {
        0: "white",
        1: "red",
        2: "blue",
        3: "green",
        4: "yellow",
        5: "orange",
        6: "purple",
    }
    karten = [1, 3, 0, 0, 5, 2, 6, 4, 2, 6, 1, 5]
    aufgedeckt = {1, 4}
    t.penup()
    t.setfontsize(14)
    for i, wert in enumerate(karten):
        x = -125 + (i % 6) * 50
        y = 40 - (i // 6) * 50
        t.goto(x, y)
        if wert == 0:
            continue
        if i in aufgedeckt:
            t.pencolor(farben[wert])
            t.dot(40)
        else:
            t.pencolor("black")
            t.dot(40)
            t.pencolor("white")
            t.goto(x, y - 5)
            t.write(str(i), align="center")
            t.goto(x, y)
    return s


# -- Projekt: Generative Galerie -------------------------------------------

def _rahmen(t, x, y, breite, hoehe):
    """Zeichnet einen Bilderrahmen an Position (x, y) = Mitte."""
    t.penup()
    t.goto(x - breite / 2, y - hoehe / 2)
    t.pencolor("#8b7355")
    t.pensize(6)
    t.pendown()
    t.setheading(0)
    for _ in range(2):
        t.forward(breite)
        t.left(90)
        t.forward(hoehe)
        t.left(90)
    t.penup()
    t.pensize(1)


def _bild_rosette(t, cx, cy, scala):
    """Rosette als eines der vier Bilder."""
    t.penup()
    t.goto(cx, cy)
    for _ in range(36):
        for _ in range(4):
            t.forward(40 * scala)
            t.right(90)
        t.left(10)


def _bild_regionen(t, cx, cy, scala):
    """Logik-Raster als eines der vier Bilder."""
    t.penup()
    for zeile in range(10):
        for spalte in range(10):
            t.goto(cx - 90 * scala + spalte * 20 * scala,
                   cy + 90 * scala - zeile * 20 * scala)
            if zeile < 5 and spalte < 5:
                t.pencolor("#d1495b")
            elif zeile >= 5 and spalte >= 5:
                t.pencolor("#30638e")
            else:
                t.pencolor("#2a9d8f")
            t.dot(16)


def _bild_blumen(t, cx, cy, scala):
    """Blumen-Funktion als eines der vier Bilder."""
    farben = ["#e76f51", "#9c89b8", "#2a9d8f", "#d1495b", "#30638e"]
    t.penup()
    for i in range(5):
        x = cx + (i - 2) * 60 * scala
        y = cy
        t.goto(x, y)
        t.pencolor(farben[i])
        for j in range(6):
            t.setheading(j * 60)
            t.forward(15 * scala)
            t.dot(8 * scala)
            t.backward(15 * scala)
        t.pencolor("#f4a261")
        t.dot(12 * scala)
    t.setheading(0)


def _bild_skyline(t, cx, cy, scala):
    """Skyline aus Listen als eines der vier Bilder."""
    hoehen = [40, 70, 35, 90, 55, 75, 30, 60]
    t.penup()
    for i, h in enumerate(hoehen):
        x = cx + (i - 3.5) * 25 * scala
        y = cy - 40 * scala
        t.goto(x, y)
        t.pencolor("#30638e")
        t.pendown()
        t.fillcolor("#30638e")
        t.begin_fill()
        t.left(90)
        t.forward(h * scala)
        t.right(90)
        t.forward(18 * scala)
        t.right(90)
        t.forward(h * scala)
        t.end_fill()
        t.penup()
        t.setheading(0)


@scene("06-projekte/04-galerie.png")
def _():
    s, t = new_scene(900, 900)
    # Hintergrund
    t.penup()
    t.pencolor("#f5f0e8")
    t.pensize(900)
    t.goto(-450, 0)
    t.pendown()
    t.setheading(0)
    t.forward(900)
    t.penup()
    t.pensize(1)

    # Vier Bilder im 2x2-Raster
    bilder = [
        (-220, 220, _bild_rosette, 0.6),
        (220, 220, _bild_regionen, 0.6),
        (-220, -220, _bild_blumen, 0.7),
        (220, -220, _bild_skyline, 0.7),
    ]
    for cx, cy, fn, scala in bilder:
        _rahmen(t, cx, cy, 320, 320)
        fn(t, cx, cy, scala)

    t.setheading(0)
    return s


# ---------------------------------------------------------------------------


def main():
    only = sys.argv[1:] or None
    for rel, fn in SCENES.items():
        if only and not any(o in rel for o in only):
            continue
        target = BOOK / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        screen = fn()
        size = screen.save(target)
        print(f"{rel:70s} {size[0]:4d}x{size[1]:4d}")
    print(f"\n{len(SCENES)} Szenen definiert.")


if __name__ == "__main__":
    main()
