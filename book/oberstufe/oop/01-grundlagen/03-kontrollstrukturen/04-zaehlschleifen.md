---
title: Zählschleifen
index: 4
---

# Zählschleifen

Bei fast allen `while`-Schleifen der letzten Lektion sah es gleich aus: eine Zählvariable vorher setzen, im Kopf vergleichen, im Rumpf erhöhen. Weil dieses Muster so häufig ist, gibt es dafür eine eigene Schreibweise – die **Zählschleife** oder `for`-Schleife.

## Dasselbe in kurz

:::onlineide{height="450px" speed="1000000"}

```java Main.java
void main() {
    IO.println("--- mit while ---");
    int i = 1;
    while (i <= 5) {
        IO.println(i);
        i++;
    }

    IO.println("--- mit for ---");
    for (int j = 1; j <= 5; j++) {
        IO.println(j);
    }
}
```

:::

:::snippet{#merken}
```java
for (Initialisierung; Bedingung; Veränderung) {
    // Schleifenrumpf
}
```

Die drei Bestandteile jeder Schleife stehen jetzt **alle im Kopf**, getrennt durch Semikolons:

| Teil | im Beispiel | wann ausgeführt |
| --- | --- | --- |
| Initialisierung | `int j = 1` | genau einmal, vor dem ersten Durchlauf |
| Bedingung | `j <= 5` | vor jedem Durchlauf |
| Veränderung | `j++` | nach jedem Durchlauf |

Die Zählvariable wird meistens direkt im Kopf deklariert. Dann existiert sie **nur innerhalb** der Schleife.
:::

## Wann for, wann while?

:::snippet{#merken}
**Faustregel:**

- Weißt du **vorher, wie oft** wiederholt wird? → `for`
- Hängt das Ende von etwas ab, das sich erst während der Schleife herausstellt? → `while`

Beide Schleifenarten können dasselbe. Die Wahl macht nur deinen Code lesbarer – aber das ist wichtig genug.
:::

:::snippet{#aufgabe}
Entscheide für jede Situation, welche Schleifenart besser passt, und begründe kurz.

a) Alle Zahlen von 1 bis 100 ausgeben

b) So lange nach einem Passwort fragen, bis es stimmt

c) Die Buchstaben eines Wortes einzeln ausgeben

d) So lange verdoppeln, bis der Wert über eine Million steigt
:::

::::collapsible{title="Auflösung"}

a) `for` – die Anzahl steht fest.

b) `while` – wie oft gefragt wird, weiß man vorher nicht.

c) `for` – die Anzahl ergibt sich aus `wort.length()` und steht damit vor Beginn fest.

d) `while` – die Anzahl der Verdopplungen hängt vom Startwert ab und ist vorher nicht bekannt. (Man **kann** es mit `for` schreiben, aber es liest sich schlechter.)

::::

## Rückwärts und in Schritten

:::onlineide{height="450px" speed="1000000"}

```java Main.java
void main() {
    IO.println("--- rückwärts ---");
    for (int i = 10; i >= 1; i--) {
        IO.println(i);
    }

    IO.println("--- in Zweierschritten ---");
    for (int i = 0; i <= 20; i = i + 2) {
        IO.println(i);
    }
}
```

:::

:::snippet{#aufgabe}
Sage voraus, was dieses Programm ausgibt. Achte genau auf den Kopf der Schleife.
:::

:::onlineide{height="380px" speed="1000000"}

```java Main.java
void main() {
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            IO.println(i);
        }
    }
}
```

:::

::::collapsible{title="Auflösung"}

```
3
6
9
```

Die Schleife läuft zehnmal, aber die Verzweigung im Rumpf lässt nur die durch 3 teilbaren Zahlen durch.

::::

## Über eine Zeichenkette laufen

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    String wort = IO.readln("Gib ein Wort ein: ");

    for (int i = 0; i < wort.length(); i++) {
        IO.println(i + ": " + wort.charAt(i));
    }
}
```

:::

:::snippet{#merken}
Merke dir diesen Kopf – du wirst ihn hunderte Male schreiben:

```java
for (int i = 0; i < wort.length(); i++)
```

Er beginnt bei **0** und läuft mit `<` bis **kleiner als** die Länge. Beides zusammen trifft genau die gültigen Positionen 0 bis `length() - 1`.

Schreibst du versehentlich `<=`, greifst du eine Stelle hinter das Ende – ein Laufzeitfehler. Dieser Fehler ist so verbreitet, dass er einen Namen hat: **Zaunpfahlfehler** (englisch *off-by-one*).
:::

## Aufgabe 1: Vokale zählen

:::snippet{#aufgabe}
Schreibe ein Programm, das ein Wort einliest und zählt, wie viele Vokale (a, e, i, o, u) darin vorkommen.

Erweiterung: Zähle auch, wie viele Konsonanten es sind.
:::

:::onlineide{height="450px" speed="1000000"}

```java Main.java
void main() {
    String wort = IO.readln("Gib ein Wort ein: ");
    int vokale = 0;

    // Dein Code hier

    IO.println("Vokale: " + vokale);
}
```

:::

::::collapsible{title="Tipp 1: Ein Zeichen prüfen"}

Hol dir mit `wort.charAt(i)` das Zeichen an Position `i` und vergleiche es mit `'a'`, `'e'`, … – jeweils in **einfachen** Anführungszeichen, weil es ein `char` ist.

::::

::::collapsible{title="Tipp 2: Fünf Möglichkeiten in einer Bedingung"}

```java
char z = wort.charAt(i);
if (z == 'a' || z == 'e' || z == 'i' || z == 'o' || z == 'u') {
```

::::

::::collapsible{title="Tipp 3: Groß- und Kleinschreibung"}

Wenn jemand „Informatik“ mit großem I eingibt, findet dein Test das große I nicht. Am einfachsten wandelst du das ganze Wort vorher um: `wort = wort.toLowerCase();`

::::

:::protect{password="java-ef-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    String wort = IO.readln("Gib ein Wort ein: ").toLowerCase();
    int vokale = 0;

    for (int i = 0; i < wort.length(); i++) {
        char z = wort.charAt(i);
        if (z == 'a' || z == 'e' || z == 'i' || z == 'o' || z == 'u') {
            vokale++;
        }
    }

    IO.println("Vokale: " + vokale);
    IO.println("Übrige Zeichen: " + (wort.length() - vokale));
}
```

:::

## Aufgabe 2: Treppe zeichnen

:::snippet{#aufgabe}
Zeichne mit dem Stift eine Treppe aus sechs Stufen.

a) Entwickle zuerst ein Flussdiagramm auf Papier.

b) Setze es mit einer Zählschleife um.
:::

:::onlineide{libraries="scratch" height="520px"}

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
        stift.setSize(3);

        int x = -180;
        int y = -140;
        stift.setPosition(x, y);
        stift.down();

        // Dein Code hier

    }
}
```

:::

::::collapsible{title="Tipp 1: Was ist eine Stufe?"}

Eine Stufe besteht aus zwei Strecken: einmal nach **oben** und einmal nach **rechts**. Danach steht der Stift an der nächsten Stufe.

::::

::::collapsible{title="Tipp 2: Der Rumpf"}

```java
for (int i = 0; i < 6; i++) {
    y = y + 40;
    stift.setPosition(x, y);
    x = x + 40;
    stift.setPosition(x, y);
}
```

::::

:::protect{password="java-ef-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(3);

        int x = -180;
        int y = -140;
        stift.setPosition(x, y);
        stift.down();

        for (int i = 0; i < 6; i++) {
            y = y + 40;
            stift.setPosition(x, y);
            x = x + 40;
            stift.setPosition(x, y);
        }

        stift.up();
    }
}
```

:::

## Aufgabe 3: Vieleck

:::snippet{#aufgabe}
Zeichne ein regelmäßiges Vieleck mit dem Stift. Die Eckenzahl soll in einer Variablen stehen, damit du zwischen Dreieck, Fünfeck und Zwölfeck wechseln kannst.

Du brauchst dafür etwas Trigonometrie: Die Ecken eines regelmäßigen n-Ecks mit Radius `r` um den Mittelpunkt liegen bei

$$x_k = r \cdot \cos\left(\frac{2\pi k}{n}\right), \qquad y_k = r \cdot \sin\left(\frac{2\pi k}{n}\right)$$

für $k = 0, 1, \dots, n$.
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
        stift.setSize(3);

        int ecken = 6;
        double radius = 120;

        // Dein Code hier

    }
}
```

:::

::::collapsible{title="Tipp: Die Winkelfunktionen in Java"}

`Math.cos(...)` und `Math.sin(...)` erwarten den Winkel im **Bogenmaß**, nicht in Grad. Die Formel oben liefert genau das schon richtig.

Für die Positionen brauchst du `int`-Werte, also musst du das Ergebnis umwandeln – zum Beispiel mit `(int) Math.round(...)`.

::::

:::protect{password="java-ef-3-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(3);

        int ecken = 6;
        double radius = 120;

        for (int k = 0; k <= ecken; k++) {
            double winkel = 2 * Math.PI * k / ecken;
            int x = (int) Math.round(radius * Math.cos(winkel));
            int y = (int) Math.round(radius * Math.sin(winkel));

            stift.setPosition(x, y);
            if (k == 0) {
                stift.down();
            }
        }

        stift.up();
    }
}
```

Die Schleife läuft bis **einschließlich** `ecken`, damit die letzte Kante zurück zum Startpunkt gezeichnet wird. Der Stift wird erst nach dem ersten Punkt abgesenkt – sonst entstünde eine Linie aus der Bühnenmitte.

:::

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge stehen die drei Teile im Kopf einer for-Schleife?**

{r1{!Initialisierung, Bedingung, Veränderung}}

{r1{Bedingung, Initialisierung, Veränderung}}

{r1{Veränderung, Bedingung, Initialisierung}}

{h{Der erste Teil wird genau einmal ausgeführt.}}
{H{Richtig!}}

**2. Wann wird die Veränderung im Kopf ausgeführt?**

{r2{vor dem ersten Durchlauf}}

{r2{!nach jedem Durchlauf}}

{r2{nur wenn die Bedingung falsch wird}}

{h{Sie bereitet den nächsten Durchlauf vor.}}
{H{Richtig! Danach wird wieder die Bedingung geprüft.}}

**3. Wie heißt der Fehler, bei dem man eine Stelle zu weit läuft?**

{r3{Endlosschleife}}

{r3{!Zaunpfahlfehler}}

{r3{Laufzeitfehler}}

{h{Auf Englisch heißt er off-by-one.}}
{H{Richtig! Er entsteht meist durch kleinergleich statt kleiner.}}

**4. Wann nimmt man besser eine while-Schleife?** (Mehrfachauswahl)

{c1{!wenn die Anzahl der Durchläufe vorher unbekannt ist}}

{c1{!wenn so lange gefragt wird, bis die Eingabe stimmt}}

{c1{wenn alle Zeichen eines Wortes durchlaufen werden}}

{c1{wenn von 1 bis 100 gezählt wird}}

{h{Bei bekannter Anzahl ist die Zählschleife lesbarer.}}
{H{Richtig! Können tun beide dasselbe - es geht um die Lesbarkeit.}}

**5. Bis zu welcher Position darf man in einem Wort der Länge 7 höchstens zugreifen?**

{z{6}}

{h{Die Zählung beginnt bei 0.}}
{H{Richtig!}}

::::
