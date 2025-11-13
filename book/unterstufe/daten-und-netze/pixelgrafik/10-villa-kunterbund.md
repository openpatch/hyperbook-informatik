---
name: Villa Kunterbund
index: 10
scripts:
  - /wc/pixel-editor.js
  - /wc/card-matching.js
---

# Villa Kunterbund

Hier siehst du ein Bild der Villa Kunterbunt und die dazugehörigen Zahlen.

Jedes Kästen wird aus einer Zahlenkombination aus drei Ziffern zwischen 0 und 1 dargestellt: Zum Beispiel das Kästchen ganz links oben wird codiert mit 1 1 1.

<pixel-editor id="pbm-editor-haus-grau" readOnly>
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

<card-matching id="matching-farben" pairs='[
  {"blue": "image:blume1.jpg", "orange": "Animal"},
  {"blue": "Rose", "orange": "Flower"},
  {"blue": "Paris", "orange": "Capital"},
  {"blue": "Python", "orange": "Programming Language"},
  {"blue": "Guitar", "orange": "Musical Instrument"}
]'></card-matching>
