---
name: Donut IO
index: 10
lang: de
permaid: donut-io
keywords:
    - scratch4j
    - java
    - level-1
---

# Donut IO

## Ziel

In diesem Projekt programmierst du ein Spiel nach dem Vorbild von
[agar.io](https://de.wikipedia.org/wiki/Agar.io): Du steuerst einen Donut mit
der Maus, frisst kleinere Donuts und wirst dabei immer größer. Aber Vorsicht –
andere Donuts jagen dich, und wer größer ist, frisst den Kleineren.

Unterwegs lernst du, wie man

- eine Figur mit **Vektoren** in Richtung des Mauszeigers bewegt,
- **Kollisionen** zwischen zwei Figuren erkennt,
- mit einer **Kamera** eine Welt baut, die größer ist als der Bildschirm,
- mit **Vererbung** verschiedene Donuts aus einer gemeinsamen Klasse ableitet,
- zwischen mehreren **Ansichten** (Startbildschirm, Spiel, Gewonnen, Verloren) wechselt.

![Screenshot vom Scratch for Java Donut IO Projekt](/images/scratch-for-java-donut-io.png "Screenshot des Scratch for Java Donut IO Projektes")

## Vorwissen

Du solltest programmieren können, was im Lernpfad
[Grundlagen der Programmierung mit Java](/oberstufe/oop/01-grundlagen) steht,
vor allem:

- [Klassen und Objekte](/oberstufe/oop/01-grundlagen/06-objektorientierung/01-klassen-und-objekte)
- [Vererbung](/oberstufe/oop/01-grundlagen/06-objektorientierung/04-vererbung)
- [Eigene Sprites](/oberstufe/oop/01-grundlagen/06-objektorientierung/05-eigene-sprites) mit der Methode `run()`

Vektoren musst du noch nicht kennen. Was du brauchst, lernst du auf der ersten Seite.

## So arbeitest du damit

:::snippet{#merken}
- Alle Programmierbereiche laufen **im Browser**. Du musst nichts installieren.
- Jeder Bereich enthält das vollständige Programm der jeweiligen Stufe. Du kannst
  darin herumändern – ein Neuladen der Seite stellt den Ursprung wieder her.
- Gestartet wird mit dem kleinen Pfeil **neben `Main.java`** in der Dateiliste links.
- Klicke vor dem Spielen einmal in die Ausgabe, damit sie Maus und Tastatur bekommt.
:::

## Die Seiten

| Seite | Darum geht es |
| --- | --- |
| [Dem Mauszeiger folgen](./01-dem-mauszeiger-folgen) | Ein Donut bewegt sich mit Vektoren auf die Maus zu |
| [Futter fressen](./02-futter-fressen) | Kollisionen erkennen, fressen und wachsen |
| [Die Kamera](./03-die-kamera) | Eine Welt, die größer ist als der Bildschirm |
| [Verfolger](./04-verfolger) | Gegner, die dich jagen – und eine Methode für alle |
| [Bildschirme und Level](./05-bildschirme-und-level) | Startbildschirm, Gewonnen, Verloren und immer schwerere Level |

Grundlage ist das Beispiel
[Donut IO](https://github.com/openpatch/scratch-for-java/tree/main/src/examples/java/demos/donutIO)
aus Scratch for Java.
