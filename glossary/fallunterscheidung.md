---
name: Fallunterscheidung
lang: de
---

# Fallunterscheidung

Eine **Fallunterscheidung** (englisch *conditional* oder *branching*, deutsch auch **Verzweigung**) lässt ein Programm je nach Bedingung verschiedene Wege nehmen. Sie ist neben der Sequenz und der Schleife eine der drei :t[Kontrollstrukturen]{#konstrollstruktur}.

Die einfache Form ist die :t[bedingte Anweisung]{#bedingte-anweisung} mit `if` und `else`:

```java
if (punkte >= 50) {
    IO.println("bestanden");
} else {
    IO.println("nicht bestanden");
}
```

Sind viele Fälle zu unterscheiden, hilft `switch` (englisch *switch statement*).

:::alert{info}
In der objektorientierten Programmierung lassen sich Fallunterscheidungen über den Objekttyp durch :t[Polymorphie]{#polymorphie} ersetzen – das ist meist die bessere Lösung, weil neue Fälle den bestehenden Quelltext nicht mehr anfassen müssen.
:::
