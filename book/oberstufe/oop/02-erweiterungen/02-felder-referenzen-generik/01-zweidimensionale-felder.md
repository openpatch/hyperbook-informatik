---
title: Zweidimensionale Felder
index: 1
---

# Zweidimensionale Felder

Ein Spielbrett, eine Tabelle, ein Bild aus Bildpunkten – all das hat Zeilen **und** Spalten. Dafür braucht man ein Feld, dessen Elemente selbst wieder Felder sind.

<!-- KLP QPh, Daten und ihre Strukturierung: Datenstrukturen - statische Datenstrukturen in Form von ein- und zweidimensionalen Feldern -->

## Anlegen und zugreifen

:::onlineide{height="560px" speed="1000000"}

```java Main.java
void main() {
    int[][] gitter = new int[3][4];

    gitter[0][0] = 5;
    gitter[1][2] = 7;
    gitter[2][3] = 9;

    IO.println("Zeilen:  " + gitter.length);
    IO.println("Spalten: " + gitter[0].length);

    for (int zeile = 0; zeile < gitter.length; zeile++) {
        for (int spalte = 0; spalte < gitter[zeile].length; spalte++) {
            IO.print(gitter[zeile][spalte] + " ");
        }
        IO.println();
    }
}
```

:::

:::snippet{#merken}
| Schreibweise | Bedeutung |
| --- | --- |
| `int[][] gitter` | deklariert ein zweidimensionales Feld |
| `new int[3][4]` | legt **3 Zeilen** mit je **4 Spalten** an |
| `gitter[1][2]` | Zeile 1, Spalte 2 |
| `gitter.length` | Anzahl der **Zeilen** |
| `gitter[0].length` | Anzahl der **Spalten** in Zeile 0 |

**Merke dir die Reihenfolge:** zuerst die Zeile, dann die Spalte. Wer das vertauscht, bekommt entweder falsche Werte oder einen Laufzeitfehler.

Ein zweidimensionales Feld ist in Wirklichkeit ein **Feld von Feldern**. Deshalb ist `gitter[1]` selbst ein `int[]`.
:::

Ein Bild dazu:

```
gitter
  ┌───────────────────────┐
0 │  5 │  0 │  0 │  0     │   ← gitter[0] ist ein int[] der Länge 4
  ├───────────────────────┤
1 │  0 │  0 │  7 │  0     │
  ├───────────────────────┤
2 │  0 │  0 │  0 │  9     │
  └───────────────────────┘
     0    1    2    3
```

## Direkt mit Werten anlegen

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    int[][] brett = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    IO.println("Mitte: " + brett[1][1]);
    IO.println("Rechts unten: " + brett[2][2]);

    int summeHauptdiagonale = 0;
    for (int i = 0; i < brett.length; i++) {
        summeHauptdiagonale = summeHauptdiagonale + brett[i][i];
    }
    IO.println("Summe der Hauptdiagonale: " + summeHauptdiagonale);
}
```

:::

:::snippet{#aufgabe}
Der Zugriff `brett[i][i]` läuft über die Hauptdiagonale.

a) Wie kommst du an die **Gegendiagonale** – also 3, 5, 7?

b) Wie an eine ganze **Spalte**, etwa die mittlere?
:::

::::collapsible{title="Auflösung"}

a) `brett[i][brett.length - 1 - i]`. Läuft `i` von 0 bis 2, läuft der zweite Index von 2 bis 0.

b) Man hält den Spaltenindex fest und lässt den Zeilenindex laufen:

```java
for (int zeile = 0; zeile < brett.length; zeile++) {
    IO.println(brett[zeile][1]);
}
```

Es gibt keine Abkürzung dafür – Java kennt `brett[1]` als ganze **Zeile**, aber nichts Entsprechendes für Spalten.

::::

## Ein Spielbrett

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    char[][] brett = new char[3][3];

    for (int z = 0; z < 3; z++) {
        for (int s = 0; s < 3; s++) {
            brett[z][s] = '.';
        }
    }

    brett[0][0] = 'X';
    brett[1][1] = 'O';
    brett[2][2] = 'X';
    brett[0][2] = 'O';

    zeige(brett);
    IO.println("Gewinner: " + gewinner(brett));
}

/** Gibt das Brett zeilenweise aus. */
void zeige(char[][] pBrett) {
    for (int z = 0; z < pBrett.length; z++) {
        for (int s = 0; s < pBrett[z].length; s++) {
            IO.print(pBrett[z][s] + " ");
        }
        IO.println();
    }
}

/**
 * Prüft alle Zeilen, Spalten und Diagonalen auf drei gleiche Zeichen.
 * @return das Gewinnerzeichen oder ein Punkt, wenn es keinen gibt
 */
char gewinner(char[][] pBrett) {
    for (int i = 0; i < 3; i++) {
        if (pBrett[i][0] != '.' && pBrett[i][0] == pBrett[i][1] && pBrett[i][1] == pBrett[i][2]) {
            return pBrett[i][0];
        }
        if (pBrett[0][i] != '.' && pBrett[0][i] == pBrett[1][i] && pBrett[1][i] == pBrett[2][i]) {
            return pBrett[0][i];
        }
    }
    if (pBrett[1][1] != '.' && pBrett[0][0] == pBrett[1][1] && pBrett[1][1] == pBrett[2][2]) {
        return pBrett[1][1];
    }
    if (pBrett[1][1] != '.' && pBrett[0][2] == pBrett[1][1] && pBrett[1][1] == pBrett[2][0]) {
        return pBrett[1][1];
    }
    return '.';
}
```

:::

:::snippet{#aufgabe}
Die Methode `gewinner` prüft in **einer** Schleife sowohl Zeilen als auch Spalten.

a) Erkläre, wie das funktioniert – wofür steht `i` in der einen und in der anderen Prüfung?

b) Warum steht überall zusätzlich die Bedingung mit dem Punkt?

c) Warum steht bei den Diagonalen `pBrett[1][1] != '.'` und nicht `pBrett[0][0] != '.'`?
:::

::::collapsible{title="Auflösung"}

a) Bei `pBrett[i][0]` ist `i` der **Zeilenindex** – die Prüfung läuft waagerecht. Bei `pBrett[0][i]` ist `i` der **Spaltenindex** – die Prüfung läuft senkrecht. Beide Male läuft dieselbe Zählvariable von 0 bis 2.

b) Ohne sie wären drei leere Felder ein Gewinn: `'.' == '.' == '.'` ist wahr. Man muss also ausschließen, dass das geprüfte Feld leer ist.

c) Beide Diagonalen laufen durch die Mitte. Ist die Mitte leer, kann keine Diagonale voll sein – ein Test statt zwei.

::::

## Aufgabe 1: Rechnen im Gitter

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden.
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Gitter.java
public class Gitter {

    /** Liefert die Summe aller Werte. */
    public int summe(int[][] pGitter) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert die Summe der Werte in der angegebenen Zeile. */
    public int zeilensumme(int[][] pGitter, int pZeile) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert die Summe der Werte in der angegebenen Spalte. */
    public int spaltensumme(int[][] pGitter, int pSpalte) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert den größten Wert. Das Gitter ist nie leer. */
    public int maximum(int[][] pGitter) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert ein neues Gitter, bei dem Zeilen und Spalten
     * vertauscht sind. Aus 2 mal 3 wird also 3 mal 2.
     */
    public int[][] transponiert(int[][] pGitter) {
        return new int[0][0]; // ersetze diese Zeile
    }
}
```

```java GitterTest.java
@Test
class GitterTest {

    @Test
    void testSumme() {
        Gitter g = new Gitter();
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        assertEquals(21, g.summe(a), "Die Summe von 1 bis 6 ist 21.");
        assertEquals(0, g.summe(new int[2][3]), "Ein neues Gitter enthält lauter Nullen.");
    }

    @Test
    void testZeilensumme() {
        Gitter g = new Gitter();
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        assertEquals(6, g.zeilensumme(a, 0), "Die erste Zeile ergibt 6.");
        assertEquals(15, g.zeilensumme(a, 1), "Die zweite Zeile ergibt 15.");
    }

    @Test
    void testSpaltensumme() {
        Gitter g = new Gitter();
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        assertEquals(5, g.spaltensumme(a, 0), "Die erste Spalte ergibt 5.");
        assertEquals(9, g.spaltensumme(a, 2), "Die dritte Spalte ergibt 9.");
    }

    @Test
    void testMaximum() {
        Gitter g = new Gitter();
        assertEquals(9, g.maximum(new int[][]{{1, 9}, {4, 5}}), "Das Maximum ist 9.");
        assertEquals(-3, g.maximum(new int[][]{{-5, -9}, {-4, -3}}), "Auch bei negativen Werten.");
        assertEquals(7, g.maximum(new int[][]{{7}}), "Bei einem einzigen Wert ist dieser das Maximum.");
    }

    @Test
    void testTransponiert() {
        Gitter g = new Gitter();
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        int[][] t = g.transponiert(a);

        assertEquals(3, t.length, "Das Ergebnis hat 3 Zeilen.");
        assertEquals(2, t[0].length, "Und 2 Spalten.");
        assertEquals(1, t[0][0], "Oben links bleibt die 1.");
        assertEquals(4, t[0][1], "Rechts daneben steht jetzt die 4.");
        assertEquals(2, t[1][0], "Darunter die 2.");
        assertEquals(6, t[2][1], "Unten rechts die 6.");
        assertEquals(2, a[0][1], "Das ursprüngliche Gitter bleibt unverändert.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Die Grundschleife"}

```java
for (int z = 0; z < pGitter.length; z++) {
    for (int s = 0; s < pGitter[z].length; s++) {
        // hier steht pGitter[z][s] zur Verfügung
    }
}
```

Beachte `pGitter[z].length` statt `pGitter[0].length` – so funktioniert es auch, wenn die Zeilen unterschiedlich lang sind.

::::

::::collapsible{title="Tipp 2: transponiert"}

Das neue Gitter hat so viele Zeilen, wie das alte Spalten hat – und umgekehrt:

```java
int[][] neu = new int[pGitter[0].length][pGitter.length];
```

Und beim Kopieren gilt `neu[s][z] = pGitter[z][s]`. Die beiden Indizes tauschen die Plätze.

::::

:::protect{password="java-q-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Gitter.java
public class Gitter {

    public int summe(int[][] pGitter) {
        int summe = 0;
        for (int z = 0; z < pGitter.length; z++) {
            for (int s = 0; s < pGitter[z].length; s++) {
                summe = summe + pGitter[z][s];
            }
        }
        return summe;
    }

    public int zeilensumme(int[][] pGitter, int pZeile) {
        int summe = 0;
        for (int s = 0; s < pGitter[pZeile].length; s++) {
            summe = summe + pGitter[pZeile][s];
        }
        return summe;
    }

    public int spaltensumme(int[][] pGitter, int pSpalte) {
        int summe = 0;
        for (int z = 0; z < pGitter.length; z++) {
            summe = summe + pGitter[z][pSpalte];
        }
        return summe;
    }

    public int maximum(int[][] pGitter) {
        int groesstes = pGitter[0][0];
        for (int z = 0; z < pGitter.length; z++) {
            for (int s = 0; s < pGitter[z].length; s++) {
                if (pGitter[z][s] > groesstes) {
                    groesstes = pGitter[z][s];
                }
            }
        }
        return groesstes;
    }

    public int[][] transponiert(int[][] pGitter) {
        int[][] neu = new int[pGitter[0].length][pGitter.length];
        for (int z = 0; z < pGitter.length; z++) {
            for (int s = 0; s < pGitter[z].length; s++) {
                neu[s][z] = pGitter[z][s];
            }
        }
        return neu;
    }
}
```

Beachte den Unterschied zwischen `zeilensumme` und `spaltensumme`: Bei der Zeile läuft der **zweite** Index, bei der Spalte der **erste**. Beide brauchen nur eine Schleife.

:::

## Aufgabe 2: Ein Labyrinth

:::snippet{#aufgabe}
Ein Labyrinth lässt sich als zweidimensionales Feld von Zeichen darstellen: `#` ist eine Wand, `.` ist frei, `S` der Start und `Z` das Ziel.

Zeichne es mit Scratch for Java auf die Bühne.

a) Zeichne jede Zelle als Punkt: Wände dunkel, freie Felder hell, Start grün, Ziel rot.

b) Berechne die Bildschirmkoordinate aus Zeile und Spalte. Achte darauf, dass die y-Achse **nach oben** zeigt, die Zeilennummern aber nach unten wachsen.
:::

:::onlineide{libraries="scratch" height="640px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        char[][] plan = {
            {'#', '#', '#', '#', '#', '#', '#', '#'},
            {'#', 'S', '.', '.', '#', '.', '.', '#'},
            {'#', '#', '#', '.', '#', '.', '#', '#'},
            {'#', '.', '.', '.', '.', '.', '.', '#'},
            {'#', '.', '#', '#', '#', '#', '.', '#'},
            {'#', '.', '.', '.', '.', '.', 'Z', '#'},
            {'#', '#', '#', '#', '#', '#', '#', '#'}
        };

        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(34);

        // Dein Code hier

    }
}
```

:::

::::collapsible{title="Tipp: Die Umrechnung"}

Bei einer Zellgröße von 36 Pixeln und dem Plan in der Bühnenmitte:

```java
int x = -130 + spalte * 36;
int y = 110 - zeile * 36;
```

Das **Minus** vor `zeile` ist der Kern: Zeile 0 soll oben liegen, y-Werte werden nach unten aber kleiner.

::::

:::protect{password="java-q-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        char[][] plan = {
            {'#', '#', '#', '#', '#', '#', '#', '#'},
            {'#', 'S', '.', '.', '#', '.', '.', '#'},
            {'#', '#', '#', '.', '#', '.', '#', '#'},
            {'#', '.', '.', '.', '.', '.', '.', '#'},
            {'#', '.', '#', '#', '#', '#', '.', '#'},
            {'#', '.', '.', '.', '.', '.', 'Z', '#'},
            {'#', '#', '#', '#', '#', '#', '#', '#'}
        };

        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(34);

        for (int zeile = 0; zeile < plan.length; zeile++) {
            for (int spalte = 0; spalte < plan[zeile].length; spalte++) {
                char z = plan[zeile][spalte];

                if (z == '#') {
                    stift.setColor(60, 60, 70);
                } else if (z == 'S') {
                    stift.setColor(40, 180, 60);
                } else if (z == 'Z') {
                    stift.setColor(210, 50, 50);
                } else {
                    stift.setColor(230, 230, 235);
                }

                stift.setPosition(-130 + spalte * 36, 110 - zeile * 36);
                stift.down();
                stift.up();
            }
        }
    }
}
```

Dieses Labyrinth brauchst du im Kapitel über Backtracking wieder – dort suchst du einen Weg vom Start zum Ziel.

:::

## Zusatzaufgabe

:::snippet{#brain}
Java erlaubt Felder mit **unterschiedlich langen Zeilen**:

```java
int[][] dreieck = new int[4][];
dreieck[0] = new int[1];
dreieck[1] = new int[2];
dreieck[2] = new int[3];
dreieck[3] = new int[4];
```

a) Erzeuge damit das **pascalsche Dreieck** bis zur zehnten Zeile. Jeder Wert ist die Summe der beiden darüber; die Ränder sind 1.

b) Gib es zentriert aus.

c) Erkläre, warum in diesem Fall die Bedingung `s < pGitter[z].length` unverzichtbar ist und `s < pGitter[0].length` das Programm zum Absturz bringen würde.
:::

---

## Selbsttest

::::multievent

**1. Was steht bei einem zweidimensionalen Feld an erster Stelle in den eckigen Klammern?**

{r1{die Spalte}}

{r1{!die Zeile}}

{r1{das ist beliebig}}

{h{Zuerst wählt man die Zeile aus, dann darin die Spalte.}}
{H{Richtig!}}

**2. Was liefert length bei einem zweidimensionalen Feld?**

{r2{die Gesamtzahl aller Werte}}

{r2{!die Anzahl der Zeilen}}

{r2{die Anzahl der Spalten}}

{h{Ein zweidimensionales Feld ist ein Feld von Feldern.}}
{H{Richtig! Die Spaltenzahl bekommt man über die Länge einer Zeile.}}

**3. Wie viele Schleifen braucht die Summe einer einzelnen Spalte?**

{z{1}}

{h{Der Spaltenindex steht ja fest.}}
{H{Richtig! Nur der Zeilenindex muss laufen.}}

**4. Warum schreibt man in der inneren Schleife besser die Länge der aktuellen Zeile?**

{r3{weil es kürzer ist}}

{r3{!weil die Zeilen unterschiedlich lang sein dürfen}}

{r3{weil Java das verlangt}}

{h{Denk an das pascalsche Dreieck.}}
{H{Richtig!}}

**5. Welche Aussagen zum Transponieren stimmen?** (Mehrfachauswahl)

{c1{!Aus 2 mal 3 wird 3 mal 2.}}

{c1{!Beim Kopieren tauschen die beiden Indizes die Plätze.}}

{c1{!Das ursprüngliche Feld bleibt unverändert.}}

{c1{Es funktioniert nur bei quadratischen Feldern.}}

{h{Genau bei nicht-quadratischen ändert sich ja die Form.}}
{H{Richtig!}}

::::
