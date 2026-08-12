---
title: 3D-Körper – Vertiefung
index: 2
permaid: openscad-3d-koerper-vertiefung
---

# 3D-Körper – Vertiefung

In OpenSCAD werden die meisten 3D-Modelle durch eine Kombination von 3D-Körpern erstellt. (Es gibt auch komplexere Möglichkeiten, aber wir werden uns zunächst auf die grundlegenden 3D-Körper konzentrieren.)

Die 3D-Körper solltest du schon aus dem Mathematikunterricht kennen.

Es gibt Befehle zum Erstellen von Kugeln, Würfeln und Zylindern. In den Beispielen auf dieser Seite wird außerdem `translate` verwendet, um Objekte nebeneinander zu positionieren – du wirst diesen Befehl in [Einfache Transformationen](../03-transformationen/01-einfache-transformationen) genauer kennenlernen.

:::alert{info}
Es gibt in OpenSCAD auch einen `polyhedron`-Befehl für beliebige Vielflächner. Dieser ist für Fortgeschrittene und wird in diesem Kurs nicht behandelt.
:::

## Kugel

Eine Kugel kann entweder durch ihren Durchmesser oder durch ihren Radius definiert werden.

:::openscad{height="400px"}

```scad
translate([-50,0,0]) sphere(d=100); // Durchmesser
translate([50, 0, 0]) sphere(r=50);  // Radius
```
:::

::::snippet{#aufgabe}
Verändere den Quelltext, sodass die Kugeln unterschiedlich groß sind.

:::openscad{height="400px"}

```scad
translate([-50,0,0]) sphere(d=100); // Durchmesser
translate([50, 0, 0]) sphere(r=50);  // Radius
```
:::

::::

## Auflösung der Kugel

Standardmäßig sieht eine Kugel in OpenSCAD kantig aus. Das liegt daran, dass sie aus vielen kleinen Dreiecken besteht, die zusammen die Oberfläche bilden. Je mehr Dreiecke, desto runder sieht die Kugel aus. Du kannst die Anzahl der Dreiecke mit dem globalen Parameter `$fn` erhöhen:

:::openscad{height="400px"}

```scad
$fn=8;
translate([0, 0, 0]) sphere(d=100);
```
:::

::::snippet{#aufgabe}
Experimentiere mit verschiedenen Werten für `$fn` und beobachte, wie sich die Kugel verändert.

:::openscad{height="400px"}

```scad
$fn=8;
translate([0, 0, 0]) sphere(d=100);
```
:::

::::

## Würfel

Würfel in OpenSCAD sind rechteckige Quader, die durch ihre Länge, Breite und Höhe definiert werden. Der Befehl zum Erstellen eines Würfels ist `cube`. Die Syntax sieht so aus:

```scad
cube([Länge, Breite, Höhe]);
```

Oder, wenn es wirklich ein Würfel sein soll, kannst du auch nur eine Zahl angeben, die für alle drei Dimensionen gilt:

```scad
cube(Seitenlänge);
```

:::openscad{height="400px"}

```scad
translate([-60,0,0]) cube([100, 50, 25]); // Länge, Breite, Höhe
translate([50, 0, 0]) cube(50);          // Seitenlänge
```
:::

::::snippet{#aufgabe}
Füge einen weiteren Würfel hinzu, der eine andere Größe und Position hat.

:::openscad{height="400px"}

```scad
translate([-60,0,0]) cube([100, 50, 25]); // Länge, Breite, Höhe
translate([50, 0, 0]) cube(50);          // Seitenlänge
```
:::

::::


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

:::openscad{height="400px"}

```scad
translate([-50, 0, 0]) cylinder(h=100, d=50);
translate([50, 0, 0]) cylinder(h=100, d1=50, d2=20);
```
:::

::::snippet{#aufgabe}
Verändere die Höhe und die Durchmesser der Zylinder, um verschiedene Formen zu erstellen.

:::openscad{height="400px"}

```scad
translate([-50, 0, 0]) cylinder(h=100, d=50);
translate([50, 0, 0]) cylinder(h=100, d1=50, d2=20);
```
:::

::::

:::alert{info}
Du hast gesehen, dass wir manchmal den Radius und manchmal den Durchmesser angeben. Das liegt daran, dass es in OpenSCAD für einige Formen beide Möglichkeiten gibt. Es ist wichtig, die Dokumentation zu lesen, um zu wissen, welche Parameter du verwenden musst.

https://openscad.org/cheatsheet/
:::

---

## Selbsttest

::::multievent

**1. Mit welchem Befehl erzeugst du eine Kugel mit Radius 10?**

{r1{cube(10);}}

{r1{!sphere(r=10);}}

{r1{cylinder(r=10);}}

{r1{ball(r=10);}}

{h{Der englische Name der Kugel.}}
{H{Richtig – wahlweise auch mit d gleich 20 für den Durchmesser.}}

**2. Welcher Parameter gibt die Höhe eines Zylinders an?**

{r2{!h}}

{r2{d}}

{r2{r}}

{r2{z}}

{h{Er steht für das englische Wort height.}}
{H{Richtig. r und d beschreiben den Querschnitt.}}

**3. Was bewirkt center gleich true bei einem Würfel?**

{r3{Der Würfel wird unsichtbar.}}

{r3{!Der Würfel liegt mit seinem Mittelpunkt im Ursprung statt mit einer Ecke.}}

{r3{Der Würfel wird kleiner.}}

{r3{Der Würfel bekommt abgerundete Kanten.}}

{h{Voreingestellt liegt eine Ecke im Nullpunkt – was ändert sich daran?}}
{H{Richtig. Bei einer Kugel ist das ohnehin immer so, dort gibt es den Parameter gar nicht.}}

**4. Wie machst du eine Kugel in der Vorschau runder?**

{r4{den Radius erhöhen}}

{r4{den Durchmesser erhöhen}}

{r4{!die Zahl der Flächen mit der Variablen fn erhöhen}}

{r4{center auf true setzen}}

{h{Eine Kugel besteht in Wahrheit aus vielen ebenen Flächen.}}
{H{Richtig. Zu hohe Werte machen die Vorschau allerdings spürbar langsam.}}

**5. Ein Zylinder bekommt r1 gleich 20 und r2 gleich 0. Was entsteht?**

{r5{ein Zylinder}}

{r5{!ein Kegel mit Spitze}}

{r5{eine Kugel}}

{r5{nichts}}

{h{Wenn der obere Radius null ist, läuft der Körper oben zusammen.}}
{H{Richtig.}}

::::
