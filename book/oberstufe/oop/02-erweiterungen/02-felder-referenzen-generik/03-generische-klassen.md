---
title: Generische Klassen
index: 3
---

# Generische Klassen

Im Kapitel über Schnittstellen hast du einen Sortierer gebaut, der Bücher **und** Personen sortieren kann. Der Preis dafür: An jeder Stelle, an der du wieder an das konkrete Objekt wolltest, brauchtest du eine Typumwandlung.

Generische Klassen lösen dasselbe Problem – und behalten dabei den Typ.

<!-- KLP QPh, Daten und ihre Strukturierung: implementieren Klassen in einer Programmiersprache auch unter Nutzung dokumentierter Klassenbibliotheken (I) -->

## Das Problem

:::snippet{#aufgabe}
Die Klasse `Behaelter` speichert genau ein Objekt. Sage voraus, was das Programm ausgibt – und wo es Ärger geben wird.
:::

:::onlineide{height="580px" speed="1000000"}

```java Main.java
void main() {
    Behaelter b = new Behaelter();
    b.setze("Hallo");

    String s = (String) b.gib();
    IO.println("Inhalt: " + s + ", Länge: " + s.length());

    Behaelter c = new Behaelter();
    c.setze(new Punkt(3, 4));

    // Die folgende Zeile lässt sich übersetzen - und stürzt beim Laufen ab.
    // Entferne die Schrägstriche und probiere es aus.
    // String t = (String) c.gib();
}
```

```java Behaelter.java
public class Behaelter {

    private Object inhalt;

    public void setze(Object pInhalt) {
        inhalt = pInhalt;
    }

    public Object gib() {
        return inhalt;
    }
}
```

```java Punkt.java
public class Punkt {

    private int x;
    private int y;

    public Punkt(int pX, int pY) {
        x = pX;
        y = pY;
    }
}
```

:::

::::collapsible{title="Auflösung"}

Die erste Ausgabe funktioniert: `Inhalt: Hallo, Länge: 5`.

Entfernst du die Schrägstriche, **übersetzt** das Programm weiterhin – und bricht erst beim Ausführen ab. `Object` verrät der IDE nicht, was wirklich im Behälter steckt. Der Fehler zeigt sich erst zur Laufzeit.

Zwei Nachteile also:

1. Jede Entnahme braucht eine Typumwandlung.
2. Ein falscher Typ fällt erst beim Ausführen auf.

::::

## Die Lösung

:::snippet{#definition}
Eine **generische Klasse** bekommt einen **Typparameter**, der erst bei der Verwendung festgelegt wird. Die Klasse arbeitet mit diesem Platzhalter, als wäre er ein echter Typ.
:::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    Behaelter<String> b = new Behaelter<String>();
    b.setze("Hallo");

    String s = b.gib();
    IO.println("Inhalt: " + s + ", Länge: " + s.length());

    Behaelter<Integer> z = new Behaelter<Integer>();
    z.setze(42);
    IO.println("Zahl mal zwei: " + (z.gib() * 2));

    // Die folgende Zeile lässt sich nicht mehr übersetzen.
    // Entferne die Schrägstriche und lies die Fehlermeldung.
    // b.setze(42);
}
```

```java Behaelter.java
/**
 * Speichert genau ein Objekt beliebigen Typs.
 * @param <T> der Typ des gespeicherten Objekts
 */
public class Behaelter<T> {

    private T inhalt;

    /** Legt ein Objekt in den Behälter. */
    public void setze(T pInhalt) {
        inhalt = pInhalt;
    }

    /** Liefert das gespeicherte Objekt, oder null. */
    public T gib() {
        return inhalt;
    }

    /** Liefert true, wenn der Behälter leer ist. */
    public boolean istLeer() {
        return inhalt == null;
    }
}
```

:::

:::snippet{#merken}
- `class Behaelter<T>` führt den Typparameter `T` ein. Der Buchstabe ist frei wählbar; üblich sind `T` (type), `E` (element) oder `ContentType`.
- Innerhalb der Klasse benutzt man `T` wie einen normalen Typ – als Attributtyp, Parametertyp und Rückgabetyp.
- Bei der Verwendung setzt man den echten Typ ein: `Behaelter<String>`.
- **Keine Typumwandlung mehr nötig** – die IDE weiß, was drin ist.
- Ein falscher Typ ist jetzt ein **Übersetzungsfehler**, kein Laufzeitfehler.

Ein Typparameter kann nur ein **Objekttyp** sein. Für elementare Typen nimmt man die zugehörigen Klassen: `Integer` statt `int`, `Double` statt `double`, `Boolean` statt `boolean`.
:::

:::snippet{#aufgabe}
Entferne im Hauptprogramm die Schrägstriche vor `b.setze(42);` und lies die Fehlermeldung.

Beurteile: Warum ist es besser, wenn dieser Fehler beim Übersetzen auffällt?
:::

::::collapsible{title="Auflösung"}

Weil ein Übersetzungsfehler **immer** gefunden wird. Ein Laufzeitfehler zeigt sich nur, wenn der betroffene Programmweg auch ausgeführt wird – vielleicht erst beim Anwender.

Dasselbe Argument wie beim Geheimnisprinzip in der Einführungsphase: Je mehr die Sprache schon beim Übersetzen abfängt, desto weniger kann sich verstecken.

::::

## Eine generische Sammlung

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    Sammlung<String> namen = new Sammlung<String>(3);
    namen.fuegeHinzu("Ada");
    namen.fuegeHinzu("Alan");
    namen.fuegeHinzu("Grace");

    for (int i = 0; i < namen.getAnzahl(); i++) {
        IO.println(namen.gib(i).toUpperCase());
    }

    Sammlung<Integer> zahlen = new Sammlung<Integer>(5);
    zahlen.fuegeHinzu(10);
    zahlen.fuegeHinzu(20);

    int summe = 0;
    for (int i = 0; i < zahlen.getAnzahl(); i++) {
        summe = summe + zahlen.gib(i);
    }
    IO.println("Summe: " + summe);
}
```

```java Sammlung.java
/**
 * Eine einfache Sammlung fester Größe.
 * @param <T> der Typ der gespeicherten Objekte
 */
public class Sammlung<T> {

    private T[] inhalt;
    private int anzahl;

    public Sammlung(int pMaxGroesse) {
        inhalt = new T[pMaxGroesse];
        anzahl = 0;
    }

    /** Fügt ein Element hinzu, wenn noch Platz ist. */
    public boolean fuegeHinzu(T pElement) {
        if (anzahl < inhalt.length) {
            inhalt[anzahl] = pElement;
            anzahl++;
            return true;
        }
        return false;
    }

    /** Liefert das Element an der angegebenen Stelle. */
    public T gib(int pIndex) {
        return inhalt[pIndex];
    }

    public int getAnzahl() {
        return anzahl;
    }
}
```

:::

:::snippet{#merken}
Innerhalb der Klasse ist `T` ein Typ wie jeder andere: `private T[] inhalt;` und `new T[pMaxGroesse]`. Nirgends steht eine Typumwandlung.

Genau so sind auch die Klassen der NRW-Bibliothek gebaut, mit denen du im Kapitel über Datenstrukturen arbeitest: `List<ContentType>`, `Stack<ContentType>`, `Queue<ContentType>`.
:::

:::alert{info}
**Ein Unterschied zum „großen" Java:** Dort lässt sich `new T[n]` **nicht** schreiben. Man behilft sich mit einem `Object[]` und einer Typumwandlung beim Herausgeben. Wenn du später in einer echten Java-Umgebung arbeitest und diese Fehlermeldung siehst, weißt du, woran es liegt – an der Idee der generischen Klasse ändert das nichts.
:::

## Aufgabe: Ein generischer Stapel

Diesen Datentyp lernst du im übernächsten Kapitel gründlich kennen. Hier baust du eine einfache Vorstufe.

:::snippet{#aufgabe}
Ein **Stapel** funktioniert wie ein Stapel Teller: Man legt oben auf und nimmt oben weg. Wer zuletzt kam, geht zuerst.

Setze die generische Klasse so um, dass alle Tests grün werden.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Stapel.java
/**
 * Ein Stapel fester Größe. Wer zuletzt kam, geht zuerst.
 * @param <T> der Typ der gestapelten Objekte
 */
public class Stapel<T> {

    private T[] inhalt;
    private int anzahl;

    public Stapel(int pMaxGroesse) {
        inhalt = new T[pMaxGroesse];
        anzahl = 0;
    }

    /** Liefert true, wenn der Stapel leer ist. */
    public boolean istLeer() {
        return false; // ersetze diese Zeile
    }

    /** Liefert true, wenn kein Platz mehr ist. */
    public boolean istVoll() {
        return false; // ersetze diese Zeile
    }

    /**
     * Legt ein Element oben auf den Stapel.
     * @return true, wenn es geklappt hat
     */
    public boolean legeAuf(T pElement) {
        return false; // ersetze diese Zeile
    }

    /**
     * Liefert das oberste Element, ohne es zu entfernen.
     * Bei leerem Stapel null.
     */
    public T oberstes() {
        return null; // ersetze diese Zeile
    }

    /**
     * Entfernt das oberste Element und liefert es zurück.
     * Bei leerem Stapel null.
     */
    public T nimmWeg() {
        return null; // ersetze diese Zeile
    }

    public int getAnzahl() {
        return anzahl;
    }
}
```

```java StapelTest.java
@Test
class StapelTest {

    @Test
    void testNeuerStapel() {
        Stapel<String> s = new Stapel<String>(3);
        assertTrue(s.istLeer(), "Ein neuer Stapel ist leer.");
        assertFalse(s.istVoll(), "Und nicht voll.");
        assertEquals(0, s.getAnzahl(), "Er enthält nichts.");
        assertEquals(null, s.oberstes(), "Oben liegt nichts.");
        assertEquals(null, s.nimmWeg(), "Wegnehmen liefert nichts.");
    }

    @Test
    void testAuflegen() {
        Stapel<String> s = new Stapel<String>(3);
        assertTrue(s.legeAuf("A"), "Das erste Element passt.");
        assertEquals("A", s.oberstes(), "Oben liegt A.");
        assertFalse(s.istLeer(), "Der Stapel ist nicht mehr leer.");

        s.legeAuf("B");
        assertEquals("B", s.oberstes(), "Jetzt liegt B oben.");
        assertEquals(2, s.getAnzahl(), "Es sind zwei Elemente.");
    }

    @Test
    void testReihenfolge() {
        Stapel<String> s = new Stapel<String>(3);
        s.legeAuf("A");
        s.legeAuf("B");
        s.legeAuf("C");

        assertEquals("C", s.nimmWeg(), "Zuletzt aufgelegt, zuerst weg.");
        assertEquals("B", s.nimmWeg(), "Dann B.");
        assertEquals("A", s.nimmWeg(), "Dann A.");
        assertTrue(s.istLeer(), "Danach ist der Stapel leer.");
    }

    @Test
    void testVoll() {
        Stapel<Integer> s = new Stapel<Integer>(2);
        assertTrue(s.legeAuf(1), "Das erste passt.");
        assertTrue(s.legeAuf(2), "Das zweite auch.");
        assertTrue(s.istVoll(), "Jetzt ist der Stapel voll.");
        assertFalse(s.legeAuf(3), "Das dritte passt nicht mehr.");
        assertEquals(2, s.getAnzahl(), "Es bleiben zwei Elemente.");
    }

    @Test
    void testOberstesEntferntNicht() {
        Stapel<Integer> s = new Stapel<Integer>(3);
        s.legeAuf(7);
        assertEquals(7, s.oberstes(), "Oben liegt die 7.");
        assertEquals(1, s.getAnzahl(), "Das Nachschauen entfernt nichts.");
        assertEquals(7, s.oberstes(), "Sie liegt immer noch da.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Wo liegt oben?"}

Wenn `anzahl` Elemente auf dem Stapel liegen, steht das oberste an Index `anzahl - 1`. Der nächste freie Platz ist `anzahl`.

::::

::::collapsible{title="Tipp 2: Wegnehmen"}

Merke dir das oberste Element in einer Variablen, verringere `anzahl` um eins und gib das gemerkte Element zurück.

Den Platz im Feld musst du nicht löschen – er wird beim nächsten Auflegen überschrieben.

::::

::::collapsible{title="Tipp 3: Der leere Stapel"}

Drei Methoden müssen den leeren Stapel gesondert behandeln: `oberstes` und `nimmWeg` liefern dann `null`, und `legeAuf` darf bei vollem Stapel nichts tun.

Schreib die Prüfung nicht jedes Mal neu hin – du hast `istLeer()` und `istVoll()` ja gerade gebaut.

::::

:::protect{password="java-q-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Stapel.java
public class Stapel<T> {

    private T[] inhalt;
    private int anzahl;

    public Stapel(int pMaxGroesse) {
        inhalt = new T[pMaxGroesse];
        anzahl = 0;
    }

    public boolean istLeer() {
        return anzahl == 0;
    }

    public boolean istVoll() {
        return anzahl == inhalt.length;
    }

    public boolean legeAuf(T pElement) {
        if (istVoll()) {
            return false;
        }
        inhalt[anzahl] = pElement;
        anzahl++;
        return true;
    }

    public T oberstes() {
        if (istLeer()) {
            return null;
        }
        return inhalt[anzahl - 1];
    }

    public T nimmWeg() {
        if (istLeer()) {
            return null;
        }
        T oben = inhalt[anzahl - 1];
        anzahl--;
        return oben;
    }

    public int getAnzahl() {
        return anzahl;
    }
}
```

Beachte, wie `legeAuf` die Methode `istVoll()` benutzt statt die Bedingung noch einmal hinzuschreiben. Ändert sich die Regel, ändert sich eine Stelle.

Dieser Stapel hat eine **feste Größe** – er kann volllaufen. Im Kapitel über lineare Datenstrukturen baust du einen, der beliebig mitwächst.

:::

## Zusatzaufgabe

:::snippet{#brain}
Ein Stapel ist der natürliche Datentyp für die Rückgängig-Funktion eines Programms.

a) Baue ein kleines Zeichenprogramm mit Scratch for Java: Jeder Mausklick setzt einen Punkt, und die Rücktaste macht den letzten Punkt rückgängig.

b) Welchen Typparameter braucht dein Stapel dafür?

c) Was passiert, wenn jemand öfter die Rücktaste drückt, als Punkte gesetzt wurden? Prüfe, ob dein Programm das aushält.
:::

---

## Selbsttest

::::multievent

**1. Wann wird der Typ einer generischen Klasse festgelegt?**

{r1{beim Schreiben der Klasse}}

{r1{!bei der Verwendung der Klasse}}

{r1{beim Ausführen des Programms}}

{h{In der Klasse steht nur der Platzhalter.}}
{H{Richtig!}}

**2. Was schreibt man statt int als Typparameter?**

{r2{number}}

{r2{!Integer}}

{r2{int}}

{h{Ein Typparameter muss ein Objekttyp sein.}}
{H{Richtig! Entsprechend Double statt double und Boolean statt boolean.}}

**3. Welchen Vorteil hat eine generische Klasse gegenüber einer, die alles als Object speichert?** (Mehrfachauswahl)

{c1{!keine Typumwandlung beim Herausnehmen}}

{c1{!falsche Typen fallen schon beim Übersetzen auf}}

{c1{!die IDE kennt den tatsächlichen Typ}}

{c1{sie braucht weniger Speicher}}

{h{Am Speicherverbrauch ändert sich nichts.}}
{H{Richtig!}}

**4. In welcher Reihenfolge verlässt man einen Stapel?**

{r3{wer zuerst kam, geht zuerst}}

{r3{!wer zuletzt kam, geht zuerst}}

{r3{in zufälliger Reihenfolge}}

{h{Denk an einen Stapel Teller.}}
{H{Richtig!}}

**5. An welchem Index liegt bei n Elementen das oberste?**

{r4{bei n}}

{r4{!bei n minus 1}}

{r4{bei 0}}

{h{Die Zählung beginnt bei 0.}}
{H{Richtig! Und der nächste freie Platz ist genau n.}}

::::
