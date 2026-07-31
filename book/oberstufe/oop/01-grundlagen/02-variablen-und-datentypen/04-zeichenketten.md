---
title: Zeichenketten
index: 4
---

# Zeichenketten

`String` ist der erste **Objekttyp**, mit dem du richtig arbeitest. Ein `String`-Objekt speichert eine Folge von Zeichen und bringt eine Reihe von **Methoden** mit – Fähigkeiten, die du auf dem Objekt aufrufen kannst.

## Methoden aufrufen

:::onlineide{height="420px"}

```java Main.java
void main() {
    String wort = "Informatik";

    IO.println(wort.length());
    IO.println(wort.charAt(0));
    IO.println(wort.substring(0, 5));
    IO.println(wort.substring(5));
    IO.println(wort.indexOf("mat"));
    IO.println(wort.toUpperCase());
}
```

:::

:::snippet{#aufgabe}
Sage **zuerst ohne Rechner** voraus, was die sechs Zeilen ausgeben. Führe das Programm erst danach aus.
:::

::::collapsible{title="Auflösung"}

```
10
I
Infor
matik
5
INFORMATIK
```

Der Punkt zwischen `wort` und `length()` bedeutet: „Rufe auf dem Objekt `wort` die Methode `length` auf.“ Das ist derselbe Punkt wie bei `hase.setPosition(...)` im ersten Kapitel.

::::

:::snippet{#merken}
| Methode | Ergebnis |
| --- | --- |
| `wort.length()` | Anzahl der Zeichen |
| `wort.charAt(i)` | das Zeichen an Position `i` als `char` |
| `wort.substring(a, b)` | Teilzeichenkette von Position `a` bis **vor** `b` |
| `wort.substring(a)` | alles ab Position `a` |
| `wort.indexOf(teil)` | Position des ersten Vorkommens, sonst `-1` |
| `wort.toUpperCase()` | alles in Großbuchstaben |
| `wort.equals(anderes)` | `true`, wenn beide denselben Inhalt haben |

**Die Zählung beginnt bei 0.** Das erste Zeichen hat die Position 0, das letzte die Position `length() - 1`.
:::

## Die wichtigste Falle: gleich ist nicht gleich

:::snippet{#aufgabe}
Sage voraus, was das Programm ausgibt. Diese Aufgabe ist eine Falle – nimm dir Zeit.
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    String a = "Hallo";
    String b = "Hal" + "lo";
    String c = IO.readln("Tippe das Wort Hallo ein: ");

    IO.println(a == b);
    IO.println(a.equals(b));
    IO.println(a == c);
    IO.println(a.equals(c));
}
```

:::

::::collapsible{title="Auflösung"}

Wenn du `Hallo` eingetippt hast:

```
true
true
false
true
```

Der Vergleich mit `==` prüft bei Objekttypen, ob beide Variablen auf **dasselbe Objekt** verweisen – nicht, ob der Inhalt gleich ist.

`a` und `b` verweisen zufällig auf dasselbe Objekt, weil Java gleiche Textkonstanten aus dem Quelltext zusammenlegt. `c` entsteht dagegen erst beim Einlesen – ein neues Objekt mit gleichem Inhalt, aber an anderer Stelle im Speicher.

::::

:::snippet{#merken}
Zeichenketten vergleicht man **immer** mit `equals`, niemals mit `==`.

```java
if (eingabe.equals("ja")) { ... }
```

Dieser Fehler ist so häufig, dass er einen eigenen Merksatz verdient: **`==` vergleicht Verweise, `equals` vergleicht Inhalte.** Bei elementaren Typen wie `int` ist `==` dagegen genau richtig.
:::

## Aufgabe 1: Initialen

:::snippet{#aufgabe}
Schreibe ein Programm, das nach Vor- und Nachnamen fragt und daraus die Initialen bildet:

```
Vorname: Ada
Nachname: Lovelace
Initialen: A.L.
```
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp: Wie komme ich an den ersten Buchstaben?"}

`vorname.charAt(0)` liefert das erste Zeichen. Alternativ geht auch `vorname.substring(0, 1)` – das ergibt einen `String` statt eines `char`.

::::

:::protect{password="java-ef-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    String vorname = IO.readln("Vorname: ");
    String nachname = IO.readln("Nachname: ");

    IO.println("Initialen: " + vorname.charAt(0) + "." + nachname.charAt(0) + ".");
}
```

:::

## Aufgabe 2: Palindrom-Vorbereitung

:::snippet{#aufgabe}
Ein Palindrom liest sich vorwärts wie rückwärts, zum Beispiel `Otto` oder `Rentner`.

Schreibe ein Programm, das ein Wort einliest und das **erste** und das **letzte** Zeichen ausgibt – und danach mitteilt, ob diese beiden übereinstimmen.

Den vollständigen Palindromtest baust du in Kapitel 3, wenn du Schleifen kennst.
:::

:::onlineide{height="440px"}

```java Main.java
void main() {
    String wort = IO.readln("Gib ein Wort ein: ");

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp 1: Das letzte Zeichen"}

Das erste Zeichen steht an Position 0. Das letzte steht **nicht** an Position `length()`, sondern eine Stelle davor: `wort.length() - 1`.

::::

::::collapsible{title="Tipp 2: Zwei Zeichen vergleichen"}

`charAt` liefert einen `char` – und das ist ein **elementarer** Typ. Zwei `char` vergleichst du deshalb mit `==`, nicht mit `equals`.

::::

:::protect{password="java-ef-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    String wort = IO.readln("Gib ein Wort ein: ");

    char erstes = wort.charAt(0);
    char letztes = wort.charAt(wort.length() - 1);

    IO.println("Erstes Zeichen:  " + erstes);
    IO.println("Letztes Zeichen: " + letztes);
    IO.println("Gleich? " + (erstes == letztes));
}
```

:::

## Zusatzaufgabe

:::snippet{#brain}
Schreibe ein Programm, das eine E-Mail-Adresse einliest und daraus den **Namen** (alles vor dem @) und die **Domain** (alles danach) getrennt ausgibt.

Du brauchst dafür `indexOf` und `substring`. Überlege dir außerdem: Was macht dein Programm bei einer Eingabe ohne @?
:::

---

## Selbsttest

::::multievent

**1. Welche Position hat das erste Zeichen einer Zeichenkette?**

{z{0}}

{h{Java fängt bei Zeichenketten und Feldern immer gleich an zu zählen.}}
{H{Richtig! Deshalb ist die letzte Position um eins kleiner als die Länge.}}

**2. Womit vergleichst du zwei Zeichenketten auf gleichen Inhalt?**

{r1{mit dem doppelten Gleichheitszeichen}}

{r1{!mit der Methode equals}}

{r1{mit dem einfachen Gleichheitszeichen}}

{h{Das doppelte Gleichheitszeichen prüft bei Objekten nur, ob es dasselbe Objekt ist.}}
{H{Richtig! equals vergleicht die Inhalte.}}

**3. Was liefert die Methode indexOf, wenn der gesuchte Teil nicht vorkommt?**

{r2{0}}

{r2{!minus 1}}

{r2{die Länge der Zeichenkette}}

{h{Es muss ein Wert sein, der keine gültige Position sein kann.}}
{H{Richtig! Position 0 gibt es ja, minus 1 nicht.}}

**4. Welche Aussagen über das Wort Informatik stimmen?** (Mehrfachauswahl)

{c1{!Seine Länge ist 10.}}

{c1{!Das Zeichen an Position 0 ist ein großes I.}}

{c1{Das Zeichen an Position 10 ist ein k.}}

{c1{!Der Teil ab Position 5 lautet matik.}}

{h{Die letzte gültige Position ist um eins kleiner als die Länge.}}
{H{Richtig! Position 10 gibt es bei einem Wort der Länge 10 nicht mehr.}}

**5. Ergänze: Mit {t{length}}() erfährst du, wie viele Zeichen eine Zeichenkette hat.**

::::
