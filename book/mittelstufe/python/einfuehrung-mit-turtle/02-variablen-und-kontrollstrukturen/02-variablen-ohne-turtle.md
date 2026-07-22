---
title: Variablen ohne Turtle
index: 2
---

# Variablen ohne Turtle

Variablen sind nicht nur beim Zeichnen nützlich. Wir betrachten wieder ein Beispiel:

:::pyide

```python
meine_zahl = 23
print(meine_zahl)                 # Ausgabe: 23

noch_eine_zahl = 40 + 5
print(noch_eine_zahl)             # Ausgabe: 45

print(meine_zahl + noch_eine_zahl)  # Ausgabe: 68

meine_zahl = meine_zahl / 2
print(meine_zahl)                 # Ausgabe: 11.5
```

:::

:::snippet{#merken}
- Den Wert einer Variablen kannst du dir mit `print(meine_zahl)` anzeigen lassen.
- Rechts vom Gleichheitszeichen darf eine **Rechnung** stehen. Python rechnet sie zuerst aus und speichert dann das Ergebnis.
- Du kannst auf den Wert einer Variablen etwas draufrechnen: `meine_zahl = meine_zahl + 10`.
:::

:::snippet{#brain}
`meine_zahl = meine_zahl + 10` sieht auf den ersten Blick unsinnig aus. In der Mathematik wäre $x = x + 10$ tatsächlich eine falsche Aussage.

In der Informatik bedeutet das Gleichheitszeichen aber **nicht** „ist gleich", sondern: *„Berechne die rechte Seite und lege das Ergebnis in der Variablen links ab."*

Man liest es am besten als Pfeil: `meine_zahl` ← `meine_zahl + 10`
:::

## Aufgabe 1: Ausgaben vorhersagen

:::snippet{#aufgabe}
Ermittle **zunächst ohne Rechner**, welche Ausgaben das folgende Programm liefert. Schreibe sie hinter die Kommentare.

Überprüfe danach am Rechner, ob deine Angaben stimmen.
:::

:::pyide

```python
meine_zahl = 10
print(meine_zahl)

noch_eine_zahl = 50
print(2 * noch_eine_zahl)           # Ausgabe:

meine_zahl = meine_zahl + noch_eine_zahl

print(meine_zahl)                   # Ausgabe:
print(meine_zahl + noch_eine_zahl)  # Ausgabe:

meine_zahl = noch_eine_zahl
noch_eine_zahl = meine_zahl

print(meine_zahl)                   # Ausgabe:
print(noch_eine_zahl)               # Ausgabe:
```

:::

::::collapsible{title="Tipp: Führe eine Tabelle"}

Lege dir auf Papier eine Tabelle mit einer Spalte je Variable an. Gehe das Programm Zeile für Zeile durch und trage nach jeder Zuweisung den neuen Wert ein.

| Zeile | meine_zahl | noch_eine_zahl |
| --- | --- | --- |
| 1 | 10 | – |
| 4 | 10 | 50 |
| … | | |

Diese Technik heißt **Schreibtischtest** und hilft dir bei jedem Programm, das du nicht sofort durchschaust.

::::

## Aufgabe 2: Was steht am Ende drin?

:::snippet{#aufgabe}
Ermittle **ohne Rechner**, welchen Wert die Variable `meine_zahl` am Ende des Programms hat. Überprüfe dein Ergebnis danach am Rechner, indem du eine `print`-Anweisung ergänzt.
:::

:::pyide

```python
meine_zahl = 5
meine_zahl = meine_zahl * 3
meine_zahl = meine_zahl - 1
meine_zahl = meine_zahl // 3
```

:::

:::protect{password="turtle-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

5 → 15 → 14 → 4

Am Ende steht in `meine_zahl` der Wert **4**, denn `14 // 3` ergibt 4 (Rest 2 fällt weg).

:::

## Aufgabe 3: Zwei Variablen

:::snippet{#aufgabe}
Ermittle auch hier **ohne Rechner**, welche Werte die Variablen `meine_zahl` und `deine_zahl` am Ende haben. Überprüfe dein Ergebnis danach am Rechner.
:::

:::pyide

```python
meine_zahl = 2
deine_zahl = 3

meine_zahl = meine_zahl + deine_zahl
deine_zahl = deine_zahl - meine_zahl
meine_zahl = meine_zahl ** 2
```

:::

::::collapsible{title="Tipp: Die Reihenfolge ist entscheidend"}

In Zeile 4 wird `meine_zahl` verändert. In Zeile 5 wird dann mit dem **neuen** Wert gerechnet, nicht mehr mit dem alten.

::::

:::protect{password="turtle-2-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Schritt | meine_zahl | deine_zahl |
| --- | --- | --- |
| Start | 2 | 3 |
| `meine_zahl = meine_zahl + deine_zahl` | 5 | 3 |
| `deine_zahl = deine_zahl - meine_zahl` | 5 | -2 |
| `meine_zahl = meine_zahl ** 2` | 25 | -2 |

Am Ende gilt: `meine_zahl` ist 25 und `deine_zahl` ist -2.

:::

## Aufgabe 4: Die Klassenkasse

:::snippet{#aufgabe}
Zu Beginn des Schuljahres wird in der Klasse 5b eine neue Klassenkasse angelegt. Weil die Fünftklässler noch nicht gut mit Dezimalzahlen umgehen können, werden immer nur **ganze Eurobeträge** eingezahlt oder entnommen. Im Laufe des Schuljahres geschieht Folgendes:

1. Die Klassenkasse wird eingerichtet. Sie ist noch leer.
2. 27 Schülerinnen und Schüler zahlen ihren Beitrag von 5 € ein.
3. 3 Nachzügler zahlen ebenfalls – wegen der Verspätung aber 6 €.
4. Für 30 € wird Bastelmaterial gekauft.
5. Der Eintritt ins Schwimmbad kostet insgesamt 60 € und wird aus der Kasse bezahlt.

a) Simuliere diesen Ablauf mithilfe einer oder mehrerer Variablen in Python. Lass am Ende den Kontostand ausgeben.

b) Berechne mit Python, wie viel Geld jeder der 30 Schülerinnen und Schüler am Ende ausgezahlt bekommt, wenn das Geld gleichmäßig aufgeteilt wird, aber nur **ganze Eurobeträge** ausgezahlt werden. Ermittle auch, wie viel dann in der Kasse übrig bleibt.
:::

:::pyide

```python
kasse = 0

# Dein Code hier

print(kasse)
```

:::

::::collapsible{title="Tipp 1: Ein Schritt pro Zeile"}

Übersetze jeden der fünf Punkte in genau eine Zeile Python. Zum Beispiel wird aus Punkt 2:

```python
kasse = kasse + 27 * 5
```

::::

::::collapsible{title="Tipp 2: Aufteilen ohne Cent"}

Bei Teil b) brauchst du die beiden Operatoren aus der Lektion über die Grundrechenarten: einen für den Betrag pro Person, einen für den Rest in der Kasse.

::::

:::protect{password="turtle-2-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
kasse = 0
kasse = kasse + 27 * 5     # 135
kasse = kasse + 3 * 6      # 153
kasse = kasse - 30         # 123
kasse = kasse - 60         # 63
print(kasse)               # 63

print(kasse // 30)         # 2 Euro pro Person
print(kasse % 30)          # 3 Euro bleiben in der Kasse
```

:::

## Vergleichsoperatoren

:::snippet{#aufgabe}
Ermittle, welche Ausgaben das folgende Programm liefert. Erkläre dann, was die verschiedenen **Vergleichsoperatoren** bedeuten.
:::

:::pyide

```python
erste_zahl = 23
zweite_zahl = 45
dritte_zahl = 23

print(erste_zahl == zweite_zahl)    # Ausgabe:
print(erste_zahl > zweite_zahl)     # Ausgabe:
print(erste_zahl < zweite_zahl)     # Ausgabe:
print(erste_zahl >= zweite_zahl)    # Ausgabe:
print(erste_zahl <= zweite_zahl)    # Ausgabe:
print(erste_zahl != zweite_zahl)    # Ausgabe:

print(erste_zahl == dritte_zahl)    # Ausgabe:
print(erste_zahl > dritte_zahl)     # Ausgabe:
print(erste_zahl < dritte_zahl)     # Ausgabe:
print(erste_zahl >= dritte_zahl)    # Ausgabe:
print(erste_zahl <= dritte_zahl)    # Ausgabe:
print(erste_zahl != dritte_zahl)    # Ausgabe:
```

:::

:::snippet{#merken}
Ein Vergleich liefert immer einen der beiden **Wahrheitswerte** `True` (wahr) oder `False` (falsch).

| Operator | Bedeutung |
| --- | --- |
| `==` | ist gleich |
| `!=` | ist ungleich |
| `<` | ist kleiner als |
| `>` | ist größer als |
| `<=` | ist kleiner oder gleich |
| `>=` | ist größer oder gleich |

**Achte auf den Unterschied:** Ein einfaches `=` **weist zu**, ein doppeltes `==` **vergleicht**. Das ist eine der häufigsten Fehlerquellen für Programmieranfängerinnen und -anfänger.
:::

## Zusatzaufgaben

:::snippet{#aufgabe}
a) Denke dir einen Ablauf wie bei der Klassenkasse aus, der sich mit Variablen simulieren lässt. Halte ihn schriftlich fest, sodass eine Mitschülerin oder ein Mitschüler ihn bearbeiten kann. Entwickle auch eine Musterlösung.

b) In der Informatik sind Anweisungen wie `meine_zahl = meine_zahl + 10` alltäglich. In der Mathematik würde $x = x + 10$ aber keinen Sinn ergeben. Erläutere, warum nicht.
:::

::textinput{placeholder="Meine Antwort zu b) ..."}

---

## Selbsttest

::::multievent

**1. Was steht am Ende in der Variablen? Ablauf: a = 4, dann a = a * 2, dann a = a + 1**

{z{9}}

{h{Rechne Schritt für Schritt: erst verdoppeln, dann eins dazu.}}
{H{Richtig! 4 wird zu 8 und dann zu 9.}}

**2. Welcher Operator prüft, ob zwei Werte gleich sind?**

{r1{Ein einfaches Gleichheitszeichen}}

{r1{!Ein doppeltes Gleichheitszeichen}}

{r1{Ein Ausrufezeichen mit Gleichheitszeichen}}

{h{Das einfache Gleichheitszeichen wird schon für etwas anderes verwendet.}}
{H{Richtig! Das einfache Gleichheitszeichen weist zu, das doppelte vergleicht.}}

**3. Was gibt print(7 != 7) aus?**

{r2{True}}

{r2{!False}}

{r2{7}}

{h{Der Operator bedeutet „ist ungleich". Sind 7 und 7 ungleich?}}
{H{Richtig! 7 ist gleich 7, also ist die Aussage „7 ist ungleich 7" falsch.}}

**4. Welche Werte kann ein Vergleich in Python liefern?** (Mehrfachauswahl)

{c1{!True}}

{c1{!False}}

{c1{Vielleicht}}

{c1{Die verglichene Zahl}}

{h{Ein Vergleich beantwortet eine Ja-Nein-Frage.}}
{H{Richtig! Es gibt genau zwei Wahrheitswerte.}}

**5. Ein Schreibtischtest ist …**

{r3{… ein Test, den der Computer automatisch ausführt}}

{r3{!… das schrittweise Durchgehen eines Programms auf Papier}}

{r3{… ein Befehl in Python}}

{h{Er heißt so, weil man ihn am Schreibtisch macht – ohne Rechner.}}
{H{Genau! Beim Schreibtischtest verfolgst du die Werte der Variablen von Hand.}}

::::
