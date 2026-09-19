---
name: Sortieren durch Auswählen
lang: de
---

# Sortieren durch Auswählen

**Sortieren durch Auswählen** (englisch *selection sort*, auch *Minsort*) sucht in jedem Durchlauf das kleinste Element des unsortierten Restes und tauscht es an die richtige Stelle.

1. Suche im Bereich ab Position `i` das Minimum.
2. Tausche es mit dem Element an Position `i`.
3. Rücke `i` um eins vor und wiederhole.

Die Anzahl der **Vergleiche** ist immer dieselbe, egal wie vorsortiert das :t[Feld]{#feld} ist: O(n²). Dafür wird höchstens einmal pro Durchlauf getauscht.

Verwandte Verfahren im Buch: :t[Sortieren durch Einfügen]{#sortieren-durch-einfuegen} (*insertion sort*), **Bubblesort**, **Quicksort** und **Mergesort**.
