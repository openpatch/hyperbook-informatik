---
name: Halde
lang: de
---

# Halde

Die **Halde** (englisch *heap*) ist der Speicherbereich, in dem Java alle :t[Objekte]{#objekt} ablegt. Alles, was mit `new` entsteht, liegt dort – auch jedes :t[Feld]{#feld}.

Der Name klingt ungewohnt, meint aber genau das englische *heap*: einen unsortierten Haufen. Im Gegensatz zum :t[Kellerstapel]{#kellerstapel} gibt es auf der Halde keine feste Reihenfolge – Objekte entstehen und verschwinden in beliebiger Ordnung.

- Angelegt wird ein Objekt bei jedem `new`.
- Aufgeräumt wird es durch die :t[Speicherbereinigung]{#speicherbereinigung}, sobald keine :t[Referenz]{#referenz} mehr darauf zeigt.
- Die Halde ist wesentlich größer als der Kellerstapel.

Eine Variable von einem Objekttyp liegt im :t[Kellerrahmen]{#kellerrahmen}; das Objekt, auf das sie verweist, liegt auf der Halde.

:::alert{info}
Ausführlich behandelt wird das Zusammenspiel in der Lektion [Kellerstapel und Halde](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik/03-kellerstapel-und-halde) und im Eintrag :t[Speichermodell Java]{#speichermodell-java}.
:::
