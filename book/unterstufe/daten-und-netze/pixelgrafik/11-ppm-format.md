---
name: Das PPM-Format
index: 11
scripts:
  - /wc/pixel-editor.js
---

# Das PPM-Format

## Wie funktionieren bunte Bilder?

:::snippet{#merken}
Das **PPM-Format** ("Portable Pixmap") wird benutzt, um bunte Bilder darzustellen.

Der Kopf eines PPM-Dokuments sieht so aus:

```
P3
5 6
1
```

**Das bedeutet:**
1. **P3** = Das Format ist PPM (also bunte RGB-Bilder)
2. **5 6** = Das Bild hat 5 Spalten und 6 Zeilen
3. **1** = Der Maximalwert für die Helligkeit

**RGB = Rot + Grün + Blau**

Jedes Pixel wird mit einem "Dreierpäckchen" aus drei Zahlen dargestellt:
- **Erste Zahl** = Wie viel Rot?
- **Zweite Zahl** = Wie viel Grün?
- **Dritte Zahl** = Wie viel Blau?

Beispiele mit Maximalwert 1:

![RGB](./rgb.png)-{width="200px"}

- **1 0 0** = Rot (nur Rot, kein Grün, kein Blau)
- **0 1 0** = Grün (kein Rot, nur Grün, kein Blau)
- **0 0 1** = Blau (kein Rot, kein Grün, nur Blau)
- **0 0 0** = Schwarz (keine Farbe)
- **1 1 1** = Weiß (alle Farben zusammen)
- **1 1 0** = Gelb (Rot + Grün)
- **1 0 1** = Magenta/Rosa (Rot + Blau)
- **0 1 1** = Cyan/Hellblau (Grün + Blau)
:::

## Aufgabe 1

:::snippet{#aufgabe}
Verändere das Bild der Ente so, dass:
- Der Körper **gelb** ist
- Der Schnabel **rot** ist  
- Das Auge **schwarz** ist

Speichere dein Werk unter einem passenden Namen ab.
:::

:::collapsible{title="Tipp"}
**So geht's:**
- Für gelb brauchst du: Rot + Grün (also 1 1 0)
- Für rot brauchst du: nur Rot (also 1 0 0)
- Für schwarz brauchst du: keine Farbe (also 0 0 0)

Du musst in jedem "Dreierpäckchen" die Zahlen richtig anpassen!
:::

<pixel-editor id="ppm-editor-ente-rgb" readOnly>
P3
9 6
1
1 1 1   1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   1 1 1   1 1 1
1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   1 1 1
1 1 1   1 1 1   1 0 1   0 1 0   1 0 0   0 1 0   0 1 0   0 1 0   0 1 0
1 0 1   1 0 1   1 0 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
1 1 1   1 0 1   1 0 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
1 1 1   1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   0 1 0   1 1 1
</pixel-editor>

## Aufgabe 2

:::snippet{#aufgabe}
**Experimentiere mit dem Maximalwert:**

Verändere den Maximalwert der Helligkeit (die **1** in der dritten Zeile) zur Zahl **2**. 

Jetzt kannst du noch viel mehr Farben darstellen! Mit den Zahlen 0, 1 und 2 in verschiedenen Kombinationen kannst du z.B. Orange oder andere Farbtöne mischen.

**Finde heraus:** Welche neuen Farben kannst du mit dem Maximalwert 2 erstellen?
:::

<pixel-editor id="ppm-editor-ente-rgb-more" readOnly>
P3
9 6
1
1 1 1   1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   1 1 1   1 1 1
1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   1 1 1
1 1 1   1 1 1   1 0 1   0 1 0   1 0 0   0 1 0   0 1 0   0 1 0   0 1 0
1 0 1   1 0 1   1 0 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
1 1 1   1 0 1   1 0 1   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
1 1 1   1 1 1   1 1 1   1 1 1   0 1 0   0 1 0   0 1 0   0 1 0   1 1 1
</pixel-editor>

:::collapsible{title="Tipp"}
In jedem "Dreierpäckchen" kannst du nun die Zahlen **0, 1 und 2** verwenden.

Probiere zum Beispiel:
- **2 1 0** für Orange (viel Rot, wenig Grün, kein Blau)
- **2 0 2** für kräftiges Magenta
- **1 2 1** für helles Grün
:::