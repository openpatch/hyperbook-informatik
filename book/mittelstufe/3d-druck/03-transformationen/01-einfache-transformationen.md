---
title: Einfache Transformationen
index: 1
permaid: openscad-einfache-transformationen
---

# Einfache Transformationen

Bis jetzt hast du gelernt, wie man 3D-Körper erstellt. In diesem Kapitel lernst du, wie du diese Körper im Raum bewegen, drehen und skalieren kannst. Diese Operationen nennt man **Transformationen**.

Du wirst die Befehle `translate`, `rotate` und `scale` kennenlernen.

## Verschieben

Mit dem Befehl `translate` kannst du Objekte verschieben. Er nimmt einen Vektor als Argument, der die Verschiebung in den drei Raumrichtungen (x, y, z) angibt:

```scad
translate([x, y, z]) Anweisung;

// Zum Beispiel:
translate([10, 20, 30]) Anweisung;
```

Wenn du mehrere Objekte gemeinsam verschieben möchtest, kannst du sie in geschweifte Klammern einschließen:

```scad
translate([10, 20, 30]) {
    Anweisung1;
    Anweisung2;
}
```

:::openscad{height="600px"}
```scad
translate([0, 0, 0])  cube([10, 20, 30]);
translate([40, 0, 0]) cube([10, 20, 30]);
```
:::

::::snippet{#aufgabe}
Verschiebe den zweiten Würfel so, dass beide Würfel sich berühren, aber nicht überlappen.

:::openscad{height="400px"}

```scad
translate([0, 0, 0])  cube([10, 20, 30]);
translate([40, 0, 0]) cube([10, 20, 30]);
```
:::

::::

## Drehen

Mit dem Befehl `rotate` kannst du Objekte um die drei Raumachsen drehen. Er nimmt einen Vektor als Argument, der die Drehung in Grad angibt. Die Syntax sieht so aus:

```scad
rotate([x,y,z]) Anweisung;
// Zum Beispiel:
rotate([0, 0, 45]) Anweisung; // Dreht das Objekt um 45 Grad um die Z-Achse
```

::::snippet{#aufgabe}
Experimentiere mit dem `rotate`-Befehl, um verschiedene Drehungen an deinen Modellen auszuprobieren. Versuche zum Beispiel, ein Objekt um die X-Achse oder um die Y-Achse zu drehen.

:::openscad{height="600px"}
```scad
rotate([0, 0, 45]) cube([10, 20, 30]);
```
:::

::::

## Skalieren

Mit dem Befehl `scale` kannst du Objekte in den drei Raumrichtungen skalieren. Er nimmt einen Vektor als Argument, der die Skalierung angibt. Die Syntax sieht so aus:

```scad
scale([x,y,z]) Anweisung;
// Zum Beispiel:
scale([2, 1, 1]) Anweisung; // Verdoppelt die Größe des Objekts in X-Richtung
```

::::snippet{#aufgabe}
Experimentiere mit dem `scale`-Befehl, um verschiedene Skalierungen an deinen Modellen auszuprobieren. Versuche zum Beispiel, ein Objekt in einer Richtung zu skalieren und in einer anderen Richtung zu verkleinern.

:::openscad{height="600px"}
```scad
scale([2, 1, 1]) cube([10, 20, 30]);
```
:::

::::

## Kombinieren von Transformationen

Du kannst mehrere Transformationen kombinieren, indem du sie hintereinander schreibst.

:::alert{warn}
**Achtung – Lesereihenfolge vs. Ausführungsreihenfolge!**

OpenSCAD wendet Transformationen von **innen nach außen** an – also von rechts nach links. In dieser Zeile:

```scad
translate([10, 0, 0]) rotate([0, 0, 45]) cube(10);
```

wird der Würfel **zuerst gedreht**, dann **verschoben** – obwohl `translate` im Code zuerst steht.

Eine gute Eselsbrücke: Lies den Code von rechts nach links (oder von unten nach oben, wenn jeder Befehl auf einer eigenen Zeile steht).
:::

::::snippet{#aufgabe}
Beobachte, wie sich die Reihenfolge der Transformationen auf das Ergebnis auswirkt. Der gelbe und der rote Würfel verwenden dieselben Transformationen in unterschiedlicher Reihenfolge.

:::openscad{height="600px"}
```scad
color("yellow")
translate([40, 0, 0]) 
rotate([0, 0, 45]) 
cube([10, 20, 30]);

color("red")
rotate([0, 0, 45])
translate([40, 0, 0]) 
cube([10, 20, 30]);
```
:::

::::

---

## Selbsttest

::::multievent

**1. Mit welchem Befehl verschiebst du ein Objekt?**

{r1{rotate}}

{r1{!translate}}

{r1{scale}}

{r1{move}}

{h{Das englische Wort für verschieben.}}
{H{Richtig.}}

**2. In welcher Einheit gibt man Drehungen an?**

{r2{Radiant}}

{r2{Prozent}}

{r2{!Grad}}

{r2{Umdrehungen}}

{h{Eine Vierteldrehung sind 90 davon.}}
{H{Richtig – anders als in vielen Programmiersprachen, die mit Radiant rechnen.}}

**3. Zuerst steht ein translate, dahinter ein rotate, dahinter der Körper. Was geschieht zuerst?**

{r3{das Verschieben}}

{r3{!das Drehen}}

{r3{beides gleichzeitig}}

{r3{das lässt sich nicht sagen}}

{h{Lies von rechts nach links: Die Transformation, die dem Körper am nächsten steht, wirkt zuerst.}}
{H{Richtig. Deshalb ergibt eine vertauschte Reihenfolge ein anderes Ergebnis.}}

**4. Womit machst du ein Objekt in x-Richtung doppelt so breit?**

{r4{translate mit dem Wert 2}}

{r4{!scale mit den Werten 2, 1 und 1}}

{r4{rotate mit dem Wert 2}}

{r4{cube mit doppelter Kantenlänge}}

{h{Der Befehl heißt übersetzt skalieren, und die drei Zahlen stehen für die drei Achsen.}}
{H{Richtig. Die 1 bedeutet unverändert.}}

**5. Warum ist die Reihenfolge von Drehen und Verschieben wichtig?**

{r5{Sie ist nicht wichtig.}}

{r5{!Weil sich beim Drehen auch die Achsen des Objekts mitdrehen und ein anschließendes Verschieben deshalb woandershin führt.}}

{r5{Weil rotate nur einmal vorkommen darf.}}

{r5{Weil translate immer zuletzt stehen muss.}}

{h{Probier beide Reihenfolgen aus und vergleiche.}}
{H{Richtig – das ist einer der häufigsten Stolpersteine.}}

::::
