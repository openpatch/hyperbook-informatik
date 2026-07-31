---
title: Gruppen filtern mit HAVING
index: 3
---

# Gruppen filtern mit HAVING

Am Ende der letzten Lektion stand ein unbefriedigendes Ergebnis: Die bestbewertete Band hatte nur wenige Stimmen. Man möchte solche Gruppen aussortieren – aber `WHERE` hilft dabei nicht.

## Warum WHERE nicht reicht

:::snippet{#aufgabe}
Überlege, bevor du es ausprobierst: Was würde diese Abfrage bedeuten?

```sql
SELECT b.name, AVG(w.punkte)
  FROM bewertung AS w
  JOIN auftritt AS a ON a.auftritt_id = w.auftritt_id
  JOIN band AS b ON b.band_id = a.band_id
 WHERE COUNT(*) >= 20
 GROUP BY b.name;
```
:::

::::collapsible{title="Auflösung"}

Nichts Sinnvolles. `WHERE` entscheidet über **einzelne Zeilen**, und zwar **bevor** die Gruppen überhaupt gebildet werden. Zu diesem Zeitpunkt gibt es noch keine Gruppe, deren Größe man zählen könnte.

Die Bedingung „mindestens 20 Bewertungen" ist eine Aussage über eine fertige Gruppe. Dafür gibt es `HAVING`.

::::

## HAVING

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Having.sql
SELECT b.name AS band,
       ROUND(AVG(w.punkte), 2) AS schnitt,
       COUNT(*) AS stimmen
  FROM bewertung AS w
  JOIN auftritt AS a ON a.auftritt_id = w.auftritt_id
  JOIN band AS b ON b.band_id = a.band_id
 GROUP BY b.name
HAVING COUNT(*) >= 20
 ORDER BY schnitt DESC;
```

:::

:::snippet{#definition}
`HAVING` filtert **Gruppen**, so wie `WHERE` Zeilen filtert.

| | wirkt auf | Zeitpunkt | darf Aggregatfunktionen enthalten |
| --- | --- | --- | --- |
| `WHERE` | einzelne Zeilen | vor dem Gruppieren | nein |
| `HAVING` | Gruppen | nach dem Gruppieren | ja |
:::

## Beides zusammen

Oft braucht man beide – und sie tun verschiedene Dinge:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Beides.sql
SELECT b.name AS band, COUNT(*) AS auftritte, SUM(a.zuschauer) AS zuschauer
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
 WHERE a.dauer_min >= 60
 GROUP BY b.name
HAVING COUNT(*) >= 2
 ORDER BY zuschauer DESC;
```

:::

:::snippet{#aufgabe}
a) Lies die Abfrage laut vor und übersetze jeden Teil in einen deutschen Satz.

b) Was passiert, wenn du `WHERE a.dauer_min >= 60` entfernst? Warum ändern sich die Zahlen in **beiden** Spalten?

c) Was passiert, wenn du stattdessen `HAVING COUNT(*) >= 2` entfernst?
:::

:::protect{password="db-4-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) „Nimm alle Auftritte, die mindestens 60 Minuten dauern. Fasse sie nach Band zusammen. Behalte nur die Bands mit mindestens zwei solchen Auftritten. Zeige Name, Anzahl und Zuschauersumme, absteigend nach Zuschauern."

b) Ohne `WHERE` werden auch die kurzen Auftritte mitgezählt und mitsummiert. Es kommen mehr Bands ins Ergebnis, und jede bekommt größere Zahlen. `WHERE` bestimmt, **woraus** die Gruppen gebildet werden.

c) Ohne `HAVING` erscheinen zusätzlich die Bands mit nur einem langen Auftritt. Die Zahlen der übrigen Bands ändern sich **nicht** – `HAVING` wählt nur aus, es rechnet nichts neu.

**Das ist der Kern:** `WHERE` verändert die Gruppen, `HAVING` verändert nur, welche davon man sieht.

:::

## Ein häufiger Fehler

:::snippet{#brain}
Diese beiden Abfragen sehen ähnlich aus und liefern Verschiedenes:

```sql
-- A: alle Auftritte, danach nur Bands mit mindestens zwei davon
SELECT b.name, COUNT(*) FROM auftritt a JOIN band b ON b.band_id = a.band_id
 GROUP BY b.name HAVING COUNT(*) >= 2;

-- B: nur die Auftritte auf der Hauptbühne, danach dieselbe Bedingung
SELECT b.name, COUNT(*) FROM auftritt a JOIN band b ON b.band_id = a.band_id
 WHERE a.buehne_id = 1
 GROUP BY b.name HAVING COUNT(*) >= 2;
```

B zählt nur die Auftritte auf der Hauptbühne. Eine Band mit einem Auftritt auf der Hauptbühne und drei anderswo taucht in A auf, in B nicht.

Wenn eine Auswertung merkwürdige Zahlen liefert, ist die Frage fast immer: Was steht im `WHERE`, und was gehört eigentlich ins `HAVING`?
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
a) Alle Herkunftsländer, aus denen mehr als eine Band kommt, mit Anzahl.

b) Alle Bands, die mindestens dreimal aufgetreten sind, mit Anzahl der Auftritte.

c) Alle Genres mit mindestens vier Bands, mit Anzahl.

d) Alle Bühnen, auf denen insgesamt mehr als 20 000 Zuschauer waren – mit Bühnenname und Zuschauersumme.
:::

::::collapsible{title="Tipp 1: Zeile oder Gruppe?"}

Frage dich bei jeder Bedingung: Kann ich sie an **einer einzelnen Zeile** prüfen? Dann `WHERE`. Brauche ich dafür die **ganze Gruppe**? Dann `HAVING`.

::::

::::collapsible{title="Tipp 2: zu d)"}

„Insgesamt mehr als 20 000" ist eine Summe über die Gruppe. Also `HAVING SUM(...) > 20000`.

::::

:::protect{password="db-4-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 1 Zeile: Deutschland mit 15 Bands
SELECT herkunftsland, COUNT(*) AS bands
  FROM band
 GROUP BY herkunftsland
HAVING COUNT(*) > 1;

-- b) 5 Bands mit je 3 Auftritten
SELECT b.name AS band, COUNT(*) AS auftritte
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
 GROUP BY b.name
HAVING COUNT(*) >= 3
 ORDER BY b.name;

-- c) 5 Genres: Indie, Rock, Elektro, Metal und Folk
SELECT g.name AS genre, COUNT(*) AS bands
  FROM band_genre AS bg
  JOIN genre AS g ON g.genre_id = bg.genre_id
 GROUP BY g.name
HAVING COUNT(*) >= 4
 ORDER BY bands DESC;

-- d) 2 Bühnen: Hauptbuehne und Waldbuehne
SELECT s.name AS buehne, SUM(a.zuschauer) AS zuschauer
  FROM auftritt AS a
  JOIN buehne AS s ON s.buehne_id = a.buehne_id
 GROUP BY s.name
HAVING SUM(a.zuschauer) > 20000
 ORDER BY zuschauer DESC;
```

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I); erläutern die Syntax und Semantik von Datenbankabfragen
(A).
-->

---

## Selbsttest

::::multievent

**1. Worauf wirkt HAVING?**

{r1{auf einzelne Zeilen}}

{r1{!auf Gruppen}}

{r1{auf Spalten}}

{r1{auf das sortierte Endergebnis}}

{h{WHERE ist für Zeilen zuständig.}}
{H{Richtig. Deshalb darf in HAVING auch eine Aggregatfunktion stehen.}}

**2. Warum darf COUNT(*) nicht im WHERE stehen?**

{r2{Weil COUNT nur im SELECT erlaubt ist.}}

{r2{!Weil beim Auswerten von WHERE noch keine Gruppen existieren.}}

{r2{Weil COUNT zu langsam ist.}}

{r2{Es darf, das ist nur unüblich.}}

{h{In welcher Reihenfolge passieren Filtern und Gruppieren?}}
{H{Richtig. WHERE kommt vor dem Gruppieren.}}

**3. Du entfernst das HAVING aus einer Abfrage. Was ändert sich?**

{r3{Die Zahlen in den Aggregatspalten werden größer.}}

{r3{!Es kommen zusätzliche Gruppen ins Ergebnis, die Zahlen bleiben gleich.}}

{r3{Das Ergebnis ist leer.}}

{r3{Die Sortierung ändert sich.}}

{h{HAVING wählt aus, es rechnet nichts neu.}}
{H{Richtig. Anders als beim Entfernen des WHERE.}}

**4. Du entfernst das WHERE aus derselben Abfrage. Was ändert sich?**

{r4{Nur die Anzahl der Gruppen.}}

{r4{!Sowohl die Anzahl der Gruppen als auch die berechneten Werte.}}

{r4{Gar nichts.}}

{r4{Nur die berechneten Werte.}}

{h{WHERE bestimmt, welche Zeilen überhaupt in eine Gruppe kommen.}}
{H{Richtig. Deshalb ändern sich auch Summen und Mittelwerte.}}

**5. Ordne zu: „nur Auftritte, die länger als 60 Minuten dauern" gehört in …**

{r5{!WHERE}}

{r5{HAVING}}

{r5{beides funktioniert gleich}}

{h{Kann man das an einer einzelnen Zeile prüfen?}}
{H{Richtig. Eine Bedingung an eine einzelne Zeile gehört ins WHERE.}}

**6. Ordne zu: „nur Bands mit mindestens drei Auftritten" gehört in …**

{r6{WHERE}}

{r6{!HAVING}}

{r6{beides funktioniert gleich}}

{h{Dafür muss man erst zählen – und zählen kann man nur eine fertige Gruppe.}}
{H{Richtig.}}

::::
