---
title: Übungen – 3D-Körper
index: 11
permaid: openscad-uebungen-3d-koerper
---

# Übungen – 3D-Körper

Im Kapitel [3D-Körper – Vertiefung](./10-3d-koerper-vertiefung.md) hast du die grundlegenden 3D-Körper in OpenSCAD kennengelernt. Jetzt ist es an der Zeit, das Gelernte anzuwenden und ein eigenes 3D-Modell zu erstellen.

## Model 1

![](./model1.png)

::::snippet{#aufgabe}
Bilde das obige Modell in OpenSCAD nach.

:::openscad
```scad
// Beispiel: Grundform
cube([20, 20, 20]);
// Dein Code hier
```
:::

::::

::::snippet{#aufgabe}
Verändere den Quelltext so, dass aus dem runden Modell ein eckiges wird.

Tipp: Erinnere dich an `$fn` aus [3D-Körper – Vertiefung](./10-3d-koerper-vertiefung.md).

:::openscad
```scad
// Starte mit einer runden Kugel
$fn=50;
sphere(d=50);
```
:::

::::

## Model Fernsehturm

![](./fernsehturm.png){height="400px"}

::::snippet{#aufgabe}
Bilde den Berliner Fernsehturm in OpenSCAD nach. Nutze dafür nur Zylinder und Kugeln.

:::openscad
```scad
// Beispiel: Grundform mit Zylindern und Kugeln
cylinder(h=100, r=20);
translate([0, 0, 100]) sphere(r=15);
// Dein Code hier
```
:::

::::