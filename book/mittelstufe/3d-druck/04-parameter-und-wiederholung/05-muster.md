---
title: Muster
index: 5
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
:::openscad{height="440px"}

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

---

## Selbsttest

::::multievent

**1. Wie viele Kugeln entstehen bei einer Schleife über den Bereich von 0 bis 3?**

{z{4}}

{h{Beide Grenzen gehören dazu: 0, 1, 2, 3.}}
{H{Richtig – vier Durchläufe, nicht drei und nicht fünf.}}

**2. Welcher Aufbau erzeugt ein Raster aus 2 mal 3 Würfeln?**

{r1{eine Schleife über drei Werte}}

{r1{!zwei ineinander geschachtelte Schleifen, die äußere über zwei, die innere über drei Werte}}

{r1{sechs einzelne Würfelbefehle in einer Schleife}}

{r1{eine Schleife mit Schrittweite 2}}

{h{Ein Raster hat zwei Richtungen – also braucht es zwei Zählvariablen.}}
{H{Richtig.}}

**3. Was bewirkt eine Spiegelung an der xz-Ebene?**

{r2{Das Objekt wird nach oben geklappt.}}

{r2{!Das Objekt wird an der y-Richtung gespiegelt.}}

{r2{Das Objekt wird verdoppelt.}}

{r2{Das Objekt verschwindet.}}

{h{Die Ebene, an der gespiegelt wird, enthält x und z – gespiegelt wird also entlang der dritten Achse.}}
{H{Richtig. Achtung: Gespiegelt wird das Objekt, es entsteht keine Kopie.}}

**4. Wie bekommst du beim Spiegeln das Original zusätzlich?**

{r3{gar nicht}}

{r3{!indem man das Objekt einmal ohne und einmal mit Spiegelung aufruft}}

{r3{mit center gleich true}}

{r3{mit einer zweiten Schleife}}

{h{Die Spiegelung ersetzt das Objekt – wer beides will, muss beides hinschreiben.}}
{H{Richtig, meist mit einem Modul, das man zweimal aufruft.}}

**5. Wie viele Objekte entstehen bei drei ineinander geschachtelten Schleifen über je 4 Werte?**

{z{64}}

{h{Vier mal vier mal vier.}}
{H{Richtig – bei Rastern wächst die Zahl sehr schnell. Bei 10 Werten je Richtung wären es schon 1000.}}

::::
