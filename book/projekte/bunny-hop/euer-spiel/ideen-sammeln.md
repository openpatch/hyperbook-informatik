---
name: Ideen sammeln
index: 0
lang: de
---

# Ideen sammeln

Ihr habt jetzt die Grundlagen der Scratch for Java Bibliothek und der Spieleentwicklung gelernt. Nun sollt ihr eure eigenen Ideen in das Spiel einbringen. Vielleicht wollt ihr:

- neue Grafiken
- verschiedene Feinde
- Power Ups
- Lücken im Boden
- ...

Damit alle auf dem gleichen Stand sind, könnt ihr das Bugs-Starter-Projekt benutzen.

::archive[Bugs Starter]{name="bunny-hop-bugs-starter"}

In dem Bug-Starter-Projekte sind noch weitere Features implementiert, die euch auch zur Inspiration dienen sollen. Das folgende Klassendiagram zeigt die Klassen und Beziehungen im Bugs-Starter-Projekt.

```mermaid
classDiagram 
  direction RL
  Window <|-- BunnyHop
  Stage <|-- Level
  Stage <|-- Ende
  AnimatedSprite <|-- Sprite
  Sprite <|-- Plattform
  Sprite <|-- Spieler
  Sprite <|-- StachelFeind
  
  class BunnyHop {
    -distanz: int
    +BunnyHop()
    +zuruecksetzen()
    +getDistanz(): int
    +veraendereDistanz(wert: int)
  }
  
  class Timer {
    +afterMillis(millis: int)
    +forMillis(millis: int)
  }
  
  class Stage {
    +add(d: Drawable)
    +display(text: String)
    +setColor(r: int, g: int, b: int)
    +addTimer(name: String)
    +getTimer(name: String)
  }
  
  class AnimatedSprite {
    +addAnimation(name: string, muster: String, frames: int)
    +playAnimation(name: string)
  }
  
  class Sprite {
    +changeX(wert: float)
    +changeY(wert: float)
    +getX(): float
    +getY(): float
    +setX(x: float)
    +setY(y: float)
    +getWidth(): int
    +getHeight(): int
    +isTouchingSprite(d: Drawable)
    +isTouchingSprite(class: Class)
    +addCostume(name: String, pfad: String)
    +setHitbox(x1: int, y1: int, x2: int, y2: int, ...)
  }
  
  class Text {
    +Text()
    +setPosition(x: int, y: int)
    +showText(text: String)
  }
  
  class Window {
    +Window(breite: int, hoehe: int, ordner: String)
    +setDebug(v: boolean)
    +addStage(name: String, pStage: Stage)
    +removeStage(name: String)
    +switchStage(name: String)
  }
  
  Level --> Spieler: -bugs
  Level --> BunnyHop: -spiel
  Level --> StachelFeind: -ingo
  Level --> Plattform: -letzte
  
  class Level {
    +Level(pSpiel: BunnyHop)
    +getLetzte(): Plattform
    +setLetzte(pLetzte: Plattform)
    +run()
  }
  
  Ende --> Text: -text
  Ende --> BunnyHop: -spiel
  
  class Ende {
    +whenKeyPressed(code: int)
    +run()
  }
  
  Plattform --> Spieler: -spieler
  Plattform --> Level: level
  
  class Plattform {
    -istKaputt: boolean
    -beruehrt: boolean
    +Plattform(pLevel: Level, pSpieler: Spieler, pIstKaputt: boolean)
    +beruehren()
    +run()
  }
  
  class Spieler {
    -springt: boolean
    -faellt: boolean
    -verloren: boolean
    -sprungGeschwindigkeit: float
    -sprungHoehe: float
    -fallGeschwindigkeit: float
    +Spieler()
    +verletzten()
    +hatVerloren()
    +springen()
    +graviation()
    +run()
  }
  
  StachelFeind --> Spieler: -spieler
  
  class StachelFeind {
    -fallGeschwndigkeit: int
    +StachelFeind(pSpieler: Spieler)
    +run()
  }
```

## Aufgaben

### Programmverständnis

1. Ladet das Bugs-Starter-Projekt herunter.
2. Bearbeitet die folgenden Fragen zum Quelltext:
    1. Gebt die Quelltextzeilen an, in denen die Methode `veraendereDistanz` der BunnyHop-Klasse aufgerufen wird.
    2. Beschreibt in eigenen Worten was die Methode `zuruecksetzen` der BunnyHop-Klasse tut.
    3. Beschreibt, was in der for-Schleife im Konstruktor der Level-Klasse passiert. 
    4. Erklärt was passieren muss, damit ein Objekt der Klasse Ende zu sehen ist.
3. Schaut in den restlichen Quelltext des Bugs-Starter-Projekts und sammelt Quelltextzeilen, die ihr nicht nachvollziehen könnt.
4. Spielt das Spiel und sammelt auf eurem Kanbandboard (siehe Taskcards eurer Gruppe) Ideen, die ihr umsetzen möchtet.
