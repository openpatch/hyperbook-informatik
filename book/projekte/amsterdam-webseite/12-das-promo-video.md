---
name: Das Promo-Video
lang: de
index: 12
---

# Das Promo-Video

## Das Ziel

Auf deiner Startseite steht ein Video – und du hast dich bewusst entschieden, **wie** du es einbindest. Denn dabei geht es nicht nur um Technik.

## Das Problem mit dem Einbetten

Ein Video von YouTube einzubetten ist eine Zeile:

```html
<iframe src="https://www.youtube.com/embed/VIDEO-ID"></iframe>
```

Damit holt der Browser jeder Besucherin beim **Laden der Seite** Daten von YouTube – ohne dass jemand auf „Abspielen" geklickt hat. YouTube erfährt dabei die IP-Adresse, den Browser und die Seite, von der aus geladen wurde.

:::alert{warn}
Eine IP-Adresse ist ein **personenbezogenes Datum**. Wer ein Video so einbettet, gibt Daten seiner Besucherinnen an ein fremdes Unternehmen weiter – für eine Schulseite ist das nicht in Ordnung.
:::

Mehr dazu: [Impressum und Datenschutz](/mittelstufe/web/05-recht-und-verantwortung/02-impressum-und-datenschutz).

## So könnte das aussehen

Die einfache Lösung: **erst fragen, dann laden.** Statt des Videos steht ein Vorschaubild mit Abspielknopf. Ein Klick öffnet das Video bei YouTube – vorher fließen keine Daten.

:::webide{id="ams-12-video" height="620px"}

```html
<h2>Amsterdam in 3 Minuten</h2>

<a class="video" href="https://www.youtube.com/watch?v=VIDEO-ID" target="_blank" rel="noopener">
  <img src="/images/amsterdam-platzhalter.svg"
       alt="Vorschaubild: Grachtenhäuser am Wasser"
       width="320" height="180">
  <span class="knopf" aria-hidden="true"></span>
  <span class="hinweis">Video bei YouTube ansehen – dabei werden Daten an YouTube übertragen</span>
</a>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

.video {
  position: relative;
  display: inline-block;
  max-width: 100%;
  text-decoration: none;
  color: inherit;
}

.video img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
}

.knopf {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 30px solid white;
  filter: drop-shadow(0 0 6px hsl(0 0% 0% / 60%));
}

.video:hover .knopf {
  border-left-color: hsl(15 80% 55%);
}

.hinweis {
  display: block;
  font-size: 0.8rem;
  color: hsl(0 0% 35%);
  margin-top: 0.4rem;
}
```

:::

## Wie es gemacht ist

Der Abspielknopf ist **kein Bild**, sondern ein Element ohne Inhalt, das nur aus Rahmen besteht: oben und unten durchsichtig, links weiß. Übrig bleibt ein Dreieck.

| Angabe | Wozu |
| --- | --- |
| `target="_blank"` | öffnet das Video in einem neuen Tab, deine Seite bleibt offen |
| `rel="noopener"` | verhindert, dass die geöffnete Seite auf deine zugreifen kann |
| `aria-hidden="true"` | der Knopf ist reine Dekoration – ein Vorleseprogramm soll ihn überspringen |
| `.hinweis` | sagt vorher, was beim Klick passiert |

:::snippet{#merken}
Wenn du das Video doch direkt einbetten willst, dann wenigstens über die Adresse **`youtube-nocookie.com`**:

```html
<iframe width="560" height="315"
        src="https://www.youtube-nocookie.com/embed/VIDEO-ID"
        title="Amsterdam in 3 Minuten"
        loading="lazy"
        allowfullscreen></iframe>
```

Das setzt weniger Cookies – Daten fließen beim Laden trotzdem. Vollständig sauber ist nur die Variante mit Vorschaubild.

Das `title`-Attribut ist Pflicht: Ohne es weiß ein Vorleseprogramm nicht, was in dem Rahmen steckt.
:::

## Deine Aufgabe

:::snippet{#aufgabe}
a) Such ein Video, das zu deinem Thema passt.

b) Bau die Vorschau-Lösung auf deiner Startseite ein: eigenes Vorschaubild, Abspielknopf, Hinweistext, Link zum Video.

c) Der Hinweis muss **vor** dem Klick sagen, dass Daten an YouTube gehen.

d) Prüf mit `F12` im Reiter *Netzwerk*: Wird beim Laden deiner Seite etwas von youtube.com geholt? Bei der Vorschau-Lösung darf dort **nichts** von YouTube auftauchen.

e) **Zum Nachdenken:** Nenne einen Vorteil und einen Nachteil beider Wege. Für welchen entscheidest du dich, und warum?
:::

::::collapsible{title="Tipp 1: Woher nehme ich das Vorschaubild?"}

Am einfachsten ist ein **eigenes** Bild – ein Foto vom Ort, um den es im Video geht.

Ein Bildschirmfoto aus dem Video selbst ist urheberrechtlich heikel: Es ist ein Ausschnitt aus einem fremden Werk. Für eine Schulseite mit Quellenangabe wird das in der Regel hingenommen; sauber ist es nicht.

::::

::::collapsible{title="Tipp 2: Das Dreieck sieht falsch aus"}

Die vier Rahmen bilden zusammen ein Rechteck aus vier Dreiecken. Sichtbar bleibt nur der, dessen Farbe gesetzt ist:

```css
border-top: 18px solid transparent;
border-bottom: 18px solid transparent;
border-left: 30px solid white;
```

Willst du es andersherum, tauschst du `border-left` gegen `border-right`. Und das Element braucht `width: 0; height: 0;` – sonst schiebt sein Inhalt die Rahmen auseinander.

::::

:::protect{password="ams-12-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html`

```html
<h2>Das Ruhrgebiet von oben</h2>

<a class="video"
   href="https://www.youtube.com/watch?v=BEISPIEL"
   target="_blank" rel="noopener">
  <img src="bilder/vorschau-halde.jpg"
       alt="Blick von der Halde über das Ruhrgebiet"
       width="1280" height="720">
  <span class="knopf" aria-hidden="true"></span>
  <span class="hinweis">
    Video bei YouTube ansehen. Beim Klick werden Daten an YouTube übertragen.
  </span>
</a>
```

Zu e) – eine mögliche Abwägung:

| | Vorschaubild mit Link | direkt eingebettet |
| --- | --- | --- |
| **Vorteil** | keine Daten ohne Einwilligung; die Seite lädt schneller | das Video läuft ohne Seitenwechsel |
| **Nachteil** | die Besucherin verlässt die Seite | Daten fließen beim Laden, ungefragt |

Für eine Schulseite ist die Vorschau-Lösung die richtige: Der Nachteil trifft die Bequemlichkeit, der andere trifft die Rechte der Besucherinnen. Bei ungleichem Gewicht entscheidet man zugunsten dessen, der die Wahl nicht hat.

:::
