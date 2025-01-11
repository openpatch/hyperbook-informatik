---
name: Reihenfolge
lang: de
index: 5
---

# Reihenfolge in CSS

Die Reihefolge, in der CSS-Regeln definiert werden, ist wichtig, da sie bestimmt, welche Regeln angewendet werden, wenn mehrere Regeln auf dasselbe Element zutreffen. Hier sind einige Beispiele:

:::webide{id="reihenfolge"}
```css
/* Regel 1 */
html {
  background-color: red;
}

/* Regel 2 */
html {
  background-color: blue;
}
```
:::

In diesem Beispiel wird die Farbe des `body`-Elements auf Blau gesetzt, da die zweite Regel die erste Regel überschreibt. Wenn die Reihenfolge der Regeln vertauscht wird, wird die Farbe des `body`-Elements auf Rot gesetzt.