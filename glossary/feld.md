---
name: Feld (Array)
lang: de
---

# Feld (Array)

Ein **Feld** (englisch *array*) speichert mehrere Werte **desselben** :t[Datentyps]{#datentyp} unter einem Namen. Auf die einzelnen Elemente greift man über ihren **Index** zu, gezählt ab 0.

:::alert{warning}
Vorsicht bei der Übersetzung: Das deutsche „Feld" meint hier **array**, nicht das englische *field*. Was im Englischen *field* heißt, ist bei uns ein :t[Attribut]{#attribut}.
:::

```java
int[] werte = {10, 20, 30};
IO.println(werte[0]);        // 10 – das erste Element
IO.println(werte.length);    // 3 – die Anzahl der Plätze
werte[2] = 99;
```

- Die Länge steht in `werte.length` – **ohne** Klammern, anders als bei `String.length()`.
- Der letzte gültige Index ist `werte.length - 1`. Wer das übersieht, baut einen :t[Zaunpfahlfehler]{#zaunpfahlfehler} ein.
- Die Länge steht bei der Erzeugung fest und lässt sich nicht mehr ändern.
- Ein Feld ist ein Objekttyp: Eine Feldvariable enthält nur eine :t[Referenz]{#referenz} auf das Feld auf der :t[Halde]{#halde}.
