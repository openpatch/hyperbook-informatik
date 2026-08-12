---
title: Rückblick
index: 8
---

# Rückblick

Dieses Kapitel ist das längste des Lernpfads – und das wichtigste. Variablen, Schleifen und Verzweigungen zusammen genügen, um **jedes** Programm zu schreiben, das es gibt. Alles Weitere macht die Sache nur bequemer.

## Das kann ich jetzt

- [ ] Ich kann Variablen anlegen, ausgeben und weiterrechnen. ([2.1](./01-variablen-mit-der-turtle), [2.2](./02-variablen-ohne-turtle))
- [ ] Ich kann eine `for`-Schleife mit `range` schreiben und weiß, wozu die Einrückung dient. ([2.3](./03-schleifen))
- [ ] Ich kann eine Eingabe mit `input` einlesen und in eine Zahl umwandeln. ([2.4](./04-eingaben))
- [ ] Ich kann eine `while`-Schleife schreiben und eine Endlosschleife erkennen. ([2.5](./05-while-schleifen))
- [ ] Ich kann verschachtelte Schleifen lesen und schreiben. ([2.6](./06-verschachtelte-schleifen))
- [ ] Ich kann mit `if`, `elif` und `else` verzweigen. ([2.7](./07-verzweigungen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Werte verfolgen**

Führ für jedes Programm eine Tabelle auf Papier und notiere, was ausgegeben wird.

```python
punkte = 0
for i in range(5):
    punkte = punkte + i
    print(i, punkte)
```

```python
zahl = 20
while zahl > 1:
    zahl = zahl // 2
    print(zahl)
```

```python
for i in range(3):
    for j in range(2):
        print(i, j)
```

a) Notiere für jedes Programm alle Ausgabezeilen.

b) Wie oft läuft die `while`-Schleife? Woran erkennst du, dass sie nicht endlos läuft?

c) Wie oft wird im dritten Programm die `print`-Zeile ausgeführt? Nenne die Rechnung.

d) Was passierte im zweiten Programm, wenn dort `zahl = zahl - 1` stünde? Und was bei `zahl = zahl + 1`?
:::

:::pyide{height="400px"}

```python
punkte = 0
for i in range(5):
    punkte = punkte + i
    print(i, punkte)
```

:::

:::protect{password="turtle-2-8-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

Erstes Programm:

```
0 0
1 1
2 3
3 6
4 10
```

Beachte, dass `range(5)` bei **0** anfängt und bei 4 aufhört – fünf Werte, aber die 5 ist nicht dabei.

Zweites Programm:

```
10
5
2
1
```

Bei 5 // 2 kommt 2 heraus, nicht 2.5 – die Ganzzahldivision schneidet ab.

Drittes Programm:

```
0 0
0 1
1 0
1 1
2 0
2 1
```

b) **Viermal.** Sie endet, weil `zahl` in jedem Durchlauf kleiner wird und die Bedingung `zahl > 1` deshalb irgendwann falsch ist. Genau das ist die Bedingung dafür, dass eine `while`-Schleife endet: Im Rumpf muss sich etwas ändern, das in der Bedingung vorkommt.

c) 3 · 2 = **sechsmal**. Die innere Schleife läuft bei jedem Durchlauf der äußeren vollständig durch.

d) Mit `zahl = zahl - 1` läuft die Schleife von 20 bis 1 herunter, also 19-mal – sie endet, dauert aber viel länger. Mit `zahl = zahl + 1` wird `zahl` immer größer, die Bedingung bleibt für immer wahr: eine **Endlosschleife**. Das Programm läuft dann, bis du es abbrichst.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Programme mit Fehlern**

Untersuche jedes Programm **auf Papier**. Was ist falsch, und was passiert beim Ausführen?

```python
# a)
for i in range(3)
    print(i)

# b)
for i in range(3):
print(i)

# c)
alter = input("Wie alt bist du? ")
if alter > 17:
    print("volljährig")

# d)
punkte = 5
if punkte = 5:
    print("Volle Punktzahl")
```

Bei welchem der vier meldet Python nichts, sondern rechnet einfach falsch?
:::

::::collapsible{title="Tipp zu c)"}

Sieh dir an, was `input` zurückgibt. Kann man einen Text mit einer Zahl vergleichen?

::::

:::protect{password="turtle-2-8-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Der **Doppelpunkt** am Ende der `for`-Zeile fehlt. Python meldet einen Syntaxfehler.

b) Die Einrückung fehlt. Ohne sie gehört `print(i)` nicht zur Schleife – Python meldet hier sogar einen Fehler, weil es nach einem Doppelpunkt zwingend einen eingerückten Block erwartet.

c) `input` liefert immer einen **Text**, keine Zahl. Der Vergleich `alter > 17` vergleicht also einen Text mit einer Zahl, und das lehnt Python ab. Richtig:

```python
alter = int(input("Wie alt bist du? "))
```

d) Hier steht ein einfaches `=` statt `==`. Das einfache weist **zu**, das doppelte **vergleicht**. Python meldet auch das als Fehler – anders als manche andere Sprache, in der genau dieser Tippfehler unbemerkt bliebe.

Die Antwort auf die Schlussfrage lautet also: **bei keinem**. Alle vier fallen auf. Das ist eine gute Nachricht und zugleich eine Warnung: Die wirklich teuren Fehler sind die, die Python **nicht** melden kann – etwa eine Schleife, die einmal zu oft läuft, oder ein `elif`, das in der falschen Reihenfolge steht.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ein Windrad aus Quadraten**

Zeichne diese Figur: **sechs** Quadrate mit 80 Pixeln Kantenlänge, die alle im selben Punkt beginnen und jeweils um 60 Grad gegeneinander gedreht sind.

a) Überleg zuerst: Welche Schleife zeichnet **ein** Quadrat? Was muss danach passieren, bevor das nächste beginnt?

b) Schreib das Programm mit zwei verschachtelten Schleifen.

c) Wie oft wird der innerste `forward`-Befehl insgesamt ausgeführt?

d) Ändere die Zahl der Quadrate auf 12 und die Drehung auf 30 Grad. Was fällt dir am Zusammenhang der beiden Zahlen auf?
:::

::::collapsible{title="Tipp 1: Ein Quadrat"}

```python
for j in range(4):
    forward(80)
    left(90)
```

Nach dieser Schleife steht die Turtle wieder am Ausgangspunkt und schaut in die Ausgangsrichtung – ein geschlossener Weg bringt sie immer dorthin zurück.

::::

::::collapsible{title="Tipp 2: Die äußere Schleife"}

Die äußere Schleife wiederholt das **ganze** Quadrat und dreht danach ein Stück weiter:

```python
for i in range(6):
    # hier das ganze Quadrat
    left(60)
```

Achte auf die Einrückung: Die innere Schleife und das `left(60)` gehören beide in die äußere.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)
pencolor("green")

# Dein Windrad:

```

:::

:::protect{password="turtle-2-8-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *

shape("turtle")
speed(0)
pensize(2)
pencolor("green")

for i in range(6):
    for j in range(4):
        forward(80)
        left(90)
    left(60)
```

a) Ein Quadrat entsteht durch vier Mal `forward(80)` mit `left(90)` dazwischen. Danach steht die Turtle wieder am Start – deshalb genügt eine Drehung um 60 Grad, bevor das nächste Quadrat beginnt.

c) 6 · 4 = **24-mal**. Die innere Schleife läuft für jedes der sechs Quadrate vollständig durch.

d) 6 · 60 = 360 und 12 · 30 = 360. Die Zahl der Wiederholungen mal dem Drehwinkel ergibt immer eine **volle Umdrehung**. Deshalb schließt sich die Figur. Wählst du 6 Quadrate mit 50 Grad, bleibt eine Lücke; bei 70 Grad überlappen sie sich.

:::

---

## Selbsttest

::::multievent

**1. Welche Werte nimmt i bei range von 5 an?**

{r1{1 bis 5}}

{r1{!0 bis 4}}

{r1{0 bis 5}}

{r1{1 bis 4}}

{h{Es sind fünf Werte – aber wo fangen sie an?}}
{H{Richtig. Python zählt ab null.}}

**2. Wie oft wird der innerste Block bei drei äußeren und zwei inneren Durchläufen ausgeführt?**

{z{6}}

{h{Die innere Schleife läuft für jeden Durchlauf der äußeren komplett durch.}}
{H{Richtig – drei mal zwei.}}

**3. Was entscheidet darüber, was zu einer Schleife gehört?**

{r2{der Doppelpunkt}}

{r2{!die Einrückung}}

{r2{die Reihenfolge}}

{r2{die Klammern}}

{h{Was passiert mit einer Zeile, die weiter links steht?}}
{H{Richtig – deshalb sind Leerzeichen in Python nicht nur Kosmetik.}}

**4. Was liefert input immer zurück?**

{r3{eine Zahl}}

{r3{!einen Text}}

{r3{einen Wahrheitswert}}

{r3{das kommt auf die Eingabe an}}

{h{Deshalb muss man das Ergebnis oft erst umwandeln.}}
{H{Richtig – mit int oder float.}}

**5. Wann läuft eine while-Schleife endlos?**

{r4{wenn die Bedingung am Anfang falsch ist}}

{r4{!wenn sich im Rumpf nichts ändert, das in der Bedingung vorkommt}}

{r4{wenn sie eingerückt ist}}

{r4{wenn sie eine Zählvariable hat}}

{h{Was muss passieren, damit die Bedingung irgendwann falsch wird?}}
{H{Richtig.}}

**6. Was ist der Unterschied zwischen einem und zwei Gleichheitszeichen?**

{r5{keiner}}

{r5{!eines weist zu, zwei vergleichen}}

{r5{eines vergleicht, zwei weisen zu}}

{r5{zwei sind nur die längere Schreibweise}}

{h{Denk an die Zuweisung punkte gleich 5 gegenüber der Frage, ob punkte 5 ist.}}
{H{Richtig.}}

**7. In welcher Reihenfolge prüft Python if, elif und else?**

{r6{zuerst else, dann die elif-Zweige}}

{r6{!von oben nach unten, und sobald eine Bedingung zutrifft, wird der Rest übersprungen}}

{r6{alle Bedingungen werden geprüft}}

{r6{in zufälliger Reihenfolge}}

{h{Deshalb ist die Reihenfolge der Bedingungen wichtig.}}
{H{Richtig – die engste Bedingung gehört nach oben.}}

**8. Sechs Figuren sollen sich zu einem Kreis schließen. Um wie viel Grad muss nach jeder gedreht werden?**

{z{60}}

{h{Die Zahl der Wiederholungen mal dem Winkel ergibt eine volle Umdrehung.}}
{H{Richtig – 360 geteilt durch 6.}}

::::
