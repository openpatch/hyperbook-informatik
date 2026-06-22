---
title: OpenSCAD Cheat Sheet
index: 25
permaid: openscad-cheatsheet
---

# 📋 OpenSCAD Cheat Sheet

**💡 Tipp:** Drucke dir dieses Cheat Sheet aus und lege es neben deinen Bildschirm!

---

## 🔹 Grundformen

| Form | Befehl | Parameter | Beispiel |
|------|--------|-----------|----------|
| Würfel | `cube()` | `[Länge, Breite, Höhe]` oder `Seitenlänge` | `cube(20);` oder `cube([30,20,10]);` |
| Kugel | `sphere()` | `r=` Radius oder `d=` Durchmesser | `sphere(r=10);` oder `sphere(d=20);` |
| Zylinder | `cylinder()` | `h=` Höhe, `r=` Radius, `d=` Durchmesser, `r1=` Radius oben, `r2=` Radius unten | `cylinder(h=20, r=5);` oder `cylinder(h=20, d=10);` |
| Zylinder (Kegel) | `cylinder()` | `h=` Höhe, `r1=` Radius unten, `r2=` Radius oben | `cylinder(h=20, r1=10, r2=0);` |
| Text | `linear_extrude() text()` | `height=`, `"Text"`, `size=`, `halign=`, `valign=` | `linear_extrude(height=2) text("A", size=10, halign="center");` |

---

## 🔹 Transformationen

| Aktion | Befehl | Parameter | Beispiel |
|--------|--------|-----------|----------|
| Verschieben | `translate()` | `[x,y,z]` Verschiebung in mm | `translate([10,0,0]) cube(20);` |
| Drehen | `rotate()` | `[x,y,z]` Drehung in Grad | `rotate([0,0,45]) cube(20);` |
| Skalieren | `scale()` | `[x,y,z]` Skalierungsfaktor | `scale([2,1,1]) cube(10);` |
| Spiegeln | `mirror()` | `[x,y,z]` Spiegelachse (0 oder 1) | `mirror([1,0,0]) cube(20);` |

**Wichtig:** Transformationen werden **von innen nach außen** angewendet (von rechts nach links im Code).

---

## 🔹 Bool'sche Operationen

| Operation | Befehl | Beschreibung | Beispiel |
|-----------|--------|--------------|----------|
| Vereinigung | `union()` | Kombiniert Objekte | `union() { cube(10); sphere(5); }` |
| Differenz | `difference()` | Subtrahiert Objekte | `difference() { cube(10); cylinder(...); }` |
| Schnittmenge | `intersection()` | Nur überlappende Teile | `intersection() { cube(10); sphere(5); }` |
| Hülle | `hull()` | Erstellt eine Hülle um alle Objekte | `hull() { ... }` |

---

## 🔹 Farben

| Farbe | Befehl | Beispiel |
|-------|--------|----------|
| Nach Name | `color("Farbname")` | `color("red") cube(20);` |
| RGB-Wert | `color([R,G,B])` | `color([255,0,0]) cube(20);` |
| RGBA (mit Transparenz) | `color([R,G,B,A])` | `color([255,0,0,0.5]) cube(20);` |

**Verfügbare Farbnamen:**
`"red"`, `"green"`, `"blue"`, `"black"`, `"white"`, `"yellow"`, `"cyan"`, `"magenta"`, `"gray"`, `"silver"`, `"gold"`, `"pink"`, `"brown"`, `"orange"`, `"purple"`

---

## 🔹 Variablen

```scad
// Variable definieren
seite = 20;
höhe = 10;

// Variable verwenden
cube(seite);
cylinder(h=höhe, r=5);
```

---

## 🔹 Module (eigene Funktionen)

```scad
// Modul definieren
module mein_wuerfel(groesse) {
    cube(groesse);
}

// Modul aufrufen
mein_wuerfel(30);

// Modul mit mehreren Parametern
module bein(höhe, radius) {
    cylinder(h=höhe, r=radius);
}

// Modul aufrufen
bein(50, 5);
```

---

## 🔹 Schleifen

### for-Schleife

```scad
// Zählschleife
for (i = [1, 2, 3, 4]) {
    translate([i*10, 0, 0])
        cube(5);
}

// Bereichsschleife
for (i = [0:10:50]) {  // von 0 bis 50 in Schritten von 10
    translate([i, 0, 0])
        cube(5);
}
```

---

## 🔹 Koordinatensystem

```
        z
        ↑
        │
        │____ y
       /    
      /     
     x      
```

- **x-Achse:** links ↔ rechts
- **y-Achse:** vorne ↔ hinten
- **z-Achse:** unten ↔ oben

---

## 🔹 Häufige Fehler & Lösungen

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| `Unexpected token` | Fehlendes Semikolon | Semikolon `;` am Ende hinzufügen |
| `Unexpected ']'` | Falsche Klammern | `()` für Parameter, `[]` für Listen |
| `Unknown variable` | Tippfehler oder Variable nicht definiert | Befehlsnamen prüfen |
| Objekt unsichtbar | Zu klein oder zu weit weg | Größe erhöhen oder Position anpassen |
| `Expected ';' before '}'` | Fehlendes Semikolon in Gruppe | Semikolon vor `}` hinzufügen |
| Farben funktionieren nicht | Falscher Farbenname | Englische Farbnamen verwenden |

---

## 🔹 Nützliche Tastenkürzel

| Taste | Aktion |
|-------|--------|
| Strg + Z | Rückgängig |
| Strg + Y | Wiederherstellen |
| Mausrad | Zoomen |
| Linke Maustaste | Modell drehen |
| Rechte Maustaste | Modell verschieben |

**Hinweis:** In der Browser-Version aktualisiert sich die Vorschau **automatisch**.

---

## 🔹 Export für den 3D-Druck

OpenSCAD unterstützt zwei Formate:
- **STL** (`.stl`) – Standardformat, einfarbig
- **3MF** (`.3mf`) – Unterstützt **Farben und Multi-Material**

**Export-Schritte:**
1. **Datei → Export → Export als STL** (einfarbig) oder **Export als 3MF** (mit Farben)
2. Dateinamen eingeben (z.B. `mein-modell.stl` oder `mein-modell.3mf`)
3. Auf **Speichern** klicken
4. Datei in den Slicer laden

**Tipp:** 3MF funktioniert in **lokaler und Online-Version** von OpenSCAD.

---

## 🔹 Nützliche Links

- [OpenSCAD Offizielle Dokumentation](https://openscad.org/documentation.html)
- [OpenSCAD Cheat Sheet (Englisch)](https://openscad.org/cheatsheet/)
- [Thingiverse – Inspiration für 3D-Modelle](https://www.thingiverse.com/)

---

## 📌 Wichtigster Tipp

> **"Wenn etwas nicht funktioniert, lies die Fehlermeldung!**
> OpenSCAD sagt dir fast immer, **wo** der Fehler ist (Zeilennummer) und **was** falsch ist."

---

**Viel Spaß beim 3D-Modellieren!** 🎉
