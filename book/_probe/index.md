---
name: Probe
index: 999
hide: true
---

# Probe

## Fenstergröße in der Online-IDE

Beantwortet am 12.08.2026 mit hyperbook 0.104.2: **Ja.** Die Ausgabe lautet
`Breite: 800  Hoehe: 400`, und beide Hasen sind sichtbar. Mit 0.104.1 blieb die
Bühne bei 480 × 360 und der rechte Hase fehlte.

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
