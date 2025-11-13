---
name: Das PBM-Format
scripts:
  - /wc/pixel-editor.js
index: 7
---

# Das PBM-Format

:::snippet{#merken}
Das PBM-Format ("Portable Bitmap") wird benutzt, um zweifarbige Bilder darzustellen. Die Zahl **0** steht für die Farbe weiß, die Zahl **1** für die Farbe schwarz.

Um die Größe eines PBM-Dokuments zu verändern, kann man den Kopf (die ersten beiden Zeilen) verändern.

```
P1
5 6
```

- Die erste Zeile (**P1**) steht für das **Format** PBM (denn es gibt auch noch andere Formate, die wir auf den kommenden Seiten kennen lernen)
- Die zweite Zeile gibt an, aus wie vielen **Spalten** (hier **5**) und wie vielen **Zeilen** (hier auch **6**) ein PBM Dokument bestehen soll.
:::

## Aufgabe 1

:::snippet{#aufgabe}
Erkunde den **Kopf** des PBM-Dokuments, indem du weitere Spalten und Zeilen hinzufügst, um ein größeres Haus zu zeichnen.

Brauchst du dazu zum Beispiel 7 Spalten und 3 Zeilen, dann schreibe in die zweite Zeile "7 3" anstatt "5 5".

Das Bild kannst du verändern, indem du links im Editor die zeichen veränderst:
:::

<pixel-editor id="pbm-editor-haus" readOnly>
P1
5 5
0 0 1 0 0
0 1 0 1 0
1 0 0 0 1
1 0 0 0 1
1 1 1 1 1
</pixel-editor>
