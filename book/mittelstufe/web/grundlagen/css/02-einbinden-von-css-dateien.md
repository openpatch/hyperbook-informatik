---
name: Einbinden von CSS-Dateien
lang: de
index: 2
---

# Einbinden von CSS-Dateien

CSS-Dateien werden in HTML-Dokumente eingebunden, um das Aussehen von HTML-Elementen zu definieren. Dazu wird das `<link>`-Element verwendet. Das `<link>`-Element wird im `<head>`-Bereich des HTML-Dokuments platziert und verweist auf die CSS-Datei, die eingebunden werden soll.

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>Meine Webseite</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Willkommen auf meiner Webseite</h1>
    <p>Hier steht der Inhalt meiner Webseite.</p>
  </body>
</html>
```

In diesem Beispiel wird die CSS-Datei `styles.css` eingebunden. Die CSS-Datei muss sich im gleichen Verzeichnis wie das HTML-Dokument befinden, damit sie korrekt eingebunden wird. Wenn sich die CSS-Datei in einem anderen Verzeichnis befindet, muss der Pfad zur CSS-Datei entsprechend angepasst werden.

```html
<link rel="stylesheet" href="pfad/zur/css-datei/styles.css" />
```

Am besten setzt man den Pfad absolut, um sicherzustellen, dass die CSS-Datei immer gefunden wird, unabhängig davon, wo sich das HTML-Dokument befindet.

```html
<link rel="stylesheet" href="/pfad/zur/css-datei/styles.css" />
```

Es können auch mehrere CSS-Dateien in einem HTML-Dokument eingebunden werden, indem mehrere `<link>`-Elemente verwendet werden.

```html
<link rel="stylesheet" href="/styles.css" />
<link rel="stylesheet" href="/more-styles.css" />
```

:::alert{info}
Die Reihenfolge, in der die CSS-Dateien eingebunden werden, ist wichtig, da die zuletzt eingebundene CSS-Datei Vorrang hat. Wenn also zwei CSS-Dateien die gleiche Eigenschaft für dasselbe Element definieren, wird die Eigenschaft aus der zuletzt eingebundenen CSS-Datei verwendet.
:::