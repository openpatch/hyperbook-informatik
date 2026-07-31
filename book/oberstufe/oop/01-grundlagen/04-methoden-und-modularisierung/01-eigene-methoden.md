---
title: Eigene Methoden
index: 1
---

# Eigene Methoden

`IO.println`, `Math.sqrt`, `wort.length()` – all das sind **Methoden**, die andere für dich geschrieben haben. Jetzt schreibst du eigene.

## Ein schlechtes Beispiel

:::snippet{#aufgabe}
Lies das folgende Programm.

a) Was zeichnet es?

b) Erkläre, was man an dieser Umsetzung **in erster Linie** kritisieren sollte.

c) Stell dir vor, alle Bäume sollen braune statt schwarze Stämme bekommen. Wie viele Stellen musst du ändern?
:::

:::onlineide{libraries="scratch" height="540px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(6);

        // Baum 1
        stift.setColor(0, 0, 0);
        stift.setPosition(-150, -120);
        stift.down();
        stift.setPosition(-150, -40);
        stift.up();
        stift.setColor(0, 160, 0);
        stift.setSize(40);
        stift.setPosition(-150, -10);
        stift.down();
        stift.up();
        stift.setSize(6);

        // Baum 2
        stift.setColor(0, 0, 0);
        stift.setPosition(0, -120);
        stift.down();
        stift.setPosition(0, -40);
        stift.up();
        stift.setColor(0, 160, 0);
        stift.setSize(40);
        stift.setPosition(0, -10);
        stift.down();
        stift.up();
        stift.setSize(6);

        // Baum 3
        stift.setColor(0, 0, 0);
        stift.setPosition(150, -120);
        stift.down();
        stift.setPosition(150, -40);
        stift.up();
        stift.setColor(0, 160, 0);
        stift.setSize(40);
        stift.setPosition(150, -10);
        stift.down();
        stift.up();
        stift.setSize(6);
    }
}
```

:::

::::collapsible{title="Auflösung"}

a) Drei Bäume nebeneinander – jeweils ein schwarzer Stamm mit einer grünen Krone.

b) Derselbe Ablauf steht **dreimal fast wortgleich** da. Unterschied ist nur die x-Koordinate. Das ist:

- **lang und unübersichtlich** – man muss dreimal dasselbe lesen, um zu erkennen, dass es dasselbe ist;
- **fehleranfällig** – beim Kopieren vergisst man leicht, eine der drei x-Koordinaten anzupassen;
- **schlecht änderbar** – siehe c).

c) An **drei** Stellen. Bei zwanzig Bäumen an zwanzig Stellen. Und wenn man eine vergisst, hat man einen Baum mit dem falschen Stamm – und merkt es vielleicht nicht.

::::

## Die Lösung: eine eigene Methode

:::onlineide{libraries="scratch" height="540px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    private Pen stift;

    public Buehne() {
        stift = new Pen();
        this.add(stift);

        zeichneBaum(-150);
        zeichneBaum(0);
        zeichneBaum(150);
    }

    /**
     * Zeichnet einen Baum mit Stamm und Krone.
     * @param pXKoord x-Koordinate des Stamms
     */
    private void zeichneBaum(int pXKoord) {
        stift.setSize(6);
        stift.setColor(0, 0, 0);
        stift.setPosition(pXKoord, -120);
        stift.down();
        stift.setPosition(pXKoord, -40);
        stift.up();

        stift.setColor(0, 160, 0);
        stift.setSize(40);
        stift.setPosition(pXKoord, -10);
        stift.down();
        stift.up();
    }
}
```

:::

:::snippet{#merken}
Eine **Methode** ist ein benannter Block von Anweisungen. Sie besteht aus:

```java
private void zeichneBaum(int pXKoord) {
   ^       ^       ^          ^
   |       |       |          └── Parameterliste
   |       |       └── Name der Methode
   |       └── Rückgabetyp (void = gibt nichts zurück)
   └── Sichtbarkeit
}
```

- Der **Aufruf** `zeichneBaum(-150)` springt in die Methode, führt sie aus und kehrt danach zurück.
- Der Wert in Klammern beim Aufruf heißt **Argument**, die Variable in der Methode **Parameter**.
- Parameter benennen wir mit dem Präfix `p` – so sieht man sofort, dass der Wert von außen kommt.
:::

:::snippet{#aufgabe}
Zurück zur Frage von vorhin: Wie viele Stellen musst du jetzt ändern, damit alle Bäume braune Stämme bekommen?

Ändere `stift.setColor(0, 0, 0)` in `stift.setColor(120, 70, 20)` und zähle mit.
:::

::::collapsible{title="Auflösung"}

**Eine.** Das ist der ganze Punkt.

Das ist der Kern der Problemlösestrategie **Modularisierung**: Ein Sachverhalt wird an genau einer Stelle beschrieben. Ändert er sich, ändert man eine Stelle.

<!-- KLP EF, Algorithmen: entwerfen Algorithmen auch unter Nutzung der Problemlösestrategie "Modularisierung" (M) -->

::::

## Methoden ohne Grafik

Auch außerhalb der Bühne schreibst du Methoden. In einer Datei mit `void main()` stehen sie einfach daneben:

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    begruesse("Ada");
    begruesse("Alan");
    begruesse("Grace");

    trennlinie();
    IO.println("Fertig.");
}

/** Gibt eine persönliche Begrüßung aus. */
void begruesse(String pName) {
    IO.println("Hallo " + pName + "!");
    IO.println("Schön, dass du da bist.");
}

/** Gibt eine Trennlinie aus. */
void trennlinie() {
    IO.println("--------------------");
}
```

:::

:::snippet{#merken}
Woran erkennst du, dass etwas eine eigene Methode werden sollte?

- Du hast Code **kopiert** – fast immer ein Grund für eine Methode.
- Ein Abschnitt lässt sich mit **einem Satz** benennen („zeichnet einen Baum“, „prüft die Eingabe“).
- Ein Block ist so lang, dass du beim Lesen den Anfang vergisst.

Und dokumentiere sie: Über jede Methode gehört ein Kommentar, der sagt, **was** sie tut und **was die Parameter bedeuten**.
:::

## Aufgabe 1: Rahmen

:::snippet{#aufgabe}
Schreibe eine Methode `zeichneRahmen(String pText)`, die einen Text eingerahmt ausgibt:

```
+------------+
| Informatik |
+------------+
```

Die Breite des Rahmens soll sich nach der Länge des Textes richten.
:::

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    zeichneRahmen("Informatik");
    zeichneRahmen("Java");
    zeichneRahmen("Ein längerer Text");
}

void zeichneRahmen(String pText) {
    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Die Randzeile"}

Sie besteht aus einem Pluszeichen, dann so vielen Minuszeichen wie der Text lang ist plus zwei, dann wieder einem Pluszeichen. Für die Minuszeichen brauchst du eine Schleife.

::::

::::collapsible{title="Tipp 2: Zweimal dasselbe"}

Die obere und die untere Randzeile sind identisch. Das ist schon wieder kopierter Code – lagere ihn in eine **zweite** Methode aus. Methoden dürfen sich gegenseitig aufrufen.

::::

:::protect{password="java-ef-4-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    zeichneRahmen("Informatik");
    zeichneRahmen("Java");
    zeichneRahmen("Ein längerer Text");
}

/**
 * Gibt den Text in einem Rahmen aus.
 * @param pText der einzurahmende Text
 */
void zeichneRahmen(String pText) {
    zeichneRandzeile(pText.length());
    IO.println("| " + pText + " |");
    zeichneRandzeile(pText.length());
}

/**
 * Gibt eine Randzeile passend zur Textlänge aus.
 * @param pTextlaenge Anzahl der Zeichen des Textes
 */
void zeichneRandzeile(int pTextlaenge) {
    IO.print("+");
    for (int i = 0; i < pTextlaenge + 2; i++) {
        IO.print("-");
    }
    IO.println("+");
}
```

:::

## Aufgabe 2: Eine Häuserzeile

:::snippet{#aufgabe}
Erinnerst du dich an das Haus aus Kapitel 1? Baue es zu einer Methode `zeichneHaus(int pXKoord)` um und stelle damit vier Häuser nebeneinander – mit einer Schleife.
:::

:::onlineide{libraries="scratch" height="540px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    private Pen stift;

    public Buehne() {
        stift = new Pen();
        this.add(stift);
        stift.setSize(3);

        // Dein Code hier

    }

    private void zeichneHaus(int pXKoord) {
        // Dein Code hier

    }
}
```

:::

::::collapsible{title="Tipp: Von absoluten zu relativen Koordinaten"}

Im Haus aus Kapitel 1 standen feste Zahlen wie `-60` und `60`. Jetzt sollen sie sich nach `pXKoord` richten: aus `-60` wird `pXKoord - 60`, aus `60` wird `pXKoord + 60`.

Die y-Koordinaten bleiben, wie sie sind – die Häuser stehen ja alle gleich hoch.

::::

:::protect{password="java-ef-4-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    private Pen stift;

    public Buehne() {
        stift = new Pen();
        this.add(stift);
        stift.setSize(3);

        for (int x = -180; x <= 180; x = x + 120) {
            zeichneHaus(x);
        }
    }

    /**
     * Zeichnet ein Haus mit quadratischer Wand und Satteldach.
     * @param pXKoord x-Koordinate der Hausmitte
     */
    private void zeichneHaus(int pXKoord) {
        stift.setPosition(pXKoord - 40, -100);
        stift.down();
        stift.setPosition(pXKoord + 40, -100);
        stift.setPosition(pXKoord + 40, -20);
        stift.setPosition(pXKoord, 30);
        stift.setPosition(pXKoord - 40, -20);
        stift.setPosition(pXKoord - 40, -100);
        stift.setPosition(pXKoord + 40, -20);
        stift.up();
    }
}
```

:::

## Zusatzaufgabe

:::snippet{#brain}
Erweitere `zeichneHaus` um einen zweiten Parameter für die **Größe**, sodass du unterschiedlich große Häuser zeichnen kannst.

Zeichne damit eine Häuserzeile, bei der die Häuser nach hinten hin kleiner werden.
:::

---

## Selbsttest

::::multievent

**1. Wie heißt der Wert, den man beim Aufruf in die Klammern schreibt?**

{r1{Parameter}}

{r1{!Argument}}

{r1{Rückgabewert}}

{h{Der andere Begriff bezeichnet die Variable innerhalb der Methode.}}
{H{Richtig! Argument beim Aufruf, Parameter in der Methode.}}

**2. Was bedeutet der Rückgabetyp void?**

{r2{Die Methode hat keine Parameter.}}

{r2{!Die Methode gibt keinen Wert zurück.}}

{r2{Die Methode ist leer.}}

{h{Es geht um das, was nach dem Ausführen zurückkommt.}}
{H{Richtig!}}

**3. Woran erkennst du, dass ein Abschnitt eine eigene Methode werden sollte?** (Mehrfachauswahl)

{c1{!Du hast Code kopiert.}}

{c1{!Der Abschnitt lässt sich mit einem Satz benennen.}}

{c1{!Der Block ist so lang, dass man den Anfang vergisst.}}

{c1{Der Abschnitt enthält eine Schleife.}}

{h{Eine Schleife allein ist kein Grund.}}
{H{Richtig! Kopierter Code ist der stärkste Hinweis.}}

**4. Wie viele Stellen muss man ändern, wenn derselbe Ablauf in einer Methode statt fünfmal kopiert steht?**

{z{1}}

{h{Genau darum geht es bei der Modularisierung.}}
{H{Richtig!}}

**5. Wie heißt die Problemlösestrategie, ein Problem in benannte Teilaufgaben zu zerlegen?**

{r3{Rekursion}}

{r3{!Modularisierung}}

{r3{Iteration}}

{h{Sie war die Antwort auf die dreifach kopierten Bäume.}}
{H{Richtig!}}

::::
