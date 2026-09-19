---
name: Überschreiben
lang: de
---

# Überschreiben

Beim **Überschreiben** (englisch *overriding*) ersetzt eine Unterklasse eine geerbte :t[Methode]{#methode} durch eine eigene Fassung. Die Signatur – Name, Parameterliste und Rückgabetyp – bleibt dabei **gleich**.

```java
public class Tier {
    public void gibLaut() { IO.println("..."); }
}

public class Hund extends Tier {
    @Override
    public void gibLaut() { IO.println("Wuff"); }
}
```

- `@Override` ist keine Pflicht, aber sehr zu empfehlen: Java meldet dann einen Fehler, wenn gar keine passende Methode überschrieben wird (etwa wegen eines Tippfehlers im Namen).
- Mit `super.gibLaut()` lässt sich die Fassung der Oberklasse zusätzlich aufrufen.
- Welche Fassung läuft, entscheidet die :t[dynamische Bindung]{#dynamische-bindung}.

Nicht zu verwechseln mit dem :t[Überladen]{#ueberladen}: Dort bleibt der Name gleich, die Parameterliste ändert sich.
