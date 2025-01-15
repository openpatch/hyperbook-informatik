---
name: Das Fallen der Figur (Orange) programmieren
index: 3
lang: de
---

# Das Fallen der Figur (Orange) programmieren

Damit die Orange auch herunterfällt und nicht am oberen Rand bleibt, müssen wir dies programmieren.

Dazu verwenden wir einen Block aus der Kategorie **Steuerung**.

## Schritt 1: Wiederholung hinzufügen

1. Klicke auf die Figur Orange.
2. Ziehe den Block `wiederhole fortlaufend` in den Scriptbereich und verbinde ihn mit dem Ereignis-Block.
3. Ziehe den Block `änder y um 0` in den Block `wiederhole fortlaufend` und verändere den Wert auf -10.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallspoistion v)
setze y auf (180)
wiederhole fortlaufend
    ändere y um (-10)
:::

Jetzt fällt die Orange nach Unten.

## Ausprobieren

Probiere es durch Anklicken der grünen Flagge aus.