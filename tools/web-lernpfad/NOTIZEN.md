# Notizen zum Lernpfad „Webentwicklung" (Mittelstufe)

Was das `webide`-Element kann und was nicht. Alles hier ist **ausprobiert**.

## Das `webide`-Element

```md
:::webide{id="web-2-1-geruest" height="420px"}

```html
<h1>Hallo</h1>
```

```css
h1 { color: rebeccapurple; }
```

:::
```

| Attribut | Bedeutung |
| --- | --- |
| `id` | Schlüssel, unter dem die Arbeit der Lernenden gespeichert wird. **Immer setzen und nie mehr ändern** – sonst ist die Arbeit weg. Ohne Angabe nimmt das Element einen Hash des Inhalts, der sich bei jeder Textänderung ändert. |
| `height` | Höhe des Blocks. Voreinstellung ist fast bildschirmfüllend – **immer setzen**. |

**Code-Fences im Block:**

| Fence | Wirkung |
| --- | --- |
| ```` ```html ```` | kommt in den `<body>` |
| ```` ```css ```` | kommt in ein `<style>` im `<head>` |
| ```` ```js ```` | kommt in ein `<script>` – **im Lernpfad nicht verwendet** |
| ```` ```html template ```` | ersetzt das **ganze** Grundgerüst; `###HTML###`, `###CSS###` und `###JS###` sind die Platzhalter |

Je Sprache wird nur der **erste** Fence ausgewertet. Vorschau links, Editor rechts, dazwischen eine verschiebbare Trennlinie. Unten am Editor: Zurücksetzen, Herunterladen, Vollbild.

**Zur Höhe:** Vorschau und Editor liegen nebeneinander und teilen sich die volle
Blockhöhe. Sichtbar ist immer nur ein Reiter, maßgeblich ist deshalb die
**längste** Datei des Blocks. Eine Zeile misst rund 21 px, dazu kommen etwa
100 px für Reiter und Knöpfe:

```
height = min(640, max(300, laengste_datei * 21 + 100))
```

Blöcke mit einem **leeren** Fence bekommen mindestens 460 px – dort soll ja
etwas hineingeschrieben werden. Die Höhen im Lernpfad sind nach dieser Regel
gesetzt.

## Was funktioniert

Alles, was der Browser kann – die Vorschau ist ein echtes `iframe`:

- sämtliches HTML einschließlich `figure`, `picture`, `details`, `dialog`
- Bilder aus `public/` (`/images/…`) **und** von fremden Adressen
- `loading="lazy"`, `width`/`height`, `srcset`
- modernes CSS: eigene Eigenschaften und `var()`, Flexbox, Grid mit
  `repeat(auto-fit, minmax(…, 1fr))`, `gap`, `aspect-ratio`, `place-items`,
  `clamp()`, `min()`, `max()`, logische Eigenschaften (`margin-block`,
  `padding-inline`, `border-inline-start`), `hsl()` mit Schrägstrich-Alpha,
  `color-scheme`
- `@media`, auch `prefers-color-scheme` und `prefers-reduced-motion`
- `@supports`

## Was zu beachten ist

**Der Browser meldet keine Fehler.** Fehlerhaftes HTML repariert er still,
ungültige CSS-Deklarationen verwirft er wortlos. Es gibt also nichts, was einer
Fehlerliste entspricht – anders als bei der Java- und der SQL-IDE.

Für die Didaktik ist das ein **Vorteil**: Aufgaben vom Typ „finde den Fehler"
funktionieren hier, weil die Rückmeldung die **falsche Darstellung** ist und
nicht eine Meldung, die den Fehler schon benennt. Genau deshalb gibt es in
Kapitel 3 zwei solche Aufgaben.

Für die Qualitätssicherung heißt es umgekehrt: Was die Prüfwerkzeuge nicht
finden, findet niemand.

**JavaScript vermeiden.** Ein `js`-Fence läuft einmal gegen ein noch leeres
`<body>`, bevor der Client das HTML einsetzt. Skripte, die auf Elemente
zugreifen, werfen dabei einen Fehler. Im Unterrichtsvorhaben UV 10.2 ist
JavaScript ohnehin nicht vorgesehen.

**Der `head` ist unsichtbar.** In der Vorschau gibt es keinen Browsertab, ein
`<title>` bleibt also wirkungslos. Wo es um den `head` geht, braucht es einen
`html template`-Fence und einen Hinweis im Text.

## Werkzeuge

| Datei | Zweck |
| --- | --- |
| `check_lernpfad.py` | statisch: Aufbau der Seiten, Selbsttests, Passwörter, `webide`-Blöcke, **Wohlgeformtheit des HTML**, Klammern und Semikola im CSS, Bildverweise |
| `pruefe_seiten.js` | im Browser: Bilder, die nicht laden; CSS-Deklarationen, die der Browser verwirft (geprüft mit `CSS.supports`); Regeln ohne Deklaration; leere Vorschau |

Die Aufteilung folgt daraus, dass der Browser nichts meldet: Die
**Wohlgeformtheit** des HTML muss statisch geprüft werden, weil der Browser sie
stillschweigend herstellt. Die **Gültigkeit** des CSS lässt sich dagegen nur im
Browser prüfen, weil nur er weiß, welche Eigenschaften es gibt.

Vor jedem Commit alle Pruefungen des Repositorys starten:

```bash
python3 tools/pruefe-alles.py --schnell   # nur statisch, dauert Sekunden
python3 tools/pruefe-alles.py             # zusaetzlich Bauen und Browser
```

Das Skript findet die Pruefungen selbst und startet den Dev-Server bei Bedarf.
Einzeln gehen sie natuerlich auch:

```bash
python3 tools/web-lernpfad/check_lernpfad.py
NODE_PATH=/tmp/pw/node_modules node tools/web-lernpfad/pruefe_seiten.js
```

Für den zweiten muss `npx hyperbook dev` laufen. Playwright einmalig einrichten:

```bash
mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
```

**Absichtliche Fehler** kennzeichnet man im Quelltext mit dem Wort
*absichtlich* in einem Kommentar – `<!-- … absichtlich … -->` bzw.
`/* … absichtlich … */`. `check_lernpfad.py` überspringt solche Blöcke dann.
Für `pruefe_seiten.js` gibt es zusätzlich die Liste `ABSICHTLICH_FEHLERHAFT`.

Eine Uebersicht ueber alle Werkzeuge steht in `tools/README.md`.
