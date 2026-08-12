---
name: 🥈 Hintergrundobjekte
lang: de
---

# Epic: Hintergrundobjekte

Ein Hintergrundobjekt funktioniert ähnlich zum Stachelfeind. Der Unterschied ist lediglich, dass keine Interaktion mit Objekten der Spieler-Klasse stattfindet und die Hintergrundobjekte vielleicht in unterschiedlichen Abständen voneinander erscheinen sollen.

:::collapsible{title="Hilfe: Eine Klasse verschiedene Grafiken" id="568254"}

Mit dem folgenden Quelltext werden einem Objekte verschiedene Kostüme hinzugefügt und anschließend eins zufällig ausgewählt.

```java
this.addCostume("kaktus", "cactus");
this.addCostume("grass1", "grass1");
this.addCostume("pilz-braun", "mushroom_brown");
this.addCostume("pilz-rot", "mushroom_red");

// wähle ein zufälliges Kostüm
for (int i = 0; i < this.pickRandom(0, 4); i++) {
    this.nextCostume();
}
```

:::


:::collapsible{title="Hilfe: Ein Hintergrundobjekt pro Plattform" id="630671"}

Jede Plattform könnte ein neues Attribut `deko` bekommen, welches vom Datentyp `HintergrundObjekt` ist. Um das Objekt an die Plattform zu "binden", müssen wir zwei Sachen implementieren.

1. Wenn ein Objekt der Klasse-Plattform der Stage hinzugefügt wird, dann soll auch ein Objekt der Klasse-Deko erstellt werden.

```java
// Diese Methode wird aufgerufen, wenn ein Sprite-Objekt einer Stage hinzugefügt wird.
public void addedToStage(Stage stage) {
    super.addedToStage(stage);
    deko = new HintergrundObjekt();
    // Die Deko soll nicht immer in der Mitte der Plattform sein,
    // daher generieren wir eine Zufallszahl.
    // Da die Deko auch nicht direkt am Rand der Plattform sein soll,
    // lassen wird am Anfang und am Ende einen Puffer von 20 Pixeln.
    dekoOffset = this.pickRandom(-this.getWidth() / 2 + 20, this.getWidth() / 2 - 20);
    stage.add(deko);
}
```

2. Muss die Position der Deko immer verändert werden, wenn sich die Position der Plattform ändert.

```java
deko.setY(this.getY() - this.getHeight() / 2 - deko.getHeight() / 2);
deko.setX(this.getX());
```

:::

:::collapsible{title="Hilfe: Beispiel Implementierung" id="9672149234"}

::archive[Projekt: Epic Hintergrund Objekte]{name="bunny-hop-epic-hintergrund-objekte"}

:::
