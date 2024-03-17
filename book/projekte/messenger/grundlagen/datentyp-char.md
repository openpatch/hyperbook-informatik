---
name: Datentyp char
index: 4
lang: de
---

# Datentyp char

Der Datentyp »char« ist ein primitiver Typ. Er umfasst Werte von 0 bis 65535, die meist als Kennzahlen für Zeichen interpretiert werden.

Das Zeichen »'« heißt „Apostroph“ (der Apostroph).

Literale des Datentyps »char« bestehen aus einem Zeichen zwischen Apostrophen und haben die Kennzahl dieses Zeichens als Wert und den Datentyp »char« als ihren Typ.

Wird ein char mit einem int addiert, bekommen wir wiederum ein int.  Wenn wird das Zeichen wieder als Zeichen ausgeben wollen und nicht als Zahl, müssen wir die Methode `Character.toString(char c)` verwenden oder Typcasten.

```java
char a = 'A';
System.out.println(a + 2); // => 67
System.out.println(Character.toString(a + 2)); // => C
System.out.println("" + (char) (a + 2)); // => C
```

## Aufgabe: Erweiterung der StringUtils-Klasse

Wir wollen uns die Eigenschaften des Datentyps char zu Nutzen machen und die StringUtils-Klasse erweitern.

1. Schreibe eine Methode `public int sum()`. Diese Methode soll die Summe des Strings zurückgeben. Die Summe des Strings ist die Summe aller Zeichen.
2. Schreibe eine Methode `public String shiftRight(char c)`. Diese Methode soll jedes Zeichen des String, um den Wert von c nach rechts verschieben. Z. B. wird für `c=2` aus einem `A` ein `C`.
3. Schreibe eine Methode `public String add(int s)`. Diese Methode soll ein Zeichen auf einen String addieren. Das bedeutet, dass das letzte Zeichen um diesen Wert erhöht wird. Kommt es zu einem Übertrag, dann wird auch das vorletzte Zeichen erhöht und so weiter. Tipp: Mit Character.MAX_VALUE bekommst du den maximalen Wert, den ein Char haben kann. Z. B. wird aus dem String `Hi` für `s=200` der String "Đı".


## Weitere Experimente

Erzeuge einen String, der ein Emoji beinhaltet und gibt seine Länge zurück. Beschreibe, was dir auffält.
