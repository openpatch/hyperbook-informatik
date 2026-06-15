---
title: Summen von Objekten
index: 9
---

# Kombination von Objekten

Objekte können auf verschiedene Arten miteinander kombiniert werden. 

## Summme

Die einfachste Möglichkeit, Objekte zu kombinieren, ist die Summe. Dabei werden die Volumen der Objekte einfach addiert. In OpenSCAD kannst du dies erreichen, indem du die Anweisungen für die Objekte einfach hintereinander schreibst:

```scad
Anweisung1;
Anweisung2;
```

Oder mit dem union-Operator:

```scad
union() {
    Anweisung1;
    Anweisung2;
}
```

## Schnittmenge

Die Schnittmenge von Objekten ist die Menge der Punkte, die in allen Objekten enthalten sind. In OpenSCAD kannst du dies mit dem intersection-Operator erreichen:

```scad
intersection() {
    Anweisung1;
    Anweisung2;
}
```

## Differenz

Die Differenz von Objekten ist die Menge der Punkte, die in einem Objekt enthalten sind, aber nicht in einem anderen. In OpenSCAD kannst du dies mit dem difference-Operator erreichen:

```scad
difference() {
    Anweisung1; // Das Objekt, von dem etwas abgezogen werden soll
    Anweisung2; // Das Objekt, das abgezogen werden soll
}
```

## Beispiele betrachten

Hier siehst du ein Beispiel wie zwei Objekte auf verschiedene Arten kombiniert werden können.


:::snippet{#aufgabe}
Verändere die Reihenfolge der Anweisungen in den Blöcken `union`, `intersection` und `difference` und beobachte, wie sich das Ergebnis verändert.
:::

:::openscad{height="600px"}
```scad
translate([-100, 0, 0])
union() {
    cube(60,center=true);
    sphere(40);
}

translate([0, 0, 0])
intersection() {
    cube(60,center=true);
    sphere(40);
}

translate([100, 0, 0])
difference() {
    cube(60,center=true);
    sphere(40);
}
```