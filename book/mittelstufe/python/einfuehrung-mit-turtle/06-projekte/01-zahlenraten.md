---
title: Zahlenraten
index: 1
---

# Projekt: Zahlenraten

Ausgehend von der folgenden Vorlage soll in Projektarbeit ein kleines **Ratespiel** entwickelt werden.

:::pyide

```python
from random import randint

geheimzahl = randint(1, 100)   # Zufallszahl von 1 bis 100

tipp = int(input("Wie lautet dein Tipp? "))
```

:::

## Das Ziel

Ein möglicher Spielverlauf sieht so aus:

| Eingabe | Ausgabe |
| --- | --- |
| | Wie lautet dein Tipp? |
| `91` | |
| | Dein Tipp ist zu groß. |
| `23` | |
| | Dein Tipp ist zu klein. |
| `25` | |
| | Dein Tipp ist zu klein. |
| `33` | |
| | Richtig! |

Die spielende Person kann also immer wieder einen Tipp abgeben und erhält eine Meldung, ob der Tipp zu groß oder zu klein war. Wird die Geheimzahl getroffen, gibt es auch darüber eine Meldung.

## Ablauf des Projekts

:::snippet{#merken}
**Phase 1 – Planen.** Jede Gruppe entwickelt eine mögliche Umsetzung mithilfe eines **Flussdiagramms auf Papier**.

*Zusatz für Schnelle:* Auf [app.diagrams.net](https://app.diagrams.net/) kann man Flussdiagramme online erstellen – dort heißen sie „Ablaufplan". Übertragt euer Flussdiagramm dorthin und beurteilt die Bedienbarkeit des Werkzeugs.

**Phase 2 – Rückmeldung.** Ihr gebt euch untereinander Rückmeldungen zu den Flussdiagrammen.

**Phase 3 – Implementieren.** Basierend auf eurem – gegebenenfalls verbesserten – Flussdiagramm implementiert ihr das Ratespiel.

**Phase 4 – Ideen sammeln.** Ihr beschreibt mögliche Erweiterungen oder Verbesserungen. Erlaubt ist alles, was das Grundprinzip nicht verändert. Auch die Turtle darf eingesetzt werden. Die Ideen werden in der Gesamtgruppe gesammelt.

**Phase 5 – Erweitern.** Jede Gruppe wählt eine der vorgeschlagenen Verbesserungen aus und setzt sie um. Nach erfolgreichem Test wird die nächste Idee gewählt – und so fort.

**Phase 6 – Testen.** Ihr testet gegenseitig eure Implementierungen und gebt euch Rückmeldung.

**Phase 7 (optional) – Nachbessern.** Ihr verbessert eure Implementierung anhand der Rückmeldungen.
:::

## Arbeitsbereich

:::pyide{height="500px"}

```python
from random import randint

geheimzahl = randint(1, 100)

# Euer Code hier
```

:::

::::collapsible{title="Hilfe für Phase 1: Welche Bausteine brauche ich?"}

Überlegt euch, welche der bekannten Bausteine im Flussdiagramm vorkommen müssen:

- Wird etwas **wiederholt**? Wie oft – steht das vorher fest?
- Muss **entschieden** werden? Wie viele Fälle gibt es?
- Welche **Ein- und Ausgaben** gibt es?

Denkt daran: Es gibt drei mögliche Ausgänge eines Tipps, nicht nur zwei.

::::

::::collapsible{title="Hilfe für Phase 3: Die Struktur"}

Der Kern besteht aus einer Schleife, die wiederholt wird, solange der Tipp nicht stimmt. Darin liegt eine dreifache Verzweigung.

```python
while tipp != geheimzahl:
    if tipp > geheimzahl:
        print("Dein Tipp ist zu groß.")
    else:
        print("Dein Tipp ist zu klein.")
    tipp = int(input("Wie lautet dein Tipp? "))

print("Richtig!")
```

Achtet darauf, dass der erste Tipp **vor** der Schleife eingelesen werden muss.

::::

::::collapsible{title="Ideensammlung für Phase 4"}

Falls euch nichts einfällt – hier ein paar Anregungen:

- Die **Anzahl der Versuche** zählen und am Ende ausgeben.
- Nur eine **begrenzte Anzahl** Versuche zulassen. Danach hat man verloren.
- Den Zahlenbereich zu Beginn **abfragen** lassen.
- Prüfen, ob der Tipp überhaupt **im gültigen Bereich** liegt.
- Nach dem Spiel fragen, ob man **noch einmal** spielen möchte.
- Mit der Turtle einen **Fortschrittsbalken** oder einen Zahlenstrahl zeichnen, auf dem der noch mögliche Bereich schrumpft.
- Die Rollen tauschen: Der **Computer rät**, und ihr antwortet mit „größer" oder „kleiner". Wie viele Versuche braucht er höchstens?

::::

:::snippet{#brain}
Die letzte Idee ist besonders spannend. Wenn der Computer immer die **Mitte** des noch möglichen Bereichs tippt, braucht er für 1 bis 100 höchstens **7 Versuche**.

Dieses Verfahren heißt **binäre Suche** und ist einer der wichtigsten Algorithmen der Informatik.
:::

## Reflexion

:::snippet{#aufgabe}
Haltet am Ende des Projekts schriftlich fest:

- Was hat in eurer Gruppe gut funktioniert?
- An welcher Stelle habt ihr am längsten gebraucht?
- Hat euch das Flussdiagramm beim Programmieren geholfen? Begründet eure Antwort.
:::

::textinput{placeholder="Unsere Reflexion ..."}
