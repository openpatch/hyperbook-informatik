---
name: Fußgesteuerte Schleife
lang: de
---

# Fußgesteuerte Schleife

Eine fußgesteuerte Schleife, auch als "do-while-Schleife" bekannt, ist eine Schleifenstruktur in der Programmierung, die dazu verwendet wird, einen Rumpf mindestens einmal auszuführen und dann fortzufahren, solange eine bestimmte Bedingung erfüllt ist. Anders als bei kopfgesteuerten Schleifen (wie der "while-Schleife") wird die Bedingung erst am Ende der Schleife überprüft, nachdem der Rumpf mindestens einmal ausgeführt wurde.

Hier ist eine vereinfachte Erklärung:

1. Rumpf: Der Rumpf der "do-while"-Schleife wird zuerst einmal ausgeführt, bevor die Bedingung überprüft wird.
1. Bedingung: Nachdem der Rumpf ausgeführt wurde, wird die Bedingung überprüft. Wenn die Bedingung als "wahr" ausgewertet wird, wird der Rumpf erneut ausgeführt, und dieser Vorgang wird wiederholt, bis die Bedingung als "falsch" ausgewertet wird.

:::onlineide{id="305682"}

```java
int i = 0;

do {
    System.out.println("Einmal");
} while (i > 0);

System.out.println("und nie wieder");
```


:::