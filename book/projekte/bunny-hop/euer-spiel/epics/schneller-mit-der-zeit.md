---
name: 🥉 Schwieriger mit der Zeit
index: 5
lang: de
---

# Epic: Schwieriger mit der Zeit

> Als Spielerin möchte ich, dass es mit der Zeit schwerer wird, damit ein Lauf
> nicht ewig gleich bleibt.

## Die Idee

Im Grundspiel steigt das Tempo nur, wenn Münzen eingesammelt werden. Wer keine
nimmt, läuft ewig gemütlich weiter. Besser: Das Spiel zieht **von selbst** an.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Alle fünf Sekunden wird das Spiel ein Stück schneller.

b) Deckelt die Geschwindigkeit, damit es spielbar bleibt.

c) Zeigt das aktuelle Tempo neben den Punkten an.
:::

## Tipps

::::collapsible{title="Tipp 1: Regelmäßig etwas tun"}

```java
if (this.getTimer().everyMillis(5000)) {
    geschwindigkeit = geschwindigkeit + 0.5;
}
```

Das gehört in die `run`-Methode der Bühne – aber nur, solange das Spiel läuft.

::::

::::collapsible{title="Tipp 2: Nicht ins Unendliche"}

Ab etwa 12 wird das Spiel unspielbar, weil die Plattformen pro Bild weiter
springen, als Bugs breit ist. Deckelt den Wert:

```java
if (geschwindigkeit > 10) {
    geschwindigkeit = 10;
}
```

::::

:::protect{password="bh-epic-tempo-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public void run() {
    if (!vorbei) {
        anzeige.showText("Punkte: " + punkte + "   Tempo: " + Math.round(geschwindigkeit));

        if (this.getTimer("tempo").everyMillis(5000) && geschwindigkeit < 10) {
            geschwindigkeit = geschwindigkeit + 0.5;
        }
    }
}
```

Zwei Dinge fallen beim Ausprobieren auf:

1. Mit steigendem Tempo wird der Sprung **relativ** kürzer – Bugs kommt über
   weniger Boden. Wer das ausgleichen will, erhöht die Sprungkraft mit.
2. Die Uhr läuft auch während des Spielendes weiter. Weil `run` dann nichts mehr
   tut, macht das hier nichts – bei anderen Epics muss man daran denken.

:::
