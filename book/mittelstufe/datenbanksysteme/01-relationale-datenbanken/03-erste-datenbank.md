---
name: Die erste Datenbank
index: 3
---

# Die erste Datenbank 🗄️

## 🌍 Die Terra1-Datenbank

Jetzt wird's praktisch! Wir arbeiten mit einer echten Datenbank: **Terra1** - eine Geo-Datenbank mit Informationen über Orte und Länder.

### 📊 Schema der Terra1-Datenbank

![Schema Terra](./schema_terra1.png)

**Die Datenbank hat zwei Tabellen:**

🏙️ **Tabelle "ort"**

- `name` (varchar) - Name der Stadt
- `land` (varchar) - Land, in dem die Stadt liegt
- `einwohner` (int) - Anzahl der Einwohner
- `laenge` (decimal) - Längengrad (GPS)
- `breite` (decimal) - Breitengrad (GPS)

🌍 **Tabelle "land"**

- `name` (varchar) - Name des Landes
- `kontinent` (varchar) - Kontinent
- `einwohner` (int) - Einwohnerzahl des Landes

:::alert{info}
💾 **Download für lokales Arbeiten:**

Falls du die Datenbank lokal nutzen möchtest:

::download[Terra1-Datenbank (SQLite)]{src="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}
:::

## 💬 SQL - Die Sprache der Datenbanken

### 🤔 Warum brauchen wir SQL?

**Stell dir vor:** Verschiedene Programme (App, Website, etc.) wollen auf **die gleiche Datenbank** zugreifen.

**Problem:** Wie kommunizieren sie mit der Datenbank?

**Lösung:** Eine gemeinsame **Sprache** - **SQL**!

![DBMS](./client_server_db.svg "Client-Server-Modell - Urheber: TM - Lizenz: inf-schule.de")

:::snippet{#merken}
**SQL = Structured Query Language**

📝 **Was bedeutet das?**

- **Structured** = Strukturiert (feste Regeln)
- **Query** = Abfrage (Daten anfragen)
- **Language** = Sprache (zum Kommunizieren)

**SQL ist die Standard-Sprache** für fast alle Datenbanksysteme!
:::

## 🎮 Aufgabe 1 - Dein erster SQL-Befehl!

:::snippet{#aufgabe}
**Führe diesen SQL-Befehl aus**, um alle deutschen Städte mit ihren Einwohnerzahlen zu sehen.

👉 **Klicke auf den grünen "Play"-Button!**
:::

:::sqlide{db="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}

```mysql Statements.sql
SELECT name, einwohner
  FROM ort
 WHERE land = 'Deutschland'
```

:::

### 🔍 Versteh den Code!

::::multievent
:::snippet{#aufgabe}
**Quiz:** Was machen die einzelnen Teile des SQL-Befehls?
:::

**Was macht `SELECT name, einwohner`?**

{r1{Löscht Spalten aus der Tabelle}}

{r1{!Wählt die Spalten "name" und "einwohner" aus}}

{r1{Erstellt neue Spalten}}

{r1{Sortiert die Tabelle}}

{b{SELECT = Auswählen. Aber was wird ausgewählt?}}

{B{Richtig! SELECT wählt die Spalten aus, die angezeigt werden sollen!}}

---

**Was macht `FROM ort`?**

{R2{Löscht die Tabelle "ort"}}

{R2{Sortiert nach "ort"}}

{R2{!Gibt an, aus welcher Tabelle die Daten kommen}}

{R2{Filtert nach Orten}}

{b{FROM = Von... Aber von wo kommen die Daten?}}

{B{Genau! FROM gibt die Tabelle an, aus der wir Daten holen!}}

---

**Was macht `WHERE land = 'Deutschland'`?**

{r3{Ändert das Land in "Deutschland"}}

{r3{!Filtert nur Zeilen, wo land gleich "Deutschland" ist}}

{r3{Löscht alle Länder außer Deutschland}}

{r3{Sortiert nach Deutschland}}

{b{WHERE = Wo/Wenn. Es ist eine Bedingung!}}

{B{Perfekt! WHERE filtert die Datensätze nach einer Bedingung!}}

::::

### 📝 Die SQL-Grundstruktur

:::snippet{#merken}

```sql
SELECT [Spalten]    -- Was soll angezeigt werden?
  FROM [Tabelle]    -- Aus welcher Tabelle?
 WHERE [Bedingung]  -- Welche Zeilen? (optional)
```

**Eselsbrücke:** **S**uche **F**ür **W**ichtige Daten

- **S**ELECT = Suche (welche Spalten)
- **F**ROM = Für (aus welcher Tabelle)
- **W**HERE = Wichtige (welche Bedingung)
  :::

## 🚀 Aufgabe 2 - Jetzt bist du dran!

:::snippet{#aufgabe}
**Schreibe eigene SQL-Befehle:**

1. 🇫🇷 **Challenge 1:** Zeige alle Orte in **Frankreich**

   - Tipp: Ändere einfach "Deutschland" in "Frankreich"

2. 🗺️ **Challenge 2:** Zeige alle Orte in **Deutschland** mit Name, **Länge** und **Breite** (GPS-Koordinaten)

   - Tipp: Füge mehr Spalten bei SELECT hinzu (mit Komma getrennt)

3. 🌟 **Bonus:** Zeige alle deutschen Städte mit mehr als 1 Million Einwohnern
   - Tipp: Erweitere die WHERE-Bedingung mit `AND einwohner > 1000000`
     :::

:::sqlide{db="https://sqlide.openpatch.org/assets/databases/terra1.sqlite"}

```mysql Statements.sql
-- Challenge 1: Orte in Frankreich
SELECT

-- Challenge 2: Deutsche Orte mit GPS


-- Challenge 3: Deutsche Millionenstädte

```

:::

:::collapsible{title="💡 Lösungen (erst selbst probieren!)"}

```sql
-- Challenge 1
SELECT name, einwohner
  FROM ort
 WHERE land = 'Frankreich'

-- Challenge 2
SELECT name, laenge, breite
  FROM ort
 WHERE land = 'Deutschland'

-- Challenge 3
SELECT name, einwohner
  FROM ort
 WHERE land = 'Deutschland' AND einwohner > 1000000
```

:::

## 🎯 Was kommt als Nächstes?

Du hast jetzt die **Grundlagen von SQL** gelernt! 🎉

Im nächsten Kapitel lernst du:

- ✅ Wie man Daten **sortiert** (ORDER BY)
- ✅ Wie man nach **Textmustern** sucht (LIKE)
- ✅ Wie man **komplexe Bedingungen** erstellt (AND, OR, NOT)
- ✅ Und vieles mehr!

**Bist du bereit?** Dann weiter zum nächsten Kapitel! 🚀
