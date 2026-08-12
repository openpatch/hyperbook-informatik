# Das `openscad`-Element und der 3D-Druck-Lernpfad

## Werkzeuge in diesem Ordner

| Datei | Zweck |
| --- | --- |
| `check_lernpfad.py` | statische Prüfung **und** echte Übersetzung jedes `scad`-Blocks. `python3 tools/3d-druck/check_lernpfad.py` |

Anders als bei den anderen Lernpfaden braucht es hier **keine** Browserprüfung:
OpenSCAD gibt es als Kommandozeilenprogramm, und damit lässt sich jeder Block
lokal übersetzen. Das ist schneller und findet mehr.

```bash
python3 tools/3d-druck/check_lernpfad.py                 # mit Übersetzung
python3 tools/3d-druck/check_lernpfad.py --ohne-openscad # nur die Struktur
```

Ohne installiertes `openscad` überspringt das Skript die Übersetzung und sagt
das in seiner Ausgabe. Für BOSL2-Blöcke muss die Bibliothek im Suchpfad liegen:

```bash
OPENSCADPATH=/usr/share/openscad/libraries python3 tools/3d-druck/check_lernpfad.py
```

## Die Direktive

```md
:::openscad{height="500px" library="BOSL2"}

```scad
include <BOSL2/std.scad>
cuboid([30, 20, 10], rounding=3);
```

:::
```

| Attribut | Bedeutung |
| --- | --- |
| `height` | Höhe des Blocks. **Immer setzen** – ohne Angabe wird der Block fast bildschirmfüllend. Der Validator besteht darauf. |
| `library` | lädt eine Bibliothek. Bekannt ist `BOSL2`. Die `include`-Zeile im Quelltext braucht es **zusätzlich**. |

Die Sprache des Code-Fences ist `scad`. Ein Block enthält genau eine Datei.

## Verifizierte Eigenheiten von OpenSCAD

Alles hier Aufgeführte ist mit dem lokalen `openscad` ausprobiert, nicht
vermutet.

**Groß- und Kleinschreibung zählt – und ein Vertipper bleibt still.**
`Cube(30);` und `CUBE(30);` erzeugen **kein** Objekt. Es gibt keine
Fehlermeldung im Editor, nur eine Warnung in der Konsole:

```
WARNING: Ignoring unknown module 'Cube'
```

Die Vorschau bleibt einfach leer. Das ist die häufigste Ursache für „bei mir
passiert nichts" und der Grund, warum `check_lernpfad.py` genau diese Warnung
als Fehler wertet.

**Ein bündig abschließender Schnitt ist unsichtbar.** Ein Zylinder, der genauso
hoch ist wie der Körper, aus dem er ein Loch bohren soll, liegt oben und unten
flächengleich auf – das Loch erscheint in der Vorschau **gar nicht**. Deshalb
ragen abziehende Körper immer über:

```scad
translate([10, 10, -1]) cylinder(h=12, r=3);   // statt h=10 ab z=0
```

**Bereiche schließen beide Grenzen ein.** `for (i = [0:3])` läuft **vier**mal
(0, 1, 2, 3) – anders als `range(3)` in Python. Vier Spalten schreibt man
deshalb als `[0 : spalten - 1]`.

**`skin()` aus BOSL2 verlangt `slices`.** Ohne die Angabe bricht die Bibliothek
mit `Assertion 'is_def(slices)' failed` ab und es entsteht gar nichts:

```scad
skin([...], z=[0, 10, 20], slices=0);
```

## Aufbau des Lernpfads

Zehn Kapitel, davon acht mit Inhalt und je einem Rückblick, dazu Projekt und
Referenz:

```
01-erste-schritte            3D-Druck, CAD, erste Modelle, Syntaxregeln
02-koerper-und-koordinaten   Achsen, Grundkörper, $fn
03-transformationen          translate/rotate/scale, union/difference/intersection
04-parameter-und-wiederholung Variablen, Schleifen, Module
05-gestalten                 Farbe, Text, Bilder
06-bibliotheken              BOSL2
07-slicing                   vom Modell zum G-Code
08-drucken                   FDM-Drucker, G-Code lesen
09-projekt                   Übungen und Abschlussprojekt
10-referenz                  Spickzettel, häufige Fehler
```

Die Reihenfolge ist bewusst so gewählt, dass die **Booleschen Operationen vor
den Parametern** kommen: Erst muss man eine Form bauen können, dann lohnt es
sich, sie parametrisch zu machen.

## Was noch fehlt

Die **Aufgaben in den Lektionen** haben überwiegend noch keine
passwortgeschützten Lösungen und keine gestuften Tipps – anders als in den
übrigen Lernpfaden. Vorhanden sind sie bislang nur in den acht Rückblicken
(Passwortschema `druck-<kapitel>-<lektion>-<nr>`). Viele Lektionsaufgaben sind
allerdings reine Experimentieraufträge („ändere die 30 in 50"), für die eine
Musterlösung wenig Sinn ergibt; nötig wären sie vor allem in
`02-koerper-und-koordinaten/03-uebungen.md` und `09-projekt/01-uebungen.md`,
wo es Zielbilder gibt.
