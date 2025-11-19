---
name: Anatomie einer HTML-Datei
lang: de
index: 1
---

# Anatomie einer HTML-Datei

Eine HTML-Datei besteht aus verschiedenen Teilen. Diese sind notwendig, damit der Browser weiß, wie er die Datei interpretieren soll.

## Grundgerüst

Das Grundgerüst einer HTML-Datei sieht so aus:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titel der Webseite</title>
</head>
<body>
    <!-- Hier kommt der Inhalt der Webseite hin -->
</body>
</html>
```

### <!DOCTYPE html>

Die erste Zeile `<!DOCTYPE html>` ist ein sogenannter Doctype. Er gibt an, dass es sich um eine HTML-Datei handelt. Der Browser weiß dadurch, dass er den Inhalt als HTML interpretieren soll.

### <html lang="de">...</html>

Das `<html>`-Element ist das Wurzelelement einer HTML-Datei. Es umschließt den gesamten Inhalt der Datei. Mit dem Attribut `lang="de"` gibst du die Sprache der Webseite an. In diesem Fall ist es Deutsch.

### <head>...</head>

Der `<head>`-Bereich enthält Metadaten, die für den Browser wichtig sind. Hier kannst du zum Beispiel den Titel der Webseite festlegen oder die Zeichenkodierung angeben.

### <meta charset="UTF-8">

Mit dem `<meta charset="UTF-8">`-Element legst du die Zeichenkodierung der Webseite fest. UTF-8 ist eine weit verbreitete Kodierung, die alle Zeichen darstellen kann.

### <meta name="viewport" content="width=device-width, initial-scale=1.0">

Das `<meta name="viewport">`-Element ist wichtig für die Darstellung auf mobilen Geräten. Mit `width=device-width` passt sich die Webseite der Breite des Geräts an. `initial-scale=1.0` gibt den Zoomfaktor an.

### <title>Titel der Webseite</title>

Setzt den Titel der Webseite, der im Browser-Tab angezeigt wird.

### <body>...</body>

Der `<body>`-Bereich enthält den eigentlichen Inhalt der Webseite. Hier stehen Überschriften, Texte, Bilder und andere Elemente, die auf der Webseite sichtbar sind.

## Ausprobieren

Nutze die WebIDE, um das Grundgerüst einer HTML-Datei auszuprobieren. Ändere zum Beispiel den Titel der Webseite oder füge einen Text im `<body>`-Bereich hinzu. Schau dir an, wie sich die Änderungen auf die Darstellung der Webseite auswirken.

:::webide

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titel der Webseite</title>
</head>
<body>
    <!-- Hier kommt der Inhalt der Webseite hin -->
</body>
</html>
```

```html template
###HTML###
```

:::