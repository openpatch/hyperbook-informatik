---
name: Datenbanken erstellen
index: 7
keywords:
  - datenbanken
  - sql
  - lk
---

# Datenbanken erstellen

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**. Im Grundkurs reicht es, Daten abzufragen; im Leistungskurs sollst du ein Datenbankschema auch selbst umsetzen und Daten einfügen, ändern und löschen.

Wer im Grundkurs ist, kann das Kapitel trotzdem durcharbeiten – es macht vieles aus den Kapiteln 5 und 6 erst greifbar.
:::

## Worum geht es hier?

Bisher hast du Datenbanken benutzt und modelliert. Jetzt baust du eine.

SQL besteht aus zwei Teilen, die man bisher nicht auseinanderhalten musste:

- die **Datenabfragesprache** (DQL) – alles rund um `SELECT`
- die **Datendefinitionssprache** (DDL) – `CREATE`, `ALTER`, `DROP`
- die **Datenmanipulationssprache** (DML) – `INSERT`, `UPDATE`, `DELETE`

## Für dieses Kapitel musst du …

- ein :t[Relationenschema]{#relationenschema} aus einem ER-Diagramm herleiten können ([Kapitel 5](../05-datenbanken-modellieren))
- wissen, was Primär- und :t[Fremdschlüssel]{#fremdschluessel} leisten ([Kapitel 1](../01-daten-in-tabellen/02-aufbau-einer-relationalen-datenbank))

## Hier lernst du …

- Tabellen mit passenden Datentypen anlegen
- Integritätsbedingungen formulieren und ihre Wirkung prüfen
- Daten einfügen, ändern und löschen
- ein Schema nachträglich verändern und Sichten anlegen
