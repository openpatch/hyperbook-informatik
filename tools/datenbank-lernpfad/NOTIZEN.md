# Notizen zum Lernpfad „Datenbanken" (Oberstufe)

Was die eingebaute SQL-IDE kann und was nicht. Alles hier ist **ausprobiert**, nicht
aus der Dokumentation abgeschrieben. Wer am Lernpfad weiterarbeitet, sollte das lesen,
bevor er eine Abfrage schreibt.

## Das `sqlide`-Element

```md
:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Abfrage.sql
SELECT name FROM band;
```

:::
```

| Attribut | Bedeutung |
| --- | --- |
| `db` | Pfad zur SQLite-Datei. Absolute Pfade werden gegen `public/` aufgelöst. Ohne Angabe lädt die IDE ihre mitgelieferte Weltdatenbank. |
| `height` | Höhe des **gesamten** Blocks. Voreinstellung ist fast bildschirmfüllend – **immer setzen**, sonst zerreißt es die Seite. |

**Zur Höhe:** Der Editor bekommt rund **24 %** der Blockhöhe, der Rest geht an
Fehlerliste, Ausgabe und Datenbankbaum. Eine Codezeile misst etwa 19 px. Für
sichtbare `n` Zeilen braucht man also grob

```
height = (n * 19 + 30) / 0.237
```

Bei acht Zeilen sind das schon 760 px. Mehr als das lohnt sich nicht – für lange
Dateien gibt es den Knopf *Fullscreen* und die verschiebbare Trennlinie zwischen
Editor und Ausgabe. Die Höhen im Lernpfad sind nach dieser Formel gesetzt und
bei 760 px gedeckelt.

Mehr Attribute gibt es nicht. `withFileList`, `withOutput` und Ähnliches kennt die
IDE zwar intern, das Hyperbook-Element reicht sie aber nicht durch.

**Code-Fences im Block:**

- ```` ```mysql Name.sql ```` – eine SQL-Datei. Der Info-String wird zum Dateinamen im
  Dateibaum. Mehrere Fences ergeben mehrere Dateien.
- ```` ```md Name.md ```` – eine **Hinweisdatei**. Sie erscheint neben den SQL-Dateien
  und wird als Markdown gerendert. Praktisch für Aufgabenstellungen, die beim Arbeiten
  sichtbar bleiben sollen.

Die Sprache heißt im Fence `mysql`, die Datenbank darunter ist aber **SQLite**
(sql.js im Browser). Für die SQL-Syntax gilt SQLite, nicht MySQL.

## Wie die IDE arbeitet

- Die IDE prüft den Quelltext **während des Tippens** gegen das Schema der geladenen
  Datenbank. Tippfehler in Tabellen- und Spaltennamen erscheinen sofort im Reiter
  *Fehler*.
- **Statements mit einem Fehler werden nicht ausgeführt.** Was der eingebaute Prüfer
  nicht versteht, kann man also auch nicht laufen lassen – siehe die Liste unten.
- Der Startknopf ▷ führt **die Anweisung aus, in der der Cursor steht**, nicht die
  ganze Datei. Mehrere Anweisungen in einer Datei sind trotzdem sinnvoll: Man springt
  von einer zur nächsten.
- Änderungen an den Daten (`INSERT`, `UPDATE`, `DELETE`, `CREATE`) wirken nur im
  Browser. Über *Datenbank Reset* kommt man zum Ausgangszustand zurück.
- **Fremdschlüssel und Schlüsselbedingungen greifen zur Laufzeit.** Ein `INSERT` mit
  unbekanntem Fremdschlüssel scheitert mit `FOREIGN KEY constraint failed`, ein
  doppelter Primärschlüssel mit `UNIQUE constraint failed`. Genau das braucht man für
  die Lektion zur referenziellen Integrität.

## Was funktioniert

Abfragen:

`SELECT`, `DISTINCT`, `AS` (auch weggelassen), `WHERE`, `AND`/`OR`/`NOT`,
`=`, `<>`, `!=`, `<`, `>`, `<=`, `>=`, `BETWEEN`, `LIKE` mit `%` und `_`,
`IN (Liste)`, `IN (Unterabfrage)`, `ORDER BY` (auch nach Aliasnamen und nach
Spaltennummer), `ASC`/`DESC`, `LIMIT`, `LIMIT … OFFSET …`

Verbunde: Kreuzprodukt mit Komma, `JOIN … ON`, `INNER JOIN`, `LEFT JOIN`,
Mehrfachverbunde, Selbstverbund mit Aliasnamen

Gruppieren: `GROUP BY`, `HAVING`, `COUNT(*)`, `COUNT(spalte)`,
`COUNT(DISTINCT spalte)`, `SUM`, `AVG`, `MIN`, `MAX`

Unterabfragen: skalar im `WHERE`, korreliert in der `SELECT`-Liste, als Tabelle im
`FROM`, als Wertemenge hinter `IN`

Funktionen und Ausdrücke: `ROUND`, `ABS`, `UPPER`, `LOWER`, `LENGTH`, `strftime`,
Verkettung mit `||`, Grundrechenarten, `UNION`

Datendefinition: `CREATE TABLE` mit `INTEGER`, `INT`, `TEXT`, `VARCHAR(n)`, `CHAR(n)`,
`REAL`, `DECIMAL(p,s)`, `DATE`, `DATETIME`, `BOOLEAN`; `PRIMARY KEY` (einzeln,
zusammengesetzt als Tabellenbedingung, mit `AUTOINCREMENT`), `NOT NULL`,
`DEFAULT wert`, `UNIQUE (spalte)` **als Tabellenbedingung**,
`FOREIGN KEY (…) REFERENCES tabelle(spalte)`;
`ALTER TABLE … ADD COLUMN`, `DROP TABLE`, `CREATE VIEW`

Datenmanipulation: `INSERT INTO … VALUES`, `INSERT INTO … SELECT`, `UPDATE … SET … WHERE`,
`DELETE FROM … WHERE`

## Was **nicht** funktioniert

Der eingebaute Prüfer lehnt das ab – die Anweisung läuft dann gar nicht erst:

| Nicht verwenden | Ersatz |
| --- | --- |
| `IS NULL`, `IS NOT NULL`, `ISNULL` | gar nicht. Die Datenbanken des Lernpfads enthalten deshalb **keine NULL-Werte**. |
| `IFNULL(…)`, `COALESCE(…)` | – |
| `NOT IN (…)` | `NOT spalte IN (…)` geht ebenfalls nicht. Bedingung umformulieren, z. B. mit `<>` und `AND`. |
| `EXISTS (…)` | `IN (Unterabfrage)` |
| `CASE WHEN … THEN … END` | zwei Abfragen mit `UNION` oder eine Fallunterscheidung im Text |
| `JOIN … USING (spalte)` | `JOIN … ON a.spalte = b.spalte` |
| `substr(…)`, `CAST(… AS …)` | `strftime` für Datumsteile; Division durch `1.0` statt `CAST` |
| `GROUP_CONCAT(…)` | – |
| `CREATE TABLE … AS SELECT` | `CREATE TABLE` und danach `INSERT … SELECT` |
| `UNIQUE` direkt hinter einer Spalte | `UNIQUE (spalte)` als eigene Zeile |
| `CHECK (…)` | – |

Außerdem: Was in derselben Datei erst mit `CREATE TABLE`, `CREATE VIEW` oder
`ALTER TABLE … ADD COLUMN` entsteht, kennt der Prüfer noch nicht. Ein `INSERT`
oder `SELECT` darauf wird rot markiert, **bis die anlegende Anweisung einmal
ausgeführt wurde**. In Aufgaben deshalb entweder die anlegende Anweisung allein
in eine Datei setzen oder – so ist es im Lernpfad gelöst – einen
`:::alert{info}` mit dem Hinweis danebenschreiben, dass die Meldungen nach dem
Ausführen der ersten Anweisung verschwinden. Die betroffenen Blöcke stehen in
der Liste `ABSICHTLICH_FEHLERHAFT` in `pruefe_seiten.js`.

## Wo die IDE großzügiger ist als der Standard

Zwei Stellen, an denen SQLite **mehr** erlaubt als der SQL-Standard und als die
meisten anderen Systeme. Beide sind im Lernpfad ausdrücklich angesprochen, damit
niemand sich etwas angewöhnt, das anderswo scheitert:

- **Aliasnamen im `WHERE`.** `SELECT 2026 - jahr AS alter FROM t WHERE alter > 15`
  läuft hier, scheitert aber unter PostgreSQL und MySQL. Der Ausdruck gehört im
  `WHERE` wiederholt.
- **Spalten ohne `GROUP BY`.** `SELECT a, b, COUNT(*) FROM t GROUP BY a` liefert
  für `b` irgendeinen Wert aus der Gruppe, statt die Abfrage abzulehnen.

## Statisch oder zur Laufzeit?

Manche Fehler findet der Editor, andere erst die Ausführung. Der Unterschied ist
im Unterricht ein eigener Lerngegenstand:

| Fehler | wird bemerkt |
| --- | --- |
| unbekannte Tabelle oder Spalte | statisch, Reiter *Fehler* |
| `NULL` in einer `NOT NULL`-Spalte | statisch |
| nicht unterstützte Syntax (siehe oben) | statisch |
| verletzter Fremdschlüssel | zur Laufzeit, Reiter *Ausgabe* |
| doppelter Primärschlüssel | zur Laufzeit |
| `COUNT(*)` im `WHERE` | zur Laufzeit (`misuse of aggregate`) |

## Die Datenbanken

Alle liegen in `public/datenbanken/` und werden von
`tools/datenbank-lernpfad/erzeuge_datenbanken.py` erzeugt. Das Skript läuft mit
festem Startwert für den Zufallsgenerator und liefert reproduzierbare Dateien.
**Nach jeder Änderung am Skript müssen die Lösungen neu geprüft werden**
(`pruefe_sql.py`), weil sich sonst Ergebniszahlen im Text verschieben.

| Datei | Inhalt |
| --- | --- |
| `klangwiese.sqlite` | Die Festivaldatenbank. Zehn Tabellen, Fremdschlüssel aktiv. Grundlage fast aller Aufgaben. |
| `klangwiese-uebung.sqlite` | Dieselben Daten **ohne** Fremdschlüsselbedingungen. Für Aufgaben, in denen absichtlich widersprüchliche Daten entstehen sollen. |
| `klangwiese-roh.sqlite` | Eine einzige unnormalisierte Tabelle `auftrittsliste`. Verletzt bewusst die 1., 2. und 3. Normalform. |
| `klangwiese-leer.sqlite` | Enthält nur eine Tabelle `hinweis`. Für `CREATE TABLE`-Aufgaben. |

Schema von `klangwiese.sqlite`:

```
genre(genre_id, name)
band(band_id, name, gruendungsjahr, herkunftsland)
band_genre(band_id→band, genre_id→genre)
person(person_id, vorname, nachname, geburtsjahr, land)
mitgliedschaft(person_id→person, band_id→band, instrument, seit)
buehne(buehne_id, name, kapazitaet, ueberdacht)
auftritt(auftritt_id, band_id→band, buehne_id→buehne, datum, beginn, dauer_min, zuschauer)
besucherin(besucher_id, vorname, nachname, geburtsjahr, plz, email)
ticket(ticket_id, besucher_id→besucherin, kategorie, preis, kaufdatum)
bewertung(besucher_id→besucherin, auftritt_id→auftritt, punkte)
```

Zwei echte n:m-Beziehungen (`band_genre`, `mitgliedschaft` mit dem Zusatzattribut
`instrument`), eine n:m-Beziehung mit vielen Attributen (`auftritt`) und eine
Bewertungstabelle für Gruppierungsaufgaben.

## Werkzeuge

| Datei | Zweck |
| --- | --- |
| `erzeuge_datenbanken.py` | erzeugt die vier SQLite-Dateien in `public/datenbanken/` |
| `check_lernpfad.py` | statische Prüfung der Seiten: Aufbau, Selbsttests, Passwörter, `sqlide`-Blöcke, verbotene SQL-Konstrukte |
| `pruefe_sql.py` | führt **jede** SQL-Anweisung aus dem Lernpfad gegen die echte Datenbank aus und meldet Fehler; mit `--ergebnisse` zeigt es zusätzlich die Trefferzahlen |
| `pruefe_seiten.js` | lädt die gebauten Seiten in einem Chromium und liest den Fehlerreiter der IDE aus – findet, was nur der IDE-Prüfer bemängelt |

Vor jedem Commit alle Pruefungen des Repositorys starten:

```bash
python3 tools/pruefe-alles.py --schnell   # nur statisch, dauert Sekunden
python3 tools/pruefe-alles.py             # zusaetzlich Bauen und Browser
```

Das Skript findet die Pruefungen selbst und startet den Dev-Server bei Bedarf.
Einzeln gehen sie natuerlich auch:

```bash
python3 tools/datenbank-lernpfad/check_lernpfad.py
python3 tools/datenbank-lernpfad/pruefe_sql.py
```

Eine Uebersicht ueber alle Werkzeuge steht in `tools/README.md`.
