---
name: Evolutionärer Algorithmus
lang: de
---

# Evolutionärer Algortihmus

Ein evolutionärer Algorithmus ist eine Art von Algorithmus für maschinelles Lernen, der vom biologischen Evolutionsprozess inspiriert ist. Das Ziel von Algorithmen für maschinelles Lernen besteht im Allgemeinen darin, eine optimale Lösung für ein Optimierungsproblem zu finden. Im Fall dieses Simulators wird das Ziel durch die Aufgabe vorgegeben, die du für deine Kreatur ausgewählt hast (z.B. „so schnell wie möglich laufen“).

Je besser eine Kreatur diese Aufgabe bewältigt, desto höher ist ihr Fitnesswert. Dieser Fitnesswert ist das, was hier optimiert wird. Der Algorithmus versucht, ein Verhalten
des Lebewesens zu finden, das den höchstmöglichen Fitnesswert erzeugt. Evolutionäre Algorithmen versuchen, solche optimalen Lösungen durch den Prozess von Versuch und Irrtum zu finden. Sie probieren wiederholt eine Reihe von Lösungskandidaten aus, bewerten sie und generieren dann auf der Grundlage dieser Bewertung eine neue Reihe möglicher Lösungen. (Eine „Lösung“ entspricht in diesem Artikel dem Verhalten eines einzelnen Lebewesens, das durch die Gewichte seines Gehirns bzw. seines neuronalen Netzes definiert wird).

Im Folgenden wird der allgemeine Aufbau eines evolutionären Algorithmus beschrieben:

1. Erstellen einer zufälligen Menge von Ausgangslösungen (einer Population) Wiederhole die Schritte 2. - 5. -
2. Bewerte jede Lösung danach, wie gut sie das Problem löst 3. Auswahl der Elternlösungen, die ihre Eigenschaften an die nächste Generation weitergeben dürfen 
4. Erstellen einer neuen Gruppe von Lösungen für die nächste Iteration durch Rekombination von Elternlösungen
5. Hinzufügen zufälliger Änderungen (Mutation) zu einigen der neuen Lösungen

Die Mutationen in Schritt 5 zielen darauf ab, die Wahrscheinlichkeit zu verringern, dass der Algorithmus in einem sogenannten lokalen Optimum stecken bleibt. Ein lokales Optimum der Fitnessfunktion ist durch die Fitness einer Lösung gegeben, die sich verschlechtert, wenn man sie in irgendeiner Weise leicht verändert. Das Problem dabei ist, dass eine solche (lokale) Lösung nicht unbedingt die globale Lösung ist, nach der man
eigentlich sucht.

Die Hinzufügung eines völlig zufälligen Faktors in jeder Generation kann ausreichen, um neue Lösungen zu erzeugen, die sich so stark von einer lokalen Lösung unterscheiden, dass sie die Population davon abbringen können, in diesem lokalen Optimum stecken zu bleiben.