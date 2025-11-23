---
name: Das hast du hier gelernt?
index: 12
next:
---

# Das hast du hier gelernt?

:::snippet{#merken}
- Eine Pixelgrafik besteht aus vielen kleinen Quadraten, sogenannten Pixeln (Bildpunkten), diese sieht bei der Vergrößerung eines Bildes. Diese Pixel benötigt der Computer, um Bilder zu codieren.
- Jede Pixelgrafik besitzt einen Kopf im Dokument, in dem unter anderem das Format und die Spalten- und Zeilenanzahl stehen. Zum Beispiel: 

```
P1
5 5
```
(P1 = PBM Format mit 5 Spalten und 5 Zeilen.)

- Um Schwarz-Weiß-Bilder darzustellen, verwendet man das PBM-Format ("Portable Bitmap"). Bei diesem Format verwendet man nur die Zahlen 0 (=weiß) und 1 (=schwarz).
- Um Graustufen-Bilder darzustellen, verwendet man das PGM-Format ("Portable Graymap"). Bei diesem Format setzt man im Kopf in der dritten Zeile einen Maximalwert für die Helligkeit an, diese Zahl entspricht der Farbe weiß, die Zahl 0 entspricht der Farbe schwarz und die zahlen dazwischen entsprechen den Graustufen. 

```
P2
8 9
15
```
(P2 = PGM Format mit 8 Spalten, 9 Zeilen und dem Maximalwert 15 entspricht weiß, die Zahl 0 entspricht schwarz und alle Zahlen dazwischen entsprechen einer Graustufe.) 
:::