---
title: Abschlussprojekt
index: 2
permaid: openscad-abschlussprojekt
---

# Abschlussprojekt

Du hast OpenSCAD von Grund auf gelernt: 3D-Körper, Transformationen, Kombinationen, Parameter, Schleifen, eigene Module und vieles mehr. Jetzt ist es Zeit, all das in einem eigenen Projekt zusammenzubringen!

## Aufgabe

Entwirf und modelliere ein **eigenes 3D-Objekt**, das du im Idealfall auch ausdrucken möchtest.

::::snippet{#aufgabe}
:::multievent
Wähle ein Projekt aus (oder erfinde dein eigenes) und setze es in OpenSCAD um. Dein Modell sollte mindestens **4 der folgenden Techniken** verwenden:

{c{!3D-Körper (cube, sphere, cylinder)}}

{c{!translate, rotate oder scale}}

{c{!difference, union oder intersection}}

{c{!Parameter/Variablen}}

{c{!for-Schleife}}

{c{!Eigenes Modul}}

{c{BOSL2 (cuboid mit rounding, skin, diff)}}

{c{color()}}
:::

:::openscad{height="500px"}
```scad
// Hier dein eigenes 3D-Projekt erstellen
// Beispiel: cube([20, 20, 20]);
```
:::

::::

## Projektideen

Falls du keine eigene Idee hast, hier sind einige Vorschläge:

### 🏷️ Namensschild

Ein personalisiertes Schild mit deinem Namen (oder einem Wort deiner Wahl), das man z. B. auf einen Schreibtisch stellen kann.

**Techniken:** [`text()`](../05-gestalten/02-text), [`linear_extrude()`](../03-transformationen/03-komplexe-transformationen), [`difference()`](../03-transformationen/02-kombination-von-objekten), [Parameter](../04-parameter-und-wiederholung/02-parameter-vertiefung) für Größe

### 🗝️ Schlüsselanhänger

Ein individueller Schlüsselanhänger mit deinen Initialen oder einem Symbol.

**Techniken:** [`hull()`](../03-transformationen/03-komplexe-transformationen), [`difference()`](../03-transformationen/02-kombination-von-objekten), [`text()`](../05-gestalten/02-text), [`linear_extrude()`](../03-transformationen/03-komplexe-transformationen)

### 🎲 Würfel

Ein klassischer 6-seitiger Spielwürfel mit Punkten (Augen) auf jeder Seite.

**Techniken:** [`cuboid(rounding=...)`](../06-bibliotheken/02-abgerundete-formen), [`difference()`](../03-transformationen/02-kombination-von-objekten), [`for`-Schleife](../04-parameter-und-wiederholung/03-schleifen) für die Punkte, [Modul](../04-parameter-und-wiederholung/04-eigene-module) für einen Punkt

### 🏆 Pokal / Trophäe

Ein kleiner Pokal aus Zylinder, Kugel und Basis.

**Techniken:** `cylinder`, `sphere`, [`translate`](../03-transformationen/01-einfache-transformationen), [Modul](../04-parameter-und-wiederholung/04-eigene-module), [Parameter](../04-parameter-und-wiederholung/02-parameter-vertiefung)

### 🌱 Vase

Eine geschwungene Vase, die man mit Wasser befüllen kann.

**Techniken:** [`skin()` aus BOSL2](../06-bibliotheken/05-formen-aus-profilen), [`difference()`](../03-transformationen/02-kombination-von-objekten) zum Aushöhlen, [Parameter](../04-parameter-und-wiederholung/02-parameter-vertiefung) für Wandstärke

### 🔩 Verbindungsstück

Ein technisches Bauteil, z. B. ein Rohr mit Flanschen oder ein Halter.

**Techniken:** `cylinder`, [`difference()`](../03-transformationen/02-kombination-von-objekten), [`for`-Schleife](../04-parameter-und-wiederholung/03-schleifen), [Parameter](../04-parameter-und-wiederholung/02-parameter-vertiefung), [Modul](../04-parameter-und-wiederholung/04-eigene-module)

---

## Dein Arbeitsbereich

:::openscad{height="700px"}
```scad
// Hier ist Platz für dein Abschlussprojekt!
// Beginne mit einem Kommentar, der dein Vorhaben beschreibt.

// Projekt: ...
// Techniken: ...



```
:::

---

## Checkliste vor dem Druck

Wenn du dein Modell ausdrucken möchtest, achte auf Folgendes:

:::multievent
Ist dein Modell **wasserdicht** (keine offenen Flächen)?

{r1{!Ja}} {r1{Nein}}

Liegt dein Modell flach auf der Z=0-Ebene (keine Teile unterhalb von Z=0)?

{r2{!Ja}} {r2{Nein}}

Sind die Wandstärken mindestens **1–2 mm** dick, damit der Druck gelingt?

{r3{!Ja}} {r3{Nein}}

Hast du dein Modell in der Vorschau überprüft, bevor du exportierst?

{r4{!Ja}} {r4{Nein}}
:::

Exportiere dein fertige Modell als **STL-Datei** (für einfarbige Modelle) oder **3MF-Datei** (für farbige/Multi-Material-Modelle) unter **Datei → Export** und übergib sie deiner Lehrkraft oder importiere sie direkt in deinen Slicer für den 3D-Druck.
