---
title: Sortieren durch Auswählen
index: 3
---

# Sortieren durch Auswählen

Sortieren ist das zweite große Grundproblem der Informatik. Es gibt dafür Dutzende Verfahren – wir sehen uns drei an, die alle mit denselben Mitteln auskommen, die du längst kennst.

## Erst mit Karten, dann am Rechner

:::snippet{#aufgabe}
Legt euch fünf Spielkarten mit den Werten **5, 2, 4, 1, 8** in dieser Reihenfolge hin.

Sortiert sie aufsteigend – aber nur nach diesen Regeln:

- Ihr dürft immer nur **zwei** Karten gleichzeitig anschauen.
- Ihr dürft nur **zwei** Karten miteinander vertauschen.
- Ihr dürft die Karten nicht anderswo ablegen.

Notiert die Reihenfolge eurer Schritte. Vergleicht sie danach mit denen der anderen Gruppen.
:::

Wahrscheinlich habt ihr eines von zwei Verfahren erfunden. Beide schauen wir uns an – dieses hier zuerst.

## Die Idee

:::snippet{#definition}
**Sortieren durch Auswählen** (englisch *selection sort*, auch *Minsort*):

Suche im unsortierten Rest das **kleinste** Element und tausche es an die vorderste Stelle dieses Restes. Der sortierte Bereich vorne wächst dabei um eins. Wiederhole das, bis nur noch ein Element übrig ist.
:::

Der Ablauf mit den Karten `5 2 4 1 8`:

| Durchlauf | Feld vorher | kleinstes im Rest | Tausch | Feld nachher |
| --- | --- | --- | --- | --- |
| 1 | `5 2 4 1 8` | 1 (Index 3) | Index 0 ↔ 3 | `1 2 4 5 8` |
| 2 | `1 2 4 5 8` | 2 (Index 1) | Index 1 ↔ 1 | `1 2 4 5 8` |
| 3 | `1 2 4 5 8` | 4 (Index 2) | Index 2 ↔ 2 | `1 2 4 5 8` |
| 4 | `1 2 4 5 8` | 5 (Index 3) | Index 3 ↔ 3 | `1 2 4 5 8` |

Der senkrechte Strich, den man sich zwischen sortiertem und unsortiertem Teil denkt, wandert bei jedem Durchlauf um eine Stelle nach rechts.

:::snippet{#aufgabe}
Führe das Verfahren **auf Papier** an dem Feld `3 7 1 9 4` durch. Notiere nach jedem Durchlauf den Zustand.

Wie viele Durchläufe brauchst du? Wie viele Vertauschungen?
:::

::::collapsible{title="Auflösung"}

| Durchlauf | Feld | kleinstes im Rest | Tausch |
| --- | --- | --- | --- |
| Start | `3 7 1 9 4` | | |
| 1 | `1 7 3 9 4` | 1 (Index 2) | 0 ↔ 2 |
| 2 | `1 3 7 9 4` | 3 (Index 2) | 1 ↔ 2 |
| 3 | `1 3 4 9 7` | 4 (Index 4) | 2 ↔ 4 |
| 4 | `1 3 4 7 9` | 7 (Index 4) | 3 ↔ 4 |

Vier Durchläufe – bei fünf Elementen immer `n - 1`. Hier vier echte Vertauschungen.

::::

## Als Struktogramm

```
┌────────────────────────────────────────────────────────┐
│ für i von 0 bis n - 2                                  │
│ ┌──────────────────────────────────────────────────┐   │
│ │ kleinstesIndex ← i                               │   │
│ ├──────────────────────────────────────────────────┤   │
│ │ für j von i + 1 bis n - 1                        │   │
│ │ ┌────────────────────────────────────────────┐   │   │
│ │ │       werte[j] < werte[kleinstesIndex]     │   │   │
│ │ │      ja  ╱────────────────╲  nein          │   │   │
│ │ ├───────────────────────────┬────────────────┤   │   │
│ │ │ kleinstesIndex ← j        │       ∅        │   │   │
│ │ └───────────────────────────┴────────────────┘   │   │
│ ├──────────────────────────────────────────────────┤   │
│ │ tausche werte[i] und werte[kleinstesIndex]       │   │
│ └──────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

Die **innere** Schleife ist die Suche nach dem Minimum – das Muster aus Kapitel 5, nur auf einen Teilbereich angewendet. Die **äußere** Schleife schiebt den Trennstrich nach rechts.

## In Java

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 4, 1, 8};

    IO.println("vorher:  " + alsText(werte));
    sortiereDurchAuswaehlen(werte);
    IO.println("nachher: " + alsText(werte));
}

/**
 * Sortiert das Feld aufsteigend durch Auswählen des jeweils
 * kleinsten Elements im unsortierten Rest.
 * @param pWerte das zu sortierende Feld
 */
void sortiereDurchAuswaehlen(int[] pWerte) {
    for (int i = 0; i < pWerte.length - 1; i++) {
        int kleinstesIndex = i;

        for (int j = i + 1; j < pWerte.length; j++) {
            if (pWerte[j] < pWerte[kleinstesIndex]) {
                kleinstesIndex = j;
            }
        }

        int merker = pWerte[i];
        pWerte[i] = pWerte[kleinstesIndex];
        pWerte[kleinstesIndex] = merker;
    }
}

/** Setzt alle Werte eines Feldes zu einer Zeile zusammen. */
String alsText(int[] pWerte) {
    String s = "";
    for (int i = 0; i < pWerte.length; i++) {
        s = s + pWerte[i] + " ";
    }
    return s;
}
```

:::

:::snippet{#aufgabe}
Sieh dem Verfahren zu: Ergänze am Ende der äußeren Schleife die Zeile

```java
IO.println("nach Durchlauf " + i + ": " + alsText(pWerte));
```

Vergleiche die Ausgabe mit deiner Handrechnung von oben.
:::

## Wie viele Vergleiche?

:::snippet{#aufgabe}
Zähle **ohne Rechner**, wie viele Vergleiche das Verfahren bei einem Feld mit `n` Elementen macht.

a) Wie oft läuft die innere Schleife im ersten Durchlauf? Im zweiten? Im letzten?

b) Bilde die Summe für n = 5.

c) Finde eine Formel für beliebiges n.
:::

::::collapsible{title="Tipp"}

Im ersten Durchlauf vergleicht die innere Schleife `n - 1` mal, im zweiten `n - 2` mal, und so weiter bis 1.

Gesucht ist also die Summe 1 + 2 + … + (n − 1). Die Formel dafür kennst du aus dem Matheunterricht.

::::

::::collapsible{title="Auflösung"}

a) Im ersten Durchlauf `n - 1` Vergleiche, im zweiten `n - 2`, …, im letzten genau 1.

b) Bei n = 5: 4 + 3 + 2 + 1 = **10** Vergleiche.

c) Die Summe 1 + 2 + … + (n − 1) beträgt

$$\frac{n \cdot (n-1)}{2}$$

Für n = 5 ergibt das 5 · 4 / 2 = 10. ✓

**Der entscheidende Punkt:** Ausmultipliziert steht dort n²/2 − n/2. Für große n ist der n²-Anteil das, was zählt. Verdoppelt sich die Anzahl der Elemente, **vervierfacht** sich der Aufwand.

| n | Vergleiche |
| --- | --- |
| 10 | 45 |
| 100 | 4 950 |
| 1 000 | 499 500 |
| 10 000 | 49 995 000 |

Man sagt: Das Verfahren hat **quadratischen** Aufwand.

::::

:::snippet{#merken}
Ein Bild dafür: Zeichne ein Quadrat aus n mal n Feldern. Die Vergleiche des Verfahrens sind genau die Felder **unterhalb der Diagonalen** – etwas weniger als die Hälfte des Quadrats.

Deshalb quadratisch: Verdoppelt sich die Seitenlänge, vervierfacht sich die Fläche.
:::

## Aufgabe: Selbst implementieren

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden.
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Sortierer.java
public class Sortierer {

    /** Vertauscht die Werte an den Positionen pI und pJ. */
    public void tausche(int[] pWerte, int pI, int pJ) {
        // ergänze diese Methode
    }

    /**
     * Liefert den Index des kleinsten Wertes im Bereich
     * von pVon bis zum Ende des Feldes.
     */
    public int indexDesKleinsten(int[] pWerte, int pVon) {
        return 0; // ersetze diese Zeile
    }

    /** Sortiert das Feld aufsteigend durch Auswählen. */
    public void sortiere(int[] pWerte) {
        // ergänze diese Methode
    }
}
```

```java SortiererTest.java
@Test
class SortiererTest {

    @Test
    void testTausche() {
        Sortierer s = new Sortierer();
        int[] w = {5, 2, 4};
        s.tausche(w, 0, 2);
        assertEquals(4, w[0], "Vorne steht jetzt die 4.");
        assertEquals(5, w[2], "Hinten steht jetzt die 5.");
    }

    @Test
    void testIndexDesKleinsten() {
        Sortierer s = new Sortierer();
        int[] w = {5, 2, 4, 1, 8};
        assertEquals(3, s.indexDesKleinsten(w, 0), "Ab 0 ist die 1 an Index 3 am kleinsten.");
        assertEquals(3, s.indexDesKleinsten(w, 2), "Ab 2 ist die 1 an Index 3 am kleinsten.");
        assertEquals(4, s.indexDesKleinsten(w, 4), "Ab 4 bleibt nur die 8 übrig.");
    }

    @Test
    void testSortiere() {
        Sortierer s = new Sortierer();
        int[] w = {5, 2, 4, 1, 8};
        s.sortiere(w);
        assertEquals(1, w[0], "Vorne steht die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(4, w[2], "Dann die 4.");
        assertEquals(5, w[3], "Dann die 5.");
        assertEquals(8, w[4], "Hinten steht die 8.");
    }

    @Test
    void testSonderfaelle() {
        Sortierer s = new Sortierer();

        int[] leer = {};
        s.sortiere(leer);
        assertEquals(0, leer.length, "Das leere Feld bleibt leer.");

        int[] eins = {7};
        s.sortiere(eins);
        assertEquals(7, eins[0], "Ein einzelner Wert bleibt stehen.");

        int[] sortiert = {1, 2, 3};
        s.sortiere(sortiert);
        assertEquals(1, sortiert[0], "Ein sortiertes Feld bleibt sortiert.");
        assertEquals(3, sortiert[2], "Auch hinten.");

        int[] rueckwaerts = {3, 2, 1};
        s.sortiere(rueckwaerts);
        assertEquals(1, rueckwaerts[0], "Auch ein rückwärts sortiertes Feld wird richtig sortiert.");
        assertEquals(3, rueckwaerts[2], "Auch hinten.");

        int[] gleich = {4, 4, 4};
        s.sortiere(gleich);
        assertEquals(4, gleich[0], "Lauter gleiche Werte bleiben gleich.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Baue von unten nach oben"}

Fang mit `tausche` an – die kennst du aus Kapitel 5. Dann `indexDesKleinsten`. Erst wenn beide grün sind, schreibst du `sortiere` und benutzt darin die beiden fertigen Methoden.

So bleibt jede Methode kurz und du weißt bei einem Fehler sofort, wo er steckt.

::::

::::collapsible{title="Tipp 2: indexDesKleinsten"}

Die Extremwertsuche aus Kapitel 5, nur mit zwei Änderungen: Sie sucht das **kleinste** statt des größten Wertes, und sie beginnt bei `pVon` statt bei 0.

Und sie liefert den **Index**, nicht den Wert.

::::

::::collapsible{title="Tipp 3: Warum läuft die äußere Schleife nur bis length - 2?"}

Wenn nur noch **ein** Element unsortiert ist, ist es automatisch das größte – da gibt es nichts mehr zu tun. Der letzte Durchlauf wäre wirkungslos.

Mit `length - 1` als Grenze wäre das Ergebnis genauso richtig, nur ein Durchlauf länger.

::::

:::protect{password="java-ef-7-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Sortierer.java
public class Sortierer {

    public void tausche(int[] pWerte, int pI, int pJ) {
        int merker = pWerte[pI];
        pWerte[pI] = pWerte[pJ];
        pWerte[pJ] = merker;
    }

    public int indexDesKleinsten(int[] pWerte, int pVon) {
        int kleinstesIndex = pVon;
        for (int j = pVon + 1; j < pWerte.length; j++) {
            if (pWerte[j] < pWerte[kleinstesIndex]) {
                kleinstesIndex = j;
            }
        }
        return kleinstesIndex;
    }

    public void sortiere(int[] pWerte) {
        for (int i = 0; i < pWerte.length - 1; i++) {
            tausche(pWerte, i, indexDesKleinsten(pWerte, i));
        }
    }
}
```

Die Methode `sortiere` besteht aus **zwei Zeilen** – weil die Arbeit in den beiden anderen Methoden steckt. Das ist Modularisierung in Reinform.

Beim leeren Feld ist `pWerte.length - 1` gleich -1, die Schleife läuft null Mal. Genau richtig.

:::

## Zusatzaufgabe

:::snippet{#brain}
Baue eine **Visualisierung** des Verfahrens mit Scratch for Java:

- Stelle die Werte als Säulen dar.
- Färbe in jedem Durchlauf den bereits sortierten Bereich grün.
- Färbe die gerade betrachtete Säule gelb und die bisher kleinste rot.
- Nutze `SystemTools.pause(100)`, damit man dem Verfahren zusehen kann.

Setze `speed` hier **nicht** hoch – langsam ist der Sinn der Sache.
:::

---

## Selbsttest

::::multievent

**1. Was sucht das Verfahren in jedem Durchlauf?**

{r1{den größten Wert im ganzen Feld}}

{r1{!den kleinsten Wert im unsortierten Rest}}

{r1{zwei benachbarte Werte in falscher Reihenfolge}}

{h{Der sortierte Bereich wächst dabei von vorne.}}
{H{Richtig! Daher der Name Sortieren durch Auswählen.}}

**2. Wie viele Vergleiche braucht das Verfahren bei fünf Elementen?**

{z{10}}

{h{4 plus 3 plus 2 plus 1.}}
{H{Richtig!}}

**3. Was passiert mit dem Aufwand, wenn sich die Anzahl der Elemente verdoppelt?**

{r2{er verdoppelt sich}}

{r2{!er vervierfacht sich}}

{r2{er bleibt gleich}}

{h{Die Anzahl der Vergleiche wächst wie n zum Quadrat.}}
{H{Richtig! Man spricht von quadratischem Aufwand.}}

**4. Wie viele Vertauschungen macht das Verfahren bei n Elementen höchstens?**

{r3{n zum Quadrat}}

{r3{!n minus 1}}

{r3{genau n}}

{h{Pro Durchlauf der äußeren Schleife genau eine.}}
{H{Richtig! Das ist der große Vorteil dieses Verfahrens: wenige Vertauschungen.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Die innere Schleife sucht das Minimum eines Teilbereichs.}}

{c1{!Die äußere Schleife schiebt die Grenze zwischen sortiert und unsortiert weiter.}}

{c1{!Beim leeren Feld läuft die äußere Schleife null Mal.}}

{c1{Das Verfahren braucht ein zweites Feld.}}

{h{Getauscht wird innerhalb desselben Feldes.}}
{H{Richtig! Das Verfahren arbeitet an Ort und Stelle.}}

::::
