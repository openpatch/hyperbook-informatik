---
name: Projektion
lang: de
---

# Projektion

Die **Projektion** (englisch *projection*) wählt aus einer :t[Relation]{#relation} bestimmte **Spalten** aus. In SQL macht das die `SELECT`-Klausel.

```sql
SELECT name, gruendungsjahr FROM band;   -- Projektion auf zwei Spalten
SELECT * FROM band;                      -- alle Spalten
```

Das Gegenstück ist die :t[Selektion]{#selektion}, die **Zeilen** auswählt.

:::alert{info}
Hier ist die Zuordnung leicht zu verwechseln: `SELECT` macht die **Projektion**, `WHERE` macht die **Selektion**.
:::
