---
name: Referenz
index: 7
---

# Referenz

Zum Nachschlagen.

## Das Grundgerüst

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Titel der Seite</title>
    <link rel="stylesheet" href="stil.css">
  </head>
  <body>
    <header>
      <h1>Überschrift der Seite</h1>
      <nav>…</nav>
    </header>
    <main>…</main>
    <footer>…</footer>
  </body>
</html>
```

## HTML

### Text

| Element | Bedeutung |
| --- | --- |
| `<h1>` … `<h6>` | Überschriften, `<h1>` genau einmal je Seite |
| `<p>` | Absatz |
| `<br>` | Zeilenumbruch innerhalb eines Absatzes |
| `<strong>` | wichtig |
| `<em>` | betont |
| `<code>` | Quelltext |
| `<q>` | kurzes Zitat |
| `<blockquote>` | längeres Zitat |
| `<abbr title="…">` | Abkürzung |
| `<time datetime="2026-03-14">` | Zeitangabe, maschinenlesbar |
| `<!-- … -->` | Kommentar |

### Listen und Tabellen

```html
<ul><li>Punkt</li></ul>              <!-- ungeordnet -->
<ol><li>Schritt</li></ol>            <!-- geordnet -->
<dl><dt>Begriff</dt><dd>Erklärung</dd></dl>

<table>
  <caption>Beschriftung</caption>
  <thead><tr><th>Kopf</th></tr></thead>
  <tbody><tr><td>Daten</td></tr></tbody>
</table>
```

### Links und Bilder

```html
<a href="https://example.org">absolut</a>
<a href="seite.html">relativ</a>
<a href="../index.html">einen Ordner höher</a>
<a href="#abschnitt">Sprungziel auf dieser Seite</a>
<a href="mailto:info@example.org">E-Mail</a>

<img src="bild.jpg" alt="Beschreibung" width="600" height="400" loading="lazy">

<figure>
  <img src="bild.jpg" alt="Beschreibung">
  <figcaption>Unterschrift</figcaption>
</figure>
```

### Struktur

| Element | Wofür |
| --- | --- |
| `<header>` | Kopfbereich |
| `<nav>` | Navigation |
| `<main>` | Hauptinhalt, genau einmal je Seite |
| `<section>` | thematischer Abschnitt |
| `<article>` | eigenständiger Beitrag |
| `<aside>` | Randbemerkung |
| `<footer>` | Fußbereich |
| `<div>` | Block ohne Bedeutung – nur wenn nichts anderes passt |
| `<span>` | Bereich im Text ohne Bedeutung |

## CSS

### Einbinden

```html
<link rel="stylesheet" href="stil.css">
```

### Aufbau einer Regel

```css
selektor {
  eigenschaft: wert;
}

/* Kommentar */
```

### Selektoren

| Selektor | Trifft |
| --- | --- |
| `p` | alle `<p>` |
| `.klasse` | alle mit `class="klasse"` |
| `#kennung` | das eine mit `id="kennung"` |
| `.a.b` | Elemente mit **beiden** Klassen |
| `a, b` | a **oder** b |
| `a b` | jedes `b` irgendwo in einem `a` (Nachfahre) |
| `a > b` | jedes `b` direkt in einem `a` (Kind) |
| `a:hover` | während die Maus darauf zeigt |
| `a:focus` | während es per Tastatur ausgewählt ist |
| `*` | jedes Element |

**Wer gewinnt?** Erst die Spezifität (id vor Klasse vor Elementname vor Vererbung), bei Gleichstand die spätere Regel.

### Farben

```css
color: darkslateblue;            /* Name */
color: #483d8b;                  /* hexadezimal */
color: rgb(72 61 139);           /* rot grün blau */
color: hsl(248 39% 39%);         /* Farbton Sättigung Helligkeit */
color: hsl(248 39% 39% / 40%);   /* mit Durchsichtigkeit */
```

`hsl` ist zum Selbstwählen am besten: Farbton 0–360, Sättigung und Helligkeit in Prozent. Eine hellere Variante bekommt man, indem man nur die letzte Zahl erhöht.

### Eigene Werte

```css
:root {
  --haupt: hsl(210 70% 35%);
  --abstand: 1rem;
}

header {
  background: var(--haupt);
  padding: var(--abstand);
}
```

### Schrift

| Eigenschaft | Beispiel |
| --- | --- |
| `font-family` | `system-ui, sans-serif` |
| `font-size` | `1.125rem` |
| `font-weight` | `400` normal, `700` fett |
| `line-height` | `1.6` (ohne Einheit) |
| `text-align` | `left`, `center`, `right` |
| `text-decoration` | `none` entfernt die Linie unter Links |

### Einheiten

| Einheit | Bedeutung |
| --- | --- |
| `rem` | Vielfaches der Grundschriftgröße – **für Schriftgrößen** |
| `em` | Vielfaches der Schriftgröße des Elements |
| `ch` | Breite einer Ziffer – für Textbreiten |
| `px` | Bildpunkt – für Rahmen und Feinheiten |
| `%` | Anteil vom umgebenden Element |
| `vw` / `vh` | Prozent der Fensterbreite / -höhe |
| `fr` | Anteil am freien Platz im Grid |

### Boxmodell

```css
* { box-sizing: border-box; }   /* immer als Erstes */

.kasten {
  margin: 1rem;                 /* Abstand nach außen */
  border: 1px solid #999;       /* Rahmen */
  padding: 1rem;                /* Abstand nach innen */
  border-radius: 8px;           /* runde Ecken */
}

margin: 10px;                       /* alle vier */
margin: 10px 20px;                  /* oben/unten | links/rechts */
margin: 10px 20px 30px 40px;        /* oben | rechts | unten | links */
margin-block: 1rem;                 /* oben und unten */
margin-inline: auto;                /* zentriert bei gesetzter Breite */
```

### Layout

```css
/* Eine Reihe */
.leiste {
  display: flex;
  gap: 1rem;
  justify-content: space-between;   /* entlang der Reihe */
  align-items: center;              /* quer dazu */
  flex-wrap: wrap;                  /* darf umbrechen */
}

/* Ein Raster, das sich selbst anpasst */
.raster {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

/* Ein Element über alle Spalten */
header { grid-column: 1 / -1; }
```

**Faustregel:** eine Richtung → Flexbox, zwei Richtungen → Grid.

### Für jeden Bildschirm

```css
img { max-width: 100%; height: auto; }

body {
  max-width: 70rem;
  margin-inline: auto;
  padding: clamp(1rem, 4vw, 3rem);
}

h1 { font-size: clamp(1.5rem, 5vw, 3rem); }

@media (min-width: 45rem) {
  /* Ergänzungen für breitere Bildschirme */
}

@media (prefers-color-scheme: dark) {
  :root { --hintergrund: hsl(220 15% 15%); }
}
```

`clamp(kleinster, gewünschter, größter)` – erst versuchen, ohne Media Query auszukommen.

## Prüfliste vor dem Veröffentlichen

| Frage | |
| --- | --- |
| Meldet der [Validator](https://validator.w3.org) etwas? | beheben |
| Steht auf Handybreite etwas über den Rand? | `max-width` statt `width` |
| Hat jedes Bild ein sinnvolles `alt`? | ergänzen |
| Sagt jeder Linktext, wohin er führt? | umformulieren |
| Ist die Seite ohne :t[CSS]{#css} verständlich? | Struktur verbessern |
| Erreicht man alles mit der Tabulatortaste? | echte `a` und `button` verwenden |
| Sind alle Bilder rechtlich geklärt und belegt? | ersetzen oder Nachweis ergänzen |
| Ist jede abgebildete Person einverstanden? | Bild ersetzen |
| Lädt die Seite alles vom eigenen Server? | fremde Einbindungen ersetzen |
| Gibt es ein Impressum, aus jeder Seite verlinkt? | anlegen |

## Was du im Browser nachsehen kannst

**F12** öffnet die Entwicklerwerkzeuge.

| Reiter | Wofür |
| --- | --- |
| **Elemente** | der Baum der Seite; rechts unter *Styles* alle wirkenden Regeln, verworfene durchgestrichen; ganz unten die Zeichnung des Boxmodells |
| **Netzwerk** | jede geladene Datei mit Typ, Größe und Statuscode |
| **Konsole** | Fehlermeldungen |

Änderungen dort wirken nur bei dir und sind nach dem Neuladen weg.

## Häufige Statuscodes

| Code | Bedeutung |
| --- | --- |
| **200** | in Ordnung |
| **301** / **302** | umgezogen |
| **403** | verboten |
| **404** | nicht gefunden |
| **500** | Fehler auf dem Server |

## Creative-Commons-Kürzel

| Kürzel | Bedeutung |
| --- | --- |
| **BY** | Namensnennung |
| **SA** | Weitergabe unter gleichen Bedingungen |
| **NC** | keine kommerzielle Nutzung |
| **ND** | keine Bearbeitung |
| **CC0** | keine Bedingungen |

Beispiel für eine ordentliche Angabe:

```html
<figcaption>
  Foto: <a href="https://example.org/profil">Jonas Brenner</a>,
  <a href="https://creativecommons.org/licenses/by/4.0/deed.de">CC BY 4.0</a>
</figcaption>
```
