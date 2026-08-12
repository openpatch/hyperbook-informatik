---
title: Mehr Formen entdecken
index: 4
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

:::openscad{height="400px"}

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

:::openscad{height="400px"}

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

:::openscad{height="400px"}

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

:::openscad{height="400px"}

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

---

## Selbsttest

::::multievent

**1. Wie erzeugst du einen Quader, der 50 lang, 30 breit und 10 hoch ist?**

{r1{cube(50, 30, 10);}}

{r1{!cube([50, 30, 10]);}}

{r1{cube(50); cube(30); cube(10);}}

{r1{quader(50, 30, 10);}}

{h{Drei Werte gehören in eine Liste – und Listen stehen in eckigen Klammern.}}
{H{Richtig.}}

**2. Welche zwei Angaben liefern dieselbe Kugel?**

{c1{!sphere(r=15);}}

{c1{!sphere(d=30);}}

{c1{sphere(r=30);}}

{c1{sphere(h=15);}}

{h{Der Durchmesser ist doppelt so groß wie der Radius.}}
{H{Richtig – und eine Höhe hat eine Kugel gar nicht.}}

**3. Was entsteht bei cylinder mit h gleich 40, r1 gleich 20 und r2 gleich 5?**

{r2{ein Zylinder mit gleichbleibendem Radius}}

{r2{!ein Kegelstumpf: unten breit, oben schmal}}

{r2{zwei Zylinder übereinander}}

{r2{ein Fehler, weil man nur einen Radius angeben darf}}

{h{r1 gilt unten, r2 oben.}}
{H{Richtig – mit r2 gleich 0 entsteht sogar eine Spitze.}}

**4. Womit machst du aus einem flachen Buchstaben einen dreidimensionalen Körper?**

{r3{extrude_text}}

{r3{!linear_extrude}}

{r3{text3d}}

{r3{rotate}}

{h{Der Befehl zieht eine flache Form in die Höhe.}}
{H{Richtig – ohne ihn bleibt der Text flach und lässt sich nicht drucken.}}

::::
