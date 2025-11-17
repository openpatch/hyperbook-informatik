---
name: Lernkarte
index: 0
---

:::lerningmap{id="java-grundlagen"}

```yaml
title: Grundlagen der Java-Programmierung
background:
  color: '#f8fafc'
  image:
    src: 'learningmap.svg'
    x: 0
    y: 0
edges:
  animated: false
  color: '#94a3b8'
  width: 2
  type: bezier
nodes:
  - id: '1'
    type: topic
    data:
      label: Variablen
      description: |
        Was sind Variablen und wie werden sie in Java verwendet?
      duration: 30 min
      resources:
        - label: Variablen
          url: ./variablen.md
  - id: '2'
    type: topic
    data:
      label: Datentypen
      description: |
        Primitive und Referenzdatentypen in Java.
      duration: 30 min
      unlock:
        after:
          - '1'
      resources:
        - label: Datentypen
          url: ./datentypen.md
  - id: '3'
    type: topic
    data:
      label: Verzweigungen
      description: |
        Entscheidungen mit if/else und switch.
      duration: 30 min
      unlock:
        after:
          - '2'
      resources:
        - label: Verzweigungen
          url: ./verzweigungen.md
  - id: '4'
    type: topic
    data:
      label: Wiederholungen
      description: |
        Schleifen: while, for und do-while.
      duration: 30 min
      unlock:
        after:
          - '3'
      resources:
        - label: Wiederholungen
          url: ./wiederholungen.md
  - id: '5'
    type: topic
    data:
      label: Klassen
      description: |
        Baupläne für Objekte: Attribute und Methoden.
      duration: 30 min
      unlock:
        after:
          - '4'
      resources:
        - label: Klassen
          url: ./klassen.md
  - id: '6'
    type: topic
    data:
      label: Vererbung
      description: |
        Wie Klassen voneinander erben können.
      duration: 30 min
      unlock:
        after:
          - '5'
      resources:
        - label: Vererbung
          url: ./vererbung.md
  - id: '7'
    type: topic
    data:
      label: Arrays
      description: |
        Viele Werte effizient speichern und verarbeiten.
      duration: 30 min
      unlock:
        after:
          - '2'
      resources:
        - label: Arrays
          url: ./arrays.md
```
:::
