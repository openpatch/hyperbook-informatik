---
name: "Im Spiel: Wellen, Weg zurück, Bestand"
index: 5
lang: de
permaid: java-datenstrukturen-im-spiel
keywords:
  - java
  - qphase
---

# Im Spiel: Wellen, Weg zurück, Bestand

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./rueckblick) noch die späteren Kapitel setzen sie voraus.
:::

Stapel, Schlange und Liste unterscheiden sich nicht darin, **was** sie speichern, sondern darin, **wer als Nächstes drankommt**. Diese Seite zeigt alle drei im selben Spiel – jede an der Stelle, an der ihre Antwort auf diese Frage die richtige ist.

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh: erlaeutern Operationen dynamischer Datenstrukturen (A); implementieren Algorithmen unter Verwendung von Datenstrukturen (I). Wendet Kapitel 4 an, fuehrt nichts Neues ein. Optional. Der Block laedt beide Bibliotheken: libraries="nrw,scratch". -->

:::snippet{#merken}
Die Programmierbereiche dieser Seite laden **beide** Bibliotheken – im Attribut `libraries` stehen sie kommasepariert: `nrw,scratch`.

Damit stehen `Stack`, `Queue` und `List` der NRW-Klassenbibliothek zusammen mit `Stage` und `Sprite` zur Verfügung. Es sind dieselben Klassen wie im Rest des Kapitels – nur diesmal mit etwas darin, das man sieht.
:::

## Drei Fragen, drei Strukturen

| Was das Spiel braucht | Wer kommt als Nächstes dran? | Struktur |
| --- | --- | --- |
| Gegnerwellen nacheinander | die **zuerst** eingeplante Welle | Schlange |
| zurück zum letzten sicheren Platz | der **zuletzt** besuchte Platz | Stapel |
| alle noch offenen Gegenstände durchgehen | jeder, der Reihe nach | Liste |

Das ist keine willkürliche Zuordnung. Jede dieser drei Fragen hat genau eine passende Antwort, und wer die falsche Struktur nimmt, merkt es sofort.

## Die Schlange: Wellen

Gegner kommen nicht alle auf einmal, sondern in Wellen. Die Welle, die zuerst eingeplant wurde, kommt zuerst – **FIFO**, das ist die [Warteschlange](./warteschlange).

```java
wellen = new Queue<String>();
wellen.enqueue("MMM");
wellen.enqueue("MMFF");
wellen.enqueue("MHFFF");
```

Jede Welle ist eine Zeichenkette, in der jedes Zeichen für einen Gegenstand steht. Ist die Bühne leer, wird die nächste Welle entnommen.

:::snippet{#merken}
Die Schlange **vergisst**, was sie herausgegeben hat. Genau das ist hier richtig: Eine gespielte Welle kommt nicht wieder.

Und sie kennt keine Position. Man kann sie nicht fragen „was ist die dritte Welle?" – nur „was kommt als Nächstes?". Für Wellen ist das keine Einschränkung, sondern eine Zusicherung.
:::

## Der Stapel: der Weg zurück

Der Spieler hinterlässt bei jedem Schritt seine Position auf einem Stapel. Drückt man die **Leertaste**, wird der oberste Platz entnommen, und die Figur springt dorthin zurück – Schritt für Schritt rückwärts durch die eigene Spur.

Das geht nur mit einem Stapel. Der zuletzt besuchte Platz muss als Erstes zurückkommen: **LIFO**.

:::snippet{#brain}
Warum speichert der Stapel die **Position** und nicht das Objekt?

Weil ein `remove()` in dieser Bibliothek endgültig ist: Eine entfernte Figur lässt sich nicht wieder auf die Bühne setzen. Ein Stapel aus Figuren wäre also ein Stapel aus Erinnerungen an Dinge, die es nicht mehr gibt.

Daten kann man aufheben, Objekte nicht immer. Diese Unterscheidung ist keine Eigenart der Bibliothek – sie ist derselbe Gedanke wie bei den Referenzen in [2.2](../02-felder-referenzen-generik/02-referenzen).
:::

## Die Liste: der Bestand

Die Bühne weiß, welche Figuren sie zeichnet. Aber das Spiel braucht eine eigene Auskunft: **Welche Gegenstände dieser Welle sind noch offen?** Dafür führt es eine Liste und durchläuft sie mit `toFirst`, `hasAccess`, `next`.

:::onlineide{libraries="nrw,scratch" height="760px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Verwaltet Wellen (Schlange) und den Bestand einer Welle (Liste).
 */
public class Spiel extends Stage {

    private Queue<String> wellen;
    private List<Spielobjekt> bestand;
    private int punkte;
    private int wellennummer;
    private Spieler spieler;
    private Text anzeige;

    public Spiel() {
        punkte = 0;
        wellennummer = 0;

        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        spieler = new Spieler();
        this.add(spieler);

        wellen = new Queue<String>();
        wellen.enqueue("MMM");
        wellen.enqueue("MMFF");
        wellen.enqueue("MHFFF");

        bestand = new List<Spielobjekt>();

        naechsteWelle();
    }

    /** Entnimmt die vorderste Welle und baut sie auf. */
    public void naechsteWelle() {
        if (wellen.isEmpty()) {
            anzeige.showText("Alle Wellen geschafft! Punkte: " + punkte);
            return;
        }

        String welle = wellen.front();
        wellen.dequeue();
        wellennummer = wellennummer + 1;

        bestand = new List<Spielobjekt>();

        for (int i = 0; i < welle.length(); i++) {
            Spielobjekt o = erzeuge(welle.charAt(i));
            if (o != null) {
                this.add(o);
                bestand.append(o);
            }
        }

        this.aktualisiere();
    }

    public Spielobjekt erzeuge(char pZeichen) {
        int x = this.pickRandom(-200, 200);
        int y = this.pickRandom(-20, 120);
        if (pZeichen == 'M') {
            return new Muenze(x, y);
        }
        if (pZeichen == 'H') {
            return new Herz(x, y);
        }
        if (pZeichen == 'F') {
            return new Falle(x, y);
        }
        return null;
    }

    /** Streicht ein eingesammeltes Objekt aus dem Bestand. */
    public void streiche(Spielobjekt pObjekt) {
        bestand.toFirst();
        while (bestand.hasAccess()) {
            if (bestand.getContent() == pObjekt) {
                bestand.remove();
                return;
            }
            bestand.next();
        }
    }

    /** Zählt, wie viele Gegenstände dieser Welle noch offen sind. */
    public int offen() {
        int anzahl = 0;
        bestand.toFirst();
        while (bestand.hasAccess()) {
            anzahl = anzahl + 1;
            bestand.next();
        }
        return anzahl;
    }

    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        this.aktualisiere();
    }

    public void aktualisiere() {
        anzeige.showText("Welle " + wellennummer + "    Punkte: " + punkte
            + "    offen: " + offen() + "    Leben: " + spieler.getLeben());
    }

    /** Ist die Welle abgeräumt, kommt die nächste. */
    public void run() {
        if (bestand.isEmpty() && !wellen.isEmpty()) {
            naechsteWelle();
        }
    }
}
```

```java Spielobjekt.java
public abstract class Spielobjekt extends Sprite {

    public Spielobjekt(String pKostuem, int pX, int pY) {
        this.addCostume(pKostuem);
        this.setSize(40);
        this.setPosition(pX, pY);
    }

    protected Spiel spiel() {
        return (Spiel) this.getStage();
    }

    /**
     * Nimmt sich aus Bestand und Bühne.
     *
     * Die Bühne wird vorher in einer Variablen festgehalten: Nach remove()
     * gehört das Objekt zu keiner Bühne mehr, und getStage() ist dann nicht
     * mehr zu gebrauchen.
     */
    protected void verschwinde() {
        Spiel s = this.spiel();
        s.streiche(this);
        this.remove();
        s.aktualisiere();
    }

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
        this.spiel().zaehle(WERT);
        this.verschwinde();
    }
}
```

```java Herz.java
public class Herz extends Spielobjekt {

    public Herz(int pX, int pY) {
        super("gemRed", pX, pY);
    }

    public void beruehrtVon(Spieler pSpieler) {
        pSpieler.heile();
        this.verschwinde();
    }
}
```

```java Falle.java
public class Falle extends Spielobjekt {

    public Falle(int pX, int pY) {
        super("flame", pX, pY);
    }

    public void beruehrtVon(Spieler pSpieler) {
        pSpieler.verletze();
        this.verschwinde();
    }
}
```

```java Spieler.java
/**
 * Merkt sich jeden Platz auf einem Stapel. Leertaste springt zurück.
 */
public class Spieler extends Sprite {

    public static final int START_LEBEN = 3;
    private static final int TEMPO = 4;

    private int leben;
    private Stack<Platz> spur;
    private boolean tasteWarUnten;

    public Spieler() {
        this.addCostume("bunny1_stand");
        this.setSize(50);
        this.setPosition(0, -120);
        leben = START_LEBEN;
        spur = new Stack<Platz>();
        tasteWarUnten = false;
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
        if (this.isKeyPressed(KeyCode.SPACE)) {
            // Nur beim ersten Bild des Tastendrucks einen Schritt zurück.
            if (!tasteWarUnten && !spur.isEmpty()) {
                Platz p = spur.top();
                spur.pop();
                this.setPosition(p.getX(), p.getY());
            }
            tasteWarUnten = true;
            return;
        }
        tasteWarUnten = false;

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
        this.ifOnEdgeBounce();

        // Hat sich etwas bewegt? Dann den alten Platz auf den Stapel legen.
        if (this.getX() != altX || this.getY() != altY) {
            spur.push(new Platz(altX, altY));
        }

        Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
        if (getroffen != null) {
            getroffen.beruehrtVon(this);
        }
    }
}
```

```java Platz.java
/**
 * Eine gemerkte Position. Daten, kein Sprite - deshalb aufhebbar.
 */
public class Platz {

    private double x;
    private double y;

    public Platz(double pX, double pY) {
        x = pX;
        y = pY;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
```

:::

Spiele eine Welle, halte dann die **Leertaste** gedrückt und sieh der Figur beim Rückwärtslaufen zu. Sie läuft die Spur ab, die du selbst gelegt hast – rückwärts, weil ein Stapel nichts anderes kann.

:::snippet{#aufgabe}
**Aufgabe 1: die Strukturen ausreizen**

a) Vertausche Schlange und Stapel: Speichere die Wellen in einem `Stack`. In welcher Reihenfolge kommen sie – und warum ist das für Wellen falsch?

b) Der Stapel wächst bei jedem Schritt. Schätze: Wie viele Plätze liegen nach zehn Sekunden Laufen darauf? (Die `run`-Methode läuft etwa 60-mal pro Sekunde.) Was bedeutet das für den Speicherbedarf?

c) Begrenze die Spur auf die letzten 200 Plätze. Warum ist das mit einem **Stapel** unangenehm – und welche Struktur könnte beides, vorn wegnehmen und hinten anhängen?

d) Zeige die Zahl der Plätze auf dem Stapel in der Anzeige an. Der NRW-Stapel hat kein `anzahl()` – wie kommst du trotzdem an die Zahl, **ohne** den Stapel zu zerstören?
:::

:::protect{password="java-q-4-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Sie kommen rückwärts: Die zuletzt eingeplante Welle wird zuerst gespielt. Für Wellen ist das falsch, weil die Reihenfolge **fachlich** festliegt – die erste Welle ist die leichteste. Ein Stapel kehrt jede Reihenfolge um; das ist seine Eigenschaft, nicht sein Fehler.

b) Etwa 600 Plätze, wenn durchgehend gelaufen wird. Jeder Platz sind zwei Kommazahlen plus die Verwaltung des Knotens. Das ist hier unkritisch, zeigt aber das Muster: **Wer jede Änderung mitschreibt, zahlt mit Speicher, der mit der Spielzeit wächst.** Deshalb begrenzen echte Spiele ihre Rückgängig-Historie.

c) Unangenehm, weil man beim Stapel nur **oben** herankommt – der älteste Platz liegt ganz unten. Um ihn zu entfernen, müsste man den ganzen Stapel abtragen und wieder aufbauen. Was beides kann, ist eine **Liste**: `toFirst()` und `remove()` entfernen vorn, `append(...)` hängt hinten an.

d) Alles abtragen und dabei zählen – aber jedes entnommene Element sofort auf einen **Hilfsstapel** legen und danach zurückschieben. Zweimal umschichten stellt die ursprüngliche Reihenfolge wieder her. Eleganter ist es, die Zahl beim `push` und `pop` einfach **mitzuführen**.

:::

:::snippet{#aufgabe}
**Aufgabe 2: die Liste befragen**

a) `offen()` läuft jedes Mal durch die ganze Liste. Wie oft passiert das pro Sekunde – und was würdest du stattdessen tun?

b) Schreibe `wertDerWelle()`: die Summe der Punkte, die in dieser Welle noch zu holen sind. Nur Münzen zählen.

c) Warum steht in `streiche` ein Vergleich mit `==` und nicht mit `equals`? Was würde `equals` hier vergleichen?

d) Was passiert, wenn du in `streiche` das `return` nach dem `remove()` weglässt? Sage es voraus, bevor du es ausprobierst.
:::

:::protect{password="java-q-4-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Etwa 60-mal pro Sekunde, weil `aktualisiere()` es aufruft. Bei fünf Gegenständen ist das egal; bei fünfhundert nicht mehr. Statt zu zählen führt man einen **Zähler mit** – erhöhen beim Anhängen, verringern beim Streichen. Das ist derselbe Gedanke wie in [7.2](../07-testen-und-laufzeit/02-laufzeit-und-komplexitaet): Ein Wert, der sich selten ändert, aber oft gebraucht wird, wird gespeichert und nicht jedes Mal neu berechnet.

b) Durchlaufen und bei jedem Element prüfen, ob es eine Münze ist. Sauberer ist es, `Spielobjekt` eine Methode `wert()` zu geben, die bei Herz und Falle 0 liefert – dann braucht die Schleife keine Fallunterscheidung mehr.

c) `==` vergleicht die **Verweise**: Ist das dasselbe Objekt? Genau das ist gemeint – es soll ja dieses eine eingesammelte Ding gestrichen werden. `equals` vergleicht Inhalte; ohne eigene Fassung tut es dasselbe wie `==`, mit eigener Fassung könnte es zwei **verschiedene** Münzen gleichen Werts für gleich halten und die falsche streichen.

d) Nach `remove()` steht die aktuelle Position auf dem **Nachfolger**. Die Schleife liefe weiter und verglich weiter – harmlos, weil das Objekt nur einmal in der Liste steht. Aber `bestand.next()` würde danach ein Element überspringen. Genau diese Stelle ist die häufigste Fehlerquelle beim Entfernen während eines Durchlaufs: **Nach dem Entfernen darf man nicht weiterschalten.**

:::

## Und ohne Spiel?

| Im Spiel | Dieselbe Struktur woanders |
| --- | --- |
| Wellen der Reihe nach | Druckaufträge, Warteschlange an der Kasse, Nachrichten im Postfach |
| Weg zurück, Schritt für Schritt | Rückgängig im Textprogramm, Zurück-Knopf im Browser, Aufrufstapel |
| Bestand der offenen Gegenstände | Warenkorb, Teilnehmerliste, alle Nachrichten eines Chats |

Wer in der Klausur entscheiden muss, welche Struktur passt, stellt genau eine Frage: **Wer kommt als Nächstes dran – der Erste, der Letzte, oder alle der Reihe nach?**

---

## Selbsttest

::::multievent

**1. Warum ist für die Wellen eine Schlange richtig und ein Stapel falsch?**

{r1{weil die Schlange schneller ist}}

{r1{!weil die zuerst eingeplante Welle zuerst gespielt werden soll}}

{r1{weil ein Stapel keine Zeichenketten speichern kann}}

{h{FIFO gegen LIFO.}}
{H{Richtig!}}

**2. Warum speichert der Stapel Positionen und keine Figuren?**

{r2{weil Figuren zu viel Speicher brauchen}}

{r2{!weil eine entfernte Figur sich nicht wieder auf die Bühne setzen lässt}}

{r2{weil ein Stapel nur Zahlen aufnehmen kann}}

{h{Daten kann man aufheben, Objekte nicht immer.}}
{H{Richtig!}}

**3. Was kostet es, bei jedem Schritt die Position mitzuschreiben?**

{r3{nichts, der Stapel ist beliebig groß}}

{r3{!Speicher, der mit der Spielzeit wächst}}

{r3{Rechenzeit beim Zeichnen}}

{h{Etwa 60 Plätze pro Sekunde.}}
{H{Richtig - deshalb begrenzen echte Programme ihre Historie.}}

**4. Welche Aussagen über die Liste treffen zu?** (Mehrfachauswahl)

{c1{!Sie wird mit toFirst, hasAccess und next durchlaufen.}}

{c1{!Man kann an jeder Stelle entfernen, nicht nur vorn oder hinten.}}

{c1{!Nach dem Entfernen steht die Position schon auf dem Nachfolger.}}

{c1{Sie liefert die Anzahl ihrer Elemente in einem Zugriff.}}

{h{Die NRW-Liste hat keine Methode für die Anzahl.}}
{H{Richtig!}}

**5. Ein Wert wird oft gebraucht und ändert sich selten. Was tut man?**

{r4{ihn jedes Mal neu berechnen, das ist sicherer}}

{r4{!ihn mitführen und bei jeder Änderung anpassen}}

{r4{ihn in einer Datei speichern}}

{h{60 Durchläufe pro Sekunde für eine Zahl, die sich alle paar Sekunden ändert.}}
{H{Richtig!}}

::::
