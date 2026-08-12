---
name: Liste von Erlebnissen
lang: de
index: 7
---

# Liste von Erlebnissen

## Das Ziel

Auf deiner Startseite steht eine Liste – Dinge, die man bei deinem Thema erlebt, sieht oder ausprobiert haben sollte.

## So könnte das aussehen

:::webide{id="ams-07-listen" height="600px"}

```html
<h2>Fünf Dinge, die man in Amsterdam gemacht haben sollte</h2>

<ul>
  <li>Mit dem Rad über die Grachtengürtel fahren</li>
  <li>Im Rijksmuseum vor der <em>Nachtwache</em> stehen</li>
  <li>Auf dem Albert-Cuyp-Markt Poffertjes essen</li>
  <li>Mit der kostenlosen Fähre nach Amsterdam-Noord übersetzen</li>
  <li>Abends am Wasser sitzen und Boote zählen</li>
</ul>

<h2>So kommst du vom Flughafen in die Stadt</h2>

<ol>
  <li>Am Bahnhof Schiphol ein Ticket kaufen</li>
  <li>In den Zug Richtung Amsterdam Centraal steigen</li>
  <li>Nach 17 Minuten aussteigen</li>
</ol>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 40rem;
  margin-inline: auto;
  padding: 1rem;
}

li {
  margin-block: 0.4rem;
}
```

:::

## Wie es gemacht ist

| Element | Bedeutung |
| --- | --- |
| `<ul>` | **u**ngeordnete Liste – die Reihenfolge ist egal |
| `<ol>` | ge**o**rdnete Liste – die Reihenfolge trägt den Sinn |
| `<li>` | ein Eintrag; steht **immer** in `<ul>` oder `<ol>` |

:::snippet{#merken}
Die Wahl zwischen `<ul>` und `<ol>` ist keine Frage des Aussehens, sondern der **Bedeutung**. Eine Wegbeschreibung ist geordnet: Schritt 2 vor Schritt 3 ergibt Unsinn. Eine Sammlung von Sehenswürdigkeiten ist es nicht.

Die Zahlen kommen bei `<ol>` vom Browser. Schreib sie **nie** selbst in den Text – sonst stimmen sie nicht mehr, sobald du einen Eintrag einfügst.
:::

Mehr dazu: [Listen und Tabellen](/mittelstufe/web/02-html-inhalte-auszeichnen/03-listen-und-tabellen).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Ergänze auf deiner Startseite eine **ungeordnete** Liste mit vier bis sechs Einträgen zu deinem Thema.

b) Ergänze eine **geordnete** Liste, in der die Reihenfolge wirklich zählt – ein Weg, eine Anleitung, ein Ablauf.

c) Gib jeder Liste eine `<h2>`-Überschrift, damit klar ist, worum es geht.

d) Bau in einen Eintrag eine Hervorhebung mit `<em>` oder `<strong>` ein.

e) **Probier aus:** Tausch bei einer Liste `ul` gegen `ol` und wieder zurück. Was ändert sich, und was nicht?
:::

::::collapsible{title="Tipp: Der Aufbau"}

Die Einträge stehen **innerhalb** der Liste, eingerückt:

```html
<ul>
  <li>Erster Eintrag</li>
  <li>Zweiter Eintrag</li>
</ul>
```

Ein `<li>` außerhalb einer Liste ist ein Fehler – der Browser zeigt es zwar trotzdem an, aber Vorleseprogramme können dann nicht mehr ansagen, wie viele Einträge es gibt.

::::

::::collapsible{title="Tipp: Ich will Häkchen statt Punkte"}

Das ist eine Sache des CSS, nicht des HTML:

```css
ul {
  list-style: none;
  padding-left: 0;
}

li::before {
  content: "✔ ";
  color: seagreen;
}
```

Am HTML änderst du dafür nichts – die Liste bleibt eine Liste. Genau darin liegt der Sinn der Trennung: Bedeutung im HTML, Aussehen im CSS.

::::

:::protect{password="ams-07-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```html
<h2>Fünf Orte, die man in Gelsenkirchen gesehen haben muss</h2>

<ul>
  <li>Den <strong>Nordsternpark</strong> mit dem Herkules auf dem Förderturm</li>
  <li>Die Arena an einem Heimspieltag – oder von außen, wenn keine Karten mehr da sind</li>
  <li>Die Zoom Erlebniswelt</li>
  <li>Das Wissenschaftspark-Gebäude mit der langen Glasfassade</li>
  <li>Den Rhein-Herne-Kanal mit dem Rad</li>
</ul>

<h2>So kommst du vom Hauptbahnhof zum Nordsternpark</h2>

<ol>
  <li>Am Hauptbahnhof in die Straßenbahn 301 steigen</li>
  <li>Bis zur Haltestelle Nordsternpark fahren</li>
  <li>Den Schildern zum Förderturm folgen</li>
</ol>
```

Zu e): Sichtbar ändern sich nur die Aufzählungszeichen – aus Punkten werden Zahlen. Für ein Vorleseprogramm ändert sich mehr: Es sagt bei `<ol>` „Liste mit 3 Einträgen, Eintrag 1 von 3" an. Deshalb ist die Wahl eine inhaltliche.

:::
