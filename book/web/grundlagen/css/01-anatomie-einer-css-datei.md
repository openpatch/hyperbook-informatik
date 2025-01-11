---
name: Anatomie einer CSS-Datei
lang: de
---

# Anatomie einer CSS-Datei

CSS-Dateien bestehen aus Regeln, die das Aussehen von HTML-Elementen bestimmen. Eine Regel besteht aus einem Selektor und einer oder mehreren Deklarationen. Ein Selektor bestimmt, auf welche Elemente die Deklarationen angewendet werden sollen. Eine Deklaration besteht aus einem Eigenschaftsname und einem Wert, der dieser Eigenschaft zugewiesen wird.

:::webide{id="css-anatomy"}

```html
<h1>Beispiel</h1>
```

```css
/* Beispiel für eine Regel */
h1 {
  color: red;
  font-size: 24px;
}
```
:::

In diesem Beispiel wird die Schriftfarbe von `h1`-Elementen auf Rot und die Schriftgröße auf 24 Pixel festgelegt.