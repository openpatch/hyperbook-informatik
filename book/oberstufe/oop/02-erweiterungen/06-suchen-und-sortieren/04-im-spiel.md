---
title: "Im Spiel: wer steht vorn?"
index: 4
permaid: java-sortierverfahren-im-spiel
keywords:
  - java
  - qphase
---

# Im Spiel: wer steht vorn?

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./03-rueckblick) noch die späteren Kapitel setzen sie voraus.
:::

Sortieren wirkt wie eine Sache für Datenbanken und Listen. Diese Seite zeigt eine Stelle, an der **sechzigmal pro Sekunde** sortiert werden muss – und an der ausgerechnet das langsamste Verfahren des Kapitels das richtige ist.

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh: erlaeutern bzw. vergleichen iterative und rekursive Such- und Sortierverfahren (A); implementieren iterative Such- und Sortierverfahren (I). Wendet Kapitel 6 an, fuehrt nichts Neues ein. Optional. -->

## Woran es hakt

Die Bühne zeichnet ihre Figuren in der Reihenfolge, in der sie hinzugefügt wurden. Für ein Spiel mit Tiefe ist das die falsche Reihenfolge: Was **weiter unten** steht, ist näher am Betrachter und muss **vor** allem anderen gezeichnet werden.

Solange nichts sich bewegt, kann man die Figuren einmal in der richtigen Reihenfolge hinzufügen. Sobald sie sich bewegen, ändert sich die richtige Reihenfolge dauernd – und zwar in **jedem Bild**.

:::snippet{#definition}
Die **Zeichenreihenfolge** ergibt sich aus der y-Koordinate: Wer den kleineren y-Wert hat, steht weiter vorn und wird zuletzt gezeichnet.

Aus einer Menge von Figuren eine Reihenfolge zu machen, ist nichts anderes als **Sortieren** – nur mit der y-Koordinate als Schlüssel.
:::

## Welches Verfahren passt?

Die Reflexantwort lautet Quicksort: O(n·log n) im Mittel, besser geht es nicht. Sie ist hier falsch, und der Grund steht in der Tabelle aus dem [Rückblick](./03-rueckblick):

| Verfahren | mittlerer Fall | erkennt schon sortierte Daten |
| --- | --- | --- |
| Sortieren durch Einfügen | O(n²) | **ja** – dann nur O(n) |
| Quicksort | O(n·log n) | nein |

:::snippet{#brain}
Zwischen zwei Bildern vergeht etwa eine Sechzigstelsekunde. In dieser Zeit bewegt sich keine Figur weit genug, um an einer anderen vorbeizuziehen – meistens jedenfalls.

Das heißt: Das Feld ist beim nächsten Aufruf **schon sortiert**, bis auf ein paar Nachbarn. Genau für diesen Fall ist Sortieren durch Einfügen gebaut. Es geht einmal durch und stellt fest, dass nichts zu tun ist.

Quicksort dagegen teilt und teilt, egal wie die Daten aussehen. Es kann von der Vorarbeit des letzten Bildes nicht profitieren.
:::

Die O-Notation beschreibt das Verhalten bei **wachsender** Eingabe im **allgemeinen** Fall. Sie sagt nichts darüber, welches Verfahren bei *dieser* Eingabegröße und *diesem* Vorwissen schneller ist. Hier ist n klein und die Eingabe fast sortiert – zwei Bedingungen, unter denen sich die Rangfolge umdreht.

## Im Spiel

Unten schwimmen acht Figuren auf und ab. Das Feld wird in jedem Bild neu sortiert, und die Anzeige zählt, **wie viele Verschiebungen** das Sortieren durch Einfügen dafür gebraucht hat.

Sieh der Zahl beim Laufen zu: Sie ist fast immer 0 und springt nur dann kurz hoch, wenn zwei Figuren sich tatsächlich überholen.

:::onlineide{libraries="scratch" height="720px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Sortiert die Figuren in jedem Bild nach ihrer Tiefe.
 */
public class Spiel extends Stage {

    private Figur[] figuren;
    private Text anzeige;
    private int verschiebungen;

    public Spiel() {
        anzeige = new Text("", 0, 155, 460);
        this.add(anzeige);

        figuren = new Figur[8];
        for (int i = 0; i < figuren.length; i++) {
            figuren[i] = new Figur(-190 + i * 55, this.pickRandom(-130, 90));
            this.add(figuren[i]);
        }
    }

    /**
     * Sortieren durch Einfügen, absteigend nach y:
     * großes y (hinten) nach vorn im Feld, kleines y (vorn) ans Ende.
     * Liefert die Zahl der Verschiebungen.
     */
    public int sortiereNachTiefe() {
        int anzahl = 0;
        for (int i = 1; i < figuren.length; i++) {
            Figur aktuell = figuren[i];
            int j = i - 1;
            while (j >= 0 && figuren[j].getY() < aktuell.getY()) {
                figuren[j + 1] = figuren[j];
                j = j - 1;
                anzahl = anzahl + 1;
            }
            figuren[j + 1] = aktuell;
        }
        return anzahl;
    }

    /**
     * Wird in jedem Bild aufgerufen: sortieren und die Ebenen neu setzen.
     */
    public void run() {
        verschiebungen = sortiereNachTiefe();

        // Wer im Feld hinten steht, kommt auf der Bühne nach vorn.
        for (int i = 0; i < figuren.length; i++) {
            figuren[i].goToFrontLayer();
        }

        anzeige.showText("Figuren: " + figuren.length
            + "    Verschiebungen in diesem Bild: " + verschiebungen);
    }
}
```

```java Figur.java
/**
 * Eine Figur, die langsam auf und ab schwimmt.
 */
public class Figur extends Sprite {

    private int tempo;

    public Figur(int pX, int pY) {
        this.addCostume("bunny1_stand");
        this.setSize(45);
        this.setPosition(pX, pY);
        tempo = this.pickRandom(1, 2);
        if (this.pickRandom(0, 1) == 0) {
            tempo = -tempo;
        }
    }

    public void run() {
        this.changeY(tempo);
        if (this.getY() > 90 || this.getY() < -130) {
            tempo = -tempo;
        }
    }
}
```

:::

:::snippet{#aufgabe}
**Aufgabe 1: messen statt glauben**

a) Sage voraus, wie viele Verschiebungen im **ersten** Bild nötig sind, und vergleiche mit der Anzeige. Warum ist gerade dieser erste Wert so viel größer als alle folgenden?

b) Erhöhe das Tempo der Figuren auf 8. Was macht die Zahl – und warum?

c) Setze die Zahl der Figuren auf 40. Bleibt die Zahl der Verschiebungen klein? Wie viele **Vergleiche** macht das Verfahren dabei mindestens pro Bild, auch wenn nichts zu tun ist?

d) Ersetze das Sortieren durch Einfügen durch [Quicksort](./01-quicksort). Zähle die Vergleiche statt der Verschiebungen. Was ändert sich an der Zahl, wenn das Feld schon sortiert ist?
:::

:::protect{password="java-q-6-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Im ersten Bild sind die y-Werte zufällig, das Feld ist also unsortiert – da fallen je nach Zufall zwanzig bis dreißig Verschiebungen an. Ab dem zweiten Bild ist das Feld **schon sortiert**, weil es im Bild davor sortiert wurde und sich seither fast nichts geändert hat. Sortieren durch Einfügen prüft das in einem Durchlauf und tut nichts.

b) Sie wird größer und bleibt öfter über 0: Bei hohem Tempo ziehen Figuren zwischen zwei Bildern tatsächlich aneinander vorbei. Der Vorteil „fast sortiert" hängt also nicht am Verfahren, sondern an der Frage, **wie stark sich die Daten zwischen zwei Durchläufen ändern**.

c) Die Verschiebungen bleiben klein, weil die Reihenfolge fast stimmt. Die **Vergleiche** nicht: Das Verfahren muss jedes Element mindestens einmal mit seinem Vorgänger vergleichen, also n−1 = 39 Vergleiche pro Bild, auch im besten Fall. Das ist der Grund, warum der beste Fall O(n) ist und nicht O(1).

d) Quicksort macht bei sortierter Eingabe **genauso viele** Vergleiche wie bei unsortierter – es sieht der Eingabe nicht an, dass sie sortiert ist. Bei sortierter Eingabe und der linken Trennelement-Wahl gerät es sogar in seinen schlechtesten Fall O(n²). Das Verfahren mit der besseren O-Notation ist hier also nicht nur nicht besser, sondern schlechter.

:::

## Die Bestenliste

Am Ende einer Runde will man wissen, auf welchem Platz man steht. Hier sieht es anders aus: Die Punktzahlen kommen **unsortiert** an, es sind viele, und sortiert wird **einmal**. Das ist genau der Fall, für den Quicksort gebaut ist.

:::snippet{#aufgabe}
**Aufgabe 2: Bestenliste**

a) Sortiere ein Feld `int[] punkte` mit Quicksort absteigend und gib die besten fünf aus.

b) Schreibe `platzVon(int[] pPunkte, int pWert)`: Auf welchem Platz steht diese Punktzahl in der sortierten Bestenliste? Nutze die **binäre Suche** – und achte darauf, dass absteigend sortiert ist.

c) Warum darf man die binäre Suche hier überhaupt einsetzen, bei den Figuren aber nicht?

d) Eine neue Punktzahl kommt dazu. Vergleiche zwei Vorgehen: alles neu sortieren, oder die Zahl mit binärer Suche einordnen und einfügen. Welches ist bei 10 Einträgen besser, welches bei 10 000?
:::

:::protect{password="java-q-6-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Quicksort wie in [6.1](./01-quicksort), nur mit umgedrehtem Vergleich – oder aufsteigend sortieren und das Feld rückwärts ausgeben.

b) Bei absteigender Sortierung dreht sich die Fallunterscheidung um: Ist der gesuchte Wert **größer** als die Mitte, liegt er in der **linken** Hälfte.

```java
public int platzVon(int[] pPunkte, int pWert) {
    int links = 0;
    int rechts = pPunkte.length - 1;
    while (links <= rechts) {
        int mitte = (links + rechts) / 2;
        if (pPunkte[mitte] == pWert) {
            return mitte + 1;
        }
        if (pPunkte[mitte] < pWert) {
            rechts = mitte - 1;
        } else {
            links = mitte + 1;
        }
    }
    return -1;
}
```

c) Weil die binäre Suche **sortierte** Daten voraussetzt. Die Bestenliste ist sortiert und ändert sich selten. Die Figuren ändern ihre y-Werte in jedem Bild – zwischen zwei Bildern ist die Sortierung gerade **nicht** gesichert, und eine binäre Suche in unsortierten Daten liefert nicht etwa eine langsame Antwort, sondern eine **falsche**.

d) Bei 10 Einträgen ist es gleichgültig; der Unterschied verschwindet im Rauschen. Bei 10 000 ist Einfügen deutlich besser: Die Stelle findet die binäre Suche in etwa 14 Schritten, das Verschieben kostet O(n) – zusammen viel weniger als ein vollständiges Sortieren mit O(n·log n). **Die richtige Frage ist nicht „welches Verfahren ist schnell", sondern „was weiß ich schon über meine Daten".**

:::

## Und ohne Spiel?

| Im Spiel | Dieselbe Überlegung woanders |
| --- | --- |
| in jedem Bild neu sortieren, Daten fast sortiert | Messwerte, die laufend nachkommen; Tabellen, die sich kaum ändern |
| einmal sortieren, viele Daten | Bestenliste, Suchergebnisse, Notenliste |
| binäre Suche in der Bestenliste | Nachschlagen in einem sortierten Verzeichnis |
| Quicksort im schlechtesten Fall | vorsortierte Eingabe bei fester Trennelement-Wahl |

Die Einsicht des Kapitels lautet nicht „Quicksort ist das beste Verfahren". Sie lautet: **Welches Verfahren passt, entscheidet nicht die O-Notation allein, sondern das, was man über die Daten weiß.**

---

## Selbsttest

::::multievent

**1. Wonach richtet sich die Zeichenreihenfolge im Spiel?**

{r1{nach der Reihenfolge des Hinzufügens}}

{r1{!nach der y-Koordinate - wer weiter vorn steht, wird zuletzt gezeichnet}}

{r1{nach der Größe der Figur}}

{h{Was weiter unten steht, ist näher am Betrachter.}}
{H{Richtig!}}

**2. Warum ist Sortieren durch Einfügen hier die bessere Wahl als Quicksort?**

{r2{weil es weniger Speicher braucht}}

{r2{!weil das Feld in jedem Bild schon fast sortiert ist und das Verfahren das erkennt}}

{r2{weil es rekursiv arbeitet}}

{h{Zwischen zwei Bildern ändert sich fast nichts.}}
{H{Richtig!}}

**3. Wie viele Vergleiche braucht Sortieren durch Einfügen bei bereits sortierter Eingabe mindestens?**

{r3{gar keine}}

{r3{!einen je Element, also n−1}}

{r3{genauso viele wie im schlechtesten Fall}}

{h{Jedes Element wird einmal mit seinem Vorgänger verglichen.}}
{H{Richtig - deshalb ist der beste Fall O(n) und nicht O(1).}}

**4. Was passiert mit Quicksort bei sortierter Eingabe und fester Wahl des linken Trennelements?**

{r4{es wird schneller}}

{r4{!es gerät in seinen schlechtesten Fall mit O(n²)}}

{r4{es bricht ab}}

{h{Jede Teilung trennt genau ein Element ab.}}
{H{Richtig!}}

**5. Welche Aussagen über die binäre Suche treffen zu?** (Mehrfachauswahl)

{c1{!Sie setzt sortierte Daten voraus.}}

{c1{!In unsortierten Daten liefert sie ein falsches Ergebnis, nicht nur ein langsames.}}

{c1{!Sie eignet sich für die Bestenliste, nicht für die Figuren im laufenden Bild.}}

{c1{Sie funktioniert auch, wenn die Daten nur ungefähr sortiert sind.}}

{h{Ungefähr sortiert genügt nicht - jeder Schritt verwirft die halbe Menge endgültig.}}
{H{Richtig!}}

::::
