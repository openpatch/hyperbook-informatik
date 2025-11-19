---
name: SQL- Structured Query Language
index: 4
---

# SQL - Structured Query Language

:::snippet{#merken}
SQL ist eine universelle Datenbanksprache, die von praktisch allen aktuellen Datenbanksystemen verstanden wird.
:::

Mit SQL können alle wichtigen Aufgaben einer Datenbank erledigt werden:

- Die Abfrage von Daten.
- Neuanlage, Ändern und Löschen von Daten.
- Die Definition der Tabellenstrukturen.
- Das Verwalten von Zugriffsrechten - also wer darf welche Daten sehen und verändern.

In diesem Kapitel beschränken wir uns auf die Abfrage von Daten, einem Teil der DML - Data Manipulation Language.

:::snippet{#merken}
Eine SQL-Anfrage liefert immer eine neue **Tabelle als Ergebnis**.
Die Syntax einer SQL-Abfrage hat folgende wesentlichen Elemente:

- `SELECT`    - Liste der auszugebenden Attribute.
- `FROM`      - Liste der Tabellen, aus denen Daten entnommen werden.
- `WHERE`     - Bedingungen, die die Datensätze erfüllen müssen.
- `ORDER BY`  - Attribute, nach denen sortiert werden soll.

Zur Vereinfachung des `SELECT` kann auch `SELECT *` angegeben werden, um alle Attribute anzuzeigen.

Die Teile `WHERE` und `ORDER BY` können entfallen.
:::

## Bedingungen in SQL

Die WHERE-Anweisung erlaubt die Angabe von komplexen Bedingungen:

- Direkte Vergleiche auf Werte, z.B. `Einwohner > 1000`.
- Verbinden von mehreren Bedingungen mit `AND`, `OR` oder `NOT`.
- Filtern von Text-Attributen mit `LIKE`.

Der Datentyp eines Attributs muss in der Bedingung beachtet werden:

- Bei Text-Attributen (Datentyp varchar) müssen die Werte in einfachen Hochkommata angegeben werden, z.B. `Name='Berlin'`.
- Bei Zahl-Attributen (Datentyp int oder decimal) werden Werte ohne Anführungszeichen geschrieben.
- Das Dezimaltrennzeichen ist wie im Englischen üblich ein Punkt (und kein Komma wie im Deutschen), z.B. `Breite >= 50.2`.

Eine Besonderheit ist der `LIKE`-Vergleich. Hier können im Wert Platzhalter für Texte angegeben werden.

- Ein Prozentzeichen bedeutet beliebig viele Buchstaben.
- Ein Unterstrich bedeutet einen beliebigen Buchstaben.

Beispiele:

```sql
-- alle Länder, die nicht in Europa liegen
NOT (Kontinent='Europa')

-- Millionenstädte in Deutschland
Land='Deutschland' AND Einwohner>1000000

-- alle Orte, die mit P beginnen.
Name LIKE 'P%'

-- Orte nach dem Muster von Aalen und Ahlen (beliebiger 2. Buchstabe)
Name LIKE 'A_len'

-- Die Daten von Mainz und Wiesbaden vergleichen (statt einer OR-Verknüpfung)
Name IN ('Mainz','Wiesbaden')
```

Übrigens siehst du direkt eine Möglichkeit für Kommentare in SQL (zwei Bindestriche)

## Sortieren in SQL

Die Datensätze als Ergebnis einer SQL-Anfrage werden in der Regel **unsortiert** ausgegeben. Eine vorhandene Sortierung ist dann Zufall!

Die `ORDER BY`-Anweisung erzwingt eine bestimmte Reihenfolge.

Die Liste der Attribute gibt die Sortierreihenfolge an. Die Schlüsselworte `ASC` und `DESC` erzwingen eine aufsteigende (Standard) oder absteigende Sortierung.

So sortiert das folgende Beispiel die Länder erst nach dem Kontinent und dann absteigend nach der Einwohnerzahl:

:::sqlide{db="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}

```mysql Statements.sql
SELECT Kontinent, Name
  FROM land
 ORDER BY Kontinent, Einwohner DESC
```
:::