---
title: Boolesche Werte
index: 2
---

# Boolesche Werte

Bisher sind `True` und `False` nur als **Ergebnis** von Vergleichen aufgetaucht. Man kann diese Wahrheitswerte aber auch selbst in Variablen speichern.

Solche Variablen heißen **boolesche Variablen** – benannt nach dem Mathematiker George Boole.

## Aufgabe 1: Eis oder kein Eis?

:::snippet{#aufgabe}
Ein Schüler hat festgestellt, dass er viel zu häufig Eis isst. Daher hat er ein kleines Programm entwickelt, mit dem er ab jetzt ganz strikt jeden Tag entscheiden möchte, ob er ein Eis essen darf. Seine Entscheidung hängt vom Wochentag, vom Wetter und vom Inhalt seines Portemonnaies ab.

Analysiere das gegebene Beispiel. Gehe insbesondere auf die für uns **neuen** Aspekte ein.

Probiere danach alle acht Kombinationen der drei Variablen durch.
:::

:::pyide

```python
heute_ist_montag = False
die_sonne_scheint = False
mehr_als_zehn_euro = True

eis_essen = not heute_ist_montag and die_sonne_scheint or mehr_als_zehn_euro

if eis_essen:
    print("Ich gehe ein Eis essen!")
else:
    print("Heute gibt es kein Eis!")
```

:::

:::snippet{#merken}
- `True` und `False` sind Werte wie Zahlen oder Texte – man kann sie in Variablen speichern.
- Sie werden **groß** geschrieben und stehen **ohne** Anführungszeichen. `"True"` wäre ein Text, nicht der Wahrheitswert.
- Enthält eine Variable bereits einen Wahrheitswert, kann man sie direkt als Bedingung verwenden: `if eis_essen:` statt `if eis_essen == True:`.
- Gute Namen für boolesche Variablen beschreiben eine Aussage, die wahr oder falsch sein kann: `die_sonne_scheint`, `ist_fertig`, `hat_gewonnen`.
:::

::::collapsible{title="Frage: Ist die Bedingung des Schülers eigentlich sinnvoll?"}

Schau dir die Zeile genau an:

```python
eis_essen = not heute_ist_montag and die_sonne_scheint or mehr_als_zehn_euro
```

Sobald `mehr_als_zehn_euro` wahr ist, ist das Gesamtergebnis wahr – **egal**, welcher Tag ist und wie das Wetter ist. Sein „ganz striktes" Programm ist also gar nicht so strikt.

Woran das liegt und wie man es mit Klammern repariert, erfährst du in der nächsten Lektion.

::::

## Aufgabe 2: Eine boolesche Variable in der Schleife

:::snippet{#aufgabe}
Analysiere das folgende Beispiel und beschreibe, welches Bild sich ergibt – **ohne** es vorher am Rechner zu testen.

Achte besonders auf die vorletzte Zeile.
:::

:::pyide{canvas}

```python
from turtle import *
shape("turtle")
screensize(600, 300)

penup()
goto(-140, 0)

mache_punkt = True

for i in range(10):
    if mache_punkt:
        dot(20)

    mache_punkt = not mache_punkt
    forward(20)
```

:::

::::collapsible{title="Tipp: Was macht die vorletzte Zeile?"}

`mache_punkt = not mache_punkt` dreht den Wert jedes Mal um: aus `True` wird `False`, aus `False` wird wieder `True`.

Man nennt eine solche Variable auch einen **Schalter** oder *Toggle*.

::::

![Fünf Punkte mit gleichmäßigen Lücken dazwischen](./02-boolean-turtle.png)

:::protect{password="turtle-3-2-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

Es entstehen **fünf Punkte** mit Lücken dazwischen: Bei jedem zweiten Durchlauf ist `mache_punkt` falsch, dann wird kein Punkt gezeichnet – die Turtle läuft aber trotzdem weiter.

:::

## Aufgabe 3: Lernen oder Basketball?

:::snippet{#aufgabe}
Mithilfe von logischen Verknüpfungen soll ein Programm geschrieben werden, das entscheidet, ob du heute für eine Klassenarbeit lernst oder lieber draußen Basketball spielen gehst.

a) Überlege dir mindestens **drei** Bedingungen, von denen deine Entscheidung abhängt.

b) Entwickle daraus ein Programm.
:::

:::pyide

```python
# Deine booleschen Variablen hier

# Deine Verknüpfung hier

# Deine Ausgabe hier
```

:::

::::collapsible{title="Tipp: Ein möglicher Aufbau"}

```python
arbeit_ist_morgen = True
es_regnet = False
freunde_haben_zeit = True

basketball = not arbeit_ist_morgen and not es_regnet and freunde_haben_zeit

if basketball:
    print("Ab auf den Platz!")
else:
    print("Heute wird gelernt.")
```

::::

## Aufgabe 4: Das Bild erweitern

:::snippet{#aufgabe}
Erweitere das Beispiel aus Aufgabe 2 so, dass sich ein Bild wie unten ergibt: Die Punkte wechseln sich in **Farbe und Größe** ab, und es wird an jeder Position ein Punkt gezeichnet.
:::

![Vierzehn Punkte, abwechselnd groß und rot sowie klein und blau](./02-boolean-turtle-erweitert.png)

:::pyide{canvas}

```python
from turtle import *
shape("turtle")
screensize(600, 300)

penup()
goto(-140, 0)

mache_punkt = True

# Dein Code hier
```

:::

::::collapsible{title="Tipp"}

Die boolesche Variable entscheidet jetzt nicht mehr **ob**, sondern **wie** gezeichnet wird. Aus

```python
if mache_punkt:
    dot(20)
```

wird also eine Abfrage mit `else`-Zweig, in der jeweils Farbe und Größe gesetzt werden.

::::

:::protect{password="turtle-3-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *
shape("turtle")
screensize(600, 300)

penup()
goto(-140, 0)

grosser_punkt = True

for i in range(14):
    if grosser_punkt:
        pencolor("red")
        dot(24)
    else:
        pencolor("blue")
        dot(10)

    grosser_punkt = not grosser_punkt
    forward(22)
```

:::

## Zusatzaufgaben

:::snippet{#aufgabe}
a) Entwickle zu einer selbst ausgedachten Situation geeignete Bedingungen und ein passendes Programm.

b) In den bisherigen Beispielen gab es immer nur zwei mögliche Ergebnisse – Eis essen oder eben nicht. Entwickle eines der Programme so weiter, dass es **mehr als zwei** mögliche Ergebnisse gibt. Verwende dazu verschachtelte Verzweigungen oder `elif`.
:::

---

## Selbsttest

::::multievent

**1. Wie schreibt man den Wahrheitswert „wahr" in Python?**

{r1{true}}

{r1{!True}}

{r1{"True"}}

{r1{WAHR}}

{h{Achte auf Groß- und Kleinschreibung – und auf die Anführungszeichen.}}
{H{Richtig! Groß geschrieben und ohne Anführungszeichen.}}

**2. Was bewirkt schalter = not schalter?**

{r2{Der Wert wird gelöscht}}

{r2{!Der Wert wird umgedreht}}

{r2{Der Wert wird auf False gesetzt}}

{h{Aus wahr wird falsch – und was wird aus falsch?}}
{H{Richtig! Diese Zeile schaltet zwischen den beiden Werten hin und her.}}

**3. Welche Schreibweisen sind gleichwertig?** (Mehrfachauswahl)

{c1{!if fertig:}}

{c1{!if fertig == True:}}

{c1{if fertig = True:}}

{c1{if "fertig":}}

{h{Eine der Varianten enthält eine Zuweisung statt eines Vergleichs.}}
{H{Richtig! Die kurze Schreibweise ist üblich, weil die Variable ja schon einen Wahrheitswert enthält.}}

**4. Welche Namen sind für boolesche Variablen gut geeignet?** (Mehrfachauswahl)

{c2{!es_regnet}}

{c2{!hat_gewonnen}}

{c2{anzahl}}

{c2{!ist_fertig}}

{h{Ein guter Name beschreibt eine Aussage, die wahr oder falsch sein kann.}}
{H{Richtig!}}

**5. Wie viele verschiedene Werte kann eine boolesche Variable annehmen?**

{z{2}}

{h{Wahr und …?}}
{H{Richtig! Genau zwei: True und False.}}

::::
