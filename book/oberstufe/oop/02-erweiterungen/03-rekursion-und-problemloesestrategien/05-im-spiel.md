---
title: "Im Spiel: kommt man da überhaupt hin?"
index: 5
keywords:
  - java
  - qphase
---

# Im Spiel: kommt man da überhaupt hin?

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./04-rueckblick) noch die späteren Kapitel setzen sie voraus.
:::

Sie setzt [Im Spiel: das Level als Gitter](../02-felder-referenzen-generik/05-im-spiel) fort. Das Level steht dort als Plan aus Zeichen – jetzt kommen **Mauern** dazu, und damit ein Problem, das man von Hand nicht mehr lösen kann.

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh: entwickeln Algorithmen auch unter Nutzung informatischer Problemloesestrategien (M); implementieren Algorithmen unter Verwendung von Datenstrukturen (I). Wendet 3.1 an (Rekursion mit Basisfall), fuehrt nichts Neues ein. Optional. -->

## Woran es hakt

Ein Level mit Mauern hat ein Problem, das ein Level ohne Mauern nicht hat: Man kann Gegenstände an Stellen legen, an die **niemand hinkommt**.

Bei elf mal sechs Feldern sieht man das noch mit dem Auge. Bei vierzig mal dreißig nicht mehr – und spätestens wenn das Level zufällig erzeugt wird, ist Hinsehen überhaupt keine Antwort mehr. Das Programm muss die Frage selbst beantworten können:

> **Welche Felder kann der Spieler von seinem Startfeld aus erreichen?**

## Die Idee: von innen nach außen

Die Frage sieht schwer aus, weil sie nach dem ganzen Level fragt. Sie wird leicht, wenn man sie für **ein einziges Feld** stellt:

:::snippet{#merken}
Ein Feld ist erreichbar, wenn ich darauf stehe – und dann sind auch alle Nachbarfelder erreichbar, die keine Mauer sind.

Das ist schon der ganze Algorithmus. Er beschreibt sich selbst mit sich selbst: **Rekursion**.
:::

Vier Fragen muss man beantworten, bevor man weitergeht – das sind die **Basisfälle**:

1. Liegt das Feld außerhalb des Levels? Dann nichts tun.
2. Ist es eine Mauer? Dann nichts tun.
3. War ich hier schon? Dann nichts tun.
4. Sonst: Feld markieren und in **alle vier Richtungen** weitermachen.

:::snippet{#brain}
Der dritte Basisfall ist der wichtigste, und man übersieht ihn beim ersten Versuch fast immer.

Ohne ihn geht das Verfahren von A nach B, von B zurück nach A, von A wieder nach B – unendlich oft. Der Aufrufstapel aus [3.1](./01-rekursion) wächst dabei, bis nichts mehr geht.

**Ein Basisfall muss nicht das Ende des Wegs sein.** Er kann auch heißen: „Hier war ich schon, hier ist nichts mehr zu holen."
:::

## Das Verfahren im Level

Die Klasse `Zelle` aus [der vorigen Seite](../02-felder-referenzen-generik/05-im-spiel) ist wieder dabei: Sie hält die Geometrie des Gitters an einer Stelle und sorgt vor allem dafür, dass **jede Figur genau in eine Zelle passt**. Ohne das rechnet `markiere` über ein Gitter, in dem die Figuren gar nicht liegen – der Hase wäre bei `setSize(40)` doppelt so hoch wie eine Zelle.

Unten läuft es. Die Mauern sind Kisten, und alles, was der Spieler **nicht** erreichen kann, ist rot eingefärbt. Lauf umher und überzeuge dich: Die roten Gegenstände bekommst du nicht.

:::onlineide{libraries="scratch" height="760px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Baut das Level auf und prüft rekursiv, welche Felder erreichbar sind.
 */
public class Spiel extends Stage {

    private String[] plan = {
        "...........",
        ".M...###...",
        ".....#M#..H",
        "..H..###...",
        ".....M....F",
        "M.........."
    };

    private boolean[][] erreichbar;
    private Spielobjekt[][] gitter;
    private Text anzeige;

    public Spiel() {
        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        this.add(new Spieler());

        gitter = new Spielobjekt[plan.length][plan[0].length()];
        erreichbar = new boolean[plan.length][plan[0].length()];

        for (int z = 0; z < plan.length; z++) {
            for (int s = 0; s < plan[z].length(); s++) {
                char zeichen = plan[z].charAt(s);
                if (zeichen == '#') {
                    this.add(new Wand(z, s));
                } else {
                    Spielobjekt o = erzeuge(zeichen, z, s);
                    if (o != null) {
                        this.add(o);
                        gitter[z][s] = o;
                    }
                }
            }
        }

        // Der Spieler startet unten links, also auf dem Feld (5, 1).
        markiere(5, 1);

        int unerreichbar = faerbeUnerreichbare();
        anzeige.showText("erreichbare Felder: " + zaehleErreichbare()
            + "    unerreichbar: " + unerreichbar);
    }

    /** Macht aus einem Zeichen das passende Objekt - oder null. */
    public Spielobjekt erzeuge(char pZeichen, int pZeile, int pSpalte) {
        if (pZeichen == 'M') {
            return new Muenze(pZeile, pSpalte);
        }
        if (pZeichen == 'H') {
            return new Herz(pZeile, pSpalte);
        }
        if (pZeichen == 'F') {
            return new Falle(pZeile, pSpalte);
        }
        return null;
    }

    /**
     * Markiert das Feld und von dort aus alles, was ohne Mauer erreichbar ist.
     */
    public void markiere(int pZeile, int pSpalte) {
        // Basisfall 1: außerhalb des Levels
        if (pZeile < 0 || pZeile >= plan.length) {
            return;
        }
        if (pSpalte < 0 || pSpalte >= plan[pZeile].length()) {
            return;
        }
        // Basisfall 2: Mauer
        if (plan[pZeile].charAt(pSpalte) == '#') {
            return;
        }
        // Basisfall 3: hier war ich schon
        if (erreichbar[pZeile][pSpalte]) {
            return;
        }

        erreichbar[pZeile][pSpalte] = true;

        markiere(pZeile - 1, pSpalte);
        markiere(pZeile + 1, pSpalte);
        markiere(pZeile, pSpalte - 1);
        markiere(pZeile, pSpalte + 1);
    }

    public int zaehleErreichbare() {
        int anzahl = 0;
        for (int z = 0; z < erreichbar.length; z++) {
            for (int s = 0; s < erreichbar[z].length; s++) {
                if (erreichbar[z][s]) {
                    anzahl = anzahl + 1;
                }
            }
        }
        return anzahl;
    }

    /** Färbt jedes Objekt rot, das auf einem unerreichbaren Feld liegt. */
    public int faerbeUnerreichbare() {
        int anzahl = 0;
        for (int z = 0; z < gitter.length; z++) {
            for (int s = 0; s < gitter[z].length; s++) {
                if (gitter[z][s] != null && !erreichbar[z][s]) {
                    gitter[z][s].setTint(255, 0, 0);
                    anzahl = anzahl + 1;
                }
            }
        }
        return anzahl;
    }

}
```

```java Zelle.java
/**
 * Die Geometrie des Gitters an einer einzigen Stelle: Wie groß ist eine
 * Zelle, wo liegt sie, und wie passt eine Figur hinein?
 */
public class Zelle {

    /** Kantenlänge einer Zelle in Pixeln. */
    public static final int GROESSE = 40;

    /** Mittelpunkt der Zelle in Spalte 0 bzw. Zeile 0. */
    public static final int LINKS = -200;
    public static final int OBEN = 130;

    /** Die x-Koordinate der Spalte. */
    public static int x(int pSpalte) {
        return LINKS + pSpalte * GROESSE;
    }

    /** Die y-Koordinate der Zeile. Zeile 0 liegt oben. */
    public static int y(int pZeile) {
        return OBEN - pZeile * GROESSE;
    }

    /**
     * Skaliert eine Figur so, dass ihre längere Seite genau eine Zelle misst.
     *
     * setSize erwartet Prozent der Originalgröße, nicht Pixel. Welche
     * Prozentzahl nötig ist, hängt also vom Kostüm ab und muss ausgerechnet
     * werden - getWidth() und getHeight() liefern die aktuelle Größe.
     */
    public static void passeEin(Sprite pFigur) {
        double laengsteSeite = Math.max(pFigur.getWidth(), pFigur.getHeight());
        pFigur.setSize(pFigur.getSize() * GROESSE / laengsteSeite);
    }
}
```

```java Wand.java
/**
 * Eine Mauer. Sie ist kein Spielobjekt - man kann sie nicht einsammeln.
 */
public class Wand extends Sprite {

    public Wand(int pZeile, int pSpalte) {
        this.addCostume("boxCrate");
        Zelle.passeEin(this);
        this.setPosition(Zelle.x(pSpalte), Zelle.y(pZeile));
    }
}
```

```java Spielobjekt.java
public abstract class Spielobjekt extends Sprite {

    private int zeile;
    private int spalte;

    public Spielobjekt(String pKostuem, int pZeile, int pSpalte) {
        zeile = pZeile;
        spalte = pSpalte;
        this.addCostume(pKostuem);
        Zelle.passeEin(this);
        this.setPosition(Zelle.x(pSpalte), Zelle.y(pZeile));
    }

    public int getZeile() {
        return zeile;
    }

    public int getSpalte() {
        return spalte;
    }

    public abstract void beruehrtVon(Spieler pSpieler);
}
```

```java Muenze.java
public class Muenze extends Spielobjekt {

    public Muenze(int pZeile, int pSpalte) {
        super("coin_gold", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        this.remove();
    }
}
```

```java Herz.java
public class Herz extends Spielobjekt {

    public Herz(int pZeile, int pSpalte) {
        super("gemRed", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        this.remove();
    }
}
```

```java Falle.java
public class Falle extends Spielobjekt {

    public Falle(int pZeile, int pSpalte) {
        super("flame", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        this.remove();
    }
}
```

```java Spieler.java
public class Spieler extends Sprite {

    private static final int TEMPO = 4;

    public Spieler() {
        this.addCostume("bunny1_stand");
        Zelle.passeEin(this);
        this.setPosition(Zelle.x(1), Zelle.y(5));
    }

    public void run() {
        double altX = this.getX();
        double altY = this.getY();

        if (this.isKeyPressed(KeyCode.RIGHT)) {
            this.changeX(TEMPO);
        }
        if (this.isKeyPressed(KeyCode.LEFT)) {
            this.changeX(-TEMPO);
        }
        if (this.isKeyPressed(KeyCode.UP)) {
            this.changeY(TEMPO);
        }
        if (this.isKeyPressed(KeyCode.DOWN)) {
            this.changeY(-TEMPO);
        }

        // Am Bühnenrand ist Schluss ...
        this.ifOnEdgeBounce();

        // ... und an einer Mauer auch: zurück auf den alten Platz.
        if (this.isTouchingSprite(Wand.class)) {
            this.setPosition(altX, altY);
        }

        Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
        if (getroffen != null) {
            getroffen.beruehrtVon(this);
        }
    }
}
```

:::

## Warum das kein Umweg ist

Man könnte einwenden: Man sieht doch, dass die Münze eingemauert ist. Für dieses Level stimmt das. Aber derselbe Algorithmus beantwortet ohne eine Zeile Änderung auch die Fragen, die man **nicht** sieht:

- Ist dieses zufällig erzeugte Level überhaupt lösbar?
- Wie groß ist der Bereich, in dem der Spieler eingeschlossen ist?
- Welche Felder muss ich freiräumen, damit alles erreichbar wird?

:::snippet{#aufgabe}
**Aufgabe 1: den Algorithmus verstehen**

a) Nimm den dritten Basisfall heraus – die Zeile mit `erreichbar[pZeile][pSpalte]`. Sage **vorher** voraus, was passiert, und begründe es mit dem Aufrufstapel. Probiere es erst danach aus.

b) Wie tief wird die Rekursion bei diesem Level höchstens? Gib eine obere Schranke an, die für **jedes** Level aus Zeilen und Spalten gilt.

c) Ändere die Reihenfolge der vier Aufrufe am Ende. Ändert sich das Ergebnis? Ändert sich die Reihenfolge, in der markiert wird?

d) Erweitere das Verfahren auf acht Richtungen, sodass man auch diagonal gehen kann. Wie viele unerreichbare Gegenstände bleiben dann?
:::

:::protect{password="java-q-3-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Das Verfahren läuft zwischen zwei benachbarten Feldern hin und her: A ruft B, B ruft A, A ruft B. Kein Aufruf kehrt je zurück, also wächst der Aufrufstapel unbegrenzt, bis das Programm mit einem Stapelüberlauf abbricht. **Der Basisfall fehlt nicht am Rand, sondern in der Mitte.**

b) Höchstens so viele Aufrufe wie es Felder gibt – hier 6 · 11 = 66. Jedes Feld wird höchstens einmal markiert, und nur ein markiertes Feld ruft weiter. Allgemein: die Zahl der begehbaren Felder.

c) Das **Ergebnis** ist identisch – am Ende ist jedes erreichbare Feld markiert, egal in welcher Reihenfolge. Die **Reihenfolge** der Markierungen ändert sich. Wichtig ist das, sobald man sie sichtbar macht (etwa für eine Animation) oder Wege sucht.

d) Vier weitere Aufrufe mit den Diagonalen. Die eingemauerte Münze bleibt trotzdem unerreichbar – die Mauer schließt sie auch diagonal ein. Genau deshalb muss man die Frage „welche Nachbarschaft gilt?" beantworten, **bevor** man den Algorithmus schreibt: Sie gehört zum Problem, nicht zur Umsetzung.

:::

:::snippet{#aufgabe}
**Aufgabe 2: den Algorithmus benutzen**

a) Schreibe `istLoesbar()`: Liefert `true`, wenn **jeder** Gegenstand auf einem erreichbaren Feld liegt.

b) Erzeuge das Level zufällig: Setze mit einer Wahrscheinlichkeit von etwa 25 % eine Mauer und verteile danach fünf Münzen auf freie Felder. Prüfe mit `istLoesbar()` und erzeuge so lange neu, bis es passt.

c) Beurteile dieses Vorgehen. Was passiert bei 60 % Mauern?
:::

:::protect{password="java-q-3-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ein Durchlauf über das Gitter: Sobald ein Objekt auf einem nicht markierten Feld liegt, `false` zurückgeben; kommt man durch, `true`.

b) Der Aufbau kommt in eine Schleife: erzeugen, `markiere(...)` aufrufen, prüfen – und bei `false` alles verwerfen und von vorn.

c) Das Verfahren heißt **erzeugen und verwerfen** und ist in Ordnung, solange die meisten Versuche gelingen. Es hat aber keine Garantie: Bei 60 % Mauern ist fast jedes Level unlösbar, und das Programm versucht es beliebig lange – ohne je zu melden, dass es aussichtslos ist. Eine obere Zahl von Versuchen gehört deshalb dazu.

Besser ist ein Verfahren, das gar keine unlösbaren Level erzeugen **kann**: Man baut das Level nicht aus Zufall, sondern rekursiv aus Räumen, die beim Teilen immer verbunden bleiben – [Teilen und Herrschen](./02-teilen-und-herrschen), angewandt auf eine Fläche.

:::

## Und ohne Spiel?

| Im Spiel | Woanders derselbe Algorithmus |
| --- | --- |
| erreichbare Felder markieren | Farbeimer in einem Malprogramm |
| eingemauerte Münze finden | zusammenhängende Gebiete auf einer Landkarte |
| „war ich hier schon?" | besuchte Knoten bei der Tiefensuche im Graphen |
| Basisfall am Rand des Feldes | Abbruch am Rand jedes rekursiven Durchlaufs |

Das Verfahren heißt **Flutfüllung**, und wenn du in [Kapitel 5](../05-nichtlineare-datenstrukturen) Graphen durchläufst, wirst du es wiedererkennen: Dasselbe Vorgehen, nur heißen die Felder dort Knoten und die Nachbarn Kanten.

---

## Selbsttest

::::multievent

**1. Welcher Basisfall verhindert, dass das Verfahren endlos läuft?**

{r1{der Rand des Levels}}

{r1{die Mauer}}

{r1{!die Prüfung, ob das Feld schon markiert ist}}

{h{Zwei Nachbarfelder ohne Mauer könnten sich sonst ewig gegenseitig aufrufen.}}
{H{Richtig!}}

**2. Wie oft wird ein begehbares Feld markiert?**

{r2{einmal pro Nachbar}}

{r2{!genau einmal}}

{r2{so oft, bis alle Nachbarn fertig sind}}

{h{Beim zweiten Besuch greift der dritte Basisfall.}}
{H{Richtig - deshalb ist der Aufwand so groß wie die Zahl der Felder.}}

**3. Was ändert sich, wenn man die Reihenfolge der vier rekursiven Aufrufe vertauscht?**

{r3{das Ergebnis}}

{r3{!nur die Reihenfolge, in der markiert wird}}

{r3{gar nichts, die Aufrufe laufen gleichzeitig}}

{h{Am Ende ist jedes erreichbare Feld markiert.}}
{H{Richtig!}}

**4. Welche Aussagen über Rekursion treffen hier zu?** (Mehrfachauswahl)

{c1{!Ein Basisfall kann auch mitten im Problem liegen, nicht nur an seinem Rand.}}

{c1{!Die Tiefe des Aufrufstapels ist durch die Zahl der begehbaren Felder begrenzt.}}

{c1{!Das Problem wird auf dasselbe Problem für die Nachbarfelder zurückgeführt.}}

{c1{Rekursion ist hier schneller als eine Schleife.}}

{h{Über die Geschwindigkeit ist damit nichts gesagt - über die Lesbarkeit schon.}}
{H{Richtig!}}

**5. Wozu taugt der Algorithmus außerhalb dieses Spiels?**

{r4{nur für Spielfelder}}

{r4{!für jede Frage nach zusammenhängenden Gebieten, etwa den Farbeimer im Malprogramm}}

{r4{zum Sortieren von Daten}}

{h{Felder und Nachbarn gibt es auch anderswo.}}
{H{Richtig!}}

::::
