---
title: Rückblick
index: 6
---

# Rückblick

Dieses Kapitel hat die Blickrichtung geändert: Bisher ging es um **einzelne Zeilen**, jetzt um **Gruppen von Zeilen**. Damit lassen sich Fragen beantworten, die vorher unerreichbar waren – und es entstehen Fehler, die vorher unmöglich waren.

## Das kann ich jetzt

- [ ] Ich kann `COUNT`, `SUM`, `AVG`, `MIN` und `MAX` einsetzen und den Unterschied zwischen `COUNT(*)` und `COUNT(spalte)` erklären. ([4.1](./01-aggregatfunktionen))
- [ ] Ich kann mit `GROUP BY` gruppieren und halte dabei die **goldene Regel** ein. ([4.2](./02-gruppieren-mit-group-by))
- [ ] Ich kann `WHERE` und `HAVING` auseinanderhalten und begründen, warum es beides gibt. ([4.3](./03-gruppen-filtern-mit-having))
- [ ] Ich kann Unterabfragen an den Stellen `WHERE`, `SELECT` und `FROM` einsetzen. ([4.4](./04-unterabfragen))
- [ ] Ich kann die **Auswertungsreihenfolge** einer Abfrage aufsagen und damit erklären, warum bestimmte Formulierungen scheitern. ([4.5](./05-wie-eine-abfrage-ausgewertet-wird))

## Gemischte Aufgaben

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
**Aufgabe 1: Vier Auswertungen**

a) Wie viele Auftritte fanden auf jeder Bühne statt, und wie viele Zuschauer kamen dort im Durchschnitt? Ausgabe: Bühnenname, Anzahl, gerundeter Durchschnitt – die Bühne mit den meisten Auftritten zuerst.

b) Welche Bands sind mehr als zweimal aufgetreten? Ausgabe: Bandname und Anzahl.

c) Wie viele Bands hat jedes Genre? Ausgabe: Genrename und Anzahl, absteigend.

d) Welche Auftritte haben mehr Zuschauer als der Durchschnitt aller Auftritte? Gib nur die **Anzahl** solcher Auftritte aus.
:::

::::collapsible{title="Tipp 1: Woran erkenne ich, dass ich gruppieren muss?"}

An Formulierungen wie **„je"**, **„pro"**, **„für jede"**. Steht in der Frage „auf jeder Bühne", dann ist `buehne` das Gruppierungsmerkmal.

Die Frage „Wie viele Auftritte gab es insgesamt?" braucht dagegen **kein** `GROUP BY` – dort ist die ganze Tabelle eine einzige Gruppe.

::::

::::collapsible{title="Tipp 2: zu b)"}

Die Bedingung „mehr als zweimal" betrifft nicht einzelne Zeilen, sondern **Gruppen**. Sie gehört deshalb nicht ins `WHERE`, sondern ins `HAVING` – und zwar nach dem `GROUP BY`.

::::

::::collapsible{title="Tipp 3: zu d)"}

Du brauchst zwei Werte: die Zuschauerzahl jedes Auftritts und den Durchschnitt über alle. Der Durchschnitt ist **eine einzige Zahl** – die berechnet eine Unterabfrage im `WHERE`:

```sql
WHERE zuschauer > (SELECT AVG(zuschauer) FROM auftritt)
```

::::

:::protect{password="db-4-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rueckblick-4-1.sql
-- a) 4 Zeilen: Hauptbuehne 14 Auftritte, Waldbuehne 13, Zeltbuehne 12, Seebuehne 7
SELECT bu.name, COUNT(*) AS anzahl, ROUND(AVG(a.zuschauer), 1) AS schnitt
  FROM buehne bu
  JOIN auftritt a ON a.buehne_id = bu.buehne_id
 GROUP BY bu.buehne_id, bu.name
 ORDER BY anzahl DESC;

-- b) 5 Bands mit je 3 Auftritten
SELECT b.name, COUNT(*) AS anzahl
  FROM band b
  JOIN auftritt a ON a.band_id = b.band_id
 GROUP BY b.band_id, b.name
HAVING COUNT(*) > 2
 ORDER BY anzahl DESC, b.name;

-- c) 8 Genres, Indie mit 8 Bands an der Spitze
SELECT g.name, COUNT(*) AS anzahl
  FROM genre g
  JOIN band_genre bg ON bg.genre_id = g.genre_id
 GROUP BY g.genre_id, g.name
 ORDER BY anzahl DESC, g.name;

-- d) 16 Auftritte
SELECT COUNT(*) AS ueber_dem_schnitt
  FROM auftritt
 WHERE zuschauer > (SELECT AVG(zuschauer) FROM auftritt);
```

Zwei Beobachtungen:

- Bei a) fällt der Unterschied zwischen den Bühnen auf: Die Hauptbühne hat im Schnitt rund 4622 Zuschauer, die Seebühne 384. Ein Durchschnitt über **alle** Auftritte hinweg würde das verdecken – das ist der Grund, warum man gruppiert.
- Bei d) sind es 16 von 46, also deutlich weniger als die Hälfte. Das ist typisch: Wenige sehr große Auftritte ziehen den Durchschnitt nach oben, sodass die Mehrheit darunter liegt.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Abfragen, die nicht tun, was sie sollen**

```sql
-- a) Gesucht: Bands mit mehr als zwei Auftritten
SELECT b.name FROM band b JOIN auftritt a ON a.band_id = b.band_id
 WHERE COUNT(*) > 2 GROUP BY b.band_id;

-- b) Gesucht: je Bühne die Zahl der Auftritte
SELECT bu.name, a.datum, COUNT(*) FROM buehne bu
  JOIN auftritt a ON a.buehne_id = bu.buehne_id GROUP BY bu.buehne_id;

-- c) Gesucht: die Zahl der Bewertungen je Auftritt am 18. Juli
SELECT auftritt_id, COUNT(*) FROM bewertung GROUP BY auftritt_id
HAVING auftritt_id IN (SELECT auftritt_id FROM auftritt WHERE datum = '2026-07-18');

-- d) Gesucht: der Auftritt mit den meisten Zuschauern
SELECT MAX(zuschauer), datum, beginn FROM auftritt;
```

Sag für jede: Bricht sie ab oder läuft sie durch? Was ist der Fehler, und wie lautet die richtige Fassung?
:::

::::collapsible{title="Tipp"}

Denk an die Auswertungsreihenfolge: `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `ORDER BY`. Alles, was zum Zeitpunkt einer Klausel noch nicht existiert, kann dort auch nicht benutzt werden.

::::

:::protect{password="db-4-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Bricht ab.** `WHERE` wird ausgewertet, **bevor** gruppiert wird – zu diesem Zeitpunkt gibt es noch keine Gruppen und damit kein `COUNT(*)`. SQLite meldet `misuse of aggregate function COUNT()`. Richtig ist `HAVING COUNT(*) > 2` nach dem `GROUP BY`.

b) **Läuft durch – und liefert Unsinn.** `a.datum` steht in der Auswahlliste, aber nicht im `GROUP BY`. Eine Gruppe umfasst mehrere Datumsangaben; SQLite gibt dann willkürlich eine davon aus. Andere Datenbanksysteme weigern sich hier. Richtig: `a.datum` streichen – oder mit nach `GROUP BY` nehmen, wenn man je Bühne **und** Tag zählen will.

c) **Läuft durch und stimmt sogar** – aber die Bedingung gehört ins `WHERE`. Sie betrifft einzelne Zeilen, nicht Gruppen. Im `WHERE` filtert das System vor dem Gruppieren und muss deutlich weniger Zeilen verarbeiten:

```sql
SELECT auftritt_id, COUNT(*) FROM bewertung
 WHERE auftritt_id IN (SELECT auftritt_id FROM auftritt WHERE datum = '2026-07-18')
 GROUP BY auftritt_id;
```

d) **Läuft durch und ist falsch.** `MAX(zuschauer)` fasst alle Zeilen zu einer zusammen; `datum` und `beginn` stammen dann aus irgendeiner beliebigen Zeile – nicht notwendig aus der mit dem Höchstwert. Richtig ist eine Unterabfrage:

```sql
SELECT datum, beginn, zuschauer FROM auftritt
 WHERE zuschauer = (SELECT MAX(zuschauer) FROM auftritt);
```

Das liefert einen Auftritt mit 6260 Zuschauern. Vorteil dieser Fassung: Gäbe es zwei Auftritte mit dem Höchstwert, erschienen beide.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Eine Abfrage vorlesen**

```sql
SELECT b.name, COUNT(*) AS auftritte, ROUND(AVG(a.zuschauer), 0) AS schnitt
  FROM band b
  JOIN auftritt a ON a.band_id = b.band_id
 WHERE a.dauer_min >= 60
 GROUP BY b.band_id, b.name
HAVING COUNT(*) >= 2
 ORDER BY schnitt DESC
 LIMIT 3;
```

a) Beschreibe in **einem** deutschen Satz, was diese Abfrage liefert.

b) Nenne die Auswertungsschritte in der Reihenfolge, in der das Datenbanksystem sie abarbeitet, und sag jeweils, was danach vorliegt.

c) An welcher Stelle wirkt `dauer_min >= 60`, an welcher `COUNT(*) >= 2`? Warum lassen sich die beiden Bedingungen nicht tauschen?

d) Warum darf im `ORDER BY` der Name `schnitt` stehen, obwohl es diese Spalte in der Tabelle nicht gibt?
:::

:::protect{password="db-4-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) „Die drei Bands mit dem höchsten durchschnittlichen Zuschauerzuspruch, gezählt nur über Auftritte von mindestens einer Stunde, und nur solche Bands, die davon mindestens zwei hatten."

b)

1. `FROM` mit `JOIN`: Die Zeilen von `band` und `auftritt` werden verbunden – eine Zeile je Auftritt, samt Bandangaben.
2. `WHERE`: Alle Zeilen mit `dauer_min < 60` fallen weg.
3. `GROUP BY`: Aus den übrigen Zeilen entstehen Gruppen – eine je Band.
4. `HAVING`: Gruppen mit weniger als zwei Zeilen fallen weg.
5. `SELECT`: Für jede verbliebene Gruppe werden Name, Anzahl und Durchschnitt berechnet. Erst jetzt gibt es die Spalte `schnitt`.
6. `ORDER BY`: Die Ergebniszeilen werden sortiert.
7. `LIMIT`: Die ersten drei bleiben übrig.

c) `dauer_min >= 60` wirkt in Schritt 2 auf **einzelne Auftritte**, `COUNT(*) >= 2` in Schritt 4 auf **Gruppen**. Tauschen ist unmöglich: Im `WHERE` gibt es noch keine Gruppen und damit kein `COUNT`; im `HAVING` sind die einzelnen Zeilen bereits zu Gruppen verschmolzen, ihre Dauer ist dort nicht mehr einzeln greifbar.

d) Weil `ORDER BY` **nach** `SELECT` ausgewertet wird. Zu diesem Zeitpunkt ist der Aliasname bereits vergeben. Im `WHERE` wäre er noch nicht bekannt – deshalb ist es guter Stil, dort die vollständige Berechnung hinzuschreiben, auch wenn manche Systeme es großzügiger handhaben.

:::

<!--
Rückblick zum Inhaltsfeld Formale Sprachen und Automaten: Aggregatfunktionen,
Gruppierung, Unterabfragen und Auswertungsreihenfolge. Aufgabe 2 bündelt die
typischen Fehlerbilder, Aufgabe 3 zielt auf DI (Abfragen erläutern).
-->

---

## Selbsttest

::::multievent

**1. Welche Aussage über COUNT trifft zu?**

{r1{COUNT(*) und COUNT(spalte) liefern immer dasselbe.}}

{r1{!COUNT(spalte) zählt nur Zeilen, in denen die Spalte einen Wert hat.}}

{r1{COUNT zählt nur Zahlenspalten.}}

{r1{COUNT lässt sich nicht mit GROUP BY verbinden.}}

{h{Was ist mit leeren Feldern?}}
{H{Richtig – NULL-Werte zählt COUNT(spalte) nicht mit.}}

**2. Wie lautet die goldene Regel beim Gruppieren?**

{r2{Man darf höchstens eine Spalte gruppieren.}}

{r2{!Jede Spalte in der Auswahlliste steht entweder im GROUP BY oder in einer Aggregatfunktion.}}

{r2{GROUP BY muss immer vor WHERE stehen.}}

{r2{Nach GROUP BY ist ORDER BY verboten.}}

{h{Was soll das System ausgeben, wenn in einer Gruppe fünf verschiedene Werte stehen?}}
{H{Richtig.}}

**3. Welche Bedingung gehört ins HAVING?**

{r3{dauer_min größer als 60}}

{r3{!COUNT(*) größer als 2}}

{r3{datum gleich 2026-07-18}}

{r3{name beginnt mit N}}

{h{HAVING filtert Gruppen, WHERE filtert Zeilen.}}
{H{Richtig – nur die Bedingung über eine Aggregatfunktion braucht HAVING.}}

**4. Bringe die Auswertungsschritte in die richtige Reihenfolge.**

{S1{FROM}}

{S1{WHERE}}

{S1{GROUP BY}}

{S1{HAVING}}

{S1{SELECT}}

{S1{ORDER BY}}

{h{Zuerst die Zeilen beschaffen, zuletzt sortieren.}}
{H{Richtig – aus dieser Reihenfolge folgt fast alles, was in diesem Kapitel schiefgehen kann.}}

**5. Warum scheitert COUNT im WHERE?**

{r4{Weil COUNT keine Zahl liefert.}}

{r4{!Weil beim Auswerten des WHERE noch keine Gruppen gebildet sind.}}

{r4{Weil WHERE nur Texte vergleichen kann.}}

{r4{Weil COUNT ein reserviertes Wort ist.}}

{h{Welcher Schritt kommt zuerst?}}
{H{Richtig.}}

**6. Eine Abfrage liefert MAX(zuschauer) zusammen mit datum. Was ist das Problem?**

{r5{Sie bricht mit einer Fehlermeldung ab.}}

{r5{!Das Datum stammt aus einer beliebigen Zeile und muss nicht zum Höchstwert gehören.}}

{r5{MAX funktioniert nur mit GROUP BY.}}

{r5{Das Datum wird als Zahl ausgegeben.}}

{h{Die Aggregatfunktion fasst alle Zeilen zu einer zusammen – aus welcher stammt dann das Datum?}}
{H{Richtig. Sauber löst man das mit einer Unterabfrage.}}

**7. In welchen Klauseln darf ein in SELECT vergebener Aliasname sicher benutzt werden?**

{c1{!ORDER BY}}

{c1{WHERE}}

{c1{GROUP BY}}

{c1{HAVING}}

{h{Nur dort, was nach SELECT ausgewertet wird.}}
{H{Richtig. Manche Systeme erlauben mehr – verlassen sollte man sich darauf nicht.}}

::::
