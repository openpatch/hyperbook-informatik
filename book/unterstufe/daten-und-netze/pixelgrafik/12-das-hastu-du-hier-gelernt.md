---
name: Das hast du hier gelernt
index: 12
next:
---

# Das hast du hier gelernt

## Zusammenfassung

Herzlichen Glückwunsch! Du hast jetzt gelernt, wie Computer Bilder speichern und darstellen. Das war eine spannende Reise von einfachen Schwarz-Weiß-Bildern bis hin zu bunten Farbbildern!

:::snippet{#merken}
**Die wichtigsten Erkenntnisse:**

- **Pixel sind Bildpunkte:** Eine Pixelgrafik besteht aus vielen kleinen Quadraten, den sogenannten Pixeln (Bildpunkten). Diese siehst du, wenn du ein Bild stark vergrößerst. Der Computer braucht diese Pixel, um Bilder zu codieren.

- **Der Kopf gibt wichtige Informationen:** Jede Pixelgrafik hat einen Kopf, in dem das Format und die Größe des Bildes stehen. Zum Beispiel:

```
P1
5 5
```

Das bedeutet: PBM-Format mit 5 Spalten und 5 Zeilen.

- **PBM für Schwarz-Weiß:** Um Schwarz-Weiß-Bilder darzustellen, verwendet man das **PBM-Format** ("Portable Bitmap"). Bei diesem Format nutzt man nur zwei Zahlen:
  - **0** = weiß
  - **1** = schwarz

- **PGM für Graustufen:** Um Graustufen-Bilder darzustellen, verwendet man das **PGM-Format** ("Portable Graymap"). Im Kopf steht in der dritten Zeile ein Maximalwert für die Helligkeit. Zum Beispiel:

```
P2
8 9
15
```

Das bedeutet: PGM-Format mit 8 Spalten, 9 Zeilen und Maximalwert 15.
  - **0** = schwarz
  - **15** = weiß (weil 15 der Maximalwert ist)
  - **Zahlen dazwischen** (1-14) = Graustufen

- **PPM für bunte Bilder:** Um bunte RGB-Bilder darzustellen, verwendet man das **PPM-Format** ("Portable Pixmap"). Jedes Pixel wird mit drei Zahlen codiert (Rot-Grün-Blau):
  - Erste Zahl = Rotanteil
  - Zweite Zahl = Grünanteil  
  - Dritte Zahl = Blauanteil
  
  Beispiele: **1 0 0** = Rot, **0 1 0** = Grün, **1 1 0** = Gelb
:::

## Du hast noch nicht genug von Pixelgrafiken?

### Probiere Piskel aus!

Schaue dir [Piskel](https://www.piskelapp.com/) an - ein kostenloser Online-Pixelgrafik-Editor! Damit kannst du:

- Eigene Pixelgrafiken erstellen
- Charaktere und Objekte für Spiele entwerfen
- Sogar Animationen erstellen (bewegte Bilder!)
- Deine Werke als Datei speichern und teilen

**Tipp:** Versuche, eine kleine Animation einer laufenden Figur oder eines wehenden Baumes zu erstellen. Mit Piskel wird jedes Einzelbild (Frame) zu einer eigenen Pixelgrafik!

Viel Spaß beim Experimentieren! 🎨