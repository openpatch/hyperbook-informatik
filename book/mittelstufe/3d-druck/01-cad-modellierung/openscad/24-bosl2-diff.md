---
title: "BOSL2: diff() – Löcher und Aussparungen"
index: 24
permaid: openscad-bosl2-diff
---

# BOSL2: diff() – Löcher und Aussparungen

Du kennst bereits `difference()` aus [Kombination von Objekten](./13-kombination-von-objekten.md). Dabei ist die Reihenfolge entscheidend: Das erste Objekt bleibt, alle weiteren werden abgezogen. Das kann bei komplexen Modellen schnell unübersichtlich werden.

BOSL2 bietet eine einfachere Alternative: `diff()`. Dabei markierst du Objekte mit **Tags** (Etiketten), die bestimmen, ob ein Objekt hinzugefügt oder entfernt wird.

## Syntax

```scad
diff() {
    Grundkörper();
    tag("remove") Abzugskörper();
}
```

Das Tag `"remove"` markiert ein Objekt zum Abziehen. Die Reihenfolge im Block spielt keine Rolle mehr.

## Vergleich: difference() vs. diff()

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// OpenSCAD difference() – Reihenfolge ist entscheidend
translate([-50, 0, 0])
difference() {
    cube([40, 40, 20], center=true);
    cylinder(h=30, r=8, center=true);
}

// BOSL2 diff() – Tag bestimmt was abgezogen wird
translate([50, 0, 0])
diff() {
    cuboid([40, 40, 20]);
    tag("remove") cyl(h=30, r=8);
}
```
:::

::::snippet{#aufgabe}
Erstelle mit `diff()` einen Quader mit drei Löchern: je eines von oben, von vorne und von der Seite.

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
diff() {
    cuboid([60, 40, 20]);
    // Dein Code hier: 3 Löcher mit tag("remove")
}
```
:::

::::

## Kombination mit position()

`diff()` und `position()` lassen sich kombinieren – so kannst du Aussparungen präzise platzieren:

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
diff() {
    cuboid([60, 40, 20]) {
        // Loch von oben, zentriert
        tag("remove") position(TOP) cyl(h=25, r=8, anchor=TOP);
        // Loch von vorne
        tag("remove") position(FRONT) orient(FRONT) cyl(h=25, r=5, anchor=TOP);
    }
}
```
:::

::::snippet{#aufgabe}
Modelliere eine einfache Dose (Zylinder) mit einem Deckel (flacher Quader mit Loch in der Mitte). Nutze `diff()` für das Loch im Deckel.

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Dose
cyl(h=40, r=15);
// Deckel mit Loch
translate([0, 0, 40]) diff() {
    cuboid([35, 35, 3]);
    // Dein Code hier: Loch in der Mitte
}
```
:::

::::