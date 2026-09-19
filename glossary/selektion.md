---
name: Selektion
lang: de
---

# Selektion

Die **Selektion** (englisch *selection*) wählt aus einer :t[Relation]{#relation} bestimmte **Zeilen** aus – nämlich die, die eine Bedingung erfüllen. In SQL macht das die `WHERE`-Klausel.

```sql
SELECT * FROM band WHERE gruendungsjahr < 1980;
```

Das Gegenstück ist die :t[Projektion]{#projektion}, die **Spalten** auswählt.

:::alert{info}
Trotz des Namens macht das Schlüsselwort `SELECT` **nicht** die Selektion, sondern die Projektion.
:::
