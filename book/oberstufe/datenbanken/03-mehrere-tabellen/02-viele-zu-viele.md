---
title: Viele-zu-viele-Beziehungen
index: 2
---

# Viele-zu-viele-Beziehungen

Eine Band kann mehrere Genres haben. Ein Genre umfasst mehrere Bands. Solche Beziehungen lassen sich mit einem :t[Fremdschlüssel]{#fremdschluessel} allein nicht abbilden.

## Warum ein Fremdschlüssel nicht reicht

:::snippet{#aufgabe}
Angenommen, man versucht es trotzdem. Beurteile die drei Versuche:

**Versuch 1:** In `band` gibt es eine Spalte `genre_id`.

**Versuch 2:** In `band` gibt es eine Spalte `genres` mit dem Inhalt `'Indie, Rock'`.

**Versuch 3:** In `band` gibt es die Spalten `genre_1`, `genre_2`, `genre_3`.

Was geht bei jedem Versuch schief?
:::

::::collapsible{title="Auflösung"}

**Versuch 1** erlaubt jeder Band nur genau ein Genre. *Nordlicht* ist aber Indie **und** Rock.

**Versuch 2** verstößt gegen die erste Regel einer :t[Relation]{#relation}: In einer Zelle steht genau ein Wert. Die Folgen merkt man beim Abfragen – wie sucht man alle Indie-Bands? `LIKE '%Indie%'` findet auch ein hypothetisches Genre *Indietronica*. Sortieren, zählen und verbinden geht gar nicht.

**Versuch 3** legt die Zahl der Genres willkürlich auf drei fest. Bands mit einem Genre haben zwei leere Spalten, Bands mit vier passen nicht. Und die Suche nach Indie-Bands muss alle drei Spalten prüfen.

Alle drei Versuche scheitern an derselben Stelle: Eine viele-zu-viele-Beziehung ist keine Eigenschaft einer Band und keine Eigenschaft eines Genres. Sie ist eine Eigenschaft des **Paares**.

::::

## Die Lösung: eine eigene Tabelle

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Zuordnung.sql
SELECT * FROM band_genre ORDER BY band_id, genre_id;
```

:::

:::snippet{#definition}
Eine **Zuordnungstabelle** (auch: Beziehungstabelle) bildet eine viele-zu-viele-Beziehung ab. Sie enthält je einen Fremdschlüssel auf beide beteiligten Tabellen; beide zusammen bilden ihren :t[Primärschlüssel]{#primaerschluessel}.

Jede Zeile bedeutet: „Dieses Paar gehört zusammen."
:::

Eine Zeile `(1, 2)` in `band_genre` heißt also: Die Band mit `band_id = 1` gehört zum Genre mit `genre_id = 2`. Um daraus Namen zu machen, braucht man **beide** Verbunde:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Genres.sql
SELECT b.name AS band, g.name AS genre
  FROM band AS b
  JOIN band_genre AS bg ON b.band_id = bg.band_id
  JOIN genre AS g ON g.genre_id = bg.genre_id
 ORDER BY b.name, g.name;
```

:::

:::snippet{#merken}
Der Weg geht **immer** über die Zuordnungstabelle:

```
band → band_genre → genre
```

Man kann `band` und `genre` nicht direkt verbinden – sie haben keine gemeinsame Spalte. Drei Tabellen, zwei Verbundbedingungen.
:::

:::snippet{#aufgabe}
a) Wie viele Zeilen liefert die Abfrage oben? Vergleiche mit der Zeilenzahl von `band`. Warum ist sie größer?

b) Ändere die Abfrage so, dass sie nur die Bands des Genres *Metal* zeigt.

c) Ändere sie so, dass sie nur Bands zeigt, die zu **Indie** gehören und nach 2015 gegründet wurden.
:::

:::protect{password="db-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 34 Zeilen bei 22 Bands. Bands mit zwei Genres erscheinen zweimal – einmal pro Genre. Das ist kein Fehler: Jede Zeile des Ergebnisses steht für ein *Paar*, nicht für eine Band.

b)

```sql Metal.sql
SELECT b.name AS band
  FROM band AS b
  JOIN band_genre AS bg ON b.band_id = bg.band_id
  JOIN genre AS g ON g.genre_id = bg.genre_id
 WHERE g.name = 'Metal'
 ORDER BY b.name;
```

4 Bands.

c)

```sql Indie_neu.sql
SELECT b.name AS band, b.gruendungsjahr
  FROM band AS b
  JOIN band_genre AS bg ON b.band_id = bg.band_id
  JOIN genre AS g ON g.genre_id = bg.genre_id
 WHERE g.name = 'Indie' AND b.gruendungsjahr > 2015
 ORDER BY b.gruendungsjahr;
```

4 Bands.

:::

## Eine Zuordnungstabelle mit eigenen Attributen

Sieh dir `mitgliedschaft` an:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Mitglieder.sql
SELECT p.vorname, p.nachname, b.name AS band, m.instrument, m.seit
  FROM mitgliedschaft AS m
  JOIN person AS p ON p.person_id = m.person_id
  JOIN band AS b ON b.band_id = m.band_id
 ORDER BY b.name, p.nachname;
```

:::

:::snippet{#merken}
`mitgliedschaft` enthält zusätzlich `instrument` und `seit`. Diese Angaben gehören weder zur Person noch zur Band, sondern zu ihrer **Verbindung**: Dieselbe Person kann in einer Band singen und in einer anderen Bass spielen.

Das ist der Regelfall, nicht die Ausnahme. Sobald du eine Zuordnungstabelle anlegst, lohnt die Frage: Gibt es Angaben, die genau zu diesem Paar gehören?
:::

:::snippet{#brain}
Prüfe an der Datenbank nach: Findest du eine Person, die in zwei Bands verschiedene Instrumente spielt? Und wie würdest du diese Information speichern, wenn `instrument` eine Spalte in `person` wäre?
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
a) Alle Personen, die Gesang machen, mit Bandnamen.

b) Alle Genres der Band *Nordlicht*.

c) Alle Bands, die sowohl auf der Hauptbühne aufgetreten sind als auch zum Genre Rock gehören – mit Datum des Auftritts.

d) Alle Personen, die seit vor 2010 in ihrer Band sind, mit Instrument und Bandname, sortiert nach Eintrittsjahr.
:::

::::collapsible{title="Tipp 1: zu c)"}

Du brauchst vier Tabellen: `band`, `auftritt`, `buehne` und – für das Genre – `band_genre` und `genre`. Das sind fünf. Also vier Verbundbedingungen.

::::

::::collapsible{title="Tipp 2: Reihenfolge im FROM"}

Fang bei der Tabelle an, aus der die meisten Angaben kommen, und hänge die anderen der Reihe nach an. Jede neue Tabelle braucht ein `ON`, das sie mit einer der schon vorhandenen verknüpft.

::::

:::protect{password="db-3-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 19 Zeilen
SELECT p.vorname, p.nachname, b.name AS band
  FROM mitgliedschaft AS m
  JOIN person AS p ON p.person_id = m.person_id
  JOIN band AS b ON b.band_id = m.band_id
 WHERE m.instrument = 'Gesang'
 ORDER BY p.nachname;

-- b) 2 Zeilen: Indie und Rock
SELECT g.name AS genre
  FROM band AS b
  JOIN band_genre AS bg ON b.band_id = bg.band_id
  JOIN genre AS g ON g.genre_id = bg.genre_id
 WHERE b.name = 'Nordlicht';

-- c) 5 Zeilen
SELECT b.name AS band, a.datum
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
  JOIN buehne AS s ON s.buehne_id = a.buehne_id
  JOIN band_genre AS bg ON bg.band_id = b.band_id
  JOIN genre AS g ON g.genre_id = bg.genre_id
 WHERE s.name = 'Hauptbuehne' AND g.name = 'Rock'
 ORDER BY a.datum;

-- d) 18 Zeilen
SELECT p.vorname, p.nachname, m.instrument, b.name AS band, m.seit
  FROM mitgliedschaft AS m
  JOIN person AS p ON p.person_id = m.person_id
  JOIN band AS b ON b.band_id = m.band_id
 WHERE m.seit < 2010
 ORDER BY m.seit;
```

:::

<!--
KLP QPh, Daten und ihre Strukturierung: Beziehungstypen und Kardinalitäten.
Die Auflösung der n:m-Beziehung wird hier an der fertigen Datenbank
nachvollzogen und in Kapitel 5 als Modellierungsschritt eingeführt.
-->

---

## Selbsttest

::::multievent

**1. Warum reicht für eine viele-zu-viele-Beziehung kein einfacher Fremdschlüssel?**

{r1{Weil Fremdschlüssel nur Zahlen enthalten dürfen.}}

{r1{!Weil ein Fremdschlüssel je Zeile auf genau einen Wert verweist.}}

{r1{Weil Fremdschlüssel nur innerhalb einer Tabelle funktionieren.}}

{r1{Weil das Datenbanksystem das verbietet.}}

{h{Wie viele Genres kann man in einer Spalte genre_id einer Bandzeile unterbringen?}}
{H{Richtig. Für mehrere Partner braucht man mehrere Zeilen – also eine eigene Tabelle.}}

**2. Woraus besteht der Primärschlüssel einer Zuordnungstabelle üblicherweise?**

{r2{aus einer neuen fortlaufenden Nummer}}

{r2{!aus den beiden Fremdschlüsseln zusammen}}

{r2{aus dem ersten Fremdschlüssel allein}}

{r2{Zuordnungstabellen haben keinen Primärschlüssel}}

{h{Was macht ein Paar eindeutig?}}
{H{Richtig. Das Paar darf nur einmal vorkommen.}}

**3. Wie viele Verbundbedingungen brauchst du, um Bandnamen und Genrenamen zusammen anzuzeigen?**

{z{2}}

{h{Drei Tabellen sind beteiligt.}}
{H{Richtig – eine weniger als Tabellen.}}

**4. Warum liefert der Verbund über band_genre mehr Zeilen als die Tabelle band hat?**

{r3{Weil der Verbund Zeilen verdoppelt.}}

{r3{!Weil Bands mit mehreren Genres einmal je Genre erscheinen.}}

{r3{Weil eine Verbundbedingung fehlt.}}

{r3{Weil DISTINCT fehlt.}}

{h{Wofür steht eine Zeile des Ergebnisses – für eine Band oder für ein Paar?}}
{H{Richtig. Jede Ergebniszeile ist ein Paar aus Band und Genre.}}

**5. Welche Aussagen über die Tabelle mitgliedschaft stimmen?** (Mehrfachauswahl)

{c1{!Sie löst eine viele-zu-viele-Beziehung auf.}}

{c1{!Das Attribut instrument gehört zur Verbindung, nicht zur Person allein.}}

{c1{!Dieselbe Person kann in mehreren Bands stehen.}}

{c1{Sie könnte durch eine Spalte band_id in person ersetzt werden.}}

{h{Was passiert bei der letzten Variante mit Menschen, die in zwei Bands spielen?}}
{H{Richtig. Genau das ginge dann nicht mehr.}}

::::
