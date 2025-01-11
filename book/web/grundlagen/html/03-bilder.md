---
name: Bilder
lang: de
index: 3
---

# Bilder

Bilder sind ein wichtiger Bestandteil von Webseiten. Sie können Informationen vermitteln, die mit Text nicht so gut darstellbar sind. Außerdem können sie eine Webseite optisch aufwerten und ansprechender gestalten.

## Bilder einfügen

Bilder können mit dem `<img>`-Tag in HTML eingefügt werden. Der `<img>`-Tag hat zwei wichtige Attribute: `src` und `alt`.

- Das `src`-Attribut enthält den Pfad zum Bild. Der Pfad kann entweder eine URL zu einem Bild im Internet oder ein Pfad zu einem Bild auf dem eigenen Server sein.
- Das `alt`-Attribut enthält einen alternativen Text für das Bild. Der alternative Text wird angezeigt, wenn das Bild nicht geladen werden kann oder der Benutzer einen Screenreader verwendet.

:::webide{id="bild-einfuegen"}

```html
<img  src="https://informatik.openpatch.org/images/willkommen-banner.jpg" alt="LEDs auf einem Breadboard">

```

:::

## Bilder positionieren

Bilder können mit CSS positioniert werden. Dazu können wir zum Beispiel die Breite des Bildes festlegen oder einen Rahmen um das Bild hinzufügen.

:::webide{id="bild-positionieren"}

```html
<img src="https://informatik.openpatch.org/images/willkommen-banner.jpg" alt="LEDs auf einem Breadboard">

```

```css
img {
    width: 50%;
    border: 2px solid darkslategray;
}
```

:::

## Zusammenfassung

- Bilder können mit dem `<img>`-Tag in HTML eingefügt werden.
- Das `src`-Attribut enthält den Pfad zum Bild.
- Das `alt`-Attribut enthält einen alternativen Text für das Bild.
- Bilder können mit CSS positioniert