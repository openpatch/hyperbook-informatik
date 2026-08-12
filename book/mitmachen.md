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

Für die durchgehenden Lernpfade – etwa [Einführung mit Turtle-Grafiken](/mittelstufe/python/einfuehrung-mit-turtle) oder [Programmierung mit Java](/oberstufe/oop) – gilt ein festes Format. Wer daran weiterarbeitet, sollte es beibehalten:

- **Kapitel** sind Ordner `NN-slug/` mit einer `index.md`, die `name:` und `index: N` trägt.
- **Lektionen** sind Dateien `NN-slug.md` mit `title:` und `index: N`. Der Zahlenprefix im Dateinamen stimmt mit `index:` überein.
- **Tipps** sind gestuft und eingeklappt: `::::collapsible{title="Tipp 1: …"}`. Der erste Tipp gibt einen Denkanstoß, der letzte ein Codegerüst.
- **Lösungen** stehen in `:::protect{password="…" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}`. Die Passwörter sind global eindeutig; `python3 tools/passwoerter.py` listet sie mit Seite und Abschnitt auf.
- **Jede Lektion endet mit einem Selbsttest**: nach einem `---` folgt `## Selbsttest` und ein `::::multievent`-Block.
- **Jedes Kapitel endet mit einem Rückblick**: einer Seite `NN-rueckblick.md` mit einer Checkliste „Das kann ich jetzt", zwei bis drei **gemischten Aufgaben** über mehrere Lektionen hinweg und einem Selbsttest über das ganze Kapitel. Der Selbsttest einer Lektion prüft nur, was zwei Bildschirmseiten vorher stand – der Rückblick ist die Stelle, an der die Lernenden merken, ob es auch zusammen trägt. Projekt- und Referenzkapitel brauchen keinen.
- **Bezüge zum Kernlehrplan** stehen in HTML-Kommentaren, damit sie im Hyperbook nicht erscheinen.

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
