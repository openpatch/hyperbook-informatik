---
name: Das PBM-Format
scripts:
  - /wc/pixel-editor.js
index: 7
---

# Das PBM-Format

## Der Aufbau eines PBM-Dokuments

:::snippet{#merken}
Das **PBM-Format** ("Portable Bitmap") wird benutzt, um zweifarbige Bilder darzustellen. Die Zahl **0** steht für die Farbe weiß, die Zahl **1** für die Farbe schwarz.

Jedes PBM-Dokument hat einen **Kopf** (die ersten beiden Zeilen), der dem Computer wichtige Informationen gibt:

```
P1
5 6
```

- Die erste Zeile (**P1**) sagt dem Computer: "Dies ist ein PBM-Dokument!"
- Die zweite Zeile gibt die Größe an: **5 Spalten** (Breite) und **6 Zeilen** (Höhe)

Danach folgen die Zahlen für die Pixel: 0 für weiß, 1 für schwarz.
:::

## Aufgabe 1

:::snippet{#aufgabe}
Erweitere das kleine Haus, indem du mehr Spalten und Zeilen hinzufügst:

**So geht's:**
1. Klicke in den Editor links
2. Ändere die zweite Zeile (z.B. von "5 5" auf "7 6" für ein breiteres Haus)
3. Füge die passenden Zahlen für die neuen Pixel hinzu

**Ideen:** Zeichne ein größeres Haus mit Fenstern, Tür und Schornstein!
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
