---
title: Unsere kleine Stadt
index: 2
---

# Projekt: Unsere kleine Stadt

Ähnlich wie beim Dorf aus dem Funktionen-Kapitel sollen in Projektarbeit Bilder einer **Stadt** entstehen.

Das Besondere an diesem Projekt: Ihr entwickelt die Bausteine **gemeinsam** und tauscht sie untereinander aus. Genau so arbeiten Softwareteams.

![Ein Baum, ein Haus mit rotem Dach und noch ein Baum](../04-funktionen/01-dorf.png)

## Ablauf des Projekts

:::snippet{#merken}
**Phase 1 – Ideen sammeln.** Jede und jeder sammelt zunächst für sich Ideen, was in einem solchen Bild zu sehen sein könnte. Danach werden alle Ideen an der Tafel gesammelt.

**Phase 2 (erste Hauptphase) – Funktionen entwickeln.** Jede Gruppe wählt eine der Ideen aus und entwickelt eine Funktion zum Zeichnen des entsprechenden Objekts. Wer fertig ist, wählt sich die nächste Idee – und so fort.

**Phase 3 – Austauschen.** Alle Funktionen werden gesammelt und ausgetauscht, sodass allen Gruppen alle Funktionen zur Verfügung stehen.

**Phase 4 (zweite Hauptphase) – Das Bild bauen.** Mit möglichst vielen der Funktionen erstellt jede Gruppe ein Bild einer Stadt.

Sollten mit einzelnen Funktionen Probleme auftreten, gebt bitte Rückmeldung an die Entwicklerinnen und Entwickler und bittet um Nachbesserung.

**Phase 5 – Betrachten und reflektieren.** Wir betrachten die Bilder und reflektieren, wie das Projekt gelaufen ist.
:::

## Die wichtigste Regel

:::snippet{#brain}
Damit eure Funktionen zusammenpassen, müsst ihr euch auf gemeinsame Regeln einigen. Das nennt man eine **Schnittstelle**.

Vereinbart mindestens dies:

1. **Startpunkt.** Die Turtle steht beim Aufruf am **unteren linken Punkt** des Objekts und schaut nach rechts (`setheading(0)`).
2. **Endpunkt.** Am Ende steht die Turtle **wieder genau dort** und schaut wieder nach rechts.
3. **Stiftzustand.** Am Ende ist der Stift **angehoben** (`penup()`).
4. **Parameter.** Jede Funktion hat mindestens einen Parameter für die Größe.
5. **Name.** Der Funktionsname beschreibt das Objekt: `baum`, `hochhaus`, `ampel`, `laterne`, …

Ohne solche Absprachen verschiebt jede fremde Funktion euer Bild – und niemand findet den Fehler.
:::

## Ideensammlung

:::snippet{#aufgabe}
Falls euch nichts einfällt, hier ein paar Anregungen für Phase 1:

**Gebäude:** Haus, Hochhaus, Kirche mit Turm, Fabrik mit Schornstein, Bahnhof, Garage

**Natur:** Baum, Busch, Blume, Wolke, Sonne, Mond, Berg, Teich, Fluss

**Verkehr:** Straße, Zebrastreifen, Ampel, Straßenlaterne, Auto, Bus, Fahrrad, Verkehrsschild

**Details:** Zaun, Briefkasten, Bank, Mülltonne, Fenster, Tür, Schneemann
:::

## Arbeitsbereich: Eine einzelne Funktion entwickeln

Nutzt diesen Bereich in Phase 2, um **eine** Funktion in Ruhe zu entwickeln und zu testen.

:::pyide{canvas height="600px"}

```python
from turtle import *
shape("turtle")
screensize(600, 400)
speed(0)


def mein_objekt(groesse):
    # Euer Code hier
    pass


# Test: Wird das Objekt zweimal nebeneinander korrekt gezeichnet?
# Wenn ja, haltet ihr euch an die Schnittstelle.
penup()
goto(-200, -100)
setheading(0)

mein_objekt(100)
forward(200)
mein_objekt(60)
```

:::

::::collapsible{title="Der eingebaute Selbsttest"}

Der Test im Arbeitsbereich ist bewusst so gebaut, dass er die Schnittstelle prüft:

Wird das Objekt **zweimal nebeneinander** korrekt gezeichnet, dann hat eure Funktion die Turtle ordentlich zurückgesetzt. Landet das zweite Objekt an einer merkwürdigen Stelle oder ist verdreht, stimmt etwas mit Regel 2 nicht.

::::

## Arbeitsbereich: Das Stadtbild

Nutzt diesen Bereich in Phase 4. Fügt oben alle gesammelten Funktionen ein und baut unten euer Bild zusammen.

:::pyide{canvas height="700px"}

```python
from turtle import *
shape("turtle")
screensize(900, 600)
speed(0)
hideturtle()


# --- Gesammelte Funktionen ---


def baum(hoehe):
    pensize(hoehe / 4)
    pencolor("brown")
    pendown()
    left(90)
    forward(hoehe)
    pencolor("green")
    dot(hoehe)
    backward(hoehe)
    right(90)
    penup()


# Fügt hier eure weiteren Funktionen ein


# --- Das Stadtbild ---

penup()
goto(-400, -250)
setheading(0)

baum(100)
```

:::

## Reflexion

:::snippet{#aufgabe}
Haltet am Ende schriftlich fest:

- Welche fremde Funktion hat bei euch **auf Anhieb** funktioniert? Woran lag das?
- Bei welcher gab es Probleme? Welche Regel war dort nicht eingehalten?
- Was würdet ihr beim nächsten Mal **vorher** absprechen?
:::

::textinput{placeholder="Unsere Reflexion ..."}

:::snippet{#brain}
Was ihr hier erlebt habt, ist der Alltag in der Softwareentwicklung: Der schwierigste Teil eines großen Programms ist selten das Programmieren selbst, sondern das **Zusammenpassen** der Teile.

Deshalb legen Teams die Schnittstellen fest, **bevor** sie mit dem Programmieren beginnen.
:::
