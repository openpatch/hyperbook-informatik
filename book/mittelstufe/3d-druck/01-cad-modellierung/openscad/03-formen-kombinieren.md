---
title: Formen kombinieren
index: 3
permaid: openscad-formen-kombinieren
---

# Formen kombinieren

Bisher hast du einzelne Formen erstellt. Jetzt lernst du, wie du **mehrere Formen zusammenfügst**, um komplexere Modelle zu erstellen.

## Mehrere Objekte nebeneinander

Einfache Regel: **Jeder Befehl auf einer eigenen Zeile** erstellt ein neues Objekt.

```scad
cube([20, 20, 20]);
translate([30, 0, 0]) sphere(r=10);
translate([60, 0, 0]) cylinder(h=20, r=10);
```

:::openscad
```scad
cube([20, 20, 20], center=true);
translate([30, 0, 0]) sphere(r=10);
translate([60, 0, 0]) cylinder(h=20, r=10, center=true);
```
:::

👉 **Beobachtung:** Alle drei Objekte stehen **nebeneinander** in einer Reihe.

## Objekte gruppieren mit geschweiften Klammern

Wenn du mehrere Objekte **zusammen verschieben oder drehen** willst, kannst du sie in geschweifte Klammern `{ }` setzen:

```scad
translate([0, 30, 0]) {
    cube([20, 20, 20], center=true);
    translate([30, 0, 0]) sphere(r=10);
}
```

:::openscad
```scad
// Ohne Gruppierung
cube([20, 20, 20], center=true);
translate([30, 0, 0]) sphere(r=10);

// Mit Gruppierung - beide 30mm nach hinten verschoben
translate([0, 30, 0]) {
    cube([20, 20, 20], center=true);
    translate([30, 0, 0]) sphere(r=10);
}
```
:::

::::snippet{#aufgabe}
**Aufgabe:**
Erstelle ein **Mini-Dorf** mit:
- 3 Häusern (Würfel mit verschiedenen Größen)
- Jedes Haus soll auf einem **Fundament** (flacher Würfel) stehen
- Positioniere die Häuser so, dass sie eine **Straße** bilden

**Tipp:** Nutze Gruppierung, um Fundament + Haus zusammen zu verschieben.

:::openscad
```scad
// Beispiel: Ein Haus mit Fundament
cube([20, 20, 2]);  // Fundament
translate([0, 0, 2]) cube([15, 15, 10]);  // Haus
// Füge zwei weitere Häuser hinzu
```
:::

::::

## Objekte übereinander stapeln

Du kannst Objekte auch **vertikal** stapeln:

```scad
// Turm aus 3 Würfeln
cube([20, 20, 5]);
translate([0, 0, 5]) cube([20, 20, 5]);
translate([0, 0, 10]) cube([20, 20, 5]);
```

Die Würfel haben eine Höhe von 5mm, der zweite wird um 5mm nach oben verschoben, und der dritte um 10mm.

::::snippet{#aufgabe}
**Aufgabe:**
Baue einen **Leuchturm** mit:
- Einem quadratischen Sockel (30mm x 30mm x 5mm)
- Einem runden Turm (Zylinder, Höhe 50mm, Radius 10mm) **mittig auf dem Sockel**
- Einer Kugel als Laterne (Radius 8mm) **oben auf dem Turm**
- Einem kleinen Zylinder als Dach (Höhe 5mm, Radius 12mm) **über der Kugel**

**Tipp:** Beginne mit dem Sockel und arbeite dich nach oben.

:::openscad
```scad
// Sockel
cube([30, 30, 5]);

// Dein Code hier
```
:::

::::

## Farben hinzufügen

Damit dein Modell bunter aussieht, kannst du **Farben** verwenden:

```scad
color("red") cube([20, 20, 20]);
color("blue") translate([30, 0, 0]) sphere(r=10);
color("green") translate([60, 0, 0]) cylinder(h=20, r=10);
```

:::alert{info}
**Farben in OpenSCAD:**
- Farben werden **nur in der Vorschau** angezeigt
- Beim 3D-Druck hängt die Farbe vom **Filament** ab
- Du kannst Farben nach Name (`"red"`, `"blue"`) oder als RGB-Wert (`[255,0,0]` für Rot) angeben
:::

::::snippet{#aufgabe}
**Aufgabe:**
Erstelle eine **Ampel** mit:
- Einem schwarzen Gehäuse (Zylinder, Höhe 80mm, Radius 15mm)
- Drei farbigen Lichtern (Kugeln, Radius 8mm):
  - Rot (unten)
  - Gelb (mittig)
  - Grün (oben)
- Jede Kugel soll **zentriert** im Gehäuse sein

**Tipp:** Positioniere die Kugeln mit `translate([0,0,Höhe])`.

:::openscad
```scad
// Gehäuse
color("black") cylinder(h=80, r=15);
// Dein Code hier
```
:::

::::

## Zusammenfassung

In diesem Kapitel hast du gelernt:

- ✅ **Mehrere Objekte** nebeneinander und übereinander zu platzieren
- ✅ **Objekte zu gruppieren** mit `{ }`
- ✅ **Farben** hinzuzufügen mit `color()`
- ✅ **Einfache Modelle** wie Häuser, Türme und Ampeln zu erstellen

