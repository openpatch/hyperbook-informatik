---
title: Anweisungen
index: 5
---

# Anweisungen

In OpenSCAD werden 3D-Modelle durch Anweisungen beschrieben. Eine Anweisung ist eine Zeile Quelltext, die eine bestimmte Aktion ausführt, wie zum Beispiel das Erstellen eines Würfels oder das Verschieben eines Objekts.

Anweisungen werden immer mit einem Semikolon (`;`) abgeschlossen.

:::alert{warn}
Das Vergessen des Semikolons am Ende einer Anweisung führt zu einem Fehler und das Modell wird nicht korrekt angezeigt.
:::

:::openscad
```scad
cube([10, 20, 30]);
```
:::

## Kommentare

Manchmal möchtest du deinen Quelltext erklären oder eine Zeile vorübergehend ausschalten. Dafür gibt es **Kommentare**. OpenSCAD ignoriert alles, was nach `//` in einer Zeile steht:

```scad
// Das ist ein Kommentar – OpenSCAD ignoriert diese Zeile
cube([10, 20, 30]); // Kommentar am Ende einer Zeile
// cylinder(h=10, r=5); // Diese Anweisung ist "auskommentiert" und wird nicht ausgeführt
```

Kommentare sind nützlich, um:
- zu erklären, was ein Abschnitt macht
- Anweisungen vorübergehend zu deaktivieren, ohne sie zu löschen

:::openscad
```scad
// Ein Würfel als Basis
cube([30, 30, 10]);

// translate([0, 0, 10]) sphere(r=15); // auskommentiert
```
:::

:::snippet{#aufgabe}
Kommentiere die `sphere`-Zeile im Beispiel ein (entferne das `//` davor) und beobachte, wie sich das Modell verändert.
:::
