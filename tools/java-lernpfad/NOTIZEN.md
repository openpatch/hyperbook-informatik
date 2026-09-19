# Online-IDE: was geht, was nicht

## Werkzeuge in diesem Ordner

| Datei | Zweck |
| --- | --- |
| `check_lernpfad.py` | statische Pruefung beider Java-Lernpfade. `python3 tools/java-lernpfad/check_lernpfad.py` |
| `pruefe_seiten.js` | faehrt jede gebaute Seite in einem echten Browser an und meldet Uebersetzungsfehler der Online-IDE. Braucht einen laufenden `npx hyperbook dev` |
| `pruefe_seite.js` | dasselbe fuer die gerade geoeffnete Seite, zum Einfuegen in die Browserkonsole |
| `extract_api.js` | zieht die vollstaendige Klassenbibliothek der Online-IDE aus dem gebauten Bundle |
| `api-online-ide.txt` | das Ergebnis davon, als Nachschlagewerk beim Schreiben von Aufgaben |

Beim Schreiben neuer Lektionen gilt: erst `check_lernpfad.py`, dann
`pruefe_seiten.js` auf die neuen Seiten. Der Validator findet strukturelle
Fehler, der Browserlauf findet Java-Fehler.


Ergebnisse des Spikes vom 30.07.2026, im Browser gegen `npx hyperbook dev`
(Hyperbook 0.100.6) verifiziert. Die vollstaendige Klassenbibliothek steht in
`api-online-ide.txt`; erzeugt mit `node tools/java-lernpfad/extract_api.js`
(liest die Signaturen aus `.hyperbook/out/__hyperbook_assets/directive-onlineide/
include/online-ide-embedded.js`, nachdem einmal gebaut wurde).

Die Online-IDE ist **nicht** das echte Java, sondern die Java-aehnliche Sprache von
online-ide.de. Vieles aus dem Schul-Java fehlt oder heisst anders. Alles hier
Aufgefuehrte ist ausprobiert, nicht vermutet.

## Direktive

```
:::onlineide{libraries="scratch" height="500px" speed="1000000"}
```java Buehne.java
...
```
:::
```

Attribute: `fileList`, `pCode`, `bottomPanel`, `errorList`, `height`, `speed`,
`libraries`. `libraries` kennt `nrw`, `gng`, `niedersachsen`, `scratch`
(kommasepariert). `url=` und `id=` aus den alten Seiten sind nicht dokumentiert
und werden nicht mehr verwendet.

## Hausstil: Java-25-Stil

Verifiziert. Wir schreiben das Hauptprogramm durchgaengig so:

```java Main.java
void main() {
    IO.println("Hallo");
    String name = IO.readln("Wie heisst du? ");
    IO.println("Hallo " + name);
}

int verdopple(int pZahl) {
    return pZahl * 2;
}
```

- `void main()` **ohne** umgebende Klasse und ohne `static` — die kompakte
  Quelldatei aus Java 25. Laeuft in der Online-IDE.
- Hilfsmethoden stehen daneben, ebenfalls **ohne `static`**.
- `IO.println(...)` fuer Ausgaben, `IO.readln("Frage")` fuer Eingaben.
  `IO.readln` schreibt die Frage in die Ausgabe und blendet dort direkt ein
  Eingabefeld ein — kein Modal-Dialog. Rueckgabe ist ein `String`, Zahlen
  daraus mit `Integer.parseInt` / `Double.parseDouble`.
- `System.out.println` und `public static void main(String[] args)` funktionieren
  ebenfalls und werden in Kapitel 1 und in der Referenz als die aeltere
  Schreibweise erwaehnt, die in Buechern und im Netz vorkommt. Im Lernpfad selbst
  verwenden wir sie nicht, um nicht zwei Stile zu mischen.

## Geht

- **Anweisungen auf oberster Ebene** in einer Datei sind ebenfalls ein
  Hauptprogramm (ohne `main`). Wir nutzen das nicht, aber alte Seiten tun es.
  Steht das Hauptprogramm in `Main.java`, muss zum Starten der kleine Pfeil
  **neben `Main.java` in der Dateiliste** geklickt werden, nicht der Pfeil in der
  Werkzeugleiste — der startet die gerade geoeffnete Datei. Deshalb: das
  Hauptprogramm moeglichst in die **erste** Datei des Blocks legen.
- Klassen, Konstruktoren, `extends`, `abstract`, `interface`, `implements`,
  Generics (`class Behaelter<T>`), Objekt-Arrays, Polymorphie.
- Rekursion, getestet bis Tiefe 2000.
- Ein- und mehrdimensionale Felder, Array-Literale (`int[] a = {5, 2, 4};`).
- `String`: `length`, `substring`, `charAt`, `equals`, `compareTo`, `indexOf`, `+`.
- `Math` (siehe unten), `Integer`, `Double`, `Boolean`, `Character`, `Random`,
  `ArrayList`, `HashMap`, `HashSet`, `LinkedList`, `Stack`, `Vector`, `Optional`,
  `BigInteger`, `Thread`, `Runnable`, `Semaphore` (fuer Nebenlaeufigkeit im LK).
- `System.out.println`, `System.nanoTime()`, `System.currentTimeMillis()`.
- `SystemTools.pause(millis)`, `SystemTools.setSpeed(...)`, `SystemTools.clearScreen()`.

## Geht nicht / heisst anders

| Schul-Java | Online-IDE |
| --- | --- |
| `Scanner sc = new Scanner(System.in)` | **gibt es nicht.** `IO.readln("Frage")` (Hausstil) oder `Input.readInt("Frage")` / `Input.readString` / `Input.readDouble` (Modal-Dialog) |
| `static` bei Methoden auf oberster Ebene | **Fehler.** Methoden neben dem Hauptprogramm ohne `static` schreiben: `int fak(int n) { ... }` |
| `Arrays.sort`, `Arrays.equals`, `Arrays.toString` | **gibt es nicht.** `Arrays` kennt nur `asList`. Selbst schreiben — passt didaktisch ohnehin besser |
| `Integer.toBinaryString` / `toHexString` | `Integer.toBinary(n)` / `Integer.toHex(n)` |
| `Math.round` liefert `long` | liefert **`int`** (ebenso `floor`, `ceil`, `signum`) |
| `import ...` | nicht noetig und nicht moeglich — es gibt keine Pakete |

## Kommazahlen werden ohne `.0` ausgegeben

Verifiziert am 10.09.2026 ueber den Testrunner (`book/_probe/zahlen.md`):

| Ausdruck | Online-IDE | echtes Java |
| --- | --- | --- |
| `"" + 25.0` | `25` | `25.0` |
| `"" + 2.5` | `2.5` | `2.5` |
| `"" + (1.0/3.0)` | `0.3333333333333333` | `0.3333333333333333` |

Eine `double`-Variable mit ganzzahligem Wert wird also wie ein `int` geschrieben.
Zwei Folgen fuer die Lernpfade:

1. **Kein `assertEquals` auf eine Zeichenkette, in der eine Kommazahl steckt.**
   `assertEquals("Grace: 5000.0 Euro", m.infozeile())` ist in der Online-IDE
   **rot**, obwohl die Loesung stimmt. Solche Zusammenhaenge stattdessen
   numerisch pruefen (`assertEquals(60000.0, m.jahresgehalt(), ...)`).
2. **Keine Vorhersageaufgabe, in der eine Kommazahl ausgegeben wird.** Wer auf
   Papier richtig `100.0` notiert, sieht auf dem Schirm `100` und haelt sich
   fuer widerlegt. Vorhersagen deshalb auf `int`, `boolean` und `String`
   stuetzen - oder die Abweichung auf der Seite als `:::alert{info}` nennen.

Der Zahlenvergleich selbst stimmt: `assertEquals(25.0, 5.0 * 5.0, ...)` ist gruen.

## @Override und Schnittstellenkonstanten

Verifiziert am 10.09.2026 (`book/_probe/statik.md`, `book/_probe/final.md`):

- `@Override` uebersetzt, erzeugt aber bei der Umsetzung einer
  **Schnittstellenmethode** eine Warnung ("ueberschreibt keine Methode mit
  gleicher Signatur einer Oberklasse"). Im Lernpfad deshalb **nicht** verwenden.
- Ein Attribut in einer Schnittstelle braucht ausdruecklich
  `public static final`; ohne die Schluesselwoerter kommt "Interfaces koennen
  nur statische konstante (final) Attribute besitzen".
- Die Konstante muss in der implementierenden Klasse **qualifiziert** angesprochen
  werden (`Speicherbar.TRENNER`). Der unqualifizierte Name ist dort nicht
  definiert - anders als in echtem Java.

## static innerhalb einer Klasse

Verifiziert am 10.09.2026 (`book/_probe/statik.md`, `book/_probe/semantik.md`,
`book/_probe/final.md`): Klassenattribute (auch veraenderliche), Klassenmethoden
und der Aufruf ueber den Klassennamen (`Rechteck.getAnzahl()`) funktionieren.
Nur **auf oberster Ebene**, also neben `void main()`, ist `static` ein Fehler.

Zwei Fallstricke:

- **`protected static` von aussen zu lesen bricht ab** - `Vorrat.erzeugt` mit
  `protected static int erzeugt` liefert "Interner Fehler: TypeError: t.run is
  not a function". Also `private static` plus eine `public static`-Zugriffsmethode.
- **`protected` laesst sich aus einer Testklasse nicht aufrufen.** Die Online-IDE
  kennt keine Pakete; eine Aufgabe mit einer `protected`-Methode braucht deshalb
  eine oeffentliche Methode, die sie von innen benutzt.
- `public static final int[] FELD = {1, 2, 3};` geht, und **der Inhalt bleibt
  aenderbar** - `final` haelt nur den Verweis fest.

Ebenfalls verifiziert und mit echtem Java uebereinstimmend:

- Ruft ein Konstruktor der Oberklasse eine ueberschriebene Methode auf, sieht
  diese die Attribute der Unterklasse noch **uninitialisiert** (`0`).
- **Ueberladen** wird statisch gebunden: Welche der gleichnamigen Methoden
  genommen wird, entscheidet der **deklarierte** Typ des Arguments.
- `instanceof`, Typumwandlung nach unten und ein eigenes `toString()`
  funktionieren; `toString()` wird bei der Verkettung mit `+` benutzt.

## Generik

Verifiziert: `class Behaelter<T>` mit `private T[] inhalt;` und
`inhalt = new T[pMax];` funktioniert. In echtem Java geht das **nicht** -
dort behilft man sich mit `Object[]` und einem Cast beim Herausgeben.

Umgekehrt geht der Java-Weg hier **nicht**: `(T) objektFeld[i]` scheitert mit
"Casten von Object nach T ist nicht moeglich". Also immer `T[]` verwenden und
die Abweichung zum echten Java auf der Seite als `:::alert{info}` erwaehnen.

Verkettete generische Knoten (`class Knoten<T>` mit `Knoten<T> naechster`)
funktionieren ebenfalls - das ist der Weg fuer die dynamischen Datenstrukturen.

## Tests: JUnit ist eingebaut

Eine Datei mit `@Test` erzeugt im Reiter **Testrunner** startbare Tests.
Verifiziert: 2 von 2 Tests gruen.

```java RechnerTest.java
@Test
class RechnerTest {
    @Test
    void testMaximum() {
        Rechner r = new Rechner();
        int[] werte = {40, 60, 20, 100, 80};
        assertEquals(100, r.maximum(werte), "Das Maximum von {40,60,20,100,80} ist 100.");
    }
}
```

Regeln: Testmethoden sind parameterlos und `void`; die Klasse zusaetzlich mit
`@Test` annotieren, damit alle Tests der Klasse gemeinsam startbar sind.
`assertEquals(erwartet, tatsaechlich, meldung)` ist ohne Qualifizierung verfuegbar,
ebenso `assertTrue`, `assertFalse`, `fail`, `assertCodeReached`.

Das ersetzt die im Plan angedachten selbstgebauten `Test.java`-Dateien mit
`if`/`else`. Die dritte Meldung ist der didaktisch wertvolle Teil — dort steht,
was erwartet wurde.

## Geschwindigkeit

Der Standardwert `speed=1000` ist fuer Schleifen unbrauchbar (gemessen ~32
Schritte/s bei einem kleinen Programm). Mit `speed="1000000"` liefen 200 000
Schleifendurchlaeufe in **558 ms** (642 620 Schritte/s).

**Regel: jeder Block mit Schleifen ueber mehr als ein paar Dutzend Durchlaeufe
bekommt `speed="1000000"`.** Nur wo man dem Programm beim Laufen zusehen soll
(Animation, Schritt-fuer-Schritt-Visualisierung), bleibt der Standard oder ein
Zwischenwert.

## Scratch for Java (`libraries="scratch"`)

Verifiziert: Sprite mit Kostuem, `Text`, `Pen` und eine eigene `Sprite`-Unterklasse
mit `run()` und `isKeyPressed(KeyCode.RIGHT)`.

- **Buehne 480 x 360**, Ursprung in der **Mitte**, x nach rechts, y **nach oben**.
  Sichtbarer Bereich also x von -240 bis 240, y von -180 bis 180.
- Keine `import`-Zeilen, keine Pakete — `Stage`, `Sprite`, `Pen`, `Text`, `Color`,
  `Vector2`, `KeyCode`, `MouseCode`, `Timer`, `AnimatedSprite`, `UISprite`,
  `Camera`, `Clock` sind sofort da.
- Startmuster: eine Klasse `... extends Stage`, dazu ein Hauptprogramm
  `new MeineBuehne();`.
- **1734 eingebaute Kostueme** aus fuenf Sammlungen (`jumper` 117,
  `platformer` 351, `space_shooter` 294, `spritesheet` 893, `tappy_plane` 79),
  z. B. `bunny1_stand`, `boxCrate`, `buttonBlue`. Ein Kostuem `square` gibt es
  **nicht** — fuer Balkendiagramme entweder `Pen` oder `boxCrate` mit `setSize`.

### Der `Pen` ist keine Turtle

`Pen` kennt **kein** `move` und **kein** `turnRight`. Gezeichnet wird ueber
Positionswechsel bei gesenktem Stift:

```java
Pen p = new Pen();
this.add(p);
p.setColor(0, 200, 0);
p.setSize(3);
p.setPosition(20, 20);
p.down();
p.setPosition(120, 20);
p.setPosition(120, 120);
p.up();
```

Weiter: `stamp`, `eraseAll`, `setTransparency`, `goToBackground`.

### `Text`

`new Text()` oder `new Text(text, x, y, breite)` — der Einzeiler
`new Text("Hallo")` ist ein Fehler.

**x ist die Mitte des Textes, nicht sein linker Rand.** Gemessen am 13.09.2026:
Eine Statuszeile bei `x = -230` verliert ihre linke Haelfte ausserhalb der
Buehne - sichtbar bleibt nur, was rechts davon liegt. Da der Programmierbereich
im Buch immer 978 px breit ist und die Buehne darin auf rund 300 px skaliert
wird, faellt das auf jedem Bildschirm gleich auf.

**Regel: Statuszeilen mit `new Text("", 0, 155, 460)` anlegen**, also auf x = 0
zentriert. Dann passen rund 50 Zeichen in die Zeile.

### Nach `remove()` ist Schluss

Verifiziert am 13.09.2026: Eine mit `remove()` entfernte Figur laesst sich mit
`add(...)` **nicht** wieder auf die Buehne holen - `count` bleibt bei 0. Und
`getStage()` liefert danach nichts Brauchbares mehr; ein Aufruf darauf bricht
zur Laufzeit ab ("TypeError: ... is not a function"), ohne dass der Uebersetzer
etwas gemeldet haette.

**Regel: Was nach dem Entfernen noch gebraucht wird, holt man sich vorher in
eine Variable.** Und ein Rueckgaengig-Mechanismus speichert Daten (Position,
Sorte), nicht die Figur selbst.

### `Sprite`

Die wichtigsten Gruppen (vollstaendig in `api-online-ide.txt`):
Bewegung `move`, `setPosition`, `changeX/Y`, `glide`, `turnRight/Left`,
`pointInDirection`, `ifOnEdgeBounce`; Aussehen `addCostume`, `switchCostume`,
`nextCostume`, `say`, `think`, `show/hide`, `setSize`, `setTint`;
Fuehlen `isTouchingSprite`, `isTouchingEdge`, `isKeyPressed`, `getMouseX`,
`distanceToSprite`; Ereignisse `run`, `whenKeyPressed`, `whenClicked`,
`whenIReceive`, `broadcast`.

### Kostuemgroessen und setSize

Gemessen am 13.09.2026 ueber `getWidth()` / `getHeight()`. Die Buehne ist
480 x 360 - manche Kostueme sind fast so hoch:

| Kostuem | Originalgroesse |
| --- | --- |
| `bunny1_stand` | **120 x 201** |
| `boxCrate` | 128 x 128 |
| `gemRed` | 128 x 128 |
| `flame` | 41 x 80 |
| `coin_gold` | 61 x 61 |

Drei Eigenschaften, die man kennen muss:

1. **`setSize(p)` erwartet Prozent der Originalgroesse, nicht Pixel.** Dieselbe
   Zahl ergibt also je nach Kostuem ganz verschiedene Pixelgroessen:
   `setSize(40)` macht aus dem Hasen 48 x 80, aus der Muenze 24 x 24.
2. **`setSize` ist absolut, nicht kumulativ.** Zweimal `setSize(40)`
   hintereinander ergibt wieder 40 %, nicht 16 %.
3. **`getWidth()` / `getHeight()` liefern die aktuelle, skalierte Groesse**,
   nicht die des Originalkostuems.

Daraus folgen zwei Regeln:

**Wer mit einem Gitter rechnet, muss die Figuren auf Zellengroesse bringen.**
Sonst behauptet das Gitter etwas anderes, als auf der Buehne zu sehen ist - ein
Hase mit `setSize(40)` ist 80 px hoch und steht damit auf zwei Zellen von 40 px.
Die noetige Prozentzahl rechnet man aus:

```java
public static void passeEin(Sprite pFigur) {
    double laengsteSeite = Math.max(pFigur.getWidth(), pFigur.getHeight());
    pFigur.setSize(pFigur.getSize() * GROESSE / laengsteSeite);
}
```

Mit `getSize()` im Zaehler funktioniert das auch dann, wenn die Figur schon
skaliert war. Verwendet in den Im-Spiel-Seiten der Kapitel 2 und 3 (Klasse
`Zelle`).

**Ohne Gitter genuegt `setSize(50)` fuer den Hasen** - entscheidend ist nur,
dass er nicht ueber den Buehnenrand hinausragt. Steht er wie im EF-Geruest bei
`setPosition(0, -140)` in Originalgroesse, ragt er unten heraus, und
`ifOnEdgeBounce()` schiebt ihn bei jedem Bild weiter hinein, bis er ganz im
Bild ist. Er wandert dadurch ohne Tastendruck ins Spielfeld und sammelt dort
ein, was herumliegt. Wer das nicht merkt, sucht den Fehler in der
Kollisionspruefung.

Umgekehrt gilt: **ohne `ifOnEdgeBounce()` laeuft die Figur aus der Buehne
heraus** und ist weg. Eine frei steuerbare Figur braucht es, sobald sie klein
genug ist, dass es sie nicht mehr verschiebt.

## Bilder: `World` und `Bitmap` ohne `libraries`

Verifiziert am 19.09.2026 fuer das Projekt *Fotofilter*. Die Grafikklassen der
Online-IDE stehen **ohne** `libraries`-Attribut zur Verfuegung - `Stage` und
`Sprite` aus Scratch for Java braucht man dafuer nicht.

```java
World welt = new World(600, 240);
welt.setBackgroundColor(0xEEEEEE);
Bitmap bild = new Bitmap(96, 72, 10, 10, 280, 210);  // Aufloesung, dann Lage und Anzeigegroesse
bild.setColor(spalte, zeile, Color.fromRGB(r, g, b));
```

Gemessen mit `speed="1000000"` an einem Bild von 96 x 72: ein Punktfilter
ueber alle 6912 Bildpunkte rund **250 ms**, ein 3x3-Nachbarschaftsfilter rund
**550 ms**, dreimal hintereinander **1,7 s**. Das ist die Obergrenze des
Ertraeglichen - ein groesseres Bild als 96 x 72 sollte man nicht nehmen.

Vier Fallstricke, alle im Browser nachgestellt:

1. **Die Farbe 0 ist durchsichtig, nicht schwarz.** `Color.fromRGB(0, 0, 0)`
   ergibt die Zahl 0, und ein damit gesetzter Bildpunkt behaelt Alpha 0 - auch
   dann, wenn man die Ueberladung mit `, 1` am Ende benutzt. Man sieht den
   Hintergrund der Buehne durch. Bei dunklem Hintergrund faellt das nicht auf,
   bei hellem sofort. Abhilfe: `0x010101` statt 0 zeichnen.
2. **Drei Bilder nebeneinander passen, vier nicht.** Der Ausgabebereich
   schneidet eine Buehne ab, die deutlich breiter als hoch ist. Ab vier Bildern
   in zwei Reihen anordnen.
3. **`Bitmap` streckt.** Anzeigebreite und -hoehe stehen im Konstruktor; ein
   hochkantes Bild in einer querformatigen Zelle wird gezerrt. Wer das
   Seitenverhaeltnis halten will, rechnet es selbst aus.
4. **`Sprite.getPixelColor(x, y)`** liest die Bildpunkte eines Bibliotheksbilds.
   Als Bildquelle taugt das trotzdem kaum: Die `SpriteLibrary` enthaelt
   Spielgrafiken (`pixelmon`, `Boulders`, `Background`, …), meist 32 bis 128
   Pixel gross und kontrastarm. Fuer Bildverarbeitung bringt man das Bild
   besser selbst mit.

### Ein eigenes Bild mitbringen

Die Online-IDE kann keine Bilddatei laden. Das Foto im Projekt *Fotofilter*
steckt deshalb als Zeichenkette in `Foto.java` - drei Zeichen je Bildpunkt, ein
Zeichen fuer 6 Bit. Erzeugt wird die Datei von
`tools/fotofilter/erzeuge_foto.py`, eingebunden per `rfile` (siehe unten).

## Seiten als `.md.hbs`: `rfile` braucht drei Klammern

Eine Seite mit der Endung `.md.hbs` wird vor dem Uebersetzen durch Handlebars
geschickt. Damit laesst sich eine Quelldatei einbinden, statt sie in jeden
Block zu kopieren:

````
```java Foto.java
{{{rfile "/book/projekte/fotofilter/quelle/Foto.java"}}}
```
````

**Drei** geschweifte Klammern, nicht zwei. Mit zweien maskiert Handlebars die
Anfuehrungszeichen zu `&quot;`, und weil der Inhalt in einem `<script>`-Element
landet, entschluesselt der Browser sie nicht wieder - die Online-IDE meldet dann
"Mit dem Token & kann der Compiler nichts anfangen". Verifiziert am 19.09.2026.

Der Pfad ist **absolut ab der Wurzel des Repositorys**. Die Bunny-Hop-Seiten
holen sich ihre Dateien auf demselben Weg aus `archives/`.

Wer eine Seite als `.md.hbs` anlegt, muss wissen: Die Pruefskripte haben
solche Seiten frueher uebersehen, weil sie nach `*.md` gesucht haben.
`check_permaids.py`, `check_reihenfolge.py` und `passwoerter.py` kennen jetzt
beide Endungen.

## Mehrere Bibliotheken gleichzeitig

Verifiziert am 13.09.2026: `libraries="nrw,scratch"` laedt beide, in beliebiger
Reihenfolge. `List<Gegner>`, `Stack<String>` und `Queue<String>` der
NRW-Bibliothek laufen zusammen mit `Stage`, `Sprite` und `Text` - getestet bis
zum Durchlaufen einer Liste von Sprites mit `toFirst`/`hasAccess`/`next`.

Wichtig bei der Namenskollision: Unter `nrw` gewinnen die NRW-Klassen. `Stack`
hat dann `top()` und ein `void pop()`, nicht `peek()` und `E pop()` wie in
java.util. `Queue` hat `front()` und `void dequeue()`.

## NRW-Bibliothek (`libraries="nrw"`)

Verifiziert: `List`, `Stack`, `Queue`, `BinaryTree` kompilieren und laufen.
Vorhanden sind `List<ContentType>`, `Stack<ContentType>`, `Queue<ContentType>`,
`BinaryTree<ContentType>`, `BinarySearchTree<ContentType extends
ComparableContent<ContentType>>`, `ComparableContent<ContentType>`, `Graph`,
`Vertex`, `Edge`, `DatabaseConnector`, `QueryResult` — also genau der Satz, den
das Zentralabitur NRW voraussetzt. Signaturen in `api-online-ide.txt`.

## Pruefen

Vor jedem Commit alle Pruefungen des Repositorys starten:

```bash
python3 tools/pruefe-alles.py --schnell   # nur statisch, dauert Sekunden
python3 tools/pruefe-alles.py             # zusaetzlich Bauen und Browser
```

Das Skript findet die Pruefungen selbst und startet den Dev-Server bei Bedarf.
Einzeln gehen sie natuerlich auch:

```bash
python3 tools/java-lernpfad/check_lernpfad.py
NODE_PATH=/tmp/pw/node_modules node tools/java-lernpfad/pruefe_seiten.js
```

Eine Uebersicht ueber alle Werkzeuge steht in `tools/README.md`.

### Buehnengroesse: die Online-IDE nimmt die Groesse aus dem Quelltext

Seit **hyperbook 0.104.2** wertet die Online-IDE `new Window(breite, hoehe)` aus.
Am 12.08.2026 im Browser nachgemessen (`book/_probe/index.md`): `getWidth()`
liefert 800, `getHeight()` 400, und ein Sprite bei (350, 150) ist sichtbar.
Mit 0.104.1 blieb die Buehne noch bei 480 x 360.

Ohne eigenes Fenster - also bei `new MeineBuehne();` - sind es weiterhin
480 x 360, genau wie `Window()` auf dem Rechner (`Window.java:219`).
**Derselbe Quelltext ergibt damit in beiden Welten dasselbe Bild** - Voraussetzung
dafuer, eine Datei per `rfile` in einen `onlineide`-Block zu spiegeln.

Der Nullpunkt liegt in der **Mitte**, y waechst nach **oben**
(`Stage.java:1851`: `translate(width/2, height/2)`). Bei 800 x 400 ist also
x von -400 bis 400 und y von -200 bis 200 sichtbar.

Achtung bei alten Projekten: Die abgeloesten Bunny-Hop-Archive stammen aus einer
Zeit mit Ursprung **links oben** und y nach **unten** (Positionen wie `setY(340)`).
Sie uebersetzen und laufen unter 5.3.0, zeigen aber die halbe Szene ausserhalb der
Buehne. Umrechnung: `x_neu = x_alt - 400`, `y_neu = 200 - y_alt` - und jede
Bewegungslogik nach unten kehrt ihr Vorzeichen um.

### Alle Dateien gehoeren in den onlineide-Block

Die Online-IDE uebersetzt genau das, was im Block steht. Zeigt eine Lektion nur die
zwei Dateien, um die es geht, meldet sie Fehler in allen anderen. Jeder Block
enthaelt deshalb das **vollstaendige** Projekt der Stufe - die Datei, um die es
geht, zuerst.
