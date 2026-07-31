---
title: Modularisierung
index: 3
---

# Modularisierung

**Modularisierung** heißt: ein großes Problem in kleinere, benannte Teilprobleme zerlegen, jedes davon einzeln lösen und die Lösungen zusammensetzen. Sie ist eine **Problemlösestrategie** – kein Programmiertrick.

<!-- KLP EF, Algorithmen: Problemlösestrategie Modularisierung -->

## Überladen

Zwei Methoden dürfen denselben Namen tragen, solange sie sich in ihrer **Parameterliste** unterscheiden. Das nennt man **Überladen**.

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    begruesse();
    begruesse("Ada");
    begruesse("Ada", 3);
}

/** Begrüßt ohne Namen. */
void begruesse() {
    IO.println("Hallo!");
}

/** Begrüßt mit Namen. */
void begruesse(String pName) {
    IO.println("Hallo " + pName + "!");
}

/**
 * Begrüßt mit Namen, mehrfach.
 * @param pName der Name
 * @param pAnzahl wie oft begrüßt wird
 */
void begruesse(String pName, int pAnzahl) {
    for (int i = 0; i < pAnzahl; i++) {
        begruesse(pName);
    }
}
```

:::

:::snippet{#merken}
Java entscheidet anhand der **Anzahl und der Typen** der Argumente, welche Methode gemeint ist. Der Rückgabetyp zählt dabei **nicht** – zwei Methoden, die sich nur darin unterscheiden, sind ein Fehler.

Beachte die dritte Methode: Sie ruft die zweite auf. Methoden dürfen und sollen einander benutzen.
:::

:::snippet{#aufgabe}
Warum ist es sinnvoll, dass `begruesse(String, int)` die Methode `begruesse(String)` aufruft, statt die Ausgabe selbst zu schreiben?
:::

::::collapsible{title="Auflösung"}

Damit die Begrüßungsformel nur an **einer** Stelle steht. Soll aus „Hallo“ ein „Guten Tag“ werden, ändert man eine Zeile – und alle drei Varianten ziehen mit.

Das ist dasselbe Argument wie beim Baum in der ersten Lektion. Es gilt auf jeder Ebene.

::::

## Ein größeres Problem zerlegen

:::snippet{#aufgabe}
Ein Programm soll eine **Notenstatistik** ausgeben. Es liest fünf Notenpunkte ein und gibt aus:

- die Einzelnoten mit der zugehörigen Note in Worten
- den Durchschnitt
- die beste und die schlechteste Punktzahl
- ob der Kurs bestanden ist (Durchschnitt mindestens 5 Punkte)

Zerlege dieses Problem **auf Papier** in Teilaufgaben, bevor du eine Zeile Code schreibst. Notiere für jede Teilaufgabe:

- einen Methodennamen
- die Parameter
- den Rückgabetyp
:::

::::collapsible{title="Auflösung: ein möglicher Entwurf"}

| Methode | Parameter | Rückgabe | Aufgabe |
| --- | --- | --- | --- |
| `punkteInNote` | `int pPunkte` | `String` | wandelt Punkte in „sehr gut“, „gut“, … um |
| `durchschnitt` | fünf `int` | `double` | berechnet den Mittelwert |
| `maximum` | fünf `int` | `int` | größter Wert |
| `minimum` | fünf `int` | `int` | kleinster Wert |
| `istBestanden` | `double pSchnitt` | `boolean` | Durchschnitt mindestens 5 |

Fünf einzelne Parameter sind unschön – das merkst du selbst. In Kapitel 5 lernst du **Felder** kennen, und dann wird aus `maximum(int, int, int, int, int)` ein sauberes `maximum(int[])`.

Dass ein Entwurf einen solchen Schwachpunkt hat, ist normal. Wichtig ist, ihn zu **erkennen und zu benennen**.

::::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Statistik.java
public class Statistik {

    /**
     * Wandelt Notenpunkte in die Note in Worten um.
     * 13 bis 15 -> sehr gut, 10 bis 12 -> gut, 7 bis 9 -> befriedigend,
     * 4 bis 6 -> ausreichend, 1 bis 3 -> mangelhaft, 0 -> ungenügend
     */
    public String punkteInNote(int pPunkte) {
        return ""; // ersetze diese Zeile
    }

    /**
     * Liefert den Durchschnitt der drei Werte.
     */
    public double durchschnitt(int pA, int pB, int pC) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert den größten der drei Werte.
     */
    public int maximum(int pA, int pB, int pC) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Prüft, ob der Durchschnitt mindestens 5 Punkte beträgt.
     */
    public boolean istBestanden(double pSchnitt) {
        return false; // ersetze diese Zeile
    }
}
```

```java StatistikTest.java
@Test
class StatistikTest {

    @Test
    void testPunkteInNote() {
        Statistik s = new Statistik();
        assertEquals("sehr gut", s.punkteInNote(15), "15 Punkte sind sehr gut.");
        assertEquals("sehr gut", s.punkteInNote(13), "13 Punkte sind noch sehr gut.");
        assertEquals("gut", s.punkteInNote(12), "12 Punkte sind gut.");
        assertEquals("befriedigend", s.punkteInNote(8), "8 Punkte sind befriedigend.");
        assertEquals("ausreichend", s.punkteInNote(4), "4 Punkte sind ausreichend.");
        assertEquals("mangelhaft", s.punkteInNote(1), "1 Punkt ist mangelhaft.");
        assertEquals("ungenügend", s.punkteInNote(0), "0 Punkte sind ungenügend.");
    }

    @Test
    void testDurchschnitt() {
        Statistik s = new Statistik();
        assertEquals(10.0, s.durchschnitt(9, 10, 11), "Der Schnitt von 9, 10, 11 ist 10.");
        assertEquals(4.0, s.durchschnitt(4, 4, 4), "Der Schnitt von 4, 4, 4 ist 4.");
        assertEquals(1.0, s.durchschnitt(0, 1, 2), "Der Schnitt von 0, 1, 2 ist 1.");
    }

    @Test
    void testMaximum() {
        Statistik s = new Statistik();
        assertEquals(11, s.maximum(9, 10, 11), "Das Maximum von 9, 10, 11 ist 11.");
        assertEquals(11, s.maximum(11, 10, 9), "Das Maximum von 11, 10, 9 ist 11.");
        assertEquals(7, s.maximum(7, 7, 7), "Bei lauter gleichen Werten ist das Maximum dieser Wert.");
    }

    @Test
    void testIstBestanden() {
        Statistik s = new Statistik();
        assertTrue(s.istBestanden(5.0), "Genau 5 Punkte reichen.");
        assertTrue(s.istBestanden(9.5), "9,5 Punkte reichen.");
        assertFalse(s.istBestanden(4.9), "4,9 Punkte reichen nicht.");
    }
}
```

:::

::::collapsible{title="Tipp 1: punkteInNote"}

Eine `else if`-Kette wie bei den Noten in Kapitel 3 – nur dass du diesmal nicht ausgibst, sondern **zurückgibst**.

Achte auf die Reihenfolge der Grenzen.

::::

::::collapsible{title="Tipp 2: durchschnitt"}

Aufpassen bei der Division: Die Summe ist ein `int`, aber der Rückgabetyp ist `double`. Ohne Typumwandlung schneidest du die Nachkommastellen ab.

::::

::::collapsible{title="Tipp 3: maximum bei drei Werten"}

Das Muster aus Kapitel 3: Merke dir den bisher größten Wert und vergleiche ihn nacheinander mit den übrigen.

Oder du rufst zweimal eine Zwei-Werte-Version auf – auch das ist Modularisierung.

::::

:::protect{password="java-ef-4-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Statistik.java
public class Statistik {

    public String punkteInNote(int pPunkte) {
        if (pPunkte >= 13) {
            return "sehr gut";
        } else if (pPunkte >= 10) {
            return "gut";
        } else if (pPunkte >= 7) {
            return "befriedigend";
        } else if (pPunkte >= 4) {
            return "ausreichend";
        } else if (pPunkte >= 1) {
            return "mangelhaft";
        } else {
            return "ungenügend";
        }
    }

    public double durchschnitt(int pA, int pB, int pC) {
        return (double) (pA + pB + pC) / 3;
    }

    public int maximum(int pA, int pB, int pC) {
        int groesstes = pA;
        if (pB > groesstes) {
            groesstes = pB;
        }
        if (pC > groesstes) {
            groesstes = pC;
        }
        return groesstes;
    }

    public boolean istBestanden(double pSchnitt) {
        return pSchnitt >= 5.0;
    }
}
```

:::

## Aufgabe: Das Programm zusammensetzen

:::snippet{#aufgabe}
Setze die geprüften Methoden jetzt zu einem vollständigen Programm zusammen: Es liest drei Notenpunkte ein und gibt die vollständige Statistik aus.

Beachte: Du hast die Methoden **einzeln getestet**. Wenn das Gesamtprogramm trotzdem nicht stimmt, liegt der Fehler im Zusammensetzen – nicht in den Bausteinen. Genau das ist der Vorteil dieses Vorgehens.
:::

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    int a = Integer.parseInt(IO.readln("Punkte Klausur 1: "));
    int b = Integer.parseInt(IO.readln("Punkte Klausur 2: "));
    int c = Integer.parseInt(IO.readln("Punkte Klausur 3: "));

    // Dein Code hier

}

String punkteInNote(int pPunkte) {
    if (pPunkte >= 13) {
        return "sehr gut";
    } else if (pPunkte >= 10) {
        return "gut";
    } else if (pPunkte >= 7) {
        return "befriedigend";
    } else if (pPunkte >= 4) {
        return "ausreichend";
    } else if (pPunkte >= 1) {
        return "mangelhaft";
    } else {
        return "ungenügend";
    }
}

double durchschnitt(int pA, int pB, int pC) {
    return (double) (pA + pB + pC) / 3;
}
```

:::

:::protect{password="java-ef-4-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int a = Integer.parseInt(IO.readln("Punkte Klausur 1: "));
    int b = Integer.parseInt(IO.readln("Punkte Klausur 2: "));
    int c = Integer.parseInt(IO.readln("Punkte Klausur 3: "));

    IO.println("Klausur 1: " + a + " Punkte (" + punkteInNote(a) + ")");
    IO.println("Klausur 2: " + b + " Punkte (" + punkteInNote(b) + ")");
    IO.println("Klausur 3: " + c + " Punkte (" + punkteInNote(c) + ")");

    double schnitt = durchschnitt(a, b, c);
    IO.println("Durchschnitt: " + schnitt);

    if (schnitt >= 5.0) {
        IO.println("Bestanden.");
    } else {
        IO.println("Nicht bestanden.");
    }
}
```

Die drei fast gleichen Ausgabezeilen sind schon wieder kopierter Code. Mit Feldern und einer Schleife wird daraus im nächsten Kapitel eine einzige Zeile.

:::

## Zusatzaufgabe

:::snippet{#brain}
Nimm dir ein Programm vor, das du in einem früheren Kapitel geschrieben hast – zum Beispiel den Zeitrechner oder das Zahlenraten.

a) Zerlege es nachträglich in Methoden. Welche Teilaufgaben stecken darin?

b) Schreibe zu mindestens zwei deiner Methoden eine Testklasse.

c) Beurteile: Ist das Programm dadurch besser geworden? Begründe – und sei ehrlich, wenn du findest, dass es für ein so kleines Programm übertrieben ist.
:::

---

## Selbsttest

::::multievent

**1. Was müssen zwei überladene Methoden gemeinsam haben?**

{r1{denselben Rückgabetyp}}

{r1{!denselben Namen}}

{r1{dieselbe Anzahl Parameter}}

{h{Unterscheiden müssen sie sich in der Parameterliste.}}
{H{Richtig!}}

**2. Woran erkennt Java, welche überladene Methode gemeint ist?**

{r2{am Rückgabetyp}}

{r2{!an Anzahl und Typen der Argumente}}

{r2{an der Reihenfolge im Quelltext}}

{h{Der Rückgabetyp reicht ausdrücklich nicht aus.}}
{H{Richtig!}}

**3. Was gehört zu einem guten Methodenentwurf?** (Mehrfachauswahl)

{c1{!ein Name, der sagt, was die Methode tut}}

{c1{!ein Kommentar, der Parameter und Rückgabe erklärt}}

{c1{!jede Zuständigkeit an genau einer Stelle}}

{c1{möglichst viele Parameter}}

{h{Viele Parameter sind eher ein Warnzeichen.}}
{H{Richtig! Fünf einzelne Parameter waren ja genau der Schwachpunkt im Entwurf.}}

**4. Warum ist es sinnvoll, Methoden einzeln zu testen, bevor man sie zusammensetzt?**

{r3{weil das schneller geht}}

{r3{!weil man dann weiß, dass ein späterer Fehler im Zusammensetzen liegt}}

{r3{weil Java das verlangt}}

{h{Es geht darum, die Fehlersuche einzugrenzen.}}
{H{Richtig!}}

**5. Wie heißt die Strategie, ein Problem in benannte Teilprobleme zu zerlegen?**

{r4{!Modularisierung}}

{r4{Iteration}}

{r4{Abstraktion}}

{h{Sie war das Thema dieses ganzen Kapitels.}}
{H{Richtig!}}

::::
