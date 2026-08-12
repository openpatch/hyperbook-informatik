---
title: "BOSL2: Abgerundete Formen"
index: 2
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

---

## Selbsttest

::::multievent

**1. Warum sind abgerundete Kanten bei gedruckten Teilen sinnvoll?**

{c1{!Sie fühlen sich besser an und splittern nicht.}}

{c1{!Sie sind stabiler, weil an scharfen Kanten Spannungen entstehen.}}

{c1{Sie drucken schneller.}}

{c1{Sie brauchen kein Infill.}}

{h{Zwei der Angebote betreffen das fertige Teil, zwei den Druckvorgang – und dort stimmt nichts davon.}}
{H{Richtig.}}

**2. Wie rundet man einen Quader ohne Bibliothek ab?**

{r1{mit einem einzigen Parameter am cube-Befehl}}

{r1{!zum Beispiel über minkowski mit einer kleinen Kugel – aufwendig und langsam}}

{r1{gar nicht}}

{r1{mit color}}

{h{Erinnere dich an die komplexen Transformationen.}}
{H{Richtig. Genau deshalb lohnt hier eine Bibliothek: ein Parameter statt einer Konstruktion.}}

**3. Was gibt der Rundungsparameter an?**

{r2{die Zahl der Flächen}}

{r2{!den Radius der Rundung an den Kanten}}

{r2{die Größe des ganzen Objekts}}

{r2{die Wandstärke}}

{h{Eine Rundung ist ein Stück eines Kreises.}}
{H{Richtig – und er darf höchstens halb so groß sein wie die kürzeste Kante.}}

::::
