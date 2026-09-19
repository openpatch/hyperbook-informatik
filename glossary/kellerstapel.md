---
name: Kellerstapel
lang: de
---

# Kellerstapel

Der **Kellerstapel** (englisch *call stack*, auch *Aufrufstapel*) ist der Speicherbereich, in dem Java die laufenden Methodenaufrufe verwaltet.

Das Wort „Keller" ist die deutsche Übersetzung von *stack* im Sinne der Datenstruktur :t[Stapel]{#stapel}: Neues kommt oben drauf, heruntergenommen wird auch von oben. „Aufrufstapel" ist der geläufigere und verständlichere Name für dasselbe.

Für jeden noch nicht zurückgekehrten Aufruf liegt dort ein :t[Kellerrahmen]{#kellerrahmen} mit den Parametern, den lokalen :t[Variablen]{#variable} und der Stelle, an die nach dem `return` zurückgesprungen wird.

- Angelegt wird ein Rahmen bei jedem Aufruf einer :t[Methode]{#methode}.
- Abgeräumt wird er beim `return`, und zwar sofort.
- Die Reihenfolge ist streng: zuletzt angelegt, zuerst abgeräumt.
- Der Platz ist begrenzt – passt kein Rahmen mehr darauf, gibt es einen :t[Stapelüberlauf]{#stapelueberlauf}.

Den Gegenpart bildet die :t[Halde]{#halde}, auf der die :t[Objekte]{#objekt} liegen.
