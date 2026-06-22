---
title: "BOSL2: Objekte positionieren mit Ankern"
index: 23
permaid: openscad-bosl2-positionierung
---

# BOSL2: Objekte positionieren mit Ankern

Bei normalem OpenSCAD musst du für jede Verschiebung die genauen Koordinaten ausrechnen – zum Beispiel: „Wie weit muss ich den Zylinder verschieben, damit er genau auf dem Quader sitzt?" Das ist mühsam.

BOSL2 löst dieses Problem mit einem **Anker-System**: Du beschreibst, *wo* ein Objekt an einem anderen befestigt werden soll, anstatt die Koordinaten selbst auszurechnen.

## Anker

Jedes BOSL2-Objekt hat benannte Ankerpunkte:

| Anker    | Bedeutung               |
| -------- | ----------------------- |
| `TOP`    | Mitte der Oberseite     |
| `BOTTOM` | Mitte der Unterseite    |
| `FRONT`  | Mitte der Vorderseite   |
| `BACK`   | Mitte der Rückseite     |
| `LEFT`   | Mitte der linken Seite  |
| `RIGHT`  | Mitte der rechten Seite |
| `CENTER` | Mittelpunkt             |

## `position()` – Objekte relativ platzieren

Mit `position(Anker)` platzierst du ein Kind-Objekt an einem Ankerpunkt des Eltern-Objekts:

```scad
Elternobjekt() {
    position(Anker) Kindobjekt();
}
```

Beispiel: Ein Zylinder sitzt genau oben auf einem Quader – ohne `translate`:

```scad
include <BOSL2/std.scad>
cuboid([40, 40, 20]) {
    position(TOP) cyl(h=30, r=8);
}
```

::::snippet{#aufgabe}
Platziere mithilfe von `position()` einen kleineren Würfel auf der Vorderseite (`FRONT`) eines größeren Würfels.

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
cuboid([40, 40, 40]) {
    position(FRONT) cube([20, 20, 20]);
}
```
:::

::::

## `orient()` – Objekte ausrichten

Mit `orient(Richtung)` richtest du ein Objekt entlang einer Achse aus:

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
cuboid([40, 40, 40]) {
    position(RIGHT) orient(RIGHT) cyl(h=20, r=5);
}
```
:::

## Beispiel: Schraube mit Kopf

Hier siehst du, wie `position()` das Modellieren vereinfacht – ein Zylinder als Schaft mit einem flachen Quader als Kopf:

:::openscad{height="400px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Schaft
cyl(h=40, r=4) {
    // Kopf sitzt oben auf dem Schaft
    position(TOP) cuboid([14, 14, 4], rounding=2, edges=TOP);
}
```
:::

::::snippet{#aufgabe}
Erstelle einen einfachen Pilz: Ein Zylinder als Stiel, eine flachgedrückte Kugel (`scale([1,1,0.5]) sphere(r=20)`) als Hut. Nutze `position(TOP)`, um den Hut auf dem Stiel zu platzieren.

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
cyl(h=40, r=8) {
    position(TOP) scale([1,1,0.5]) sphere(r=20);
}
```
:::

::::
