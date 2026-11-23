---
title: Schieben statt rechnen – Bitshift
index: 4
permaid: rechner-bitshift
scripts:
  - /wc/binaer-shift.js
---

# Schieben statt rechnen – Bitshift

In [Lektion 2.3](./03-binaer-rechnen) hast du gelernt: „Mal 2" heißt im Binärsystem „hinten eine 0 anhängen". Dieses Verschieben ist für einen Computer so wichtig, dass es eine eigene Rechenoperation mit eigenem Namen hat: den :t[Bitshift]{#bitshift} (englisch *to shift* = schieben). Prozessoren schieben Bits schneller, als sie multiplizieren können – und Programmiererinnen und Programmierer nutzen das aus.

## Nach links schieben: mal 2

:::snippet{#merken}
Beim **Linksshift** rücken alle Bits eine Stelle nach links: `00101 << 1 = 01010`. Links fällt ein Bit aus dem Register heraus, rechts kommt eine 0 dazu.

Jede Stelle ist nach dem Schieben doppelt so viel wert wie vorher. Der Wert der Zahl verdoppelt sich:

101₍₂₎ `<< 1` = 1010₍₂₎  (5 · 2 = 10)

Mit jedem weiteren Shift verdoppelt sich der Wert nochmal: **k Stellen links schieben heißt mal 2ᵏ.**
:::

:::snippet{#beispiel}
Hier wird aus 22 die Zahl 44 – und das Bit, das links herausfällt, ist für immer verloren. In einem 4-Bit-Register wäre das schon ein Überlauf:

```
0 0 0 1 0 1 1 0      (22)
        <<
0 0 1 0 1 1 0 0      (44)
```
:::

:::snippet{#aufgabe}
Klicke die Bits an, um eine Startzahl einzustellen. Schiebe dann mit den Pfeil-Knöpfen. **Sage vor jedem Klick voraus**, welcher Wert herauskommt und welches Bit herausfällt.
:::

<binaer-shift id="rechner-shift-frei" bits="8" wert="22"></binaer-shift>

:::snippet{#brain}
Das herausgefallene Bit merkt sich der Prozessor übrigens in einem eigenen Flag, dem **Carry** (Übertragsbit). So kann er nachträglich prüfen, ob beim Schieben etwas verloren gegangen ist – etwa wenn in einer Addition oder Multiplikation das Ergebnis zu groß wurde.
:::

## Nach rechts schieben: geteilt durch 2

:::snippet{#merken}
Beim **Rechtsshift** rücken alle Bits eine Stelle nach rechts: `01010 >> 1 = 00101`. Rechts fällt ein Bit heraus, links kommt eine 0 dazu.

Der Wert halbiert sich: 1010₍₂₎ `>> 1` = 101₍₂₎ (10 : 2 = 5)

**Achtung:** Es bleiben nur ganze Zahlen übrig. Fällt rechts eine 1 heraus, geht der Rest verloren. 1101₍₂₎ `>> 1` = 0110₍₂₎ – das ist 6, obwohl 13 : 2 = 6,5 ist.
:::

:::snippet{#aufgabe}
Probiere im Baustein oben auch den Rechtsshift. Finde heraus: Welche Zahlen liefern beim Rechtsshift einen *Rest*, welche nicht?
:::

::::collapsible{title="Tipp"}

Der Rest hängt nur an einer einzigen Stelle. Welche ist es?

::::

:::protect{password="rechner-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Eine Zahl hat genau dann einen Rest bei „geteilt durch 2", wenn ihre **letzte Stelle** (der Einer) eine 1 ist. Fällt bei 1101₍₂₎ die letzte 1 heraus, war die Zahl ungerade – die 0,5 geht verloren. Gerade Zahlen enden auf 0 und halbieren sich ohne Verlust.

:::

## Verschieben als Training

:::snippet{#aufgabe}
Erreiche den Zielwert nur durch Verschieben. Zähle mit, wie viele Shifts du brauchst – und erkläre danach, warum es nicht weniger sein können.
:::

<binaer-shift id="rechner-shift-ziel" bits="8" modus="ziel"></binaer-shift>

## Schieben und Addieren: so multipliziert ein Prozessor

:::snippet{#merken}
Beim Multiplizieren hat der Prozessor nur zwei Handgriffe: **verschieben** und **addieren**. Denn jeder Faktor lässt sich als Summe von Zweierpotenzen schreiben – und für jede Zweierpotenz ist der andere Faktor nur zu verschieben.
:::

:::snippet{#beispiel}
13 · 6 = 13 · 4 + 13 · 2 = 13 · (100₍₂₎ + 10₍₂₎):

```
1 1 0 1 · 4      1101 << 2    =  110100      (52)
1 1 0 1 · 2      1101 << 1    =   11010      (26)
------------------------------------------------
                                          78      (52 + 26)
```

Das ist genau das schriftliche Multiplizieren aus [Lektion 2.3](./03-binaer-rechnen) – nur rückwärts gelesen: statt „für jede 1 im zweiten Faktor verschoben aufschreiben" heißt es „für jede 1 verschieben und addieren".
:::

:::snippet{#aufgabe}
1. Berechne 9 · 6 nur mit Verschieben und Addieren. Schreibe auf, welche Shifts du benutzt hast.
2. Erkläre, warum 9 · 8 mit einem **einzigen** Shift berechnet werden kann.
3. Ein 8-Bit-Register enthält 00001101₍₂₎ (13). Es wird zweimal nach links geschoben. Welchen Wert enthält es danach – und was ist mit der führenden 1 passiert?
:::

::textinput{id="rechner-shift-multiplikation" placeholder="1. … 2. … 3. …" height="140px"}

::::collapsible{title="Tipp zu 1"}

6 = 4 + 2 = 110₍₂₎. Schiebe die 9 (1001₍₂₎) also erst um 2, dann um 1 Stelle nach links.

::::

::::collapsible{title="Tipp zu 3"}

Schiebe erst einmal, rechne nach, schiebe nochmal. Achte darauf, welche Bits das Register verlassen.

::::

:::protect{password="rechner-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 9 · 6 = 9 · 4 + 9 · 2: 1001₍₂₎ `<< 2` = 100100₍₂₎ (36) und 1001₍₂₎ `<< 1` = 10010₍₂₎ (18). Dann 36 + 18 = 100100 + 010010 = **110110₍₂₎ = 54** ✔
2. 8 = 1000₍₂₎ = 2³. Also 9 `<< 3` = 1001000₍₂₎ = 72 – ein einziger Shift um drei Stellen genügt.
3. 13 `<< 1` = 26 = 00011010₍₂₎. Noch einmal schieben: 00110100₍₂₎ = **52**. Beim ersten Shift fällt eine **0** heraus, beim zweiten ebenso – nichts geht verloren, denn 13 · 4 = 52 passt noch in das 8-Bit-Register.
:::

:::snippet{#brain}
Programmiersprachen haben den Bitshift als Operator eingebaut: `x << 1` verdoppelt eine Zahl, `x >> 1` halbiert sie. Man findet ihn überall dort, wo Geschwindigkeit zählt – zum Beispiel beim Mischen von Zufallszahlen, in der Grafikprogrammierung oder wenn eine Farbe aus ihren Rot-, Grün- und Blau-Anteilen zu einem Wert zusammengeschoben wird.
:::

---

## Selbsttest

::::multievent

**1. Berechne 0011₍₂₎ `<< 1` und gib das Ergebnis binär an.**
{z{0110}}
{h{Jede Stelle wird doppelt so viel wert …}}
{H{Richtig: 3 wird zu 6.}}

**2. Berechne 0110₍₂₎ `>> 1` und gib das Ergebnis binär an.**
{z{0011}}
{h{Jede Stelle verliert die Hälfte ihres Werts …}}
{H{Richtig: 6 wird zu 3.}}

**3. Was ergibt 1101₍₂₎ `>> 1`?**
{r3{!0110 – die letzte 1 fällt heraus}}
{r3{0110,5 – der Rest bleibt im Register}}
{r3{1101 – rechts schieben ändert nichts}}
{H{Richtig: Register kennen nur ganze Bits, der Rest von 0,5 ist verloren.}}

**4. Wie viel ist 101₍₂₎ `<< 3`? Gib das Ergebnis binär an.**
{z{101000}}
{h{3 Stellen schieben heißt mal 2³ = mal 8.}}
{H{Richtig: 5 · 8 = 40.}}

**5. In einem 4-Bit-Register steht 0111₍₂₎ (7). Was enthält das Register nach `<< 1`?**
{r5{!1110 – das ist 14}}
{r5{1110 – aber es entsteht ein Fehler}}
{r5{0111 – Shifts sind im Register nicht möglich}}
{H{Richtig: 14 passt noch in 4 Bit. Erst wenn eine 1 herausfällt, würde der Wert falsch.}}

::::
