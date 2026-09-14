---
name: Die AHs - Einsteiger
hide: true
permaid: daten-text-ahs-einsteiger
scripts:
  - /wc/bit-rows.js
prev: ./02-die-ahs
next: ./03-die-menschen
---

# Die AHs - Einsteiger 👾

## 🪐 Neuer Planet, neue Herausforderung!

Etwas näher an der Erde wohnen die AHs. Dieses Alien-Volk ist schon etwas fortgeschrittener - sie kennen die Buchstaben von **A bis H** (das sind 8 Buchstaben!).

Die Einwohner heißen z.B.:
- **FEBE** (die Königin)
- **CHABA**
- **DEBAHA**

Das hier ist Königin **FEBE**: 

![Eine AH mit dem Namen FEBE](./alien-1295484.svg){width="150px"}

## 🤯 Das Problem

Bei den ABABs war es einfach: 2 Buchstaben = 1 Bit (eine Stelle mit 0 oder 1).

Aber die AHs haben 8 Buchstaben! Wie sollen wir die mit 0 und 1 darstellen?

## 💭 Linas Versuch

Lina hatte eine Idee und hat diese Tabelle erstellt:

| Buchstabe | Codierung | Anzahl Bits |
| --------- | --------- | ----------- |
| A         | 1         | 1 Bit       |
| B         | 0         | 1 Bit       |
| C         | 10        | 2 Bits      |
| D         | 11        | 2 Bits      |
| E         | 100       | 3 Bits      |
| F         | 010       | 3 Bits      |
| G         | 001       | 3 Bits      |
| H         | 000       | 3 Bits      |

:::alert{info}
**Linas Idee:** Einfach mehr Nullen und Einsen hintereinander schreiben!
:::

## 🎮 Aufgabe 1 - Teste Linas Code

:::snippet{#aufgabe}
**Probiere es aus:** Codiere den Namen **FEBE** mit Linas Tabelle.

**Schritt für Schritt:**
1. Suche F in der Tabelle → `010`
2. Suche E in der Tabelle → `100`  
3. Suche B in der Tabelle → `0`
4. Suche E in der Tabelle → `100`
5. Schreibe alles hintereinaner.
:::

**Dein Code-Werkzeug:**

<bit-rows id="binaercode-reihen-mittel-ahs"></bit-rows>

## 🕵️ Aufgabe 2 - Detektivarbeit gefragt!

:::snippet{#aufgabe}
**Tim hat ein Problem entdeckt!** 🚨

Er sagt, dass Linas Codierung **nicht eindeutig** ist. Der Code `10010` könnte zwei verschiedene Namen bedeuten.

Lass uns das überprüfen:

**Variante 1:** 10010 = ?
- 10 (= C) + 010 (= F) = **CF**  

**Variante 2:** 10010 = ?
- 1 (= A) + 0 (= B) + 0 (= B) + 1 (= A) + 0 (= B) = **ABBAB**

**Siehst du das Problem?** 

Schreibe deine Erklärung, warum das ein Problem ist:
:::

::textinput{placeholder="Erkläre hier, warum Linas Code nicht funktioniert..." height="200px"}

:::collapsible{title="💡 Hilfe zur Lösung"}
**Das Problem:** Wenn manche Buchstaben 1 Bit, andere 2 Bits und wieder andere 3 Bits brauchen, weiß der Computer nicht, wo ein Buchstabe endet!

**Die Lösung (kommt gleich):** Alle Buchstaben sollten **gleich viele Bits** haben!
:::
