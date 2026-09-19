---
name: Polymorphie
lang: de
---

# Polymorphie

**Polymorphie** (englisch *polymorphism*, wörtlich „Vielgestaltigkeit") bedeutet: Eine :t[Variable]{#variable} vom Typ der Oberklasse kann auf :t[Objekte]{#objekt} jeder Unterklasse verweisen. Beim Aufruf einer überschriebenen :t[Methode]{#methode} entscheidet **nicht** der Typ der Variablen, sondern der **tatsächliche Typ des Objekts**, welche Fassung ausgeführt wird.

```java
Form[] formen = { new Kreis(3), new Rechteck(2, 5) };
for (Form f : formen) {
    IO.println(f.berechneFlaeche());   // jedes Objekt rechnet auf seine Art
}
```

Der Aufruf sieht überall gleich aus, das Verhalten ist verschieden. Möglich macht das die :t[dynamische Bindung]{#dynamische-bindung}.

Der praktische Gewinn: Fallunterscheidungen über den Objekttyp werden überflüssig. Kommt eine neue Unterklasse dazu, muss der aufrufende Code nicht angefasst werden.

Voraussetzung ist eine gemeinsame Oberklasse – siehe :t[Vererbung]{#vererbung} – oder eine gemeinsame :t[Schnittstelle]{#schnittstelle}.
