---
name: 📃 Der Game-Loop
index: 3
lang: de
permaid: bunny-hop-game-loop
---

# Der Game-Loop

Fast jedes Computerspiel, das ihr kennt, hat eine Hauptmethode, die die ganze Logik des Spiels enthält. Diese wird entweder durch die Eingabe eines Benutzers oder nach einer bestimmten Zeit aufgerufen. Dieser Zyklus des wiederholten Ausführens der Methode heißt **Game-Loop**.

Einen spannenden und packenden Game Loop zu entwickeln ist das Wichtigste bei der Spieleprogrammierung.

Damit die Entwicklung des Game-Loops funktionieren kann, schauen wir uns zunächst seine Bestandteile an.

## Das ESA-Prinzip

Ähnlich zum EVA-Prinzip (Eingabe-Verarbeitung-Ausgabe) gibt es in der Spieleprogrammierung das ESA-Prinzip (Eingabe-Simulation-Ausgabe) anhand dieses Prinzips kann der Game-Loop strukturiert werden.

:::struktolab{fontSize=15}
```
wiederhole solange Spiel nicht beendet:
    Verarbeitung der Eingaben des Benutzers
    Berechnung des nächsten Zustandes der Simulation
    Ausgabe der Simulation
```
:::

Wir werden uns im folgenden jede Phase im Detail anschauen.

### Eingabe

In der Eingabephase werden die Eingaben des Benutzers verarbeitet. Klassischerweise werden die Tastatur, Maus oder ein Gamepad in der Spieleentwicklung berücksichtigt.

Zum Beispiel im Spiel Mario wird registriert, ob der Benutzer nach links, rechts, oben oder unten gedrückt hat.

:::alert{info}
Anders als beim EVA-Prinzip muss der Benutzer keine Eingabe getätigt haben.
:::

### Simulation

In der Simulationsphase werden die Eingaben verwendet, um den aktuellen Zustand der :t[Attribute]{#attribut} der :t[Objekte]{#objekt} zu verändern.

Beim Spiel Mario löst das Drücken der linken Pfeiltaste aus, dass Mario sich nach links bewegt. Dazu wird seine Geschwindigkeit und Orientierung verändert. Sollte Mario auf ein Hindernis treffen, wird dieses registriert und seine Geschwindigkeit auf 0 gesetzt.

Der Pseudocode des Algorithmus "nach links bewegen" könnte so aussehen:

:::struktolab{fontSize=15}
```
setze Orientierung auf links
verändere Geschwindigkeit um 3
falls maximale Geschwindigkeit erreicht:
    setze Geschwindigkeit auf maximale Geschwindigkeit
sonst:
wiederhole solange Kollision mit Hindernis:
    setze Geschwindigkeit auf 0
    verschiebe Mario nach rechts
```
:::

### Ausgabe

In der Ausgabephase werden alle Objekte gezeichnet.

## Frames

Bestimmt habt ihr schon einmal von Frames gehört oder schon einmal einen Framedrop erlebt. Ein Frame beschreibt eine Ausführung des Game-Loops.
Ziel von Spieleentwicklern ist es, die Zeit zwischen den Frames konstant zu halten, sodass der Benutzer ein ruckelfreies Erlebnis hat. In der Regel werden z. B. 60 oder 120 Frames pro Sekunde angestrebt.

:::alert{info}
Entwickler:innen trennen auf Systemen mit mehreren Kernen den Game-Loop vom Draw Loop.
:::

In der folgenden Abbildung seht ihr vier Frames des Spiels Mario.

![Game Loop Mario visualisiert](/images/bunny-hop/game-loop-mario.png "Visualisierung des Game Loops von Mario")

### Aufgabe
🖊 Ordne die Phasen des Game-Loops Teilen der Abbildung zu.

:::collapsible{title="Lösung" id="frames"}

Die obere Zeile (Player does nothing) ist der Eingabephase zuzuordnen.
Die mittlere Zeile (Mario does nothing) ist der Simulationsphase zuzuordnen.
Die untere Zeile (Bilder) ist der Ausgabephase zuzuordnen.

:::
