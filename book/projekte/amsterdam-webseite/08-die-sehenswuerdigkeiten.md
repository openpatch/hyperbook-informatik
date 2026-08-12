---
name: Die Sehenswürdigkeiten von Amsterdam
lang: de
index: 8
---

# Die Sehenswürdigkeiten von Amsterdam

## Das Ziel

Aus deiner Liste werden **eigene Seiten**: für jeden Ort eine Datei, verlinkt von der Startseite und zurück. Damit wird aus einer Seite eine Webseite.

## So könnte das aussehen

So ist eine Unterseite aufgebaut – eine Überschrift, ein Bild, ein paar Absätze und ein Rückweg:

:::webide{id="ams-08-unterseite" height="600px"}

```html
<p><a href="../index.html">← Zurück zur Startseite</a></p>

<h1>Rijksmuseum</h1>

<figure>
  <img src="/images/amsterdam-platzhalter.svg"
       alt="Backsteinfassade des Rijksmuseums mit zwei Türmen"
       width="320" height="180">
  <figcaption>Zeichnung: Hyperbook, CC BY-SA</figcaption>
</figure>

<p>
  Das Rijksmuseum ist das größte Museum der Niederlande. Sein bekanntestes
  Bild ist Rembrandts <em>Nachtwache</em> von 1642 – über vier Meter breit.
</p>

<h2>Gut zu wissen</h2>

<ul>
  <li>Geöffnet täglich von 9 bis 17 Uhr</li>
  <li>Unter 18 Jahren ist der Eintritt frei</li>
  <li>Tickets vorher online kaufen, sonst wartet man lange</li>
</ul>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

img {
  max-width: 100%;
  height: auto;
}
```

:::

:::alert{info}
Der Übungsbereich zeigt immer nur **eine** Seite. Das Springen zwischen Dateien kannst du deshalb erst in deinem eigenen Projekt ausprobieren – dort funktioniert es.
:::

## Wie es gemacht ist

Ein Link besteht aus dem Element `<a>`, dem Ziel in `href` und dem sichtbaren Text dazwischen:

```html
<a href="orte/rijksmuseum.html">Rijksmuseum</a>
```

Entscheidend ist der **Pfad**. Er wird von der Datei aus gelesen, in der der Link steht:

```
meine-seite/
├── index.html          ← von hier …
├── stil.css
└── orte/
    ├── rijksmuseum.html   … nach hier: orte/rijksmuseum.html
    └── vondelpark.html
```

| Von | Nach | `href` |
| --- | --- | --- |
| `index.html` | `orte/rijksmuseum.html` | `orte/rijksmuseum.html` |
| `orte/rijksmuseum.html` | `index.html` | `../index.html` |
| `orte/rijksmuseum.html` | `orte/vondelpark.html` | `vondelpark.html` |

:::snippet{#merken}
`..` bedeutet **einen Ordner nach oben**. Von einer Unterseite zurück zur Startseite geht es deshalb über `../index.html`.

Und: keine Leerzeichen in Dateinamen. `anne frank haus.html` funktioniert im Browser nur mit Verrenkungen – `anne-frank-haus.html` immer.
:::

Mehr dazu: [Links und Bilder](/mittelstufe/web/02-html-inhalte-auszeichnen/04-links-und-bilder).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Leg in deinem Projektordner einen Unterordner an – `orte/`, `spieler/`, `rezepte/`, wie es zu deinem Thema passt.

b) Erstelle darin für **zwei bis drei** Einträge deiner Liste je eine HTML-Datei. Jede bekommt das volle Grundgerüst, eine `<h1>`, ein Bild und mindestens zwei Absätze.

c) Verlinke die Einträge auf deiner Startseite mit den passenden Unterseiten.

d) Setz auf jede Unterseite oben einen Rückweg zur Startseite.

e) Probier alle Links im Browser durch. Kommst du von jeder Seite zu jeder anderen und wieder zurück?
:::

::::collapsible{title="Tipp 1: Die erste Unterseite geht am schnellsten mit Kopieren"}

Kopier deine `index.html`, benenn die Kopie um und leg sie in den Unterordner. Danach tauschst du nur Überschrift und Text aus – das Grundgerüst stimmt schon.

Achtung bei den Pfaden: In der Kopie liegt das Bild jetzt eine Ebene höher. Aus `bilder/hafen.jpg` wird `../bilder/hafen.jpg`.

::::

::::collapsible{title="Tipp 2: Der Link führt ins Leere"}

Klick den Link an und sieh in die Adresszeile. Dort steht, wonach der Browser gesucht hat. Meistens ist es eins von dreien:

1. **Tippfehler im Dateinamen** – `rijkmuseum.html` statt `rijksmuseum.html`.
2. **Groß- und Kleinschreibung.** Auf deinem Rechner mag `Orte/` funktionieren, auf einem Webserver nicht. Schreib alles klein.
3. **Ordner vergessen** – `rijksmuseum.html` statt `orte/rijksmuseum.html`.

::::

:::protect{password="ams-08-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html` – die Liste wird zur Linkliste:

```html
<h2>Orte, die du gesehen haben musst</h2>

<ul>
  <li><a href="orte/nordsternpark.html">Nordsternpark</a></li>
  <li><a href="orte/zoom.html">Zoom Erlebniswelt</a></li>
  <li><a href="orte/arena.html">Arena</a></li>
</ul>
```

`orte/nordsternpark.html`

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nordsternpark – Gelsenkirchen</title>
  </head>
  <body>
    <p><a href="../index.html">← Zurück zur Startseite</a></p>

    <h1>Nordsternpark</h1>

    <figure>
      <img src="../bilder/nordsternturm.jpg"
           alt="Förderturm mit der Herkules-Figur darauf"
           width="1600" height="900">
      <figcaption>Foto: eigene Aufnahme</figcaption>
    </figure>

    <p>Wo bis 1993 Kohle gefördert wurde, liegt heute ein Park …</p>

    <h2>Gut zu wissen</h2>

    <ul>
      <li>Der Park ist immer geöffnet und kostet keinen Eintritt</li>
      <li>Auf den Turm kommt man nur mit Führung</li>
    </ul>
  </body>
</html>
```

Beachte die beiden `../` in der Unterseite: einmal für den Rückweg, einmal für das Bild. Beide zeigen aus dem Ordner `orte/` heraus.

Der Seitentitel enthält zusätzlich das Thema (`Nordsternpark – Gelsenkirchen`). Das hilft, wenn jemand mehrere Tabs offen hat.

:::
