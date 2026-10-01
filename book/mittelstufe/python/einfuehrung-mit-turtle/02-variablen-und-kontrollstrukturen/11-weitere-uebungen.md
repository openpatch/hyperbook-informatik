---
title: Weitere Übungen
index: 11
permaid: turtle-variablen-uebungen
---

# Weitere Übungen

Hier findest du weitere Aufgaben in der Art des [Rückblicks](./08-rueckblick): Zuerst verfolgst du Programme auf Papier, danach schreibst du selbst kleine Programme mit Eingabe, Schleife und Verzweigung.

## Werte verfolgen

:::snippet{#aufgabe}
**Aufgabe 1: Verdoppeln, verdreifachen, aufsummieren**

Führ für jedes Programm eine Tabelle auf Papier und notiere, was ausgegeben wird.

```python
produkt = 1
for i in range(4):
    produkt = produkt * 2
    print(i, produkt)
```

```python
zahl = 1
schritte = 0
while zahl < 50:
    zahl = zahl * 3
    schritte = schritte + 1
print(zahl, schritte)
```

```python
punkte = 0
for runde in range(3):
    for wurf in range(2):
        punkte = punkte + runde
print(punkte)
```

a) Notiere für jedes Programm alle Ausgabezeilen.

b) Im zweiten Programm ist `zahl` am Ende größer als 50. Erkläre, warum das kein Fehler ist.

c) Wie oft wird im dritten Programm die Zeile `punkte = punkte + runde` ausgeführt? Welche Werte werden dabei addiert?

d) Was gäbe das erste Programm aus, wenn `produkt = 0` statt `produkt = 1` am Anfang stünde?

e) Teste deine Antworten, indem du die Quelltexte unten eingibst.
:::

:::pyide{height="400px"}

```python
produkt = 1
for i in range(4):
    produkt = produkt * 2
    print(i, produkt)
```

:::

:::protect{password="turtle-2-11-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

Erstes Programm:

```
0 2
1 4
2 8
3 16
```

Zweites Programm:

```
81 4
```

Das `print` steht **nicht** eingerückt, gehört also nicht zur Schleife. Deshalb gibt es nur eine einzige Ausgabezeile.

| Durchlauf | `zahl` | `schritte` |
| --- | --- | --- |
| vorher | 1 | 0 |
| 1 | 3 | 1 |
| 2 | 9 | 2 |
| 3 | 27 | 3 |
| 4 | 81 | 4 |

Drittes Programm:

```
6
```

b) Die Bedingung `zahl < 50` wird nur **vor** jedem Durchlauf geprüft. Bei 27 ist sie noch wahr, also läuft die Schleife ein weiteres Mal – und danach ist `zahl` schon 81. Erst bei der nächsten Prüfung fällt auf, dass die Bedingung falsch ist.

c) 3 · 2 = **sechsmal**. Addiert werden 0, 0, 1, 1, 2, 2 – also in jeder Runde zweimal die Rundennummer. Zusammen ergibt das 6.

d) Lauter Nullen: `0 0`, `1 0`, `2 0`, `3 0`. Null mal zwei bleibt null. Wer multiplizieren will, muss mit 1 anfangen, wer addieren will, mit 0.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Tauschen, abbuchen, Wetter**

Führ für jedes Programm eine Tabelle auf Papier und notiere, was ausgegeben wird.

```python
x = 7
y = 3
x = x + y
y = x - y
x = x - y
print(x, y)
```

```python
konto = 100
monat = 0
while konto > 0:
    konto = konto - 30
    monat = monat + 1
print(monat, konto)
```

```python
temperatur = 12
for stunde in range(5):
    temperatur = temperatur + 3
    if temperatur > 20:
        print(stunde, "zu warm")
    elif temperatur > 15:
        print(stunde, "angenehm")
    else:
        print(stunde, "zu kalt")
```

a) Notiere für jedes Programm alle Ausgabezeilen.

b) Beschreibe in einem Satz, was das erste Programm mit den Werten von `x` und `y` macht.

c) Im zweiten Programm ist der Kontostand am Ende negativ. Wie müsste man die Bedingung ändern, damit nur abgebucht wird, solange noch mindestens 30 Euro auf dem Konto sind?

d) Im dritten Programm werden die beiden Bedingungen vertauscht: zuerst `temperatur > 15`, dann `temperatur > 20`. Was wird jetzt ausgegeben? Erkläre.

e) Teste deine Antworten, indem du die Quelltexte unten eingibst.
:::

:::pyide{height="400px"}

```python
x = 7
y = 3
x = x + y
y = x - y
x = x - y
print(x, y)
```

:::

:::protect{password="turtle-2-11-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

Erstes Programm:

| Zeile | `x` | `y` |
| --- | --- | --- |
| `x = 7` | 7 | – |
| `y = 3` | 7 | 3 |
| `x = x + y` | 10 | 3 |
| `y = x - y` | 10 | 7 |
| `x = x - y` | 3 | 7 |

```
3 7
```

Zweites Programm:

```
4 -20
```

Der Kontostand sinkt 100 → 70 → 40 → 10 → −20. Bei 10 ist `konto > 0` noch wahr, also wird ein viertes Mal abgebucht.

Drittes Programm:

```
0 zu kalt
1 angenehm
2 zu warm
3 zu warm
4 zu warm
```

Achte darauf, dass die Temperatur **vor** dem Vergleich erhöht wird: In Stunde 0 ist sie schon 15, nicht 12.

b) Das Programm **tauscht** die Werte der beiden Variablen – ganz ohne dritte Variable.

c) `while konto >= 30:` – dann bleibt nach drei Abbuchungen ein Rest von 10 Euro, und `monat` ist 3.

d)

```
0 zu kalt
1 angenehm
2 angenehm
3 angenehm
4 angenehm
```

Jede Temperatur über 20 ist auch über 15. Python prüft von oben nach unten und nimmt den **ersten** passenden Zweig – der Zweig „zu warm“ wird also nie erreicht. Die engere Bedingung gehört nach oben.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Eine rätselhafte Folge**

```python
zahl = 13
while zahl != 1:
    if zahl % 2 == 0:
        zahl = zahl // 2
    else:
        zahl = 3 * zahl + 1
    print(zahl)
```

a) Beschreibe in eigenen Worten, was in einem Schleifendurchlauf passiert.

b) Notiere alle Ausgabezeilen. Wie oft läuft die Schleife?

c) Was wird ausgegeben, wenn am Anfang `zahl = 1` steht?

d) Probiere am Computer andere Startwerte aus, zum Beispiel 6, 7 und 27. Was fällt dir auf?
:::

:::pyide{height="400px"}

```python
zahl = 13
while zahl != 1:
    if zahl % 2 == 0:
        zahl = zahl // 2
    else:
        zahl = 3 * zahl + 1
    print(zahl)
```

:::

::::collapsible{title="Tipp zu a)"}

`zahl % 2` ist der Rest beim Teilen durch 2. Ist er 0, ist die Zahl gerade.

::::

:::protect{password="turtle-2-11-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ist die Zahl gerade, wird sie halbiert. Ist sie ungerade, wird sie verdreifacht und um 1 erhöht. Danach wird die neue Zahl ausgegeben.

b)

```
40
20
10
5
16
8
4
2
1
```

Die Schleife läuft **neunmal** – so oft, wie Zeilen ausgegeben werden.

c) **Nichts.** Die Bedingung `zahl != 1` ist schon vor dem ersten Durchlauf falsch, die Schleife läuft kein einziges Mal.

d) Jeder Startwert landet irgendwann bei 1 – manche schnell (6 braucht 8 Schritte), manche erstaunlich langsam (27 braucht 111 Schritte und klettert zwischendurch bis 9232). Ob das für **jede** Startzahl gilt, weiß bis heute niemand. Diese offene Frage heißt **Collatz-Vermutung**.

:::

## Programme schreiben

:::snippet{#aufgabe}
**Aufgabe 4: Kassenbon**

An einer Kasse werden nacheinander die Preise der Artikel in ganzen Euro eingegeben. Die Eingabe von 0 beendet den Einkauf.
Danach gibt das Programm aus, wie viele Artikel gekauft wurden und was sie zusammen kosten. Liegt die Summe über 50 Euro, gibt es 5 Euro Rabatt – dann soll zusätzlich der Preis nach Abzug des Rabatts ausgegeben werden.

**Implementiere das Programm in Python**
:::

:::pyide

```python

```

:::

::::collapsible{title="Tipp 1: Was brauchst du?"}
Welche Variablen brauchst du? Denke an den aktuellen Preis, die Summe und die Anzahl der Artikel.
::::

::::collapsible{title="Tipp 2: Ablauf gestalten"}
Wie oft eingegeben wird, steht vorher nicht fest – du brauchst also eine `while`-Schleife. Die Entscheidung über den Rabatt fällt erst **nach** der Schleife, wenn die Summe feststeht.
::::

::::collapsible{title="Tipp 3: Das Gerüst"}

```python
summe = 0
anzahl = 0
preis = int(input("Preis: "))

while preis != 0:
    ...
    preis = int(input("Preis: "))
```
::::

:::protect{password="turtle-2-11-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
summe = 0
anzahl = 0
preis = int(input("Preis: "))

while preis != 0:
    summe = summe + preis
    anzahl = anzahl + 1
    preis = int(input("Preis: "))

print("Artikel:", anzahl)
print("Summe:", summe)

if summe > 50:
    print("Mit Rabatt:", summe - 5)
```

:::

:::snippet{#aufgabe}
**Aufgabe 5: Aufzug**

Ein Aufzug steht im Erdgeschoss, also in Etage 0. Das Programm fragt nach dem Zielstockwerk. Dann fährt der Aufzug Etage für Etage nach oben oder unten und gibt dabei jedes Mal die aktuelle Etage aus.
Ist das Ziel erreicht, gibt das Programm „Ding!“ aus und wie viele Etagen der Aufzug gefahren ist.

Ein Beispiel für Zielstockwerk −2: Ausgegeben wird `Etage -1`, `Etage -2`, `Ding!`, `Gefahrene Etagen: 2`.

**Implementiere das Programm in Python**
:::

:::pyide

```python

```

:::

::::collapsible{title="Tipp 1: Was brauchst du?"}
Du brauchst die aktuelle Etage, das Ziel und einen Zähler für die gefahrenen Etagen.
::::

::::collapsible{title="Tipp 2: Ablauf gestalten"}
Der Aufzug fährt, **solange** er nicht im Ziel ist. In jedem Schritt muss er entscheiden, ob er eine Etage hoch oder runter fährt.
::::

::::collapsible{title="Tipp 3: Das Gerüst"}

```python
etage = 0
gefahren = 0
ziel = int(input("Zielstockwerk: "))

while etage != ziel:
    if ziel > etage:
        ...
    else:
        ...
```
::::

:::protect{password="turtle-2-11-5" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
etage = 0
gefahren = 0
ziel = int(input("Zielstockwerk: "))

while etage != ziel:
    if ziel > etage:
        etage = etage + 1
    else:
        etage = etage - 1
    gefahren = gefahren + 1
    print("Etage", etage)

print("Ding!")
print("Gefahrene Etagen:", gefahren)
```

Gibt man 0 ein, läuft die Schleife kein einziges Mal – der Aufzug ist ja schon da.

**Erweiterung:** Lass das Programm danach immer wieder nach einem neuen Ziel fragen, bis 99 eingegeben wird. Der Aufzug startet dann jeweils dort, wo er zuletzt angekommen ist.

:::

:::snippet{#aufgabe}
**Aufgabe 6: Einmaleins-Trainer**

Das Programm fragt zuerst, welche Reihe geübt werden soll, zum Beispiel die 7. Danach stellt es **genau fünf** Aufgaben: „7 mal 1“, „7 mal 2“ bis „7 mal 5“.
Nach jeder Antwort gibt es „richtig“ aus oder „falsch, richtig wäre …“ mit dem korrekten Ergebnis. Am Ende gibt das Programm aus, wie viele Aufgaben richtig gelöst wurden.

**Implementiere das Programm in Python**
:::

:::pyide

```python

```

:::

::::collapsible{title="Tipp 1: for oder while?"}
Die Anzahl der Aufgaben steht vorher fest – fünf. Welche Schleife passt also?
::::

::::collapsible{title="Tipp 2: Die Aufgabe stellen"}
`range(5)` zählt von 0 bis 4. Die Aufgaben sollen aber bei „mal 1“ anfangen. Rechne also mit `i + 1`.

```python
print(reihe, "mal", i + 1)
antwort = int(input("Ergebnis: "))
```
::::

::::collapsible{title="Tipp 3: Das Gerüst"}

```python
reihe = int(input("Welche Reihe? "))
richtig = 0

for i in range(5):
    ergebnis = reihe * (i + 1)
    ...
```
::::

:::protect{password="turtle-2-11-6" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```python
reihe = int(input("Welche Reihe? "))
richtig = 0

for i in range(5):
    ergebnis = reihe * (i + 1)
    print(reihe, "mal", i + 1)
    antwort = int(input("Ergebnis: "))
    if antwort == ergebnis:
        print("richtig")
        richtig = richtig + 1
    else:
        print("falsch, richtig wäre", ergebnis)

print("Richtig gelöst:", richtig, "von 5")
```

:::
