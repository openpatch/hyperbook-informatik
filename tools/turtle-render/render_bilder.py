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


# ---------------------------------------------------------------------------
# Kapitel 6 -- Projekte
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
