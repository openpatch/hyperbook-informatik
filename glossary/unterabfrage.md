---
name: Unterabfrage
lang: de
---

# Unterabfrage

Eine **Unterabfrage** (englisch *subquery*) ist eine Abfrage innerhalb einer anderen. Sie steht in Klammern.

```sql
SELECT name
FROM band
WHERE gruendungsjahr < (SELECT AVG(gruendungsjahr) FROM band);
```

Typische Stellen für eine Unterabfrage:

- im `WHERE`, um mit einem berechneten Wert zu vergleichen (auch mit `IN`, `EXISTS`),
- im `FROM`, als Zwischenergebnis wie eine Tabelle,
- im `SELECT`, um einen einzelnen Wert je Zeile zu ermitteln.

Oft lässt sich dieselbe Frage auch mit einem :t[Verbund]{#verbund} beantworten. Die Unterabfrage ist dann die besser lesbare Wahl, wenn man einen **Vergleichswert** braucht, der sich erst aus den Daten ergibt.
