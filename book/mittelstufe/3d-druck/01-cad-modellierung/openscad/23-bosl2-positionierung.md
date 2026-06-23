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

## Das `anchor`-Attribut – eigener Ankerpunkt eines Objekts

Jedes BOSL2-Objekt hat standardmäßig seinen Mittelpunkt (`CENTER`) als Referenzpunkt. Mit dem `anchor`-Attribut kannst du festlegen, welcher Punkt des Objekts als Referenz dient.

**Wozul?** Normalerweise wird ein Objekt mit seinem Mittelpunkt platziert. Mit `anchor` kannst du das ändern, sodass z.B. die Rückseite (`BACK`), Vorderseite (`FRONT`), Oberseite (`TOP`) usw. als Referenzpunkt dient.

Beispiel: Ein Würfel soll mit seiner Rückseite an der Vorderseite eines anderen Würfels platziert werden:

```scad
include <BOSL2/std.scad>
cuboid([40, 40, 40]) {
    position(FRONT) cube([50, 20, 20], anchor=BACK);
}
```

**Was passiert hier?**
1. `anchor=BACK` bewirkt, dass der kleine Würfel so verschoben wird, dass seine Rückseite am Ursprung (0,0,0) liegt
2. `position(FRONT)` platziert diesen verschobenen Würfel dann so, dass seine Rückseite an der Vorderseite (`FRONT`) des großen Würfels anliegt
3. Das Ergebnis: Die Rückseite des kleinen Würfels liegt bündig an der Vorderseite des großen Würfels

**Mögliche Ankerpunkte:**
- `CENTER` – Mittelpunkt (Standard)
- `TOP` – Mitte der Oberseite
- `BOTTOM` – Mitte der Unterseite
- `FRONT` – Mitte der Vorderseite
- `BACK` – Mitte der Rückseite
- `LEFT` – Mitte der linken Seite
- `RIGHT` – Mitte der rechten Seite

Du kannst auch Kombinationen verwenden, z.B. `TOP+LEFT` für die obere linke Kante.

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
