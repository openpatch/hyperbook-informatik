---
title: Unsere kleine Stadt
index: 1
---

# Unsere kleine Stadt

Dieses Projekt ist **arbeitsteilig** angelegt: Jede Gruppe baut ein Stück der Stadt, und am Ende setzt ihr alle Teile zu einem gemeinsamen Bild zusammen.

Damit das gelingt, müsst ihr euch vorher auf **Schnittstellen** einigen. Genau darum geht es hier.

## Das Ziel

Auf der Bühne entsteht eine Stadt: Häuser, Bäume, ein Turm, Wolken, eine Sonne, vielleicht ein Fluss oder eine Straßenbahn. Jede Gruppe steuert mindestens eine eigene Klasse bei.

## Die gemeinsame Grundlage

:::snippet{#merken}
Bevor irgendjemand programmiert, einigt euch als **ganze Lerngruppe** auf diese Punkte:

1. Jedes Stadtobjekt ist eine eigene Klasse, die von `Sprite` erbt.
2. Der Konstruktor bekommt **immer** die Parameter `(int pX, int pY)` – die Position auf der Bühne.
3. Die Klasse zeichnet sich selbst, ohne von außen weitere Aufrufe zu brauchen.
4. Der Klassenname beginnt groß und beschreibt den Gegenstand: `Haus`, `Baum`, `Turm`, `Wolke`.
5. Jede Klasse ist **kommentiert**: Was stellt sie dar? Was bedeuten ihre Parameter?

Diese fünf Punkte sind eure **Schnittstellenvereinbarung**. Wer sich daran hält, dessen Klasse lässt sich ohne Rückfragen in die gemeinsame Stadt einbauen.
:::

## Das Gerüst

:::onlineide{libraries="scratch" height="700px"}

```java Main.java
void main() {
    new Stadt();
}
```

```java Stadt.java
public class Stadt extends Stage {

    public Stadt() {
        // Hier trägt jede Gruppe ihre Objekte ein.
        this.add(new Haus(-150, -80));
        this.add(new Haus(-40, -90));
        this.add(new Baum(80, -80));
        this.add(new Wolke(120, 110));
    }
}
```

```java Haus.java
/**
 * Ein einfaches Haus mit Wand und Satteldach.
 */
public class Haus extends Sprite {

    private Pen stift;

    /**
     * Erzeugt ein Haus.
     * @param pX x-Koordinate der Hausmitte
     * @param pY y-Koordinate der Grundlinie
     */
    public Haus(int pX, int pY) {
        this.hide();
        this.setPosition(pX, pY);
        stift = new Pen();
    }

    public void whenAddedToStage() {
        this.getStage().add(stift);
        zeichne((int) this.getX(), (int) this.getY());
    }

    /** Zeichnet das Haus an der angegebenen Stelle. */
    private void zeichne(int pX, int pY) {
        stift.setSize(3);
        stift.setColor(60, 40, 30);

        stift.setPosition(pX - 40, pY);
        stift.down();
        stift.setPosition(pX + 40, pY);
        stift.setPosition(pX + 40, pY + 70);
        stift.setPosition(pX, pY + 115);
        stift.setPosition(pX - 40, pY + 70);
        stift.setPosition(pX - 40, pY);
        stift.setPosition(pX + 40, pY + 70);
        stift.up();
    }
}
```

```java Baum.java
/**
 * Ein Baum mit Stamm und runder Krone.
 */
public class Baum extends Sprite {

    private Pen stift;

    /**
     * Erzeugt einen Baum.
     * @param pX x-Koordinate des Stamms
     * @param pY y-Koordinate der Grundlinie
     */
    public Baum(int pX, int pY) {
        this.hide();
        this.setPosition(pX, pY);
        stift = new Pen();
    }

    public void whenAddedToStage() {
        this.getStage().add(stift);
        zeichne((int) this.getX(), (int) this.getY());
    }

    private void zeichne(int pX, int pY) {
        stift.setSize(8);
        stift.setColor(90, 60, 30);
        stift.setPosition(pX, pY);
        stift.down();
        stift.setPosition(pX, pY + 50);
        stift.up();

        stift.setSize(50);
        stift.setColor(30, 140, 40);
        stift.setPosition(pX, pY + 75);
        stift.down();
        stift.up();
    }
}
```

```java Wolke.java
/**
 * Eine Wolke aus drei überlappenden Punkten.
 */
public class Wolke extends Sprite {

    private Pen stift;

    /**
     * Erzeugt eine Wolke.
     * @param pX x-Koordinate der Wolkenmitte
     * @param pY y-Koordinate der Wolkenmitte
     */
    public Wolke(int pX, int pY) {
        this.hide();
        this.setPosition(pX, pY);
        stift = new Pen();
    }

    public void whenAddedToStage() {
        this.getStage().add(stift);
        zeichne((int) this.getX(), (int) this.getY());
    }

    private void zeichne(int pX, int pY) {
        stift.setColor(230, 230, 240);
        stift.setSize(38);

        stift.setPosition(pX - 22, pY);
        stift.down();
        stift.up();
        stift.setPosition(pX, pY + 8);
        stift.down();
        stift.up();
        stift.setPosition(pX + 22, pY);
        stift.down();
        stift.up();
    }
}
```

:::

:::snippet{#merken}
Zwei Dinge im Gerüst verdienen Beachtung:

- `this.hide()` macht die Figur selbst unsichtbar. Sichtbar ist nur das, was ihr Stift zeichnet. Die Figur dient nur als Träger für Position und Zeichenmethode.
- `whenAddedToStage()` wird aufgerufen, sobald das Objekt auf der Bühne ist. Vorher gibt es noch keine Bühne, der Stift könnte also gar nicht hinzugefügt werden.
:::

## Der Ablauf

:::snippet{#aufgabe}
**Phase 1 – Planung im Plenum (eine Stunde)**

a) Sammelt an der Tafel, was in eurer Stadt vorkommen soll.

b) Verteilt die Gegenstände auf die Gruppen. Achtet darauf, dass niemand zwei sehr aufwendige bekommt.

c) Legt gemeinsam fest, wo die Grundlinie der Stadt liegt (Vorschlag: y = −80) und wie hoch der Himmel reicht.

d) Haltet die Schnittstellenvereinbarung schriftlich fest.

**Phase 2 – Arbeit in Gruppen (zwei bis drei Stunden)**

e) Entwickelt eure Klasse. Skizziert **zuerst auf Papier**, welche Linien und Punkte sie zeichnet, und tragt die Koordinaten relativ zu `pX` und `pY` ein.

f) Testet eure Klasse allein: Erzeugt in einer eigenen Bühne mehrere Objekte davon an unterschiedlichen Positionen. Sieht es überall gleich gut aus?

g) Kommentiert eure Klasse so, dass eine andere Gruppe sie ohne Rückfragen verwenden kann.

**Phase 3 – Zusammenbau (eine Stunde)**

h) Tragt alle Klassen in ein gemeinsames Projekt ein.

i) Komponiert in `Stadt` ein Bild daraus.

j) Was hat beim Zusammenbau nicht auf Anhieb funktioniert? Woran lag es?
:::

## Erweiterungen

:::snippet{#brain}
Wenn eure Stadt steht, könnt ihr sie zum Leben erwecken:

**Tag und Nacht.** Ergänzt in jeder Klasse eine Methode `setzeAufNacht()`, die die Farben ändert – dunklere Häuser, erleuchtete Fenster, ein dunkler Himmel. Eine Taste schaltet zwischen Tag und Nacht um.

Überlegt dabei: Wo müsste diese Methode eigentlich stehen, damit ihr sie in `Stadt` **einheitlich für alle Objekte** aufrufen könnt, ohne jede Klasse einzeln zu behandeln?

Die saubere Antwort auf diese Frage heißt **abstrakte Klasse** – und ist das erste Thema im Lernpfad *Erweiterungen*.

**Bewegung.** Lasst die Wolken langsam nach rechts ziehen und links wieder erscheinen. Dafür braucht ihr `run()` und müsst den Stift vor dem Neuzeichnen mit `eraseAll()` löschen.

**Interaktion.** Ein Klick auf ein Haus lässt seine Fenster leuchten.
:::

## Beurteilung

:::snippet{#merken}
Woran könnt ihr eure Arbeit messen? Ein Vorschlag für gemeinsame Kriterien:

| Kriterium | Frage |
| --- | --- |
| Schnittstelle | Lässt sich die Klasse ohne Änderung in die gemeinsame Stadt einbauen? |
| Position | Sieht der Gegenstand an **jeder** Position richtig aus? |
| Modularisierung | Steht jede Teilzeichnung in einer eigenen, benannten Methode? |
| Dokumentation | Versteht eine andere Gruppe die Klasse ohne Nachfrage? |
| Lesbarkeit | Sagen die Bezeichner, was sie enthalten? |

Beurteilt euch am Ende **gegenseitig** nach diesen Kriterien – jede Gruppe die Klasse einer anderen.
:::
