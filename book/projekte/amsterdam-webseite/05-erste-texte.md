---
name: Erste Texte
lang: de
index: 5
---

# Erste Texte

## Das Ziel

Deine Startseite bekommt eine Gliederung: eine Hauptüberschrift, zwei oder drei Abschnitte mit Zwischenüberschriften und Text – und ein paar hervorgehobene Stellen.

## So könnte das aussehen

:::webide{id="ams-05-texte" height="520px"}

```html
<h1>Amsterdam</h1>

<p>
  Amsterdam ist die Hauptstadt der Niederlande. In der Innenstadt leben
  <strong>mehr Fahrräder als Menschen</strong> – gut 880.000 Räder auf
  rund 900.000 Einwohnerinnen und Einwohner.
</p>

<h2>Wasser überall</h2>

<p>
  Die Stadt steht auf Pfählen im Sumpf. Ihre <em>Grachten</em> sind zusammen
  über 100 Kilometer lang und werden von rund 1500 Brücken überspannt.
</p>

<h2>Wann hinfahren?</h2>

<p>
  Am schönsten ist es von <time datetime="2026-04">April</time> bis Juni:
  Dann blühen die Tulpen, und es ist noch nicht so voll wie im Sommer.
</p>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}
```

:::

## Wie es gemacht ist

| Element | Wofür |
| --- | --- |
| `<h1>` | die **eine** Hauptüberschrift der Seite |
| `<h2>`, `<h3>` | Zwischenüberschriften, der Reihe nach |
| `<p>` | ein Absatz |
| `<strong>` | etwas Wichtiges |
| `<em>` | etwas Betontes |

:::snippet{#merken}
**Überschriftenstufen sind eine Gliederung, keine Schriftgrößen.** Nach `<h1>` kommt `<h2>`, nicht `<h3>`. Wie groß eine Überschrift aussieht, entscheidest du später im CSS – überspringen darfst du trotzdem keine Stufe.
:::

Mehr dazu: [Text auszeichnen](/mittelstufe/web/02-html-inhalte-auszeichnen/02-text-auszeichnen).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Schreib in deine `index.html` einen Einleitungsabsatz zu deinem Thema – drei bis fünf Sätze.

b) Ergänze zwei bis drei Abschnitte mit je einer `<h2>`-Überschrift und einem Absatz.

c) Heb in jedem Abschnitt **eine** Stelle mit `<strong>` hervor. Überleg dabei: Ist das wirklich das Wichtigste?

d) Schreib eine Zahl in deinen Text – eine Einwohnerzahl, ein Baujahr, eine Länge. Konkrete Zahlen machen einen Text sofort glaubwürdiger.
:::

::::collapsible{title="Tipp: Woher nehme ich die Inhalte?"}

Schreib **nicht** von einer anderen Seite ab. Zum einen ist das fremder Text, zum anderen merkt man es sofort.

Besser: Sieh dir zwei, drei Quellen an, leg sie weg und schreib in eigenen Worten auf, was hängen geblieben ist. Was du selbst nicht verstanden hast, kannst du auch nicht kurz erklären – und genau daran merkst du, wo du noch nachlesen musst.

::::

:::protect{password="ams-05-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

Ausschnitt aus `index.html`:

```html
<body>
  <h1>Gelsenkirchen</h1>

  <p>
    Gelsenkirchen liegt mitten im Ruhrgebiet und hat rund
    <strong>260.000 Einwohnerinnen und Einwohner</strong>. Bis 1960 wurde
    hier Kohle gefördert – heute wächst auf den Halden Wald.
  </p>

  <h2>Von der Zeche zum Park</h2>

  <p>
    Auf dem Gelände der Zeche Nordstern liegt heute ein <em>Landschaftspark</em>.
    Der Förderturm steht noch, und von oben sieht man bis nach Essen.
  </p>

  <h2>Blau und Weiß</h2>

  <p>
    Kaum eine Stadt wird so mit ihrem Fußballverein verbunden. Die Arena fasst
    62.271 Menschen – mehr, als in manchem Stadtteil wohnen.
  </p>
</body>
```

Zwei Dinge, die du an deinem Text prüfen kannst:

- Steht `<h1>` genau **einmal** auf der Seite?
- Ist jeder Absatz in ein eigenes `<p>` gefasst? Leerzeilen allein erzeugen keinen Absatz – HTML ignoriert sie.

:::
