---
title: Rechnen
index: 2
---

# Rechnen

Ein Rechner heißt Rechner, weil er rechnet. Java kennt die vier Grundrechenarten – mit einer Besonderheit, die dich am Anfang garantiert einmal stolpern lässt.

## Ganze Zahlen

:::onlineide{height="360px"}

```java Main.java
void main() {
    IO.println(7 + 3);
    IO.println(7 - 3);
    IO.println(7 * 3);
    IO.println(7 / 3);
    IO.println(7 % 3);
}
```

:::

:::snippet{#aufgabe}
Sage **zuerst ohne Rechner** voraus, was die fünf Zeilen ausgeben. Notiere deine Vorhersage. Führe das Programm erst danach aus.

Bei welcher Zeile lagst du daneben? Erkläre, was dort passiert.
:::

::::collapsible{title="Auflösung"}

```
10
4
21
2
1
```

Die vierte Zeile ist die interessante: `7 / 3` ergibt **2**, nicht 2,333…

Wenn Java zwei **ganze Zahlen** dividiert, rechnet es eine **Ganzzahldivision**: Das Ergebnis ist wieder eine ganze Zahl, der Rest fällt einfach weg.

Der weggefallene Rest ist nicht verloren – den liefert `%`, die **Modulo-Operation**. `7 % 3` ist 1, denn 7 = 2 · 3 + 1.

::::

:::snippet{#merken}
| Operator | Bedeutung | Beispiel |
| --- | --- | --- |
| `+` `-` `*` | Addition, Subtraktion, Multiplikation | `7 * 3` ergibt 21 |
| `/` | Division. Bei zwei ganzen Zahlen: **Ganzzahldivision** | `7 / 3` ergibt 2 |
| `%` | Rest der Ganzzahldivision (**Modulo**) | `7 % 3` ergibt 1 |

Es gilt Punkt vor Strich. Mit runden Klammern erzwingst du eine andere Reihenfolge.
:::

## Kommazahlen

Sobald **eine** der beiden Zahlen eine Kommazahl ist, rechnet Java normal weiter.

:::onlineide{height="360px"}

```java Main.java
void main() {
    IO.println(7.0 / 3);
    IO.println(7 / 3.0);
    IO.println(7.0 / 3.0);
    IO.println(7 / 3);
}
```

:::

:::snippet{#merken}
In Java wird das Dezimaltrennzeichen als **Punkt** geschrieben: `3.5`, nicht `3,5`.
:::

## Modulo ist nützlicher, als es aussieht

:::snippet{#aufgabe}
Der Modulo-Operator beantwortet überraschend viele Fragen. Überlege jeweils, welches Ergebnis herauskommt und was die Rechnung *bedeutet*:

a) `zahl % 2` – was verrät das Ergebnis über `zahl`?

b) `sekunden % 60` – wofür könnte das gut sein?

c) `zahl % 10` – welche Ziffer bekommst du damit?
:::

::::collapsible{title="Auflösung"}

a) Das Ergebnis ist 0 oder 1. Bei 0 ist die Zahl **gerade**, bei 1 **ungerade**. Das ist der Standardtest auf gerade Zahlen.

b) Die **restlichen Sekunden** nach Abzug aller vollen Minuten. Zusammen mit `sekunden / 60` (Ganzzahldivision, ergibt die vollen Minuten) kannst du eine Sekundenzahl in Minuten und Sekunden umrechnen.

c) Die **letzte Ziffer** der Zahl. `1234 % 10` ergibt 4.

::::

## Aufgabe 1: Rechnungen nachbauen

:::snippet{#aufgabe}
Ergänze das Programm so, dass es die Ergebnisse der folgenden Rechnungen ausgibt. Sage bei jeder Zeile **zuerst** voraus, was herauskommt.
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    IO.println(1 + 7 - 9 + 43);
    // Ergänze hier die weiteren Rechnungen.
}
```

:::

Diese Rechnungen sollen vorkommen:

| Rechnung | Ergebnis |
| --- | --- |
| `1 + 7 - 9 + 43` | 42 |
| `4 * 3 + 1` | 13 |
| `9 * (2 + 1)` | 27 |
| `12345 / 10` | 1234 |
| `3 / 4` | 0 |
| `3.0 / 4.0` | 0.75 |
| `4 / 3 + 1 * 7` | 8 |
| `1234 % 10` | 4 |
| `42 / 7 / 3` | 2 |
| `(3 - 7) * (7 + 4)` | -44 |

::::collapsible{title="Tipp: Warum ist 4 / 3 + 1 * 7 gleich 8?"}

Punkt vor Strich gilt auch hier. Also wird zuerst `4 / 3` gerechnet – als Ganzzahldivision ergibt das **1**, nicht 1,333. Dann `1 * 7` ergibt 7. Zusammen 1 + 7 = 8.

::::

:::protect{password="java-ef-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    IO.println(1 + 7 - 9 + 43);
    IO.println(4 * 3 + 1);
    IO.println(9 * (2 + 1));
    IO.println(12345 / 10);
    IO.println(3 / 4);
    IO.println(3.0 / 4.0);
    IO.println(4 / 3 + 1 * 7);
    IO.println(1234 % 10);
    IO.println(42 / 7 / 3);
    IO.println((3 - 7) * (7 + 4));
}
```

:::

## Aufgabe 2: Sekunden umrechnen

:::snippet{#aufgabe}
Schreibe ein Programm, das eine Anzahl von Sekunden in Stunden, Minuten und Sekunden umrechnet und so ausgibt:

```
7385 Sekunden sind 2 h 3 min 5 s
```

Verwende dafür nur Ganzzahldivision und Modulo.
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    int gesamt = 7385;

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Womit fange ich an?"}

Die **Stunden** bekommst du zuerst: Wie viele volle Stunden stecken in 7385 Sekunden? Eine Stunde hat 3600 Sekunden.

::::

::::collapsible{title="Tipp 2: Und der Rest?"}

Nachdem du die Stunden abgezogen hast, bleibt ein Rest in Sekunden: `gesamt % 3600`. Mit diesem Rest machst du dasselbe noch einmal für Minuten – diesmal mit 60.

::::

:::protect{password="java-ef-1-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int gesamt = 7385;

    int stunden = gesamt / 3600;
    int restNachStunden = gesamt % 3600;
    int minuten = restNachStunden / 60;
    int sekunden = restNachStunden % 60;

    IO.println(gesamt + " Sekunden sind " + stunden + " h " + minuten + " min " + sekunden + " s");
}
```

:::

## Zusatzaufgabe

:::snippet{#brain}
Schreibe ein Programm, das die **Quersumme** einer dreistelligen Zahl berechnet – also die Summe ihrer Ziffern. Aus 472 wird 4 + 7 + 2 = 13.

Du brauchst dafür nur `/` und `%`.
:::

::::collapsible{title="Tipp"}

Die letzte Ziffer bekommst du mit `% 10`. Und wie wirst du diese letzte Ziffer wieder los, damit du an die vorletzte kommst? Mit `/ 10`.

::::

---

## Selbsttest

::::multievent

**1. Was gibt die Anweisung mit 17 geteilt durch 5 aus, wenn beide Zahlen ganze Zahlen sind?**

{z{3}}

{h{Ganzzahldivision: Der Rest fällt weg.}}
{H{Richtig! 17 geteilt durch 5 ergibt 3, Rest 2.}}

**2. Was ergibt 17 modulo 5?**

{z{2}}

{h{Modulo liefert den Rest der Ganzzahldivision.}}
{H{Richtig!}}

**3. Welche Ausdrücke ergeben eine Kommazahl?** (Mehrfachauswahl)

{c1{!7.0 geteilt durch 2}}

{c1{!7 geteilt durch 2.0}}

{c1{7 geteilt durch 2}}

{c1{!7.0 geteilt durch 2.0}}

{h{Es genügt, wenn eine der beiden Zahlen eine Kommazahl ist.}}
{H{Richtig! Sobald eine Kommazahl beteiligt ist, wird normal dividiert.}}

**4. Womit prüfst du, ob eine Zahl gerade ist?**

{r1{mit zahl geteilt durch 2}}

{r1{!mit zahl modulo 2}}

{r1{mit zahl mal 2}}

{h{Gesucht ist der Rest beim Teilen durch 2.}}
{H{Genau. Ist der Rest 0, ist die Zahl gerade.}}

**5. Wie schreibt man in Java die Zahl dreieinhalb?**

{r2{3,5}}

{r2{!3.5}}

{r2{3;5}}

{h{Java verwendet die englische Schreibweise.}}
{H{Richtig! In Java trennt ein Punkt die Nachkommastellen ab.}}

::::
