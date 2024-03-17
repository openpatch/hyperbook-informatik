---
name: Bugs lernt springen
index: 3
lang: de
---

# Bugs lernt springen

Als Nächstes möchten wir die Klasse Spieler so modifizieren, dass wir mit der Leertaste springen können.

Nutze die folgende Implementierung der Methode `public void run()` der Klasse `Spieler` als Vorlage:

```java
public void run() {
    this.playAnimation("gehen");

    if (springt) {
        changeY(-sprungGeschwindigkeit);
        if (getY() <= sprungHoehe) {
            faellt = true;
            springt = false;
            setY(sprungHoehe);
        }
    } else if (faellt) {
        changeY(fallGeschwindigkeit);
        if (getY() >= bodenHoehe) {
            faellt = false;
            setY(bodenHoehe);
        }
    }

    if (!faellt && !springt && isKeyPressed(KeyCode.VK_SPACE)) {
        springt = true;
    }
}
```

## Aufgaben

1. Modifiziere die Methode `public void run()` der Klasse `Spieler` so, dass sie der Vorlage (siehe oben) entspricht.
2. Erweitere die Klasse `Spieler` so, dass die fehlenden Attribute `faellt, sprint, bodenHoehe, sprungHoehe, sprungeGeschwindigkeit und fallGeschwindigkeit` ergänzt und mit sinnvollen Werten belegt sind.
