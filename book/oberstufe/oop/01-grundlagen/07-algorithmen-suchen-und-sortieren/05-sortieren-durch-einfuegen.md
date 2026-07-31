---
title: Sortieren durch Einfügen
index: 5
---

# Sortieren durch Einfügen

Das dritte Verfahren ist das, mit dem die meisten Menschen tatsächlich Karten sortieren – wahrscheinlich auch du, ohne je darüber nachgedacht zu haben.

## Die Idee

:::snippet{#definition}
**Sortieren durch Einfügen** (englisch *insertion sort*):

Nimm ein Element nach dem anderen aus dem unsortierten Teil und **füge es an der richtigen Stelle** in den bereits sortierten Teil ein. Alle größeren Elemente rücken dabei um eine Position nach rechts.
:::

So sortiert man ein Blatt Spielkarten: Man nimmt eine Karte auf und schiebt sie zwischen die schon sortierten.

Der Ablauf mit `5 2 4 1 8`. Der senkrechte Strich trennt sortiert von unsortiert:

| Schritt | Feld | Aktion |
| --- | --- | --- |
| Start | `5 \| 2 4 1 8` | die 5 allein gilt als sortiert |
| 1 | `2 5 \| 4 1 8` | 2 vor die 5 einfügen |
| 2 | `2 4 5 \| 1 8` | 4 zwischen 2 und 5 einfügen |
| 3 | `1 2 4 5 \| 8` | 1 ganz nach vorne |
| 4 | `1 2 4 5 8 \|` | 8 bleibt hinten |

:::snippet{#aufgabe}
Führe das Verfahren **auf Papier** an dem Feld `3 7 1 9 4` durch. Notiere nach jedem Schritt den Zustand und die Position des Trennstrichs.
:::

::::collapsible{title="Auflösung"}

| Schritt | Feld | eingefügt |
| --- | --- | --- |
| Start | `3 \| 7 1 9 4` | |
| 1 | `3 7 \| 1 9 4` | 7 bleibt, wo sie ist |
| 2 | `1 3 7 \| 9 4` | 1 ganz nach vorne |
| 3 | `1 3 7 9 \| 4` | 9 bleibt hinten |
| 4 | `1 3 4 7 9 \|` | 4 zwischen 3 und 7 |

::::

## Zwei Teilaufgaben

Das Verfahren zerfällt sauber in zwei Teile – das ist Modularisierung in der Praxis:

1. **Die Stelle finden**, an die das Element gehört.
2. **Platz schaffen**, indem alle größeren Elemente nach rechts rücken.

In der üblichen Umsetzung erledigt man beides gleichzeitig: Man wandert vom Einfügeelement aus nach links und schiebt dabei jedes zu große Element eine Position nach rechts. Sobald ein kleineres kommt, ist die Lücke die richtige Stelle.

```
┌──────────────────────────────────────────────────────────┐
│ für i von 1 bis n - 1                                    │
│ ┌────────────────────────────────────────────────────┐   │
│ │ merker ← werte[i]                                  │   │
│ ├────────────────────────────────────────────────────┤   │
│ │ j ← i - 1                                          │   │
│ ├────────────────────────────────────────────────────┤   │
│ │ solange j >= 0 und werte[j] > merker               │   │
│ │ ┌──────────────────────────────────────────────┐   │   │
│ │ │ werte[j + 1] ← werte[j]                      │   │   │
│ │ ├──────────────────────────────────────────────┤   │   │
│ │ │ j ← j - 1                                    │   │   │
│ │ └──────────────────────────────────────────────┘   │   │
│ ├────────────────────────────────────────────────────┤   │
│ │ werte[j + 1] ← merker                              │   │
│ └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## In Java

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 4, 1, 8};

    IO.println("vorher:  " + alsText(werte));
    sortiereDurchEinfuegen(werte);
    IO.println("nachher: " + alsText(werte));
}

/**
 * Sortiert das Feld aufsteigend, indem jedes Element an der
 * richtigen Stelle in den bereits sortierten Anfang eingefügt wird.
 */
void sortiereDurchEinfuegen(int[] pWerte) {
    for (int i = 1; i < pWerte.length; i++) {
        int merker = pWerte[i];
        int j = i - 1;

        while (j >= 0 && pWerte[j] > merker) {
            pWerte[j + 1] = pWerte[j];
            j--;
        }

        pWerte[j + 1] = merker;
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
Zwei Stellen in diesem Code sind erklärungsbedürftig.

a) Warum beginnt die äußere Schleife bei `i = 1` und nicht bei 0?

b) Warum steht in der Bedingung `j >= 0 &&` vor dem Vergleich – und was passiert, wenn man die beiden Teile vertauscht?
:::

::::collapsible{title="Auflösung"}

a) Ein einzelnes Element ist immer schon sortiert. Der Bereich `werte[0]` bis `werte[0]` braucht keine Behandlung – man fängt beim zweiten Element an.

b) Die Bedingung `j >= 0` schützt den Zugriff `pWerte[j]`. Wandert das Einfügeelement bis ganz nach vorne, wird `j` irgendwann -1 – und `pWerte[-1]` gäbe einen Laufzeitfehler.

Java wertet `&&` **von links nach rechts** aus und hört auf, sobald das Ergebnis feststeht. Ist `j >= 0` falsch, wird `pWerte[j] > merker` **gar nicht mehr ausgewertet**. Das nennt man **Kurzschlussauswertung**.

Vertauscht man die beiden Teile, wird zuerst `pWerte[-1]` ausgewertet – und das Programm stürzt ab. Probiere es aus.

::::

:::snippet{#merken}
**Kurzschlussauswertung:** Bei `a && b` wird `b` nur ausgewertet, wenn `a` wahr ist. Bei `a || b` nur, wenn `a` falsch ist.

Das ist nicht nur eine Optimierung, sondern ein Werkzeug: Man stellt die Prüfung, die den Zugriff absichert, **nach vorne**.
:::

## Der beste Fall

:::snippet{#aufgabe}
a) Wie viele Verschiebungen macht das Verfahren bei einem **bereits sortierten** Feld?

b) Wie viele bei einem **rückwärts sortierten**?

c) Vergleiche mit den beiden anderen Verfahren. Welches ist bei fast sortierten Daten am besten?
:::

::::collapsible{title="Auflösung"}

a) **Keine.** Bei jedem `i` ist `pWerte[j] > merker` sofort falsch, die innere Schleife läuft null Mal. Es bleiben nur die n − 1 Vergleiche der äußeren Schleife. Das ist **linearer** Aufwand.

b) Jedes Element muss durch den ganzen sortierten Teil wandern: 1 + 2 + … + (n − 1) Verschiebungen, also wieder n·(n−1)/2. Quadratisch.

c) Bei fast sortierten Daten sind **Sortieren durch Einfügen** und **Bubblesort** beide gut, Sortieren durch Auswählen nicht – letzteres macht immer gleich viele Vergleiche, ganz gleich wie die Daten liegen.

In der Praxis wird Sortieren durch Einfügen tatsächlich noch eingesetzt: Viele professionelle Sortierbibliotheken schalten für kleine oder fast sortierte Teilstücke darauf um.

::::

## Aufgabe: Selbst implementieren

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden.
:::

:::onlineide{height="660px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Einfuegen.java
public class Einfuegen {

    /**
     * Fügt pWert an der richtigen Stelle in den bereits sortierten
     * Bereich von Index 0 bis pBis ein. Alle größeren Werte rücken
     * dabei eine Position nach rechts.
     * Der Bereich von 0 bis pBis + 1 muss im Feld vorhanden sein.
     */
    public void fuegeEin(int[] pWerte, int pBis, int pWert) {
        // ergänze diese Methode
    }

    /** Sortiert das Feld aufsteigend durch Einfügen. */
    public void sortiere(int[] pWerte) {
        // ergänze diese Methode
    }

    /**
     * Sortiert das Feld und liefert die Anzahl der durchgeführten
     * Verschiebungen zurück.
     */
    public int sortiereUndZaehle(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }
}
```

```java EinfuegenTest.java
@Test
class EinfuegenTest {

    @Test
    void testFuegeEin() {
        Einfuegen e = new Einfuegen();

        int[] w = {2, 5, 9, 0};
        e.fuegeEin(w, 2, 4);
        assertEquals(2, w[0], "Die 2 bleibt vorne.");
        assertEquals(4, w[1], "Die 4 kommt an die zweite Stelle.");
        assertEquals(5, w[2], "Die 5 rückt nach rechts.");
        assertEquals(9, w[3], "Die 9 auch.");
    }

    @Test
    void testFuegeGanzVorneEin() {
        Einfuegen e = new Einfuegen();

        int[] w = {2, 5, 0};
        e.fuegeEin(w, 1, 1);
        assertEquals(1, w[0], "Die 1 kommt ganz nach vorne.");
        assertEquals(2, w[1], "Die 2 rückt nach rechts.");
        assertEquals(5, w[2], "Die 5 auch.");
    }

    @Test
    void testSortiere() {
        Einfuegen e = new Einfuegen();
        int[] w = {5, 2, 4, 1, 8};
        e.sortiere(w);
        assertEquals(1, w[0], "Vorne steht die 1.");
        assertEquals(2, w[1], "Dann die 2.");
        assertEquals(4, w[2], "Dann die 4.");
        assertEquals(5, w[3], "Dann die 5.");
        assertEquals(8, w[4], "Hinten steht die 8.");
    }

    @Test
    void testSonderfaelle() {
        Einfuegen e = new Einfuegen();

        int[] leer = {};
        e.sortiere(leer);
        assertEquals(0, leer.length, "Das leere Feld bleibt leer.");

        int[] eins = {7};
        e.sortiere(eins);
        assertEquals(7, eins[0], "Ein einzelner Wert bleibt stehen.");

        int[] gleich = {4, 4, 4};
        e.sortiere(gleich);
        assertEquals(4, gleich[1], "Lauter gleiche Werte bleiben gleich.");
    }

    @Test
    void testBesterFall() {
        Einfuegen e = new Einfuegen();
        int[] sortiert = {1, 2, 3, 4, 5};
        assertEquals(0, e.sortiereUndZaehle(sortiert),
                     "Bei sortierten Daten sind keine Verschiebungen nötig.");
    }

    @Test
    void testSchlechtesterFall() {
        Einfuegen e = new Einfuegen();
        int[] rueckwaerts = {5, 4, 3, 2, 1};
        assertEquals(10, e.sortiereUndZaehle(rueckwaerts),
                     "Rückwärts sortiert sind es 1 plus 2 plus 3 plus 4 Verschiebungen.");
        assertEquals(1, rueckwaerts[0], "Sortiert ist es trotzdem.");
    }
}
```

:::

::::collapsible{title="Tipp 1: fuegeEin"}

Fang bei `pBis` an und wandere nach links, solange dort ein Wert steht, der größer als `pWert` ist. Schiebe ihn jeweils eine Stelle nach rechts.

Denk an die Absicherung `j >= 0` **vor** dem Vergleich.

::::

::::collapsible{title="Tipp 2: sortiere mit fuegeEin"}

```java
for (int i = 1; i < pWerte.length; i++) {
    fuegeEin(pWerte, i - 1, pWerte[i]);
}
```

Der einzufügende Wert ist `pWerte[i]`, der sortierte Bereich reicht bis `i - 1`.

::::

::::collapsible{title="Tipp 3: Verschiebungen zählen"}

Für `sortiereUndZaehle` brauchst du die Schleife noch einmal ausgeschrieben – oder du gibst aus `fuegeEin` die Anzahl der Verschiebungen zurück und summierst sie auf. Der zweite Weg ist der schönere.

::::

:::protect{password="java-ef-7-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Einfuegen.java
public class Einfuegen {

    public void fuegeEin(int[] pWerte, int pBis, int pWert) {
        int j = pBis;
        while (j >= 0 && pWerte[j] > pWert) {
            pWerte[j + 1] = pWerte[j];
            j--;
        }
        pWerte[j + 1] = pWert;
    }

    public void sortiere(int[] pWerte) {
        sortiereUndZaehle(pWerte);
    }

    public int sortiereUndZaehle(int[] pWerte) {
        int verschiebungen = 0;

        for (int i = 1; i < pWerte.length; i++) {
            int merker = pWerte[i];
            int j = i - 1;

            while (j >= 0 && pWerte[j] > merker) {
                pWerte[j + 1] = pWerte[j];
                j--;
                verschiebungen++;
            }

            pWerte[j + 1] = merker;
        }
        return verschiebungen;
    }
}
```

:::

## Die drei Verfahren im Überblick

:::snippet{#merken}
| | Auswählen | Bubblesort | Einfügen |
| --- | --- | --- | --- |
| Vergleiche, bester Fall | n·(n−1)/2 | n − 1 | n − 1 |
| Vergleiche, schlechtester Fall | n·(n−1)/2 | n·(n−1)/2 | n·(n−1)/2 |
| Vertauschungen bzw. Verschiebungen, schlechtester Fall | n − 1 | n·(n−1)/2 | n·(n−1)/2 |
| erkennt sortierte Daten | nein | ja | ja |
| Grundidee | Minimum suchen und nach vorne tauschen | Nachbarn tauschen | an die richtige Stelle einfügen |

Alle drei sind im schlechtesten Fall **quadratisch**. Verfahren, die deutlich besser sind, lernst du im Lernpfad *Erweiterungen* kennen – sie brauchen dafür eine neue Problemlösestrategie.
:::

## Zusatzaufgabe

:::snippet{#brain}
Bei den drei Verfahren wurde immer aufsteigend sortiert. Was müsstest du jeweils ändern, um **absteigend** zu sortieren?

a) Ändere alle drei Verfahren entsprechend.

b) Wie wenige Zeichen musst du bei jedem Verfahren ändern? Bei welchem am wenigsten?

c) Schlage vor, wie man ein Verfahren so schreiben könnte, dass es die Sortierrichtung als Parameter bekommt.
:::

---

## Selbsttest

::::multievent

**1. Welches Verfahren entspricht dem, wie die meisten Menschen Spielkarten sortieren?**

{r1{Sortieren durch Auswählen}}

{r1{Bubblesort}}

{r1{!Sortieren durch Einfügen}}

{h{Man nimmt eine Karte auf und schiebt sie zwischen die schon sortierten.}}
{H{Richtig!}}

**2. Warum beginnt die äußere Schleife beim Einfügen bei 1 und nicht bei 0?**

{r2{weil Index 0 nicht existiert}}

{r2{!weil ein einzelnes Element schon sortiert ist}}

{r2{um einen Zaunpfahlfehler zu vermeiden}}

{h{Der sortierte Bereich besteht am Anfang aus genau einem Element.}}
{H{Richtig!}}

**3. Was bewirkt die Kurzschlussauswertung bei einer Und-Verknüpfung?**

{r3{beide Teile werden immer ausgewertet}}

{r3{!der zweite Teil wird nur ausgewertet, wenn der erste wahr ist}}

{r3{der zweite Teil wird zuerst ausgewertet}}

{h{Deshalb kann man die Absicherung nach vorne stellen.}}
{H{Richtig! Ohne sie gäbe es beim Zugriff auf Index minus 1 einen Absturz.}}

**4. Wie viele Verschiebungen macht das Verfahren bei einem bereits sortierten Feld?**

{z{0}}

{h{Die innere Schleife läuft dann gar nicht.}}
{H{Richtig! Das ist der beste Fall und nur linear aufwendig.}}

**5. Welche Verfahren erkennen, dass ein Feld bereits sortiert ist?** (Mehrfachauswahl)

{c1{!Bubblesort mit Abbruchbedingung}}

{c1{!Sortieren durch Einfügen}}

{c1{Sortieren durch Auswählen}}

{h{Eines der drei macht immer gleich viele Vergleiche, egal wie die Daten liegen.}}
{H{Richtig!}}

::::
