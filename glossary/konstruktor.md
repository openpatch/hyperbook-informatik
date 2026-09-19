---
name: Konstruktor
lang: de
---

# Konstruktor

Ein **Konstruktor** (englisch *constructor*) ist eine besondere :t[Methode]{#methode}, die beim Erzeugen eines :t[Objekts]{#objekt} mit `new` ausgeführt wird. Seine Aufgabe ist es, die :t[Attribute]{#attribut} auf sinnvolle Startwerte zu setzen.

```java
public class Hund {
    private String name;
    private int alter;

    /** Erzeugt einen Hund mit Namen und Alter. */
    public Hund(String pName, int pAlter) {
        this.name = pName;
        this.alter = pAlter;
    }
}

Hund bello = new Hund("Bello", 5);
```

- Der Konstruktor heißt **genau wie die Klasse** und hat **keinen Rückgabetyp** – auch nicht `void`.
- Es darf mehrere Konstruktoren geben, solange sich die Parameterlisten unterscheiden; siehe :t[Überladen]{#ueberladen}.
- Schreibt man gar keinen, ergänzt Java einen parameterlosen Standardkonstruktor. Sobald man einen eigenen schreibt, fällt dieser weg.
- In einer Unterklasse ruft `super(...)` den Konstruktor der Oberklasse auf. Das muss die **erste** Anweisung sein.
