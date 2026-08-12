---
title: Rückblick
index: 3
---

# Rückblick

Mit Listen kannst du zum ersten Mal **viele** Werte unter einem Namen verwalten – und mit der `for-in`-Schleife bequem durch sie hindurchlaufen. Das ist der letzte Baustein vor den Projekten.

## Das kann ich jetzt

- [ ] Ich kann eine Liste anlegen und auf einzelne Elemente zugreifen. ([5.1](./01-einfuehrung))
- [ ] Ich weiß, dass ab **0** gezählt wird, und kann den letzten gültigen Index angeben. ([5.1](./01-einfuehrung))
- [ ] Ich kann die Länge einer Liste mit `len` bestimmen. ([5.1](./01-einfuehrung))
- [ ] Ich kann mit einer `for-in`-Schleife durch eine Liste laufen. ([5.2](./02-for-in-schleifen))
- [ ] Ich kann Summe, Mittelwert, Maximum und Anzahl in einem Durchlauf bestimmen. ([5.2](./02-for-in-schleifen))
- [ ] Ich kann entscheiden, wann `for-in` passt und wann ich den Index brauche. ([5.2](./02-for-in-schleifen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Zugriff und Länge**

```python
noten = [2, 1, 3, 2, 5, 4, 2]

print(len(noten))
print(noten[0])
print(noten[6])
print(noten[len(noten) - 1])
print(noten[2] + noten[3])
```

a) Notiere die fünf Ausgaben.

b) Was passiert bei `noten[7]`? Warum ist das kein Tippfehler, sondern ein Denkfehler?

c) Warum liefern die dritte und die vierte Zeile dasselbe? Welche der beiden würdest du schreiben, und warum?

d) Wie kommst du an das **zweite** Element?
:::

:::pyide{height="350px"}

```python
noten = [2, 1, 3, 2, 5, 4, 2]

print(len(noten))
print(noten[0])
print(noten[6])
print(noten[len(noten) - 1])
print(noten[2] + noten[3])
```

:::

:::protect{password="turtle-5-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
7
2
2
2
5
```

b) Der Zugriff scheitert mit einer Fehlermeldung über einen ungültigen Index. Ein Denkfehler ist es, weil sieben Elemente eben **nicht** die Indizes 1 bis 7 haben, sondern 0 bis 6. Wer bei 1 zu zählen beginnt, greift am Ende immer einen Platz zu weit.

c) Beide liefern das letzte Element. Die vierte Zeile ist die bessere: `len(noten) - 1` bleibt richtig, auch wenn die Liste länger oder kürzer wird. Die feste 6 stimmt nur für genau diese Liste – ändert jemand sie, wird aus einem richtigen Programm stillschweigend ein falsches.

d) Mit `noten[1]`. Das zweite Element hat den Index 1, weil ab null gezählt wird.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Welche Schleife passt?**

```python
noten = [2, 1, 3, 2, 5, 4, 2]

# a)
summe = 0
for note in noten:
    summe = summe + note
print(summe)

# b)
for i in range(len(noten)):
    print(i, noten[i])

# c)
anzahl = 0
for note in noten:
    if note <= 2:
        anzahl = anzahl + 1
print(anzahl)
```

a) Was gibt jeder der drei Abschnitte aus?

b) Bei welchem der drei brauchst du den **Index** wirklich? Begründe.

c) Schreib Abschnitt a) so um, dass er `range` und den Index benutzt. Welche Fassung ist besser lesbar?

d) Berechne zusätzlich den **Mittelwert** und gib ihn auf zwei Nachkommastellen gerundet aus.
:::

::::collapsible{title="Tipp zu d)"}

Der Mittelwert ist die Summe geteilt durch die Anzahl. Die Anzahl liefert `len(noten)`, und `round(wert, 2)` rundet auf zwei Nachkommastellen.

::::

:::protect{password="turtle-5-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

- Abschnitt a) gibt `19` aus – die Summe aller sieben Noten.
- Abschnitt b) gibt sieben Zeilen aus: `0 2`, `1 1`, `2 3`, `3 2`, `4 5`, `5 4`, `6 2`.
- Abschnitt c) gibt `4` aus – vier Noten sind 2 oder besser.

b) Nur bei **b)**. Dort soll die Position mit ausgegeben werden, und die kennt die `for-in`-Schleife nicht: Sie liefert den Wert, nicht den Platz. Bei a) und c) interessiert der Index nicht.

c)

```python
summe = 0
for i in range(len(noten)):
    summe = summe + noten[i]
print(summe)
```

Diese Fassung ist länger, fehleranfälliger und sagt weniger. `for note in noten` liest sich als „für jede Note aus noten" – genau das, was gemeint ist. Die Regel lautet: **Nimm `for-in`, außer du brauchst den Index wirklich.**

d)

```python
mittelwert = summe / len(noten)
print(round(mittelwert, 2))
```

Das ergibt `2.71`.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ein Säulendiagramm**

Zeichne aus einer Liste von Werten ein Säulendiagramm: für jeden Wert eine gefüllte Säule, alle nebeneinander, mit einer kleinen Lücke dazwischen.

```python
noten = [2, 1, 3, 2, 5, 4, 2]
```

a) Überleg zuerst: Was muss **je Säule** passieren? Was muss nur **einmal** am Anfang passieren?

b) Schreib das Programm. Die Höhe einer Säule soll dem Wert mal 40 entsprechen, die Breite 50 betragen.

c) Bestimme zusätzlich das **Maximum** der Liste und gib es aus.

d) Färbe die höchste Säule anders als die übrigen. Warum brauchst du dafür **zwei** Durchläufe durch die Liste?
:::

::::collapsible{title="Tipp 1: Eine Säule"}

Eine Säule ist ein Rechteck. Wenn die Turtle nach rechts schaut, zeichnest du es so:

```python
left(90)
forward(hoehe)
right(90)
forward(breite)
right(90)
forward(hoehe)
left(90)
```

Danach steht die Turtle rechts neben der Säule und schaut wieder nach rechts – bereit für die nächste.

::::

::::collapsible{title="Tipp 2: Die Lücke"}

Zwischen zwei Säulen bewegst du dich mit gehobenem Stift weiter:

```python
penup()
forward(15)
pendown()
```

::::

::::collapsible{title="Tipp 3: zu d)"}

Erst musst du wissen, **welcher** der höchste Wert ist – und das weißt du erst, wenn du die ganze Liste einmal angesehen hast. Deshalb: ein Durchlauf zum Suchen des Maximums, ein zweiter zum Zeichnen.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)

noten = [2, 1, 3, 2, 5, 4, 2]

# Dein Diagramm:

```

:::

:::protect{password="turtle-5-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *

shape("turtle")
speed(0)
pensize(2)

noten = [2, 1, 3, 2, 5, 4, 2]

# Maximum suchen
groesste = noten[0]
for note in noten:
    if note > groesste:
        groesste = note
print("Maximum:", groesste)

# an den Startpunkt
penup()
goto(-250, -150)
setheading(0)
pendown()

# zeichnen
for note in noten:
    if note == groesste:
        fillcolor("orange")
    else:
        fillcolor("steelblue")

    begin_fill()
    left(90)
    forward(note * 40)
    right(90)
    forward(50)
    right(90)
    forward(note * 40)
    left(90)
    end_fill()

    penup()
    forward(15)
    pendown()
```

a) **Je Säule** passiert das Zeichnen des Rechtecks und das Weiterrücken. **Einmal am Anfang** passieren das Anfahren des Startpunkts und die Suche nach dem Maximum.

d) Weil man beim Zeichnen der ersten Säule schon wissen muss, ob sie die höchste ist – und das steht erst fest, wenn man alle Werte gesehen hat. Ein Durchlauf kann nicht beides zugleich. Dieses Muster – **erst auswerten, dann darstellen** – kommt in jedem größeren Programm vor.

Beachte den Startwert bei der Maximumsuche: `groesste = noten[0]`, nicht `groesste = 0`. Mit 0 zu beginnen ginge bei Noten gerade noch gut, bei Temperaturen im Winter aber nicht mehr – dann käme immer 0 heraus.

:::

---

## Selbsttest

::::multievent

**1. Welchen Index hat das erste Element einer Liste?**

{z{0}}

{h{Python zählt anders als der Alltag.}}
{H{Richtig.}}

**2. Eine Liste hat sieben Elemente. Welcher ist der letzte gültige Index?**

{z{6}}

{h{Die Länge minus eins.}}
{H{Richtig.}}

**3. Was liefert die Schleifenvariable bei for-in?**

{r1{den Index}}

{r1{!den Wert des Elements}}

{r1{die Länge der Liste}}

{r1{eine Kopie der ganzen Liste}}

{h{Deshalb braucht man dabei keine eckigen Klammern mehr.}}
{H{Richtig.}}

**4. Wann brauchst du range und den Index statt for-in?**

{r2{immer}}

{r2{nie}}

{r2{!wenn du die Position selbst brauchst, etwa um sie auszugeben}}

{r2{wenn die Liste lang ist}}

{h{Die for-in-Schleife kennt den Platz nicht, nur den Wert.}}
{H{Richtig – sonst ist for-in die bessere Wahl.}}

**5. Womit sollte die Suche nach dem Maximum beginnen?**

{r3{mit 0}}

{r3{!mit dem ersten Element der Liste}}

{r3{mit der Länge der Liste}}

{r3{mit einer beliebigen Zahl}}

{h{Was passiert bei einer Liste aus lauter negativen Zahlen?}}
{H{Richtig – nur das erste Element ist immer ein zulässiger Startwert.}}

**6. Warum ist len von der Liste minus 1 besser als eine feste Zahl?**

{r4{Es ist kürzer.}}

{r4{!Es bleibt richtig, auch wenn die Liste länger oder kürzer wird.}}

{r4{Es ist schneller.}}

{r4{Es gibt keinen Unterschied.}}

{h{Was passiert, wenn jemand später ein Element ergänzt?}}
{H{Richtig.}}

**7. Warum braucht das Hervorheben der höchsten Säule zwei Durchläufe?**

{r5{Weil eine Schleife nur eine Sache tun kann.}}

{r5{!Weil erst nach dem Ansehen aller Werte feststeht, welcher der größte ist.}}

{r5{Weil das Zeichnen langsam ist.}}

{r5{Es braucht nur einen.}}

{h{Woher weißt du bei der ersten Säule, ob sie die höchste ist?}}
{H{Richtig – erst auswerten, dann darstellen.}}

::::
