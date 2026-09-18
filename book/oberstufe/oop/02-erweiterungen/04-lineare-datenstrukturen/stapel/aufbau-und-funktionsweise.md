---
name: Aufbau und Funktionsweise
index: 1
lang: de
permaid: java-stapel-aufbau
scripts:
  - /wc/oop-stapel-schlange.js
---

# Aufbau und Funktionsweise

![](/images/stack-crc-karten.png)

## Erst einmal ausprobieren

Bevor du den Stapel selbst baust, benutze ihn. Unten liegt eine Operationsfolge bereit: Sage **zuerst** voraus, welche Ausgaben sie erzeugt, und lass sie dann ablaufen.

<oop-stapel-schlange id="stapel-spielwiese" modus="stapel" folge="push(Anna); push(Ben); top(); pop(); push(Cem); top(); pop(); pop(); isEmpty()"></oop-stapel-schlange>

:::snippet{#aufgabe}
a) Notiere die erwarteten Ausgaben, trage sie ein und lass die Folge ablaufen.

b) Nur `top()` und `isEmpty()` liefern überhaupt etwas. Erkläre, warum `pop()` in der Dokumentation keinen Rückgabewert hat.

c) Lege danach von Hand drei Nachrichten auf und hebe sie wieder ab. In welcher Reihenfolge kommen sie heraus? Wie heißt dieses Prinzip?
:::

## Nachrichten auflegen

Die Methode push soll eine neue Nachricht auf den Stapel legen.

::jmp{id="stapel-auflegen" src="auflegen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zur Methode push der Klasse Stack einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafka"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Benachrichtungen lesen

Die Methode top soll die erste Nachricht auf dem Stapel zurückgeben. Die Methode pop soll die erste Nachricht des Stapels entfernen.

::jmp{id="stapel-abheben" src="abheben.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zu den Methoden pop und top einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Der Call-Stack

Der Stapel ist eine der wichtigsten Datenstrukturen in der Programmierung. Er bildet die Grundstruktur für die Ausführung von Methoden.

### Aufgaben

1. Informiere dich über den Aufbau und die Funktionsweise des sogenannten Call-Stacks. Nutze dazu die Seite [2.3 Kellerstapel und Halde](../../02-felder-referenzen-generik/03-kellerstapel-und-halde).
2. Bereite dich auf eine Präsentation vor.

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge verlässt man einen Stapel?**

{r1{wer zuerst kam, geht zuerst}}

{r1{!wer zuletzt kam, geht zuerst}}

{r1{in zufälliger Reihenfolge}}

{h{Denk an einen Stapel Teller.}}
{H{Richtig! Man nennt das auch Last In, First Out.}}

**2. An welcher Stelle wird bei einem Stapel eingefügt und entfernt?**

{r2{vorne eingefügt, hinten entfernt}}

{r2{!an derselben Stelle, naemlich oben}}

{r2{an einer beliebigen Stelle}}

{h{Genau das macht den Stapel so einfach.}}
{H{Richtig!}}

**3. Wo begegnet dir ein Stapel im Rechner?** (Mehrfachauswahl)

{c1{!bei der Verwaltung von Methodenaufrufen}}

{c1{!bei der Rückgängig-Funktion eines Programms}}

{c1{!beim Auswerten von Klammerausdrücken}}

{c1{bei der Warteschlange an einem Drucker}}

{h{Beim Drucker kommt dran, wer zuerst da war.}}
{H{Richtig! Das ist eine Schlange, kein Stapel.}}

**4. Welche Aufwandsklasse hat das Auflegen auf einen Stapel?**

{r3{linear}}

{r3{!konstant}}

{r3{logarithmisch}}

{h{Es wird immer nur oben angesetzt, egal wie hoch der Stapel ist.}}
{H{Richtig!}}

::::
