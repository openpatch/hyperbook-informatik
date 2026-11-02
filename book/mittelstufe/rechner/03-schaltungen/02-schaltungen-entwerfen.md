---
title: Schaltungen entwerfen und prüfen
index: 2
permaid: rechner-schaltungen-entwerfen
scripts:
  - /wc/logik-schaltung.js
---

# Schaltungen entwerfen und prüfen

Bisher war die Schaltung vorgegeben, und du hast herausgefunden, was sie tut. Jetzt drehst du die Frage um: Du weißt, was eine Schaltung tun soll – wie muss sie aussehen?

## Das Entweder-oder-Gatter

Im Treppenhaus gibt es oben und unten einen Lichtschalter. Mit jedem kannst du das Licht umschalten. Das Licht ist an, wenn **genau einer** der beiden Schalter oben steht.

:::snippet{#merken}
Das **XOR-Gatter** (exklusives ODER, Zeichen **=1**) liefert 1, wenn **genau ein** Eingang 1 ist – also wenn die Eingänge verschieden sind.

| A | B | A XOR B |
| ---: | ---: | ---: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
:::

<logik-schaltung id="rechner-xor-zeigen" eingaenge="A, B" schaltung="Y = xor(A, B)" tabelle="zeigen"></logik-schaltung>

## XOR selbst bauen

Ein XOR-Gatter lässt sich aus den Gattern bauen, die du schon kennst. Dazu brauchst du noch das **NAND-Gatter** („NICHT UND“): ein UND-Gatter mit Kreis am Ausgang. Es liefert immer 1 – außer wenn alle Eingänge 1 sind.

:::snippet{#aufgabe}
Die Schaltung soll sich wie ein XOR-Gatter verhalten. Lege für jedes gestrichelte Gatter fest, welches es sein muss: Klicke so oft darauf, bis das richtige Zeichen erscheint. Prüfe dann.
:::

<logik-schaltung id="rechner-xor-bauen" eingaenge="A, B" schaltung="X1 = ?(A, B); X2 = ?(A, B); Y = ?(X1, X2)" arten="und, oder, nand" soll="Y: 0110" tabelle="zeigen"></logik-schaltung>

::::collapsible{title="Tipp 1: Wann soll Y 1 sein?"}

Y soll 1 sein, wenn **mindestens einer** der Eingänge 1 ist – **und** wenn **nicht beide** 1 sind.

::::

::::collapsible{title="Tipp 2: Welches Gatter prüft was?"}

„Mindestens einer“ prüft ein ODER-Gatter. „Nicht beide“ prüft ein NAND-Gatter. Beide Bedingungen müssen zugleich erfüllt sein.

::::

:::protect{password="rechner-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

X1 = ODER(A, B), X2 = NAND(A, B), Y = UND(X1, X2). (X1 und X2 dürfen auch vertauscht sein.)

Y ist nur 1, wenn mindestens ein Eingang 1 ist (ODER) und nicht beide 1 sind (NAND) – das ist genau „entweder A oder B“.

:::

## Eine Schaltung bewerten

:::snippet{#aufgabe}
Eine Klimaanlage soll **kühlen**, wenn es **warm** ist und **kein Fenster offen** ist. Lena hat dafür die folgende Schaltung entworfen.

1. Teste die Schaltung mit allen vier Kombinationen. Erfüllt sie ihre Aufgabe?
2. Beschreibe den Fehler und schlage eine Verbesserung vor.
:::

<logik-schaltung id="rechner-klima-bewerten" eingaenge="Warm, Fenster" schaltung="NichtWarm = nicht(Warm); Kuehlen = und(NichtWarm, Fenster)" tabelle="zeigen"></logik-schaltung>

::textinput{id="rechner-klima-bewertung" placeholder="1. Die Schaltung kühlt, wenn … 2. Der Fehler: … Besser: …" height="120px"}

::::collapsible{title="Tipp"}

Schau, an welchem Eingang das NICHT-Gatter sitzt. Welcher Eingang müsste umgekehrt werden?

::::

:::protect{password="rechner-3-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Nein. Die Schaltung kühlt nur, wenn es **nicht warm** ist **und** das Fenster **offen** ist – genau im falschen Fall.
2. Das NICHT-Gatter muss am Eingang **Fenster** sitzen, nicht an **Warm**: Kuehlen = UND(Warm, NICHT(Fenster)).

:::

:::snippet{#merken}
Um zu prüfen, ob eine Schaltung tut, was sie soll, gehst du so vor:

1. Stelle die **Soll-Tabelle** auf: Was soll bei jeder Kombination der Eingänge herauskommen?
2. Teste die Schaltung mit **allen** Kombinationen und notiere, was **wirklich** herauskommt.
3. Vergleiche beide Tabellen Zeile für Zeile.

Schon eine einzige abweichende Zeile bedeutet: Die Schaltung ist fehlerhaft.
:::

## Selbst bauen

:::snippet{#aufgabe}
Unten kannst du eigene Schaltungen beschreiben. Jede Zeile ist ein Gatter: erst der Name des Ausgangs, dann ein Gleichheitszeichen, dann das Gatter mit seinen Eingängen in Klammern. Erlaubt sind `und`, `oder`, `nicht`, `xor`, `nand` und `nor`.

1. Repariere Lenas Klimaanlage und teste sie.
2. Eine Mehrheitsschaltung für drei Personen A, B und C soll 1 liefern, wenn **mindestens zwei** zustimmen. Baue sie und prüfe sie mit der Wahrheitstabelle.
:::

<logik-schaltung id="rechner-schaltung-frei" eingaenge="A, B" schaltung="Y = und(A, B)" tabelle="zeigen" editierbar></logik-schaltung>

::::collapsible{title="Tipp zur Mehrheitsschaltung 1"}

Mindestens zwei stimmen zu, wenn A und B zustimmen – **oder** A und C – **oder** B und C.

::::

::::collapsible{title="Tipp zur Mehrheitsschaltung 2"}

```
AB = und(A, B)
AC = und(A, C)
BC = und(B, C)
Y = oder(AB, AC, BC)
```

Die Eingänge müssen dann `A, B, C` heißen.

::::

:::protect{password="rechner-3-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Eingänge `Warm, Fenster`, Schaltung:
   ```
   Zu = nicht(Fenster)
   Kuehlen = und(Warm, Zu)
   ```
2. Eingänge `A, B, C`, Schaltung wie in Tipp 2. Die Spalte Y lautet 0 0 0 1 0 1 1 1 – genau in den vier Zeilen mit mindestens zwei Einsen steht eine 1.

:::

:::alert{info}
Größere Schaltungen baust du bequemer in einem Simulator mit Maus: [CircuitVerse](https://circuitverse.org/simulator) läuft im Browser, [Logisim-evolution](https://github.com/logisim-evolution/logisim-evolution) ist ein kostenloses Programm zum Installieren. Frag deine Lehrkraft, welchen ihr verwendet.
:::

---

## Selbsttest

::::multievent

**1. Ein XOR-Gatter liefert 1, wenn …**
{r1{!genau ein Eingang 1 ist}}
{r1{mindestens ein Eingang 1 ist}}
{r1{beide Eingänge 1 sind}}
{H{Richtig.}}

**2. Welches Gatter passt zum Treppenhauslicht mit zwei Schaltern?**
{r2{!XOR}}
{r2{UND}}
{r2{ODER}}
{H{Richtig.}}

**3. Wann liefert ein NAND-Gatter 0?**
{r3{!wenn alle Eingänge 1 sind}}
{r3{wenn alle Eingänge 0 sind}}
{H{Richtig.}}

**4. Wie prüfst du, ob eine Schaltung mit 3 Eingängen korrekt ist?**
{r4{!Ich teste alle 8 Kombinationen und vergleiche mit der Soll-Tabelle.}}
{r4{Ich teste eine Kombination, bei der 1 herauskommen soll.}}
{H{Richtig.}}

**5. Welches Zeichen steht im XOR-Gatter?**
{r5{!=1}}
{r5{≥1}}
{r5{&}}
{H{Richtig.}}

::::
