---
title: Vorbemerkungen
index: 1
---

# Vorbemerkungen

In diesem Lernpfad wirst du zwei Kategorien von Programmen kennenlernen:

- **Gewöhnliche Programme** in Python, die etwas berechnen und ausgeben, und
- **Turtle-Programme**, in denen etwas gezeichnet wird.

Du erkennst den Unterschied sofort: Turtle-Programme beginnen mit der Zeile `from turtle import *` und haben neben der Ausgabe zusätzlich einen Reiter **Canvas**, auf dem gezeichnet wird.

:::snippet{#aufgabe}
Führe die beiden folgenden Programme aus und beobachte, was passiert.

Formuliere dann Vermutungen darüber, was die einzelnen Anweisungen bedeuten. Halte deine Vermutungen unten fest.
:::

## Ein gewöhnliches Programm

:::pyide

```python
# Addition
print(10 + 5)
```

:::

## Ein Turtle-Programm

Klicke nach dem Ausführen auf den Reiter **Canvas**, um der Turtle zuzusehen.

:::pyide{canvas height="500px"}

```python
from turtle import *

screensize(250, 250)

forward(100)
right(90)
forward(100)
```

:::

::textinput{placeholder="Meine Vermutungen: forward(100) bedeutet vermutlich ..."}

## Was du ausprobieren solltest

:::snippet{#aufgabe}
Verändere im Turtle-Programm einzelne Zahlen und führe es erneut aus:

a) Setze bei `forward` statt `100` einmal `200` und einmal `30` ein.

b) Setze bei `right` statt `90` einmal `45` und einmal `120` ein.

c) Tausche `right` gegen `left`.

Beschreibe, was sich jeweils ändert.
:::

::::collapsible{title="Tipp: Ich sehe die Zeichnung gar nicht"}

Nach dem Klick auf **Ausführen** wird zunächst die Textausgabe angezeigt. Klicke auf den Reiter **Canvas**, dann siehst du die Zeichenfläche.

::::

---

## Selbsttest

::::multievent

**1. Woran erkennst du ein Turtle-Programm?**

{r1{Es enthält den Befehl print}}

{r1{!Es beginnt mit from turtle import *}}

{r1{Es enthält eine Zahl}}

{h{Schau dir noch einmal die erste Zeile des zweiten Beispiels an.}}
{H{Genau! Erst durch diese Zeile stehen die Turtle-Befehle zur Verfügung.}}

**2. Was bewirkt print(10 + 5)?**

{r2{Die Turtle geht 15 Schritte vorwärts}}

{r2{!Es wird die Zahl 15 ausgegeben}}

{r2{Es wird der Text 10 + 5 ausgegeben}}

{h{Python rechnet zuerst und gibt dann das Ergebnis aus.}}
{H{Richtig! Python rechnet erst und gibt das Ergebnis 15 aus.}}

**3. Was bewirkt right(90)?**

{r3{Die Turtle geht 90 Pixel nach rechts}}

{r3{!Die Turtle dreht sich um 90 Grad nach rechts}}

{r3{Die Turtle springt an die Position 90}}

{h{Die Turtle bewegt sich bei diesem Befehl nicht von der Stelle.}}
{H{Richtig! right und left drehen die Turtle nur, sie bewegen sie nicht.}}

::::
