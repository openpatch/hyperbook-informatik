---
title: Rückblick
index: 4
---

# Rückblick

Farbe, Text und Bilder sind das einzige Kapitel, in dem etwas **nicht** gedruckt wird – jedenfalls die Farbe nicht. Umso wichtiger ist es, auseinanderzuhalten, was am Bildschirm hilft und was im fertigen Teil ankommt.

## Das kann ich jetzt

- [ ] Ich kann Objekte einfärben und weiß, wofür das gut ist. ([5.1](./01-farben))
- [ ] Ich kann Text in ein Modell einbauen und ihn erhaben oder vertieft anlegen. ([5.2](./02-text))
- [ ] Ich kann aus einem Graustufenbild ein Relief erzeugen. ([5.3](./03-bilder))
- [ ] Ich kann einschätzen, welche Details beim Drucken noch darstellbar sind.

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Was kommt im Druck an?**

Entscheide für jede Angabe: Ist sie im **gedruckten** Teil zu erkennen oder nur in der Vorschau?

a) `color("red")` an einem Würfel

b) ein 2 Millimeter erhaben aufgesetzter Schriftzug

c) eine Vertiefung von 0,1 Millimetern

d) eine Linie von 0,2 Millimetern Breite

e) ein Relief aus einem Graustufenbild mit 1 Millimeter Höhenunterschied

Begründe c) und d) mit der Breite der Düse.
:::

:::protect{password="druck-5-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Nur Vorschau.** Gedruckt wird in der Farbe des Filaments.

b) **Im Druck erkennbar.** 2 Millimeter sind bei einer üblichen Schichthöhe von 0,2 Millimetern zehn Schichten – deutlich sichtbar.

c) **Kaum.** 0,1 Millimeter sind weniger als eine halbe Schicht. Je nach Schichthöhe verschwindet die Vertiefung ganz.

d) **Nicht zuverlässig.** Eine übliche Düse ist 0,4 Millimeter breit; dünner kann eine Linie gar nicht werden. Der Slicer lässt solche Bereiche entweder weg oder macht sie automatisch breiter.

e) **Im Druck erkennbar**, wenn die Fläche groß genug ist. 1 Millimeter Höhenunterschied sind fünf Schichten – genug für ein flaches Relief.

**Die Faustregel:** Alles, was schmaler als die Düse oder flacher als eine Schicht ist, existiert im Druck nicht. Am Bildschirm sieht man es trotzdem – das ist die häufigste Enttäuschung beim ersten eigenen Modell.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Namensschild**

Bau ein Namensschild:

a) eine Grundplatte, 60 mal 20 mal 3 Millimeter,

b) dein Name als erhabener Text, 2 Millimeter hoch, mittig auf der Platte,

c) am linken Rand ein Loch zum Aufhängen,

d) färbe Platte und Schrift verschieden ein, damit du beim Prüfen siehst, was wozu gehört,

e) beschreibe, was du ändern müsstest, damit die Schrift **vertieft** statt erhaben ist.
:::

::::collapsible{title="Tipp 1: Text mittig setzen"}

```scad
translate([30, 10, 3])
  linear_extrude(height=2)
    text("Name", size=8, halign="center", valign="center");
```

Die 3 in der Höhe ist die Dicke der Platte – der Text sitzt oben darauf. `halign` und `valign` beziehen den Text auf seinen Mittelpunkt.

::::

::::collapsible{title="Tipp 2: zu e)"}

Erhaben heißt: Der Text kommt **dazu**. Vertieft heißt: Der Text wird **abgezogen**. Denk an das Kapitel über Boolesche Operationen – und daran, dass abziehende Körper etwas hineinragen müssen.

::::

:::openscad{height="500px"}

```scad
// Dein Namensschild:

```

:::

:::protect{password="druck-5-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```scad
laenge = 60;
breite = 20;
dicke = 3;

difference() {
  color("steelblue") cube([laenge, breite, dicke]);
  translate([7, breite / 2, -1]) cylinder(h=dicke + 2, r=2.5, $fn=32);
}

color("white")
  translate([laenge / 2 + 5, breite / 2, dicke])
    linear_extrude(height=2)
      text("Name", size=8, halign="center", valign="center");
```

e) Für eine **vertiefte** Schrift wandert der Text in den `difference`-Block hinein, und zwar als abziehender Körper:

```scad
difference() {
  cube([laenge, breite, dicke]);
  translate([laenge / 2, breite / 2, dicke - 1])
    linear_extrude(height=2)
      text("Name", size=8, halign="center", valign="center");
}
```

Beachte das `dicke - 1`: Der abziehende Text beginnt **innerhalb** der Platte und ragt oben hinaus. Läge er genau bündig, wäre die Vertiefung wieder unsichtbar – dieselbe Falle wie beim Loch in Kapitel 3.

:::

---

## Selbsttest

::::multievent

**1. Wird die mit color gesetzte Farbe gedruckt?**

{r1{ja, immer}}

{r1{!nein, sie gilt nur für die Vorschau}}

{r1{nur bei mehrfarbigen Druckern automatisch}}

{r1{nur wenn sie in der stl-Datei steht}}

{h{Was steht in einer stl-Datei überhaupt drin?}}
{H{Richtig – nur Dreiecke, keine Farben.}}

**2. Was ist die kleinste Breite, die eine gedruckte Linie haben kann?**

{r2{beliebig klein}}

{r2{!ungefähr die Breite der Düse, meist 0,4 Millimeter}}

{r2{1 Zentimeter}}

{r2{das hängt nur vom Modell ab}}

{h{Das Material kommt durch eine Öffnung mit fester Größe.}}
{H{Richtig.}}

**3. Was braucht text, um druckbar zu werden?**

{r3{eine Farbe}}

{r3{!einen Befehl, der die flache Form in die Höhe zieht}}

{r3{eine Schleife}}

{r3{ein Modul}}

{h{text allein erzeugt eine zweidimensionale Form.}}
{H{Richtig – linear_extrude macht daraus einen Körper.}}

**4. Wie entsteht eine vertiefte Beschriftung?**

{r4{mit negativer Höhe}}

{r4{!indem der hochgezogene Text vom Werkstück abgezogen wird}}

{r4{mit einer anderen Farbe}}

{r4{gar nicht}}

{h{Vertieft heißt: Dort fehlt Material.}}
{H{Richtig – und der abziehende Text muss etwas hineinragen.}}

**5. Welches Bild eignet sich für ein Relief?**

{r5{ein möglichst großes, farbiges Foto}}

{r5{!ein kontrastreiches Graustufenbild mit überschaubarer Auflösung}}

{r5{ein Strichzeichnung ohne Graustufen}}

{r5{jedes Bild gleich gut}}

{h{Aus Helligkeit wird Höhe – und jeder Bildpunkt wird zu Geometrie.}}
{H{Richtig.}}

::::
