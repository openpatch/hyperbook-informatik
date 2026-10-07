# Werkzeuge

Hier liegen die Skripte, mit denen die Lernpfade geprüft und ihre erzeugten
Bestandteile hergestellt werden. Sie gehören nicht ins Buch – sie sorgen
dafür, dass im Buch nichts Falsches steht.

## Alles auf einmal prüfen

```bash
python3 tools/pruefe-alles.py
```

Das Skript **sucht** die Prüfungen, statt sie aufzuzählen. Wer ein neues
Werkzeug nach den Namenskonventionen weiter unten ablegt, muss es nicht
anfassen.

| Aufruf | Wirkung |
| --- | --- |
| `python3 tools/pruefe-alles.py` | alles: statische Prüfungen, Bauen, Browserprüfungen |
| `… --schnell` | nur die statischen Prüfungen – dauert Sekunden |
| `… --liste` | zeigt nur an, was liefe |
| `… --nur web` | nur Prüfungen, deren Pfad `web` enthält |
| `… --generatoren` | prüft zusätzlich, ob die Generatoren unveränderte Dateien liefern |
| `… --ausfuehrlich` | zeigt auch die Ausgabe bestandener Prüfungen |

**Rückgabewerte:**

| Wert | Bedeutung |
| --- | --- |
| 0 | alles gelaufen und bestanden |
| 1 | mindestens eine Prüfung ist fehlgeschlagen |
| 2 | alles Gelaufene war in Ordnung, aber etwas konnte nicht geprüft werden |

Der Wert **2** ist Absicht: „nicht geprüft" ist nicht dasselbe wie „in
Ordnung". Wer die Browserprüfungen überspringt, soll das nicht mit einem
grünen Haken verwechseln.

Den Dev-Server startet und beendet das Skript bei Bedarf selbst. Läuft schon
einer, benutzt es ihn und überspringt das separate Bauen.

**Bisherige Laufzeiten** (gemessen mit den früheren festen Browser-Wartezeiten):

| Teil | Dauer |
| --- | --- |
| statische Prüfungen ohne 3D-Druck | **unter 1 s** |
| 3D-Druck (übersetzt 88 OpenSCAD-Blöcke) | rund **15 s** |
| `npx hyperbook build` | rund **20 s** |
| Browserprüfung Web | rund **2 min** |
| Browserprüfung Datenbanken | rund **5 min** |
| Browserprüfung Java | rund **14 min** |

Ein vollständiger Lauf braucht also etwa **20 Minuten**, fast alles davon in den
Browserprüfungen: Sie laden jede gebaute Seite in einem echten Chromium und
warten, bis die eingebettete Entwicklungsumgebung fertig ist.

Für die tägliche Arbeit genügt deshalb `--schnell`. Wer nur an einem Pfad
gearbeitet hat, nimmt `--nur web` und ist in zwei Minuten durch. Der
vollständige Lauf lohnt sich, bevor man einen größeren Stand abgibt.

## Permaids prüfen

```bash
python3 tools/check_permaids.py
```

Prüft die kurzen Adressen hinter den QR-Codes: dass jede Sektion und jede Lektion eine hat, dass sie buchweit eindeutig sind, keine Stellenangabe enthalten und zum Bereich passen, in dem die Seite liegt. Das Schema steht in [Mitmachen](/mitmachen#permaids).

## Passwörter nachschlagen

Die Lösungen in den Lernpfaden stecken in passwortgeschützten Blöcken. Wer
unterrichtet, braucht eine Liste – und zwar eine, die sagt, **wozu** ein
Passwort gehört:

```bash
python3 tools/passwoerter.py                    # Übersicht im Terminal
python3 tools/passwoerter.py --nur web          # nur Seiten, deren Pfad "web" enthält
python3 tools/passwoerter.py --markdown > /tmp/passwoerter.md
```

Ausgegeben wird nach Lernpfad und Seite gruppiert, zu jedem Passwort die
Überschrift des Abschnitts, in dem der Block sitzt. Doppelt vergebene
Passwörter meldet das Skript und gibt dann 1 zurück – das ist der einzige Fall,
in dem es sich beschwert. Die Prüfskripte der Lernpfade achten nur *innerhalb*
eines Pfades auf Eindeutigkeit; über alle Pfade hinweg schaut nur dieses Skript.

Es heißt bewusst nicht `check_…` oder `pruefe_…`: `pruefe-alles.py` soll es
nicht mitlaufen lassen, denn es ist ein Bericht und keine Prüfung. Die
erzeugte Datei gehört **nicht** ins Buch und nicht ins Repository.

## Reihenfolge im Buch prüfen

```bash
python3 tools/check_reihenfolge.py
```

Seit Hyperbook 0.101 werden **Seiten und Sektionen gemeinsam** nach ihrem
`index:` sortiert. Vorher hatten sie getrennte Reihenfolgen – eine
Übersichtsseite mit `index: 0` und ein Kapitel mit `index: 0` konnten also
nebeneinander bestehen. Heute konkurrieren sie, und Übersichtsseiten landen
plötzlich hinter den Kapiteln.

Das Skript meldet zwei Fälle: **doppelt vergebene Indexe** innerhalb eines
Ordners und Ordner, in denen **manche** Einträge einen Index haben und andere
nicht – Letztere rutschen ans Ende, auch wenn der Dateiname (`00-einleitung.md`)
etwas anderes nahelegt. Ordner ganz ohne Indexe sind in Ordnung; dort gilt die
alphabetische Reihenfolge als bewusste Entscheidung.

## Die Passwortseite im Buch

Anders als die Übersicht oben richtet sich die Seite [Lösungspasswörter](../book/loesungen.md)
an **Lernende**: Wer zu Hause eine Aufgabe bearbeitet hat, soll seine Lösung
vergleichen können, ohne bis zur nächsten Stunde zu warten.

Die Seite verwendet die eingebaute [Passwordlist-Direktive](https://hyperbook.openpatch.org/elements/passwordlist)
von Hyperbook ab Version 0.108.0:

```md
::passwordlist{type="block" orderBy="navigation" groupBy="top-section,page" collapsible showCount columns="context,password"}
```

Hyperbook erzeugt die Liste bei jedem Build aus den aktuellen `protect`-Blöcken.
Sie folgt der Navigation und gruppiert die Einträge nach oberstem Abschnitt und Seite.
Ein separates Generatorskript ist nicht nötig.

Neben jedem Passwort steht, zu welchem Block es gehört: das `name`-Attribut
des Blocks, die vorausgehende Aufgabenüberschrift oder die Abschnittsüberschrift.
Bei ungewöhnlichen Seitenstrukturen kann der `protect`-Block mit `name="…"`
eine ausdrückliche Bezeichnung erhalten.

## Einmalige Einrichtung

Die Prüfungen brauchen Python 3.12+, Node.js 22+ und für die
Spielwerkstatt-Archive ein JDK 25 (`javac` im PATH). Hyperbook und
`playwright-core` sind im `package.json` festgelegt; das Lockfile fixiert auch
deren Abhängigkeiten.

```bash
npm ci
npm run browser:install
npm run check:java          # Java-Lernpfad, Desktop-Archive, Seitensuche
npm run check:static        # alle statischen Prüfungen, Rückgabewert 0 bei Erfolg
npm run build              # mit der festgelegten Hyperbook-Version
npm run check:java:browser -- --serve # temporärer Server für den fertigen Build
npm run dev                # vor den Browserprüfungen
npm run check:java:browser  # in einem zweiten Terminal
```

Auf Linux-CI kann der Browser mit `npx playwright-core install --with-deps chromium`
eingerichtet werden. `HYPERBOOK_URL` setzt die Serveradresse (Standard:
`http://localhost:8080`); `CHROMIUM_PATH` wählt eine vorhandene Chromium-Datei.

Die Java-Browserprüfung durchsucht **alle** gebauten HTML-Seiten nach
`java-online`-Blöcken. Spielwerkstatt und neue Projekte werden automatisch
mitgeprüft. Sie wartet auf Compiler-Ergebniszeilen statt feste Pausen und
liest Fehlermarkierungen unabhängig von der Oberflächensprache. Fehlende
Compiler-Ergebnisse sind ein Fehler. Interne Hyperbook-HTML-Vorlagen unter `__hyperbook_assets`
sind keine Unterrichtsseiten und werden ausgelassen. Die Auswahl lässt sich ohne Browser prüfen:

```bash
node tools/java-lernpfad/pruefe_seiten.js --liste
node tools/java-lernpfad/pruefe_seiten.test.js
```

`pruefe-alles.py` sucht in `$NODE_PATH`, dann in `node_modules/` und zuletzt
in `/tmp/pw/node_modules` für ältere Installationen. Fehlt Playwright, werden
die Browserprüfungen mit einer Erklärung übersprungen (Rückgabewert 2).
`--schnell` liefert ebenfalls 2, wenn nur Browser/Build bewusst übersprungen
wurden; `npm run check:java` ist der vollständige Java-Check ohne Browser.

Pages-Publishing verlangt `npm run check:static`, einen frischen Build und
`npm run check:java:browser -- --serve`. Der temporäre Server wird nach der
Prüfung geschlossen. Der Build entfernt vorher `.hyperbook/out`, damit gelöschte
Seiten nicht weiter geprüft oder veröffentlicht werden.

Für die Übersetzung der 3D-Beispiele braucht man OpenSCAD 2021.01+ und BOSL2
im Bibliothekspfad (`OPENSCADPATH`). CI installiert OpenSCAD und verwendet
BOSL2-Revision `b9c5dd7618f13bbbe24fbf51d1f46027ea773053`. Lokal meldet der
3D-Checker ausdrücklich, wenn OpenSCAD fehlt und nur statisch geprüft wurde.
SQL- und Web-Browserprüfungen sind weiterhin Teil von `npm run check`,
aber noch kein Pages-Publishing-Gate.

## Was es gibt

| Ordner | Wofür |
| --- | --- |
| `java-lernpfad/` | [Programmierung mit Java](../book/oberstufe/oop), Online-IDE |
| `datenbank-lernpfad/` | [Datenbanken](../book/oberstufe/datenbanken), SQL-IDE |
| `web-lernpfad/` | [Webentwicklung](../book/mittelstufe/web), WebIDE |
| `turtle-render/` | [Einführung mit Turtle-Grafiken](../book/mittelstufe/python/einfuehrung-mit-turtle), pyide |
| `3d-druck/` | [3D-Druck](../book/mittelstufe/3d-druck), openscad |

In jedem Ordner mit einer eingebetteten Entwicklungsumgebung liegt eine
**`NOTIZEN.md`**. Sie hält fest, was das jeweilige Werkzeug kann und – viel
wichtiger – was es **nicht** kann. Das ist jedes Mal ausprobiert und nicht aus
einer Dokumentation abgeschrieben; ohne diese Notizen entstehen Lektionen mit
Code, der nicht läuft.

**Wer an einem Lernpfad arbeitet, liest zuerst dessen `NOTIZEN.md`.**

### java-lernpfad

| Datei | Zweck |
| --- | --- |
| `NOTIZEN.md` | was die Online-IDE kann; Hausstil `void main()` und `IO.println` |
| `api-online-ide.txt` | die vollständige Klassenbibliothek der Online-IDE, aus dem gebauten JavaScript extrahiert |
| `extract_api.js` | erzeugt diese Datei neu, wenn die IDE aktualisiert wird |
| `check_lernpfad.py` | Aufbau der Seiten, Selbsttests, **Kapitelabschlüsse**, Passwörter, `onlineide`-Blöcke, nicht unterstützte Java-Konstrukte |
| `pruefe_seiten.js` | lädt jede Seite und liest den Fehlerreiter der IDE aus |
| `pruefe_seite.js` | dieselbe Prüfung für **eine** offene Seite, zum Einfügen in die Browserkonsole |
| `starte_tests.js` | startet den **Testrunner** einer Seite und zeigt, welche Tests grün werden – zum Prüfen von Musterlösungen und Vorhersagen |

### datenbank-lernpfad

| Datei | Zweck |
| --- | --- |
| `NOTIZEN.md` | was die SQL-IDE kann; die Liste der Konstrukte, die sie ablehnt |
| `erzeuge_datenbanken.py` | erzeugt die vier SQLite-Dateien in `public/datenbanken/` |
| `check_lernpfad.py` | Aufbau der Seiten, Selbsttests, **Kapitelabschlüsse**, Passwörter, `sqlide`-Blöcke, verbotene SQL-Konstrukte |
| `pruefe_sql.py` | führt **jede** SQL-Anweisung des Lernpfads gegen die echte Datenbank aus |
| `pruefe_seiten.js` | liest den Fehlerreiter der SQL-IDE aus – findet, was nur deren Übersetzer bemängelt |

### web-lernpfad

| Datei | Zweck |
| --- | --- |
| `NOTIZEN.md` | was das `webide`-Element kann; warum kein JavaScript verwendet wird |
| `check_lernpfad.py` | Aufbau der Seiten, Selbsttests, **Kapitelabschlüsse**, Passwörter, `webide`-Blöcke, **Wohlgeformtheit des HTML**, Klammern im CSS |
| `pruefe_seiten.js` | im Browser: Bilder, die nicht laden; CSS-Deklarationen, die verworfen werden (`CSS.supports`) |

Die Aufteilung hat hier einen besonderen Grund: Der Browser meldet **nichts**.
Fehlerhaftes HTML repariert er still, ungültiges CSS verwirft er wortlos. Die
Wohlgeformtheit muss deshalb statisch geprüft werden, die Gültigkeit des CSS
dagegen nur im Browser – nur er weiß, welche Eigenschaften es gibt.

### 3d-druck

| Datei | Zweck |
| --- | --- |
| `NOTIZEN.md` | was das `openscad`-Element kann; die verifizierten Eigenheiten von OpenSCAD |
| `check_lernpfad.py` | Aufbau der Seiten, Selbsttests, Kapitelabschlüsse, Passwörter, `openscad`-Blöcke – **und die tatsächliche Übersetzung jedes Blocks** |

Dieser Lernpfad braucht **keine** Browserprüfung: OpenSCAD gibt es als
Kommandozeilenprogramm, deshalb übersetzt `check_lernpfad.py` jeden Block
direkt. Das findet unbekannte Module (`Cube` statt `cube`), fehlende Semikola
und falsch benutzte Bibliotheksfunktionen in Sekunden statt in Minuten. Für
BOSL2-Blöcke muss `OPENSCADPATH` auf die Bibliotheken zeigen.

### tabellenkalkulation

| Datei | Zweck |
| --- | --- |
| `check_lernpfad.py` | Links, Passwörter, Selbsttests, Kapitelabschlüsse, Formeln in den ODS-Dateien – und ob jeder Rückblick seine Übung einbindet |
| `erzeuge_loesungsdateien.py` | erzeugt die Calc-Lösungsdateien und die Beispieldatei |
| `erzeuge_screenshot_vorlagen.py` | baut die Calc-Dokumente für die Screenshots (deutsche Zahlenformate) und speichert sie in `/tmp/calc-lernpfad` |
| `screenshots.py` | nimmt die vier `calc-*.png` des Lernpfads auf – mit deutscher Oberfläche, Dezimalkomma und hellem Theme; LibreOffice läuft dafür mit frischem Profil in Xvfb |
| `erzeuge_uebungen.py` | erzeugt je Kapitel die interaktive Übung `uebung.bitflow`, die der Rückblick einbindet |

Die Screenshots entstehen nicht von Hand: `screenshots.py` braucht das deutsche
Sprachpaket von LibreOffice (etwa `libreoffice-still-de`), `Xvfb`, ImageMagick und
`xdotool`. Es trägt bewusst keinen `erzeuge_`-Namen – `pruefe-alles.py` soll es
nicht ausführen, denn es braucht einen X-Server und liefert nie bitgleiche Bilder.

Die Übungen sind [bitflow](https://bitflow.openpatch.org/llms.txt)-Dateien. Geändert
werden sie im Generator, nicht im JSON. Ob eine Datei gültig ist, prüft
`validateFlow` aus `@bitflow/core` – aber nur, wenn die Bits dort registriert
sind. `loadAllBits()` aus `@bitflow/web-component` registriert sie in der
**eigenen, mitgebündelten** Kopie von core, nicht in `@bitflow/core`; die
Bit-Module müssen deshalb über `bitLoaders` geladen und mit `registerBit` an
core übergeben werden. Sonst meldet `validateFlow` jede Hilfeschleife als
Fehler („… is not a task“).

### turtle-render

| Datei | Zweck |
| --- | --- |
| `pyide_turtle.py` | Offline-Nachbau der Turtle-API des `pyide`-Elements |
| `render_bilder.py` | rendert die Referenzbilder des Lernpfads – jede Szene entspricht genau einer Musterlösung |
| `check_lernpfad.py` | Aufbau der Seiten, Passwörter, Turtle-Befehle, die es im `pyide` nicht gibt |

## Ein neues Werkzeug hinzufügen

`pruefe-alles.py` erkennt Dateien allein an ihrem Namen. Es genügt, sich daran
zu halten:

| Name | Art | Wird ausgeführt |
| --- | --- | --- |
| `check_*.py` | statische Prüfung | immer |
| `pruefe_*.py` | statische Prüfung | immer |
| `pruefe_seiten.js` | Browserprüfung | wenn Dev-Server und Playwright da sind |
| `erzeuge_*.py`, `render_*.py` | Generator | nur mit `--generatoren` |
| alles andere | Bibliothek, Notiz, Einmalskript | nie |

`starte_tests.js` fällt bewusst in die letzte Zeile: Es startet den Testrunner
einer Seite und ist beim **Schreiben** einer Lektion nützlich – die
Aufgabengerüste im Buch sind ja absichtlich rot. Wer eine Musterlösung oder eine
Vorhersage prüfen will, legt beides vorübergehend in eine Seite unter
`book/_probe/` und lässt das Skript darauf los.

Gesucht wird in `tools/` **und** in jedem Unterordner: pfadweite Werkzeuge
liegen in einem Unterordner, buchweite (etwa die Passwortübersicht) direkt in
`tools/`.

Damit das zusammenpasst, sollte jedes neue Werkzeug:

1. **aus dem Wurzelverzeichnis aufrufbar sein** und seine Pfade selbst über
   `pathlib.Path(__file__).resolve().parents[2]` bestimmen – nicht über das
   aktuelle Arbeitsverzeichnis;
2. **0 zurückgeben, wenn alles in Ordnung ist**, und einen Wert ungleich 0 sonst;
3. **jede Beanstandung mit Datei und Zeile** ausgeben, damit man sie findet;
4. bei Erfolg **kurz** bleiben – ein paar Zeilen Zusammenfassung genügen.

Für `pruefe_seiten.js` gilt zusätzlich: Es liest die Adresse aus
`HYPERBOOK_URL` (Voreinstellung `http://localhost:8080`) und findet Chromium
selbst im Playwright-Cache.

**Generatoren** sollten bei gleichem Eingang byte-gleiche Dateien liefern – bei
Zufallswerten also mit festem Startwert arbeiten. Nur dann ist die Prüfung mit
`--generatoren` aussagekräftig: Sie lässt den Generator laufen und meldet, wenn
sich danach etwas im Arbeitsverzeichnis geändert hat. Das heißt dann, dass das
eingecheckte Ergebnis veraltet ist.

## Konventionen der Lernpfade

Die Regeln für den Aufbau der Seiten – Kapitelordner, gestufte Tipps,
passwortgeschützte Lösungen, Selbsttests, Lehrplanbezüge in Kommentaren –
stehen im Buch selbst unter [Mitmachen](../book/mitmachen.md). Dort steht auch,
warum in `multievent`-Blöcken kein Inline-Code stehen darf und wann Aufgaben
vom Typ „finde den Fehler" funktionieren und wann nicht.


### Portable Spielwerkstatt checks

`check_desktop.py` compiles every Java file, including browser-format test
classes, and runs the four Punkteregel tests through pinned JUnit console 1.11.4.
The adapter changes temporary copies; student files remain unchanged. The JUnit
artifact is cached and its SHA-256 checked. `SCRATCH_JUNIT_JAR` may point at the
same pinned artifact for offline validation.

```sh
python3 tools/spielwerkstatt/sync_teaching_tests.py --online-ide /path/to/online-ide --check
```

This checks the unchanged browser teaching-test snapshots. Without `--check`, it
refreshes them. Browser interpreter tests execute the same four checks and verify
that an incorrect score fails. Publishing requires snapshot freshness and these
browser tests as well as desktop/static and full embedded lesson compilation.
