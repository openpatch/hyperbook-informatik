---
title: Muster
index: 28
permaid: openscad-muster
---

# Muster in OpenSCAD erstellen

Bei normalem OpenSCAD musst du für jede Wiederholung die genauen Koordinaten selbst ausrechnen. In vielen CAD-Programmen gibt es dafür praktische Muster-Funktionen. In OpenSCAD erreichen wir das Gleiche mit **Schleifen** und **Transformationen** – und das sogar noch flexibler!

---

## Vergleich: Muster in CAD → OpenSCAD

| **Muster in CAD** | **OpenSCAD** | **Beispiel** |
|-----------------|-------------|--------------|
| Lineares Muster (Reihe) | `for`-Schleife mit `translate()` | `for (i=[0:5]) translate([i*20,0,0]) cube();` |
| Rechteckiges Muster (Raster) | Verschachtelte `for`-Schleifen | `for(x) for(y) translate([x,y,0]) cube();` |
| Kreisförmiges Muster | `for`-Schleife mit `rotate()` | `for(i=[0:11]) rotate([0,0,i*30]) ...` |
| Spiegeln | `mirror()` | `mirror([1,0,0]) cube();` |

---

## 1. Lineares Muster – Objekte in einer Reihe

**Problem**: Du willst 5 Zylinder nebeneinander mit 20 Einheiten Abstand.

**Lösung mit Schleife**:
```scad
for (i = [0:4]) {  // i = 0, 1, 2, 3, 4
    translate([i*20, 0, 0])
        cylinder(h=10, r=5);
}
```

**Was passiert?**
- `i` durchläuft die Werte 0, 1, 2, 3, 4
- Jeder Zylinder wird um `i*20` Einheiten nach rechts verschoben
- Ergebnis: 5 Zylinder mit je 20 Einheiten Abstand

:::snippet{#aufgabe}
Erstelle eine Reihe von 8 Würfeln, jeder 15 Einheiten auseinander.

::openscad
:::

## 2. Rechteckiges Muster – 2D-Raster

**Problem**: Du willst ein 3×4 Raster von Löchern in einer Platte.

**Lösung mit verschachtelten Schleifen**:
```scad
// Platte
cube([100, 120, 5], center=true);

// Löcher im Raster
for (x = [0:2]) {           // 3 Spalten (0,1,2)
    for (y = [0:3]) {       // 4 Zeilen (0,1,2,3)
        translate([x*30-30, y*30-45, 10])
            cylinder(h=20, r=3);
    }
}
```

**Tipp**: Die Werte `-30` und `-45` zentrieren das Raster in der Platte.

:::snippet{#aufgabe}
Erstelle ein Schachbrett-Muster mit abwechselnd schwarzen und weißen Quadern (Hinweis: `color()` und `if`-Bedingung verwenden).

::openscad
:::

---

## 3. Kreisförmiges Muster – wie ein Zahnrad

**Problem**: Du willst 12 Zähne gleichmäßig um einen Kreis verteilen.

**Lösung mit Rotation**:
```scad
// Mittelkreis
cylinder(h=10, r=15);

// Zähne (12 Stück)
for (i = [0:11]) {
    rotate([0, 0, i*30])  // 360° / 12 = 30° pro Zahn
        translate([0, 30, 0])
            cube([8, 15, 10], center=true);
}
```

**Erklärung**:
- `i*30`: Jeder Zahn wird um 30° gedreht (360° ÷ 12 = 30°)
- `translate([0, 30, 0])`: Verschiebt den Zahn 30 Einheiten vom Mittelpunkt weg
- `center=true`: Zentriert den Würfel an seinem Ursprung

:::snippet{#aufgabe}
Erstelle eine Blumenform mit 6 Blütenblättern (jeder Blütenblatt ist ein halber Zylinder).

::openscad
:::

---

## 4. Spiegeln – symmetrische Objekte

**Problem**: Du willst ein Objekt symmetrisch spiegeln (z.B. für eine Schere).

**Lösung mit `mirror()`**:
```scad
// Original
translate([-15, 0, 0])
    cube([20, 10, 5]);

// Gespiegelt
mirror([1, 0, 0])  // Spiegelung an der YZ-Ebene (X-Achse)
    translate([-15, 0, 0])
        cube([20, 10, 5]);
```

**Parameter von `mirror()`**:
- `[1,0,0]`: Spiegelung an der YZ-Ebene (x-Koordinate wird negiert)
- `[0,1,0]`: Spiegelung an der XZ-Ebene (y-Koordinate wird negiert)
- `[0,0,1]`: Spiegelung an der XY-Ebene (z-Koordinate wird negiert)

:::snippet{#aufgabe}
Erstelle einen symmetrischen Schmetterling mit zwei Flügeln (ein Flügel + Spiegelung).

::openscad
:::

---

## 5. Kombination: Komplexe Muster

**Beispiel: Zahnrad mit 8 Zähnen und Mittelbohrung**
:::openscad
```scad
// Mittelbohrung
cylinder(h=20, r=10);

// Zähne
for (i = [0:7]) {
    rotate([0, 0, i*45])  // 360° / 8 = 45°
        translate([0, 25, 0])
            cube([10, 20, 20], center=true);
}
```
:::

## Wissensüberprüfung

:::multievent
Wie viele Kugeln werden durch diesen Code erstellt: `for (i=[0:3]) sphere(r=5);` ?

{r1{A:}} 4

{r1{!B:}} 5

{r1{C:}} 3

{r1{D:}} 8

---

Welcher Code erstellt ein 2×3 Raster aus Würfeln?

{r2{A:}} `for(x=[0:1]) for(y=[0:2]) translate([x*20,y*20,0]) cube();`

{r2{!B:}} `for(x=[0:2]) translate([x*20,0,0]) cube();`

{r2{C:}} `for(x=[0:1]) translate([x*20,0,0]) cube();`

---

Was bewirkt `mirror([0,1,0])`?

{r3{A:}} Spiegelung an der XZ-Ebene (Y-Achse)

{r3{!B:}} Spiegelung an der YZ-Ebene (X-Achse)

{r3{C:}} Spiegelung am Ursprung
:::

---

## Tipps für Fortgeschrittene

1. **Variationen**: Nutze die Schleifenvariable für Größe oder Farbe:
   ```scad
   for (i = [0:5]) {
       translate([i*20, 0, 0])
           cylinder(h=i*5+5, r=5);  // Jeder Zylinder wird höher
   }
   ```

2. **Listen verwenden**: Du kannst auch konkrete Listen durchlaufen:
   ```scad
   abstände = [10, 20, 15, 25];
   for (a = abstände) {
       translate([a, 0, 0]) cube();
   }
   ```

3. **Kombination mit Modulen**: Erstelle ein Modul für das zu wiederholende Objekt:
   ```scad
   module Zahn() {
       cube([8, 20, 10], center=true);
   }

   for (i = [0:11]) {
       rotate([0, 0, i*30]) translate([0, 30, 0]) Zahn();
   }
   ```

Probiere es aus:

::openscad
