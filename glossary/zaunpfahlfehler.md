---
name: Zaunpfahlfehler
lang: de
---

# Zaunpfahlfehler

Der **Zaunpfahlfehler** (englisch *off-by-one error*) ist ein Fehler, bei dem eine Schleife oder ein Index um genau **eins** danebenliegt.

Der Name kommt vom Zaun: Für 10 Zaunfelder braucht man 11 Pfähle. Wer Felder und Pfähle verwechselt, zählt einen zu wenig.

```java
for (int i = 0; i <= werte.length; i++) {   // falsch: <= statt <
    IO.println(werte[i]);
}
```

Ein :t[Feld]{#feld} mit 4 Plätzen hat die Indizes 0 bis 3. `i <= werte.length` läuft bis einschließlich 4, und `werte[4]` gibt es nicht – es gibt eine `ArrayIndexOutOfBoundsException`.

Merksatz: Der letzte gültige Index ist immer `length - 1`, die Schleife läuft also mit `i < length`.
