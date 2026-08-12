---
name: 🥇 Ducken
index: 6
lang: de
---

# Epic: Ducken

> Als Spieler möchte ich mich ducken können, damit ich fliegenden Feinden
> ausweichen kann, ohne zu springen.

## Die Idee

Ein Feind kommt in Kopfhöhe angeflogen. Springen hilft nicht – wer die
Pfeiltaste nach unten drückt, duckt sich darunter weg.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Baut eine Klasse `Flieger`, die in Kopfhöhe von rechts kommt.

b) Mit der Pfeiltaste nach unten duckt sich Bugs.

c) Geduckt fliegt der Feind über ihn hinweg, stehend trifft er.

d) 🚀 Bugs soll sich nur am Boden ducken können, nicht im Sprung.
:::

## Tipps

::::collapsible{title="Tipp 1: Ducken ist ein Kostüm plus eine kleinere Hitbox"}

`bunny1_ready` zeigt Bugs geduckt. Damit der Feind wirklich über ihn hinwegfliegt,
muss Bugs aber auch **kleiner** werden: Die Trefferfläche richtet sich nach dem
Kostüm und seiner Größe.

`setSize(35)` beim Ducken und `setSize(50)` beim Aufrichten genügt dafür.

::::

::::collapsible{title="Tipp 2: Der fliegende Feind"}

Eine neue Klasse, fast wie `Stachel`, nur höher und mit einem anderen Kostüm:

```java
public class Flieger extends Sprite {

    private BunnyHop spiel;

    public Flieger(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("fliegen", "flyMan_fly");
        this.setSize(50);
        this.setPosition(600, 10);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit() * 1.5);
        if (this.getX() < -450) {
            this.setX(450 + this.pickRandom(0, 400));
        }
    }
}
```

::::

:::protect{password="bh-epic-ducken-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

In `Spieler`:

```java
private boolean geduckt = false;

// im Konstruktor:
this.addCostume("ducken", "bunny1_ready");

// in run(), im Zweig für den Boden:
if (this.isKeyPressed(KeyCode.DOWN)) {
    if (!geduckt) {
        geduckt = true;
        this.switchCostume("ducken");
        this.setSize(35);
        this.setY(BODEN - 12);
    }
} else if (geduckt) {
    geduckt = false;
    this.setSize(50);
    this.setY(BODEN);
}

if (!geduckt) {
    this.playAnimation("gehen");
}
```

Die Trefferfläche folgt dem Kostüm und der Größe – wer kleiner ist, wird weniger
getroffen. Mit `Window.getInstance().setDebug(true)` seht ihr sie und könnt die
Zahlen anpassen, bis das Ducken sich richtig anfühlt.

Und im `Flieger` denkt daran: Er darf Bugs nur treffen, wenn der **nicht** geduckt
ist – oder ihr macht es sich einfach und verlasst euch ganz auf die kleinere
Hitbox. Zweiteres ist die ehrlichere Lösung, weil die Kollision dann dort
entschieden wird, wo sie hingehört.

:::
