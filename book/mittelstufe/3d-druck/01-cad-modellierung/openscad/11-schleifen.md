---
title: Schleifen
index: 11
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


:::snippet{#aufgabe}
Verändere die Werte in der `for`-Schleife, um mehr oder weniger Zylinder zu erstellen oder um die Abstände zwischen den Zylindern zu ändern.
:::

:::openscad{height="600px"}
```scad
for (i = [0:1:10]) {
    translate([i*20, 0, 0]) cylinder(h=10, r=5);
}
```
:::

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

:::snippet{#aufgabe}
Verändere das Beispiel so, dass jeder Zylinder eine andere Höhe bekommt. Nutze dazu die Variable `i` oder `j` beim Parameter `h`.

Tipp: `cylinder(h=i*5+5, r=5)`
:::