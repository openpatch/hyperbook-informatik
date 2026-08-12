---
name: Erste HTML-Datei
lang: de
index: 4
---

# Die erste HTML-Datei

## Das Ziel

Am Ende dieses Schritts hast du einen Projektordner, darin eine Datei `index.html`, und im Browser steht dein erster eigener Satz.

## So könnte das aussehen

Das hier ist das **Grundgerüst**, mit dem jede HTML-Datei anfängt. Änder ruhig etwas daran – rechts siehst du sofort, was passiert.

:::webide{id="ams-04-geruest" height="440px"}

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Amsterdam</title>
  </head>
  <body>
    <h1>Amsterdam</h1>
    <p>Eine Stadt aus Wasser, Rädern und Backstein.</p>
  </body>
</html>
```

```html template
###HTML###
```

:::

## Wie es gemacht ist

| Zeile | Wozu |
| --- | --- |
| `<!DOCTYPE html>` | „Das ist modernes HTML." Muss ganz oben stehen. |
| `<html lang="de">` | umschließt alles. `lang="de"` sagt Vorleseprogrammen, dass hier Deutsch steht. |
| `<head>` | Angaben **über** die Seite – nichts davon ist auf der Seite zu sehen. |
| `<meta charset="UTF-8">` | ohne diese Zeile werden aus Umlauten Kauderwelsch. |
| `<title>` | der Text im Browsertab. |
| `<body>` | der sichtbare Inhalt. |

:::snippet{#merken}
Der Dateiname **`index.html`** ist kein Zufall: Ruft jemand nur den Ordner auf, zeigt der Browser automatisch die Datei mit diesem Namen. Deine Startseite heißt deshalb immer so.
:::

Ausführlicher steht das im Lernpfad unter [Das Grundgerüst](/mittelstufe/web/02-html-inhalte-auszeichnen/01-das-grundgeruest).

## Deine Aufgabe

:::snippet{#aufgabe}
a) Leg einen Ordner für dein Projekt an. Nimm einen kurzen Namen ohne Leerzeichen und ohne Umlaute, zum Beispiel `meine-seite`.

b) Öffne den Ordner in deinem Editor: **Datei → Ordner öffnen**. Wichtig ist, dass du den **Ordner** öffnest, nicht die einzelne Datei – nur dann findet der Editor später deine anderen Dateien.

c) Leg darin die Datei `index.html` an und schreib das Grundgerüst hinein.

d) Ändere den `<title>` und die Überschrift auf **dein** Thema.

e) Starte die Vorschau (Rechtsklick auf die Datei → *Show Preview*) und ändere den Text. Die Vorschau aktualisiert sich beim Speichern.
:::

::::collapsible{title="Tipp 1: Der Editor tippt mit"}

Schreib in der leeren Datei nur ein Ausrufezeichen `!` und drück dann die Tabulatortaste. VS Code füllt das ganze Grundgerüst für dich aus. Danach musst du nur noch `lang="en"` in `lang="de"` ändern.

Das ist kein Schummeln – so arbeiten alle. Wissen musst du trotzdem, was die Zeilen bedeuten.

::::

::::collapsible{title="Tipp 2: Die Vorschau bleibt leer"}

Drei Ursachen kommen infrage:

1. Die Datei ist nicht gespeichert. Mit `Strg`+`S` (macOS: `Cmd`+`S`) speichern.
2. Die Datei heißt nicht `index.html`, sondern zum Beispiel `index.html.txt`. In der Dateiliste des Editors nachsehen.
3. Der Text steht im `<head>` statt im `<body>`. Nur was im `<body>` steht, ist zu sehen.

::::

:::protect{password="ams-04-1" description="Eine mögliche Umsetzung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

`index.html`

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gelsenkirchen</title>
  </head>
  <body>
    <h1>Gelsenkirchen</h1>
    <p>Eine Stadt, die mehr ist als ihr Ruf.</p>
  </body>
</html>
```

Prüf zum Schluss dreierlei:

- Steht im Browsertab dein Titel?
- Erscheinen Umlaute richtig? Wenn nicht, fehlt die `charset`-Zeile.
- Liegt die Datei wirklich in deinem Projektordner und nicht daneben?

:::
