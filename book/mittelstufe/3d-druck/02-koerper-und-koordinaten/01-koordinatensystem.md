---
title: Das Koordinatensystem
index: 1
permaid: openscad-koordinatensystem
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

::::snippet{#aufgabe}
Verschiebe die blaue Kugel so, dass sie genau **über** der roten Kugel schwebt.

:::openscad{height="500px"}
```scad
$fn = 32;
// Rote Kugel
color("red")   translate([30, 0, 0]) sphere(r=5);
// Blaue Kugel
color("blue")  translate([0, 0, 30]) sphere(r=5);
```
:::

::::

## Negative Werte

Negative Werte verschieben in die entgegengesetzte Richtung:

- `[-10, 0, 0]` → 10 Einheiten nach **links**
- `[0, -10, 0]` → 10 Einheiten nach **vorne**
- `[0, 0, -10]` → 10 Einheiten nach **unten**

::::snippet{#aufgabe}
Ergänze zwei weitere Kugeln: eine 20 Einheiten nach vorne und eine 20 Einheiten nach hinten.

:::openscad{height="600px"}
```scad
$fn = 32;
color("orange") translate([-20, 0, 0]) sphere(r=5);
color("white")  sphere(r=5);
color("purple") translate([20, 0, 0])  sphere(r=5);
```
:::

::::

---

## Selbsttest

::::multievent

**1. Welche Achse zeigt nach oben?**

{r1{die x-Achse}}

{r1{die y-Achse}}

{r1{!die z-Achse}}

{r1{keine, das Koordinatensystem ist flach}}

{h{Es ist die dritte der drei Zahlen.}}
{H{Richtig – x nach rechts, y nach hinten, z nach oben.}}

**2. Wo liegt der Punkt mit den Koordinaten 0, 0 und 0?**

{r2{in der linken unteren Ecke der Zeichenfläche}}

{r2{!im Ursprung, dem Schnittpunkt der drei Achsen}}

{r2{oben in der Mitte}}

{r2{das ist nicht festgelegt}}

{h{Der Nullpunkt.}}
{H{Richtig – dort startet standardmäßig jedes Objekt.}}

**3. Ein Objekt soll nach links verschoben werden. Wie sieht der translate-Wert aus?**

{r3{ein positiver x-Wert}}

{r3{!ein negativer x-Wert}}

{r3{ein negativer z-Wert}}

{r3{das geht nicht}}

{h{Negative Werte sind erlaubt und gehen in die Gegenrichtung.}}
{H{Richtig.}}

**4. Ein Würfel ohne center steht mit welcher Stelle im Ursprung?**

{r4{mit seinem Mittelpunkt}}

{r4{!mit einer Ecke}}

{r4{mit der Mitte seiner Grundfläche}}

{r4{das ist zufällig}}

{h{Deshalb wächst er nach rechts, hinten und oben.}}
{H{Richtig. Mit center gleich true ändert sich das.}}

::::
