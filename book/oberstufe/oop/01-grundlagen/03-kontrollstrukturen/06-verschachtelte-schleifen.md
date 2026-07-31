---
title: Verschachtelte Schleifen
index: 6
---

# Verschachtelte Schleifen

Eine Schleife darf im Rumpf einer anderen Schleife stehen. Das klingt harmlos, ist aber der Schritt von Linien zu Flächen – und der Punkt, an dem die Anzahl der Durchläufe plötzlich explodiert.

## Das Grundmuster

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    for (int zeile = 1; zeile <= 3; zeile++) {
        for (int spalte = 1; spalte <= 4; spalte++) {
            IO.print(zeile + "/" + spalte + "  ");
        }
        IO.println();
    }
}
```

:::

:::snippet{#aufgabe}
Sage **vor** dem Ausführen voraus:

a) Wie viele Ausgaben von Zahlenpaaren erscheinen insgesamt?

b) In welcher Reihenfolge?
:::

::::collapsible{title="Auflösung"}

```
1/1  1/2  1/3  1/4
2/1  2/2  2/3  2/4
3/1  3/2  3/3  3/4
```

Es sind **3 · 4 = 12** Paare.

Die **äußere** Schleife läuft langsam: Sie geht erst zur nächsten Zeile, wenn die innere Schleife komplett durchgelaufen ist. Die **innere** läuft bei jedem einzelnen Durchlauf der äußeren wieder von vorne los.

Das `IO.println()` ohne Argument macht nur einen Zeilenumbruch. Es steht **im Rumpf der äußeren** Schleife – deshalb gibt es einen Umbruch pro Zeile, nicht pro Zahl.

::::

:::snippet{#merken}
Bei zwei verschachtelten Schleifen mit `n` und `m` Durchläufen wird der innere Rumpf **n · m mal** ausgeführt.

Aus 10 und 10 werden 100. Aus 1000 und 1000 werden eine Million. Diese Multiplikation ist der Grund, warum verschachtelte Schleifen bei großen Datenmengen schnell zu langsam werden – dazu mehr in Kapitel 7.
:::

## Ein Punktegitter

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
        stift.setSize(8);

        for (int y = -120; y <= 120; y = y + 60) {
            for (int x = -200; x <= 200; x = x + 50) {
                stift.setPosition(x, y);
                stift.down();
                stift.up();
            }
        }
    }
}
```

:::

:::snippet{#aufgabe}
a) Zähle **ohne Rechner** aus, wie viele Punkte gezeichnet werden.

b) Färbe jede Zeile anders ein. Wo im Programm gehört die Farbänderung hin?
:::

::::collapsible{title="Auflösung"}

a) In x-Richtung: von -200 bis 200 in Schritten von 50 – das sind 9 Werte. In y-Richtung: von -120 bis 120 in Schritten von 60 – das sind 5 Werte. Zusammen **45 Punkte**.

b) Die Farbe gehört in den Rumpf der **äußeren** Schleife, vor die innere Schleife. Dort wird sie einmal pro Zeile gesetzt.

::::

## Ein Schachbrettmuster

:::snippet{#aufgabe}
Ändere das Punktegitter so, dass abwechselnd rote und blaue Punkte entstehen – wie auf einem Schachbrett.

Erst denken: Woran erkennst du, ob ein Feld rot oder blau sein muss?
:::

::::collapsible{title="Tipp 1: Die Idee"}

Zähle die Zeilen und Spalten mit **Nummern** (0, 1, 2, …) statt mit Koordinaten. Dann entscheidet die Summe aus Zeilennummer und Spaltennummer über die Farbe.

::::

::::collapsible{title="Tipp 2: Gerade oder ungerade"}

Ist `(zeile + spalte) % 2 == 0`, nimm die eine Farbe, sonst die andere.

::::

:::protect{password="java-ef-3-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        Pen stift = new Pen();
        this.add(stift);
        stift.setSize(20);

        for (int zeile = 0; zeile < 5; zeile++) {
            for (int spalte = 0; spalte < 9; spalte++) {
                if ((zeile + spalte) % 2 == 0) {
                    stift.setColor(200, 0, 0);
                } else {
                    stift.setColor(0, 0, 200);
                }

                stift.setPosition(-200 + spalte * 50, -120 + zeile * 60);
                stift.down();
                stift.up();
            }
        }
    }
}
```

Beachte den Wechsel: Statt die Koordinate direkt hochzuzählen, zählen wir jetzt **Nummern** und **rechnen** die Koordinate daraus aus. Dieses Muster brauchst du bei Feldern in Kapitel 5 ständig.

:::

## Aufgabe 1: Das kleine Einmaleins

:::snippet{#aufgabe}
Gib das kleine Einmaleins als Tabelle aus:

```
  1   2   3   4   5   6   7   8   9  10
  2   4   6   8  10  12  14  16  18  20
  3   6   9  12  15  18  21  24  27  30
  ...
```
:::

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Zwei Schleifen"}

Die äußere Schleife zählt die Zeilen (den ersten Faktor), die innere die Spalten (den zweiten Faktor).

::::

::::collapsible{title="Tipp 2: Ausgabe ohne Umbruch"}

`IO.print(...)` gibt aus, **ohne** eine neue Zeile zu beginnen. `IO.println()` ohne Argument macht nur den Umbruch. Damit baust du zeilenweise auf.

::::

:::protect{password="java-ef-3-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    for (int a = 1; a <= 10; a++) {
        for (int b = 1; b <= 10; b++) {
            int produkt = a * b;
            if (produkt < 10) {
                IO.print("  ");
            } else if (produkt < 100) {
                IO.print(" ");
            }
            IO.print(produkt + " ");
        }
        IO.println();
    }
}
```

Die Verzweigung sorgt dafür, dass die Spalten untereinander stehen: Zweistellige Zahlen bekommen ein Leerzeichen weniger als einstellige.

:::

## Aufgabe 2: Dreieck aus Sternen

:::snippet{#aufgabe}
Gib folgendes Muster aus:

```
*
**
***
****
*****
```

Anschließend: Wie musst du das Programm ändern, damit das Dreieck **rechtsbündig** steht?
:::

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    int hoehe = 5;

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp"}

In der ersten Zeile steht ein Stern, in der zweiten zwei, … Die innere Schleife läuft also nicht immer gleich oft, sondern **abhängig von der Zeilennummer**.

::::

:::protect{password="java-ef-3-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int hoehe = 5;

    for (int zeile = 1; zeile <= hoehe; zeile++) {
        for (int i = 1; i <= zeile; i++) {
            IO.print("*");
        }
        IO.println();
    }
}
```

Für ein rechtsbündiges Dreieck stellst du vor die Sterne eine zweite innere Schleife, die `hoehe - zeile` Leerzeichen ausgibt.

:::

## Zusatzaufgabe

:::snippet{#brain}
Zeichne mit dem Stift **Quadrate ineinander**: acht Quadrate mit gemeinsamem Mittelpunkt und wachsender Seitenlänge.

Überlege zuerst: Welche Schleife ist die äußere, welche die innere? Und wo liegt die linke untere Ecke eines Quadrats mit der Seitenlänge `s`, wenn der Mittelpunkt bei (0, 0) sein soll?
:::

---

## Selbsttest

::::multievent

**1. Wie oft läuft der innere Rumpf bei einer äußeren Schleife mit 6 und einer inneren mit 7 Durchläufen?**

{z{42}}

{h{Die Anzahlen werden multipliziert.}}
{H{Richtig!}}

**2. Welche Schleife läuft schneller durch ihre Werte?**

{r1{die äußere}}

{r1{!die innere}}

{r1{beide gleich schnell}}

{h{Die innere Schleife startet bei jedem Durchlauf der äußeren neu.}}
{H{Richtig! Die äußere rückt erst weiter, wenn die innere fertig ist.}}

**3. Wo gehört der Zeilenumbruch bei einer Tabellenausgabe hin?**

{r2{in den Rumpf der inneren Schleife}}

{r2{!in den Rumpf der äußeren Schleife, hinter die innere}}

{r2{vor beide Schleifen}}

{h{Pro Zeile soll genau ein Umbruch entstehen.}}
{H{Richtig!}}

**4. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Verschachtelte Schleifen eignen sich für Gitter und Tabellen.}}

{c1{!Die Anzahl der Durchläufe wächst multiplikativ.}}

{c1{!Die innere Schleife darf von der äußeren Zählvariablen abhängen.}}

{c1{Beide Schleifen müssen gleich viele Durchläufe haben.}}

{h{Denk an das Sternendreieck.}}
{H{Richtig! Beim Dreieck hängt die innere Anzahl von der Zeilennummer ab.}}

**5. Woran erkennst du beim Schachbrettmuster, ob ein Feld die eine oder die andere Farbe bekommt?**

{r3{an der Zeilennummer allein}}

{r3{!daran, ob die Summe aus Zeilen- und Spaltennummer gerade ist}}

{r3{an der Spaltennummer allein}}

{h{Innerhalb einer Zeile wechselt die Farbe ja auch.}}
{H{Richtig!}}

::::
