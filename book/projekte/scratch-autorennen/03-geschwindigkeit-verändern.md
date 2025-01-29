---
name: Geschwindigkeit verändern
index: 3
lang: de
---

# Geschwindigkeit verändern

Wir programmieren das rote Auto so, dass es sich wie folgt verhält:

- Wenn das rote Auto auf der Straße (graue Farbe) fährt, ist alles OK.

- Wenn das rote Auto den die Straßenkante (weiße Farbe) berührt, sollte es langsamer fahren.

- Wenn das rote Auto auf dem Gras (grüne Farbe) fährt, sollte es sehr langsam fahren.

## 1. Schritt: Geschwindigkeit anpassen

Damit wir die Geschwindigkeit verändern können, brauchen wir eine Variable.

1. Klicke auf die Figur Auto.
2. Klick auf die orange Kategorie Variablen.
3. Erstelle eine neue Variable Geschwindigkeit nur für diese Figur.

![](/images/scratch/geschwindigkeit-fuer-diese-figur.png)

4. Ersetze die 10 in gehe Schritte durch die Variable Geschwindigkeit.

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    falls <Taste (Pfeil nach oben v) gedrückt?>, dann
        gehe (Geschwindigkeit) er Schritte :: motion stack
    end
    falls <Taste (Pfeil nach rechts v) gedrückt?>, dann
        drehe dich nach rechts um (5) Grad
    end
    falls <Taste (Pfeil nach links v) gedrückt?>, dann
        drehe dich nach links um (5) Grad
:::

## 2. Schritt: Straßenkante

Damit wir die Geschwindigkeit verändern können, wenn das Auto eine bestimmte Farbe berührt, benötigen wir einen weiteren Ereigniss-Block.

:::scratchblock{language="de"}

Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
    setze [Geschwindigkeit v] auf (10)
    falls <wird Farbe [#FFF] berührt?>, dann
        setze [Geschwindigkeit v] auf (4)
    end
:::

:::alert{info}

Hier siehst du wie du die richtige Farbe auswählen kannst.

![](/images/scratch/farbe-auswaehlen.gif)

:::

## 3. Schritt: Gras

Das Gleiche müssen wir nochmal für das Gras, also die Farbe Grün, machen.

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
:::