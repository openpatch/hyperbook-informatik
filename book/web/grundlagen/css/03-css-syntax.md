---
name: CSS-Syntax
lang: de
index: 3
---

# CSS-Syntax

CSS-Regeln bestehen aus einem **Selektor** und einer oder mehreren **Deklarationen**. Ein Selektor bestimmt, auf welche Elemente die Deklarationen angewendet werden sollen. Eine Deklaration besteht aus einem **Eigenschaftsnamen** und einem **Wert**, der dieser Eigenschaft zugewiesen wird.

```css
/* Beispiel für eine Regel */
h1 {
  color: red;
  font-size: 24px;
}
```

In diesem Beispiel wird die Schriftfarbe von `h1`-Elementen auf Rot und die Schriftgröße auf 24 Pixel festgelegt.

## Selektoren

Selektoren bestimmen, auf welche Elemente die Deklarationen angewendet werden sollen. Es gibt verschiedene Arten von Selektoren, die unterschiedliche Elemente ansprechen können.

### Elementselektor

Der **Elementselektor** wählt alle Elemente eines bestimmten Typs aus. Der Elementselektor besteht aus dem Namen des Elements.

```css
/* Elementselektor */
h1 {
  color: red;
}
```

In diesem Beispiel wird die Schriftfarbe aller `h1`-Elemente auf Rot festgelegt.

### Klassenselektor

Der **Klassenselektor** wählt alle Elemente mit einem bestimmten Klassennamen aus. Der Klassenselektor besteht aus einem Punkt (`.`) gefolgt vom Klassennamen.

```css
/* Klassenselektor */
.highlight {
  background-color: yellow;
}
```

In diesem Beispiel wird der Hintergrund aller Elemente mit der Klasse `highlight` auf Gelb festgelegt.

### ID-Selektor

Der **ID-Selektor** wählt ein einzelnes Element mit einer bestimmten ID aus. Der ID-Selektor besteht aus einem Hash-Zeichen (`#`) gefolgt von der ID.

```css
/* ID-Selektor */
#header {
  font-size: 24px;
}
```

In diesem Beispiel wird die Schriftgröße des Elements mit der ID `header` auf 24 Pixel festgelegt.

### Gruppenselektor

Der **Gruppenselektor** wählt mehrere Elemente aus, die durch Kommata getrennt sind. Die Deklarationen werden auf alle Elemente angewendet, die durch den Gruppenselektor ausgewählt wurden.

```css
/* Gruppenselektor */
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

In diesem Beispiel wird die Schriftart aller `h1`, `h2` und `h3`-Elemente auf Arial oder eine serifenlose Schriftart festgelegt.

### Kombinierter Selektor

Ein Bespiel für einen kombinierten Selektor ist der Nachbarschaftsselektor. Der **Nachbarschaftsselektor** wählt ein Element aus, das direkt nach einem anderen Element steht. Der Nachbarschaftsselektor besteht aus einem Pluszeichen zwischen den beiden Selektoren.

```css
/* Nachbarschaftsselektor */
h1 + p {
  margin-top: 0;
}
```

In diesem Beispiel wird der obere Seitenabstand des ersten `p`-Elements nach einem `h1`-Element auf 0 festgelegt.

:::collapsible{title="Liste von kombinierten Selektoren" id="206747"}

| Kombinierter Selektor | Beispiel | Erklärung |
|-----------------------|----------|-----------|
| `E F`                 | `div p { color: blue; }` | Wählt alle `p`-Elemente innerhalb eines `div`-Elements aus und setzt deren Farbe auf Blau. |
| `E > F`               | `div > p { color: green; }` | Wählt alle `p`-Elemente aus, die direkte Kinder eines `div`-Elements sind, und setzt deren Farbe auf Grün. |
| `E + F`               | `h1 + p { margin-top: 0; }` | Wählt das `p`-Element aus, das direkt nach einem `h1`-Element steht, und setzt dessen oberen Rand auf 0. |
| `E ~ F`               | `h1 ~ p { color: red; }` | Wählt alle `p`-Elemente aus, die Geschwister eines `h1`-Elements sind, und setzt deren Farbe auf Rot. |
| `E[attr]`             | `a[target] { color: orange; }` | Wählt alle `a`-Elemente mit einem `target`-Attribut aus und setzt deren Farbe auf Orange. |
| `E[attr="value"]`     | `input[type="text"] { border: 1px solid black; }` | Wählt alle `input`-Elemente mit dem Attribut `type` gleich `text` aus und setzt deren Rahmen auf eine schwarze Linie. |
| `E[attr^="value"]`    | `a[href^="https"] { color: purple; }` | Wählt alle `a`-Elemente aus, deren `href`-Attribut mit `https` beginnt, und setzt deren Farbe auf Lila. |
| `E[attr$="value"]`    | `img[src$=".jpg"] { border: 2px solid red; }` | Wählt alle `img`-Elemente aus, deren `src`-Attribut mit `.jpg` endet, und setzt deren Rahmen auf eine rote Linie. |
| `E[attr*="value"]`    | `p[class*="intro"] { font-weight: bold; }` | Wählt alle `p`-Elemente aus, deren `class`-Attribut `intro` enthält, und setzt deren Schrift auf fett. |
| `E[attr~="value"]`    | `p[class~="highlight"] { background-color: yellow; }` | Wählt alle `p`-Elemente aus, deren `class`-Attribut das Wort `highlight` enthält, und setzt deren Hintergrundfarbe auf Gelb. |
| `E[attr\|="value"]`    | `div[class\|="container"] { padding: 10px; }` | Wählt alle `div`-Elemente aus, deren `class`-Attribut mit `container` beginnt oder gleich `container` ist, und setzt deren Innenabstand auf 10 Pixel. |

:::

### Pseudoklassen-Selektor

Der **Pseudoklassen-Selektor** wählt Elemente basierend auf ihrem Zustand oder ihrer Position im Dokument aus. Pseudoklassen werden durch einen Doppelpunkt (`:`) gefolgt von einem Pseudoklassen-Namen angegeben.

```css
/* Pseudoklassen-Selektor */
a:hover {
  text-decoration: underline;
}
```

In diesem Beispiel wird der Text von Links unterstrichen, wenn sie mit der Maus überfahren werden.

:::collapsible{title="Liste von Pseudoklassen-Selektoren" id="789261"}

| Pseudoklassen-Selektor | Beispiel | Erklärung |
|------------------------|----------|-----------|
| `:hover`               | `a:hover { color: red; }` | Ändert die Farbe eines Links auf Rot, wenn die Maus darüber fährt. |
| `:active`              | `button:active { background-color: blue; }` | Ändert die Hintergrundfarbe eines Buttons auf Blau, wenn er geklickt wird. |
| `:focus`               | `input:focus { border-color: green; }` | Ändert die Rahmenfarbe eines Eingabefelds auf Grün, wenn es den Fokus erhält. |
| `:nth-child(n)`        | `li:nth-child(2) { color: purple; }` | Ändert die Farbe des zweiten `li`-Elements auf Lila. |
| `:nth-of-type(n)`      | `p:nth-of-type(3) { font-size: 20px; }` | Ändert die Schriftgröße des dritten `p`-Elements auf 20 Pixel. |
| `:first-child`         | `p:first-child { font-weight: bold; }` | Macht das erste `p`-Element fett. |
| `:last-child`          | `p:last-child { text-align: right; }` | Richtet das letzte `p`-Element rechts aus. |
| `:only-child`          | `p:only-child { color: orange; }` | Ändert die Farbe eines `p`-Elements auf Orange, wenn es das einzige Kind ist. |
| `:not(selector)`       | `p:not(.highlight) { color: gray; }` | Ändert die Farbe aller `p`-Elemente auf Grau, außer denen mit der Klasse `highlight`. |
| `:checked`             | `input:checked { background-color: yellow; }` | Ändert die Hintergrundfarbe eines ausgewählten Eingabefelds auf Gelb. |
| `:disabled`            | `button:disabled { opacity: 0.5; }` | Verringert die Deckkraft eines deaktivierten Buttons auf 50%. |
| `:enabled`             | `input:enabled { border-color: blue; }` | Ändert die Rahmenfarbe eines aktivierten Eingabefelds auf Blau. |
| `:first-of-type`       | `p:first-of-type { margin-top: 0; }` | Entfernt den oberen Rand des ersten `p`-Elements seines Typs. |
| `:last-of-type`        | `p:last-of-type { margin-bottom: 0; }` | Entfernt den unteren Rand des letzten `p`-Elements seines Typs. |
| `:empty`               | `div:empty { display: none; }` | Blendet leere `div`-Elemente aus. |
| `:nth-last-child(n)`   | `li:nth-last-child(2) { color: brown; }` | Ändert die Farbe des vorletzten `li`-Elements auf Braun. |
| `:nth-last-of-type(n)` | `p:nth-last-of-type(2) { font-size: 18px; }` | Ändert die Schriftgröße des vorletzten `p`-Elements auf 18 Pixel. |
| `:only-of-type`        | `p:only-of-type { color: teal; }` | Ändert die Farbe eines `p`-Elements auf Türkis, wenn es das einzige Element seines Typs ist. |
| `:target`              | `#section:target { background-color: lightblue; }` | Ändert die Hintergrundfarbe eines Elements mit der ID `section` auf Hellblau, wenn es das Ziel eines Ankers ist. |

:::

### Pseudoelement-Selektor

Der **Pseudoelement-Selektor** wählt spezielle Teile eines Elements aus, die nicht durch reguläre Selektoren angesprochen werden können. Pseudoelemente werden durch zwei Doppelpunkte (`::`) gefolgt von einem Pseudoelement-Namen angegeben.

```css
/* Pseudoelement-Selektor */
p::first-line {
  font-weight: bold;
}
```

In diesem Beispiel wird die erste Zeile jedes `p`-Elements fett dargestellt.

:::collapsible{title="Liste von Pseudoelement-Selektoren" id="095899"}

| Pseudoelement-Selektor | Beispiel | Erklärung |
|------------------------|----------|-----------|
| `::first-line`         | `p::first-line { font-weight: bold; }` | Die erste Zeile jedes `p`-Elements wird fett dargestellt. |
| `::first-letter`       | `p::first-letter { font-size: 200%; }` | Der erste Buchstabe jedes `p`-Elements wird doppelt so groß dargestellt. |
| `::before`             | `p::before { content: "Hinweis: "; }` | Fügt vor jedem `p`-Element den Text "Hinweis: " ein. |
| `::after`              | `p::after { content: " Ende."; }` | Fügt nach jedem `p`-Element den Text " Ende." ein. |
| `::selection`          | `::selection { background: yellow; }` | Der Hintergrund des ausgewählten Textes wird gelb dargestellt. |
| `::placeholder`        | `input::placeholder { color: gray; }` | Der Platzhaltertext in einem `input`-Element wird grau dargestellt. |
| `::marker`             | `li::marker { color: red; }` | Die Aufzählungszeichen von `li`-Elementen werden rot dargestellt. |
| `::backdrop`           | `::backdrop { background-color: rgba(0,0,0,0.5); }` | Der Hintergrund eines modalen Dialogs wird halbtransparent schwarz dargestellt. |


:::

## Ausprobieren

Probieren Sie die verschiedenen Selektoren in der folgenden interaktiven Übung aus:

:::webide{id="css-selectors"}
```html
<div id="header">Header</div>
<h1>Übung: CSS-Selektoren</h1>
<p class="highlight">Dies ist ein Absatz mit der Klasse "highlight".</p>
<p id="first">Dies ist der erste Absatz. Damit der Text auch umbrechen kann, muss mehr Text hinzugefügt werden. Wenn der Text umbricht, dann wird er nicht mehr Fett dargestellt.</p>
<p id="second">Dies ist der zweite Absatz.</p>
<a href="#">Dies ist ein Link.</a>
```

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
}

h1 {
  color: red;
  font-size: 24px;
}

.highlight {
  background-color: yellow;
}

#header {
  font-size: 24px;
}

h1 + p {
  margin-top: 0;
}

a:hover {
  text-decoration: green wavy underline;
}

p::first-line {
  font-weight: bold;
}
```
:::
