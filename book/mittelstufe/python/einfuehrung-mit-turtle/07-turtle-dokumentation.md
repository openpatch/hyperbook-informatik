---
title: Turtle-Dokumentation
index: 7
---

# Turtle-Dokumentation

Dieses Kapitel ist zum **Nachschlagen** gedacht. Hier findest du alle Turtle-Befehle, die in diesem Lernpfad vorkommen.

Jedes Turtle-Programm beginnt mit dieser Zeile:

```python
from turtle import *
```

## Bewegung

| Befehl | Wirkung |
| --- | --- |
| `forward(weite)` | bewegt die Turtle um `weite` Pixel vorwärts. Kurzform: `fd` |
| `backward(weite)` | bewegt die Turtle um `weite` Pixel rückwärts. Kurzformen: `bk`, `back` |
| `right(winkel)` | dreht die Turtle um `winkel` Grad nach rechts. Kurzform: `rt` |
| `left(winkel)` | dreht die Turtle um `winkel` Grad nach links. Kurzform: `lt` |
| `goto(x, y)` | setzt die Turtle auf den Punkt (x \| y). Kurzformen: `setpos`, `setposition` |
| `setx(x)` | ändert nur die x-Koordinate |
| `sety(y)` | ändert nur die y-Koordinate |
| `setheading(winkel)` | dreht die Turtle in die angegebene Richtung. 0 ist rechts, 90 ist oben. Kurzform: `seth` |
| `home()` | setzt die Turtle auf (0 \| 0) und dreht sie nach rechts |
| `circle(radius)` | zeichnet einen Kreis mit dem angegebenen Radius |

:::snippet{#brain}
**Achtung bei `circle`:** Der zweite Parameter gibt hier die **Anzahl der Schritte** an, aus denen der Kreis zusammengesetzt wird – **nicht** einen Winkel.

- `circle(50)` zeichnet einen Kreis mit Radius 50 aus 120 Schritten.
- `circle(50, 6)` zeichnet ein regelmäßiges **Sechseck**.
- Ein negativer Radius wie `circle(-50)` zeichnet den Kreis in die andere Richtung.

Wenn du in anderen Quellen `circle(50, 180)` für einen Halbkreis findest: Das bezieht sich auf eine andere Turtle-Variante und funktioniert hier **nicht**.
:::

## Stift und Farben

| Befehl | Wirkung |
| --- | --- |
| `penup()` | hebt den Stift an. Kurzformen: `pu`, `up` |
| `pendown()` | setzt den Stift ab. Kurzformen: `pd`, `down` |
| `pensize(breite)` | setzt die Strichstärke in Pixeln. Kurzform: `width` |
| `pencolor(farbe)` | setzt die Stiftfarbe |
| `fillcolor(farbe)` | setzt die Füllfarbe |
| `color(stift, fuellung)` | setzt beide Farben auf einmal |
| `dot(durchmesser)` | zeichnet einen gefüllten Punkt an der aktuellen Position |
| `dot(durchmesser, farbe)` | zeichnet einen Punkt in der angegebenen Farbe |
| `begin_fill()` | beginnt eine Fläche |
| `end_fill()` | schließt die Fläche und füllt sie |
| `write(text)` | schreibt Text an der aktuellen Position |
| `bgcolor(farbe)` | setzt die Hintergrundfarbe der Zeichenfläche |

### Farben angeben

Es gibt drei Möglichkeiten:

```python
pencolor("red")           # Farbname
pencolor("#ff8800")       # Hexadezimalwert
colormode(255)            # einmal umschalten, danach:
pencolor(255, 136, 0)     # RGB-Werte von 0 bis 255
```

Eine Übersicht aller Farbnamen findest du auf [w3schools.com](https://www.w3schools.com/colors/colors_x11.asp).

### Text schreiben

```python
write("Hallo")
write("Hallo", align="center")
write("Hallo", font=("Arial", 20, "normal"))
```

Für `align` sind `"left"`, `"center"` und `"right"` möglich.

## Zustand abfragen

| Befehl | liefert zurück |
| --- | --- |
| `xcor()` | die aktuelle x-Koordinate |
| `ycor()` | die aktuelle y-Koordinate |
| `position()` | beide Koordinaten als Paar. Kurzform: `pos` |
| `heading()` | die aktuelle Blickrichtung in Grad |
| `towards(x, y)` | den Winkel von der Turtle zum Punkt (x \| y) |
| `isvisible()` | ob die Turtle gerade sichtbar ist |

## Zeichenfläche und Darstellung

| Befehl | Wirkung |
| --- | --- |
| `screensize(breite, hoehe)` | legt die Größe der Zeichenfläche fest. Standard ist 640 mal 480 |
| `shape(name)` | ändert das Aussehen der Turtle |
| `showturtle()` | zeigt die Turtle an. Kurzform: `st` |
| `hideturtle()` | versteckt die Turtle. Kurzform: `ht` |
| `speed(wert)` | steuert die Animationsgeschwindigkeit. `speed(0)` zeichnet ohne Verzögerung |
| `clear()` | löscht die Zeichnung, die Turtle bleibt stehen |
| `reset()` | löscht die Zeichnung und setzt die Turtle zurück |

Für `shape` sind diese Namen möglich: `"classic"` (Standard), `"arrow"`, `"turtle"`, `"triangle"`, `"square"`, `"circle"`.

:::snippet{#merken}
Der **Ursprung (0 | 0) liegt in der Mitte** der Zeichenfläche, die y-Achse zeigt nach oben.

Bei `screensize(640, 480)` reicht die Fläche also von -320 bis 320 in x-Richtung und von -240 bis 240 in y-Richtung.
:::

## Mehrere Turtles

Mit `Turtle()` erzeugst du eine zusätzliche, unabhängige Turtle:

```python
from turtle import *

zweite = Turtle()

forward(100)          # bewegt die Standard-Turtle
zweite.left(90)       # bewegt die zweite Turtle
zweite.forward(100)
```

Jede Turtle hat ihre eigene Position, Richtung, Farbe und ihren eigenen Stiftzustand. Alle zeichnen auf dieselbe Fläche.

## Nützliches außerhalb der Turtle

| Befehl | Wirkung |
| --- | --- |
| `print(wert)` | gibt einen Wert in der Ausgabe aus |
| `input(text)` | fragt eine Eingabe ab und liefert sie als **Text** zurück |
| `int(text)` | wandelt in eine ganze Zahl um |
| `float(text)` | wandelt in eine Kommazahl um |
| `str(zahl)` | wandelt eine Zahl in Text um |
| `len(liste)` | liefert die Anzahl der Elemente einer Liste |
| `range(n)` | liefert die Zahlen von 0 bis n-1 |
| `range(a, b)` | liefert die Zahlen von a bis b-1 |

Für Zufallszahlen brauchst du zusätzlich:

```python
from random import randint

randint(1, 6)     # zufällige ganze Zahl von 1 bis 6, beide eingeschlossen
```

## Diese Befehle gibt es hier nicht

:::snippet{#brain}
In Büchern und Tutorials zu anderen Turtle-Varianten begegnen dir Befehle, die in diesem Hyperbook **nicht** funktionieren:

| Befehl | Warum nicht? |
| --- | --- |
| `done()`, `mainloop()`, `exitonclick()` | nicht nötig – die Zeichnung bleibt ohnehin stehen |
| `tracer()`, `update()` | nutze stattdessen `speed(0)` |
| `stamp()`, `undo()` | nicht verfügbar |
| `onkey()`, `onclick()`, `ontimer()` | Tastatur- und Mausereignisse werden nicht unterstützt. Nutze `input()` |
| `distance(x, y)` | nicht verfügbar. Berechne den Abstand selbst mit dem Satz des Pythagoras |
| `circle(radius, winkel)` | der zweite Parameter sind hier **Schritte**, kein Winkel |

Falls du mit TigerJython gearbeitet hast, hilft dir diese Übersetzungstabelle:

| TigerJython | hier |
| --- | --- |
| `from gturtle import *` und `makeTurtle()` | `from turtle import *` |
| `setPenColor(f)` | `pencolor(f)` |
| `setFillColor(f)` | `fillcolor(f)` |
| `setPenWidth(b)`, `setLineWidth(b)` | `pensize(b)` |
| `penUp()`, `penDown()` | `penup()`, `pendown()` |
| `startPath()`, `fillPath()` | `begin_fill()`, `end_fill()` |
| `setPos(x, y)` | `goto(x, y)` |
| `getX()`, `getY()` | `xcor()`, `ycor()` |
| `label(t)` | `write(t)` |
| `hideTurtle()` | `hideturtle()` |
| `repeat n:` | `for i in range(n):` |
| `input(t)` liefert eine Zahl | `int(input(t))` |
| `inputInt(t)` | `int(input(t))` |
| `speed(-1)` | `speed(0)` |
| `a <> b` | `a != b` |
:::
