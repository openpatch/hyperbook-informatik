---
name: Sortieren durch Einfügen
lang: de
---

# Sortieren durch Einfügen

**Sortieren durch Einfügen** (englisch *insertion sort*) nimmt ein Element nach dem anderen und schiebt es an die passende Stelle im bereits sortierten vorderen Teil – so, wie man Spielkarten auf der Hand einsortiert.

1. Merke dir das Element an Position `i`.
2. Verschiebe alle größeren Elemente davor um einen Platz nach rechts.
3. Setze das gemerkte Element in die entstandene Lücke.

Bei einem **bereits sortierten** Feld braucht das Verfahren nur O(n) Schritte, im schlechtesten Fall O(n²). Damit ist es bei fast sortierten Daten deutlich besser als :t[Sortieren durch Auswählen]{#sortieren-durch-auswaehlen}.

Die Schleifenbedingung `j >= 0 && pWerte[j] > merker` funktioniert nur dank der :t[Kurzschlussauswertung]{#kurzschlussauswertung}.
