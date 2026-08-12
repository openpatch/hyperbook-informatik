---
title: Rückblick
index: 8
---

# Rückblick

Sieben Lektionen – und damit hast du alles beisammen, was zum Programmieren nötig ist. Jedes Programm der Welt besteht aus Sequenz, Verzweigung und Wiederholung. Alles Weitere im Lernpfad dient nur noch der **Ordnung**, nicht dem Können.

## Das kann ich jetzt

- [ ] Ich kann Verzweigungen mit `if`, `else if` und `else` schreiben. ([3.1](./01-verzweigungen))
- [ ] Ich kann logische Ausdrücke mit `&&`, `||` und `!` bilden und ihren Wahrheitswert bestimmen. ([3.2](./02-logische-ausdruecke))
- [ ] Ich kann eine kopfgesteuerte Schleife schreiben und erkenne eine drohende **Endlosschleife**. ([3.3](./03-kopfgesteuerte-schleifen))
- [ ] Ich kann eine Zählschleife schreiben und weiß, wann ich sie einer `while`-Schleife vorziehe. ([3.4](./04-zaehlschleifen))
- [ ] Ich kann begründen, wann eine **fußgesteuerte** Schleife die richtige Wahl ist. ([3.5](./05-fussgesteuerte-schleifen))
- [ ] Ich kann verschachtelte Schleifen lesen und schreiben. ([3.6](./06-verschachtelte-schleifen))
- [ ] Ich kann einen Algorithmus als **Struktogramm** darstellen. ([3.7](./07-struktogramme))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Ablauf verfolgen**

Führ auf Papier eine Tabelle mit den Spalten `i` und `summe`. Trag für jeden Durchlauf ein, was ausgegeben wird.

```java
void main() {
    int summe = 0;

    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            summe += i;
        } else {
            summe -= 1;
        }
        IO.println(i + ": " + summe);
    }
}
```

a) Welche fünf Zeilen erscheinen?

b) Wie oft wird der `else`-Zweig ausgeführt?

c) Ändere die Bedingung in `i % 2 == 1`. Was gibt das Programm dann aus? Sag es voraus, bevor du es ausprobierst.

d) Was ändert sich, wenn `i <= 5` durch `i < 5` ersetzt wird?
:::

:::onlineide{height="480px" speed="1000000"}

```java Main.java
void main() {
    int summe = 0;

    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            summe += i;
        } else {
            summe -= 1;
        }
        IO.println(i + ": " + summe);
    }
}
```

:::

:::protect{password="java-ef-3-8-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
1: -1
2: 1
3: 0
4: 4
5: 3
```

| i | Zweig | summe danach |
| --- | --- | --- |
| 1 | else | −1 |
| 2 | if | 1 |
| 3 | else | 0 |
| 4 | if | 4 |
| 5 | else | 3 |

b) Dreimal – bei 1, 3 und 5.

c) Dann sind die Zweige vertauscht: Bei ungeradem `i` wird addiert, bei geradem 1 abgezogen. Die Ausgabe lautet `1: 1`, `2: 0`, `3: 3`, `4: 2`, `5: 7`.

d) Der letzte Durchlauf mit `i = 5` fällt weg; die Ausgabe endet bei `4: 4`. Das ist der **Zaunpfahlfehler**: `<=` läuft bis einschließlich 5, `<` nur bis 4. Er ist der häufigste Fehler bei Schleifen überhaupt.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Schleifen mit Fehlern**

Alle vier Schleifen sollen die Zahlen 1 bis 5 ausgeben. Untersuche sie **auf Papier**: Was passiert tatsächlich? Beschreibe die Wirkung und berichtige.

```java
// a)
int i = 1;
while (i <= 5) {
    IO.println(i);
}

// b)
for (int i = 1; i <= 5; i++);
{
    IO.println(i);
}

// c)
int i = 1;
while (i < 5) {
    IO.println(i);
    i++;
}

// d)
int i = 5;
while (i > 0) {
    IO.println(i);
    i--;
}
```

Bei zwei der vier meldet die IDE gar nichts – sie laufen einfach falsch. Welche sind das?
:::

::::collapsible{title="Tipp zu b)"}

Sieh dir das Zeichen unmittelbar hinter der schließenden Klammer der `for`-Zeile an. Was ist der Rumpf der Schleife, wenn dort schon ein Semikolon steht?

::::

:::protect{password="java-ef-3-8-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Endlosschleife.** `i` wird nie erhöht, die Bedingung bleibt für immer wahr. Das Programm gibt unaufhörlich `1` aus. Berichtigung: `i++;` als letzte Zeile im Rumpf. Die IDE meldet nichts – ein laufendes Programm ist kein Fehler.

b) Das Semikolon hinter der `for`-Zeile ist bereits der **ganze Rumpf**: Die Schleife läuft fünfmal und tut fünfmal nichts. Der Block darunter wird danach **einmal** ausgeführt – und dort ist `i` gar nicht mehr bekannt, weil es zur Schleife gehörte. Hier meldet sich die IDE also doch, und zwar mit einer Meldung über das unbekannte `i`. Die Ursache steht dann eine Zeile weiter oben als die Meldung. Berichtigung: das Semikolon streichen.

c) Gibt nur 1 bis **4** aus – der Zaunpfahlfehler. Berichtigung: `i <= 5`. Auch hier keine Fehlermeldung.

d) Läuft fehlerfrei, gibt aber **5 4 3 2 1** aus – rückwärts. Ob das falsch ist, hängt von der Aufgabe ab; verlangt waren 1 bis 5. Berichtigung: von 1 hochzählen.

Ohne Meldung laufen also **a**, **c** und **d**. Nur b) fällt der IDE auf, und zwar aus einem Grund, der mit dem eigentlichen Fehler nur mittelbar zu tun hat. Merke: Ein Programm, das startet, ist noch lange nicht richtig.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Muster und Tabellen**

a) Zeichne zuerst das **Struktogramm** für ein Programm, das eine Treppe aus Sternen ausgibt:

```
*
**
***
****
```

b) Schreib das Programm dazu.

c) Erweitere es zu einer kleinen Einmaleinstabelle: drei Zeilen, vier Spalten, in jedem Feld das Produkt aus Zeilen- und Spaltennummer.

d) Erkläre in einem Satz, wozu die **äußere** und wozu die **innere** Schleife da ist.
:::

::::collapsible{title="Tipp 1: Zwei Schleifen"}

Die äußere Schleife zählt die **Zeilen**, die innere die **Zeichen innerhalb einer Zeile**. Die Zahl der Durchläufe der inneren Schleife hängt bei a) vom Zähler der äußeren ab.

::::

::::collapsible{title="Tipp 2: Ausgabe ohne Zeilenumbruch"}

`IO.println` macht immer einen Umbruch. Bau die Zeile deshalb zuerst in einer Zeichenkette zusammen und gib sie erst danach aus:

```java
String zeile = "";
zeile = zeile + "*";
IO.println(zeile);
```

::::

:::onlineide{height="480px" speed="1000000"}

```java Main.java
void main() {
    // a) und b): die Treppe

    // c): die Einmaleinstabelle

}
```

:::

:::protect{password="java-ef-3-8-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
┌────────────────────────────────────────┐
│ für i von 1 bis 4                      │
│ ┌────────────────────────────────────┐ │
│ │ zeile ← ""                         │ │
│ ├────────────────────────────────────┤ │
│ │ für j von 1 bis i                  │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │ zeile ← zeile + "*"            │ │ │
│ │ └────────────────────────────────┘ │ │
│ ├────────────────────────────────────┤ │
│ │ zeile ausgeben                     │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

b) und c)

```java
void main() {
    for (int i = 1; i <= 4; i++) {
        String zeile = "";
        for (int j = 1; j <= i; j++) {
            zeile = zeile + "*";
        }
        IO.println(zeile);
    }

    IO.println("");

    for (int zeile = 1; zeile <= 3; zeile++) {
        String ausgabe = "";
        for (int spalte = 1; spalte <= 4; spalte++) {
            ausgabe = ausgabe + (zeile * spalte) + "\t";
        }
        IO.println(ausgabe);
    }
}
```

Ausgabe der Tabelle:

```
1	2	3	4
2	4	6	8
3	6	9	12
```

d) Die **äußere** Schleife erzeugt die Zeilen; sie läuft einmal je Zeile. Die **innere** erzeugt den Inhalt einer einzelnen Zeile; sie läuft für jede Zeile vollständig durch. Insgesamt wird der innere Rumpf 1 + 2 + 3 + 4 = 10-mal ausgeführt – bei der Tabelle 3 · 4 = 12-mal.

Achte auf die Klammern in `(zeile * spalte)`. Ohne sie würde erst angehängt und dann weiter angehängt: `"1" + 1 + 2` ergäbe `112`. Genau der Fall aus [Kapitel 1](../01-erste-schritte/04-rueckblick).

:::

<!--
Rückblick zu KLP EF, Algorithmen: iterative Algorithmen mit Kontrollstrukturen
(I), Darstellung als Struktogramm (DI). Aufgabe 2 bündelt die typischen
Schleifenfehler; sie ist bewusst als Papieraufgabe angelegt, weil die IDE
Syntaxfehler sofort anzeigt.
-->

---

## Selbsttest

::::multievent

**1. Wie oft wird der Rumpf einer Schleife mit i von 1 bis einschließlich 5 durchlaufen?**

{z{5}}

{h{Zähle die Werte auf, die i annimmt.}}
{H{Richtig.}}

**2. Was passiert, wenn der Zähler im Rumpf einer while-Schleife nie verändert wird?**

{r1{Die Schleife läuft genau einmal.}}

{r1{!Die Schleife läuft endlos.}}

{r1{Die IDE meldet einen Fehler.}}

{r1{Die Schleife wird übersprungen.}}

{h{Was passiert mit der Bedingung, wenn sich nichts ändert?}}
{H{Richtig – und die IDE meldet dabei nichts, denn ein laufendes Programm ist kein Fehler.}}

**3. Wann nimmt man eine fußgesteuerte Schleife?**

{r2{wenn die Anzahl der Durchläufe vorher feststeht}}

{r2{!wenn der Rumpf mindestens einmal ausgeführt werden soll, bevor geprüft wird}}

{r2{wenn zwei Schleifen ineinander liegen}}

{r2{wenn die Bedingung immer wahr ist}}

{h{Der Unterschied liegt darin, wann die Bedingung geprüft wird.}}
{H{Richtig – der typische Fall ist eine Eingabe, die wiederholt wird, bis sie gültig ist.}}

**4. Welcher Ausdruck ist wahr, wenn x den Wert 7 hat?**

{r3{x kleiner 5 und x kleiner 10}}

{r3{!x größer 5 und x kleiner 10}}

{r3{x kleiner 5 oder x größer 10}}

{r3{nicht x größer 5}}

{h{Bei und müssen beide Teile stimmen.}}
{H{Richtig.}}

**5. Ein Semikolon steht direkt hinter der schließenden Klammer einer for-Zeile. Was ist der Rumpf?**

{r4{der Block darunter}}

{r4{!das Semikolon selbst, also eine leere Anweisung}}

{r4{die gesamte Datei}}

{r4{nichts, das ist ein Syntaxfehler}}

{h{Ein einzelnes Semikolon ist eine gültige, leere Anweisung.}}
{H{Richtig – die Schleife läuft und tut nichts.}}

**6. In welcher Reihenfolge laufen zwei verschachtelte Schleifen mit je 3 Durchläufen?**

{r5{erst dreimal die äußere, dann dreimal die innere}}

{r5{!für jeden Durchlauf der äußeren läuft die innere vollständig durch, insgesamt neunmal}}

{r5{beide gleichzeitig, dreimal insgesamt}}

{r5{die innere einmal, die äußere neunmal}}

{h{Rechne nach, wie oft der innerste Rumpf ausgeführt wird.}}
{H{Richtig – dreimal drei.}}

**7. Wofür steht der Pfeil in einem Struktogramm?**

{r6{für einen Sprung}}

{r6{!für eine Wertzuweisung}}

{r6{für einen Vergleich}}

{r6{für das Ende der Schleife}}

{h{Struktogramme kennen überhaupt keine Sprünge – das ist ihr Sinn.}}
{H{Richtig. Der Pfeil macht deutlich, dass eine Zuweisung keine Gleichung ist.}}

::::
