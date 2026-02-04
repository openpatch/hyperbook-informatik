---
name: Figur (Korb) steuern
index: 5
lang: de
---

# Figur (Korb) steuern

Jetzt wollen wir die herunterfallende Orange mit unserem Korb auffangen können.

Dazu müssen wir den Korb steueren können. Dies können wir entweder über die Tastur oder über den Touchscreen ermöglichen.

Suche dir eine von den beiden Arten aus.

:::::tabs{id="steuerung"}

::::tab{title="Tastatur" id="tastatur"}

Wenn die Pfeiltaste nach lniks gedrückt wird, soll die x-Position (links-rechts) der Orange kleiner werden. Das heißt, dass sie nach links wandert.

Wenn die Pfeiltaste nach rechts gedrückt wird, soll die x-Position (links-rechts) der Orange größer werden. Das heißt, dass sie nach rechts wandert.

:::scratchblock{language="de"}
Wenn Taste (Pfeil nach links v) gedrückt wird
ändere x um (-10)
:::

:::scratchblock{language="de"}
Wenn Taste (Pfeil nach rechts v) gedrückt wird
ändere x um (10)
:::


::::

::::tab{title="Touchscreen" id="touchscreen"}

Für die Steuerung mit dem Touchscreen brauchen wir zwei neue Figuren.

## Schritt 1: Figuren hinzufügen

### Linker Button

1. Klicke das Katzen-Symbol mit dem Plus in der unteren rechten an.
2. Klicke die Lupe an.
3. Füge die Figure Button1 hinzu
4. Benenne die Figur um in: Links
5. Verschiebe die Figur auf die linke Seite

### Rechter Button

1. Klicke das Katzen-Symbol mit dem Plus in der unteren rechten an.
2. Klicke die Lupe an.
3. Füge die Figure Button1 hinzu
4. Benenne die Figur um in: Rechts
5. Verschiebe die Figur auf die rechte Seite

## Schritt 2: Button programmieren

### Linker Button

1. Wähle die Figur Links aus.
2. Ziehe das Ereignis `Wenn diese Figur angeklickt wird` in den Skriptbereich.
3. Ziehe `sende (Nachricht1) an alle` in den Skriptbereich
4. Verändere die Nachricht zu `Links gedrückt`.

:::scratchblock{language="de"}
Wenn diese Figur angeklickt wird
sende (Links gedrückt v) an alle
:::

#### Rechter Button

1. Wähle die Figur Rechts aus.
2. Ziehe das Ereignis `Wenn diese Figur angeklickt wird` in den Skriptbereich.
3. Ziehe `sende (Nachricht1) an alle` in den Skriptbereich
4. Verändere die Nachricht zu `Rechts gedrückt`.

:::scratchblock{language="de"}
Wenn diese Figur angeklickt wird
sende (Rechts gedrückt v) an alle
:::

## Schritt 3: Schale programmieren

1. Wähle die Figur Bowl aus.
2. Ziehe das Ereignis `Wenn ich (Nachricht) empfange in den Skriptbereich.
3. Verändere die Nachricht aus `Links gedrückt`.
4. Ziehe den Block `ändere x um -10` untere das Ereignis.
5. Wiederhole die Schritte für die Nachricht `Rechts gedrückt`.

:::scratchblock{language="de"}
Wenn ich (Links gedrückt v) empfange
ändere x um (-10)
:::

:::scratchblock{language="de"}
Wenn ich (Rechts gedrückt v) empfange
ändere x um (10)
:::

::::

:::::

## Steuerung ausprobieren

Probiere aus den Korb zu steueren.