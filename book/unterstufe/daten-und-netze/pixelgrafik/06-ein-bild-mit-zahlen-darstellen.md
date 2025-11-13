---
name: Ein Bild mit Zahlen darstellen
index: 6
scripts:
  - /wc/pixel-editor.js
---

# Ein Bild mit Zahlen darstellen

In dem Lernschritt "Bilder vergrößern" hast du gelernt, dass jedes Bild einer Pixelgrafik aus vielen kleinen Quadraten, sogenannten Pixeln, besteht.

## Aufgabe 1

Eine Möglichkeit, Bilder mit Pixeln darszustellen, bietet das PBM-Format ("Portable Bitmap"). Es besteht nur aus schwarzen und weißen Pixeln.

:::snippet{#aufgabe}
a) Erkunde die folgende Codierung mit der dazugehörigen Grafik: Verändere den Code, indem du auf die schwarzen und weißen Felder klickst. Wofür stehen die Zahlen 0 und 1?

b) Verändere den Code so, dass anstatt des Herzes ein Haus oder ein Gesicht dargestellt wird.
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
Verändere den Smiley so, dass noch weitere Stimmungen (traurig, neutral, lachend,...) darstellt. 
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
