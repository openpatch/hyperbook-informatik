---
title: Bilder
index: 3
permaid: openscad-bilder
---

# Bilder

Du kannst auch Bilder in OpenSCAD verwenden, um 3D-Modelle zu erstellen. Das ist besonders nützlich, wenn du ein 2D-Bild hast, das du in ein 3D-Objekt umwandeln möchtest.

Dazu kannst du die `surface()`-Funktion verwenden, um ein Bild als Höhenkarte zu interpretieren. Hier ist ein Beispiel, wie du ein Bild in OpenSCAD verwenden kannst:

:::openscad{height="600px"}
@file dest="/blume.png" src="./blume.png"

```scad
surface(file="/blume.png", center=true, invert=true);
```
:::

In der webbasierten Version von OpenSCAD kannst du Graustufen-png-Bilder verwenden. Diese kannst du bei **Binärdateien** hochladen. Den angezeigten Pfad kannst du dann in der `surface()`-Funktion verwenden.

---

## Selbsttest

::::multievent

**1. Was macht surface aus einem Graustufenbild?**

{r1{Es druckt das Bild in Farbe.}}

{r1{!Es erzeugt eine Fläche, deren Höhe an jeder Stelle von der Helligkeit abhängt.}}

{r1{Es legt das Bild als Aufkleber auf ein Objekt.}}

{r1{Es wandelt das Bild in Text um.}}

{h{Hell und dunkel werden zu hoch und tief.}}
{H{Richtig – so entsteht aus einem Foto ein Relief.}}

**2. Warum eignet sich ein kontrastreiches Bild besser als ein flaues?**

{r2{Weil es kleiner ist.}}

{r2{!Weil aus großen Helligkeitsunterschieden deutliche Höhenunterschiede werden.}}

{r2{Weil OpenSCAD flaue Bilder nicht lesen kann.}}

{r2{Es gibt keinen Unterschied.}}

{h{Was wird aus einem Bild, das nur Grautöne zwischen 40 und 60 Prozent enthält?}}
{H{Richtig – dann liegt alles fast auf einer Höhe und man erkennt nichts.}}

**3. Was ist bei der Auflösung des Bildes zu bedenken?**

{r3{Je größer, desto besser – immer.}}

{r3{!Jeder Bildpunkt wird zu Geometrie; große Bilder machen das Modell sehr langsam.}}

{r3{Die Auflösung spielt keine Rolle.}}

{r3{Bilder müssen quadratisch sein.}}

{h{Ein Bild mit 1000 mal 1000 Punkten ergibt eine Million Höhenwerte.}}
{H{Richtig – für ein Relief genügen meist wenige hundert Punkte je Kante.}}

::::
