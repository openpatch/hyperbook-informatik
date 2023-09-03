---
name: Boolean (Datentyp)
lang: de
---

# Boolean (Datentyp)

Der Name "boolean" leitet sich von George Boole ab, einem Mathematiker des 19. Jahrhunderts, der die Grundlagen der formalen Logik entwickelte, die in der Informatik eine wichtige Rolle spielen. Ein boolescher Wert kann auf verschiedene Arten dargestellt werden, abhängig von der Programmiersprache, aber die beiden Hauptwerte sind:

1. Wahr (true): Dies repräsentiert die positive oder erfüllte Bedingung. Zum Beispiel könnte in einem Programm "True" bedeuten, dass eine Tür geöffnet ist oder eine Bedingung erfüllt wurde.

2. Falsch (false): Dies repräsentiert das negative oder nicht erfüllte Bedingung. In vielen Fällen bedeutet "False", dass etwas nicht zutrifft, wie etwa eine geschlossene Tür oder eine nicht erfüllte Bedingung.

Boolesche Werte sind äußerst nützlich, um Entscheidungen in Programmen zu treffen. Du kannst sie in sogenannten "if-Anweisungen" verwenden, um festzustellen, ob eine bestimmte Bedingung erfüllt ist, und je nachdem, ob die Bedingung wahr oder falsch ist, unterschiedliche Aktionen ausführen. Hier ist ein einfaches Beispiel in Python:

:::onlineide{id="386498"}

```java Boolean.java
boolean tuerOffen = true;

if (tuerOffen) {
    System.out.println("Die Tür ist geöffnet.");
} else {
    System.out.println("Die Tür ist geschlossen.");
}
```

:::