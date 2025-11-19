---
name: SQL - Structured Query Language
index: 4
---

# SQL - Structured Query Language 💾

## 🌍 Die Universal-Sprache für Datenbanken

:::snippet{#merken}
**SQL** ist die **Standard-Datenbanksprache**, die von praktisch **allen** modernen Datenbanksystemen verstanden wird!

📊 MySQL, PostgreSQL, SQLite, Oracle, Microsoft SQL Server, ... - **alle sprechen SQL!**
:::

## 🛠️ Was kann SQL alles?

SQL ist ein mächtiges Werkzeug mit vielen Funktionen:

| Aufgabe | SQL-Bereich | Beispiel |
|---------|-------------|----------|
| 🔍 **Daten abfragen** | DML (Data Manipulation) | `SELECT * FROM ort` |
| ➕ **Daten hinzufügen** | DML | `INSERT INTO ort ...` |
| ✏️ **Daten ändern** | DML | `UPDATE ort SET ...` |
| 🗑️ **Daten löschen** | DML | `DELETE FROM ort ...` |
| 🏗️ **Tabellen erstellen** | DDL (Data Definition) | `CREATE TABLE ...` |
| 🔐 **Rechte verwalten** | DCL (Data Control) | `GRANT SELECT ...` |

**In diesem Kapitel:** Wir konzentrieren uns auf **DML - Daten abfragen** mit `SELECT`!

## 📋 Die SELECT-Anweisung im Detail

:::snippet{#merken}
**Grundstruktur einer SQL-Abfrage:**

```sql
SELECT   [Spalten]        -- Was soll angezeigt werden?
  FROM   [Tabelle]        -- Aus welcher Tabelle?
 WHERE   [Bedingung]      -- Welche Zeilen? (optional)
 ORDER BY [Spalte]        -- Wie sortieren? (optional)
```

**Wichtig:** Eine SQL-Anfrage liefert immer eine **neue Tabelle** als Ergebnis!
:::

### 🎯 SELECT - Spalten auswählen

**Varianten:**

```sql
-- Alle Spalten
SELECT * FROM ort

-- Bestimmte Spalten (mit Komma trennen)
SELECT name, einwohner FROM ort

-- Nur eine Spalte
SELECT name FROM ort
```

💡 **Tipp:** `SELECT *` ist praktisch, aber in der Praxis wählt man besser nur die benötigten Spalten aus (schneller und übersichtlicher)!

## 🔍 WHERE - Bedingungen formulieren

### 📊 Vergleichsoperatoren

::::multievent
:::snippet{#aufgabe}
**Quiz:** Welche Operatoren gibt es in SQL?
:::

**Was macht `einwohner > 1000000`?**

{r1{Ändert die Einwohnerzahl auf 1000000}}

{r1{!Filtert Städte mit mehr als 1 Million Einwohnern}}

{r1{Sortiert nach Einwohnerzahl}}

{r1{Zählt die Einwohner}}

{h{Der > Operator vergleicht Werte. Größer als bedeutet...?}}
{H{Richtig! > ist der "größer als" Operator zum Filtern!}}

::::

**Alle Vergleichsoperatoren:**

| Operator | Bedeutung | Beispiel |
|----------|-----------|----------|
| `=` | Gleich | `land = 'Deutschland'` |
| `!=` oder `<>` | Ungleich | `land != 'Deutschland'` |
| `>` | Größer als | `einwohner > 1000000` |
| `<` | Kleiner als | `einwohner < 100000` |
| `>=` | Größer oder gleich | `einwohner >= 1000000` |
| `<=` | Kleiner oder gleich | `breite <= 50` |

### 🔗 Logische Verknüpfungen

**Mehrere Bedingungen kombinieren:**

```sql
-- UND: Beide Bedingungen müssen erfüllt sein
SELECT name FROM ort
 WHERE land = 'Deutschland' AND einwohner > 1000000

-- ODER: Mindestens eine Bedingung muss erfüllt sein  
SELECT name FROM ort
 WHERE land = 'Deutschland' OR land = 'Frankreich'

-- NICHT: Bedingung wird umgekehrt
SELECT name FROM land
 WHERE NOT kontinent = 'Europa'
```

:::alert{warn}
**Klammern nicht vergessen!**

Bei komplexen Bedingungen Klammern nutzen:
```sql
WHERE (land = 'Deutschland' OR land = 'Frankreich') 
  AND einwohner > 500000
```
:::

### 🎨 Datentypen beachten!

:::alert{warn}
**Wichtig:** Der Datentyp bestimmt, wie du Werte schreibst!
:::

| Datentyp | Schreibweise | Beispiel |
|----------|--------------|----------|
| 📝 **Text** (varchar) | In `'einfachen'` Anführungszeichen | `name = 'Berlin'` |
| 🔢 **Ganzzahl** (int) | Ohne Anführungszeichen | `einwohner > 1000000` |
| 🎯 **Kommazahl** (decimal) | Punkt als Trenner (englisch!) | `breite >= 50.5` |

**Häufiger Fehler:**
```sql
-- ❌ FALSCH
WHERE einwohner > '1000000'  -- Text statt Zahl!

-- ✅ RICHTIG
WHERE einwohner > 1000000    -- Zahl ohne Anführungszeichen
```

### 🔎 LIKE - Textsuche mit Platzhaltern

**Mit LIKE kannst du nach Textmustern suchen!**

**Platzhalter:**
- `%` = Beliebig viele Zeichen (0 oder mehr)
- `_` = Genau ein beliebiges Zeichen

**Beispiele:**

```sql
-- Alle Städte, die mit "B" beginnen
SELECT name FROM ort WHERE name LIKE 'B%'
-- Ergebnis: Berlin, Bremen, Bonn, Budapest, ...

-- Alle Städte, die mit "en" enden
SELECT name FROM ort WHERE name LIKE '%en'
-- Ergebnis: Bremen, Essen, München, ...

-- Alle Städte mit "ur" irgendwo im Namen
SELECT name FROM ort WHERE name LIKE '%ur%'
-- Ergebnis: Hamburg, Augsburg, Duisburg, ...

-- Städte mit genau 5 Buchstaben (z.B. Paris, Mainz)
SELECT name FROM ort WHERE name LIKE '_____'
-- Genau 5 Unterstriche = 5 Zeichen

-- Städte wie "Aalen" oder "Ahlen" (zweiter Buchstabe beliebig)
SELECT name FROM ort WHERE name LIKE 'A_len'
```

### 📝 IN - Mehrere Werte prüfen

**Statt vieler OR-Verknüpfungen:**

```sql
-- Umständlich mit OR
SELECT * FROM ort 
 WHERE name = 'Berlin' OR name = 'Hamburg' OR name = 'München'

-- Elegant mit IN
SELECT * FROM ort 
 WHERE name IN ('Berlin', 'Hamburg', 'München')
```

### 💬 Kommentare in SQL

**Mach deine SQL-Befehle verständlich!**

```sql
-- Das ist ein einzeiliger Kommentar (zwei Bindestriche)

SELECT name, einwohner  -- Spalten auswählen
  FROM ort              -- Aus der Tabelle "ort"
 WHERE einwohner > 500000  -- Nur Großstädte

/* Das ist ein
   mehrzeiliger
   Kommentar */
```

## 🔄 ORDER BY - Sortieren von Ergebnissen

### ⚠️ Wichtig zu wissen!

:::alert{warn}
**Standardmäßig** werden SQL-Ergebnisse **unsortiert** ausgegeben!

Eine zufällige Sortierung ist **kein Zufall** - sie ist einfach nicht garantiert!
:::

### 📊 Mit ORDER BY sortieren

**Syntax:**
```sql
SELECT spalten
  FROM tabelle
 WHERE bedingung
 ORDER BY spalte1 [ASC|DESC], spalte2 [ASC|DESC]
```

**Sortierrichtung:**
- `ASC` = Aufsteigend (A→Z, 0→9, klein→groß) - **Standard**
- `DESC` = Absteigend (Z→A, 9→0, groß→klein)

**Beispiele:**

```sql
-- Nach Name sortieren (aufsteigend = alphabetisch)
SELECT name, einwohner FROM ort
 ORDER BY name
-- Ergebnis: Aachen, Augsburg, Berlin, ...

-- Nach Einwohnern sortieren (absteigend = größte zuerst)
SELECT name, einwohner FROM ort
 ORDER BY einwohner DESC
-- Ergebnis: Größte Städte zuerst

-- Erst nach Land, dann nach Einwohnern
SELECT name, land, einwohner FROM ort
 ORDER BY land ASC, einwohner DESC
-- Ergebnis: Länder alphabetisch, innerhalb jedes Landes nach Größe
```

### 🎯 Praktisches Beispiel

:::sqlide{db="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}

```mysql Statements.sql
-- Länder sortiert: Erst nach Kontinent, dann nach Einwohnern (absteigend)
SELECT name AS Land, kontinent, einwohner
  FROM land
 ORDER BY kontinent ASC, einwohner DESC
```
:::

**Beobachte:**
1. Kontinente sind alphabetisch sortiert (Afrika, Asien, Europa, ...)
2. Innerhalb jedes Kontinents: Größte Länder zuerst

::::multievent
:::snippet{#aufgabe}
**Quiz:** Sortieren verstehen
:::

**Was bewirkt `ORDER BY name DESC`?**

{r1{Sortiert alphabetisch A→Z}}

{r1{!Sortiert umgekehrt alphabetisch Z→A}}

{r1{Löscht Namen}}

{r1{Filtert nach Namen}}

{h{DESC = Descending = Absteigend}}
{H{Richtig! DESC dreht die Sortierung um!}}

---

**Was passiert bei `ORDER BY land, name`?**

{R2{Nur nach Land sortiert}}

{R2{Nur nach Name sortiert}}

{R2{!Erst nach Land, bei gleichem Land nach Name}}

{R2{Zufällige Sortierung}}

{h{Mehrere Spalten = mehrstufige Sortierung}}

{H{Genau! Erste Spalte ist Hauptkriterium, zweite bei Gleichstand!}}

::::

## 🚀 Übungsaufgaben

:::snippet{#aufgabe}
**Probiere diese Aufgaben selbst aus:**

1. 🏆 **Top 5 Städte:** Zeige die 5 größten deutschen Städte (nach Einwohnerzahl)
   - Tipp: `ORDER BY einwohner DESC` + eventuell `LIMIT 5`

2. 🌍 **Alphabetische Länderliste:** Alle europäischen Länder alphabetisch sortiert
   - Tipp: `WHERE kontinent = 'Europa' ORDER BY name`

3. 🎯 **Städte mit P:** Alle Städte, die mit "P" beginnen, sortiert nach Einwohnerzahl (größte zuerst)
   - Tipp: `LIKE 'P%'` + `ORDER BY einwohner DESC`

4. 🗺️ **Nord-Süd-Sortierung:** Deutsche Städte von Nord nach Süd sortiert
   - Tipp: Breitengrad! Norden = hohe Zahl, `ORDER BY breite DESC`
:::

:::sqlide{db="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}

```mysql Statements.sql
-- Aufgabe 1: Top 5 deutsche Städte


-- Aufgabe 2: Europäische Länder alphabetisch


-- Aufgabe 3: Städte mit P nach Größe


-- Aufgabe 4: Deutsche Städte von Nord nach Süd

```
:::

:::collapsible{title="💡 Musterlösungen"}
```sql
-- Aufgabe 1
SELECT name, einwohner FROM ort
 WHERE land = 'Deutschland'
 ORDER BY einwohner DESC
 LIMIT 5

-- Aufgabe 2
SELECT name, einwohner FROM land
 WHERE kontinent = 'Europa'
 ORDER BY name ASC

-- Aufgabe 3
SELECT name, einwohner FROM ort
 WHERE name LIKE 'P%'
 ORDER BY einwohner DESC

-- Aufgabe 4
SELECT name, breite FROM ort
 WHERE land = 'Deutschland'
 ORDER BY breite DESC
```
:::

## 📚 Zusammenfassung

:::snippet{#merken}
**Das hast du gelernt:**

✅ **SELECT** - Spalten auswählen (`SELECT name, einwohner`)

✅ **FROM** - Tabelle angeben (`FROM ort`)

✅ **WHERE** - Filtern mit Bedingungen (`WHERE land = 'Deutschland'`)

✅ **Operatoren** - Vergleichen (`=`, `>`, `<`, `>=`, `<=`, `!=`)

✅ **Logik** - Verknüpfen (`AND`, `OR`, `NOT`)

✅ **LIKE** - Textmuster suchen (`name LIKE 'B%'`)

✅ **IN** - Mehrere Werte (`name IN ('Berlin', 'Hamburg')`)

✅ **ORDER BY** - Sortieren (`ORDER BY einwohner DESC`)

✅ **Kommentare** - Code dokumentieren (`-- Kommentar`)
:::
