---
name: Einheiten
index: 7
lang: de
---

# Einheiten in CSS

In CSS können verschiedene Einheiten verwendet werden, um Größenangaben zu machen. Du solltest am besten relative Einheiten verwenden, da sie besser skalierbar sind und sich an verschiedene Bildschirmgrößen anpassen.

## Absolute Einheiten

Absolute Einheiten sind fest definierte Einheiten, die unabhängig von der Bildschirmgröße sind. Hier sind einige Beispiele:

- `px` (Pixel): Ein Pixel entspricht einem Bildpunkt auf dem Bildschirm. Pixel sind die am häufigsten verwendete Einheit in CSS.
- `pt` (Punkt): Ein Punkt entspricht 1/72 Zoll. Punkte werden häufig für Druckdesigns verwendet.
- `cm` (Zentimeter): Ein Zentimeter entspricht 1/2,54 Zoll. Zentimeter werden häufig für Druckdesigns verwendet.
- `mm` (Millimeter): Ein Millimeter entspricht 1/25,4 Zoll. Millimeter werden häufig für Druckdesigns verwendet.
- `in` (Zoll): Ein Zoll entspricht 2,54 Zentimetern. Zoll werden häufig für Druckdesigns verwendet.

:::webide{id="einheiten-absolute"}

```css
/* Regel 1 */
body {
  font-size: 16px;
  width: 200px;
  height: 100px;
}

h1 {
  font-size: 24pt;
  width: 2in;
  height: 1in;
  background-color: lightblue;
}

p {
  font-size: 1cm;
  width: 20mm;
  height: 10mm;
  background-color: lightgreen;
}
```

```html template
<!DOCTYPE html>
<html>
  <head>
    <title>Einheiten</title>
    <style>
      ###CSS###
    </style>
  </head>
  <body>
    <h1>Überschrift</h1>
    <p>Text</p>
  </body>
</html>
```

:::

## Relative Einheiten

Relative Einheiten sind abhängig von anderen Größenangaben, wie z.B. der Schriftgröße oder der Bildschirmgröße. Hier sind einige Beispiele:

- `%` (Prozent): Ein Prozent entspricht einem Hundertstel der Größe des übergeordneten Elements.
- `em`: Ein `em` entspricht der Schriftgröße des übergeordneten Elements. Wenn die Schriftgröße des übergeordneten Elements 16px beträgt, entspricht ein `em` 16px.
- `rem`: Ein `rem` entspricht der Schriftgröße des Wurzelelements (`html`). Wenn die Schriftgröße des Wurzelelements 16px beträgt, entspricht ein `rem` 16px.
- `vw` (Viewport Width): Ein `vw` entspricht einem Hundertstel der Breite des Viewports.
- `vh` (Viewport Height): Ein `vh` entspricht einem Hundertstel der Höhe des Viewports.

:::webide{id="einheiten-relative"}

```css
/* Regel 1 */
body {
  font-size: 16px;
}

h1 {
  font-size: 150%;
  width: 50vw;
  height: 10vh;
  background-color: lightblue;
}

p {
  font-size: 1.5rem;
  width: 2em;
  height: 1em;
  background-color: lightgreen;
}
```

```html template
<!DOCTYPE html>
<html>
  <head>
    <title>Einheiten</title>
    <style>
      ###CSS###
    </style>
  </head>
  <body>
    <h1>Überschrift</h1>
    <p>Text</p>
  </body>
</html>
```

:::

