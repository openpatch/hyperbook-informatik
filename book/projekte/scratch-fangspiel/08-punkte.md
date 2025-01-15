---
name: Punkte
index: 8
lang: de
---

# Punkte

In unserem Spiel sammeln wir Punkte, indem wir Orangen fangen. Doch was passiert, wenn wir eine verfaulte Orange fangen? Richtig, wir verlieren Punkte. In diesem Kapitel lernst du, wie du Punkte in deinem Spiel zählst und verwaltest.

## Schritt 1: Variable anlegen

Um Punkte in deinem Spiel zu zählen, benötigst du eine Variable. Diese Variable speichert den aktuellen Punktestand.

1. Gehe zur Kategorie **Variablen**.
2. Lege eine neue Variable an und nenne sie `Punkte`.

## Schritt 2: Punkte gewinnen

Nun musst du die Punkte zählen, wenn du eine Orange fängst. Dafür benötigst du einen neuen Block aus der Kategorie **Variablen**.

1. Klicke auf die Figur Orange.
2. Ziehe den Block `ändere Punkte um 1` in den Skriptbereich.
3. Platzieren den Blokc unter dem Blokc `spiele Klang`.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
falls <wird (Bowl v) berührt?>, dann
    spiele Klang (Pop v)
    ändere [Punkte v] um (1)
    gehe zu (Zufallsposition v)
    setze y auf (180)
:::

## Schritt 3: Punkte verlieren

Wenn du eine verfaulte Orange fängst, sollst du Punkte verlieren. Dafür benötigst du wieder einen Block aus der Kategorie **Variablen**.

1. Klicke auf die Figur Faule Orange.
2. Ziehe den Block `ändere Punkte um -1` in den Skriptbereich.
3. Platziere den Block unter dem Block `spiele Klang`.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
falls <wird (Bowl v) berührt?>, dann
    spiele Klang (Pop v)
    ändere [Punkte v] um (-1)
    gehe zu (Zufallsposition v)
    setze y auf (180)
:::