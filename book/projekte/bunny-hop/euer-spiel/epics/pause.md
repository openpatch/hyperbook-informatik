---
name: 🥉 Pause
index: 2
lang: de
---

# Epic: Pause

> Als Spieler möchte ich das Spiel anhalten können, wenn jemand an die Tür klopft.

## Die Idee

Die Taste **p** hält die Welt an und lässt sie wieder los.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Die Taste **p** hält das Spiel an und lässt es wieder laufen.

b) Auch Bugs muss stehen bleiben – nicht nur die Welt um ihn herum.

c) Zeigt während der Pause einen Hinweis an.
:::

## Tipps

::::collapsible{title="Tipp 1: Wer steht schon still?"}

Beim Spielende bleibt bereits alles stehen. Seht euch an, wie das gemacht ist:
`getGeschwindigkeit()` gibt 0 zurück, und alle beweglichen Objekte fragen genau
diese Methode.

Pause ist derselbe Gedanke mit einem zweiten Merkmal.

::::

::::collapsible{title="Tipp 2: Umschalten mit einer Taste"}

`whenKeyPressed` wird einmal pro Tastendruck aufgerufen – nicht in jedem Bild.
Ein `boolean` lässt sich damit einfach umkehren:

```java
pause = !pause;
```

::::

:::protect{password="bh-epic-pause-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

In `BunnyHop`:

```java
private boolean pause = false;

public void whenKeyPressed(KeyCode taste) {
    if (vorbei && taste == KeyCode.R) {
        Window.getInstance().setStage(new BunnyHop());
    }
    if (!vorbei && taste == KeyCode.P) {
        pause = !pause;
    }
}

public double getGeschwindigkeit() {
    if (vorbei || pause) {
        return 0;
    }
    return geschwindigkeit;
}

public boolean istPausiert() {
    return pause;
}
```

In `Spieler.run` kommt oben dazu:

```java
if (spiel.istPausiert()) {
    return;
}
```

Sonst springt Bugs weiter, während die Welt steht. Wer mag, zeigt in `run` der
Bühne zusätzlich „Pause – p drücken zum Weiterspielen" an.

:::
