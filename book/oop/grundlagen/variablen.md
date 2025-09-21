---
name: Variablen
lang: de
index: 1
---

# Variablen
Eine :t[Variable]{#variable} ist ein benannter Speicherplatz. Jede Variable hat einen Bezeichner (also einen Namen) und einen Datentyp. Der Datentyp legt fest, welche Werte die Variable speicher kann.
Vor der ersten Verwendung einer Variable müssen wir sie deklarieren. Dazu schreiben wir einfach den Datentyp der Variablen und dahinter den Bezeichner.
```java
int a;
```
Die hier deklarierte Variable trägt den Bezeichner a und hat den Datentyp int.
Schauen wir uns ein erstes Beispiel an, welches nur Variablen vom Typ Integer verwendet.
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Variablen1.java
int a;
a = 12;
System.out.println(3);
System.out.println(3 * a + 5);
System.out.println("3" + a);
```
:::
**Aufgabe**: Überlege dir wie die Ausgabe aussieht, wenn diese Quelltextfragment ausgeführt werden würde.
:::collapsible{title="Lösung" id="703561"}
Bei der ersten Ausgabe wird nur ein Integer ausgegeben.
Bei der zweiten Ausgabe werden drei Integer miteinander verrechnet und danach das Ergebnis ausgegeben.
Bei der dritten Ausgabe wird ein String mit einem Integer "addiert". In diesem Fall heißt das, dass der Integer als Zeichen an den String angehängt wird.
Also erhalten wir folgende Ausgabe:
```bash
3
41
312
```
:::

## Der Datentyp double
Neben ganzen Zahlen (int) können wir auch Kommazahlen (Gleitkommazahlen) speichern. Dafür verwenden wir den Datentyp `double`. Variablen vom Typ `double` können Dezimalzahlen mit hoher Genauigkeit speichern.

```java
double pi = 3.14159;
double temperatur = 23.5;
```

:::alert{info}
In Java werden Kommazahlen mit einem Punkt (.) statt einem Komma geschrieben, also `3.14` statt `3,14`.
:::

Schauen wir uns ein Beispiel mit `double`-Variablen an:
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java VariablenDouble.java
double a = 3.5;
double b = 2.0;
System.out.println(a + b);
System.out.println(a * b);
System.out.println(a / b);
```
:::

**Aufgabe**: Überlege dir, was bei diesem Code ausgegeben wird.

:::collapsible{title="Lösung" id="double_solution"}
```bash
5.5
7.0
1.75
```
:::

### Wichtiger Unterschied: int vs. double bei der Division
Ein wichtiger Unterschied zwischen `int` und `double` zeigt sich bei der Division:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Division.java
int a = 7;
int b = 2;
System.out.println(a / b);  // Ganzzahldivision

double c = 7.0;
double d = 2.0;
System.out.println(c / d);  // Kommazahldivision

System.out.println(7 / 2.0);  // Gemischte Division
```
:::

:::collapsible{title="Lösung" id="division_solution"}
```bash
3
3.5
3.5
```
Bei der Division von zwei `int`-Werten wird das Ergebnis abgerundet (Ganzzahldivision). Sobald mindestens einer der Werte ein `double` ist, wird eine normale Division durchgeführt.
:::

## Wie kann ich mir eine Variable vorstellen?
Stell dir eine Variable am besten als ein beschriftetetes Whiteboard vor, auf dem genau ein Wert (im Fall einer Variablen vom Typ int genau eine ganze Zahl, bei double eine Kommazahl) Platz hat.
Eine Wertzuweisung (z.B. `a = 5`) bewirkt, dass der alte Wert weggewischt und der neue Wert hingeschrieben wird.
Mit diesem Wissen versuche die nächste Aufgabe zu lösen:
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Variablen2.java
int a;
a = 37;
a = a + 1;
System.out.println(a);
```
:::
:::collapsible{title="Lösung" id="581442"}
38
:::
## Wertzuweisungen
Für die Wertzuweisung werden meistens Abkürzungen verwendet. Diese kannst du im nächsten Beispiel ausprobieren:
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Variablen3.java
int a;
a = 12;
a += 7;
System.out.println(a);
a--;
System.out.println(a);
a++;
System.out.println(a);
a = a * 3;
System.out.println(a);
```
:::
:::collapsible{title="Lösung" id="099636"}
```bash
19
18
19
57
```
:::

### Wertzuweisungen mit double
Die gleichen Abkürzungen funktionieren auch mit `double`-Variablen:
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java VariablenDoubleOperationen.java
double x = 10.5;
x += 2.3;
System.out.println(x);
x *= 2;
System.out.println(x);
x /= 3;
System.out.println(x);
```
:::

## Teste-Dich-Projekt 1
### Aufgabenstellung
Schreibe ein Programm, das die bei den Testfällen stehenden Rechnenaufgaben berechnet, die Ergebnisse in einer Variablen speichert und die Werte der Variablen auf der Konsole ausgibt.
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Rechnungen.java
int result = 1 + 7 - 9 + 43;
print(result);
result = 0;
```
:::
### Testfälle
- 1 + 7 - 9 + 43 = 42
- 43 - 9 + 7 + 1 = 42
- 4 * 3 + 1 = 13
- 12345 / 10 = 1234
- 9 * (2 + 1) = 27
- 1234 / 10 = 123
- 4 * 3 / 6 = 2
- 123 / 10 = 12
- (3 - 7) * (7 + 4) = -44
- 12 / 10 = 1
- 3 / 4 = 0
- 1 / 10 = 0
- 3.0 / 4.0 = 0.75
- 4 / 3 + 1 * 7 = 8
- 1234 % 10 = 4
- 4.0 / 3.0 + 1 * 7 = 8.333333
- 2 * 2 * 2 * 2 * 2 * 2 * 2 = 128
- 42 / 7 / 3 = 2
## Teste-Dich-Projekt 2
### Aufgabenstellung
Schreibe ein Programm, das einen RGB-Farbwert in einen CMYK-Farbwert umrechnet.
:::alert{info}
Der RGB-Farbwert wird für Displays und der CMYK-Farbwert für den Druck verwendet.
:::
Hier die Formeln zur Umrechnung. Die CMYK-Werte liegen zwischen 0 und 1. Die RGB-Werte zwischen 0 und 255.
$$
C = \frac{w - \frac{r}{255}}{w}
$$
$$
M = \frac{w - \frac{g}{255}}{w}
$$
$$
Y = \frac{w - \frac{b}{255}}{w}
$$
$$
K = 1 - w
$$
$$
w = max(\frac{r}{255}, \frac{g}{255}, \frac{b}{255})
$$
:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java RGBzuCMYK.java
int r = 255;
int g = 100;
int b = 20;
double w = Math.max(r / 255.0,g / 255.0);
w = Math.max(w,b / 255.0);
```
:::
### Testfälle
- R = 75, G = 0, B = 130
- C = 0.42307693, M = 1, Y = 0, K = 0.49019605
