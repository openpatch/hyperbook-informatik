---
title: Rückblick
index: 4
---

# Rückblick

Wer weiß, wo ein Körper steht und woraus er besteht, kann jede Form beschreiben. Prüfe, ob beides sitzt – im nächsten Kapitel kommt das Verrechnen dazu.

## Das kann ich jetzt

- [ ] Ich kann die drei Achsen benennen und sagen, wo der Ursprung liegt. ([2.1](./01-koordinatensystem))
- [ ] Ich kann vorhersagen, wo ein Körper ohne `translate` steht. ([2.1](./01-koordinatensystem))
- [ ] Ich kann Würfel, Kugel und Zylinder mit allen Parametern erzeugen. ([2.2](./02-3d-koerper))
- [ ] Ich kann mit `center` und mit `$fn` umgehen. ([2.2](./02-3d-koerper))
- [ ] Ich kann aus Grundkörpern ein erkennbares Objekt zusammensetzen. ([2.3](./03-uebungen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Wo steht was?**

```scad
cube([20, 20, 20]);
translate([30, 0, 0]) cube([20, 20, 20], center=true);
translate([0, 30, 10]) sphere(r=10);
translate([60, 0, 0]) cylinder(h=20, r=5);
```

Beantworte **ohne** auszuführen:

a) Welche Ecke des ersten Würfels liegt im Ursprung? In welche Richtungen wächst er?

b) Der zweite Würfel hat `center=true`. Von wo bis wo reicht er in x-Richtung?

c) Die Kugel ist um 10 nach oben verschoben. Berührt sie die Grundebene, ragt sie darunter oder schwebt sie?

d) Wo liegt die Grundfläche des Zylinders, und wo seine Deckfläche?

e) Prüfe deine Antworten im Modellierbereich.
:::

::::collapsible{title="Tipp"}

Merke dir die Regel für den Standardfall: **Würfel und Zylinder** beginnen im Ursprung und wachsen in die **positive** Richtung. Eine **Kugel** liegt mit ihrem **Mittelpunkt** im Ursprung.

::::

:::openscad{height="500px"}

```scad
cube([20, 20, 20]);
translate([30, 0, 0]) cube([20, 20, 20], center=true);
translate([0, 30, 10]) sphere(r=10);
translate([60, 0, 0]) cylinder(h=20, r=5);
```

:::

:::protect{password="druck-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die **vordere linke untere** Ecke liegt im Ursprung. Der Würfel wächst nach +x, +y und +z, liegt also vollständig im ersten Achtel des Raums.

b) Mit `center=true` liegt der **Mittelpunkt** im Nullpunkt des verschobenen Systems. Der Würfel reicht deshalb von x = 20 bis x = 40 – die Verschiebung um 30 trifft seine Mitte.

c) Sie **berührt** die Grundebene genau in einem Punkt: Der Mittelpunkt liegt auf Höhe 10, der Radius beträgt 10. Wäre die Verschiebung kleiner, ragte sie darunter.

d) Die Grundfläche liegt bei z = 0, die Deckfläche bei z = 20. Ein Zylinder wächst wie der Würfel nach oben.

**Die Regel dahinter:** Bei Würfel und Zylinder ist der Bezugspunkt eine **Ecke** beziehungsweise der Mittelpunkt der **Grundfläche**, bei der Kugel der **Mittelpunkt**. Wer das verwechselt, wundert sich über Objekte, die halb im Boden stecken.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Turm mit Aussichtsplattform**

Bau einen Fernsehturm aus drei Teilen:

a) ein Sockel: flacher Zylinder, Durchmesser 25, Höhe 3

b) ein Schaft: schlanker Zylinder, Radius 4, Höhe 60

c) zwei Plattformen: Zylinder mit Radius 12 und 8, auf halber und auf vier Fünftel Höhe

d) Setz die Höhe des Turms **oben in eine Variable** und leite die Plattformhöhen daraus ab.

e) Ändere danach die Turmhöhe auf 100. Wie viele Zeilen musst du anfassen?
:::

::::collapsible{title="Tipp: Variablen"}

```scad
turm_hoehe = 60;

cylinder(h=turm_hoehe, r=4);
translate([0, 0, turm_hoehe * 0.5]) cylinder(h=6, r=12);
```

`turm_hoehe * 0.5` ist die halbe Höhe. Ändert sich die Variable, wandert die Plattform von selbst mit.

::::

:::openscad{height="500px"}

```scad
turm_hoehe = 60;

// Dein Turm:

```

:::

:::protect{password="druck-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```scad
turm_hoehe = 60;
sockel_d = 25;

cylinder(h=3, r=sockel_d / 2, $fn=48);
cylinder(h=turm_hoehe, r=4, $fn=32);
translate([0, 0, turm_hoehe * 0.5]) cylinder(h=6, r=12, $fn=48);
translate([0, 0, turm_hoehe * 0.8]) cylinder(h=6, r=8, $fn=48);
```

e) **Eine** – die Zeile mit `turm_hoehe`. Beide Plattformen sind aus der Variablen berechnet und wandern mit. Hätte man 30 und 48 als feste Zahlen eingetragen, wären es drei Zeilen, und beim nächsten Mal vergisst man eine davon.

Genau darum geht es im [nächsten Kapitel über Parameter](../04-parameter-und-wiederholung): Ein Modell, das man an **einer** Stelle ändern kann, ist ein anderes Werkzeug als eines, das man neu bauen muss.

:::

---

## Selbsttest

::::multievent

**1. Wo liegt der Bezugspunkt eines Zylinders ohne center?**

{r1{im Mittelpunkt des Zylinders}}

{r1{!im Mittelpunkt seiner Grundfläche}}

{r1{an einer Ecke}}

{r1{an der Deckfläche}}

{h{Er wächst von dort nach oben.}}
{H{Richtig.}}

**2. Eine Kugel mit Radius 10 wird um 10 nach oben verschoben. Wie steht sie zur Grundebene?**

{r2{Sie ragt zur Hälfte hindurch.}}

{r2{!Sie berührt sie in einem Punkt.}}

{r2{Sie schwebt zehn Einheiten darüber.}}

{r2{Sie liegt vollständig darunter.}}

{h{Mittelpunkt auf Höhe 10, Radius 10 – wo ist der tiefste Punkt?}}
{H{Richtig.}}

**3. Wie viele Flächen hat eine Kugel in OpenSCAD?**

{r3{unendlich viele, sie ist wirklich rund}}

{r3{!endlich viele – wie viele, legt die Auflösung fest}}

{r3{immer genau 100}}

{r3{sechs}}

{h{Deshalb sieht sie bei kleiner Auflösung eckig aus.}}
{H{Richtig. Auch der Drucker kann nur ebene Flächen erzeugen.}}

**4. Ein Würfel soll mit seinem Mittelpunkt im Ursprung liegen. Was brauchst du?**

{r4{ein translate um die halbe Kantenlänge}}

{r4{!den Parameter center gleich true}}

{r4{einen negativen Radius}}

{r4{beides ist unmöglich}}

{h{Es geht auch mit translate – aber es gibt einen kürzeren Weg.}}
{H{Richtig. Mit translate ginge es ebenfalls, nur müsste man dann bei jeder Größenänderung nachrechnen.}}

**5. Warum sollte man ein Grundmaß in eine Variable schreiben?**

{r5{Weil OpenSCAD es verlangt.}}

{r5{!Weil sich abgeleitete Maße daraus berechnen lassen und beim Ändern alles mitwächst.}}

{r5{Weil das Modell dadurch schneller rendert.}}

{r5{Das sollte man nicht.}}

{h{Was passiert beim Ändern der Turmhöhe, wenn die Plattformhöhen fest eingetragen sind?}}
{H{Richtig.}}

::::
