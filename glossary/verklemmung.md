---
name: Verklemmung
lang: de
---

# Verklemmung

Eine **Verklemmung** (englisch *deadlock*) liegt vor, wenn mehrere Threads sich **gegenseitig** blockieren und deshalb keiner mehr weiterkommt.

Das Muster: Thread 1 hält Schloss A und wartet auf B, Thread 2 hält B und wartet auf A. Beide warten für immer.

Vermeiden lässt sich das zum Beispiel, indem alle Threads die Schlösser **in derselben Reihenfolge** anfordern.

Verwandte Begriffe: :t[Nebenläufigkeit]{#nebenlaeufigkeit}, :t[Wettlaufsituation]{#wettlaufsituation}.
