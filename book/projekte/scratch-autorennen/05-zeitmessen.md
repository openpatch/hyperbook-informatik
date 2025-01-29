---
name: Zeitmessen
index: 5
lang: de
---

# Zeitmessen

Für das Messen der Zeit benötigen wir die Stoppuhr. Eine Runde beginnt, wenn man die schwarze Linie überfahren hat. Daher müssen wir das fortlaufend überprüfen.

1. Klick auf die Figur Auto
2. Füge das folgende Skript hinzu

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    falls <wird Farbe [#000] berührt?>, dann
        sage (Stoppuhr) für (1) Sekunden
        setze Stoppuhr zurück
        warte (1) Sekunden
    end
end
:::

## Testen

Leider funktioniert die Stoppuhr nicht immer korrekt. 

Versuche das Spiel auszutricksen. Wie kannst du sehr schnelle Rundenzeiten erreichen?