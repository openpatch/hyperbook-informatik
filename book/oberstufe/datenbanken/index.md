---
name: Datenbanken
lang: de
permaid: datenbanken-oberstufe
keywords:
  - datenbanken
  - sql
  - qphase
---

# Datenbanken

Fast jede Anwendung, die du benutzt, hat eine Datenbank im Rücken: der Fahrplan der Bahn, die Ausleihe der Stadtbibliothek, das Notenverwaltungsprogramm deiner Schule, jeder Onlineshop. In diesem Lernpfad lernst du, **Daten zu ordnen, abzufragen und zu modellieren** – und du lernst zu beurteilen, wann eine Datenbank gut gebaut ist und wann nicht.

<!--
Für Lehrkräfte: Der Lernpfad deckt die datenbankbezogenen Kompetenzerwartungen
des Kernlehrplans Informatik SII in Nordrhein-Westfalen (Entwurf
Beteiligungsverfahren, 31.07.2025) für die Qualifikationsphase ab. Die
vollständige Zuordnung steht als Kommentar am Ende dieser Datei.

Inhalte, die nur im Leistungskurs verbindlich sind, sind im Text als solche
gekennzeichnet (Kapitel 7 vollständig).
-->

Gearbeitet wird durchgehend an **einer** Datenbank: der eines erfundenen Musikfestivals namens *Klangwiese*. Sie läuft direkt im Browser – du musst nichts installieren und kannst nichts kaputt machen.

## Wie du mit diesem Lernpfad arbeitest

:::snippet{#merken}
- **Abfragebereiche** kannst du direkt ausführen. Setze den Cursor in eine Anweisung und drücke den Startknopf ▷ – es läuft immer genau die Anweisung, in der der Cursor steht.
- Wird es im Editor eng, hilft der Knopf **Fullscreen** unter dem Abfragebereich. Die Trennlinie zwischen Editor und Ausgabe lässt sich außerdem mit der Maus verschieben.
- **Verändere die Beispiele!** Über *Datenbank Reset* kommst du jederzeit zum Ausgangszustand zurück.
- Der Reiter **Fehler** zeigt dir schon beim Tippen, wenn ein Tabellen- oder Spaltenname nicht stimmt. Lies die Meldung, statt sie wegzuklicken.
- **Tipps** sind eingeklappt. Öffne sie erst, wenn du wirklich nicht weiterkommst – und immer nur den nächsten.
- **Lösungen** sind mit einem Passwort geschützt. Alle Passwörter stehen auf der Seite [Lösungspasswörter](/loesungen) – sieh dort erst nach, wenn du die Aufgabe wirklich versucht und die Tipps geöffnet hast.
- Am Ende jeder Lektion findest du einen **Selbsttest**.
:::

:::snippet{#brain}
Eine Regel begleitet dich durch den ganzen Lernpfad: **Erst denken, dann ausführen.** Sag bei jeder Abfrage zuerst voraus, wie viele Zeilen und welche Spalten herauskommen. Erst danach drückst du auf ▷. Wenn Vorhersage und Ergebnis auseinandergehen, hast du gerade am meisten gelernt.
:::

## Die Kapitel

1. **Daten in Tabellen** – warum Datenbanken, wie eine relationale Datenbank aufgebaut ist
2. **Abfragen mit SQL** – Zeilen und Spalten auswählen, filtern, sortieren, rechnen
3. **Mehrere Tabellen** – Schlüssel, :t[Verbund]{#verbund}, viele-zu-viele-Beziehungen
4. **Gruppieren und auswerten** – Aggregatfunktionen, Gruppen, Unterabfragen
5. **Datenbanken modellieren** – Entitätstypen, Beziehungen, ER-Diagramme, Datenbankschema
6. **Normalisierung** – Redundanz erkennen und beseitigen, 1. bis 3. :t[Normalform]{#normalform}
7. **Datenbanken erstellen** – Tabellen anlegen, Daten einfügen und ändern *(Leistungskurs)*
8. **Datenschutz und Datensicherheit** – Grundprinzipien und Fallbeispiele
9. **Projekt** – eine eigene Datenbank von der Idee bis zur Abfrage
10. **Referenz** – SQL zum Nachschlagen

Wenn du in der Mittelstufe schon einmal mit Datenbanken gearbeitet hast, findest du unter [Datenbanksysteme](/mittelstufe/datenbanksysteme) die einfachere Einführung. Für diesen Lernpfad brauchst du sie nicht.

<!--
Bezug zum Kernlehrplan (nur für Lehrkräfte, erscheint nicht im Hyperbook)

Kernlehrplan Informatik, Sekundarstufe II, Gymnasiale Oberstufe (Entwurf
Beteiligungsverfahren, 31.07.2025), Qualifikationsphase.

Inhaltsfeld "Daten und ihre Strukturierung", inhaltlicher Schwerpunkt
"Datenbankmodellierungen: Attribute, Entitätstypen, Beziehungstypen,
Kardinalitäten, Entity-Relationship-Diagramme, Datenbankschemata,
Schlüsselkandidaten, Primär- und Fremdschlüssel, 1. bis 3. Normalform"

| Kompetenzerwartung | Kapitel |
| --- | --- |
| modellieren relationale Datenbanken (M) | 5, 9 |
| entwerfen zu Datenbankmodellierungen relationale Datenbankschemata (M) | 5, 9 |
| überführen Datenbankschemata in die 1. bis 3. Normalform (M) | 6 |
| beurteilen Datenbankmodellierungen und Datenbankschemata (A) | 5.5, 6.5, 9 |
| setzen ein relationales Datenbankschema mit geeigneten Datentypen in einem Datenbanksystem um (I) — nur LK | 7, 9 |

Inhaltsfeld "Formale Sprachen und Automaten", inhaltlicher Schwerpunkt
"Syntax und Semantik: Programmiersprache, Datenbanksprache"

| Kompetenzerwartung | Kapitel |
| --- | --- |
| erläutern die Syntax und Semantik von Programmen und Datenbankabfragen (A) | 2, 4.5 |
| verwenden eine Datenbanksprache zum Abfragen von Daten (I) | 2, 3, 4 |
| verwenden eine Datenbanksprache zum Einfügen, Abfragen, Löschen und Ändern von Daten (I) — nur LK | 7 |

Inhaltsfeld "Informatik, Mensch und Gesellschaft", inhaltliche Schwerpunkte
"Grundprinzipien der Datensicherheit" und "Grundprinzipien des Datenschutzes"

| Kompetenzerwartung | Kapitel |
| --- | --- |
| beurteilen Fallbeispiele auf Grundlage der Grundprinzipien der Datensicherheit und des Datenschutzes (A) | 8 |

Übergeordnete Kompetenzerwartung "entwickeln Anweisungen an Datenbanken (I)":
Kapitel 2 bis 4 und 7.
-->
