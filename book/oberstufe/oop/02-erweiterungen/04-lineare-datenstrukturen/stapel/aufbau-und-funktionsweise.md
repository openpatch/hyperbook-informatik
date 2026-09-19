---
name: Aufbau und Funktionsweise
index: 1
lang: de
permaid: java-stapel-aufbau
scripts:
  - /wc/oop-stapel-schlange.js
---

# Aufbau und Funktionsweise

Drück in einem beliebigen Programm zehnmal Strg+Z. Die Änderungen werden **rückwärts** zurückgenommen – die letzte zuerst, die erste zuletzt. Das Programm hat sie sich gemerkt wie einen Stapel Teller: Neues kommt oben drauf, und heruntergenommen wird auch von oben.

Das ist die zweite Zugriffsregel, die in der Informatik überall auftaucht – und sie ist genau die **Umkehrung** der Warteschlange.

:::snippet{#definition}
Ein **Stapel** (englisch *stack*, auch *Kellerstapel*) ist eine lineare Datenstruktur mit nur **einer** Zugriffsstelle, dem oberen Ende:

- `push` legt oben auf,
- `top` liest das oberste Element,
- `pop` entfernt es.

Das Prinzip heißt **LIFO** – *Last In, First Out*: Was zuletzt hineinkommt, kommt zuerst wieder heraus.
:::

:::snippet{#merken}
Der Stapel ist die Struktur für alles, was **verschachtelt** ist und in umgekehrter Reihenfolge wieder aufgelöst werden muss:

| Wo | Was liegt auf dem Stapel |
| --- | --- |
| Rückgängig-Funktion | die letzten Änderungen |
| Methodenaufrufe | wohin zurückgesprungen werden muss – der **Aufrufstapel** |
| Klammerprüfung | die noch offenen Klammern |
| Zurück-Knopf im Browser | die zuletzt besuchten Seiten |

Alle vier haben dieselbe Form: Das zuletzt Begonnene muss als Erstes abgeschlossen werden.
:::

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

## Benachrichtigungen lesen

Die Methode top soll die erste Nachricht auf dem Stapel zurückgeben. Die Methode pop soll die erste Nachricht des Stapels entfernen.

::jmp{id="stapel-abheben" src="abheben.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zu den Methoden pop und top einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Der Aufrufstapel

Der wichtigste Stapel ist einer, den du nie selbst anlegst: Java führt für jedes Programm einen mit, um Methodenaufrufe zu verwalten. Ihn kennst du schon aus [2.3 Kellerstapel und Halde](../../02-felder-referenzen-generik/03-kellerstapel-und-halde) – und aus [3.1 Rekursion](../../03-rekursion-und-problemloesestrategien/01-rekursion), wo du ihn beim Aufrufbaum in Aktion gesehen hast.

:::snippet{#aufgabe}
a) Erkläre mit den Begriffen dieser Seite, was beim Aufruf einer Methode auf den Aufrufstapel gelegt und was beim `return` wieder abgehoben wird.

b) Begründe, warum dafür ein **Stapel** die richtige Struktur ist und keine Warteschlange.

c) Eine Endlosrekursion bricht mit einem `StackOverflowError` ab. Erkläre den Namen dieses Fehlers.
:::

::::collapsible{title="Auflösung" id="stapel-aufrufstapel-aufloesung"}

a) Bei jedem Aufruf wird ein **Kellerrahmen** aufgelegt: die Parameter, die lokalen Variablen und die Stelle, an die zurückgesprungen werden muss. Beim `return` wird genau dieser Rahmen wieder abgehoben, und das Programm läuft an der gemerkten Stelle weiter.

b) Weil Methodenaufrufe **verschachtelt** sind: Ruft `a()` die Methode `b()` auf und `b()` die Methode `c()`, dann muss `c()` als Erstes fertig werden. Das zuletzt Begonnene wird zuerst abgeschlossen – genau LIFO. Eine Warteschlange würde `a()` zuerst beenden wollen, obwohl `a()` noch mitten im Aufruf steckt.

c) Der Stapel hat eine feste Größe. Eine Rekursion ohne Abbruchbedingung legt Rahmen auf Rahmen, ohne je einen abzuheben – irgendwann läuft der Stapel über: *stack overflow*.

::::

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

{r2{!an derselben Stelle, nämlich oben}}

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
