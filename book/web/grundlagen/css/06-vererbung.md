---
name: Vererbung
index: 6
lang: de
---

# Vererbung in CSS

In CSS können Stileigenschaften von einem Element auf ein anderes Element vererbt werden. Dies bedeutet, dass ein Element die Stileigenschaften eines anderen Elements übernimmt, wenn keine eigenen Stileigenschaften definiert sind. Hier sind einige Beispiele:

:::webide{id="vererbung"}

```css
/* Regel 1 */
body {
  font-family: Arial, sans-serif;
  text-align: center;
}

/* Regel 2 */
h1 {
  color: red;
}
```

```html template
<!DOCTYPE html>
<html>
  <head>
    <title>Vererbung</title>
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

In diesem Beispiel wird die Schriftart und die Textausrichtung des `body`-Elements auf Arial und zentriert gesetzt. Die Farbe der Überschrift wird auf Rot gesetzt, da die zweite Regel die erste Regel überschreibt. Der Text wird auch zentriert, da keine eigene Textausrichtung definiert ist und die Textausrichtung des `body`-Elements vererbt wird.
