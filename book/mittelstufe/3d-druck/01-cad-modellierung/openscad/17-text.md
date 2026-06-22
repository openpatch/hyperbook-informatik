---
title: Text
index: 17
permaid: openscad-text
---

# Text

Der Text-Befehl `text()` erstellt eine 2D-Form. Da OpenSCAD nur 3D-Objekte darstellen kann, **musst du Text immer mit `linear_extrude()` extrudieren**, um ihn sichtbar zu machen.

:::openscad{height="600px"}
```scad
mein_text = "Hallo Welt!";
linear_extrude(height=5) 
    text(mein_text, size=10, halign="center", valign="center");
```
:::

:::alert{info}
**Wichtig:** `text()` allein erstellt eine 2D-Form, die in OpenSCAD **nicht sichtbar** ist. Du **musst** immer `linear_extrude()` verwenden, um Text in 3D darzustellen.
:::