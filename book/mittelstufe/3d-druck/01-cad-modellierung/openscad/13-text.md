---
title: Text
index: 13
---

# Text

Der Text-Befehl `text()` ermöglicht es dir, eine 2D-Textform zu erstellen, die du dann extrudieren oder in andere Formen umwandeln kannst.

:::openscad{height="600px"}
```scad
text = "Hallo Welt!";
linear_extrude(height=5) 
text(text, size=10, halign="center", valign="center");
```
:::

:::alert{info}
`text()` erstellt standardmäßig eine 2D-Form, die du mit `linear_extrude()` in ein 3D-Objekt umwandeln kannst. Wenn du nur `text()` verwendest, erhältst du einen Fehler.
:::