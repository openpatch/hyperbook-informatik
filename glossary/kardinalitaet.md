---
name: Kardinalität
lang: de
---

# Kardinalität

Die **Kardinalität** gibt an, mit wie vielen Entitäten der einen Seite eine Entität der anderen Seite in Beziehung stehen kann.

- **1:1** – jede Bühne hat genau einen Manager und umgekehrt
- **1:n** – eine Station hat viele Fahrräder, ein Fahrrad steht an genau einer Station
- **n:m** – eine Band hat mehrere Genres, ein Genre umfasst mehrere Bands

Genauer ist die **(min, max)-Notation**: Sie schreibt an jede Seite, an wie vielen Beziehungen eine einzelne Entität mindestens und höchstens beteiligt ist. Aus einer Minimalangabe von 1 wird später ein `NOT NULL`.

Bestimmt wird eine Kardinalität immer, indem man in **beide** Richtungen fragt.
