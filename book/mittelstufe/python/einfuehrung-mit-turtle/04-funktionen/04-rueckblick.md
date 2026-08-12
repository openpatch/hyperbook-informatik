---
title: Rückblick
index: 4
---

# Rückblick

Funktionen bringen nichts Neues, was das Programm **kann** – sie bringen Ordnung. Der Gewinn zeigt sich erst beim Ändern: Was einmal dasteht, ändert man einmal.

## Das kann ich jetzt

- [ ] Ich kann eine Funktion mit `def` definieren und aufrufen. ([4.1](./01-funktionen-ohne-parameter))
- [ ] Ich weiß, dass beim Definieren noch nichts passiert. ([4.1](./01-funktionen-ohne-parameter))
- [ ] Ich kann Funktionen mit **Parametern** schreiben und den Unterschied zum **Argument** erklären. ([4.2](./02-funktionen-mit-parametern))
- [ ] Ich kann eine Funktion mit **Rückgabewert** schreiben und den Unterschied zu `print` erklären. ([4.3](./03-funktionen-mit-rueckgabewert))
- [ ] Ich erkenne, wann sich eine eigene Funktion lohnt.

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Was wird ausgegeben?**

```python
def gruss():
    print("Hallo")

def doppelt(zahl):
    return zahl * 2

def dreifach(zahl):
    print(zahl * 3)

print("A")
gruss()
ergebnis = doppelt(5)
print(ergebnis)
print(doppelt(doppelt(3)))
x = dreifach(4)
print(x)
```

a) Notiere alle Ausgaben in der richtigen Reihenfolge.

b) Warum erscheint „Hallo" erst nach „A", obwohl `gruss` weiter oben steht?

c) Die letzte Zeile gibt `None` aus. Erkläre, warum.

d) Worin unterscheiden sich `doppelt` und `dreifach`? Welche der beiden kannst du in einer Rechnung weiterverwenden?
:::

:::pyide{height="450px"}

```python
def gruss():
    print("Hallo")

def doppelt(zahl):
    return zahl * 2

def dreifach(zahl):
    print(zahl * 3)

print("A")
gruss()
ergebnis = doppelt(5)
print(ergebnis)
print(doppelt(doppelt(3)))
x = dreifach(4)
print(x)
```

:::

:::protect{password="turtle-4-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
A
Hallo
10
12
12
None
```

b) Weil beim **Definieren** nichts ausgeführt wird. Python merkt sich nur, was der Name bedeutet. Ausgeführt wird der Rumpf erst beim **Aufruf** – und der steht nach `print("A")`.

c) `dreifach` gibt etwas aus, **liefert** aber nichts zurück: Es fehlt ein `return`. Eine Funktion ohne `return` liefert automatisch `None` – das ist Pythons Wort für „nichts". In `x` landet also `None`, und genau das wird ausgegeben.

d) `doppelt` **liefert** einen Wert zurück, `dreifach` **gibt ihn aus**. Nur mit dem Rückgabewert kann man weiterrechnen: `doppelt(doppelt(3))` funktioniert und ergibt 12, weil das Ergebnis des inneren Aufrufs zum Argument des äußeren wird. `dreifach(dreifach(4))` würde dagegen scheitern, weil `None` mal 3 keine gültige Rechnung ist.

**Die Faustregel:** Eine Funktion, die etwas **berechnet**, gibt das Ergebnis mit `return` zurück. Ob es ausgegeben wird, entscheidet die aufrufende Stelle.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Funktionen mit Fehlern**

```python
# a)
def quadrat(zahl)
    return zahl * zahl

# b)
def flaeche(laenge, breite):
    return laenge * breite

print(flaeche(5))

# c)
def summe(a, b):
    ergebnis = a + b

print(summe(3, 4))

# d)
print(begruessung())

def begruessung():
    return "Hallo"
```

Sag für jeden Ausschnitt: Was ist falsch, und was meldet Python?
:::

::::collapsible{title="Tipp zu c)"}

Die Funktion rechnet richtig – aber was macht sie mit dem Ergebnis? Vergleiche mit `dreifach` aus Aufgabe 1.

::::

:::protect{password="turtle-4-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Der **Doppelpunkt** fehlt am Ende der `def`-Zeile. Syntaxfehler.

b) Die Funktion hat **zwei** Parameter, beim Aufruf steht nur ein Argument. Python meldet, dass ein Argument fehlt. Beim Aufruf muss für jeden Parameter ein Wert dastehen – und zwar in der richtigen Reihenfolge.

c) Es fehlt das `return`. Die Funktion rechnet, legt das Ergebnis in einer Variablen ab – und wirft es weg, sobald sie endet. Ausgegeben wird `None`. Richtig ist `return a + b` oder `return ergebnis`.

d) Die Funktion wird **vor** ihrer Definition aufgerufen. Python arbeitet die Datei von oben nach unten ab und kennt den Namen an dieser Stelle noch nicht. Deshalb gilt: Funktionen werden **vor** dem Hauptprogramm definiert.

Bei c) meldet Python nichts – das Programm läuft und gibt `None` aus. Das ist der einzige der vier Fälle, den man nur bemerkt, wenn man das Ergebnis anschaut.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Die Ampel, aufgeräumt**

Im [Rückblick zu Kapitel 3](../03-logik/04-rueckblick) hast du eine Ampel gezeichnet – mit dreimal fast demselben Block. Bau sie jetzt mit einer Funktion um.

a) Schreib eine Funktion `lampe(y, farbe)`, die eine gefüllte Lampe an der Höhe `y` in der angegebenen Farbe zeichnet.

b) Ersetze die drei Blöcke durch drei Aufrufe.

c) Wie viele Zeilen hat dein Programm jetzt, wie viele vorher?

d) Die Lampen sollen größer werden: Radius 40 statt 30. An wie vielen Stellen musst du jetzt ändern, an wie vielen vorher?

e) Schreib zusätzlich eine Funktion `ampelfarbe(frei, warnung)`, die den Text `"gruen"`, `"gelb"` oder `"rot"` **zurückgibt**. Warum ist ein Rückgabewert hier besser, als direkt zu zeichnen?
:::

::::collapsible{title="Tipp 1: Der Kopf der Funktion"}

```python
def lampe(y, farbe):
    penup()
    goto(0, y)
    pendown()
    # ...
```

Alles, was sich zwischen den drei Blöcken unterschieden hat, wird zum **Parameter**. Alles, was gleich war, kommt unverändert in den Rumpf.

::::

::::collapsible{title="Tipp 2: zu e)"}

Die Funktion soll **entscheiden**, nicht zeichnen:

```python
def ampelfarbe(frei, warnung):
    if warnung:
        return "gelb"
    if frei:
        return "gruen"
    return "rot"
```

Ein `return` beendet die Funktion sofort – deshalb braucht es hier gar kein `else`.

::::

:::pyide{canvas}

```python
from turtle import *

shape("turtle")
speed(0)

frei = True
warnung = False

# Deine Funktionen und dein Hauptprogramm:

```

:::

:::protect{password="turtle-4-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
from turtle import *

shape("turtle")
speed(0)

def lampe(y, farbe):
    penup()
    goto(0, y)
    pendown()
    fillcolor(farbe)
    begin_fill()
    circle(30)
    end_fill()

def ampelfarbe(frei, warnung):
    if warnung:
        return "gelb"
    if frei:
        return "gruen"
    return "rot"

frei = True
warnung = False

leuchtet = ampelfarbe(frei, warnung)

if leuchtet == "rot":
    lampe(100, "red")
else:
    lampe(100, "gray")

if leuchtet == "gelb":
    lampe(20, "yellow")
else:
    lampe(20, "gray")

if leuchtet == "gruen":
    lampe(-60, "green")
else:
    lampe(-60, "gray")
```

c) Der Zeichenteil schrumpft von 21 Zeilen auf 3 Aufrufe. Insgesamt wird das Programm kaum kürzer – aber es wird **änderbar**.

d) Mit Funktion an **einer** Stelle: im Rumpf von `lampe`. Ohne Funktion an **drei** Stellen. Genau darin liegt der Gewinn, und er wächst mit jeder weiteren Lampe.

e) Weil `ampelfarbe` damit nur **eine** Aufgabe hat: entscheiden. Man kann die Entscheidung dadurch auch für etwas anderes benutzen – sie ausgeben, in einer Datei speichern, weiterrechnen –, ohne dass dabei ungewollt etwas gezeichnet wird. Eine Funktion, die entscheidet **und** zeichnet, ließe sich nur für genau diesen einen Zweck verwenden.

:::

---

## Selbsttest

::::multievent

**1. Was passiert beim Definieren einer Funktion?**

{r1{Der Rumpf wird ausgeführt.}}

{r1{!Noch gar nichts – Python merkt sich nur, was der Name bedeutet.}}

{r1{Die Funktion wird einmal aufgerufen.}}

{r1{Die Variablen werden gelöscht.}}

{h{Ausgeführt wird erst beim Aufruf.}}
{H{Richtig.}}

**2. Was liefert eine Funktion ohne return zurück?**

{r2{eine Null}}

{r2{einen leeren Text}}

{r2{!None}}

{r2{einen Fehler}}

{h{Pythons Wort für nichts.}}
{H{Richtig – und damit kann man nicht weiterrechnen.}}

**3. Wie heißt der Wert, den man beim Aufruf einsetzt?**

{r3{Parameter}}

{r3{!Argument}}

{r3{Rückgabewert}}

{r3{Variable}}

{h{Der Parameter steht in der def-Zeile, der andere Begriff beim Aufruf.}}
{H{Richtig.}}

**4. Wo müssen Funktionen stehen?**

{r4{ganz am Ende der Datei}}

{r4{!vor dem Hauptprogramm}}

{r4{in einer eigenen Datei}}

{r4{das ist egal}}

{h{Python arbeitet die Datei von oben nach unten ab.}}
{H{Richtig – sonst kennt es den Namen beim Aufruf noch nicht.}}

**5. Worin unterscheiden sich print und return?**

{r5{gar nicht}}

{r5{!print zeigt etwas an, return liefert einen Wert zurück, mit dem man weiterarbeiten kann}}

{r5{return zeigt etwas an, print liefert einen Wert}}

{r5{return ist nur die kürzere Schreibweise}}

{h{Womit kannst du weiterrechnen?}}
{H{Richtig – deshalb gehört das Rechnen in die Funktion und das Ausgeben nach draußen.}}

**6. Eine Funktion hat zwei Parameter, beim Aufruf steht ein Argument. Was passiert?**

{r6{Der zweite Parameter bleibt leer.}}

{r6{!Python meldet einen Fehler.}}

{r6{Der zweite Parameter wird null.}}

{r6{Die Funktion wird zweimal aufgerufen.}}

{h{Für jeden Parameter muss ein Wert dastehen.}}
{H{Richtig.}}

**7. Woran erkennst du, dass sich eine eigene Funktion lohnt?**

{c1{!Derselbe Block kommt mehrfach fast gleich vor.}}

{c1{!Man kann dem Block einen Namen geben, der sagt, was er tut.}}

{c1{Der Block ist länger als fünf Zeilen.}}

{c1{Im Block kommt eine Schleife vor.}}

{h{Zwei der Angebote sind gute Gründe, zwei nur Äußerlichkeiten.}}
{H{Richtig – der Name ist das beste Anzeichen.}}

::::
