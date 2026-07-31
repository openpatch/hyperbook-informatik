---
title: Backtracking
index: 3
keywords:
  - java
  - qphase
  - lk
---

# Backtracking

:::alert{info}
**Nur Leistungskurs.** Diese Lektion gehört zu den zusätzlichen Anforderungen des Leistungskurses. Im Grundkurs kannst du sie überspringen.
:::

<!-- KLP QPh LK, Algorithmen: Problemlösestrategien - Modularisierung, Teilen und Herrschen, Backtracking -->

## Die Idee

Manche Probleme lassen sich nicht ausrechnen, sondern nur **ausprobieren**. Ein Labyrinth zum Beispiel: Man weiß an einer Kreuzung nicht, welcher Weg zum Ziel führt. Also probiert man einen – und wenn er in eine Sackgasse führt, geht man zurück und nimmt den nächsten.

:::snippet{#definition}
**Backtracking** ist eine systematische Suche durch alle Möglichkeiten:

1. Triff eine Entscheidung und merke sie dir.
2. Versuche rekursiv, von dort aus weiterzukommen.
3. Führt das zum Ziel: fertig.
4. Führt es nicht zum Ziel: **nimm die Entscheidung zurück** und probiere die nächste Möglichkeit.

Sind alle Möglichkeiten erschöpft, gibt es von hier aus keine Lösung.
:::

Der entscheidende Schritt ist Nummer 4 – das **Zurücknehmen**. Er gibt der Strategie ihren Namen.

## Das Labyrinth

Das Labyrinth aus dem Kapitel über zweidimensionale Felder – jetzt suchen wir einen Weg hindurch.

:::onlineide{libraries="scratch" height="720px" speed="1000000"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    private char[][] plan = {
        {'#', '#', '#', '#', '#', '#', '#', '#'},
        {'#', 'S', '.', '.', '#', '.', '.', '#'},
        {'#', '#', '#', '.', '#', '.', '#', '#'},
        {'#', '.', '.', '.', '.', '.', '.', '#'},
        {'#', '.', '#', '#', '#', '#', '.', '#'},
        {'#', '.', '.', '.', '.', '.', 'Z', '#'},
        {'#', '#', '#', '#', '#', '#', '#', '#'}
    };

    public Buehne() {
        boolean gefunden = suche(1, 1);
        IO.println(gefunden ? "Weg gefunden." : "Kein Weg vorhanden.");
        zeichne();
    }

    /**
     * Sucht rekursiv einen Weg von der angegebenen Zelle zum Ziel.
     * Gefundene Wegzellen werden mit einem Pluszeichen markiert.
     * @return true, wenn von hier aus ein Weg zum Ziel führt
     */
    private boolean suche(int pZeile, int pSpalte) {
        // außerhalb des Plans
        if (pZeile < 0 || pZeile >= plan.length
                || pSpalte < 0 || pSpalte >= plan[pZeile].length) {
            return false;
        }

        char feld = plan[pZeile][pSpalte];

        if (feld == 'Z') {
            return true;
        }
        // Wand, schon besucht oder Sackgasse
        if (feld != '.' && feld != 'S') {
            return false;
        }

        // Entscheidung treffen: diese Zelle gehört zum Weg
        plan[pZeile][pSpalte] = '+';

        if (suche(pZeile - 1, pSpalte)
                || suche(pZeile + 1, pSpalte)
                || suche(pZeile, pSpalte - 1)
                || suche(pZeile, pSpalte + 1)) {
            return true;
        }

        // Entscheidung zurücknehmen: die Zelle war eine Sackgasse
        plan[pZeile][pSpalte] = 'x';
        return false;
    }

    /** Zeichnet den Plan mit dem gefundenen Weg. */
    private void zeichne() {
        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(34);

        for (int zeile = 0; zeile < plan.length; zeile++) {
            for (int spalte = 0; spalte < plan[zeile].length; spalte++) {
                char z = plan[zeile][spalte];

                if (z == '#') {
                    stift.setColor(60, 60, 70);
                } else if (z == '+') {
                    stift.setColor(60, 170, 220);
                } else if (z == 'x') {
                    stift.setColor(240, 200, 200);
                } else if (z == 'Z') {
                    stift.setColor(210, 50, 50);
                } else {
                    stift.setColor(235, 235, 240);
                }

                stift.setPosition(-130 + spalte * 36, 110 - zeile * 36);
                stift.down();
                stift.up();
            }
        }
    }
}
```

:::

:::snippet{#aufgabe}
a) Blaue Zellen gehören zum gefundenen Weg, rosa Zellen wurden ausprobiert und wieder verworfen. Finde beide im Bild.

b) Zeige im Quelltext, wo die Entscheidung getroffen und wo sie zurückgenommen wird.

c) Warum ist es wichtig, dass die vier rekursiven Aufrufe mit `||` verknüpft sind und nicht einzeln aufgerufen werden?
:::

::::collapsible{title="Auflösung"}

a) Der Weg vom Start unten links durch das Labyrinth ist blau. Die Abzweigungen, die in Sackgassen führten, sind rosa.

b) Die Entscheidung ist `plan[pZeile][pSpalte] = '+';` **vor** den rekursiven Aufrufen. Die Rücknahme ist `plan[pZeile][pSpalte] = 'x';` **danach** – sie wird nur erreicht, wenn keiner der vier Wege zum Ziel führte.

c) Wegen der **Kurzschlussauswertung**: Sobald einer der Aufrufe `true` liefert, werden die übrigen gar nicht mehr ausgeführt. Der erste gefundene Weg beendet die Suche.

Würde man sie einzeln aufrufen, liefe die Suche weiter, obwohl das Ziel längst erreicht ist – und würde den gefundenen Weg womöglich wieder überschreiben.

::::

:::snippet{#merken}
Das Markieren mit `'+'` erfüllt zwei Aufgaben gleichzeitig:

1. Es merkt sich den Weg.
2. Es verhindert, dass die Suche im Kreis läuft – eine bereits betretene Zelle ist kein `'.'` mehr und wird beim nächsten Besuch abgewiesen.

Ohne diese Markierung liefe die Rekursion sofort endlos: von A nach B, von B zurück nach A, von A nach B …
:::

## Das Muster

:::snippet{#merken}
Jedes Backtracking-Verfahren hat dieselbe Form:

```
boolean loese(Zustand):
    wenn Zustand ist eine Lösung:
        gib true zurück
    wenn Zustand ist ungültig:
        gib false zurück

    für jede mögliche Entscheidung:
        treffe die Entscheidung
        wenn loese(neuer Zustand):
            gib true zurück
        nimm die Entscheidung zurück

    gib false zurück
```

Du musst also nur drei Dinge festlegen:

- Wann ist ein Zustand eine **Lösung**?
- Wann ist er **ungültig**?
- Welche **Entscheidungen** gibt es von hier aus?
:::

## Aufgabe 1: Das Acht-Damen-Problem

:::snippet{#aufgabe}
Auf einem Schachbrett sollen acht Damen so stehen, dass keine eine andere bedroht. Eine Dame bedroht alles in ihrer Zeile, Spalte und auf beiden Diagonalen.

a) Überlege zuerst: Warum kann in jeder Spalte **genau eine** Dame stehen? Was vereinfacht das?

b) Beantworte die drei Fragen des Musters: Was ist eine Lösung, was ist ungültig, welche Entscheidungen gibt es?

c) Setze es um, sodass die Tests grün werden.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Damen.java
/**
 * Löst das n-Damen-Problem mit Backtracking.
 * Die Stellung wird als Feld gespeichert: stellung[s] ist die Zeile
 * der Dame in Spalte s, oder -1 wenn dort noch keine steht.
 */
public class Damen {

    private int groesse;
    private int[] stellung;

    public Damen(int pGroesse) {
        groesse = pGroesse;
        stellung = new int[pGroesse];
        for (int i = 0; i < pGroesse; i++) {
            stellung[i] = -1;
        }
    }

    public int[] getStellung() {
        return stellung;
    }

    /**
     * Prüft, ob eine Dame in Zeile pZeile und Spalte pSpalte gesetzt
     * werden darf, ohne von einer bereits gesetzten bedroht zu werden.
     * Es stehen nur Damen in den Spalten links von pSpalte.
     */
    public boolean istSicher(int pZeile, int pSpalte) {
        return false; // ersetze diese Zeile
    }

    /**
     * Versucht, ab Spalte pSpalte alle übrigen Damen zu setzen.
     * @return true, wenn eine vollständige Lösung gefunden wurde
     */
    public boolean loese(int pSpalte) {
        return false; // ersetze diese Zeile
    }

    /** Startet die Suche. */
    public boolean loese() {
        return loese(0);
    }
}
```

```java DamenTest.java
@Test
class DamenTest {

    @Test
    void testSicherAufLeeremBrett() {
        Damen d = new Damen(8);
        assertTrue(d.istSicher(0, 0), "Auf dem leeren Brett ist alles sicher.");
        assertTrue(d.istSicher(4, 3), "Auch in der Mitte.");
    }

    @Test
    void testSicherErkenntZeile() {
        Damen d = new Damen(8);
        d.getStellung()[0] = 3;
        assertFalse(d.istSicher(3, 1), "Dieselbe Zeile ist nicht sicher.");
        assertTrue(d.istSicher(5, 1), "Eine andere Zeile schon.");
    }

    @Test
    void testSicherErkenntDiagonalen() {
        Damen d = new Damen(8);
        d.getStellung()[0] = 3;
        assertFalse(d.istSicher(4, 1), "Die eine Diagonale ist nicht sicher.");
        assertFalse(d.istSicher(2, 1), "Die andere auch nicht.");
        assertFalse(d.istSicher(5, 2), "Auch über zwei Spalten hinweg.");
        assertTrue(d.istSicher(6, 1), "Weiter weg ist es wieder sicher.");
    }

    @Test
    void testLoesungAchtDamen() {
        Damen d = new Damen(8);
        assertTrue(d.loese(), "Für acht Damen gibt es eine Lösung.");

        int[] s = d.getStellung();
        for (int spalte = 0; spalte < 8; spalte++) {
            assertTrue(s[spalte] >= 0, "In jeder Spalte steht eine Dame.");
            assertTrue(s[spalte] < 8, "Und zwar auf dem Brett.");
        }
    }

    @Test
    void testKeineLoesungBeiDrei() {
        Damen d = new Damen(3);
        assertFalse(d.loese(), "Für drei Damen auf 3 mal 3 gibt es keine Lösung.");
    }

    @Test
    void testLoesungBeiVier() {
        Damen d = new Damen(4);
        assertTrue(d.loese(), "Für vier Damen gibt es eine Lösung.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Warum eine Dame pro Spalte?"}

Weil zwei Damen in derselben Spalte einander sofort bedrohen. Bei n Damen auf einem n-mal-n-Brett muss also in **jeder** Spalte genau eine stehen.

Das vereinfacht die Suche enorm: Statt jedes Feld einzeln zu betrachten, geht man Spalte für Spalte vor und probiert dort nur die n möglichen Zeilen.

::::

::::collapsible{title="Tipp 2: istSicher"}

Prüfe alle bereits besetzten Spalten links von `pSpalte`:

```java
for (int s = 0; s < pSpalte; s++) {
    int z = stellung[s];
    if (z == pZeile) {
        return false;                      // gleiche Zeile
    }
    if (Math.abs(z - pZeile) == pSpalte - s) {
        return false;                      // gleiche Diagonale
    }
}
return true;
```

Der Diagonaltest ist der Kern: Zwei Felder liegen genau dann auf einer Diagonalen, wenn ihr Zeilenabstand so groß ist wie ihr Spaltenabstand.

::::

::::collapsible{title="Tipp 3: loese"}

```java
if (pSpalte == groesse) {
    return true;                   // alle Damen gesetzt
}

for (int zeile = 0; zeile < groesse; zeile++) {
    if (istSicher(zeile, pSpalte)) {
        stellung[pSpalte] = zeile;         // Entscheidung
        if (loese(pSpalte + 1)) {
            return true;
        }
        stellung[pSpalte] = -1;            // Rücknahme
    }
}
return false;
```

::::

:::protect{password="java-q-3-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Damen.java
public boolean istSicher(int pZeile, int pSpalte) {
    for (int s = 0; s < pSpalte; s++) {
        int z = stellung[s];
        if (z == pZeile) {
            return false;
        }
        if (Math.abs(z - pZeile) == pSpalte - s) {
            return false;
        }
    }
    return true;
}

public boolean loese(int pSpalte) {
    if (pSpalte == groesse) {
        return true;
    }

    for (int zeile = 0; zeile < groesse; zeile++) {
        if (istSicher(zeile, pSpalte)) {
            stellung[pSpalte] = zeile;

            if (loese(pSpalte + 1)) {
                return true;
            }

            stellung[pSpalte] = -1;
        }
    }
    return false;
}
```

Beachte die Struktur: **Entscheidung – Rekursion – Rücknahme**. Genau dieses Dreierschema erkennst du in jedem Backtracking-Verfahren wieder.

:::

## Aufgabe 2: Wie viel wird ausprobiert?

:::snippet{#aufgabe}
Wie viele Stellungen müsste man durchprobieren, wenn man **stur alle** Möglichkeiten testete?

a) Bei acht Damen mit einer pro Spalte gibt es 8⁸ mögliche Stellungen. Wie viele sind das?

b) Backtracking probiert weit weniger, weil es Zweige früh abschneidet. Zähle mit, wie oft `istSicher` tatsächlich aufgerufen wird.

c) Beurteile: Ist Backtracking damit ein schnelles Verfahren?
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    for (int n = 4; n <= 10; n++) {
        Damen d = new Damen(n);
        boolean ok = d.loese();
        IO.println(n + " Damen: " + (ok ? "Lösung" : "keine Lösung")
                   + " nach " + d.getPruefungen() + " Prüfungen"
                   + "  (stur wären es " + Math.pow(n, n) + ")");
    }
}
```

```java Damen.java
public class Damen {

    private int groesse;
    private int[] stellung;
    private int pruefungen;

    public Damen(int pGroesse) {
        groesse = pGroesse;
        stellung = new int[pGroesse];
        for (int i = 0; i < pGroesse; i++) {
            stellung[i] = -1;
        }
        pruefungen = 0;
    }

    public int getPruefungen() {
        return pruefungen;
    }

    public boolean istSicher(int pZeile, int pSpalte) {
        pruefungen++;
        for (int s = 0; s < pSpalte; s++) {
            int z = stellung[s];
            if (z == pZeile) {
                return false;
            }
            if (Math.abs(z - pZeile) == pSpalte - s) {
                return false;
            }
        }
        return true;
    }

    public boolean loese(int pSpalte) {
        if (pSpalte == groesse) {
            return true;
        }
        for (int zeile = 0; zeile < groesse; zeile++) {
            if (istSicher(zeile, pSpalte)) {
                stellung[pSpalte] = zeile;
                if (loese(pSpalte + 1)) {
                    return true;
                }
                stellung[pSpalte] = -1;
            }
        }
        return false;
    }

    public boolean loese() {
        return loese(0);
    }
}
```

:::

::::collapsible{title="Auflösung"}

a) 8⁸ = **16 777 216** Stellungen.

b) Backtracking kommt mit einigen hundert Prüfungen aus – etwa ein Zehntausendstel davon.

c) **Nein, schnell ist es nicht.** Im schlechtesten Fall probiert Backtracking tatsächlich alles durch, und der Aufwand ist **exponentiell**. Bei 20 Damen dauert es schon spürbar, bei 30 nicht mehr praktikabel.

Der Gewinn liegt woanders: Backtracking probiert nur die Zweige, die überhaupt noch Aussicht auf Erfolg haben. Es macht ein prinzipiell riesiges Problem für kleine Eingaben lösbar – aber es ändert nichts an der Wachstumsklasse.

Für Probleme, bei denen man **wirklich** alle Möglichkeiten prüfen muss, gibt es kein schnelles Verfahren. Das ist keine Frage besserer Programmierung, sondern eine Eigenschaft des Problems.

::::

## Zusatzaufgabe

:::snippet{#brain}
**Sudoku.** Ein 9-mal-9-Feld ist teilweise gefüllt; leere Felder bekommen Ziffern von 1 bis 9, sodass in jeder Zeile, jeder Spalte und jedem 3-mal-3-Block jede Ziffer genau einmal vorkommt.

a) Beantworte die drei Fragen des Musters.

b) Setze es um. Die Methode `istErlaubt(zeile, spalte, ziffer)` ist der aufwendigste Teil – überlege dir gut, wie du den 3-mal-3-Block bestimmst.

c) Miss, wie lange dein Programm für ein leichtes und für ein schweres Sudoku braucht. Erkläre den Unterschied.

d) Zeige das Ergebnis mit Scratch for Java auf der Bühne an.
:::

---

## Selbsttest

::::multievent

**1. Welcher Schritt gibt dem Backtracking seinen Namen?**

{r1{das Ausprobieren}}

{r1{!das Zurücknehmen einer Entscheidung}}

{r1{die Rekursion}}

{h{Man geht auf dem eigenen Weg zurück.}}
{H{Richtig!}}

**2. Welche drei Fragen muss man für ein Backtracking-Verfahren beantworten?** (Mehrfachauswahl)

{c1{!Wann ist ein Zustand eine Lösung?}}

{c1{!Wann ist ein Zustand ungültig?}}

{c1{!Welche Entscheidungen gibt es von hier aus?}}

{c1{Wie viele Lösungen gibt es insgesamt?}}

{h{Die Anzahl der Lösungen kennt man vorher gerade nicht.}}
{H{Richtig!}}

**3. Warum muss man im Labyrinth besuchte Zellen markieren?**

{r2{um den Weg schöner zu zeichnen}}

{r2{!damit die Suche nicht im Kreis läuft}}

{r2{um Speicher zu sparen}}

{h{Ohne Markierung ginge es von A nach B und von B zurück nach A.}}
{H{Richtig!}}

**4. Welche Wachstumsklasse hat Backtracking im schlechtesten Fall?**

{r3{linear}}

{r3{quadratisch}}

{r3{!exponentiell}}

{h{Im schlechtesten Fall wird tatsächlich alles durchprobiert.}}
{H{Richtig! Es macht das Problem nur für kleine Eingaben handhabbar.}}

**5. Warum stehen die rekursiven Aufrufe im Labyrinth mit Oder verknüpft?**

{r4{weil es kürzer ist}}

{r4{!damit die Suche aufhört, sobald ein Weg gefunden ist}}

{r4{weil Java das verlangt}}

{h{Denk an die Kurzschlussauswertung.}}
{H{Richtig!}}

::::
