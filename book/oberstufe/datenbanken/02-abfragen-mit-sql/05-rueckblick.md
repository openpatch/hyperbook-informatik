---
title: Rückblick
index: 5
---

# Rückblick

Vier Lektionen, ein Satzbau: `SELECT … FROM … WHERE … ORDER BY … LIMIT`. Alles, was in diesem Kapitel dazukam, hängt an einer dieser fünf Stellen. Wenn du das im Kopf hast, kannst du jede Abfrage über **eine** Tabelle schreiben.

## Das kann ich jetzt

- [ ] Ich kann Spalten auswählen (**Projektion**) und ihnen mit `AS` einen Namen geben. ([2.1](./01-select-und-from))
- [ ] Ich kann Zeilen auswählen (**Selektion**) und Bedingungen mit `AND`, `OR`, `NOT` verknüpfen – mit Klammern, wo nötig. ([2.2](./02-bedingungen-mit-where))
- [ ] Ich kann mit `LIKE`, `IN` und `BETWEEN` umgehen. ([2.2](./02-bedingungen-mit-where))
- [ ] Ich kann Ergebnisse sortieren, Doppelte entfernen und die Ausgabe begrenzen. ([2.3](./03-sortieren-und-begrenzen))
- [ ] Ich kann in einer Abfrage rechnen und weiß, wann eine Division ganzzahlig wird. ([2.4](./04-rechnen-in-abfragen))
- [ ] Ich kann den Unterschied zwischen einem **Syntax-** und einem **Semantikfehler** an einem Beispiel erklären. ([2.1](./01-select-und-from))

## Gemischte Aufgaben

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Lösungen.
-- a)

-- b)

-- c)

-- d)

-- e)

```

:::

:::snippet{#aufgabe}
**Aufgabe 1: Fünf Abfragen**

a) Name und Kapazität aller Bühnen, die mindestens 1000 Menschen fassen – die größte zuerst.

b) Alle vorkommenden Ticketkategorien mit ihrem Preis, jede nur **einmal**, teuerste zuerst.

c) Alle Bands aus Deutschland oder Oesterreich, die nach 2010 gegründet wurden, alphabetisch nach Namen.

d) Alle Auftritte, die länger als 60 Minuten dauern: Datum, Beginn und die Dauer **in Stunden**, auf eine Nachkommastelle gerundet.

e) Die fünf Auftritte mit den meisten Zuschauern – Datum, Beginn und Zuschauerzahl.
:::

::::collapsible{title="Tipp 1: In welcher Reihenfolge denke ich?"}

Immer dieselben vier Fragen, in dieser Reihenfolge:

1. Aus welcher Tabelle? → `FROM`
2. Welche Zeilen? → `WHERE`
3. Welche Spalten? → `SELECT`
4. In welcher Ordnung, wie viele? → `ORDER BY`, `LIMIT`

::::

::::collapsible{title="Tipp 2: zu b) und d)"}

Zu b): „Jede nur einmal" ist das Stichwort für `DISTINCT`. Achte darauf, dass sich `DISTINCT` auf die **ganze Zeile** bezieht, nicht nur auf die erste Spalte.

Zu d): Minuten in Stunden heißt teilen durch 60. Schreib `60.0` statt `60`, sonst rechnet SQLite ganzzahlig und alles wird 1 oder 2.

::::

:::protect{password="db-2-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rueckblick-2-1.sql
-- a) 3 Buehnen: Hauptbuehne, Waldbuehne, Zeltbuehne
SELECT name, kapazitaet
  FROM buehne
 WHERE kapazitaet >= 1000
 ORDER BY kapazitaet DESC;

-- b) 4 Zeilen
SELECT DISTINCT kategorie, preis
  FROM ticket
 ORDER BY preis DESC;

-- c) 9 Bands
SELECT name, herkunftsland, gruendungsjahr
  FROM band
 WHERE (herkunftsland = 'Deutschland' OR herkunftsland = 'Oesterreich')
       AND gruendungsjahr > 2010
 ORDER BY name;

-- d) 13 Auftritte
SELECT datum, beginn, ROUND(dauer_min / 60.0, 1) AS stunden
  FROM auftritt
 WHERE dauer_min > 60
 ORDER BY dauer_min DESC;

-- e) 5 Auftritte, der groesste mit 6260 Zuschauern
SELECT datum, beginn, zuschauer
  FROM auftritt
 ORDER BY zuschauer DESC
 LIMIT 5;
```

Zwei Stolperstellen:

- Bei c) sind die Klammern nötig. Ohne sie bindet `AND` stärker, und die Abfrage liefert **alle** deutschen Bands plus die österreichischen nach 2010.
- Bei d) liefert `dauer_min / 60` ganze Zahlen: Aus 90 Minuten würde 1 statt 1.5. Erst der Punkt in `60.0` macht daraus eine Kommazahl.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier fehlerhafte Abfragen**

Jede dieser Abfragen ist falsch. Sag für jede: Ist es ein **Syntaxfehler** oder ein **Semantikfehler**? Was ist die Wirkung, und wie lautet die richtige Fassung?

```sql
-- a)
SELECT name FROM band WHERE herkunftsland = Deutschland;

-- b)
SELECT name, kapazitaet FROM buehne ORDER BY kapazitaet WHERE kapazitaet > 1000;

-- c)
SELECT name FROM band WHERE gruendungsjahr > 2010 OR gruendungsjahr < 2020;

-- d)
SELECT datum, zuschauer FROM auftritt LIMIT 3;
```

Zu d) gehört die Frage: Die Abfrage läuft fehlerfrei. Warum ist sie als Antwort auf „Zeig mir die drei bestbesuchten Auftritte" trotzdem falsch?
:::

::::collapsible{title="Tipp"}

**Syntaxfehler** heißt: Das Datenbanksystem versteht den Satz nicht und weigert sich. **Semantikfehler** heißt: Es versteht ihn, führt ihn aus – und liefert etwas anderes, als du wolltest. Die zweite Sorte ist die gefährliche.

::::

:::protect{password="db-2-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Syntaxfehler.** `Deutschland` ohne Anführungszeichen wird als Spaltenname gelesen; eine solche Spalte gibt es nicht. Richtig: `WHERE herkunftsland = 'Deutschland'`.

b) **Syntaxfehler.** Die Reihenfolge der Klauseln liegt fest: `WHERE` steht vor `ORDER BY`. Richtig:

```sql
SELECT name, kapazitaet FROM buehne WHERE kapazitaet > 1000 ORDER BY kapazitaet;
```

c) **Semantikfehler.** Die Abfrage läuft und liefert **alle** Bands, denn jedes Jahr ist entweder größer als 2010 oder kleiner als 2020 – meistens sogar beides. Gemeint war offensichtlich `AND`. Das ist der klassische Fall: kein Fehler, nur ein falsches Ergebnis.

d) **Semantikfehler.** `LIMIT` ohne `ORDER BY` schneidet drei **beliebige** Zeilen ab – welche, ist nicht festgelegt. Richtig:

```sql
SELECT datum, zuschauer FROM auftritt ORDER BY zuschauer DESC LIMIT 3;
```

**Merke:** `LIMIT` ohne `ORDER BY` ist fast immer ein Fehler, und zwar einer, den niemand bemerkt.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Abfragen lesen**

Formuliere für jede Abfrage einen deutschen Satz, der sagt, **wonach** sie sucht. Sag außerdem voraus, wie viele Zeilen etwa herauskommen – wenige, etwa die Hälfte oder fast alle.

```sql
-- a)
SELECT vorname, nachname FROM person WHERE nachname LIKE '%er';

-- b)
SELECT DISTINCT herkunftsland FROM band ORDER BY herkunftsland;

-- c)
SELECT kategorie, preis, ROUND(preis * 0.9, 2) AS ermaessigt
  FROM ticket
 WHERE preis BETWEEN 50 AND 200;

-- d)
SELECT name FROM band WHERE LENGTH(name) > 12 ORDER BY name;
```

Prüfe deine Vorhersagen danach im Übungsbereich.
:::

:::protect{password="db-2-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) „Alle Personen, deren Nachname auf *er* endet." – **8 Zeilen**, also wenige.

b) „Aus welchen Ländern kommen die Bands? Jedes Land nur einmal, alphabetisch." – **8 Zeilen**. Bei 22 Bands zeigt das, wie stark `DISTINCT` zusammenfasst.

c) „Alle Tickets, die zwischen 50 und 200 Euro gekostet haben, mit einem um zehn Prozent ermäßigten Preis." – **90 Zeilen** von 155, also etwa die Hälfte. Beachte: Es sind Tickets, nicht Kategorien – dieselbe Kategorie erscheint viele Male.

d) „Alle Bands, deren Name länger als zwölf Zeichen ist." – **9 Zeilen**.

Bei c) lohnt der zweite Blick: Ohne `DISTINCT` liefert die Abfrage jede einzelne verkaufte Karte. Wer nach den *Kategorien* gefragt wird, muss das ergänzen.

:::

<!--
Rückblick zum Inhaltsfeld Formale Sprachen und Automaten: verwenden eine
Datenbanksprache zum Abfragen von Daten (I); Aufgabe 2 zielt auf die
Unterscheidung von Syntax und Semantik (DI).
-->

---

## Selbsttest

::::multievent

**1. Welche Klausel wählt Zeilen aus?**

{r1{SELECT}}

{r1{!WHERE}}

{r1{FROM}}

{r1{ORDER BY}}

{h{Spalten auswählen ist Projektion, Zeilen auswählen ist Selektion.}}
{H{Richtig.}}

**2. Bringe die Klauseln in die Reihenfolge, in der sie geschrieben werden.**

{S1{SELECT}}

{S1{FROM}}

{S1{WHERE}}

{S1{ORDER BY}}

{S1{LIMIT}}

{h{Es ist die Reihenfolge, die das Datenbanksystem verlangt – nicht die, in der man denkt.}}
{H{Richtig.}}

**3. In welchem Fall braucht die Bedingung zwingend Klammern?**

{r2{wenn zwei Bedingungen mit AND verknüpft sind}}

{r2{!wenn AND und OR gemischt vorkommen}}

{r2{wenn NOT vorkommt}}

{r2{wenn LIKE vorkommt}}

{h{AND bindet stärker – wie Mal gegenüber Plus.}}
{H{Richtig.}}

**4. Was liefert die Bedingung name LIKE Prozentzeichen n?**

{r3{alle Namen, die mit n beginnen}}

{r3{!alle Namen, die auf n enden}}

{r3{alle Namen, die genau ein n enthalten}}

{r3{alle Namen mit mindestens einem n}}

{h{Das Prozentzeichen steht für beliebig viele Zeichen – und es steht vorn.}}
{H{Richtig.}}

**5. Was ist an einer Abfrage mit LIMIT 3 ohne ORDER BY problematisch?**

{r4{Sie ist syntaktisch falsch.}}

{r4{!Welche drei Zeilen kommen, ist nicht festgelegt.}}

{r4{Sie liefert immer die drei ersten eingefügten Zeilen.}}

{r4{Sie ist langsamer als mit Sortierung.}}

{h{Ohne Sortierung gibt es keine erste, zweite, dritte Zeile.}}
{H{Richtig – ein Fehler, der nie eine Fehlermeldung erzeugt.}}

**6. Was ergibt dauer_min geteilt durch 60 bei einer Dauer von 90 Minuten in SQLite?**

{z{1}}

{h{Zwei ganze Zahlen geteilt ergeben wieder eine ganze Zahl.}}
{H{Richtig – der Rest fällt weg. Mit 60.0 käme 1.5 heraus.}}

**7. Eine Abfrage läuft ohne Fehlermeldung, liefert aber das Falsche. Wie nennt man das?**

{r5{Syntaxfehler}}

{r5{!Semantikfehler}}

{r5{Laufzeitfehler}}

{r5{Integritätsverletzung}}

{h{Das System hat den Satz verstanden – nur nicht so, wie du ihn meintest.}}
{H{Richtig. Diese Sorte findet nur, wer das Ergebnis prüft.}}

**8. Worauf bezieht sich DISTINCT?**

{r6{nur auf die erste Spalte}}

{r6{!auf die ganze ausgewählte Zeile}}

{r6{auf die Tabelle vor der Auswahl}}

{r6{auf die Sortierreihenfolge}}

{h{Zwei Zeilen gelten als gleich, wenn sie in allen ausgewählten Spalten übereinstimmen.}}
{H{Richtig.}}

::::
