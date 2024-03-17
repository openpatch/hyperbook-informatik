---
name: Wiederholungen
lang: de
index: 2
---

# Wiederholungen

Wenn man Anweisungen in ähnlicher Weise mehrfach wiederholen möchte, schreibt man sie nicht mehrfach hintereinander ins Programm, sondern nutzt Wiederholungen ("Schleifen"/"Loops").

## :t[Kopfgesteuerte-Schleife]{#kopfgesteuerte-schleife} (while-loop)

Wir schreiben den Text "Hallo Welt!" 10-mal untereinander in die Ausgabe. Zuerst möchte ich Euch zeigen, wie man es nicht machen sollte:

:::onlineide

```java Wiederholung1.java
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
println("Hallo Welt!");
```

:::


Viel besser ist es, den Computer anzuweisen, die Ausgabe von "Hallo Welt!" 10-mal zu wiederholen. Das geht so:

:::onlineide

```java Wiederholung2.java
int n = 1;

while (n <= 10) {

  println("Hallo Welt!");
  n = n + 1;

}

println("Fertig!", Color.green);
```

:::

### Erklärung der einzelnen Anweisungen

```java
int n = 1;
```

Die Variable n benutzen wir, um zu zählen, wie oft wir schon wiederholt haben. n == 1 bedeutet, dass wir im 1. Wiederholungsdurchgang sind.

```java
while(n <= 10){
   println("Hallo Welt!");
   n = n + 1;
}
```

Die Anweisung while(n < = 10) bedeutet: Wiederhole die Anweisungen zwischen den nachfolgenden {}, solange n kleiner oder gleich 10 ist. Damit die Anweisungen nicht unendlich oft wiederholt werden, müssen wir dafür sorgen, dass die Aussage n < = 10 irgendwann nicht mehr zutrifft. Deshalb erhöhen wir am Ende der des wiederholten Blocks n um 1, indem wir schreiben: n = n + 1;.

```java
println("Fertig!", Color.green);
```

Sobald die Bedingung hinter while nicht mehr zutrifft, werden die Anweisungen in {} übersprungen und der Computer fährt mit den Anweisungen fort, die hinter den {} stehen. In diesem Fall gibt er "Fertig!" aus.

## :t[Zählergesteuerte-Schleife]{#zaehlergesteuerte-schleife} (for-loop)

Die while-loop hat zwei große Nachteile:

- Zum bloßen Zählen ist sie sehr umständlich, da insgesamt drei Zeilen benötigt werden:

```java
int i = 0;         // Deklaration der Zählvariable
while(i <= 10){    // Bedingung
   // Anweisungen
   i++;            // Erhöhung der Zählvariable
}
```

- Oft stehen zwischen der Deklaration der Zählvariable und der Bedingung sowie zwischen der Bedingung und der Erhöhung der Zählvariable sehr viele Anweisungen und es ist schwer, "auf einen Blick" zu erfassen, wie oft wiederholt wird und welche Werte die Zählvariable bei jedem Wiederholungsschritt annimmt.

Für alle Anwendungsfälle, in denen auf irgendeine Art und Weise gezählt wird, verwendet man daher üblicherweise eine Kurzschreibweise der while-loop, die for-loop. Hier eine Gegenüberstellung der beiden. Beide Programme sind gleichwertig:

```java
int i = 1;
while(i <= 10) {
  i++;
}
```

```java
for(int i = 1; i <= 10; i++) {
}
```

Wir schreiben den Text "Hallo Welt!" 10-mal untereinander in die Ausgabe. Mit der Variablen i zählen wir dabei, wie oft wir ihn schon ausgegeben haben.

:::onlineide

```java Wiederholung3.java
for (int i = 1; i <= 10; i++) {
   println("Hallo Welt (zum " + i + "-ten Mal)!");
}
println("Fertig!", Color.lightgreen);
```

:::

## Test-dich-Projekt 1

### Aufgabenstellung

Schreibe ein Programm, das mit einer for-Schleife die Summe der Zahlen von 3 bis 27 berechnet und das Ergebnis in der Konsole ausgibt.


:::onlineide

```java ProjektWiederholung.java

```

:::

### Testfälle

- Das Ergebnis der Summe von 3 bis 27 ist 375.
- Das Ergebnis der Summe von 1 bis 100 ist 5050.

:::collapsible{title="Tipp" id="542052"}

- Deklariere und initialisiere zunächst die Variable, die die Summe beinhalten soll. 
- Gehe die Zahlen von 3 bis 27 nacheinander durch. 
- Addiere zur Summenvariable die aktuelle Zählerzahl.

:::

## Test-dich-Projekt 2

### Aufgabenstellung

Gebe die for-Schleifen an, mit wir denen alle Dominosteine ohne Dopplungen in der Konsole ausgeben können. Zur Erinnerung sind im Testfälle-Abschnitt alle Dominosteine angegeben, und dein Programm soll genau diese Ausgabe in der Konsole erzeugen.

:::onlineide

```java ProjektWiederholung2.java

```

:::

### Testfälle

```
(0|0)(0|1)(0|2)(0|3)(0|4)(0|5)(0|6) 
     (1|1)(1|2)(1|3)(1|4)(1|5)(1|6) 
          (2|2)(2|3)(2|4)(2|5)(2|6) 
               (3|3)(3|4)(3|5)(3|6) 
                    (4|4)(4|5)(4|6) 
                         (5|5)(5|6) 
                              (6|6)
```

:::collapsible{title="Tipps" id="394097"}

- Mit jeder Zeile verringert sich die Anzahl der ausgegebenen Dominosteine um eins. Auch die Startzahl wird um eins erhöht.
- Zur Umsetzung könntest du zwei Schleifen ineinander verschachteln. Die Start- und Endzahlen kannst du von den Ziffern auf den Dominosteinen ableiten.
- Erzeuge zunächst die Leerzeichen und gebe dann die Dominosteine in der Zeile aus. Ist die Zeile fertig, kannst du einen Zeilenumbruch erzeugen

:::
