---
title: Rückblick
index: 4
permaid: turtle-farben-rueckblick
---

# Rückblick

Farben und Zufall sind keine Programmierthemen – und doch zwei der wichtigsten Werkzeuge in diesem Lernpfad. Was du hier gelernt hast, brauchst du in jeder Challenge und jedem Projekt.

## Das kannst du jetzt

- [ ] Ich kann Farben als **Hexadezimalwert** angeben und weiß, wie `#d1495b` aufgebaut ist. ([6.1](./01-farben-mischen))
- [ ] Ich kenne den Unterschied zwischen **grellen** Farbnamen und **gedämpften** Hexadezimalwerten. ([6.1](./01-farben-mischen))
- [ ] Ich kann eine **Palette** aus drei bis fünf Farben zusammenstellen. ([6.1](./01-farben-mischen))
- [ ] Ich kenne **Komplementär-** und **analoge Farben** als zwei Arten von Farbkombinationen. ([6.1](./01-farben-mischen))
- [ ] Ich kann einen **Farbverlauf** mit `colormode(255)` und RGB-Werten berechnen. ([6.1](./01-farben-mischen))
- [ ] Ich kann `seed` einsetzen, um Zufallsbilder **reproduzierbar** zu machen. ([6.2](./02-zufall-und-seed))
- [ ] Ich kenne den Unterschied zwischen `randint`, `random()`, `uniform` und `choice`. ([6.3](./03-random-noise))
- [ ] Ich kann **Noise** erzeugen: Punkte-Noise, Dichte-Variation, Farb-Rauschen und Verlauf-Noise. ([6.3](./03-random-noise))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Hexadezimalwerte lesen**

Gib für jeden Wert an, welche Farbe am stärksten vertreten ist und ob die Farbe eher hell oder dunkel ist.

- a) `#ff0000`
- b) `#00ff00`
- c) `#0000ff`
- d) `#ffffff`
- e) `#000000`
- f) `#d1495b`
- g) `#30638e`
:::

:::protect{password="turtle-6-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Wert | stärkster Anteil | Helligkeit |
| --- | --- | --- |
| `#ff0000` | Rot (voll) | sehr hell (nur eine Komponente, aber voll) |
| `#00ff00` | Grün (voll) | sehr hell |
| `#0000ff` | Blau (voll) | sehr hell |
| `#ffffff` | alle drei (voll) | Weiß – am hellsten |
| `#000000` | keine | Schwarz – am dunkelsten |
| `#d1495b` | Rot (209) | gedämpft – alle drei Anteile vorhanden |
| `#30638e` | Blau (142) | gedämpft – dunkler als reines Blau |

Die Faustregel: Je mehr Anteile „voll" sind, desto heller. Je mehr Anteile gemischt sind (nicht nur eine Farbe voll, die anderen null), desto gedämpfter.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Eine eigene Palette**

Gehe auf [coolors.co](https://coolors.co/) und erstelle eine Palette mit fünf Farben. Zeichne damit:

- a) fünf Punkte nebeneinander,
- b) ein einfaches Bild (Haus, Baum, Sonne) mit nur diesen fünf Farben.
:::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
screensize(600, 400)
speed(0)
hideturtle()
penup()

# Deine Palette:
# FARBE_1 = "#..."
# FARBE_2 = "#..."
# FARBE_3 = "#..."
# FARBE_4 = "#..."
# FARBE_5 = "#..."

# Dein Bild:
```

:::

:::snippet{#aufgabe}
**Aufgabe 3: Farbverlauf**

Zeichne einen Farbverlauf von `#264653` (dunkles Blaugrün) zu `#e9c46a` (warmes Gelb). Verwende dafür `colormode(255)` und eine Schleife mit 20 Schritten.
:::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
screensize(800, 200)
speed(0)
hideturtle()
penup()

colormode(255)

start = (38, 70, 83)      # #264653
ende = (233, 196, 106)    # #e9c46a

# Dein Code hier
```

:::

::::collapsible{title="Tipp: Der Aufbau"}

Genau wie im Beispiel aus der Lektion: `anteil` geht von 0 bis 1, und für jede Komponente (Rot, Grün, Blau) berechnest du die Mischung.

```python
for i in range(20):
    anteil = i / 19
    r = round(start[0] + (ende[0] - start[0]) * anteil)
    g = round(start[1] + (ende[1] - start[1]) * anteil)
    b = round(start[2] + (ende[2] - start[2]) * anteil)
    pencolor(r, g, b)
    dot(34)
    forward(38)
```

::::

:::protect{password="turtle-6-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *

shape("turtle")
screensize(800, 200)
speed(0)
hideturtle()
penup()

colormode(255)

start = (38, 70, 83)      # #264653
ende = (233, 196, 106)    # #e9c46a

for i in range(20):
    anteil = i / 19
    r = round(start[0] + (ende[0] - start[0]) * anteil)
    g = round(start[1] + (ende[1] - start[1]) * anteil)
    b = round(start[2] + (ende[2] - start[2]) * anteil)
    pencolor(r, g, b)
    dot(34)
    forward(38)
```

:::

---

## Selbsttest

::::multievent

**1. Wie ist ein Hexadezimalwert aufgebaut?**

{r1{Ein Zeichen für die Farbe}}
{r1{!Drei Zweiergruppen für Rot, Grün und Blau}}
{r1{Sechs unabhängige Zahlen}}
{r1{Ein Name, nur kürzer geschrieben}}
{h{Denk an die Struktur #d1 49 5b.}}
{H{Richtig! Rot, Grün, Blau – in dieser Reihenfolge.}}

**2. Was bedeutet ff in einer Komponente?**

{r2{Die Farbe fehlt}}
{r2{!Die Farbe ist voll vorhanden}}
{r2{Die Farbe ist mittelmäßig}}
{r2{Es ist ein Fehler}}
{h{ff ist der höchste Wert im Hexadezimalsystem.}}
{H{Richtig! ff entspricht 255 – so hell wie möglich.}}

**3. Warum wirken gedämpfte Farben reifer als Standardfarbnamen?}

{r3{Sie sind dunkler}}
{r3{!Weil alle drei Farbanteile vertreten sind, nicht nur einer}}
{r3{Sie sind kleiner}}
{r3{Sie haben mehr Rot}}
{h{Ein reines #ff0000 hat nur Rot. Ein gedämpftes #d1495b hat Rot, Grün und Blau.}}
{H{Richtig! Die Mischung dämpft die Intensität.}}

**4. Welche zwei Farben sind Komplementärfarben?**

{r4{Rot und Orange}}
{r4{!Blau und Orange}}
{r4{Grün und Gelb}}
{r4{Blau und Violett}}
{h{Komplementärfarben liegen im Farbkreis gegenüber.}}
{H{Richtig! Blau und Orange sind Komplementärfarben.}}

**5. Wie viele Farben sollte eine gute Palette haben?**

{r5{So viele wie möglich}}
{r5{!Drei bis fünf}}
{r5{Genau zwei}}
{r5{Mindestens zehn}}
{h{Mehr ist nicht besser – es ist nur bunter.}}
{H{Richtig! Drei bis fünf reichen für ein stimmiges Bild.}}

**6. Wofür braucht man colormode(255)?**

{r6{Um Farbnamen zu verwenden}}
{r6{!Um RGB-Werte wie pencolor(209, 73, 91) zu verwenden}}
{r6{Um die Zeichenfläche zu vergrößern}}
{r6{Um Hexadezimalwerte zu verwenden}}
{h{Erst nach colormode(255) versteht Python die drei Zahlen.}}
{H{Richtig! Damit kann man Farben berechnen – etwa für Farbverläufe.}}

::::
