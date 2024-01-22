---
name: Arrays
index: 7
lang: de
---

# Arrays

Oft möchte man viele gleichartige Daten (d.h. Daten mit demselben Datentyp) speichern, z.B. die ersten 1000 Primzahlen. Stell Dir vor, Du müsstest für jede dieser Zahlen einen eigenen Variablennamen vergeben: 


```java
int p1 = 2;
int p2 = 3;
int p3 = 5;
...
int p1000 = ?!?
```

Oder stell Dir vor, Du möchtest dann diese 1000 gespeicherten Zahlen kommasepariert ausgeben (2, 3, 5, 7, …): 

```java
println(p1 + ", " + p2 + ", " + p3 + ", " + p4 + ", " + ... + p1000);
```

Kein Mensch möchte das tippen müssen. Das muss doch besser gehen! 

Ein **Array** (deutsch: "Feld") ist ein Datentyp, der es gestattet, viele gleichartige Daten (d.h. Daten mit demselben Datentyp) zu speichern und durch Angabe eines Indizes (d.h. ihrer Position innerhalb des Feldes) schnell auf sie zuzugreifen.

## Syntax in Java

Lege ein Feld an, in dem 10 int-Werte gespeichert werden können und nenne dieses Feld test.

```java
int[] test = new int[10]; 
```

Dabei ist int[] der Datentyp "Feld von int-Werten". Der Term new int[10] reserviert einen Speicherbereich, in dem 10 int-Werte Platz haben, füllt ihn mit zehn 0-Werten und liefert eine Referenz darauf zurück. Nach der Zuweisung (=) zeigt die Variable test auf diesen Speicherbereich.

Die zehn Werte nennt man **Feldelemente**. Sie werden mit den **Indizes 0 bis 9 durchnummeriert**. Du kannst Dir das Feld so vorstellen:

![](https://www.learnj.de/lib/exe/fetch.php?media=types:arrays:pasted:20210110-144140.png)


**Zugriff auf die Feldelemente:**

- test[3] = 12; weist dem vierten(!) Feldelement den Wert 12 zu. Das Feld sieht danach so aus:

![](https://www.learnj.de/lib/exe/fetch.php?media=types:arrays:pasted:20210110-144322.png)

- int a = test[0]; kopiert den Wert des ersten Feldelements in die Variable a.

---

## Aufgabe: Rätsel (Nachvollziehen)

:::onlineide{id="array-raetsel"}

```java Raetsel.java
int[] zahlen = new int[4];    //Das Feld zahlen hat 4 Werte, mit den Indizes 0, 1, 2, 3

zahlen[1] = 12;
zahlen[2] = 8;
zahlen[0] = zahlen[2] * 3;
zahlen[3] = zahlen[1] + zahlen[0];

for (int i = 0; i < 4; i++) {
   println(i + ": " + zahlen[i]);
}
```

:::

Öffne vor dem Ausführen den Reiter "Variablen" und führe dann das Programm schrittweise aus ("Step over": ). Du kannst so Schritt für Schritt sehen, wie sich die Werte des Feldes verändern und das Programm so ganz leicht verstehen. 

## Aufgabe: Größter Wert

- Ergänze das Programm so, dass es den größten der 10 Werte des Felds werte findet und ausgibt!

:::onlineide{id="array-groester-wert"}


```java Werte.java
double[] werte = new double[10];

for (int i = 0; i < 10; i++) {
   werte[i] = Math.sin(i);
   println(i + ": " + werte[i]);
}

double maximum = werte[0]; 
// TODO: Finde den größten Wert

println("Der größte Wert ist: " + maximum, Color.lightseagreen);
```

:::


:::collapsible{title="Hilfe" id="jsjdkasjdkkajkfk"}

1. Durchlaufe das Feld mit einer for- oder while-Schleife.
2. Vergleiche jedes Element des Feldes, ob es größer ist als das aktuell größte Element.

:::


## Quellen

In Anlehnung an: https://www.learnj.de/doku.php?id=types:arrays:start