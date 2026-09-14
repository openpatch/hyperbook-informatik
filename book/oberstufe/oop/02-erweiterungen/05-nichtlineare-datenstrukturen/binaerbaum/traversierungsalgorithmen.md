---
name: Traversierungsalgorithmen
index: 4
lang: de
---

# Traversierungsalgorithmen

Wir haben schon drei Traversierungsmöglichkeiten kennengelernt.
Jetzt versuchen wir für die drei rekursive Alogrithmen zu entwicklen.

## Pre-Order

Die Schritte im Diagramm:

1. **Ausgangslage** – `preorder()` ist auf der Wurzel aufgerufen.
2. **Aufgabe** – Der Durchlauf ist beim Kontakt k angekommen: Baue den Kellerstapel für diesen Moment. Jeder neue Rahmen heißt `BinaryTree.preorder` und kennt nur this.

::jmp{id="baum-preorder" src="preorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Löse das [Code-Puzzle](https://parsons.problemsolving.io/puzzle/16fb1ec6065443c495c82f9b3014021e) zur Pre-Order-Methode.
3. Führe den Algorithmus am Objektdiagramm aus.

## Post-Order

::jmp{id="baum-postorder" src="postorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Formuliere einen Algorithmus im Pseudocode in Anlehnung an das Code-Puzzle.
3. Führe den Algorithmus am Objektdiagramm aus.

## In-Order

::jmp{id="baum-inorder" src="inorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Formuliere einen Algorithmus im Pseudocode in Anlehnung an das Code-Puzzle.
3. Führe den Algorithmus am Objektdiagramm aus.

## Suchen in Binärbäumen

Im Binärbaum soll überprüft werden, ob ein bestimmtes Objekt enthalten ist.

Die Schritte im Diagramm:

1. **Ausgangslage** – `searchPreOrder(pContent)` ist auf der Wurzel aufgerufen, gesucht wird c.
2. **Aufgabe** – Der Kontakt ist gefunden: Baue den Kellerstapel für diesen Moment. Jeder neue Rahmen heißt `BinaryTree.searchPreOrder` und kennt this und pContent. Überlege, welche Rahmen schon wieder abgeräumt sind.

::jmp{id="baum-suchen" src="suchen.jmp" height="700px"}

1. Modifiziere den Pre-Order-Algorithus so, dass überprüft wird, ob ein Objekt im Binärbaum enthalten ist. Die Methode soll `searchPreOrder` heißen und `true` zurückgeben, wenn das Objekt pContent enthalten ist und `false`, wenn dies nicht der Fall ist.
2. Teste deine Modifizierung am Objektdiagramm. Teste beide Fälle. Beginne damit, dass das Objekt enthalten ist.
3. Analysiere wie viele Schritte im schlechtesten Fall nötig sind, um herauszufinden, ob ein Objekt enthalten ist.
4. Überlege wie man den Binärbaum modifizieren könnte, sodass man schneller suchen kann.

---

## Selbsttest

::::multievent

**1. Was ist der Basisfall jedes rekursiven Traversierungsalgorithmus?**

{r1{ein Knoten mit zwei Nachfolgern}}

{r1{!ein leerer Knoten}}

{r1{die Wurzel}}

{h{Dort hoert die Rekursion auf.}}
{H{Richtig!}}

**2. Was unterscheidet die drei rekursiven Traversierungen voneinander?**

{r2{die Anzahl der rekursiven Aufrufe}}

{r2{!die Stelle, an der die Wurzel verarbeitet wird}}

{r2{die Reihenfolge der Teilbäume}}

{h{Die beiden rekursiven Aufrufe stehen immer in derselben Reihenfolge.}}
{H{Richtig! Nur die Ausgabe wandert.}}

**3. Welche Datenstruktur braucht die Level-Order-Traversierung?**

{r3{einen Stapel}}

{r3{!eine Schlange}}

{r3{ein Feld}}

{h{Die Knoten werden in der Reihenfolge abgearbeitet, in der sie entdeckt wurden.}}
{H{Richtig!}}

**4. Welche Aufwandsklasse hat eine vollständige Traversierung?**

{r4{logarithmisch}}

{r4{!linear in der Anzahl der Knoten}}

{r4{quadratisch}}

{h{Jeder Knoten wird genau einmal besucht.}}
{H{Richtig!}}

::::
