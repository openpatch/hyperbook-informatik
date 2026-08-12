---
name: 🥈 Tag und Nacht
index: 4
lang: de
---

# Epic: Tag und Nacht

> Als Spieler möchte ich sehen, dass die Zeit vergeht, damit ein langer Lauf sich
> auch lang anfühlt.

## Die Idee

Der Himmel wechselt langsam von Tag zu Nacht und zurück.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Der Himmel wird langsam dunkler und wieder heller.

b) Der Wechsel soll weich sein, nicht sprunghaft.

c) 🚀 Nachts gibt es doppelte Punkte.
:::

## Tipps

::::collapsible{title="Tipp 1: Zeit messen"}

Jede Bühne hat Uhren. `this.getTimer("tag").everyMillis(15000)` ist alle 15
Sekunden einmal wahr – genau einmal, nicht 60-mal in der Sekunde.

::::

::::collapsible{title="Tipp 2: Weich statt hart"}

`setColor(r, g, b)` schaltet die Hintergrundfarbe sofort um. Für einen weichen
Übergang zählt ihr in jedem Bild ein kleines Stück:

```java
helligkeit = helligkeit + richtung;
if (helligkeit > 100 || helligkeit < 0) {
    richtung = -richtung;
}
this.setColor(helligkeit * 1.4, helligkeit * 2.0, helligkeit * 2.35);
```

::::

:::protect{password="bh-epic-nacht-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

In `BunnyHop`:

```java
private double helligkeit = 100;
private double richtung = -0.05;

public void run() {
    if (!vorbei) {
        anzeige.showText("Punkte: " + punkte);

        helligkeit = helligkeit + richtung;
        if (helligkeit > 100 || helligkeit < 20) {
            richtung = -richtung;
        }
        this.setColor(helligkeit * 1.4, helligkeit * 2.0, helligkeit * 2.35);
    }
}

/// Ist es gerade hell?
public boolean istTag() {
    return helligkeit > 60;
}
```

Bei 100 ergibt das wieder das gewohnte Himmelblau (140, 200, 235), bei 20 ein
dunkles Nachtblau. Mit `istTag()` könnt ihr weitergehen: Sterne einblenden,
nachts mehr Punkte geben oder die Deko dunkler färben (`setTint`).

:::
