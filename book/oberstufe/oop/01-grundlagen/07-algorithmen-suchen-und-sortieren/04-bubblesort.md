---
title: Bubblesort
index: 4
---

# Bubblesort

Das zweite Verfahren, das beim Kartensortieren oft erfunden wird: Statt gezielt das Minimum zu suchen, vergleicht man immer nur **Nachbarn**.

## Die Idee

:::snippet{#definition}
**Bubblesort** vergleicht der Reihe nach jedes Element mit seinem rechten Nachbarn und vertauscht die beiden, wenn sie in falscher Reihenfolge stehen.

Nach einem vollständigen Durchlauf steht das größte Element ganz rechts – es ist wie eine Blase nach oben gestiegen. Das wiederholt man, bis nichts mehr zu tauschen ist.
:::

Ein Durchlauf mit `5 2 4 1 8`:

| Vergleich | Feld | Aktion |
| --- | --- | --- |
| 5 ↔ 2 | `5 2 4 1 8` | tauschen |
| 5 ↔ 4 | `2 5 4 1 8` | tauschen |
| 5 ↔ 1 | `2 4 5 1 8` | tauschen |
| 5 ↔ 8 | `2 4 1 5 8` | passt |
| Ende | `2 4 1 5 8` | die 8 steht sicher hinten |

:::snippet{#aufgabe}
Führe die **restlichen** Durchläufe auf Papier durch, bis das Feld sortiert ist.

Wie viele vollständige Durchläufe brauchst du? Woran merkst du, dass du fertig bist?
:::

::::collapsible{title="Auflösung"}

| Durchlauf | Ergebnis |
| --- | --- |
| 1 | `2 4 1 5 8` |
| 2 | `2 1 4 5 8` |
| 3 | `1 2 4 5 8` |
| 4 | `1 2 4 5 8` – keine Vertauschung mehr |

Nach dem dritten Durchlauf ist das Feld sortiert. Der vierte Durchlauf **stellt das fest**, indem er keine einzige Vertauschung mehr vornimmt.

Genau das ist der Hinweis: Wenn ein ganzer Durchlauf ohne Vertauschung vergeht, ist das Feld sortiert.

::::

## Die einfache Fassung

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 4, 1, 8};

    IO.println("vorher:  " + alsText(werte));
    bubblesortEinfach(werte);
    IO.println("nachher: " + alsText(werte));
}

/**
 * Sortiert das Feld aufsteigend durch wiederholtes Vertauschen
 * benachbarter Elemente.
 */
void bubblesortEinfach(int[] pWerte) {
    for (int durchlauf = 0; durchlauf < pWerte.length - 1; durchlauf++) {
        for (int i = 0; i < pWerte.length - 1; i++) {
            if (pWerte[i] > pWerte[i + 1]) {
                int merker = pWerte[i];
                pWerte[i] = pWerte[i + 1];
                pWerte[i + 1] = merker;
            }
        }
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

## Zwei Verbesserungen finden

:::snippet{#aufgabe}
Die Fassung oben funktioniert, macht aber **unnötige Arbeit**. Finde zwei unabhängige Verbesserungen.

a) Denk daran, was nach dem ersten Durchlauf schon feststeht. Muss die innere Schleife wirklich jedes Mal bis ganz nach hinten laufen?

b) Denk an deine Beobachtung von oben: Woran erkennt man, dass das Feld fertig sortiert ist?

Beschreibe beide Verbesserungen in Worten, bevor du sie umsetzt.
:::

::::collapsible{title="Auflösung a): die innere Schleife verkürzen"}

Nach dem ersten Durchlauf steht das größte Element sicher ganz rechts. Nach dem zweiten die beiden größten. Die innere Schleife muss also in jedem Durchlauf **eine Position weniger** prüfen:

```java
for (int i = 0; i < pWerte.length - 1 - durchlauf; i++) {
```

Damit halbiert sich die Anzahl der Vergleiche ungefähr.

::::

::::collapsible{title="Auflösung b): früh abbrechen"}

Merke dir in einer `boolean`-Variablen, ob in einem Durchlauf überhaupt getauscht wurde. Wenn nicht, ist das Feld sortiert und du kannst aufhören:

```java
boolean getauscht = true;
int durchlauf = 0;
while (getauscht) {
    getauscht = false;
    for (...) {
        if (...) {
            // tauschen
            getauscht = true;
        }
    }
    durchlauf++;
}
```

Bei einem bereits sortierten Feld braucht das Verfahren damit nur **einen** Durchlauf statt n − 1.

::::

## Die verbesserte Fassung

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 4, 1, 8};
    IO.println("unsortiert: " + zaehleDurchlaeufe(werte) + " Durchläufe");

    int[] fertig = {1, 2, 4, 5, 8};
    IO.println("sortiert:   " + zaehleDurchlaeufe(fertig) + " Durchläufe");

    int[] rueckwaerts = {8, 5, 4, 2, 1};
    IO.println("rückwärts:  " + zaehleDurchlaeufe(rueckwaerts) + " Durchläufe");
}

/**
 * Sortiert das Feld mit Bubblesort und liefert die Anzahl
 * der benötigten Durchläufe.
 */
int zaehleDurchlaeufe(int[] pWerte) {
    boolean getauscht = true;
    int durchlaeufe = 0;

    while (getauscht) {
        getauscht = false;
        durchlaeufe++;

        for (int i = 0; i < pWerte.length - durchlaeufe; i++) {
            if (pWerte[i] > pWerte[i + 1]) {
                int merker = pWerte[i];
                pWerte[i] = pWerte[i + 1];
                pWerte[i + 1] = merker;
                getauscht = true;
            }
        }
    }
    return durchlaeufe;
}
```

:::

:::snippet{#aufgabe}
Führe das Programm aus und erkläre die drei Ergebnisse.

Warum braucht das bereits sortierte Feld genau einen Durchlauf – und nicht null?
:::

::::collapsible{title="Auflösung"}

- **unsortiert:** 4 Durchläufe
- **sortiert:** 1 Durchlauf
- **rückwärts:** 5 Durchläufe

Null Durchläufe sind unmöglich: Man muss mindestens einmal hinschauen, um festzustellen, dass nichts zu tun ist. Dieser eine Durchlauf ist der Preis dafür, dass der Algorithmus nichts über die Daten voraussetzt.

Das rückwärts sortierte Feld ist der **schlechteste Fall**: Jedes Element muss einzeln durch das ganze Feld wandern.

::::

## Zwei Verfahren vergleichen

:::snippet{#aufgabe}
Du kennst jetzt zwei Sortierverfahren. Vergleiche sie.

a) Wie viele **Vergleiche** macht jedes im schlechtesten Fall?

b) Wie viele **Vertauschungen**?

c) Welches Verfahren ist im besten Fall schneller? Was **ist** der beste Fall bei jedem der beiden?

d) Beurteile: Welches würdest du wofür einsetzen?
:::

::::collapsible{title="Auflösung"}

| | Sortieren durch Auswählen | Bubblesort (verbessert) |
| --- | --- | --- |
| Vergleiche, schlechtester Fall | n·(n−1)/2 | n·(n−1)/2 |
| Vertauschungen, schlechtester Fall | n − 1 | n·(n−1)/2 |
| bester Fall | immer gleich viele Vergleiche | ein Durchlauf, also n − 1 Vergleiche |
| bester Fall ist… | gibt es nicht – das Verfahren merkt nie, dass es fertig ist | ein bereits sortiertes Feld |

d) Beides sind quadratische Verfahren, für große Datenmengen also beide ungeeignet. Aber:

- **Sortieren durch Auswählen** ist gut, wenn Vertauschungen **teuer** sind – etwa weil die Elemente groß sind oder auf einer Festplatte liegen. Es macht nie mehr als n − 1 davon.
- **Bubblesort** ist gut, wenn die Daten **fast sortiert** sind. Dann erkennt es das nach einem Durchlauf.

Dass es kein bestes Verfahren gibt, sondern nur passende, ist eine Erkenntnis, die dich durch die ganze Informatik begleitet.

::::

## Aufgabe: Selbst implementieren

:::snippet{#aufgabe}
Setze beide Verbesserungen um, sodass alle Tests grün werden.
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Bubble.java
public class Bubble {

    /**
     * Sortiert das Feld aufsteigend mit Bubblesort.
     * Beide Verbesserungen sollen eingebaut sein:
     * verkürzte innere Schleife und Abbruch ohne Vertauschung.
     */
    public void sortiere(int[] pWerte) {
        // ergänze diese Methode
    }

    /**
     * Sortiert wie sortiere und liefert zusätzlich die Anzahl
     * der durchgeführten Durchläufe zurück.
     */
    public int sortiereUndZaehle(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }
}
```

```java BubbleTest.java
@Test
class BubbleTest {

    @Test
    void testSortiert() {
        Bubble b = new Bubble();
        int[] w = {5, 2, 4, 1, 8};
        b.sortiere(w);
        assertEquals(1, w[0], "Vorne steht die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(4, w[2], "Dann die 4.");
        assertEquals(5, w[3], "Dann die 5.");
        assertEquals(8, w[4], "Hinten steht die 8.");
    }

    @Test
    void testSonderfaelle() {
        Bubble b = new Bubble();

        int[] leer = {};
        b.sortiere(leer);
        assertEquals(0, leer.length, "Das leere Feld bleibt leer.");

        int[] eins = {7};
        b.sortiere(eins);
        assertEquals(7, eins[0], "Ein einzelner Wert bleibt stehen.");

        int[] gleich = {4, 4, 4};
        b.sortiere(gleich);
        assertEquals(4, gleich[1], "Lauter gleiche Werte bleiben gleich.");
    }

    @Test
    void testAbbruchBeiSortiertemFeld() {
        Bubble b = new Bubble();
        int[] sortiert = {1, 2, 3, 4, 5};
        assertEquals(1, b.sortiereUndZaehle(sortiert),
                     "Bei einem sortierten Feld genügt ein Durchlauf.");
    }

    @Test
    void testSchlechtesterFall() {
        Bubble b = new Bubble();
        int[] rueckwaerts = {5, 4, 3, 2, 1};
        assertEquals(5, b.sortiereUndZaehle(rueckwaerts),
                     "Bei einem rückwärts sortierten Feld sind es fünf Durchläufe.");
        assertEquals(1, rueckwaerts[0], "Sortiert ist es trotzdem.");
        assertEquals(5, rueckwaerts[4], "Auch hinten.");
    }
}
```

:::

::::collapsible{title="Tipp: sortiere aus sortiereUndZaehle bauen"}

Schreib erst `sortiereUndZaehle` vollständig. Dann besteht `sortiere` aus einer einzigen Zeile:

```java
public void sortiere(int[] pWerte) {
    sortiereUndZaehle(pWerte);
}
```

Das Ergebnis wird einfach nicht weiterverwendet.

::::

:::protect{password="java-ef-7-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Bubble.java
public class Bubble {

    public void sortiere(int[] pWerte) {
        sortiereUndZaehle(pWerte);
    }

    public int sortiereUndZaehle(int[] pWerte) {
        boolean getauscht = true;
        int durchlaeufe = 0;

        while (getauscht) {
            getauscht = false;
            durchlaeufe++;

            for (int i = 0; i < pWerte.length - durchlaeufe; i++) {
                if (pWerte[i] > pWerte[i + 1]) {
                    int merker = pWerte[i];
                    pWerte[i] = pWerte[i + 1];
                    pWerte[i + 1] = merker;
                    getauscht = true;
                }
            }
        }
        return durchlaeufe;
    }
}
```

Beim leeren Feld ist `pWerte.length - durchlaeufe` gleich -1, die innere Schleife läuft null Mal, `getauscht` bleibt `false`, und das Verfahren endet nach einem Durchlauf. Genau richtig.

:::

## Zusatzaufgabe

:::snippet{#brain}
Bubblesort lässt sich auch in die andere Richtung laufen lassen: Statt das größte Element nach rechts zu schieben, kann man das kleinste nach links schieben.

Kombiniert man beides und lässt die Durchläufe abwechselnd nach rechts und nach links laufen, entsteht **Shakersort**.

a) Setze Shakersort um.

b) Vergleiche die Anzahl der Durchläufe mit dem normalen Bubblesort bei dem Feld `2 3 4 5 1`. Wo ist der Unterschied besonders groß, und warum?
:::

---

## Selbsttest

::::multievent

**1. Was vergleicht Bubblesort miteinander?**

{r1{das erste und das letzte Element}}

{r1{!jedes Element mit seinem direkten Nachbarn}}

{r1{jedes Element mit dem kleinsten}}

{h{Daher der Name: die großen Werte steigen wie Blasen auf.}}
{H{Richtig!}}

**2. Woran erkennt das Verfahren, dass es fertig ist?**

{r2{wenn die Anzahl der Durchläufe erreicht ist}}

{r2{!wenn ein ganzer Durchlauf ohne Vertauschung vergeht}}

{r2{wenn das größte Element hinten steht}}

{h{Das ist die zweite der beiden Verbesserungen.}}
{H{Richtig!}}

**3. Warum kann die innere Schleife in jedem Durchlauf kürzer werden?**

{r3{weil das Feld schrumpft}}

{r3{!weil hinten nach jedem Durchlauf ein Element sicher richtig steht}}

{r3{weil sonst ein Zaunpfahlfehler entsteht}}

{h{Nach dem ersten Durchlauf steht das größte Element ganz rechts.}}
{H{Richtig!}}

**4. Welches Verfahren macht weniger Vertauschungen?**

{r4{Bubblesort}}

{r4{!Sortieren durch Auswählen}}

{r4{beide gleich viele}}

{h{Das eine tauscht höchstens einmal pro Durchlauf.}}
{H{Richtig! Höchstens n minus 1 Vertauschungen.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Beide Verfahren haben quadratischen Aufwand.}}

{c1{!Bubblesort ist bei fast sortierten Daten deutlich schneller.}}

{c1{!Ein sortiertes Feld erkennt Bubblesort nach einem Durchlauf.}}

{c1{Es gibt ein bestes Sortierverfahren für alle Fälle.}}

{h{Welches Verfahren besser ist, hängt von den Daten und den Kosten ab.}}
{H{Richtig!}}

::::
