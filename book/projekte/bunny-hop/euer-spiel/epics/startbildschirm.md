---
name: 🥉 Startbildschirm
index: 1
lang: de
---

# Epic: Startbildschirm

> Als Spielerin möchte ich vor dem Start eine Titelseite sehen, damit ich nicht
> mitten im Lauf überrascht werde.

## Die Idee

Eine zweite Bühne. Sie zeigt den Titel und wartet auf die Eingabetaste; erst
danach kommt das eigentliche Spiel auf den Schirm.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Legt eine Klasse `Startbildschirm` an, die von `Stage` erbt und den Titel zeigt.

b) Startet das Programm mit dem Startbildschirm.

c) Mit der Eingabetaste geht es ins Spiel.

d) 🚀 Nach dem Spielende führt **r** zurück zum Startbildschirm statt direkt ins Spiel.
:::

## Tipps

::::collapsible{title="Tipp 1: Eine Bühne ist eine Klasse wie jede andere"}

```java
public class Startbildschirm extends Stage {

    private Text titel;

    public Startbildschirm() {
        this.setColor(140, 200, 235);
        titel = new Text();
        titel.setPosition(0, 0);
        titel.setTextSize(28);
        this.add(titel);
    }

    public void run() {
        titel.showText("Bunny Hop\n\nEnter drücken zum Starten");
    }
}
```

::::

::::collapsible{title="Tipp 2: Umschalten"}

`Window.getInstance().setStage(new BunnyHop());` setzt die andere Bühne ein –
dieselbe Zeile, die schon beim Neustart nach dem Spielende steht.

Denkt daran, in `Main.java` mit dem Startbildschirm zu beginnen.

::::

:::protect{password="bh-epic-start-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public void whenKeyPressed(KeyCode taste) {
    if (taste == KeyCode.ENTER) {
        Window.getInstance().setStage(new BunnyHop());
    }
}
```

Und in `Main.java`:

```java
void main() {
    Window fenster = new Window(800, 400);
    fenster.setStage(new Startbildschirm());
}
```

Schöner wird es mit `transitionToStage(new BunnyHop(), 500)`: Dann blendet die
alte Bühne in einer halben Sekunde weg.

:::
