---
name: Pubquiz Amsterdam
lang: de
index: 13
---

# Pubquiz Amsterdam

## Das Ziel

Zum Schluss die Seite, die deine Besucherinnen am längsten festhält: ein Quiz zu deinem Thema. Die Antwort erscheint erst auf Klick.

## So könnte das aussehen

:::webide{id="ams-13-quiz" height="640px"}

```html
<h1>Pubquiz Amsterdam</h1>

<p>Sechs Fragen. Erst raten, dann aufklappen.</p>

<details>
  <summary>Wie viele Fahrräder gibt es in Amsterdam ungefähr?</summary>
  <p>Rund <strong>880.000</strong> – mehr als die Stadt Einwohnerinnen und Einwohner hat.</p>
</details>

<details>
  <summary>Warum sind die Grachtenhäuser so schmal?</summary>
  <p>Weil die Steuer nach der <strong>Breite der Fassade</strong> berechnet wurde. Also baute man in die Tiefe und in die Höhe.</p>
</details>

<details>
  <summary>Wozu dienen die Haken an den Giebeln?</summary>
  <p>Zum <strong>Hochziehen von Möbeln</strong>. Die Treppen im Inneren sind so eng, dass Schränke durchs Fenster müssen.</p>
</details>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

details {
  border: 2px solid hsl(205 60% 85%);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-block: 0.75rem;
}

details[open] {
  border-color: hsl(205 60% 40%);
  background: hsl(205 60% 97%);
}

summary {
  cursor: pointer;
  font-weight: 600;
  padding: 0.25rem 0;
}

summary:hover {
  color: hsl(205 60% 35%);
}

details p {
  margin-bottom: 0.5rem;
}
```

:::

## Wie es gemacht ist

Für „Antwort erst auf Klick zeigen" brauchst du **kein JavaScript**. HTML kann das selbst:

```html
<details>
  <summary>Die Frage</summary>
  <p>Die Antwort.</p>
</details>
```

| Element | Bedeutung |
| --- | --- |
| `<details>` | ein Bereich, der auf- und zugeklappt werden kann |
| `<summary>` | die immer sichtbare Zeile – hier die Frage |
| alles Weitere | erscheint erst beim Aufklappen |

Der Zustand lässt sich im CSS abfragen: `details[open]` trifft nur die aufgeklappten. So kann eine geöffnete Frage anders aussehen als eine geschlossene.

:::snippet{#merken}
**Nimm den einfachsten Weg, der funktioniert.** Dasselbe ließe sich mit JavaScript bauen – mit mehr Zeilen, mehr Fehlerquellen und dem Nachteil, dass es ohne JavaScript gar nicht mehr geht.

`<details>` funktioniert immer: in jedem Browser, beim Ausdrucken, im Vorleseprogramm. Diese Frage – „geht das auch ohne?" – lohnt sich bei jeder Aufgabe.
:::

## Deine Aufgabe

:::snippet{#aufgabe}
a) Erstelle die Datei `quiz.html` mit Grundgerüst, Navigation und CSS-Einbindung.

b) Schreib **sechs** Fragen zu deinem Thema. Gute Quizfragen haben eine überraschende Antwort – „Wie viele Einwohner hat X?" ist langweilig, „Warum stehen die Häuser schief?" nicht.

c) Bau jede Frage als `<details>` mit `<summary>` ein.

d) Gestalte die Fragen in deinen Farben und lass eine **geöffnete** Frage anders aussehen als eine geschlossene.

e) Verlinke die Seite in deiner Navigation – auf allen Seiten.

f) Lass jemanden dein Quiz spielen und sieh zu, ohne zu helfen. Wo zögert die Person? Das sind die Stellen, an denen deine Formulierung noch nicht klar ist.
:::

::::collapsible{title="Tipp 1: Alle Fragen sind offen"}

Dann steht in deinem HTML das Attribut `open`:

```html
<details open>
```

Das ist die Startstellung „aufgeklappt". Lass es weg, dann sind die Fragen zu.

::::

::::collapsible{title="Tipp 2: Ich will das kleine Dreieck ändern"}

```css
summary {
  list-style: none;   /* Standarddreieck weg */
}

summary::before {
  content: "❓ ";
}

details[open] summary::before {
  content: "💡 ";
}
```

Achte darauf, dass weiterhin **sichtbar** bleibt, dass man klicken kann. Ein Element, das aussieht wie normaler Text, klickt niemand an.

::::

::::collapsible{title="Tipp 3: Für Mutige – ein Punktezähler mit JavaScript"}

Wenn du es ausprobieren willst: Diese wenigen Zeilen zählen mit, wie viele Fragen aufgeklappt wurden.

```html
<p id="stand">0 von 6 Fragen angesehen</p>

<script>
  const fragen = document.querySelectorAll("details");
  const stand = document.getElementById("stand");

  for (const frage of fragen) {
    frage.addEventListener("toggle", () => {
      const offen = document.querySelectorAll("details[open]").length;
      stand.textContent = offen + " von " + fragen.length + " Fragen angesehen";
    });
  }
</script>
```

Das `<script>` gehört ans **Ende** des `<body>` – sonst sucht es nach Elementen, die es noch gar nicht gibt.

Beachte, dass das Quiz **ohne** dieses Skript weiterhin vollständig funktioniert. Nur der Zähler fehlt dann. So sollte man JavaScript immer einsetzen: als Zugabe, nicht als Voraussetzung.

::::

:::protect{password="ams-13-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`quiz.html` – der Hauptteil:

```html
<main>
  <h2>Wie gut kennst du Gelsenkirchen?</h2>

  <p>Sechs Fragen. Erst raten, dann aufklappen.</p>

  <details>
    <summary>Warum heißt der Berg im Nordsternpark „Halde"?</summary>
    <p>
      Weil er kein Berg ist: Er besteht aus <strong>Abraum</strong> – dem Gestein,
      das beim Kohleabbau übrig blieb.
    </p>
  </details>

  <details>
    <summary>Was steht seit 2010 auf dem Förderturm?</summary>
    <p>
      Ein <strong>18 Meter hoher Herkules</strong> aus Stahl. Man kann ihm bis in
      die Schultern steigen.
    </p>
  </details>

  <details>
    <summary>Wie viele Menschen passen in die Arena?</summary>
    <p><strong>62.271</strong> – bei internationalen Spielen weniger, weil dann alle sitzen müssen.</p>
  </details>
</main>
```

`stil.css`

```css
details {
  border: 2px solid var(--hell);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-block: 0.75rem;
}

details[open] {
  border-color: var(--farbe);
  background: var(--hell);
}

summary {
  cursor: pointer;
  font-weight: 600;
}
```

Zu f): Diese Beobachtung ist der wertvollste Teil des ganzen Projekts. Was für dich selbstverständlich klingt, ist es für andere selten – und du siehst es nur, wenn du zusiehst und den Mund hältst.

:::

---

## Geschafft

Deine Webseite hat jetzt:

- eine Startseite mit Text, Bild, Listen, Karte und Video,
- eigene Seiten für Orte oder Dinge, untereinander verlinkt,
- eine Navigation auf jeder Seite,
- eine gemeinsame CSS-Datei mit deinen Farben,
- Töne und ein Quiz.

:::snippet{#brain}
**Und jetzt?**

- **Ins Netz stellen.** Mit [GitHub Pages](https://pages.github.com) kostenlos möglich. Sprich vorher mit deiner Lehrkraft – für eine veröffentlichte Seite gelten [eigene Regeln](/mittelstufe/web/05-recht-und-verantwortung/02-impressum-und-datenschutz).
- **Auf dem Handy prüfen.** Öffne die Entwicklerwerkzeuge mit `F12` und schalte auf die Handy-Ansicht. Was rutscht, was ist zu klein zum Antippen?
- **Weitermachen.** Der Lernpfad [Webentwicklung](/mittelstufe/web) geht tiefer: Flexbox und Grid, Media Queries, semantische Struktur.
:::
