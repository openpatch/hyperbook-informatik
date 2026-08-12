---
title: Schleifen
index: 3
permaid: openscad-schleifen
---

# Schleifen

In OpenSCAD kannst du mit Schleifen wiederholende Strukturen erstellen. Das ist besonders nützlich, wenn du viele ähnliche Objekte erstellen möchtest, wie zum Beispiel eine Reihe von Löchern oder eine Anordnung von Zylindern.

:::alert{info}
Stell dir vor, du möchtest 10 Zylinder nebeneinander platzieren. Du könntest 10 Mal `translate(...)  cylinder(...)` schreiben – oder du verwendest eine Schleife, die das für dich erledigt.
:::

Eine Schleife in OpenSCAD wird mit der `for`-Anweisung erstellt. Hier ist die allgemeine Syntax:

```scad
for (variable = [start:step:end]) {
    // Anweisungen, die in der Schleife ausgeführt werden
}

// oder kürzer mit step = 1
for (variable = [start:end]) {
    // Anweisungen, die in der Schleife ausgeführt werden
}
```

Die Variable nimmt dabei nacheinander jeden Wert von `start` bis `end` (in Schritten von `step`) an.

Hier ist ein Beispiel, wie du eine Reihe von Zylindern erstellen kannst:


::::snippet{#aufgabe}
Verändere die Werte in der `for`-Schleife, um mehr oder weniger Zylinder zu erstellen oder um die Abstände zwischen den Zylindern zu ändern.

:::openscad{height="600px"}
```scad
for (i = [0:1:10]) {
    translate([i*20, 0, 0]) cylinder(h=10, r=5);
}
```
:::

::::

## Verschachtelte Schleifen

Du kannst auch Schleifen innerhalb von Schleifen verwenden, um komplexere Strukturen zu erstellen. Hier ist ein Beispiel, wie du eine Anordnung von Zylindern in einem Raster erstellen kannst:

:::openscad{height="600px"}
```scad
for (i = [0:1:5]) {
    for (j = [0:1:5]) {
        translate([i*20, j*20, 0]) 
        cylinder(h=10, r=5);
    }
}
```
:::

::::snippet{#aufgabe}
Verändere das Beispiel so, dass jeder Zylinder eine andere Höhe bekommt. Nutze dazu die Variable `i` oder `j` beim Parameter `h`.

Tipp: `cylinder(h=i*5+5, r=5)`

:::openscad{height="600px"}
```scad
for (i = [0:1:5]) {
    for (j = [0:1:5]) {
        translate([i*20, j*20, 0]) 
        cylinder(h=10, r=5);
    }
}
```
:::

::::

---

## Selbsttest

::::multievent

**1. Wie oft wird der Rumpf bei einem Bereich von 0 bis 4 ausgeführt?**

{z{5}}

{h{Beide Grenzen gehören dazu – anders als bei range in Python.}}
{H{Richtig: 0, 1, 2, 3 und 4.}}

**2. Wie oft wird der Rumpf bei einem Bereich von 0 bis 3 ausgeführt?**

{z{4}}

{h{Zähl die Werte auf.}}
{H{Richtig. Die Zahl der Durchläufe ist die obere Grenze plus eins.}}

**3. Welche Werte nimmt die Zählvariable bei einem Bereich von 0 bis 6 mit Schrittweite 2 an?**

{r1{0, 1, 2, 3, 4, 5, 6}}

{r1{!0, 2, 4, 6}}

{r1{0 und 6}}

{r1{2, 4, 6}}

{h{Die mittlere Zahl ist die Schrittweite.}}
{H{Richtig – vier Durchläufe.}}

**4. Zehn Kugeln sollen mit je 15 Millimetern Abstand in einer Reihe stehen. Was gehört in den Schleifenrumpf?**

{r2{nur die Kugel, ohne Verschiebung}}

{r2{!ein translate, dessen x-Wert aus der Zählvariablen mal 15 berechnet wird, und dahinter die Kugel}}

{r2{zehn einzelne Kugelbefehle}}

{r2{ein rotate}}

{h{Ohne Verschiebung liegen alle zehn Kugeln an derselben Stelle.}}
{H{Richtig – die Zählvariable liefert den Abstand.}}

**5. Was entsteht bei zwei ineinander geschachtelten Schleifen?**

{r3{eine längere Reihe}}

{r3{!ein Raster in zwei Richtungen}}

{r3{ein Fehler}}

{r3{ein Kreis}}

{h{Die innere Schleife läuft für jeden Durchlauf der äußeren vollständig durch.}}
{H{Richtig – bei 3 und 4 Durchläufen entstehen 12 Objekte.}}

::::
