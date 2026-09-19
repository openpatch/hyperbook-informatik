---
name: Objektdiagramm
lang: de
---

# Objektdiagramm

Ein **Objektdiagramm** (englisch *object diagram*) zeigt eine **Momentaufnahme** des Speichers: welche :t[Objekte]{#objekt} es zu einem bestimmten Zeitpunkt gibt, welche Werte in ihren :t[Attributen]{#attribut} stehen und welche :t[Referenzen]{#referenz} zwischen ihnen verlaufen.

:::snippet{#merken}
| | :t[Klassendiagramm]{#klassendiagramm} | Objektdiagramm |
| --- | --- | --- |
| Zeigt | den **Bauplan** | einen **Zustand** |
| Wie viele Kästen? | einen je Klasse | einen je Objekt – auch drei für drei Objekte derselben Klasse |
| Bei den Attributen steht | der Datentyp | der aktuelle **Wert** |
| Gilt | immer | nur zu diesem Zeitpunkt |
:::

Gezeichnet werden Objektdiagramme im [Java Memory Playground](https://jmp.openpatch.org).

## Die Bestandteile

- Ein **Objekt** ist ein Kasten. In der Kopfzeile steht `:Klassenname`, darunter die Attribute mit ihren Werten.
- Eine **Referenz** ist ein Pfeil vom Attribut zum Zielobjekt. Ein Attribut, das auf nichts zeigt, ist `null` – ein Anschluss, an dem nichts hängt.
- Bei einem elementaren :t[Datentyp]{#datentyp} steht der Wert direkt im Kasten, bei einem Objekttyp geht ein Pfeil ab. Genau daran erkennt man die beiden Sorten im Bild.

## Auch der Kellerstapel gehört dazu

Der Java Memory Playground trennt die beiden Speicherbereiche aus dem :t[Speichermodell Java]{#speichermodell-java}:

- Die **Objekte** liegen auf der :t[Halde]{#halde}.
- Ein **Methodenaufruf** bekommt einen eigenen Rahmen mit seinen lokalen :t[Variablen]{#variable} – den :t[Kellerrahmen]{#kellerrahmen} auf dem :t[Kellerstapel]{#kellerstapel}. Er verschwindet beim `return`, die Objekte bleiben.
- Die **Speicherbereinigung** lässt sich auslaufen lassen: Sie räumt genau die Objekte ab, zu denen kein Pfeil mehr führt. Siehe :t[Speicherbereinigung]{#speicherbereinigung}.

## Im Buch

Objektdiagramme sind im Buch **interaktiv** und in **Schritte** zerlegt. Jeder Schritt hat eine Beschriftung, die sagt, was gerade passiert; manche Schritte baust du selbst und lässt sie prüfen.

::jmp{id="glossar-objektdiagramm" src="jmp/objektdiagramm.jmp" height="520px"}

Ein Fahrrad, das einen Reifen kennt: Das Attribut `vorderreifen` ist keine Kopie des Reifens, sondern ein Pfeil auf ihn. Setzt man denselben Reifen in ein zweites Fahrrad, zeigen zwei Pfeile auf dasselbe Objekt.
