---
title: Farben
index: 1
permaid: openscad-farben
---

# Farben

Mit dem Befehl `color()` kannst du Objekten in der Vorschau eine Farbe geben. Das macht es einfacher, verschiedene Teile eines Modells zu unterscheiden.

```scad
color("Farbname") Anweisung;
```

:::alert{info}
Farben in OpenSCAD:
- **Vorschau:** Farben werden in der Vorschau angezeigt
- **3D-Druck:** Die Farbinformationen werden **nur im 3MF-Format** exportiert
- **STL-Format:** Farben gehen verloren – das gedruckte Modell verwendet das Filament deines Druckers
- **Multi-Material-Drucker:** Mit 3MF und passendem Slicer kannst du farbige Modelle drucken
:::

## Farbnamen

Du kannst englische Farbnamen verwenden:

:::openscad{height="500px"}
```scad
$fn = 32;

color("red")    translate([-60, 0, 0]) sphere(r=15);
color("green")  translate([-20, 0, 0]) sphere(r=15);
color("blue")   translate([ 20, 0, 0]) sphere(r=15);
color("yellow") translate([ 60, 0, 0]) sphere(r=15);
```
:::

Einige nützliche Farbnamen:

| Deutsch   | Englisch  |
| --------- | --------- |
| Rot       | `"red"`   |
| Grün      | `"green"` |
| Blau      | `"blue"`  |
| Gelb      | `"yellow"`|
| Orange    | `"orange"`|
| Weiß      | `"white"` |
| Grau      | `"gray"`  |
| Schwarz   | `"black"` |

Eine vollständige Liste findest du unter: https://en.wikipedia.org/wiki/Web_colors

## Transparenz

Als zweiten Parameter kannst du die Transparenz angeben (0 = unsichtbar, 1 = undurchsichtig):

:::openscad{height="400px"}
```scad
$fn = 32;

// Undurchsichtiger Würfel
color("blue", 1.0) cube([30, 30, 30], center=true);

// Halbtransparente Kugel darüber
color("red", 0.4) sphere(r=25);
```
:::

## Übung

::::snippet{#aufgabe}
Erstelle ein Modell aus mindestens drei Objekten, jedes in einer anderen Farbe. Verwende auch Transparenz bei einem Objekt.

:::openscad{height="500px"}
```scad
cube(30);
```
:::

::::

---

## Selbsttest

::::multievent

**1. Wozu dient color in OpenSCAD?**

{r1{Es legt die Filamentfarbe für den Druck fest.}}

{r1{!Es färbt ein Objekt in der Vorschau ein.}}

{r1{Es macht ein Objekt größer.}}

{r1{Es speichert die Farbe in der STL-Datei.}}

{h{Was weiß der Drucker über Farben, wenn nur eine Rolle Filament eingelegt ist?}}
{H{Richtig. In der STL-Datei stehen nur Dreiecke, keine Farben.}}

**2. Für welche Objekte gilt ein color-Befehl ohne geschweifte Klammern?**

{r2{für alle folgenden}}

{r2{!nur für das unmittelbar folgende}}

{r2{für alle im ganzen Modell}}

{r2{für keines}}

{h{Dieselbe Regel wie bei translate.}}
{H{Richtig – mehrere Objekte fasst man mit geschweiften Klammern zusammen.}}

**3. Wozu ist Einfärben trotzdem nützlich, wenn es nicht gedruckt wird?**

{c1{!Man erkennt in einem verschachtelten Modell, welches Teil welches ist.}}

{c1{!Man kann sichtbar machen, wo zwei Körper sich überschneiden.}}

{c1{Der Druck wird dadurch stabiler.}}

{c1{Der Slicer rechnet dadurch schneller.}}

{h{Zwei der Angebote betreffen das Erkennen am Bildschirm.}}
{H{Richtig – Farbe ist hier ein Werkzeug zum Prüfen, nicht zum Gestalten.}}

::::
