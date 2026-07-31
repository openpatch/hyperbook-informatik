---
title: Rückgabewerte
index: 2
---

# Rückgabewerte

Bisher haben deine Methoden etwas **getan** – gezeichnet oder ausgegeben. Jetzt sollen sie etwas **liefern**, mit dem du weiterrechnen kannst.

## Wieder ein schlechtes Beispiel

:::snippet{#aufgabe}
Lies das Programm und beschreibe, was daran unpraktisch ist. Denk daran, was du mit den drei Ergebnissen anschließend noch machen könntest.
:::

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    gibSummeAus(5);
    gibSummeAus(10);
    gibSummeAus(100);
}

void gibSummeAus(int pZahl) {
    int summe = 0;
    for (int i = 1; i <= pZahl; i++) {
        summe = summe + i;
    }
    IO.println("Summe bis " + pZahl + ": " + summe);
}
```

:::

::::collapsible{title="Auflösung"}

Die Methode **gibt aus** statt **zu liefern**. Damit ist das Ergebnis für das aufrufende Programm verloren:

- Du kannst die drei Summen nicht addieren.
- Du kannst nicht prüfen, ob eine davon größer als 1000 ist.
- Du kannst sie nicht in einer Datei speichern oder auf die Bühne zeichnen.

Die Methode legt außerdem gleich zwei Dinge fest: **wie gerechnet** wird *und* **wie ausgegeben** wird. Das sind zwei verschiedene Zuständigkeiten.

::::

## Die Lösung: return

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int a = summeBis(5);
    int b = summeBis(10);
    int c = summeBis(100);

    IO.println("a = " + a);
    IO.println("b = " + b);
    IO.println("Zusammen: " + (a + b + c));

    if (summeBis(50) > 1000) {
        IO.println("Die Summe bis 50 ist größer als 1000.");
    }
}

/**
 * Berechnet die Summe aller ganzen Zahlen von 1 bis pZahl.
 * @param pZahl obere Grenze
 * @return die berechnete Summe
 */
int summeBis(int pZahl) {
    int summe = 0;
    for (int i = 1; i <= pZahl; i++) {
        summe = summe + i;
    }
    return summe;
}
```

:::

:::snippet{#merken}
- Statt `void` steht jetzt der **Rückgabetyp** vor dem Methodennamen: `int summeBis(...)`.
- Die Anweisung `return summe;` beendet die Methode **sofort** und liefert den Wert zurück.
- Der Aufruf `summeBis(5)` ist danach ein **Ausdruck** mit einem Wert – du kannst ihn überall verwenden, wo eine Zahl stehen darf.
- Jeder Weg durch die Methode muss auf ein `return` treffen, sonst meldet die IDE einen Fehler.
:::

## Wann mit, wann ohne Rückgabewert?

:::snippet{#aufgabe}
Entscheide für jede Methode, ob sie besser mit oder ohne Rückgabewert gebaut wird. Begründe.

a) Den Flächeninhalt eines Kreises bestimmen

b) Eine Willkommensmeldung anzeigen

c) Prüfen, ob eine Zahl eine Primzahl ist

d) Einen Baum auf die Bühne zeichnen

e) Den größeren von zwei Werten ermitteln
:::

::::collapsible{title="Auflösung"}

| | Rückgabewert? | Begründung |
| --- | --- | --- |
| a) Kreisfläche | **ja**, `double` | ein Ergebnis, mit dem weitergerechnet wird |
| b) Willkommensmeldung | nein, `void` | die Wirkung *ist* die Ausgabe |
| c) Primzahltest | **ja**, `boolean` | das Ergebnis wird für eine Entscheidung gebraucht |
| d) Baum zeichnen | nein, `void` | die Wirkung *ist* die Zeichnung |
| e) Größerer Wert | **ja**, `int` | ein Ergebnis, das weiterverwendet wird |

:::snippet{#merken}
**Faustregel:** Berechnet die Methode etwas, gib es zurück. Bewirkt sie etwas (Ausgabe, Zeichnung), reicht `void`.

Wer beides in einer Methode vermischt, macht sie schwerer wiederverwendbar.
:::

::::

## Methoden, die Wahrheitswerte liefern

:::onlineide{height="500px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Ist 7 gerade?  " + istGerade(7));
    IO.println("Ist 12 gerade? " + istGerade(12));

    for (int i = 1; i <= 30; i++) {
        if (istPrimzahl(i)) {
            IO.print(i + " ");
        }
    }
    IO.println();
}

/** Prüft, ob eine Zahl gerade ist. */
boolean istGerade(int pZahl) {
    return pZahl % 2 == 0;
}

/**
 * Prüft, ob eine Zahl eine Primzahl ist.
 * @param pZahl die zu prüfende Zahl
 * @return true, wenn pZahl eine Primzahl ist
 */
boolean istPrimzahl(int pZahl) {
    if (pZahl < 2) {
        return false;
    }
    for (int teiler = 2; teiler < pZahl; teiler++) {
        if (pZahl % teiler == 0) {
            return false;
        }
    }
    return true;
}
```

:::

:::snippet{#merken}
Zwei Dinge lohnen sich hier anzuschauen:

1. `return pZahl % 2 == 0;` – der Vergleich **ist** schon ein `boolean`. Ein `if (…) return true; else return false;` wäre umständlicher und sagt dasselbe.
2. In `istPrimzahl` steht `return false;` **mitten in der Schleife**. Sobald ein Teiler gefunden ist, steht das Ergebnis fest – die Methode bricht sofort ab. Das ist ein häufiges und gutes Muster.
:::

## Aufgabe 1: Methoden mit Tests prüfen

Ab jetzt kannst du deine Lösungen selbst prüfen. Die Online-IDE bringt einen **Testrunner** mit: Eine Klasse mit `@Test` enthält Testmethoden, die deine Methode aufrufen und das Ergebnis mit dem erwarteten vergleichen.

:::snippet{#aufgabe}
Ergänze die drei Methoden so, dass alle Tests grün werden.

Wechsle dazu unten in den Reiter **Testrunner** und klicke auf *Alle Tests*.
:::

:::onlineide{height="560px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Rechner.java
public class Rechner {

    /**
     * Liefert den größeren der beiden Werte.
     */
    public int maximum(int pA, int pB) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert die Quersumme einer nichtnegativen Zahl.
     * Beispiel: 472 ergibt 13.
     */
    public int quersumme(int pZahl) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Prüft, ob pZahl durch pTeiler ohne Rest teilbar ist.
     */
    public boolean istTeilbar(int pZahl, int pTeiler) {
        return false; // ersetze diese Zeile
    }
}
```

```java RechnerTest.java
@Test
class RechnerTest {

    @Test
    void testMaximum() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(3, 9), "maximum(3, 9) muss 9 sein.");
        assertEquals(9, r.maximum(9, 3), "maximum(9, 3) muss 9 sein.");
        assertEquals(5, r.maximum(5, 5), "maximum(5, 5) muss 5 sein.");
        assertEquals(-3, r.maximum(-7, -3), "maximum(-7, -3) muss -3 sein.");
    }

    @Test
    void testQuersumme() {
        Rechner r = new Rechner();
        assertEquals(13, r.quersumme(472), "quersumme(472) muss 13 sein.");
        assertEquals(0, r.quersumme(0), "quersumme(0) muss 0 sein.");
        assertEquals(7, r.quersumme(7), "quersumme(7) muss 7 sein.");
        assertEquals(1, r.quersumme(1000), "quersumme(1000) muss 1 sein.");
    }

    @Test
    void testIstTeilbar() {
        Rechner r = new Rechner();
        assertTrue(r.istTeilbar(12, 3), "12 ist durch 3 teilbar.");
        assertFalse(r.istTeilbar(13, 3), "13 ist nicht durch 3 teilbar.");
        assertTrue(r.istTeilbar(0, 5), "0 ist durch jede Zahl teilbar.");
    }
}
```

:::

::::collapsible{title="Tipp 1: maximum"}

Eine Verzweigung genügt. Oder – noch kürzer – du gibst direkt zurück, was größer ist.

::::

::::collapsible{title="Tipp 2: quersumme"}

Denk an die Zusatzaufgabe aus Kapitel 1: Die letzte Ziffer bekommst du mit `% 10`, und mit `/ 10` wirst du sie los. Wiederhole das, solange noch etwas übrig ist.

Achte auf den Testfall `quersumme(0)` – deine Schleife darf dann null Mal laufen.

::::

::::collapsible{title="Tipp 3: istTeilbar"}

Eine Zeile. Du hast das Muster gerade bei `istGerade` gesehen.

::::

:::protect{password="java-ef-4-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Rechner.java
public class Rechner {

    /**
     * Liefert den größeren der beiden Werte.
     */
    public int maximum(int pA, int pB) {
        if (pA > pB) {
            return pA;
        }
        return pB;
    }

    /**
     * Liefert die Quersumme einer nichtnegativen Zahl.
     */
    public int quersumme(int pZahl) {
        int summe = 0;
        int rest = pZahl;
        while (rest > 0) {
            summe = summe + rest % 10;
            rest = rest / 10;
        }
        return summe;
    }

    /**
     * Prüft, ob pZahl durch pTeiler ohne Rest teilbar ist.
     */
    public boolean istTeilbar(int pZahl, int pTeiler) {
        return pZahl % pTeiler == 0;
    }
}
```

Bei `maximum` braucht es kein `else`: Wenn `return pA;` ausgeführt wurde, kommt die Methode nie bei der nächsten Zeile an.

:::

## Aufgabe 2: Eigene Tests schreiben

:::snippet{#aufgabe}
Schreibe eine Methode `istPalindrom(String pWort)`, die zurückgibt, ob ein Wort ein Palindrom ist. Den Algorithmus kennst du aus Kapitel 3 – jetzt steckt er in einer Methode mit Rückgabewert.

Ergänze außerdem die Testklasse um **eigene** Testfälle. Denk dabei besonders an Sonderfälle:

- das leere Wort
- ein Wort aus einem Buchstaben
- ein Wort mit gerader Buchstabenzahl
:::

:::onlineide{height="540px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Woerter.java
public class Woerter {

    /**
     * Prüft, ob pWort vorwärts wie rückwärts gelesen gleich ist.
     */
    public boolean istPalindrom(String pWort) {
        return false; // ersetze diese Zeile
    }
}
```

```java WoerterTest.java
@Test
class WoerterTest {

    @Test
    void testPalindrom() {
        Woerter w = new Woerter();
        assertTrue(w.istPalindrom("otto"), "otto ist ein Palindrom.");
        assertTrue(w.istPalindrom("rentner"), "rentner ist ein Palindrom.");
        assertFalse(w.istPalindrom("informatik"), "informatik ist keines.");

        // Ergänze hier deine eigenen Testfälle.
    }
}
```

:::

:::protect{password="java-ef-4-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Woerter.java
public class Woerter {

    /**
     * Prüft, ob pWort vorwärts wie rückwärts gelesen gleich ist.
     */
    public boolean istPalindrom(String pWort) {
        int links = 0;
        int rechts = pWort.length() - 1;

        while (links < rechts) {
            if (pWort.charAt(links) != pWort.charAt(rechts)) {
                return false;
            }
            links++;
            rechts--;
        }
        return true;
    }
}
```

Sinnvolle zusätzliche Testfälle:

```java
assertTrue(w.istPalindrom(""), "Das leere Wort ist ein Palindrom.");
assertTrue(w.istPalindrom("a"), "Ein einzelner Buchstabe ist ein Palindrom.");
assertTrue(w.istPalindrom("abba"), "abba hat gerade Länge und ist ein Palindrom.");
assertFalse(w.istPalindrom("abca"), "abca ist keines.");
```

Beim leeren Wort ist `rechts` gleich -1, die Schleife läuft nicht, das Ergebnis ist `true`. Das ist die übliche Vereinbarung.

:::

## Zusatzaufgabe

:::snippet{#brain}
Schreibe eine Methode `ggt(int pA, int pB)`, die den größten gemeinsamen Teiler zurückgibt – nach dem euklidischen Algorithmus aus Kapitel 3.

Schreibe dazu eine Testklasse mit mindestens fünf Testfällen. Überlege dir dabei ausdrücklich, welche **Sonderfälle** es gibt: Was soll herauskommen, wenn eine Zahl 0 ist? Wenn beide gleich sind?
:::

---

## Selbsttest

::::multievent

**1. Was bewirkt die return-Anweisung?**

{r1{Sie überspringt die nächste Zeile.}}

{r1{!Sie beendet die Methode sofort und liefert einen Wert zurück.}}

{r1{Sie gibt den Wert auf der Konsole aus.}}

{h{Denk an die Primzahlmethode, die mitten in der Schleife abbricht.}}
{H{Richtig!}}

**2. Welchen Rückgabetyp braucht eine Methode, die prüft, ob eine Zahl gerade ist?**

{r2{int}}

{r2{!boolean}}

{r2{void}}

{h{Das Ergebnis ist wahr oder falsch.}}
{H{Richtig!}}

**3. Wann ist void der richtige Rückgabetyp?** (Mehrfachauswahl)

{c1{!wenn die Methode etwas ausgibt}}

{c1{!wenn die Methode etwas zeichnet}}

{c1{wenn die Methode etwas berechnet, das weiterverwendet wird}}

{c1{wenn die Methode keine Parameter hat}}

{h{Es geht darum, ob ein Ergebnis zurückkommen soll - nicht um die Parameter.}}
{H{Richtig! Berechnetes gibt man zurück, Bewirktes nicht.}}

**4. Was ist der Nachteil, wenn eine Methode ihr Ergebnis nur ausgibt statt es zurückzugeben?**

{r3{Sie läuft langsamer.}}

{r3{!Das aufrufende Programm kann mit dem Ergebnis nicht weiterarbeiten.}}

{r3{Sie kann keine Parameter haben.}}

{h{Denk an die Summenmethode am Anfang der Lektion.}}
{H{Richtig!}}

**5. Womit prüfst du in einer Testmethode, dass ein erwarteter und ein tatsächlicher Wert übereinstimmen?**

{r4{mit einem if}}

{r4{!mit assertEquals}}

{r4{mit println}}

{h{Es gibt eine eigene Anweisung dafür, die auch eine Meldung mitliefert.}}
{H{Richtig! Für Wahrheitswerte gibt es außerdem assertTrue und assertFalse.}}

::::
