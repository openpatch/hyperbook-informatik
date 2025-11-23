---
name: Das PGM-Format
index: 9
scripts:
  - /wc/pixel-editor.js
---

# Das PGM-Format

## Graustufen-Bilder richtig codieren

:::snippet{#merken}
Das **PGM-Format** ("Portable Graymap") wird benutzt, um Graustufen-Bilder darzustellen.

Der Kopf eines PGM-Dokuments hat jetzt **drei Zeilen**:

```
P2
8 9
15
```

**Das bedeutet:**
1. **P2** = Das Format ist PGM (also Graustufen statt nur Schwarz-Weiß)
2. **8 9** = Das Bild hat 8 Spalten (Breite) und 9 Zeilen (Höhe)
3. **15** = Der **Maximalwert für die Helligkeit**

**Die Zahlen im Bild bedeuten:**
- **0** = Schwarz (dunkelste Farbe)
- **15** = Weiß (hellste Farbe, weil 15 unser Maximalwert ist)
- **Zahlen dazwischen** (1-14) = Graustufen von dunkel nach hell

Je höher der Maximalwert, desto mehr verschiedene Graustufen kannst du verwenden!
:::

## Aufgabe

:::snippet{#aufgabe}
Erstelle ein PGM-Graustufen-Bild eines Hauses:

**Anforderungen:**
- Das Dach soll **dunkel** sein (kleine Zahlen)
- Das Erdgeschoss soll **heller** sein (mittlere Zahlen) 
- Die Fenster und Türen sollen am **dunkelsten** sein (0 oder sehr kleine Zahlen)

Benutze die Hilfe unten, wenn du nicht weiterkommst!
:::


<pixel-editor id="pbm-editor-haus-grau" readOnly>
P2
5 6
4
</pixel-editor>

:::collapsible{title="Hilfe"}
**Tipp:** Du kannst folgenden Code als Startpunkt kopieren und in das leere Feld einfügen. 

Verändere dann die Zahlen:
- 0 = schwarz
- 5 = weiß (weil wir 5 als Maximalwert haben)
- 1, 2, 3, 4 = verschiedene Graustufen

```
P2
5 6 
5
4 4 4 4 4 
4 4 4 4 4 
4 4 4 4 4 
4 4 4 4 4 
4 4 4 4 4
4 4 4 4 4 
```
:::
