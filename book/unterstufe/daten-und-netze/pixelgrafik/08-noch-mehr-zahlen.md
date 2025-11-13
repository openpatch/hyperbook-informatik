---
name: Noch mehr Zahlen...
index: 8
scripts:
  - /wc/pixel-editor.js
---

# Noch mehr Zahlen...

Der Computer kann natürlich nicht nur scharz-weiße Bilder mit 0 und 1, sondern auch Bilder in verschiedenen Graustufen verarbeiten.

## Aufgabe 1

:::snippet{#aufgabe}
Ersetze in dem Code alle 1er durch 4en: Was passiert mit dem Schnabel der Ente?

Erkunde: Was bedeuten die Zahlen 0-5? 
:::

<pixel-editor id="pbm-editor-ente-grau">
P2
9 6
5
---
5 5 5 5 3 3 3 5 5
5 5 5 3 3 3 3 3 5
5 5 1 3 0 3 3 3 3
1 1 1 3 3 3 3 3 3
5 1 1 3 3 3 3 3 5
5 5 5 5 3 3 3 5 5
</pixel-editor>

## Aufgabe 2

:::snippet{#aufgabe}
Finde durch Ausprobieren heraus, was die Zahl 15 aus der dritten Zeile bedeuten könnte (setze für diese z.B. 20, 50 oder 100 ein). 
:::


<pixel-editor id="pbm-editor-schiff">
P2
8 9
15
---
15 15 15 10 15 15 15 15
15 15 15 10 10 15 15 15
15 15 10 10 10 10 15 15
15 15 10 10 10 10 10 15
15 10 10 10 10 10 10 10
15 15 15 04 15 15 15 15
00 00 00 00 00 00 00 00
15 00 00 00 00 00 00 15
15 15 00 00 00 00 15 15
</pixel-editor>
