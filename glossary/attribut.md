---
name: Attribut
lang: de
---

# Attribut

In der objektorientierten Programmierung sind Attribute spezielle :t[Variablen]{#variable}, die die Eigenschaften eines :t[Objekts]{#objekt} darstellen. Attribute werden innerhalb einer Klasse deklariert und meistens im :t[Konstruktor]{#konstruktor} initialisiert.

Attribute können mit einem :t[Zugriffsmodifikator]{#zugriffsmodifikator} deklariert werden. Damit kann eingeschränkt werden, welche anderen Objekte Zugriff auf die Eigenschaften der Objekte dieser Klasse haben sollen.

:::onlineide{id="348934"}

```java Beispiel.java
public class Hund {

    // Deklaration der Attribute der Klasse Hund
    private String name;
    private int alter;

    public Hund() {
        // Initialisierung der Attribute
        this.name = "Bello";
        this.alter = 5;
    }
}
```

:::