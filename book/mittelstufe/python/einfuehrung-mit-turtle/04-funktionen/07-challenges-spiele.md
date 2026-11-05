---
title: Challenge – Spiele aus Funktionen
index: 7
permaid: turtle-challenges-spiele-funktionen
---

# Challenge: Spiele aus Funktionen

Diese Seite ist die **Alternative** zu [Kunst aus Funktionen](./06-challenges-funktionen). Beide brauchen dasselbe: eigene Funktionen mit Parametern und Rückgabewerten. Beide sind freiwillig. Such dir aus, was dich mehr reizt – oder mach beides.

Hier baust du kleine Spiele mit der Turtle. Was du dafür brauchst, kennst du aus [Tastatur und Maus](./04-tastatur-und-maus): `onkey`, `onscreenclick` und `ontimer`.

## Ein Spiel aus Funktionen

:::snippet{#merken}
Ein Turtle-Spiel besteht aus lauter kleinen Funktionen. Jede hat genau eine Aufgabe:

- **Reaktionen** – Funktionen, die bei einem Ereignis aufgerufen werden: `links()` bei einer Taste, `treffer(x, y)` bei einem Klick.
- **Der Takt** – eine Funktion `schritt()`, die sich mit `ontimer` immer wieder selbst aufruft. Sie bewegt alles ein kleines Stück weiter.
- **Fragen** – Funktionen mit Rückgabewert, die den Spielstand prüfen: `am_rand(spieler)` liefert `True` oder `False`.

Du rufst fast keine davon selbst auf. Das übernehmen die Ereignisse.
:::

## So arbeitest du mit einer Challenge

:::snippet{#challenge}
Eine Challenge ist keine normale Aufgabe:

- Es gibt **kein fertiges Spiel**, das du nachbauen musst. Die Programme hier sind Startpunkte, keine Vorlagen.
- Es gibt **keine Lösung** zum Nachschlagen. Es gibt nur deine eigenen Spiele.
- Dafür gibt es eine **Regel**, an die du dich halten solltest. Genau die Einschränkung macht es interessant.

Fertig bist du, wenn jemand dein Spiel spielen will.
:::

:::snippet{#merken}
**Mehrere Turtles.** In jedem Spiel hier gibt es mehrere Figuren. Jede Figur ist eine eigene Turtle:

```python
stein = Turtle()
stein.shape("circle")
stein.goto(0, 100)
```

Der Name vor dem Punkt sagt, **welche** Turtle den Befehl ausführen soll.

Eine Turtle kann man auch als **Argument** an eine Funktion übergeben. `fallen(stein)` lässt genau diesen Stein fallen, `fallen(fels)` einen anderen. Und eine Funktion kann eine neue Turtle mit `return` **zurückgeben** – das macht in allen Programmen hier die Funktion `figur`.
:::

:::snippet{#brain}
**Der Spielstand steckt in den Turtles.** Eine Funktion kann eine Variable von außen nicht einfach verändern. In diesen Spielen ist das kein Problem: Wo eine Figur steht, wohin sie schaut, wie weit eine Punkte-Turtle schon gelaufen ist – all das merken sich die Turtles selbst. Die Spiele fragen es mit `xcor()`, `ycor()` und `distance()` ab.

Und denk daran: Die Zeichenfläche hört erst auf die Tastatur, wenn du sie einmal **angeklickt** hast.
:::

## Challenge 1: Fang die Turtle

Die Turtle springt herum. Klick sie an, bevor sie wieder weg ist. Jeder Treffer setzt oben einen Punkt auf die Punkteleiste.

:::snippet{#challenge}
**Die Regel:** Keine Variable darf ihren Wert ändern. Den Spielstand liest das Spiel an den Turtles ab.

a) Spiel ein paar Runden. Finde heraus, welche Funktion bei welchem Ereignis aufgerufen wird.

b) Dreh an den Reglern. Ab welcher `SPRUNGZEIT` wird das Spiel unfair?

c) Die Funktion `punkte()` gibt es schon, sie wird aber nirgends benutzt. Sorge dafür, dass das Spiel bei **10 Punkten** gewonnen ist.

d) Das Spiel soll **schneller** werden, je mehr Punkte man hat. Auch das geht mit `punkte()`.

e) **Der Wettbewerb:** Erfinde eine Regel, die einen Fehlklick bestraft. Wer in eurer Klasse baut die gemeinste?
:::

:::pyide{canvas height="650px"}

```python
from turtle import *
from random import randint

hideturtle()
speed(0)

# --- Die Regler ---
SPRUNGZEIT = 1000   # Millisekunden bis zum nächsten Sprung
GROESSE = 2         # wie groß die Turtle ist
RAND = 200          # wie weit sie springen darf
ABSTAND = 20        # Abstand der Punkte auf der Punkteleiste


# --- Die Figuren ---
def figur(form, farbe, x, y):
    neu = Turtle()
    neu.speed(0)
    neu.penup()
    neu.shape(form)
    neu.color(farbe)
    neu.goto(x, y)
    return neu


ziel = figur("turtle", "green", 0, 0)
ziel.shapesize(GROESSE)
leiste = figur("circle", "orange", -RAND, RAND + 30)
leiste.hideturtle()


# --- Die Regeln ---
def punkte():
    return round((leiste.xcor() + RAND) / ABSTAND)


def neuer_platz():
    ziel.goto(randint(-RAND, RAND), randint(-RAND, RAND))


def springen():
    neuer_platz()
    ontimer(springen, SPRUNGZEIT)


def treffer(x, y):
    leiste.dot(15)
    leiste.forward(ABSTAND)
    neuer_platz()


ziel.onclick(treffer)
springen()
```

:::

::::collapsible{title="Tipp 1: Wie zählt die Punkteleiste?"}

Die Turtle `leiste` startet bei x = -200. Bei jedem Treffer setzt sie einen Punkt und läuft 20 Schritte weiter. Nach drei Treffern steht sie also bei -200 + 3 · 20 = -140.

`punkte()` rechnet das zurück: (-140 + 200) / 20 = 3. Die Turtle **ist** der Zähler.

::::

::::collapsible{title="Tipp 2: Wann ist das Spiel vorbei?"}

Das Spiel läuft nur weiter, solange `springen` sich selbst wieder mit `ontimer` aufruft. Prüfe dort mit `punkte()`, ob es Zeit zum Aufhören ist – und ruf `ontimer` dann einfach nicht mehr auf.

Damit nach dem Sieg kein Klick mehr zählt, meldest du `treffer` wieder ab:

```python
ziel.onclick(None)
```

::::

::::collapsible{title="Tipp 3: Schneller werden"}

Die Wartezeit in `ontimer` muss keine feste Zahl sein. Sie darf auch ausgerechnet werden:

```python
ontimer(springen, SPRUNGZEIT - punkte() * 50)
```

Was passiert bei 20 Punkten? Überleg dir, ob du eine Untergrenze brauchst.

::::

::::collapsible{title="Tipp 4: Fehlklicks"}

Mit `onscreenclick` reagiert das Spiel auf **jeden** Klick auf die Zeichenfläche – auch auf die daneben. Eine zweite Punkteleiste für Fehlklicks wäre eine Idee. Eine Leiste, die rückwärts läuft, eine andere.

Achtung: Ein Klick **auf** die Turtle löst beide Funktionen aus, erst `treffer` und dann die für die Zeichenfläche. Ob ein Klick daneben ging, verrät der Abstand: `ziel.distance(x, y)`.

::::

## Challenge 2: Steinschlag

Von oben fallen Steine. Weiche ihnen mit den Pfeiltasten aus. Gestartet wird mit einem Klick auf die Zeichenfläche.

:::snippet{#challenge}
**Die Regel:** Die Funktionen `fallen(stein)` und `getroffen(stein)` darfst du nicht verändern. Du darfst nur neue Turtles anlegen und die Funktionen öfter aufrufen.

a) Spiel ein paar Runden und dreh an den Reglern.

b) Die Funktion `fallen` hat einen Parameter `stein`. Erkläre, warum das schlauer ist als eine Funktion, die immer denselben Stein fallen lässt.

c) Lass **drei** Steine gleichzeitig fallen. Halte dich dabei an die Regel.

d) Mach einen der Steine **schneller** als die anderen – ohne `fallen` zu verändern.

e) Ab hier gilt die Regel nicht mehr: Ändere `fallen` so, dass jeder Stein, der unten ankommt, einen **Punkt** auf eine Punkteleiste setzt, wie in Challenge 1.
:::

:::pyide{canvas height="650px"}

```python
from turtle import *
from random import randint

hideturtle()
speed(0)

# --- Die Regler ---
TAKT = 30        # Millisekunden zwischen zwei Schritten
TEMPO = 6        # wie weit ein Stein pro Schritt fällt
SCHRITT = 25     # wie weit die Spielfigur pro Tastendruck geht
TREFFER = 20     # ab diesem Abstand gilt ein Stein als Treffer
RAND = 200


# --- Die Figuren ---
def figur(form, farbe, x, y):
    neu = Turtle()
    neu.speed(0)
    neu.penup()
    neu.shape(form)
    neu.color(farbe)
    neu.goto(x, y)
    return neu


def spielfeld():
    penup()
    goto(-RAND, -RAND)
    pendown()
    for i in range(4):
        forward(2 * RAND)
        left(90)
    penup()


def ende(text):
    goto(0, 0)
    write(text, align="center", font=("Arial", 24, "bold"))


spielfeld()
spieler = figur("turtle", "green", 0, -RAND + 15)
spieler.setheading(90)
stein = figur("circle", "gray", randint(-RAND, RAND), RAND)
stein.setheading(270)


# --- Die Regeln ---
def links():
    if spieler.xcor() > -RAND + SCHRITT:
        spieler.goto(spieler.xcor() - SCHRITT, spieler.ycor())


def rechts():
    if spieler.xcor() < RAND - SCHRITT:
        spieler.goto(spieler.xcor() + SCHRITT, spieler.ycor())


def fallen(stein):
    stein.forward(TEMPO)
    if stein.ycor() < -RAND:
        stein.goto(randint(-RAND, RAND), RAND)


def getroffen(stein):
    return spieler.distance(stein) < TREFFER


def schritt():
    fallen(stein)
    if getroffen(stein):
        ende("Getroffen!")
    else:
        ontimer(schritt, TAKT)


def start(x, y):
    onscreenclick(None)
    schritt()


onkey(links, "Left")
onkey(rechts, "Right")
listen()
onscreenclick(start)
```

:::

::::collapsible{title="Tipp 1: Ein zweiter Stein"}

Ein neuer Stein ist eine neue Turtle – angelegt genau wie der erste:

```python
fels = figur("circle", "gray", randint(-RAND, RAND), RAND)
fels.setheading(270)
```

In `schritt` musst du ihn dann fallen lassen **und** prüfen, ob er trifft. Für die Prüfung brauchst du `or`.

::::

::::collapsible{title="Tipp 2: Alle Steine starten gleichzeitig"}

Wenn alle Steine oben am Rand starten, fallen sie wie eine Wand. Gib ihnen unterschiedliche Startpositionen auf der y-Achse, dann kommen sie versetzt.

::::

::::collapsible{title="Tipp 3: Schneller, ohne fallen zu ändern"}

Was passiert, wenn du für einen Stein `fallen` in `schritt` **zweimal** aufrufst?

::::

## Challenge 3: Zu zweit

Zwei Turtles, eine Tastatur, ein Futter. Grün lenkt mit `a` und `d`, Rot mit den Pfeiltasten. Wer das Futter erwischt, bekommt einen Punkt, und das Futter springt weiter. Wer den Rand berührt, hat verloren.

:::snippet{#challenge}
**Die Regel:** Für beide Turtles gibt es dieselben Funktionen. Keine Funktion darf nur für Grün oder nur für Rot da sein – außer den vier für die Tasten.

a) Spielt zu zweit ein paar Runden.

b) Für die Tasten gibt es vier Funktionen, für alles andere nur je eine. Erkläre, warum das bei den Tasten nicht anders geht.

c) Schreibe eine Funktion `punkte(leiste)` mit Rückgabewert, wie in Challenge 1. Wer zuerst **5 Punkte** hat, gewinnt.

d) Erfinde eine Regel, die das Spiel spannender macht: ein zweites Futter, eine Turtle, die schneller wird, wenn sie frisst, ein Hindernis in der Mitte …

e) **Für drei:** Bau eine dritte Turtle ein. Wie viele Zeilen musst du dafür schreiben? Wie viele wären es ohne die Regel gewesen?
:::

:::pyide{canvas height="650px"}

```python
from turtle import *
from random import randint

hideturtle()
speed(0)

# --- Die Regler ---
TAKT = 40        # Millisekunden zwischen zwei Schritten
TEMPO = 4        # wie weit eine Turtle pro Schritt läuft
DREHUNG = 30     # wie weit eine Turtle pro Tastendruck dreht
RAND = 200
ABSTAND = 20


# --- Die Figuren ---
def figur(form, farbe, x, y):
    neu = Turtle()
    neu.speed(0)
    neu.penup()
    neu.shape(form)
    neu.color(farbe)
    neu.goto(x, y)
    return neu


def spielfeld():
    penup()
    goto(-RAND, -RAND)
    pendown()
    for i in range(4):
        forward(2 * RAND)
        left(90)
    penup()


def ende(text):
    goto(0, 0)
    write(text, align="center", font=("Arial", 24, "bold"))


spielfeld()
gruen = figur("turtle", "green", -100, 0)
rot = figur("turtle", "red", 100, 0)
rot.setheading(180)
futter = figur("circle", "orange", 0, 100)

leiste_gruen = figur("circle", "green", -RAND, RAND + 30)
leiste_gruen.hideturtle()
leiste_rot = figur("circle", "red", RAND, RAND + 30)
leiste_rot.setheading(180)
leiste_rot.hideturtle()


# --- Die Tasten ---
def gruen_links():
    gruen.left(DREHUNG)


def gruen_rechts():
    gruen.right(DREHUNG)


def rot_links():
    rot.left(DREHUNG)


def rot_rechts():
    rot.right(DREHUNG)


# --- Die Regeln ---
def am_rand(spieler):
    x = spieler.xcor()
    y = spieler.ycor()
    return x > RAND or x < -RAND or y > RAND or y < -RAND


def fressen(spieler, leiste):
    if spieler.distance(futter) < 15:
        leiste.dot(15)
        leiste.forward(ABSTAND)
        futter.goto(randint(-RAND + 20, RAND - 20), randint(-RAND + 20, RAND - 20))


def schritt():
    gruen.forward(TEMPO)
    rot.forward(TEMPO)
    fressen(gruen, leiste_gruen)
    fressen(rot, leiste_rot)

    if am_rand(gruen):
        ende("Rot gewinnt!")
    elif am_rand(rot):
        ende("Grün gewinnt!")
    else:
        ontimer(schritt, TAKT)


def start(x, y):
    onscreenclick(None)
    schritt()


onkey(gruen_links, "a")
onkey(gruen_rechts, "d")
onkey(rot_links, "Left")
onkey(rot_rechts, "Right")
listen()
onscreenclick(start)
```

:::

::::collapsible{title="Tipp 1: Warum vier Tastenfunktionen?"}

`onkey` ruft die Funktion **ohne Argumente** auf. Eine Funktion `drehen(spieler)` könnte `onkey` also gar nicht benutzen – woher sollte es wissen, welche Turtle gemeint ist?

Die vier kleinen Funktionen sind deshalb nur **Vermittler**: Sie wissen, welche Turtle zu ihrer Taste gehört.

::::

::::collapsible{title="Tipp 2: Zwei Leisten, eine Funktion"}

`leiste_rot` läuft nach links, weil sie mit `setheading(180)` umgedreht wurde. Für `punkte(leiste)` reicht dann nicht mehr die x-Koordinate allein.

Ein Weg, der für beide funktioniert: Wie weit ist die Leiste von ihrem Startpunkt entfernt? Den Abstand zu einem Punkt liefert `leiste.distance(x, y)`.

::::

::::collapsible{title="Tipp 3: Wenn beide gleichzeitig am Rand sind"}

Dann gewinnt im Moment Rot, weil `am_rand(gruen)` zuerst geprüft wird. Ist das fair? Wenn nicht: Wie müsste die Verzweigung aussehen, damit es ein Unentschieden gibt?

::::

## Dein Spiel

:::snippet{#challenge}
Zum Abschluss: Bau aus einer der Challenges **dein eigenes** Spiel.

1. Schreib zuerst die **Regeln** auf, in ganzen Sätzen. Was steuert man? Wann gibt es Punkte? Wann ist es vorbei?
2. Mach dir für jede Regel eine Funktion. Gib ihr einen Namen, der die Regel verrät: `getroffen`, `am_rand`, `fressen`.
3. Gib dein Spiel jemand anderem – **ohne** die Regeln dazuzusagen.
4. Kann die Person die Regeln allein herausfinden?
:::

:::pyide{canvas height="650px"}

```python
from turtle import *
from random import randint

hideturtle()
speed(0)

# --- Die Regler ---


# --- Die Figuren ---
def figur(form, farbe, x, y):
    neu = Turtle()
    neu.speed(0)
    neu.penup()
    neu.shape(form)
    neu.color(farbe)
    neu.goto(x, y)
    return neu


# --- Die Regeln ---

```

:::

:::snippet{#brain}
Schau dir am Ende die Namen deiner Funktionen an. Wenn man aus ihnen allein schon die Spielregeln vorlesen kann, hast du gut gebaut.

Genau das ist auf der [Kunstseite](./06-challenges-funktionen) dieselbe Idee: Dort wird ein Motiv einmal definiert und oft gestempelt. Hier wird eine Regel einmal definiert und für jede Figur benutzt.
:::

---

Auch hier gibt es keinen Selbsttest. Fertig bist du, wenn jemand dein Spiel spielen will.
