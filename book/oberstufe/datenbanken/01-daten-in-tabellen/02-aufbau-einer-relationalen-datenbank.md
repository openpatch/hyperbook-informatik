---
title: Aufbau einer relationalen Datenbank
index: 2
---

# Aufbau einer relationalen Datenbank

Fast alle Datenbanken, die du im Alltag benutzt, sind **relational**. Das klingt komplizierter, als es ist: Eine relationale Datenbank besteht aus Tabellen, und die Tabellen sind über gemeinsame Werte miteinander verknüpft.

## Die Fachbegriffe

Sieh dir diese Tabelle an:

| buehne_id | name | kapazitaet | ueberdacht |
| --- | --- | --- | --- |
| 1 | Hauptbuehne | 8000 | 0 |
| 2 | Waldbuehne | 2500 | 1 |
| 3 | Zeltbuehne | 1200 | 1 |
| 4 | Seebuehne | 600 | 0 |

:::snippet{#definition}
| Alltagswort | Fachbegriff | Bedeutung |
| --- | --- | --- |
| Tabelle | **:t[Relation]{#relation}** | eine Menge gleichartiger Datensätze |
| Zeile | **:t[Tupel]{#tupel}** oder Datensatz | ein einzelnes Objekt, hier: eine Bühne |
| Spalte | **Attribut** | eine Eigenschaft, die alle Objekte haben |
| erlaubte Werte einer Spalte | **Wertebereich** (Domäne) | z. B. „ganze Zahl" oder „Text bis 40 Zeichen" |
| Zelle | **Attributwert** | ein einzelner Wert |
:::

Zwei Regeln machen aus einer beliebigen Tabelle eine Relation:

:::snippet{#merken}
1. **Jeder Attributwert ist atomar.** In einer Zelle steht genau ein Wert, keine Liste. Ein Feld mit `Indie, Rock` verstößt dagegen.
2. **Die Reihenfolge der Zeilen ist bedeutungslos.** Eine Relation ist eine *Menge* von Tupeln. Wenn du eine bestimmte Reihenfolge brauchst, musst du sie bei der Abfrage anfordern.

Aus 2. folgt etwas Wichtiges: Man kann eine Zeile **nicht** über ihre Position ansprechen („die dritte Zeile"), sondern nur über ihre Werte.
:::

## Das Schema

Wie eine Tabelle gebaut ist, beschreibt man kurz so:

```
buehne(buehne_id, name, kapazitaet, ueberdacht)
```

:::snippet{#definition}
Das **:t[Relationenschema]{#relationenschema}** nennt den Namen der Relation und ihre Attribute. Der Schlüssel wird unterstrichen oder – wenn das nicht geht – vorangestellt.

Alle Relationenschemata einer Datenbank zusammen bilden das **Datenbankschema**. Das Schema beschreibt den *Aufbau*; die tatsächlich gespeicherten Tupel heißen **Ausprägung**.
:::

Der Unterschied ist derselbe wie zwischen einem Formular und einem ausgefüllten Formular. Das Schema ändert sich selten, die Ausprägung ständig.

## Schlüssel

Wenn man Zeilen nicht über ihre Position ansprechen kann – wie dann?

:::snippet{#definition}
Ein **Schlüssel** ist eine Attributmenge, deren Werte jedes Tupel einer Relation eindeutig bestimmen. Zu einem Schlüsselwert gehört also immer höchstens ein Tupel.

- Jede Attributmenge, die das leistet und aus der man kein Attribut mehr weglassen kann, heißt **Schlüsselkandidat**.
- Einen der Schlüsselkandidaten wählt man aus; er heißt **:t[Primärschlüssel]{#primaerschluessel}**.
:::

In der Tabelle `buehne` sind `buehne_id` und `name` beides Schlüsselkandidaten – beide Werte kommen jeweils nur einmal vor. Gewählt wurde `buehne_id`.

:::snippet{#brain}
Warum nimmt man in der Praxis fast immer eine künstliche Nummer als Primärschlüssel und nicht den Namen?

Weil Namen sich ändern. Wird aus der Waldbühne die *Lichtungsbühne*, müsste man jeden Verweis auf sie anfassen. Eine Nummer ohne Bedeutung ändert sich nie. Man nennt sie **künstlicher Schlüssel** (Surrogatschlüssel).
:::

:::snippet{#aufgabe}
Hier ist die Tabelle `person` der Festivaldatenbank. Sieh sie dir an und entscheide für jede der folgenden Attributmengen, ob sie ein Schlüsselkandidat ist:

a) `nachname`

b) `vorname`, `nachname`

c) `person_id`

d) `person_id`, `nachname`
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Personen.sql
SELECT * FROM person ORDER BY nachname;
```

:::

::::collapsible{title="Tipp 1: Wie prüfe ich das?"}

Suche nach zwei Zeilen, die im fraglichen Attribut denselben Wert haben. Findest du zwei, ist es kein Schlüssel.

::::

::::collapsible{title="Tipp 2: Vorsicht bei d)"}

Ein Schlüsselkandidat darf **nicht** mehr Attribute enthalten als nötig. Frage dich: Wird `nachname` überhaupt gebraucht, wenn `person_id` schon dabei ist?

::::

:::protect{password="db-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Kein Schlüssel.** In dieser Ausprägung kommt zwar jeder Nachname nur einmal vor, aber das ist Zufall. Nachnamen sind grundsätzlich nicht eindeutig – ein Schlüssel muss für **alle möglichen** Ausprägungen gelten, nicht nur für die aktuelle.

b) **Kein Schlüssel**, aus demselben Grund. Zwei Menschen können gleich heißen.

c) **Schlüsselkandidat.** Die Nummer wird genau einmal vergeben.

d) **Kein Schlüsselkandidat**, sondern nur ein Schlüssel im weiteren Sinn. Die Werte bestimmen zwar jedes Tupel eindeutig, aber `nachname` ist überflüssig – man kann es weglassen und `person_id` allein reicht. Ein Schlüsselkandidat ist **minimal**.

**Die entscheidende Einsicht:** Ob etwas ein Schlüssel ist, entscheidet nicht die aktuelle Tabelle, sondern die Bedeutung der Daten.

:::

## Fremdschlüssel

Die Tabellen stehen nicht für sich. Sieh dir an, wie `auftritt` auf `buehne` verweist:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Verweis.sql
SELECT auftritt_id, band_id, buehne_id, datum, beginn
  FROM auftritt
 ORDER BY auftritt_id;
```

:::

In `auftritt.buehne_id` stehen dieselben Zahlen wie in `buehne.buehne_id`. So wird die Verbindung hergestellt.

:::snippet{#definition}
Ein **:t[Fremdschlüssel]{#fremdschluessel}** ist ein Attribut (oder eine Attributmenge) einer Relation, das auf den Primärschlüssel einer anderen Relation verweist.

Das Datenbanksystem sorgt dafür, dass jeder Fremdschlüsselwert dort auch wirklich vorkommt. Diese Bedingung heißt **referenzielle Integrität**.
:::

Probiere aus, was passiert, wenn man dagegen verstößt:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Verstoss.sql
-- SCHEITERT ABSICHTLICH: die Bühne 99 gibt es nicht.
INSERT INTO auftritt (auftritt_id, band_id, buehne_id, datum, beginn, dauer_min, zuschauer)
VALUES (900, 1, 99, '2026-07-16', '12:00', 30, 100);
```

:::

:::snippet{#aufgabe}
Führe die Anweisung aus und lies die Meldung im Reiter *Ausgabe*.

a) Wie lautet sie?

b) Ändere die 99 in eine gültige Bühnennummer und führe die Anweisung erneut aus. Prüfe mit einer eigenen Abfrage, ob der Auftritt jetzt in der Tabelle steht.

c) Erkläre, warum ein Datenbanksystem so etwas überhaupt überwacht. Was wäre die Alternative?
:::

:::protect{password="db-1-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `FOREIGN KEY constraint failed`

b) Zum Beispiel:

```sql Pruefen.sql
INSERT INTO auftritt (auftritt_id, band_id, buehne_id, datum, beginn, dauer_min, zuschauer)
VALUES (900, 1, 2, '2026-07-16', '12:00', 30, 100);

SELECT * FROM auftritt WHERE auftritt_id = 900;
```

c) Die Alternative wäre, dass jedes Programm, das auf die Datenbank zugreift, selbst darauf achtet. Sobald es mehr als ein Programm gibt, geht das schief: Es reicht ein einziges, das den Fall vergisst, und in der Datenbank stehen Auftritte auf Bühnen, die es nicht gibt. Die Bedingung im System gilt für alle Zugriffe gleichermaßen.

Über *Datenbank Reset* bekommst du den Ausgangszustand zurück.

:::

<!--
KLP QPh, Daten und ihre Strukturierung: Schlüsselkandidaten, Primär- und
Fremdschlüssel als inhaltlicher Schwerpunkt der Datenbankmodellierungen.
-->

---

## Selbsttest

::::multievent

**1. Wie heißt eine Zeile einer Relation mit Fachbegriff?**

{r1{Attribut}}

{r1{!Tupel}}

{r1{Domäne}}

{r1{Schema}}

{h{Attribut ist die Spalte. Gesucht ist die Zeile.}}
{H{Richtig. Ein Tupel ist ein einzelner Datensatz.}}

**2. Welche Aussagen über Relationen stimmen?** (Mehrfachauswahl)

{c1{!In jeder Zelle steht genau ein Wert.}}

{c1{!Die Reihenfolge der Zeilen hat keine Bedeutung.}}

{c1{Man kann eine Zeile über ihre Position ansprechen.}}

{c1{Alle Spalten müssen denselben Wertebereich haben.}}

{h{Denk daran, warum man bei einer Abfrage überhaupt ORDER BY braucht.}}
{H{Richtig. Weil die Reihenfolge bedeutungslos ist, muss man sie beim Abfragen anfordern.}}

**3. Was unterscheidet einen Schlüsselkandidaten von einem beliebigen Schlüssel?**

{r2{Er besteht immer aus genau einem Attribut.}}

{r2{!Er ist minimal – man kann kein Attribut weglassen.}}

{r2{Er wird vom Datenbanksystem automatisch vergeben.}}

{r2{Er darf keine Zahlen enthalten.}}

{h{Warum war person_id, nachname kein Schlüsselkandidat?}}
{H{Genau. Aus einem Schlüsselkandidaten lässt sich nichts mehr streichen.}}

**4. In auftritt.buehne_id stehen Nummern aus der Tabelle buehne. Wie heißt so ein Attribut?**

{r3{Primärschlüssel}}

{r3{Schlüsselkandidat}}

{r3{!Fremdschlüssel}}

{r3{Wertebereich}}

{h{Der Wert gehört ursprünglich zu einer anderen, fremden Tabelle.}}
{H{Richtig. Und das System wacht darüber, dass er dort auch existiert.}}

**5. Wie viele Tupel hat die Relation buehne der Festivaldatenbank?**

{z{4}}

{h{Schau in der IDE links in den Datenbankbaum – dort steht die Anzahl der Datensätze.}}
{H{Richtig!}}

**6. Ergänze: Die Bedingung, dass jeder Fremdschlüsselwert in der referenzierten Tabelle vorkommen muss, heißt {t{referenzielle Integrität}}.**

::::
