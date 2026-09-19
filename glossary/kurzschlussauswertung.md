---
name: Kurzschlussauswertung
lang: de
---

# Kurzschlussauswertung

Bei der **Kurzschlussauswertung** (englisch *short-circuit evaluation*, im Buch auch **verkürzte Auswertung**) hört Java auf, einen :t[booleschen Ausdruck]{#boolesche-ausdruecke} auszuwerten, sobald das Ergebnis feststeht.

- Bei `a && b` wird `b` nur ausgewertet, wenn `a` wahr ist.
- Bei `a || b` wird `b` nur ausgewertet, wenn `a` falsch ist.

Das ist nicht nur schneller – es erlaubt auch, die Prüfung selbst abzusichern:

```java
if (feld != null && feld.length > 0) { /* ... */ }
if (j >= 0 && werte[j] > merker) { /* ... */ }
```

In beiden Fällen würde der rechte Teil abstürzen, wenn der linke nicht zuträfe. Weil die Auswertung vorher abbricht, passiert das nicht. Die **Reihenfolge** der Teilbedingungen ist deshalb nicht beliebig.
