---
name: k-NN
lang: de
---

# k-NN

k-NN (k-nearest neighbors, k-nächste Nachbarn) ist ein :t[Klassifikator]{#klassifikator} des überwachten :t[maschinellen Lernens]{#maschinelles-lernen}.

Um einen neuen Punkt einzuordnen, berechnet k-NN die Distanz zu allen :t[Trainingsdaten]{#trainingsdaten}, nimmt die k nächsten davon und entscheidet per Mehrheit über deren :t[Labels]{#label}.

k-NN gilt als **faul** (lazy learning): Beim Training wird nur gespeichert, gerechnet wird erst bei der Klassifizierung. Ein kleines k macht das Verfahren anfällig für Ausreißer (:t[Überanpassung]{#ueberanpassung}), ein zu großes lässt die Mehrheit immer gewinnen (:t[Unteranpassung]{#unteranpassung}).
