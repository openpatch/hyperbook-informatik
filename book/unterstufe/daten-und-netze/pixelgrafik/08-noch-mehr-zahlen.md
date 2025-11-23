---
name: Noch mehr Zahlen...
index: 8
scripts:
  - /wc/pixel-editor.js
---

# Noch mehr Zahlen...

## Von Schwarz-Weiß zu Graustufen

Du kannst jetzt Bilder nur mit den Zahlen 0 und 1 erstellen - aber das sind nur zwei Farben: schwarz und weiß. Das ist ganz schön eingeschränkt, oder?

Der Computer kann natürlich viel mehr! Mit mehr Zahlen kann er auch **Graustufen** darstellen - also alle Farben zwischen schwarz und weiß.

## Aufgabe 1

:::snippet{#aufgabe}
**Experimentiere mit den Zahlen:**

a) Ersetze im Code alle 1er durch 4en. Was passiert mit dem Schnabel der Ente?

b) Finde heraus: Was bedeuten die verschiedenen Zahlen von 0 bis 5? 
   - Welche Zahl ist am dunkelsten? 
   - Welche Zahl ist am hellsten?
   - Was liegt dazwischen?
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
Jetzt wird's knifflig! 

Finde durch Ausprobieren heraus, was die Zahl **15** in der dritten Zeile bedeutet:
- Probiere stattdessen mal 20, 50 oder 100 aus
- Beobachte genau, was sich am Bild ändert
- Was könntest du mit einer größeren Zahl erreichen?
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
