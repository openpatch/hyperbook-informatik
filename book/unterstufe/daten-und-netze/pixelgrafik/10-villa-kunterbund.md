---
name: Villa Kunterbund
index: 10
scripts:
  - /wc/pixel-editor.js
  - /wc/card-matching.js
---

# Villa Kunterbunt

## Endlich wird es bunt!

Jetzt hast du gelernt:
- Mit 0 und 1 kannst du schwarz-weiße Bilder machen
- Mit mehr Zahlen kannst du Graustufen darstellen

Aber wie macht der Computer **bunte** Bilder? Das schauen wir uns jetzt an!

Hier siehst du ein buntes Bild der Villa Kunterbunt und die dazugehörigen Zahlen.

**Wichtig:** Jedes farbige Kästchen wird mit **drei Zahlen** dargestellt! 
Zum Beispiel: Das Kästchen ganz links oben hat die Zahlen **1 1 1**.

<pixel-editor id="pbm-editor-haus-bunt" readOnly>
P3
5 6
1
---
1 1 1   1 1 1   1 0 0   1 1 1   1 1 1
1 1 1   1 0 0   1 0 0   1 0 0   1 1 1
1 0 0   1 0 0   1 0 0   1 0 0   1 0 0
0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
0 1 0   0 0 1   0 0 1   0 1 0   0 1 0
0 1 0   0 0 1   0 0 1   0 1 0   0 1 0
</pixel-editor>

## Aufgabe 1

::embed{src="https://learningapps.org/show.php?id=p5901p2u320"}

## Aufgabe 2

:::snippet{#aufgabe}
Verändere die Villa Kunterbunt so, dass sie **genau** wie auf diesem Bild aussieht:

![Villa Kunterbunt](canvas.png)

**Tipp:** Verändere die Dreierpakete der Zahlen!
:::

<pixel-editor id="pbm-editor-haus-rgb-mirror" readOnly>
P3
5 6
1
---
1 1 1   1 1 1   1 0 0   1 1 1   1 1 1
1 1 1   1 0 0   1 0 0   1 0 0   1 1 1
1 0 0   1 0 0   1 0 0   1 0 0   1 0 0
0 1 0   0 1 0   0 1 0   0 1 0   0 1 0
0 1 0   0 0 1   0 0 1   0 1 0   0 1 0
0 1 0   0 0 1   0 0 1   0 1 0   0 1 0
</pixel-editor>