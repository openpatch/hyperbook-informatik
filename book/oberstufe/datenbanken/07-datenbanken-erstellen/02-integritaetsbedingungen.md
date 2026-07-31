---
title: Integritätsbedingungen
index: 2
---

# Integritätsbedingungen

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**.
:::

Eine Integritätsbedingung ist eine Regel, die das Datenbanksystem **selbst** durchsetzt. Sie gilt für jeden Zugriff – egal, welches Programm ihn auslöst und ob dessen Autor daran gedacht hat.

## Die vier Arten

:::snippet{#definition}
| Bedingung | Was sie garantiert |
| --- | --- |
| `PRIMARY KEY` | Der Wert ist eindeutig und fehlt nie. **Entitätsintegrität** |
| `FOREIGN KEY … REFERENCES …` | Der Wert kommt in der Zieltabelle vor. **Referenzielle Integrität** |
| `NOT NULL` | Der Wert fehlt nie. |
| `UNIQUE (spalte)` | Der Wert kommt höchstens einmal vor. |

Zusammen bilden sie die **Datenintegrität**: die Zusicherung, dass die gespeicherten Daten in sich stimmig sind.
:::

## Ausprobieren

Die folgenden Anweisungen sollen alle scheitern. Führe sie einzeln aus.

:::alert{info}
Achte darauf, **wo** die Meldung erscheint. Bei der dritten Anweisung merkt schon der Editor, dass etwas nicht stimmt, und schreibt es in den Reiter *Fehler* – ausgeführt wird sie gar nicht erst. Die anderen drei sehen für den Editor einwandfrei aus; sie scheitern erst beim Ausführen, und die Meldung steht dann im Reiter *Ausgabe*.

Der Unterschied hat einen Grund: Ob ein Wert fehlt, sieht man der Anweisung an. Ob die Bühnennummer 99 existiert, kann man nur nachsehen.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Verstoesse.sql
-- Scheitert absichtlich: die Buehne 99 gibt es nicht.
INSERT INTO auftritt (auftritt_id, band_id, buehne_id, datum, beginn, dauer_min, zuschauer)
VALUES (901, 1, 99, '2026-07-16', '12:00', 30, 100);

-- Scheitert absichtlich: die Buehnennummer 1 ist schon vergeben.
INSERT INTO buehne (buehne_id, name, kapazitaet, ueberdacht)
VALUES (1, 'Doppelt', 100, 0);

-- Scheitert absichtlich: der Name darf nicht fehlen.
INSERT INTO buehne (buehne_id, name, kapazitaet, ueberdacht)
VALUES (9, NULL, 100, 0);

-- Scheitert absichtlich: das Paar (1, 1) steht schon in band_genre.
INSERT INTO band_genre (band_id, genre_id) VALUES (1, 1);
```

:::

:::snippet{#aufgabe}
Ordne jeder Meldung die verletzte Integritätsbedingung zu.

a) `FOREIGN KEY constraint failed`

b) `UNIQUE constraint failed: buehne.buehne_id`

c) *Die Spalte name ist nicht nullable, daher kann null hier nicht eingefügt werden.*

d) `UNIQUE constraint failed: band_genre.band_id, band_genre.genre_id`

Erkläre bei d), warum die Meldung **zwei** Spalten nennt. Und begründe, warum ausgerechnet c) schon vom Editor bemängelt wird und nicht erst beim Ausführen.
:::

:::protect{password="db-7-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Referenzielle Integrität, durchgesetzt durch den `FOREIGN KEY` von `auftritt.buehne_id`.

b) Entitätsintegrität, durchgesetzt durch den `PRIMARY KEY` von `buehne`. Ein :t[Primärschlüssel]{#primaerschluessel} ist intern eine `UNIQUE`-Bedingung, deshalb die Wortwahl.

c) Die `NOT NULL`-Bedingung auf `buehne.name`.

d) Ebenfalls Entitätsintegrität. Der Primärschlüssel von `band_genre` ist **zusammengesetzt**: `(band_id, genre_id)`. Die Bedingung verlangt nicht, dass jede der beiden Spalten für sich eindeutig ist – nur die **Kombination**. `band_id = 1` darf mehrfach vorkommen, aber nicht zweimal zusammen mit `genre_id = 1`.

**Warum c) früher auffällt:** Für a), b) und d) müsste der Editor in die Daten schauen – gibt es die Bühne 99? ist die 1 schon vergeben? Das kann er nicht, ohne die Anweisung auszuführen. Bei c) steht das `NULL` dagegen wörtlich in der Anweisung, und dass `name` nicht leer sein darf, steht im Schema. Beides zusammen genügt für ein Urteil, ohne eine einzige Zeile zu lesen.

Dieselbe Unterscheidung wie zwischen Syntax und Semantik in [Kapitel 2](../02-abfragen-mit-sql/01-select-und-from): Manches sieht man dem Text an, für anderes muss man nachsehen.

:::

## Was passiert beim Löschen?

Referenzielle Integrität wirkt in beide Richtungen. Sie verhindert nicht nur ungültige Verweise beim Einfügen, sondern auch beim Löschen des Verweisziels.

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Loeschen.sql
-- Scheitert absichtlich: auf diese Buehne verweisen 14 Auftritte.
DELETE FROM buehne WHERE buehne_id = 1;
```

:::

:::snippet{#aufgabe}
a) Führe die Anweisung aus. Warum scheitert sie?

b) Beschreibe zwei Wege, die Hauptbühne trotzdem loszuwerden. Welcher ist der richtige?

c) Was wäre die Alternative, wenn die Datenbank **nicht** über referenzielle Integrität wachen würde?
:::

::::collapsible{title="Tipp zu b)"}

Der eine Weg räumt vorher auf, der andere schaltet die Regel ab.

::::

:::protect{password="db-7-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 14 Auftritte verweisen mit `buehne_id = 1` auf diese Bühne. Würde man sie löschen, zeigten diese Verweise ins Leere.

b) Erstens: zuerst die abhängigen Auftritte löschen, dann die Bühne. Zweitens: die Bedingung abschalten. Der erste Weg ist der richtige – er zwingt zur bewussten Entscheidung darüber, was mit den Auftritten passieren soll.

Manche Systeme bieten dafür `ON DELETE CASCADE` an: Dann werden die abhängigen Zeilen automatisch mitgelöscht. Bequem, aber gefährlich – ein falsches `DELETE` räumt damit halbe Datenbanken ab.

c) Dann entstünden **verwaiste Verweise**: Auftrittszeilen mit einer `buehne_id`, zu der es keine Bühne mehr gibt. Ein :t[Verbund]{#verbund} würde sie stillschweigend übergehen, und die Zuschauerzahlen dieser Auftritte fehlten in jeder Auswertung – ohne Fehlermeldung, ohne Hinweis.

:::

## Was Integritätsbedingungen **nicht** leisten

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="450px"}

```mysql Unsinn.sql
INSERT INTO band (band_id, name, gruendungsjahr, herkunftsland)
VALUES (99, 'Zeitreisende', 3025, 'Mars');

SELECT * FROM band WHERE band_id = 99;
```

:::

:::snippet{#aufgabe}
a) Führe die Anweisungen aus. Wird die Band gespeichert?

b) Was ist an dem Datensatz offensichtlich falsch?

c) Welche Integritätsbedingung hätte das verhindert – und warum ist sie im Lernpfad nicht verfügbar?

d) Wer muss den Unsinn dann abfangen?
:::

:::protect{password="db-7-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ja, ohne jede Beanstandung.

b) Das Gründungsjahr 3025 liegt in der Zukunft, und *Mars* ist kein Land.

c) Eine Wertebereichsbedingung. Im SQL-Standard schreibt man dafür `CHECK (gruendungsjahr <= 2026)`; für das Herkunftsland würde man eine eigene Tabelle `land` anlegen und einen :t[Fremdschlüssel]{#fremdschluessel} darauf setzen.

`CHECK` versteht die hier verwendete IDE nicht – siehe die Notizen in `tools/datenbank-lernpfad/NOTIZEN.md`. In einem ausgewachsenen Datenbanksystem steht es zur Verfügung.

d) Ohne `CHECK` bleibt nur die Anwendung. Und damit sind wir wieder bei dem Problem vom Anfang: Was in der Anwendung geprüft wird, gilt nur für diese eine Anwendung. Ein zweites Programm, ein Datenimport oder eine Korrektur von Hand umgehen die Prüfung.

**Die Regel lautet deshalb:** Was das Datenbanksystem durchsetzen kann, soll es durchsetzen. Die Anwendung prüft zusätzlich, nicht stattdessen.

:::

<!--
KLP QPh (nur LK), Daten und ihre Strukturierung: setzen ein relationales
Datenbankschema mit geeigneten Datentypen in einem Datenbanksystem um (I).
Bezug zu Informatik, Mensch und Gesellschaft: Integrität als Grundprinzip der
Datensicherheit, siehe Kapitel 8.
-->

---

## Selbsttest

::::multievent

**1. Was garantiert ein PRIMARY KEY?**

{r1{dass die Zeilen sortiert sind}}

{r1{!dass der Wert eindeutig ist und nie fehlt}}

{r1{dass der Wert in einer anderen Tabelle vorkommt}}

{r1{dass der Wert eine Zahl ist}}

{h{Man nennt das Entitätsintegrität.}}
{H{Richtig – jede Zeile ist eindeutig ansprechbar.}}

**2. Die Meldung lautet: UNIQUE constraint failed: band_genre.band_id, band_genre.genre_id. Was bedeutet das?**

{r2{Beide Spalten müssen einzeln eindeutig sein.}}

{r2{!Die Kombination beider Werte darf nur einmal vorkommen.}}

{r2{Eine der beiden Spalten enthält NULL.}}

{r2{Die Tabelle hat keinen Primärschlüssel.}}

{h{Der Primärschlüssel ist zusammengesetzt.}}
{H{Richtig. band_id = 1 darf mehrfach vorkommen, nur nicht zweimal mit demselben Genre.}}

**3. Warum lässt sich eine Bühne nicht löschen, auf die Auftritte verweisen?**

{r3{Weil sie einen Primärschlüssel hat.}}

{r3{!Weil sonst Verweise ins Leere zeigen würden.}}

{r3{Weil DELETE ohne WHERE nicht erlaubt ist.}}

{r3{Weil die Tabelle zu groß ist.}}

{h{Was stünde danach in auftritt.buehne_id?}}
{H{Richtig. Das ist die referenzielle Integrität.}}

**4. Welche Bedingungen kann ein Datenbanksystem durchsetzen?** (Mehrfachauswahl)

{c1{!dass ein Wert eindeutig ist}}

{c1{!dass ein Wert nicht fehlt}}

{c1{!dass ein Fremdschlüsselwert existiert}}

{c1{dass ein Gründungsjahr plausibel ist}}

{h{Für den letzten Punkt bräuchte es eine CHECK-Bedingung, die diese IDE nicht kennt.}}
{H{Richtig. Was die Datenbank nicht prüft, muss die Anwendung prüfen – und das ist die schwächere Stelle.}}

**5. Warum ist es besser, eine Regel in der Datenbank statt in der Anwendung durchzusetzen?**

{r4{Weil es schneller ist.}}

{r4{!Weil sie dann für alle Zugriffe gilt, nicht nur für die eines Programms.}}

{r4{Weil Anwendungen keine Regeln prüfen können.}}

{r4{Weil der SQL-Standard es vorschreibt.}}

{h{Wie viele Programme greifen im Lauf der Jahre auf eine Datenbank zu?}}
{H{Richtig. Ein einziges Programm, das den Fall vergisst, reicht sonst.}}

::::
