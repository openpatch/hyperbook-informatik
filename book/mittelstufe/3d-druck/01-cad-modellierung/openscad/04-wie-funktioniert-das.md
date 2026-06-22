---
title: Wie funktioniert das eigentlich?
index: 4
permaid: openscad-wie-funktioniert-das
---

# Wie funktioniert das eigentlich?

Du hast schon einige 3D-Modelle erstellt. Aber **wie weiß OpenSCAD, was es tun soll?**

## OpenSCAD ist wie eine Bauanleitung

Stell dir vor, du baust ein Lego-Modell und beschreibst es am Telefon:

> "Nimm einen 2x4-Stein und lege ihn auf den Tisch. Dann nimm eine Kugel und setze sie daneben."

Genau das machst du in OpenSCAD – nur mit **genauen Befehlen**, die der Computer versteht.

| Deine Anleitung | OpenSCAD-Befehl |
|-----------------|-----------------|
| Nimm einen Würfel mit 30mm Seite | `cube(30);` |
| Bewege etwas um 40mm nach rechts | `translate([40,0,0])` |
| Mach eine Kugel mit 20mm Durchmesser | `sphere(20);` |
| Mach es rot | `color("red")` |

## Wichtige Regeln (damit es klappt)

OpenSCAD ist **pingelig wie ein Lehrer**. Du musst ein paar Regeln beachten:

### Regel 1: Jeder Befehl endet mit einem Semikolon

:::alert{warn}
🔴 **Jeder Befehl endet mit einem Semikolon `;`**

- ❌ Falsch: `cube(30)`
- ✅ Richtig: `cube(30);`
:::

**Warum?** Das Semikolon sagt OpenSCAD: "Hier endet der Befehl."

::::snippet{#aufgabe}
**Fehler finden:**
Welche Zeile hat einen Fehler?
```scad showLineNumbers
cube(30)
sphere(20);
translate([40,0,0]) cylinder(h=10, r=5);
```

:::multievent
Antwort: Die Zeile {z{1}} hat einen Fehler.
:::
::::

### Regel 2: Klammern müssen zusammenpassen

:::alert{warn}
🔴 **Achte auf die Klammern**

- ❌ Falsch: `cube[30,30,30);` (eckig + rund gemischt)
- ✅ Richtig: `cube([30,30,30]);` (nur eckige Klammern)
:::

| Klammer | Verwendung | Beispiel |
|---------|-------------|----------|
| `()` | Parameter eines Befehls | `cube(30)` |
| `[]` | Listen von Werten | `cube([30,20,10])` |
| `{}` | Gruppierung mehrerer Befehle | `{ cube(10); sphere(5); }` |

::::snippet{#aufgabe}
**Fehler finden:**
Welche Zeile hat einen Fehler?
```scad showLineNumbers
cube([30,30,30]);
translate(40,0,0) cube(10);
cylinder(h=20, r=5);
```

:::multievent
Antwort: Die Zeile {z{2}} hat einen Fehler.
:::
::::

### Regel 3: Kommas trennen Werte

:::alert{warn}
🔴 **Kommas trennen Werte in Listen**

- ❌ Falsch: `cube([30 30 30]);` (Leerzeichen statt Kommas)
- ✅ Richtig: `cube([30,30,30]);` (Kommas zwischen den Werten)
:::

### Regel 4: Groß- und Kleinschreibung zählt (manchmal)

:::alert{info}
In OpenSCAD ist es egal, ob du `cube` oder `CUBE` schreibst. **Aber:**
- Befehle wie `cube`, `sphere`, `cylinder` sind **kleingeschrieben**
- Parameter wie `h=`, `r=`, `d=` sind **kleingeschrieben**
- Farben wie `"red"`, `"blue"` sind **kleingeschrieben**


- ✅ Richtig: `cube(30);`
- ✅ Richtig: `CUBE(30);` (funktioniert auch, aber unübliche Schreibweise)
- ❌ Falsch: `Cube(30);` (mit großem C funktioniert **nicht**!)
:::

## Wie OpenSCAD deinen Code liest

OpenSCAD liest deinen Code **von oben nach unten** und **Zeile für Zeile**:

```scad
// OpenSCAD führt dies nacheinander aus:
cube(30);           // 1. Erstelle einen Würfel
translate([40,0,0]) sphere(20);  // 2. Erstelle eine Kugel und verschiebe sie
color("red") cylinder(h=20, r=5);  // 3. Erstelle einen roten Zylinder
```

### Wichtig: Transformationen gelten nur für das nächste Objekt

:::openscad
```scad
color("blue") cube(20); // Nur dieser Würfel ist blau
color("red") translate([30,0,0]) cube(20); // Nur dieser Würfel ist rot
```
:::

### Ausnahme: Gruppierung mit `{ }`

Wenn du mehrere Objekte in `{ }` setzt, gelten Befehle wie `color()` oder `translate()` für **alle Objekte in der Gruppe**:

:::openscad
```scad
color("green") {
    cube(20);
    translate([30,0,0]) sphere(10);
    translate([60,0,0]) cylinder(h=20, r=5);
}
// Alle drei Objekte sind grün!
```
:::

## Was ist Quelltext eigentlich?

In Kapitel 1 hast du schon **Quelltext** geschrieben – ohne es zu wissen!

**Quelltext** (auch *Code* genannt) ist einfach **Text, den der Computer versteht und ausführt**. 

In OpenSCAD:
- Jede Zeile ist eine **Anweisung**
- OpenSCAD liest diese Anweisungen
- Und baut daraus dein **3D-Modell**

**Beispiel:**
```scad
// Dies ist Quelltext:
cube([50, 30, 10]);        // Anweisung 1: Erstelle Würfel
translate([0, 40, 0])      // Anweisung 2: Verschiebe das nächste Objekt
    sphere(r=15);          // Anweisung 2 (Fortsetzung): Erstelle Kugel
```

## Kommentare – Notizen für dich

Manchmal möchtest du dir **Notizen** in deinem Code machen. Dafür gibt es **Kommentare**.

OpenSCAD ignoriert alles, was nach `//` steht:

```scad
// Das ist ein Kommentar – OpenSCAD ignoriert diese Zeile
cube(30); // Kommentar am Ende einer Zeile
// cylinder(h=10, r=5); // Diese Anweisung ist "auskommentiert" und wird nicht ausgeführt
```

Kommentare sind nützlich, um:
- Zu erklären, was ein Abschnitt macht
- Anweisungen vorübergehend zu deaktivieren, ohne sie zu löschen
- Dir selbst Notizen zu machen

::::snippet{#aufgabe}
**Aufgabe:**
Kommentiere die `sphere`-Zeile im folgenden Code ein und aus. Beobachte, wie sich das Modell verändert.

:::openscad
```scad
cube([30, 30, 10]);
// translate([0, 0, 15]) sphere(r=15);
```
:::

::::

## Zusammenfassung

In diesem Kapitel hast du gelernt:

- ✅ OpenSCAD liest deinen Code **Zeile für Zeile**
- ✅ **Jeder Befehl endet mit `;`**
- ✅ **Klammern müssen zusammenpassen**: `()` für Parameter, `[]` für Listen, `{}` für Gruppen
- ✅ **Kommas trennen Werte** in Listen
- ✅ **Kommentare** mit `//` schreiben Notizen
- ✅ **Gruppierung** mit `{ }` für mehrere Objekte
