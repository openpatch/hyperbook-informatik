---
name: Aktivierungsfunktion
lang: de
---

# Aktivierungsfunktion

Die Aktivierungsfunktion entscheidet, ob und wie stark ein :t[Neuron]{#neuron} feuert. Sie nimmt die gewichtete Summe und macht daraus die Ausgabe des Neurons.

- **Sigmoid** presst jeden Wert in den Bereich (0, 1) — gut für Wahrscheinlichkeiten. Bei sehr großen und sehr kleinen Werten **sättigt** sie: Die Ausgabe reagiert kaum noch auf Änderungen, was das Lernen erschwert.
- **ReLU** gibt negative Werte als 0 zurück und lässt positive unverändert. Einfach, schnell und ohne Sättigung im positiven Bereich.
