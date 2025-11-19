---
name: Block- und Inline-Elemente
lang: de
index: 6
---

# Block- und Inline-Elemente

HTML-Elemente können entweder Block- oder Inline-Elemente sein. Block-Elemente beginnen auf einer neuen Zeile und nehmen die volle Breite des Elternelements ein. Inline-Elemente hingegen nehmen nur so viel Platz ein, wie sie benötigen, und beginnen nicht auf einer neuen Zeile.

## Div-Elemente

Das `<div>`-Element ist ein Block-Element, das dazu verwendet wird, um andere Elemente zu gruppieren. Es wird oft verwendet, um Abschnitte einer Webseite zu definieren, die mit CSS formatiert werden sollen.

:::webide{id="div-element"}

```html
<div>
    <h1>Überschrift</h1>
    <p>Das ist ein Absatz.</p>
</div>

<div>
    <h2>Unterüberschrift</h2>
    <p>Das ist ein weiterer Absatz.</p>
</div>
```

```css
div {
    background-color: lightgray;
    padding: 10px;
}
```
:::

## Span-Elemente

Das `<span>`-Element ist ein Inline-Element, das dazu verwendet wird, um Text innerhalb eines Blocks zu formatieren. Es wird oft verwendet, um Textabschnitte hervorzuheben oder mit CSS zu formatieren.

:::webide{id="span-element"}

```html
<p>
    Das ist ein <span style="color: red;">roter</span> Text.
</p>

<p>
    Das ist ein <span style="font-weight: bold;">fetter</span> Text.
</p>
```

:::

## Auflistung von Block- und Inline-Elementen

Die ist eine nicht vollständige Liste von Block- und Inline-Elementen in HTML. Wie du siehst, gibt es viele verschiedene Elemente, die entweder Block- oder Inline-Elemente sind. Alle haben unterschiedliche Verwendungszwecke und können mit CSS formatiert werden. Die vollständige Liste findest du in der [HTML-Spezifikation](https://html.spec.whatwg.org/multipage/#toc-semantics).

- **Block-Elemente**:
  - `<div>`
  - `<h1>` bis `<h6>`
  - `<p>`
  - `<ul>`
  - `<ol>`
  - `<li>`
  - `<table>`
  - `<form>`
  - `<header>`
  - `<footer>`
  - `<section>`
  - `<article>`
  - `<nav>`
  - `<aside>`
  - `<main>`
  - `<blockquote>`
  - `<hr>`
  - `<pre>`
  - `<address>`
  - `<figure>`
  - `<figcaption>`
  - `<fieldset>`
  - `<legend>`
  - `<details>`
  - `<summary>`
  - `<dialog>`
  - `<menu>`
  - `<article>`
  - `<header>`
  - `<footer>`
  - `<section>`
  - `<aside>`
  - `<main>`
  - `<blockquote>`
  - `<hr>`
  - `<pre>`
  - `<address>`
  - `<figure>`
  - `<figcaption>`
  - `<fieldset>`
  - `<legend>`
  - `<details>`
  - `<summary>`
  - `<dialog>`
  - `<menu>`
- **Inline-Elemente**: 
  - `<span>`
  - `<a>`
  - `<strong>`
  - `<em>`
  - `<code>`
  - `<img>`
  - `<br>`
  - `<input>`
  - `<label>`
  - `<select>`
  - `<option>`
  - `<textarea>`
  - `<button>`
  - `<abbr>`
  - `<cite>`
  - `<dfn>`
  - `<kbd>`
  - `<mark>`
  - `<q>`
  - `<samp>`
  - `<sub>`
  - `<sup>`
  - `<time>`
  - `<var>`
  - `<small>`
  - `<b>`
  - `<i>`
  - `<u>`
  - `<s>`
  - `<del>`
  - `<ins>`
  - `<strong>`
  - `<em>`
  - `<code>`
  - `<img>`
  - `<br>`
  - `<input>`
  - `<label>`
  - `<select>`
  - `<option>`
  - `<textarea>`
  - `<button>`
  - `<abbr>`
  - `<cite>`
  - `<dfn>`
  - `<kbd>`
  - `<mark>`
  - `<q>`
  - `<samp>`
  - `<sub>`
  - `<sup>`
  - `<time>`
  - `<var>`
  - `<small>`
  - `<b>`
  - `<i>`
  - `<u>`
  - `<s>`
  - `<del>`
  - `<ins>`