---
name: Kellerrahmen
lang: de
---

# Kellerrahmen

Ein **Kellerrahmen** (englisch *stack frame*) ist der Platz, den ein einzelner Methodenaufruf auf dem :t[Kellerstapel]{#kellerstapel} belegt.

In ihm stehen

- die Parameter des Aufrufs,
- die lokalen :t[Variablen]{#variable} der :t[Methode]{#methode} und
- die Rücksprungstelle, also die Stelle, an der es nach dem `return` weitergeht.

Bei einem elementaren :t[Datentyp]{#datentyp} wie `int` steht der Wert direkt im Rahmen. Bei einem Objekttyp steht dort nur eine :t[Referenz]{#referenz}; das Objekt selbst liegt auf der :t[Halde]{#halde}.

Kehrt die Methode zurück, verschwindet der Rahmen samt allen lokalen Variablen. Ein Objekt, das in der Methode erzeugt und zurückgegeben wurde, bleibt trotzdem bestehen – es liegt ja auf der Halde.
