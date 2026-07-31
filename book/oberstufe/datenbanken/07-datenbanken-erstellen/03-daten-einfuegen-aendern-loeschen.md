---
title: Daten einfügen, ändern und löschen
index: 3
---

# Daten einfügen, ändern und löschen

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**.
:::

Diese drei Anweisungen bilden zusammen mit `SELECT` die **Datenmanipulationssprache**. Anders als `SELECT` verändern sie die Datenbank – hier im Browser nur deine Kopie, in einem echten System die Daten aller.

## INSERT

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Einfuegen.sql
-- Ausführliche Form: Spalten werden benannt
INSERT INTO genre (genre_id, name)
VALUES (9, 'Reggae');

-- Kurzform: alle Spalten in Tabellenreihenfolge
INSERT INTO genre
VALUES (10, 'Klassik');

-- Mehrere Zeilen auf einmal
INSERT INTO genre (genre_id, name)
VALUES (11, 'Soul'),
       (12, 'Blues'),
       (13, 'Country');

SELECT * FROM genre ORDER BY genre_id;
```

:::

:::snippet{#merken}
Nimm die **ausführliche** Form mit Spaltennamen. Sie ist länger, aber:

- Man sieht beim Lesen, welcher Wert wohin gehört.
- Sie funktioniert weiter, wenn später eine Spalte dazukommt oder die Reihenfolge sich ändert.
- Spalten, die man weglässt, bekommen ihren Vorgabewert – bei der Kurzform muss man alle angeben.

Die Kurzform ist nur für schnelle Versuche gedacht.
:::

## UPDATE

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Aendern.sql
-- Eine einzelne Zeile ändern
UPDATE buehne
   SET kapazitaet = 3000
 WHERE buehne_id = 2;

-- Mehrere Spalten auf einmal
UPDATE band
   SET herkunftsland = 'Deutschland', gruendungsjahr = 2012
 WHERE name = 'Static Garden';

-- Mit einem Ausdruck rechnen
UPDATE ticket
   SET preis = preis * 1.05
 WHERE kategorie = 'Tagesticket';

SELECT * FROM buehne;
```

:::

:::alert{warn}
**Ein `UPDATE` ohne `WHERE` ändert jede Zeile der Tabelle.**

`UPDATE ticket SET preis = 0;` setzt alle 155 Preise auf null. Es gibt kein Rückgängig.

Gewöhne dir an, die Bedingung **zuerst** als `SELECT` zu schreiben und nachzusehen, welche Zeilen sie trifft. Erst wenn das stimmt, machst du daraus ein `UPDATE`.
:::

:::snippet{#aufgabe}
Übe den sicheren Ablauf an dieser Aufgabe: Alle Auftritte auf der Zeltbühne sollen 15 Minuten länger dauern.

a) Schreibe zuerst ein `SELECT`, das genau die Zeilen zeigt, die geändert werden sollen. Wie viele sind es?

b) Mache daraus ein `UPDATE`.

c) Prüfe mit einem zweiten `SELECT`, ob die Änderung gewirkt hat.

d) Was wäre passiert, wenn du das `WHERE` vergessen hättest?
:::

::::collapsible{title="Tipp: Vom SELECT zum UPDATE"}

Der Weg ist immer derselbe:

```sql
SELECT * FROM tabelle WHERE bedingung;
-- prüfen, dann:
UPDATE tabelle SET spalte = wert WHERE bedingung;
```

Die `WHERE`-Bedingung bleibt Zeichen für Zeichen dieselbe.

::::

:::protect{password="db-7-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```sql Pruefen.sql
SELECT * FROM auftritt WHERE buehne_id = 3;
```

12 Zeilen.

b)

```sql Aendern.sql
UPDATE auftritt
   SET dauer_min = dauer_min + 15
 WHERE buehne_id = 3;
```

c)

```sql Kontrolle.sql
SELECT auftritt_id, dauer_min FROM auftritt WHERE buehne_id = 3;
```

d) Alle 46 Auftritte wären 15 Minuten länger geworden – auch die auf den anderen drei Bühnen. Auffallen würde das erst bei der nächsten Auswertung, und dann wüsste niemand mehr, welche Werte die richtigen waren.

:::

## DELETE

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Loeschen.sql
-- Eine bestimmte Zeile
DELETE FROM bewertung
 WHERE besucher_id = 1 AND auftritt_id = 3;

-- Alle Zeilen, die eine Bedingung erfüllen
DELETE FROM bewertung
 WHERE punkte = 1;

SELECT COUNT(*) AS uebrig FROM bewertung;
```

:::

:::alert{warn}
Für `DELETE` gilt dieselbe Warnung wie für `UPDATE`, nur schärfer: **`DELETE FROM bewertung;` löscht alles.** Und gelöschte Zeilen sind weg.

Auch hier: erst `SELECT`, dann `DELETE` mit derselben Bedingung.
:::

## Warum es hier eine zweite Datenbank gibt

:::snippet{#brain}
Die Beispiele dieser Lektion laufen auf `klangwiese-uebung.sqlite`. Das ist dieselbe Datenbank – aber **ohne** Fremdschlüsselbedingungen.

Der Grund: Auf der richtigen Datenbank scheitern viele der Übungen an der referenziellen Integrität, und genau darum ging es in der letzten Lektion ja auch. Zum Üben von `INSERT`, `UPDATE` und `DELETE` wäre das nur hinderlich.

Merke dir den Unterschied trotzdem: Eine Datenbank ohne Integritätsbedingungen ist keine Erleichterung, sondern eine Datenbank, in der Widersprüche entstehen können. In der Übungsdatenbank könntest du eine Bühne löschen und Auftritte zurücklassen, die auf sie verweisen. Probier es aus – und sieh dir an, was ein :t[Verbund]{#verbund} danach liefert.
:::

## Aufgaben

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Lösungen.
-- a)

-- b)

-- c)

-- d)

```

:::

:::snippet{#aufgabe}
a) Trage eine neue Bühne ein: *Kleinkunstbuehne*, 200 Plätze, überdacht, Nummer 5.

b) Die Band *Elster* heißt jetzt *Elstern*. Ändere den Namen.

c) Alle Fördertickets sollen 5 Euro billiger werden.

d) Lösche alle Bewertungen mit weniger als 2 Punkten. Prüfe vorher mit einem `SELECT`, wie viele es sind.
:::

:::protect{password="db-7-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a)
INSERT INTO buehne (buehne_id, name, kapazitaet, ueberdacht)
VALUES (5, 'Kleinkunstbuehne', 200, 1);

-- b)
UPDATE band SET name = 'Elstern' WHERE name = 'Elster';

-- c)
UPDATE ticket SET preis = preis - 5 WHERE kategorie = 'Foerderticket';

-- d) zuerst zaehlen: 123 Zeilen
SELECT COUNT(*) FROM bewertung WHERE punkte < 2;

DELETE FROM bewertung WHERE punkte < 2;
```

Bei b) wäre `WHERE band_id = 16` genauso richtig und sogar sicherer: Der :t[Primärschlüssel]{#primaerschluessel} trifft garantiert genau eine Zeile, ein Name unter Umständen mehrere.

:::

<!--
KLP QPh (nur LK), Formale Sprachen und Automaten: verwenden eine
Datenbanksprache zum Einfügen, Abfragen, Löschen und Ändern von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Was passiert bei UPDATE ticket SET preis = 0; ohne WHERE?**

{r1{Es passiert nichts, die Anweisung ist unvollständig.}}

{r1{!Alle Zeilen der Tabelle werden geändert.}}

{r1{Nur die erste Zeile wird geändert.}}

{r1{Die Datenbank fragt vorher nach.}}

{h{Ohne Bedingung trifft die Anweisung jede Zeile.}}
{H{Richtig – und es gibt kein Rückgängig.}}

**2. Wie prüft man eine WHERE-Bedingung, bevor man sie in einem UPDATE verwendet?**

{r2{Man liest sie sorgfältig durch.}}

{r2{!Man schreibt zuerst ein SELECT mit derselben Bedingung.}}

{r2{Man führt das UPDATE aus und sieht nach.}}

{r2{Das geht nicht.}}

{h{Die Bedingung bleibt Zeichen für Zeichen dieselbe.}}
{H{Richtig. Erst sehen, was getroffen wird, dann ändern.}}

**3. Warum ist die ausführliche INSERT-Form mit Spaltennamen besser?** (Mehrfachauswahl)

{c1{!Man sieht, welcher Wert zu welcher Spalte gehört.}}

{c1{!Sie funktioniert weiter, wenn eine Spalte dazukommt.}}

{c1{!Weggelassene Spalten bekommen ihren Vorgabewert.}}

{c1{Sie ist schneller.}}

{h{Am Tempo ändert die Schreibweise nichts.}}
{H{Richtig.}}

**4. Was gehört zur Datenmanipulationssprache?** (Mehrfachauswahl)

{c2{!INSERT}}

{c2{!UPDATE}}

{c2{!DELETE}}

{c2{CREATE TABLE}}

{h{CREATE gehört zu einem anderen Teil von SQL.}}
{H{Richtig – CREATE, ALTER und DROP bilden die Datendefinitionssprache.}}

**5. Warum arbeitet diese Lektion mit einer Datenbank ohne Fremdschlüsselbedingungen?**

{r3{Weil Fremdschlüssel in SQLite nicht funktionieren.}}

{r3{!Damit die Übungen nicht an der referenziellen Integrität scheitern.}}

{r3{Weil die Übungsdatenbank kleiner ist.}}

{r3{Weil UPDATE sonst nicht erlaubt wäre.}}

{h{Erinnere dich an das gescheiterte DELETE auf der Hauptbühne.}}
{H{Richtig – für den Alltagsbetrieb wäre so eine Datenbank aber die schlechtere Wahl.}}

::::
