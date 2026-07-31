---
title: Felder verändern
index: 3
---

# Felder verändern

Bisher hast du Felder nur **gelesen**. Jetzt schreibst du hinein – füllst sie, tauschst Werte, verknüpfst zwei Felder miteinander.

## Ein Feld füllen

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int[] quadrate = new int[10];

    for (int i = 0; i < quadrate.length; i++) {
        quadrate[i] = (i + 1) * (i + 1);
    }

    for (int i = 0; i < quadrate.length; i++) {
        IO.print(quadrate[i] + " ");
    }
    IO.println();

    int[] wuerfe = new int[20];
    for (int i = 0; i < wuerfe.length; i++) {
        wuerfe[i] = Random.randint(1, 6);
    }

    IO.println("20 Würfe:");
    for (int wurf : wuerfe) {
        IO.print(wurf + " ");
    }
    IO.println();
}
```

:::

:::snippet{#merken}
Ein Feld zu füllen ist dasselbe Muster wie ein Feld zu lesen – nur steht `feld[i]` jetzt **links** vom Gleichheitszeichen.

Mit der erweiterten for-Schleife geht das **nicht**: Sie gibt dir eine Kopie des Wertes, keinen Zugang zum Platz im Feld.
:::

## Zwei Werte tauschen

Das brauchst du in Kapitel 7 beim Sortieren ständig.

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 4, 1, 8};

    zeigeFeld(werte);

    int merker = werte[0];
    werte[0] = werte[4];
    werte[4] = merker;

    zeigeFeld(werte);
}

/** Gibt alle Werte eines Feldes in einer Zeile aus. */
void zeigeFeld(int[] pWerte) {
    for (int i = 0; i < pWerte.length; i++) {
        IO.print(pWerte[i] + " ");
    }
    IO.println();
}
```

:::

:::snippet{#merken}
Der Tausch braucht **drei** Zeilen und eine Hilfsvariable – genau wie beim Tausch zweier Variablen in Kapitel 2. Ohne den Merker überschreibst du einen der beiden Werte.

Weil man das so oft braucht, lohnt sich eine eigene Methode dafür.
:::

## Parallele Felder

Manchmal gehören mehrere Informationen zusammen. Solange du noch keine eigenen Klassen kennst, hilft ein Trick: **zwei Felder mit gleicher Länge**, bei denen derselbe Index zusammengehörige Daten trifft.

:::onlineide{height="500px" speed="1000000"}

```java Main.java
void main() {
    String[] namen = {"Ada", "Alan", "Grace", "Konrad"};
    int[] punkte = {14, 11, 15, 9};

    for (int i = 0; i < namen.length; i++) {
        IO.println(namen[i] + ": " + punkte[i] + " Punkte");
    }

    int bestes = 0;
    for (int i = 1; i < punkte.length; i++) {
        if (punkte[i] > punkte[bestes]) {
            bestes = i;
        }
    }

    IO.println("Beste Leistung: " + namen[bestes] + " mit " + punkte[bestes] + " Punkten");
}
```

:::

:::snippet{#aufgabe}
Bei der Suche nach der besten Leistung merkt sich das Programm nicht den **Wert**, sondern den **Index**.

a) Erkläre, warum das hier nötig ist.

b) Nenne einen Nachteil paralleler Felder. Was passiert, wenn jemand einen Namen einfügt und die Punkte vergisst?
:::

::::collapsible{title="Auflösung"}

a) Weil du am Ende sowohl die Punktzahl **als auch** den Namen brauchst. Nur der Index verbindet beide Felder miteinander.

b) Die Felder geraten aus dem Takt: Ab der eingefügten Stelle passt jeder Name zur falschen Punktzahl. Nichts im Programm verhindert das – die Zusammengehörigkeit steht nirgends geschrieben, sie ist nur eine Absprache im Kopf.

Genau dieses Problem lösen **Klassen** im nächsten Kapitel: Dann gehören Name und Punktzahl zu **einem** Objekt und können gar nicht mehr auseinanderlaufen.

::::

## Aufgabe 1: Würfelstatistik

:::snippet{#aufgabe}
Würfle 6000-mal und zähle, wie oft jede Augenzahl vorkommt. Gib die Statistik aus.

Der Trick: Benutze ein Feld mit sechs Plätzen, bei dem der **Index** die Augenzahl darstellt.
:::

:::onlineide{height="500px" speed="1000000"}

```java Main.java
void main() {
    int[] haeufigkeit = new int[7];

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Warum sieben Plätze?"}

Damit du den Index 1 bis 6 direkt als Augenzahl benutzen kannst. Der Platz mit dem Index 0 bleibt dann ungenutzt – das ist die Anzahl eines Wertes wert, macht das Programm aber deutlich lesbarer.

::::

::::collapsible{title="Tipp 2: Die Zählung"}

```java
int wurf = Random.randint(1, 6);
haeufigkeit[wurf]++;
```

Der gewürfelte Wert wird direkt zum Index. Kein `if`, kein `switch`.

::::

:::protect{password="java-ef-5-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int[] haeufigkeit = new int[7];

    for (int i = 0; i < 6000; i++) {
        int wurf = Random.randint(1, 6);
        haeufigkeit[wurf]++;
    }

    for (int augen = 1; augen <= 6; augen++) {
        IO.println(augen + ": " + haeufigkeit[augen] + " mal");
    }
}
```

Erwartet werden ungefähr 1000 pro Augenzahl. Führe das Programm mehrfach aus und beobachte, wie stark die Werte schwanken.

:::

## Aufgabe 2: Getestete Methoden

:::snippet{#aufgabe}
Ergänze die drei Methoden so, dass alle Tests grün werden.
:::

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Felder2.java
public class Felder2 {

    /** Vertauscht die Werte an den Positionen pI und pJ. */
    public void tausche(int[] pWerte, int pI, int pJ) {
        // ergänze diese Methode
    }

    /**
     * Liefert ein neues Feld mit den Werten in umgekehrter Reihenfolge.
     * Das übergebene Feld bleibt unverändert.
     */
    public int[] umgekehrt(int[] pWerte) {
        return new int[0]; // ersetze diese Zeile
    }

    /**
     * Liefert den Index des ersten Vorkommens von pGesucht,
     * oder -1, wenn der Wert nicht vorkommt.
     */
    public int suche(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }
}
```

```java Felder2Test.java
@Test
class Felder2Test {

    @Test
    void testTausche() {
        Felder2 f = new Felder2();
        int[] werte = {5, 2, 4, 1, 8};
        f.tausche(werte, 0, 4);
        assertEquals(8, werte[0], "An Position 0 muss jetzt die 8 stehen.");
        assertEquals(5, werte[4], "An Position 4 muss jetzt die 5 stehen.");
        assertEquals(4, werte[2], "Die Mitte bleibt unverändert.");

        f.tausche(werte, 1, 1);
        assertEquals(2, werte[1], "Ein Tausch mit sich selbst ändert nichts.");
    }

    @Test
    void testUmgekehrt() {
        Felder2 f = new Felder2();
        int[] werte = {1, 2, 3};
        int[] neu = f.umgekehrt(werte);
        assertEquals(3, neu.length, "Das neue Feld ist gleich lang.");
        assertEquals(3, neu[0], "Vorne steht jetzt der letzte Wert.");
        assertEquals(2, neu[1], "In der Mitte bleibt die 2.");
        assertEquals(1, neu[2], "Hinten steht jetzt der erste Wert.");
        assertEquals(1, werte[0], "Das ursprüngliche Feld bleibt unverändert.");
    }

    @Test
    void testSuche() {
        Felder2 f = new Felder2();
        assertEquals(2, f.suche(new int[]{5, 2, 4, 1, 8}, 4), "Die 4 steht an Position 2.");
        assertEquals(0, f.suche(new int[]{5, 2, 4}, 5), "Die 5 steht an Position 0.");
        assertEquals(-1, f.suche(new int[]{5, 2, 4}, 9), "Die 9 kommt nicht vor.");
        assertEquals(1, f.suche(new int[]{7, 3, 3}, 3), "Gesucht ist das erste Vorkommen.");
    }
}
```

:::

::::collapsible{title="Tipp: umgekehrt"}

Lege mit `new int[pWerte.length]` ein neues Feld an. Beim Kopieren gilt: Was im alten Feld an Position `i` steht, gehört im neuen an Position `pWerte.length - 1 - i`.

::::

:::protect{password="java-ef-5-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Felder2.java
public class Felder2 {

    public void tausche(int[] pWerte, int pI, int pJ) {
        int merker = pWerte[pI];
        pWerte[pI] = pWerte[pJ];
        pWerte[pJ] = merker;
    }

    public int[] umgekehrt(int[] pWerte) {
        int[] neu = new int[pWerte.length];
        for (int i = 0; i < pWerte.length; i++) {
            neu[pWerte.length - 1 - i] = pWerte[i];
        }
        return neu;
    }

    public int suche(int[] pWerte, int pGesucht) {
        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] == pGesucht) {
                return i;
            }
        }
        return -1;
    }
}
```

Zwei Dinge sind bemerkenswert:

1. `tausche` gibt nichts zurück und verändert trotzdem das Feld des Aufrufers. Das liegt daran, dass Felder **Objekttypen** sind – die Methode bekommt keinen eigenen Abzug, sondern einen Verweis auf dasselbe Feld. Dieses Verhalten schauen wir uns im Lernpfad *Erweiterungen* genauer an.
2. `suche` verlässt die Methode beim ersten Treffer. Deshalb findet sie automatisch das **erste** Vorkommen. Dieses Verfahren heißt **lineare Suche** – in Kapitel 7 nehmen wir es genauer unter die Lupe.

:::

## Zusatzaufgabe

:::snippet{#brain}
Erweitere die Würfelstatistik um eine grafische Darstellung: Zeichne mit Scratch for Java ein Säulendiagramm der sechs Häufigkeiten, samt Beschriftung der Augenzahlen.

Achte darauf, die Säulenhöhen so zu skalieren, dass sie auch bei 60 000 Würfen noch auf die Bühne passen.
:::

---

## Selbsttest

::::multievent

**1. Wie viele Anweisungen braucht der Tausch zweier Feldwerte mindestens?**

{z{3}}

{h{Ohne Hilfsvariable geht einer der beiden Werte verloren.}}
{H{Richtig!}}

**2. Warum kann man mit der erweiterten for-Schleife ein Feld nicht füllen?**

{r1{weil sie nur rückwärts läuft}}

{r1{!weil sie eine Kopie des Wertes liefert, nicht den Platz im Feld}}

{r1{weil sie nur bei Zeichenketten funktioniert}}

{h{Man braucht Zugriff auf die Position, nicht nur auf den Wert.}}
{H{Richtig!}}

**3. Was ist der Nachteil zweier paralleler Felder?**

{r2{Sie brauchen doppelt so viel Speicher.}}

{r2{!Nichts im Programm sichert, dass sie im Takt bleiben.}}

{r2{Sie können nicht gleich lang sein.}}

{h{Die Zusammengehörigkeit ist nur eine Absprache.}}
{H{Richtig! Klassen lösen genau dieses Problem.}}

**4. Welche Aussagen zur Würfelstatistik stimmen?** (Mehrfachauswahl)

{c1{!Der Index des Feldes stellt die Augenzahl dar.}}

{c1{!Das Feld braucht sieben Plätze, wenn man den Index 0 ungenutzt lässt.}}

{c1{!Man kommt ohne Verzweigung aus.}}

{c1{Man braucht für jede Augenzahl eine eigene Variable.}}

{h{Genau das sollte das Feld ja ersetzen.}}
{H{Richtig!}}

**5. Was gibt eine Suchmethode üblicherweise zurück, wenn der Wert nicht gefunden wurde?**

{r3{0}}

{r3{!minus 1}}

{r3{die Länge des Feldes}}

{h{Es muss ein Wert sein, der kein gültiger Index sein kann.}}
{H{Richtig! Genau wie bei indexOf für Zeichenketten.}}

::::
