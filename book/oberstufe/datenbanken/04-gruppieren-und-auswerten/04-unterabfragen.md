---
title: Unterabfragen
index: 4
---

# Unterabfragen

Das Ergebnis einer Abfrage ist wieder eine Tabelle. Also kann man eine Abfrage überall dort einsetzen, wo eine Tabelle oder ein Wert stehen darf – auch **innerhalb** einer anderen Abfrage.

## Ein Wert aus einer Unterabfrage

Welche Auftritte hatten überdurchschnittlich viele Zuschauer? Den Durchschnitt kennt man vorher nicht.

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Skalar.sql
-- Schritt 1: Wie hoch ist der Durchschnitt?
SELECT AVG(zuschauer) FROM auftritt;

-- Schritt 2: Das Ergebnis als Wert einsetzen.
SELECT b.name AS band, a.datum, a.zuschauer
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
 WHERE a.zuschauer > (SELECT AVG(zuschauer) FROM auftritt)
 ORDER BY a.zuschauer DESC;
```

:::

:::snippet{#definition}
Eine **Unterabfrage** (englisch *subquery*) ist eine Abfrage innerhalb einer anderen. Sie steht in Klammern.

Liefert sie genau **einen Wert**, darf sie überall stehen, wo ein Wert erlaubt ist – also auch rechts von einem Vergleichsoperator.
:::

:::snippet{#merken}
Warum nicht einfach die Zahl einsetzen, die Schritt 1 geliefert hat?

Weil sie sich ändert. Sobald ein Auftritt dazukommt, stimmt sie nicht mehr. Die Unterabfrage rechnet den Wert bei jeder Ausführung neu aus – die Abfrage bleibt richtig, egal was in der Datenbank passiert.
:::

## Eine Wertemenge aus einer Unterabfrage

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Menge.sql
-- Alle Bands, die mindestens einmal auf der Hauptbühne gespielt haben
SELECT name
  FROM band
 WHERE band_id IN (SELECT band_id FROM auftritt WHERE buehne_id = 1)
 ORDER BY name;

-- Alle Bands mit mindestens einem Auftritt von 90 Minuten oder mehr
SELECT name, gruendungsjahr
  FROM band
 WHERE band_id IN (SELECT band_id FROM auftritt WHERE dauer_min >= 90)
 ORDER BY name;
```

:::

:::snippet{#merken}
Liefert die Unterabfrage **eine Spalte mit mehreren Zeilen**, passt sie hinter `IN`.

Die Unterabfrage darf dabei genau **eine** Spalte ausgeben. `SELECT * FROM auftritt` würde hinter `IN` nicht funktionieren.
:::

:::snippet{#aufgabe}
Die erste Abfrage lässt sich auch mit einem :t[Verbund]{#verbund} schreiben:

```sql
SELECT DISTINCT b.name
  FROM band AS b
  JOIN auftritt AS a ON a.band_id = b.band_id
 WHERE a.buehne_id = 1
 ORDER BY b.name;
```

a) Führe beide aus. Liefern sie dasselbe?

b) Warum braucht die Verbundvariante ein `DISTINCT`, die Unterabfragevariante aber nicht?

c) Welche findest du besser lesbar? Begründe.
:::

:::protect{password="db-4-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ja, beide liefern 12 Bands.

b) Der Verbund erzeugt für **jeden** Auftritt auf der Hauptbühne eine Zeile. Eine Band, die dort zweimal gespielt hat, erscheint zweimal. `DISTINCT` fasst das zusammen.

Die Unterabfrage prüft dagegen nur, **ob** die `band_id` in der Menge vorkommt – wie oft, spielt keine Rolle. Es kommt keine Zeile doppelt heraus.

c) Beides ist vertretbar. Als Faustregel:

- Willst du **Angaben aus beiden Tabellen** im Ergebnis, brauchst du einen Verbund.
- Willst du nur **filtern** und alle Ausgabespalten stammen aus einer Tabelle, ist die Unterabfrage klarer – sie sagt genau das, was gemeint ist: „deren Nummer in dieser Menge vorkommt".

:::

## Eine Unterabfrage in der SELECT-Liste

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql InSelect.sql
SELECT b.name AS band,
       (SELECT COUNT(*) FROM auftritt AS a WHERE a.band_id = b.band_id) AS auftritte
  FROM band AS b
 ORDER BY auftritte DESC, b.name;
```

:::

:::snippet{#merken}
Diese Unterabfrage benutzt `b.band_id` aus der äußeren Abfrage. Man nennt sie deshalb **korreliert**: Sie wird für jede Zeile der äußeren Abfrage einmal neu ausgewertet.

Das ist bequem, aber teuer. Bei 22 Bands merkt man nichts; bei 22 Millionen Zeilen sehr wohl. Was sich mit `GROUP BY` erledigen lässt, sollte man auch mit `GROUP BY` erledigen.
:::

## Eine Unterabfrage im FROM

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql ImFrom.sql
SELECT AVG(auftritte) AS mittlere_auftritte
  FROM (SELECT band_id, COUNT(*) AS auftritte
          FROM auftritt
         GROUP BY band_id) AS je_band;
```

:::

:::snippet{#merken}
Damit rechnet man **über ein Gruppierungsergebnis**: erst je Band zählen, dann über diese Zahlen mitteln. Eine Aggregatfunktion in einer Aggregatfunktion – `AVG(COUNT(*))` – ist nicht erlaubt; die Unterabfrage im `FROM` ist der Weg dorthin.

Eine Unterabfrage im `FROM` braucht immer einen **Aliasnamen**, hier `je_band`.
:::

## Das größte Element finden

Damit lässt sich endlich sauber lösen, was in [Lektion 1](./01-aggregatfunktionen) offengeblieben ist:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql Maximum.sql
SELECT b.name AS band, a.datum, a.zuschauer
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
 WHERE a.zuschauer = (SELECT MAX(zuschauer) FROM auftritt);
```

:::

:::snippet{#brain}
Warum ist das besser als `ORDER BY zuschauer DESC LIMIT 1`?

Weil `LIMIT 1` bei einem Gleichstand willkürlich **eine** Zeile auswählt und die andere verschweigt. Die Variante mit `MAX` liefert **alle** Auftritte mit der Höchstzahl.

Welche Variante richtig ist, hängt von der Frage ab: „Zeig mir einen Rekordhalter" oder „Zeig mir alle Rekordhalter".
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
a) Alle Bands, deren Gründungsjahr über dem Durchschnitt aller Gründungsjahre liegt.

b) Alle Personen, die in mindestens einer Band Gesang machen – gelöst mit einer Unterabfrage, nicht mit einem Verbund.

c) Das teuerste Ticket: Zeige alle Tickets, deren Preis dem Höchstpreis entspricht.

d) Zeige für jede Bühne den Namen und die Zahl der dort gespielten Auftritte – gelöst mit einer korrelierten Unterabfrage in der `SELECT`-Liste.
:::

::::collapsible{title="Tipp 1: zu b)"}

Die Unterabfrage liefert die Menge der `person_id`, die in `mitgliedschaft` mit `instrument = 'Gesang'` steht. Die äußere Abfrage prüft mit `IN`, ob eine Person dazugehört.

::::

::::collapsible{title="Tipp 2: zu d)"}

Gerüst:

```sql
SELECT s.name,
       (SELECT COUNT(*) FROM auftritt AS a WHERE a.buehne_id = …) AS auftritte
  FROM buehne AS s;
```

::::

:::protect{password="db-4-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Loesungen.sql
-- a) 12 Bands
SELECT name, gruendungsjahr
  FROM band
 WHERE gruendungsjahr > (SELECT AVG(gruendungsjahr) FROM band)
 ORDER BY gruendungsjahr;

-- b) 17 Personen
SELECT vorname, nachname
  FROM person
 WHERE person_id IN (SELECT person_id FROM mitgliedschaft WHERE instrument = 'Gesang')
 ORDER BY nachname;

-- c)
SELECT ticket_id, kategorie, preis
  FROM ticket
 WHERE preis = (SELECT MAX(preis) FROM ticket);

-- d) 4 Zeilen
SELECT s.name AS buehne,
       (SELECT COUNT(*) FROM auftritt AS a WHERE a.buehne_id = s.buehne_id) AS auftritte
  FROM buehne AS s
 ORDER BY auftritte DESC;
```

Bei b) fällt auf: 19 Einträge in `mitgliedschaft` haben `instrument = 'Gesang'`, aber nur 17 verschiedene Personen singen – zwei Menschen singen in zwei Bands. Die Unterabfrage mit `IN` zählt jede Person nur einmal, ganz ohne `DISTINCT`.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: verwenden eine Datenbanksprache zum
Abfragen von Daten (I).
-->

---

## Selbsttest

::::multievent

**1. Wo darf eine Unterabfrage stehen, die genau einen Wert liefert?**

{r1{nur im FROM}}

{r1{!überall dort, wo ein Wert erlaubt ist}}

{r1{nur hinter IN}}

{r1{nur in der SELECT-Liste}}

{h{Denk an den Vergleich mit dem Durchschnitt.}}
{H{Richtig – zum Beispiel rechts von einem Vergleichsoperator.}}

**2. Wie viele Spalten darf eine Unterabfrage hinter IN liefern?**

{z{1}}

{h{Der Wert links vom IN ist ein einzelner Wert – womit soll er verglichen werden?}}
{H{Richtig. Mehrere Zeilen sind erlaubt, mehrere Spalten nicht.}}

**3. Was bedeutet es, wenn eine Unterabfrage korreliert ist?**

{r2{Sie steht im FROM.}}

{r2{!Sie benutzt einen Wert aus der äußeren Abfrage.}}

{r2{Sie liefert genau einen Wert.}}

{r2{Sie enthält eine Aggregatfunktion.}}

{h{Sieh dir an, woher b.band_id in der Unterabfrage kommt.}}
{H{Richtig. Deshalb wird sie für jede Zeile der äußeren Abfrage neu ausgewertet.}}

**4. Warum braucht die Verbundvariante ein DISTINCT, die IN-Variante nicht?**

{r3{Weil der Verbund langsamer ist.}}

{r3{!Weil der Verbund für jeden passenden Auftritt eine Zeile erzeugt.}}

{r3{Weil IN automatisch sortiert.}}

{r3{Weil Unterabfragen nur einen Wert liefern.}}

{h{Was passiert bei einer Band mit zwei Auftritten auf der Hauptbühne?}}
{H{Richtig. IN fragt nur, ob der Wert vorkommt – nicht wie oft.}}

**5. Was braucht eine Unterabfrage im FROM zwingend?**

{r4{ein GROUP BY}}

{r4{!einen Aliasnamen}}

{r4{ein ORDER BY}}

{r4{ein DISTINCT}}

{h{Wie soll die äußere Abfrage die Zwischentabelle sonst ansprechen?}}
{H{Richtig.}}

**6. Wann ist ORDER BY … LIMIT 1 keine gute Lösung für „das Maximum"?**

{r5{immer}}

{r5{nie}}

{r5{!wenn mehrere Zeilen denselben Höchstwert haben}}

{r5{wenn die Tabelle sehr groß ist}}

{h{LIMIT 1 liefert genau eine Zeile – auch wenn es zwei Rekordhalter gibt.}}
{H{Richtig. Dann ist der Vergleich mit MAX die ehrlichere Lösung.}}

::::
