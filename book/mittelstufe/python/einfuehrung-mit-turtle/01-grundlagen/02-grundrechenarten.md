---
title: Grundrechenarten
index: 2
---

# Grundrechenarten

Am folgenden Beispiel erkennst du schnell, wie man die Grundrechenarten in Python verwendet:

:::pyide

```python
print(21 + 2)   # Ergebnis: 23
print(21 - 2)   # Ergebnis: 19
print(21 * 2)   # Ergebnis: 42
print(21 / 2)   # Ergebnis: 10.5
print(2 ** 4)   # Ergebnis: 16
```

:::

:::snippet{#merken}
- Die Anweisung `print()` sorgt für eine Ausgabe.
- Die Symbole `+`, `-`, `*` und `/` stehen für Addition, Subtraktion, Multiplikation und Division.
- Mit `**` kann man potenzieren: `2 ** 10` steht für $2^{10}$.
- Die Punkt-vor-Strich-Regel gilt auch in Python.
- Klammern kannst du wie in Mathe setzen.
- Alles hinter einem `#` ist ein **Kommentar**. Python ignoriert es – es ist nur für Menschen gedacht.
:::

## Die Division genauer betrachtet

Es lohnt sich, die Division in Python genauer anzusehen. Neben `/` gibt es noch zwei weitere Zeichen.

:::snippet{#aufgabe}
a) Schreibe **zuerst ohne Rechner** hinter jeden Kommentar dein erwartetes Ergebnis.

b) Führe das Programm dann aus und vergleiche.

c) Erkläre anschließend, welche Bedeutung die Operatoren `//` und `%` haben.
:::

:::pyide

```python
print(21 / 2)    # Ergebnis:
print(23 / 4)    # Ergebnis:
print(10 / 3)    # Ergebnis:

print(21 // 2)   # Ergebnis:
print(23 // 4)   # Ergebnis:
print(10 // 3)   # Ergebnis:

print(20 % 5)    # Ergebnis:
print(21 % 5)    # Ergebnis:
print(22 % 5)    # Ergebnis:
print(23 % 5)    # Ergebnis:
print(24 % 5)    # Ergebnis:
print(25 % 5)    # Ergebnis:

print(35 // 4)   # Ergebnis:
print(35 % 4)    # Ergebnis:
```

:::

::::collapsible{title="Tipp 1: Ich sehe kein Muster"}

Vergleiche die drei Zeilen `21 / 2`, `21 // 2` und `21 % 2` miteinander. Denke an die schriftliche Division aus der Grundschule: Dort gab es ein Ergebnis **und** einen Rest.

::::

::::collapsible{title="Tipp 2: Noch ein Hinweis"}

Bei `%` kommen als Ergebnis immer nur die Zahlen 0, 1, 2, 3 und 4 vor, wenn man durch 5 teilt. Warum kann das Ergebnis niemals 5 oder größer sein?

::::

:::snippet{#merken}
- `/` ist die **normale Division**. Das Ergebnis ist eine Kommazahl.
- `//` ist die **Ganzzahldivision**. Sie liefert nur den ganzzahligen Anteil: `23 // 4` ist `5`.
- `%` ist der **Rest** (gesprochen: „modulo"). Er sagt, was übrig bleibt: `23 % 4` ist `3`.
- Zusammen gilt: `23 = 5 * 4 + 3`
:::

## Übungsaufgaben

### Aufgabe 1: Das Brett

:::snippet{#aufgabe}
Andrea macht eine Schreinerlehre. Sie soll ein **734 cm** langes Brett in **13 cm** lange Stücke schneiden.

Berechne mit Python, wie viele Stücke sie erhält und wie viel Abfall übrig bleibt.
:::

:::pyide

```python
# Dein Code hier
```

:::

::::collapsible{title="Tipp: Welcher Operator?"}

Die Anzahl der Stücke ist eine ganze Zahl – ein halbes Stück nützt Andrea nichts. Der Abfall ist genau das, was nach dem Zerschneiden übrig bleibt.

::::

:::protect{password="turtle-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
print(734 // 13)   # 56 Stücke
print(734 % 13)    # 6 cm Abfall
```

:::

### Aufgabe 2: Der Großrechner

:::snippet{#aufgabe}
Genau um 0 Uhr wurde eine aufwändige Berechnung an einem Großrechner gestartet. Die Berechnung hat insgesamt **143 Stunden** gedauert.

a) Ermittle mithilfe von Python, wie spät es war, als die Rechnung beendet wurde.

b) Ermittle auch, wie viele **volle Tage** der Großrechner gerechnet hat.
:::

:::pyide

```python
# Dein Code hier
```

:::

::::collapsible{title="Tipp: Wie helfen 24 Stunden?"}

Nach jeweils 24 Stunden zeigt die Uhr wieder dieselbe Zeit an. Welcher Operator „wirft die vollen Tage weg" und behält nur den Rest?

::::

:::protect{password="turtle-1-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
print(143 % 24)    # 23 -> es war 23 Uhr
print(143 // 24)   # 5 -> 5 volle Tage
```

:::

### Aufgabe 3: In 170 Stunden

:::snippet{#aufgabe}
Angenommen, es ist jetzt genau **14 Uhr**.

Berechne mithilfe von Python, wie spät es in **170 Stunden** sein wird.
:::

:::pyide

```python
# Dein Code hier
```

:::

:::protect{password="turtle-1-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
print((14 + 170) % 24)   # 16 -> es ist dann 16 Uhr
```

:::

## Rechnen mit Dezimalzahlen

Bisher kamen Dezimalzahlen nur als Ergebnisse vor. Natürlich kann man auch mit ihnen rechnen. Addition, Subtraktion und Multiplikation sind selbsterklärend – die Division sehen wir uns aber noch einmal genauer an.

:::snippet{#aufgabe}
a) Notiere **ohne das Programm auszuführen**, welche Ergebnisse du erwartest.

b) Führe es dann aus und vergleiche. Gibt es Abweichungen, versuche sie zu erklären.
:::

:::pyide

```python
print(10.5 / 2)     # Ergebnis:
print(10.5 // 2)    # Ergebnis:
print(10.5 % 2)     # Ergebnis:

print(11 / 2.5)     # Ergebnis:
print(11 // 2.5)    # Ergebnis:
print(11 % 2.5)     # Ergebnis:

print(10.5 / 2.5)   # Ergebnis:
print(10.5 // 2.5)  # Ergebnis:
print(10.5 % 2.5)   # Ergebnis:

print(4.5 // 0.4)   # Ergebnis:
print(4.5 % 0.4)    # Ergebnis:
```

:::

:::snippet{#brain}
Bei der letzten Zeile passiert etwas Merkwürdiges: Statt `0.1` kommt so etwas wie `0.09999999999999978` heraus.

Das ist **kein Fehler in Python**. Computer speichern Dezimalzahlen im Binärsystem – und genauso wenig, wie sich $\frac{1}{3}$ als endliche Dezimalzahl schreiben lässt, lässt sich `0.4` exakt binär darstellen. Es bleibt ein winziger Rundungsfehler.

Merke dir: **Vergleiche Dezimalzahlen nie mit `==` auf Gleichheit**, wenn du vorher mit ihnen gerechnet hast.
:::

### Aufgabe 4: Das Brett noch einmal

:::snippet{#aufgabe}
Andrea soll nun ein **734,5 cm** langes Brett in **13,2 cm** lange Stücke schneiden.

Berechne mit Python, wie viele Stücke sie erhält und wie viel Abfall übrig bleibt.

**Achtung:** In Python schreibt man das Komma als Punkt, also `734.5`.
:::

:::pyide

```python
# Dein Code hier
```

:::

:::protect{password="turtle-1-2-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
print(734.5 // 13.2)   # 55.0 Stücke
print(734.5 % 13.2)    # ca. 8.5 cm Abfall
```

:::

### Aufgabe 5: Zusatzaufgabe

:::snippet{#aufgabe}
Denke dir eine **eigene Fragestellung** aus, die man mithilfe der verschiedenen Arten der Division beantworten kann.

Schreibe dazu auch eine Musterlösung, sodass eine Mitschülerin oder ein Mitschüler damit arbeiten könnte.
:::

::textinput{placeholder="Meine Fragestellung ..."}

---

## Selbsttest

::::multievent

**1. Was gibt print(17 // 5) aus?**

{z{3}}

{h{Die Ganzzahldivision liefert nur den ganzzahligen Anteil.}}
{H{Richtig! 17 = 3 · 5 + 2, also ist das Ergebnis 3.}}

**2. Was gibt print(17 % 5) aus?**

{z{2}}

{h{Der Modulo-Operator liefert den Rest.}}
{H{Richtig! Es bleibt der Rest 2.}}

**3. Ordne zu: Was leistet welcher Operator?**

Der Operator geteilt-durch: {S1{liefert eine Kommazahl}}

Der Operator doppelter Schrägstrich: {S1{liefert den ganzzahligen Anteil}}

Der Operator Prozentzeichen: {S1{liefert den Rest}}

Der Operator doppelter Stern: {S1{potenziert}}

{H{Perfekt, du hast alle vier Operatoren richtig zugeordnet!}}
{h{Schau noch einmal in den Merkkasten weiter oben.}}

**4. Ein 100 cm langes Band wird in 30 cm lange Stücke geschnitten. Wie viel Rest bleibt?**

{z{10}} cm

{h{Wie oft passen 30 in 100? Und was bleibt dann übrig?}}
{H{Richtig! 100 % 30 ergibt 10.}}

**5. Welche Aussage über Kommentare ist richtig?**

{r6{Kommentare werden mit ausgeführt}}

{r6{!Alles hinter einem Rautezeichen wird von Python ignoriert}}

{r6{Kommentare müssen am Anfang des Programms stehen}}

{h{Wofür sind Kommentare gedacht – für den Computer oder für Menschen?}}
{H{Genau! Kommentare richten sich an Menschen, die den Code lesen.}}

::::
