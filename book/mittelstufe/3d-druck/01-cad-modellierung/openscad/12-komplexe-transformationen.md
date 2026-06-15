---
title: Komplexe Transformationen
index: 12
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

## Rotierende Extrusion (Rotationslörper)

Mit der rotierenden Extrusion kannst du ein 2D-Profil um eine Achse rotieren, um ein 3D-Objekt zu erstellen. In OpenSCAD kannst du dies mit der rotate_extrude-Operation erreichen:

:::openscad{height="600px"}
```scad
rotate_extrude() {
    translate([10, 0, 0]) circle(r=5);
}
```
:::

## Linear Extrusion

Mit der linearen Extrusion kannst du ein 2D-Profil entlang einer geraden Linie extrudieren, um ein 3D-Objekt zu erstellen. In OpenSCAD kannst du dies mit der linear_extrude-Operation erreichen:

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