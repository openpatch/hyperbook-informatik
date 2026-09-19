---
name: Wettlaufsituation
lang: de
---

# Wettlaufsituation

Eine **Wettlaufsituation** (englisch *race condition*) liegt vor, wenn das Ergebnis eines nebenläufigen Programms davon abhängt, welcher Thread zufällig zuerst fertig wird.

Klassisches Beispiel: Zwei Threads führen `stand = stand + 1` aus. Diese eine Zeile besteht aus drei Schritten – lesen, erhöhen, schreiben. Verschränken sich die Schritte ungünstig, lesen beide denselben alten Wert und am Ende steht 1 statt 2.

Der Abschnitt, in dem auf gemeinsame Daten zugegriffen wird, heißt **kritischer Abschnitt** (englisch *critical section*). In ihm darf immer nur ein Thread gleichzeitig sein – diese Eigenschaft nennt man **wechselseitigen Ausschluss** (englisch *mutual exclusion*, kurz *mutex*).

Abgesichert wird er in Java mit `synchronized` oder mit einem **Schloss** (englisch *lock*), etwa einem `Semaphore(1)`. Dabei gilt: Was zwischen `acquire` und `release` steht, sollte so kurz wie möglich sein – sonst warten die anderen Threads mehr, als die :t[Nebenläufigkeit]{#nebenlaeufigkeit} einbringt.
