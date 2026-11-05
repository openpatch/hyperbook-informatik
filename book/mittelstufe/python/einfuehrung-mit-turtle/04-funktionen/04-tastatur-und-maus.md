---
title: Tastatur und Maus
index: 4
permaid: turtle-funktionen-tastatur-maus
---

# Tastatur und Maus

Bisher liefen deine Programme von oben nach unten durch – und dann war Schluss. Was gezeichnet wird, stand vorher fest.

Jetzt drehen wir das um: Das Programm **wartet**, und **du** entscheidest mit Tastatur und Maus, was passiert. Dafür brauchst du genau das, was du in diesem Kapitel gelernt hast: eigene Funktionen.

## Aufgabe 1: Die Turtle fernsteuern

:::snippet{#aufgabe}
a) Starte das Programm. Klicke einmal auf die Zeichenfläche und drücke dann die Pfeiltasten.

b) Analysiere das Programm und erläutere, was `onkey` und `listen` bewirken.

c) Beim Aufruf von `onkey` steht hinter `vor` **keine** Klammer. Probiere aus, was passiert, wenn du `onkey(vor(), "Up")` schreibst, und erkläre den Unterschied.
:::

:::pyide{canvas height="600px"}

```python
from turtle import *
shape("turtle")


def vor():
    forward(10)


def links():
    left(30)


def rechts():
    right(30)


onkey(vor, "Up")
onkey(links, "Left")
onkey(rechts, "Right")
listen()
```

:::

::::collapsible{title="Tipp: Wann laufen die Funktionen?"}

Lies das Programm von oben nach unten: Es definiert drei Funktionen, ruft aber **keine** davon selbst auf. Am Ende ist das Programm fertig – und trotzdem bewegt sich die Turtle, sobald du eine Taste drückst.

Wer ruft die Funktionen also auf?

::::

:::snippet{#merken}
```python
onkey(vor, "Up")
listen()
```

- `onkey(funktion, taste)` merkt sich: Wenn diese Taste gedrückt wird, rufe diese Funktion auf.
- `listen()` sorgt dafür, dass die Zeichenfläche auf die Tastatur hört.
- Die Funktion wird **ohne Klammern** übergeben. Mit Klammern würde sie sofort einmal aufgerufen – übergeben würde dann nur ihr Ergebnis, und das ist `None`.
- Ein Tastendruck ist ein **Ereignis** (englisch *event*). Ein Programm, das auf Ereignisse wartet und reagiert, heißt **ereignisgesteuert**.
- Die Zeichenfläche hört erst zu, wenn du sie einmal **angeklickt** hast.

| Taste | Name |
| --- | --- |
| Pfeiltasten | `"Up"`, `"Down"`, `"Left"`, `"Right"` |
| Leertaste | `"space"` |
| Buchstaben und Ziffern | `"a"`, `"b"`, …, `"1"`, `"2"`, … |
:::

## Aufgabe 2: Die Zeichenmaschine

:::snippet{#aufgabe}
Erweitere das Programm aus Aufgabe 1 zu einer Zeichenmaschine:

- Mit der Pfeiltaste nach unten fährt die Turtle 10 Schritte **zurück**.
- Die Tasten `1`, `2` und `3` wechseln die Stiftfarbe zu Rot, Grün und Blau.
- Die Taste `c` löscht die Zeichnung.
- Die **Leertaste** hebt den Stift an, wenn er unten ist, und senkt ihn, wenn er oben ist.

Zeichne damit ein Bild, das du jemandem zeigen willst.
:::

:::pyide{canvas height="600px"}

```python
from turtle import *
shape("turtle")


def vor():
    forward(10)


def links():
    left(30)


def rechts():
    right(30)


onkey(vor, "Up")
onkey(links, "Left")
onkey(rechts, "Right")
listen()
```

:::

::::collapsible{title="Tipp 1: Für jede Taste eine Funktion"}

Jede Taste braucht ihre eigene kleine Funktion, zum Beispiel:

```python
def rot():
    pencolor("red")


onkey(rot, "1")
```

Achte darauf, dass alle `onkey`-Zeilen **nach** den Funktionen stehen.

::::

::::collapsible{title="Tipp 2: Ist der Stift unten?"}

`isdown()` liefert `True`, wenn der Stift unten ist, und sonst `False` – genau wie `xcor()` einen Wert zurückliefert. Damit kannst du entscheiden:

```python
def stift():
    if isdown():
        penup()
    else:
        pendown()
```

::::

:::protect{password="turtle-4-tasten-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *
shape("turtle")


def vor():
    forward(10)


def zurueck():
    backward(10)


def links():
    left(30)


def rechts():
    right(30)


def rot():
    pencolor("red")


def gruen():
    pencolor("green")


def blau():
    pencolor("blue")


def loeschen():
    clear()


def stift():
    if isdown():
        penup()
    else:
        pendown()


onkey(vor, "Up")
onkey(zurueck, "Down")
onkey(links, "Left")
onkey(rechts, "Right")
onkey(rot, "1")
onkey(gruen, "2")
onkey(blau, "3")
onkey(loeschen, "c")
onkey(stift, "space")
listen()
```

:::

## Aufgabe 3: Mausklicks

Auch auf die Maus kann ein Programm reagieren. Dabei will es aber nicht nur wissen, **dass** geklickt wurde, sondern auch **wo**.

:::snippet{#aufgabe}
a) Starte das Programm und klicke an verschiedene Stellen der Zeichenfläche.

b) Die Funktion `klick` hat zwei Parameter, wird aber nirgends von dir aufgerufen. Erkläre, woher `x` und `y` ihre Werte bekommen.
:::

:::pyide{canvas height="600px"}

```python
from turtle import *
shape("turtle")


def klick(x, y):
    goto(x, y)


onscreenclick(klick)
```

:::

:::snippet{#merken}
`onscreenclick(funktion)` ruft die Funktion bei jedem Klick auf die Zeichenfläche auf. Die Funktion **muss zwei Parameter** haben: Für sie setzt der Computer die Koordinaten der Klickstelle als Argumente ein.
:::

:::snippet{#aufgabe}
c) Verändere das Programm zu einem **Nachthimmel**: Jeder Klick setzt an der Klickstelle einen Punkt mit zufälliger Größe zwischen 5 und 25. Liegt die Klickstelle in der oberen Hälfte, ist der Punkt gelb (ein Stern), sonst grün (ein Busch). Es sollen keine Linien entstehen.
:::

:::pyide{canvas height="600px"}

```python
from turtle import *
from random import randint

bgcolor("midnightblue")
hideturtle()
speed(0)
penup()


def klick(x, y):
    goto(x, y)


onscreenclick(klick)
```

:::

::::collapsible{title="Tipp: Welche Hälfte?"}

Das kennst du aus [Funktionen mit Rückgabewert](./03-funktionen-mit-rueckgabewert): Der Ursprung liegt in der Mitte. Hier musst du nicht einmal `ycor()` fragen – der Parameter `y` verrät dir die Höhe der Klickstelle schon.

::::

:::protect{password="turtle-4-tasten-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *
from random import randint

bgcolor("midnightblue")
hideturtle()
speed(0)
penup()


def klick(x, y):
    goto(x, y)
    if y > 0:
        dot(randint(5, 25), "yellow")
    else:
        dot(randint(5, 25), "green")


onscreenclick(klick)
```

:::

## Aufgabe 4: Die Turtle läuft von allein

Für ein Spiel muss die Turtle sich auch bewegen, wenn gerade niemand eine Taste drückt.

:::snippet{#aufgabe}
a) Starte das Programm, klicke auf die Zeichenfläche und steuere die Turtle mit den Pfeiltasten nach links und rechts.

b) Erläutere, warum die Turtle immer weiterläuft, obwohl im Programm keine Schleife vorkommt.

c) Im Moment läuft die Turtle aus dem Bild heraus. Verändere `schritt` so, dass sie **stehen bleibt**, sobald sie den Rand des Quadrats erreicht.
:::

:::pyide{canvas height="600px"}

```python
from turtle import *
shape("turtle")
speed(0)

# Rand zeichnen
penup()
goto(-200, -200)
pendown()
for i in range(4):
    forward(400)
    left(90)
penup()
goto(0, 0)
pendown()


def links():
    left(90)


def rechts():
    right(90)


def schritt():
    forward(5)
    ontimer(schritt, 50)


onkey(links, "Left")
onkey(rechts, "Right")
listen()
schritt()
```

:::

:::snippet{#merken}
`ontimer(funktion, millisekunden)` ruft die Funktion **einmal** auf, nachdem die angegebene Zeit vergangen ist.

Ruft sich die Funktion am Ende selbst wieder mit `ontimer` auf, entsteht eine Wiederholung ohne Schleife – eine **Spielschleife**. Zwischen zwei Schritten bleibt Zeit, auf Tasten und Klicks zu reagieren.

Soll die Wiederholung aufhören, ruft die Funktion `ontimer` einfach **nicht** mehr auf.
:::

::::collapsible{title="Tipp 1: Wann ist die Turtle am Rand?"}

Das Quadrat reicht von -200 bis 200 – in x-Richtung und in y-Richtung. Am Rand ist die Turtle, wenn `xcor()` größer als 200 **oder** kleiner als -200 ist. Dasselbe gilt für `ycor()`.

::::

::::collapsible{title="Tipp 2: Wie bleibt sie stehen?"}

Die Turtle läuft nur weiter, solange `schritt` sich selbst wieder per `ontimer` aufruft. Steck den Aufruf von `ontimer` in eine Verzweigung:

```python
def schritt():
    forward(5)
    if ...:
        write("Stopp!")
    else:
        ontimer(schritt, 50)
```

::::

:::protect{password="turtle-4-tasten-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
def schritt():
    forward(5)
    if xcor() > 200 or xcor() < -200 or ycor() > 200 or ycor() < -200:
        write("Stopp!")
    else:
        ontimer(schritt, 50)
```

:::

## Aufgabe 5: Das Spiel „Hungrige Turtle"

Jetzt hast du alle Bausteine für ein kleines Spiel: Die Turtle läuft von allein, du lenkst sie mit den Pfeiltasten zum Futter. Berührt sie den Rand, ist das Spiel verloren.

Für das Futter benutzt das Programm eine **zweite Turtle** mit dem Namen `futter`. Befehle für sie schreibst du mit einem Punkt dahinter: `futter.goto(...)`. Mehr dazu findest du in der [Turtle-Dokumentation](../07-turtle-dokumentation).

:::snippet{#aufgabe}
a) Spiele das Spiel. Gestartet wird es mit einem Klick auf die Zeichenfläche.

b) Analysiere das Programm. Finde heraus, welche Funktion bei welchem Ereignis aufgerufen wird.

c) Ändere das Spiel nach deinen Vorstellungen. Ideen findest du unter dem Programm.
:::

:::pyide{canvas height="650px"}

```python
from turtle import *
from random import randint

shape("turtle")
speed(0)

# Spielfeld zeichnen
penup()
goto(-200, -200)
pendown()
for i in range(4):
    forward(400)
    left(90)
penup()
goto(0, 0)
color("green")
pendown()

# Das Futter ist eine zweite Turtle
futter = Turtle()
futter.shape("circle")
futter.color("orange")
futter.speed(0)
futter.penup()
futter.goto(randint(-180, 180), randint(-180, 180))


def links():
    left(90)


def rechts():
    right(90)


def am_rand():
    return xcor() > 200 or xcor() < -200 or ycor() > 200 or ycor() < -200


def ende(text):
    penup()
    goto(0, 0)
    write(text, align="center", font=("Arial", 24, "bold"))


def schritt():
    forward(5)
    if distance(futter) < 15:
        ende("Gewonnen!")
    elif am_rand():
        ende("Verloren!")
    else:
        ontimer(schritt, 50)


def start(x, y):
    onscreenclick(None)
    schritt()


onkey(links, "Left")
onkey(rechts, "Right")
listen()
onscreenclick(start)
```

:::

:::snippet{#merken}
- `distance(futter)` liefert den Abstand zur Turtle `futter`. Ist er kleiner als 15, berühren sich die beiden.
- `am_rand()` ist eine eigene Funktion mit Rückgabewert: Sie liefert `True` oder `False` und macht die Bedingung in `schritt` gut lesbar.
- `ende(text)` schreibt die Meldung mittig ins Spielfeld – einmal definiert, für Sieg und Niederlage benutzt.
- `onscreenclick(None)` meldet die Funktion wieder ab. So startet ein zweiter Klick nicht noch eine zweite Spielschleife.
:::

### Ideen zum Weiterentwickeln

:::snippet{#aufgabe}
Suche dir eine oder mehrere Ideen aus:

- **Schneller oder langsamer:** Verändere die Wartezeit oder die Schrittweite.
- **Steuern mit vier Tasten:** Mit `setheading(90)` schaut die Turtle nach oben, mit `0` nach rechts, mit `180` nach links, mit `270` nach unten.
- **Mehr Futter:** Das Futter springt nach dem Fressen an eine neue Stelle, und das Spiel läuft weiter. Erst nach fünf Mal Fressen ist es gewonnen.
- **Eigene Idee:** Hindernisse, die man nicht berühren darf, ein kleineres Spielfeld, eine zweite Person mit den Tasten `w`, `a`, `s`, `d` …
:::

::::collapsible{title="Tipp: Mitzählen mit global"}

Für „Mehr Futter" muss das Spiel mitzählen. Eine Variable, die **außerhalb** einer Funktion angelegt wurde, kann die Funktion zwar lesen, aber nicht verändern. Damit sie es darf, schreibst du `global` davor:

```python
gefressen = 0


def schritt():
    global gefressen
    forward(5)
    if distance(futter) < 15:
        gefressen = gefressen + 1
        futter.goto(randint(-180, 180), randint(-180, 180))
    ...
```

::::

:::protect{password="turtle-4-tasten-4" description="Lösung für „Mehr Futter". Erfrage das Passwort bei deiner Lehrkraft."}

Die Funktion `schritt` wird ersetzt, darüber kommt die Zählvariable:

```python
gefressen = 0


def schritt():
    global gefressen
    forward(5)
    if distance(futter) < 15:
        gefressen = gefressen + 1
        futter.goto(randint(-180, 180), randint(-180, 180))

    if gefressen == 5:
        ende("Gewonnen!")
    elif am_rand():
        ende("Verloren!")
    else:
        ontimer(schritt, 50)
```

:::

---

## Selbsttest

::::multievent

**1. Warum steht in onkey(vor, "Up") hinter vor keine Klammer?**

{r1{Weil Funktionen ohne Parameter nie Klammern brauchen}}

{r1{!Weil die Funktion erst später, beim Tastendruck, aufgerufen werden soll}}

{r1{Weil Python die Klammer automatisch ergänzt}}

{h{Was passiert mit vor(), wenn Python die Zeile ausführt?}}
{H{Richtig! Mit Klammern würde die Funktion sofort aufgerufen.}}

**2. Wie viele Parameter braucht eine Funktion, die du an onscreenclick übergibst?**

{z{2}}

{h{Der Computer will dir mitteilen, wo geklickt wurde.}}
{H{Richtig! Einen für x und einen für y.}}

**3. Was bewirkt ontimer(schritt, 100)?**

{r2{schritt wird 100 Mal aufgerufen}}

{r2{!schritt wird einmal aufgerufen, nach 100 Millisekunden}}

{r2{schritt wird alle 100 Millisekunden aufgerufen, für immer}}

{h{Warum muss sich schritt selbst wieder mit ontimer aufrufen?}}
{H{Richtig! Für eine Wiederholung muss die Funktion ontimer erneut aufrufen.}}

**4. Die Turtle reagiert nicht auf die Pfeiltasten. Was hilft am ehesten?**

{r3{Das Programm noch einmal starten}}

{r3{!Einmal auf die Zeichenfläche klicken}}

{r3{onkey in eine Schleife schreiben}}

{h{Woher weiß der Browser, dass die Tasten für die Turtle gemeint sind?}}
{H{Richtig! Erst dann hört die Zeichenfläche auf die Tastatur.}}

::::
