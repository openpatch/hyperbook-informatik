---
name: Web Components
hide: true
scripts:
  - /wc/binary-to-ascii.js
  - /wc/bit-rows.js
  - /wc/card-matching.js
  - /wc/category-drag.js
  - /wc/coin-rows.js
  - /wc/memory-game.js
  - /wc/pixel-editor.js
  - /wc/pixel-magnifier.js
  - /wc/pixel-minifier.js
  - /wc/rock-paper-scissors.js
---

# Web Components

## Binary to ASCII

Konvertiert Binärwerte in ASCII- oder Unicode-Zeichen. Die Komponente zeigt eine interaktive Bit-Darstellung, bei der Bits durch Klicken umgeschaltet werden können.

| Attribute | Type   | Description                                                    |
|-----------|--------|----------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands             |
| `mode`    | String | Modus: `"ascii"` (7 Bit, Standard) oder `"unicode"` (16 Bit)  |

**Beispiel:**
```html
<binary-to-ascii id="ascii-demo"></binary-to-ascii>
<binary-to-ascii id="unicode-demo" mode="unicode"></binary-to-ascii>
```

<binary-to-ascii id="wc-ascii-demo"></binary-to-ascii>

---

## Bit Rows

Zeigt interaktive Bit-Reihen an. Bits können zwischen 0 und 1 umgeschaltet werden. Reihen und Bits können dynamisch hinzugefügt oder entfernt werden.

| Attribute | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands |

**Beispiel:**
```html
<bit-rows id="bits-demo"></bit-rows>
```

<bit-rows id="wc-bits-demo"></bit-rows>

---

## Card Matching

Ein Zuordnungsspiel, bei dem Karten durch Ziehen miteinander verbunden werden. Die Verbindungen können durch Klicken auf das "Klebeband" wieder gelöst werden.

| Attribute | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands                          |
| `pairs`   | String | JSON-Array mit Kartenpaaren: `[{"blue": "text:...", "orange": "text:..."}]` |

**Format für `pairs`:**
- Text: `"text:Mein Text"`
- Bild: `"image:/pfad/zum/bild.png"`

**Beispiel:**
```html
<card-matching 
  id="matching-demo" 
  pairs='[
    {"blue": "text:Stein", "orange": "text:Rock"},
    {"blue": "text:Papier", "orange": "text:Paper"},
    {"blue": "image:/img/cat.png", "orange": "text:Katze"}
  ]'>
</card-matching>
```

---

## Category Drag

Drag-and-Drop-Spiel zum Zuordnen von Bildern zu Kategorien. Unterstützt bis zu 4 Kategorien und funktioniert auch auf Touch-Geräten.

| Attribute    | Type   | Description                                                           |
|--------------|--------|-----------------------------------------------------------------------|
| `id`         | String | Eindeutiger Bezeichner zum Speichern des Zustands                    |
| `items`      | String | Kommagetrennte Liste: `"bild1.png:kategorie1,bild2.png:kategorie2"`  |
| `categories` | String | Kategorien: `"id1:Label 1,id2:Label 2"`                               |

**Beispiel:**
```html
<category-drag 
  id="drag-demo"
  items="/img/apple.png:fruit,/img/carrot.png:vegetable"
  categories="fruit:Obst,vegetable:Gemüse">
</category-drag>
```

---

## Coin Rows

Zeigt Münzreihen an, die umgedreht werden können (Gold/Silber). Münzen und Reihen können dynamisch hinzugefügt oder entfernt werden.

| Attribute | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands |

**Beispiel:**
```html
<coin-rows id="coins-demo"></coin-rows>
```

<coin-rows id="wc-coins-demo"></coin-rows>

---

## Memory Game

Ein klassisches Memory-Spiel mit anpassbaren Bildern oder Standard-Emojis.

| Attribute | Type   | Description                                                                    |
|-----------|--------|--------------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands                             |
| `pairs`   | Number | Anzahl der Paare (nur für Emoji-Modus, Standard: 8)                           |
| `images`  | String | Kommagetrennte Bildliste: `"/img1.png,/img2.png,..."` (je 2 bilden ein Paar) |

**Beispiel:**
```html
<!-- Mit Emojis (Standard) -->
<memory-game id="memory-emoji" pairs="6"></memory-game>

<!-- Mit eigenen Bildern -->
<memory-game id="memory-custom" images="/img/cat1.png,/img/cat2.png,/img/dog1.png,/img/dog2.png"></memory-game>
```

---

## Pixel Editor

Interaktiver Editor für PBM/PGM/PPM-Bilddateien (Netpbm-Format). Unterstützt P1 (Bitmap), P2 (Graustufen) und P3 (RGB).

| Attribute  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| `id`       | String | Eindeutiger Bezeichner zum Speichern des Zustands      |
| `format`   | String | Bildformat: `"P1"`, `"P2"` oder `"P3"`                  |
| `data`     | String | Initiale Bilddaten im Netpbm-Format                     |
| `readonly` | Flag   | Deaktiviert das Anklicken von Pixeln (nur Anzeige)     |

**Beispiel:**
```html
<pixel-editor id="pixel-p1" format="P1"></pixel-editor>

<pixel-editor id="pixel-preset" data="P1
5 5
0 1 0 1 0
1 0 1 0 1
0 1 0 1 0
1 0 1 0 1
0 1 0 1 0"></pixel-editor>

<!-- Versteckte Header mit --- -->
<pixel-editor id="pixel-hidden" data="P1
5 5
---
0 1 0 1 0
1 0 1 0 1"></pixel-editor>
```

---

## Pixel Magnifier

Vergrößert ein Bild pixelgenau. Nützlich zur Demonstration von Pixelstrukturen.

| Attribute | Type   | Description                        |
|-----------|--------|------------------------------------|
| `src`     | String | Pfad zum zu vergrößernden Bild     |

**Beispiel:**
```html
<pixel-magnifier src="/img/small-icon.png"></pixel-magnifier>
```

---

## Pixel Minifier

Verkleinert ein Bild mit einem Schieberegler von 10% bis 100%.

| Attribute | Type   | Description                        |
|-----------|--------|------------------------------------|
| `src`     | String | Pfad zum zu verkleinernden Bild    |

**Beispiel:**
```html
<pixel-minifier src="/img/large-image.png"></pixel-minifier>
```

---

## Rock Paper Scissors

Schere-Stein-Papier-Brunnen-Spiel gegen den Computer mit optionalem Spielverlauf.

| Attribute       | Type   | Description                                          |
|----------------|--------|------------------------------------------------------|
| `id`           | String | Eindeutiger Bezeichner zum Speichern des Zustands   |
| `spielverlauf` | Flag   | Zeigt Spielverlauf-Panel an, wenn gesetzt           |

**Beispiel:**
```html
<!-- Ohne Spielverlauf -->
<rock-paper-scissors id="rps-simple"></rock-paper-scissors>

<!-- Mit Spielverlauf -->
<rock-paper-scissors id="rps-history" spielverlauf></rock-paper-scissors>
```

<rock-paper-scissors id="wc-rps-demo"></rock-paper-scissors>
