---
name: Ereignisse erweitern
index: 4
lang: de
---

# Ereignisse erweitern

Im Kapitel [Ereignisse](/projekte/smart-home/ereignisse) hast du schon weitere Spezialisierungen der Ereignisse beschrieben. Jetzt sollen sie in das Programm integriert werden.

## Aufgaben

1. Erstelle für jedes spezialisierte Ereigniss eine neue Klasse. Orientiere dich dabei an der TemperatureChangedEvent-Klasse.
2. Erstelle neue Objekte, die die neuen Klassen nutzen, und füge sie dem Array EventBacklog hinzu.
3. Überlege dir Methoden zur Analyse in Anlehnung an `getMaxTemperature` und `countAutomationTriggered` und implementiere diese.