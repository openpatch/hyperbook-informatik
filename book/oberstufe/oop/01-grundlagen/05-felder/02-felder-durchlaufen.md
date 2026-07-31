---
title: Felder durchlaufen
index: 2
---

# Felder durchlaufen

Felder und Schleifen gehören zusammen. Fast alles, was du mit einem Feld tust, folgt demselben Muster: einmal von vorne bis hinten durchgehen und dabei etwas tun.

## Das Grundmuster

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12};

    for (int i = 0; i < punkte.length; i++) {
        IO.println("Klausur " + (i + 1) + ": " + punkte[i] + " Punkte");
    }
}
```

:::

:::snippet{#merken}
```java
for (int i = 0; i < feld.length; i++) {
    // hier steht feld[i] zur Verfügung
}
```

Diesen Kopf schreibst du von jetzt an ständig. Er beginnt bei 0 und läuft mit `<` bis `length` – so trifft er genau alle gültigen Indizes.

`i < feld.length` statt einer festen Zahl ist wichtig: Das Programm passt sich dann automatisch an, wenn das Feld länger wird.
:::

## Die verkürzte Form

Wenn du den Index gar nicht brauchst, sondern nur die Werte, gibt es eine kürzere Schreibweise.

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    String[] namen = {"Ada", "Alan", "Grace", "Konrad"};

    IO.println("--- mit Index ---");
    for (int i = 0; i < namen.length; i++) {
        IO.println(namen[i]);
    }

    IO.println("--- ohne Index ---");
    for (String name : namen) {
        IO.println(name);
    }
}
```

:::

:::snippet{#merken}
`for (String name : namen)` liest sich als „für jeden Namen aus namen“. Diese Form heißt **erweiterte for-Schleife** oder *for-each*.

Sie ist kürzer und weniger fehleranfällig – aber du kannst damit:

- den Index nicht verwenden,
- nicht rückwärts laufen,
- die Werte im Feld nicht verändern.

Nimm sie, wenn du nur lesen willst. Sonst die normale Zählschleife.
:::

## Die drei Grundaufgaben

Fast jede Feldaufgabe ist eine Abwandlung von einer dieser drei.

### 1. Summieren (Akkumulator)

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12};

    int summe = 0;
    for (int i = 0; i < punkte.length; i++) {
        summe = summe + punkte[i];
    }

    IO.println("Summe:        " + summe);
    IO.println("Durchschnitt: " + (double) summe / punkte.length);
}
```

:::

### 2. Extremwert suchen

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12};

    int groesstes = punkte[0];
    for (int i = 1; i < punkte.length; i++) {
        if (punkte[i] > groesstes) {
            groesstes = punkte[i];
        }
    }

    IO.println("Beste Punktzahl: " + groesstes);
}
```

:::

:::snippet{#aufgabe}
Zwei Fragen zum Extremwert-Muster:

a) Warum startet die Schleife bei `i = 1` und nicht bei `i = 0`?

b) Warum ist `int groesstes = 0;` als Startwert eine schlechte Idee? Gib ein Feld an, bei dem das falsche Ergebnisse liefert.
:::

::::collapsible{title="Auflösung"}

a) Weil `groesstes` schon mit `punkte[0]` belegt wurde. Den Wert mit sich selbst zu vergleichen wäre nicht falsch, nur überflüssig.

b) Bei einem Feld mit lauter negativen Werten, etwa `{-5, -3, -9}`. Dann bliebe `groesstes` bei 0, obwohl 0 gar nicht im Feld vorkommt.

**Regel:** Starte immer mit dem **ersten Element** des Feldes, nie mit einer ausgedachten Zahl.

::::

### 3. Zählen

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12, 3, 15, 9};

    int anzahl = 0;
    for (int i = 0; i < punkte.length; i++) {
        if (punkte[i] >= 10) {
            anzahl++;
        }
    }

    IO.println(anzahl + " von " + punkte.length + " Klausuren waren zweistellig.");
}
```

:::

## Felder in der Grafik

:::onlineide{libraries="scratch" height="540px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        int[] hoehen = {40, 90, 20, 120, 70, 100, 55};

        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(24);
        stift.setColor(60, 120, 220);

        for (int i = 0; i < hoehen.length; i++) {
            int x = -180 + i * 60;
            stift.setPosition(x, -150);
            stift.down();
            stift.setPosition(x, -150 + hoehen[i]);
            stift.up();
        }
    }
}
```

:::

:::snippet{#aufgabe}
Das ist ein **Säulendiagramm** – und genau das, was in Kapitel 3 noch nicht ging, weil die Höhen keiner Regel folgen.

a) Ändere die Werte im Feld und beobachte das Diagramm.

b) Füge einen achten Wert hinzu. Was musst du sonst noch anpassen?

c) Färbe die Säule mit dem größten Wert rot ein.
:::

::::collapsible{title="Auflösung zu b)"}

**Nichts.** Die Schleife läuft bis `hoehen.length`, und die x-Koordinate wird aus dem Index berechnet. Das Programm passt sich von allein an.

Hättest du `i < 7` geschrieben, müsstest du es ändern. Deshalb ist `feld.length` die bessere Wahl.

::::

::::collapsible{title="Tipp zu c)"}

Bestimme in einem **ersten** Durchlauf den größten Wert. Färbe dann in einem **zweiten** Durchlauf die passende Säule anders. Zwei einfache Schleifen sind übersichtlicher als eine komplizierte.

::::

:::protect{password="java-ef-5-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        int[] hoehen = {40, 90, 20, 120, 70, 100, 55, 85};

        int groesste = hoehen[0];
        for (int i = 1; i < hoehen.length; i++) {
            if (hoehen[i] > groesste) {
                groesste = hoehen[i];
            }
        }

        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(24);

        for (int i = 0; i < hoehen.length; i++) {
            if (hoehen[i] == groesste) {
                stift.setColor(220, 40, 40);
            } else {
                stift.setColor(60, 120, 220);
            }

            int x = -180 + i * 45;
            stift.setPosition(x, -150);
            stift.down();
            stift.setPosition(x, -150 + hoehen[i]);
            stift.up();
        }
    }
}
```

:::

## Aufgabe: Getestete Feldmethoden

:::snippet{#aufgabe}
Ergänze die vier Methoden so, dass alle Tests grün werden. Sie sind die Werkzeuge, die du im Rest des Lernpfads immer wieder brauchst.
:::

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Felder.java
public class Felder {

    /** Liefert die Summe aller Werte. Bei einem leeren Feld 0. */
    public int summe(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert den größten Wert. Das Feld ist nie leer. */
    public int maximum(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }

    /** Zählt, wie oft pGesucht im Feld vorkommt. */
    public int zaehle(int[] pWerte, int pGesucht) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert den Mittelwert. Das Feld ist nie leer. */
    public double mittelwert(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }
}
```

```java FelderTest.java
@Test
class FelderTest {

    @Test
    void testSumme() {
        Felder f = new Felder();
        assertEquals(51, f.summe(new int[]{11, 8, 14, 6, 12}), "Die Summe muss 51 sein.");
        assertEquals(0, f.summe(new int[]{}), "Die Summe des leeren Feldes ist 0.");
        assertEquals(7, f.summe(new int[]{7}), "Bei einem Wert ist die Summe dieser Wert.");
        assertEquals(0, f.summe(new int[]{-5, 5}), "Auch negative Werte zählen mit.");
    }

    @Test
    void testMaximum() {
        Felder f = new Felder();
        assertEquals(14, f.maximum(new int[]{11, 8, 14, 6, 12}), "Das Maximum muss 14 sein.");
        assertEquals(11, f.maximum(new int[]{11, 8, 6}), "Das Maximum steht auch mal vorne.");
        assertEquals(-3, f.maximum(new int[]{-5, -3, -9}), "Auch bei lauter negativen Werten.");
        assertEquals(7, f.maximum(new int[]{7}), "Bei einem Wert ist dieser das Maximum.");
    }

    @Test
    void testZaehle() {
        Felder f = new Felder();
        assertEquals(3, f.zaehle(new int[]{1, 2, 1, 3, 1}, 1), "Die 1 kommt dreimal vor.");
        assertEquals(0, f.zaehle(new int[]{1, 2, 3}, 9), "Die 9 kommt nicht vor.");
        assertEquals(0, f.zaehle(new int[]{}, 1), "Im leeren Feld kommt nichts vor.");
    }

    @Test
    void testMittelwert() {
        Felder f = new Felder();
        assertEquals(10.0, f.mittelwert(new int[]{9, 10, 11}), "Der Mittelwert muss 10 sein.");
        assertEquals(1.5, f.mittelwert(new int[]{1, 2}), "Der Mittelwert muss 1,5 sein.");
        assertEquals(7.0, f.mittelwert(new int[]{7}), "Bei einem Wert ist dieser der Mittelwert.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Die Muster"}

Du brauchst kein neues Wissen. `summe` ist der Akkumulator, `maximum` die Extremwertsuche, `zaehle` das Zählmuster. `mittelwert` darf `summe` aufrufen – Methoden dürfen einander benutzen.

::::

::::collapsible{title="Tipp 2: Der Testfall mit dem leeren Feld"}

Bei `summe(new int[]{})` läuft die Schleife null Mal. Wenn du mit `int summe = 0;` startest, kommt genau 0 heraus – der Testfall geht also von allein durch, wenn dein Muster stimmt.

Bei `maximum` wäre das leere Feld ein Problem, deshalb ist es dort ausdrücklich ausgeschlossen.

::::

::::collapsible{title="Tipp 3: Der Mittelwert"}

`summe(pWerte)` liefert ein `int`, `pWerte.length` ebenfalls. Ohne Typumwandlung bekommst du eine Ganzzahldivision – und der Testfall mit 1,5 schlägt fehl.

::::

:::protect{password="java-ef-5-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Felder.java
public class Felder {

    public int summe(int[] pWerte) {
        int summe = 0;
        for (int i = 0; i < pWerte.length; i++) {
            summe = summe + pWerte[i];
        }
        return summe;
    }

    public int maximum(int[] pWerte) {
        int groesstes = pWerte[0];
        for (int i = 1; i < pWerte.length; i++) {
            if (pWerte[i] > groesstes) {
                groesstes = pWerte[i];
            }
        }
        return groesstes;
    }

    public int zaehle(int[] pWerte, int pGesucht) {
        int anzahl = 0;
        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] == pGesucht) {
                anzahl++;
            }
        }
        return anzahl;
    }

    public double mittelwert(int[] pWerte) {
        return (double) summe(pWerte) / pWerte.length;
    }
}
```

:::

## Zusatzaufgabe

:::snippet{#brain}
Schreibe eine Methode `umgekehrt(int[] pWerte)`, die ein **neues** Feld mit denselben Werten in umgekehrter Reihenfolge zurückgibt.

Anschließend: Schreibe eine zweite Methode `drehe(int[] pWerte)`, die das übergebene Feld **selbst** umdreht, ohne ein neues anzulegen.

Probiere beide aus und beobachte, was mit dem ursprünglichen Feld passiert. Diese Beobachtung führt direkt zum Thema **Referenzen**, das dich im Lernpfad *Erweiterungen* erwartet.
:::

---

## Selbsttest

::::multievent

**1. Welche Bedingung gehört in den Kopf einer Schleife, die ein Feld durchläuft?**

{r1{i kleinergleich feld.length}}

{r1{!i kleiner feld.length}}

{r1{i kleiner feld.length minus 1}}

{h{Der größte gültige Index ist um eins kleiner als die Länge.}}
{H{Richtig! Mit kleinergleich liefe man eine Stelle zu weit.}}

**2. Womit sollte eine Variable für die Maximumsuche vorbelegt werden?**

{r2{mit 0}}

{r2{!mit dem ersten Element des Feldes}}

{r2{mit einer sehr kleinen Zahl}}

{h{Denk an ein Feld mit lauter negativen Werten.}}
{H{Richtig! Nur so stimmt das Ergebnis in allen Fällen.}}

**3. Was kann die erweiterte for-Schleife nicht?** (Mehrfachauswahl)

{c1{!den Index verwenden}}

{c1{!rückwärts laufen}}

{c1{!Werte im Feld verändern}}

{c1{alle Werte nacheinander lesen}}

{h{Genau das Lesen ist ja ihr Zweck.}}
{H{Richtig! Zum Lesen ist sie ideal, für alles andere nimmt man die Zählschleife.}}

**4. Warum schreibt man in der Bedingung feld.length statt einer festen Zahl?**

{r3{weil es kürzer ist}}

{r3{!damit das Programm auch bei anderer Feldlänge richtig bleibt}}

{r3{weil Java feste Zahlen dort verbietet}}

{h{Denk an die Aufgabe, bei der ein achter Wert dazukam.}}
{H{Richtig!}}

**5. Wie viele Werte des Feldes mit den Zahlen 11, 8, 14, 6 und 12 sind mindestens 10?**

{z{3}}

{h{Zähle 11, 14 und 12.}}
{H{Richtig!}}

::::
