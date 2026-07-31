---
title: Variablen
index: 1
---

# Variablen

Am Ende des letzten Kapitels hast du fünf fast identische Blöcke abgetippt, um fünf Münzen zu platzieren. Das war mühsam. Das erste Werkzeug gegen solche Mühsal ist die **Variable**.

Eine :t[Variable]{#variable} ist ein benannter Speicherplatz. Sie hat einen **Bezeichner** (einen Namen) und einen **Datentyp**, der festlegt, welche Werte sie aufnehmen kann.

## Deklarieren und zuweisen

:::onlineide{height="360px"}

```java Main.java
void main() {
    int a;
    a = 12;
    IO.println(a);
    IO.println(3 * a + 5);
    IO.println("Der Wert ist " + a);
}
```

:::

:::snippet{#merken}
- `int a;` ist eine **Deklaration**: Sie legt die Variable `a` vom Typ `int` an.
- `a = 12;` ist eine **Wertzuweisung**: Sie schreibt den Wert 12 in die Variable.
- Beides zusammen geht auch in einer Zeile: `int a = 12;`
- Das Zeichen `=` bedeutet **nicht** „ist gleich“, sondern „bekommt den Wert“. Es wird immer von **rechts nach links** gelesen.
:::

## Ein Bild für die Variable

Stell dir eine Variable als ein **beschriftetes Whiteboard** vor, auf dem genau ein Wert Platz hat. Eine Wertzuweisung wischt den alten Wert weg und schreibt den neuen hin.

Mit diesem Bild löst du die nächste Aufgabe.

:::snippet{#aufgabe}
Sage **ohne Rechner** voraus, was ausgegeben wird. Erkläre besonders die dritte Zeile.
:::

:::onlineide{height="340px"}

```java Main.java
void main() {
    int a;
    a = 37;
    a = a + 1;
    IO.println(a);
}
```

:::

::::collapsible{title="Auflösung"}

Ausgegeben wird **38**.

Die Zeile `a = a + 1;` ist als Gleichung gelesen unsinnig – keine Zahl ist um eins größer als sie selbst. Als Zuweisung gelesen ergibt sie Sinn:

1. Zuerst wird die **rechte** Seite ausgerechnet: Der aktuelle Wert von `a` ist 37, plus 1 ergibt 38.
2. Dann wird dieses Ergebnis in `a` geschrieben. Der alte Wert 37 wird überschrieben.

::::

## Abkürzungen

:::onlineide{height="400px"}

```java Main.java
void main() {
    int a = 12;
    a += 7;
    IO.println(a);
    a--;
    IO.println(a);
    a++;
    IO.println(a);
    a = a * 3;
    IO.println(a);
}
```

:::

:::snippet{#merken}
| Kurzform | Bedeutung |
| --- | --- |
| `a += 7` | `a = a + 7` |
| `a -= 7` | `a = a - 7` |
| `a *= 2` | `a = a * 2` |
| `a++` | `a = a + 1` |
| `a--` | `a = a - 1` |
:::

## Gute Bezeichner

:::snippet{#merken}
Regeln, die Java erzwingt:

- Ein Bezeichner beginnt mit einem Buchstaben und enthält keine Leerzeichen.
- Groß- und Kleinschreibung wird unterschieden: `alter` und `Alter` sind zwei verschiedene Variablen.

Regeln, die guter Stil erzwingt:

- Der Name sagt, **was drin steht**: `anzahlSchueler` statt `x`.
- Variablen beginnen klein, weitere Wörter groß: `mittlereNote`. Das nennt man *Binnenmajuskel* oder *camelCase*.
:::

:::snippet{#aufgabe}
Beurteile die folgenden Bezeichner. Welche sind in Java überhaupt erlaubt, welche davon sind gute Namen?

`x` · `AnzahlSchueler` · `anzahl schueler` · `anzahlSchueler` · `a1` · `summeDerNoten` · `2teZahl`
:::

::::collapsible{title="Auflösung"}

| Bezeichner | erlaubt? | guter Name? |
| --- | --- | --- |
| `x` | ja | nur als Koordinate; sonst nichtssagend |
| `AnzahlSchueler` | ja | erlaubt, aber unüblich – der Großbuchstabe am Anfang ist Klassen vorbehalten |
| `anzahl schueler` | **nein** – Leerzeichen | – |
| `anzahlSchueler` | ja | ja, so macht man es |
| `a1` | ja | nichtssagend |
| `summeDerNoten` | ja | ja |
| `2teZahl` | **nein** – beginnt mit einer Ziffer | – |

::::

## Variablen in der Grafik

Jetzt lösen wir das Problem vom Ende des letzten Kapitels – zumindest halb.

:::onlineide{libraries="scratch" height="520px"}

```java Main.java
void main() {
    new Buehne();
}
```

```java Buehne.java
public class Buehne extends Stage {

    public Buehne() {
        int abstand = 80;
        int startX = -160;

        Sprite m1 = new Sprite();
        m1.addCostume("coin_gold");
        m1.setPosition(startX, 0);
        this.add(m1);

        Sprite m2 = new Sprite();
        m2.addCostume("coin_gold");
        m2.setPosition(startX + abstand, 0);
        this.add(m2);

        Sprite m3 = new Sprite();
        m3.addCostume("coin_gold");
        m3.setPosition(startX + 2 * abstand, 0);
        this.add(m3);
    }
}
```

:::

:::snippet{#aufgabe}
a) Ändere **nur die Zahl** hinter `abstand` und beobachte, was passiert.

b) Erkläre, was durch die Variablen besser geworden ist – und was immer noch stört.
:::

::::collapsible{title="Auflösung zu b)"}

**Besser:** Der Abstand steht nur noch an **einer** Stelle. Willst du ihn ändern, änderst du eine Zahl statt fünf.

**Stört noch:** Für jede weitere Münze musst du weiterhin vier Zeilen abtippen. Variablen lösen das Problem der *mehrfach genannten Werte*, nicht das Problem der *mehrfach geschriebenen Anweisungen*. Dafür brauchst du Schleifen – Kapitel 3.

::::

## Aufgabe: Kreisberechnung

:::snippet{#aufgabe}
Schreibe ein Programm, das zu einem Radius den Umfang und den Flächeninhalt eines Kreises berechnet und ausgibt.

Der Radius soll in **einer** Variablen stehen, sodass sich das Programm mit einer einzigen Änderung auf einen anderen Kreis umstellen lässt.
:::

:::onlineide{height="400px"}

```java Main.java
void main() {
    double radius = 5.0;

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp: Woher bekomme ich Pi?"}

Java kennt die Kreiszahl bereits: `Math.PI`. Du musst sie nicht selbst abtippen.

::::

:::protect{password="java-ef-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    double radius = 5.0;

    double umfang = 2 * Math.PI * radius;
    double flaeche = Math.PI * radius * radius;

    IO.println("Radius:  " + radius);
    IO.println("Umfang:  " + umfang);
    IO.println("Fläche:  " + flaeche);
}
```

:::

## Zusatzaufgabe: Tauschen

:::snippet{#brain}
Zwei Variablen `a` und `b` enthalten Zahlen. Schreibe die Anweisungen, die ihre Werte **vertauschen** – am Ende soll in `a` stehen, was vorher in `b` stand, und umgekehrt.

Zwei Zeilen genügen **nicht**. Probiere zuerst `a = b; b = a;` aus und erkläre, warum das schiefgeht.
:::

::::collapsible{title="Tipp"}

Denk an das Whiteboard: Sobald du den neuen Wert auf `a` schreibst, ist der alte weg. Du brauchst vorher einen Platz, wo du ihn zwischenlagerst.

::::

:::protect{password="java-ef-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int a = 3;
    int b = 8;

    int merker = a;
    a = b;
    b = merker;

    IO.println("a = " + a + ", b = " + b);
}
```

Bei `a = b; b = a;` überschreibt die erste Zeile den alten Wert von `a`. Die zweite Zeile schreibt dann den Wert von `b` in `b` zurück – am Ende steht in beiden Variablen derselbe Wert.

:::

---

## Selbsttest

::::multievent

**1. Was steht nach diesen beiden Anweisungen in a: zuerst a gleich 5, dann a gleich a plus 3?**

{z{8}}

{h{Rechts wird zuerst ausgewertet, dann links zugewiesen.}}
{H{Richtig!}}

**2. In welche Richtung liest man eine Wertzuweisung?**

{r1{von links nach rechts}}

{r1{!von rechts nach links}}

{r1{beides gleichzeitig}}

{h{Erst wird die rechte Seite ausgerechnet, dann gespeichert.}}
{H{Genau. Das Ergebnis der rechten Seite landet in der Variablen links.}}

**3. Welche Bezeichner sind in Java erlaubt?** (Mehrfachauswahl)

{c1{!anzahlSchueler}}

{c1{!a1}}

{c1{anzahl schueler}}

{c1{2teZahl}}

{h{Kein Leerzeichen und keine Ziffer am Anfang.}}
{H{Richtig! Leerzeichen und führende Ziffern sind nicht erlaubt.}}

**4. Wofür ist die Kurzform mit dem doppelten Pluszeichen eine Abkürzung?**

{r2{für a gleich a plus a}}

{r2{!für a gleich a plus 1}}

{r2{für a gleich a mal 2}}

{h{Es erhöht die Variable um genau einen Schritt.}}
{H{Richtig!}}

**5. Ergänze: Die Anweisung int alter; ist eine {t{Deklaration}} der Variablen alter.**

::::
