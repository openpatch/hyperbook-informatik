---
title: Anweisungen
index: 5
---

# Anweisungen

In OpenSCAD werden 3D-Modelle durch Anweisungen beschrieben. Eine Anweisung ist eine Zeile Quelltext, die eine bestimmte Aktion ausführt, wie zum Beispiel das Erstellen eines Würfels oder das Verschieben eines Objekts.

Anweisungen werden immer mit einem Semikolon (;) abgeschlossen.

:::alert{warn}
Das Vergessen des Semikolons, am Ende einer Anweisung, führt zu einem Fehler und das Modell wird nicht korrekt angezeigt.
:::

:::openscad
```scad
cube([100, 200, 300]);
```
:::