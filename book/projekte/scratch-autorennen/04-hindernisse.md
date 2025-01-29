---
name: Hindernisse
index: 4
lang: de
---

# Hindernisse

Es gibt zwei Hindernisse. Das Hütchen und die Öl-Pfütze.

Im Moment passiert noch nichts, wenn das Auto diese berührt.

Aber das ist ganz leicht umzusetzen.

## Schritt 1: Hütchen

Wenn das Auto das Hütchen berührt, soll es einfach langsamer werden.

1. Klick auf die Figur Auto
2. Ergänze dein Programm

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    setze [Geschwindigkeit v] auf (10)
    falls <wird Farbe [#FFF] berührt?>, dann
        setze [Geschwindigkeit v] auf (4)
    end
    falls <wird Farbe [#5A5] berührt?>, dann
        setze [Geschwindigkeit v] auf (2)
    end
    falls <wird (Hütchen v) berührt?>, dann
        setze [Geschwindigkeit v] auf (0.5)
    end
:::

## Schritt 2: Öl-Pfütze

Bei der Öl-Pfütze soll sich das Auto drehen und danach soll die Öl-Pfütze verschwinden.

Dafür müssen wir zuerst die Figur Auto programmieren.

### Figur: Auto

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    setze [Geschwindigkeit v] auf (10)
    falls <wird Farbe [#FFF] berührt?>, dann
        setze [Geschwindigkeit v] auf (4)
    end
    falls <wird Farbe [#5A5] berührt?>, dann
        setze [Geschwindigkeit v] auf (2)
    end
    falls <wird (Hütchen v) berührt?>, dann
        setze [Geschwindigkeit v] auf (0.5)
    end
    falls <wird (Öl v) berührt?>, dann
        wiederhole (10) mal
            drehe dich nach rechts um (15) Grad
            warte (0.1) Sekunden
        end
    end
:::

### Figur: Öl

Damit sich die Öl-Pfütze versteckt, müssen wir fortlaufend überprüfen, ob diese das Auto berührt. Wenn das der Fall ist, verstecken wir sie.

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    falls <wird (Auto v) berührt?>, dann
        verstecke dich
    end
:::

## Schritt 3: Ausprobieren

Probiere dein Spiel aus. Verändere gerne auch Werte. Das Spiel soll dir Spaß machen :smile:.