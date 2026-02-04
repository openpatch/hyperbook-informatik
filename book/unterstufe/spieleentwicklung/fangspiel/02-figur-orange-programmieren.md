---
name: Figur (Orange) programmieren
index: 2
lang: de
---

# Figur (Orange) programmieren

In Scratch starten wir immer mir einem Ereignis-Block.

## Schritt 1: Ereignis-Block erstellen

1. Klicke auf die Figur Orange
2. Ziehe den Ereignis-Block in den Scriptbereich.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
:::

## Schritt 2: Figur zu Startposition bewegen

1. Klicke auf die Figur Orange
2. Ziehe den Block `gehe zu (Zufallspoistion)` in den Scriptbereich und verbinde ihn mit dem Ereignis-Block.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallspoistion v)
:::

Jetzt wird die Orange immer an einer zufälligen Position auf dem Spielfeld erscheinen.

## Schritt 3: y-Position festlegen

Die Orange soll nur in der x-Position (links-rechts) zufällig gesetzt werden. Die y-Position (oben-unten) soll fest sein, da die Orange vom oberen Rand herunterfallen sollen.

1. Klicke auf die Figur Orange
2. Ziehen den Block `setze y auf (0)` in den Skriptbereich.
3. Setze den Wert auf 180.

:::scratchblock{language="de"}
Wenn die grüne Flagge angeklickt
gehe zu (Zufallspoistion v)
setze y auf (180)
:::