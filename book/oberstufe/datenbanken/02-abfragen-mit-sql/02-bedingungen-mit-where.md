---
title: Bedingungen mit WHERE
index: 2
---

# Bedingungen mit WHERE

`SELECT` wählt Spalten aus, `WHERE` wählt Zeilen aus. Mit Fachbegriff heißt das **Selektion**.

## Vergleiche

:::snippet{#merken}
| Operator | Bedeutung |
| --- | --- |
| `=` | gleich |
| `<>` oder `!=` | ungleich |
| `<` `>` `<=` `>=` | kleiner, größer, kleiner-gleich, größer-gleich |

Texte stehen in einfachen Anführungszeichen (`'Indie'`), Zahlen nicht (`2015`). Ein Datum wird in dieser Datenbank als Text im Format `JJJJ-MM-TT` gespeichert und deshalb wie Text behandelt: `'2026-07-18'`.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Vergleiche.sql
SELECT name, gruendungsjahr FROM band WHERE gruendungsjahr > 2015;

SELECT name, kapazitaet FROM buehne WHERE kapazitaet >= 1200;

SELECT name FROM band WHERE herkunftsland <> 'Deutschland';

SELECT datum, beginn, dauer_min FROM auftritt WHERE datum > '2026-07-17';
```

:::

:::snippet{#brain}
Die letzte Abfrage vergleicht Texte mit `>`. Das funktioniert, weil das Datumsformat `JJJJ-MM-TT` so gebaut ist, dass die alphabetische Reihenfolge mit der zeitlichen übereinstimmt.

Bei `TT.MM.JJJJ` wäre das nicht so: `01.12.2026` käme alphabetisch vor `02.01.2026`. Das ist einer der Gründe, warum Datumsangaben in Datenbanken fast immer mit dem Jahr beginnen.
:::

## Bedingungen verknüpfen

:::snippet{#merken}
| Verknüpfung | Ergebnis wahr, wenn … |
| --- | --- |
| `bedingung1 AND bedingung2` | beide wahr sind |
| `bedingung1 OR bedingung2` | mindestens eine wahr ist |
| `NOT bedingung` | die Bedingung falsch ist |

`AND` bindet stärker als `OR` – genau wie Mal stärker bindet als Plus. Wo beides vorkommt, **immer klammern**.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Verknuepfen.sql
SELECT name, gruendungsjahr, herkunftsland
  FROM band
 WHERE herkunftsland = 'Deutschland' AND gruendungsjahr >= 2018;

SELECT name, herkunftsland
  FROM band
 WHERE herkunftsland = 'Schweden' OR herkunftsland = 'Norwegen';

SELECT name, kapazitaet, ueberdacht
  FROM buehne
 WHERE NOT ueberdacht = 1;
```

:::

:::snippet{#aufgabe}
Diese beiden Abfragen unterscheiden sich nur durch die Klammern:

```sql
SELECT name FROM band
 WHERE herkunftsland = 'Deutschland' OR herkunftsland = 'Irland' AND gruendungsjahr > 2010;

SELECT name FROM band
 WHERE (herkunftsland = 'Deutschland' OR herkunftsland = 'Irland') AND gruendungsjahr > 2010;
```

a) Sag **vor** dem Ausführen voraus, welche mehr Zeilen liefert und warum.

b) Führe beide aus und prüfe deine Vorhersage.

c) Formuliere für jede der beiden in einem deutschen Satz, wonach sie sucht.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Klammern.sql
SELECT name FROM band
 WHERE herkunftsland = 'Deutschland' OR herkunftsland = 'Irland' AND gruendungsjahr > 2010;

SELECT name FROM band
 WHERE (herkunftsland = 'Deutschland' OR herkunftsland = 'Irland') AND gruendungsjahr > 2010;
```

:::

:::protect{password="db-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b) Die erste liefert **16** Zeilen, die zweite **9**.

c)

- Erste: „Alle Bands aus Deutschland – und zusätzlich alle irischen Bands, die nach 2010 gegründet wurden." Weil `AND` stärker bindet, gilt die Jahresbedingung nur für die irischen Bands.
- Zweite: „Alle Bands aus Deutschland oder Irland, die nach 2010 gegründet wurden." Hier gilt die Jahresbedingung für beide Länder.

**Merke:** Die Datenbank tut immer genau das, was dasteht – nicht das, was gemeint war. Klammern kosten nichts.

:::

## Muster suchen mit LIKE

:::snippet{#definition}
`LIKE` vergleicht mit einem **Muster** statt mit einem festen Text:

| Platzhalter | Bedeutung |
| --- | --- |
| `%` | beliebig viele Zeichen, auch keins |
| `_` | genau ein beliebiges Zeichen |
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Muster.sql
SELECT name FROM band WHERE name LIKE 'B%';

SELECT name FROM band WHERE name LIKE '%berg%';

SELECT vorname, nachname FROM person WHERE nachname LIKE '_a%';

SELECT email FROM besucherin WHERE email LIKE 'm%';
```

:::

## Mengen und Bereiche

:::snippet{#merken}
| Schreibweise | Bedeutung |
| --- | --- |
| `spalte IN ('a', 'b', 'c')` | der Wert ist einer der aufgezählten |
| `spalte BETWEEN 10 AND 20` | der Wert liegt zwischen 10 und 20 – **einschließlich** der Grenzen |

`IN` ist die kurze Schreibweise für viele `OR`-Verknüpfungen, `BETWEEN` für ein `AND` aus zwei Vergleichen.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Mengen.sql
SELECT name, herkunftsland FROM band
 WHERE herkunftsland IN ('Schweden', 'Norwegen', 'Irland');

SELECT name, gruendungsjahr FROM band
 WHERE gruendungsjahr BETWEEN 2010 AND 2015;

SELECT kategorie, preis FROM ticket
 WHERE preis BETWEEN 79 AND 189;
```

:::

:::snippet{#aufgabe}
Schreibe die beiden ersten Abfragen ohne `IN` und ohne `BETWEEN` – nur mit `AND`, `OR` und Vergleichen. Prüfe, dass dasselbe herauskommt.
:::

:::protect{password="db-2-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Ohne_IN.sql
SELECT name, herkunftsland FROM band
 WHERE herkunftsland = 'Schweden'
    OR herkunftsland = 'Norwegen'
    OR herkunftsland = 'Irland';

SELECT name, gruendungsjahr FROM band
 WHERE gruendungsjahr >= 2010 AND gruendungsjahr <= 2015;
```

Beim zweiten Beispiel sieht man gut, dass `BETWEEN` die Grenzen **einschließt**: Es wird `>=` und `<=` verwendet, nicht `>` und `<`.

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
Schreibe je eine Abfrage:

a) Alle Bands, die vor 2005 gegründet wurden, mit Namen und Gründungsjahr.

b) Alle Auftritte am 17. Juli 2026, die länger als 60 Minuten dauern.

c) Alle Bühnen, die überdacht sind **und** mehr als 1000 Menschen fassen.

d) Alle Personen, deren Vorname mit `A` beginnt oder deren Nachname mit `n` endet.
:::

::::collapsible{title="Tipp 1: Womit fange ich an?"}

Frage dich bei jeder Aufgabe in dieser Reihenfolge:

1. Aus welcher Tabelle kommen die Zeilen? → `FROM`
2. Welche Zeilen davon will ich? → `WHERE`
3. Welche Spalten sollen zu sehen sein? → `SELECT`

Geschrieben wird die Abfrage dann in der umgekehrten Reihenfolge.

::::

::::collapsible{title="Tipp 2: zu d)"}

„Endet mit n" heißt: beliebig viele Zeichen, dann ein `n`. Das Muster dafür ist `'%n'`.

::::

:::protect{password="db-2-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 4 Bands
SELECT name, gruendungsjahr
  FROM band
 WHERE gruendungsjahr < 2005;

-- b) 4 Auftritte
SELECT *
  FROM auftritt
 WHERE datum = '2026-07-17' AND dauer_min > 60;

-- c) 2 Bühnen: Waldbuehne und Zeltbuehne
SELECT name, kapazitaet
  FROM buehne
 WHERE ueberdacht = 1 AND kapazitaet > 1000;

-- d) 8 Personen
SELECT vorname, nachname
  FROM person
 WHERE vorname LIKE 'A%' OR nachname LIKE '%n';
```

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Wie nennt man das Auswählen von Zeilen mit Fachbegriff?**

{r1{Projektion}}

{r1{!Selektion}}

{r1{Aggregation}}

{r1{Normalisierung}}

{h{Projektion war das Auswählen von Spalten.}}
{H{Richtig. Selektion für Zeilen, Projektion für Spalten.}}

**2. Welche Bedingung findet alle Bands, deren Name ein kleines e enthält?**

{r2{name = 'e'}}

{r2{name LIKE 'e'}}

{r2{!name LIKE '%e%'}}

{r2{name LIKE '_e_'}}

{h{Prozentzeichen stehen für beliebig viele Zeichen, auch keins.}}
{H{Richtig. Ohne die Prozentzeichen müsste der Name genau e lauten.}}

**3. Welcher Operator bindet stärker?**

{r3{OR}}

{r3{!AND}}

{r3{beide gleich stark}}

{h{Es ist wie bei Mal und Plus.}}
{H{Richtig – und deshalb klammert man, sobald beides vorkommt.}}

**4. Wie viele Zeilen liefert eine Abfrage mit BETWEEN 2010 AND 2015 für ein Gründungsjahr von genau 2010?**

{r4{Die Zeile wird nicht gefunden, weil 2010 die untere Grenze ist.}}

{r4{!Die Zeile wird gefunden, weil BETWEEN die Grenzen einschließt.}}

{r4{Das hängt von der Datenbank ab.}}

{h{BETWEEN entspricht >= und <=.}}
{H{Richtig. BETWEEN ist einschließend.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!IN ist eine Kurzschreibweise für mehrere OR-Verknüpfungen.}}

{c1{!Texte stehen in einfachen Anführungszeichen, Zahlen nicht.}}

{c1{!Der Unterstrich in LIKE steht für genau ein Zeichen.}}

{c1{WHERE bestimmt, welche Spalten im Ergebnis stehen.}}

{h{Die letzte Aussage verwechselt zwei Aufgaben.}}
{H{Richtig. Für die Spalten ist SELECT zuständig.}}

**6. Wie viele Bands wurden vor 2005 gegründet?**

{z{4}}

{h{Führe die Abfrage aus Aufgabe a) aus.}}
{H{Richtig!}}

::::
