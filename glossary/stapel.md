---
name: Stapel
lang: de
---

# Stapel

Ein **Stapel** (englisch *stack*, auch *Kellerstapel* oder *Keller*) ist eine lineare Datenstruktur mit nur **einer** Zugriffsstelle, dem oberen Ende:

- `push` legt oben auf,
- `top` liest das oberste Element,
- `pop` entfernt es.

Das Prinzip heißt **LIFO** – *Last In, First Out*: Was zuletzt hineinkommt, kommt zuerst wieder heraus. Das Bild dazu ist ein Stapel Teller.

Der Stapel ist die Struktur für alles, was **verschachtelt** ist und in umgekehrter Reihenfolge wieder aufgelöst werden muss: die Rückgängig-Funktion, die noch offenen Klammern bei der Klammerprüfung, der Zurück-Knopf im Browser – und der :t[Kellerstapel]{#kellerstapel}, auf dem Java die Methodenaufrufe verwaltet.

Das Gegenstück mit umgekehrter Zugriffsregel ist die :t[Warteschlange]{#warteschlange}.
