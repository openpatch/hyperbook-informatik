---
name: Teilen und Herrschen
lang: de
---

# Teilen und Herrschen

**Teilen und Herrschen** (englisch *divide and conquer*, lateinisch *divide et impera*) ist eine Problemlösestrategie in drei Schritten:

1. **Teilen:** Das Problem in kleinere Teilprobleme derselben Art zerlegen.
2. **Herrschen:** Die Teilprobleme lösen – meist durch :t[Rekursion]{#rekursion}, bis der Basisfall erreicht ist.
3. **Zusammenfügen:** Aus den Teillösungen die Gesamtlösung bauen.

Beispiele im Buch: **Mergesort** (teilt in der Mitte, sortiert beide Hälften, mischt sie zusammen), **Quicksort** (teilt am Pivot-Element) und die **binäre Suche** (halbiert den Suchbereich in jedem Schritt).

Der Gewinn zeigt sich an der Laufzeit: Wo eine Schleife über alle Elemente O(n²) braucht, kommt Teilen und Herrschen oft mit O(n·log n) aus.
