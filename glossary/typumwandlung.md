---
name: Typumwandlung
lang: de
---

# Typumwandlung

Eine **Typumwandlung** (englisch *type cast*, kurz *Cast*) wandelt einen Wert von einem :t[Datentyp]{#datentyp} in einen anderen um. Geschrieben wird sie als Typname in runden Klammern vor dem Wert.

```java
int punkte = 32;
double schnitt = (double) punkte / 3;   // 10.666...
int abgeschnitten = (int) 10.9;         // 10 – es wird abgeschnitten, nicht gerundet
```

- **Erweiternd** (`int` → `double`) geht ohne Cast und ohne Verlust.
- **Einengend** (`double` → `int`) braucht den Cast und **schneidet ab**.
- Ohne Cast rechnet Java bei zwei `int`-Werten eine **Ganzzahldivision** – eine häufige Fehlerquelle.

Bei Objekttypen wandelt der Cast nicht den Wert um, sondern verspricht Java einen genaueren Typ: `((Hund) tier).hole()`. Stimmt das Versprechen nicht, gibt es zur Laufzeit eine `ClassCastException`. Vorher prüfen lässt sich das mit `instanceof`.
