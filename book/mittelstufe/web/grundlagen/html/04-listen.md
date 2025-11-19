---
name: Listen
lang: de
index: 4
---

# Listen

Listen sind eine Möglichkeit, um Elemente in einer geordneten oder ungeordneten Liste darzustellen. In HTML gibt es zwei Arten von Listen: die ungeordnete Liste `<ul>` und die geordnete Liste `<ol>`. Beide Listenarten enthalten Listenelemente `<li>`, die die einzelnen Elemente der Liste darstellen.

## Ungeordnete Liste

Eine ungeordnete Liste wird mit dem Tag `<ul>` erstellt. Die Listenelemente werden mit dem Tag `<li>` erstellt. Die ungeordnete Liste wird standardmäßig mit Punkten dargestellt.

:::webide{id="ungeordnete-liste"}

```html
<ul>
    <li>Element 1</li>
    <li>Element 2</li>
    <li>Element 3</li>
</ul>
```

:::

## Geordnete Liste

Eine geordnete Liste wird mit dem Tag `<ol>` erstellt. Die Listenelemente werden mit dem Tag `<li>` erstellt. Die geordnete Liste wird standardmäßig mit Zahlen dargestellt.

:::webide{id="geordnete-liste"}

```html
<ol>
    <li>Element 1</li>
    <li>Element 2</li>
    <li>Element 3</li>
</ol>
```

:::

## Listen verschachteln

Listen können auch verschachtelt werden. Das bedeutet, dass eine Liste in einem Listenelement einer anderen Liste enthalten ist.

:::webide{id="verschachtelte-liste"}

```html
<ul>
    <li>Element 1</li>
    <li>Element 2
        <ul>
            <li>Unterelement 1</li>
            <li>Unterelement 2</li>
        </ul>
    </li>
    <li>Element 3</li>
</ul>
```

:::

:::alert{info}
Verschachtelte Listen können beliebig tief verschachtelt werden. Es ist jedoch wichtig, die Verschachtelung nicht zu kompliziert zu gestalten, um die Übersichtlichkeit zu wahren.
:::

## Zusammenfassung

- Ungeordnete Listen werden mit dem Tag `<ul>` erstellt.
- Geordnete Listen werden mit dem Tag `<ol>` erstellt.
- Listenelemente werden mit dem Tag `<li>` erstellt.
- Listen können beliebig viele Listenelemente enthalten.