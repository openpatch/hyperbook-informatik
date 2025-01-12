---
name: Spezifizität
lang: de
index: 8
---

# Spezifizität in CSS

In CSS gibt es ein Konzept namens "Spezifizität", das bestimmt, welche Regeln angewendet werden, wenn mehrere Regeln auf dasselbe Element zutreffen. Die Spezifizität wird durch die Kombination von Selektoren in einer Regel bestimmt. Hier sind einige Beispiele:

:::webide{id="spezifizitaet"}

```css
body {
  color: red;
}

body h1 {
  color: green;
}

h1 {
  color: blue;
}
```

```html template
<!DOCTYPE html>
<html>
  <head>
    <title>Spezifizität</title>
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

In diesem Beispiel wird die Farbe des `h1`-Elements auf Grün gesetzt, da die zweite Regel die spezifischste Regel ist. Das heißt, dass diese Regel am genauesten auf das Element zutrifft und daher angewendet wird. 

Die Spezifizität kann durch das Hinzufügen eines `!important` außer Kraft gesetzt werden. Das `!important`-Flag überschreibt alle anderen Regeln, unabhängig von ihrer Spezifizität. Hier ist ein Beispiel:

:::webide{id="spezifizitaet-important"}

```css
body {
  color: red;
}

body h1 {
  color: green;
}

h1 {
  color: blue!important;
}
```

```html template
<!DOCTYPE html>
<html>
  <head>
    <title>Spezifizität</title>
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

:::alert{warn}
`!important` sollte sparsam eingesetzt werden, da es die Lesbarkeit und Wartbarkeit des Codes beeinträchtigen kann.
:::


## Berechnung der Spezifizität

Die Berechnung der Spezifizität erfolgt durch die Zählung der verschiedenen Selektoren in einer Regel. Hier sind die Regeln für die Berechnung der Spezifizität in Anlehnung an das [W3C-Spezifikation](https://www.w3.org/TR/selectors-3/#specificity):

- HTML-Elemente (z.b. h1, p, blockquote ) = 1 Punkt
- CSS-Klassen (z.B. .alert, .js) = 10 Punkte
- Pseudo-Klassen/Elemente (z.B. :nth-of-type) = 10 Punkte
- CSS-IDs (z.B. #container, #header) = 100 Punkte
- Inline-Styles (z.B. <h1 style="color: red;"></h1>) = 1000 Punkte
- !important gewinnt immer, es sei denn mehere Selektoren haben ein !important erhalten.

Hier ein Beispiel:

```css
/* Regel 1 */
body {
  color: red;
}

/* Regel 2 */
ul.nav li.active {
  color: green;
}

/* Regel 3 */
#header h1 {
  color: blue;
}
```

Hier die Berechnung der Spezifizität für jede Regel:

- Regel 1: 1 Punkt (1 Element)
- Regel 2: 22 Punkte (2 Element + 2 Klassen)
- Regel 3: 101 Punkte (1 ID + 1 Element)
