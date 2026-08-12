---
name: Eine Navigation muss her
lang: de
index: 9
---

# Eine Navigation muss her

## Das Ziel

Auf **jeder** Seite steht oben dieselbe Navigation – und zum ersten Mal bekommt deine Seite ein Aussehen, das du selbst bestimmst. Dafür legst du eine gemeinsame Datei `stil.css` an.

## So könnte das aussehen

:::webide{id="ams-09-navigation" height="620px"}

```html
<header>
  <h1>Amsterdam</h1>
  <nav>
    <ul>
      <li><a href="index.html" aria-current="page">Start</a></li>
      <li><a href="orte/rijksmuseum.html">Orte</a></li>
      <li><a href="geraeusche.html">Geräusche</a></li>
      <li><a href="quiz.html">Quiz</a></li>
    </ul>
  </nav>
</header>

<main>
  <p>Willkommen. Klick dich durch – oben findest du alles.</p>
</main>
```

```css
:root {
  --farbe: hsl(205 60% 30%);
  --hell: hsl(205 60% 96%);
  --abstand: 1rem;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: var(--abstand);
  max-width: 50rem;
  margin-inline: auto;
}

header {
  border-bottom: 3px solid var(--farbe);
  margin-bottom: var(--abstand);
}

h1 {
  color: var(--farbe);
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--abstand);
}

nav a {
  color: var(--farbe);
  text-decoration: none;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
}

nav a:hover {
  background: var(--hell);
}

nav a[aria-current="page"] {
  background: var(--farbe);
  color: white;
}
```

:::

## Wie es gemacht ist

**Eine Navigation ist inhaltlich eine Liste von Links.** Deshalb steht sie in `<nav>`, darin eine `<ul>`, darin je ein `<li>` mit einem `<a>`. Dass sie nebeneinander erscheint statt untereinander, macht allein das CSS:

```css
nav ul {
  list-style: none;   /* keine Aufzählungspunkte */
  padding: 0;         /* keine Einrückung */
  display: flex;      /* nebeneinander */
  gap: 1rem;          /* Abstand dazwischen */
}
```

`aria-current="page"` markiert den Eintrag, auf dem du gerade bist. Vorleseprogramme sagen das an – und mit dem passenden Selektor kannst du ihn zusätzlich hervorheben.

:::snippet{#merken}
**Das CSS gehört in eine eigene Datei**, nicht in jede HTML-Datei einzeln. Eingebunden wird sie im `<head>`:

```html
<link rel="stylesheet" href="stil.css">
```

Auf einer Unterseite eine Ebene tiefer heißt es `../stil.css`.

Der Gewinn zeigt sich beim ersten Farbwechsel: Du änderst **eine** Zeile, und alle Seiten ändern sich mit.
:::

Mehr dazu: [CSS einbinden](/mittelstufe/web/04-css-gestalten/01-css-einbinden) und [Layout mit Flexbox und Grid](/mittelstufe/web/04-css-gestalten/05-layout-mit-flexbox-und-grid).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Leg im Projektordner die Datei `stil.css` an und binde sie in **allen** deinen HTML-Dateien ein. Denk bei den Unterseiten an `../`.

b) Bau in deine Startseite eine Navigation nach dem Muster oben.

c) Kopier dieselbe Navigation in jede Unterseite. Pass dort die Pfade an.

d) Gestalte sie in deinen Farben: Leg zwei bis drei Werte in `:root` an und benutze sie überall mit `var(…)`.

e) Markier auf jeder Seite den aktuellen Eintrag mit `aria-current="page"`.

f) **Probier aus:** Ändere eine Farbe in `:root` und lade alle Seiten neu. Was passiert?
:::

::::collapsible{title="Tipp 1: Die Navigation steht untereinander"}

Dann fehlt `display: flex` beim **Elternelement**. Die Eigenschaft gehört an die `<ul>`, nicht an die `<li>` und nicht an die `<a>`.

Prüf außerdem, ob der Selektor trifft: `nav ul` meint jede Liste innerhalb eines `<nav>`.

::::

::::collapsible{title="Tipp 2: Auf den Unterseiten fehlt die Gestaltung"}

Dann findet die Unterseite die CSS-Datei nicht. Sie liegt eine Ebene höher:

```html
<link rel="stylesheet" href="../stil.css">
```

Öffne die Entwicklerwerkzeuge mit `F12` und sieh im Reiter *Netzwerk* nach: Steht dort bei `stil.css` der Code 404, ist der Pfad falsch.

::::

::::collapsible{title="Tipp 3: Ich muss die Navigation überall pflegen"}

Ja – und das ist lästig. Genau deshalb gibt es Programme, die Webseiten aus Bausteinen zusammensetzen; dieses Hyperbook ist selbst so gebaut.

Für dein Projekt gilt: Bau die Navigation **einmal** fertig, prüfe sie, und kopiere sie erst dann in die anderen Dateien. Sonst kopierst du einen Fehler viermal mit.

::::

:::protect{password="ams-09-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html` – im `<head>`:

```html
<link rel="stylesheet" href="stil.css">
```

und im `<body>`:

```html
<header>
  <h1>Gelsenkirchen</h1>
  <nav>
    <ul>
      <li><a href="index.html" aria-current="page">Start</a></li>
      <li><a href="orte/nordsternpark.html">Orte</a></li>
      <li><a href="geraeusche.html">Geräusche</a></li>
      <li><a href="quiz.html">Quiz</a></li>
    </ul>
  </nav>
</header>
```

`orte/nordsternpark.html` – dieselbe Navigation, andere Pfade:

```html
<link rel="stylesheet" href="../stil.css">
...
<li><a href="../index.html">Start</a></li>
<li><a href="nordsternpark.html" aria-current="page">Orte</a></li>
<li><a href="../geraeusche.html">Geräusche</a></li>
<li><a href="../quiz.html">Quiz</a></li>
```

`stil.css`

```css
:root {
  --farbe: hsl(210 65% 32%);
  --hell: hsl(210 65% 96%);
  --abstand: 1rem;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 50rem;
  margin-inline: auto;
  padding: var(--abstand);
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--abstand);
}

nav a {
  color: var(--farbe);
  text-decoration: none;
}

nav a[aria-current="page"] {
  font-weight: 700;
  text-decoration: underline;
}
```

Zu f): Alle Seiten ändern sich zugleich – sie benutzen dieselbe Datei. Das ist der ganze Sinn: Das Aussehen steht an **einer** Stelle, die Inhalte an vielen.

Das `flex-wrap: wrap` ist kein Beiwerk: Ohne es quetscht sich die Navigation auf einem schmalen Handy in eine Zeile und ragt über den Rand hinaus. Mit ihm rutschen die Einträge einfach in die nächste Zeile.

:::
