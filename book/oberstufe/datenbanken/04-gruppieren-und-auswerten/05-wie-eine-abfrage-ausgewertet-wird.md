---
title: Wie eine Abfrage ausgewertet wird
index: 5
---

# Wie eine Abfrage ausgewertet wird

Du kennst jetzt alle Bestandteile einer Abfrage. Zeit für die Frage, die vieles auf einmal erklärt: **In welcher Reihenfolge passiert das eigentlich?**

## Geschrieben wird anders als gerechnet

:::snippet{#merken}
Eine Abfrage wird in dieser Reihenfolge **geschrieben**:

```sql
SELECT   … 6
  FROM   … 1
  JOIN   … 1
 WHERE   … 2
 GROUP BY … 3
HAVING   … 4
 ORDER BY … 7
 LIMIT   … 8
```

Ausgewertet wird sie in dieser Reihenfolge:

| Schritt | Teil | Was passiert |
| --- | --- | --- |
| 1 | `FROM` / `JOIN` | Die beteiligten Tabellen werden zusammengeführt. |
| 2 | `WHERE` | Einzelne Zeilen werden aussortiert. |
| 3 | `GROUP BY` | Die verbliebenen Zeilen werden zu Gruppen zusammengefasst. |
| 4 | `HAVING` | Ganze Gruppen werden aussortiert. |
| 5 | Aggregatfunktionen | Je Gruppe wird gezählt, summiert, gemittelt. |
| 6 | `SELECT` | Die Ausgabespalten werden gebildet, Aliasnamen vergeben. |
| 7 | `ORDER BY` | Das Ergebnis wird sortiert. |
| 8 | `LIMIT` | Die Ausgabe wird gekürzt. |
:::

Das ist keine Kuriosität, sondern erklärt drei Dinge, die vorher wie willkürliche Regeln aussahen.

## Warum COUNT im WHERE nicht funktioniert

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Aggregat.sql
-- Diese Abfrage scheitert absichtlich. Lies die Meldung im Reiter Ausgabe.
SELECT herkunftsland, COUNT(*) AS bands
  FROM band
 WHERE COUNT(*) > 1
 GROUP BY herkunftsland;
```

:::

:::snippet{#aufgabe}
a) Führe die Abfrage aus und lies die Fehlermeldung.

b) Erkläre mit der Auswertungsreihenfolge, warum es nicht funktionieren **kann**.

c) Schreibe die Abfrage so um, dass sie läuft.
:::

::::collapsible{title="Tipp"}

`WHERE` ist Schritt 2, die Aggregatfunktionen sind Schritt 5. Was gibt es zum Zeitpunkt von Schritt 2 noch gar nicht?

::::

:::protect{password="db-4-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `misuse of aggregate: COUNT()` – sinngemäß: „COUNT steht hier an der falschen Stelle."

b) `WHERE` wird ausgewertet, **bevor** gruppiert wird. Zu diesem Zeitpunkt existiert keine einzige Gruppe – es gibt also auch nichts, dessen Größe man zählen könnte. `COUNT(*)` bezieht sich immer auf eine Gruppe, und die entsteht erst in Schritt 3.

c) Die Bedingung gehört ins `HAVING` (Schritt 4), das nach dem Gruppieren kommt:

```sql Variante_1.sql
SELECT herkunftsland, COUNT(*) AS bands
  FROM band
 GROUP BY herkunftsland
HAVING COUNT(*) > 1;
```

:::

## Warum Aliasnamen im WHERE heikel sind

Dieselbe Erklärung, nur eine Stufe subtiler. Der Alias wird in Schritt 6 vergeben, `WHERE` ist Schritt 2 – zu diesem Zeitpunkt kennt die Abfrage den Namen noch nicht. Nach dem SQL-Standard ist das deshalb verboten, und die meisten Systeme lehnen es ab.

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Alias.sql
SELECT name, 2026 - gruendungsjahr AS alter_jahre
  FROM band
 WHERE alter_jahre > 15;
```

:::

:::snippet{#merken}
Diese Abfrage **läuft hier trotzdem**. SQLite ist an dieser Stelle großzügiger als der Standard und sucht den Namen notfalls in der `SELECT`-Liste nach.

Verlass dich nicht darauf. Dieselbe Abfrage scheitert unter PostgreSQL, MySQL und den meisten anderen Systemen mit der Meldung, dass es die Spalte nicht gibt. Wiederhole im `WHERE` lieber den ganzen Ausdruck:

```sql
SELECT name, 2026 - gruendungsjahr AS alter_jahre
  FROM band
 WHERE 2026 - gruendungsjahr > 15;
```

Noch besser ist es, die Bedingung so umzustellen, dass sie direkt eine gespeicherte Spalte vergleicht – `WHERE gruendungsjahr < 2011`. Dafür kann ein Datenbanksystem einen Index nutzen; für den Ausdruck `2026 - gruendungsjahr` müsste es jede Zeile einzeln ausrechnen.
:::

:::snippet{#brain}
Dass ein System mehr erlaubt als der Standard, ist bequem und gefährlich zugleich: Man gewöhnt sich etwas an, das anderswo nicht funktioniert, und merkt es erst beim Umzug auf ein anderes System.

Solche Abweichungen gibt es bei jedem Datenbanksystem. Wer portablen Code schreiben will, hält sich an den kleinsten gemeinsamen Nenner – auch wenn das eigene System großzügiger ist.
:::

## Warum DISTINCT und GROUP BY sich ähneln

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Aehnlich.sql
SELECT DISTINCT herkunftsland FROM band ORDER BY herkunftsland;

SELECT herkunftsland FROM band GROUP BY herkunftsland ORDER BY herkunftsland;
```

:::

:::snippet{#brain}
Beide liefern dasselbe. Kein Wunder: `GROUP BY` fasst Zeilen mit gleichem Wert zusammen, und wenn man aus jeder Gruppe nur den Gruppierungswert ausgibt, ist das genau eine Liste der verschiedenen Werte.

Trotzdem sind sie nicht dasselbe Werkzeug. `GROUP BY` kann zusätzlich rechnen, `DISTINCT` nicht. Wo beides geht, ist `DISTINCT` die klarere Aussage: „Ich will jeden Wert einmal."
:::

## Eine Abfrage vorlesen

:::snippet{#merken}
Wenn du eine fremde Abfrage verstehen willst, lies sie **in der Auswertungsreihenfolge**, nicht von oben nach unten:

1. Womit fange ich an? (`FROM`, `JOIN`)
2. Was werfe ich weg? (`WHERE`)
3. Wie fasse ich zusammen? (`GROUP BY`)
4. Welche Gruppen behalte ich? (`HAVING`)
5. Was zeige ich? (`SELECT`)
6. Wie sortiere ich? (`ORDER BY`, `LIMIT`)

Das ist zugleich die beste Reihenfolge, um eine eigene Abfrage zu **schreiben**.
:::

:::snippet{#aufgabe}
Lies diese Abfrage in der Auswertungsreihenfolge und beschreibe jeden Schritt in einem Satz. Sag dann voraus, wie viele Zeilen herauskommen – **bevor** du sie ausführst.

```sql
SELECT s.name AS buehne, COUNT(*) AS lange_auftritte
  FROM auftritt AS a
  JOIN buehne AS s ON s.buehne_id = a.buehne_id
 WHERE a.dauer_min >= 75
 GROUP BY s.name
HAVING COUNT(*) >= 3
 ORDER BY lange_auftritte DESC
 LIMIT 2;
```
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Vorlesen.sql
SELECT s.name AS buehne, COUNT(*) AS lange_auftritte
  FROM auftritt AS a
  JOIN buehne AS s ON s.buehne_id = a.buehne_id
 WHERE a.dauer_min >= 75
 GROUP BY s.name
HAVING COUNT(*) >= 3
 ORDER BY lange_auftritte DESC
 LIMIT 2;
```

:::

:::protect{password="db-4-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. **FROM/JOIN:** Jeder Auftritt wird mit seiner Bühne zusammengeführt – 46 Zeilen.
2. **WHERE:** Nur Auftritte ab 75 Minuten bleiben übrig – 13 Zeilen.
3. **GROUP BY:** Diese Zeilen werden nach Bühnenname gruppiert – 3 Gruppen.
4. **HAVING:** Nur Gruppen mit mindestens drei langen Auftritten bleiben – 3 Gruppen.
5. **SELECT:** Ausgegeben werden Bühnenname und Anzahl.
6. **ORDER BY / LIMIT:** absteigend nach Anzahl, höchstens zwei Zeilen.

Ergebnis: **2 Zeilen** – Hauptbuehne mit 7 langen Auftritten und, je nach Sortierung bei Gleichstand, eine der beiden Bühnen mit je 3.

Hier lohnt der genaue Blick: `HAVING` lässt **drei** Gruppen übrig (Hauptbuehne 7, Waldbuehne 3, Zeltbuehne 3), erst `LIMIT 2` schneidet auf zwei. Und weil Waldbuehne und Zeltbuehne gleichauf liegen, ist nicht festgelegt, welche von beiden es ins Ergebnis schafft. Ein zweites Sortierkriterium – `ORDER BY lange_auftritte DESC, buehne` – würde das Ergebnis eindeutig machen.

:::

## Syntax, Semantik und Auswertung

:::snippet{#definition}
- Die **Syntax** legt fest, in welcher Reihenfolge die Teile *geschrieben* werden. Ein `WHERE` hinter dem `GROUP BY` ist ein Syntaxfehler.
- Die **Semantik** legt fest, welches Ergebnis eine Abfrage *bedeutet* – und dafür ist die Auswertungsreihenfolge maßgeblich.

Beides fällt bei SQL auffällig auseinander: Man schreibt `SELECT` zuerst, gerechnet wird es fast zuletzt.
:::

:::snippet{#brain}
Ein Datenbanksystem darf eine Abfrage tatsächlich in **beliebiger** Reihenfolge ausführen – solange das Ergebnis dasselbe ist wie bei der Auswertung nach dem obigen Schema. Meistens tut es das auch: Es wird zum Beispiel filtern, bevor es verbindet, weil das viel weniger Arbeit ist.

Die Auswertungsreihenfolge beschreibt also nicht, was der Rechner *tut*, sondern was die Abfrage *bedeutet*. Genau das ist der Unterschied zwischen einer **deskriptiven** Sprache wie SQL und einer **imperativen** wie Java: In Java beschreibst du den Weg, in SQL das Ziel.
:::

<!--
KLP QPh, Formale Sprachen und Automaten: erläutern die Syntax und Semantik von
Programmen und Datenbankabfragen (A). Diese Lektion ist der zentrale Ort für
diese Kompetenzerwartung.
-->

---

## Selbsttest

::::multievent

**1. Welcher Teil einer Abfrage wird zuerst ausgewertet?**

{r1{SELECT}}

{r1{!FROM}}

{r1{WHERE}}

{r1{ORDER BY}}

{h{Bevor man filtern kann, muss klar sein, worauf.}}
{H{Richtig. Geschrieben wird SELECT zuerst, ausgewertet fast zuletzt.}}

**2. Warum darf ein Alias aus der SELECT-Liste im ORDER BY stehen, im WHERE aber nicht?**

{r2{Weil ORDER BY optional ist.}}

{r2{!Weil ORDER BY nach SELECT ausgewertet wird, WHERE davor.}}

{r2{Weil WHERE keine berechneten Werte kennt.}}

{r2{Das ist eine willkürliche Festlegung des Standards.}}

{h{Schritt 2 gegen Schritt 6 gegen Schritt 7.}}
{H{Richtig. Zum Zeitpunkt von WHERE existiert der Alias noch nicht.}}

**3. Bringe in die richtige Auswertungsreihenfolge: WHERE, GROUP BY, HAVING, SELECT.**

{S1{WHERE}}
{S1{GROUP BY}}
{S1{HAVING}}
{S1{SELECT}}

{h{Erst Zeilen filtern, dann gruppieren, dann Gruppen filtern, dann ausgeben.}}
{H{Richtig!}}

**4. Was beschreibt die Auswertungsreihenfolge?**

{r3{was der Rechner Schritt für Schritt tut}}

{r3{!was die Abfrage bedeutet}}

{r3{in welcher Reihenfolge man sie schreiben muss}}

{r3{wie schnell die Abfrage ist}}

{h{Ein Datenbanksystem darf umsortieren, solange das Ergebnis stimmt.}}
{H{Richtig. SQL beschreibt das Ziel, nicht den Weg.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!SQL ist eine deskriptive Sprache.}}

{c1{!Aggregatfunktionen werden nach dem Gruppieren ausgewertet.}}

{c1{!LIMIT wirkt ganz am Ende.}}

{c1{Ein WHERE nach dem GROUP BY ist erlaubt, wirkt dann aber wie HAVING.}}

{h{Die letzte Aussage betrifft die Syntax, nicht die Bedeutung.}}
{H{Richtig. Ein WHERE an dieser Stelle ist schlicht ein Syntaxfehler.}}

::::
