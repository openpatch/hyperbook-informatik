---
title: Rückblick
index: 4
---

# Rückblick

Mit Feldern kannst du zum ersten Mal **viele** Werte auf einmal verwalten. Der Preis dafür ist eine neue Fehlerquelle: Indizes. Fast alles, was hier schiefgeht, geht an den **Rändern** schief – beim ersten oder beim letzten Element.

## Das kann ich jetzt

- [ ] Ich kann ein Feld anlegen, füllen und einzelne Plätze ansprechen. ([5.1](./01-eindimensionale-felder))
- [ ] Ich weiß, dass der Index bei **0** beginnt, und kann `length` richtig benutzen. ([5.1](./01-eindimensionale-felder))
- [ ] Ich kann den Standardkopf `for (int i = 0; i < feld.length; i++)` aus dem Kopf schreiben. ([5.2](./02-felder-durchlaufen))
- [ ] Ich kann die **erweiterte for-Schleife** einsetzen und sagen, wann sie nicht taugt. ([5.2](./02-felder-durchlaufen))
- [ ] Ich kann ein Feld verändern und zwei Werte darin **tauschen**. ([5.3](./03-felder-veraendern))
- [ ] Ich kann Summe, Maximum und Anzahl in einem Durchlauf bestimmen. ([5.3](./03-felder-veraendern))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Ränder abzählen**

```java
void main() {
    int[] werte = {4, 8, 15, 16, 23, 42};

    IO.println(werte.length);
    IO.println(werte[0]);
    IO.println(werte[werte.length - 1]);
    IO.println(werte[2] + werte[3]);

    int summe = 0;
    for (int i = 0; i < werte.length; i++) {
        summe = summe + werte[i];
    }
    IO.println("Summe: " + summe);

    int anzahl = 0;
    for (int wert : werte) {
        if (wert > 15) {
            anzahl++;
        }
    }
    IO.println("Anzahl: " + anzahl);
}
```

a) Sag alle sechs Ausgabezeilen voraus.

b) Was passiert bei `werte[6]`? Warum ist das kein Tippfehler, sondern ein Denkfehler?

c) Ersetze in der ersten Schleife `<` durch `<=`. Was passiert dann, und in welchem Durchlauf?

d) Warum steht in der zweiten Schleife `for (int wert : werte)` und nicht `for (int wert : werte.length)`?
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {4, 8, 15, 16, 23, 42};

    IO.println(werte.length);
    IO.println(werte[0]);
    IO.println(werte[werte.length - 1]);
    IO.println(werte[2] + werte[3]);

    int summe = 0;
    for (int i = 0; i < werte.length; i++) {
        summe = summe + werte[i];
    }
    IO.println("Summe: " + summe);

    int anzahl = 0;
    for (int wert : werte) {
        if (wert > 15) {
            anzahl++;
        }
    }
    IO.println("Anzahl: " + anzahl);
}
```

:::

:::protect{password="java-ef-5-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
6
4
42
31
Summe: 108
Anzahl: 3
```

Zu `werte[werte.length - 1]`: Das ist die Standardschreibweise für „das letzte Element". Sechs Plätze bedeuten die Indizes 0 bis 5, also ist 5 der letzte – und 5 ist `length - 1`.

Zu `Anzahl: 3`: Größer als 15 sind 16, 23 und 42. Die 15 selbst zählt nicht mit, weil `>` und nicht `>=` dasteht.

b) `werte[6]` bricht das Programm mit einer Meldung über einen unzulässigen Index ab. Es ist ein Denkfehler, weil sechs Elemente eben **nicht** die Indizes 1 bis 6 haben, sondern 0 bis 5. Wer bei 1 zu zählen beginnt, greift am Ende immer einen Platz zu weit.

c) Im **letzten** Durchlauf, wenn `i` den Wert 6 hat, greift `werte[6]` daneben – das Programm bricht ab, nachdem es schon fünfmal korrekt gerechnet hat. Genau das macht diesen Fehler so tückisch: Er zeigt sich erst am Ende.

d) Weil die erweiterte Schleife über die **Elemente** läuft, nicht über Zahlen. Sie liest sich als „für jeden Wert aus werte". Einen Index gibt es dabei gar nicht – deshalb kann man mit ihr auch nicht rückwärts laufen und die Werte im Feld nicht verändern.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Feldfehler**

Untersuche jeden Ausschnitt **auf Papier**. Was ist falsch, und was passiert beim Ausführen?

```java
int[] zahlen = {3, 1, 4, 1, 5};

// a)
for (int i = 1; i <= zahlen.length; i++) {
    IO.println(zahlen[i]);
}

// b)
IO.println(zahlen.length());

// c)
for (int wert : zahlen) {
    wert = wert * 2;
}
IO.println(zahlen[0]);

// d)
int merker = zahlen[0];
zahlen[0] = zahlen[4];
zahlen[4] = zahlen[0];
```

Bei welchem der vier meldet die IDE etwas, bei welchen nicht?
:::

::::collapsible{title="Tipp zu d)"}

Spiel den Tausch mit zwei Zetteln durch. Nach welcher Zeile ist der ursprüngliche Wert von `zahlen[0]` nur noch im Merker vorhanden – und wo wird er gebraucht?

::::

:::protect{password="java-ef-5-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Doppelt falsch.** Der Zähler beginnt bei 1 statt bei 0, also fehlt das erste Element; und er läuft bis einschließlich `length`, also greift der letzte Durchlauf daneben. Das Programm gibt vier Werte aus und bricht dann ab. Richtig ist der Standardkopf: `for (int i = 0; i < zahlen.length; i++)`.

b) **Übersetzungsfehler.** Bei Feldern heißt es `length` **ohne** Klammern – das ist keine Methode, sondern eine Eigenschaft. Bei Zeichenketten ist es umgekehrt: dort `length()` mit Klammern. Diese Unschönheit muss man sich einfach merken.

c) **Läuft und tut nichts.** Die erweiterte Schleife liefert eine **Kopie** des Wertes; sie zu verändern lässt das Feld unberührt. Die Ausgabe bleibt 3. Wer verändern will, braucht den Index: `zahlen[i] = zahlen[i] * 2;`

d) **Läuft und ist falsch.** Nach der zweiten Zeile steht in `zahlen[0]` bereits der Wert von `zahlen[4]`; die dritte Zeile schreibt ihn deshalb wieder zurück. Beide Plätze enthalten am Ende dieselbe 5, die 3 ist verloren. Richtig ist die dritte Zeile als `zahlen[4] = merker;` – dafür ist der Merker ja da.

Gemeldet wird nur **b**. a) bricht erst beim Ausführen ab, c) und d) laufen fehlerfrei und liefern falsche Ergebnisse.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Auswertung einer Klassenarbeit**

Gegeben ist ein Feld mit Punktzahlen. Schreib die Auswertung – jede Teilaufgabe als **eigene Methode**, so wie in [Kapitel 4](../04-methoden-und-modularisierung/03-modularisierung) gelernt.

```java
int[] punkte = {88, 64, 41, 95, 72, 58, 100, 33};
```

a) `int summe(int[] pWerte)` – die Summe aller Werte.

b) `double mittelwert(int[] pWerte)` – der Durchschnitt.

c) `int maximum(int[] pWerte)` – der größte Wert.

d) `int anzahlAb(int[] pWerte, int pGrenze)` – wie viele Werte mindestens so groß sind wie die Grenze.

e) Gib alle vier Ergebnisse aus, für d) die Anzahl der Arbeiten ab 60 Punkten.
:::

::::collapsible{title="Tipp 1: Das Muster ist immer dasselbe"}

Alle vier Methoden folgen demselben Aufbau:

```java
int ergebnis = ...;              // sinnvoller Startwert
for (int i = 0; i < pWerte.length; i++) {
    // ergebnis abhängig von pWerte[i] anpassen
}
return ergebnis;
```

Nur der Startwert und die Anpassung unterscheiden sich.

::::

::::collapsible{title="Tipp 2: Der Startwert beim Maximum"}

Mit `int groesster = 0;` anzufangen ist verführerisch – und falsch, sobald alle Werte negativ sind. Nimm stattdessen das **erste Element** als Startwert und vergleiche ab Index 1.

::::

::::collapsible{title="Tipp 3: zum Mittelwert"}

`summe(pWerte) / pWerte.length` sind zwei ganze Zahlen und damit eine Ganzzahldivision. Multipliziere mit `1.0` oder teile durch `pWerte.length * 1.0`.

::::

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {88, 64, 41, 95, 72, 58, 100, 33};

    // Deine Ausgaben:

}

// Deine Methoden:
```

:::

:::protect{password="java-ef-5-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
void main() {
    int[] punkte = {88, 64, 41, 95, 72, 58, 100, 33};

    IO.println("Summe: " + summe(punkte));
    IO.println("Mittelwert: " + mittelwert(punkte));
    IO.println("Maximum: " + maximum(punkte));
    IO.println("Ab 60 Punkten: " + anzahlAb(punkte, 60));
}

int summe(int[] pWerte) {
    int ergebnis = 0;
    for (int i = 0; i < pWerte.length; i++) {
        ergebnis = ergebnis + pWerte[i];
    }
    return ergebnis;
}

double mittelwert(int[] pWerte) {
    return summe(pWerte) * 1.0 / pWerte.length;
}

int maximum(int[] pWerte) {
    int groesster = pWerte[0];
    for (int i = 1; i < pWerte.length; i++) {
        if (pWerte[i] > groesster) {
            groesster = pWerte[i];
        }
    }
    return groesster;
}

int anzahlAb(int[] pWerte, int pGrenze) {
    int anzahl = 0;
    for (int i = 0; i < pWerte.length; i++) {
        if (pWerte[i] >= pGrenze) {
            anzahl++;
        }
    }
    return anzahl;
}
```

Ausgabe:

```
Summe: 551
Mittelwert: 68.875
Maximum: 100
Ab 60 Punkten: 5
```

Drei Dinge lohnen den zweiten Blick:

- `mittelwert` ruft `summe` auf, statt noch einmal zu addieren. So steht die Schleife nur einmal da.
- Bei `maximum` beginnt die Schleife bei **1**, weil Index 0 schon der Startwert ist. Ein Durchlauf ab 0 wäre nicht falsch, nur überflüssig.
- `anzahlAb` hat einen zweiten Parameter. Dadurch taugt sie für jede Grenze – eine Methode `anzahlAb60` wäre eine Methode für genau einen Zweck.

:::

<!--
Rückblick zu KLP EF, Daten und ihre Strukturierung: eindimensionale Felder;
Algorithmen: iterative Algorithmen über Datenstrukturen (I), Modularisierung.
Aufgabe 2 sammelt die typischen Indexfehler.
-->

---

## Selbsttest

::::multievent

**1. Welchen Index hat das letzte Element eines Feldes mit 6 Plätzen?**

{z{5}}

{h{Gezählt wird ab null.}}
{H{Richtig – deshalb schreibt man length minus 1.}}

**2. Wie fragt man die Länge eines Feldes ab?**

{r1{mit length und Klammern}}

{r1{!mit length ohne Klammern}}

{r1{mit size}}

{r1{mit count}}

{h{Bei Zeichenketten ist es genau andersherum.}}
{H{Richtig – beim Feld ohne Klammern, beim String mit.}}

**3. Was passiert beim Zugriff auf einen Index, den es nicht gibt?**

{r2{Es wird der Wert null geliefert.}}

{r2{Die IDE meldet es schon beim Tippen.}}

{r2{!Das Programm bricht beim Ausführen mit einer Meldung ab.}}

{r2{Das Feld wird automatisch vergrößert.}}

{h{Ob der Index gültig ist, steht erst zur Laufzeit fest.}}
{H{Richtig.}}

**4. Was leistet die erweiterte for-Schleife NICHT? Wähle alle zutreffenden aus.**

{c1{!die Werte im Feld verändern}}

{c1{!rückwärts laufen}}

{c1{!den Index verwenden}}

{c1{jedes Element lesen}}

{h{Sie ist kürzer – und dafür in drei Punkten eingeschränkt.}}
{H{Richtig. Lesen kann sie alles, mehr aber nicht.}}

**5. Wie viele Zeilen braucht der Tausch zweier Werte in einem Feld?**

{z{3}}

{h{Ohne Hilfsvariable überschreibst du einen der beiden Werte.}}
{H{Richtig – merken, umschreiben, zurückschreiben.}}

**6. Womit sollte der Startwert beim Suchen des Maximums belegt werden?**

{r3{mit 0}}

{r3{!mit dem ersten Element des Feldes}}

{r3{mit der Länge des Feldes}}

{r3{mit einer beliebigen Zahl}}

{h{Was passiert bei einem Feld, in dem alle Werte negativ sind?}}
{H{Richtig – nur das erste Element ist immer ein zulässiger Startwert.}}

**7. Warum wird bei der Division für einen Mittelwert mit 1.0 multipliziert?**

{r4{Damit das Ergebnis größer wird.}}

{r4{!Damit nicht ganzzahlig gerechnet wird und die Nachkommastellen erhalten bleiben.}}

{r4{Weil Java sonst einen Fehler meldet.}}

{r4{Damit die Schleife schneller läuft.}}

{h{Zwei ganze Zahlen geteilt ergeben wieder eine ganze Zahl.}}
{H{Richtig.}}

::::
