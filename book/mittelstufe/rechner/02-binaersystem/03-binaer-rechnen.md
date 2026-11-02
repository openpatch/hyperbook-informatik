---
title: Rechnen im Binärsystem
index: 3
permaid: rechner-binaer-rechnen
scripts:
  - /wc/binaer-addition.js
---

# Rechnen im Binärsystem

Ein Computer, der Zahlen nur speichern kann, wäre nutzlos. Er muss damit rechnen. Die gute Nachricht: Im Binärsystem ist schriftliches Rechnen viel einfacher als im Dezimalsystem – es gibt nur vier Fälle.

## Schriftliche Addition

Du addierst wie in der Grundschule: Stelle für Stelle von rechts nach links, mit Übertrag.

:::snippet{#merken}
Die Additionstabelle im Binärsystem hat nur vier Einträge:

| | | Ergebnis | schreibe | Übertrag |
| ---: | ---: | ---: | ---: | ---: |
| 0 + 0 | | 0 | 0 | 0 |
| 0 + 1 | | 1 | 1 | 0 |
| 1 + 0 | | 1 | 1 | 0 |
| 1 + 1 | | 10 | 0 | 1 |

Kommt noch ein Übertrag dazu, kann auch **1 + 1 + 1 = 11** entstehen: schreibe 1, übertrage 1.
:::

:::snippet{#beispiel}
```
    0 1 1 0      (6)
  + 0 1 1 1      (7)
  Ü 1 1
  ---------
    1 1 0 1      (13)
```

Rechts: 0 + 1 = 1. Dann 1 + 1 = 10: schreibe 0, übertrage 1. Dann 1 + 1 + 1 = 11: schreibe 1, übertrage 1. Links: 0 + 0 + 1 = 1.
:::

:::snippet{#aufgabe}
Rechne die Aufgaben schriftlich. Klicke dazu auf die gestrichelten Felder für den Übertrag (Ü) und das Ergebnis. Prüfe danach. Kontrolliere zusätzlich im Kopf: Rechne beide Zahlen ins Dezimalsystem um und addiere.
:::

<binaer-addition id="rechner-addition-fest" bits="4" aufgaben="0011+0101, 0110+0111, 1011+0110, 1111+0001"></binaer-addition>

::::collapsible{title="Tipp: Wo fange ich an?"}

Immer ganz rechts. Schreibe einen Übertrag immer **über die nächste Stelle links**, bevor du dort weiterrechnest.

::::

:::snippet{#aufgabe}
Übe weiter mit Zufallsaufgaben, zuerst mit 4 Bit. Wenn du drei Aufgaben hintereinander ohne Fehler schaffst, wechsle zu den 8-Bit-Aufgaben darunter.
:::

<binaer-addition id="rechner-addition-zufall4" bits="4"></binaer-addition>

<binaer-addition id="rechner-addition-zufall8" bits="8"></binaer-addition>

## Wenn das Ergebnis nicht passt: der Überlauf

Im Prozessor hat jede Zahl eine **feste Anzahl von Bits**. Diese Speicherplätze im Prozessor heißen **Register**. Was passiert, wenn das Ergebnis mehr Stellen braucht, als das Register hat?

:::snippet{#aufgabe}
Das Register ist hier 4 Bit breit. **Sage vor dem Rechnen voraus**, ob das Ergebnis hineinpasst. Rechne dann und beantworte die Frage nach dem Überlauf.
:::

<binaer-addition id="rechner-addition-register" bits="4" register aufgaben="0101+0010, 1001+1000, 0111+0111, 1100+0100"></binaer-addition>

:::snippet{#merken}
Passt das Ergebnis einer Rechnung nicht mehr in die feste Anzahl von Bits, entsteht ein **Überlauf**. Der Übertrag aus der höchsten Stelle geht verloren. Das Ergebnis im Register ist dann **falsch**.

Mit 4 Bit lassen sich nur die Zahlen 0 bis 15 darstellen. 9 + 8 = 17 ergibt im 4-Bit-Register 0001₍₂₎ = 1.
:::

:::snippet{#beispiel}
Überläufe sind nicht nur Theorie. Im Spiel *Pac-Man* wurde die Levelnummer in einem Byte gespeichert. In Level 256 läuft der Zähler über – das Spielfeld wird zur Hälfte mit Zeichensalat gefüllt und das Spiel ist nicht mehr zu schaffen.
:::

## Multiplizieren

:::snippet{#merken}
**Mal 2** ist im Binärsystem besonders leicht: Hänge hinten eine 0 an. Alle Ziffern rücken eine Stelle nach links und sind doppelt so viel wert – genau wie „mal 10“ im Dezimalsystem.

101₍₂₎ · 10₍₂₎ = 1010₍₂₎  (5 · 2 = 10)
:::

:::snippet{#beispiel}
Allgemein multiplizierst du schriftlich wie im Dezimalsystem – nur dass das Einmaleins aus 0 · 0, 0 · 1 und 1 · 1 besteht. Für jede 1 im zweiten Faktor schreibst du den ersten Faktor verschoben auf und addierst:

```
  1 0 1 · 1 1        (5 · 3)
  ---------
    1 0 1            101 · 1, um eine Stelle verschoben
      1 0 1          101 · 1
  ---------
    1 1 1 1          (15)
```

Multiplizieren besteht also nur aus **Verschieben und Addieren** – genau das, was ein Prozessor schnell kann.
:::

:::snippet{#aufgabe}
1. Berechne 1011₍₂₎ · 100₍₂₎ ohne zu rechnen, nur durch Anhängen. Kontrolliere im Dezimalsystem.
2. Berechne schriftlich 110₍₂₎ · 101₍₂₎. Kontrolliere im Dezimalsystem.
:::

::textinput{id="rechner-multiplikation" placeholder="1. … 2. …" height="100px"}

::::collapsible{title="Tipp zu 1"}

100₍₂₎ ist 4, also 2 · 2. Wie viele Nullen musst du anhängen?

::::

:::protect{password="rechner-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 1011₍₂₎ · 100₍₂₎ = **101100₍₂₎**. Kontrolle: 11 · 4 = 44 = 32 + 8 + 4 ✔
2. 110 · 101: Die zweite Zahl hat Einsen an der 4er- und der 1er-Stelle. Also 11000 + 110 = **11110₍₂₎**. Kontrolle: 6 · 5 = 30 = 16 + 8 + 4 + 2 ✔

:::

:::snippet{#brain}
**Und Subtrahieren?** Prozessoren haben dafür oft gar kein eigenes Rechenwerk – sie addieren stattdessen eine geschickt umgeformte Zahl, das **Zweierkomplement**. In einem 4-Bit-Register gilt: 7 − 3 ist dasselbe wie 7 + 13, denn 7 + 13 = 20, und davon bleiben nach dem Überlauf 20 − 16 = 4 übrig. Der Überlauf ist hier also kein Fehler, sondern ein Trick! Findest du heraus, welche Zahl man für „− 5“ addieren muss?
:::

---

## Selbsttest

::::multievent

**1. Was ergibt 1 + 1 im Binärsystem?**
{r1{!10}}
{r1{2}}
{r1{11}}
{H{Richtig: schreibe 0, übertrage 1.}}

**2. Was ergibt 1 + 1 + 1 im Binärsystem?**
{r2{!11}}
{r2{10}}
{r2{111}}
{H{Richtig: das ist 3.}}

**3. Berechne 0101₍₂₎ + 0011₍₂₎ und gib das Ergebnis binär an.**
{z{1000}}
{h{5 + 3 = 8}}
{H{Richtig.}}

**4. Welche größte Zahl passt in ein 4-Bit-Register?**
{z{15}}
{H{Richtig: 1111₍₂₎.}}

**5. Wann entsteht ein Überlauf?**
{r5{!wenn das Ergebnis mehr Bits braucht, als das Register hat}}
{r5{wenn bei einer Addition ein Übertrag entsteht}}
{H{Richtig. Überträge zwischen den Stellen sind normal – nur der Übertrag aus der höchsten Stelle ist ein Überlauf.}}

**6. Wie multiplizierst du eine Binärzahl mit 2?**
{r6{!hinten eine 0 anhängen}}
{r6{vorne eine 1 schreiben}}
{H{Richtig.}}

::::
