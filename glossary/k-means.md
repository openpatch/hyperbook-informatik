---
name: k-Means
lang: de
---

# k-Means

k-Means ist ein Verfahren zur Clusterbildung beim unüberwachten :t[maschinellen Lernen]{#maschinelles-lernen}. Es teilt Datenpunkte in k Gruppen ein, ohne vorher zu wissen, welche es gibt.

Der Algorithmus wiederholt zwei Schritte, bis sich nichts mehr ändert:

1. **Zuordnen:** Jeder Punkt kommt zum nächstgelegenen Schwerpunkt (Zentroid).
2. **Aktualisieren:** Jeder Schwerpunkt wandert in die Mitte seiner Punkte.

Das Ergebnis hängt von den **Startpunkten** ab: Dieselben Daten und dasselbe k können bei anderen Startschwerpunkten zu anderen Clustern führen. Deshalb lässt man k-Means in der Praxis mehrfach mit zufälligen Startpunkten laufen.
