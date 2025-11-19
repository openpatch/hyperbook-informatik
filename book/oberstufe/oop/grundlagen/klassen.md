---
name: Klassen
index: 5
lang: de
---

# Klassen

Eine :t[Klasse]{#klasse} ist wie ein Bauplan für :t[Objekte]{#objekt}. Sie definiert, welche Eigenschaften (Attribute) und Fähigkeiten (Methoden) Objekte haben sollen, die nach diesem Bauplan erstellt werden.

:::snippet{#beispiel}

**Vergleich aus dem Alltag**: 
Stell dir vor, eine Klasse ist wie ein Bauplan für ein Auto. Der Bauplan beschreibt, dass jedes Auto eine Farbe, eine Marke und eine Geschwindigkeit haben soll. Außerdem kann jedes Auto fahren, bremsen und hupen. 

Nach diesem Bauplan können dann viele verschiedene Auto-Objekte gebaut werden: ein rotes BMW-Auto, ein blaues Mercedes-Auto, usw.

:::

## Aufbau einer Klasse

Eine Klasse besteht aus zwei Hauptteilen:
- **Attribute** (Eigenschaften/Daten)
- **Methoden** (Fähigkeiten/Funktionen)

Schauen wir uns eine einfache Klasse am Beispiel eines Autos an:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Auto.java
public class Auto {
    // Attribute (Eigenschaften)
    private String farbe;
    private String marke;
    private int geschwindigkeit;
    
    // Konstruktor (erstellt ein neues Auto-Objekt)
    public Auto(String neueFarbe, String neueMarke) {
        farbe = neueFarbe;
        marke = neueMarke;
        geschwindigkeit = 0;
    }
    
    // Methoden (Fähigkeiten)
    public void beschleunigen() {
        geschwindigkeit = geschwindigkeit + 10;
        System.out.println("Das " + farbe + "e " + marke + " fährt jetzt " + geschwindigkeit + " km/h");
    }
    
    public void bremsen() {
        if (geschwindigkeit > 0) {
            geschwindigkeit = geschwindigkeit - 10;
        }
        System.out.println("Das " + farbe + "e " + marke + " fährt jetzt " + geschwindigkeit + " km/h");
    }
    
    public void hupen() {
        System.out.println("Huuuup! Das " + farbe + "e " + marke + " hupt!");
    }
}

// Verwendung der Klasse
Auto meinAuto = new Auto("rot", "BMW");
meinAuto.beschleunigen();
meinAuto.beschleunigen();
meinAuto.hupen();
meinAuto.bremsen();
```
:::

**Aufgabe**: Führe den Code aus und beobachte, was passiert. Experimentiere mit verschiedenen Werten!

## Wichtige Begriffe

### Konstruktor
Der :t[Konstruktor]{#konstruktor} ist eine spezielle Methode, die ausgeführt wird, wenn ein neues Objekt erstellt wird. Er hat immer den gleichen Namen wie die Klasse.

```java
public Auto(String neueFarbe, String neueMarke) {
    farbe = neueFarbe;
    marke = neueMarke;
    geschwindigkeit = 0;
}
```

### Private vs. Public
- **private**: Nur innerhalb der gleichen Klasse sichtbar
- **public**: Von überall aus sichtbar

:::snippet{#merken}

**Faustregel**: Attribute sollten meist `private` sein, wichtige Methoden `public`. So schützt du deine Daten vor ungewollten Änderungen!

:::

## Übung: Klasse "Person"

Erstelle eine Klasse `Person` mit folgenden Eigenschaften:

:::snippet{#aufgabe}

**Aufgabe**: Schreibe eine Klasse `Person` mit:
- Attributen: `name` (String), `alter` (int), `groesse` (double)
- Konstruktor, der alle Attribute setzt
- Methode `stelleVor()`: gibt "Hallo, ich bin [Name] und bin [Alter] Jahre alt" aus
- Methode `wachse()`: erhöht die Größe um 0.1

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Person.java
public class Person {
    // Deine Attribute hier
    
    // Dein Konstruktor hier
    
    // Deine Methoden hier
}

// Test deiner Klasse
Person max = new Person("Max", 16, 1.75);
max.stelleVor();
max.wachse();
```
:::

:::collapsible{title="Lösung" id="person_solution"}
```java
public class Person {
    private String name;
    private int alter;
    private double groesse;
    
    public Person(String neuerName, int neuesAlter, double neueGroesse) {
        name = neuerName;
        alter = neuesAlter;
        groesse = neueGroesse;
    }
    
    public void stelleVor() {
        System.out.println("Hallo, ich bin " + name + " und bin " + alter + " Jahre alt");
    }
    
    public void wachse() {
        groesse = groesse + 0.1;
        System.out.println(name + " ist jetzt " + groesse + "m groß");
    }
}
```
:::

## Getter und Setter Methoden

Da Attribute meist `private` sind, brauchst du spezielle Methoden, um von außen auf sie zuzugreifen:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Handy.java
public class Handy {
    private String marke;
    private int akkustand;
    
    public Handy(String neueMarke) {
        marke = neueMarke;
        akkustand = 100;
    }
    
    // Getter-Methoden (zum Lesen)
    public String getMarke() {
        return marke;
    }
    
    public int getAkkustand() {
        return akkustand;
    }
    
    // Setter-Methoden (zum Ändern)
    public void setMarke(String neueMarke) {
        marke = neueMarke;
    }
    
    public void telefonieren(int minuten) {
        akkustand = akkustand - (minuten * 2);
        if (akkustand < 0) {
            akkustand = 0;
        }
        System.out.println("Nach " + minuten + " Minuten telefonieren: Akku bei " + akkustand + "%");
    }
}

// Test
Handy meinHandy = new Handy("iPhone");
System.out.println("Marke: " + meinHandy.getMarke());
System.out.println("Akku: " + meinHandy.getAkkustand() + "%");
meinHandy.telefonieren(20);
meinHandy.telefonieren(30);
```
:::

## Teste-Dich-Projekt: Bankkonto

:::snippet{#aufgabe}

**Aufgabe**: Erstelle eine Klasse `Bankkonto` mit:
- Attributen: `kontoinhaber` (String), `kontostand` (double)
- Konstruktor mit Kontoinhaber (Kontostand startet bei 0)
- Methode `einzahlen(double betrag)`: erhöht den Kontostand
- Methode `abheben(double betrag)`: verringert den Kontostand (nur wenn genug Geld da ist)
- Methode `kontostandAnzeigen()`: zeigt den aktuellen Kontostand

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Bankkonto.java
// Deine Klasse hier

// Test deiner Klasse
Bankkonto meinKonto = new Bankkonto("Anna Müller");
meinKonto.kontostandAnzeigen();
meinKonto.einzahlen(100.50);
meinKonto.kontostandAnzeigen();
meinKonto.abheben(30.25);
meinKonto.kontostandAnzeigen();
meinKonto.abheben(200.00); // Sollte nicht funktionieren
```
:::

### Testfälle
- Einzahlen von 100,50€ → Kontostand: 100,50€
- Abheben von 30,25€ → Kontostand: 70,25€  
- Abheben von 200€ → Fehlermeldung, Kontostand bleibt 70,25€

:::snippet{#brain}

**Erweitere deine Bankkonto-Klasse**: 
- Füge ein Tageslimit für Abhebungen hinzu
- Implementiere Zinsen, die täglich berechnet werden
- Erstelle eine Historie der letzten Transaktionen

:::