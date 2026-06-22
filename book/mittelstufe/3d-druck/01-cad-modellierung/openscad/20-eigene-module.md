---
title: Eigene Module
index: 20
permaid: openscad-eigene-module
---

# Eigene Module

In OpenSCAD kannst du eigene Module erstellen, um wiederverwendbare Bausteine für deine Modelle zu schaffen. Ein Modul ist eine benannte Gruppe von Anweisungen, die du immer wieder aufrufen kannst – ähnlich wie ein eigener Befehl.

Das ist besonders nützlich, wenn du dasselbe Objekt mehrfach mit leicht unterschiedlichen Maßen benötigst.

## Syntax

```scad
module modulname(parameter) {
    // Anweisungen
}

// Aufruf:
modulname(wert);
```

## Beispiel: Einfache Box als Modul

:::openscad{height="600px"}
```scad
module box(breite, tiefe, hoehe) {
    cube([breite, tiefe, hoehe]);
}

// Verwendung des Moduls
box(10, 20, 30);
translate([40, 0, 0]) box(20, 20, 20);
translate([80, 0, 0]) box(5, 30, 15);
```
:::

## Standardwerte für Parameter

Du kannst Parametern einen **Standardwert** geben. Dann musst du beim Aufruf nicht immer alle Werte angeben – fehlende werden durch den Standardwert ersetzt:

```scad
module modulname(parameter = Standardwert) {
    // Anweisungen
}
```

:::openscad{height="500px"}
```scad
module zylinder_mit_kugel(hoehe=30, radius=10, kugelradius=8) {
    cylinder(h=hoehe, r=radius);
    translate([0, 0, hoehe]) sphere(r=kugelradius);
}

// Aufruf mit allen Standardwerten
zylinder_mit_kugel();

// Nur Höhe anpassen
translate([40, 0, 0]) zylinder_mit_kugel(hoehe=50);

// Alle Werte anpassen
translate([90, 0, 0]) zylinder_mit_kugel(hoehe=20, radius=15, kugelradius=12);
```
:::

::::snippet{#aufgabe}
Erstelle ein Modul `tisch`, das einen einfachen Tisch aus einem flachen Quader (Tischplatte) und vier Zylindern (Beinen) zusammensetzt. Gib allen Parametern sinnvolle Standardwerte. Rufe das Modul anschließend zweimal auf – einmal mit Standardwerten, einmal mit eigenen Werten.

:::openscad{height="600px"}
```scad
// Beispiel: Modul-Definition
module tisch(platten_breite=50, platten_tiefe=30, platten_hoehe=2, bein_hoehe=40, bein_radius=2) {
    // Tischplatte
    cube([platten_breite, platten_tiefe, platten_hoehe]);
    // Tischbeine (an den 4 Ecken)
    translate([0, 0, 0]) cylinder(h=bein_hoehe, r=bein_radius);
    translate([platten_breite, 0, 0]) cylinder(h=bein_hoehe, r=bein_radius);
    translate([0, platten_tiefe, 0]) cylinder(h=bein_hoehe, r=bein_radius);
    translate([platten_breite, platten_tiefe, 0]) cylinder(h=bein_hoehe, r=bein_radius);
}

// Aufrufe
translate([0, 0, 0]) tisch();
translate([80, 0, 0]) tisch(platten_breite=60, bein_radius=3);
```
:::

::::