---
name: Speicherbereinigung
lang: de
---

# Speicherbereinigung

Die **Speicherbereinigung** (englisch *garbage collection*) gibt den Platz von :t[Objekten]{#objekt} auf der :t[Halde]{#halde} wieder frei, auf die keine :t[Referenz]{#referenz} mehr zeigt.

Entscheidend ist allein die **Erreichbarkeit**: Zu einem Objekt, zu dem kein Verweis mehr führt, kommt das Programm nie wieder hin – also darf sein Platz neu vergeben werden.

In Java geschieht das automatisch. Anders als in Sprachen wie C++ gibt es kein `delete`, das man selbst aufrufen müsste (und vergessen könnte). Wann genau aufgeräumt wird, entscheidet Java; darauf verlassen kann man sich nicht.
