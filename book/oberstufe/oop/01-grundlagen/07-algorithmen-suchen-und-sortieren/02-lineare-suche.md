---
title: Lineare Suche
index: 2
---

# Lineare Suche

Etwas in einer Menge von Daten zu finden ist die vielleicht häufigste Aufgabe der Informatik überhaupt. Das einfachste Verfahren dafür kennst du schon – jetzt schauen wir es uns genau an.

## Das Verfahren

:::snippet{#definition}
Die **lineare Suche** (auch: sequenzielle Suche) durchläuft das Feld von vorne nach hinten und vergleicht jeden Wert mit dem gesuchten. Beim ersten Treffer bricht sie ab.

Wird das Ende erreicht, ohne dass etwas gefunden wurde, kommt der Wert nicht vor.
:::

Als Struktogramm:

```
┌──────────────────────────────────────────────┐
│ für i von 0 bis werte.length - 1             │
│ ┌────────────────────────────────────────┐   │
│ │          werte[i] = gesucht            │   │
│ │      ja    ╱──────────╲    nein        │   │
│ ├─────────────────────────┬──────────────┤   │
│ │ gib i zurück            │      ∅       │   │
│ └─────────────────────────┴──────────────┘   │
├──────────────────────────────────────────────┤
│ gib -1 zurück                                │
└──────────────────────────────────────────────┘
```

:::onlineide{height="540px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 9, 1, 7, 3};

    IO.println("Suche nach 9:  Index " + sucheLinear(werte, 9));
    IO.println("Suche nach 5:  Index " + sucheLinear(werte, 5));
    IO.println("Suche nach 42: Index " + sucheLinear(werte, 42));
}

/**
 * Sucht pGesucht im Feld von vorne nach hinten.
 * @param pWerte das zu durchsuchende Feld
 * @param pGesucht der gesuchte Wert
 * @return der Index des ersten Vorkommens, oder -1
 */
int sucheLinear(int[] pWerte, int pGesucht) {
    for (int i = 0; i < pWerte.length; i++) {
        if (pWerte[i] == pGesucht) {
            return i;
        }
    }
    return -1;
}
```

:::

## Wie viele Vergleiche braucht das?

:::snippet{#aufgabe}
Ein Feld hat 100 Einträge. Wie viele Vergleiche macht die lineare Suche

a) im besten Fall,

b) im schlechtesten Fall,

c) im Durchschnitt, wenn der gesuchte Wert enthalten ist?

Und: Was ist eigentlich der schlechteste Fall?
:::

::::collapsible{title="Auflösung"}

a) **1** – wenn der gesuchte Wert gleich vorne steht.

b) **100** – wenn er ganz hinten steht **oder gar nicht vorkommt**. Der Fall „nicht enthalten“ ist der eigentlich schlimme: Da hilft kein Glück.

c) Im Mittel etwa **50**. Wenn der Wert gleich wahrscheinlich an jeder Stelle steht, ist der Durchschnitt (1 + 2 + … + 100) / 100, also 50,5.

**Der entscheidende Punkt:** Verdoppelt sich die Anzahl der Einträge, verdoppelt sich auch die Anzahl der Vergleiche. Man sagt: Der Aufwand wächst **linear** – daher der Name.

::::

## Vergleiche zählen statt Sekunden messen

Wie schnell ein Programm läuft, hängt vom Rechner ab. Wie viele **Vergleiche** ein Algorithmus macht, hängt nur vom Algorithmus ab. Deshalb zählt man in der Informatik Operationen, nicht Sekunden.

:::onlineide{height="580px" speed="1000000"}

```java Main.java
void main() {
    int[] klein = zufallsfeld(100);
    int[] gross = zufallsfeld(200);

    IO.println("100 Einträge, Wert nicht enthalten:  " + zaehleVergleiche(klein, -1) + " Vergleiche");
    IO.println("200 Einträge, Wert nicht enthalten:  " + zaehleVergleiche(gross, -1) + " Vergleiche");
}

/** Erzeugt ein Feld mit pAnzahl Zufallszahlen zwischen 1 und 1000. */
int[] zufallsfeld(int pAnzahl) {
    int[] feld = new int[pAnzahl];
    for (int i = 0; i < feld.length; i++) {
        feld[i] = Random.randint(1, 1000);
    }
    return feld;
}

/** Führt eine lineare Suche durch und liefert die Anzahl der Vergleiche. */
int zaehleVergleiche(int[] pWerte, int pGesucht) {
    int vergleiche = 0;
    for (int i = 0; i < pWerte.length; i++) {
        vergleiche++;
        if (pWerte[i] == pGesucht) {
            return vergleiche;
        }
    }
    return vergleiche;
}
```

:::

:::snippet{#aufgabe}
a) Führe das Programm aus. Bestätigt sich, dass sich die Vergleiche mit der Feldgröße verdoppeln?

b) Erweitere das Programm um Felder der Größe 400, 800 und 1600. Trage die Ergebnisse in eine Tabelle ein.

c) Was ändert sich, wenn der gesuchte Wert **enthalten** ist? Probiere es aus, indem du gezielt nach `feld[0]` und nach dem letzten Eintrag suchst.
:::

## Aufgabe 1: Suche mit Rückmeldung

:::snippet{#aufgabe}
Erweitere die lineare Suche so, dass alle Tests grün werden. Beachte besonders die Sonderfälle.
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Suche.java
public class Suche {

    /**
     * Liefert den Index des ersten Vorkommens von pGesucht,
     * oder -1, wenn der Wert nicht vorkommt.
     */
    public int ersterIndex(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert den Index des letzten Vorkommens von pGesucht,
     * oder -1, wenn der Wert nicht vorkommt.
     */
    public int letzterIndex(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert true, wenn pGesucht mindestens einmal vorkommt. */
    public boolean enthaelt(int[] pWerte, int pGesucht) {
        return false; // ersetze diese Zeile
    }

    /** Liefert die Anzahl der Vorkommen von pGesucht. */
    public int anzahlVorkommen(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }
}
```

```java SucheTest.java
@Test
class SucheTest {

    @Test
    void testErsterIndex() {
        Suche s = new Suche();
        assertEquals(2, s.ersterIndex(new int[]{5, 2, 9, 1}, 9), "Die 9 steht an Index 2.");
        assertEquals(0, s.ersterIndex(new int[]{7, 3, 7}, 7), "Gesucht ist das erste Vorkommen.");
        assertEquals(-1, s.ersterIndex(new int[]{5, 2}, 9), "Die 9 kommt nicht vor.");
        assertEquals(-1, s.ersterIndex(new int[]{}, 9), "Im leeren Feld kommt nichts vor.");
    }

    @Test
    void testLetzterIndex() {
        Suche s = new Suche();
        assertEquals(2, s.letzterIndex(new int[]{7, 3, 7}, 7), "Das letzte Vorkommen ist an Index 2.");
        assertEquals(0, s.letzterIndex(new int[]{7, 3, 1}, 7), "Hier gibt es nur eines.");
        assertEquals(-1, s.letzterIndex(new int[]{5, 2}, 9), "Die 9 kommt nicht vor.");
    }

    @Test
    void testEnthaelt() {
        Suche s = new Suche();
        assertTrue(s.enthaelt(new int[]{5, 2, 9}, 2), "Die 2 ist enthalten.");
        assertFalse(s.enthaelt(new int[]{5, 2, 9}, 3), "Die 3 ist nicht enthalten.");
        assertFalse(s.enthaelt(new int[]{}, 3), "Im leeren Feld ist nichts enthalten.");
    }

    @Test
    void testAnzahlVorkommen() {
        Suche s = new Suche();
        assertEquals(3, s.anzahlVorkommen(new int[]{1, 2, 1, 3, 1}, 1), "Die 1 kommt dreimal vor.");
        assertEquals(0, s.anzahlVorkommen(new int[]{1, 2}, 9), "Die 9 kommt nicht vor.");
        assertEquals(1, s.anzahlVorkommen(new int[]{4}, 4), "Die 4 kommt einmal vor.");
    }
}
```

:::

::::collapsible{title="Tipp 1: letzterIndex"}

Zwei Wege führen zum Ziel:

1. Von **hinten** nach vorne suchen und beim ersten Treffer zurückgeben.
2. Von vorne suchen, aber **nicht** abbrechen, sondern den Index in einer Variablen merken und weitersuchen.

Beide sind richtig. Der erste ist im Schnitt schneller, der zweite braucht keine Rückwärtsschleife.

::::

::::collapsible{title="Tipp 2: enthaelt"}

Du hast `ersterIndex` bereits. Nutze sie – Methoden dürfen einander aufrufen.

::::

:::protect{password="java-ef-7-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Suche.java
public class Suche {

    public int ersterIndex(int[] pWerte, int pGesucht) {
        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] == pGesucht) {
                return i;
            }
        }
        return -1;
    }

    public int letzterIndex(int[] pWerte, int pGesucht) {
        for (int i = pWerte.length - 1; i >= 0; i--) {
            if (pWerte[i] == pGesucht) {
                return i;
            }
        }
        return -1;
    }

    public boolean enthaelt(int[] pWerte, int pGesucht) {
        return ersterIndex(pWerte, pGesucht) != -1;
    }

    public int anzahlVorkommen(int[] pWerte, int pGesucht) {
        int anzahl = 0;
        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] == pGesucht) {
                anzahl++;
            }
        }
        return anzahl;
    }
}
```

Beachte den Unterschied: `ersterIndex` und `letzterIndex` **brechen ab**, sobald sie etwas gefunden haben. `anzahlVorkommen` muss dagegen bis zum Ende laufen – sonst könnte sie nicht zählen.

:::

## Aufgabe 2: Suche in einem sortierten Feld

:::snippet{#aufgabe}
Angenommen, das Feld ist bereits **aufsteigend sortiert**: `{1, 3, 4, 7, 9, 12, 15}`.

a) Bei der Suche nach der 5 kann man früher abbrechen als bei einem unsortierten Feld. Erkläre, wann und warum.

b) Ändere die Suchmethode entsprechend.

c) Um wie viel schneller wird die Suche dadurch im schlechtesten Fall? Denk gut nach, bevor du antwortest.
:::

::::collapsible{title="Auflösung"}

a) Sobald ein Wert **größer** als der gesuchte auftaucht, kann der gesuchte nicht mehr kommen – hinter ihm stehen ja nur noch größere. Bei der Suche nach 5 bricht man also schon bei der 7 ab, nach vier Vergleichen statt sieben.

b)
```java
for (int i = 0; i < pWerte.length; i++) {
    if (pWerte[i] == pGesucht) {
        return i;
    }
    if (pWerte[i] > pGesucht) {
        return -1;
    }
}
return -1;
```

c) **Im schlechtesten Fall gar nicht.** Wer nach einem Wert sucht, der größer als alle im Feld ist, muss weiterhin alle durchlaufen. Der Aufwand bleibt linear – nur der Durchschnitt halbiert sich ungefähr.

Dass ein sortiertes Feld sehr viel mehr hergibt, siehst du im Lernpfad *Erweiterungen* bei der **binären Suche**: Die kommt bei 1000 Einträgen mit zehn Vergleichen aus – nach demselben Prinzip wie bei den Goldmünzen.

::::

## Zusatzaufgabe

:::snippet{#brain}
Visualisiere die lineare Suche mit Scratch for Java:

Zeichne die Werte als Säulen. Lass die Suche schrittweise laufen und färbe die gerade geprüfte Säule ein. Wird der Wert gefunden, färbe die Säule grün.

Nutze `SystemTools.pause(200)`, damit man dem Verfahren zusehen kann. Und setze `speed` **nicht** hoch – hier soll es ja langsam sein.
:::

---

## Selbsttest

::::multievent

**1. Wie viele Vergleiche braucht die lineare Suche in einem Feld mit 500 Einträgen im schlechtesten Fall?**

{z{500}}

{h{Der schlechteste Fall ist der, in dem der Wert gar nicht vorkommt.}}
{H{Richtig!}}

**2. Was passiert mit dem Aufwand, wenn sich die Anzahl der Einträge verdoppelt?**

{r1{er bleibt gleich}}

{r1{!er verdoppelt sich}}

{r1{er vervierfacht sich}}

{h{Deshalb heißt das Verfahren lineare Suche.}}
{H{Richtig!}}

**3. Warum zählt man Vergleiche statt Sekunden?**

{r2{weil Vergleiche leichter zu zählen sind}}

{r2{!weil Sekunden vom Rechner abhängen, Vergleiche nur vom Algorithmus}}

{r2{weil Sekunden zu ungenau sind}}

{h{Auf einem schnelleren Rechner läuft derselbe Algorithmus schneller.}}
{H{Richtig!}}

**4. Welche Methoden dürfen abbrechen, sobald sie einen Treffer haben?** (Mehrfachauswahl)

{c1{!die Suche nach dem ersten Vorkommen}}

{c1{!die Prüfung, ob ein Wert enthalten ist}}

{c1{das Zählen aller Vorkommen}}

{c1{die Suche nach dem letzten Vorkommen bei einem Durchlauf von vorne}}

{h{Wer zählen will, muss bis zum Ende gehen.}}
{H{Richtig!}}

**5. Was liefert die lineare Suche zurück, wenn der Wert nicht vorkommt?**

{r3{0}}

{r3{!minus 1}}

{r3{die Länge des Feldes}}

{h{Es muss ein Wert sein, der kein gültiger Index sein kann.}}
{H{Richtig!}}

::::
