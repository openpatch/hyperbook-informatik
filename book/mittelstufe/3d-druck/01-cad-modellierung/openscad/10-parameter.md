---
title: Parameter
index: 10
---

# Parameter

In OpenSCAD kannst du Parameter verwenden, um Werte zu speichern, die du später im Quelltext verwenden möchtest. Das ist besonders nützlich, wenn du ein Modell erstellen möchtest, das leicht anpassbar sein soll.

## Parameter erstellen

Du kannst einen Parameter erstellen, indem du ihm einen Namen gibst und ihm einen Wert zuweist. Zum Beispiel:

```scad
parameter_name = Wert;
```

## Parameter verwenden

Sobald du einen Parameter erstellt hast, kannst du ihn in deinem Quelltext verwenden, indem du einfach seinen Namen anstelle eines festen Werts verwendest. Zum Beispiel:

```scad
parameter_name = 10;
cube(parameter_name);
```

## Beispiel

Hier ist ein Beispiel, wie du Parameter verwenden kannst, um ein einfaches Modell zu erstellen.

:::snippet{#aufgabe}
Verändere den Wert des Parameters `cube_size` und beobachte, wie sich die Größe des Würfels verändert.
:::

:::openscad{height="600px"}
```scad
// Parameter für die Abmessungen des Würfels
cube_size = 50;
// Erstellen eines Würfels mit den Abmessungen aus dem Parameter
cube(cube_size);

translate([100, 0,0]) cube(20);
```
:::

:::alert{info}
Dass, sich der Wert des Parameters im Quelltext ändert, funktioniert nur in der webbasierten Version von OpenSCAD.
:::