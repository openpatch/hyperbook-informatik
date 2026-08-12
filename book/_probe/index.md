---
name: Probe
index: 999
hide: true
---

# Probe

## Fenstergröße in der Online-IDE

Frage: Akzeptiert die Online-IDE ein `Window(800, 400)`, oder bleibt die Bühne bei 480 × 360?

Der Hase sitzt bei (350, 150). Sichtbar ist er nur, wenn die Bühne wirklich 800 × 400 groß ist
(x bis ±400, y bis ±200). Bei 480 × 360 (x bis ±240, y bis ±180) liegt er außerhalb.

:::onlineide{libraries="scratch" height="560px"}

```java Main.java
void main() {
    Window fenster = new Window(800, 400);
    fenster.setStage(new Buehne());
    IO.println("Breite: " + fenster.getWidth() + "  Hoehe: " + fenster.getHeight());
}
```

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        Hase weit = new Hase();
        weit.setPosition(350, 150);
        this.add(weit);

        Hase mitte = new Hase();
        mitte.setPosition(0, 0);
        this.add(mitte);
    }
}
```

```java Hase.java
public class Hase extends Sprite {

    public Hase() {
        this.addCostume("bunny1_stand");
    }
}
```

:::
