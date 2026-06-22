---
title: Bilder
index: 18
permaid: openscad-bilder
---

# Bilder

Du kannst auch Bilder in OpenSCAD verwenden, um 3D-Modelle zu erstellen. Das ist besonders nützlich, wenn du ein 2D-Bild hast, das du in ein 3D-Objekt umwandeln möchtest.

Dazu kannst du die `surface()`-Funktion verwenden, um ein Bild als Höhenkarte zu interpretieren. Hier ist ein Beispiel, wie du ein Bild in OpenSCAD verwenden kannst:

:::openscad{height="600px"}
@file dest="/blume.png" src="./blume.png"

```scad
surface(file="/blume.png", center=true, invert=true);
```
:::

In der webbasierten Version von OpenSCAD kannst du Graustufen-png-Bilder verwenden. Diese kannst du bei **Binärdateien** hochladen. Den angezeigten Pfad kannst du dann in der `surface()`-Funktion verwenden.
