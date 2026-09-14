---
title: "Im Spiel: das Level als Gitter"
index: 5
permaid: java-generik-im-spiel
keywords:
  - java
  - qphase
---

# Im Spiel: das Level als Gitter

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./04-rueckblick) noch die späteren Kapitel setzen sie voraus.
:::

Sie baut auf [Im Spiel: ein Typ für alle Objekte](../01-vertiefte-objektorientierung/08-im-spiel) auf. Dort ist `Spielobjekt` als abstrakte Oberklasse entstanden; hier bekommt das Spiel ein **Level**.

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh: ordnen Attributen, Parametern und Rueckgaben Datentypen und Datenstrukturen zu (M); implementieren Algorithmen unter Verwendung von Datenstrukturen (I). Wendet 2.1 bis 2.3 an, fuehrt nichts Neues ein. Optional. -->

## Woran es hakt

Bisher wurden die Gegenstände mit `pickRandom` über die Bühne gestreut:

```java
for (int i = 0; i < 5; i++) {
    this.add(new Muenze(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
}
```

Das läuft – aber es ist kein Level. Man kann es nicht entwerfen, nicht zweimal gleich spielen, keinem Mitschüler zeigen und über die Stelle reden, die zu schwer ist. Und zwei Münzen können übereinanderliegen.

## Stufe 1: der Plan und das Gitter

Ein Level ist eine **Fläche**, und Flächen beschreibt man mit zwei Indizes: Zeile und Spalte. Genau dafür gibt es [zweidimensionale Felder](./01-zweidimensionale-felder).

Wir brauchen zwei Dinge, und sie werden leicht verwechselt:

:::snippet{#definition}
Der **Plan** ist, was der Mensch schreibt: ein Feld aus Zeichenketten, in dem jedes Zeichen für eine Sorte steht. Er wird einmal gelesen und danach nicht mehr gebraucht.

Das **Gitter** ist, was das Programm führt: ein zweidimensionales Feld, in dem für jedes Feld steht, **welches Objekt** dort liegt. Es wird während des ganzen Spiels gebraucht.
:::

```java
private String[] plan = {
    "M.........M",
    ".F.......F.",
    "..M.....M..",
    "...H...H...",
    "....M.M...."
};
```

Das liest sich wie eine Landkarte – und genau das ist der Gewinn. Wer das Level ändern will, ändert Zeichen, nicht Programmcode.

:::snippet{#merken}
**Eine Figur muss in ihre Zelle passen.** Sonst behauptet das Gitter etwas anderes, als man auf der Bühne sieht: Eine Figur, die zwei Zellen hoch ist, steht rechnerisch auf einem Feld und optisch auf zweien – und spätestens wenn ein Programm mit dem Gitter rechnet, stimmt das Ergebnis nicht mehr mit dem Bild überein.

Das ist nicht so einfach hinzuschreiben, wie es klingt, denn `setSize` erwartet **Prozent der Originalgröße**, nicht Pixel. Und die Kostüme sind sehr verschieden groß:

| Kostüm | Originalgröße | bei `setSize(40)` |
| --- | --- | --- |
| `bunny1_stand` | 120 × 201 | 48 × 80 – **doppelt so hoch wie eine Zelle** |
| `gemRed` | 128 × 128 | 51 × 51 – größer als die Zelle |
| `coin_gold` | 61 × 61 | 24 × 24 |
| `flame` | 41 × 80 | 16 × 32 |

Dieselbe Prozentzahl ergibt also ganz verschiedene Pixelgrößen. Gebraucht wird die umgekehrte Rechnung: *Welche Prozentzahl ergibt genau 40 Pixel?* Dafür liefern `getWidth()` und `getHeight()` die aktuelle Größe – und die Klasse `Zelle` unten rechnet es für jede Figur aus, egal welches Kostüm sie trägt.
:::

:::snippet{#merken}
`Spielobjekt[][] gitter` speichert **keine Objekte**. Es speichert **Verweise** auf Objekte. Ein Platz, auf dem nichts liegt, enthält `null` – und `null` ist kein Objekt, sondern die Auskunft „hier zeigt nichts hin". Das ist derselbe Gedanke wie in [2.2 Referenzen](./02-referenzen), nur zweidimensional.
:::

Unten läuft das fertige Level. Sammle ein und **achte auf die beiden Zahlen oben**.

:::onlineide{libraries="scratch" height="720px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Baut das Level aus einem Plan auf und führt ein Gitter darüber.
 */
public class Spiel extends Stage {

    private String[] plan = {
        "M.........M",
        ".F.......F.",
        "..M.....M..",
        "...H...H...",
        "....M.M...."
    };

    private Spielobjekt[][] gitter;
    private int punkte;
    private Spieler spieler;
    private Text anzeige;

    public Spiel() {
        punkte = 0;

        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        spieler = new Spieler();
        this.add(spieler);

        gitter = new Spielobjekt[plan.length][plan[0].length()];

        for (int z = 0; z < plan.length; z++) {
            for (int s = 0; s < plan[z].length(); s++) {
                Spielobjekt o = erzeuge(plan[z].charAt(s), z, s);
                if (o != null) {
                    this.add(o);
                    gitter[z][s] = o;
                }
            }
        }

        this.aktualisiere();
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

    /** Zählt, auf wie vielen Plätzen des Gitters ein Verweis steht. */
    public int anzahlImGitter() {
        int anzahl = 0;
        for (int z = 0; z < gitter.length; z++) {
            for (int s = 0; s < gitter[z].length; s++) {
                if (gitter[z][s] != null) {
                    anzahl = anzahl + 1;
                }
            }
        }
        return anzahl;
    }

    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        this.aktualisiere();
    }

    public void aktualisiere() {
        anzeige.showText("Punkte: " + punkte
            + "    auf der Bühne: " + this.count(Spielobjekt.class)
            + "    im Gitter: " + this.anzahlImGitter());
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

```java Spielobjekt.java
/**
 * Alles, was im Level liegt. Ein Spielobjekt kennt seinen Platz im Gitter.
 */
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

    protected Spiel spiel() {
        return (Spiel) this.getStage();
    }

    public abstract void beruehrtVon(Spieler pSpieler);
}
```

```java Muenze.java
public class Muenze extends Spielobjekt {

    public static final int WERT = 10;

    public Muenze(int pZeile, int pSpalte) {
        super("coin_gold", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        // Erst von der Bühne nehmen, dann zählen - sonst zählt die Anzeige
        // dieses Objekt noch mit. Nach remove() liefert spiel() null,
        // deshalb wird die Bühne vorher gemerkt.
        Spiel s = this.spiel();
        this.remove();
        s.zaehle(WERT);
    }
}
```

```java Herz.java
public class Herz extends Spielobjekt {

    public Herz(int pZeile, int pSpalte) {
        super("gemRed", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        this.remove();
        pSpieler.heile();
        s.aktualisiere();
    }
}
```

```java Falle.java
public class Falle extends Spielobjekt {

    public Falle(int pZeile, int pSpalte) {
        super("flame", pZeile, pSpalte);
    }

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        this.remove();
        pSpieler.verletze();
        s.aktualisiere();
    }
}
```

```java Spieler.java
public class Spieler extends Sprite {

    public static final int START_LEBEN = 3;
    private static final int TEMPO = 4;

    private int leben;

    public Spieler() {
        this.addCostume("bunny1_stand");
        Zelle.passeEin(this);
        // Eine Zeile unterhalb des Plans, in der mittleren Spalte.
        this.setPosition(Zelle.x(5), Zelle.y(6));
        leben = START_LEBEN;
    }

    public int getLeben() {
        return leben;
    }

    public void heile() {
        leben = leben + 1;
    }

    public void verletze() {
        leben = leben - 1;
    }

    public void run() {
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
        this.ifOnEdgeBounce();

        Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
        if (getroffen != null) {
            getroffen.beruehrtVon(this);
        }
    }
}
```

:::

## Stufe 2: der Fehler, den man nicht sieht

Hast du auf die Zahlen geachtet? **Sie laufen auseinander.** Auf der Bühne verschwindet jede eingesammelte Münze, im Gitter bleibt sie stehen.

:::snippet{#brain}
Das ist kein Anzeigefehler, sondern genau das Thema von [2.2](./02-referenzen). Nach dem Aufbau zeigen **zwei** Stellen auf dasselbe Objekt: die Bühne und `gitter[z][s]`.

`this.remove()` entfernt das Objekt von der **Bühne**. Von dem Verweis im Gitter weiß die Bühne nichts – sie kann ihn gar nicht kennen. Also bleibt er stehen und zeigt weiter auf ein Objekt, das im Spiel keine Rolle mehr spielt.

Ein Objekt verschwindet nicht, weil ein Verweis darauf gelöscht wird. Und es bleibt nicht, weil noch einer darauf zeigt.
:::

:::snippet{#aufgabe}
**Aufgabe 1: den Bug beheben**

a) Sage voraus: Du sammelst drei Gegenstände ein. Welche beiden Zahlen stehen danach oben?

b) Das Objekt kennt seinen Platz – `getZeile()` und `getSpalte()`. Schreibe in `Spiel` eine Methode `leere(int pZeile, int pSpalte)`, die den Verweis im Gitter auf `null` setzt und die Anzeige auffrischt.

c) Rufe sie an den drei Stellen auf, an denen ein Objekt verschwindet. Danach müssen die Zahlen gleich bleiben.

d) Warum kann man das **nicht** in `Spieler.run()` erledigen, sondern muss es in jeder Unterklasse tun? (Tipp: Die Falle verschwindet, die Bombe aus dem letzten Kapitel nicht.)
:::

:::protect{password="java-q-2-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Auf der Bühne 7, im Gitter 10. Der Plan enthält zehn Zeichen, die kein Punkt sind; die Differenz ist genau die Zahl der eingesammelten Gegenstände.

b) In `Spiel`:

```java
/** Streicht den Verweis auf dem Platz (pZeile, pSpalte). */
public void leere(int pZeile, int pSpalte) {
    gitter[pZeile][pSpalte] = null;
    this.aktualisiere();
}
```

c) In `Muenze`, `Herz` und `Falle` jeweils nach dem `remove()` – Zeile und Spalte kennt das Objekt auch dann noch:

```java
Spiel s = this.spiel();
this.remove();
s.leere(this.getZeile(), this.getSpalte());
```

d) Weil nicht jedes Berühren ein Verschwinden ist. `Spieler.run()` weiß nur, *dass* es etwas berührt hat – ob das Objekt danach noch im Level liegt, entscheidet die Unterklasse in ihrem `beruehrtVon`. Genau das ist der Gedanke aus [1.4](../01-vertiefte-objektorientierung/04-polymorphie): Die Regel steht bei dem Objekt, für das sie gilt.

Der Fehler ist typisch für Programme, die dieselbe Sache an zwei Stellen führen. Wenn du ihn vermeiden willst, statt ihn zu beheben: Führe das Gitter als **einzige** Wahrheit und frage die Bühne gar nicht erst.

:::

## Stufe 3: was ein Gitter kann, was ein Feld nicht kann

Mit dem Gitter kann das Spiel Fragen beantworten, für die es vorher jedes Objekt hätte durchsuchen müssen: *Was liegt links von mir? Ist dieser Platz frei?* Ein Zugriff statt einer Schleife.

:::snippet{#aufgabe}
**Aufgabe 2: Nachbarn**

a) Schreibe `istFrei(int pZeile, int pSpalte)`, die `true` liefert, wenn auf dem Platz nichts liegt. Denke an Plätze **außerhalb** des Gitters.

b) Schreibe `anzahlNachbarn(int pZeile, int pSpalte)`: Wie viele der acht umliegenden Plätze sind belegt?

c) Färbe beim Aufbau jedes Objekt mit mehr als zwei Nachbarn rot ein (`setTint(255, 0, 0)`).

d) Warum ist die Prüfung `pZeile >= 0 && pZeile < gitter.length` in a) unverzichtbar – und warum genügt `gitter[0].length` **nicht** immer als Spaltengrenze?
:::

:::protect{password="java-q-2-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Erst die Grenzen, dann der Zugriff – in dieser Reihenfolge:

```java
public boolean istFrei(int pZeile, int pSpalte) {
    if (pZeile < 0 || pZeile >= gitter.length) {
        return false;
    }
    if (pSpalte < 0 || pSpalte >= gitter[pZeile].length) {
        return false;
    }
    return gitter[pZeile][pSpalte] == null;
}
```

b) Zwei geschachtelte Schleifen von −1 bis 1, den eigenen Platz überspringen:

```java
public int anzahlNachbarn(int pZeile, int pSpalte) {
    int anzahl = 0;
    for (int dz = -1; dz <= 1; dz++) {
        for (int ds = -1; ds <= 1; ds++) {
            if (dz != 0 || ds != 0) {
                if (!istFrei(pZeile + dz, pSpalte + ds)) {
                    anzahl = anzahl + 1;
                }
            }
        }
    }
    return anzahl;
}
```

c) Nach dem Aufbau ein zweiter Durchlauf über das Gitter – **erst** wenn alle Objekte stehen, sonst zählst du Nachbarn, die es noch nicht gibt.

d) Ohne die Grenzprüfung greift das Programm am Rand auf einen Index zu, den es nicht gibt, und stürzt ab. `gitter[0].length` genügt nicht, weil Java **verschieden lange Zeilen** erlaubt – schreibt jemand eine kürzere Zeile in den Plan, ist `gitter[3]` kürzer als `gitter[0]`. Richtig ist immer `gitter[pZeile].length`: die Länge **dieser** Zeile.

:::

:::snippet{#brain}
**Zum Weiterdenken: generisch machen.** Das Gitter kann bisher nur Spielobjekte. Die Logik – anlegen, füllen, Grenzen prüfen, Nachbarn zählen – hat damit aber nichts zu tun.

Schreibe eine [generische Klasse](./03-generische-klassen) `Gitter<T>` mit `setze(z, s, T inhalt)`, `hole(z, s)` und `istFrei(z, s)`. Dann speichert sie ebenso gut Wahrheitswerte für „hier war ich schon" oder Zahlen für eine Wärmekarte.

Eine Falle wartet dabei: `new T[zeilen][spalten]` ist in Java **nicht** erlaubt. Was nimmt man stattdessen – und was handelt man sich damit ein?
:::

## Und ohne Spiel?

| Im Spiel | In den Aufgaben dieses Kapitels |
| --- | --- |
| Plan aus Zeichen → Gitter aus Verweisen | Sitzplan, Spielbrett, Pixelbild |
| `gitter[z][s] == null` | „auf diesem Platz sitzt niemand" |
| Bühne und Gitter laufen auseinander | zwei Variablen zeigen auf dasselbe Feld, eine ändert es |
| `gitter[pZeile].length` statt `gitter[0].length` | das pascalsche Dreieck mit verschieden langen Zeilen |

Die Einsicht, die bleibt: **Ein zweidimensionales Feld speichert Verweise.** Wer das einmal an verschwundenen Münzen gesehen hat, sucht den Fehler in der Klausur nicht mehr im Algorithmus.

---

## Selbsttest

::::multievent

**1. Was steht in einem Feld vom Typ Spielobjekt-Feld auf einem leeren Platz?**

{r1{ein leeres Spielobjekt}}

{r1{!null - also gar kein Verweis}}

{r1{eine 0}}

{h{Ein Feld von Objekten speichert Verweise, keine Objekte.}}
{H{Richtig!}}

**2. Warum blieb die eingesammelte Münze im Gitter stehen?**

{r2{weil remove nur die Anzeige ausschaltet}}

{r2{!weil remove das Objekt von der Bühne nimmt, den zweiten Verweis im Gitter aber nicht kennt}}

{r2{weil das Gitter eine Kopie der Objekte enthält}}

{h{Zwei Stellen zeigten auf dasselbe Objekt.}}
{H{Richtig - das ist der Kern von Lektion 2.2.}}

**3. Welche Spaltengrenze ist beim Durchlaufen immer richtig?**

{r3{gitter-Punkt-length}}

{r3{die Länge der ersten Zeile}}

{r3{!die Länge genau dieser Zeile}}

{h{Java erlaubt verschieden lange Zeilen.}}
{H{Richtig!}}

**4. Was ist der eigentliche Vorteil des Plans aus Zeichenketten?** (Mehrfachauswahl)

{c1{!Ein neues Level entsteht, ohne Programmcode zu ändern.}}

{c1{!Das Level ist lesbar und lässt sich besprechen.}}

{c1{!Dasselbe Level ist zweimal gleich spielbar.}}

{c1{Das Programm wird dadurch schneller.}}

{h{Alle Vorteile betreffen die Menschen, die damit arbeiten.}}
{H{Richtig!}}

**5. Welche Frage beantwortet das Gitter in einem Zugriff, für die man sonst suchen müsste?**

{r4{Wie viele Punkte habe ich?}}

{r4{!Was liegt auf dem Platz links von mir?}}

{r4{Welche Taste ist gedrückt?}}

{h{Zeile und Spalte sind die Adresse.}}
{H{Richtig - ein Zugriff statt einer Schleife über alle Objekte.}}

::::
