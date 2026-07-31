---
name: Normalform
lang: de
---

# Normalform

Die **Normalisierung** zerlegt ein :t[Relationenschema]{#relationenschema} systematisch, bis keine Redundanz mehr übrig ist. Redundanz ist die Ursache der Änderungs-, Einfüge- und Löschanomalie.

- **1. Normalform** – alle Attributwerte sind atomar
- **2. Normalform** – zusätzlich hängt kein Nichtschlüsselattribut von einem *Teil* des Schlüssels ab (keine partielle Abhängigkeit)
- **3. Normalform** – zusätzlich hängt kein Nichtschlüsselattribut über ein anderes Nichtschlüsselattribut ab (keine transitive Abhängigkeit)

Merksatz: Jedes Nichtschlüsselattribut hängt ab vom Schlüssel, vom ganzen Schlüssel und von nichts als dem Schlüssel.

Bei einem einteiligen :t[Primärschlüssel]{#primaerschluessel} ist die 2. Normalform automatisch erfüllt.
