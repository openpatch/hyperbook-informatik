---
title: Turtle-Dokumentation
index: 8
permaid: turtle-dokumentation
---

# Turtle-Dokumentation

Dieses Kapitel ist zum **Nachschlagen** gedacht. Hier findest du die Turtle-Befehle, die in diesem Lernpfad vorkommen, und ein paar weitere, die dir bei eigenen Projekten helfen.

Die Turtle in diesem Hyperbook ist das **Turtle-Modul von Python selbst**. Programme aus Büchern und Tutorials zu Python funktionieren hier also genauso wie auf einem Computer mit installiertem Python. Die vollständige Liste aller Befehle steht in der [Python-Dokumentation](https://docs.python.org/3/library/turtle.html) (auf Englisch).

Jedes Turtle-Programm beginnt mit dieser Zeile:

```python
from turtle import *
```

:::snippet{#merken}
Der **Ursprung (0 | 0) liegt in der Mitte** der Zeichenfläche, die y-Achse zeigt nach oben.

Die Zeichenfläche ist 640 mal 480 Pixel groß. Sie reicht also von -320 bis 320 in x-Richtung und von -240 bis 240 in y-Richtung.

Die Richtung 0 zeigt nach rechts, 90 nach oben, 180 nach links und 270 nach unten.
:::

## Bewegung

| Befehl | Wirkung |
| --- | --- |
| `forward(weite)` | bewegt die Turtle um `weite` Pixel vorwärts. Kurzform: `fd` |
| `backward(weite)` | bewegt die Turtle um `weite` Pixel rückwärts. Kurzformen: `bk`, `back` |
| `right(winkel)` | dreht die Turtle um `winkel` Grad nach rechts. Kurzform: `rt` |
| `left(winkel)` | dreht die Turtle um `winkel` Grad nach links. Kurzform: `lt` |
| `goto(x, y)` | bewegt die Turtle zum Punkt (x \| y). Ist der Stift unten, entsteht eine Linie. Kurzformen: `setpos`, `setposition` |
| `teleport(x, y)` | springt zum Punkt (x \| y), **ohne** eine Linie zu zeichnen – auch wenn der Stift unten ist |
| `setx(x)` | ändert nur die x-Koordinate |
| `sety(y)` | ändert nur die y-Koordinate |
| `setheading(winkel)` | dreht die Turtle in die angegebene Richtung. Kurzform: `seth` |
| `home()` | setzt die Turtle auf (0 \| 0) und dreht sie nach rechts |
| `circle(radius)` | zeichnet einen Kreis mit dem angegebenen Radius |
| `circle(radius, winkel)` | zeichnet nur einen **Bogen** über `winkel` Grad |
| `circle(radius, steps=ecken)` | zeichnet ein regelmäßiges Vieleck mit `ecken` Ecken |

### Kreise, Bögen und Vielecke

Die Turtle steht beim Kreis **auf dem Rand**, nicht in der Mitte. Der Mittelpunkt liegt `radius` Pixel links von ihr.

```python
circle(50)              # ganzer Kreis
circle(50, 180)         # Halbkreis
circle(50, 90)          # Viertelkreis
circle(50, steps=6)     # Sechseck
circle(-50)             # Kreis, der nach rechts statt nach links biegt
```

Nach einem Bogen zeigt die Turtle in eine neue Richtung: Nach `circle(50, 90)` hat sie sich um 90 Grad nach links gedreht.

## Stift und Farben

| Befehl | Wirkung |
| --- | --- |
| `penup()` | hebt den Stift an. Kurzformen: `pu`, `up` |
| `pendown()` | setzt den Stift ab. Kurzformen: `pd`, `down` |
| `pensize(breite)` | setzt die Strichstärke in Pixeln. Kurzform: `width` |
| `pencolor(farbe)` | setzt die Stiftfarbe |
| `fillcolor(farbe)` | setzt die Füllfarbe |
| `color(stift, fuellung)` | setzt beide Farben auf einmal. `color(farbe)` setzt beide auf dieselbe Farbe |
| `begin_fill()` | beginnt eine Fläche |
| `end_fill()` | schließt die Fläche und füllt sie |
| `dot(durchmesser)` | zeichnet einen gefüllten Punkt an der aktuellen Position, auch bei angehobenem Stift |
| `dot(durchmesser, farbe)` | zeichnet einen Punkt in der angegebenen Farbe |
| `stamp()` | drückt ein Abbild der Turtle auf die Zeichenfläche |
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

Ohne `colormode(255)` erwartet die Turtle RGB-Werte von 0 bis 1, also zum Beispiel `pencolor(1, 0.5, 0)` für Orange.

Eine Übersicht aller Farbnamen findest du auf [w3schools.com](https://www.w3schools.com/colors/colors_x11.asp).

### Text schreiben

```python
write("Hallo")
write("Hallo", align="center")
write("Hallo", font=("Arial", 20, "normal"))
write("Punkte: " + str(10))
```

Für `align` sind `"left"`, `"center"` und `"right"` möglich. Für den Schriftstil gehen `"normal"`, `"bold"` und `"italic"`.

Ohne Angabe von `font` ist die Schrift nur 8 Pixel groß. Für gut lesbaren Text gibst du die Größe deshalb besser selbst an.

## Zustand abfragen

| Befehl | liefert zurück |
| --- | --- |
| `xcor()` | die aktuelle x-Koordinate |
| `ycor()` | die aktuelle y-Koordinate |
| `position()` | beide Koordinaten als Paar. Kurzform: `pos` |
| `heading()` | die aktuelle Blickrichtung in Grad |
| `towards(x, y)` | den Winkel von der Turtle zum Punkt (x \| y) |
| `distance(x, y)` | den Abstand der Turtle zum Punkt (x \| y). Statt eines Punkts geht auch eine andere Turtle: `distance(futter)` |
| `isdown()` | ob der Stift gerade unten ist |
| `isvisible()` | ob die Turtle gerade sichtbar ist |

## Zeichenfläche und Darstellung

| Befehl | Wirkung |
| --- | --- |
| `screensize(breite, hoehe)` | ändert die Größe der Zeichenfläche. Ist sie größer als der Platz auf der Seite, bekommt sie Scrollbalken |
| `shape(name)` | ändert das Aussehen der Turtle |
| `showturtle()` | zeigt die Turtle an. Kurzform: `st` |
| `hideturtle()` | versteckt die Turtle. Kurzform: `ht` |
| `speed(wert)` | steuert die Geschwindigkeit: 1 ist am langsamsten, 10 am schnellsten, 0 zeichnet ohne Animation |
| `tracer(0)` | schaltet das Anzeigen ab: Die Turtle zeichnet unsichtbar weiter |
| `update()` | zeigt auf einen Schlag alles, was seit `tracer(0)` gezeichnet wurde |
| `undo()` | macht den letzten Schritt der Turtle rückgängig |
| `clear()` | löscht die Zeichnung, die Turtle bleibt stehen |
| `reset()` | löscht die Zeichnung und setzt die Turtle zurück |

Für `shape` sind diese Namen möglich: `"classic"` (Standard), `"arrow"`, `"turtle"`, `"triangle"`, `"square"`, `"circle"` und `"blank"` (unsichtbar).

:::snippet{#merken}
**Große Bilder schnell zeichnen:** Schon mit `speed(0)` zeigt die Turtle jeden einzelnen Strich an. Bei Tausenden Strichen dauert das. Schneller geht es so:

```python
tracer(0)       # ab hier nichts mehr anzeigen

# ... hier wird gezeichnet ...

update()        # jetzt alles auf einmal zeigen
```
:::

## Tastatur, Maus und Timer

| Befehl | Wirkung |
| --- | --- |
| `listen()` | lässt die Zeichenfläche auf die Tastatur hören |
| `onkey(funktion, taste)` | ruft die Funktion auf, wenn die Taste **losgelassen** wird |
| `onkeypress(funktion, taste)` | ruft die Funktion auf, sobald die Taste **gedrückt** wird. Hältst du sie fest, wird die Funktion immer wieder aufgerufen |
| `onscreenclick(funktion)` | ruft die Funktion bei einem Klick auf die Zeichenfläche auf; sie bekommt `x` und `y` der Klickstelle |
| `onclick(funktion)` | ruft die Funktion bei einem Klick **auf die Turtle** auf; sie bekommt ebenfalls `x` und `y` |
| `ondrag(funktion)` | ruft die Funktion auf, während die Turtle mit der Maus gezogen wird. Mit `ondrag(goto)` kannst du die Turtle verschieben |
| `ontimer(funktion, ms)` | ruft die Funktion einmal nach `ms` Millisekunden auf |

Die Funktion wird jeweils **ohne Klammern** übergeben. Statt einer Funktion meldet `None` sie wieder ab, zum Beispiel `onscreenclick(None)`.

Tastennamen sind zum Beispiel `"Up"`, `"Down"`, `"Left"`, `"Right"`, `"space"`, `"Return"` und `"a"`.

:::snippet{#merken}
- Die Zeichenfläche hört erst auf Tasten, wenn du sie **einmal angeklickt** hast.
- Die angemeldeten Funktionen reagieren auch dann noch, wenn das Programm schon zu Ende ist. Erst **Stoppen** oder ein neuer Start beendet sie.
- Ein Klick auf eine Turtle löst zuerst ihr `onclick` aus und danach auch `onscreenclick`.
:::

Beispiele findest du im Kapitel [Tastatur und Maus](./04-funktionen/04-tastatur-und-maus).

## Ein Programm beenden

Ein Programm ohne Tastatur, Maus und Timer ist einfach zu Ende, wenn die letzte Zeile ausgeführt ist. Sobald du aber Funktionen mit `onkey`, `onscreenclick` oder `ontimer` angemeldet hast, **wartet** es weiter auf Ereignisse. So beendest du es:

| Weg | Wirkung |
| --- | --- |
| **Stoppen**-Button | beendet das Programm sofort, auch mitten im Zeichnen oder während es auf eine Eingabe wartet |
| `bye()` | beendet das Programm von innen. Die Zeichnung bleibt stehen, aber keine Taste, kein Klick und kein Timer ruft mehr eine Funktion auf |
| `exitonclick()` | als letzte Zeile: Das Programm endet beim nächsten Klick auf die Zeichenfläche |
| kein neues `ontimer` | eine Spielschleife hört auf, wenn sich die Funktion nicht mehr selbst mit `ontimer` aufruft |
| `onkey(None, taste)`, `onscreenclick(None)` | meldet eine einzelne Funktion ab, das restliche Programm läuft weiter |

Mit `bye()` kann zum Beispiel eine Taste das Spiel beenden:

```python
def beenden():
    write("Tschüss!", align="center", font=("Arial", 24, "normal"))
    bye()


onkey(beenden, "q")
listen()
```

:::snippet{#brain}
Ein Programm, das in einer Endlosschleife nur rechnet und dabei nichts zeichnet, zum Beispiel `while True: pass`, hält den Browser so beschäftigt, dass auch der **Stoppen**-Button nicht mehr reagiert. Dann hilft nur, die Seite neu zu laden.
:::

## Eingaben im Grafikfenster

| Befehl | Wirkung |
| --- | --- |
| `textinput(titel, frage)` | fragt einen Text ab und liefert ihn zurück |
| `numinput(titel, frage)` | fragt eine Zahl ab und liefert sie als Kommazahl zurück, zum Beispiel `50.0` |

Die Frage erscheint im Eingabefeld unter der Zeichenfläche. Gibst du bei `numinput` keine Zahl ein, fragt es noch einmal nach. Bleibt das Feld leer, liefert es `None` zurück.

```python
groesse = numinput("Quadrat", "Wie groß soll das Quadrat werden?")
```

## Mehrere Turtles

Mit `Turtle()` erzeugst du eine zusätzliche, unabhängige Turtle:

```python
from turtle import *

zweite = Turtle()

forward(100)          # bewegt die Standard-Turtle
zweite.left(90)       # bewegt die zweite Turtle
zweite.forward(100)
```

Jede Turtle hat ihre eigene Position, Richtung, Farbe, Form und ihren eigenen Stiftzustand. Alle zeichnen auf dieselbe Fläche. Alle Befehle aus den Tabellen oben funktionieren auch mit einer zusätzlichen Turtle, wenn du ihren Namen und einen Punkt davorschreibst: `zweite.pencolor("red")`.

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

## Unterschiede zu anderen Turtle-Varianten

:::snippet{#brain}
Weil hier das Turtle-Modul von Python selbst läuft, gibt es nur wenige Unterschiede zu Python auf dem Computer:

| Befehl | Was ist hier anders? |
| --- | --- |
| `done()`, `mainloop()` | nicht nötig – die Zeichnung bleibt ohnehin stehen. Sie stören aber auch nicht |
| `bye()` | schließt kein Fenster: Die Zeichnung bleibt auf der Seite stehen, nur das Programm endet |
| `setup(breite, hoehe)` | ändert wie `screensize` die Größe der Zeichenfläche, denn ein eigenes Fenster gibt es nicht |
| `save(datei)` | nicht verfügbar |

Falls du mit TigerJython gearbeitet hast, hilft dir diese Übersetzungstabelle:

| TigerJython | hier |
| --- | --- |
| `from gturtle import *` und `makeTurtle()` | `from turtle import *` |
| `setPenColor(f)` | `pencolor(f)` |
| `setFillColor(f)` | `fillcolor(f)` |
| `setPenWidth(b)`, `setLineWidth(b)` | `pensize(b)` |
| `penUp()`, `penDown()` | `penup()`, `pendown()` |
| `startPath()`, `fillPath()` | `begin_fill()`, `end_fill()` |
| `setPos(x, y)` | `teleport(x, y)` |
| `moveTo(x, y)` | `goto(x, y)` |
| `getX()`, `getY()` | `xcor()`, `ycor()` |
| `label(t)` | `write(t)` |
| `hideTurtle()` | `hideturtle()` |
| `rightArc(r, w)`, `leftArc(r, w)` | `circle(-r, w)`, `circle(r, w)` |
| `repeat n:` | `for i in range(n):` |
| `input(t)` liefert eine Zahl | `int(input(t))` oder `numinput("", t)` |
| `inputInt(t)` | `int(input(t))` |
| `speed(-1)` | `speed(0)` |
| `a <> b` | `a != b` |
:::
