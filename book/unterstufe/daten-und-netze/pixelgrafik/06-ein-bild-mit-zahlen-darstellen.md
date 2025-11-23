---
name: Ein Bild mit Zahlen darstellen
index: 6
scripts:
  - /wc/pixel-editor.js
---

# Ein Bild mit Zahlen darstellen

## Jetzt wird's spannend: Bilder aus Zahlen!

Du hast gelernt, dass jedes Bild aus vielen kleinen Pixeln besteht. Aber wie speichert der Computer diese Pixel? Die Antwort ist verblüffend einfach: mit Zahlen!

Lass uns mit dem einfachsten Fall anfangen: Schwarz-Weiß-Bilder.

## Aufgabe 1

Eine Möglichkeit, Bilder mit Pixeln darzustellen, bietet das **PBM-Format** ("Portable Bitmap"). Es besteht nur aus schwarzen und weißen Pixeln.

:::snippet{#aufgabe}
a) Erkunde die Codierung: Klicke auf die schwarzen und weißen Felder rechts und beobachte, was links im Code passiert.

**Finde heraus:** Wofür steht die Zahl 0? Wofür steht die Zahl 1?

b) Gestalte dein eigenes Bild: Verändere den Code so, dass anstatt des Herzes ein Haus, ein Gesicht oder ein anderes Motiv deiner Wahl dargestellt wird.
:::

<pixel-editor id="pbm-editor-herz">
P1
5 5
---
0 1 0 1 0
1 0 1 0 1
1 0 0 0 1
0 1 0 1 0
0 0 1 0 0
</pixel-editor>

## Aufgabe 2

:::snippet{#aufgabe}
Verändere den Smiley so, dass er verschiedene Stimmungen zeigt (traurig, neutral, lachend, zwinkern, ...). Probiere mindestens drei verschiedene Gesichtsausdrücke aus!
:::

<pixel-editor id="pbm-editor-smiley">
P1
9 9
---
0 0 1 1 1 1 1 0 0
0 1 0 0 0 0 0 1 0
1 0 0 1 0 1 0 0 1
1 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 0 1
1 0 1 0 0 0 1 0 1
1 0 0 1 1 1 0 0 1
0 1 0 0 0 0 0 1 0
0 0 1 1 1 1 1 0 0
</pixel-editor>
