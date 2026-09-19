---
name: Warteschlange
lang: de
---

# Warteschlange

Eine **Warteschlange** (englisch *queue*) ist eine lineare Datenstruktur mit zwei Zugriffsstellen:

- **hinten** wird eingefügt (`enqueue`),
- **vorne** wird gelesen (`front`) und entfernt (`dequeue`).

Das Prinzip heißt **FIFO** – *First In, First Out*: Was zuerst hineinkommt, kommt zuerst wieder heraus. Das Bild dazu ist die Schlange an der Kasse.

Typische Einsätze: Druckaufträge, Nachrichten in der Reihenfolge ihres Eintreffens, die Breitensuche in einem Baum oder Graphen.

Das Gegenstück mit umgekehrter Zugriffsregel ist der :t[Stapel]{#stapel}.
