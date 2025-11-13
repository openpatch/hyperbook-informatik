---
name: Das PGM-Format
index: 9
scripts:
  - /wc/pixel-editor.js
---

# Das PGM-Format

:::snippet{#merken}
Das PGM-Format ("Portable Graymap") wird benutzt, um Graustufen-Bilder darzustellen.

Der Kopf eines PGM-Dokuments beginnt mit P2 (für das Format PGM), gefolgt von der Spalten- und Zeilenanzahl (hier 8 und 9).

```
P2
8 9
15
```

Bei dem PGM Dokument wurde der Kopf um eine weitere Zeile erweitert: Der Maximalwert für die Helligkeit (hier die Zahl 15 aus der dritten Zeile): Die Zahl 15 wurde als weiß festgelegt. Die Zahl 0 stellt die Farbe schwarz dar. Die Zahlen zwischen 0 und 15 stellen Graustufen dar.
:::

## Aufgabe

:::snippet{#aufgabe}
Erstelle ein PGM-Graustufen-Bild eines Hauses. Das Dach soll dunkler dargestellt sein als das Erdgeschoss. Die Fenster und Türen sollen am dunkelsten sein.
:::


<pixel-editor id="pbm-editor-haus-grau" readOnly>
P2
5 6
4
</pixel-editor>

:::collapsible{title="Hilfe"}
Du kannst folgenden Code kopieren und in das Leerfeld einfügen. Durch Veränderung der Zahl 4 (in 3,2,1 oder 0) kannst du die Farben im Bild verändern.

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
