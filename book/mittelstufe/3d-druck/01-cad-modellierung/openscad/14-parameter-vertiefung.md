---
title: Parameter – Vertiefung
index: 14
permaid: openscad-parameter-vertiefung
---

# Parameter – Vertiefung

Du kennst bereits die Grundlagen zu Parametern. In diesem Kapitel lernst du **erweiterte Techniken**, die deine Modelle noch flexibler und mächtiger machen.

## Spezielle Variablen

OpenSCAD stellt dir **vorgefertigte spezielle Variablen** zur Verfügung, die du in deinen Berechnungen verwenden kannst:

### $fa – Mindestwinkel für Kreissegmente

Beim Erstellen von Kugeln, Zylindern oder anderen runden Formen wird OpenSCAD diese aus vielen kleinen Segmenten zusammensetzen. Mit `$fa` (minimal angle) kannst du steuern, wie glatt diese Rundungen aussehen:

- **Kleinerer Wert** = mehr Segmente = glattere Oberfläche (aber langsamer zu berechnen)
- **Größerer Wert** = weniger Segmente = eckiger (aber schneller)

```scad
$fa = 1;   // Sehr glatt (Voreinstellung ist meist 12-30)
$fa = 10;  // Sichtbar eckig
$fa = 45;  // Sehr eckig, schnell
```

::::snippet{#aufgabe}
**Experiment:**
Verändere den Wert von `$fa` und beobachte, wie sich die Oberfläche der Kugel verändert.

:::openscad{height="500px"}
```scad
$fa = 10; // Winkel in Grad - je kleiner, desto glatter
sphere(r=20);
```
:::

::::

### $fs – Mindestsegmentgröße

Alternativ zu `$fa` kannst du `$fs` (minimal segment size) verwenden, um die maximale Größe eines Segments festzulegen:

- **Kleinerer Wert** = kleinere Segmente = glattere Oberfläche
- **Größerer Wert** = größere Segmente = eckiger

```scad
$fs = 0.5;  // Maximal 0.5mm große Segmente
$fs = 2;    // Maximal 2mm große Segmente
```

:::alert{info}
`$fa` und `$fs` wirken sich auf **alle** folgenden runden Objekte aus, bis sie wieder geändert werden. Du kannst sie auch lokal in einem Block mit `{ }` setzen.
:::

---

### $t – Zeit-Parameter für Animationen

Die Variable `$t` nimmt automatisch Werte zwischen 0 und 1 an, wenn du in OpenSCAD den **Animationsschalter** aktivierst (F5 oder Animation-Button). Das ermöglicht einfache Animationen:

```scad
// $t geht von 0 bis 1
translate([$t * 100, 0, 0]) cube(20);
```

::::snippet{#aufgabe}
**Animation erstellen:**
Aktiviere die Animation (F5) und beobachte, wie sich der Würfel bewegt. Experimentiere mit verschiedenen Berechnungen mit `$t`.

:::openscad{height="500px"}
```scad
// Würfel bewegt sich von links nach rechts
translate([$t * 100, 0, 0]) cube(20);

// Kugel ändert ihre Größe
translate([0, 30, 0]) sphere(r=$t * 15 + 5);

// Zylinder rotiert (Drehung um Z-Achse)
translate([0, -30, 0]) rotate([0, 0, $t * 360]) cylinder(h=20, r=10);
```
:::

::::

---

## Komplexe Berechnungen mit Parametern

Parameter werden wirklich mächtig, wenn du sie in **komplexen mathematischen Ausdrücken** verwendest. Das ermöglicht dir, Modelle zu erstellen, die sich automatisch anpassen.

### Beispiel: Dynamische Platte mit Löchern

Stell dir vor, du willst eine Platte mit Löchern erstellen, wobei die Lochgröße und -position von der Plattendicke abhängt:

:::openscad{height="600px"}
```scad
// Parameter
platten_breite = 60;
platten_tiefe = 40;
platten_dicke = 10;
loch_durchmesser = 6;

// Lochparameter basierend auf Plattendicke
loch_radius = platten_dicke / 3;
loch_abstand = platten_breite / 4;

// Platte erstellen
difference() {
    cube([platten_breite, platten_tiefe, platten_dicke]);
    // Löcher an den Ecken
    translate([loch_abstand, loch_abstand, 0]) cylinder(h=platten_dicke*2, r=loch_radius);
    translate([platten_breite - loch_abstand, loch_abstand, 0]) cylinder(h=platten_dicke*2, r=loch_radius);
    translate([loch_abstand, platten_tiefe - loch_abstand, 0]) cylinder(h=platten_dicke*2, r=loch_radius);
    translate([platten_breite - loch_abstand, platten_tiefe - loch_abstand, 0]) cylinder(h=platten_dicke*2, r=loch_radius);
}
```
:::

---

## Parameter in Transformationen

Parameter können auch in **Transformationen** wie `translate()`, `rotate()` oder `scale()` verwendet werden. Das ermöglicht dynamische Positionen und Ausrichtungen:

:::openscad{height="500px"}
```scad
// Parameter für Abmessungen
abstand = 30;
wuerfel_groesse = 20;

// Würfel in einem Kreis anordnen
for (i = [0:7]) {
    // Winkel berechnen
    winkel = i * 45;
    // Position mit trigonometrischen Funktionen
    x = abstand * cos(winkel);
    y = abstand * sin(winkel);
    
    translate([x, y, 0]) cube(wuerfel_groesse);
}
```
:::

::::snippet{#aufgabe}
**Kreisberechnung:**
Ersetze die for-Schleife durch einzelne translate-Aufrufe für 4 Würfel (bei 0°, 90°, 180°, 270°). Verwende weiterhin den Parameter `abstand` für den Radius.

:::openscad{height="500px"}
```scad
abstand = 40;
wuerfel_groesse = 15;

// Würfel 1 bei 0°
translate([abstand * cos(0), abstand * sin(0), 0]) cube(wuerfel_groesse);

// Füge hier Würfel bei 90°, 180° und 270° hinzu

```
:::

::::

---

## Praktische Anwendung: Anpassbarer Schlüsselanhänger

Kombinieren wir alles Gelernte in einem praktischen Beispiel. Hier siehst du Schritt für Schritt, wie ein anpassbarer Schlüsselanhänger mit Parametern erstellt wird.

:::collapsible{title="Schritt 1: Hauptparameter definieren"}
Lege zunächst die Abmessungen des Schlüsselanhängers fest. Diese Parameter steuern alle weiteren Berechnungen.

```scad
// Hauptparameter
breite = 50;
hoehe = 30;
dicke = 3;
loch_durchmesser = 6;
```
:::

:::collapsible{title="Schritt 2: Abgerundete Ecken berechnen"}
Der Radius für die abgerundeten Ecken wird als Bruchteil der Höhe berechnet. So passt sich die Abrundung automatisch an, wenn du die Höhe änderst.

```scad
// Abgerundete Ecken: Radius als Bruchteil der Hoehe
eck_radius = hoehe / 4;
```
:::

:::collapsible{title="Schritt 3: Grundform mit hull() erstellen"}
Die Hauptform besteht aus einer rechteckigen Platte und vier Zylindern an den Ecken. Die `hull()`-Funktion verbindet alle diese Objekte und erstellt eine glatte Hülle.

```scad
// Grundform
hull() {
    // Rechteckige Form
    translate([eck_radius, eck_radius, 0]) cube([breite - 2*eck_radius, hoehe - 2*eck_radius, dicke]);
    // Vier Zylinder fuer die Abrundung
    translate([0, 0, 0]) cylinder(h=dicke, r=eck_radius);
    translate([breite, 0, 0]) cylinder(h=dicke, r=eck_radius);
    translate([0, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
    translate([breite, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
}
```
:::

:::collapsible{title="Schritt 4: Loch für den Ring hinzufügen"}
Mit `difference()` wird das Loch für den Schlüsselring aus der Grundform "ausgeschnitten". Das Loch wird als Zylinder definiert, der durch die gesamte Dicke geht.

```scad
// Loch fuer den Ring
translate([breite/2, hoehe, 0]) cylinder(h=dicke*2, r=loch_durchmesser/2);
```
:::

:::collapsible{title="Schritt 5: Alles zusammenführen"}
Kombiniere alle Schritte in einem `difference()`-Block, um das Loch aus der Grundform zu entfernen.

```scad
// Komplett
difference() {
    hull() {
        translate([eck_radius, eck_radius, 0]) cube([breite - 2*eck_radius, hoehe - 2*eck_radius, dicke]);
        translate([0, 0, 0]) cylinder(h=dicke, r=eck_radius);
        translate([breite, 0, 0]) cylinder(h=dicke, r=eck_radius);
        translate([0, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
        translate([breite, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
    }
    translate([breite/2, hoehe, 0]) cylinder(h=dicke*2, r=loch_durchmesser/2);
}
```
:::

:::collapsible{title="Schritt 6: Text hinzufügen (optional)"}
Füge einen personalisierten Text hinzu, der auf dem Schlüsselanhänger eingraviert wird. Der Text wird extrudiert und in die Mitte platziert.

```scad
// Text hinzufuegen
translate([breite/2, hoehe/2, dicke/2]) rotate([-90, 0, 0]) 
    linear_extrude(height=dicke*2) text("SCAD", size=8, halign="center", valign="center");
```
:::

Jetzt kannst du alle Schritte selbst ausprobieren und die Parameter anpassen:

:::openscad{height="600px"}
```scad
// Hauptparameter
breite = 50;
hoehe = 30;
dicke = 3;
loch_durchmesser = 6;

// Abgerundete Ecken
eck_radius = hoehe / 4;

// Anhaenger erstellen
difference() {
    hull() {
        translate([eck_radius, eck_radius, 0]) cube([breite - 2*eck_radius, hoehe - 2*eck_radius, dicke]);
        translate([0, 0, 0]) cylinder(h=dicke, r=eck_radius);
        translate([breite, 0, 0]) cylinder(h=dicke, r=eck_radius);
        translate([0, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
        translate([breite, hoehe, 0]) cylinder(h=dicke, r=eck_radius);
    }
    translate([breite/2, hoehe, 0]) cylinder(h=dicke*2, r=loch_durchmesser/2);
}

// Text hinzufuegen
translate([breite/2, hoehe/2, dicke/2]) rotate([-90, 0, 0]) 
    linear_extrude(height=dicke*2) text("SCAD", size=8, halign="center", valign="center");
```
:::

---

## Wissensüberprüfung

:::multievent
Welche spezielle Variable steuert die Glattheit von runden Objekten?

{r1{$t}} 

{r1{!$fa}} 

{r1{$fs}} 

{r1{$pi}}

Was passiert, wenn du `$fa = 1;` setzt?

{r2{Die Oberfläche wird sehr eckig}} 

{r2{!Die Oberfläche wird sehr glatt}}

{r2{Die Farbe ändert sich}}

{r2{Nichts, $fa ist immer 12}}

Wie kannst du eine Animation erstellen, die einen Würfel von links nach rechts bewegt?

{r3{translate([$t * 100, 0, 0]) cube(20);}} 

{r3{translate([100, 0, 0]) cube($t * 20);}}

{r3{!rotate([$t * 360, 0, 0]) cube(20);}} 

{r3{scale([$t, $t, $t]) cube(20);}}
:::
