---
title: Farben
index: 6
permaid: openscad-farben
---

# Farben

Mit dem Befehl `color()` kannst du Objekten in der Vorschau eine Farbe geben. Das macht es einfacher, verschiedene Teile eines Modells zu unterscheiden.

```scad
color("Farbname") Anweisung;
```

:::alert{info}
Farben in OpenSCAD:
- **Vorschau:** Farben werden in der Vorschau angezeigt
- **3D-Druck:** Die Farbinformationen werden **nur im 3MF-Format** exportiert
- **STL-Format:** Farben gehen verloren – das gedruckte Modell verwendet das Filament deines Druckers
- **Multi-Material-Drucker:** Mit 3MF und passendem Slicer kannst du farbige Modelle drucken
:::

## Farbnamen

Du kannst englische Farbnamen verwenden:

:::openscad{height="500px"}
```scad
$fn = 32;

color("red")    translate([-60, 0, 0]) sphere(r=15);
color("green")  translate([-20, 0, 0]) sphere(r=15);
color("blue")   translate([ 20, 0, 0]) sphere(r=15);
color("yellow") translate([ 60, 0, 0]) sphere(r=15);
```
:::

Einige nützliche Farbnamen:

| Deutsch   | Englisch  |
| --------- | --------- |
| Rot       | `"red"`   |
| Grün      | `"green"` |
| Blau      | `"blue"`  |
| Gelb      | `"yellow"`|
| Orange    | `"orange"`|
| Weiß      | `"white"` |
| Grau      | `"gray"`  |
| Schwarz   | `"black"` |

Eine vollständige Liste findest du unter: https://en.wikipedia.org/wiki/Web_colors

## Transparenz

Als zweiten Parameter kannst du die Transparenz angeben (0 = unsichtbar, 1 = undurchsichtig):

:::openscad{height="400px"}
```scad
$fn = 32;

// Undurchsichtiger Würfel
color("blue", 1.0) cube([30, 30, 30], center=true);

// Halbtransparente Kugel darüber
color("red", 0.4) sphere(r=25);
```
:::

## Übung

::::snippet{#aufgabe}
Erstelle ein Modell aus mindestens drei Objekten, jedes in einer anderen Farbe. Verwende auch Transparenz bei einem Objekt.

:::openscad{height="500px"}
```scad
cube(30);
```
:::

::::
