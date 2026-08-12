---
title: Rückblick
index: 6
---

# Rückblick

Ab hier ist dein Modell ein **Programm**. Variablen, Schleifen und Module sind dieselben drei Werkzeuge, die du aus jeder Programmiersprache kennst – und sie bringen hier denselben Gewinn: Ein Modell, das man an einer Stelle ändert, statt an zwanzig.

## Das kann ich jetzt

- [ ] Ich lege Maße als Parameter an und berechne abgeleitete Maße daraus. ([4.1](./01-parameter), [4.2](./02-parameter-vertiefung))
- [ ] Ich kann mit `$fn` die Auflösung steuern und weiß, was sie kostet. ([4.2](./02-parameter-vertiefung))
- [ ] Ich kann mit `for` viele gleichartige Objekte erzeugen. ([4.3](./03-schleifen))
- [ ] Ich kann verschachtelte Schleifen für Raster einsetzen. ([4.3](./03-schleifen), [4.5](./05-muster))
- [ ] Ich schreibe eigene Module mit Parametern. ([4.4](./04-eigene-module))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Zählen**

a) Wie viele Objekte entstehen bei einem Bereich von 0 bis 5?

b) Wie viele bei einem Bereich von 0 bis 10 mit Schrittweite 2?

c) Wie viele bei zwei geschachtelten Schleifen über je 0 bis 3?

d) Wie viele bei drei geschachtelten Schleifen über je 0 bis 4?

e) Ein Raster soll 4 Reihen zu je 6 Objekten haben, und der Abstand soll 15 betragen. Wie lauten die beiden Bereiche, und wie berechnest du die Verschiebung?
:::

::::collapsible{title="Tipp"}

Ein Bereich von 0 bis n schließt **beide** Grenzen ein – das sind n + 1 Werte. Das ist der Unterschied zu `range` in Python, wo die obere Grenze nicht dazugehört.

::::

:::protect{password="druck-4-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **6** – die Werte 0, 1, 2, 3, 4, 5.

b) **6** – die Werte 0, 2, 4, 6, 8, 10.

c) 4 · 4 = **16**.

d) 5 · 5 · 5 = **125**.

e) Die Bereiche laufen von 0 bis 3 und von 0 bis 5. Die Verschiebung ergibt sich als Zählvariable mal Abstand:

```scad
for (x = [0:3])
  for (y = [0:5])
    translate([x * 15, y * 15, 0]) cube(10);
```

**Achte auf die Zahl der Durchläufe:** 4 Reihen bedeuten den Bereich 0 bis **3**, nicht 0 bis 4. Der klassische Fehler ist eine Reihe zu viel.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Eine Bauplatte**

Bau eine Platte mit Noppen, ähnlich einem Baustein.

a) Eine Grundplatte, 4 Millimeter dick.

b) Darauf ein Raster aus Noppen – Zylinder mit Radius 4 und Höhe 5.

c) Zahl der Spalten, Zahl der Zeilen, Abstand und Noppenradius stehen **oben als Parameter**.

d) Die Größe der Grundplatte wird aus diesen Parametern **berechnet**, nicht fest eingetragen.

e) Schreib die Noppe als eigenes **Modul**.

f) Ändere danach die Zahl der Spalten auf 8. Was musst du anpassen?
:::

::::collapsible{title="Tipp 1: Die Grundplatte berechnen"}

Wenn 4 Spalten im Abstand 12 stehen sollen, ist die Platte 4 · 12 = 48 breit:

```scad
cube([spalten * abstand, zeilen * abstand, 4]);
```

::::

::::collapsible{title="Tipp 2: Die Noppen mittig setzen"}

Die erste Noppe soll nicht auf der Kante sitzen, sondern in der Mitte des ersten Feldes. Dafür addiert man den halben Abstand:

```scad
translate([x * abstand + abstand/2, y * abstand + abstand/2, 4]) noppe();
```

Die 4 in der Höhe ist die Dicke der Grundplatte – die Noppe sitzt oben darauf.

::::

:::openscad{height="550px"}

```scad
spalten = 4;
zeilen = 3;
abstand = 12;
noppe_r = 4;

// Dein Modul und deine Schleifen:

```

:::

:::protect{password="druck-4-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```scad
spalten = 4;
zeilen = 3;
abstand = 12;
noppe_r = 4;
platte_dicke = 4;

module noppe() {
  cylinder(h=5, r=noppe_r, $fn=32);
}

cube([spalten * abstand, zeilen * abstand, platte_dicke]);

for (x = [0 : spalten - 1])
  for (y = [0 : zeilen - 1])
    translate([x * abstand + abstand/2, y * abstand + abstand/2, platte_dicke])
      noppe();
```

f) **Nur die erste Zeile.** Die Platte wächst mit, die Schleife läuft öfter, die Noppen sitzen weiterhin mittig. Genau das ist der Unterschied zwischen einem Modell und einem Programm.

Beachte den Bereich `[0 : spalten - 1]`: Bei 4 Spalten läuft er von 0 bis 3, also viermal. Wer `[0 : spalten]` schreibt, bekommt eine Noppenreihe zu viel – und die steht dann über den Rand der Platte hinaus.

:::

---

## Selbsttest

::::multievent

**1. Wie viele Durchläufe hat eine Schleife über den Bereich von 0 bis 5?**

{z{6}}

{h{Beide Grenzen zählen mit.}}
{H{Richtig – anders als bei range in Python.}}

**2. Vier Spalten sollen entstehen. Wie lautet der Bereich?**

{r1{von 0 bis 4}}

{r1{!von 0 bis 3}}

{r1{von 1 bis 4}}

{r1{von 0 bis 5}}

{h{Die Zahl der Werte ist obere Grenze plus eins.}}
{H{Richtig. Deshalb schreibt man den Bereich als 0 bis spalten minus 1.}}

**3. Was passiert beim Definieren eines Moduls?**

{r2{Das Objekt erscheint sofort.}}

{r2{!Nichts – erst der Aufruf zeichnet etwas.}}

{r2{Der Quelltext wird geprüft und gelöscht.}}

{r2{Die Vorschau wird geleert.}}

{h{Wie bei einer Funktionsdefinition.}}
{H{Richtig.}}

**4. Warum berechnet man die Größe der Grundplatte aus den Parametern?**

{r3{Weil OpenSCAD keine festen Zahlen erlaubt.}}

{r3{!Damit sie beim Ändern der Spaltenzahl von selbst mitwächst.}}

{r3{Weil das schneller rendert.}}

{r3{Damit sie quadratisch wird.}}

{h{Was passiert mit einer fest eingetragenen Breite, wenn Spalten dazukommen?}}
{H{Richtig.}}

**5. Was gewinnt ein Modul gegenüber kopiertem Quelltext? Wähle alle zutreffenden aus.**

{c1{!Eine Änderung wirkt an allen Stellen zugleich.}}

{c1{!Der Aufruf sagt durch seinen Namen, was dort entsteht.}}

{c1{Das Modell wird kleiner gedruckt.}}

{c1{Die Auflösung wird besser.}}

{h{Zwei der Angebote betreffen die Arbeit am Quelltext.}}
{H{Richtig.}}

::::
