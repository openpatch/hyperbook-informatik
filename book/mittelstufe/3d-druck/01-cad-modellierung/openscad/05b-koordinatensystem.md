---
title: Das Koordinatensystem
index: 5.5
---

# Das Koordinatensystem

Bevor du Objekte verschieben oder drehen kannst, musst du verstehen, wie OpenSCAD den Raum beschreibt. OpenSCAD verwendet ein **3D-Koordinatensystem** mit drei Achsen.

## Die drei Achsen

| Achse | Richtung        | Farbe in OpenSCAD |
| ----- | --------------- | ----------------- |
| **X** | links ↔ rechts  | 🔴 Rot            |
| **Y** | vorne ↔ hinten  | 🟢 Grün           |
| **Z** | unten ↔ oben    | 🔵 Blau           |

Der **Ursprung** ist der Punkt, an dem alle drei Achsen zusammentreffen: `(0, 0, 0)`.

:::alert{info}
In der Vorschau siehst du die drei Achsen als farbige Linien. Wenn du das Modell drehst, hilft dir das, die Orientierung zu verstehen.
:::

## Koordinaten lesen

Eine Position im Raum wird immer als `[x, y, z]` angegeben:

- `[10, 0, 0]` → 10 Einheiten nach **rechts**
- `[0, 10, 0]` → 10 Einheiten nach **hinten**
- `[0, 0, 10]` → 10 Einheiten nach **oben**
- `[10, 5, 3]` → 10 rechts, 5 hinten, 3 oben

## Ausprobieren

Hier siehst du drei Kugeln, die jeweils entlang einer Achse verschoben sind. Beobachte, in welche Richtung sich die Kugel bewegt:

:::openscad{height="500px"}
```scad
$fn = 32;

// Kugel am Ursprung (0,0,0)
color("white") sphere(r=5);

// Entlang X-Achse (rot) → nach rechts
color("red")   translate([30, 0, 0]) sphere(r=5);

// Entlang Y-Achse (grün) → nach hinten
color("green") translate([0, 30, 0]) sphere(r=5);

// Entlang Z-Achse (blau) → nach oben
color("blue")  translate([0, 0, 30]) sphere(r=5);
```
:::

:::snippet{#aufgabe}
Verschiebe die blaue Kugel so, dass sie genau **über** der roten Kugel schwebt.

Tipp: Die rote Kugel ist bei `[30, 0, 0]`. Die blaue soll bei `[30, 0, 30]` sein.
:::

## Negative Werte

Negative Werte verschieben in die entgegengesetzte Richtung:

- `[-10, 0, 0]` → 10 Einheiten nach **links**
- `[0, -10, 0]` → 10 Einheiten nach **vorne**
- `[0, 0, -10]` → 10 Einheiten nach **unten**

:::openscad{height="400px"}
```scad
$fn = 32;
color("orange") translate([-20, 0, 0]) sphere(r=5);
color("white")  sphere(r=5);
color("purple") translate([20, 0, 0])  sphere(r=5);
```
:::

:::snippet{#aufgabe}
Ergänze zwei weitere Kugeln: eine 20 Einheiten nach vorne und eine 20 Einheiten nach hinten.
:::
