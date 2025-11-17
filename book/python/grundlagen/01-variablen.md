---
name: Variablen
lang: de
index: 1
---

# Variablen

Variablen sind Platzhalter für Werte. Sie ermöglichen es dir, Daten zu speichern und später wiederzuverwenden. In Python kannst du Variablen mit einem Namen versehen und ihnen einen Wert zuweisen.

:::pyide

```python
name = "Max"
alter = 30

print(name)
print(alter + 5)
```

:::

In diesem Beispiel wird der Variable `name` der Wert `"Max"` und der Variable `alter` der Wert `30` zugewiesen. Mit `print(name)` und `print(alter + 5)` werden die Werte der Variablen ausgegeben.

## Variablennamen

Variablennamen können Buchstaben, Zahlen und Unterstriche enthalten. Sie dürfen nicht mit einer Zahl beginnen und keine Leerzeichen enthalten. Groß- und Kleinschreibung wird unterschieden.

:::pyide

```python
vorname = "Max"
nachname = "Mustermann"
alter = 30

print(vorname)
print(nachname)
print(alter)
```

:::

## Datentypen

Variablen können verschiedene Datentypen speichern. Die häufigsten Datentypen sind:

- `str` (String): Zeichenkette
- `int` (Integer): Ganzzahl
- `float`: Gleitkommazahl
- `bool` (Boolean): Wahrheitswert (`True` oder `False`)

:::pyide

```python
name = "Max" # str
alter = 30 # int
groesse = 1.80 # float
ist_erwachsen = True # bool

print(name)
print(alter)
print(groesse)
print(ist_erwachsen)
```

:::

## Zuweisung

Mit dem Zuweisungsoperator `=` weist du einer Variablen einen Wert zu.

:::pyide

```python
name = "Max"
print(name)
```

:::

## Wert ändern

Du kannst den Wert einer Variablen jederzeit ändern.

:::pyide

```python
name = "Max"
name = "Moritz"
print(name)
```

:::

## Mehrere Variablen

Du kannst mehreren Variablen gleichzeitig Werte zuweisen.

:::pyide

```python
vorname, nachname = "Max", "Mustermann"
print(vorname)
print(nachname)
```

:::

## Variablen tauschen

Du kannst den Wert von zwei Variablen tauschen, indem du die Variablen auf der rechten Seite der Zuweisung in Klammern setzt.

:::pyide

```python

a = 5
b = 10

a, b = b, a

print(a)
print(b)
```

:::

## Zusammenfassung

- Variablen sind Platzhalter für Werte.
- Variablennamen können Buchstaben, Zahlen und Unterstriche enthalten.
- Variablen können verschiedene Datentypen speichern.
- Mit dem Zuweisungsoperator `=` weist du einer Variablen einen Wert zu.
- Du kannst den Wert einer Variablen jederzeit ändern.
- Mehreren Variablen kannst du gleichzeitig Werte zuweisen.
- Du kannst den Wert von zwei Variablen tauschen, indem du die Variablen auf der rechten Seite der Zuweisung in Klammern setzt.