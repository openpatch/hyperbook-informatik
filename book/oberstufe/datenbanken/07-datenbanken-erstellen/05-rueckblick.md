---
title: Rückblick
index: 5
keywords:
  - datenbanken
  - sql
  - lk
---

# Rückblick

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**.
:::

In diesem Kapitel hast du die Seite gewechselt: vom Abfragen zum Bauen. Damit kommt eine Verantwortung dazu, die es beim Abfragen nicht gab – eine falsche Abfrage liefert ein falsches Ergebnis, ein falsches `DELETE` vernichtet Daten.

## Das kann ich jetzt

- [ ] Ich kann Tabellen mit `CREATE TABLE` anlegen und passende **Datentypen** wählen. ([7.1](./01-tabellen-anlegen))
- [ ] Ich kann ein Relationenschema vollständig in SQL umsetzen, samt Fremdschlüsseln. ([7.1](./01-tabellen-anlegen))
- [ ] Ich kann die vier Arten von **Integritätsbedingungen** benennen und einsetzen. ([7.2](./02-integritaetsbedingungen))
- [ ] Ich kann vorhersagen, welche Anweisung an welcher Bedingung scheitert. ([7.2](./02-integritaetsbedingungen))
- [ ] Ich kann Daten mit `INSERT`, `UPDATE` und `DELETE` verändern – und weiß, warum ein fehlendes `WHERE` gefährlich ist. ([7.3](./03-daten-einfuegen-aendern-loeschen))
- [ ] Ich kann eine **Sicht** anlegen und begründen, wozu sie gut ist. ([7.4](./04-schema-veraendern-und-sichten))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Ein Schema umsetzen**

Setze dieses Schema für einen Fahrradverleih vollständig in SQL um.

```
station(station_id, name, adresse, plaetze)
radtyp(radtyp_id, bezeichnung)
rad(rad_id, baujahr, radtyp_id → radtyp, station_id → station)
kundin(kundin_id, vorname, nachname, email, geburtsjahr)
fahrt(fahrt_id, rad_id → rad, kundin_id → kundin, start, ende, kilometer)
```

Zusätzlich gilt:

- Der Name einer Station, die Bezeichnung eines Radtyps und die E-Mail-Adresse einer Kundin dürfen nicht fehlen.
- Eine E-Mail-Adresse und eine Typbezeichnung kommen jeweils nur einmal vor.
- Ein Rad hat immer einen Typ, steht aber nicht immer an einer Station.
- Eine Fahrt hat immer ein Rad und eine Kundin.

Achte auf die **Reihenfolge** der Anweisungen.

Begründe außerdem: Warum steht der Radtyp in einer eigenen Tabelle, statt einfach als Text in `rad`?
:::

::::collapsible{title="Tipp 1: Welche Tabelle zuerst?"}

Ein Fremdschlüssel kann nur auf eine Tabelle verweisen, die es schon gibt. Sortiere also so, dass jede Tabelle **nach** allen Tabellen kommt, auf die sie verweist. Hier heißt das: erst `station` und `kundin`, dann `rad`, zuletzt `fahrt`.

::::

::::collapsible{title="Tipp 2: Welche Bedingung wofür?"}

| Verlangt | Bedingung |
| --- | --- |
| darf nicht fehlen | `NOT NULL` hinter dem Datentyp |
| kommt nur einmal vor | `UNIQUE (spalte)` als **eigene Zeile** am Ende der Tabellendefinition |
| verweist auf eine andere Tabelle | `REFERENCES tabelle(spalte)` |
| Wert aus einer festen Liste | keine Bedingung, sondern eine **eigene Tabelle** mit Fremdschlüssel darauf |

::::

:::sqlide{db="/datenbanken/klangwiese-leer.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Schreibe hier deine CREATE-TABLE-Anweisungen.

```

:::

:::protect{password="db-7-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rueckblick-7-1.sql
CREATE TABLE station (
    station_id INTEGER PRIMARY KEY,
    name       TEXT    NOT NULL,
    adresse    TEXT,
    plaetze    INTEGER
);

CREATE TABLE radtyp (
    radtyp_id   INTEGER PRIMARY KEY,
    bezeichnung TEXT    NOT NULL,
    UNIQUE (bezeichnung)
);

CREATE TABLE kundin (
    kundin_id   INTEGER PRIMARY KEY,
    vorname     TEXT,
    nachname    TEXT,
    email       TEXT    NOT NULL,
    geburtsjahr INTEGER,
    UNIQUE (email)
);

CREATE TABLE rad (
    rad_id     INTEGER PRIMARY KEY,
    baujahr    INTEGER,
    radtyp_id  INTEGER NOT NULL REFERENCES radtyp(radtyp_id),
    station_id INTEGER REFERENCES station(station_id)
);

CREATE TABLE fahrt (
    fahrt_id  INTEGER PRIMARY KEY,
    rad_id    INTEGER NOT NULL REFERENCES rad(rad_id),
    kundin_id INTEGER NOT NULL REFERENCES kundin(kundin_id),
    start     TEXT,
    ende      TEXT,
    kilometer REAL
);
```

Vier Entscheidungen lohnen die Begründung:

- `station_id` in `rad` ist **ohne** `NOT NULL` – ein Rad kann unterwegs sein und gerade an keiner Station stehen. `radtyp_id` ist dagegen `NOT NULL`: Ein Rad ohne Typ gibt es nicht.
- `rad_id` und `kundin_id` in `fahrt` sind `NOT NULL`: Eine Fahrt ohne Rad oder ohne Kundin ergibt keinen Sinn.
- `UNIQUE` steht als **eigene Zeile** am Ende der Tabelle, nicht hinter der Spalte. Beides ist gültiges SQL; die SQL-IDE versteht nur die zweite Form.
- `kilometer` ist `REAL`, weil Bruchteile vorkommen. Für Geldbeträge wäre `REAL` dagegen die falsche Wahl – dort rechnet man besser in Cent mit `INTEGER`.

**Warum eine eigene Tabelle für den Radtyp?** Stünde der Typ als Text in `rad`, könnte dort alles stehen: `Pedelec`, `pedelec`, `Peddelec`. Eine Abfrage nach allen Pedelecs fände dann nicht alle. Mit einer eigenen Tabelle und einem Fremdschlüssel darauf sorgt die Datenbank selbst dafür, dass nur bekannte Typen vorkommen – und eine Umbenennung geschieht an genau einer Stelle. Andere Datenbanksysteme bieten dafür auch `CHECK (typ IN (…))` an; die eigene Tabelle ist die flexiblere Lösung, weil ein neuer Typ dann kein Ändern des Schemas verlangt.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Was scheitert woran?**

Angenommen, das Schema aus Aufgabe 1 ist angelegt. Es gibt die Station 1, den Radtyp 1 und die Kundin 1 mit der Adresse `mail@beispiel.de`. Auf Station 1 steht bereits ein Rad.

Sag für jede Anweisung voraus: Läuft sie durch, oder scheitert sie? Wenn sie scheitert – **welche** Bedingung greift, und **wann** fällt es auf: schon beim Lesen der Anweisung oder erst beim Ausführen?

```sql
-- a)
INSERT INTO kundin (kundin_id, vorname, email) VALUES (2, 'Ben', 'mail@beispiel.de');

-- b)
INSERT INTO station (station_id, name, plaetze) VALUES (2, NULL, 20);

-- c)
INSERT INTO rad (rad_id, baujahr, radtyp_id, station_id) VALUES (7, 2024, 99, 1);

-- d)
INSERT INTO rad (rad_id, baujahr, radtyp_id) VALUES (8, 2023, 1);

-- e)
INSERT INTO station (station_id, name, plaetze) VALUES (1, 'Zweite', 15);

-- f)
DELETE FROM station WHERE station_id = 1;
```
:::

:::protect{password="db-7-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Scheitert** an `UNIQUE (email)` – diese Adresse gibt es schon. Auffallen kann das erst beim **Ausführen**: Ob die Adresse schon vorkommt, sieht man der Anweisung nicht an, dazu muss man nachsehen.

b) **Scheitert** an `NOT NULL` bei `name`. Das steht in der Anweisung selbst, wird also schon beim **Lesen** bemängelt – der Editor meldet es im Reiter *Fehler*, ausgeführt wird sie gar nicht.

c) **Scheitert** an der **referenziellen Integrität**: Einen Radtyp 99 gibt es nicht. Wieder erst beim Ausführen. In SQLite muss dafür `PRAGMA foreign_keys = ON` gesetzt sein, sonst liefe die Anweisung stillschweigend durch; die SQL-IDE tut das.

d) **Läuft durch.** `station_id` fehlt, darf aber fehlen – das Rad ist eben gerade unterwegs. Alle Pflichtangaben sind vorhanden.

e) **Scheitert** an der **Entitätsintegrität**: `station_id` 1 ist als Primärschlüssel schon vergeben. Erst beim Ausführen sichtbar.

f) **Scheitert**, solange noch ein Rad auf Station 1 verweist – wieder die referenzielle Integrität. Sie verhindert, dass Verweise ins Leere zeigen. Löschen ließe sich die Station erst, nachdem die Räder umgesetzt oder ihre `station_id` geleert wurde.

**Das Muster dahinter:** Was in der Anweisung selbst steht – ein fehlender Pflichtwert, ein unbekannter Spaltenname –, fällt beim Lesen auf. Alles, was einen Blick in die gespeicherten Daten verlangt, fällt erst beim Ausführen auf.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ändern mit Bedacht**

Im Übungsbereich liegt eine Kopie der Festivaldatenbank, in der du gefahrlos arbeiten kannst.

a) Trage eine neue Bühne ein: *Waldlichtung*, 350 Plätze, nicht überdacht.

b) Erhöhe die Kapazität der Zeltbühne um 200.

c) Lösche alle Bewertungen mit weniger als 2 Punkten. Sag **vorher** mit einer Abfrage, wie viele es sein werden, und prüfe danach nach.

d) Formuliere die Anweisung aus b) einmal **ohne** `WHERE`. Was würde sie anrichten? Führe sie nicht aus.

e) Lege eine Sicht `grosse_buehnen` an, die Name und Kapazität aller Bühnen mit mehr als 1000 Plätzen enthält. Frage sie danach ab.
:::

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Anweisungen.
-- a)

-- b)

-- c)

-- e)

```

:::

::::collapsible{title="Tipp zu c)"}

Schreib die Abfrage zuerst als `SELECT COUNT(*)` mit genau derselben Bedingung. Wenn die Zahl plausibel ist, ersetzt du `SELECT COUNT(*)` durch `DELETE`. Das ist die übliche Vorsichtsmaßnahme vor jedem `DELETE`.

::::

:::protect{password="db-7-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rueckblick-7-3.sql
-- a)
INSERT INTO buehne (name, kapazitaet, ueberdacht)
VALUES ('Waldlichtung', 350, 0);

-- b)
UPDATE buehne
   SET kapazitaet = kapazitaet + 200
 WHERE name = 'Zeltbuehne';

-- c) zuerst zaehlen: 123 Bewertungen
SELECT COUNT(*) FROM bewertung WHERE punkte < 2;

DELETE FROM bewertung WHERE punkte < 2;

-- e)
CREATE VIEW grosse_buehnen AS
SELECT name, kapazitaet
  FROM buehne
 WHERE kapazitaet > 1000;

SELECT * FROM grosse_buehnen;
```

d) Ohne `WHERE` gilt ein `UPDATE` für **alle** Zeilen: Jede Bühne bekäme 200 Plätze mehr. Es gibt keine Rückfrage und kein Rückgängig – nur die Meldung, wie viele Zeilen geändert wurden. In der Praxis erwischt dieser Fehler jeden einmal; deshalb die Regel, jedes `UPDATE` und jedes `DELETE` zuerst als `SELECT` mit derselben Bedingung zu schreiben.

Zu e): Die Sicht ist keine Kopie, sondern ein gespeicherter Name für die Abfrage. Ändert sich eine Kapazität, ändert sich die Sicht mit. Nach a) und b) enthält sie drei Zeilen: Hauptbühne, Waldbühne und die auf 1400 vergrößerte Zeltbühne. Die neue Waldlichtung mit 350 Plätzen gehört nicht dazu.

:::

<!--
Rückblick zum Inhaltsfeld Formale Sprachen und Automaten (LK): verwenden eine
Datenbanksprache zum Erstellen und Aendern von Datenbanken (I). Aufgabe 2
prueft die Integritaetsbedingungen im Zusammenspiel.
-->

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge müssen die Tabellen angelegt werden?**

{S1{station}}

{S1{rad}}

{S1{fahrt}}

{h{Eine Tabelle kann nur auf etwas verweisen, das es schon gibt.}}
{H{Richtig.}}

**2. Wie stellt man sicher, dass in einer Spalte nur Werte aus einer festen Liste stehen?**

{r1{mit NOT NULL}}

{r1{mit UNIQUE}}

{r1{!mit einer eigenen Tabelle und einem Fremdschlüssel darauf}}

{r1{gar nicht, das muss das Programm prüfen}}

{h{Welche Bedingung sorgt dafür, dass ein Wert in einer anderen Tabelle vorkommen muss?}}
{H{Richtig. Manche Systeme bieten dafür zusätzlich CHECK an – die eigene Tabelle bleibt die flexiblere Lösung.}}

**3. Was garantiert PRIMARY KEY?**

{r2{nur, dass der Wert nie fehlt}}

{r2{nur, dass der Wert eindeutig ist}}

{r2{!beides: der Wert ist eindeutig und fehlt nie}}

{r2{dass der Wert in einer anderen Tabelle vorkommt}}

{h{Man nennt es Entitätsintegrität – jedes Tupel ist ansprechbar.}}
{H{Richtig.}}

**4. Eine Station soll gelöscht werden, auf die noch Räder verweisen. Was passiert?**

{r3{Die Räder werden mitgelöscht.}}

{r3{!Das Löschen scheitert an der referenziellen Integrität.}}

{r3{Die station_id der Räder wird automatisch geleert.}}

{r3{Nichts, der Verweis zeigt danach ins Leere.}}

{h{Voreingestellt ist die vorsichtigste Variante.}}
{H{Richtig – anderes Verhalten müsste man mit ON DELETE ausdrücklich verlangen.}}

**5. Was ist an einem UPDATE ohne WHERE gefährlich?**

{r4{Es scheitert mit einer Fehlermeldung.}}

{r4{!Es ändert alle Zeilen der Tabelle, ohne Rückfrage.}}

{r4{Es ändert nur die erste Zeile.}}

{r4{Es legt eine neue Tabelle an.}}

{h{Ohne Bedingung trifft die Anweisung jede Zeile.}}
{H{Richtig. Deshalb: erst als SELECT schreiben, dann ersetzen.}}

**6. Was ist eine Sicht?**

{r5{eine Kopie der Daten zu einem Zeitpunkt}}

{r5{!ein gespeicherter Name für eine Abfrage, deren Ergebnis stets aktuell ist}}

{r5{eine Tabelle ohne Primärschlüssel}}

{r5{eine Zugriffsberechtigung}}

{h{Enthält sie eigene Daten?}}
{H{Richtig. Genau deshalb eignet sie sich, um bestimmte Spalten vor bestimmten Nutzergruppen zu verbergen.}}

**7. Welche Aussage über Datentypen stimmt?**

{r6{Geldbeträge speichert man am besten als REAL.}}

{r6{!Ein Datum speichert man als Text im Format JJJJ-MM-TT, damit die alphabetische Reihenfolge der zeitlichen entspricht.}}

{r6{INTEGER darf keine negativen Werte enthalten.}}

{r6{TEXT ist immer die sicherste Wahl.}}

{h{Eine der Aussagen kennst du aus Kapitel 2 über den Vergleich von Datumsangaben.}}
{H{Richtig. Geldbeträge rechnet man dagegen besser in Cent als ganze Zahlen.}}

::::
