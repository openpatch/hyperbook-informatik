---
name: Aufbau und Funktionsweise
index: 0
lang: de
hide: false
permaid: java-suchbaum-aufbau
scripts:
  - /wc/oop-suchbaum.js
---

# Aufbau und Funktionsweise

Schlag im Telefonbuch „Neumann" nach. Niemand fängt bei A an und blättert weiter – man schlägt in der Mitte auf, sieht „K", weiß damit, dass Neumann **rechts** liegen muss, und schlägt in der rechten Hälfte wieder mittig auf. Nach ein paar Griffen ist man da.

Das ist die binäre Suche aus [3.2](../../03-rekursion-und-problemloesestrategien/02-teilen-und-herrschen), und sie setzt voraus, dass die Einträge sortiert **daliegen**. Bei einem Buch ist das so. Bei Daten, die laufend dazukommen und wieder verschwinden, wäre es teuer: Jeder neue Kontakt müsste an die richtige Stelle einsortiert werden, und alle dahinter müssten aufrücken.

Der **binäre Suchbaum** löst das. Er hält die Ordnung nicht in der Reihenfolge, sondern in der **Form**.

![](/images/bst-crc-karten.png)

:::snippet{#definition}
Ein **binärer Suchbaum** ist ein Binärbaum, in dem für **jeden** Knoten gilt:

- Alle Inhalte im **linken** Teilbaum sind **kleiner** als der Inhalt des Knotens.
- Alle Inhalte im **rechten** Teilbaum sind **größer**.

Diese Bedingung heißt **Suchbaumeigenschaft**. Sie gilt nicht nur an der Wurzel, sondern an jedem einzelnen Knoten.
:::

Hier sind die Kontakte anhand der Benutzernamen einsortiert, verglichen wird alphabetisch:

`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`

Steht in einem Knoten der Benutzername `fred`, dann gehört `alf` in seinen linken Teilbaum und `paul` in seinen rechten.

:::snippet{#merken}
Der Gewinn ist derselbe wie beim Telefonbuch: **Jeder Vergleich halbiert die Menge der noch in Frage kommenden Einträge.** Bei 1000 Kontakten reichen rund 10 Vergleiche statt 1000.

Der Preis dafür steht weiter unten – der Baum muss einigermaßen gleichmäßig gewachsen sein, sonst hilft die Ordnung nichts.
:::

## Kontakte suchen

Die Methode `Contact search(Contact pContent)` soll überprüfen, ob ein Kontakt mit einem bestimmten Benutzernamen im binären Suchbaum enthalten ist. Falls dies der Fall ist, dann liefert search das Kontakt-Objekt zurück, ansonsten wird null zurückgegeben.

::jmp{id="bst-suchen" src="suchen.jmp" height="700px"}

1. Such im Objektdiagramm oben Schritt für Schritt, ob der Kontakt `pContent` enthalten ist. Sag vor jedem Schritt voraus, ob es nach links oder nach rechts weitergeht.
2. Löse danach das Code-Puzzle unten zur Methode `search` und verfolge, welchen Weg die Suche durch den Baum nimmt.

::bitflow{id="puzzle-bst-suchen" src="suchen.bitflow" height="820px"}

:::collapsible{id="sfjkjkdfa" title="Teillösung des Code-Puzzles"}

![](/images/bst-search-code-puzzle.png)

:::


## Kontakte einfügen

Die Methode `void insert(Contact pContent)` soll einen neuen Kontakt (pContent) in den binären Suchbaum einfügen. Das Vergleichskriterium soll hierbei der Benutzername (username) sein.

::jmp{id="bst-einfuegen" src="einfuegen.jmp" height="700px"}

1. Füge `pContent` im Objektdiagramm oben Schritt für Schritt in den Suchbaum ein.
2. Entwirf zur Methode `insert` der Klasse `BinarySearchTree` einen Algorithmus im :t[Pseudocode].
3. Überprüfe deinen Algorithmus am Objektdiagramm: Führt er bei jedem Kontakt an dieselbe Stelle?
4. Bereite dich darauf vor, deinen Algorithmus am Objektdiagramm zu erläutern.

::bitflow{id="puzzle-bst-einfuegen" src="einfuegen.bitflow" height="820px"}

:::collapsible{id="sakjkjdsavjsavkjs" title="Hilfe"}

Orientiere dich an der Lösung zur Methode `search`:

![](/images/bst-search-code-puzzle-loesung.png)

:::

## Den Baum selbst wachsen lassen

Hier kannst du beliebig viele Werte einfügen und suchen. Bei der Suche wird der Weg durch den Baum eingefärbt.

<oop-suchbaum id="bst-spielwiese" modus="bst" werte="50,30,70,20,40,60,80"></oop-suchbaum>

:::snippet{#aufgabe}
a) Suche die 20 und dann die 55. Wie viele Vergleiche braucht der Baum jeweils? Vergleiche mit der Zahl der Knoten.

b) Leere den Baum und füge die Werte **10, 20, 30, 40, 50** in dieser Reihenfolge ein. Beschreibe die Form, die entsteht, und lies die Höhe ab.

c) Leere ihn erneut und finde eine Reihenfolge derselben fünf Werte, bei der die Höhe so klein wie möglich wird. Die Anzeige „minimal möglich“ verrät dir das Ziel.

d) Erkläre daran, warum die Suche im Suchbaum zwar meistens schnell ist, aber keine Garantie dafür gibt.
:::

::::collapsible{title="Auflösung" id="bst-spielwiese-aufloesung"}

a) Die **20** wird nach 3 Vergleichen gefunden (50 → 30 → 20), die **55** nach 3 Vergleichen **nicht** gefunden (50 → 70 → 60, und dort ist links ein leerer Knoten). Der Baum hat 7 Knoten – es werden also weniger als halb so viele Vergleiche gebraucht, wie es Knoten gibt.

Bemerkenswert ist der zweite Fall: Auch die **erfolglose** Suche ist schnell. Sie muss nicht alle Knoten prüfen, weil nach jedem Vergleich eine ganze Hälfte wegfällt.

b) Es entsteht eine **Kette**, die nur nach rechts wächst – jeder Wert ist größer als alle bisherigen und landet im rechten Teilbaum. Die Höhe ist 5, also so groß wie die Zahl der Knoten.

c) Zum Beispiel **30, 20, 40, 10, 50**: Der mittlere Wert kommt zuerst an die Wurzel, danach jeweils die Mitte der verbliebenen Hälften. Die Höhe ist dann 3 – mehr geht bei fünf Knoten nicht, denn auf drei Ebenen passen höchstens 1 + 2 + 4 = 7 Knoten.

Das ist nicht die einzige Lösung. Auch **20, 10, 40, 30, 50** ergibt Höhe 3. Entscheidend ist nicht ein bestimmter Wert an der Wurzel, sondern dass die Werte nicht der Reihe nach kommen.

d) Die Suche ist schnell, **solange der Baum gleichmäßig gewachsen ist**. Wie er wächst, hängt aber allein von der **Reihenfolge der Einfügungen** ab – und die hat man meistens nicht in der Hand. Im günstigsten Fall halbiert jeder Vergleich die Menge (Höhe ≈ log n), im ungünstigsten entartet der Baum zur Kette (Höhe = n), und die Suche ist genauso langsam wie in einer Liste.

Eine Garantie gibt erst ein Baum, der sich selbst ausbalanciert – der [AVL-Baum](./avl-baum).

::::

---

## Selbsttest

::::multievent

**1. Welche Ordnung gilt in einem binären Suchbaum?**

{r1{links die größeren, rechts die kleineren Inhalte}}

{r1{!links die kleineren, rechts die größeren Inhalte}}

{r1{die Reihenfolge des Einfügens}}

{h{Deshalb liefert die In-Order-Traversierung die sortierte Folge.}}
{H{Richtig!}}

**2. Wie viele Vergleiche braucht die Suche in einem ausgeglichenen Suchbaum mit 1000 Einträgen ungefähr?**

{z{10}}

{h{Bei jedem Schritt halbiert sich die Menge - wie bei der binären Suche.}}
{H{Richtig!}}

**3. Was liefert die Methode search, wenn der Inhalt nicht enthalten ist?**

{r2{den nächstgrößeren Inhalt}}

{r2{!den Wert null}}

{r2{einen leeren Baum}}

{h{Die Dokumentation legt das ausdrücklich fest.}}
{H{Richtig!}}

**4. Was passiert mit der Suchdauer, wenn man aufsteigend sortierte Werte einfügt?**

{r3{sie bleibt logarithmisch}}

{r3{!sie wird linear, weil der Baum zu einer Kette entartet}}

{r3{das Einfügen schlägt fehl}}

{h{Jeder neue Wert ist größer als alle bisherigen und landet rechts.}}
{H{Richtig! Genau dieses Problem lösen ausgeglichene Bäume.}}

::::
