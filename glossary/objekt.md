---
name: Objekt
lang: de
---

Ein Objekt ist ein grundlegendes Konzept in der Programmierung und in der objektorientierten Programmierung (OOP) besonders wichtig.

Ein Objekt ist eine Instanz (eine konkrete Realisierung) einer :t[Klasse]{#klasse} in der Programmierung. Es kann als ein "Ding" oder eine "Sache" betrachtet werden, die bestimmte Eigenschaften und Verhaltensweisen hat. Diese Eigenschaften werden als :t[Attribute]{#attribut} bezeichnet, und das Verhalten wird durch :t[Methoden]{#methode} definiert.


:::onlineide{id="955888"}

```java
// Instanz der Klasse String
String name = "Hallo";

public class Haus {

    public int nummer;

    public Haus(int nummer) {
        this.nummer = nummer;
    }

    public void streichen() {
        //...
    }
}

// Instanz der Klasse Haus
Haus meinHaus = new Haus(5);
System.out.println("Mein Haus: " + meinHaus.nummer);

// Noch eine Instanz der Klasse Haus
Haus einAnderesHaus = new Haus(12);
System.out.println("Das Haus: " + einAnderesHaus.nummer);
```

:::