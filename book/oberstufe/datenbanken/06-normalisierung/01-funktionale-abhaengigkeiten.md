---
title: Funktionale Abhängigkeiten
index: 1
---

# Funktionale Abhängigkeiten

Bevor man eine Tabelle zerlegen kann, muss man wissen, **welche Angabe von welcher abhängt**. Genau das beschreibt eine funktionale Abhängigkeit.

## Die Ausgangstabelle

Wir arbeiten mit der unnormalisierten Auftrittsliste aus [Kapitel 1](../01-daten-in-tabellen/01-warum-datenbanken):

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="420px"}

```mysql Roh.sql
SELECT * FROM auftrittsliste ORDER BY band, datum, beginn;
```

:::

Ihr Schema:

```
auftrittsliste(band, herkunftsland, genres, buehne, buehnen_kapazitaet, datum, beginn, dauer_min)
```

## Der Begriff

:::snippet{#definition}
Ein Attribut **B** ist **funktional abhängig** von einer Attributmenge **A**, wenn zu jedem Wert von A **höchstens ein** Wert von B gehört.

Man schreibt **A → B** und sagt: „A bestimmt B."

Die Betonung liegt auf *höchstens einem*: Wenn ich A kenne, kenne ich B – ohne nachsehen zu müssen, um welche Zeile es geht.
:::

:::snippet{#beispiel}
In der Auftrittsliste gilt `band → herkunftsland`.

Prüfen kann man das so: Suche zwei Zeilen mit demselben Bandnamen und **verschiedenem** Herkunftsland. Findest du keine – und kann es aus inhaltlichen Gründen keine geben –, gilt die Abhängigkeit.

Umgekehrt gilt `herkunftsland → band` **nicht**: Zu `Deutschland` gehören 15 verschiedene Bands.
:::

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="760px"}

```mysql Pruefen.sql
-- Gibt es einen Bandnamen mit mehr als einem Herkunftsland?
SELECT band, COUNT(DISTINCT herkunftsland) AS laender
  FROM auftrittsliste
 GROUP BY band
HAVING COUNT(DISTINCT herkunftsland) > 1;

-- Gibt es eine Buehne mit mehr als einer Kapazitaet?
SELECT buehne, COUNT(DISTINCT buehnen_kapazitaet) AS werte
  FROM auftrittsliste
 GROUP BY buehne
HAVING COUNT(DISTINCT buehnen_kapazitaet) > 1;
```

:::

:::snippet{#merken}
Beide Abfragen liefern **kein** Ergebnis. Das ist ein Hinweis darauf, dass die Abhängigkeiten gelten – aber **kein Beweis**.

Eine funktionale Abhängigkeit ist eine Aussage über alle *möglichen* Daten, nicht über die gerade vorhandenen. Die Daten können sie **widerlegen** (ein Gegenbeispiel genügt), aber nie beweisen. Begründen muss man sie inhaltlich: Eine Band hat nun einmal genau ein Herkunftsland.
:::

## Abhängigkeiten von zusammengesetzten Attributmengen

Links vom Pfeil dürfen mehrere Attribute stehen.

:::snippet{#aufgabe}
a) Was bestimmt in der Auftrittsliste eine einzelne Zeile eindeutig? Anders gefragt: Welche Attributmenge ist ein Schlüsselkandidat?

b) Prüfe deinen Vorschlag mit einer Abfrage.

c) Schreibe alle funktionalen Abhängigkeiten auf, die du in der Tabelle findest.
:::

::::collapsible{title="Tipp 1: Womit fange ich an?"}

Eine Zeile beschreibt einen Auftritt. Was macht einen Auftritt eindeutig? Nicht die Band allein – manche treten mehrfach auf. Nicht der Zeitpunkt allein – gleichzeitig laufen mehrere Auftritte.

::::

::::collapsible{title="Tipp 2: So prüfst du einen Schlüsselkandidaten"}

```sql
SELECT a, b, c, COUNT(*)
  FROM auftrittsliste
 GROUP BY a, b, c
HAVING COUNT(*) > 1;
```

Liefert das nichts, kommt keine Kombination doppelt vor.

::::

:::protect{password="db-6-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `band`, `datum`, `beginn`. Eine Band spielt zu einem Zeitpunkt an einem Tag höchstens einmal.

Auch `buehne`, `datum`, `beginn` wäre ein Schlüsselkandidat: Auf einer Bühne läuft zu einer Zeit nur ein Auftritt. Es gibt also **zwei** Schlüsselkandidaten. Wir wählen den ersten als :t[Primärschlüssel]{#primaerschluessel}.

b)

```sql Schluessel.sql
SELECT band, datum, beginn, COUNT(*) AS anzahl
  FROM auftrittsliste
 GROUP BY band, datum, beginn
HAVING COUNT(*) > 1;
```

Kein Ergebnis – die Kombination kommt nie doppelt vor.

c)

| Abhängigkeit | Begründung |
| --- | --- |
| `band, datum, beginn → alle übrigen` | Der Primärschlüssel bestimmt die ganze Zeile. |
| `band → herkunftsland` | Eine Band kommt aus genau einem Land. |
| `band → genres` | Die Genres hängen an der Band, nicht am Auftritt. |
| `buehne → buehnen_kapazitaet` | Eine Bühne fasst immer gleich viele Menschen. |
| `band, datum, beginn → buehne` | Der Auftritt findet auf genau einer Bühne statt. |
| `buehne, datum, beginn → band` | Zweiter Schlüsselkandidat. |

Genau die mittleren drei Abhängigkeiten sind das Problem – sie sind der Grund für die ganze Redundanz. Warum, klärt die nächste Lektion.

:::

## Volle und partielle Abhängigkeit

:::snippet{#definition}
Ist eine Attributmenge **A** zusammengesetzt, unterscheidet man:

- **B ist voll funktional abhängig von A**, wenn B von A abhängt, aber von **keiner echten Teilmenge** von A.
- **B ist partiell abhängig von A**, wenn schon ein *Teil* von A ausreicht, um B zu bestimmen.
:::

:::snippet{#beispiel}
Der Primärschlüssel ist `band`, `datum`, `beginn`.

- `dauer_min` ist **voll** abhängig: Man braucht alle drei Angaben. Weder die Band allein noch das Datum allein legt die Dauer fest.
- `herkunftsland` ist **partiell** abhängig: Schon `band` allein genügt. Die anderen beiden Schlüsselteile sind überflüssig.

Diese Unterscheidung ist der Kern der 2. :t[Normalform]{#normalform}.
:::

:::snippet{#aufgabe}
Ordne jedes Attribut der Auftrittsliste ein: voll oder partiell abhängig vom Primärschlüssel `band`, `datum`, `beginn`?

`herkunftsland`, `genres`, `buehne`, `buehnen_kapazitaet`, `dauer_min`
:::

:::protect{password="db-6-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Attribut | Abhängigkeit | Begründung |
| --- | --- | --- |
| `herkunftsland` | **partiell** | `band` allein genügt. |
| `genres` | **partiell** | `band` allein genügt. |
| `buehne` | **voll** | Erst alle drei Angaben legen den Auftritt und damit die Bühne fest. |
| `buehnen_kapazitaet` | **voll** – aber siehe unten | Auch hier braucht man alle drei. |
| `dauer_min` | **voll** | Alle drei nötig. |

Bei `buehnen_kapazitaet` lohnt der genaue Blick: Sie ist zwar voll vom Schlüssel abhängig, aber nur auf einem **Umweg** – über `buehne`. Es gilt

```
band, datum, beginn → buehne → buehnen_kapazitaet
```

Eine solche Kette heißt **transitive Abhängigkeit**. Sie ist der Kern der 3. Normalform.

:::

## Die drei Fälle im Überblick

:::snippet{#merken}
| Fall | Muster | Wird beseitigt durch |
| --- | --- | --- |
| Mehrere Werte in einer Zelle | `genres = 'Indie, Rock'` | 1. Normalform |
| Partielle Abhängigkeit vom Schlüssel | `band → herkunftsland` | 2. Normalform |
| Transitive Abhängigkeit über ein Nichtschlüsselattribut | `buehne → buehnen_kapazitaet` | 3. Normalform |

Die Auftrittsliste enthält alle drei – deshalb eignet sie sich so gut zum Üben.
:::

<!--
KLP QPh, Daten und ihre Strukturierung: überführen Datenbankschemata in die
1. bis 3. Normalform (M). Funktionale Abhängigkeiten sind im KLP nicht
ausdrücklich genannt, aber die Voraussetzung dafür, die Normalformen zu
begründen statt nur anzuwenden.
-->

---

## Selbsttest

::::multievent

**1. Was bedeutet A → B?**

{r1{B kommt in der Tabelle nach A.}}

{r1{!Zu jedem Wert von A gehört höchstens ein Wert von B.}}

{r1{A und B sind gleich.}}

{r1{B ist ein Fremdschlüssel auf A.}}

{h{Kenne ich A, kenne ich B – ohne nachzusehen.}}
{H{Richtig.}}

**2. Kann man eine funktionale Abhängigkeit durch eine Abfrage beweisen?**

{r2{Ja, wenn die Abfrage kein Ergebnis liefert.}}

{r2{!Nein, man kann sie nur widerlegen.}}

{r2{Ja, mit COUNT(DISTINCT …).}}

{r2{Nur bei kleinen Tabellen.}}

{h{Eine Abhängigkeit gilt für alle möglichen Daten, nicht nur für die vorhandenen.}}
{H{Richtig. Ein Gegenbeispiel widerlegt sie; kein Gegenbeispiel beweist nichts.}}

**3. Der Schlüssel ist band, datum, beginn. Wie ist herkunftsland abhängig?**

{r3{voll}}

{r3{!partiell}}

{r3{transitiv}}

{r3{gar nicht}}

{h{Reicht schon ein Teil des Schlüssels?}}
{H{Richtig – band allein genügt.}}

**4. Wie nennt man die Kette schluessel → buehne → kapazitaet?**

{r4{partielle Abhängigkeit}}

{r4{!transitive Abhängigkeit}}

{r4{volle Abhängigkeit}}

{r4{mehrwertige Abhängigkeit}}

{h{Der Weg führt über ein Attribut, das selbst nicht zum Schlüssel gehört.}}
{H{Richtig. Das beseitigt die 3. Normalform.}}

**5. Wie viele Schlüsselkandidaten hat die Auftrittsliste?**

{z{2}}

{h{Eine Band spielt zu einer Zeit nur einmal – und auf einer Bühne läuft zu einer Zeit nur ein Auftritt.}}
{H{Richtig: band, datum, beginn und buehne, datum, beginn.}}

::::
