---
name: Ein Bild sagt mehr als 1000 Worte
lang: de
index: 6
---

# Ein Bild sagt mehr als 1000 Worte

## Das Ziel

Auf deiner Startseite steht ein Bild mit einer Unterschrift – und du kannst sagen, warum du es benutzen darfst.

## So könnte das aussehen

Das Bild hier ist nur ein gezeichneter Platzhalter. Bei dir kommt an diese Stelle ein echtes Foto.

:::webide{id="ams-06-bild" height="560px"}

```html
<h1>Amsterdam</h1>

<figure>
  <img src="/images/amsterdam-platzhalter.svg"
       alt="Vier schmale Grachtenhäuser mit hellen Fenstern hinter einem Kanal"
       width="320" height="180">
  <figcaption>Grachtenhäuser im Zentrum. Zeichnung: Hyperbook, CC BY-SA</figcaption>
</figure>

<p>So schmal sind die Häuser, weil früher nach der Breite der Fassade besteuert wurde.</p>
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
  border-radius: 0.5rem;
}

figure {
  margin-inline: 0;
}

figcaption {
  font-size: 0.85rem;
  color: hsl(0 0% 40%);
}
```

:::

## Wie es gemacht ist

| Angabe | Wozu |
| --- | --- |
| `src` | wo die Bilddatei liegt. **Pflicht.** |
| `alt` | ein Text, der das Bild **ersetzt**. **Pflicht.** |
| `width`, `height` | die Maße. Der Browser hält damit Platz frei, sodass die Seite beim Laden nicht springt. |
| `<figure>` mit `<figcaption>` | Bild mit sichtbarer Unterschrift |

Die CSS-Zeile `img { max-width: 100%; height: auto; }` ist die wichtigste des ganzen Projekts: Ohne sie ragt ein großes Foto auf dem Handy über den Bildschirmrand hinaus.

:::snippet{#merken}
**Der Alternativtext beschreibt das Bild – er kündigt es nicht an.**

- ❌ `alt="Bild von Amsterdam"`
- ✅ `alt="Vier schmale Grachtenhäuser mit hellen Fenstern hinter einem Kanal"`

Er wird vorgelesen, wenn jemand nicht sehen kann, und angezeigt, wenn das Bild nicht lädt. „Bild von" hilft in beiden Fällen niemandem.
:::

Mehr dazu: [Links und Bilder](/mittelstufe/web/02-html-inhalte-auszeichnen/04-links-und-bilder).

## Darfst du das Bild überhaupt benutzen?

:::alert{warn}
Ein Bild, das du im Netz findest, gehört jemandem. **Ohne Erlaubnis darfst du es nicht auf deine Seite stellen** – auch dann nicht, wenn du die Quelle angibst und kein Geld damit verdienst.
:::

Drei Wege, die sicher sind:

1. **Selbst fotografieren.** Der einfachste Weg. Achte darauf, dass keine fremden Gesichter erkennbar sind.
2. **Wikimedia Commons.** Millionen Bilder unter Creative-Commons-Lizenzen. Die Lizenz steht bei jedem Bild – notiere dir Urheber, Lizenz und Link **sofort**.
3. **Selbst zeichnen** – so wie der Platzhalter oben.

Wie die Lizenzkürzel zu lesen sind, steht unter [Urheberrecht und Lizenzen](/mittelstufe/web/05-recht-und-verantwortung/01-urheberrecht-und-lizenzen).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Leg in deinem Projektordner einen Unterordner `bilder/` an.

b) Beschaff dir ein Bild zu deinem Thema – selbst fotografiert oder von Wikimedia Commons. Leg es in den Ordner. Der Dateiname sollte kurz sein, klein geschrieben und ohne Umlaute: `hafen.jpg`, nicht `Mein Bild (1).JPG`.

c) Bau es mit `<figure>` und `<figcaption>` in deine Startseite ein.

d) Schreib einen Alternativtext, der das Bild wirklich beschreibt.

e) Steht in der Unterschrift, woher das Bild stammt und unter welcher Lizenz?

f) Ergänze in deinem CSS die Regel für `img`, damit das Bild nicht überläuft. Zieh danach das Vorschaufenster schmal – bleibt alles im Rahmen?
:::

::::collapsible{title="Tipp 1: Der Pfad stimmt nicht"}

Das Bild liegt in `bilder/`, die HTML-Datei daneben. Der Pfad wird deshalb **relativ** angegeben:

```html
<img src="bilder/hafen.jpg" alt="...">
```

Kein `/` am Anfang – ein führender Schrägstrich bedeutet „ganz oben im Laufwerk" und findet dein Bild nicht.

::::

::::collapsible{title="Tipp 2: Das Bild ist riesig"}

Fotos aus einer Kamera oder vom Handy sind schnell 5 Megabyte groß. Auf einer Webseite reicht ein Zehntel davon.

Verkleinere das Bild vor dem Einbauen auf etwa 1600 Pixel Breite – jedes Bildbearbeitungsprogramm kann das, und es gibt Webseiten dafür. Deine Seite lädt danach spürbar schneller, besonders über Mobilfunk.

::::

:::protect{password="ams-06-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html`

```html
<figure>
  <img src="bilder/nordsternturm.jpg"
       alt="Der Förderturm der Zeche Nordstern mit dem Herkules darauf, davor eine Wiese"
       width="1600" height="900">
  <figcaption>
    Nordsternturm mit Herkules. Foto: eigene Aufnahme, Mai 2025
  </figcaption>
</figure>
```

`stil.css`

```css
img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
```

Bei einem Bild aus Wikimedia Commons sähe die Unterschrift so aus:

```html
<figcaption>
  Zeche Zollverein. Foto: Thomas Wolf, CC BY-SA 3.0, über Wikimedia Commons
</figcaption>
```

Achte darauf, dass `width` und `height` das **tatsächliche** Seitenverhältnis angeben. Stimmen sie nicht, wird das Bild verzerrt – oder der Browser hält den falschen Platz frei.

:::
