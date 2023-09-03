---
name: Verzweigungen
lang: de
index: 3
---

# Verzweigungen

In Java können wir auf zwei Arten unseren Programmablauf verzweigen. Einmal mit der bedingten Anweisung und einmal mit der Fallunterscheidung.

## Bedingte Anweisung

Oft soll ein bestimmter Programmteil nur ausgeführt werden, wenn eine Bedingung erfüllt ist, z.B.

- Wenn ein Felsen das Raumschiff trifft, soll ein Leben abgezogen werden.
- Wenn die Anzahl der Leben auf 0 sinkt, ist das Spiel beendet.
- …

Für diese Zwecke gibt es die if-Anweisung.

### Beispiel 1: PIN-Eingabe

Der Benutzer gibt eine PIN ein. Das Programm prüft, ob die PIN korrekt ist (1372) und gibt in diesem Fall "PIN korrekt!" aus. Hier die Ausgaben zweier Programmläufe: 

> Geben Sie bitte Ihre PIN ein: 1221 
>
> Programmende.

> Geben Sie bitte Ihre PIN ein: 1372
>
> Die PIN ist korrekt!
>
> Programmende.

:::alert{info}
**Benutzereingaben**

Die Anweisung `int pinEingabe = Input.readInt("Bitte geben Sie die PIN ein:");` nimmt vom Benutzer eine Zahl entgegen und legt sie in der Variable pe ab.

**Detailinfo**

`readInt` ist eine statische Methode der Klasse Input. Mehr zu Klassen und statischen Methoden später! 
:::

:::onlineide{id="578827"}

```java Beispiel.java

int pinEingabe = Input.readInt("Geben Sie bitte Ihre PIN ein:");

if (pinEingabe == 1372) {
    System.out.println("Die PIN ist korrekt");
}
System.out.println("Programmende.");
```

:::


Mit dem Schlüsselwort if weist man den Computer an, etwas nur dann zu tun, wenn eine bestimmte Bedingung erfüllt ist.

```java
if(Bedingung){
   Anweisungen
}
```

Der Computer führt die Anweisungen nur dann aus, wenn die Bedingung zutrifft (genauer: wenn der Term Bedingung den Wert true hat).

#### Aufgabe 1

Erweitere das Programm, sodass es dem Benutzer drei Eingabeversuche zugesteht und jeweils ausgibt, wie viele Versuche er noch hat. Zwei mögliche Programmabläufe sehen also so aus: 

> Noch 3 Versuche
>
> Sie haben eingegeben: 5654
>
> falsche PIN!
>
> Noch 2 Versuche
>
> Sie haben eingegeben: 4432
>
> falsche PIN!
>
> Noch 1 Versuche
>
> Sie haben eingegeben: 8983
>
> falsche PIN!
>
> Programmende.

> Noch 3 Versuche
>
> Sie haben eingegeben: 2674
>
> falsche PIN!
>
> Noch 2 Versuche
>
> Sie haben eingegeben: 1372
>
> Die PIN ist korrekt!
>
> Programmende.

[Link zur Lösung](https://onlineide.openpatch.org/#json=CSgolLwHeJjDFwl80Oou-)


### Beispiel 2: Teilbarkeit

Ob eine Zahl durch 2, 3, 4, 5 oder 9 teilbar ist, lässt sich durch einfache Teilbarkeitsregeln leicht ermitteln. Aber ist beispielsweise 534 durch 17 teilbar? Wir entwickeln ein kleines Programm, das uns hilft, das herauszufinden. 

:::alert{info}
**Der Modulo-Operator**

Der Modulo-Operator (mod) ermittelt den Rest einer Division. Es ist beispielsweise $11 \mod 4=3$, weil 11 beim Teilen durch 4 den Rest 3 lässt $(11=4⋅2+3)$. In Java wird für den Modulo-Operator das Prozentzeichen '%' verwendet. Wenn wir also prüfen wollen, ob der Wert der Variable 'z' durch 17 teilbar ist (also beim Teilen durch 17 den Rest 0 lässt), schreiben wir:

```java
if(z % 17 == 0){
   println("Die Zahl ist in der Tat durch 17 teilbar!");
}
```

Bemerkung: Du erinnerst Dich sicher an den Vergleichsoperator '==' (nicht zu verwechseln mit dem Zuweisungsoperator '='). 
:::

:::onlineide{id="869273"}

```java Beispiel.java
int z = Input.readInt("Bitte geben Sie eine ganze Zahl ein:");

if(z % 17 == 0) {
   println("Die Zahl " + z + " ist durch 17 teilbar.");
} else {
   println("Die Zahl " + z + " ist NICHT durch 17 teilbar.");
}
```

:::

#### Aufgabe 2

Erweitere das Programm oben so, dass es prüft, ob die eingegebene Zahl durch 2, 3, 4, …, 10 teilbar ist und entsprechende Meldungen ausgibt. 

[Link zur Lösung](https://onlineide.openpatch.org/#json=4rP6mWq1iNn-xlFJNwP7k)