---
title: Schleifen
index: 11
---

# Schleifen

In OpenSCAD kannst du mit Schleifen wiederholende Strukturen erstellen. Das ist besonders nützlich, wenn du viele ähnliche Objekte erstellen möchtest, wie zum Beispiel eine Reihe von Löchern oder eine Anordnung von Zylindern.

Eine Schleife in OpenSCAD wird mit der `for`-Anweisung erstellt. Hier ist die allgemeine Syntax:

```scad
for (variable = [start:step:end]) {
    // Anweisungen, die in der Schleife ausgeführt werden
}

// oder kurzer mit step = 1
for (variable = [start:end]) {
    // Anweisungen, die in der Schleife ausgeführt werden
}
```

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