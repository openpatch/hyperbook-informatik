---
title: Vorfahrtsregeln
index: 3
---

# Vorfahrtsregeln

In der Mathematik gilt „Punkt vor Strich". Bei logischen Verknüpfungen gibt es ebenfalls **Vorfahrtsregeln**:

:::snippet{#merken}
1. `not` bindet am stärksten – es geht immer vor.
2. Danach gilt `and` vor `or`.
3. Klammern kannst du wie in mathematischen Termen verwenden. Sie haben immer Vorrang.

Ein Beispiel:

```python
not True and False or True
```

wird von Python gelesen als

```python
((not True) and False) or True
```
:::

## Aufgabe 1: Werte bestimmen

:::snippet{#aufgabe}
Ermittle **zuerst selbst**, welchen Wert die folgenden Ausdrücke jeweils haben. Notiere deine Ergebnisse hinter den Kommentaren.

Kontrolliere sie danach mit Python.
:::

:::pyide

```python
print(not True and False)          # Ergebnis:

print(not (True and False))        # Ergebnis:

print(not False or not True)       # Ergebnis:

print(False and True or False)     # Ergebnis:

print(False and (True or False))   # Ergebnis:

print(not False and (True or False))  # Ergebnis:
```

:::

::::collapsible{title="Tipp: Schrittweise auflösen"}

Gehe wie beim Rechnen vor und ersetze immer den innersten bzw. am stärksten bindenden Teil:

```
not True and False
  (not True) and False
  False and False
  False
```

::::

:::protect{password="turtle-3-3-1" description="Lösungen. Erfrage das Passwort bei deiner Lehrkraft."}

| Ausdruck | wird gelesen als | Ergebnis |
| --- | --- | --- |
| `not True and False` | `(not True) and False` | `False` |
| `not (True and False)` | `not (False)` | `True` |
| `not False or not True` | `(not False) or (not True)` | `True` |
| `False and True or False` | `(False and True) or False` | `False` |
| `False and (True or False)` | `False and True` | `False` |
| `not False and (True or False)` | `True and True` | `True` |

Beachte die ersten beiden Zeilen: Die Klammer ändert das Ergebnis komplett.

:::

## Aufgabe 2: Das Eis-Programm reparieren

In der letzten Lektion ist dir vielleicht schon aufgefallen, dass mit dem Eis-Programm etwas nicht stimmt.

:::snippet{#aufgabe}
a) Setze im Programm unten `mehr_als_zehn_euro = True` und probiere alle Kombinationen der beiden anderen Variablen durch. Was stellst du fest?

b) Erkläre mithilfe der Vorfahrtsregeln, warum das so ist.

c) Setze eine Klammer so, dass die Regel lautet: *„Es gibt Eis, wenn nicht Montag ist **und** außerdem entweder die Sonne scheint oder ich mehr als zehn Euro dabeihabe."*
:::

:::pyide

```python
heute_ist_montag = False
die_sonne_scheint = False
mehr_als_zehn_euro = True

eis_essen = not heute_ist_montag and die_sonne_scheint or mehr_als_zehn_euro

if eis_essen:
    print("Ich gehe ein Eis essen!")
else:
    print("Heute gibt es kein Eis!")
```

:::

::::collapsible{title="Tipp zu b)"}

Weil `and` vor `or` geht, liest Python die Zeile so:

```python
((not heute_ist_montag) and die_sonne_scheint) or mehr_als_zehn_euro
```

Bei einem `or` reicht **eine** wahre Seite. Ist also `mehr_als_zehn_euro` wahr, ist das Gesamtergebnis wahr – der Rest der Bedingung spielt keine Rolle mehr.

::::

:::protect{password="turtle-3-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
eis_essen = not heute_ist_montag and (die_sonne_scheint or mehr_als_zehn_euro)
```

Jetzt muss zuerst der Montag ausgeschlossen sein. Erst dann entscheidet die Klammer darüber, ob es Eis gibt.

:::

## Aufgabe 3: Eine Bedingung in Worte fassen

:::snippet{#aufgabe}
Beschreibe in einem Satz, wann die folgende Bedingung wahr ist:

```python
not (regen or schnee) and temperatur > 15
```

Formuliere anschließend eine Bedingung für: *„Der Ausflug findet statt, wenn es weder regnet noch schneit und wenn entweder der Bus fährt oder genug Fahrräder da sind."*
:::

::textinput{placeholder="Die Bedingung ist wahr, wenn ..."}

::::collapsible{title="Auflösung zum ersten Teil"}

Die Bedingung ist wahr, wenn es **weder regnet noch schneit** und die Temperatur gleichzeitig **über 15 Grad** liegt.

::::

::::collapsible{title="Auflösung zum zweiten Teil"}

```python
ausflug = not (regen or schnee) and (bus_faehrt or genug_fahrraeder)
```

Beide Klammern sind nötig: die erste, damit sich das `not` auf beides bezieht, die zweite, damit sich das `or` nicht über das `and` hinweg durchsetzt.

::::

:::snippet{#brain}
**Ein Tipp aus der Praxis:** Auch erfahrene Programmiererinnen und Programmierer setzen häufig Klammern, obwohl die Vorfahrtsregeln sie nicht erzwingen.

Der Grund ist nicht, dass sie die Regeln nicht kennen – sondern dass Klammern die Absicht **sichtbar** machen. Wer den Code später liest, muss dann nicht raten.
:::

---

## Selbsttest

::::multievent

**1. Welche Verknüpfung bindet am stärksten?**

{r1{and}}

{r1{or}}

{r1{!not}}

{h{Es ist diejenige, die sich nur auf einen einzigen Wert bezieht.}}
{H{Richtig! not geht immer vor.}}

**2. Was ergibt True or False and False?**

{r2{!True}}

{r2{False}}

{h{Denke daran: and geht vor or. Werte also zuerst den hinteren Teil aus.}}
{H{Richtig! False and False ergibt False, und True or False ergibt True.}}

**3. Wie liest Python den Ausdruck a or b and c?**

{r3{(a or b) and c}}

{r3{!a or (b and c)}}

{h{Welche Verknüpfung hat Vorfahrt?}}
{H{Richtig! Das and wird zuerst ausgewertet.}}

**4. Was ergibt not True or True?**

{r4{!True}}

{r4{False}}

{h{Zuerst wird das not angewendet, dann das or.}}
{H{Richtig! False or True ergibt True.}}

**5. Warum setzt man oft Klammern, obwohl sie nicht nötig wären?**

{r5{Weil das Programm dann schneller läuft}}

{r5{!Weil der Code dadurch besser lesbar wird}}

{r5{Weil Python sonst eine Warnung ausgibt}}

{h{Für wen schreibt man Code eigentlich – nur für den Computer?}}
{H{Genau! Klammern machen die Absicht für andere Lesende sichtbar.}}

::::
