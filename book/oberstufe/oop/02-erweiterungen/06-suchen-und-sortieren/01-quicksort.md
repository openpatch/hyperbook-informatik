---
title: Quicksort
index: 1
---

# Quicksort

Alle drei Sortierverfahren der Einführungsphase brauchen im schlechtesten Fall quadratischen Aufwand. Bei einer Million Datensätzen wären das 500 Milliarden Vergleiche – Tage an Rechenzeit.

Mit *Teilen und Herrschen* geht es sehr viel besser.

<!-- KLP QPh, Algorithmen: Problemlösestrategien - Teilen und Herrschen; erläutern iterative und rekursive Such- und Sortierverfahren (A) -->

## Die Idee

:::snippet{#definition}
**Quicksort** wählt ein Element als **Pivot** (Angelpunkt) und ordnet das Feld so um, dass links vom Pivot nur kleinere und rechts nur größere Werte stehen. Damit steht das Pivot bereits an seiner endgültigen Stelle.

Danach sortiert das Verfahren die beiden Teilbereiche **rekursiv** nach demselben Muster.
:::

Das Umordnen heißt **Partitionieren** und ist der Kern des Verfahrens.

## Mit Karten

:::snippet{#aufgabe}
Legt euch die Karten `5 2 8 1 9 3 7` hin.

1. Nehmt die **letzte** Karte als Pivot – hier die 7.
2. Geht die übrigen von links nach rechts durch. Alles, was kleiner als 7 ist, legt ihr nach links; alles Größere bleibt rechts.
3. Legt das Pivot zwischen die beiden Gruppen.

Wie sieht das Feld danach aus? An welcher Stelle steht die 7?
:::

::::collapsible{title="Auflösung"}

Kleiner als 7: `5 2 1 3`. Größer: `8 9`.

Ergebnis: `5 2 1 3 | 7 | 8 9`

Die 7 steht jetzt an Index 4 – und dort bleibt sie für immer. Alles links davon ist kleiner, alles rechts größer.

Jetzt macht man dasselbe noch einmal mit `5 2 1 3` und mit `8 9`.

::::

## Das Verfahren

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 8, 1, 9, 3, 7};

    IO.println("vorher:  " + alsText(werte));
    quicksort(werte, 0, werte.length - 1);
    IO.println("nachher: " + alsText(werte));
}

/**
 * Sortiert den Bereich von pLinks bis pRechts aufsteigend.
 */
void quicksort(int[] pWerte, int pLinks, int pRechts) {
    if (pLinks >= pRechts) {
        return;
    }

    int teiler = partitioniere(pWerte, pLinks, pRechts);

    IO.println("  Pivot " + pWerte[teiler] + " steht an Index " + teiler
               + ": " + alsText(pWerte));

    quicksort(pWerte, pLinks, teiler - 1);
    quicksort(pWerte, teiler + 1, pRechts);
}

/**
 * Ordnet den Bereich so um, dass links vom zurückgegebenen Index
 * nur kleinere und rechts nur groessere Werte stehen.
 * Als Pivot dient das letzte Element des Bereichs.
 * @return der endgültige Index des Pivots
 */
int partitioniere(int[] pWerte, int pLinks, int pRechts) {
    int pivot = pWerte[pRechts];
    int grenze = pLinks;

    for (int i = pLinks; i < pRechts; i++) {
        if (pWerte[i] < pivot) {
            tausche(pWerte, i, grenze);
            grenze++;
        }
    }

    tausche(pWerte, grenze, pRechts);
    return grenze;
}

void tausche(int[] pWerte, int pI, int pJ) {
    int merker = pWerte[pI];
    pWerte[pI] = pWerte[pJ];
    pWerte[pJ] = merker;
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
a) Verfolge die Ausgabe. In welcher Reihenfolge kommen die Pivots an ihren Platz?

b) Was bewirkt die Variable `grenze` in `partitioniere`? Formuliere in einem Satz, was zu jedem Zeitpunkt links von ihr steht.

c) Warum steht am Ende von `partitioniere` noch ein Tausch?
:::

::::collapsible{title="Auflösung"}

a) Zuerst das Pivot des ganzen Feldes, dann die Pivots der linken Hälfte, dann die der rechten. Das Verfahren arbeitet den linken Ast vollständig ab, bevor es zum rechten kommt – wie jede Rekursion.

b) `grenze` markiert die Stelle, an der der nächste kleine Wert hingehört. Links von ihr stehen zu jedem Zeitpunkt **alle bisher gefundenen Werte, die kleiner als das Pivot sind**.

c) Das Pivot liegt bis dahin noch ganz rechts. Der letzte Tausch bringt es genau an die Grenze – also zwischen die Kleineren und die Größeren.

::::

## Wie schnell ist Quicksort?

:::snippet{#aufgabe}
a) Angenommen, das Pivot teilt den Bereich immer genau in der Mitte. Wie oft kann man ein Feld mit 1000 Elementen halbieren?

b) Jede Partitionierungsebene betrachtet zusammen alle n Elemente. Wie viele Vergleiche ergibt das insgesamt?

c) Was passiert, wenn das Pivot immer das **kleinste** Element des Bereichs ist? Wann tritt dieser Fall bei unserer Pivotwahl ein?
:::

::::collapsible{title="Auflösung"}

a) Etwa **10** Mal – dasselbe Argument wie bei der binären Suche.

b) Auf jeder Ebene werden zusammen n Elemente betrachtet, und es gibt etwa log n Ebenen. Also **n · log n** Vergleiche.

Bei einer Million Elementen: 1 000 000 · 20 = 20 Millionen statt 500 Milliarden. Das ist ein Faktor 25 000.

c) Dann liegen alle übrigen Elemente auf einer Seite, und der Bereich schrumpft nur um eins. Das ergibt n Ebenen statt log n – der Aufwand wird wieder **quadratisch**.

Bei unserer Pivotwahl (immer das letzte Element) tritt das genau dann ein, wenn das Feld **bereits sortiert** ist. Das ist eine unangenehme Eigenschaft: Ausgerechnet der schönste Fall ist der schlimmste.

::::

:::snippet{#merken}
| | Vergleiche |
| --- | --- |
| bester und mittlerer Fall | n · log n |
| schlechtester Fall | n² / 2 |

In der Praxis ist Quicksort trotzdem eines der schnellsten Verfahren. Der schlechteste Fall lässt sich fast vollständig vermeiden, indem man das Pivot geschickter wählt – etwa den mittleren von drei Werten, oder einen zufälligen.
:::

## Aufgabe 1: Selbst implementieren

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden.
:::

:::onlineide{height="740px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Quick.java
public class Quick {

    /** Vertauscht die Werte an den Positionen pI und pJ. */
    public void tausche(int[] pWerte, int pI, int pJ) {
        // ergänze diese Methode
    }

    /**
     * Ordnet den Bereich von pLinks bis pRechts um. Als Pivot dient
     * das letzte Element des Bereichs.
     * @return der endgültige Index des Pivots
     */
    public int partitioniere(int[] pWerte, int pLinks, int pRechts) {
        return 0; // ersetze diese Zeile
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

```java QuickTest.java
@Test
class QuickTest {

    @Test
    void testTausche() {
        Quick q = new Quick();
        int[] w = {1, 2, 3};
        q.tausche(w, 0, 2);
        assertEquals(3, w[0], "Vorne steht jetzt die 3.");
        assertEquals(1, w[2], "Hinten die 1.");
    }

    @Test
    void testPartitioniere() {
        Quick q = new Quick();
        int[] w = {5, 2, 8, 1, 9, 3, 7};
        int teiler = q.partitioniere(w, 0, 6);

        assertEquals(4, teiler, "Das Pivot 7 gehört an Index 4.");
        assertEquals(7, w[teiler], "Und dort steht es auch.");

        for (int i = 0; i < teiler; i++) {
            assertTrue(w[i] < 7, "Links vom Pivot steht nur Kleineres.");
        }
        for (int i = teiler + 1; i < w.length; i++) {
            assertTrue(w[i] > 7, "Rechts vom Pivot steht nur Größeres.");
        }
    }

    @Test
    void testSortiere() {
        Quick q = new Quick();
        int[] w = {5, 2, 8, 1, 9, 3, 7};
        q.sortiere(w);
        assertEquals(1, w[0], "Vorne die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(3, w[2], "Dann die 3.");
        assertEquals(5, w[3], "Dann die 5.");
        assertEquals(7, w[4], "Dann die 7.");
        assertEquals(8, w[5], "Dann die 8.");
        assertEquals(9, w[6], "Hinten die 9.");
    }

    @Test
    void testSonderfaelle() {
        Quick q = new Quick();

        int[] leer = {};
        q.sortiere(leer);
        assertEquals(0, leer.length, "Das leere Feld bleibt leer.");

        int[] eins = {7};
        q.sortiere(eins);
        assertEquals(7, eins[0], "Ein einzelner Wert bleibt stehen.");

        int[] gleich = {4, 4, 4, 4};
        q.sortiere(gleich);
        assertEquals(4, gleich[0], "Lauter gleiche Werte bleiben gleich.");
        assertEquals(4, gleich[3], "Auch hinten.");
    }

    @Test
    void testSchonSortiert() {
        Quick q = new Quick();
        int[] w = {1, 2, 3, 4, 5};
        q.sortiere(w);
        assertEquals(1, w[0], "Ein sortiertes Feld bleibt sortiert.");
        assertEquals(5, w[4], "Auch hinten.");
    }

    @Test
    void testRueckwaerts() {
        Quick q = new Quick();
        int[] w = {5, 4, 3, 2, 1};
        q.sortiere(w);
        assertEquals(1, w[0], "Auch rückwärts sortierte Felder werden sortiert.");
        assertEquals(5, w[4], "Auch hinten.");
    }

    @Test
    void testGrosseMenge() {
        Quick q = new Quick();
        int[] w = new int[500];
        for (int i = 0; i < w.length; i++) {
            w[i] = (i * 37) % 500;
        }
        q.sortiere(w);
        for (int i = 0; i < w.length - 1; i++) {
            assertTrue(w[i] <= w[i + 1], "Das Feld ist durchgehend aufsteigend.");
        }
    }
}
```

:::

::::collapsible{title="Tipp 1: partitioniere"}

```java
int pivot = pWerte[pRechts];
int grenze = pLinks;

for (int i = pLinks; i < pRechts; i++) {
    if (pWerte[i] < pivot) {
        tausche(pWerte, i, grenze);
        grenze++;
    }
}

tausche(pWerte, grenze, pRechts);
return grenze;
```

Beachte, dass die Schleife bei `pRechts` **aufhört** – das Pivot selbst wird nicht mitgeprüft.

::::

::::collapsible{title="Tipp 2: sortiere"}

Drei Zeilen:

```java
if (pLinks >= pRechts) {
    return;
}
int teiler = partitioniere(pWerte, pLinks, pRechts);
sortiere(pWerte, pLinks, teiler - 1);
sortiere(pWerte, teiler + 1, pRechts);
```

Der Basisfall ist ein Bereich mit höchstens einem Element – der ist schon sortiert.

::::

::::collapsible{title="Tipp 3: Warum teiler minus 1 und teiler plus 1?"}

Weil das Pivot an Index `teiler` bereits endgültig richtig steht. Es darf nicht noch einmal mitsortiert werden – sonst schrumpfen die Bereiche nicht und die Rekursion endet nie.

::::

:::protect{password="java-q-6-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Quick.java
public class Quick {

    public void tausche(int[] pWerte, int pI, int pJ) {
        int merker = pWerte[pI];
        pWerte[pI] = pWerte[pJ];
        pWerte[pJ] = merker;
    }

    public int partitioniere(int[] pWerte, int pLinks, int pRechts) {
        int pivot = pWerte[pRechts];
        int grenze = pLinks;

        for (int i = pLinks; i < pRechts; i++) {
            if (pWerte[i] < pivot) {
                tausche(pWerte, i, grenze);
                grenze++;
            }
        }

        tausche(pWerte, grenze, pRechts);
        return grenze;
    }

    public void sortiere(int[] pWerte, int pLinks, int pRechts) {
        if (pLinks >= pRechts) {
            return;
        }

        int teiler = partitioniere(pWerte, pLinks, pRechts);
        sortiere(pWerte, pLinks, teiler - 1);
        sortiere(pWerte, teiler + 1, pRechts);
    }

    public void sortiere(int[] pWerte) {
        sortiere(pWerte, 0, pWerte.length - 1);
    }
}
```

Beim leeren Feld ist `pRechts` gleich -1, und `0 >= -1` ist wahr – die Methode kehrt sofort zurück.

:::

## Aufgabe 2: Der schlechteste Fall

:::snippet{#aufgabe}
Miss, wie viele Vergleiche Quicksort bei verschiedenen Ausgangslagen braucht.

a) Zufällige Werte

b) Bereits aufsteigend sortiert

c) Absteigend sortiert

Erkläre die Unterschiede. Bei welcher Ausgangslage tritt der schlechteste Fall ein, und warum?
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    int n = 2000;

    IO.println("zufällig:   " + zaehle(zufall(n)) + " Vergleiche");
    IO.println("aufsteigend: " + zaehle(aufsteigend(n)) + " Vergleiche");
    IO.println("absteigend:  " + zaehle(absteigend(n)) + " Vergleiche");
    IO.println("");
    IO.println("n mal log n waere ungefaehr " + (n * 11));
    IO.println("n zum Quadrat halbe waere   " + (n * n / 2));
}

int vergleiche;

/** Sortiert das Feld und liefert die Anzahl der Vergleiche. */
int zaehle(int[] pWerte) {
    vergleiche = 0;
    sortiere(pWerte, 0, pWerte.length - 1);
    return vergleiche;
}

void sortiere(int[] pWerte, int pLinks, int pRechts) {
    if (pLinks >= pRechts) {
        return;
    }
    int teiler = partitioniere(pWerte, pLinks, pRechts);
    sortiere(pWerte, pLinks, teiler - 1);
    sortiere(pWerte, teiler + 1, pRechts);
}

int partitioniere(int[] pWerte, int pLinks, int pRechts) {
    int pivot = pWerte[pRechts];
    int grenze = pLinks;

    for (int i = pLinks; i < pRechts; i++) {
        vergleiche++;
        if (pWerte[i] < pivot) {
            int merker = pWerte[i];
            pWerte[i] = pWerte[grenze];
            pWerte[grenze] = merker;
            grenze++;
        }
    }

    int merker = pWerte[grenze];
    pWerte[grenze] = pWerte[pRechts];
    pWerte[pRechts] = merker;
    return grenze;
}

int[] zufall(int pN) {
    int[] f = new int[pN];
    for (int i = 0; i < pN; i++) {
        f[i] = Random.randint(1, 100000);
    }
    return f;
}

int[] aufsteigend(int pN) {
    int[] f = new int[pN];
    for (int i = 0; i < pN; i++) {
        f[i] = i;
    }
    return f;
}

int[] absteigend(int pN) {
    int[] f = new int[pN];
    for (int i = 0; i < pN; i++) {
        f[i] = pN - i;
    }
    return f;
}
```

:::

::::collapsible{title="Auflösung"}

Typische Werte bei n = 2000:

| Ausgangslage | Vergleiche | Größenordnung |
| --- | --- | --- |
| zufällig | etwa 25 000 | n · log n |
| aufsteigend | etwa 2 000 000 | n² / 2 |
| absteigend | etwa 2 000 000 | n² / 2 |

Bei einem **sortierten** Feld ist das letzte Element immer das größte. Das Pivot landet also stets ganz rechts, der linke Teilbereich enthält alles übrige, und der Bereich schrumpft nur um eins pro Ebene.

Bei einem **absteigend** sortierten Feld passiert dasselbe spiegelverkehrt.

Beides sind in der Praxis häufige Fälle – Daten liegen oft schon teilweise sortiert vor. Deshalb wählt kein ernsthaftes Programm das letzte Element als Pivot.

::::

:::snippet{#brain}
Verbessere die Pivotwahl: Nimm statt des letzten Elements den **mittleren von dreien** – dem ersten, dem mittleren und dem letzten Element des Bereichs. Tausche ihn ans Ende und partitioniere wie gehabt.

Miss danach noch einmal alle drei Ausgangslagen. Was hat sich geändert?
:::

## Zusatzaufgabe

:::snippet{#brain}
Visualisiere Quicksort mit Scratch for Java:

- Stelle die Werte als Säulen dar.
- Färbe während der Partitionierung das Pivot rot, den bereits abgearbeiteten Bereich blau und den noch offenen grau.
- Zeichne nach jedem abgeschlossenen Partitionierungsschritt neu und pausiere kurz.

Vergleiche die Animation mit der von Bubblesort aus der Einführungsphase. Woran sieht man den Unterschied im Aufwand?
:::

---

## Selbsttest

::::multievent

**1. Was leistet die Partitionierung?**

{r1{sie sortiert den ganzen Bereich}}

{r1{!sie bringt das Pivot an seine endgültige Stelle und ordnet den Rest darum an}}

{r1{sie halbiert den Bereich in der Mitte}}

{h{Nach der Partitionierung steht ein Element für immer richtig.}}
{H{Richtig! Alles links davon ist kleiner, alles rechts größer.}}

**2. Wie viele Vergleiche braucht Quicksort im mittleren Fall?**

{r2{n zum Quadrat}}

{r2{!n mal log n}}

{r2{log n}}

{h{Es gibt etwa log n Ebenen, und jede betrachtet zusammen alle n Elemente.}}
{H{Richtig!}}

**3. Wann tritt bei der Pivotwahl letztes Element der schlechteste Fall ein?**

{r3{bei zufälligen Daten}}

{r3{!bei bereits sortierten Daten}}

{r3{bei lauter gleichen Werten}}

{h{Dann ist das letzte Element immer das größte.}}
{H{Richtig! Ausgerechnet der scheinbar schönste Fall ist der schlimmste.}}

**4. Warum werden nach der Partitionierung nur die Bereiche links und rechts vom Pivot sortiert?**

{r4{um Zeit zu sparen}}

{r4{!weil das Pivot bereits an seiner endgültigen Stelle steht}}

{r4{weil sonst ein Zaunpfahlfehler entsteht}}

{h{Würde man es mitsortieren, schrumpften die Bereiche nicht.}}
{H{Richtig! Und die Rekursion würde nie enden.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Quicksort ist ein Beispiel für Teilen und Herrschen.}}

{c1{!Der schlechteste Fall lässt sich durch bessere Pivotwahl fast vermeiden.}}

{c1{!Quicksort sortiert innerhalb desselben Feldes.}}

{c1{Quicksort ist immer schneller als Sortieren durch Einfügen.}}

{h{Bei sehr kleinen Feldern ist der Verwaltungsaufwand höher als der Gewinn.}}
{H{Richtig! Viele Bibliotheken schalten für kleine Teilstücke auf Einfügen um.}}

::::
