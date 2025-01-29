---
name: Das rote Auto steuern
index: 2
lang: de
---

# Das rote Auto steuern

In diesem Schritt programmieren wir das rote Auto. Du solltest es anschließend mit den Pfeiltasten steuern können.

Zuerst programmieren wir es mit einer festen Geschwindigkeit.

## Schritt 1: Ereignis-Block erstellen

1. Klicke auf die Figur Auto
2. Ziehe den Ereignis-Block in den Scriptbereich.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
:::

## Schritt 2: Bewegung hinzufügen

Wenn wir nach oben drücken, soll das Auto losfahren.

Wenn wir nach rechts oder links drücken, soll sich das Auto drehen.

Übertrage das Skript in dein Programm.

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    falls <Taste (Pfeil nach oben v) gedrückt?>, dann
        gehe (10) er Schritte :: motion stack
    end
    falls <Taste (Pfeil nach rechts v) gedrückt?>, dann
        drehe dich nach rechts um (5) Grad
    end
    falls <Taste (Pfeil nach links v) gedrückt?>, dann
        drehe dich nach links um (5) Grad
:::

### Schritt 3: Ausprobieren

Drücke die grüne Flagge und probiere aus, ob sich das Auto steuern lässt.