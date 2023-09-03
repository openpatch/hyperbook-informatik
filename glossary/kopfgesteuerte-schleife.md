---
name: Kopfgesteuerte Schleife
lang: de
---

# Kopfegesteuerte Schleife

Eine kopfgesteuerte Schleife, auch als "while-Schleife" bekannt, ist eine Art von Schleifenstruktur in der Programmierung, die dazu verwendet wird, einen Codeblock solange auszuführen, wie eine bestimmte Bedingung erfüllt ist. Im Gegensatz zur zählergesteuerten Schleife (wie der "for-Schleife"), bei der die Anzahl der Wiederholungen im Voraus festgelegt ist, wird die Ausführung einer kopfgesteuerten Schleife durch eine Bedingung am Anfang der Schleife gesteuert.

Hier ist eine vereinfachte Erklärung:

1. Bedingung: Am Anfang der "while"-Schleife steht eine Bedingung. Solange diese Bedingung als "wahr" ausgewertet wird, wird der Rumpf der Schleife wiederholt ausgeführt.
1. Rumpf: Der Rumpf der Schleife wird so lange wiederholt, wie die Bedingung wahr ist. Sobald die Bedingung nicht mehr erfüllt ist (also "falsch" wird), wird die Schleife beendet, und die Ausführung geht zum nächsten Teil des Programms über.


:::onlineide{id="764539"}

```java
int countdown = 99;
while (countdown > 0) {
    System.out.println(countdown + "...");
    countdown -= 1;
}

System.out.println("Juhu!");
```

:::