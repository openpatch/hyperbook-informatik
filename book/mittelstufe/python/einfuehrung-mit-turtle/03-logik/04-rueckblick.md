---
title: Rückblick
index: 4
---

# Rückblick

Logik ist der Teil der Programmierung, der sich am ehesten wie Mathematik anfühlt – und der am seltensten ausprobiert wird. Dabei lässt sich jede Behauptung über einen logischen Ausdruck in Sekunden prüfen: einfach ausgeben lassen.

## Das kann ich jetzt

- [ ] Ich kann `and`, `or` und `not` anwenden und ihre Bedeutung erklären. ([3.1](./01-logische-verknuepfungen))
- [ ] Ich weiß, dass ein Vergleich einen **Wahrheitswert** liefert, und kann mit `True` und `False` arbeiten. ([3.2](./02-boolesche-werte))
- [ ] Ich kann eine **Wahrheitstafel** aufstellen. ([3.2](./02-boolesche-werte))
- [ ] Ich kenne die Vorfahrtsregeln: `not` vor `and` vor `or`. ([3.3](./03-vorfahrtsregeln))
- [ ] Ich kann einen logischen Ausdruck durch Klammern eindeutig machen. ([3.3](./03-vorfahrtsregeln))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Vorfahrt beachten**

Bestimme für jeden Ausdruck den Wert. Schreib dazu, in welcher **Reihenfolge** ausgewertet wird – setz dazu die Klammern, die Python sich denkt.

```python
print(not True and False or True)
print(not (True and False) or False)
print(True or False and False)
print((True or False) and False)
```

a) Notiere die vier Ergebnisse und die gedachten Klammern.

b) Die dritte und die vierte Zeile unterscheiden sich nur durch die Klammern und liefern trotzdem verschiedene Werte. Erkläre.

c) Prüfe deine Antworten im Übungsbereich.

d) Formuliere die Vorfahrtsregel in einem Satz und vergleiche sie mit der Regel „Punkt vor Strich".
:::

:::pyide{height="300px"}

```python
print(not True and False or True)
print(not (True and False) or False)
print(True or False and False)
print((True or False) and False)
```

:::

:::protect{password="turtle-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Ausdruck | gedachte Klammern | Wert |
| --- | --- | --- |
| `not True and False or True` | `((not True) and False) or True` | `True` |
| `not (True and False) or False` | `(not (True and False)) or False` | `True` |
| `True or False and False` | `True or (False and False)` | `True` |
| `(True or False) and False` | – | `False` |

b) Ohne Klammern bindet `and` **stärker** als `or`. Der dritte Ausdruck heißt also „True oder (False und False)" – und weil links schon `True` steht, ist das Ganze wahr. Mit Klammern wird zuerst `(True or False)` zu `True` ausgewertet, und dann steht dort „True und False", also falsch.

c) und d) Die Regel lautet: **`not` geht vor `and`, `and` geht vor `or`.** Das entspricht genau „Punkt vor Strich": `and` verhält sich wie Mal, `or` wie Plus. Und wie in der Mathematik gilt: Wo beides vorkommt, macht man es mit Klammern eindeutig – auch dann, wenn man die Regel kennt. Wer den Ausdruck später liest, kennt sie vielleicht nicht.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Bedingungen formulieren**

Schreib für jede Situation eine Bedingung in Python. Benutze die Variablen `alter`, `hat_ticket`, `regen` und `wochentag`.

a) Jemand darf hinein, wenn er mindestens 16 ist **und** ein Ticket hat.

b) Jemand darf hinein, wenn er mindestens 16 ist **oder** ein Ticket hat.

c) Es wird gespielt, wenn es **nicht** regnet.

d) Es wird gespielt, wenn es nicht regnet und der Wochentag weder Samstag noch Sonntag ist.

e) Jemand zahlt den ermäßigten Preis, wenn er jünger als 14 **oder** älter als 64 ist.

f) Schreib zu d) eine zweite, gleichwertige Fassung, bei der das `not` an einer anderen Stelle steht.
:::

::::collapsible{title="Tipp zu f)"}

„Nicht Samstag und nicht Sonntag" ist dasselbe wie „nicht (Samstag oder Sonntag)". Probier beide Fassungen mit allen Wochentagen durch – sie liefern immer denselben Wert.

::::

:::protect{password="turtle-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
# a)
alter >= 16 and hat_ticket

# b)
alter >= 16 or hat_ticket

# c)
not regen

# d)
not regen and wochentag != "Samstag" and wochentag != "Sonntag"

# e)
alter < 14 or alter > 64

# f)
not regen and not (wochentag == "Samstag" or wochentag == "Sonntag")
```

Zu c): `not regen` genügt. Ein Anfängerfehler wäre `regen == False` – das ist zwar richtig, aber umständlich. `regen` **ist** schon ein Wahrheitswert; man muss ihn nicht erst mit einem vergleichen.

Zu f): Die beiden Fassungen sind gleichwertig. Das ist kein Zufall, sondern eine Regel: Aus „nicht A und nicht B" wird „nicht (A oder B)" und umgekehrt. Wer sie kennt, kann verschachtelte Bedingungen umformen, bis sie lesbar sind.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Wahrheitstafel und Turtle**

a) Stell die vollständige Wahrheitstafel für `a and not b` auf. Wie viele Zeilen hat sie?

b) Wie viele Zeilen hätte eine Tafel mit **drei** Variablen? Begründe.

c) Schreib ein Turtle-Programm, das eine Ampel zeichnet: drei Kreise untereinander. Welche Farbe leuchtet, steuerst du mit zwei Wahrheitswerten `frei` und `warnung`:

- `frei` wahr und `warnung` falsch → grün leuchtet,
- `warnung` wahr → gelb leuchtet,
- sonst → rot leuchtet.

Die nicht leuchtenden Lampen bleiben grau.
:::

::::collapsible{title="Tipp 1: Die Kreise"}

`circle(30)` zeichnet einen Kreis mit Radius 30. Damit die drei untereinander sitzen, setzt du die Turtle jeweils mit `penup()`, `goto(...)` und `pendown()` an die richtige Stelle.

Gefüllt wird mit `begin_fill()` vor und `end_fill()` nach dem Kreis; die Füllfarbe legt `fillcolor("green")` fest.

::::

::::collapsible{title="Tipp 2: Die Bedingungen"}

Leg die drei Farben zuerst in Variablen fest und zeichne erst danach:

```python
farbe_oben = "gray"
farbe_mitte = "gray"
farbe_unten = "gray"

if frei and not warnung:
    farbe_unten = "green"
elif warnung:
    farbe_mitte = "yellow"
else:
    farbe_oben = "red"
```

So steht die Entscheidung an einer Stelle und das Zeichnen an einer anderen – das ist auch bei größeren Programmen die richtige Aufteilung.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)

frei = True
warnung = False

# Deine Ampel:

```

:::

:::protect{password="turtle-3-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zwei Variablen ergeben **vier** Zeilen:

| a | b | not b | a and not b |
| --- | --- | --- | --- |
| False | False | True | False |
| False | True | False | False |
| True | False | True | **True** |
| True | True | False | False |

b) **Acht.** Jede zusätzliche Variable verdoppelt die Zeilenzahl, weil sie jede bisherige Zeile in zwei aufspaltet: 2, 4, 8, 16 – allgemein 2 hoch der Zahl der Variablen.

c)

```python
from turtle import *

shape("turtle")
speed(0)

frei = True
warnung = False

farbe_oben = "gray"
farbe_mitte = "gray"
farbe_unten = "gray"

if frei and not warnung:
    farbe_unten = "green"
elif warnung:
    farbe_mitte = "yellow"
else:
    farbe_oben = "red"

penup()
goto(0, 100)
pendown()
fillcolor(farbe_oben)
begin_fill()
circle(30)
end_fill()

penup()
goto(0, 20)
pendown()
fillcolor(farbe_mitte)
begin_fill()
circle(30)
end_fill()

penup()
goto(0, -60)
pendown()
fillcolor(farbe_unten)
begin_fill()
circle(30)
end_fill()
```

Dir wird auffallen, dass derselbe Block dreimal dasteht – nur `y` und die Farbe ändern sich. Genau dafür gibt es **Funktionen**, und die sind das Thema des [nächsten Kapitels](../04-funktionen). Danach schrumpft dieses Programm auf ein Drittel.

Probier die drei Fälle durch, indem du `frei` und `warnung` änderst. Beachte, dass bei `warnung = True` immer Gelb leuchtet, egal was `frei` sagt: Der `elif`-Zweig wird nur erreicht, wenn die erste Bedingung falsch war, und wenn `warnung` wahr ist, ist sie das immer.

:::

---

## Selbsttest

::::multievent

**1. Wann ist ein Ausdruck mit and wahr?**

{r1{wenn mindestens eine Seite wahr ist}}

{r1{!wenn beide Seiten wahr sind}}

{r1{wenn beide Seiten falsch sind}}

{r1{immer}}

{h{Das deutsche Wort dafür ist und.}}
{H{Richtig.}}

**2. Was liefert ein Vergleich wie 5 größer 3 zurück?**

{r2{die Zahl 1}}

{r2{!einen Wahrheitswert}}

{r2{einen Text}}

{r2{nichts}}

{h{Es gibt genau zwei mögliche Ergebnisse.}}
{H{Richtig – True oder False.}}

**3. Welche Verknüpfung bindet am stärksten?**

{r3{and}}

{r3{or}}

{r3{!not}}

{r3{alle gleich stark}}

{h{Es ist die, die nur eine Seite hat.}}
{H{Richtig – danach kommt and, zuletzt or.}}

**4. Wie viele Zeilen hat die Wahrheitstafel für drei Variablen?**

{z{8}}

{h{Jede zusätzliche Variable verdoppelt die Zeilenzahl.}}
{H{Richtig – zwei hoch drei.}}

**5. Wie schreibt man am besten, dass es nicht regnet?**

{r4{regen gleich gleich False}}

{r4{!not regen}}

{r4{regen ungleich True}}

{r4{not regen gleich gleich True}}

{h{Die Variable ist bereits ein Wahrheitswert.}}
{H{Richtig – ein Vergleich mit True ist überflüssig.}}

**6. Welcher Ausdruck ist gleichwertig zu nicht A und nicht B?**

{r5{nicht Klammer auf A und B Klammer zu}}

{r5{!nicht Klammer auf A oder B Klammer zu}}

{r5{A oder B}}

{r5{A und B}}

{h{Prüf es mit einer Wahrheitstafel für alle vier Fälle nach.}}
{H{Richtig.}}

**7. Warum setzt man Klammern, auch wenn man die Vorfahrtsregeln kennt?**

{r6{Weil Python es verlangt.}}

{r6{!Weil der Ausdruck dadurch für alle eindeutig lesbar wird.}}

{r6{Weil er dann schneller ausgewertet wird.}}

{r6{Man setzt keine.}}

{h{Wer liest das Programm in einem halben Jahr?}}
{H{Richtig.}}

::::
