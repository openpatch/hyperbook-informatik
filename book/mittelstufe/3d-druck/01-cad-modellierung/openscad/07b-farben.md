---
title: Farben
index: 7.5
---

# Farben

Mit dem Befehl `color()` kannst du Objekten in der Vorschau eine Farbe geben. Das macht es einfacher, verschiedene Teile eines Modells zu unterscheiden.

```scad
color("Farbname") Anweisung;
```

:::alert{info}
Farben sind **nur für die Vorschau** – beim 3D-Druck spielt die Farbe im Quelltext keine Rolle. Die Farbe des gedruckten Modells hängt vom Filament ab.
Wenn eine Farbe gesetzt wurde, dann erkennt das der Slicer und lässt dich beim
Slicen die Farbe des Modells auswählen.
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

:::snippet{#aufgabe}
Erstelle ein Modell aus mindestens drei Objekten, jedes in einer anderen Farbe. Verwende auch Transparenz bei einem Objekt.
:::

:::openscad{height="500px"}
```scad

```
:::
