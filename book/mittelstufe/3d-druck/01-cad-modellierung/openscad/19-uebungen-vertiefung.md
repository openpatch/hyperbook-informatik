---
title: Übungen – Vertiefung
index: 19
permaid: openscad-uebungen-vertiefung
---

# Übungen

Bilde die jeweiligen Objekte in OpenSCAD nach. Lies dir die Tipps durch, wenn du nicht weiterkommst.

## Modell: Spielfigur

![](./spielfigur.png)

::::snippet{#aufgabe}
Baue die Spielfigur nach. Sie besteht aus einfachen 3D-Körpern.

:::openscad{height="500px"}
```scad
// Beispiel: Grundgerüst
// Rumpf
cylinder(h=40, r=10, center=true);
// Kopf
translate([0, 0, 25]) sphere(r=8);
// Dein Code hier
```
:::

:::collapsible{title="Tipps"}
Verwende `sphere` für Kopf und Gelenke, `cylinder` für Rumpf und Beine. Nutze `translate`, um die Teile richtig zu positionieren. Starte mit dem Rumpf in der Mitte und arbeite dich nach oben und unten vor.
:::

::::

## Modell: Rad mit Aussparungen

![](./rad.png)

::::snippet{#aufgabe}
Baue das Rad nach. Es besteht aus einem flachen Zylinder, aus dem mehrere Löcher ausgespart sind.

:::openscad{height="500px"}
```scad
// Beispiel: Grundform
cylinder(h=5, r=30, center=true);
// Dein Code hier
```
:::

:::collapsible{title="Tipps"}
Nutze `difference()`. Das Rad ist ein flacher Zylinder (`cylinder`). Die Speichen-Aussparungen sind kleinere Zylinder, die mit `for`-Schleife und `rotate` gleichmäßig verteilt werden.
:::

::::

## Modell: Tetraeder mit abgerundeten Kanten

![](./tetraeder.png)

::::snippet{#aufgabe}
Baue den Tetraeder nach. Er hat abgerundete Kanten und Ecken.

:::openscad{height="500px"}
```scad
// Beispiel: Tetraeder-Grundform
polyhedron(
    points=[[0,0,0], [20,0,0], [10,17.32,0], [10,5.77,16.33]],
    faces=[[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
);
// Dein Code hier
```
:::

:::collapsible{title="Tipps"}
Nutze die Minkowski-Summe aus [Komplexe Transformationen](./16-komplexe-transformationen.md): `minkowski()` mit einem `polyhedron` und einer kleinen `sphere`. Den Tetraeder (Dreieckspyramide) kannst du als `polyhedron` mit 4 Punkten und 4 Flächen definieren.
:::

::::

## Modell: Podest, innen hohl

![](./podest.png)

::::snippet{#aufgabe}
Baue das Podest nach. Es ist ein Quader, der innen hohl ist – wie eine Box ohne Deckel.

:::openscad{height="500px"}
```scad
// Beispiel: Äußerer Quader
cube([50, 50, 20]);
// Dein Code hier
```
:::

:::collapsible{title="Tipps"}
Nutze `difference()`. Ziehe einen kleineren Quader von einem größeren ab. Der innere Quader darf oben aus dem äußeren herausragen, damit kein Deckel entsteht.
:::

::::

## Modell: Schlüsselanhänger

![](./anhaenger.png)

::::snippet{#aufgabe}
Baue den Schlüsselanhänger nach. Er hat eine abgerundete Form und ein Loch für den Schlüsselring.

:::openscad{height="500px"}
```scad
// Beispiel: Zwei Zylinder für hull()
cylinder(h=3, r=10, center=true);
translate([25, 0, 0]) cylinder(h=3, r=10, center=true);
// Dein Code hier
```
:::

:::collapsible{title="Tipps"}
Nutze `hull()` für die abgerundete Grundform (zwei Zylinder verbinden). Das Loch für den Ring ist ein kleiner Zylinder, den du mit `difference()` abziehst. Mach das Modell flach (niedriger `h`-Wert).
:::

::::
