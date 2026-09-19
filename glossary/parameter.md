---
name: Parameter
lang: de
---

# Parameter

Ein **Parameter** (englisch *parameter*) ist eine :t[Variable]{#variable} in der Kopfzeile einer :t[Methode]{#methode}, über die beim Aufruf ein Wert hineingereicht wird.

```java
/** Zeichnet einen Kreis an der angegebenen Stelle. */
void zeichneKreis(int pX, int pY, int pRadius) {
    // pX, pY und pRadius sind die Parameter
}

zeichneKreis(100, 50, 20);   // 100, 50 und 20 sind die Argumente
```

- Der **Parameter** steht in der Deklaration, das **Argument** ist der Wert beim Aufruf.
- Parameter sind lokale Variablen: Sie leben nur im :t[Kellerrahmen]{#kellerrahmen} dieses Aufrufs.
- Übergeben wird immer eine **Kopie**. Bei einem elementaren :t[Datentyp]{#datentyp} ist das eine Kopie des Werts, bei einem Objekttyp eine Kopie der :t[Referenz]{#referenz} – deshalb kann eine Methode ein übergebenes :t[Feld]{#feld} verändern, eine übergebene Zahl aber nicht.

Im Buch beginnen Parameternamen mit einem kleinen `p`, um sie von :t[Attributen]{#attribut} zu unterscheiden.
