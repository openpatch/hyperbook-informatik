---
name: Normalisierung
index: 6
---

# Normalisierung

## Worum geht es hier?

In [Kapitel 5](../05-datenbanken-modellieren) bist du von einer Beschreibung ausgegangen und hast daraus ein Schema entwickelt. Manchmal hat man aber kein Modell, sondern eine gewachsene Tabelle – aus einer Tabellenkalkulation, aus einem alten Programm, aus einem Export.

Die **Normalisierung** ist ein Verfahren, um so eine Tabelle systematisch zu zerlegen, bis keine Redundanz mehr übrig ist. Sie ist ein Handwerk mit klaren Regeln, kein Bauchgefühl.

## Für dieses Kapitel musst du …

- die drei Anomalien kennen ([Kapitel 1](../01-daten-in-tabellen/01-warum-datenbanken))
- wissen, was Schlüsselkandidaten und :t[Fremdschlüssel]{#fremdschluessel} sind ([Kapitel 1](../01-daten-in-tabellen/02-aufbau-einer-relationalen-datenbank))
- ein :t[Relationenschema]{#relationenschema} lesen können ([Kapitel 5](../05-datenbanken-modellieren/04-vom-diagramm-zum-schema))

## Hier lernst du …

- funktionale Abhängigkeiten erkennen und aufschreiben
- ein Schema in die 1., 2. und 3. :t[Normalform]{#normalform} überführen
- begründen, was jede Normalform genau beseitigt
- beurteilen, wann Normalisierung genug ist – und wann zu viel
