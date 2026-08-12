---
title: Kombination von Objekten
index: 2
permaid: openscad-kombination-objekte
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

::::snippet{#aufgabe}
Verändere die Reihenfolge der Anweisungen im `difference`-Block und beobachte, wie sich das Ergebnis verändert.

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

::::

:::snippet{#merken}
**Abziehende Körper immer etwas größer machen, als nötig wäre.**

Ein Zylinder, der genauso hoch ist wie der Würfel, aus dem er ein Loch bohren soll, liegt oben und unten **flächengleich** auf. Dann ist nicht entschieden, ob diese Fläche noch zum Werkstück gehört oder schon zum Loch – und das Loch ist in der Vorschau gar nicht zu sehen.

```scad
// so nicht - das Loch bleibt unsichtbar
difference() {
  cube([20, 20, 10]);
  translate([10, 10, 0]) cylinder(h=10, r=3);
}

// so ist es richtig: unten 1 mm tiefer, oben 1 mm laenger
difference() {
  cube([20, 20, 10]);
  translate([10, 10, -1]) cylinder(h=12, r=3);
}
```
:::

---

## Selbsttest

::::multievent

**1. Welche Operation liefert nur den Teil, der in beiden Objekten gleichzeitig liegt?**

{r1{union}}

{r1{difference}}

{r1{!intersection}}

{r1{translate}}

{h{Der deutsche Fachbegriff ist Schnittmenge.}}
{H{Richtig.}}

**2. Du willst ein Loch in einen Würfel bohren. Welche Operation nimmst du?**

{r2{union}}

{r2{!difference}}

{r2{intersection}}

{r2{scale}}

{h{Etwas wird abgezogen.}}
{H{Richtig – der Zylinder, der das Loch bildet, muss den Würfel dabei vollständig durchdringen.}}

**3. Welches Objekt bleibt bei difference erhalten?**

{r3{das letzte im Block}}

{r3{!das erste im Block}}

{r3{keines}}

{r3{das größere}}

{h{Alles Weitere wird davon abgezogen.}}
{H{Richtig. Deshalb ändert eine vertauschte Reihenfolge das Ergebnis vollständig.}}

**4. Zwei Körper stehen einfach hintereinander im Quelltext, ohne union. Was ist der Unterschied zu union?**

{r4{!Im Ergebnis keiner – beide Formen werden vereinigt.}}

{r4{Ohne union wird nur der erste Körper gezeichnet.}}

{r4{Ohne union entsteht ein Fehler.}}

{r4{Ohne union werden die Körper voneinander abgezogen.}}

{h{Probier es aus: Lass das union weg und vergleiche die Vorschau.}}
{H{Richtig. union schreibt man trotzdem hin, wenn man das Ergebnis anschließend weiterverarbeiten will.}}

**5. Ein gebohrtes Loch ist in der Vorschau überhaupt nicht zu sehen. Woran liegt es meistens?**

{r5{an einer zu kleinen Auflösung}}

{r5{!Der abziehende Zylinder ist genauso hoch wie das Werkstück und schließt oben und unten bündig ab.}}

{r5{difference funktioniert nur bei Würfeln.}}

{r5{an einer fehlenden Farbe}}

{h{Was soll OpenSCAD zeichnen, wenn zwei Flächen exakt aufeinanderliegen – gehört der Punkt zum Werkstück oder zum Loch?}}
{H{Richtig. Deshalb macht man abziehende Körper immer etwas länger als nötig und verschiebt sie ein wenig nach unten.}}

::::
