---
title: "BOSL2: skin() – Formen aus Profilen"
index: 26
permaid: openscad-bosl2-skin
---

# BOSL2: skin() – Formen aus Profilen

Mit `skin()` kannst du ein 3D-Objekt erstellen, indem du mehrere **2D-Profile** (Querschnitte) übereinander stapelst. OpenSCAD verbindet diese Profile dann zu einer glatten Oberfläche.

Das ist ideal für organische Formen wie Vasen, Raketenrümpfe oder Flügel.

## Grundprinzip

Du gibst eine Liste von Profilen an und die jeweiligen Höhen (z-Werte), auf denen sie liegen sollen:

```scad
skin([
    Profil_auf_Höhe_0,
    Profil_auf_Höhe_1,
    Profil_auf_Höhe_2,
    // ...
], z=[0, 10, 20, ...]);
```

Für kreisförmige Profile kannst du `circle()` aus BOSL2 verwenden:

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
skin([
    circle(r=10, $fn=32),
    circle(r=20, $fn=32),
    circle(r=15, $fn=32),
    circle(r=5,  $fn=32),
], z=[0, 10, 20, 30]);
```
:::

::::snippet{#aufgabe}
Verändere die Radien der Profile, um eine Vase oder einen Turm zu erzeugen. Füge auch mehr als vier Profile hinzu.

::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
skin([
    circle(r=10, $fn=32),
    circle(r=20, $fn=32),
    circle(r=15, $fn=32),
    circle(r=5,  $fn=32),
], z=[0, 10, 20, 30]);
```
:::

::::

## Verschiedene Profilformen

Die Profile müssen nicht alle Kreise sein – du kannst verschiedene Formen mischen. Wichtig: Alle Profile müssen **dieselbe Anzahl an Punkten** haben (`$fn` muss gleich sein).

:::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
skin([
    rect([20, 20], $fn=4),
    circle(r=12, $fn=4),
    rect([20, 20], $fn=4),
], z=[0, 15, 30]);
```
:::

:::alert{info}
Damit der Übergang zwischen einem Rechteck und einem Kreis funktioniert, müssen beide dieselbe Punktanzahl haben. Deshalb wird hier `$fn=4` für beide verwendet – das ergibt bei `circle` ein Quadrat und bei `rect` ebenfalls 4 Punkte.
:::

::::snippet{#aufgabe}
Erstelle einen Raketenrumpf: unten breit und rund, in der Mitte zylindrisch, oben spitz zulaufend. Verwende mindestens 5 Profile.

::openscad{height="500px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
// Beispiel-Raketenrumpf (zum Verändern)
skin([
    circle(r=20, $fn=32),  // unten breit
    circle(r=15, $fn=32),  // Mitte
    circle(r=5, $fn=32),   // oben spitz
], z=[0, 20, 40]);
```
:::

::::

## Beispiel: Einfache Vase

:::openscad{height="600px" library="BOSL2"}
```scad
include <BOSL2/std.scad>
wandstaerke = 2;

// Außenhülle
difference() {
    skin([
        circle(r=15, $fn=64),
        circle(r=25, $fn=64),
        circle(r=20, $fn=64),
        circle(r=22, $fn=64),
        circle(r=18, $fn=64),
        circle(r=8,  $fn=64),
    ], z=[0, 15, 30, 50, 70, 85]);

    // Innenraum aushöhlen
    translate([0, 0, wandstaerke])
    skin([
        circle(r=15-wandstaerke, $fn=64),
        circle(r=25-wandstaerke, $fn=64),
        circle(r=20-wandstaerke, $fn=64),
        circle(r=22-wandstaerke, $fn=64),
        circle(r=18-wandstaerke, $fn=64),
        circle(r=8-wandstaerke,  $fn=64),
    ], z=[0, 15, 30, 50, 70, 85]);
}
```
:::
