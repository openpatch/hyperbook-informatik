---
name: Kollision erkennen
index: 6
lang: de
---

# Kollision erkennen

Damit unser Spiel noch spannender wird, wollen wir erkennen, wenn die Orange in die Schale fällt und ein Klang abgespielt werden. Dazu müssen wir die Kollision zwischen der Orange und der Schale programmieren.

## Orange programmieren

Dafür müssen wir einen neuen Ereignis-Block der Orange hinzufügen.

1. Wähle die Figur Orange
2. Ziehen einen `Wenn grüne Flagge angeklickt wird`-BLock in den Skriptbereich.

:::alert{info}
Alle `Wenn grüne Flagge angeklickt wird`-Blöcke werden gleichzeitig ausgeführt.
:::

3. Wir wollen nun fortlaufen überprüfen, ob die Orange die Figur `Bowl` berüht. Wenn dies der Fal ist, soll ein Klang abgespielt werden. Anschließend soll die Orange zurückgesetzt werden.

Du bist ja schon gut im Programmieren :smile:. Vielleicht schaffst du es die benötigten Blöcke richtig zusammenzusetzen. Wenn es dir nicht gelinkt, kannst du dir die Lösung anschauen und übernehmen.

:::::tabs{id="790004"}

::::tab{title="Benötigte Blöcke" id="348175"}

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
:::

:::scratchblock{language="de"}
wiederhole fortlaufend
:::

:::scratchblock{language="de"}
falls <>, dann
:::

:::scratchblock{language="de"}
wird (Bowl v) berührt?
:::

:::scratchblock{language="de"}
gehe zu (Zufallsposition v)
setze y auf (180)
:::

:::scratchblock{language="de"}
spiele Klang (Pop v)
:::

::::

::::tab{title="Lösung" id="348179"}

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
wiederhole fortlaufend
falls <wird (Bowl v) berührt?>, dann
    spiele Klang (Pop v)
    gehe zu (Zufallsposition v)
    setze y auf (180)
:::

::::

:::::
