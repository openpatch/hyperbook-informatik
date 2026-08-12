---
name: Die Geräusche der Stadt
lang: de
index: 11
---

# Die Geräusche der Stadt

## Das Ziel

Deine Seite bekommt Töne: eine eigene Seite mit zwei bis drei Aufnahmen, die man abspielen kann – Straßenlärm, Möwen, Stadionchor, was zu deinem Thema passt.

## So könnte das aussehen

Der Ton hier ist ein synthetischer Platzhalter. Bei dir stehen an dieser Stelle echte Aufnahmen.

:::webide{id="ams-11-audio" height="620px"}

```html
<h1>Wie Amsterdam klingt</h1>

<p>Schließ die Augen und hör hin. Eine Stadt erkennt man auch mit geschlossenen Augen.</p>

<section class="ton">
  <h2>Grachten am Abend</h2>
  <p>Wasser, ein Motorboot, in der Ferne eine Kirchturmuhr.</p>
  <audio controls src="/audio/platzhalter-stadt.wav">
    Dein Browser kann keine Töne abspielen.
  </audio>
  <p class="quelle">Platzhalter, erzeugt mit Python. CC0</p>
</section>

<section class="ton">
  <h2>Fahrradklingeln</h2>
  <p>Der häufigste Ton der Stadt – und eine Warnung an Fußgänger.</p>
  <audio controls src="/audio/platzhalter-stadt.wav">
    Dein Browser kann keine Töne abspielen.
  </audio>
  <p class="quelle">Platzhalter, erzeugt mit Python. CC0</p>
</section>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

.ton {
  background: hsl(205 60% 96%);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-block: 1rem;
}

.ton h2 {
  margin-top: 0;
}

audio {
  width: 100%;
}

.quelle {
  font-size: 0.8rem;
  color: hsl(0 0% 40%);
  margin-bottom: 0;
}
```

:::

## Wie es gemacht ist

```html
<audio controls src="toene/grachten.mp3">
  Dein Browser kann keine Töne abspielen.
</audio>
```

| Angabe | Wozu |
| --- | --- |
| `controls` | zeigt die Bedienleiste. Ohne sie ist der Ton da, aber niemand kann ihn starten. |
| `src` | der Pfad zur Tondatei – genau wie bei einem Bild |
| Text dazwischen | wird angezeigt, wenn der Browser das Element nicht kennt |

:::alert{warn}
**Setz niemals `autoplay`.** Ein Ton, der von selbst losgeht, überrascht jeden – und trifft ausgerechnet die am härtesten, die mit Kopfhörern oder mit einem Vorleseprogramm arbeiten. Die meisten Browser unterbinden es inzwischen ohnehin.
:::

`.mp3` funktioniert überall. Aufnahmen vom Handy sind oft `.m4a`; die versteht nicht jeder Browser. Ein kostenloses Programm wie Audacity wandelt um.

## Woher nimmst du die Töne?

Dieselbe Frage wie beim Bild – und dieselbe Antwort: **Ein Ton gehört jemandem.**

1. **Selbst aufnehmen.** Jedes Handy kann es, und es klingt persönlicher als jede Datenbank.
2. **Freie Tonarchive.** Auf [freesound.org](https://freesound.org) stehen viele Aufnahmen unter Creative-Commons-Lizenzen. Die Lizenz steht bei jedem Ton – notiere Urheber, Lizenz und Link.
3. **Selbst erzeugen**, so wie der Platzhalter oben.

:::snippet{#brain}
Beim Aufnehmen im Freien nimmst du fast immer auch **Menschen** auf. Ein Gespräch, das zufällig mitläuft, ist eine personenbezogene Aufnahme – so wie ein Gesicht auf einem Foto.

Achte deshalb darauf, dass keine Gespräche zu verstehen sind. Umgebungsgeräusche sind unproblematisch, ein mitgeschnittener Satz ist es nicht.
:::

## Deine Aufgabe

:::snippet{#aufgabe}
a) Leg im Projektordner einen Unterordner `toene/` an und darin zwei bis drei Aufnahmen.

b) Erstelle die Datei `geraeusche.html` mit dem gewohnten Grundgerüst, der Navigation und der CSS-Einbindung.

c) Bau für jede Aufnahme einen Abschnitt: Überschrift, ein, zwei Sätze, Abspieler, Quellenangabe.

d) Verlinke die neue Seite in deiner Navigation – auf **allen** Seiten.

e) Prüf die Seite einmal mit heruntergedrehter Lautstärke: Steht neben jedem Abspieler genug Text, dass man auch ohne Ton versteht, worum es geht?
:::

::::collapsible{title="Tipp 1: Der Abspieler ist da, aber nichts passiert"}

Öffne die Entwicklerwerkzeuge mit `F12` und sieh in den Reiter *Netzwerk*. Steht bei deiner Tondatei **404**, stimmt der Pfad nicht – meistens ein Tippfehler oder ein vergessener Ordner.

Steht dort **200** und es bleibt trotzdem still, kennt der Browser das Format nicht. Wandle die Datei in `.mp3` um.

::::

::::collapsible{title="Tipp 2: Mehrere Formate anbieten"}

Wenn du sichergehen willst, gibst du dieselbe Aufnahme in zwei Formaten an. Der Browser nimmt das erste, das er versteht:

```html
<audio controls>
  <source src="toene/grachten.mp3" type="audio/mpeg">
  <source src="toene/grachten.ogg" type="audio/ogg">
  Dein Browser kann keine Töne abspielen.
</audio>
```

Für ein Schulprojekt genügt `.mp3` – schön ist es trotzdem zu wissen, dass es geht.

::::

:::protect{password="ams-11-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`geraeusche.html`

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Geräusche – Gelsenkirchen</title>
    <link rel="stylesheet" href="stil.css">
  </head>
  <body>
    <header>
      <h1>Gelsenkirchen</h1>
      <nav>
        <ul>
          <li><a href="index.html">Start</a></li>
          <li><a href="orte/nordsternpark.html">Orte</a></li>
          <li><a href="geraeusche.html" aria-current="page">Geräusche</a></li>
          <li><a href="quiz.html">Quiz</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h2>Wie die Stadt klingt</h2>

      <section class="ton">
        <h3>Am Kanal</h3>
        <p>Ein Frachtschiff, Wind in den Pappeln, weit weg die Autobahn.</p>
        <audio controls src="toene/kanal.mp3">
          Dein Browser kann keine Töne abspielen.
        </audio>
        <p class="quelle">Eigene Aufnahme, Juni 2025</p>
      </section>

      <section class="ton">
        <h3>Kurz vor Anpfiff</h3>
        <p>60.000 Menschen, die dasselbe Lied singen.</p>
        <audio controls src="toene/arena.mp3">
          Dein Browser kann keine Töne abspielen.
        </audio>
        <p class="quelle">Eigene Aufnahme, September 2025</p>
      </section>
    </main>
  </body>
</html>
```

Beachte die Überschriftenstufen: Auf dieser Seite ist `<h1>` der Seitentitel im Kopf, `<h2>` die Überschrift des Hauptteils und `<h3>` je Aufnahme. Die Reihenfolge stimmt, keine Stufe wird übersprungen.

:::
