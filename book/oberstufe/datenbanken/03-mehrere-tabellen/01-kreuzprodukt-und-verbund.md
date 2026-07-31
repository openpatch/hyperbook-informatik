---
title: Kreuzprodukt und Verbund
index: 1
---

# Kreuzprodukt und Verbund

In der Tabelle `auftritt` steht nicht, welche Band spielt – dort steht nur eine Nummer:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Nummern.sql
SELECT auftritt_id, band_id, buehne_id, datum, beginn FROM auftritt LIMIT 10;
```

:::

Um aus `band_id = 16` den Namen *Elster* zu machen, muss die Datenbank in `band` nachsehen. Das ist die Aufgabe des **Verbunds**.

## Erst der Umweg: das Kreuzprodukt

Was passiert, wenn man einfach zwei Tabellen im `FROM` aufzählt?

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Kreuzprodukt.sql
SELECT auftritt.auftritt_id, auftritt.band_id, band.band_id, band.name
  FROM auftritt, band;
```

:::

:::snippet{#aufgabe}
a) Wie viele Zeilen liefert die Abfrage? Rechne es **vorher** aus: `auftritt` hat 46 Zeilen, `band` hat 22.

b) Sieh dir die ersten Zeilen an. Was stimmt an ihnen nicht?

c) Formuliere eine Bedingung, die genau die sinnvollen Zeilen übrig lässt.
:::

:::protect{password="db-3-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 46 · 22 = **1012** Zeilen.

b) Jede Auftrittszeile wird mit **jeder** Band kombiniert – auch mit denen, die gar nicht auftreten. In den meisten Zeilen steht in `auftritt.band_id` eine andere Nummer als in `band.band_id`.

c) `WHERE auftritt.band_id = band.band_id`

:::

:::snippet{#definition}
Das **Kreuzprodukt** (kartesisches Produkt) zweier Relationen enthält jede Kombination aus einem :t[Tupel]{#tupel} der einen und einem Tupel der anderen. Es hat so viele Zeilen wie das Produkt der beiden Zeilenzahlen.

Für sich genommen ist es selten nützlich – aber es ist die Grundlage, aus der jeder :t[Verbund]{#verbund} entsteht.
:::

## Der Verbund

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql Verbund.sql
SELECT band.name, auftritt.datum, auftritt.beginn
  FROM auftritt, band
 WHERE auftritt.band_id = band.band_id
 ORDER BY auftritt.datum, auftritt.beginn;
```

:::

:::snippet{#definition}
Ein **Verbund** (englisch *join*) verknüpft zwei Relationen über eine Bedingung. Bei einem **natürlichen Verbund** ist diese Bedingung die Gleichheit von :t[Fremdschlüssel]{#fremdschluessel} und :t[Primärschlüssel]{#primaerschluessel}.

Aus dem Kreuzprodukt bleiben genau die Zeilen übrig, in denen die Bedingung erfüllt ist.
:::

## Zwei Schreibweisen

Dieselbe Abfrage lässt sich auf zwei Arten formulieren:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Schreibweisen.sql
-- Alte Schreibweise: Verbundbedingung im WHERE
SELECT band.name, auftritt.datum
  FROM auftritt, band
 WHERE auftritt.band_id = band.band_id;

-- Neue Schreibweise: Verbundbedingung im JOIN
SELECT band.name, auftritt.datum
  FROM auftritt
  JOIN band ON auftritt.band_id = band.band_id;
```

:::

:::snippet{#merken}
Beide liefern dasselbe. Die `JOIN`-Schreibweise ist trotzdem besser:

- Sie **trennt** die Verbundbedingung von der eigentlichen Auswahlbedingung. Im `WHERE` steht dann nur noch, was du wirklich suchst.
- Sie macht es schwerer, eine Verbundbedingung zu **vergessen**. Genau das ist der häufigste Fehler bei der alten Schreibweise – und man merkt ihn nicht sofort, weil die Abfrage ja ein Ergebnis liefert. Nur eben ein viel zu großes.

Im Lernpfad wird ab hier `JOIN` verwendet. Die alte Schreibweise solltest du trotzdem lesen können, denn sie steht in vielen Büchern und Klausuren.
:::

## Tabellen abkürzen

Bei mehreren Tabellen wird es schnell lang. Auch Tabellen dürfen einen Alias bekommen:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Kurz.sql
SELECT b.name, a.datum, a.beginn, a.zuschauer
  FROM auftritt AS a
  JOIN band AS b ON a.band_id = b.band_id
 WHERE a.zuschauer > 3000
 ORDER BY a.zuschauer DESC;
```

:::

:::snippet{#merken}
Sobald zwei Tabellen eine Spalte mit demselben Namen haben – hier heißt `name` sowohl in `band` als auch in `buehne` so –, **musst** du den Tabellennamen davorschreiben. Sonst weiß die Datenbank nicht, welche Spalte gemeint ist.

Gewöhne dir an, den Tabellennamen immer davorzuschreiben, auch wenn es nicht nötig wäre. Die Abfrage bleibt dann auch lesbar, wenn später eine Spalte dazukommt.
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
a) Zeige zu jedem Auftritt den Namen der **Bühne**, das Datum und den Beginn.

b) Zeige alle Auftritte auf der Waldbühne mit Bandnamen, Datum und Beginn.

c) Zeige zu jedem Ticket den Namen der Person, die es gekauft hat, sowie Kategorie und Preis.

d) Zeige alle Auftritte, die vor mehr als 3000 Zuschauern stattfanden, mit Bandname, Bühnenname und Zuschauerzahl.
:::

::::collapsible{title="Tipp 1: Welche Tabellen brauche ich?"}

Schreibe zuerst auf, in welcher Tabelle jede gewünschte Angabe steht. Für d) sind das drei: die Zuschauerzahl in `auftritt`, der Bandname in `band`, der Bühnenname in `buehne`.

::::

::::collapsible{title="Tipp 2: Wie viele Verbundbedingungen?"}

Bei zwei Tabellen brauchst du eine Verbundbedingung, bei drei Tabellen zwei. Als Faustregel: **eine weniger als Tabellen**. Fehlt eine, wird das Ergebnis viel zu groß.

::::

::::collapsible{title="Tipp 3: Gerüst für d)"}

```sql
SELECT …
  FROM auftritt AS a
  JOIN band AS b ON …
  JOIN buehne AS s ON …
 WHERE …;
```

::::

:::protect{password="db-3-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 46 Zeilen
SELECT s.name AS buehne, a.datum, a.beginn
  FROM auftritt AS a
  JOIN buehne AS s ON a.buehne_id = s.buehne_id
 ORDER BY a.datum, a.beginn;

-- b) 13 Zeilen
SELECT b.name AS band, a.datum, a.beginn
  FROM auftritt AS a
  JOIN band AS b ON a.band_id = b.band_id
  JOIN buehne AS s ON a.buehne_id = s.buehne_id
 WHERE s.name = 'Waldbuehne'
 ORDER BY a.datum, a.beginn;

-- c) 155 Zeilen
SELECT p.vorname, p.nachname, t.kategorie, t.preis
  FROM ticket AS t
  JOIN besucherin AS p ON t.besucher_id = p.besucher_id
 ORDER BY p.nachname;

-- d) 12 Zeilen
SELECT b.name AS band, s.name AS buehne, a.zuschauer
  FROM auftritt AS a
  JOIN band AS b ON a.band_id = b.band_id
  JOIN buehne AS s ON a.buehne_id = s.buehne_id
 WHERE a.zuschauer > 3000
 ORDER BY a.zuschauer DESC;
```

Bei b) hätte man die Bühne auch direkt über `a.buehne_id = 2` filtern können. Der Verbund ist trotzdem die bessere Lösung: Er funktioniert weiter, wenn sich die Nummern ändern, und man muss sie nicht auswendig kennen.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I). Daten und ihre Strukturierung: Primär- und
Fremdschlüssel.
-->

---

## Selbsttest

::::multievent

**1. Eine Tabelle hat 10 Zeilen, eine andere 4. Wie viele Zeilen hat ihr Kreuzprodukt?**

{z{40}}

{h{Jede Zeile der einen wird mit jeder Zeile der anderen kombiniert.}}
{H{Richtig – das Produkt der beiden Zeilenzahlen.}}

**2. Was bleibt beim Verbund vom Kreuzprodukt übrig?**

{r1{die ersten n Zeilen}}

{r1{!die Zeilen, in denen die Verbundbedingung erfüllt ist}}

{r1{alle Zeilen, aber mit weniger Spalten}}

{r1{jede Zeile genau einmal}}

{h{Was hat die Bedingung auftritt.band_id = band.band_id bewirkt?}}
{H{Richtig. Der Verbund ist ein Kreuzprodukt mit anschließender Selektion.}}

**3. Warum ist die JOIN-Schreibweise der alten Komma-Schreibweise vorzuziehen?** (Mehrfachauswahl)

{c1{!Sie trennt Verbundbedingung und Auswahlbedingung.}}

{c1{!Man vergisst die Verbundbedingung seltener.}}

{c1{Sie ist schneller.}}

{c1{Sie ist die einzige, die mehr als zwei Tabellen erlaubt.}}

{h{Beide Schreibweisen liefern dasselbe Ergebnis und können beliebig viele Tabellen verbinden.}}
{H{Richtig. Der Vorteil ist die Lesbarkeit, nicht die Geschwindigkeit.}}

**4. Du verbindest vier Tabellen. Wie viele Verbundbedingungen brauchst du mindestens?**

{z{3}}

{h{Eine weniger als Tabellen.}}
{H{Richtig. Fehlt eine, entsteht ein Kreuzprodukt und das Ergebnis wird viel zu groß.}}

**5. Wann muss man den Tabellennamen vor einen Spaltennamen schreiben?**

{r2{immer}}

{r2{nie}}

{r2{!wenn der Spaltenname in mehreren beteiligten Tabellen vorkommt}}

{r2{nur bei Primärschlüsseln}}

{h{Denk an die Spalte name in band und in buehne.}}
{H{Richtig – nötig ist es nur dann, sinnvoll aber fast immer.}}

::::
