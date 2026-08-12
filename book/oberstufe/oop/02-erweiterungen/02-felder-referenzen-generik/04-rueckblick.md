---
title: Rückblick
index: 4
---

# Rückblick

Dieses Kapitel erklärt, was in den vorigen immer schon passiert ist, ohne dass es jemand gesagt hätte: dass Objektvariablen **Verweise** enthalten. Wer das verstanden hat, versteht auch die verketteten Strukturen der nächsten Kapitel – dort besteht alles aus Verweisen.

## Das kann ich jetzt

- [ ] Ich kann **zweidimensionale Felder** anlegen, füllen und in verschachtelten Schleifen durchlaufen. ([2.1](./01-zweidimensionale-felder))
- [ ] Ich kann erklären, was bei einem Methodenaufruf mit elementaren Typen und was mit Objekttypen geschieht. ([2.2](./02-referenzen))
- [ ] Ich kann **Aliasing** erkennen und die Folgen benennen. ([2.2](./02-referenzen))
- [ ] Ich kann eine **flache** von einer **tiefen** Kopie unterscheiden. ([2.2](./02-referenzen))
- [ ] Ich kann eine **generische Klasse** schreiben und begründen, was sie gegenüber `Object` gewinnt. ([2.3](./03-generische-klassen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Wer zeigt worauf?**

```java
void main() {
    int a = 5;
    int b = a;
    b = 99;
    IO.println("a = " + a);

    int[] feld1 = {1, 2, 3};
    int[] feld2 = feld1;
    feld2[0] = 99;
    IO.println("feld1[0] = " + feld1[0]);

    int[] feld3 = {1, 2, 3};
    int[] feld4 = new int[3];
    for (int i = 0; i < feld3.length; i++) {
        feld4[i] = feld3[i];
    }
    feld4[0] = 99;
    IO.println("feld3[0] = " + feld3[0]);

    IO.println(feld1 == feld2);
    IO.println(feld3 == feld4);
}
```

a) Sag alle fünf Ausgabezeilen voraus.

b) Erkläre den Unterschied zwischen den ersten beiden Blöcken mit den Wörtern *Wert* und *Referenz*.

c) Was genau vergleicht `feld1 == feld2`? Was müsste man schreiben, um die **Inhalte** zu vergleichen?

d) Der dritte Block erzeugt eine Kopie. Ist es eine flache oder eine tiefe? Und wann fällt dieser Unterschied überhaupt auf?
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    int a = 5;
    int b = a;
    b = 99;
    IO.println("a = " + a);

    int[] feld1 = {1, 2, 3};
    int[] feld2 = feld1;
    feld2[0] = 99;
    IO.println("feld1[0] = " + feld1[0]);

    int[] feld3 = {1, 2, 3};
    int[] feld4 = new int[3];
    for (int i = 0; i < feld3.length; i++) {
        feld4[i] = feld3[i];
    }
    feld4[0] = 99;
    IO.println("feld3[0] = " + feld3[0]);

    IO.println(feld1 == feld2);
    IO.println(feld3 == feld4);
}
```

:::

:::protect{password="java-q-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
a = 5
feld1[0] = 99
feld3[0] = 1
true
false
```

b) `int` ist ein **elementarer Typ**: In `b` landet eine Kopie des **Wertes** 5, und `b = 99` betrifft nur diese Kopie. Ein Feld ist ein **Objekttyp**: In `feld2` landet eine Kopie der **Referenz**. Beide Namen bezeichnen danach dasselbe Feld – eine Änderung über den einen ist über den anderen sichtbar. Das nennt man **Aliasing**: zwei Namen, ein Ding.

c) `==` vergleicht bei Objekttypen die **Referenzen**, also die Frage „ist das dasselbe Objekt?". `feld1 == feld2` ist deshalb `true`, `feld3 == feld4` trotz gleicher Werte `false`. Für einen Inhaltsvergleich braucht es eine eigene Schleife über alle Elemente – `Arrays.equals` gibt es in dieser Umgebung nicht.

d) Bei einem Feld von `int` ist die Frage gegenstandslos: flache und tiefe Kopie fallen zusammen, weil es keine Objekte gibt, die sich zwei Felder teilen könnten. Der Unterschied fällt erst bei einem **Feld von Objekten** auf. Eine flache Kopie legt dann ein neues Feld an, das aber auf **dieselben** Objekte verweist – wer eines davon ändert, sieht die Änderung in beiden Feldern.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Spielfeld**

Ein Spielfeld für Schiffe versenken ist ein zweidimensionales Feld aus `char`. `'~'` steht für Wasser, `'S'` für ein Schiff.

a) Leg ein Feld mit 5 Zeilen und 8 Spalten an und fülle es vollständig mit `'~'`.

b) Setz Schiffe auf die Positionen (1, 2), (1, 3), (1, 4) und (3, 6).

c) Gib das Feld zeilenweise aus, sodass ein Raster entsteht.

d) Schreib eine Methode `int zaehleSchiffe(char[][] pFeld)`, die alle `'S'` zählt.

e) Wie viele Elemente hat das Feld insgesamt? Wie kommst du an die Anzahl der **Zeilen**, wie an die der **Spalten**?
:::

::::collapsible{title="Tipp 1: Zwei Längen"}

Ein zweidimensionales Feld ist in Java ein **Feld von Feldern**:

- `feld.length` ist die Anzahl der **Zeilen**.
- `feld[0].length` ist die Anzahl der Spalten in der ersten Zeile.

Deshalb sind die Schleifenköpfe verschieden:

```java
for (int zeile = 0; zeile < feld.length; zeile++) {
    for (int spalte = 0; spalte < feld[zeile].length; spalte++) {
```

::::

::::collapsible{title="Tipp 2: Zeilenweise ausgeben"}

Bau jede Zeile in einer Zeichenkette zusammen und gib sie erst danach aus – genau wie bei den Mustern in den [Grundlagen](../../01-grundlagen/03-kontrollstrukturen/06-verschachtelte-schleifen).

::::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    char[][] feld = new char[5][8];

    // Deine Loesung:

}
```

:::

:::protect{password="java-q-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
void main() {
    char[][] feld = new char[5][8];

    for (int zeile = 0; zeile < feld.length; zeile++) {
        for (int spalte = 0; spalte < feld[zeile].length; spalte++) {
            feld[zeile][spalte] = '~';
        }
    }

    feld[1][2] = 'S';
    feld[1][3] = 'S';
    feld[1][4] = 'S';
    feld[3][6] = 'S';

    zeigeFeld(feld);
    IO.println("Schiffsfelder: " + zaehleSchiffe(feld));
}

void zeigeFeld(char[][] pFeld) {
    for (int zeile = 0; zeile < pFeld.length; zeile++) {
        String ausgabe = "";
        for (int spalte = 0; spalte < pFeld[zeile].length; spalte++) {
            ausgabe = ausgabe + pFeld[zeile][spalte] + " ";
        }
        IO.println(ausgabe);
    }
}

int zaehleSchiffe(char[][] pFeld) {
    int anzahl = 0;
    for (int zeile = 0; zeile < pFeld.length; zeile++) {
        for (int spalte = 0; spalte < pFeld[zeile].length; spalte++) {
            if (pFeld[zeile][spalte] == 'S') {
                anzahl++;
            }
        }
    }
    return anzahl;
}
```

Ausgabe:

```
~ ~ ~ ~ ~ ~ ~ ~
~ ~ S S S ~ ~ ~
~ ~ ~ ~ ~ ~ ~ ~
~ ~ ~ ~ ~ ~ S ~
~ ~ ~ ~ ~ ~ ~ ~
Schiffsfelder: 4
```

e) 5 · 8 = **40** Elemente. Die Zeilen liefert `feld.length`, die Spalten `feld[0].length`. Der Grund für diese Ungleichbehandlung: Ein zweidimensionales Feld ist in Java ein Feld, dessen Elemente selbst Felder sind. Deshalb könnten die Zeilen theoretisch verschieden lang sein – man nennt so etwas ein *unregelmäßiges* Feld. Bei `new char[5][8]` sind sie es nicht, aber die Schreibweise `feld[zeile].length` in der inneren Schleife ist trotzdem die sichere.

Beachte bei `'S'` die **einfachen** Anführungszeichen: Es ist ein `char`, kein `String`. Mit doppelten übersetzt das Programm nicht.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Warum generisch?**

Ein Behälter für genau ein Objekt lässt sich auf zwei Arten schreiben:

```java
public class Behaelter {
    private Object inhalt;
    public void setze(Object pInhalt) { inhalt = pInhalt; }
    public Object gib() { return inhalt; }
}

public class Behaelter<T> {
    private T inhalt;
    public void setze(T pInhalt) { inhalt = pInhalt; }
    public T gib() { return inhalt; }
}
```

a) Was muss man bei der ersten Fassung tun, bevor man mit dem herausgeholten Objekt arbeiten kann?

b) Was passiert bei der ersten Fassung, wenn jemand versehentlich einen `String` hineinlegt und ihn als `Punkt` wieder herausholen will? **Wann** fällt das auf?

c) Wann fällt derselbe Fehler bei der zweiten Fassung auf?

d) Formuliere in einem Satz, was Generik gewinnt.

e) Nenne eine Stelle in den kommenden Kapiteln, an der Generik gebraucht wird.
:::

:::protect{password="java-q-2-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Man muss den Rückgabewert **casten**, also den Typ ausdrücklich angeben: `Punkt p = (Punkt) behaelter.gib();`. Ohne das kennt der Übersetzer nur `Object` und lässt keine Punkt-Methode zu.

b) Der Übersetzer merkt nichts – für ihn ist alles ein `Object`. Der Fehler zeigt sich erst zur **Laufzeit**, beim Cast, und dann mit einer Meldung über einen unmöglichen Typumwandlung. Bis dahin kann viel Programm dazwischenliegen.

c) **Gar nicht** – er kann nicht entstehen. `Behaelter<Punkt>` nimmt nichts anderes an; der Versuch, einen `String` hineinzulegen, scheitert schon beim **Übersetzen**.

d) Generik verschiebt eine ganze Fehlerklasse von der Laufzeit auf die Übersetzungszeit – und macht den Cast überflüssig, der bei `Object` an jeder Entnahmestelle nötig wäre.

e) Bei allen **Datenstrukturen**: `Stack<ContentType>`, `Queue<ContentType>`, `List<ContentType>` und die Bäume. Sie sollen beliebige Inhalte aufnehmen und trotzdem typsicher sein – genau der Fall, für den Generik gemacht ist.

:::alert{info}
Ein Unterschied zum echten Java: In der Online-IDE funktioniert `private T[] inhalt = new T[pMax];`. In echtem Java ist das **nicht** erlaubt; dort behilft man sich mit einem `Object[]` und einem Cast bei der Entnahme. Wer außerhalb der Online-IDE weiterarbeitet, wird darüber stolpern.
:::

:::

<!--
Rückblick zu KLP QPh, Daten und ihre Strukturierung: zweidimensionale Felder,
Objekttypen und Referenzen, generische Klassen. Aufgabe 3 zielt auf die
Beurteilung zweier Entwürfe (A).
-->

---

## Selbsttest

::::multievent

**1. Was steht bei einem Objekttyp in der Variablen?**

{r1{das Objekt selbst}}

{r1{!eine Referenz auf das Objekt}}

{r1{eine Kopie des Objekts}}

{r1{der Name der Klasse}}

{h{Deshalb wirkt sich eine Änderung über den einen Namen auch beim anderen aus.}}
{H{Richtig.}}

**2. Zwei Feldvariablen zeigen auf dasselbe Feld. Wie heißt das?**

{r2{tiefe Kopie}}

{r2{!Aliasing}}

{r2{Polymorphie}}

{r2{Kapselung}}

{h{Zwei Namen, ein Ding.}}
{H{Richtig.}}

**3. Was vergleicht das doppelte Gleichheitszeichen bei zwei Feldern?**

{r3{die Inhalte}}

{r3{!die Referenzen, also ob es dasselbe Feld ist}}

{r3{die Längen}}

{r3{nichts, das ist ein Fehler}}

{h{Dieselbe Regel wie bei Zeichenketten aus den Grundlagen.}}
{H{Richtig – für die Inhalte braucht es eine eigene Schleife.}}

**4. Was liefert bei einem zweidimensionalen Feld der Ausdruck feld.length?**

{r4{die Gesamtzahl der Elemente}}

{r4{!die Anzahl der Zeilen}}

{r4{die Anzahl der Spalten}}

{r4{die Länge der längsten Zeile}}

{h{Ein zweidimensionales Feld ist ein Feld von Feldern.}}
{H{Richtig – die Spalten liefert feld[0].length.}}

**5. Worin unterscheiden sich flache und tiefe Kopie?**

{r5{in der Anzahl der Elemente}}

{r5{!die flache Kopie verweist auf dieselben Objekte, die tiefe legt neue an}}

{r5{die tiefe Kopie ist immer schneller}}

{r5{es gibt keinen Unterschied}}

{h{Bei einem Feld von int fallen beide zusammen – warum wohl?}}
{H{Richtig. Nur bei Objekten gibt es etwas zu teilen.}}

**6. Was gewinnt eine generische Klasse gegenüber einer mit Object?**

{c1{!Der Typfehler fällt schon beim Übersetzen auf.}}

{c1{!Der Cast bei der Entnahme entfällt.}}

{c1{Sie braucht weniger Speicher.}}

{c1{Sie läuft schneller.}}

{h{Zwei der Angebote betreffen die Sicherheit, zwei die Leistung – und um die geht es hier nicht.}}
{H{Richtig.}}

**7. Wann fällt bei der Object-Fassung ein falscher Typ auf?**

{r6{beim Übersetzen}}

{r6{!zur Laufzeit, beim Cast}}

{r6{gar nicht}}

{r6{beim Anlegen des Behälters}}

{h{Für den Übersetzer ist alles ein Object.}}
{H{Richtig – und bis dahin kann viel Programm dazwischenliegen.}}

::::
