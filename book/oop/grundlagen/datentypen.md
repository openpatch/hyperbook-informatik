---
name: Datentypen
index: 4
lang: de
---

# Datentypen

In Java gibt es verschiedene Datentypen, die bestimmen, welche Art von Werten eine :t[Variable]{#variable} speichern kann. Man unterscheidet zwischen **primitiven Datentypen** und **Referenzdatentypen**.

:::snippet{#merken}

**Wichtiger Unterschied**:
- **Primitive Datentypen**: Der Wert wird direkt in der Variable gespeichert
- **Referenzdatentypen**: Die Variable enthält eine Referenz (Verweis) auf ein :t[Objekt]{#objekt}

:::

Das folgende Beispiel zeigt den Unterschied zwischen primitiven Datentypen (hier int) und Referenzdatentypen (hier String):

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java DatentypenUnterschied.java
int a = 1;
String b = "Hallo";

System.out.println("Primitive Variable a: " + a);
System.out.println("Referenz Variable b: " + b);
```
:::

So können wir uns die Zuweisung zu den beiden Variablen visuell vorstellen. Während bei der Variable a direkt der gewünschte Wert steht, verweist der Wert der Variable b auf ein anderes Objekt.

![](/images/datentypen-arbeitsspeicher.png)

## Primitive Datentypen

Die primitiven Datentypen sind die Grundbausteine für die Datenspeicherung in Java. Hier sind die wichtigsten:

### int (Ganze Zahlen)

Der Datentyp `int` speichert ganze Zahlen von etwa -2 Milliarden bis +2 Milliarden.

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java IntBeispiel.java
int alter = 16;
int temperatur = -5;
int punktzahl = 1250;

System.out.println("Ich bin " + alter + " Jahre alt");
System.out.println("Es sind " + temperatur + " Grad draußen");
System.out.println("Du hast " + punktzahl + " Punkte erreicht");

// Rechnen mit int
int a = 10;
int b = 3;
System.out.println("Addition: " + (a + b));
System.out.println("Subtraktion: " + (a - b));
System.out.println("Multiplikation: " + (a * b));
System.out.println("Division: " + (a / b));  // Achtung: Ganzzahldivision!
System.out.println("Modulo (Rest): " + (a % b));
```
:::

:::snippet{#merken}

**Wichtig bei int-Division**: `10 / 3` ergibt `3`, nicht `3.33...`! Der Rest wird abgeschnitten.

:::

### double (Kommazahlen)

Der Datentyp `double` speichert Dezimalzahlen mit hoher Genauigkeit.

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java DoubleBeispiel.java
double pi = 3.14159;
double preis = 19.99;
double geschwindigkeit = 120.5;

System.out.println("Pi ist ungefähr: " + pi);
System.out.println("Das kostet: " + preis + " Euro");
System.out.println("Wir fahren " + geschwindigkeit + " km/h");

// Rechnen mit double
double radius = 5.0;
double flaeche = pi * radius * radius;
double umfang = 2 * pi * radius;

System.out.println("Kreisfläche: " + flaeche);
System.out.println("Kreisumfang: " + umfang);
```
:::

#### int vs. double bei Berechnungen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java IntVsDouble.java
// Nur int - Ganzzahldivision
int intA = 7;
int intB = 2;
System.out.println("int-Division: " + intA + " / " + intB + " = " + (intA / intB));

// Mit double - normale Division  
double doubleA = 7.0;
double doubleB = 2.0;
System.out.println("double-Division: " + doubleA + " / " + doubleB + " = " + (doubleA / doubleB));

// Gemischt - wird zu double
System.out.println("Gemischt: " + 7 + " / " + 2.0 + " = " + (7 / 2.0));

// Typumwandlung
int ganzeZahl = 5;
double kommaZahl = (double) ganzeZahl;
System.out.println("Umgewandelt: " + ganzeZahl + " wird zu " + kommaZahl);
```
:::

### boolean (Wahrheitswerte)

Variablen vom Typ `boolean` können nur `true` (wahr) oder `false` (falsch) speichern.

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java BooleanBeispiel.java
boolean istSonnig = true;
boolean regnet = false;
boolean istWochenende = true;

System.out.println("Ist es sonnig? " + istSonnig);
System.out.println("Regnet es? " + regnet);

// Vergleiche ergeben boolean-Werte
int alter = 16;
boolean istErwachsen = alter >= 18;
boolean istSchüler = alter < 18;

System.out.println("Ist erwachsen? " + istErwachsen);
System.out.println("Ist Schüler? " + istSchüler);

// Logische Operatoren
boolean geheBaden = istSonnig && !regnet;  // und + nicht
boolean bleibeDrinnen = regnet || !istSonnig;  // oder

System.out.println("Gehe baden? " + geheBaden);
System.out.println("Bleibe drinnen? " + bleibeDrinnen);
```
:::

### char (Einzelne Zeichen)

Der Datentyp `char` speichert genau ein Zeichen.

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java CharBeispiel.java
char note = 'A';
char erstersuchstabe = 'M';
char sonderzeichen = '!';

System.out.println("Note: " + note);
System.out.println("Erster Buchstabe: " + erstersuchstabe);
System.out.println("Sonderzeichen: " + sonderzeichen);

// char aus String extrahieren
String name = "Max";
char erstesZeichen = name.charAt(0);
char letztesZeichen = name.charAt(name.length() - 1);

System.out.println("Erstes Zeichen von " + name + ": " + erstesZeichen);
System.out.println("Letztes Zeichen von " + name + ": " + letztesZeichen);
```
:::

## Referenzdatentypen

### String (Zeichenketten)

Jede :t[Klasse]{#klasse} stellt einen Referenzdatentyp dar. Die wichtigste vordefinierte Klasse ist `String`.

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java StringBeispiel.java
String vorname = "Anna";
String nachname = "Müller";
String vollername = vorname + " " + nachname;

System.out.println("Vollständiger Name: " + vollername);

// Nützliche String-Methoden
System.out.println("Länge: " + vollername.length());
System.out.println("Großbuchstaben: " + vollername.toUpperCase());
System.out.println("Kleinbuchstaben: " + vollername.toLowerCase());
System.out.println("Enthält 'Anna': " + vollername.contains("Anna"));

// String-Vergleich (WICHTIG!)
String passwort1 = "geheim123";
String passwort2 = "geheim123";
String passwort3 = "GEHEIM123";

System.out.println("Passwörter gleich? " + passwort1.equals(passwort2));
System.out.println("Passwörter gleich (ignoriere Groß/Klein)? " + passwort1.equalsIgnoreCase(passwort3));
```
:::

:::snippet{#merken}

**Wichtig**: Verwende bei Strings IMMER `.equals()` für Vergleiche, niemals `==`!

:::

## Übung: Datentypen erkennen

:::snippet{#aufgabe}

Welcher Datentyp ist für folgende Werte am besten geeignet?

1. Das Alter einer Person
2. Der Preis eines Produkts
3. Ob jemand verheiratet ist
4. Der erste Buchstabe des Nachnamens
5. Die Adresse einer Person
6. Die Anzahl der Tage im Jahr
7. Die Körpergröße in Metern

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java DatentypenÜbung.java
// Erstelle für jeden Wert oben eine passende Variable
// Beispiel für das Alter:
int alter = 25;

// Deine Lösungen hier:

```
:::

:::collapsible{title="Lösung" id="datentypen_lösung"}
```java
int alter = 25;                    // 1. Ganze Zahl
double preis = 19.99;              // 2. Kommazahl
boolean verheiratet = false;        // 3. Wahrheitswert
char ersterbuchstabe = 'M';        // 4. Einzelnes Zeichen
String adresse = "Musterstraße 1"; // 5. Text
int tageImJahr = 365;              // 6. Ganze Zahl
double groesse = 1.75;             // 7. Kommazahl
```
:::

## Teste-Dich-Projekt: Persönliche Daten

:::snippet{#aufgabe}

Erstelle ein Programm, das verschiedene persönliche Daten speichert und ausgibt:
- Name (String)
- Alter (int)
- Größe in Metern (double)
- Ist Schüler (boolean)
- Lieblings-Netzzeichen (char)

Das Programm soll diese Daten schön formatiert ausgeben und zusätzlich berechnen:
- Wie alt die Person in 10 Jahren sein wird
- Ob die Person erwachsen ist (>= 18)

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java PersönlicheDaten.java
// Deine Lösung hier

```
:::

### Testfälle
- Name: "Lisa Schmidt", Alter: 16, Größe: 1.65, Schüler: true, Zeichen: '♥'
- Erwartete Ausgabe: Aktuelle Daten + "In 10 Jahren bist du 26 Jahre alt" + "Du bist noch nicht erwachsen"

:::snippet{#brain}

**Erweitere das Programm**:
- Berechne das Geburtsjahr (aktuelles Jahr - Alter)
- Zeige an, in wie vielen Jahren die Person erwachsen wird (falls noch nicht erwachsen)
- Erstelle einen "Steckbrief" mit allen Informationen schön formatiert

:::