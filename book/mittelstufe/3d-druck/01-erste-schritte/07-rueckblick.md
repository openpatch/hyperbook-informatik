---
title: Rückblick
index: 7
---

# Rückblick

Sechs Lektionen, und du kannst bereits einen Körper beschreiben, statt ihn zu zeichnen. Prüfe zum Abschluss, ob die Grundlagen sitzen – alles Weitere baut darauf auf.

## Das kann ich jetzt

- [ ] Ich kann erklären, wie ein 3D-Drucker ein Objekt aufbaut. ([1.1](./01-was-ist-3d-druck))
- [ ] Ich kann den Unterschied zwischen grafischer und textbasierter Modellierung erklären. ([1.2](./02-was-ist-cad))
- [ ] Ich kann Würfel, Kugel und Zylinder erzeugen und ihre Maße angeben. ([1.4](./04-mehr-formen))
- [ ] Ich kann Objekte mit `translate` an eine bestimmte Stelle setzen. ([1.3](./03-dein-erstes-modell))
- [ ] Ich weiß, wozu geschweifte Klammern dienen. ([1.5](./05-formen-kombinieren))
- [ ] Ich kenne die vier Regeln: Semikolon, Klammern, Kommas, Kleinschreibung. ([1.6](./06-wie-funktioniert-das))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Fünf Fehler**

In diesem Quelltext stecken fünf Fehler. Finde sie **auf Papier**, bevor du ihn in den Modellierbereich überträgst.

```scad
Cube(30)
sphere[15];
translate(40, 0, 0) cylinder(h=20 r=5);
color(red) cube([10 10 10]);
```

a) Notiere zu jeder Zeile, was falsch ist.

b) Schreib den berichtigten Quelltext auf.

c) Bei einem der Fehler bleibt die Vorschau einfach leer, ohne dass etwas rot markiert wird. Bei welchem, und warum ist gerade das gefährlich?
:::

::::collapsible{title="Tipp: Wonach suche ich?"}

Geh die vier Regeln aus Lektion 1.6 der Reihe nach durch:

1. Endet jede Zeile mit einem Semikolon?
2. Runde Klammern für Parameter, eckige für Listen, geschweifte für Gruppen?
3. Sind die Werte in Listen durch Kommas getrennt?
4. Ist alles kleingeschrieben?

::::

:::protect{password="druck-1-7-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

1. `Cube(30)` – großes C, und das Semikolon fehlt.
2. `sphere[15];` – eckige statt runder Klammern.
3. `translate(40, 0, 0)` – die drei Werte sind eine Liste und gehören in eckige Klammern; außerdem fehlt im `cylinder` das Komma zwischen `h=20` und `r=5`.
4. `color(red)` – der Farbname ist Text und gehört in Anführungszeichen; in `cube` fehlen die Kommas.

b)

```scad
cube(30);
sphere(15);
translate([40, 0, 0]) cylinder(h=20, r=5);
color("red") cube([10, 10, 10]);
```

c) Bei `Cube` mit großem C. OpenSCAD kennt den Namen nicht, überspringt die Zeile stillschweigend und schreibt nur eine Warnung in die Konsole. Gefährlich ist das, weil man an der falschen Stelle sucht: Die Vorschau bleibt leer, und im Quelltext ist scheinbar alles in Ordnung.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Schneemann**

Bau einen Schneemann aus Grundkörpern – ohne Boolesche Operationen, die kommen erst in Kapitel 3.

a) Drei Kugeln übereinander, von unten nach oben kleiner werdend.

b) Ein Hut aus einem Zylinder obenauf.

c) Eine Nase aus einem Kegel, der zur Seite zeigt.

d) Färbe die Teile passend ein.

e) Erkläre, warum die Kugeln sich **überlappen** sollten, statt sich nur zu berühren.
:::

::::collapsible{title="Tipp 1: Übereinander"}

Alle Körper starten im Nullpunkt. Wer sie übereinander haben will, verschiebt jeden mit `translate([0, 0, hoehe])` nach oben. Bei einer Kugel liegt der **Mittelpunkt** im Nullpunkt, bei Zylinder und Würfel die **Grundfläche**.

::::

::::collapsible{title="Tipp 2: Die Nase"}

Ein Kegel ist ein Zylinder, dessen oberer Radius 0 ist: `cylinder(h=12, r1=3, r2=0);`

Damit er zur Seite zeigt, drehst du ihn mit `rotate([90, 0, 0])`.

::::

:::openscad{height="500px"}

```scad
// Dein Schneemann:

```

:::

:::protect{password="druck-1-7-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```scad
color("white") sphere(r=20, $fn=48);
color("white") translate([0, 0, 32]) sphere(r=14, $fn=48);
color("white") translate([0, 0, 55]) sphere(r=10, $fn=48);

color("black") translate([0, 0, 62]) cylinder(h=10, r=8, $fn=32);
color("orange") translate([0, -12, 55]) rotate([90, 0, 0]) cylinder(h=12, r1=3, r2=0, $fn=24);
```

Die Höhen sind so gewählt, dass die Kugeln einander **durchdringen**: Die untere hat Radius 20, die mittlere sitzt auf 32 – das ist weniger als 20 + 14 = 34.

e) Genau darum geht es: Zwei Kugeln, die sich nur berühren, haben rechnerisch genau **einen** gemeinsamen Punkt. Der Drucker kann daraus keine Verbindung bauen – die Teile fallen auseinander. Was zusammenhängen soll, muss sich überschneiden.

:::

---

## Selbsttest

::::multievent

**1. Welche Klammern gehören um eine Liste von drei Werten?**

{r1{runde}}

{r1{!eckige}}

{r1{geschweifte}}

{r1{gar keine}}

{h{Denk an die drei Zahlen in einem translate.}}
{H{Richtig.}}

**2. Wo liegt der Mittelpunkt einer Kugel, die ohne translate erzeugt wird?**

{r2{auf der Grundfläche}}

{r2{!im Ursprung}}

{r2{eine Radiuslänge über dem Ursprung}}

{r2{das ist zufällig}}

{h{Anders als beim Würfel, der mit einer Ecke im Nullpunkt steht.}}
{H{Richtig – deshalb steckt eine Kugel ohne Verschiebung zur Hälfte unter der Grundebene.}}

**3. Zwei Kugeln berühren sich in genau einem Punkt. Was folgt daraus für den Druck?**

{r3{Sie werden ein festes Teil.}}

{r3{!Sie hängen nicht zusammen und fallen auseinander.}}

{r3{Der Drucker meldet einen Fehler.}}

{r3{Nichts.}}

{h{Woraus soll der Drucker die Verbindung aufbauen?}}
{H{Richtig – was zusammengehört, muss sich überschneiden.}}

**4. Was gehört ans Ende jedes Befehls?**

{r4{ein Punkt}}

{r4{!ein Semikolon}}

{r4{ein Komma}}

{r4{nichts}}

{h{Dasselbe Zeichen wie in Java.}}
{H{Richtig.}}

**5. Welche Farbe hat das gedruckte Teil, wenn im Quelltext color mit rot steht?**

{r5{rot}}

{r5{!die Farbe des eingelegten Filaments}}

{r5{grau}}

{r5{das hängt vom Slicer ab}}

{h{Woher soll der Drucker rotes Material nehmen?}}
{H{Richtig – die Farbe im Quelltext hilft nur beim Erkennen am Bildschirm.}}

::::
