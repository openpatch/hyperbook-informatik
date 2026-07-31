---
title: Datentypen
index: 2
---

# Datentypen

Jede :t[Variable]{#variable} hat einen :t[Datentyp]{#datentyp}. Er legt fest, welche Werte sie speichern kann, wie viel Platz sie im Speicher belegt und welche Operationen mit ihr erlaubt sind.

<!-- KLP EF, Daten und ihre Strukturierung: ordnen Attributen, Parametern und Rückgaben von Methoden Datentypen und grundlegende Datenstrukturen zu (M) -->

## Die elementaren Datentypen

:::snippet{#merken}
| Typ | speichert | Beispielwert | typische Verwendung |
| --- | --- | --- | --- |
| `int` | ganze Zahlen | `42`, `-7` | Anzahlen, Positionen, Indizes |
| `double` | Kommazahlen | `3.5`, `-0.75` | Messwerte, Noten, Preise |
| `boolean` | Wahrheitswerte | `true`, `false` | Ja/Nein-Entscheidungen |
| `char` | ein einzelnes Zeichen | `'A'`, `'?'` | einzelne Buchstaben |

Diese vier heißen **elementare** oder **primitive** Datentypen: Der Wert steckt direkt in der Variablen.
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    int anzahl = 42;
    double note = 2.3;
    boolean bestanden = true;
    char klasse = 'Q';

    IO.println("Anzahl:    " + anzahl);
    IO.println("Note:      " + note);
    IO.println("Bestanden: " + bestanden);
    IO.println("Klasse:    " + klasse);
}
```

:::

:::snippet{#merken}
Achte auf die Anführungszeichen:

- `'A'` mit **einfachen** Anführungszeichen ist ein `char` – genau ein Zeichen.
- `"A"` mit **doppelten** Anführungszeichen ist ein `String` – eine Zeichenkette, die zufällig ein Zeichen lang ist.
:::

## Objekttypen

Neben den elementaren Typen gibt es **Objekttypen** (auch: Referenzdatentypen). Ihre Werte sind Objekte, und die Variable enthält nicht das Objekt selbst, sondern einen **Verweis** darauf.

`String` ist der Objekttyp, dem du am häufigsten begegnest. Auch `Sprite` und `Pen` aus dem letzten Kapitel sind Objekttypen.

:::onlineide{height="360px"}

```java Main.java
void main() {
    int a = 1;
    String b = "Hallo";

    IO.println("elementare Variable a: " + a);
    IO.println("Objektvariable b:      " + b);
}
```

:::

:::snippet{#merken}
- **Elementarer Typ**: In der Variablen steht der Wert selbst.
- **Objekttyp**: In der Variablen steht eine Referenz – eine Art Wegbeschreibung zum eigentlichen Objekt.

Objekttypen beginnen mit einem **Großbuchstaben** (`String`, `Sprite`), elementare Typen klein (`int`, `double`). Daran erkennst du sie auf einen Blick.

Was dieser Unterschied praktisch bedeutet, wird in Kapitel 6 und im Lernpfad *Erweiterungen* wichtig.
:::

## Was passiert bei gemischten Typen?

:::snippet{#aufgabe}
Sage **ohne Rechner** voraus, was die vier Zeilen ausgeben. Achte besonders auf die letzte.
:::

:::onlineide{height="380px"}

```java Main.java
void main() {
    int ganz = 7;
    double komma = 2.0;

    IO.println(ganz + komma);
    IO.println(ganz / 2);
    IO.println(ganz / komma);
    IO.println("Ergebnis: " + ganz + 2);
}
```

:::

::::collapsible{title="Auflösung"}

```
9.0
3
3.5
Ergebnis: 72
```

Die ersten drei Zeilen kennst du schon: Sobald ein `double` beteiligt ist, wird als Kommazahl gerechnet.

Die letzte Zeile ist die Falle. Das Pluszeichen bedeutet bei Zeichenketten **Aneinanderhängen**. Java arbeitet von links nach rechts:

1. `"Ergebnis: " + ganz` → die Zeichenkette `"Ergebnis: 7"`
2. `"Ergebnis: 7" + 2` → die Zeichenkette `"Ergebnis: 72"`

Willst du 9 sehen, musst du klammern: `"Ergebnis: " + (ganz + 2)`.

::::

## Typumwandlung

Manchmal musst du einen Wert von einem Typ in einen anderen überführen.

:::onlineide{height="400px"}

```java Main.java
void main() {
    int punkte = 7;
    int maximum = 9;

    IO.println("falsch: " + (punkte / maximum));
    IO.println("richtig: " + ((double) punkte / maximum));

    double genau = 3.99;
    IO.println("abgeschnitten: " + (int) genau);
    IO.println("gerundet:      " + Math.round(genau));
}
```

:::

:::snippet{#merken}
- `(double) punkte` wandelt den `int`-Wert in eine Kommazahl um. Das nennt man **Typumwandlung** oder *cast*.
- `(int) genau` in die andere Richtung **schneidet die Nachkommastellen ab** – aus 3.99 wird 3, nicht 4.
- Willst du kaufmännisch runden, nimm `Math.round(...)`.
:::

## Aufgabe 1: Notendurchschnitt

:::snippet{#aufgabe}
Drei Klausuren wurden mit 11, 8 und 14 Notenpunkten bewertet. Berechne den Durchschnitt und gib ihn aus.

Achtung: Das naive Programm gibt 11 aus. Der richtige Wert ist 11,0 – aber prüfe selbst, ob dein Programm auch bei 11, 8 und 13 noch stimmt.
:::

:::onlineide{height="400px"}

```java Main.java
void main() {
    int k1 = 11;
    int k2 = 8;
    int k3 = 14;

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Warum stimmt das Ergebnis nicht?"}

Die Summe ist ein `int`, die Anzahl ist ein `int` – also rechnet Java eine Ganzzahldivision und wirft die Nachkommastellen weg.

::::

::::collapsible{title="Tipp 2: Zwei Wege"}

Entweder wandelst du die Summe um: `(double) summe / 3`.

Oder du teilst durch eine Kommazahl: `summe / 3.0`.

Beide Wege funktionieren. Der erste macht deutlicher, worum es geht.

::::

:::protect{password="java-ef-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int k1 = 11;
    int k2 = 8;
    int k3 = 13;

    int summe = k1 + k2 + k3;
    double durchschnitt = (double) summe / 3;

    IO.println("Summe:        " + summe);
    IO.println("Durchschnitt: " + durchschnitt);
}
```

Mit 11, 8 und 13 ist die Summe 32. Ohne Typumwandlung käme 10 heraus, richtig sind 10,666…

:::

## Aufgabe 2: Passenden Typ wählen

:::snippet{#aufgabe}
Ordne jedem Sachverhalt den passenden Datentyp zu und begründe kurz.

a) Die Anzahl der Schülerinnen und Schüler in einem Kurs

b) Die Körpergröße einer Person in Metern

c) Ob eine Aufgabe gelöst wurde

d) Der Name einer Schule

e) Die Note als Buchstabe im amerikanischen System (A bis F)
:::

::textinput{placeholder="a) ... b) ... c) ... d) ... e) ..."}

::::collapsible{title="Auflösung"}

a) `int` – eine Anzahl ist immer eine ganze Zahl.

b) `double` – 1,73 m lässt sich nicht als ganze Zahl darstellen.

c) `boolean` – es gibt genau zwei Möglichkeiten.

d) `String` – ein Text aus mehreren Zeichen. Das ist ein **Objekttyp**.

e) `char` – genau ein Zeichen.

::::

---

## Selbsttest

::::multievent

**1. Welche Datentypen sind elementar (primitiv)?** (Mehrfachauswahl)

{c1{!int}}

{c1{!double}}

{c1{!boolean}}

{c1{String}}

{h{Objekttypen beginnen mit einem Großbuchstaben.}}
{H{Richtig! String ist ein Objekttyp, die anderen drei sind elementar.}}

**2. Was gibt die Ausgabe von Text plus 3 plus 4 aus, wenn Text eine Zeichenkette ist?**

{r1{Text 7}}

{r1{!Text 34}}

{r1{Text 12}}

{h{Das Pluszeichen hängt bei Zeichenketten aneinander, und Java arbeitet von links nach rechts.}}
{H{Richtig! Erst wird die 3 angehängt, dann die 4.}}

**3. Was passiert bei der Umwandlung der Kommazahl 3.99 in eine ganze Zahl mit einem Cast?**

{r2{Sie wird zu 4 gerundet.}}

{r2{!Die Nachkommastellen werden abgeschnitten, es bleibt 3.}}

{r2{Es entsteht ein Fehler.}}

{h{Ein Cast rundet nicht - dafür gibt es eine eigene Methode.}}
{H{Genau. Zum Runden brauchst du Math.round.}}

**4. Welches Zeichen umschließt einen einzelnen Buchstaben vom Typ char?**

{r3{doppelte Anführungszeichen}}

{r3{!einfache Anführungszeichen}}

{r3{eckige Klammern}}

{h{Doppelte Anführungszeichen sind für Zeichenketten reserviert.}}
{H{Richtig!}}

**5. Ergänze: Ein {t{boolean}} kann nur die beiden Werte true und false annehmen.**

::::
