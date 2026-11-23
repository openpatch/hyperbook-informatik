---
title: Negative Zahlen – das Zweierkomplement
index: 5
permaid: rechner-zweierkomplement
scripts:
  - /wc/zweierkomplement.js
---

# Negative Zahlen – das Zweierkomplement

Am Ende von [Lektion 2.3](./03-binaer-rechnen) stand die Frage: *Prozessoren haben oft kein eigenes Rechenwerk zum Subtrahieren – sie addieren stattdessen eine „geschickt umgeformte Zahl". Welche Zahl muss man für „− 5" addieren?* In dieser Lektion löst du dieses Rätsel. Die Antwort heißt :t[Zweierkomplement]{#zweierkomplement} – und sie löst nebenbei ein viel grundlegenderes Problem: **Wie speichert ein Computer überhaupt negative Zahlen, wenn es nur 0 und 1 gibt?**

## Das Problem: Ein Register hat kein Minuszeichen

Ein Register besteht aus einer festen Anzahl von Bits – 4, 8 oder auch 64. Jedes Bit ist 0 oder 1. Für ein Minuszeichen gibt es keinen Platz und auch keinen Stromzustand „minus".

:::snippet{#aufgabe}
In einem 4-Bit-Register sollen +3 als 0011₍₂₎ und −3 als 1011₍₂₎ gespeichert werden – die erste Idee: das **linkeste Bit** ist ein Vorzeichen-Bit (0 = plus, 1 = minus), die restlichen Bits speichern den Betrag.

Rechne 0011₍₂₎ + 1011₍₂₎ schriftlich und lies das Ergebnis **mit Vorzeichen-Bit**. Was fällt dir auf?
:::

:::protect{password="rechner-2-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

0011 + 1011 = **1110₍₂₎**. Mit Vorzeichen-Bit gelesen: links steht 1, also negativ, Betrag 110₍₂₎ = 6 → **−6**. Aber 3 + (−3) müsste **0** ergeben!

Die einfache Vorzeichen-Idee speichert negative Zahlen zwar lesbar, funktioniert aber beim **Addieren** nicht: Der Prozessor müsste erst das Vorzeichen prüfen und dann aufwendig zwischen Addieren und Subtrahieren entscheiden.
:::

## Zweierkomplement bilden: umdrehen und 1 addieren

:::snippet{#merken}
So entsteht die Darstellung einer negativen Zahl −x in einem n-Bit-Register – das **Zweierkomplement** von x:

1. Schreibe **+x** binär, mit führenden Nullen bis zum Rand des Registers.
2. **Drehe alle Bits um**: aus jeder 0 wird eine 1, aus jeder 1 wird eine 0.
3. **Addiere 1**.
:::

:::snippet{#beispiel}
−5 in einem 8-Bit-Register:

```
+5             0 0 0 0 0 1 0 1
umdrehen       1 1 1 1 1 0 1 0
        + 1               +    1
               -----------------
-5            1 1 1 1 1 0 1 1
```

Probe: 5 + (−5) = 00000101 + 11111011 = 1 00000000. Der Übertrag aus der höchsten Stelle fällt aus dem Register heraus – übrig bleibt genau 00000000 = **0** ✔
:::

:::snippet{#aufgabe}
Stelle die angegebene Zahl im 8-Bit-Register dar, indem du die Bits anklickst. Prüfe danach. Wenn du nicht weiterkommst, öffne die Schritte.
:::

<zweierkomplement id="rechner-zweikomplement-fest" bits="8" richtung="darstellen" aufgaben="-6,-10,-1,-128"></zweierkomplement>

:::snippet{#aufgabe}
Übe weiter mit Zufallsaufgaben.
:::

<zweierkomplement id="rechner-zweikomplement-zufall" bits="8" richtung="darstellen"></zweierkomplement>

## Warum das funktioniert: im Kreis rechnen

:::snippet{#merken}
Warum ergibt 7 − 3 dasselbe wie 7 + 13 im 4-Bit-Register? Weil 3 + 13 = 16 = 2⁴ ist. Nach einem Überlauf behält das Register nur den Rest – 20 wird zu 20 − 16 = 4. Deshalb gilt im 4-Bit-Register:

**13 verhält sich genau wie −3.** Und 13 = 1101₍₂₎ ist das Zweierkomplement von 3.

Stell dir die 16 Muster eines 4-Bit-Registers wie ein Ziffernblatt vor: Nach 15 kommt nicht „16", sondern es geht mit −1, −2, … weiter, bis −8. Das höchste Bit entscheidet, in welcher Hälfte du dich befindest: **0 = positive Hälfte (0 bis 7), 1 = negative Hälfte (−1 bis −8).**
:::

:::snippet{#beispiel}
Deshalb kannst du subtrahieren, ohne zu subtrahieren. 6 − 3 im 4-Bit-Register:

```
    0 1 1 0        (+6)
  + 1 1 0 1        Zweierkomplement von 3 (1101 = 13 = 16 - 3)
  Ü 1
  ---------
  1 0 0 1 1        Übertrag fällt aus dem Register heraus
    0 0 1 1        übrig bleibt 0011 = 3  ✔
```
:::

:::snippet{#aufgabe}
1. Bilde das Zweierkomplement von 7 in einem 4-Bit-Register und rechne nach, dass 7 + (−7) = 0 ergibt.
2. Rechne 5 − 6 im 4-Bit-Register **nur durch Addieren**. Der herausfallende Übertrag darf weggelassen werden. Welchen Wert hat das Ergebnis – und warum erkennt man am obersten Bit sofort, dass es negativ ist?
:::

::textinput{id="rechner-zweikomplement-subtrahieren" placeholder="1. … 2. …" height="120px"}

::::collapsible{title="Tipp zu 1"}

+7 = 0111. Umdrehen: 1000. Dann nur noch 1 addieren.

::::

::::collapsible{title="Tipp zu 2"}

−6 ist das Zweierkomplement von 6. Rechne 0101 + 1010 und lies das Ergebnis mit dem Ziffernblatt: Alle Muster, die mit 1 beginnen, liegen in der negativen Hälfte.

::::

:::protect{password="rechner-2-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. +7 = 0111 → umdrehen: 1000 → +1: **1001**. Probe: 0111 + 1001 = 1 0000 → der Übertrag fällt heraus, übrig bleibt **0000 = 0** ✔
2. −6 = 1010₍₂₎. Also 0101 + 1010 = **1111**. Das oberste Bit ist 1 → das Ergebnis liegt in der negativen Hälfte. Zum Ablesen: umdrehen und 1 addieren: 0000 + 1 = 1 → **−1**. Und wirklich: 5 − 6 = −1 ✔
:::

## Negative Zahlen erkennen und lesen

:::snippet{#merken}
In einem Register, das mit Zweierkomplement rechnet, gilt:

- Beginnt die Zahl mit **0**, ist sie positiv (oder 0).
- Beginnt sie mit **1**, ist sie negativ.

Um ein negatives Muster in eine Dezimalzahl umzuwandeln, gehst du den Rechenweg rückwärts: **umdrehen, 1 addieren** – das Ergebnis ist der Betrag. Aus 11101100₍₂₎ wird so: umdrehen → 00010011 → +1 → 00010100 = 20, das Muster ist also **−20**.
:::

:::snippet{#aufgabe}
Lies die Muster. Gib den Wert als Dezimalzahl an.
:::

<zweierkomplement id="rechner-zweikomplement-lesen" bits="8" richtung="lesen"></zweierkomplement>

:::snippet{#merken}
Mit n Bit und Zweierkomplement lässt sich der Bereich **von −2ⁿ⁻¹ bis +2ⁿ⁻¹ − 1** darstellen:

| Register | Wertebereich |
| --- | --- |
| 4 Bit | −8 … +7 |
| 8 Bit (1 Byte) | −128 … +127 |
| 16 Bit | −32 768 … +32 767 |
| 32 Bit | −2 147 483 648 … +2 147 483 647 |

Die Anzahl der Muster ändert sich nicht – es bleiben genau 2ⁿ – aber jetzt sind sie halb positiv, halb negativ verteilt. Die **0 existiert nur einmal**, anders als beim Vorzeichen-Bit, wo 0000 und 1000 beide null bedeuten würden.
:::

:::snippet{#brain}
Warum gibt es mit 8 Bit zwar −128, aber kein +128? Auf dem Ziffernblatt gibt es 128 negative Werte (−1 bis −128), dann die 0 und 127 positive Werte (1 bis 127) – zusammen exakt 256 Muster. Für ein +128 ist kein Muster übrig. In Programmen mit 8-Bit-Zahlen führt 127 + 1 tatsächlich zu −128: Der Überlauf dreht das Vorzeichen um – eine Fehlerquelle, über die auch Profis regelmäßig stolpern.
:::

---

## Selbsttest

::::multievent

**1. Wie bildest du das Zweierkomplement einer Zahl?**
{r1{!alle Bits umdrehen und 1 addieren}}
{r1{alle Bits umdrehen und 1 subtrahieren}}
{r1{das höchste Bit auf 1 setzen}}
{H{Richtig: umdrehen, dann +1.}}

**2. Wie sieht −5 in einem 4-Bit-Register aus?**
{r2{!1011}}
{r2{0101}}
{r2{1101}}
{H{Richtig: 0101 → umdrehen 1010 → +1 = 1011.}}

**3. Welchen Wert hat 1111₍₂₎ in einem 4-Bit-Register mit Zweierkomplement?**
{z{-1}}
{h{Umdrehen und 1 addieren – wie groß ist der Betrag?}}
{H{Richtig.}}

**4. Welchen Wert hat 1000₍₂₎ in einem 4-Bit-Register mit Zweierkomplement?**
{z{-8}}
{h{Das ist die am weitesten von 0 entfernte Zahl.}}
{H{Richtig: −2³ = −8.}}

**5. Rechne 0110₍₂₎ − 0011₍₂₎, indem du das Zweierkomplement addierst (4-Bit-Register). Was bleibt im Register?**
{r5{!0011}}
{r5{1001}}
{r5{0101}}
{H{Richtig: 0110 + 1101 = 10011 → Übertrag fällt heraus → 0011 = 3.}}

**6. Wie viele negative Zahlen lassen sich mit 8 Bit darstellen?**
{z{128}}
{h{Genau die Hälfte der Muster ist negativ …}}
{H{Richtig: −1 bis −128.}}

::::
