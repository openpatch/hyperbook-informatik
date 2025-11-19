---
name: Funktionen
lang: de
index: 2
---

# Funktionen

Funktionen sind wiederverwendbare Codeblöcke, die eine bestimmte Aufgabe erfüllen. Sie ermöglichen es dir, deinen Code zu strukturieren und zu vereinfachen.

Wir haben bereits die Funktion `print()` kennengelernt. Diese Funktion gibt den übergebenen Wert auf der Konsole aus.

Um eine Funktion zu nutzen, musst du sie aufrufen. Dazu schreibst du den Namen der Funktion gefolgt von runden Klammern. In den Klammern kannst du der Funktion Argumente übergeben.

:::pyide

```python
print("Hallo Welt")
```

:::

## Rückgabewerte

Funktionen können auch Werte zurückgeben. Zum Beispiel gibt die Funktion `max()` den größten Wert einer Liste von Zahlen zurück.

:::pyide

```python

max_zahl = max(1, 2, 3, 4, 5)

print(max_zahl)
```

:::