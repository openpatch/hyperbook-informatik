---
name: Aufbau und Funktionsweise
index: 1
lang: de
permaid: java-warteschlange-aufbau
scripts:
  - /wc/oop-stapel-schlange.js
---

# Aufbau und Funktionsweise

An der Supermarktkasse gilt eine Regel, die niemand aufschreiben muss: **Wer zuerst da war, ist zuerst dran.** Wer dazukommt, stellt sich hinten an. Bedient wird vorne. Dazwischen passiert nichts – man kann sich nicht in die Mitte stellen und auch niemanden aus der Mitte herausziehen.

Genau diese Regel – und genau diese Beschränkung – ist die **Warteschlange**.

:::snippet{#definition}
Eine **Warteschlange** (englisch *queue*) ist eine lineare Datenstruktur mit zwei Zugriffsstellen:

- **hinten** wird eingefügt (`enqueue`),
- **vorne** wird gelesen (`front`) und entfernt (`dequeue`).

Das Prinzip heißt **FIFO** – *First In, First Out*: Was zuerst hineinkommt, kommt zuerst wieder heraus.
:::

:::snippet{#merken}
Dass man **nicht** in die Mitte greifen kann, ist kein Mangel, sondern der Zweck. Eine Struktur, die nur zwei Operationen zulässt, kann man nicht falsch bedienen – und sie lässt sich so bauen, dass beide Operationen **gleich schnell** sind, egal wie lang die Schlange ist.

Wo dir das im Rechner begegnet: Druckaufträge, eingehende Netzwerkpakete, Tastatureingaben, Aufgaben in einer Warteliste.
:::

![](/images/queue-crc-karten.png)

## Erst einmal ausprobieren

Dieselbe Operationsfolge wie beim Stapel – nur heißen die Methoden anders und die Reihenfolge dreht sich um. Sage voraus, was herauskommt.

<oop-stapel-schlange id="schlange-spielwiese" modus="schlange" folge="enqueue(Anna); enqueue(Ben); front(); dequeue(); enqueue(Cem); front(); dequeue(); dequeue(); isEmpty()"></oop-stapel-schlange>

:::snippet{#aufgabe}
a) Notiere die erwarteten Ausgaben, trage sie ein und lass die Folge ablaufen.

b) Vergleiche mit dem [Stapel](../stapel/aufbau-und-funktionsweise): Dieselbe Folge, andere Ausgaben. Erkläre den Unterschied in einem Satz.

c) `front()` liefert immer das Element, das am längsten wartet. An welchem Ende der Schlange wird also angehängt und an welchem entnommen?
:::

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

## Benachrichtigungen lesen

Die Methode front soll die erste Nachricht in der Warteschlange zurückgeben. Die Methode dequeue soll die erste Nachricht aus der Warteschlange entfernen.

::jmp{id="schlange-entnehmen" src="entnehmen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zu den Methoden dequeue und front einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Abgrenzung zur Liste

Eine Liste kann alles, was eine Warteschlange kann – und mehr. Auf den ersten Blick wirkt die Warteschlange deshalb wie ein Rückschritt.

:::snippet{#aufgabe}
a) Beschreibe die Unterschiede zwischen Warteschlange und Liste. Nimm dazu beide Dokumentationen nebeneinander: Welche Operationen hat die eine, die die andere nicht hat?

b) Begründe, warum es trotzdem spezialisierte Strukturen wie die Warteschlange gibt. Denk dabei an zwei verschiedene Arten von Vorteil – einen für den, der die Struktur **benutzt**, und einen für den, der sie **baut**.
:::

::::collapsible{title="Auflösung" id="schlange-abgrenzung-aufloesung"}

a) Die Liste hat einen beweglichen Zeiger (`toFirst`, `next`, `hasAccess`, `getContent`) und erlaubt Einfügen und Entfernen an jeder Stelle. Die Warteschlange hat nur `enqueue`, `front`, `dequeue` und `isEmpty` – kein Durchlaufen, kein Zugriff auf die Mitte.

b) Zwei Vorteile:

- **Für den, der sie benutzt:** Der Typ sagt die Absicht. Steht im Quelltext `Queue<Auftrag>`, dann weiß jede Leserin sofort, dass hier der Reihe nach abgearbeitet wird – und niemand *kann* versehentlich vordrängeln. Eine Liste ließe beides offen.
- **Für den, der sie baut:** Wer weniger verspricht, kann es besser halten. Weil nur an den beiden Enden gearbeitet wird, kommt die Warteschlange mit einem Verweis auf den Anfang **und** einem auf das Ende aus und schafft beide Operationen in konstanter Zeit.

Das ist ein allgemeines Entwurfsprinzip: **Die schwächere Schnittstelle ist oft die bessere.**

::::

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
