---
title: Mergesort
index: 2
---

# Mergesort

Quicksort hat eine unangenehme Eigenschaft: Bei ungünstigen Daten fällt es auf quadratischen Aufwand zurück. **Mergesort** kennt diesen Fall nicht – es braucht **immer** n · log n Vergleiche.

Der Preis dafür ist zusätzlicher Speicher.

<!-- KLP QPh, Algorithmen: erläutern bzw. vergleichen iterative und rekursive Such- und Sortierverfahren (A) -->

## Die Idee

:::snippet{#definition}
**Mergesort** teilt das Feld genau in der Mitte, sortiert beide Hälften **rekursiv** und **verschmilzt** die beiden sortierten Hälften anschließend zu einem sortierten Ganzen.
:::

Der Unterschied zu Quicksort liegt in der Verteilung der Arbeit:

| | Quicksort | Mergesort |
| --- | --- | --- |
| Aufwand beim **Teilen** | hoch (partitionieren) | trivial (Mitte ausrechnen) |
| Aufwand beim **Zusammenfügen** | keiner | hoch (verschmelzen) |
| Teilung immer gleichmäßig? | nein | **ja** |

Weil Mergesort immer exakt in der Mitte teilt, gibt es garantiert log n Ebenen – unabhängig von den Daten.

## Das Verschmelzen

Der eigentliche Kern des Verfahrens. Zwei sortierte Folgen werden zu einer sortierten zusammengeführt.

:::snippet{#aufgabe}
Vor dir liegen zwei sortierte Kartenstapel:

```
links:  1  4  7
rechts: 2  3  9
```

Führe sie **auf Papier** zusammen: Vergleiche immer nur die beiden **obersten** Karten und nimm die kleinere.

Notiere jeden Schritt. Wie viele Vergleiche brauchst du?
:::

::::collapsible{title="Auflösung"}

| Schritt | links | rechts | Vergleich | genommen | Ergebnis |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 4 7 | 2 3 9 | 1 < 2 | 1 | 1 |
| 2 | 4 7 | 2 3 9 | 4 > 2 | 2 | 1 2 |
| 3 | 4 7 | 3 9 | 4 > 3 | 3 | 1 2 3 |
| 4 | 4 7 | 9 | 4 < 9 | 4 | 1 2 3 4 |
| 5 | 7 | 9 | 7 < 9 | 7 | 1 2 3 4 7 |
| 6 | – | 9 | links leer | 9 | 1 2 3 4 7 9 |

**Fünf** Vergleiche für sechs Elemente. Allgemein braucht das Verschmelzen zweier Folgen mit zusammen n Elementen höchstens n − 1 Vergleiche – jeder Vergleich legt genau ein Element endgültig ab.

::::

## Das Verfahren

:::onlineide{height="760px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 8, 1, 9, 3, 7};

    IO.println("vorher:  " + alsText(werte));
    mergesort(werte, 0, werte.length - 1);
    IO.println("nachher: " + alsText(werte));
}

/**
 * Sortiert den Bereich von pLinks bis pRechts aufsteigend.
 */
void mergesort(int[] pWerte, int pLinks, int pRechts) {
    if (pLinks >= pRechts) {
        return;
    }

    int mitte = (pLinks + pRechts) / 2;

    mergesort(pWerte, pLinks, mitte);
    mergesort(pWerte, mitte + 1, pRechts);
    verschmelze(pWerte, pLinks, mitte, pRechts);

    IO.println("  verschmolzen " + pLinks + " bis " + pRechts + ": " + alsText(pWerte));
}

/**
 * Führt die beiden sortierten Bereiche pLinks bis pMitte und
 * pMitte plus 1 bis pRechts zu einem sortierten Bereich zusammen.
 */
void verschmelze(int[] pWerte, int pLinks, int pMitte, int pRechts) {
    int[] hilfe = new int[pRechts - pLinks + 1];

    int i = pLinks;
    int j = pMitte + 1;
    int k = 0;

    while (i <= pMitte && j <= pRechts) {
        if (pWerte[i] <= pWerte[j]) {
            hilfe[k] = pWerte[i];
            i++;
        } else {
            hilfe[k] = pWerte[j];
            j++;
        }
        k++;
    }

    while (i <= pMitte) {
        hilfe[k] = pWerte[i];
        i++;
        k++;
    }

    while (j <= pRechts) {
        hilfe[k] = pWerte[j];
        j++;
        k++;
    }

    for (int m = 0; m < hilfe.length; m++) {
        pWerte[pLinks + m] = hilfe[m];
    }
}

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
a) Warum steht das Verschmelzen **nach** den beiden rekursiven Aufrufen, während bei Quicksort das Partitionieren **davor** stand?

b) Wofür sind die beiden Schleifen nach der ersten da? Was passiert, wenn man sie weglässt?

c) Warum braucht das Verfahren ein Hilfsfeld?
:::

::::collapsible{title="Auflösung"}

a) Weil Mergesort die Arbeit beim **Zusammenfügen** leistet. Vor dem Verschmelzen müssen beide Hälften bereits sortiert sein – also müssen die rekursiven Aufrufe vorher fertig sein.

Bei Quicksort ist es umgekehrt: Dort leistet das Partitionieren die Arbeit, und die Teilbereiche sind danach unabhängig voneinander.

b) Wenn eine Hälfte erschöpft ist, endet die erste Schleife – aber in der anderen liegen noch Elemente. Genau eine der beiden Nachschleifen räumt diesen Rest ab, die andere läuft null Mal.

Ohne sie fehlten Elemente im Ergebnis.

c) Man kann nicht an Ort und Stelle verschmelzen, ohne Werte zu überschreiben, die man noch braucht. Deshalb legt das Verfahren die Ergebnisse zunächst im Hilfsfeld ab und kopiert sie erst am Ende zurück.

Das kostet **zusätzlichen Speicher** in der Größe des Bereichs – der wesentliche Nachteil gegenüber Quicksort.

::::

## Der Ablauf im Bild

Für `5 2 8 1 9 3 7`:

```
                    5 2 8 1 9 3 7
                   /             \
            5 2 8 1               9 3 7
           /      \              /     \
        5 2       8 1          9 3      7
       /  \      /  \         /  \
      5    2    8    1       9    3

      ────────── ab hier wird verschmolzen ──────────

      2 5      1 8            3 9      7
         \    /                  \    /
        1 2 5 8                  3 7 9
              \                 /
              1 2 3 5 7 8 9
```

Auf dem Hinweg wird nur geteilt, auf dem Rückweg verschmolzen. Es gibt genau ⌈log₂ 7⌉ = 3 Ebenen.

## Aufgabe 1: Selbst implementieren

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden.

Fang mit `verschmelze` an – das ist der schwierige Teil. `sortiere` ist danach in vier Zeilen geschrieben.
:::

:::onlineide{height="760px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Merge.java
public class Merge {

    /**
     * Führt die beiden bereits sortierten Bereiche pLinks bis pMitte
     * und pMitte plus 1 bis pRechts zu einem sortierten Bereich zusammen.
     */
    public void verschmelze(int[] pWerte, int pLinks, int pMitte, int pRechts) {
        // ergänze diese Methode
    }

    /** Sortiert den Bereich von pLinks bis pRechts aufsteigend. */
    public void sortiere(int[] pWerte, int pLinks, int pRechts) {
        // ergänze diese Methode
    }

    /** Sortiert das ganze Feld aufsteigend. */
    public void sortiere(int[] pWerte) {
        sortiere(pWerte, 0, pWerte.length - 1);
    }
}
```

```java MergeTest.java
@Test
class MergeTest {

    @Test
    void testVerschmelzen() {
        Merge m = new Merge();
        int[] w = {1, 4, 7, 2, 3, 9};
        m.verschmelze(w, 0, 2, 5);

        assertEquals(1, w[0], "Erst die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(3, w[2], "Dann die 3.");
        assertEquals(4, w[3], "Dann die 4.");
        assertEquals(7, w[4], "Dann die 7.");
        assertEquals(9, w[5], "Zuletzt die 9.");
    }

    @Test
    void testVerschmelzenUngleicheHaelften() {
        Merge m = new Merge();
        int[] w = {5, 1, 2, 3};
        m.verschmelze(w, 0, 0, 3);

        assertEquals(1, w[0], "Erst die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(3, w[2], "Dann die 3.");
        assertEquals(5, w[3], "Zuletzt die 5.");
    }

    @Test
    void testVerschmelzenTeilbereich() {
        Merge m = new Merge();
        int[] w = {99, 2, 5, 1, 8, 99};
        m.verschmelze(w, 1, 2, 4);

        assertEquals(99, w[0], "Vor dem Bereich bleibt alles unverändert.");
        assertEquals(1, w[1], "Im Bereich beginnt es mit der 1.");
        assertEquals(2, w[2], "Dann die 2.");
        assertEquals(5, w[3], "Dann die 5.");
        assertEquals(8, w[4], "Dann die 8.");
        assertEquals(99, w[5], "Nach dem Bereich bleibt alles unverändert.");
    }

    @Test
    void testSortiere() {
        Merge m = new Merge();
        int[] w = {5, 2, 8, 1, 9, 3, 7};
        m.sortiere(w);
        assertEquals(1, w[0], "Vorne die 1.");
        assertEquals(3, w[2], "Dann die 3.");
        assertEquals(7, w[4], "Dann die 7.");
        assertEquals(9, w[6], "Hinten die 9.");
    }

    @Test
    void testSonderfaelle() {
        Merge m = new Merge();

        int[] leer = {};
        m.sortiere(leer);
        assertEquals(0, leer.length, "Das leere Feld bleibt leer.");

        int[] eins = {7};
        m.sortiere(eins);
        assertEquals(7, eins[0], "Ein einzelner Wert bleibt stehen.");

        int[] gleich = {4, 4, 4};
        m.sortiere(gleich);
        assertEquals(4, gleich[1], "Lauter gleiche Werte bleiben gleich.");
    }

    @Test
    void testGrosseMenge() {
        Merge m = new Merge();
        int[] w = new int[1000];
        for (int i = 0; i < w.length; i++) {
            w[i] = (i * 37) % 1000;
        }
        m.sortiere(w);
        for (int i = 0; i < w.length - 1; i++) {
            assertTrue(w[i] <= w[i + 1], "Das Feld ist durchgehend aufsteigend.");
        }
    }

    @Test
    void testSchonSortiertBleibtSchnell() {
        Merge m = new Merge();
        int[] w = new int[1000];
        for (int i = 0; i < w.length; i++) {
            w[i] = i;
        }
        m.sortiere(w);
        assertEquals(0, w[0], "Auch ein sortiertes Feld bleibt sortiert.");
        assertEquals(999, w[999], "Auch hinten.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Drei Zeiger"}

Du brauchst drei Positionen:

- `i` läuft durch die linke Hälfte, beginnend bei `pLinks`,
- `j` durch die rechte, beginnend bei `pMitte + 1`,
- `k` durch das Hilfsfeld, beginnend bei 0.

::::

::::collapsible{title="Tipp 2: Die Hauptschleife"}

Solange **beide** Hälften noch etwas hergeben:

```java
while (i <= pMitte && j <= pRechts) {
    if (pWerte[i] <= pWerte[j]) {
        hilfe[k] = pWerte[i];
        i++;
    } else {
        hilfe[k] = pWerte[j];
        j++;
    }
    k++;
}
```

Das `<=` statt `<` ist wichtig: Bei gleichen Werten wird der linke zuerst genommen. Damit bleibt die ursprüngliche Reihenfolge gleicher Elemente erhalten – man nennt ein solches Verfahren **stabil**.

::::

::::collapsible{title="Tipp 3: Das Zurückkopieren"}

Am Ende steht das Ergebnis im Hilfsfeld an den Positionen 0 bis `hilfe.length - 1`. Im echten Feld gehört es an die Positionen `pLinks` bis `pRechts`:

```java
for (int m = 0; m < hilfe.length; m++) {
    pWerte[pLinks + m] = hilfe[m];
}
```

Der Versatz um `pLinks` ist die häufigste Fehlerquelle bei dieser Methode.

::::

:::protect{password="java-q-6-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Merge.java
public class Merge {

    public void verschmelze(int[] pWerte, int pLinks, int pMitte, int pRechts) {
        int[] hilfe = new int[pRechts - pLinks + 1];

        int i = pLinks;
        int j = pMitte + 1;
        int k = 0;

        while (i <= pMitte && j <= pRechts) {
            if (pWerte[i] <= pWerte[j]) {
                hilfe[k] = pWerte[i];
                i++;
            } else {
                hilfe[k] = pWerte[j];
                j++;
            }
            k++;
        }

        while (i <= pMitte) {
            hilfe[k] = pWerte[i];
            i++;
            k++;
        }

        while (j <= pRechts) {
            hilfe[k] = pWerte[j];
            j++;
            k++;
        }

        for (int m = 0; m < hilfe.length; m++) {
            pWerte[pLinks + m] = hilfe[m];
        }
    }

    public void sortiere(int[] pWerte, int pLinks, int pRechts) {
        if (pLinks >= pRechts) {
            return;
        }

        int mitte = (pLinks + pRechts) / 2;
        sortiere(pWerte, pLinks, mitte);
        sortiere(pWerte, mitte + 1, pRechts);
        verschmelze(pWerte, pLinks, mitte, pRechts);
    }

    public void sortiere(int[] pWerte) {
        sortiere(pWerte, 0, pWerte.length - 1);
    }
}
```

:::

## Aufgabe 2: Die drei Verfahren im Vergleich

:::snippet{#aufgabe}
Vergleiche Quicksort, Mergesort und eines der quadratischen Verfahren aus der Einführungsphase.

a) Miss die Vergleichszahlen bei n = 1000, 2000 und 4000 auf **zufälligen** Daten.

b) Wiederhole die Messung mit **bereits sortierten** Daten.

c) Fasse die Ergebnisse in einer Tabelle zusammen und beurteile: Welches Verfahren würdest du wofür einsetzen?
:::

::textinput{placeholder="a) ... b) ... c) ..."}

::::collapsible{title="Auflösung"}

| Verfahren | zufällig | sortiert | Zusatzspeicher | Bemerkung |
| --- | --- | --- | --- | --- |
| Einfügen | n²/4 | **n** | keiner | bei fast sortierten Daten unschlagbar |
| Quicksort | n·log n | **n²/2** | keiner (nur Aufrufstapel) | schnell, aber empfindlich |
| Mergesort | n·log n | n·log n | **n** | verlässlich, aber speicherhungrig |

Eine vertretbare Empfehlung:

- **Kleine oder fast sortierte Datenmengen** → Sortieren durch Einfügen.
- **Große Datenmengen, Speicher knapp** → Quicksort mit guter Pivotwahl.
- **Große Datenmengen, Verlässlichkeit wichtig** → Mergesort. Es hat keinen schlechten Fall.
- **Daten passen nicht in den Arbeitsspeicher** → Mergesort. Es ist das einzige der drei, das sich sinnvoll auf Daten anwenden lässt, die stückweise von der Festplatte gelesen werden.

Der letzte Punkt ist der Grund, warum Mergesort trotz des Speicherbedarfs bis heute wichtig ist.

::::

## Zusatzaufgabe

:::snippet{#brain}
Mergesort lässt sich auch **iterativ** formulieren, ohne Rekursion:

Verschmelze zuerst alle benachbarten Einzelelemente zu Paaren, dann alle benachbarten Paare zu Vierergruppen, dann alle Vierer zu Achtern – und so weiter, bis nur noch ein Block übrig ist.

a) Setze diese Fassung um.

b) Was passiert bei einer Feldlänge, die keine Zweierpotenz ist? Wie musst du damit umgehen?

c) Vergleiche beide Fassungen: Welche findest du verständlicher? Welche braucht weniger Speicher?
:::

---

## Selbsttest

::::multievent

**1. Wo leistet Mergesort die eigentliche Arbeit?**

{r1{beim Teilen}}

{r1{!beim Zusammenfügen}}

{r1{bei der Pivotwahl}}

{h{Das Teilen ist nur eine Division durch zwei.}}
{H{Richtig! Bei Quicksort ist es genau umgekehrt.}}

**2. Wie viele Vergleiche braucht Mergesort im schlechtesten Fall?**

{r2{n zum Quadrat}}

{r2{!n mal log n}}

{r2{n}}

{h{Weil immer exakt in der Mitte geteilt wird, gibt es garantiert log n Ebenen.}}
{H{Richtig! Mergesort hat keinen schlechten Fall.}}

**3. Was ist der wesentliche Nachteil von Mergesort?**

{r3{es ist langsam}}

{r3{!es braucht zusätzlichen Speicher}}

{r3{es funktioniert nur bei sortierten Daten}}

{h{Das Verschmelzen geht nicht an Ort und Stelle.}}
{H{Richtig!}}

**4. Wozu dienen die beiden Schleifen nach der Hauptschleife beim Verschmelzen?**

{r4{sie prüfen das Ergebnis}}

{r4{!sie räumen den Rest der noch nicht erschöpften Hälfte ab}}

{r4{sie kopieren zurück}}

{h{Eine der beiden läuft null Mal.}}
{H{Richtig! Ohne sie fehlten Elemente.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Mergesort teilt immer exakt in der Mitte.}}

{c1{!Quicksort kann bei ungünstigen Daten quadratisch werden.}}

{c1{!Mergesort eignet sich für Daten, die nicht in den Speicher passen.}}

{c1{Quicksort braucht ein Hilfsfeld.}}

{h{Quicksort sortiert innerhalb desselben Feldes.}}
{H{Richtig!}}

::::
