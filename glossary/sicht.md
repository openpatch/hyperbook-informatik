---
name: Sicht
lang: de
---

# Sicht

Eine **Sicht** (englisch *view*) ist eine gespeicherte Abfrage, die sich wie eine Tabelle ansprechen lässt. Sie speichert **keine** Daten – bei jedem Zugriff läuft die hinterlegte Abfrage neu.

```sql
CREATE VIEW oeffentlich AS
  SELECT name, gruendungsjahr FROM band;

SELECT * FROM oeffentlich;
```

Sichten sind nützlich, um

- wiederkehrende Abfragen zu benennen und zu vereinfachen,
- Rechte einzuschränken, wo das Datenbanksystem sie nicht spaltenweise vergeben kann – man gibt nur Zugriff auf die Sicht, nicht auf die :t[Relation]{#relation} dahinter.

Im SQL-Quelltext steht auch auf Deutsch das Schlüsselwort `VIEW`.
