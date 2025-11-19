---
name: Farben
index: 4
lang: de
---

# Farben in CSS

In CSS gibt es verschiedene Möglichkeiten, Farben zu definieren. Die einfachste Möglichkeit ist, Farben über ihren Namen zu definieren. Es gibt [147 Farbnamen](https://www.w3schools.com/tags/ref_colornames.asp), die in allen Browsern unterstützt werden. Hier sind einige Beispiele:

```css
body {
  color: red;
  background-color: lightblue;
}
```

Eine weitere Möglichkeit ist, Farben über ihren Hexadezimalwert zu definieren. Ein Hexadezimalwert besteht aus einem `#` gefolgt von sechs Zeichen, die Zahlen von 0 bis 9 und Buchstaben von A bis F enthalten. Hier sind einige Beispiele:

```css
body {
  color: #ff0000; /* Rot */
  background-color: #00ff00; /* Grün */
  border-color: #0000ff; /* Blau */
}
```

Es ist auch möglich, Farben über ihren RGB-Wert zu definieren. Ein RGB-Wert besteht aus den Werten für Rot, Grün und Blau, die jeweils zwischen 0 und 255 liegen. Hier sind einige Beispiele:

```css
body {
  color: rgb(255, 0, 0); /* Rot */
  background-color: rgb(0, 255, 0); /* Grün */
  border-color: rgb(0, 0, 255); /* Blau */
}
```

Es ist auch möglich, Farben über ihren HSL-Wert zu definieren. Ein HSL-Wert besteht aus den Werten für Farbton, Sättigung und Helligkeit, die jeweils zwischen 0 und 100 liegen. Hier sind einige Beispiele:

```css
body {
  color: hsl(0, 100%, 50%); /* Rot */
  background-color: hsl(120, 100%, 50%); /* Grün */
  border-color: hsl(240, 100%, 50%); /* Blau */
}
```

Es ist auch möglich, Farben über ihren HSLA-Wert zu definieren. Ein HSLA-Wert ist ähnlich wie ein HSL-Wert, enthält aber auch einen Alphawert, der zwischen 0 und 1 liegt und die Transparenz der Farbe angibt. Hier sind einige Beispiele:

```css
body {
  color: hsla(0, 100%, 50%, 1); /* Vollständig deckendes Rot */
  background-color: hsla(120, 100%, 50%, 0.5); /* Halbtransparentes Grün */
  border-color: hsla(240, 100%, 50%, 0.25); /* Vierteltransparentes Blau */
}
```

## Ausprobieren

:::webide{id="farben"}

```html
<div class="name">Farbe</div>
<div class="rgb">Farbe</div>
<div class="hex">Farbe</div>
<div class="hsl">Farbe</div>
<div class="hsla">Farbe</div>
```

```css
body {
    font-family: Arial, sans-serif;
    font-size: 1.5em;
    line-height: 1.5;
    text-align: center;
}

.name {
  color: red;
  background-color: lightblue;
}

.rgb {
  color: rgb(255, 0, 0);
  background-color: rgb(0, 255, 0);
}

.hex {
  color: #0000ff;
  background-color: #ff0000;
}

.hsl {
  color: hsl(240, 100%, 50%);
  background-color: hsl(0, 100%, 50%);
}

.hsla {
  color: hsla(240, 100%, 50%, 0.5);
  background-color: hsla(0, 100%, 50%, 0.5);
}
```

:::
