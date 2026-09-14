---
name: Aufbau und Funktionsweise
index: 0
lang: de
hide: false
permaid: java-suchbaum-aufbau
---

# Aufbau und Funktionsweise

![](/images/bst-crc-karten.png)

Die Kontakte sind anhand der Benutzernamen im binären Suchbaum einsortiert.

`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`

In den linken Teilbaum werden jeweils kleinere Kontakte eingefügt. In den rechten Teilbaum die größeren Kontakte.

Beispiel: Wenn der Inhalt ein Kontakt mit dem Benutzernamen `fred` ist, dann würde ein Kontakt mit dem Benutzernamen `alf` in den linken Teilbaum eingefügt.

## Kontakte suchen

Die Methode `Contact search(Contact pContent)` soll überprüfen, ob ein Kontakt mit einem bestimmten Benutzernamen im binären Suchbaum enthalten ist. Falls dies der Fall ist, dann liefert search das Kontakt-Objekt zurück, ansonsten wird null zurückgegeben.

::jmp{id="bst-suchen" src="suchen.jmp" height="700px"}

1. Sucht, ob der Kontakt pContent im binären Suchbaum enthalten ist. Geht dabei schrittweise wie im Objektspiel vor. Nutzt dazu das Objektdiagramm oben.
2. Löst das Code-Puzzle unten zur Methode `search` und verfolgt danach den Weg, den die Suche durch den Baum nimmt.

::bitflow{id="puzzle-bst-suchen" src="suchen.bitflow" height="820px"}

:::collapsible{id="sfjkjkdfa" title="Teilösung des Code-Puzzles"}

![](/images/bst-search-code-puzzle.png)

:::


## Kontakte einfügen

Die Methode `void insert(Contact pContent)` soll einen neuen Kontakt (pContent) in den binären Suchbaum einfügen. Das Vergleichskriterium soll hierbei der Benutzername (username) sein.

::jmp{id="bst-einfuegen" src="einfuegen.jmp" height="700px"}

1. Fügt den pContent in den binären Suchbaum ein. Geht dabei schrittweise wie im Objektspiel vor. Benutzt dazu das Objektdiagramm oben.
2. Entwerft zur Methode insert der Klasse BinarySearchTree einen Algorithmus im :t[Pseudocode].
3. Überprüft euren Algorithmus anhand des Objektdiagramms.
4. Bereitet euch darauf vor den Algorithmus anhand des Objektdiagramms zu präsentieren.

::bitflow{id="puzzle-bst-einfuegen" src="einfuegen.bitflow" height="820px"}

:::collapsible{id="sakjkjdsavjsavkjs" title="Hilfe"}

Orientiert euch an der Lösung zum Methode `search`:

![](/images/bst-search-code-puzzle-loesung.png)

:::

---

## Selbsttest

::::multievent

**1. Welche Ordnung gilt in einem binaeren Suchbaum?**

{r1{links die größeren, rechts die kleineren Inhalte}}

{r1{!links die kleineren, rechts die größeren Inhalte}}

{r1{die Reihenfolge des Einfügens}}

{h{Deshalb liefert die In-Order-Traversierung die sortierte Folge.}}
{H{Richtig!}}

**2. Wie viele Vergleiche braucht die Suche in einem ausgeglichenen Suchbaum mit 1000 Eintraegen ungefaehr?**

{z{10}}

{h{Bei jedem Schritt halbiert sich die Menge - wie bei der binaeren Suche.}}
{H{Richtig!}}

**3. Was liefert die Methode search, wenn der Inhalt nicht enthalten ist?**

{r2{den nächstgrößeren Inhalt}}

{r2{!den Wert null}}

{r2{einen leeren Baum}}

{h{Die Dokumentation legt das ausdruecklich fest.}}
{H{Richtig!}}

**4. Was passiert mit der Suchdauer, wenn man aufsteigend sortierte Werte einfuegt?**

{r3{sie bleibt logarithmisch}}

{r3{!sie wird linear, weil der Baum zu einer Kette entartet}}

{r3{das Einfügen schlaegt fehl}}

{h{Jeder neue Wert ist größer als alle bisherigen und landet rechts.}}
{H{Richtig! Genau dieses Problem loesen ausgeglichene Bäume.}}

::::
