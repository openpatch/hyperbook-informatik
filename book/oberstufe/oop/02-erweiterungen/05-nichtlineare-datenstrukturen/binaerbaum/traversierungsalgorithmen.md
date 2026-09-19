---
name: Traversierungsalgorithmen
index: 4
lang: de
permaid: java-traversierungsalgorithmen
---

# Traversierungsalgorithmen

Auf der Seite [Traversierung](./traversierung) hast du die drei Reihenfolgen von Hand durchgespielt. Jetzt schreibst du sie als **rekursive Algorithmen** auf.

:::snippet{#merken}
Alle drei haben denselben Bau – sie unterscheiden sich in **einer einzigen Zeile**:

```text
preOrder(baum):
    wenn baum leer ist: fertig
    gib den Inhalt aus          <-- Wurzel zuerst
    preOrder(linker Teilbaum)
    preOrder(rechter Teilbaum)
```

Für **In-Order** rutscht die Ausgabezeile zwischen die beiden Aufrufe, für **Post-Order** hinter sie. Sonst ändert sich nichts.

Der **Basisfall** ist immer derselbe: ein leerer Knoten. Das ist der Grund, warum man nie auf `null` prüfen muss – die Abiturklasse legt unter jedem gefüllten Knoten zwei leere an, und auf denen bricht die Rekursion ab.
:::

## Pre-Order

::jmp{id="baum-preorder" src="preorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an, in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Löse das Code-Puzzle unten zur Pre-Order-Methode und ordne dort die Kontakte in die Reihenfolge, die du aufgeschrieben hast.
3. Führe den Algorithmus am Objektdiagramm aus.

::bitflow{id="puzzle-preorder" src="preorder.bitflow" height="820px"}

## Post-Order

::jmp{id="baum-postorder" src="postorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an, in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Formuliere einen Algorithmus im Pseudocode in Anlehnung an das Pre-Order-Puzzle. Mit dem Code-Puzzle unten kannst du dich anschließend kontrollieren.
3. Führe den Algorithmus am Objektdiagramm aus.

::bitflow{id="puzzle-postorder" src="postorder.bitflow" height="820px"}

## In-Order

::jmp{id="baum-inorder" src="inorder.jmp" height="700px"}

1. Betrachte das Objektdiagramm und gib die Reihenfolge an, in der die Kontakte durchlaufen werden. Schreibe dazu die Reihenfolge der Benutzernamen auf.
2. Formuliere einen Algorithmus im Pseudocode in Anlehnung an das Pre-Order-Puzzle. Mit dem Code-Puzzle unten kannst du dich anschließend kontrollieren.
3. Führe den Algorithmus am Objektdiagramm aus.

::bitflow{id="puzzle-inorder" src="inorder.bitflow" height="820px"}

## Suchen in Binärbäumen

Im Binärbaum soll überprüft werden, ob ein bestimmtes Objekt enthalten ist.

::jmp{id="baum-suchen" src="suchen.jmp" height="700px"}

:::snippet{#aufgabe}
a) Modifiziere den Pre-Order-Algorithmus so, dass er prüft, ob ein Objekt im Binärbaum enthalten ist. Die Methode soll `searchPreOrder` heißen und `true` zurückgeben, wenn `pContent` enthalten ist, sonst `false`.

b) Teste deine Fassung am Objektdiagramm, und zwar **beide** Fälle. Fang mit dem Fall an, dass das Objekt enthalten ist.

c) Analysiere, wie viele Schritte im schlechtesten Fall nötig sind.

d) Überlege, wie man den Binärbaum ändern könnte, damit die Suche schneller wird.
:::

::::collapsible{title="Auflösung" id="traversierung-suchen-aufloesung"}

a) Aus dem Ausgeben wird ein Vergleichen, und die beiden rekursiven Aufrufe werden mit **oder** verknüpft:

```text
searchPreOrder(baum, pContent):
    wenn baum leer ist: gib false zurück
    wenn Inhalt = pContent: gib true zurück
    gib searchPreOrder(linker Teilbaum, pContent)
        ODER searchPreOrder(rechter Teilbaum, pContent) zurück
```

b) Ist das Objekt enthalten, meldet einer der beiden Aufrufe `true`, und das `true` wird nach oben durchgereicht. Ist es nicht enthalten, laufen **alle** Äste bis zu den leeren Knoten und liefern `false`.

c) **Alle Knoten**, also `n` Schritte. Der Pre-Order-Durchlauf weiß nicht, wo er suchen soll – er kann nur jeden Knoten anschauen. Das ist genauso viel wie bei einer linearen Liste; der Baum bringt hier also **gar nichts**.

d) Man müsste die Inhalte so **anordnen**, dass sich an jedem Knoten entscheiden lässt, in welchem der beiden Teilbäume weitergesucht werden muss – dann fiele die Hälfte bei jedem Schritt weg. Genau das ist der [binäre Suchbaum](../binaerer-suchbaum).

::::

---

## Selbsttest

::::multievent

**1. Was ist der Basisfall jedes rekursiven Traversierungsalgorithmus?**

{r1{ein Knoten mit zwei Nachfolgern}}

{r1{!ein leerer Knoten}}

{r1{die Wurzel}}

{h{Dort hört die Rekursion auf.}}
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
