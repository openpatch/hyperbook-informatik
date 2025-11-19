---
name: Überschriften und Paragraphen
lang: de
index: 2
---

# Überschriften und Paragraphen

Überschriften und Paragraphen sind die Grundbausteine von HTML. Mit Überschriften strukturieren wir den Text und mit Paragraphen fassen wir Textabschnitte zusammen.

## Überschriften

Überschriften werden mit den Tags `<h1>` bis `<h6>` erstellt. Die Bedeutung der Überschriften nimmt von `<h1>` bis `<h6>` ab. Das bedeutet, dass `<h1>` die wichtigste Überschrift ist und `<h6>` die unwichtigste.

:::webide{id="ueberschriften"}

```html
<h1>Überschrift 1</h1>
<h2>Überschrift 2</h2>
<h3>Überschrift 3</h3>
<h4>Überschrift 4</h4>
<h5>Überschrift 5</h5>
<h6>Überschrift 6</h6>
```

:::

:::alert{warn}
Wenn du eine visuell kleinere Überschrift benötigst, solltest du nicht einfach eine Überschrift mit einem kleineren Tag verwenden. Das Aussehen von Überschriften sollte mit CSS angepasst werden.
:::

## Paragraphen

Paragraphen werden mit dem Tag `<p>` erstellt. Mit Paragraphen fassen wir Textabschnitte zusammen.

:::webide{id="paragraphen"}

```html
<p>Das ist ein Absatz. Er enthält mehrere Sätze.</p>
<p>Das ist ein weiterer Absatz. Auch er enthält mehrere Sätze.</p>
```

:::

## Zusammenfassung

- Überschriften werden mit den Tags `<h1>` bis `<h6>` erstellt.
- Paragraphen werden mit dem Tag `<p>` erstellt.

Beide Elemente werden vom Browser standardmäßig formatiert. Mit CSS können wir das Aussehen der Elemente anpassen.