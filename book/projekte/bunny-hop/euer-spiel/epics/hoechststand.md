---
name: 🥈 Höchststand
index: 7
lang: de
---

# Epic: Höchststand

> Als Spielerin möchte ich sehen, ob ich meinen eigenen Rekord geschlagen habe.

## Die Idee

Nach dem Spielende steht neben den Punkten der beste Wert dieser Sitzung – und er
übersteht den Neustart mit **r**.

## Deine Aufgabe

:::snippet{#aufgabe}
a) Merkt euch den besten Punktestand über den Neustart hinweg.

b) Zeigt ihn nach dem Spielende an.

c) Sagt es deutlich, wenn ein neuer Rekord aufgestellt wurde.
:::

## Tipps

::::collapsible{title="Tipp 1: Warum ein normales Attribut nicht reicht"}

Beim Neustart entsteht mit `new BunnyHop()` eine **neue** Bühne. Alles, was in
ihr steht, fängt bei null an – auch euer Rekord.

::::

::::collapsible{title="Tipp 2: Ein Wert, der der Klasse gehört"}

```java
private static int rekord = 0;
```

`static` heißt: Dieses Attribut gehört zur **Klasse**, nicht zu einem einzelnen
Objekt. Es gibt es genau einmal, egal wie viele Bühnen entstehen – und deshalb
überlebt es den Neustart.

::::

:::protect{password="bh-epic-rekord-1" description="Eine mögliche Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
private static int rekord = 0;

public void spielEnde() {
    vorbei = true;
    if (punkte > rekord) {
        rekord = punkte;
        anzeige.showText("Neuer Rekord: " + punkte + " - drücke r für ein neues Spiel");
    } else {
        anzeige.showText("Ende! Punkte: " + punkte + "   Rekord: " + rekord
            + " - drücke r für ein neues Spiel");
    }
}
```

Beim Schließen des Fensters ist der Rekord weg – er lebt nur im Arbeitsspeicher.
Wer ihn wirklich behalten will, muss ihn in eine Datei schreiben; das geht in der
Online-IDE nicht, in eurem heruntergeladenen Projekt aber schon.

:::
