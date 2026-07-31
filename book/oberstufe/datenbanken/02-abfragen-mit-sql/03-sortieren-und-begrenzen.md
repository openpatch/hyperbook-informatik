---
title: Sortieren und begrenzen
index: 3
---

# Sortieren und begrenzen

Eine :t[Relation]{#relation} ist eine **Menge** von Tupeln – eine Reihenfolge gibt es darin nicht. Wenn du eine willst, musst du sie anfordern.

:::alert{info}
Ohne `ORDER BY` ist die Reihenfolge des Ergebnisses **nicht garantiert**. Dass sie oft trotzdem sinnvoll aussieht, ist ein Nebeneffekt davon, wie das Datenbanksystem die Daten gerade findet – darauf verlassen darf man sich nicht.
:::

## ORDER BY

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Sortieren.sql
SELECT name, gruendungsjahr FROM band ORDER BY name;

SELECT name, gruendungsjahr FROM band ORDER BY gruendungsjahr DESC;

SELECT name, herkunftsland, gruendungsjahr
  FROM band
 ORDER BY herkunftsland ASC, gruendungsjahr DESC;
```

:::

:::snippet{#merken}
- `ASC` sortiert aufsteigend (A→Z, 0→9). Das ist die Voreinstellung und darf weggelassen werden.
- `DESC` sortiert absteigend.
- Mehrere Spalten werden **nacheinander** ausgewertet: Erst nach der ersten, und nur bei Gleichstand entscheidet die zweite.
- `ORDER BY` steht immer **am Ende** der Abfrage.
:::

:::snippet{#aufgabe}
Sieh dir die dritte Abfrage an.

a) Welche Zeile steht ganz oben? Sag es voraus, bevor du ausführst.

b) Was ändert sich, wenn du die beiden Sortierspalten vertauschst?

c) Sortiere die Auftritte nach Datum und innerhalb eines Tages nach Beginn. Welcher Auftritt eröffnet das Festival?
:::

:::protect{password="db-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Bands aus Deutschland stehen ganz oben, weil `Deutschland` alphabetisch vor `Frankreich`, `Irland` usw. kommt. Innerhalb Deutschlands steht die jüngste Band zuerst: *Papierflieger* (2022).

b) Bei `ORDER BY gruendungsjahr DESC, herkunftsland` steht die insgesamt jüngste Band ganz oben, und das Herkunftsland entscheidet nur noch bei gleichem Jahr.

c)

```sql Eroeffnung.sql
SELECT * FROM auftritt ORDER BY datum, beginn;
```

Der erste Auftritt beginnt am 16. Juli um 17:30 Uhr auf der Waldbühne.

:::

## Doppelte entfernen

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Verschieden.sql
SELECT herkunftsland FROM band;

SELECT DISTINCT herkunftsland FROM band ORDER BY herkunftsland;

SELECT DISTINCT instrument FROM mitgliedschaft ORDER BY instrument;

SELECT DISTINCT datum, buehne_id FROM auftritt ORDER BY datum, buehne_id;
```

:::

:::snippet{#merken}
`DISTINCT` entfernt doppelte **Ergebniszeilen**. Es bezieht sich immer auf die gesamte Zeile, nicht auf eine einzelne Spalte: `SELECT DISTINCT datum, buehne_id` liefert jede *Kombination* aus Datum und Bühne einmal.
:::

:::snippet{#aufgabe}
a) Wie viele Zeilen liefert die erste Abfrage, wie viele die zweite? Erkläre den Unterschied.

b) Wie viele verschiedene Instrumente werden auf dem Festival gespielt?

c) Die vierte Abfrage liefert weniger Zeilen als `SELECT * FROM auftritt`. Was bedeutet das inhaltlich?
:::

::::collapsible{title="Tipp: zu c)"}

Überlege, was passiert, wenn an einem Tag auf derselben Bühne **mehrere** Bands spielen.

::::

:::protect{password="db-2-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 22 gegenüber 8. Die erste Abfrage liefert für jede Band eine Zeile, auch wenn dasselbe Land 15-mal vorkommt. `DISTINCT` fasst gleiche Zeilen zu einer zusammen.

b) 12 verschiedene Instrumente.

c) 16 statt 46 Zeilen. Jede Kombination aus Tag und Bühne kommt nur einmal vor – es gibt also 16 „Bühnentage", auf denen insgesamt 46 Auftritte stattfinden. Im Schnitt spielen also knapp drei Bands pro Bühne und Tag.

:::

## Die Ausgabe begrenzen

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Begrenzen.sql
SELECT name, gruendungsjahr FROM band ORDER BY gruendungsjahr LIMIT 3;

SELECT band_id, datum, zuschauer FROM auftritt ORDER BY zuschauer DESC LIMIT 5;

SELECT name FROM band ORDER BY name LIMIT 5 OFFSET 10;
```

:::

:::snippet{#merken}
`LIMIT n` gibt höchstens `n` Zeilen aus, `OFFSET k` überspringt vorher `k` Zeilen.

`LIMIT` ist fast immer nur zusammen mit `ORDER BY` sinnvoll. Ohne Sortierung bekommst du irgendwelche `n` Zeilen – und beim nächsten Mal vielleicht andere.
:::

:::snippet{#brain}
`LIMIT` gehört streng genommen nicht zum SQL-Standard, sondern ist eine Erweiterung, die die meisten Systeme anbieten – SQLite, MySQL und PostgreSQL mit `LIMIT`, andere mit `TOP` oder `FETCH FIRST`.

Das ist typisch für SQL: Der Kern ist überall gleich, an den Rändern unterscheiden sich die Systeme. Wenn du eine Abfrage von einem System auf ein anderes überträgst, sind es meistens genau diese Ränder, die Ärger machen.
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
a) Die drei ältesten Bands, mit Name und Gründungsjahr, älteste zuerst.

b) Alle verschiedenen Ticketkategorien.

c) Die fünf am besten besuchten Auftritte: Datum, Beginn und Zuschauerzahl, absteigend sortiert.

d) Alle Bühnen, nach Kapazität absteigend. Überlege vorher, welche Bühne oben steht.
:::

:::protect{password="db-2-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) Bergwerk (1995), Grauwacke (1998), Die Ruhrpott-Philharmoniker (2001)
SELECT name, gruendungsjahr
  FROM band
 ORDER BY gruendungsjahr ASC
 LIMIT 3;

-- b) vier Kategorien
SELECT DISTINCT kategorie
  FROM ticket
 ORDER BY kategorie;

-- c)
SELECT datum, beginn, zuschauer
  FROM auftritt
 ORDER BY zuschauer DESC
 LIMIT 5;

-- d) Hauptbuehne (8000) steht oben
SELECT name, kapazitaet
  FROM buehne
 ORDER BY kapazitaet DESC;
```

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Was passiert, wenn eine Abfrage kein ORDER BY hat?**

{r1{Das Ergebnis ist immer nach dem Primärschlüssel sortiert.}}

{r1{!Die Reihenfolge des Ergebnisses ist nicht garantiert.}}

{r1{Die Abfrage liefert einen Fehler.}}

{r1{Das Ergebnis ist alphabetisch sortiert.}}

{h{Denk daran, dass eine Relation eine Menge ist.}}
{H{Richtig. Wer eine Reihenfolge braucht, muss sie anfordern.}}

**2. Was bewirkt ORDER BY land, name?**

{r2{Es sortiert nur nach Land.}}

{r2{Es sortiert nur nach Name.}}

{r2{!Es sortiert nach Land, und bei gleichem Land nach Name.}}

{r2{Es sortiert abwechselnd nach beiden Spalten.}}

{h{Die zweite Spalte kommt nur zum Zug, wenn die erste keine Entscheidung liefert.}}
{H{Richtig. Die erste Spalte ist das Hauptkriterium.}}

**3. Worauf bezieht sich DISTINCT?**

{r3{auf die erste Spalte des SELECT}}

{r3{!auf die gesamte Ergebniszeile}}

{r3{auf alle Spalten der Tabelle}}

{r3{auf den Primärschlüssel}}

{h{Denk an SELECT DISTINCT datum, buehne_id.}}
{H{Richtig. Deshalb liefert DISTINCT mit zwei Spalten jede Kombination einmal.}}

**4. Warum sollte man LIMIT nur zusammen mit ORDER BY verwenden?**

{r4{Weil LIMIT ohne ORDER BY einen Fehler liefert.}}

{r4{!Weil ohne Sortierung nicht festgelegt ist, welche Zeilen man bekommt.}}

{r4{Weil LIMIT sonst zu langsam ist.}}

{r4{Weil ORDER BY sonst nicht funktioniert.}}

{h{Die ersten n Zeilen wovon?}}
{H{Genau. Ohne Sortierung ist „die ersten fünf" keine sinnvolle Aussage.}}

**5. Wie viele verschiedene Herkunftsländer liefert SELECT DISTINCT herkunftsland FROM band?**

{z{8}}

{h{Führe die Abfrage aus und lies die Zeilenzahl über der Ergebnistabelle ab.}}
{H{Richtig – bei 22 Bands insgesamt.}}

**6. Ergänze: Um die Zeilen 11 bis 15 eines sortierten Ergebnisses zu bekommen, schreibt man LIMIT 5 {t{OFFSET}} 10.**

::::
