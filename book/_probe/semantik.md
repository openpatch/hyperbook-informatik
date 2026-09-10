---
name: Probe Semantik
index: 997
hide: true
---

# Probe: Laufzeitverhalten per Testrunner

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java Zaehler.java
public class Zaehler {

    private static int anzahl = 0;

    public Zaehler() {
        anzahl = anzahl + 1;
    }

    public static int getAnzahl() {
        return anzahl;
    }
}
```

```java Basis.java
public class Basis {

    protected String protokoll;

    public Basis() {
        protokoll = "" + zeige();
    }

    public String zeige() {
        return "Basis";
    }

    public String getProtokoll() {
        return protokoll;
    }
}
```

```java Abgeleitet.java
public class Abgeleitet extends Basis {

    private int wert;

    public Abgeleitet(int pWert) {
        super();
        wert = pWert;
    }

    public String zeige() {
        return "Abgeleitet-" + wert;
    }
}
```

```java Form.java
public abstract class Form {

    public abstract double flaeche();

    public String toString() {
        return "Form(" + flaeche() + ")";
    }
}
```

```java Kreis.java
public class Kreis extends Form {

    private double radius;

    public Kreis(double pRadius) {
        radius = pRadius;
    }

    public double flaeche() {
        return radius * radius;
    }
}
```

```java Waehler.java
public class Waehler {

    public String nimm(Form pForm) {
        return "Form";
    }

    public String nimm(Kreis pKreis) {
        return "Kreis";
    }
}
```

```java SemantikTest.java
@Test
class SemantikTest {

    @Test
    void testKlassenattribut() {
        int vorher = Zaehler.getAnzahl();
        new Zaehler();
        new Zaehler();
        assertEquals(vorher + 2, Zaehler.getAnzahl(), "Der Zaehler zaehlt ueber alle Objekte.");
    }

    @Test
    void testKonstruktorRuftUeberschriebeneMethode() {
        Abgeleitet a = new Abgeleitet(5);
        assertEquals("Abgeleitet-0", a.getProtokoll(), "Im Konstruktor der Oberklasse ist wert noch 0.");
        assertEquals("Abgeleitet-5", a.zeige(), "Danach steht 5 drin.");
    }

    @Test
    void testToStringInVerkettung() {
        Form f = new Kreis(3.0);
        assertEquals("Form(9.0)", "" + f, "toString wird bei der Verkettung benutzt.");
    }

    @Test
    void testUeberladenStatischGebunden() {
        Waehler w = new Waehler();
        Kreis k = new Kreis(2.0);
        Form alsForm = k;
        assertEquals("Kreis", w.nimm(k), "Statischer Typ Kreis.");
        assertEquals("Form", w.nimm(alsForm), "Statischer Typ Form - Ueberladen wird statisch gebunden.");
    }

    @Test
    void testGanzzahlDivisionInDouble() {
        assertEquals(2.5, 5 / 2.0, "Gemischt wird als Kommazahl gerechnet.");
    }
}
```

:::
