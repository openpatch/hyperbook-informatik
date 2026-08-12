---
name: Eine Karte von Amsterdam
lang: de
index: 10
---

# Eine Karte von Amsterdam

## Das Ziel

Auf deiner Seite liegt eine Karte, und darauf sitzen Marker an den richtigen Stellen. Ein Klick auf einen Marker führt zur passenden Unterseite.

## So könnte das aussehen

Zieh den Übungsbereich schmaler – die Marker bleiben an ihrem Platz auf der Karte.

:::webide{id="ams-10-karte" height="640px"}

```html
<h2>Wo liegt was?</h2>

<div class="karte">
  <img src="/images/amsterdam-karte-platzhalter.svg"
       alt="Vereinfachte Karte des Zentrums mit Grachten und Grünflächen"
       width="600" height="400">

  <a class="pin" href="orte/rijksmuseum.html" style="left: 28%; top: 34%">Rijksmuseum</a>
  <a class="pin" href="orte/hafen.html" style="left: 63%; top: 22%">Hafen</a>
  <a class="pin" href="orte/grachten.html" style="left: 46%; top: 72%">Grachten</a>
</div>
```

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

.karte {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.karte img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
}

.pin {
  position: absolute;
  transform: translate(-50%, -100%);
  background: hsl(205 60% 30%);
  color: white;
  text-decoration: none;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.pin::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: hsl(205 60% 30%);
}

.pin:hover {
  background: hsl(15 70% 45%);
}

.pin:hover::after {
  border-top-color: hsl(15 70% 45%);
}
```

:::

## Wie es gemacht ist

Das ist der erste Schritt, bei dem du Dinge **übereinander** legst statt untereinander. Dafür arbeiten zwei Angaben zusammen:

| Angabe | Wirkung |
| --- | --- |
| `position: relative` am Behälter | „Hier ist der Nullpunkt." Ohne diese Zeile beziehen sich die Marker auf das ganze Fenster. |
| `position: absolute` am Marker | nimmt den Marker aus dem normalen Fluss und setzt ihn an eine feste Stelle |
| `left`, `top` in **Prozent** | die Position, gemessen am Behälter |
| `transform: translate(-50%, -100%)` | verschiebt den Marker um seine halbe Breite nach links und seine volle Höhe nach oben – so zeigt die Spitze genau auf den Punkt |

:::snippet{#merken}
**Gib die Position in Prozent an, nicht in Pixeln.** Prozentwerte beziehen sich auf die Größe der Karte. Wird die Karte auf dem Handy schmaler, wandern die Marker mit. Mit Pixelwerten würden sie irgendwo im Nichts landen.
:::

Das `::after` erzeugt das kleine Dreieck unter dem Marker: ein Element, das es im HTML gar nicht gibt und das allein aus vier Rahmen besteht, von denen drei durchsichtig sind.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Beschaff dir eine Karte deines Themas. Möglichkeiten: ein Ausschnitt von [OpenStreetMap](https://www.openstreetmap.org) (die Karten stehen unter einer freien Lizenz – Hinweis nicht vergessen), ein selbst gezeichneter Plan, oder ein Grundriss.

b) Bau sie mit dem Behälter `<div class="karte">` in deine Seite ein.

c) Setz drei Marker auf die richtigen Stellen. Fang mit `left: 50%; top: 50%` an und taste dich heran.

d) Verlinke jeden Marker mit der passenden Unterseite.

e) Gib den Markern eine sichtbare Rückmeldung beim Überfahren mit der Maus.

f) Zieh das Fenster schmal. Sitzen die Marker noch richtig?
:::

::::collapsible{title="Tipp 1: Die Marker liegen alle oben links"}

Dann fehlt `position: relative` am Behälter. Ein `absolute` positioniertes Element sucht sich den nächsten Vorfahren, der selbst positioniert ist – findet es keinen, nimmt es die ganze Seite.

::::

::::collapsible{title="Tipp 2: Wie finde ich die richtigen Prozentwerte?"}

Rechne sie aus, statt zu raten. Öffne die Karte in einem Bildbearbeitungsprogramm und lies die Pixelkoordinaten des Punktes ab:

```
left = x-Koordinate ÷ Bildbreite  × 100
top  = y-Koordinate ÷ Bildhöhe    × 100
```

Ein Punkt bei (168 | 136) auf einer 600 × 400 großen Karte liegt also bei `left: 28%; top: 34%`.

::::

::::collapsible{title="Tipp 3: Der Marker verdeckt den Punkt"}

Ohne `transform` sitzt die **linke obere Ecke** des Markers auf dem Punkt – die Beschriftung liegt dann rechts unterhalb davon. Mit `translate(-50%, -100%)` rückt der Marker so, dass seine untere Mitte auf dem Punkt liegt.

Probier ruhig aus, wie es ohne aussieht. Der Unterschied ist der Grund für die Zeile.

::::

:::protect{password="ams-10-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html`

```html
<h2>Wo liegt was?</h2>

<div class="karte">
  <img src="bilder/stadtplan.png"
       alt="Stadtplan von Gelsenkirchen mit dem Kanal und den Hauptstraßen"
       width="800" height="600">

  <a class="pin" href="orte/nordsternpark.html" style="left: 31%; top: 58%">Nordsternpark</a>
  <a class="pin" href="orte/arena.html" style="left: 68%; top: 24%">Arena</a>
  <a class="pin" href="orte/zoom.html" style="left: 52%; top: 41%">Zoom</a>
</div>

<p class="quelle">Kartengrundlage: © OpenStreetMap-Mitwirkende, ODbL</p>
```

`stil.css`

```css
.karte {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.karte img {
  max-width: 100%;
  height: auto;
  display: block;
}

.pin {
  position: absolute;
  transform: translate(-50%, -100%);
  background: var(--farbe);
  color: white;
  text-decoration: none;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.pin:hover {
  background: hsl(15 70% 45%);
}

.quelle {
  font-size: 0.8rem;
  color: hsl(0 0% 40%);
}
```

Der Quellenhinweis ist bei OpenStreetMap **Pflicht** – die Lizenz verlangt die Nennung. Sie steht in der Fußzeile jeder Karte auf openstreetmap.org.

Die Positionen stehen hier im `style`-Attribut, weil sie zu **diesem einen** Marker gehören. Alles, was für **alle** Marker gilt, steht dagegen in der CSS-Datei. Diese Aufteilung ist üblich: Was sich wiederholt, kommt in die Datei; was einmalig ist, bleibt am Element.

:::
