---
title: Selbstverbund
index: 3
---

# Selbstverbund

Manchmal muss man eine Tabelle mit **sich selbst** verbinden. Das klingt seltsam, ist aber die einzige Möglichkeit, Zeilen derselben Tabelle miteinander zu vergleichen.

## Das Problem

Welche zwei Bands spielen am selben Tag auf derselben Bühne? Alle nötigen Angaben stehen in `auftritt` – aber in **verschiedenen Zeilen**. Und eine `WHERE`-Bedingung sieht immer nur eine Zeile auf einmal.

## Die Lösung: zwei Namen für dieselbe Tabelle

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="690px"}

```mysql Selbstverbund.sql
SELECT a1.datum, a1.buehne_id, a1.beginn AS beginn_1, a2.beginn AS beginn_2
  FROM auftritt AS a1
  JOIN auftritt AS a2
    ON a1.datum = a2.datum
   AND a1.buehne_id = a2.buehne_id
   AND a1.auftritt_id < a2.auftritt_id
 ORDER BY a1.datum, a1.buehne_id, a1.beginn;
```

:::

:::snippet{#merken}
Die Tabelle steht zweimal im `FROM` und bekommt zwei verschiedene **Aliasnamen**. Danach verhält sie sich wie zwei unabhängige Tabellen: `a1` liefert die eine Zeile, `a2` die andere.

Die Aliasnamen sind hier keine Bequemlichkeit, sondern **zwingend** – ohne sie wüsste die Datenbank nicht, welche der beiden Kopien gemeint ist.
:::

## Warum die dritte Bedingung nötig ist

:::snippet{#aufgabe}
Entferne die Zeile `AND a1.auftritt_id < a2.auftritt_id` und führe die Abfrage erneut aus.

a) Wie viele Zeilen kommen jetzt heraus statt vorher?

b) Zwei Arten von unerwünschten Zeilen tauchen auf. Welche?

c) Ersetze `<` durch `<>`. Welche der beiden Arten verschwindet dadurch, welche nicht?
:::

::::collapsible{title="Tipp: Sieh dir die erste Zeile genau an"}

Was passiert, wenn `a1` und `a2` **dieselbe** Zeile sind? Alle drei Bedingungen des Verbunds sind dann erfüllt.

::::

:::protect{password="db-3-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 142 statt 48 Zeilen.

b) Erstens Zeilen, in denen ein Auftritt mit **sich selbst** verglichen wird (`beginn_1` und `beginn_2` gleich). Zweitens jedes Paar **doppelt**, einmal in jeder Reihenfolge.

c) `<>` beseitigt nur die Selbstvergleiche, die Doppelungen bleiben – man bekommt 96 Zeilen. Erst `<` beseitigt beides auf einmal: Von jedem Paar überlebt genau die Reihenfolge, in der die kleinere Nummer links steht.

**Merke:** Bei einem Selbstverbund, der *Paare* bilden soll, gehört fast immer eine Bedingung der Form `a1.schluessel < a2.schluessel` dazu.

:::

## Ein zweites Beispiel

Welche Personen spielen in derselben Band?

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Bandkollegen.sql
SELECT b.name AS band,
       p1.vorname || ' ' || p1.nachname AS person_1,
       p2.vorname || ' ' || p2.nachname AS person_2
  FROM mitgliedschaft AS m1
  JOIN mitgliedschaft AS m2
    ON m1.band_id = m2.band_id
   AND m1.person_id < m2.person_id
  JOIN person AS p1 ON p1.person_id = m1.person_id
  JOIN person AS p2 ON p2.person_id = m2.person_id
  JOIN band AS b ON b.band_id = m1.band_id
 ORDER BY b.name;
```

:::

:::snippet{#brain}
Fünf Tabellen im `FROM`, aber nur drei verschiedene. Zeichne auf, welche Zeile welcher Tabelle jeweils gemeint ist – dann wird die Abfrage schlagartig übersichtlich.

Genau das ist der Grund, warum Aliasnamen bei Selbstverbunden aussagekräftig sein sollten: `m1`/`m2` und `p1`/`p2` sagen mehr als `x` und `y`.
:::

## Aufgaben

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="610px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Lösungen.
-- a)

-- b)

-- c)

```

:::

:::snippet{#aufgabe}
a) Welche Bandpaare stammen aus demselben Herkunftsland? Zeige Land und beide Bandnamen, jedes Paar nur einmal.

b) Welche Bühnenpaare haben zusammen eine Kapazität von mehr als 5000? Zeige beide Bühnennamen und die Summe.

c) Welche Personen sind im selben Jahr geboren? Zeige Jahr und beide Namen.
:::

::::collapsible{title="Tipp: das Gerüst ist immer dasselbe"}

```sql
SELECT …
  FROM tabelle AS t1
  JOIN tabelle AS t2
    ON t1.gemeinsames_merkmal = t2.gemeinsames_merkmal
   AND t1.schluessel < t2.schluessel
```

Die erste `ON`-Bedingung sagt, was gleich sein soll. Die zweite verhindert Selbstvergleiche und Doppelungen.

::::

:::protect{password="db-3-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 105 Paare
SELECT b1.herkunftsland, b1.name AS band_1, b2.name AS band_2
  FROM band AS b1
  JOIN band AS b2
    ON b1.herkunftsland = b2.herkunftsland
   AND b1.band_id < b2.band_id
 ORDER BY b1.herkunftsland, b1.name;

-- b) 3 Paare
SELECT s1.name AS buehne_1, s2.name AS buehne_2,
       s1.kapazitaet + s2.kapazitaet AS zusammen
  FROM buehne AS s1
  JOIN buehne AS s2 ON s1.buehne_id < s2.buehne_id
 WHERE s1.kapazitaet + s2.kapazitaet > 5000
 ORDER BY zusammen DESC;

-- c) 9 Paare
SELECT p1.geburtsjahr,
       p1.vorname || ' ' || p1.nachname AS person_1,
       p2.vorname || ' ' || p2.nachname AS person_2
  FROM person AS p1
  JOIN person AS p2
    ON p1.geburtsjahr = p2.geburtsjahr
   AND p1.person_id < p2.person_id
 ORDER BY p1.geburtsjahr;
```

Bei b) steht in der `ON`-Bedingung **nur** der Größenvergleich der Schlüssel – es gibt kein gemeinsames Merkmal, das gleich sein müsste. Gebildet werden also alle Bühnenpaare, und `WHERE` wählt daraus aus.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Wozu dient ein Selbstverbund?**

{r1{Um eine Tabelle zu kopieren.}}

{r1{!Um Zeilen derselben Tabelle miteinander zu vergleichen.}}

{r1{Um doppelte Zeilen zu entfernen.}}

{r1{Um eine Tabelle zu sortieren.}}

{h{Eine WHERE-Bedingung sieht immer nur eine Zeile auf einmal.}}
{H{Richtig. Für zwei Zeilen braucht man die Tabelle zweimal.}}

**2. Was ist bei einem Selbstverbund zwingend nötig?**

{r2{eine Unterabfrage}}

{r2{!zwei verschiedene Aliasnamen für die Tabelle}}

{r2{ein zusätzlicher Fremdschlüssel}}

{r2{DISTINCT}}

{h{Woher weiß die Datenbank sonst, welche der beiden Kopien gemeint ist?}}
{H{Richtig. Ohne Aliasnamen ist die Abfrage nicht eindeutig.}}

**3. Wozu dient die Bedingung a1.id < a2.id?**

{r3{Sie sortiert das Ergebnis.}}

{r3{Sie beschleunigt die Abfrage.}}

{r3{!Sie verhindert Selbstvergleiche und doppelte Paare.}}

{r3{Sie verbindet die beiden Tabellen.}}

{h{Denk an das Ergebnis, als du diese Zeile entfernt hast.}}
{H{Richtig. Beides auf einmal, mit einer einzigen Bedingung.}}

**4. Was passiert bei a1.id <> a2.id statt a1.id < a2.id?**

{r4{Es ändert sich nichts.}}

{r4{!Jedes Paar erscheint doppelt.}}

{r4{Alle Zeilen verschwinden.}}

{r4{Nur Selbstvergleiche bleiben übrig.}}

{h{Für jedes Paar sind beide Reihenfolgen ungleich.}}
{H{Richtig. Deshalb nimmt man den Größenvergleich und nicht die Ungleichheit.}}

**5. Wie viele Tabellennamen stehen im FROM der Abfrage zu den Bandkollegen, und wie viele verschiedene Tabellen sind es?**

{r5{5 Namen, 5 Tabellen}}

{r5{!5 Namen, 3 Tabellen}}

{r5{3 Namen, 3 Tabellen}}

{r5{3 Namen, 5 Tabellen}}

{h{mitgliedschaft und person kommen je zweimal vor.}}
{H{Richtig. Aliasnamen machen aus einer Tabelle beliebig viele Kopien.}}

::::
