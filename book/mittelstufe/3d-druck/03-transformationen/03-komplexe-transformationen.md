---
title: Komplexe Transformationen
index: 3
permaid: openscad-komplexe-transformationen
---

# Komplexe Transformationen

## Minkowkski

Mit der Minkowski-Transformation kannst du die Form eines Objekts verändern, indem du es mit einem anderen Objekt kombinierst. Dabei wird die Form des ersten Objekts um die Form des zweiten Objekts erweitert.

Beispiel: Kanten abrunden

:::openscad{height="600px"}
```scad
minkowski() {
    cube([20, 20, 20]);
    sphere(r=5);
}
```
:::

## Minimale Hülle

Die minimale Hülle eines Objekts ist die kleinste Form, die das Objekt vollständig umschließt. In OpenSCAD kannst du dies mit der hull-Operation erreichen:

:::openscad{height="600px"}
```scad
hull() {
    translate([0, 0, 0]) sphere(r=5);
    translate([20, 0, 0]) sphere(r=5);
}
```
:::

## Rotierende Extrusion (Rotationskörper)

Mit der rotierenden Extrusion kannst du ein 2D-Profil um eine Achse rotieren, um ein 3D-Objekt zu erstellen. In OpenSCAD kannst du dies mit der `rotate_extrude`-Operation erreichen.

:::alert{info}
**2D-Formen** sind flache Formen ohne Höhe, zum Beispiel:
- `circle(r=5)` – ein Kreis mit Radius 5
- `square([10, 5])` – ein Rechteck mit Breite 10 und Höhe 5

Sie werden erst durch Extrusion zu 3D-Objekten.
:::

:::openscad{height="600px"}
```scad
rotate_extrude() {
    translate([10, 0, 0]) circle(r=5);
}
```
:::

## Linear Extrusion

Mit der linearen Extrusion kannst du ein 2D-Profil entlang einer geraden Linie extrudieren, um ein 3D-Objekt zu erstellen. In OpenSCAD kannst du dies mit der `linear_extrude`-Operation erreichen:

:::openscad{height="600px"}
```scad
linear_extrude(height=20) {
    circle(r=5);
}
```
:::

Die lineare Extrusion kann auch mit einem Twist versehen werden, um eine spiralförmige Extrusion zu erstellen:

:::openscad{height="600px"}
```scad
linear_extrude(height=20, twist=60) {
    square(5);
}
```
:::
---

## Selbsttest

::::multievent

**1. Was macht hull aus zwei getrennten Kugeln?**

{r1{Es entfernt die kleinere.}}

{r1{!Es bildet die konvexe Hülle – eine durchgehende Form, die beide umschließt.}}

{r1{Es verschiebt sie zueinander.}}

{r1{Es färbt sie ein.}}

{h{Stell dir eine Folie vor, die stramm um beide gespannt wird.}}
{H{Richtig – damit entstehen abgerundete Griffe und Verbindungen mit wenigen Zeilen.}}

**2. Wozu dient linear_extrude?**

{r2{Es dreht ein Objekt um die z-Achse.}}

{r2{!Es zieht eine flache Form in die Höhe und macht daraus einen Körper.}}

{r2{Es verkleinert ein Objekt.}}

{r2{Es schneidet ein Objekt auf.}}

{h{Ohne diesen Befehl bleibt ein Text flach und lässt sich nicht drucken.}}
{H{Richtig.}}

**3. Was entsteht bei rotate_extrude aus einem Kreis, der neben der z-Achse liegt?**

{r3{eine Kugel}}

{r3{!ein Ring beziehungsweise Torus}}

{r3{ein Zylinder}}

{r3{ein Würfel}}

{h{Die Fläche wird um die Achse herumgeführt.}}
{H{Richtig. Liegt die Fläche auf der Achse, entsteht stattdessen ein Vollkörper.}}

**4. Was bewirkt minkowski mit einem Würfel und einer kleinen Kugel?**

{r4{Der Würfel wird durchbohrt.}}

{r4{!Die Kanten des Würfels werden abgerundet, das Objekt wächst dabei.}}

{r4{Die Kugel verschwindet im Würfel.}}

{r4{Es entsteht nur die Kugel.}}

{h{Die Kugel wird gewissermaßen an jeder Stelle der Oberfläche entlanggeführt.}}
{H{Richtig – und weil das Objekt dabei um den Kugelradius wächst, muss man den Würfel entsprechend kleiner anlegen.}}

::::
