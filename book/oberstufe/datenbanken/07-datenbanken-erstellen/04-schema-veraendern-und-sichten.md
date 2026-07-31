---
title: Schema verändern und Sichten
index: 4
---

# Schema verändern und Sichten

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**.
:::

Kein Datenbankschema bleibt, wie es war. Anforderungen ändern sich – und anders als bei einem Programm liegen in der Datenbank Daten, die den Umbau überleben müssen.

:::alert{info}
In dieser Lektion legst du Spalten, Tabellen und Sichten an und benutzt sie gleich darauf. Der Editor prüft deinen Text aber gegen das Schema, wie es **im Moment** aussieht – und dort gibt es die neue Spalte noch nicht.

Der Reiter *Fehler* meldet deshalb Dinge wie *webseite ist kein Bezeichner einer Spalte der Tabelle band*. Führe die Anweisungen einfach **der Reihe nach** aus: Nach der ersten verschwinden die Meldungen zu den folgenden von selbst.
:::

## Spalten hinzufügen

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="530px"}

```mysql Erweitern.sql
ALTER TABLE band ADD COLUMN webseite VARCHAR(120);

UPDATE band SET webseite = 'https://nordlicht.example.org' WHERE band_id = 1;

SELECT band_id, name, webseite FROM band ORDER BY band_id;
```

:::

:::snippet{#aufgabe}
a) Führe die drei Anweisungen aus. Was steht in `webseite` bei den übrigen 21 Bands?

b) Warum kann man eine neue Spalte nicht einfach mit `NOT NULL` versehen?

c) Wie kommt man trotzdem zu einer Spalte, die nie leer ist? Beschreibe den Weg in drei Schritten.
:::

::::collapsible{title="Tipp zu b)"}

Was müsste in den 21 vorhandenen Zeilen stehen, unmittelbar nachdem die Spalte entstanden ist?

::::

:::protect{password="db-7-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Nichts – der Wert fehlt. In SQL heißt das `NULL`.

b) Weil im selben Moment 22 Zeilen entstünden, die gegen die Bedingung verstoßen. Die Datenbank kann eine Bedingung nicht durchsetzen, die der vorhandene Bestand schon verletzt.

Ein Ausweg ist ein Vorgabewert: `ALTER TABLE band ADD COLUMN webseite VARCHAR(120) NOT NULL DEFAULT '';` Dann bekommen alle vorhandenen Zeilen den leeren Text – die Bedingung ist erfüllt, aber der Inhalt ist es nicht.

c) Der ehrliche Weg hat drei Schritte:

1. Spalte **ohne** `NOT NULL` anlegen.
2. Die Werte für alle vorhandenen Zeilen **nachtragen** – von Hand, aus einer anderen Quelle oder mit einem `UPDATE`.
3. Erst danach die Bedingung setzen.

Schritt 3 geht in SQLite nicht mit `ALTER TABLE`; dort baut man die Tabelle neu und kopiert die Daten hinüber. Andere Systeme können `ALTER TABLE … ALTER COLUMN … SET NOT NULL`.

Merke: Ein Schemaumbau ist fast nie eine einzelne Anweisung, sondern eine **Folge** aus Umbau und Datenpflege.

:::

## Tabellen löschen

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="610px"}

```mysql Loeschen.sql
CREATE TABLE probe (
    id   INTEGER PRIMARY KEY,
    text VARCHAR(40)
);

DROP TABLE probe;
```

:::

:::alert{warn}
`DROP TABLE` löscht die Tabelle **mitsamt allen Daten**. Es gibt keine Rückfrage und kein Rückgängig.

Der Unterschied zu `DELETE FROM tabelle;` ist wichtig: `DELETE` leert die Tabelle, `DROP` entfernt sie ganz. Nach `DELETE` kann man wieder einfügen, nach `DROP` muss man sie erst neu anlegen.
:::

## Sichten

:::snippet{#definition}
Eine **Sicht** (englisch *view*) ist eine gespeicherte Abfrage, die sich wie eine Tabelle ansprechen lässt. Sie speichert keine Daten – bei jedem Zugriff läuft die hinterlegte Abfrage neu.
:::

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Sicht.sql
CREATE VIEW spielplan AS
SELECT a.datum, a.beginn, b.name AS band, s.name AS buehne, a.dauer_min
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
  JOIN buehne AS s ON s.buehne_id = a.buehne_id;

SELECT * FROM spielplan ORDER BY datum, beginn;

SELECT * FROM spielplan WHERE buehne = 'Waldbuehne';

SELECT buehne, COUNT(*) AS auftritte FROM spielplan GROUP BY buehne;
```

:::

:::snippet{#merken}
Eine Sicht ist aus drei Gründen nützlich:

1. **Wiederverwendung.** Ein komplizierter :t[Verbund]{#verbund} wird einmal geschrieben und danach wie eine Tabelle benutzt.
2. **Vereinfachung.** Wer den Spielplan braucht, muss das Schema nicht kennen.
3. **Zugriffsschutz.** Man kann Rechte auf die Sicht vergeben statt auf die Tabellen dahinter. Wer nur `spielplan` sehen darf, sieht keine Zuschauerzahlen und keine Besucherdaten.

Der dritte Punkt ist der wichtigste – dazu mehr in [Kapitel 8](../08-datenschutz-und-datensicherheit).
:::

:::snippet{#aufgabe}
a) Lege eine Sicht `bandinfo` an, die zu jeder Band den Namen, das Herkunftsland und die Zahl ihrer Auftritte zeigt.

b) Frage die Sicht ab und sortiere nach der Auftrittszahl.

c) Füge einen neuen Auftritt ein und frage die Sicht erneut ab. Was fällt auf?

d) Erkläre mit c), warum eine Sicht keine Kopie ist.
:::

::::collapsible{title="Tipp zu a)"}

Die Abfrage kennst du schon aus [Kapitel 4](../04-gruppieren-und-auswerten/02-gruppieren-mit-group-by). Schreibe `CREATE VIEW bandinfo AS` davor.

::::

:::protect{password="db-7-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Sicht.sql
CREATE VIEW bandinfo AS
SELECT b.name AS band, b.herkunftsland, COUNT(*) AS auftritte
  FROM auftritt AS a
  JOIN band AS b ON b.band_id = a.band_id
 GROUP BY b.name, b.herkunftsland;

SELECT * FROM bandinfo ORDER BY auftritte DESC, band;

INSERT INTO auftritt (auftritt_id, band_id, buehne_id, datum, beginn, dauer_min, zuschauer)
VALUES (902, 1, 1, '2026-07-19', '23:00', 60, 5000);

SELECT * FROM bandinfo WHERE band = 'Nordlicht';
```

c) *Nordlicht* hat jetzt einen Auftritt mehr – ohne dass an der Sicht etwas geändert wurde.

d) Eine Sicht speichert nur die **Abfrage**, nicht ihr Ergebnis. Bei jedem Zugriff läuft sie neu und sieht die aktuellen Daten. Deshalb kann eine Sicht auch nie veralten – anders als eine Tabelle, in die man ein Zwischenergebnis kopiert hat.

:::

## Der Umbau im laufenden Betrieb

:::snippet{#brain}
In einer echten Anwendung ist ein Schemaumbau heikel: Während der Umbau läuft, greifen Programme auf die Datenbank zu, die das alte Schema erwarten.

Der übliche Weg besteht deshalb aus mehreren Schritten, die einzeln jeweils **beide** Schemaversionen bedienen:

1. Neue Spalte hinzufügen, alte behalten. Beide Versionen laufen.
2. Anwendung so anpassen, dass sie in beide schreibt, aber aus der neuen liest.
3. Alte Daten in die neue Spalte übertragen.
4. Erst wenn nichts mehr auf die alte Spalte zugreift: löschen.

Das ist derselbe Gedanke wie beim Refactoring in Java – nur dass man Daten nicht neu übersetzen kann.
:::

<!--
KLP QPh (nur LK), Daten und ihre Strukturierung: setzen ein relationales
Datenbankschema mit geeigneten Datentypen in einem Datenbanksystem um (I).
Sichten leiten auf Kapitel 8 über (Zugriffsrechte, Datenschutz).
-->

---

## Selbsttest

::::multievent

**1. Was steht in einer neu hinzugefügten Spalte bei den vorhandenen Zeilen?**

{r1{eine Null}}

{r1{ein leerer Text}}

{r1{!nichts, der Wert fehlt}}

{r1{der Wert der vorherigen Spalte}}

{h{In SQL heißt das NULL – und das ist etwas anderes als 0 oder der leere Text.}}
{H{Richtig. Deshalb geht ADD COLUMN mit NOT NULL nicht ohne Vorgabewert.}}

**2. Was unterscheidet DROP TABLE von DELETE FROM?**

{r2{nichts}}

{r2{!DELETE leert die Tabelle, DROP entfernt sie ganz}}

{r2{DROP leert die Tabelle, DELETE entfernt sie ganz}}

{r2{DROP ist rückgängig zu machen}}

{h{Kann man nach der Anweisung noch etwas einfügen?}}
{H{Richtig. Nach DROP muss die Tabelle erst neu angelegt werden.}}

**3. Was speichert eine Sicht?**

{r3{eine Kopie der Daten}}

{r3{!die Abfrage, nicht ihr Ergebnis}}

{r3{beides}}

{r3{nur die Spaltennamen}}

{h{Was passierte mit bandinfo, nachdem du einen Auftritt eingefügt hattest?}}
{H{Richtig. Deshalb ist eine Sicht immer aktuell.}}

**4. Wozu sind Sichten nützlich?** (Mehrfachauswahl)

{c1{!Ein komplizierter Verbund wird nur einmal geschrieben.}}

{c1{!Wer die Sicht benutzt, muss das Schema dahinter nicht kennen.}}

{c1{!Man kann Rechte auf die Sicht statt auf die Tabellen vergeben.}}

{c1{Abfragen auf Sichten sind schneller als auf Tabellen.}}

{h{Bei jedem Zugriff läuft die hinterlegte Abfrage neu.}}
{H{Richtig – schneller wird dadurch nichts.}}

**5. Warum lässt sich eine neue Spalte nicht sofort auf NOT NULL setzen?**

{r4{Weil ALTER TABLE das nie erlaubt.}}

{r4{!Weil die vorhandenen Zeilen die Bedingung im selben Moment verletzen würden.}}

{r4{Weil NOT NULL nur beim CREATE TABLE geht.}}

{r4{Weil SQLite kein NOT NULL kennt.}}

{h{Was stünde in den 22 vorhandenen Zeilen?}}
{H{Richtig. Erst Werte nachtragen, dann die Bedingung setzen.}}

::::
