---
title: Aggregatfunktionen
index: 1
---

# Aggregatfunktionen

Eine **Aggregatfunktion** fasst viele Werte zu einem einzigen zusammen.

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Aggregate.sql
SELECT COUNT(*) AS anzahl_bands FROM band;

SELECT SUM(dauer_min) AS gesamtdauer FROM auftritt;

SELECT AVG(kapazitaet) AS mittlere_kapazitaet FROM buehne;

SELECT MIN(gruendungsjahr) AS aeltest, MAX(gruendungsjahr) AS juengst FROM band;

SELECT COUNT(*) AS tickets, SUM(preis) AS umsatz, ROUND(AVG(preis), 2) AS schnitt
  FROM ticket;
```

:::

:::snippet{#merken}
| Funktion | Ergebnis |
| --- | --- |
| `COUNT(*)` | Anzahl der Zeilen |
| `COUNT(spalte)` | Anzahl der Zeilen mit einem Wert in dieser Spalte |
| `COUNT(DISTINCT spalte)` | Anzahl der **verschiedenen** Werte |
| `SUM(spalte)` | Summe |
| `AVG(spalte)` | Mittelwert |
| `MIN(spalte)` / `MAX(spalte)` | kleinster / größter Wert |

Eine Abfrage mit Aggregatfunktion liefert **eine einzige Zeile** – egal wie viele Zeilen die Tabelle hat.
:::

## Zählen ist nicht gleich zählen

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql Zaehlen.sql
SELECT COUNT(*) AS zeilen,
       COUNT(band_id) AS mit_band,
       COUNT(DISTINCT band_id) AS verschiedene_bands
  FROM auftritt;
```

:::

:::snippet{#aufgabe}
a) Führe die Abfrage aus. Welche drei Zahlen kommen heraus?

b) Erkläre, warum die dritte kleiner ist als die ersten beiden.

c) Wie viele **verschiedene** Instrumente werden in `mitgliedschaft` genannt, und wie viele Einträge gibt es insgesamt?
:::

:::protect{password="db-4-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 46, 46, 22.

b) Es gibt 46 Auftritte, aber nur 22 Bands – manche treten mehrmals auf. `COUNT(DISTINCT band_id)` zählt jede Band nur einmal.

Dass die ersten beiden gleich sind, liegt daran, dass in `auftritt.band_id` nie ein Wert fehlt. Fehlende Werte übergeht `COUNT(spalte)`, `COUNT(*)` dagegen zählt die Zeile trotzdem mit.

c)

```sql Instrumente.sql
SELECT COUNT(*) AS eintraege,
       COUNT(DISTINCT instrument) AS verschiedene
  FROM mitgliedschaft;
```

56 Einträge, 12 verschiedene Instrumente.

:::

## Aggregatfunktionen mit WHERE

`WHERE` wirkt **vor** der Aggregation – es entscheidet, welche Zeilen überhaupt eingerechnet werden.

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql MitFilter.sql
SELECT COUNT(*) AS auftritte_am_freitag
  FROM auftritt
 WHERE datum = '2026-07-17';

SELECT ROUND(AVG(zuschauer), 1) AS schnitt_hauptbuehne
  FROM auftritt
 WHERE buehne_id = 1;

SELECT SUM(preis) AS umsatz_camping
  FROM ticket
 WHERE kategorie = 'Wochenendticket mit Camping';
```

:::

## Aggregatfunktionen mit Verbund

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql MitVerbund.sql
SELECT COUNT(*) AS auftritte_ueberdacht
  FROM auftritt AS a
  JOIN buehne AS s ON a.buehne_id = s.buehne_id
 WHERE s.ueberdacht = 1;

SELECT ROUND(AVG(w.punkte), 2) AS schnitt
  FROM bewertung AS w
  JOIN auftritt AS a ON a.auftritt_id = w.auftritt_id
  JOIN band AS b ON b.band_id = a.band_id
 WHERE b.name = 'Nordlicht';
```

:::

## Ein häufiger Denkfehler

:::snippet{#aufgabe}
Was liefert diese Abfrage – und ergibt das Sinn?

```sql
SELECT name, MAX(zuschauer) FROM auftritt;
```
:::

::::collapsible{title="Tipp"}

Die Aggregatfunktion liefert **eine** Zeile. Woher soll der zugehörige `name` kommen, wenn es 46 Zeilen gab?

::::

::::collapsible{title="Auflösung"}

Die Abfrage ist in dieser Datenbank ohnehin fehlerhaft, weil `auftritt` gar keine Spalte `name` hat. Aber auch mit einer vorhandenen Spalte wäre sie problematisch:

`MAX(zuschauer)` fasst alle 46 Zeilen zu einer zusammen. Ein einzelner Spaltenwert daneben ist dann nicht mehr definiert – zu welcher der 46 Zeilen sollte er gehören?

Manche Datenbanksysteme lehnen so etwas ab, andere liefern **irgendeinen** Wert. SQLite gehört zur zweiten Sorte, und das ist tückisch: Man bekommt ein Ergebnis, das plausibel aussieht und falsch sein kann.

Der saubere Weg führt über eine Unterabfrage – die lernst du in [Lektion 4](./04-unterabfragen) kennen.

::::

:::snippet{#merken}
**Faustregel:** Sobald eine Aggregatfunktion in der `SELECT`-Liste steht, darf dort keine gewöhnliche Spalte mehr stehen – es sei denn, sie steht auch im `GROUP BY`. Was das heißt, klärt die [nächste Lektion](./02-gruppieren-mit-group-by).
:::

## Aufgaben

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Lösungen.
-- a)

-- b)

-- c)

-- d)

```

:::

:::snippet{#aufgabe}
a) Wie viele Personen sind in der Datenbank erfasst?

b) Wie viele Stunden Musik gibt es insgesamt? Rechne aus `dauer_min` in Stunden um und runde auf eine Nachkommastelle.

c) Wie hoch war der Gesamtumsatz aus Tickets, und wie viele Tickets wurden verkauft?

d) Wie viele verschiedene Bands sind am 18. Juli 2026 aufgetreten?
:::

::::collapsible{title="Tipp: zu b)"}

Erst summieren, dann teilen – und daran denken, dass 60 eine ganze Zahl ist.

::::

:::protect{password="db-4-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 35
SELECT COUNT(*) AS personen FROM person;

-- b) 48.0 Stunden
SELECT ROUND(SUM(dauer_min) / 60.0, 1) AS stunden FROM auftritt;

-- c) 155 Tickets, 24025.0 Euro
SELECT COUNT(*) AS tickets, SUM(preis) AS umsatz FROM ticket;

-- d) 13 Bands
SELECT COUNT(DISTINCT band_id) AS bands
  FROM auftritt
 WHERE datum = '2026-07-18';
```

Bei b) wäre `SUM(dauer_min) / 60` falsch: Die Summe ist eine ganze Zahl, 60 ebenfalls, also wird ganzzahlig geteilt und die angebrochene Stunde fällt weg.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Wie viele Zeilen liefert SELECT COUNT(*) FROM auftritt?**

{z{1}}

{h{Nicht die Anzahl der Auftritte ist gefragt, sondern die Zeilenzahl des Ergebnisses.}}
{H{Richtig. Eine Aggregatfunktion fasst alle Zeilen zu einer zusammen.}}

**2. Was unterscheidet COUNT(*) von COUNT(spalte)?**

{r1{Nichts, beides ist gleichbedeutend.}}

{r1{!COUNT(spalte) übergeht Zeilen ohne Wert in dieser Spalte.}}

{r1{COUNT(*) zählt die Spalten.}}

{r1{COUNT(spalte) zählt nur verschiedene Werte.}}

{h{Verschiedene Werte zählt eine dritte Variante mit DISTINCT.}}
{H{Richtig. In dieser Datenbank fällt der Unterschied nicht auf, weil keine Werte fehlen.}}

**3. Wie viele verschiedene Bands treten insgesamt auf?**

{z{22}}

{h{Nutze COUNT mit DISTINCT auf der Spalte band_id in auftritt.}}
{H{Richtig – bei 46 Auftritten.}}

**4. Wann wirkt WHERE im Verhältnis zur Aggregation?**

{r2{!davor – es entscheidet, welche Zeilen eingerechnet werden}}

{r2{danach – es filtert das Ergebnis der Aggregation}}

{r2{gleichzeitig}}

{r2{WHERE und Aggregatfunktionen schließen sich aus}}

{h{Was hat WHERE datum = '2026-07-17' bewirkt?}}
{H{Richtig. Für das Filtern nach der Aggregation gibt es HAVING.}}

**5. Warum ist SELECT name, MAX(zuschauer) FROM auftritt problematisch?**

{r3{Weil MAX nur mit Zahlen funktioniert.}}

{r3{!Weil zu der einen Ergebniszeile kein bestimmter Einzelwert gehört.}}

{r3{Weil MAX und SELECT nicht zusammenpassen.}}

{r3{Weil ein ORDER BY fehlt.}}

{h{Die Aggregatfunktion macht aus 46 Zeilen eine. Welcher der 46 Namen sollte danebenstehen?}}
{H{Richtig. Manche Systeme lehnen das ab, andere liefern irgendeinen Wert.}}

::::
