---
title: "BOSL2: Abgerundete Formen"
index: 22
permaid: openscad-bosl2-abgerundete-formen
---

# BOSL2: Abgerundete Formen

Scharfe Kanten sehen nicht nur weniger ansprechend aus – sie sind beim 3D-Druck auch mechanisch schwächer. BOSL2 bietet abgerundete Varianten der Standard-Körper, die mit einem einzigen Parameter gesteuert werden.

## Abgerundeter Quader: `cuboid()`

Statt `cube()` verwendest du `cuboid()`. Der Parameter `rounding` gibt den Radius der Abrundung in Millimetern an:

```scad
cuboid([Länge, Breite, Höhe], rounding=Radius);
```

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Links: normaler Quader
translate([-40, 0, 0]) cube([30, 30, 30]);

// Rechts: abgerundeter Quader
translate([40, 0, 0]) cuboid([30, 30, 30], rounding=5);
```
:::

::::snippet{#aufgabe}
Probiere verschiedene Werte für `rounding` aus. Was passiert, wenn `rounding` gleich der halben Seitenlänge ist?

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Links: normaler Quader
translate([-40, 0, 0]) cube([30, 30, 30]);
// Rechts: abgerundeter Quader
translate([40, 0, 0]) cuboid([30, 30, 30], rounding=5);
```
:::

::::

:::alert{info}
Mit `edges` kannst du festlegen, welche Kanten abgerundet werden sollen, z. B. nur die oberen Kanten:

```scad
cuboid([30, 30, 30], rounding=5, edges=TOP);
```
:::

## Abgerundeter Zylinder: `cyl()`

Statt `cylinder()` verwendest du `cyl()`. Hier kannst du die obere und untere Kante separat abrunden:

```scad
cyl(h=Höhe, r=Radius, rounding=Radius_Kante);
// oder getrennt:
cyl(h=Höhe, r=Radius, rounding1=unten, rounding2=oben);
```

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
translate([-40, 0, 0]) cyl(h=50, r=15, rounding=5);
translate([40, 0, 0])  cyl(h=50, r=15, rounding1=0, rounding2=10);
```
:::

::::snippet{#aufgabe}
Erstelle einen Stempel: Ein abgerundeter Zylinder als Griff, oben drauf ein flacher Quader mit leicht abgerundeten Kanten. Nutze `cuboid()` und `cyl()`.

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Beispiel-Stempel (zum Verändern)
translate([0, 0, 0]) cyl(h=50, r=15, rounding=5);
translate([0, 0, 50]) cuboid([30, 30, 5], rounding=2);
```
:::

::::