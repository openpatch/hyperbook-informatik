---
title: Dein erstes 3D-Modell
index: 1
permaid: openscad-erstes-modell
---

# Dein erstes 3D-Modell

In diesem Kapitel wirst du **in unter einer Minute** dein erstes 3D-Objekt erstellen – **ohne Vorwissen!**

## Schritt 1: OpenSCAD öffnen

:::alert{info}
Du musst OpenSCAD nicht installieren. Nutze die **interaktiven Online-Editoren**, die direkt in deinem Browser funktionieren.
:::

## Schritt 2: Einen Würfel erstellen

Der Code `cube(30);` erzeugt einen Würfel mit 30mm Kantenlänge.

```scad
cube(30);
```

::::snippet{#aufgabe}
**Experimentiere:**
- Ändere die `30` in `50` – was passiert?
- Probiere `20` oder `100` aus
- Die Vorschau aktualisiert sich automatisch

:::openscad
```scad
cube(30);
```
:::

::::

## Schritt 3: Zweites Objekt hinzufügen

Jetzt fügen wir eine Kugel hinzu. Tippe diesen Code:

```scad
cube(30);
sphere(20);
```

::::snippet{#aufgabe}
**Bewege die Kugel nach rechts:**
Ersetze `sphere(20);` durch `translate([40,0,0]) sphere(20);`

Hinweis: `translate([x,y,z])` bewegt das Objekt um x, y und z Millimeter.
::::

:::openscad
```scad
cube(30);
sphere(20);
```
:::

## Herzlichen Glückwunsch! 🎉

Du hast gerade:
- ✅ Dein erstes 3D-Modell erstellt
- ✅ Ein Objekt bewegt
- ✅ OpenSCAD kennengelernt
