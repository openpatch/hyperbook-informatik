---
title: Rückblick
index: 4
---

# Rückblick

Mit Verschieben, Drehen und Verrechnen kannst du aus einfachen Körpern fast jede Form bauen. Zwei Dinge entscheiden dabei über Erfolg oder Ärger: die **Reihenfolge** und die **Überlappung**.

## Das kann ich jetzt

- [ ] Ich kann Objekte verschieben, drehen und skalieren. ([3.1](./01-einfache-transformationen))
- [ ] Ich kann erklären, warum Drehen und Verschieben nicht vertauschbar sind. ([3.1](./01-einfache-transformationen))
- [ ] Ich kann `union`, `difference` und `intersection` einsetzen. ([3.2](./02-kombination-von-objekten))
- [ ] Ich weiß, warum abziehende Körper etwas größer sein müssen. ([3.2](./02-kombination-von-objekten))
- [ ] Ich kann `hull`, `minkowski` und `linear_extrude` erklären. ([3.3](./03-komplexe-transformationen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Reihenfolge**

```scad
// A
translate([30, 0, 0]) rotate([0, 0, 45]) cube([20, 5, 5]);

// B
rotate([0, 0, 45]) translate([30, 0, 0]) cube([20, 5, 5]);
```

a) Sag **vor** dem Ausführen voraus, worin sich A und B unterscheiden.

b) Prüfe es im Modellierbereich, indem du abwechselnd eine der beiden Zeilen auskommentierst.

c) Formuliere eine Regel: Was gilt, wenn ein `rotate` **vor** einem `translate` steht?

d) Du willst einen Zeiger, der vom Ursprung ausgeht und um 45 Grad geneigt ist. Welche der beiden Fassungen brauchst du?
:::

::::collapsible{title="Tipp"}

Lies die Zeile **von rechts nach links**: Was am nächsten am Körper steht, wirkt zuerst.

Bei B wird der Würfel also erst verschoben und dann **samt seiner neuen Position** gedreht – er wandert dabei auf einer Kreisbahn um den Ursprung.

::::

:::openscad{height="450px"}

```scad
// A
translate([30, 0, 0]) rotate([0, 0, 45]) cube([20, 5, 5]);

// B
// rotate([0, 0, 45]) translate([30, 0, 0]) cube([20, 5, 5]);
```

:::

:::protect{password="druck-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b) Bei **A** steht der Würfel an der Stelle x = 30 und ist dort um 45 Grad gedreht. Bei **B** wird er zuerst nach x = 30 geschoben und **dann mitsamt dieser Position** gedreht – er landet deshalb diagonal versetzt, etwa bei x = 21 und y = 21.

c) Steht `rotate` vor `translate`, dreht sich **das gesamte Koordinatensystem** mit. Die anschließende Verschiebung geht dann nicht mehr entlang der ursprünglichen x-Achse, sondern entlang der gedrehten.

d) **B.** Wer einen Zeiger will, der vom Ursprung ausgeht, dreht das ganze Gebilde um den Ursprung – genau das leistet die Reihenfolge in B. Fassung A dreht den Würfel nur um sich selbst.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Schlüsselanhänger**

Bau einen Schlüsselanhänger:

a) ein flacher Quader, 40 mal 20 mal 4 Millimeter,

b) an einem Ende ein halbrunder Abschluss – ein Zylinder mit passendem Radius, mit dem Quader vereinigt,

c) darin ein Loch mit 6 Millimetern Durchmesser für den Schlüsselring,

d) achte darauf, dass das Loch wirklich durchgeht.

e) Erkläre, warum die Reihenfolge innerhalb von `difference` hier entscheidend ist.
:::

::::collapsible{title="Tipp 1: Erst zusammen, dann abziehen"}

Die Grundform besteht aus **zwei** Teilen, das Loch wird von **beiden** abgezogen. Also:

```scad
difference() {
  union() {
    // Quader und Zylinder
  }
  // der abziehende Zylinder
}
```

::::

::::collapsible{title="Tipp 2: Das Loch"}

Der abziehende Zylinder muss oben und unten über das Werkstück hinausragen:

```scad
translate([0, 10, -1]) cylinder(h=6, r=3);
```

Bei 4 Millimetern Materialstärke ist ein Zylinder mit Höhe 6, der 1 Millimeter tiefer beginnt, genau richtig.

::::

:::openscad{height="500px"}

```scad
// Dein Schluesselanhaenger:

```

:::

:::protect{password="druck-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```scad
difference() {
  union() {
    cube([40, 20, 4]);
    translate([0, 10, 0]) cylinder(h=4, r=10, $fn=48);
  }
  translate([0, 10, -1]) cylinder(h=6, r=3, $fn=32);
}
```

Der runde Abschluss hat den Radius 10 – halb so viel wie die Breite des Quaders. Dadurch schließt er bündig an.

e) Innerhalb von `difference` bleibt **das erste** Objekt erhalten, alle weiteren werden abgezogen. Stünde der kleine Zylinder zuerst, bliebe von ihm nur das übrig, was außerhalb des Anhängers liegt – also nichts Sinnvolles. Und ohne das umschließende `union` würde das Loch nur aus dem Quader gebohrt, nicht aus dem runden Ende.

:::

---

## Selbsttest

::::multievent

**1. Welche Transformation wirkt zuerst, wenn mehrere hintereinander stehen?**

{r1{die erste von links}}

{r1{!die, die dem Körper am nächsten steht}}

{r1{alle gleichzeitig}}

{r1{das ist zufällig}}

{h{Lies von rechts nach links.}}
{H{Richtig.}}

**2. Was bleibt bei difference erhalten?**

{r2{das letzte Objekt}}

{r2{!das erste Objekt}}

{r2{beide}}

{r2{das größere}}

{h{Alles Weitere wird abgezogen.}}
{H{Richtig.}}

**3. Ein Loch ist in der Vorschau nicht zu sehen. Was ist die wahrscheinlichste Ursache?**

{r3{Die Auflösung ist zu klein.}}

{r3{!Der abziehende Körper schließt bündig mit der Oberfläche ab.}}

{r3{difference wurde vergessen.}}

{r3{Die Farbe fehlt.}}

{h{Zwei Flächen liegen exakt aufeinander – wohin gehört dieser Punkt?}}
{H{Richtig. Deshalb macht man abziehende Körper immer etwas länger.}}

**4. Was macht hull mit zwei entfernt stehenden Kugeln?**

{r4{Es löscht eine davon.}}

{r4{!Es umspannt beide mit einer durchgehenden Hülle.}}

{r4{Es zieht sie voneinander ab.}}

{r4{Es bewegt sie aufeinander zu.}}

{h{Stell dir eine straff gespannte Folie vor.}}
{H{Richtig – ein bequemer Weg zu abgerundeten Verbindungen.}}

**5. Wozu dient linear_extrude?**

{r5{zum Drehen}}

{r5{!um aus einer flachen Form einen Körper zu machen}}

{r5{zum Abziehen}}

{r5{zum Einfärben}}

{h{Ohne diesen Befehl bleibt ein Text flach.}}
{H{Richtig.}}

::::
