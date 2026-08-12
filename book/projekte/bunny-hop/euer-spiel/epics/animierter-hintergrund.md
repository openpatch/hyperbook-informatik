---
name: 🥈 Animierter Hintergrund
lang: de
---

# Animierter Hintergrund

Für einen animierten Hintergrund können wir genau so vorgehen wie bei der Bewegung der Plattformen.

Für einen animierten Hintergrund benötigen wir eine neue Klasse Hintergrund. Objekte dieser Klasse sollen als Kostüm den Hintergrund bekommen.

:::collapsible{title="Hilfe: Bewegung" id="527783"}

Mit `changeX(wert)` kann die x-Koordinate eines Objekts der Klasse Sprite um einen bestimmten Wert verändert werden.

```java
public void run() {
    // ...
    this.changeX(-0.8);
    // ...
}
```

:::

:::collapsible{title="Hilfe: Wiederholung des Hintergrunds" id="671568"}

Um den Hintergrund nahtlos zu wiederholen, kann man genau so vorgehen wie bei der Plattform. Schaue dir dazu die `Level` und die `Plattform`-Klasse genauer an und versuche die Implementierung auf den Hintergrund zu übertragen.

:::

:::collapsible{title="Hilfe: Beispiel Implementierung" id="9672143"}

::archive[Projekt: Animierter Hintergrund]{name="bunny-hop-epic-animierter-hintergrund"}

:::
