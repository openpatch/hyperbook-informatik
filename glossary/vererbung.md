---
name: Vererbung
lang: de
---

Vererbung ist ein Konzept in der objektorientierten Programmierung (OOP), das dazu dient, die Beziehungen zwischen Klassen zu beschreiben und den Code in einer hierarchischen Struktur zu organisieren.

Hier sind die grundlegenden Konzepte und Merkmale der Vererbung:

1. Basis- und abgeleitete Klassen: In der Vererbung gibt es zwei Haupttypen von Klassen: die "Basisklasse" (auch "Superklasse" oder "Elternklasse" genannt) und die "abgeleitete Klasse" (auch "Unterklasse" oder "Kindklasse" genannt). Die abgeleitete Klasse erbt Eigenschaften und Methoden von der Basisklasse.
1. Erbende Eigenschaften und Methoden: Die abgeleitete Klasse erbt alle Eigenschaften (Variablen) und Methoden (Funktionen) von der Basisklasse. Dies bedeutet, dass sie auf diese Eigenschaften und Methoden zugreifen und sie verwenden kann, ohne sie erneut zu definieren.
1. Erweitern und Überschreiben: Die abgeleitete Klasse kann die geerbten Eigenschaften und Methoden erweitern oder überschreiben, um ihr eigenes Verhalten hinzuzufügen oder zu ändern. Dies ermöglicht die Anpassung der Funktionalität an die spezifischen Anforderungen der abgeleiteten Klasse.

Beispiel: Ein einfaches Beispiel für Vererbung könnte die Beziehung zwischen einer Basisklasse "Tier" und abgeleiteten Klassen wie "Hund" und "Katze" sein. Die Basisklasse "Tier" könnte allgemeine Eigenschaften wie "Name" und Methoden wie "Fressen" haben, während die abgeleiteten Klassen spezifischere Eigenschaften wie "Rasse" und Methoden wie "Bellen" oder "Miauen" hinzufügen könnten.

:::onlineide{id="042567"}

```java Beispiel.java
Tier fido = new Hund("Fido");
Tier whiskers = new Katze("Whiskers");

fido.lautGeben();
whiskers.lautGeben();

public class Tier {

    public String name;

    public Tier(String name) {
        this.name = name;
    }

    public void fressen() {
        System.out.println(name + " frisst.");
    }

    public void lautGeben() {

    }
}

public class Hund extends Tier {
    public void lautGeben() {
        System.out.println(name + " bellt.");
    }
}

public class Katze extends Tier {
    public void lautGeben() {
        System.out.println(name + " miaut.");
    }
}
```

:::