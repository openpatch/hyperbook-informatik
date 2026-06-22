---
title: Häufige Fehler & Lösungen
index: 7
permaid: openscad-haeufige-fehler
---

# 🚨 Häufige Fehler & wie du sie fixst

Jeder macht Fehler – auch Profis! Hier die **Top 10 Fehler**, die Anfänger:innen in OpenSCAD machen, und wie du sie **sofort behebst**.

## Fehler 1: "Unexpected token" oder "Syntax error"

**Fehlermeldung:**
```
ERROR: Unexpected token '...'
```

**Ursache:** Fehlendes Semikolon `;` am Ende eines Befehls.

**Beispiel:**
```scad
// ❌ Falsch
cube(30)
sphere(20);

// ✅ Richtig
cube(30);
sphere(20);
```

**Merksatz:** Jeder Befehl ist wie ein Satz – und Sätze enden mit einem Punkt (in OpenSCAD: Semikolon).

---

## Fehler 2: "Unexpected ']'" oder "Expected ')'"

**Fehlermeldung:**
```
ERROR: Unexpected ']'
```

**Ursache:** Falsche Klammern verwendet.

**Beispiel:**
```scad
// ❌ Falsch
cube[30,30,30];  // Eckige Klammern falsch
translate(50,0,0) cube(10);  // Runde Klammern für Vektor falsch

// ✅ Richtig
cube([30,30,30]);  // Eckige Klammern für Arrays
translate([50,0,0]) cube(10);  // Eckige Klammern für Vektoren
```

**Merksatz:**
| Klammer | Verwendung |
|---------|-------------|
| `()` | Parameter eines einzelnen Befehls |
| `[]` | Listen von Werten (Vektoren, Arrays) |
| `{}` | Gruppierung mehrerer Befehle |

---

## Fehler 3: "Unknown variable" oder "Undefined variable"

**Fehlermeldung:**
```
ERROR: Unknown variable 'sphere'
```

**Ursache:** Tippfehler im Befehlsnamen.

**Beispiel:**
```scad
// ❌ Falsch
cube(30);
sphere(20);  // "sph**e**re" statt "sph**ä**re" – aber in OpenSCAD heißt es "sphere"
cylnder(h=20, r=5);  // "cyln**d**er" statt "cylin**d**er"

// ✅ Richtig
cube(30);
sphere(20);
cylinder(h=20, r=5);
```

**Merksatz:** OpenSCAD kennt diese Grundbefehle (alle **kleingeschrieben**):
- `cube()` – Würfel
- `sphere()` – Kugel
- `cylinder()` – Zylinder
- `translate()` – Verschieben
- `rotate()` – Drehen
- `scale()` – Skalieren
- `color()` – Farbe
- `text()` – Text

---

## Fehler 4: Objekte verschwinden oder sind unsichtbar

**Problem:** Dein Objekt ist nicht zu sehen.

**Mögliche Ursachen:**

### Ursache A: Objekt ist zu klein
```scad
// ❌ Zu klein
translate([1000,0,0]) cube(0.1);  // 0,1mm groß – kaum sichtbar

// ✅ Richtig
translate([1000,0,0]) cube(10);  // 10mm groß – gut sichtbar
```

### Ursache B: Objekt ist zu weit weg
```scad
// ❌ Zu weit weg
translate([10000,0,0]) cube(10);  // 10 Meter nach rechts – außerhalb des Sichtbereichs

// ✅ Richtig
translate([50,0,0]) cube(10);  // 50mm nach rechts – gut sichtbar
```

**Lösung:** Zoome mit dem **Mausrad** heraus oder verringere die Verschiebung.

---

## Fehler 5: "Module not found" (bei externen Bibliotheken)

**Fehlermeldung:**
```
ERROR: Unable to open file 'BOSL2/std.scad'
```

**Ursache:** Externe Bibliothek nicht geladen.

**Lösung:** Du musst die Bibliothek zuerst **einbinden**:
```scad
// ❌ Falsch – Bibliothek nicht geladen
hexagon(10);

// ✅ Richtig – Bibliothek geladen
use <BOSL2/std.scad>
hexagon(10);
```

**Merksatz:** Externe Bibliotheken müssen **vor** ihrer Verwendung mit `use <...>` geladen werden.

---

## Fehler 6: Objekte überlappen sich (wenn sie nicht sollen)

**Problem:** Zwei Objekte sind **im selben Raum** und überlappen sich.

**Ursache:** Falsche Positionierung.

**Beispiel:**
```scad
// ❌ Falsch – beide Würfel am selben Ort
cube(20);
cube(20);  // Zweiter Würfel genau auf dem ersten

// ✅ Richtig – Würfel nebeneinander
cube(20);
translate([25,0,0]) cube(20);  // 25mm nach rechts verschoben
```

**Merksatz:** wenn du **mehrere Objekte** hast, musst du sie **verschieben**, sonst sind sie am selben Ort.

---

## Fehler 7: "Expected ';' before '}'"

**Fehlermeldung:**
```
ERROR: Expected ';' before '}'
```

**Ursache:** Fehlendes Semikolon **vor** einer schließenden Klammer.

**Beispiel:**
```scad
// ❌ Falsch – Semikolon fehlt
color("red") {
    cube(20)
}

// ✅ Richtig – Semikolon vorhanden
color("red") {
    cube(20);
}
```

**Merksatz:** **Jeder Befehl** – auch innerhalb von `{ }` – **muss mit `;` enden**.

---

## Fehler 8: Farben funktionieren nicht

**Problem:** `color()` hat keine Wirkung.

**Mögliche Ursachen:**

### Ursache A: `color()` gilt nur für das nächste Objekt
```scad
// ❌ Falsch – Farbe gilt nur für den Würfel
color("red")
cube(20);
sphere(20);  // Die Kugel ist NICHT rot!

// ✅ Richtig – Farbe für jedes Objekt angeben
color("red") cube(20);
color("red") sphere(20);

// ✅ Alternativ – Gruppe verwenden
color("red") {
    cube(20);
    sphere(20);
}
```

### Ursache B: Falscher Farbenname
```scad
// ❌ Falsch – Farbe existiert nicht
color("schwarz") cube(20);  // "schwarz" funktioniert nicht

// ✅ Richtig – englische Farbnamen
color("black") cube(20);
```

**Merksatz:** OpenSCAD versteht nur **englische Farbnamen** oder **RGB-Werte**:
- `"red"`, `"green"`, `"blue"`, `"black"`, `"white"`, `"yellow"`
- Oder: `color([255,0,0])` für Rot (RGB: Rot=255, Grün=0, Blau=0)

---

## Fehler 9: Drehung funktioniert nicht wie erwartet

**Problem:** `rotate()` dreht das Objekt in die falsche Richtung.

**Ursache:** OpenSCAD verwendet **Grad** (nicht Radiant!) und die **Reihenfolge der Achsen** ist `x, y, z`.

**Beispiel:**
```scad
// Dreht das Objekt um 45 Grad um die Z-Achse (nach rechts)
rotate([0, 0, 45]) cube([20, 20, 5]);

// Dreht das Objekt um 45 Grad um die X-Achse (nach vorne kippen)
rotate([45, 0, 0]) cube([20, 5, 20]);
```

**Merksatz:**
- `rotate([x, y, z])` – Rotation um die **x-, y- und z-Achse**
- **Positive Werte** = Drehung **gegen den Uhrzeigersinn** (von oben gesehen)
- **1 Grad = 1°** (nicht Radiant!)

---

## Fehler 10: "WARNING: Ignoring unknown variable"

**Fehlermeldung:**
```
WARNING: Ignoring unknown variable 'Seite'
```

**Ursache:** Variable wurde **nicht definiert** oder **falsch geschrieben**.

**Beispiel:**
```scad
// ❌ Falsch – Variable nicht definiert
cube(Seite);  // "Seite" existiert nicht

// ✅ Richtig – Variable definiert
Seite = 30;
cube(Seite);

// ❌ Falsch – Variable falsch geschrieben
seite = 30;
cube(Seite);  // "Seite" vs. "seite" – Groß-/Kleinschreibung!

// ✅ Richtig – gleich geschrieben
seite = 30;
cube(seite);
```

**Merksatz:** Variablennamen sind **case-sensitive** (Groß-/Kleinschreibung zählt).

---

## 🎯 Fehler-Detektiv: Übung

::::snippet{#aufgabe}
**Lösung:**
Korrigiere die Fehler im Quelltext.

:::openscad
```scad
color(red) cube[30,30,30]
translate(40,0,0) sphere(r=15)
color("blue") cylinder(h=20 r=5)
text Hello, size=10
cube(10
```
:::

::::

:::collapsible{title="Lösung anzeigen"}
Hier ist die korrigierte Version:
```scad
color("red") cube([30,30,30]);
translate([40,0,0]) sphere(r=15);
color("blue") cylinder(h=20, r=5);
linear_extrude(height=2) text("Hello", size=10);
cube(10);
```

**Fehler waren:**
1. `color(red)` → `color("red")` (Anführungszeichen fehlen)
2. `cube[30,30,30]` → `cube([30,30,30])` (falsche Klammern)
3. `translate(40,0,0)` → `translate([40,0,0])` (eckige Klammern fehlen)
4. `cylinder(h=20 r=5)` → `cylinder(h=20, r=5)` (Komma fehlt)
5. `text Hello, size=10` → `linear_extrude(height=2) text("Hello", size=10)` (Anführungszeichen, Klammern und linear_extrude fehlen)
6. `cube(10` → `cube(10);` (Semikolon und schließende Klammer fehlen)
:::

---

## 📋 Fehler-Checkliste

Bevor du nach Hilfe fragst, prüfe diese Punkte:

- [ ] **Semikolon?** – Endet jeder Befehl mit `;`?
- [ ] **Klammern?** – Sind alle `()`, `[]`, `{}` richtig geschlossen?
- [ ] **Kommas?** – Sind Werte in Listen durch `,` getrennt?
- [ ] **Befehlsnamen?** – Sind alle Befehle **kleingeschrieben** und **richtig geschrieben**?
- [ ] **Variablen?** – Sind alle Variablen **definiert** und **richtig geschrieben**?
- [ ] **Farben?** – Sind Farbnamen in **Anführungszeichen** und **auf Englisch**?
- [ ] **Position?** – Sind Objekte **sichtbar** und nicht zu weit weg?

---

## 💡 Wichtigster Tipp: Die Fehlermeldung lesen!

OpenSCAD gibt dir **immer einen Hinweis**, was falsch ist. 

**Beispiel:**
```
ERROR: Unexpected token '}' in file test.scad, line 5
```

Das bedeutet:
- **Was ist falsch?** Eine schließende Klammer `}`
- **Wo?** In Datei `test.scad`, **Zeile 5**
- **Lösung:** Schau dir Zeile 5 an – wahrscheinlich fehlt ein Semikolon **vor** der `}`

**Merksatz:** Die Fehlermeldung sagt dir **fast immer**, in welcher Zeile der Fehler ist. Schau dir diese Zeile und die **Zeilen davor** genau an!
