---
title: Rückblick
index: 6
---

# Rückblick

Fremden Code zu benutzen ist keine Abkürzung, sondern eine eigene Fertigkeit: Man muss finden, lesen, einbinden und verstehen, was man da eigentlich aufruft. Genau das übst du hier – und es gilt weit über OpenSCAD hinaus.

## Das kann ich jetzt

- [ ] Ich kann eine Bibliothek einbinden. ([6.1](./01-externe-bibliotheken))
- [ ] Ich kann abgerundete Körper erzeugen, ohne sie selbst zu konstruieren. ([6.2](./02-abgerundete-formen))
- [ ] Ich kann Objekte über **Anker** aneinandersetzen statt über ausgerechnete Koordinaten. ([6.3](./03-positionierung))
- [ ] Ich kann Aussparungen mit `diff()` übersichtlich anlegen. ([6.4](./04-loecher-mit-diff))
- [ ] Ich kann aus mehreren Profilen einen Körper aufspannen. ([6.5](./05-formen-aus-profilen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Mit oder ohne Bibliothek?**

Für jede Aufgabe: Würdest du sie mit Bordmitteln lösen oder mit BOSL2? Begründe.

a) Ein einfacher Würfel mit einem Loch in der Mitte.

b) Ein Gehäuse mit an allen Kanten abgerundeten Ecken.

c) Zwei Körper sollen bündig aneinandergesetzt werden, und ihre Maße stehen in Variablen.

d) Ein Trichter, der unten rund und oben viereckig ist.

e) Nenne einen Nachteil, den das Einbinden einer Bibliothek mit sich bringt.
:::

:::protect{password="druck-6-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Bordmittel.** `difference` mit einem Zylinder genügt; eine Bibliothek dafür einzubinden wäre Aufwand ohne Gewinn.

b) **Bibliothek.** Abrundungen von Hand zu konstruieren – etwa über `minkowski` – ist mühsam und macht die Vorschau langsam. Mit einem Rundungsparameter ist es eine Angabe.

c) **Bibliothek.** Genau dafür sind Anker gedacht: Ändern sich die Maße, stimmt die Position weiterhin. Mit ausgerechneten Koordinaten müsste man jedes Mal nachrechnen.

d) **Bibliothek.** Zwei verschiedene Profile übereinander verbindet `skin`; von Hand müsste man die Seitenflächen einzeln als Polyeder beschreiben.

e) Zum Beispiel: Man ist auf fremden Code angewiesen und muss dessen Dokumentation lesen; das Modell lässt sich nur weitergeben, wenn die Bibliothek beim Gegenüber ebenfalls vorhanden ist; und die Vorschau wird oft spürbar langsamer, weil eine Bibliothek viel mehr mitbringt, als man benutzt.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Dieselbe Form, zwei Wege**

Ein Gehäusedeckel: 50 mal 30 mal 5 Millimeter, alle senkrechten Kanten mit 4 Millimetern Radius abgerundet, darin vier Schraubenlöcher mit 3 Millimetern Durchmesser in den Ecken.

a) Schreib die Fassung **mit** BOSL2.

b) Beschreib in Worten, wie du dieselbe Form **ohne** Bibliothek bauen würdest. Du musst sie nicht ausprogrammieren.

c) Vergleiche beide Wege nach Länge, Lesbarkeit und Änderbarkeit.

d) Setz die vier Löcher mit einer **Schleife** statt einzeln.
:::

::::collapsible{title="Tipp: Die vier Ecken"}

Die vier Positionen unterscheiden sich nur im Vorzeichen. Mit zwei geschachtelten Schleifen über die Werte −1 und 1 lassen sie sich in einer Zeile erzeugen:

```scad
for (sx = [-1, 1])
  for (sy = [-1, 1])
    translate([sx * abstand_x, sy * abstand_y, 0]) ...
```

::::

:::protect{password="druck-6-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```scad
include <BOSL2/std.scad>

laenge = 50;
breite = 30;
dicke = 5;
rand = 5;

diff()
  cuboid([laenge, breite, dicke], rounding=4, edges="Z")
    tag("remove")
      for (sx = [-1, 1])
        for (sy = [-1, 1])
          translate([sx * (laenge/2 - rand), sy * (breite/2 - rand), 0])
            cyl(h=dicke + 2, d=3, $fn=32);
```

b) Ohne Bibliothek: Die abgerundete Grundform entsteht als `hull()` über vier Zylinder mit Radius 4, die an den Eckpositionen stehen – oder über `minkowski()` mit einem kleineren Quader und einem Zylinder. Die Löcher zieht man anschließend mit `difference()` ab.

c) Die BOSL2-Fassung ist **kürzer** und sagt durch die Namen, was gemeint ist (`rounding`, `remove`). Die Fassung mit `hull` ist **abhängigkeitsfrei** und läuft überall, verlangt aber, dass man die Eckpositionen selbst ausrechnet – und bei einer Änderung der Maße erneut. Änderbar sind beide, solange die Maße in Variablen stehen.

d) Die Schleife steckt schon in a): Zwei geschachtelte Schleifen über die Vorzeichen erzeugen alle vier Ecken. Der Vorteil zeigt sich beim Ändern des Randabstands – man ändert eine Zahl statt vier Zeilen.

:::

---

## Selbsttest

::::multievent

**1. Wozu dient eine Bibliothek?**

{r1{Sie speichert fertige Modelle.}}

{r1{!Sie stellt fertige Bausteine bereit, die man im eigenen Modell aufruft.}}

{r1{Sie ersetzt den Slicer.}}

{r1{Sie beschleunigt den Druck.}}

{h{Es geht um Code, nicht um fertige Objekte.}}
{H{Richtig.}}

**2. Was ist der Vorteil von Ankern gegenüber ausgerechneten Koordinaten?**

{r2{Sie sind kürzer zu tippen.}}

{r2{!Bei geänderten Maßen stimmt die Position weiterhin, ohne dass man nachrechnet.}}

{r2{Sie funktionieren ohne Bibliothek.}}

{r2{Sie sind genauer.}}

{h{Derselbe Gedanke wie bei Parametern statt fester Zahlen.}}
{H{Richtig.}}

**3. Worin unterscheidet sich diff von difference?**

{r3{im Ergebnis}}

{r3{!in der Schreibweise: Das abzuziehende Objekt wird an Ort und Stelle markiert}}

{r3{diff funktioniert nur mit Zylindern}}

{r3{es gibt keinen Unterschied}}

{h{Denk an ein Modell mit vielen Bohrungen an verschiedenen Stellen.}}
{H{Richtig.}}

**4. Was verlangt skin von den Profilen?**

{r4{dass sie gleich groß sind}}

{r4{!dass sie dieselbe Zahl von Punkten haben}}

{r4{dass sie Kreise sind}}

{r4{dass sie in einer Ebene liegen}}

{h{Die Oberfläche verbindet Punkt für Punkt.}}
{H{Richtig.}}

**5. Welche Nachteile bringt eine Bibliothek mit? Wähle alle zutreffenden aus.**

{c1{!Man muss ihre Dokumentation lesen.}}

{c1{!Wer das Modell weitergibt, muss auch die Bibliothek weitergeben.}}

{c1{!Die Vorschau wird oft langsamer.}}

{c1{Das gedruckte Teil wird schwächer.}}

{h{Drei Punkte betreffen die Arbeit am Modell, einer das gedruckte Teil – und darauf hat die Bibliothek keinen Einfluss.}}
{H{Richtig.}}

::::
