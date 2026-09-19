---
name: Struktogramme
lang: de
permaid: oom-struktogramme
---

# Struktogramme

Ein :t[Struktogramm]{#struktogramm} ist eine grafische Darstellung eines Algorithmus, die seinen Ablauf und seine Struktur übersichtlich zeigt. Struktogramme dienen dazu, Programme zu planen und zu dokumentieren.

Hier ein Beispiel für ein Struktogramm zur Berechnung des Maximums von drei Zahlen:

:::struktolab{fontSize=15}
```
eingabe("Zahl a")
eingabe("Zahl b")
eingabe("Zahl c")
max = a
falls b > max:
    max = b
sonst:
falls c > max:
    max = c
sonst:
ausgabe(max)
```
:::

# Notation

Die Notation der einzelnen Strukturen in einem Struktogramm ist wie folgt. Die Notation legt dabei nur die Form der Strukturen fest. Die Inhalte können umgangssprachlich formuliert werden.

## Verzweigungen

### :t[Bedingte Anweisung]{#bedingte-anweisung}

Der Kasten wird durch zwei Schrägen in zwei Spalten geteilt, die mit **Wahr** und **Falsch** beschriftet sind. Ausgeführt wird immer nur eine der beiden Spalten.

:::struktolab{fontSize=15}
```
falls Bedingung:
    Anweisung, wenn die Bedingung zutrifft
sonst:
    Anweisung, wenn sie nicht zutrifft
```
:::

Bleibt ein Zweig leer, wird seine Spalte trotzdem gezeichnet – sie bleibt einfach leer. So ist zu sehen, dass der Fall bedacht und nicht vergessen wurde.

:::struktolab{fontSize=15}
```
falls Bedingung:
    Anweisung, wenn die Bedingung zutrifft
sonst:
```
:::

### :t[Fallunterscheidung]{#fallunterscheidung}

Sind mehr als zwei Fälle zu unterscheiden, bekommt der Kasten je Fall eine Spalte und zusätzlich eine für den Rest.

:::struktolab{fontSize=15}
```
unterscheide Ausdruck:
    fall "erster Wert":
        Anweisung für den ersten Fall
    fall "zweiter Wert":
        Anweisung für den zweiten Fall
    sonst:
        Anweisung für alle übrigen Fälle
```
:::

## Wiederholungen

### :t[Zählergesteuerte Schleife]{#zaehlergesteuerte-schleife}

Die Anzahl der Durchläufe steht vorher fest. Der Schleifenkasten greift oben und links um den Rumpf.

:::struktolab{fontSize=15}
```
wiederhole für i = 1 bis n:
    Anweisung, die wiederholt wird
```
:::

### :t[Kopfgesteuerte Schleife]{#kopfgesteuerte-schleife}

Die Bedingung steht **vor** dem Rumpf und wird vor jedem Durchlauf geprüft. Trifft sie von Anfang an nicht zu, läuft der Rumpf kein einziges Mal.

:::struktolab{fontSize=15}
```
wiederhole solange Bedingung:
    Anweisung, die wiederholt wird
```
:::

### :t[Fußgesteuerte Schleife]{#fussgesteuerte-schleife}

Die Bedingung steht **hinter** dem Rumpf; der Kasten greift unten und links herum. Der Rumpf läuft deshalb mindestens einmal.

:::struktolab{fontSize=15}
```
wiederhole:
    Anweisung, die wiederholt wird
solange Bedingung
```
:::

## Anweisungen

Eine einzelne Anweisung ist ein Kasten mit Text. Mehrere Anweisungen untereinander bilden eine **Sequenz**. Eingaben und Ausgaben bekommen zusätzlich ein Zeichen: `▶` für die Eingabe, `◀` für die Ausgabe.

:::struktolab{fontSize=15}
```
eingabe("Wert")
Anweisung
ausgabe("Ergebnis")
```
:::
