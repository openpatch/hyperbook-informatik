---
name: Zählergesteuerte Schleife
lang: de
---

# Zählergesteuerte Schleife

Eine zählergesteuerte Schleife, auch als "for-Schleife" bekannt, ist eine Schleifenstruktur in der Programmierung, die dazu verwendet wird, einen Codeblock eine bestimmte Anzahl von Malen zu wiederholen. Anders als bei einer kopfgesteuerten Schleife (wie der "while-Schleife") wird die Anzahl der Wiederholungen im Voraus festgelegt und in der Schleife spezifiziert.

Hier ist eine vereinfachte Erklärung:

1. Anfangsbedingung: Die Anfangsbedingung gibt den Startwert für einen Zähler an, der die Wiederholungen zählt. Dieser Zähler wird normalerweise als Variable in der "for"-Schleife deklariert.
1. Endbedingung: Die Endbedingung bestimmt, wann die Schleife beendet wird. Die Schleife wird so lange wiederholt, wie die Endbedingung erfüllt ist. Sobald die Endbedingung nicht mehr erfüllt ist (d. h. "falsch" wird), wird die Schleife beendet.
1. Schrittgröße: Die Schrittgröße legt fest, wie viel sich der Zähler bei jeder Iteration erhöht oder verringert. Dies ermöglicht es, Schleifen mit einer bestimmten Schrittweite auszuführen.


:::onlineide{id="346213"}

```java
for(int i = 99; i > 0; i--) {
    System.out.println(i + "...");
}

System.out.println("Juhu");
```

:::