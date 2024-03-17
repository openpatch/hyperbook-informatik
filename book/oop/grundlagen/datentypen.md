---
name: Datentypen
index: 4
lang: de
---

# Datentypen

In Java gibt es verschiedene Datentypen, die man Variablen zuweisen kann, um bestimmte Daten der Variablen zuzuweisen. In Java kann man zwischen primitiven Datentypen und Referenzdatentypen unterscheiden.

Wenn eine :t[Variable]{#variable} von einem primitiven Datentyp ist, dann wird der gewünschte Wert direkt der Variablen zugewiesen.

Wenn eine :t[Variable]{#variable} hingegen von einem Referenzdatentyp ist, dann wird eine Referenz, die auf ein :t[Objekt]{#objekt} vereweist, der Variablen zugewiesen. Erst über das sogenannte Dereferenizieren,
mit dem Punktoperator, können wir auf das Objekt zugreifen.

Das folgende Beispiel zeigt den Unterschied zwischen primitiven Datentypen (hier int) und Referenzdatentypen (hier String).

:::onlineide{id="623835" height=200 fileList=false}

```java
int a = 1;
String b = "Hallo";
```

:::

So können wir uns die Zuweisung zu den beiden Variablen visuell vorstellen. Während bei der Variable a direkt der gewünschte Wert steht, verweist der Wert der Variable b auf ein anderes Objekt.

![](/images/datentypen-arbeitsspeicher.png)

## Referenzdatentypen

Jede :t[Klasse]{#klasse}, die du definierst oder die schon definiert ist, stellt einen Referenzdatentypen dar. Das heißt, dass alle Variablen dieser Datentypen verweisen auf ein Objekt. In Java gibt es unter anderem die vordefinierte Klasse String.

### String

In einer Variable vom Datentyp String kann man beliebige Abfolgen von Zeichen (Buchstaben, Ziffern, Sonderzeichen) speichern. Der wörtlichen englischen Übersetzung entspricht der entsprechende deutsche Fachbegriff Zeichenkette.
Zeichenketten-Konstanten schreibt man in Gänsefüßchen, also z.B. "Das ist ein Text." oder "3, 2, 1, 0, Liftoff!".
Strings kann man mit dem Operator + hintereinanderhängen ("konkatenieren"). Der Wert des Terms "Das ist " + "praktisch." ist "Das ist praktisch". 

:::onlineide{id="105544" height=200 fileList=false}

```java Test.java
String a = "Das stört ";
String b = "keinen großen Geist.";

String c = a + b;
System.out.println(c);
```

:::


## Primitive Datentypen

Im Folgenden werden nun die alle relevanten primitiven Datentypen, die in der Programmiersprache Java zur Verfügung stehen, erklärt.

### int

Der Datentyp `int` ist zum Speichern von ganzzahligen Werten (z. B. 1, 2, -4, 20, ...).

:::onlineide{id="622663" height=200 fileList=false}

```java Int.java
int a = 1;
int b = 2;

System.out.println("Addieren: " + (a + b));
System.out.println("Multiplizieren: " + (a * b));
// Die Division bei Integern ist nur ganzzahlig möglich!
System.out.println("Dividieren: " + (a / b));
System.out.println("Subtrahieren: " + (a - b));
System.out.println("Modulo: " + (a % b));
```

:::

### float

Variablen vom Datentyp float können rationale Zahlen (ggf. näherungsweise!) speichern. Die Bezeichnung dieses Datentyps ist eine Kurzform für "floating point number", auf Deutsch "Fließkommazahl" oder "Gleitkommazahl".

Führe das folgende Beispielprogramm in Einzelschritten aus und schau' Dir dabei den Inhalt des Reiters "Variablen" auf der rechten Seite an!

:::onlineide{id="892926" height=300 fileList=false}

```java FloatTest.java
float radius = 1.5;
float umfang = 2 * 3.14159 * radius;
float flaecheninhalt = 3.14159 * radius * radius;

println("Ein Kreis mit Radius " + radius + " hat den Umfang " + umfang + " und den Flächeninhalt " + flaecheninhalt);
```

:::

### double

Variablen vom Datentyp double können - ähnlich wie float-Variablen - rationale Zahlen (näherungsweise) speichern, verwenden dazu jeweils doppelt so viel Speicherplatz (64 Bit je Wert) und sind daher doppelt genau. → Daher auch der Name ;-).

Ein double-Wert besitzt ca. 14 gültige Ziffern.

Ein einfaches Beispiel:

Ein Kapital von 1000 € wird jährlich mit 3 % verzinst. Wie viel Geld ist nach 0, 1, 2, … Jahren auf dem Konto?

:::onlineide{id="995525" height=300 fileList=false}

```java Test.java
double kapital = 1000;
double zinssatzInProzent = 3;

for (int i = 0; i < 6; i++) {
   println("Kapital nach " + i + " Jahren: " + kapital);
   kapital = kapital + kapital * zinssatzInProzent / 100;
}
```

:::

### char

In einer Variable vom Datentyp char kann man genau ein Zeichen (Buchstabe, Ziffer oder Sonderzeichen) speichern. char ist die Kurzform von character (Zeichen).
Zeichen-Konstanten schreibt man in einfachen Anführungszeichen also z.B. char c = 'T'. 

:::alert{info}
Die Methode charAt der Klasse String gibt einen Wert vom Datentyp char zurück.
:::

:::onlineide{id="490934" height=200 fileList=false}

```java Test.java
String text = "Das ist ein Text";
char zeichen = 'T';
if(text.charAt(12) == 'T') {
   println("Das 12. Zeichen des Textes ist ein T.");
}
```

:::

### boolean

Variablen vom Datentyp boolean können nur zwei verschiedene Werte speichern: true oder false. Man nennt sie auch Wahrheitswerte.

Wahrheitswerte können mit den Operatoren && (und) und || (oder) verknüft werden. Mit dem vorangestellten Operator ! (nicht) erhält man das "Gegenteil" des Wahrheitswertes. 

:::onlineide{id="810483" height=200 fileList=false}

```java Test.java
boolean b1 = 3 < 5;
System.out.println(b1);
boolean b2 = 7 > 12;
System.out.println(b2);
System.out.println(b1 || b2);
System.out.println(b1 && b2);
System.out.println(!b1);
```

:::