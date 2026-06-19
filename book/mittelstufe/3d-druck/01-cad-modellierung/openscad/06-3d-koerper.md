---
title: 3D-Körper
index: 6
---

# 3D-Körper

In OpenSCAD werden die meisten 3D-Modelle durch eine Kombination von 3D-Körpern erstellt. (Es gibt auch komplexere Möglichkeiten, aber wir werden uns zunächst auf die grundlegenden 3D-Körper konzentrieren.)

Die 3D-Körper solltest du schon aus dem Mathematikunterricht kennen.

Es gibt Befehle zum Erstellen von Kugeln, Würfeln und Zylindern. In den Beispielen auf dieser Seite wird außerdem `translate` verwendet, um Objekte nebeneinander zu positionieren – du wirst diesen Befehl in [Einfache Transformationen](./08-einfache-transformationen.md) genauer kennenlernen.

:::alert{info}
Es gibt in OpenSCAD auch einen `polyhedron`-Befehl für beliebige Vielflächner. Dieser ist für Fortgeschrittene und wird in diesem Kurs nicht behandelt.
:::

## Kugel

Eine Kugel kann entweder durch ihren Durchmesser oder durch ihren Radius definiert werden.

:::openscad
```scad
translate([-50,0,0]) sphere(d=100); // Durchmesser
translate([50, 0, 0]) sphere(r=50);  // Radius
```
:::

:::snippet{#aufgabe}
Verändere den Quelltext, sodass die Kugeln unterschiedlich groß sind.
:::

## Auflösung der Kugel

Standardmäßig sieht eine Kugel in OpenSCAD kantig aus. Das liegt daran, dass sie aus vielen kleinen Dreiecken besteht, die zusammen die Oberfläche bilden. Je mehr Dreiecke, desto runder sieht die Kugel aus. Du kannst die Anzahl der Dreiecke mit dem globalen Parameter `$fn` erhöhen:

:::openscad
```scad
$fn=8;
translate([0, 0, 0]) sphere(d=100);
```
:::

:::snippet{#aufgabe}
Experimentiere mit verschiedenen Werten für `$fn` und beobachte, wie sich die Kugel verändert.
:::

## Würfel

Würfel in OpenSCAD sind rechteckige Quader, die durch ihre Länge, Breite und Höhe definiert werden. Der Befehl zum Erstellen eines Würfels ist `cube`. Die Syntax sieht so aus:

```scad
cube([Länge, Breite, Höhe]);
```

Oder, wenn es wirklich ein Würfel sein soll, kannst du auch nur eine Zahl angeben, die für alle drei Dimensionen gilt:

```scad
cube(Seitenlänge);
```

:::openscad
```scad
translate([-60,0,0]) cube([100, 50, 25]); // Länge, Breite, Höhe
translate([50, 0, 0]) cube(50);          // Seitenlänge
```
:::

:::snippet{#aufgabe}
Füge einen weiteren Würfel hinzu, der eine andere Größe und Position hat.
:::


:::alert{info}
Der Würfel wird standardmäßig an der Ecke positioniert, die durch die Koordinaten (0, 0, 0) definiert ist. Das bedeutet, dass die Ecke des Würfels an diesem Punkt liegt und der Würfel sich in positive Richtung erstreckt. Wenn du den Würfel zentrieren möchtest, kannst du die Option `center=true` verwenden:

```scad
cube([Länge, Breite, Höhe], center=true);
```
:::

## Zylinder

Ein Zylinder in OpenSCAD ist auch weiter zu fassen, als der Zylinder, den du aus dem Mathematikunterricht kennst. Zylinder können auch kegelförmig sein, wenn der Durchmesser an der einen Seite größer ist als an der anderen Seite. Der Befehl zum Erstellen eines Zylinders ist `cylinder`. Die Syntax sieht so aus:

```scad
cylinder(h=Höhe, d=Durchmesser); // Zylinder mit konstantem Durchmesser
cylinder(h=Höhe, d1=Durchmesser1, d2=Durchmesser2); // Kegel mit unterschiedlichem Durchmesser an den beiden Enden
```

:::openscad
```scad
translate([-50, 0, 0]) cylinder(h=100, d=50);
translate([50, 0, 0]) cylinder(h=100, d1=50, d2=20);
```
:::

:::snippet{#aufgabe}
Verändere die Höhe und die Durchmesser der Zylinder, um verschiedene Formen zu erstellen.
:::

:::alert{info}
Du hast gesehen, dass wir manchmal den Radius und manchmal den Durchmesser angeben. Das liegt daran, dass es in OpenSCAD für einige Formen beide Möglichkeiten gibt. Es ist wichtig, die Dokumentation zu lesen, um zu wissen, welche Parameter du verwenden musst.

https://openscad.org/cheatsheet/
:::

## Wissensüberprüfung

:::multievent
Mit welchem Befehl erzeugst du eine Kugel mit Radius 10?

{r1{cube(10)}} {r1{!sphere(r=10)}} {r1{cylinder(r=10)}} {r1{ball(r=10)}}
:::

:::multievent
Welcher Parameter gibt die Höhe eines Zylinders an?

{r2{!h}} {r2{d}} {r2{r}} {r2{z}}
:::

:::multievent
Was bewirkt `center=true` bei einem Würfel?

{r3{Der Würfel wird unsichtbar.}} {r3{!Der Würfel wird um den Ursprung (0,0,0) zentriert.}} {r3{Der Würfel wird kleiner.}} {r3{Der Würfel erhält abgerundete Kanten.}}
:::

:::multievent
Wie kannst du eine Kugel glatter (runder) machen?

{r4{`r` erhöhen}} {r4{`d` erhöhen}} {r4{!`$fn` erhöhen}} {r4{`center=true` setzen}}
:::