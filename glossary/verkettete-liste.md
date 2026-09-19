---
name: Verkettete Liste
lang: de
---

# Verkettete Liste

Eine **verkettete Liste** (englisch *linked list*) besteht aus **Knoten** (englisch *nodes*). Jeder Knoten enthält

- ein **Inhaltsobjekt** und
- eine :t[Referenz]{#referenz} auf den nächsten Knoten.

Der letzte Knoten verweist auf `null`; daran erkennt man das Ende. Die Liste selbst merkt sich den **ersten** Knoten, oft zusätzlich den **letzten** sowie einen beweglichen Verweis `current` auf den gerade betrachteten Knoten.

Der Unterschied zum :t[Feld]{#feld}: Die Liste hat keine feste Länge und kein `length`. Dafür gibt es keinen direkten Zugriff über einen Index – man muss sich von vorne durchhangeln.

| | Feld (*array*) | verkettete Liste |
| --- | --- | --- |
| Länge | steht bei der Erzeugung fest | wächst und schrumpft |
| Zugriff auf Element *i* | sofort über den Index | Schritt für Schritt von vorne |
| Einfügen in der Mitte | alles dahinter verschieben | nur zwei Referenzen umhängen |
