---
name: Verzweigungen
lang: de
index: 3
---

# Verzweigungen

Verzweigungen ermöglichen es deinem Programm, Entscheidungen zu treffen! Je nach Bedingung wird ein anderer Programmteil ausgeführt.

:::snippet{#beispiel}

**Alltags-Beispiel**: 
Wenn es regnet, nehme ich einen Regenschirm mit. Wenn es nicht regnet, gehe ich ohne Regenschirm.

In der Programmierung können wir solche Entscheidungen mit `if`-Anweisungen umsetzen.

:::

In Java gibt es zwei Hauptarten von Verzweigungen:
1. **Bedingte Anweisung** (`if`, `else`)
2. **Fallunterscheidung** (`switch`)

## Die if-Anweisung

Die `if`-Anweisung führt Code nur aus, wenn eine Bedingung erfüllt ist.

### Grundform

```java
if (Bedingung) {
    // Code, der ausgeführt wird, wenn die Bedingung wahr ist
}
```

### Beispiel 1: Einfache Bedingung

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java EinfachesBedingung.java
int alter = 16;

if (alter >= 18) {
    System.out.println("Du bist volljährig!");
}

if (alter < 18) {
    System.out.println("Du bist noch minderjährig.");
}

System.out.println("Programm beendet.");
```
:::

**Aufgabe**: Ändere das Alter auf verschiedene Werte und beobachte die Ausgabe!

### if-else: Zwei Möglichkeiten

Mit `else` können wir festlegen, was passiert, wenn die Bedingung NICHT erfüllt ist:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java IfElse.java
int punkte = 85;

if (punkte >= 50) {
    System.out.println("Bestanden! Du hast " + punkte + " Punkte erreicht.");
} else {
    System.out.println("Leider nicht bestanden. Du hast nur " + punkte + " Punkte.");
}

// Beispiel 2: Wetter-Entscheidung
boolean regnet = true;

if (regnet) {
    System.out.println("Ich nehme einen Regenschirm mit.");
} else {
    System.out.println("Ich gehe ohne Regenschirm.");
}
```
:::

### if-else if-else: Mehrere Möglichkeiten

Für komplexere Entscheidungen können wir mehrere Bedingungen verknüpfen:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java NotenSystem.java
int punkte = Input.readInt("Wie viele Punkte hast du erreicht?");

if (punkte >= 90) {
    System.out.println("Note: Sehr gut (1)");
} else if (punkte >= 80) {
    System.out.println("Note: Gut (2)"); 
} else if (punkte >= 70) {
    System.out.println("Note: Befriedigend (3)");
} else if (punkte >= 60) {
    System.out.println("Note: Ausreichend (4)");
} else if (punkte >= 50) {
    System.out.println("Note: Mangelhaft (5)");
} else {
    System.out.println("Note: Ungenügend (6)");
}
```
:::

## Vergleichsoperatoren

Für Bedingungen brauchst du Vergleichsoperatoren:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Vergleichsoperatoren.java
int a = 5;
int b = 3;

System.out.println("a == b: " + (a == b));  // gleich
System.out.println("a != b: " + (a != b));  // ungleich
System.out.println("a > b: " + (a > b));    // größer
System.out.println("a < b: " + (a < b));    // kleiner
System.out.println("a >= b: " + (a >= b));  // größer oder gleich
System.out.println("a <= b: " + (a <= b));  // kleiner oder gleich

// String-Vergleiche (WICHTIG!)
String name1 = "Anna";
String name2 = "Anna";
String name3 = "ANNA";

System.out.println("name1.equals(name2): " + name1.equals(name2));
System.out.println("name1.equals(name3): " + name1.equals(name3));
System.out.println("name1.equalsIgnoreCase(name3): " + name1.equalsIgnoreCase(name3));
```
:::

:::snippet{#merken}

**Wichtig**: 
- Für Zahlen: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Für Strings: Immer `.equals()` verwenden, nie `==`!

:::

## Logische Operatoren

Du kannst mehrere Bedingungen miteinander verknüpfen:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java LogischeOperatoren.java
int alter = 16;
boolean hatFührerschein = false;
boolean istMüde = false;

// UND-Verknüpfung (&&): Beide Bedingungen müssen wahr sein
if (alter >= 18 && hatFührerschein) {
    System.out.println("Du darfst Auto fahren!");
} else {
    System.out.println("Du darfst noch nicht Auto fahren.");
}

// ODER-Verknüpfung (||): Eine Bedingung muss wahr sein
if (alter < 18 || istMüde) {
    System.out.println("Du solltest nicht fahren.");
} else {
    System.out.println("Du kannst fahren.");
}

// NICHT-Operator (!): Kehrt den Wahrheitswert um
if (!istMüde) {
    System.out.println("Du bist wach!");
}

// Komplexe Bedingung
if ((alter >= 18 && hatFührerschein) && !istMüde) {
    System.out.println("Alle Bedingungen für's Fahren erfüllt!");
}
```
:::

## Praktisches Beispiel: Login-System

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java LoginSystem.java
String korrekterBenutzer = "admin";
String korrektesPIN = "1234";

String benutzer = Input.readText("Benutzername:");
String pin = Input.readText("PIN:");

if (benutzer.equals(korrekterBenutzer) && pin.equals(korrektesPIN)) {
    System.out.println("✓ Login erfolgreich! Willkommen, " + benutzer + "!");
} else if (!benutzer.equals(korrekterBenutzer)) {
    System.out.println("✗ Unbekannter Benutzername!");
} else if (!pin.equals(korrektesPIN)) {
    System.out.println("✗ Falsche PIN!");
} else {
    System.out.println("✗ Login fehlgeschlagen!");
}
```
:::

## Der Modulo-Operator (%)

Mit dem Modulo-Operator kannst du den Rest einer Division berechnen:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ModuloBeispiele.java
// Prüfung auf gerade/ungerade Zahlen
int zahl = Input.readInt("Gib eine Zahl ein:");

if (zahl % 2 == 0) {
    System.out.println(zahl + " ist eine gerade Zahl");
} else {
    System.out.println(zahl + " ist eine ungerade Zahl");
}

// Teilbarkeit prüfen
int prüfzahl = Input.readInt("Durch welche Zahl soll geteilt werden?");

if (zahl % prüfzahl == 0) {
    System.out.println(zahl + " ist durch " + prüfzahl + " teilbar");
} else {
    System.out.println(zahl + " ist NICHT durch " + prüfzahl + " teilbar");
    System.out.println("Rest: " + (zahl % prüfzahl));
}
```
:::

## Übung: Schaltjahr berechnen

:::snippet{#aufgabe}

Ein Jahr ist ein Schaltjahr, wenn:
- Es durch 4 teilbar ist, UND
- Es NICHT durch 100 teilbar ist, ODER
- Es durch 400 teilbar ist

Beispiele: 2020 (Schaltjahr), 1900 (kein Schaltjahr), 2000 (Schaltjahr)

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Schaltjahr.java
int jahr = Input.readInt("Gib ein Jahr ein:");

// Deine Lösung hier:
// if (...) {
//     System.out.println(jahr + " ist ein Schaltjahr");
// } else {
//     System.out.println(jahr + " ist kein Schaltjahr");
// }
```
:::

:::collapsible{title="Lösung" id="schaltjahr_lösung"}
```java
if ((jahr % 4 == 0 && jahr % 100 != 0) || (jahr % 400 == 0)) {
    System.out.println(jahr + " ist ein Schaltjahr");
} else {
    System.out.println(jahr + " ist kein Schaltjahr");
}
```
:::

## Die switch-Anweisung

Für viele aufeinanderfolgende `if-else if`-Abfragen gibt es eine elegantere Lösung:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java SwitchBeispiel.java
int wochentag = Input.readInt("Welcher Wochentag? (1-7):");

switch (wochentag) {
    case 1:
        System.out.println("Montag - Wochenstart!");
        break;
    case 2:
        System.out.println("Dienstag - Vollgas!");
        break;
    case 3:
        System.out.println("Mittwoch - Bergfest!");
        break;
    case 4:
        System.out.println("Donnerstag - Fast geschafft!");
        break;
    case 5:
        System.out.println("Freitag - Wochenende naht!");
        break;
    case 6:
    case 7:
        System.out.println("Wochenende - Hurra!");
        break;
    default:
        System.out.println("Ungültige Eingabe!");
        break;
}
```
:::

:::snippet{#merken}

**Wichtig bei switch**: 
- Vergiss nicht das `break;` nach jedem Fall!
- `default` wird ausgeführt, wenn kein Fall passt

:::

## Teste-Dich-Projekt 1: Taschenrechner

:::snippet{#aufgabe}

Erstelle einen einfachen Taschenrechner, der:
- Zwei Zahlen einliest
- Eine Operation (+, -, *, /) einliest
- Das Ergebnis berechnet und ausgibt
- Bei Division durch 0 eine Fehlermeldung ausgibt

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Taschenrechner.java
double zahl1 = Input.readDouble("Erste Zahl:");
double zahl2 = Input.readDouble("Zweite Zahl:");
String operation = Input.readText("Operation (+, -, *, /):");

// Deine Lösung hier:

```
:::

### Testfälle
- 10 + 5 = 15
- 8 - 3 = 5  
- 4 * 6 = 24
- 15 / 3 = 5
- 10 / 0 = Fehlermeldung

## Teste-Dich-Projekt 2: Ampelschaltung

:::snippet{#aufgabe}

Simuliere eine Ampelschaltung:
- Eingabe: Aktueller Zustand der Ampel ("rot", "gelb", "grün")
- Ausgabe: Nächster Zustand und was zu tun ist

Ampelreihenfolge: rot → rot-gelb → grün → gelb → rot

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Ampel.java
String aktuellerZustand = Input.readText("Aktueller Ampelzustand (rot/gelb/grün):");

// Deine Lösung hier:

```
:::

:::snippet{#brain}

**Erweiterte Aufgabe**: 
- Erstelle eine Fußgängerampel, die parallel zur Autoampel läuft
- Baue einen Timer ein, der automatisch alle 3 Sekunden schaltet
- Implementiere einen "Anforderungsknopf" für Fußgänger

:::