---
name: Noch mehr Zeichen
index: 5
scripts:
  - /wc/binary-to-ascii.js
---

# Noch mehr Zeichen

Die Zeichen, die man mit 7 oder 8 Bit codieren kann, reichen für englische Texte oft aus. Allerdings gibt es natürlich noch Umlaute, französische Akzente, chinesische Schriftzeichen und viele Symbole, für die man gerne Codierungen hätte. Deshalb gibt es verschiedene Erweiterungen der ASCII-Tabelle.

Eine der wichtigsten Erweiterungen stellt Unicode dar. Die Unicodetabelle enthält viele tausend Zeichen, weshalb man für die Codierung eines Zeichens prinzipiell auch mehr Bits benötigt. Es gibt verschiedene Varianten der Codierung, wir betrachten hier die Variante, bei der Zeichen mit 16 Bits - also 2 Byte - gespeichert werden. 

## Aufgabe 1 - Codieren mit Unicode

:::snippet{#aufgabe}
Probiere verschiedene Zeichen aus, z.B. Umlaute (ä, ö, ü), französische Akzente (é, è, à), chinesische Schriftzeichen (你,好) oder Symbole (♥, ★).
:::

:::collapsible{title="Hilfe"}
Hier sind einige Unicode-Codes für verschiedene Zeichen:
| Zeichen | Binärcode          |
|---------|-------------------|
| ä       | 00000000 11100100 |
| ö       | 00000000 11110110 |
| ü       | 00000000 11111100 |
| é       | 00000000 11101001 |
| è       | 00000000 11101000 |
| à       | 00000000 11100000 |
| 你      | 01001111 01100000 |
| 好      | 01011001 01111101 |
| ♥       | 00100110 01100101 |
| ★       | 00100110 00000101 |
:::

<binary-to-ascii id="binaercode-reihen-noch-mehr-zeichen" mode="unicode"></binary-to-ascii>
