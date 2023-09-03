---
name: Bedingte Anweisung
lang: de
---

# Bedingte Anweisung

Eine bedingte Anweisung, oft als "if-Anweisung" bezeichnet, ist ein grundlegendes Konzept in der Programmierung, das es ermöglicht, Entscheidungen in einem Computerprogramm zu treffen. 

Eine bedingte Anweisung (if-Anweisung) erlaubt dem Programm, zwischen verschiedenen Aktionen zu wählen, abhängig von bestimmten Bedingungen oder Kriterien. Die grundlegende Idee ist, dass der Computer eine Frage stellt und basierend auf der Antwort entweder eine Aktion ausführt oder sie überspringt.

Hier ist eine einfache Analogie: Stell dir vor, du entscheidest, ob du einen Regenschirm mitnehmen möchtest, wenn du das Wetter draußen betrachtest. Wenn es regnet (eine Bedingung), nimmst du einen Regenschirm (eine Aktion); wenn es nicht regnet, lässt du den Regenschirm zu Hause. Die if-Anweisung in einem Programm funktioniert ähnlich.

:::onlineide{id="229262"}

```java
String wetter = "regnerisch";

if (wetter.equals("regenerisch")) {
    System.out.println("Nimm einen Regenschirm mit.");
} else if(wetter.equals("hitze")) {
    System.out.println("Hole die Badehose raus!");
} else {
    System.out.println("Du kannst den Regenschirm zu Hause lassen.");
}
```

:::