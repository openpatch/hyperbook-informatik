---
name: Mitmachen
hide: true
---

# Mitmachen

Du hast Lust, bei diesem Projekt mitzumachen? Super! Wir freuen uns über jede Unterstützung.

Du findest den Quellcode auf [GitHub](https://github.com/openpatch/hyperbook-informatik).

Auf jeder Seite findest du unten links ein Stiftsymbol. Darüber kannst du Korrekturen und Ergänzungen vorschlagen.

## Gliederung des Buches

- Die Themen sind nach Kategorien gegliedert.
- Jedes Thema setzt sich aus mehreren Kapitel zusammen.
- Jedes Kapitel besteht aus mehreren Seiten.

## Gliederung der Übersichtsseite

- Jedes Thema sollte eine Übersichtsseite haben und folgende Struktur:
    - Worum geht es hier? (thematische Orientierung)
    - Für dieses Thema musst du ... (Vorwissen mit Links zu den passenden Zusammenfassungsseiten)
    - Hier lernst du ... (Lernziele)

## Banner

- Banner sollten immer **1024x280 Pixel** oder in diesem Verhältnis (ca. 3,66:1) groß sein
- Das Banner wird **über der Überschrift** der Seite platziert
- Achte auf gute Lesbarkeit und passende Kontraste

## Absprachen zur einhaltlichen Gestaltung

:::alert{info}
Snippet ist hier großgeschreiben, damit es nicht angewahlt wird. Im echten Code bitte kleinschreiben.
:::

```md
:::Snippet{#aufgabe}

Meine Aufgabe

:::
```

:::snippet{#aufgabe}

Hier sollte die Aufgabenstellung oder Problemstellung stehen. Unteraufgaben sollten außerhalb Snippets stehen.

:::

```md
:::Snippet{#beispiel}

Ein Beispiel

:::
```

:::snippet{#beispiel}

für Beispiele und Musteraufgaben

:::

```md
:::Snippet{#merken}

Zum Merken

:::
```

:::snippet{#merken}

für Merksätze oder Regeln.

:::

```md
:::Snippet{#brain}

Für Sachen zum Weiterdenken

:::
```

:::snippet{#brain}

Für Sachen zum Weiterdenken, zum Knoblen. Also für anspruchsvollere Probleme.

:::

## Lernpfade

Ein **Lernpfad** ist mehr als eine Sammlung von Seiten: eine durchgehende Strecke, die man von vorne bis hinten durcharbeiten kann. Fünf gibt es zurzeit – [Turtle-Grafiken](/mittelstufe/python/einfuehrung-mit-turtle), [Webentwicklung](/mittelstufe/web), [3D-Druck](/mittelstufe/3d-druck), [Datenbanken](/oberstufe/datenbanken) und [Programmierung mit Java](/oberstufe/oop). Alle sind gleich gebaut. Wer einen neuen anlegt oder an einem bestehenden weiterarbeitet, hält sich an diesen Aufbau.

### Der Aufbau im Überblick

```
lernpfad/
├── index.md                     Startseite: Worum geht es, wie arbeitet man damit
├── 01-kapitel/
│   ├── index.md                 Kapitelseite: Voraussetzungen und Lernziele
│   ├── 01-lektion.md            Lektion
│   ├── 02-lektion.md
│   └── 03-rueckblick.md         Kapitelabschluss
├── 02-kapitel/
│   └── …
├── 08-projekt/                  freies Arbeiten, kein Rückblick
└── 09-referenz/                 Nachschlagewerk, kein Rückblick
```

Die **Zahlenpräfixe** im Dateinamen stimmen mit dem `index:` im Frontmatter überein. Kapitelseiten tragen `name:`, Lektionen `title:`.

### Die Startseite

Sie beantwortet drei Fragen und nicht mehr:

1. **Worum geht es hier?** Zwei bis drei Sätze, die sagen, was am Ende herauskommt.
2. **Wie du mit diesem Lernpfad arbeitest** – als `:::snippet{#merken}`: Programmierbereiche laufen im Browser, Beispiele soll man verändern, Tipps sind gestuft, Lösungen sind geschützt, jede Lektion endet mit einem Selbsttest.
3. **Die Kapitel** als Tabelle mit einer Zeile je Kapitel.

Dazu gehören ein `permaid:` für den QR-Code und `keywords:` für die Suche.

### Die Kapitelseite

Auch sie folgt einem festen Muster:

- **Worum geht es hier?** – der Zweck des Kapitels in zwei Sätzen.
- **Für dieses Kapitel musst du …** – die Voraussetzungen, mit Link auf das Kapitel, in dem sie stehen. Beim ersten Kapitel entfällt der Abschnitt.
- **Hier lernst du …** – eine Liste der Lernziele, in der Sprache der Lernenden formuliert, nicht in der des Lehrplans.

### Die Lektion

Eine Lektion behandelt **einen** Gedanken und ist in einer Unterrichtsstunde zu schaffen. Ihr Aufbau:

1. **Einstieg** – ein bis zwei Sätze, die das Problem aufwerfen. Keine Inhaltsangabe.
2. **Erarbeitung** im Wechsel aus Erklärung, `:::snippet{#definition}` beziehungsweise `{#merken}` und einem **Übungsbereich** (`onlineide`, `sqlide`, `webide`, `pyide`, `openscad`), in dem etwas läuft, das man verändern kann.
3. **Aufgaben** als `:::snippet{#aufgabe}` – möglichst mit einer **Vorhersage** vor dem Ausprobieren.
4. **Gestufte Tipps** als `::::collapsible{title="Tipp 1: …"}`. Der erste gibt einen Denkanstoß, der letzte ein Gerüst. Sie ersetzen die Lehrkraft für den Moment, in dem sie gerade woanders steht.
5. **Lösung** in einem `:::protect`-Block.
6. **Selbsttest** – nach einem `---` die Überschrift `## Selbsttest` und ein `::::multievent`-Block mit fünf bis acht Fragen über die Lektion.

Zusätzlich: `:::snippet{#brain}` für Vertiefungen, die niemand braucht, um weiterzukommen, und `:::alert{info}` für Hinweise zum Werkzeug.

### Der Kapitelabschluss

Jedes Inhaltskapitel endet mit `NN-rueckblick.md`. Der Selbsttest einer Lektion prüft nur, was zwei Bildschirmseiten vorher stand – der Rückblick ist die Stelle, an der sich zeigt, ob es auch **zusammen** trägt. Er besteht aus:

- **Das kann ich jetzt** – eine Checkliste (`- [ ]`) mit einem Punkt je Lernziel und einem Link auf die zugehörige Lektion.
- **Gemischte Aufgaben** – zwei bis drei Aufgaben, die **mehrere** Lektionen zugleich verlangen, mit Tipps und geschützter Lösung. Genau das wird in einer Klassenarbeit gefordert.
- **Selbsttest** über das ganze Kapitel.

Projekt- und Referenzkapitel brauchen keinen Rückblick; die Prüfskripte nehmen sie automatisch aus.

### Lösungen und Passwörter

Lösungen stehen in `:::protect{password="…" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}`.

Das Passwort folgt dem Schema `<pfad>-<kapitel>-<lektion>-<nummer>`, etwa `db-4-3-2` oder `web-2-6-1`, und ist **im ganzen Buch eindeutig**. Zwei Werkzeuge helfen dabei:

```bash
python3 tools/passwoerter.py              # Übersicht für Lehrkräfte, mit Seite und Abschnitt
python3 tools/erzeuge_passwortseite.py    # erzeugt die Seite /loesungen im Buch
```

Die Seite [Lösungspasswörter](/loesungen) gehört zum Buch und wird **erzeugt**, nicht von Hand gepflegt. Wer einen `protect`-Block hinzufügt, ändert oder verschiebt, lässt das Skript neu laufen; `python3 tools/pruefe-alles.py --generatoren` prüft, dass die eingecheckte Seite zum Bestand passt.

### Weitere Absprachen

- **Bezüge zum Kernlehrplan** stehen in HTML-Kommentaren, damit sie im Buch nicht erscheinen. Sie sind für Lehrkräfte gedacht, nicht für Lernende.
- **Fachbegriffe** werden beim ersten Auftreten als `:t[Begriff]{#glossar-id}` verlinkt – aber nicht in Überschriften, nicht in Code und nicht in `multievent`-Blöcken.
- **Bilder** liegen neben der Markdown-Datei und heißen `<lektionsnummer>-<motiv>.png`.
- **Erzeugte Dateien** – Datenbanken, Referenzbilder, die Passwortseite – werden nie von Hand bearbeitet. Wer sie ändern will, ändert das Skript.

:::alert{info}
Im `multievent`-Block darf **kein Inline-Code** mit Backticks stehen – die Syntaxhervorhebung zerlegt sonst die Antwortoptionen. Auch `{a{…}}`-Dropdowns funktionieren nicht; nimm stattdessen `{S1{…}}` oder Radiobuttons.
:::

:::snippet{#merken}
**„Finde den Fehler“ funktioniert nicht in einem Editor mit Fehleranzeige.** Die Online-IDE markiert Syntaxfehler schon beim Tippen – eine Aufgabe, bei der Lernende genau diese Fehler suchen sollen, ist damit erledigt, bevor sie beginnt.

Zwei Wege führen daran vorbei:

1. Den fehlerhaften Quelltext als **normalen Code-Block** zeigen und auf Papier analysieren lassen. Erst danach kommt derselbe Code in einen `onlineide`-Block, wo die Vorhersage mit der Fehlerliste verglichen und repariert wird.
2. **Logikfehler** statt Syntaxfehler einbauen – falsche Grenzen, fehlende Sonderfälle, vertauschte Operatoren. Die findet kein Übersetzer, sondern nur ein Test oder ein Durchspielen von Hand.
:::

### Prüfen

Zu jedem Lernpfad mit ausführbarem Code gehören Prüfskripte. Sie alle startet ein einziger Aufruf:

```bash
python3 tools/pruefe-alles.py --schnell   # nur die statischen Prüfungen, dauert Sekunden
python3 tools/pruefe-alles.py             # zusätzlich Bauen und Browserprüfungen
```

Das Skript findet die Prüfungen selbst und startet den Dev-Server bei Bedarf. Ein Rückgabewert von **2** bedeutet: Alles Gelaufene war in Ordnung, aber etwas konnte nicht geprüft werden – meistens fehlt dann Playwright für die Browserprüfungen.

Was es genau wo prüft, wie man ein neues Werkzeug ergänzt und was einmalig einzurichten ist, steht in `tools/README.md`.

### Web-Lernpfad

Der Lernpfad [Webentwicklung](/mittelstufe/web) nutzt das `webide`-Element. Was es kann, steht in `tools/web-lernpfad/NOTIZEN.md`.

Zwei Regeln sind dort besonders wichtig:

- **Jeder Block braucht eine feste `id`.** Darunter wird die Arbeit der Lernenden gespeichert. Ändert sich die `id`, ist sie weg – also nie nachträglich anfassen.
- **JavaScript wird nicht verwendet.** Ein `js`-Fence läuft einmal gegen einen noch leeren `body` und wirft dabei einen Fehler; im Unterrichtsvorhaben ist JavaScript ohnehin nicht vorgesehen.

Geprüft wird mit `tools/web-lernpfad/check_lernpfad.py` und `pruefe_seiten.js` – beide startet `pruefe-alles.py` mit.

:::snippet{#merken}
**Bei HTML und CSS funktioniert „finde den Fehler" – anders als bei Java und SQL.**

Der Browser zeigt weder für fehlerhaftes HTML noch für ungültiges CSS eine Meldung an. Er repariert still und verwirft still. Die Rückmeldung ist deshalb die **falsche Darstellung**, nicht ein Text, der den Fehler schon benennt.

Solche Aufgaben brauchen dann aber zwei Dinge: eine **Vorhersage** vorher („Wie sollte es aussehen?") und einen Fehler, dessen Wirkung man **sieht** – ein vergessenes `</ul>` mitten in einer verschachtelten Liste taugt, ein fehlendes Semikolon in einer unsichtbaren Regel nicht.

Für die Qualitätssicherung gilt die Kehrseite: Was die Prüfwerkzeuge nicht finden, findet niemand. Deshalb prüft `check_lernpfad.py` die Wohlgeformtheit des HTML selbst nach, und `pruefe_seiten.js` testet jede CSS-Deklaration mit `CSS.supports`.
:::

### Datenbank-Lernpfad

Der Lernpfad [Datenbanken](/oberstufe/datenbanken) nutzt die [SQL-IDE](https://hyperbook.openpatch.org/elements/sql-ide) und arbeitet durchgehend mit einer erfundenen Festivaldatenbank.

Die vier SQLite-Dateien unter `public/datenbanken/` sind **erzeugt**, nicht von Hand gepflegt:

```bash
python3 tools/datenbank-lernpfad/erzeuge_datenbanken.py
```

Das Skript läuft mit festem Startwert und liefert byte-gleiche Dateien. Wer es ändert, muss anschließend alle Ergebniszahlen im Text neu prüfen. Dass die eingecheckten Datenbanken zum Skript passen, prüft `python3 tools/pruefe-alles.py --generatoren`.

Was die IDE kann und – wichtiger – was sie nicht kann, steht in `tools/datenbank-lernpfad/NOTIZEN.md`. Sie versteht unter anderem kein `IS NULL`, kein `CASE WHEN` und kein `EXISTS`; Anweisungen mit solchen Konstrukten werden gar nicht erst ausgeführt.

Geprüft wird mit `tools/datenbank-lernpfad/check_lernpfad.py` und `pruefe_sql.py`. Der erste prüft die Struktur der Seiten, die Selbsttests, die Passwörter und die `sqlide`-Blöcke. Der zweite führt **jede** SQL-Anweisung des Lernpfads gegen die echte Datenbank aus – damit fallen Tippfehler in Spaltennamen auf, bevor jemand die Seite öffnet. Beide startet `pruefe-alles.py` mit.

:::alert{info}
Nur ein ` ```sql `-Fence **mit Dateinamen** wird ausgeführt. Ein Fence ohne Dateinamen gilt als Schema mit Platzhaltern und wird übersprungen. Anweisungen, die scheitern sollen, bekommen den Kommentar `-- scheitert absichtlich`, Aufgabengerüste den Kommentar `-- UNGEPRUEFT`.
:::

### Java-Lernpfade

Die beiden Java-Lernpfade nutzen die [Online-IDE](https://hyperbook.openpatch.org/elements/online-ide) und für alles Grafische [Scratch for Java](https://scratch4j.openpatch.org).

Die Online-IDE ist eine Java-**ähnliche** Sprache, keine echte Java-Umgebung. Was dort geht und was nicht, steht in `tools/java-lernpfad/NOTIZEN.md` – zusammen mit der vollständigen Klassenbibliothek in `tools/java-lernpfad/api-online-ide.txt`.

Geprüft wird mit `tools/java-lernpfad/check_lernpfad.py` und `pruefe_seiten.js`. Der Validator prüft die Struktur der Seiten, die Syntax der Selbsttests, die Eindeutigkeit der Lösungspasswörter und die Wohlgeformtheit aller `onlineide`-Blöcke; das zweite Skript liest zusätzlich den Fehlerreiter der IDE auf jeder gebauten Seite aus. Beide startet `pruefe-alles.py` mit.
