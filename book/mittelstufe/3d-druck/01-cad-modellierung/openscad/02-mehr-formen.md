---
title: Mehr Formen entdecken
index: 2
permaid: openscad-mehr-formen
---

# Mehr Formen entdecken

Du hast bereits einen Würfel und eine Kugel erstellt. Jetzt lernst du **weitere Grundformen** kennen, die du in OpenSCAD verwenden kannst.

## Die drei wichtigsten Formen

### 1. Würfel (cube)

Du kennst bereits den Würfel-Befehl:

```scad
cube(30);  // Würfel mit 30mm Seitenlänge
```

Aber wusstest du, dass du auch **verschiedene Längen für jede Seite** angeben kannst?

```scad
cube([50, 30, 10]);  // 50mm lang, 30mm breit, 10mm hoch
```

:::openscad
```scad
cube([50, 30, 10]);
```
:::

### 2. Kugel (sphere)

Eine Kugel kannst du mit `sphere()` erstellen. Du kannst entweder den **Radius** oder den **Durchmesser** angeben:

```scad
sphere(r=15);   // Radius = 15mm
sphere(d=30);   // Durchmesser = 30mm (gleiches Ergebnis!)
```

::::snippet{#aufgabe}
**Aufgabe:**
Erstelle eine Kugel mit **40mm Durchmesser** und positioniere sie **20mm über dem Würfel**.

:::openscad
```scad
cube(30);
// Dein Code hier
```
:::

::::

### 3. Zylinder (cylinder)

Zylinder sind extrem nützlich – für Beine, Säulen, Löcher und vieles mehr.

```scad
cylinder(h=40, r=10);  // h = Höhe, r = Radius
```

Du kannst auch einen **Kegel** erstellen, indem du zwei verschiedene Radien angibst:

```scad
cylinder(h=40, r1=20, r2=5);  // Oben dünn, unten dick
```

::::snippet{#aufgabe}
**Aufgabe:**
Erstelle einen **Turm** aus:
- Einem Zylinder als Basis (Höhe 20mm, Radius 15mm)
- Einem Würfel als Mitte (10mm x 10mm x 10mm)
- Einem Kegel als Spitze (Höhe 15mm, unten Radius 10mm, oben Radius 0mm)

Positioniere alle Teile so, dass sie **aufeinander stehen**.

:::openscad
```scad
// Basis
cylinder(h=20, r=15);

// Dein Code hier
```
:::

::::

## Bonus: Text schreiben

Du kannst **Text in 3D** schreiben. Da OpenSCAD nur 3D-Objekte darstellen kann, musst du Text immer mit `linear_extrude()` extrudieren:

```scad
linear_extrude(height=2) text("A", size=20);
```

:::openscad
```scad
linear_extrude(height=2) text("3D", size=20, halign="center", valign="center");
```
:::

:::alert{info}
**Tipp:** Mit `halign="center"` und `valign="center"` wird der Text **zentriert**. Ohne diese Parameter beginnt der Text bei (0,0,0).
:::

## Zusammenfassung

Du hast jetzt diese Formen kennengelernt:

| Form | Befehl | Wichtige Parameter |
|------|--------|-------------------|
| Würfel | `cube()` | Seitenlänge oder `[Länge, Breite, Höhe]` |
| Kugel | `sphere()` | `r=` Radius oder `d=` Durchmesser |
| Zylinder | `cylinder()` | `h=` Höhe, `r=` oder `r1/r2=` Radius, `d=` Durchmesser |
| Text | `linear_extrude() text()` | `height=`, `"Text"`, `size=`, `halign=`, `valign=` |
