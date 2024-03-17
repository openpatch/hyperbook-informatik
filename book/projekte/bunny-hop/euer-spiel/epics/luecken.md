---
name: 🥉 Lücken
lang: de
---

# Epic: Lücken

Damit Lücken zwischen den Plattformen entstehen, müssen wir die x-Position der "neuen" Plattform entsprechend verändern.

:::collapsible{title="Hilfe: Zufällige x-Position" id="157203"}

```java
p.setPosition(
    letzte.getX() + letzte.getWidth() / 2 + p.getWidth() /2 + this.pickRandom(50, 150), 
    340);
```

:::

:::collapsible{title="Hilfe: Ersten 5 Plattformen ohne Lücke" id="171124"}

Wenn wir erreichen möchten, dass die ersten 5 Plattformen ohne Lücken generiert werden, dann müssen wir die Plattformen zählen und unseren Algorithmus anpassen.

```java
int luecke = 0;
// Alle 5 Plattformen soll eine Lücke generiert werden.
if (anzahlPlattformen % 5 == 0) {
    luecke= this.pickRandom(50, 150);
}
p.setPosition(
    letzte.getX() + letzte.getWidth() / 2 + p.getWidth() /2 + luecke, 
    340);
```

Versuche `anzahlPlattformen` zu implementieren.

:::

:::collapsible{title="Hilfe: Beispiel Implementierung" id="9672849234"}

::archive[BlueJ Projekt: Epic Lücken]{name="bunny-hop-epic-luecken"}

:::