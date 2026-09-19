---
name: Schnittstelle
lang: de
---

# Schnittstelle

Eine **Schnittstelle** (englisch *interface*) legt fest, welche :t[Methoden]{#methode} eine :t[Klasse]{#klasse} anbieten muss – **ohne** etwas über deren Umsetzung zu sagen und **ohne** in die Vererbungshierarchie einzugreifen.

Im Java-Quelltext steht dort auch auf Deutsch das Schlüsselwort `interface`:

```java
public interface Zeichenbar {
    void zeichne();
}

public class Kreis implements Zeichenbar {
    public void zeichne() { /* ... */ }
}
```

Eine Klasse kann von **einer** Klasse erben, aber **beliebig viele** Schnittstellen erfüllen. Deshalb ist die Schnittstelle oft die bessere Wahl als eine Oberklasse, wenn Klassen nur eine Fähigkeit teilen, aber sonst nichts miteinander zu tun haben.

Auch über eine Schnittstelle funktioniert die :t[Polymorphie]{#polymorphie}: Eine Variable vom Typ `Zeichenbar` kann auf jedes Objekt verweisen, dessen Klasse die Schnittstelle erfüllt.

:::alert{info}
Das Wort „Schnittstelle" wird in der Informatik auch allgemeiner gebraucht – etwa für die öffentlichen Methoden einer Klasse oder für eine Programmierschnittstelle (englisch *API*).
:::
