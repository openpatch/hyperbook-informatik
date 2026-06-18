---
title: Eigene Module
index: 16
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

:::snippet{#aufgabe}
Erstelle ein Modul `tisch`, das einen einfachen Tisch aus einem flachen Quader (Tischplatte) und vier Zylindern (Beine) zusammensetzt. Rufe das Modul anschließend zweimal mit unterschiedlichen Größen auf.
:::

:::openscad{height="600px"}
```scad

```
:::