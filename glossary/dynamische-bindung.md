---
name: Dynamische Bindung
lang: de
---

# Dynamische Bindung

Die **dynamische Bindung** (englisch *dynamic binding* oder *late binding*, deutsch auch *späte Bindung*) entscheidet erst zur **Laufzeit**, welche Fassung einer überschriebenen :t[Methode]{#methode} ausgeführt wird.

„Bindung" meint dabei: Welcher Methodenrumpf wird an einen Aufruf gebunden? Beim Übersetzen steht nur der Typ der :t[Variablen]{#variable} fest, beim Ausführen der tatsächliche Typ des :t[Objekts]{#objekt} – und der entscheidet.

```java
Form f = new Kreis(3);
f.berechneFlaeche();   // die Fassung aus Kreis läuft, nicht die aus Form
```

Die dynamische Bindung ist der Mechanismus hinter der :t[Polymorphie]{#polymorphie}. Sie erlaubt es, eine Methode einmal zu schreiben, statt in jeder Unterklasse eine Fallunterscheidung zu wiederholen.

:::alert{warning}
Ruft ein Konstruktor der Oberklasse eine überschriebene Methode auf, greift die dynamische Bindung bereits – zu einem Zeitpunkt, an dem die Unterklasse noch gar nicht fertig aufgebaut ist.
:::
