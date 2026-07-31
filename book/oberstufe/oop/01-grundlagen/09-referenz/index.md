---
name: Referenz
index: 9
---

# Referenz

Ein Nachschlagewerk für alles, was du in diesem Lernpfad brauchst.

## Aufbau eines Programms

```java
void main() {
    IO.println("Hier beginnt das Programm.");
}

int verdopple(int pZahl) {
    return pZahl * 2;
}
```

Das Hauptprogramm heißt `main`, steht in `Main.java` und braucht **keine** Klasse. Hilfsmethoden stehen daneben – ebenfalls **ohne** `static`.

:::snippet{#merken}
In Büchern und im Netz findest du meist die ältere, ausführlichere Schreibweise:

```java
public class HalloWelt {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}
```

Sie bedeutet dasselbe und funktioniert auch hier. In diesem Lernpfad benutzen wir durchgängig die kurze Form.
:::

## Ein- und Ausgabe

| Anweisung | Wirkung |
| --- | --- |
| `IO.println(x)` | gibt `x` aus und macht einen Zeilenumbruch |
| `IO.print(x)` | gibt `x` aus, **ohne** Zeilenumbruch |
| `IO.println()` | nur ein Zeilenumbruch |
| `IO.readln("Frage")` | zeigt die Frage an, liefert die Eingabe als `String` |
| `Integer.parseInt(text)` | wandelt einen `String` in einen `int` um |
| `Double.parseDouble(text)` | wandelt einen `String` in einen `double` um |

:::snippet{#merken}
Einen `Scanner` gibt es in dieser Umgebung **nicht**. Alle Eingaben laufen über `IO.readln`.
:::

## Datentypen

| Typ | speichert | Beispiel |
| --- | --- | --- |
| `int` | ganze Zahlen | `42`, `-7` |
| `double` | Kommazahlen | `3.5`, `-0.75` |
| `boolean` | Wahrheitswerte | `true`, `false` |
| `char` | ein Zeichen | `'A'` |
| `String` | Zeichenketten (**Objekttyp**) | `"Hallo"` |

Typumwandlung: `(double) zahl` in die eine, `(int) kommazahl` in die andere Richtung. Der Cast nach `int` **schneidet ab**, er rundet nicht.

## Operatoren

| Operator | Bedeutung |
| --- | --- |
| `+ - * /` | Grundrechenarten. Bei zwei `int`-Werten ist `/` eine Ganzzahldivision |
| `%` | Rest der Ganzzahldivision |
| `== != < > <= >=` | Vergleiche |
| `&& \|\| !` | und, oder, nicht |
| `+= -= *= /=` | Kurzformen für Zuweisungen |
| `++ --` | um eins erhöhen bzw. verringern |

Rangfolge bei der Logik: erst `!`, dann `&&`, dann `||`. Bei `&&` und `||` gilt die **Kurzschlussauswertung**: Der rechte Teil wird nur ausgewertet, wenn er noch etwas ändern kann.

## Kontrollstrukturen

```java
if (bedingung) { ... } else if (andere) { ... } else { ... }

switch (wert) {
    case 1: ...; break;
    default: ...;
}

while (bedingung) { ... }

do { ... } while (bedingung);

for (int i = 0; i < n; i++) { ... }

for (String s : feld) { ... }
```

## Zeichenketten

| Methode | liefert |
| --- | --- |
| `wort.length()` | Anzahl der Zeichen |
| `wort.charAt(i)` | Zeichen an Position `i` |
| `wort.substring(a, b)` | Teil von `a` bis **vor** `b` |
| `wort.substring(a)` | alles ab `a` |
| `wort.indexOf(teil)` | Position des ersten Vorkommens, sonst `-1` |
| `wort.equals(anderes)` | `true` bei gleichem Inhalt |
| `wort.toUpperCase()` / `toLowerCase()` | in Groß- bzw. Kleinbuchstaben |

:::snippet{#merken}
Zeichenketten vergleicht man **immer** mit `equals`. Das Zeichen `==` prüft bei Objekten, ob es sich um dasselbe Objekt handelt – die einzige sinnvolle Verwendung ist `if (x == null)`.
:::

## Felder

```java
int[] werte = new int[5];      // fünf Plätze, alle 0
int[] werte = {5, 2, 4, 1, 8}; // Kurzform
werte[0] = 7;                  // schreiben
int x = werte[0];              // lesen
int n = werte.length;          // Anzahl, ohne Klammern
```

Der erste Index ist **0**, der letzte `length - 1`.

Die drei Grundmuster:

```java
// Summieren
int summe = 0;
for (int i = 0; i < werte.length; i++) {
    summe = summe + werte[i];
}

// Extremwert
int groesstes = werte[0];
for (int i = 1; i < werte.length; i++) {
    if (werte[i] > groesstes) { groesstes = werte[i]; }
}

// Zählen
int anzahl = 0;
for (int i = 0; i < werte.length; i++) {
    if (werte[i] >= 10) { anzahl++; }
}
```

## Mathematik

| Aufruf | liefert |
| --- | --- |
| `Math.abs(x)` | Betrag |
| `Math.sqrt(x)` | Quadratwurzel |
| `Math.pow(a, b)` | a hoch b |
| `Math.max(a, b)` / `Math.min(a, b)` | größerer bzw. kleinerer Wert |
| `Math.round(x)` | kaufmännisch gerundet, liefert einen `int` |
| `Math.floor(x)` / `Math.ceil(x)` | ab- bzw. aufgerundet |
| `Math.sin(x)` / `Math.cos(x)` | Winkelfunktionen, Winkel im **Bogenmaß** |
| `Math.PI` | Kreiszahl |
| `Math.random()` | Zufallszahl zwischen 0 und 1 |
| `Random.randint(von, bis)` | ganzzahlige Zufallszahl, beide Grenzen einschließlich |

:::snippet{#merken}
`Random.randint` steht **nicht** zur Verfügung, wenn die Scratch-Bibliothek geladen ist. Dort nimmt man `this.pickRandom(von, bis)` auf einem Sprite oder auf der Bühne.
:::

## Klassen

```java
public class Auto {

    private String marke;          // Attribut
    private int kilometerstand;

    /**
     * Erzeugt ein neues Auto.
     * @param pMarke die Marke
     * @param pKm der Kilometerstand
     */
    public Auto(String pMarke, int pKm) {   // Konstruktor
        marke = pMarke;
        kilometerstand = pKm;
    }

    /** Liefert den Kilometerstand. */
    public int getKilometerstand() {        // Getter
        return kilometerstand;
    }

    /** Erhöht den Kilometerstand. */
    public void fahre(int pKm) {            // Methode
        if (pKm > 0) {
            kilometerstand = kilometerstand + pKm;
        }
    }
}
```

Verwendung: `Auto a = new Auto("VW", 84000); a.fahre(35);`

| Sichtbarkeit | Zeichen im Diagramm | sichtbar in |
| --- | --- | --- |
| `private` | `-` | nur der eigenen Klasse |
| `protected` | `#` | eigener Klasse und Unterklassen |
| `public` | `+` | überall |

## Vererbung

```java
public class Lehrer extends Person {

    private String fach;

    public Lehrer(String pName, String pFach) {
        super(pName);        // muss die erste Anweisung sein
        fach = pFach;
    }

    public String beschreibung() {
        return super.beschreibung() + ", unterrichtet " + fach;
    }
}
```

Satztest: Passt „**ist ein**“, nimm Vererbung. Passt „**hat ein**“, nimm eine Assoziation – also ein Attribut vom Typ der anderen Klasse.

## Tests schreiben

```java RechnerTest.java
@Test
class RechnerTest {

    @Test
    void testMaximum() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(3, 9), "maximum(3, 9) muss 9 sein.");
        assertTrue(r.istGerade(4), "4 ist gerade.");
        assertFalse(r.istGerade(5), "5 ist ungerade.");
    }
}
```

Testmethoden sind parameterlos und `void`. Die Klasse bekommt ebenfalls ein `@Test`, damit sich alle Tests gemeinsam starten lassen. Gestartet wird über den Reiter **Testrunner** unter dem Editor.

## Scratch for Java

Die Bibliothek wird über `libraries="scratch"` geladen. Es gibt **keine** `import`-Zeilen.

### Aufbau

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {
    public Buehne() {
        this.add(new Hase());
    }
}
```

```java Hase.java
public class Hase extends Sprite {
    public Hase() {
        this.addCostume("bunny1_stand");
        this.setPosition(0, 0);
    }

    public void run() {          // wird etwa 60-mal pro Sekunde aufgerufen
        if (this.isKeyPressed(KeyCode.RIGHT)) {
            this.changeX(3);
        }
    }
}
```

### Bühne

Die Bühne ist **480 × 360** Pixel groß. Der Punkt (0, 0) liegt in der **Mitte**, die x-Achse zeigt nach rechts, die y-Achse **nach oben**. Sichtbar ist also x von −240 bis 240 und y von −180 bis 180.

| Methode auf `Stage` | Wirkung |
| --- | --- |
| `add(sprite)` / `add(pen)` / `add(text)` | fügt etwas zur Bühne hinzu |
| `pickRandom(von, bis)` | ganzzahlige Zufallszahl |
| `find(Klasse.class)` | Liste aller Objekte dieser Art |
| `count(Klasse.class)` | Anzahl der Objekte dieser Art |
| `run()` | wird in jedem Bild aufgerufen |

### Sprite

| Gruppe | Methoden |
| --- | --- |
| Bewegung | `setPosition(x, y)`, `changeX(d)`, `changeY(d)`, `move(schritte)`, `turnRight(grad)`, `turnLeft(grad)`, `pointInDirection(grad)`, `ifOnEdgeBounce()`, `glide(sek, x, y)` |
| Aussehen | `addCostume(name)`, `switchCostume(name)`, `nextCostume()`, `say(text)`, `think(text)`, `show()`, `hide()`, `setSize(prozent)`, `setTint(r, g, b)` |
| Fühlen | `isTouchingSprite(Klasse.class)`, `getTouchingSprite(Klasse.class)`, `isTouchingEdge()`, `isKeyPressed(KeyCode.RIGHT)`, `getMouseX()`, `distanceToSprite(anderes)` |
| Ereignisse | `run()`, `whenClicked()`, `whenKeyPressed(taste)`, `whenAddedToStage()`, `whenIReceive(nachricht)`, `broadcast(nachricht)` |
| Sonstiges | `getStage()`, `remove()`, `pickRandom(von, bis)`, `getX()`, `getY()` |

`getTouchingSprite` liefert `null`, wenn nichts berührt wird – das muss man prüfen.

### Pen

```java
Pen stift = new Pen();
this.add(stift);
stift.setColor(0, 200, 0);
stift.setSize(4);
stift.setPosition(-100, -100);
stift.down();
stift.setPosition(100, -100);   // zeichnet eine Linie
stift.up();
```

Der Stift ist **keine Turtle**: Er kennt kein „vorwärts“ und kein „drehe dich“. Du gibst ihm immer die Zielkoordinaten. Weiter gibt es `eraseAll()`, `stamp()` und `setTransparency(...)`.

### Text

```java
Text t = new Text("Punkte: 0", -220, 150, 400);
this.add(t);
t.showText("Punkte: 10");
```

Die vier Parameter sind Text, x, y und Breite. `new Text("Hallo")` mit nur einem Parameter gibt es **nicht**.

### Kostüme

Die Bibliothek bringt über 1700 Kostüme mit. Häufig gebraucht:

`bunny1_stand`, `bunny1_jump`, `bunny2_stand` · `coin_gold`, `coin_silver`, `coin_bronze` · `gemBlue`, `gemGreen`, `gemRed`, `gemYellow` · `keyBlue`, `keyGreen`, `keyRed` · `alienBeige_stand`, `alienBlue_stand`, `alienGreen_stand` · `boxCrate`, `boxCoin`, `boxItem` · `star`, `cloud`, `carrot`, `flame` · `planeBlue1`, `planeRed1` · `enemyBlack1` bis `enemyBlack5` · `fishBlue`, `frog`, `mouse`, `bee`, `slimeBlue`

Die vollständige Sammlung findest du in der [Dokumentation von Scratch for Java](https://scratch4j.openpatch.org).

### Tasten

`KeyCode.LEFT`, `KeyCode.RIGHT`, `KeyCode.UP`, `KeyCode.DOWN`, `KeyCode.SPACE`, `KeyCode.ENTER`, `KeyCode.A` bis `KeyCode.Z`, `KeyCode.DIGIT_0` bis `KeyCode.DIGIT_9`

## Was hier anders ist als im „großen“ Java

:::snippet{#merken}
Die Online-IDE ist eine Java-**ähnliche** Sprache. Die wichtigsten Abweichungen:

| Schul-Java | hier |
| --- | --- |
| `Scanner` | gibt es nicht – `IO.readln(...)` |
| `Arrays.sort`, `Arrays.equals`, `Arrays.toString` | gibt es nicht – selbst schreiben |
| `Integer.toBinaryString` | `Integer.toBinary` |
| `Math.round` liefert `long` | liefert `int` |
| `import ...` | nicht nötig und nicht möglich |
| `public static void main(String[] args)` | funktioniert, wir nehmen aber `void main()` |

Wenn du später in einer richtigen Java-Entwicklungsumgebung arbeitest, fällt dir der Umstieg leicht – die Sprache ist dieselbe, nur die Bibliothek ist eine andere.
:::
