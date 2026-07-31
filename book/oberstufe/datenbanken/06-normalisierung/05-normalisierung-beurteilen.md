---
title: Normalisierung beurteilen
index: 5
---

# Normalisierung beurteilen

Die drei Normalformen sind ein Verfahren, kein Naturgesetz. Zum Handwerk gehört auch die Frage, **wann man abweicht** – und was das kostet.

## Was die Normalisierung leistet

:::snippet{#merken}
| Schritt | Beseitigt | Preis |
| --- | --- | --- |
| 1NF | mehrwertige Attributwerte | mehr Zeilen, zunächst mehr Redundanz |
| 2NF | partielle Abhängigkeiten | eine :t[Relation]{#relation} mehr je Abhängigkeit |
| 3NF | transitive Abhängigkeiten | eine Relation mehr je Abhängigkeit |

Der gemeinsame Nutzen: Jede Information steht **genau einmal**. Damit sind die drei Anomalien ausgeschlossen – nicht erschwert, sondern strukturell unmöglich.

Der gemeinsame Preis: **mehr Tabellen und damit mehr Verbunde** in jeder Abfrage.
:::

## Der Preis, konkret

Dieselbe Frage – „Wer spielt wann auf welcher Bühne?" – einmal an der unnormalisierten und einmal an der normalisierten Datenbank:

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="420px"}

```mysql Unnormalisiert.sql
SELECT band, buehne, datum, beginn
  FROM auftrittsliste
 ORDER BY datum, beginn;
```

:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Normalisiert.sql
SELECT b.name AS band, s.name AS buehne, a.datum, a.beginn
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
  JOIN buehne AS s ON s.buehne_id = a.buehne_id
 ORDER BY a.datum, a.beginn;
```

:::

:::snippet{#aufgabe}
a) Beide liefern dasselbe. Vergleiche die beiden Abfragen: Was hat die Normalisierung für den Menschen, der die Abfrage schreibt, schwieriger gemacht?

b) Warum nimmt man diesen Nachteil trotzdem in Kauf?

c) Nenne eine Frage, die an der **normalisierten** Datenbank leichter zu beantworten ist als an der unnormalisierten.
:::

:::protect{password="db-6-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Statt einer Tabelle sind drei nötig, dazu zwei Verbundbedingungen. Man muss das Schema kennen, um die Abfrage überhaupt schreiben zu können.

b) Weil die unnormalisierte Tabelle nur so lange bequem ist, wie niemand etwas ändert. Sobald Daten gepflegt werden, schlagen die Anomalien zu – und ein einziger übersehener Datensatz macht die ganze Auswertung wertlos. Eine umständliche Abfrage auf richtigen Daten ist besser als eine bequeme auf falschen.

c) Zum Beispiel „Wie viele Bands gibt es je Genre?" – an der normalisierten Datenbank ein `GROUP BY` über zwei Tabellen, an der unnormalisierten wegen der mehrwertigen Zellen gar nicht lösbar. Oder „Welche Bands haben noch nie gespielt?" – in der Auftrittsliste kommen sie schlicht nicht vor.

:::

## Wann man bewusst abweicht

:::snippet{#definition}
**Denormalisierung** ist die absichtliche Rücknahme eines Normalisierungsschritts, um Abfragen zu beschleunigen. Man nimmt Redundanz in Kauf und muss sie dann selbst konsistent halten.
:::

:::snippet{#merken}
Denormalisierung ist ein **letztes** Mittel, kein Ausgangspunkt. Drei Bedingungen sollten erfüllt sein:

1. Es gibt ein **gemessenes** Geschwindigkeitsproblem – nicht ein vermutetes.
2. Die betroffenen Daten ändern sich **selten** oder gar nicht.
3. Es gibt einen **Mechanismus**, der die Kopien synchron hält – ein Trigger, ein nächtlicher Abgleich, ein Neuaufbau.

Fehlt Punkt 3, ist es keine Denormalisierung, sondern nur ein schlechtes Schema.
:::

:::snippet{#brain}
Ein Beispiel, das man häufig sieht: In `auftritt` eine zusätzliche Spalte `bandname` – dann spart jede Anzeige des Spielplans einen :t[Verbund]{#verbund}.

Was spricht dagegen? Bandnamen ändern sich selten, aber sie ändern sich. Und man müsste jeden `UPDATE` auf `band.name` daran erinnern, auch alle Auftrittszeilen anzufassen. Wer das vergisst, hat genau die Änderungsanomalie zurück, gegen die die Normalisierung antritt.

Bei 46 Auftritten wäre das ein Handel ohne jeden Gewinn. Bei 46 Millionen kann es der richtige sein – aber dann als bewusste, dokumentierte Entscheidung.
:::

## Historische Werte sind keine Redundanz

:::snippet{#merken}
Ein Wert, der zu einem Vorgang gehört, ist auch dann kein Verstoß, wenn er anderswo noch einmal steht:

- der `preis` eines Tickets neben dem aktuellen Kategoriepreis
- der `einzelpreis` einer Bestellposition neben dem aktuellen Artikelpreis
- die Anschrift auf einer Rechnung neben der aktuellen Kundenanschrift

In allen drei Fällen gilt **keine** funktionale Abhängigkeit von der jeweils anderen Tabelle: Der historische Wert ist gerade nicht durch den aktuellen bestimmt. Es liegt also kein Normalisierungsverstoß vor.

Die Prüffrage lautet immer: **Ist der Wert aus dem anderen ableitbar – heute und in fünf Jahren?**
:::

## Übung: Ein Schema beurteilen

:::snippet{#aufgabe}
Ein Sportverein verwaltet seine Kurse so:

```
kursbuchung(mitglied_id, kurs_id, mitgliedsname, mitglieds_plz, mitglieds_ort,
            kurstitel, trainer_id, trainername, wochentag, gebuehr_bezahlt)
```

:t[Primärschlüssel]{#primaerschluessel}: `mitglied_id`, `kurs_id`

a) Beurteile das Schema nach den Kriterien aus [Kapitel 5](../05-datenbanken-modellieren/05-modellierungen-beurteilen). Nenne für jeden Mangel Kriterium, Beleg und Folge.

b) Führe die Normalisierung bis zur 3. :t[Normalform]{#normalform} durch.

c) Der Verein sagt: „Wir haben 300 Mitglieder und 20 Kurse. Der Aufwand lohnt sich für uns nicht." Nimm dazu begründet Stellung.
:::

::::collapsible{title="Tipp zu a)"}

Achte besonders auf `mitglieds_plz` und `mitglieds_ort` – dort steckt eine Abhängigkeit, die man leicht übersieht.

::::

:::protect{password="db-6-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

- **Redundanzfreiheit verletzt (partiell).** Beleg: `mitgliedsname` steht in jeder Buchungszeile eines Mitglieds erneut. Folge: Eine Namensänderung muss in allen Zeilen nachgezogen werden; wird eine übersehen, widerspricht sich die Datenbank.
- **Redundanzfreiheit verletzt (partiell).** Beleg: `kurstitel`, `wochentag` und `trainer_id` hängen allein von `kurs_id` ab. Folge: Ein neuer Kurs ohne Anmeldungen lässt sich nicht speichern (Einfügeanomalie).
- **Redundanzfreiheit verletzt (transitiv).** Beleg: `trainer_id → trainername`. Folge: dieselben drei Anomalien für die Trainerdaten.
- **Redundanzfreiheit verletzt (transitiv).** Beleg: `mitglieds_plz → mitglieds_ort` – die Postleitzahl bestimmt den Ort. Folge: Es können widersprüchliche Kombinationen entstehen, etwa `45127 Dortmund`.
- **Vollständigkeit** ist erfüllt, **Kardinalitäten** sind korrekt: Die n:m-Beziehung zwischen Mitglied und Kurs ist richtig als eigene Relation erkannt.

b)

```
ort(plz, ort)
mitglied(mitglied_id, mitgliedsname, plz→ort)
trainer(trainer_id, trainername)
kurs(kurs_id, kurstitel, wochentag, trainer_id→trainer)
kursbuchung(mitglied_id→mitglied, kurs_id→kurs, gebuehr_bezahlt)
```

c) Der Einwand verwechselt zwei Dinge. Der Aufwand der Normalisierung fällt **einmal beim Entwurf** an, die Kosten der Anomalien fallen **dauerhaft beim Betrieb** an – und sie hängen nicht an der Datenmenge, sondern an der Zahl der Änderungen.

Bei 300 Mitgliedern und 20 Kursen gibt es bis zu 6000 Buchungszeilen. Ein einziger Trainerwechsel betrifft dann hunderte davon. Der Verein braucht die Normalisierung nicht *trotz* seiner geringen Größe weniger, sondern hätte den Aufwand in einer Nachmittagssitzung erledigt.

Was man dem Verein zugestehen kann: Die Tabelle `ort` ist verzichtbar. Sie ist formal korrekt, aber sie verlangt eine gepflegte Postleitzahlentabelle, die der Verein nicht hat – und ein falsch eingetragener Ort ist für ihn folgenlos. Das ist eine begründete Abweichung, keine Nachlässigkeit.

:::

<!--
KLP QPh, Daten und ihre Strukturierung: beurteilen Datenbankmodellierungen und
Datenbankschemata (A); überführen Datenbankschemata in die 1. bis 3.
Normalform (M).
-->

---

## Selbsttest

::::multievent

**1. Was ist der wichtigste Nutzen der Normalisierung?**

{r1{Die Datenbank braucht weniger Speicherplatz.}}

{r1{Abfragen werden schneller.}}

{r1{!Jede Information steht genau einmal, damit sind Anomalien ausgeschlossen.}}

{r1{Die Tabellen werden übersichtlicher.}}

{h{Was war das Problem an der Auftrittsliste ganz am Anfang?}}
{H{Richtig – und Abfragen werden dadurch eher aufwendiger, nicht einfacher.}}

**2. Was ist der Preis der Normalisierung?**

{r2{Datenverlust}}

{r2{!mehr Tabellen und damit mehr Verbunde in den Abfragen}}

{r2{höherer Speicherbedarf für die Nutzdaten}}

{r2{es gibt keinen}}

{h{Vergleiche die beiden Spielplanabfragen aus dieser Lektion.}}
{H{Richtig.}}

**3. Welche Bedingungen sollten für eine bewusste Denormalisierung erfüllt sein?** (Mehrfachauswahl)

{c1{!Es gibt ein gemessenes Geschwindigkeitsproblem.}}

{c1{!Die betroffenen Daten ändern sich selten.}}

{c1{!Es gibt einen Mechanismus, der die Kopien synchron hält.}}

{c1{Die Datenbank ist klein.}}

{h{Bei einer kleinen Datenbank gibt es gar kein Geschwindigkeitsproblem zu lösen.}}
{H{Richtig. Fehlt der dritte Punkt, ist es einfach ein schlechtes Schema.}}

**4. Der Preis eines verkauften Tickets steht in ticket, obwohl die Kategorie einen aktuellen Preis hat. Ist das ein Verstoß gegen die 3. Normalform?**

{r3{Ja, transitiv über die Kategorie.}}

{r3{!Nein, der historische Preis ist nicht aus dem aktuellen ableitbar.}}

{r3{Ja, aber ein zulässiger.}}

{r3{Das lässt sich nicht entscheiden.}}

{h{Gilt die funktionale Abhängigkeit kategorie → preis auch in fünf Jahren?}}
{H{Richtig. Ohne funktionale Abhängigkeit gibt es keinen Verstoß.}}

**5. Ordne zu, was die jeweilige Normalform beseitigt.**

{S1{1NF beseitigt mehrwertige Attributwerte}}
{S1{2NF beseitigt partielle Abhängigkeiten}}
{S1{3NF beseitigt transitive Abhängigkeiten}}

{h{Vom Zellinhalt über den Teilschlüssel zum Umweg.}}
{H{Richtig!}}

::::
