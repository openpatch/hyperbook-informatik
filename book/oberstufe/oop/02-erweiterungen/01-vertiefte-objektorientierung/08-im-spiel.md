---
title: "Im Spiel: ein Typ für alle Objekte"
index: 8
keywords:
  - java
  - qphase
---

# Im Spiel: ein Typ für alle Objekte

Am Ende der Einführungsphase hast du ein [eigenes Spiel](../../01-grundlagen/08-projekte/03-eigenes-spiel) gebaut. In dieser Lektion baust du daran weiter – mit den Werkzeugen dieses Kapitels.

Neu ist hier **nichts**. Generalisierung, Polymorphie, abstrakte Klassen und Schnittstellen hast du in 1.3 bis 1.6 kennengelernt. Was hier dazukommt, ist die Gelegenheit, sie alle am selben Stück Code hintereinander einzusetzen und dabei zu sehen, was jedes einzelne davon wirklich bewirkt.

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./07-rueckblick) noch die späteren Kapitel setzen sie voraus. Wenn du sie überspringst, fehlt dir nichts.
:::

:::snippet{#merken}
**So arbeitest du mit dieser Seite.** Der Quelltext ist jedes Mal vollständig da. Du baust nichts von vorn – du liest, veränderst und erweiterst. Die interessante Frage ist nie „läuft es?", sondern immer: **„Was musste ich dafür anfassen?"**
:::

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh, Daten und ihre Strukturierung: modellieren objektorientierte Entwuerfe mit Klassen und ihren Beziehungen (M); implementieren Klassen auch unter Nutzung dokumentierter Klassenbibliotheken (I); beurteilen objektorientierte Modellierungen (A). Diese Lektion fuehrt keine neue Kompetenz ein, sondern buendelt 1.2 bis 1.6 an einem durchgehenden Beispiel. Sie ist im GK ohne Stufe 3 zu schaffen. -->

## Woran es hakt

Im Gerüst aus der Einführungsphase gab es genau eine Sorte einzusammelbarer Dinge. Ein Spiel, das Spaß macht, hat mehr: Münzen bringen Punkte, Herzen geben Leben zurück, Fallen kosten welche.

Unten läuft genau das. Steuere den Hasen mit den Pfeiltasten und sammle ein, was du findest.

:::onlineide{libraries="scratch" height="620px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Die Bühne des Spiels. Sie verwaltet den Spielstand.
 */
public class Spiel extends Stage {

    private int punkte;
    private Spieler spieler;
    private Text anzeige;

    public Spiel() {
        punkte = 0;

        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        spieler = new Spieler();
        this.add(spieler);

        for (int i = 0; i < 5; i++) {
            this.add(new Muenze(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }
        for (int i = 0; i < 2; i++) {
            this.add(new Herz(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }
        for (int i = 0; i < 3; i++) {
            this.add(new Falle(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }

        this.aktualisiere();
    }

    /** Erhöht den Spielstand. */
    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        this.aktualisiere();
    }

    /** Schreibt Punkte und Leben in die Anzeige. */
    public void aktualisiere() {
        anzeige.showText("Punkte: " + punkte + "    Leben: " + spieler.getLeben());
    }
}
```

```java Spieler.java
/**
 * Die vom Menschen gesteuerte Figur.
 */
public class Spieler extends Sprite {

    public static final int START_LEBEN = 3;
    private static final int TEMPO = 4;

    private int leben;

    public Spieler() {
        this.addCostume("bunny1_stand");
        this.setSize(50);
        this.setPosition(0, -120);
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
        Spiel spiel = (Spiel) this.getStage();

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

        // Für jede Sorte eine eigene Abfrage.
        Muenze m = this.getTouchingSprite(Muenze.class);
        if (m != null) {
            spiel.zaehle(10);
            m.remove();
        }

        Herz h = this.getTouchingSprite(Herz.class);
        if (h != null) {
            this.heile();
            spiel.aktualisiere();
            h.remove();
        }

        Falle f = this.getTouchingSprite(Falle.class);
        if (f != null) {
            this.verletze();
            spiel.aktualisiere();
            f.remove();
        }
    }
}
```

```java Muenze.java
public class Muenze extends Sprite {

    public Muenze(int pX, int pY) {
        this.addCostume("coin_gold");
        this.setPosition(pX, pY);
    }
}
```

```java Herz.java
public class Herz extends Sprite {

    public Herz(int pX, int pY) {
        this.addCostume("gemRed");
        this.setPosition(pX, pY);
    }
}
```

```java Falle.java
public class Falle extends Sprite {

    public Falle(int pX, int pY) {
        this.addCostume("flame");
        this.setPosition(pX, pY);
    }
}
```

:::

Das Spiel funktioniert. Der Entwurf nicht.

:::snippet{#aufgabe}
**Aufgabe 1: Was kostet eine neue Sorte?**

a) Du möchtest einen **Schlüssel** einbauen, der 50 Punkte bringt. Zähle auf, welche Dateien du dafür anfassen musst.

b) Wie viele Zeilen von `Spieler.run()` handeln von der Steuerung – und wie viele davon, was andere Objekte tun?

c) In [1.4](./04-polymorphie) stand ein Warnzeichen für einen schlechten Entwurf. Welches siehst du hier?
:::

:::protect{password="java-q-1-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zwei: eine neue Datei `Schluessel.java` – und `Spieler.java`, wo die vierte Abfrage dazukommt. Die zweite ist die ärgerliche. Du änderst eine Klasse, die mit Schlüsseln nichts zu tun hat, nur weil es sie jetzt gibt.

b) Dreizehn Zeilen steuern den Hasen, neunzehn handeln davon, was **andere** Objekte tun. `Spieler` ist zur Hälfte eine Klasse über alles andere im Spiel – und jede neue Sorte macht diese Hälfte größer.

c) Das Programm fragt nach dem **konkreten Typ** – dreimal hintereinander. Genau das war das Warnzeichen: Wo `if`-Ketten nach Typen fragen, fehlt einer gemeinsamen Oberklasse eine Methode.

Es gibt noch ein zweites Zeichen, das schwerer wiegt: `Spieler` **weiß**, was eine Münze wert ist (10) und was eine Falle anrichtet. Diese Regeln stehen nicht bei den Objekten, zu denen sie gehören, sondern alle an einer Stelle versammelt. Je größer das Spiel wird, desto größer wird diese eine Methode.

:::

## Stufe 1: eine gemeinsame Oberklasse

Die Frage aus [1.3](./03-generalisierung-und-spezialisierung) lautet: **Was haben Münze, Herz und Falle gemeinsam?**

Am Aussehen liegt es nicht – ein Kostüm ist keine Gemeinsamkeit. Am Verhalten auch nicht: Die drei tun ja gerade *Verschiedenes*. Gemeinsam ist ihnen der **Anlass**: Alle drei tun etwas, wenn der Spieler sie berührt.

:::snippet{#merken}
Nach oben gehört nicht, was gleich **ist**, sondern was jede Unterklasse **beantworten muss**. Die Frage *„Was geschieht bei Berührung?"* stellt sich für alle drei – nur fällt die Antwort jedes Mal anders aus.
:::

Das ergibt eine Oberklasse mit genau einer Methode:

```java
public class Spielobjekt extends Sprite {

    public Spielobjekt(String pKostuem, int pX, int pY) {
        this.addCostume(pKostuem);
        this.setPosition(pX, pY);
    }

    /** Was geschieht, wenn der Spieler dieses Objekt berührt? */
    public void beruehrtVon(Spieler pSpieler) {
    }
}
```

Und damit schrumpft die Kollisionsprüfung in `Spieler.run()` auf drei Zeilen – für immer, egal wie viele Sorten noch dazukommen:

```java
Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
if (getroffen != null) {
    getroffen.beruehrtVon(this);
}
```

Das ist [Polymorphie](./04-polymorphie): Der Aufruf sieht immer gleich aus, ausgeführt wird die Fassung des Objekts, das tatsächlich getroffen wurde.

## Stufe 2: was der Übersetzer erzwingt

Die Fassung oben hat eine Lücke. `beruehrtVon` hat in `Spielobjekt` einen **leeren Rumpf**. Wer eine neue Sorte schreibt und die Methode zu überschreiben vergisst, bekommt keine Fehlermeldung – das Objekt liegt einfach für immer im Weg herum und tut nichts. Man sucht den Fehler dann im Spiel statt im Quelltext.

Genau dafür gibt es [abstrakte Klassen](./05-abstrakte-klassen). Ein `abstract` an zwei Stellen macht aus dem stillen Fehler einen Übersetzungsfehler.

:::onlineide{libraries="scratch" height="700px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Die Bühne des Spiels. Sie verwaltet den Spielstand.
 */
public class Spiel extends Stage {

    private int punkte;
    private Spieler spieler;
    private Text anzeige;

    public Spiel() {
        punkte = 0;

        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        spieler = new Spieler();
        this.add(spieler);

        for (int i = 0; i < 5; i++) {
            this.add(new Muenze(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }
        for (int i = 0; i < 2; i++) {
            this.add(new Herz(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }
        for (int i = 0; i < 3; i++) {
            this.add(new Falle(this.pickRandom(-200, 200), this.pickRandom(-20, 120)));
        }

        this.aktualisiere();
    }

    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        this.aktualisiere();
    }

    public void aktualisiere() {
        anzeige.showText("Punkte: " + punkte + "    Leben: " + spieler.getLeben()
            + "    offen: " + this.count(Spielobjekt.class));
    }
}
```

```java Spielobjekt.java
/**
 * Alles, was im Spiel herumliegt und auf den Spieler reagiert.
 * Von dieser Klasse selbst gibt es kein Objekt.
 */
public abstract class Spielobjekt extends Sprite {

    public Spielobjekt(String pKostuem, int pX, int pY) {
        this.addCostume(pKostuem);
        this.setPosition(pX, pY);
    }

    /** Liefert die Bühne als Spiel - spart das Umwandeln in jeder Unterklasse. */
    protected Spiel spiel() {
        return (Spiel) this.getStage();
    }

    /** Was geschieht, wenn der Spieler dieses Objekt berührt? */
    public abstract void beruehrtVon(Spieler pSpieler);
}
```

```java Muenze.java
public class Muenze extends Spielobjekt {

    public static final int WERT = 10;

    public Muenze(int pX, int pY) {
        super("coin_gold", pX, pY);
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

    public Herz(int pX, int pY) {
        super("gemRed", pX, pY);
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

    public Falle(int pX, int pY) {
        super("flame", pX, pY);
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
/**
 * Die vom Menschen gesteuerte Figur.
 */
public class Spieler extends Sprite {

    public static final int START_LEBEN = 3;
    private static final int TEMPO = 4;

    private int leben;

    public Spieler() {
        this.addCostume("bunny1_stand");
        this.setSize(50);
        this.setPosition(0, -120);
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

        // Eine Abfrage für alle Sorten - und für alle, die noch kommen.
        Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
        if (getroffen != null) {
            getroffen.beruehrtVon(this);
        }
    }
}
```

:::

:::snippet{#merken}
Drei Dinge sind dabei passiert, und jedes hat einen Namen aus diesem Kapitel:

- Die Fallunterscheidung ist aus `Spieler` **verschwunden**. Sie steckt jetzt in der Vererbungshierarchie – jede Sorte weiß selbst, was sie tut ([1.4](./04-polymorphie)).
- `Spielobjekt` ist **abstrakt**. `new Spielobjekt(...)` lehnt der Übersetzer ab, und wer `beruehrtVon` vergisst, erfährt es beim Übersetzen statt beim Spielen ([1.5](./05-abstrakte-klassen)).
- Der Wert einer Münze steht als **Konstante** dort, wo er hingehört: in `Muenze` ([1.2](./02-klassenattribute-und-konstanten)).
:::

:::snippet{#aufgabe}
**Aufgabe 2: die Probe aufs Exempel**

a) Baue den **Schlüssel** ein: ein Objekt mit dem Kostüm `keyBlue`, das bei Berührung 50 Punkte gibt und verschwindet. **Bedingung: Du darfst `Spieler.java` nicht anfassen.**

b) Wie viele Dateien hast du geändert oder angelegt? Vergleiche mit deiner Antwort aus Aufgabe 1a.

c) Baue eine **Bombe**, die *nicht* verschwindet, sondern bei jeder Berührung ein Leben kostet. Welche Zeile aus `Falle` lässt du weg?

d) Lösche in `Muenze` die Methode `beruehrtVon` und übersetze. Welche Meldung kommt – und warum ist sie eine gute Nachricht?
:::

:::protect{password="java-q-1-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Eine neue Datei genügt:

```java
public class Schluessel extends Spielobjekt {

    public static final int WERT = 50;

    public Schluessel(int pX, int pY) {
        super("keyBlue", pX, pY);
    }

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        this.remove();
        s.zaehle(WERT);
    }
}
```

Dazu eine Zeile in `Spiel`, die ein Exemplar erzeugt. Erzeugt werden muss es ja irgendwo – **einmal** muss der konkrete Typ vorkommen, sonst gäbe es das Objekt nicht. Der Unterschied ist, *wo*: beim Aufbau des Spiels, nicht mitten in einer fremden Methode.

b) Vorher zwei Dateien, davon eine fachfremde. Jetzt eine neue Datei und eine Zeile. Das ist der ganze Gewinn dieses Kapitels an einem Beispiel.

c) Das `this.remove()` fällt weg. Sonst nichts.

d) Der Übersetzer meldet, dass `Muenze` die abstrakte Methode `beruehrtVon` nicht umsetzt – entweder ergänzen oder `Muenze` selbst als `abstract` kennzeichnen. Gute Nachricht ist das, weil dieser Fehler in Stufe 1 **lautlos** geblieben wäre: Die Münze hätte den leeren Rumpf der Oberklasse geerbt und beim Einsammeln nichts getan. Ein Fehler, den die Sprache dir abnimmt, ist ein Fehler, den du nicht suchen musst.

:::

## Stufe 3: eine Fähigkeit quer zur Hierarchie

:::alert{info}
**Nur Leistungskurs.** Dieser Abschnitt setzt [1.6 Schnittstellen](./06-schnittstellen) voraus.
:::

Das Spiel soll beim Aufbau vorrechnen, was überhaupt zu holen ist. Münzen und Schlüssel gehören in diese Rechnung – und ein **Zeitbonus** für die Zeit, die am Ende übrig bleibt.

Der Zeitbonus ist das Problem. Er ist kein `Spielobjekt`, er liegt nicht auf der Bühne, er hat kein Kostüm. Trotzdem soll er in derselben Abrechnung auftauchen. Eine gemeinsame Oberklasse gibt es dafür nicht: `Muenze` erbt schon von `Spielobjekt`, und ein Zeitbonus ist kein Sprite.

Genau das ist der Fall aus [1.6](./06-schnittstellen): **Punkte zu bringen ist eine Fähigkeit, keine Art.**

:::onlineide{libraries="scratch" height="700px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Punktebringend.java
/**
 * Etwas, das am Ende in die Abrechnung eingeht.
 * Ob es auf der Bühne liegt, spielt dabei keine Rolle.
 */
public interface Punktebringend {

    /** Liefert die Punkte, die dieser Posten einbringt. */
    int wert();

    /** Liefert eine kurze Bezeichnung für die Abrechnung. */
    String bezeichnung();
}
```

```java Zeitbonus.java
/**
 * Kein Sprite, kein Spielobjekt - und trotzdem punktebringend.
 */
public class Zeitbonus implements Punktebringend {

    private int sekunden;

    public Zeitbonus(int pSekunden) {
        sekunden = pSekunden;
    }

    public int wert() {
        return sekunden * 2;
    }

    public String bezeichnung() {
        return "Zeitbonus (" + sekunden + " s)";
    }
}
```

```java Spiel.java
public class Spiel extends Stage {

    private int punkte;
    private Spieler spieler;
    private Text anzeige;
    private Punktebringend[] posten;

    public Spiel() {
        punkte = 0;

        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        spieler = new Spieler();
        this.add(spieler);

        posten = new Punktebringend[6];

        for (int i = 0; i < 4; i++) {
            Muenze m = new Muenze(this.pickRandom(-200, 200), this.pickRandom(-20, 120));
            this.add(m);
            posten[i] = m;
        }

        Schluessel s = new Schluessel(this.pickRandom(-200, 200), this.pickRandom(-20, 120));
        this.add(s);
        posten[4] = s;

        // Kein Sprite, liegt auf keiner Bühne - und steht trotzdem im selben Feld.
        posten[5] = new Zeitbonus(45);

        this.add(new Falle(0, 0));

        this.aktualisiere();
        this.rechneAb();
    }

    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        this.aktualisiere();
    }

    public void aktualisiere() {
        anzeige.showText("Punkte: " + punkte + "    Leben: " + spieler.getLeben());
    }

    /**
     * Rechnet alle punktebringenden Posten ab - egal, ob sie auf der
     * Bühne liegen oder nicht. Die Schleife sieht keinen Unterschied.
     */
    public void rechneAb() {
        int summe = 0;
        for (int i = 0; i < posten.length; i++) {
            IO.println(posten[i].bezeichnung() + ": " + posten[i].wert());
            summe = summe + posten[i].wert();
        }
        IO.println("Insgesamt erreichbar: " + summe);
    }
}
```

```java Spielobjekt.java
public abstract class Spielobjekt extends Sprite {

    public Spielobjekt(String pKostuem, int pX, int pY) {
        this.addCostume(pKostuem);
        this.setPosition(pX, pY);
    }

    protected Spiel spiel() {
        return (Spiel) this.getStage();
    }

    public abstract void beruehrtVon(Spieler pSpieler);
}
```

```java Muenze.java
public class Muenze extends Spielobjekt implements Punktebringend {

    public static final int WERT = 10;

    public Muenze(int pX, int pY) {
        super("coin_gold", pX, pY);
    }

    public int wert() {
        return WERT;
    }

    public String bezeichnung() {
        return "Münze";
    }

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        this.remove();
        s.zaehle(this.wert());
    }
}
```

```java Schluessel.java
public class Schluessel extends Spielobjekt implements Punktebringend {

    public static final int WERT = 50;

    public Schluessel(int pX, int pY) {
        super("keyBlue", pX, pY);
    }

    public int wert() {
        return WERT;
    }

    public String bezeichnung() {
        return "Schlüssel";
    }

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        this.remove();
        s.zaehle(this.wert());
    }
}
```

```java Falle.java
public class Falle extends Spielobjekt {

    public Falle(int pX, int pY) {
        super("flame", pX, pY);
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
        this.setSize(50);
        this.setPosition(0, -120);
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

`Falle` ist dabei die aufschlussreichste Klasse: Sie ist ein `Spielobjekt` wie die anderen, aber **nicht** punktebringend – und muss deshalb `wert()` und `bezeichnung()` auch nicht anbieten. Eine Oberklasse hätte ihr beides aufgezwungen.

:::snippet{#aufgabe}
**Aufgabe 3: Schnittstelle beurteilen** *(nur LK)*

a) Warum steht `Punktebringend` als Schnittstelle da und nicht als abstrakte Klasse zwischen `Sprite` und `Spielobjekt`? Nenne zwei Gründe.

b) `Zeitbonus` hat kein Kostüm und liegt nicht auf der Bühne. Welche Zeile im Programm wäre nicht übersetzbar, wenn `Punktebringend` eine abstrakte Klasse wäre?

c) Ergänze einen zweiten Posten ohne Sprite: einen `Lebensbonus`, der pro übrigem Leben 25 Punkte bringt. Welche Dateien fasst du an?
:::

:::protect{password="java-q-1-s-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zwei Gründe, und jeder allein genügt:

- `Muenze` erbt bereits von `Spielobjekt`. Für eine zweite Oberklasse ist kein Platz – Java kennt nur **einfache** Vererbung.
- `Zeitbonus` ist kein Sprite. Eine Zwischenklasse unterhalb von `Sprite` könnte ihn gar nicht aufnehmen, ohne ihn zu etwas zu machen, was er nicht ist.

b) Die Zuweisung `posten[5] = new Zeitbonus(45);`. Ein Zeitbonus wäre dann keine Unterklasse des geforderten Typs, und der Übersetzer würde die Zuweisung ablehnen.

c) Eine neue Datei `Lebensbonus.java` und die Abrechnung in `Spiel`, weil das Feld einen Platz mehr braucht. An der Schnittstelle selbst ändert sich **nichts** – und genau daran erkennt man, dass sie richtig geschnitten ist.

:::

## Und ohne Spiel?

Der Umbau auf dieser Seite ist kein Trick für Spiele. Er ist das Muster, nach dem in diesem Kapitel jede Aufgabe gebaut ist – nur fällt es hier schneller auf, weil man den Fehler *sieht*.

| Im Spiel | In den Aufgaben dieses Kapitels |
| --- | --- |
| `Spielobjekt` mit `beruehrtVon` | `Form` mit `flaeche()`, `Sensor` mit `messwert()` |
| Münze, Herz, Falle | Kreis und Quadrat, Thermometer und Hygrometer |
| `if`-Kette nach Sorten in `Spieler` | `if`-Kette nach Fahrzeugtypen in der Mautstelle |
| `Punktebringend` quer zur Hierarchie | `Bezahlbar` für Angestellte **und** Stromrechnungen |

Wer in der Klausur vor einer Fahrzeugverwaltung sitzt, beantwortet dieselbe Frage wie hier: **Welche Frage muss jede Unterklasse beantworten – und wo steht die Antwort?**

:::snippet{#brain}
Zum Weiterdenken: `Spieler` ist bisher **kein** `Spielobjekt`. Wäre es einer, könnten Gegner den Spieler genauso berühren wie er sie.

Was spricht dafür, was dagegen? Prüfe mit dem Satztest aus [1.3](./03-generalisierung-und-spezialisierung) – und überlege, was `beruehrtVon` beim Spieler überhaupt bedeuten würde.
:::

---

## Selbsttest

::::multievent

**1. Wohin gehört im Entwurf die Regel „eine Münze bringt 10 Punkte"?**

{r1{in die Kollisionsabfrage des Spielers}}

{r1{!in die Klasse Muenze}}

{r1{in die Bühne}}

{h{Frage dich, wer diese Regel kennen muss - und wer nur davon betroffen ist.}}
{H{Richtig! Regeln stehen bei dem Objekt, für das sie gelten.}}

**2. Was war der eigentliche Gewinn der gemeinsamen Oberklasse?**

{r2{das Spiel läuft schneller}}

{r2{!eine neue Sorte kommt hinzu, ohne dass bestehender Code sich ändert}}

{r2{es werden weniger Objekte erzeugt}}

{h{Die Probe war die Bedingung in Aufgabe 2a.}}
{H{Richtig!}}

**3. Warum ist Spielobjekt abstrakt?**

{r3{damit es weniger Speicher braucht}}

{r3{!weil es kein Objekt geben soll, das nur „Spielobjekt" ist, und weil jede Unterklasse die Berührung selbst beantworten muss}}

{r3{weil Oberklassen immer abstrakt sind}}

{h{Zwei Gründe, und der zweite ist der wichtigere.}}
{H{Richtig!}}

**4. Was wäre passiert, wenn die Methode in der Oberklasse einen leeren Rumpf behalten hätte und eine Unterklasse sie vergisst?**

{r4{Übersetzungsfehler}}

{r4{!das Objekt tut beim Berühren nichts, ohne jede Meldung}}

{r4{das Programm stürzt beim Berühren ab}}

{h{Sie hätte den leeren Rumpf geerbt.}}
{H{Richtig - und genau solche Fehler sucht man am längsten.}}

**5. Welche Aussagen über die Schnittstelle Punktebringend treffen zu?** (Mehrfachauswahl)

{c1{!Eine Klasse kann sie erfüllen und trotzdem von einer anderen Klasse erben.}}

{c1{!Auch eine Klasse ohne Sprite-Verwandtschaft kann sie erfüllen.}}

{c1{Sie schreibt vor, wie die Punkte berechnet werden.}}

{c1{!Falle muss sie nicht erfüllen, obwohl Falle ein Spielobjekt ist.}}

{h{Eine Schnittstelle sagt, was angeboten werden muss - nicht wie.}}
{H{Richtig!}}

**6. Woran erkennt man beim Lesen, dass eine Fallunterscheidung in die Vererbungshierarchie gehört?**

{r5{sie ist länger als zehn Zeilen}}

{r5{!sie fragt nach dem konkreten Typ des Objekts}}

{r5{sie steht in einer run-Methode}}

{h{Das Warnzeichen aus 1.4.}}
{H{Richtig!}}

::::
