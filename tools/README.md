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

**Wie lange das dauert** (gemessen, Größenordnung):

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

## Einmalige Einrichtung

Die statischen Prüfungen brauchen nur Python. Für die **Browserprüfungen**
werden `playwright-core` und ein Chromium gebraucht. Weil das Repository kein
`package.json` hat, liegt beides am einfachsten außerhalb:

```bash
mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
npx playwright install chromium
```

`pruefe-alles.py` findet das von selbst; es sucht der Reihe nach in
`$NODE_PATH`, in `/tmp/pw/node_modules` und in `node_modules/`. Fehlt es,
werden die Browserprüfungen mit einer Erklärung übersprungen (Rückgabewert 2).

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
