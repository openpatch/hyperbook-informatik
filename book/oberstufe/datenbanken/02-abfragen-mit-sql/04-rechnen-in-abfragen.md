---
title: Rechnen in Abfragen
index: 4
---

# Rechnen in Abfragen

In der `SELECT`-Liste dürfen nicht nur Spaltennamen stehen, sondern beliebige **Ausdrücke**. Damit lassen sich Werte berechnen, die so gar nicht in der Datenbank stehen.

## Berechnete Spalten

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Rechnen.sql
SELECT name, gruendungsjahr, 2026 - gruendungsjahr AS jahre_dabei
  FROM band
 ORDER BY jahre_dabei DESC;

SELECT datum, beginn, dauer_min, dauer_min / 60.0 AS stunden
  FROM auftritt;

SELECT kategorie, preis, preis * 1.19 AS brutto
  FROM ticket;
```

:::

:::snippet{#merken}
Eine berechnete Spalte braucht praktisch immer einen **Alias** – sonst heißt sie im Ergebnis `2026 - gruendungsjahr`, was sich weder gut liest noch weiterverwenden lässt.

Nach einem Alias darf `ORDER BY` sortieren. Im `WHERE` verlässt man sich besser **nicht** darauf: Der SQL-Standard erlaubt es dort nicht, und die meisten Datenbanksysteme lehnen es ab. SQLite ist an dieser Stelle großzügig – wiederhole den Ausdruck trotzdem, sonst läuft deine Abfrage nur hier. Woran das liegt, siehst du in [Kapitel 4](../04-gruppieren-und-auswerten/05-wie-eine-abfrage-ausgewertet-wird).
:::

## Ganzzahlig oder nicht?

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Teilen.sql
SELECT dauer_min, dauer_min / 60 AS variante_a, dauer_min / 60.0 AS variante_b
  FROM auftritt
 ORDER BY dauer_min;
```

:::

:::snippet{#aufgabe}
a) Führe die Abfrage aus. Was unterscheidet die beiden Varianten?

b) Ein Auftritt dauert 45 Minuten. Was liefert `45 / 60`, was `45 / 60.0`?

c) Erkläre die Regel dahinter in einem Satz.
:::

:::protect{password="db-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Variante a liefert nur ganze Zahlen, Variante b Kommazahlen.

b) `45 / 60` ergibt **0**, `45 / 60.0` ergibt **0.75**.

c) Sind beide Operanden ganze Zahlen, rechnet die Datenbank ganzzahlig und schneidet den Rest ab. Sobald einer der beiden eine Kommazahl ist, wird auch das Ergebnis eine Kommazahl. Genau dasselbe Verhalten kennst du aus Java.

:::

:::snippet{#brain}
Das ist eine beliebte Fehlerquelle in Auswertungen: `SELECT SUM(dauer_min) / 60 FROM auftritt` sieht harmlos aus und liefert auch eine plausible Zahl – nur eben eine falsche, weil die angebrochene Stunde verschwindet.

Der Fehler fällt nicht auf, weil das Ergebnis nicht absurd aussieht. Genau solche Fehler sind die gefährlichen.
:::

## Runden

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Runden.sql
SELECT dauer_min, ROUND(dauer_min / 60.0, 2) AS stunden
  FROM auftritt;

SELECT preis, ROUND(preis * 1.19, 2) AS brutto
  FROM ticket;
```

:::

## Texte verketten

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Texte.sql
SELECT vorname || ' ' || nachname AS voller_name
  FROM person
 ORDER BY nachname;

SELECT name || ' (' || herkunftsland || ')' AS beschriftung
  FROM band
 ORDER BY name;

SELECT UPPER(name) AS gross, LOWER(name) AS klein, LENGTH(name) AS zeichen
  FROM buehne;
```

:::

:::snippet{#merken}
| Ausdruck | Bedeutung |
| --- | --- |
| `a \|\| b` | verkettet zwei Texte |
| `UPPER(t)` / `LOWER(t)` | Groß- bzw. Kleinschreibung |
| `LENGTH(t)` | Anzahl der Zeichen |
| `ROUND(z, n)` | rundet auf `n` Nachkommastellen |
| `ABS(z)` | Betrag |
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
a) Zeige für jede Person den vollen Namen in der Form `Nachname, Vorname` und ihr Alter im Jahr 2026.

b) Zeige für jeden Auftritt Datum, Beginn und die Auslastung in Prozent, gerundet auf eine Nachkommastelle. Die Auslastung ist die Zuschauerzahl geteilt durch die Kapazität der Bühne – die Kapazität steht allerdings in einer anderen Tabelle. Nimm für diese Aufgabe **8000** als feste Kapazität an; die richtige Lösung folgt in Kapitel 3.

c) Zeige für jedes Ticket eine Zeile der Form `Wochenendticket: 189.0 Euro`.

d) Zeige alle Bands, deren Name mehr als 12 Zeichen hat, mit ihrer Zeichenzahl.
:::

::::collapsible{title="Tipp 1: zu a)"}

Du brauchst zwei Verkettungen: einmal zwischen Nachname und Komma-Leerzeichen, einmal zwischen diesem Zwischenergebnis und dem Vornamen. `nachname || ', ' || vorname`

::::

::::collapsible{title="Tipp 2: zu b)"}

Prozent heißt: mal 100. Und denk an die ganzzahlige Division – irgendwo muss eine Kommazahl auftauchen.

::::

::::collapsible{title="Tipp 3: zu d)"}

`LENGTH(name)` darf sowohl im `SELECT` als auch im `WHERE` stehen. Im `WHERE` musst du den Ausdruck wiederholen, der Alias hilft dort nicht.

::::

:::protect{password="db-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a)
SELECT nachname || ', ' || vorname AS name,
       2026 - geburtsjahr AS alter_2026
  FROM person
 ORDER BY nachname;

-- b)
SELECT datum, beginn,
       ROUND(zuschauer * 100.0 / 8000, 1) AS auslastung_prozent
  FROM auftritt
 ORDER BY auslastung_prozent DESC;

-- c)
SELECT kategorie || ': ' || preis || ' Euro' AS zeile
  FROM ticket;

-- d) 9 Bands
SELECT name, LENGTH(name) AS zeichen
  FROM band
 WHERE LENGTH(name) > 12
 ORDER BY zeichen DESC;
```

Bei b) ist die Reihenfolge `zuschauer * 100.0 / 8000` wichtig: Erst mal 100.0, dann teilen. Stünde `zuschauer / 8000 * 100.0`, käme wegen der ganzzahligen Division fast überall 0 heraus.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Was liefert 45 / 60 in SQL?**

{z{0}}

{h{Beide Zahlen sind ganze Zahlen.}}
{H{Richtig. Erst 45 / 60.0 liefert 0.75.}}

**2. Warum braucht eine berechnete Spalte fast immer einen Alias?**

{r1{Sonst rechnet die Datenbank falsch.}}

{r1{!Sonst heißt die Spalte im Ergebnis wie der ganze Ausdruck.}}

{r1{Sonst darf man nicht sortieren.}}

{r1{Sonst ist die Abfrage syntaktisch falsch.}}

{h{Sieh dir an, wie die Spaltenüberschrift ohne AS aussieht.}}
{H{Richtig. Lesbar ist das nicht, und weiterverwenden lässt es sich schlecht.}}

**3. Wo darf ein Alias nach dem SQL-Standard verwendet werden?**

{r2{in WHERE}}

{r2{!in ORDER BY}}

{r2{in beiden}}

{r2{in keinem von beiden}}

{h{Denk an die Reihenfolge, in der die Teile einer Abfrage ausgewertet werden.}}
{H{Richtig. SQLite erlaubt zwar auch den Alias im WHERE, andere Systeme aber nicht.}}

**4. Womit verkettet man in SQLite zwei Texte?**

{r3{mit einem Pluszeichen}}

{r3{!mit zwei senkrechten Strichen}}

{r3{mit der Funktion CONCAT}}

{r3{mit einem Kaufmanns-Und}}

{h{Sieh dir noch einmal an, wie der volle Name zusammengesetzt wurde.}}
{H{Richtig. CONCAT gibt es in anderen Systemen, hier nicht.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!In der SELECT-Liste dürfen beliebige Ausdrücke stehen.}}

{c1{!ROUND(x, 2) rundet auf zwei Nachkommastellen.}}

{c1{!Sobald ein Operand eine Kommazahl ist, ist auch das Ergebnis eine.}}

{c1{Berechnete Spalten werden dauerhaft in der Tabelle gespeichert.}}

{h{Ändert eine SELECT-Abfrage jemals die Tabelle?}}
{H{Richtig. Das Ergebnis ist eine neue Tabelle, die Ausgangstabelle bleibt unberührt.}}

::::
