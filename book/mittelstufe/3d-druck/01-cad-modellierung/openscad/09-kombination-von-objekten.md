---
title: Kombination von Objekten
index: 9
---

# Kombination von Objekten

Objekte können auf verschiedene Arten miteinander kombiniert werden. 

## Summe (union)

Die einfachste Möglichkeit, Objekte zu kombinieren, ist die Summe. Dabei werden die Volumen der Objekte einfach addiert. In OpenSCAD kannst du dies erreichen, indem du die Anweisungen einfach hintereinander schreibst – oder explizit mit `union()`:

```scad
union() {
    Anweisung1;
    Anweisung2;
}
```

:::openscad{height="400px"}
```scad
union() {
    cube(40, center=true);
    translate([20, 0, 0]) sphere(25);
}
```
:::

## Schnittmenge (intersection)

Die Schnittmenge ergibt nur den Teil, der in **allen** Objekten gleichzeitig enthalten ist:

```scad
intersection() {
    Anweisung1;
    Anweisung2;
}
```

:::openscad{height="400px"}
```scad
intersection() {
    cube(60, center=true);
    sphere(40);
}
```
:::

## Differenz (difference)

Die Differenz schneidet das zweite Objekt aus dem ersten heraus. Das erste Objekt im Block bleibt erhalten, alle weiteren werden abgezogen:

```scad
difference() {
    Anweisung1; // Das Objekt, von dem etwas abgezogen werden soll
    Anweisung2; // Das Objekt, das abgezogen werden soll
}
```

:::openscad{height="400px"}
```scad
difference() {
    cube(60, center=true);
    sphere(40);
}
```
:::

:::alert{warn}
Bei `difference()` ist die **Reihenfolge** entscheidend: Das erste Objekt ist das Ausgangsobjekt, alle weiteren werden davon abgezogen. Tauschst du die Reihenfolge, erhältst du ein völlig anderes Ergebnis.
:::

## Vergleich aller drei Operationen

:::snippet{#aufgabe}
Verändere die Reihenfolge der Anweisungen im `difference`-Block und beobachte, wie sich das Ergebnis verändert.
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
:::

## Wissensüberprüfung

:::multievent
Welche Operation ergibt nur den Teil, der in **beiden** Objekten gleichzeitig enthalten ist?

{r1{union}} {r1{difference}} {r1{!intersection}}
:::

:::multievent
Du möchtest ein Loch in einen Würfel bohren. Welche Operation verwendest du?

{r2{union}} {r2{!difference}} {r2{intersection}}
:::

:::multievent
Bei `difference()` – welches Objekt bleibt erhalten?

{r3{Das letzte im Block.}} {r3{!Das erste im Block.}} {r3{Keines – beide werden entfernt.}} {r3{Das größere der beiden.}}
:::

:::multievent
Was ist der Unterschied zwischen Anweisungen einfach hintereinander schreiben und `union()` verwenden?

{r4{!Es gibt keinen Unterschied – beide addieren die Objekte.}} {r4{union() ist schneller.}} {r4{Ohne union() überlappen sich Objekte nicht.}}
:::
