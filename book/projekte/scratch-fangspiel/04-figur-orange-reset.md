---
name: Die Figur (Orange) zurücksetzen
index: 4
lang: de
---

# Die Figur (Orange) zurücksetzen

Die Orange fällt bis zum unteren Rand. Sie soll aber wieder von oben starten. Dafür brauchen wir einen Block aus der Kategorie **Steuerung**.

## Schritt 1: Wenn die Orange den unteren Rand erreicht

1. Klicke auf die Figur Orange.
2. Ziehe den Block `falls, dann sonst` in den Scriptbereich und verbinde ihn mit dem Block `ändere y um (-10)`.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallsposition v)
setze y auf (180)
wiederhole fortlaufend
    falls <>, dann
    sonst
        ändere y um (-10)
:::

## Schritt 2: Bedingung hinzufügen

Bis jetzt funktioniert der neue Block noch nicht, wir brauchen eine Bedingung.

Die y-Position der Orange soll nur geändert werden, wenn sie noch nicht unten angekommen ist. Dazu brauchen wir einen Block aus der Kategorie **Operatoren**.

1. Klicke auf die Figur Orange.
2. Ziehe den Block den kleiner-als-Block in den Block `falls, dann sonst`.
3. Setze den Wert der linken Seite auf `y-Position`. Diesen Block findest du in der Kategorie **Bewegung**.
4. Setze den Wert der rechten Seite auf -180.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallsposition v)
setze y auf (180)
wiederhole fortlaufend
    falls <(y-Position) < (-180)>, dann
    sonst
        ändere y um (-10)
:::

## Schritt 3: Zurücksetzen

Jetzt müssen wir die Orange zurücksetzen.

1. Setze einen weiteren `gehe zu Zufallsposition` Block in den falls, dann Teil.
2. Setze einen weiteren `setze y auf 180` Block in den falls, dann Teil.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallsposition v)
setze y auf (180)
wiederhole fortlaufend
    falls <(y-Position) < (-180)>, dann
        gehe zu (Zufallsposition v)
        setze y auf (180)
    sonst
        ändere y um (-10)
:::

## Ausprobieren

Klick auf die grüne Flagge. Die Orange sollte jetzt immer wieder herunterfallen.