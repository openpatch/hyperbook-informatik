---
name: Vergleichen
index: 4
lang: de
permaid: evolution-vergleichen
---

# Vergleichen

Am Beispiel des Smart Rocket Projekts werden wir verschiedene Selektionsalgorithmen kennenlernen und miteinander vergleichen.

Das Projekt wurde bisher mit der Fitnessproportionalen Selektion implementiert (siehe Methode natuerlicheSelektionFitness in der Klasse Population).

Im Folgenden sollen auch andere mögliche Selektionsalgorithmen erprobt werden.

Zum Vergleich gehen wir zunächst von der nachfolgenden Situation aus.

![Raketen mit Fitnesswerten](/images/evolutionaere-algorithmen/smart-rocket-selektion.png)


## Fitnessproportionale Selektion

Die Fitnessproportionale Selektion funktioniert so wie du sie bereits kennengelernt hast. Im Struktogramm ist eine programmiersprachenunabhängige Darstellung des Algorithmus.

:::struktolab{fontSize=15}
```
wiederhole für jede Rakete der Population:
    Bestimme die Anzahl der zugewiesenen Plätze (97 Fitness entspricht 97 Plätzen)
    Füge die Rakete so oft wie die Anzahl der zugewiesenen Plätze dem Partnerpool hinzu
```
:::


### Aufgabe 1

Führe den Algorithmus der fitnessproportionalen Selektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Häufig werden die Anzahl der zugewiesenen Plätze anders bestimmt. Nämlich mit der folgenden Formel:

$$
Anzahl\ Plätze = \frac{Fitnesswert\ der\ Rakete}{Maximaler Fitnesswert\ in\ der\ Population} * 100
$$

Beschreibe wie sich die Formel auf die zugewiesenen Plätze auswirkt. Vergleiche dazu die zugewiesenen Plätze der einzelnen Raketen für beide Verfahren.

## Turnierselektion

Die Turnierselektion funktioniert wie im Struktogramm dargestellt.

:::struktolab{fontSize=15}
```
wiederhole für 10 mal:
    Wähle eine Rakete (R1) zufällig aus
    Wähle eine Rakete (R2) zufällig aus
    falls R1 Fitness > R2 Fitness:
        Nimm R1 in den Partnerpool auf
    sonst:
        Nimm R2 in den Partnerpool auf
```
:::

### Aufgabe 1

Führe den Algorithmus der Turnierselektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Führe den Algorithmus mehrmals aus (mindestens 5 mal) und vergleiche die entstandenen Partnerpools.

## Bestenselektion

Die Bestenselektion funktioniert wie im Struktogramm dargestellt.

:::struktolab{fontSize=15}
```
Sortiere die Population anhand des Fitness-Wertes
Wähle die besten 6 Raketen für den Partnerpool
```
:::

### Aufgabe 1

Führe den Algorithmus der Bestenselektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Beschreibe, ob es besser wäre weniger oder mehr als die besten fünf Raketen auszuwählen.

## Turnierselektion implementieren

Jetzt sollst du den Turnier-Algorithmus im Projekt Smart Rocket implementieren.

Implementiere auch die Methode natuerlicheSelektionTurnier in der Klasse Population.

Um die neue Selektionsmethode zu verwenden, musst du auch in der Klasse Level in Zeile 47 den Methodenaufruf ändern.

::archive[SmartRocket Selektionsprojekt]{name="smart-rocket-selektion"}

## 🚀 Bestenselektion implementieren

Die Population ist in einem Array gespeichert. Dabei müssen die Raketen nicht sortiert sein. Wenn wir jedoch die Bestenselektion verwenden möchten, dann muss die Population bzgl. der Fitnesswerte sortiert werden.

Überlege die ein Verfahren wie man ein Array sortieren kann. Nutze zum Ausprobieren die zehn Fitnesswerte der Raketen.

Denke daran, dass ein Computer keine "Draufsicht" hat, sondern wir müssen ihm konkrete Anweisungen geben.