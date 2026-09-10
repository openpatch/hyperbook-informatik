---
name: Probe Statik
index: 998
hide: true
---

# Probe: static, instanceof, Ueberladen

Spike fuer die Ueberarbeitung von "Vertiefte Objektorientierung".

## 1. Klassenattribut, Klassenmethode, Konstante

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Vorher: " + Rechteck.getAnzahl());
    Rechteck a = new Rechteck(4.0, 3.0);
    Rechteck b = new Rechteck(0.5, 2.0);
    IO.println("Nachher: " + Rechteck.getAnzahl());
    IO.println("MIN_SEITE: " + Rechteck.MIN_SEITE);
    IO.println("b.breite: " + b.getBreite());
    IO.println("groesser: " + Rechteck.groesseres(a, b).getBreite());
}
```

```java Rechteck.java
public class Rechteck {

    public static final double MIN_SEITE = 1.0;

    private static int anzahl = 0;

    private double breite;
    private double hoehe;

    public Rechteck(double pBreite, double pHoehe) {
        if (pBreite < MIN_SEITE) {
            breite = MIN_SEITE;
        } else {
            breite = pBreite;
        }
        hoehe = pHoehe;
        anzahl = anzahl + 1;
    }

    public static int getAnzahl() {
        return anzahl;
    }

    public static Rechteck groesseres(Rechteck pA, Rechteck pB) {
        if (pA.flaeche() >= pB.flaeche()) {
            return pA;
        }
        return pB;
    }

    public double getBreite() {
        return breite;
    }

    public double flaeche() {
        return breite * hoehe;
    }
}
```

:::

## 2. instanceof, Typumwandlung, toString, Ueberladen

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    Form[] formen = { new Kreis(2.0), new Rechteck2(3.0, 4.0) };

    for (Form f : formen) {
        IO.println("" + f);
        if (f instanceof Kreis) {
            Kreis k = (Kreis) f;
            IO.println("  Radius: " + k.getRadius());
        }
    }

    Rechteck2 r = new Rechteck2(3.0, 4.0);
    Form alsForm = r;
    IO.println("ueberladen mit Form:     " + beschreibe(alsForm));
    IO.println("ueberladen mit Rechteck: " + beschreibe(r));
}

String beschreibe(Form pForm) {
    return "irgendeine Form";
}

String beschreibe(Rechteck2 pR) {
    return "ein Rechteck";
}
```

```java Form.java
public abstract class Form {

    public abstract double flaeche();

    public String toString() {
        return "Form mit Flaeche " + flaeche();
    }
}
```

```java Kreis.java
public class Kreis extends Form {

    private double radius;

    public Kreis(double pRadius) {
        radius = pRadius;
    }

    public double getRadius() {
        return radius;
    }

    public double flaeche() {
        return Math.PI * radius * radius;
    }
}
```

```java Rechteck2.java
public class Rechteck2 extends Form {

    private double breite;
    private double hoehe;

    public Rechteck2(double pBreite, double pHoehe) {
        breite = pBreite;
        hoehe = pHoehe;
    }

    public double flaeche() {
        return breite * hoehe;
    }
}
```

:::

## 3. Schnittstelle mit Konstante, mehrere Schnittstellen, @Override

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    Speicherbar[] dinge = { new Notiz("Hallo") };
    for (Speicherbar s : dinge) {
        IO.println(s.alsZeile() + " / " + Speicherbar.TRENNER);
    }
    Notiz n = new Notiz("Test");
    IO.println("vergleich: " + n.istGroesserAls(new Notiz("A")));
}
```

```java Speicherbar.java
public interface Speicherbar {

    public static final String TRENNER = ";";

    String alsZeile();
}
```

```java Vergleichbar.java
public interface Vergleichbar {

    boolean istGroesserAls(Vergleichbar pAnderes);
}
```

```java Notiz.java
public class Notiz implements Speicherbar, Vergleichbar {

    private String text;

    public Notiz(String pText) {
        text = pText;
    }

    public String getText() {
        return text;
    }

    @Override
    public String alsZeile() {
        return "Notiz" + Speicherbar.TRENNER + text;
    }

    @Override
    public boolean istGroesserAls(Vergleichbar pAnderes) {
        Notiz andere = (Notiz) pAnderes;
        return text.length() > andere.getText().length();
    }
}
```

:::

## 4. Konstruktor ruft ueberschreibbare Methode

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    Basis b = new Abgeleitet(5);
    b.zeige();
}
```

```java Basis.java
public class Basis {

    public Basis() {
        zeige();
    }

    public void zeige() {
        IO.println("Basis");
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

    public void zeige() {
        IO.println("Abgeleitet, wert = " + wert);
    }
}
```

:::
