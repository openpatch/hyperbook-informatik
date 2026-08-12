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

### `Sprite`

Die wichtigsten Gruppen (vollstaendig in `api-online-ide.txt`):
Bewegung `move`, `setPosition`, `changeX/Y`, `glide`, `turnRight/Left`,
`pointInDirection`, `ifOnEdgeBounce`; Aussehen `addCostume`, `switchCostume`,
`nextCostume`, `say`, `think`, `show/hide`, `setSize`, `setTint`;
Fuehlen `isTouchingSprite`, `isTouchingEdge`, `isKeyPressed`, `getMouseX`,
`distanceToSprite`; Ereignisse `run`, `whenKeyPressed`, `whenClicked`,
`whenIReceive`, `broadcast`.

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
