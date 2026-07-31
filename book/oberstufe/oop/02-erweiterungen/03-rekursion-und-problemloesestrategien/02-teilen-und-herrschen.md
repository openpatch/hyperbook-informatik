---
title: Teilen und Herrschen
index: 2
---

# Teilen und Herrschen

In der Einführungsphase hast du die gefälschte Goldmünze gesucht. Die naive Lösung wog paarweise, die gute halbierte den Stapel. Aus vier Wägungen wurden drei – und bei 1024 Münzen aus 512 nur zehn.

Dahinter steckt eine der wichtigsten Problemlösestrategien der Informatik.

<!-- KLP QPh, Algorithmen: Problemlösestrategien - Modularisierung, Teilen und Herrschen -->

## Die Strategie

:::snippet{#definition}
**Teilen und Herrschen** (englisch *divide and conquer*) löst ein Problem in drei Schritten:

1. **Teilen:** Zerlege das Problem in kleinere Teilprobleme derselben Art.
2. **Herrschen:** Löse die Teilprobleme – meist rekursiv, bis sie klein genug für eine direkte Lösung sind.
3. **Zusammenfügen:** Setze die Teillösungen zur Gesamtlösung zusammen.
:::

:::snippet{#merken}
Der Unterschied zur **Modularisierung**, die du aus der Einführungsphase kennst:

- Modularisierung zerlegt ein Problem in **verschiedenartige** Teilaufgaben („zeichne den Stamm“, „zeichne die Krone“).
- Teilen und Herrschen zerlegt es in **gleichartige, kleinere** Teilprobleme – deshalb passt Rekursion dazu so gut.
:::

## Die binäre Suche

Das einfachste Beispiel: Suchen in einem **sortierten** Feld.

:::snippet{#aufgabe}
Ein sortiertes Feld enthält die Zahlen `1 3 4 7 9 12 15 18 21 25`.

Gesucht ist die **12**. Gehe **auf Papier** so vor:

1. Schau in die Mitte.
2. Ist der Wert dort größer als der gesuchte, suche links weiter, sonst rechts.
3. Wiederhole.

Wie viele Vergleiche brauchst du? Und wie viele bräuchte die lineare Suche?
:::

::::collapsible{title="Auflösung"}

| Schritt | Bereich | Mitte | Vergleich |
| --- | --- | --- | --- |
| 1 | 0 bis 9 | Index 4, Wert 9 | 9 < 12, also rechts weiter |
| 2 | 5 bis 9 | Index 7, Wert 18 | 18 > 12, also links weiter |
| 3 | 5 bis 6 | Index 5, Wert 12 | gefunden |

**Drei** Vergleiche. Die lineare Suche hätte sechs gebraucht.

Der Unterschied wirkt klein – bei 10 Einträgen ist er das auch. Bei einer Million Einträgen braucht die lineare Suche im Schnitt 500 000 Vergleiche, die binäre **20**.

::::

## Die Umsetzung

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {1, 3, 4, 7, 9, 12, 15, 18, 21, 25};

    IO.println("Suche 12:  Index " + binaereSuche(werte, 12));
    IO.println("Suche 1:   Index " + binaereSuche(werte, 1));
    IO.println("Suche 25:  Index " + binaereSuche(werte, 25));
    IO.println("Suche 13:  Index " + binaereSuche(werte, 13));

    IO.println("");
    IO.println("Mit Protokoll, Suche nach 21:");
    binaereSucheLaut(werte, 21, 0, werte.length - 1);
}

/**
 * Sucht pGesucht in einem aufsteigend sortierten Feld.
 * @return der Index, oder -1 wenn der Wert nicht vorkommt
 */
int binaereSuche(int[] pWerte, int pGesucht) {
    int links = 0;
    int rechts = pWerte.length - 1;

    while (links <= rechts) {
        int mitte = (links + rechts) / 2;

        if (pWerte[mitte] == pGesucht) {
            return mitte;
        }
        if (pWerte[mitte] < pGesucht) {
            links = mitte + 1;
        } else {
            rechts = mitte - 1;
        }
    }
    return -1;
}

/** Dasselbe rekursiv, mit Ausgabe jedes Schritts. */
int binaereSucheLaut(int[] pWerte, int pGesucht, int pLinks, int pRechts) {
    if (pLinks > pRechts) {
        IO.println("  Bereich leer, nicht gefunden");
        return -1;
    }

    int mitte = (pLinks + pRechts) / 2;
    IO.println("  Bereich " + pLinks + " bis " + pRechts
               + ", Mitte " + mitte + " mit Wert " + pWerte[mitte]);

    if (pWerte[mitte] == pGesucht) {
        IO.println("  gefunden an Index " + mitte);
        return mitte;
    }
    if (pWerte[mitte] < pGesucht) {
        return binaereSucheLaut(pWerte, pGesucht, mitte + 1, pRechts);
    }
    return binaereSucheLaut(pWerte, pGesucht, pLinks, mitte - 1);
}
```

:::

:::snippet{#merken}
Die binäre Suche gibt es in beiden Bauformen:

- **iterativ** mit einer `while`-Schleife und zwei Grenzen,
- **rekursiv** mit den Grenzen als Parametern.

Beide machen genau dieselben Vergleiche. Die rekursive Fassung zeigt die Strategie deutlicher, die iterative kommt ohne Aufrufstapel aus.

**Voraussetzung ist immer, dass das Feld sortiert ist.** Ohne diese Voraussetzung liefert das Verfahren falsche Ergebnisse – und zwar lautlos.
:::

## Wie schnell ist das?

:::snippet{#aufgabe}
Bei jedem Schritt halbiert sich der Suchbereich.

a) Wie oft kann man 1000 halbieren, bis nur noch ein Element übrig ist?

b) Wie oft bei einer Million?

c) Welche Wachstumsklasse ist das? Was passiert, wenn sich die Feldgröße verdoppelt?
:::

::::collapsible{title="Auflösung"}

a) 1000 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1. Das sind **10** Schritte.

b) Bei einer Million etwa **20**.

c) Es ist **logarithmisches** Wachstum. Verdoppelt sich die Feldgröße, kommt genau **ein** Schritt dazu.

| n | lineare Suche | binäre Suche |
| --- | --- | --- |
| 1 000 | 1 000 | 10 |
| 1 000 000 | 1 000 000 | 20 |
| 1 000 000 000 | 1 000 000 000 | 30 |

Das ist der dramatischste Unterschied, den du in diesem Lernpfad siehst. Und er kostet nichts außer der Bedingung, dass die Daten sortiert vorliegen.

::::

## Aufgabe 1: Selbst implementieren

:::snippet{#aufgabe}
Ergänze beide Fassungen so, dass alle Tests grün werden.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Suche.java
public class Suche {

    /**
     * Sucht iterativ in einem aufsteigend sortierten Feld.
     * @return der Index, oder -1
     */
    public int iterativ(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Sucht rekursiv im Bereich von pLinks bis pRechts.
     * @return der Index, oder -1
     */
    public int rekursiv(int[] pWerte, int pGesucht, int pLinks, int pRechts) {
        return 0; // ersetze diese Zeile
    }

    /** Bequemer Einstieg in die rekursive Fassung. */
    public int rekursiv(int[] pWerte, int pGesucht) {
        return rekursiv(pWerte, pGesucht, 0, pWerte.length - 1);
    }

    /** Zählt, wie viele Vergleiche die iterative Suche braucht. */
    public int zaehleSchritte(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }
}
```

```java SucheTest.java
@Test
class SucheTest {

    @Test
    void testIterativFindet() {
        Suche s = new Suche();
        int[] w = {1, 3, 4, 7, 9, 12, 15, 18, 21, 25};
        assertEquals(5, s.iterativ(w, 12), "Die 12 steht an Index 5.");
        assertEquals(0, s.iterativ(w, 1), "Die 1 steht ganz vorne.");
        assertEquals(9, s.iterativ(w, 25), "Die 25 steht ganz hinten.");
        assertEquals(4, s.iterativ(w, 9), "Die 9 steht genau in der Mitte.");
    }

    @Test
    void testIterativFindetNicht() {
        Suche s = new Suche();
        int[] w = {1, 3, 4, 7, 9, 12, 15, 18, 21, 25};
        assertEquals(-1, s.iterativ(w, 13), "Die 13 kommt nicht vor.");
        assertEquals(-1, s.iterativ(w, 0), "Die 0 ist kleiner als alles.");
        assertEquals(-1, s.iterativ(w, 99), "Die 99 ist größer als alles.");
        assertEquals(-1, s.iterativ(new int[]{}, 5), "Im leeren Feld ist nichts.");
    }

    @Test
    void testRekursiv() {
        Suche s = new Suche();
        int[] w = {1, 3, 4, 7, 9, 12, 15, 18, 21, 25};
        assertEquals(5, s.rekursiv(w, 12), "Die 12 steht an Index 5.");
        assertEquals(0, s.rekursiv(w, 1), "Die 1 steht ganz vorne.");
        assertEquals(-1, s.rekursiv(w, 13), "Die 13 kommt nicht vor.");
        assertEquals(-1, s.rekursiv(new int[]{}, 5), "Im leeren Feld ist nichts.");
    }

    @Test
    void testEinElement() {
        Suche s = new Suche();
        assertEquals(0, s.iterativ(new int[]{7}, 7), "Der einzige Wert wird gefunden.");
        assertEquals(-1, s.iterativ(new int[]{7}, 8), "Ein anderer nicht.");
        assertEquals(0, s.rekursiv(new int[]{7}, 7), "Auch rekursiv.");
    }

    @Test
    void testSchrittzahl() {
        Suche s = new Suche();
        int[] gross = new int[1024];
        for (int i = 0; i < gross.length; i++) {
            gross[i] = i * 2;
        }
        assertTrue(s.zaehleSchritte(gross, 2046) <= 11,
                   "Bei 1024 Elementen genügen höchstens 11 Vergleiche.");
        assertTrue(s.zaehleSchritte(gross, 1) <= 11,
                   "Auch wenn der Wert gar nicht vorkommt.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Die Mitte"}

`int mitte = (pLinks + pRechts) / 2;`

Bei der Ganzzahldivision fällt der Rest weg – das ist genau richtig, denn ein Index muss ganzzahlig sein.

::::

::::collapsible{title="Tipp 2: Die neuen Grenzen"}

Nach einem Vergleich schließt man die Mitte **mit aus** – sie wurde ja gerade geprüft:

- Ist der Wert in der Mitte zu klein, geht es bei `mitte + 1` weiter.
- Ist er zu groß, geht es bis `mitte - 1`.

Vergisst man das Plus bzw. Minus eins, entsteht eine Endlosschleife.

::::

::::collapsible{title="Tipp 3: Der Abbruch"}

Iterativ: `while (links <= rechts)`. Sobald sich die Grenzen überkreuzen, ist der Bereich leer.

Rekursiv: `if (pLinks > pRechts) return -1;` – das ist der Basisfall.

::::

:::protect{password="java-q-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Suche.java
public class Suche {

    public int iterativ(int[] pWerte, int pGesucht) {
        int links = 0;
        int rechts = pWerte.length - 1;

        while (links <= rechts) {
            int mitte = (links + rechts) / 2;

            if (pWerte[mitte] == pGesucht) {
                return mitte;
            }
            if (pWerte[mitte] < pGesucht) {
                links = mitte + 1;
            } else {
                rechts = mitte - 1;
            }
        }
        return -1;
    }

    public int rekursiv(int[] pWerte, int pGesucht, int pLinks, int pRechts) {
        if (pLinks > pRechts) {
            return -1;
        }

        int mitte = (pLinks + pRechts) / 2;

        if (pWerte[mitte] == pGesucht) {
            return mitte;
        }
        if (pWerte[mitte] < pGesucht) {
            return rekursiv(pWerte, pGesucht, mitte + 1, pRechts);
        }
        return rekursiv(pWerte, pGesucht, pLinks, mitte - 1);
    }

    public int rekursiv(int[] pWerte, int pGesucht) {
        return rekursiv(pWerte, pGesucht, 0, pWerte.length - 1);
    }

    public int zaehleSchritte(int[] pWerte, int pGesucht) {
        int links = 0;
        int rechts = pWerte.length - 1;
        int schritte = 0;

        while (links <= rechts) {
            schritte++;
            int mitte = (links + rechts) / 2;

            if (pWerte[mitte] == pGesucht) {
                return schritte;
            }
            if (pWerte[mitte] < pGesucht) {
                links = mitte + 1;
            } else {
                rechts = mitte - 1;
            }
        }
        return schritte;
    }
}
```

Beim leeren Feld ist `rechts` gleich -1, und die Bedingung `0 <= -1` ist von Anfang an falsch – die Schleife läuft nicht.

:::

## Aufgabe 2: Messen

:::snippet{#aufgabe}
Vergleiche lineare und binäre Suche experimentell.

a) Erzeuge sortierte Felder der Größen 1000, 10 000, 100 000 und 1 000 000.

b) Suche in jedem nach einem Wert, der **nicht** enthalten ist – das ist der schlechteste Fall für beide Verfahren.

c) Trage die Vergleichszahlen in eine Tabelle ein. Wie verhält sich jede der beiden Reihen?

d) Beurteile: Ab welcher Feldgröße lohnt sich der Aufwand, die Daten vorher zu sortieren?
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    IO.println("        n |   linear |    binär");
    IO.println("----------|----------|---------");

    int[] groessen = {1000, 10000, 100000, 1000000};
    for (int i = 0; i < groessen.length; i++) {
        int[] feld = sortiertesFeld(groessen[i]);
        IO.println(groessen[i] + " | " + linearSchritte(feld, -1)
                   + " | " + binaerSchritte(feld, -1));
    }
}

/** Liefert ein sortiertes Feld mit den Werten 0, 2, 4, ... */
int[] sortiertesFeld(int pAnzahl) {
    int[] feld = new int[pAnzahl];
    for (int i = 0; i < pAnzahl; i++) {
        feld[i] = i * 2;
    }
    return feld;
}

int linearSchritte(int[] pWerte, int pGesucht) {
    int schritte = 0;
    for (int i = 0; i < pWerte.length; i++) {
        schritte++;
        if (pWerte[i] == pGesucht) {
            return schritte;
        }
    }
    return schritte;
}

int binaerSchritte(int[] pWerte, int pGesucht) {
    int links = 0;
    int rechts = pWerte.length - 1;
    int schritte = 0;

    while (links <= rechts) {
        schritte++;
        int mitte = (links + rechts) / 2;
        if (pWerte[mitte] == pGesucht) {
            return schritte;
        }
        if (pWerte[mitte] < pGesucht) {
            links = mitte + 1;
        } else {
            rechts = mitte - 1;
        }
    }
    return schritte;
}
```

:::

::::collapsible{title="Auflösung zu c) und d)"}

c) Die lineare Reihe verzehnfacht sich bei jeder Zeile – sie wächst linear mit n. Die binäre Reihe steigt um jeweils etwa 3 bis 4 – sie wächst logarithmisch.

d) Sortieren kostet mit den Verfahren der Einführungsphase quadratischen Aufwand. Für eine **einzige** Suche lohnt sich das nie.

Der Punkt ist: Man sortiert einmal und sucht dann **oft**. Genau so arbeitet jede Datenbank und jedes Telefonbuch. Ab etwa zehn Suchvorgängen in einem größeren Datenbestand rechnet sich das Sortieren – und ab da immer deutlicher.

::::

## Zusatzaufgabe

:::snippet{#brain}
Das Zahlenratespiel aus der Einführungsphase – jetzt umgekehrt: **Du** denkst dir eine Zahl zwischen 1 und 1000, und der Rechner rät.

a) Schreibe das Programm. Nach jedem Rateversuch fragt es, ob die Zahl zu klein, zu groß oder richtig ist.

b) Wie viele Versuche braucht es im schlechtesten Fall? Rechne es vorher aus und prüfe es dann.

c) Was passiert, wenn du zwischendurch schummelst und eine falsche Antwort gibst? Was sollte das Programm dann melden?
:::

---

## Selbsttest

::::multievent

**1. Welche drei Schritte gehören zur Strategie Teilen und Herrschen?** (Mehrfachauswahl)

{c1{!das Problem in gleichartige kleinere Teilprobleme zerlegen}}

{c1{!die Teilprobleme lösen}}

{c1{!die Teillösungen zusammenfügen}}

{c1{die Teilprobleme sortieren}}

{h{Sortieren ist ein Anwendungsfall, kein Bestandteil der Strategie.}}
{H{Richtig!}}

**2. Welche Voraussetzung braucht die binäre Suche?**

{r1{das Feld muss klein sein}}

{r1{!das Feld muss sortiert sein}}

{r1{das Feld darf keine Duplikate enthalten}}

{h{Sonst weiß man nach dem Vergleich nicht, in welcher Hälfte man weitersuchen muss.}}
{H{Richtig! Und ohne diese Voraussetzung liefert sie lautlos falsche Ergebnisse.}}

**3. Wie viele Schritte braucht die binäre Suche bei einer Million Einträgen ungefähr?**

{z{20}}

{h{Zwei hoch 20 ist etwa eine Million.}}
{H{Richtig! Die lineare Suche bräuchte eine Million.}}

**4. Was passiert bei der binären Suche, wenn sich die Feldgröße verdoppelt?**

{r2{der Aufwand verdoppelt sich}}

{r2{!es kommt genau ein Schritt dazu}}

{r2{der Aufwand vervierfacht sich}}

{h{Das ist logarithmisches Wachstum.}}
{H{Richtig!}}

**5. Worin unterscheidet sich Teilen und Herrschen von der Modularisierung?**

{r3{Modularisierung ist rekursiv}}

{r3{!Teilen und Herrschen zerlegt in gleichartige Teilprobleme, Modularisierung in verschiedenartige}}

{r3{es ist dasselbe}}

{h{Deshalb passt Rekursion zur einen Strategie so gut.}}
{H{Richtig!}}

::::
