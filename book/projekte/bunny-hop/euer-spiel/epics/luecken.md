---
name: 🥈 Lücken im Boden
index: 3
lang: de
---

# Epic: Lücken im Boden

> Als Spielerin möchte ich über Löcher springen müssen, damit das Springen einen
> Sinn bekommt.

## Die Idee

Nicht jede Plattform kommt zurück: Manche bleibt beim Wiedereinsetzen unsichtbar.
Wer in ein Loch fällt, verliert.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Beim Wiedereinsetzen wird etwa jede fünfte Plattform zu einem Loch.

b) Bugs fällt, wenn unter ihm ein Loch ist.

c) Wer unter die Bühne fällt, hat verloren.

d) 🚀 Sorgt dafür, dass nie zwei Löcher nebeneinander liegen – sonst ist die Lücke nicht zu schaffen.
:::

## Tipps

::::collapsible{title="Tipp 1: Ein Loch ist eine unsichtbare Plattform"}

Am einfachsten bleibt die Plattform an ihrem Platz, wird aber versteckt. Dann
stimmt der Abstand zu den Nachbarn weiterhin:

```java
if (this.getX() < -450) {
    this.changeX(BunnyHop.PLATTFORMEN * BunnyHop.BREITE);
    loch = this.pickRandom(1, 5) == 1;   // jede fünfte wird ein Loch
    if (loch) {
        this.hide();
    } else {
        this.show();
    }
}
```

::::

::::collapsible{title="Tipp 2: Wann fällt Bugs?"}

Bugs fällt, wenn unter ihm gerade ein Loch ist. „Unter ihm" heißt: die Plattform,
deren x-Bereich seine x-Position enthält. Da Bugs immer bei −250 steht, sucht ihr
die Plattform, für die `Math.abs(p.getX() - (-250)) < BunnyHop.BREITE / 2` gilt.

Am übersichtlichsten fragt Bugs die Bühne: „Ist an meiner Stelle ein Loch?" Dafür
muss die Bühne ihre Plattformen kennen – ein Feld im Konstruktor füllen genügt.

::::

:::protect{password="bh-epic-luecken-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

In `Plattform` kommt ein Attribut `loch` dazu (siehe Tipp 1) und dazu:

```java
public boolean istLoch() {
    return loch;
}
```

In `BunnyHop` merkt sich ein Feld die Plattformen, damit man sie später fragen kann:

```java
private Plattform[] boden = new Plattform[PLATTFORMEN];

// im Konstruktor, in der vorhandenen Schleife:
boden[i] = p;

/// Ist an dieser Stelle ein Loch im Boden?
public boolean istLochBei(double x) {
    for (Plattform p : boden) {
        if (Math.abs(p.getX() - x) < BREITE / 2.0) {
            return p.istLoch();
        }
    }
    return false;
}
```

Und in `Spieler.run`, im Zweig für den Boden:

```java
if (amBoden && spiel.istLochBei(this.getX())) {
    amBoden = false;      // der Boden trägt hier nicht
}
```

Damit Bugs im Loch auch wirklich verliert, endet das Spiel, sobald er unter die
Bühne fällt:

```java
if (this.getY() < -220) {
    spiel.spielEnde();
}
```

Wichtig: Die Landeprüfung darf dann nicht mehr bedingungslos auf `BODEN` setzen,
sondern nur, wenn dort kein Loch ist.

:::
