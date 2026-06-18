---
title: Einfache Transformationen
index: 8
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

:::snippet{#aufgabe}
Verschiebe den zweiten Würfel so, dass beide Würfel sich berühren, aber nicht überlappen.
:::

## Drehen

Mit dem Befehl `rotate` kannst du Objekte um die drei Raumachsen drehen. Er nimmt einen Vektor als Argument, der die Drehung in Grad angibt. Die Syntax sieht so aus:

```scad
rotate([x,y,z]) Anweisung;
// Zum Beispiel:
rotate([0, 0, 45]) Anweisung; // Dreht das Objekt um 45 Grad um die Z-Achse
```

:::snippet{#aufgabe}
Experimentiere mit dem `rotate`-Befehl, um verschiedene Drehungen an deinen Modellen auszuprobieren. Versuche zum Beispiel, ein Objekt um die X-Achse oder um die Y-Achse zu drehen.
:::

:::openscad{height="600px"}
```scad
rotate([0, 0, 45]) cube([10, 20, 30]);
```
:::

## Skalieren

Mit dem Befehl `scale` kannst du Objekte in den drei Raumrichtungen skalieren. Er nimmt einen Vektor als Argument, der die Skalierung angibt. Die Syntax sieht so aus:

```scad
scale([x,y,z]) Anweisung;
// Zum Beispiel:
scale([2, 1, 1]) Anweisung; // Verdoppelt die Größe des Objekts in X-Richtung
```

:::snippet{#aufgabe}
Experimentiere mit dem `scale`-Befehl, um verschiedene Skalierungen an deinen Modellen auszuprobieren. Versuche zum Beispiel, ein Objekt in einer Richtung zu skalieren und in einer anderen Richtung zu verkleinern.
:::

:::openscad{height="600px"}
```scad
scale([2, 1, 1]) cube([10, 20, 30]);
```
:::

## Kombinieren von Transformationen

Du kannst mehrere Transformationen kombinieren, indem du sie hintereinander schreibst. Die Reihenfolge der Transformationen ist wichtig, da sie das Ergebnis beeinflusst.

```scad
translate([10, 0, 0]) rotate([0, 0, 45]) scale([2, 1, 1]) Anweisung;
```

In diesem Beispiel wird das Objekt zuerst skaliert, dann gedreht und schließlich verschoben. Wenn du die Reihenfolge der Transformationen änderst, erhältst du ein anderes Ergebnis.

:::snippet{#aufgabe}
Beobachte, wie sich die Reihenfolge der Transformationen auf das Ergebnis auswirkt. Probiere verschiedene Kombinationen von `translate`, `rotate` und `scale` aus und beobachte die Unterschiede.
:::

:::openscad{height="600px"}
```scad
color("yellow")
translate([10, 0, 0]) 
rotate([10, 0, 45]) 
scale([2, 1, 1]) 
cube([10, 20, 30]);

color("red")
translate([10, 0, 0]) 
scale([2, 1, 1]) 
rotate([10, 0, 45]) 
cube([10, 20, 30]);

color("green")
scale([2, 1, 1]) 
rotate([10, 0, 45]) 
translate([10, 0, 0]) 
cube([10, 20, 30]);
```
:::