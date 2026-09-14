---
name: Aufbau und Funktionsweise
index: 1
lang: de
---

# Aufbau und Funktionsweise

![](/images/queue-crc-karten.png)

## Nachrichten einreihen

Die Methode enqueue soll eine neue Nachricht ans Ende der Warteschlange anhängen.

::jmp{id="schlange-einreihen" src="einreihen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zur Methode enqueue der Klasse Queue einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafka"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Benachrichtungen lesen

Die Methode front soll die erste Nachricht in der Warteschlange zurückgeben. Die Methode dequeue soll die erste Nachricht aus der Warteschlange entfernen.

::jmp{id="schlange-entnehmen" src="entnehmen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zu den Methoden dequeue und front einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Abgrenzung zur Liste

Bis jetzt haben wir die lineare Datenstruktur Liste verwendet. Die lineare Datenstruktur wirkt zunächst als ein Rückschritt.

### Aufgaben

1. Beschreibe die Unterschiede zwischen den linearen Datenstrukturen Warteschlange und Liste.
2. Überlege, warum es spezialisierte lineare Datenstrukturen wie die Warteschlang gibt.

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge verlässt man eine Schlange?**

{r1{!wer zuerst kam, geht zuerst}}

{r1{wer zuletzt kam, geht zuerst}}

{r1{in zufälliger Reihenfolge}}

{h{Wie an der Supermarktkasse.}}
{H{Richtig! Man nennt das auch First In, First Out.}}

**2. An welchen Stellen wird bei einer Schlange gearbeitet?**

{r2{nur vorne}}

{r2{!hinten eingefügt, vorne entfernt}}

{r2{nur hinten}}

{h{Genau darin unterscheidet sie sich vom Stapel.}}
{H{Richtig!}}

**3. Wo begegnet dir eine Schlange im Rechner?** (Mehrfachauswahl)

{c1{!bei Druckaufträgen}}

{c1{!bei Nachrichten, die der Reihe nach abgearbeitet werden}}

{c1{!bei der Breitensuche in einem Graphen}}

{c1{bei der Verwaltung von Methodenaufrufen}}

{h{Methodenaufrufe kehren in umgekehrter Reihenfolge zurück.}}
{H{Richtig! Dafür ist ein Stapel zuständig.}}

**4. Warum braucht eine Schlange zwei Verweise?**

{r3{um schneller zu sein}}

{r3{!weil an beiden Enden gearbeitet wird}}

{r3{um die Länge zu kennen}}

{h{Ohne Verweis auf das Ende müsste jedes Einfügen die ganze Schlange durchlaufen.}}
{H{Richtig!}}

::::
