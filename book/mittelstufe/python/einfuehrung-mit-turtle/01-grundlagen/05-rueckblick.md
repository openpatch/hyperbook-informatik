---
title: Rückblick
index: 5
---

# Rückblick

Vier Lektionen, und du kannst bereits rechnen lassen und zeichnen. Bevor es mit Variablen und Schleifen weitergeht, prüfe kurz, ob das Fundament trägt – alles Weitere baut darauf auf.

## Das kann ich jetzt

- [ ] Ich kann mit `print()` etwas ausgeben lassen. ([1.1](./01-vorbemerkungen))
- [ ] Ich kann mit `+`, `-`, `*`, `/` und `**` rechnen und weiß, dass Punkt vor Strich gilt. ([1.2](./02-grundrechenarten))
- [ ] Ich kann `/`, `//` und `%` auseinanderhalten. ([1.2](./02-grundrechenarten))
- [ ] Ich weiß, wozu ein Kommentar da ist und wie er geschrieben wird. ([1.1](./01-vorbemerkungen))
- [ ] Ich kann die Turtle bewegen und drehen. ([1.3](./03-erster-einsatz-der-turtle))
- [ ] Ich kann Farbe, Strichstärke und Geschwindigkeit einstellen. ([1.4](./04-weitere-funktionen-der-turtle))
- [ ] Ich kann den Stift anheben und die Turtle an eine bestimmte Stelle setzen. ([1.4](./04-weitere-funktionen-der-turtle))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Was wird ausgegeben?**

Schreib die Ausgaben **auf Papier** auf, bevor du das Programm laufen lässt.

```python
print(7 + 3 * 2)
print((7 + 3) * 2)
print(2 ** 5)
print(23 / 4)
print(23 // 4)
print(23 % 4)
print(5 // 2 + 5 % 2)
```

a) Notiere die sieben Ausgaben.

b) Zwei Zeilen liefern eine Zahl mit Komma, die anderen ganze Zahlen. Welche, und warum?

c) 100 Bonbons werden auf 7 Kinder verteilt. Welche Rechnung sagt, wie viele jedes Kind bekommt? Welche sagt, wie viele übrig bleiben?
:::

:::pyide{height="300px"}

```python
print(7 + 3 * 2)
print((7 + 3) * 2)
print(2 ** 5)
print(23 / 4)
print(23 // 4)
print(23 % 4)
print(5 // 2 + 5 % 2)
```

:::

:::protect{password="turtle-1-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
13
20
32
5.75
5
3
3
```

b) Nur `23 / 4` liefert `5.75`. Der einfache Schrägstrich ist die **normale** Division, und die kann ein Komma ergeben – auch dann, wenn es aufginge: `8 / 4` ist `2.0`, nicht `2`. Die letzte Zeile rechnet `2 + 1`, also 3.

c) `100 // 7` sagt, wie viele jedes Kind bekommt: **14**. `100 % 7` sagt, wie viele übrig bleiben: **2**. Die Probe: 14 · 7 + 2 = 100.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Was zeichnet die Turtle?**

```python
from turtle import *

shape("turtle")
speed(0)

pensize(5)
pencolor("blue")
forward(100)
right(90)
forward(100)

penup()
right(90)
forward(50)
pendown()

pencolor("red")
forward(100)
```

a) Zeichne auf Papier, was entsteht. Markiere, wo die Turtle startet und in welche Richtung sie schaut.

b) Wie viele Linien sind am Ende zu sehen? Wie viele Bewegungen macht die Turtle?

c) Welche Farbe hat die zweite Linie?

d) Nimm die Zeile `penup()` heraus. Was ändert sich?

e) Prüfe deine Zeichnung im Übungsbereich.
:::

::::collapsible{title="Tipp zu a)"}

Die Turtle startet in der Mitte und schaut nach **rechts**. `right(90)` dreht sie um eine Vierteldrehung im Uhrzeigersinn – aus „nach rechts" wird „nach unten".

Zeichne Schritt für Schritt und dreh dein Blatt dabei nicht mit.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)

pensize(5)
pencolor("blue")
forward(100)
right(90)
forward(100)

penup()
right(90)
forward(50)
pendown()

pencolor("red")
forward(100)
```

:::

:::protect{password="turtle-1-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Turtle startet in der Mitte und schaut nach rechts. Sie zeichnet eine **blaue** Linie nach rechts, dreht sich nach unten und zeichnet eine zweite blaue Linie nach unten. Dann dreht sie sich nach links, läuft **ohne zu zeichnen** 50 Pixel, setzt den Stift wieder auf und zeichnet eine **rote** Linie nach links.

b) Zu sehen sind **drei** Linien, aber die Turtle macht **vier** Bewegungen – die dritte ist unsichtbar, weil der Stift oben war.

c) Blau. Die Farbe gilt ab dem Befehl `pencolor` für alles Folgende, bis sie neu gesetzt wird. Erst vor der letzten Linie wird auf Rot umgestellt.

d) Ohne `penup()` wird auch die dritte Bewegung gezeichnet – und zwar noch in Blau, weil `pencolor("red")` erst danach kommt. Es sind dann vier sichtbare Linien statt drei.

**Merke:** `penup()` und `pendown()` gehören immer als Paar zusammen. Wer `pendown()` vergisst, wundert sich, warum ab dieser Stelle gar nichts mehr erscheint.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ein Haus mit Schornstein**

Zeichne dieses Haus – ohne Schleifen, die kommen erst im nächsten Kapitel.

- Der Grundriss ist ein Quadrat mit 120 Pixeln Kantenlänge, in Schwarz.
- Das Dach ist ein Dreieck darauf, in Rot.
- Rechts auf dem Dach sitzt ein Schornstein: eine kurze dicke Linie in Grau.

a) Überleg zuerst auf Papier, in welcher Reihenfolge du zeichnest und wo die Turtle nach jedem Teil steht.

b) Schreib das Programm.

c) Der Schornstein soll **nicht** mit dem Dach verbunden gezeichnet werden. Welche zwei Befehle brauchst du dafür?
:::

::::collapsible{title="Tipp 1: Die Reihenfolge"}

Zeichne von unten nach oben:

1. das Quadrat – vier Mal `forward` mit `right(90)` dazwischen,
2. dann bist du wieder am Startpunkt und schaust in die Anfangsrichtung,
3. für das Dach musst du erst an die obere linke Ecke.

::::

::::collapsible{title="Tipp 2: Das Dach"}

Ein Dach aus zwei gleich langen Schrägen ist ein gleichschenkliges Dreieck. Am einfachsten wird es mit einem **gleichseitigen** Dreieck: drei Seiten von 120 Pixeln und Drehungen um 120 Grad.

Achte auf die **Richtung**: Mit `right(120)` klappt das Dreieck nach unten ins Haus hinein. Damit die Spitze nach oben zeigt, musst du in die andere Richtung drehen.

::::

::::collapsible{title="Tipp 3: Ortswechsel"}

Zum Schornstein kommst du mit `penup()`, `goto(x, y)` und `pendown()`. Vergiss `setheading(90)` nicht, wenn die Turtle danach nach oben zeigen soll.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)

# Dein Haus:

```

:::

:::protect{password="turtle-1-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *

shape("turtle")
speed(0)
pensize(3)

# Quadrat
pencolor("black")
forward(120)
left(90)
forward(120)
left(90)
forward(120)
left(90)
forward(120)
left(90)

# an die obere linke Ecke
penup()
left(90)
forward(120)
right(90)
pendown()

# Dach
pencolor("red")
forward(120)
left(120)
forward(120)
left(120)
forward(120)

# Schornstein
penup()
goto(90, 172)
setheading(90)
pendown()
pencolor("gray")
pensize(12)
forward(45)
```

c) `penup()` und `pendown()`. Dazwischen bewegt sich die Turtle, ohne eine Spur zu hinterlassen – genau das braucht man immer dann, wenn ein neues Teil an anderer Stelle beginnt.

Deine Lösung darf anders aussehen. Prüfe sie an drei Fragen:

- Ist das Quadrat wirklich geschlossen, oder klafft an einer Ecke eine Lücke?
- Stimmt die Summe der Drehungen? Bei einem geschlossenen Weg sind es immer 360 Grad.
- Steht die Turtle nach jedem Teil dort, wo du sie erwartest? Wenn nicht, hilft `goto` statt Nachrechnen.

:::

---

## Selbsttest

::::multievent

**1. Was gibt print von 2 hoch 5 aus?**

{z{32}}

{h{Zwei Sternchen bedeuten potenzieren.}}
{H{Richtig.}}

**2. Was ergibt 23 geteilt durch 4 mit doppeltem Schrägstrich?**

{z{5}}

{h{Der doppelte Schrägstrich liefert nur den ganzzahligen Anteil.}}
{H{Richtig – der Rest 3 fällt weg.}}

**3. Was ergibt 23 modulo 4?**

{z{3}}

{h{Modulo liefert das, was bei der Ganzzahldivision übrig bleibt.}}
{H{Richtig.}}

**4. Womit macht man die Turtle-Befehle überhaupt verfügbar?**

{r1{mit shape turtle}}

{r1{!mit der import-Zeile ganz am Anfang des Programms}}

{r1{mit speed 0}}

{r1{gar nicht, sie sind immer da}}

{h{Ohne diese eine Zeile kennt Python weder forward noch right.}}
{H{Richtig – sie gehört an den Anfang jedes Turtle-Programms.}}

**5. Was bewirkt penup?**

{r2{Die Turtle wird schneller.}}

{r2{!Die Turtle bewegt sich, ohne zu zeichnen.}}

{r2{Die Turtle dreht sich nach oben.}}

{r2{Die Zeichnung wird gelöscht.}}

{h{Stell dir vor, du hebst einen Stift vom Papier ab.}}
{H{Richtig – und mit pendown setzt du ihn wieder auf.}}

**6. In welche Richtung schaut die Turtle am Anfang?**

{r3{nach oben}}

{r3{!nach rechts}}

{r3{nach unten}}

{r3{nach links}}

{h{Probier es aus: ein einzelnes forward genügt.}}
{H{Richtig.}}

**7. Was ist ein Kommentar?**

{r4{eine Anweisung, die Python zuletzt ausführt}}

{r4{!Text hinter einem Doppelkreuz, den Python ignoriert}}

{r4{eine Ausgabe auf dem Bildschirm}}

{r4{ein Fehler im Programm}}

{h{Er ist nur für Menschen gedacht.}}
{H{Richtig.}}

::::
