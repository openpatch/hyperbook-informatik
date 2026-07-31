---
title: Rekursion
index: 1
---

# Rekursion

Eine Methode darf sich selbst aufrufen. Das klingt nach einem Trick oder nach einem Fehler – es ist aber eine der mächtigsten Ideen der Informatik.

<!-- KLP QPh, Algorithmen: Iterative und rekursive Algorithmen -->

## Der Einstieg

:::snippet{#aufgabe}
Sage **ohne Rechner** voraus, was das Programm ausgibt. Verfolge den Ablauf auf Papier.
:::

:::onlineide{height="480px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Ergebnis: " + fakultaet(4));
}

/**
 * Berechnet die Fakultät von pN, also das Produkt aller Zahlen von 1 bis pN.
 */
int fakultaet(int pN) {
    IO.println("  Aufruf mit " + pN);

    if (pN <= 1) {
        IO.println("  Basisfall erreicht");
        return 1;
    }

    int teilergebnis = pN * fakultaet(pN - 1);
    IO.println("  Rückkehr aus " + pN + " mit " + teilergebnis);
    return teilergebnis;
}
```

:::

::::collapsible{title="Auflösung"}

```
  Aufruf mit 4
  Aufruf mit 3
  Aufruf mit 2
  Aufruf mit 1
  Basisfall erreicht
  Rückkehr aus 2 mit 2
  Rückkehr aus 3 mit 6
  Rückkehr aus 4 mit 24
Ergebnis: 24
```

Erst geht es **vier Ebenen tief hinunter**, dann kommt die Berechnung **auf dem Rückweg** zustande. Das ist der typische Ablauf: Der eigentliche Rechenschritt passiert erst, wenn der rekursive Aufruf zurückgekehrt ist.

::::

## Die zwei Bestandteile

:::snippet{#merken}
Jede rekursive Methode braucht genau zwei Dinge:

1. Einen **Basisfall** – eine Situation, in der die Methode **ohne** weiteren Selbstaufruf antworten kann. Bei der Fakultät: `pN <= 1`.
2. Einen **Rekursionsschritt** – der Selbstaufruf mit einem Argument, das dem Basisfall **näher** kommt. Bei der Fakultät: `fakultaet(pN - 1)`.

Fehlt der Basisfall, oder kommt der Schritt ihm nicht näher, läuft die Rekursion unendlich weiter – bis der Speicher voll ist. Das ist das Gegenstück zur Endlosschleife.
:::

:::snippet{#aufgabe}
Ändere im Programm oben `fakultaet(pN - 1)` zu `fakultaet(pN)` und führe es aus.

Was passiert? Wie unterscheidet sich der Abbruch von dem einer Endlosschleife?
:::

::::collapsible{title="Auflösung"}

Das Programm bricht mit einem Fehler ab: Der Speicher für die Aufrufverwaltung ist voll.

Der Unterschied zur Endlosschleife: Eine Endlosschleife läuft **ewig weiter** und verbraucht keinen zusätzlichen Speicher. Eine endlose Rekursion legt bei jedem Aufruf neuen Speicher an und bricht deshalb nach einiger Zeit ab.

Für die Fehlersuche ist die Rekursion damit sogar freundlicher: Sie meldet sich, statt stumm hängenzubleiben.

::::

## Der Aufrufstapel

Woher weiß Java, wohin es nach `return` zurückkehren muss?

:::snippet{#merken}
Bei jedem Methodenaufruf legt Java einen Eintrag auf den **Aufrufstapel** (englisch *call stack*): die Rücksprungadresse und die lokalen Variablen des Aufrufs. Bei `return` wird der oberste Eintrag wieder heruntergenommen.

Bei `fakultaet(4)` liegen zwischenzeitlich **vier** Einträge übereinander – jeder mit einem eigenen Wert für `pN`. Genau deshalb wissen die Aufrufe nichts voneinander.

Und genau deshalb ist es derselbe Datentyp, den du in der letzten Lektion gebaut hast: ein **Stapel**. Wer zuletzt kam, geht zuerst.
:::

```
Aufruf fakultaet(4)
    ┌──────────────┐
    │ pN = 1       │  ← zuletzt aufgerufen, kehrt zuerst zurück
    ├──────────────┤
    │ pN = 2       │
    ├──────────────┤
    │ pN = 3       │
    ├──────────────┤
    │ pN = 4       │  ← zuerst aufgerufen, kehrt zuletzt zurück
    └──────────────┘
```

## Rekursiv oder iterativ?

:::onlineide{height="560px" speed="1000000"}

```java Main.java
void main() {
    IO.println("rekursiv: " + fakultaetRekursiv(10));
    IO.println("iterativ: " + fakultaetIterativ(10));

    IO.println("Summe rekursiv: " + summeRekursiv(100));
    IO.println("Summe iterativ: " + summeIterativ(100));
}

int fakultaetRekursiv(int pN) {
    if (pN <= 1) {
        return 1;
    }
    return pN * fakultaetRekursiv(pN - 1);
}

int fakultaetIterativ(int pN) {
    int ergebnis = 1;
    for (int i = 2; i <= pN; i++) {
        ergebnis = ergebnis * i;
    }
    return ergebnis;
}

int summeRekursiv(int pN) {
    if (pN <= 0) {
        return 0;
    }
    return pN + summeRekursiv(pN - 1);
}

int summeIterativ(int pN) {
    int summe = 0;
    for (int i = 1; i <= pN; i++) {
        summe = summe + i;
    }
    return summe;
}
```

:::

:::snippet{#aufgabe}
Beide Fassungen liefern dasselbe.

a) Welche findest du besser lesbar? Begründe.

b) Welche braucht mehr Speicher? Warum?

c) In welchen Fällen wäre die rekursive Fassung deutlich im Vorteil?
:::

::::collapsible{title="Auflösung"}

a) Auslegungssache. Die rekursive Fassung bildet die mathematische Definition wörtlich ab: „n! ist n mal (n−1)!“. Die iterative sagt, wie man es ausrechnet. Wer die Definition kennt, findet die Rekursion klarer.

b) Die rekursive. Sie legt für jeden Aufruf einen Eintrag auf den Aufrufstapel – bei `summeRekursiv(100000)` sind das hunderttausend. Die iterative Fassung braucht immer gleich viel.

c) Überall dort, wo die **Struktur der Daten selbst rekursiv** ist:

- Ein Baum besteht aus einem Knoten und **zwei Teilbäumen**, die selbst wieder Bäume sind.
- Ein Ordner enthält Dateien und **Unterordner**, die selbst wieder Ordner sind.
- Ein Term besteht aus Teiltermen.

Bei solchen Strukturen ist die iterative Fassung deutlich umständlicher – man muss sich den Stapel selbst bauen.

::::

## Rekursion in der Grafik

Ein Bild sagt hier mehr als jede Erklärung.

:::onlineide{libraries="scratch" height="640px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    private Pen stift;

    public Buehne() {
        stift = new Pen();
        this.add(stift);
        stift.setSize(2);
        stift.setColor(60, 100, 40);

        zeichneAst(0, -170, 90, 90, 8);
    }

    /**
     * Zeichnet einen Ast und darauf rekursiv zwei kleinere Äste.
     * @param pX x-Koordinate des Astansatzes
     * @param pY y-Koordinate des Astansatzes
     * @param pWinkel Richtung des Astes in Grad
     * @param pLaenge Länge des Astes
     * @param pTiefe wie viele Verzweigungen noch folgen
     */
    private void zeichneAst(double pX, double pY, double pWinkel, double pLaenge, int pTiefe) {
        if (pTiefe == 0) {
            return;
        }

        double bogen = pWinkel * Math.PI / 180;
        double endeX = pX + Math.cos(bogen) * pLaenge;
        double endeY = pY + Math.sin(bogen) * pLaenge;

        stift.setPosition(pX, pY);
        stift.down();
        stift.setPosition(endeX, endeY);
        stift.up();

        zeichneAst(endeX, endeY, pWinkel - 25, pLaenge * 0.72, pTiefe - 1);
        zeichneAst(endeX, endeY, pWinkel + 25, pLaenge * 0.72, pTiefe - 1);
    }
}
```

:::

:::snippet{#aufgabe}
a) Wo ist der Basisfall, wo der Rekursionsschritt?

b) Was passiert, wenn du `pTiefe` von 8 auf 12 erhöhst? Rechne **vorher** aus, wie viele Äste dann gezeichnet werden.

c) Ändere den Verzweigungswinkel von 25 auf 40 und die Schrumpfung von 0.72 auf 0.6. Beschreibe, was sich ändert.
:::

::::collapsible{title="Auflösung"}

a) Der Basisfall ist `pTiefe == 0` – dann wird nichts mehr gezeichnet. Der Rekursionsschritt sind die beiden Aufrufe am Ende, jeweils mit `pTiefe - 1`.

b) Auf jeder Ebene verdoppelt sich die Anzahl: 1 + 2 + 4 + … Bei Tiefe 8 sind das 2⁸ − 1 = **255** Äste, bei Tiefe 12 schon 2¹² − 1 = **4095**.

Das ist **exponentielles** Wachstum – dieselbe Klasse, die du in der Einführungsphase als „prinzipiell unbrauchbar für große Eingaben“ kennengelernt hast. Hier ist es unproblematisch, weil die Tiefe klein bleibt.

c) Der Baum wird breiter und die Äste werden schneller kürzer – er sieht buschiger und gedrungener aus.

::::

## Aufgabe 1: Klassische Rekursionen

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden. Alle sollen **rekursiv** gelöst werden.

Formuliere dir vor jeder Methode zwei Sätze: „Der Basisfall ist …“ und „Sonst gilt: …“.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Rekursiv.java
public class Rekursiv {

    /** Liefert die Summe aller Zahlen von 1 bis pN. Bei pN kleiner 1: 0. */
    public int summe(int pN) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert die pN-te Fibonacci-Zahl.
     * Die ersten beiden sind 0 und 1, jede weitere ist die Summe der beiden davor.
     */
    public int fibonacci(int pN) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert die Anzahl der Ziffern einer nichtnegativen Zahl. Bei 0: eine. */
    public int ziffernzahl(int pZahl) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert die Zeichenkette rückwärts. */
    public String umgekehrt(String pWort) {
        return ""; // ersetze diese Zeile
    }

    /** Prüft rekursiv, ob pWort ein Palindrom ist. */
    public boolean istPalindrom(String pWort) {
        return false; // ersetze diese Zeile
    }
}
```

```java RekursivTest.java
@Test
class RekursivTest {

    @Test
    void testSumme() {
        Rekursiv r = new Rekursiv();
        assertEquals(15, r.summe(5), "1 bis 5 ergibt 15.");
        assertEquals(1, r.summe(1), "Bei 1 ist die Summe 1.");
        assertEquals(0, r.summe(0), "Bei 0 ist die Summe 0.");
        assertEquals(0, r.summe(-3), "Bei negativen Zahlen ebenfalls 0.");
        assertEquals(5050, r.summe(100), "1 bis 100 ergibt 5050.");
    }

    @Test
    void testFibonacci() {
        Rekursiv r = new Rekursiv();
        assertEquals(0, r.fibonacci(0), "Die nullte Fibonacci-Zahl ist 0.");
        assertEquals(1, r.fibonacci(1), "Die erste ist 1.");
        assertEquals(1, r.fibonacci(2), "Die zweite ist 1.");
        assertEquals(2, r.fibonacci(3), "Die dritte ist 2.");
        assertEquals(55, r.fibonacci(10), "Die zehnte ist 55.");
    }

    @Test
    void testZiffernzahl() {
        Rekursiv r = new Rekursiv();
        assertEquals(1, r.ziffernzahl(7), "Die 7 hat eine Ziffer.");
        assertEquals(3, r.ziffernzahl(472), "Die 472 hat drei Ziffern.");
        assertEquals(1, r.ziffernzahl(0), "Die 0 hat eine Ziffer.");
        assertEquals(4, r.ziffernzahl(1000), "Die 1000 hat vier Ziffern.");
    }

    @Test
    void testUmgekehrt() {
        Rekursiv r = new Rekursiv();
        assertEquals("olleh", r.umgekehrt("hello"), "hello rückwärts ist olleh.");
        assertEquals("a", r.umgekehrt("a"), "Ein Zeichen bleibt gleich.");
        assertEquals("", r.umgekehrt(""), "Das leere Wort bleibt leer.");
    }

    @Test
    void testIstPalindrom() {
        Rekursiv r = new Rekursiv();
        assertTrue(r.istPalindrom("otto"), "otto ist ein Palindrom.");
        assertTrue(r.istPalindrom("rentner"), "rentner ist eines.");
        assertFalse(r.istPalindrom("informatik"), "informatik ist keines.");
        assertTrue(r.istPalindrom("a"), "Ein Zeichen ist ein Palindrom.");
        assertTrue(r.istPalindrom(""), "Das leere Wort ebenfalls.");
    }
}
```

:::

::::collapsible{title="Tipp 1: summe"}

Basisfall: Bei `pN <= 0` ist die Summe 0.

Sonst: Die Summe von 1 bis n ist n plus die Summe von 1 bis n−1.

::::

::::collapsible{title="Tipp 2: fibonacci"}

Hier gibt es **zwei** Basisfälle: bei 0 und bei 1.

Sonst ruft sich die Methode **zweimal** auf – mit `pN - 1` und mit `pN - 2`.

::::

::::collapsible{title="Tipp 3: umgekehrt"}

Basisfall: Ein Wort der Länge 0 oder 1 bleibt, wie es ist.

Sonst: Das umgekehrte Wort ist das umgekehrte Wort **ohne den ersten Buchstaben**, und daran hinten der erste Buchstabe.

::::

::::collapsible{title="Tipp 4: istPalindrom"}

Basisfall: Wörter mit weniger als zwei Zeichen sind Palindrome.

Sonst: Stimmen erstes und letztes Zeichen nicht überein, ist es keines. Stimmen sie überein, hängt alles daran, ob der Teil **dazwischen** ein Palindrom ist.

::::

:::protect{password="java-q-3-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Rekursiv.java
public class Rekursiv {

    public int summe(int pN) {
        if (pN <= 0) {
            return 0;
        }
        return pN + summe(pN - 1);
    }

    public int fibonacci(int pN) {
        if (pN <= 0) {
            return 0;
        }
        if (pN == 1) {
            return 1;
        }
        return fibonacci(pN - 1) + fibonacci(pN - 2);
    }

    public int ziffernzahl(int pZahl) {
        if (pZahl < 10) {
            return 1;
        }
        return 1 + ziffernzahl(pZahl / 10);
    }

    public String umgekehrt(String pWort) {
        if (pWort.length() <= 1) {
            return pWort;
        }
        return umgekehrt(pWort.substring(1)) + pWort.charAt(0);
    }

    public boolean istPalindrom(String pWort) {
        if (pWort.length() < 2) {
            return true;
        }
        if (pWort.charAt(0) != pWort.charAt(pWort.length() - 1)) {
            return false;
        }
        return istPalindrom(pWort.substring(1, pWort.length() - 1));
    }
}
```

:::

## Aufgabe 2: Fibonacci ist eine Falle

:::snippet{#aufgabe}
Die rekursive Fibonacci-Methode ist elegant – und katastrophal langsam.

a) Zeichne **auf Papier** den Aufrufbaum für `fibonacci(5)`. Wie oft wird `fibonacci(2)` berechnet?

b) Miss, wie lange `fibonacci(30)` und `fibonacci(35)` brauchen.

c) Erkläre, woher der Aufwand kommt.

d) Schreibe eine **iterative** Fassung und miss sie ebenfalls.
:::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    for (int n = 25; n <= 35; n = n + 5) {
        long start = System.nanoTime();
        int erg = fibRekursiv(n);
        long dauer = (System.nanoTime() - start) / 1000000;
        IO.println("fibRekursiv(" + n + ") = " + erg + "  in " + dauer + " ms");
    }

    long start = System.nanoTime();
    IO.println("fibIterativ(35) = " + fibIterativ(35)
               + "  in " + (System.nanoTime() - start) / 1000000 + " ms");
}

int fibRekursiv(int pN) {
    if (pN <= 0) {
        return 0;
    }
    if (pN == 1) {
        return 1;
    }
    return fibRekursiv(pN - 1) + fibRekursiv(pN - 2);
}

int fibIterativ(int pN) {
    // Dein Code hier
    return 0;
}
```

:::

::::collapsible{title="Tipp zur iterativen Fassung"}

Du brauchst nur die **letzten beiden** Werte zu merken. Starte mit 0 und 1 und schiebe sie in einer Schleife weiter:

```java
int vorletzter = 0;
int letzter = 1;
for (int i = 2; i <= pN; i++) {
    int neu = vorletzter + letzter;
    vorletzter = letzter;
    letzter = neu;
}
```

::::

::::collapsible{title="Auflösung zu a) und c)"}

a) Der Aufrufbaum für `fibonacci(5)`:

```
                    fib(5)
              ┌───────┴───────┐
           fib(4)          fib(3)
        ┌────┴────┐      ┌────┴────┐
     fib(3)    fib(2)  fib(2)   fib(1)
   ┌───┴───┐    ┌─┴─┐   ┌─┴─┐
fib(2) fib(1) fib(1) fib(0) ...
```

`fibonacci(2)` wird **dreimal** berechnet. Bei `fibonacci(30)` wird `fibonacci(2)` über 800 000 Mal berechnet – jedes Mal von vorne.

c) Der Aufwand wächst **exponentiell**, weil sich jeder Aufruf in zwei neue teilt und dabei dieselben Teilprobleme immer wieder gelöst werden.

Die iterative Fassung ist dagegen **linear** – ein Durchlauf genügt.

Merke: Rekursion ist ein Werkzeug, kein Selbstzweck. Wo Teilprobleme sich überlappen, ist sie ohne Zusatzmaßnahmen die schlechtere Wahl.

::::

:::protect{password="java-q-3-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
int fibIterativ(int pN) {
    if (pN <= 0) {
        return 0;
    }
    int vorletzter = 0;
    int letzter = 1;
    for (int i = 2; i <= pN; i++) {
        int neu = vorletzter + letzter;
        vorletzter = letzter;
        letzter = neu;
    }
    return letzter;
}
```

Typische Messwerte: `fibRekursiv(35)` braucht mehrere Sekunden, `fibIterativ(35)` unter einer Millisekunde.

:::

## Zusatzaufgabe

:::snippet{#brain}
Die **Türme von Hanoi**: Drei Stäbe, auf dem ersten liegen n Scheiben, von unten nach oben immer kleiner. Alle sollen auf den dritten Stab – dabei darf immer nur eine Scheibe bewegt werden, und nie eine größere auf eine kleinere.

a) Löse es für n = 3 auf dem Tisch mit Münzen. Wie viele Züge brauchst du?

b) Formuliere die rekursive Idee in zwei Sätzen: Was ist der Basisfall? Und wie führt man n Scheiben auf n−1 zurück?

c) Schreibe eine Methode `bewege(int pAnzahl, String pVon, String pNach, String pHilfe)`, die alle Züge ausgibt.

d) Wie viele Züge braucht das Verfahren für n Scheiben? Welche Wachstumsklasse ist das?
:::

---

## Selbsttest

::::multievent

**1. Welche zwei Bestandteile braucht jede rekursive Methode?** (Mehrfachauswahl)

{c1{!einen Basisfall ohne weiteren Selbstaufruf}}

{c1{!einen Rekursionsschritt, der dem Basisfall näher kommt}}

{c1{eine Schleife}}

{c1{ein Feld}}

{h{Ohne den einen läuft sie ewig, ohne den anderen kommt sie nicht voran.}}
{H{Richtig!}}

**2. Was passiert bei einer Rekursion ohne Basisfall?**

{r1{sie läuft ewig weiter}}

{r1{!sie bricht ab, wenn der Aufrufstapel voll ist}}

{r1{sie liefert null}}

{h{Jeder Aufruf legt einen neuen Eintrag an.}}
{H{Richtig! Anders als eine Endlosschleife meldet sie sich also.}}

**3. Welche Datenstruktur verwaltet die Rücksprünge?**

{r2{eine Schlange}}

{r2{!ein Stapel}}

{r2{ein Feld}}

{h{Wer zuletzt aufgerufen wurde, kehrt zuerst zurück.}}
{H{Richtig! Deshalb heißt er Aufrufstapel.}}

**4. Wann ist eine rekursive Lösung besonders angebracht?**

{r3{wenn es schnell gehen soll}}

{r3{!wenn die Daten selbst rekursiv aufgebaut sind}}

{r3{wenn wenig Speicher zur Verfügung steht}}

{h{Ein Baum besteht aus Teilbäumen, ein Ordner aus Unterordnern.}}
{H{Richtig!}}

**5. Warum ist die rekursive Fibonacci-Methode so langsam?**

{r4{weil Rekursion grundsätzlich langsam ist}}

{r4{!weil dieselben Teilprobleme immer wieder von vorne berechnet werden}}

{r4{weil der Aufrufstapel zu klein ist}}

{h{Denk an den Aufrufbaum, in dem fib von 2 dreimal vorkam.}}
{H{Richtig! Der Aufwand wächst exponentiell.}}

::::
