---
name: Aufbau und Funktionsweise
index: 0
lang: de
permaid: java-avl-aufbau
scripts:
  - /wc/oop-suchbaum.js
---

# AVL-Bäume

Auf der Seite [Binärer Suchbaum](../aufbau-und-funktionsweise) hast du gesehen, was passiert, wenn die Werte **10, 20, 30, 40, 50** in dieser Reihenfolge eingefügt werden: Jeder neue Wert ist größer als alle bisherigen und landet rechts. Aus dem Baum wird eine Kette.

Das ist kein Sonderfall, den man ignorieren kann. Sortierte Daten sind der Normalfall – eine Kursliste, ein Datenbankexport, eine Datei mit Zeitstempeln. Wer die der Reihe nach einfügt, bekommt genau diese Kette. Und mit ihr verliert der Suchbaum seine einzige Stärke: Statt in `log n` Schritten sucht er in `n`.

:::snippet{#definition}
Ein **AVL-Baum** ist ein binärer Suchbaum mit einer zusätzlichen Bedingung:

> An **jedem** Knoten unterscheiden sich die Höhen des linken und des rechten Teilbaums um höchstens 1.

Diese Zahl – Höhe des linken minus Höhe des rechten Teilbaums – heißt **Balancefaktor**. Erlaubt sind also nur die Werte −1, 0 und +1.

Verletzt ein Einfügen die Bedingung, stellt der Baum sie durch eine **Rotation** wieder her: Er hängt einige Verweise um, sodass ein Knoten nach oben und ein anderer nach unten rückt.
:::

:::snippet{#merken}
| | binärer Suchbaum | AVL-Baum |
| --- | --- | --- |
| Suchen im Mittel | O(log n) | O(log n) |
| Suchen im schlechtesten Fall | **O(n)** – die Kette | **O(log n)** – garantiert |
| Einfügen | O(Höhe) | O(Höhe) plus höchstens eine Rotation |
| Aufwand für die Ordnung | keiner | Balancefaktoren mitführen, Rotationen ausführen |

Der AVL-Baum kauft sich die **Garantie** mit Buchhaltung. Das lohnt sich überall dort, wo man die Reihenfolge der Eingaben nicht in der Hand hat.
:::

Benannt ist er nach **A**delson-**V**elski und **L**andis, zwei sowjetischen Mathematikern, die ihn 1962 vorgestellt haben – die älteste Datenstruktur für balancierte Bäume überhaupt.

## Die vier Rotationsfälle

Wenn die Bedingung kippt, liegt das immer an genau einem Knoten und an der Richtung, aus der der neue Wert kam. Daraus ergeben sich vier Fälle: **links-links**, **rechts-rechts** (beide mit einer einfachen Rotation zu beheben) sowie **links-rechts** und **rechts-links** (beide brauchen eine **Doppelrotation**).

:::snippet{#aufgabe}
**Aufgabe 1: Die Fachbegriffe klären**

Sieh dir das Video an und bereite dich darauf vor, *Balancefaktor*, *Rotation* und *Doppelrotation* mit eigenen Worten zu erläutern.
:::

::youtube{#ztv6tbASPXM}

## Zeichnen, dann nachprüfen

:::snippet{#aufgabe}
**Aufgabe 2: Der entartete Baum**

*Ohne Rechner.* Zeichne den binären Suchbaum, der entsteht, wenn in einen leeren Baum nacheinander eingefügt wird: 100, 90, 80, 70, 60, 50, 40, 30, 20. Lies seine Höhe ab.
:::

::::collapsible{title="Lösung" id="avl-loesung-entartet"}

```mermaid
flowchart TD
    A(("100")) --> B(("90"))
    B --> C(("80"))
    C --> D(("70"))
    D --> E(("60"))
    E --> F(("50"))
    F --> G(("40"))
    G --> H(("30"))
    H --> I(("20"))
```

Neun Knoten, Höhe 9. Der Baum ist zu einer Kette entartet – eine Suche nach der 20 braucht neun Vergleiche, genau wie in einer unsortierten Liste.

::::

:::snippet{#aufgabe}
**Aufgabe 3: Derselbe Baum, ausbalanciert**

*Ohne Rechner.* Zeichne den AVL-Baum, der entsteht, wenn dieselben neun Werte in dieser Reihenfolge in einen AVL-Baum eingefügt werden. Notiere bei jedem Schritt, wo eine Rotation nötig wird.
:::

::::collapsible{title="Lösung" id="avl-loesung-balanciert"}

![Der AVL-Baum nach dem Einfügen von 100, 90, 80, 70, 60, 50, 40, 30, 20: ein ausgeglichener Baum der Höhe 4.](/images/avl-baum.1.jpg)

Statt Höhe 9 nur noch Höhe 4. Dieselben Werte, dieselbe Einfügereihenfolge – der Unterschied entsteht allein durch die Rotationen.

::::

:::snippet{#aufgabe}
**Aufgabe 4: Alle vier Fälle provozieren**

Überleg dir eine Zahlenfolge, mit der **alle vier** Rotationsfälle vorkommen. Bereite dich darauf vor, dein Vorgehen zu erläutern: An welcher Stelle tritt welcher Fall auf, und woran hast du ihn erkannt?
:::

::::collapsible{title="Lösung" id="avl-loesung-rotationen"}

![Eine Zahlenfolge, die nacheinander alle vier Rotationsfälle auslöst, mit dem Baum nach jedem Schritt.](/images/avl-baum-2.jpg)

::::

## Zum Nachprüfen

Der Baum unten balanciert sich nach jedem Einfügen selbst aus. Neben jedem Knoten steht sein **Balancefaktor** – die Höhe des linken minus die Höhe des rechten Teilbaums. Unter dem Baum wird protokolliert, welche Rotation gerade nötig war.

<oop-suchbaum id="avl-spielwiese" modus="avl" werte="100,90,80"></oop-suchbaum>

:::snippet{#aufgabe}
**Aufgabe 5: Vergleichen**

a) Füge die Werte aus Aufgabe 2 ein: 100, 90, 80, 70, 60, 50, 40, 30, 20. Vergleiche das Ergebnis mit deiner Zeichnung aus Aufgabe 3.

b) Lies mit, welche Rotationen dabei ausgelöst werden. Kommt dabei auch eine **Doppelrotation** vor? Begründe deine Beobachtung.

c) Prüfe deine Zahlenfolge aus Aufgabe 4: Deckt sie wirklich alle vier Rotationsfälle ab?

d) Vergleiche die Höhe mit der des entarteten Suchbaums aus Aufgabe 2. Um wie viele Vergleiche unterscheidet sich eine erfolglose Suche im schlechtesten Fall?
:::

::::collapsible{title="Auflösung zu a), b) und d)"}

a) Beide sollten übereinstimmen: ein Baum der Höhe 4 mit 70 an der Wurzel, 50 und 90 darunter, 30, 60, 80 und 100 auf der dritten sowie 20 und 40 auf der vierten Ebene.

b) **Nein, keine einzige.** Beim Einfügen von 80 kippt die Bedingung zum ersten Mal, und danach bei 60, 50, 40 und 20 – jedes Mal ist es eine **einfache** Rotation nach rechts. Der Grund: Jeder neue Wert ist kleiner als alle bisherigen und geht deshalb immer nach links, und von dort wieder nach links. Das ist immer der Fall **links-links**.

Eine Doppelrotation braucht es erst, wenn der Weg zum neuen Knoten die Richtung **wechselt** – erst nach links, dann nach rechts (oder umgekehrt). Eine streng fallende Folge kann das nie erzeugen. Genau deshalb verlangt Aufgabe 4 eine andere Zahlenfolge.

d) Entarteter Baum: Höhe 9, also bis zu 9 Vergleiche. AVL-Baum: Höhe 4, also bis zu 4. Bei neun Werten ist das ein Faktor von gut 2 – bei einer Million Werten sind es 1 000 000 gegen 20.

::::

---

## Selbsttest

::::multievent

**1. Welches Problem löst ein AVL-Baum?**

{r1{er spart Speicher}}

{r1{!er verhindert, dass der Suchbaum zu einer Kette entartet}}

{r1{er erlaubt doppelte Inhalte}}

{h{Denk an das Einfügen aufsteigend sortierter Werte.}}
{H{Richtig!}}

**2. Wie stark dürfen sich die Höhen der beiden Teilbäume eines Knotens höchstens unterscheiden?**

{z{1}}

{h{Das ist die AVL-Bedingung.}}
{H{Richtig!}}

**3. Womit stellt ein AVL-Baum die Ausgeglichenheit wieder her?**

{r2{durch Neuaufbau des ganzen Baumes}}

{r2{!durch Rotationen}}

{r2{durch Sortieren der Inhalte}}

{h{Dabei werden nur einzelne Teilbäume umgehängt.}}
{H{Richtig!}}

**4. Welche Aufwandsklasse garantiert ein AVL-Baum für Suchen, Einfügen und Entfernen?**

{r3{konstant}}

{r3{!logarithmisch}}

{r3{linear}}

{h{Die Höhe bleibt durch die Ausgleichsbedingung beschränkt.}}
{H{Richtig! Und zwar garantiert, nicht nur im Mittel.}}

**5. Was ist der Balancefaktor eines Knotens?**

{r4{die Zahl seiner Nachfolger}}

{r4{!die Höhe seines linken minus die Höhe seines rechten Teilbaums}}

{r4{die Tiefe, in der er steht}}

{h{In einem AVL-Baum darf er nur −1, 0 oder +1 sein.}}
{H{Richtig!}}

::::
