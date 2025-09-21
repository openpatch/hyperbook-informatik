---
name: Arrays
index: 7
lang: de
---

# Arrays (Felder)

Ein **Array** (deutsch: "Feld") ermöglicht es, viele Werte des gleichen Datentyps unter einem Namen zu speichern. Statt hunderte einzelne Variablen zu erstellen, verwendest du ein Array!

:::snippet{#beispiel}

**Stell dir vor**: Du möchtest die Noten von 30 Schülern speichern. Würdest du wirklich 30 separate Variablen erstellen?

```java
double note1 = 2.3;
double note2 = 1.7;
double note3 = 3.1;
// ... 27 weitere Variablen ...
```

Mit einem Array geht das viel eleganter:
```java
double[] noten = new double[30];  // Array für 30 Noten
```

:::

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

Ein **Array** ist ein Datentyp, der es gestattet, viele gleichartige Daten zu speichern und durch Angabe eines **Index** (Position) schnell auf sie zuzugreifen.

## Array erstellen und verwenden

### Array deklarieren und initialisieren

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ArrayGrundlagen.java
// 1. Array erstellen (alle Werte sind anfangs 0)
int[] zahlen = new int[5];  // Array für 5 ganze Zahlen

// 2. Werte zuweisen (Index startet bei 0!)
zahlen[0] = 10;
zahlen[1] = 20;
zahlen[2] = 30;
zahlen[3] = 40;
zahlen[4] = 50;

// 3. Werte ausgeben
System.out.println("Erstes Element: " + zahlen[0]);
System.out.println("Letztes Element: " + zahlen[4]);

// 4. Array-Länge abrufen
System.out.println("Das Array hat " + zahlen.length + " Elemente");
```
:::

:::snippet{#merken}

**Wichtig**: 
- Arrays starten bei Index 0, nicht bei 1!
- Ein Array mit 5 Elementen hat die Indizes 0, 1, 2, 3, 4
- Mit `.length` bekommst du die Anzahl der Elemente

:::

### Verschiedene Arten, Arrays zu erstellen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ArrayErstellung.java
// Methode 1: Erstellen und später füllen
int[] methode1 = new int[3];
methode1[0] = 1;
methode1[1] = 2;
methode1[2] = 3;

// Methode 2: Direkt mit Werten initialisieren
int[] methode2 = {10, 20, 30, 40, 50};

// Methode 3: Alternative Schreibweise
int[] methode3 = new int[]{100, 200, 300};

// Methode 4: Strings-Array
String[] namen = {"Anna", "Max", "Lisa", "Tom"};

// Alle ausgeben
System.out.println("Methode 1: " + methode1[0] + ", " + methode1[1] + ", " + methode1[2]);
System.out.println("Methode 2 hat " + methode2.length + " Elemente");
System.out.println("Erstes Element von methode3: " + methode3[0]);
System.out.println("Zweiter Name: " + namen[1]);
```
:::

## Arrays mit Schleifen verwenden

Arrays und Schleifen passen perfekt zusammen!

### Mit for-Schleife durch Array iterieren

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ArrayMitSchleifen.java
double[] preise = {19.99, 25.50, 12.00, 8.75, 33.20};

// Alle Preise ausgeben
System.out.println("Alle Preise:");
for (int i = 0; i < preise.length; i++) {
    System.out.println("Artikel " + (i + 1) + ": " + preise[i] + " €");
}

// Gesamtpreis berechnen
double gesamtpreis = 0;
for (int i = 0; i < preise.length; i++) {
    gesamtpreis = gesamtpreis + preise[i];
}
System.out.println("Gesamtpreis: " + gesamtpreis + " €");

// Durchschnittspreis
double durchschnitt = gesamtpreis / preise.length;
System.out.println("Durchschnittspreis: " + durchschnitt + " €");
```
:::

### Enhanced For-Schleife (for-each)

Für das einfache Durchlaufen gibt es eine elegantere Schreibweise:

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ForEachSchleife.java
String[] hobbys = {"Lesen", "Gaming", "Sport", "Musik", "Reisen"};

// Normale for-Schleife
System.out.println("Mit normaler for-Schleife:");
for (int i = 0; i < hobbys.length; i++) {
    System.out.println("- " + hobbys[i]);
}

System.out.println();

// Enhanced for-Schleife (eleganter!)
System.out.println("Mit for-each-Schleife:");
for (String hobby : hobbys) {
    System.out.println("- " + hobby);
}

// Funktioniert auch mit Zahlen
int[] punkte = {100, 85, 92, 78, 96};
int gesamtpunkte = 0;

for (int punkt : punkte) {
    gesamtpunkte += punkt;
}
System.out.println("Gesamtpunkte: " + gesamtpunkte);
```
:::

## Praktische Array-Operationen

### Maximum und Minimum finden

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java MaxMinArray.java
int[] temperaturen = {22, 18, 25, 19, 30, 16, 27, 23};

// Maximum finden
int maximum = temperaturen[0];
for (int i = 1; i < temperaturen.length; i++) {
    if (temperaturen[i] > maximum) {
        maximum = temperaturen[i];
    }
}

// Minimum finden
int minimum = temperaturen[0];
for (int i = 1; i < temperaturen.length; i++) {
    if (temperaturen[i] < minimum) {
        minimum = temperaturen[i];
    }
}

System.out.println("Höchste Temperatur: " + maximum + "°C");
System.out.println("Niedrigste Temperatur: " + minimum + "°C");

// Eleganter mit for-each
int max2 = temperaturen[0];
int min2 = temperaturen[0];

for (int temp : temperaturen) {
    if (temp > max2) max2 = temp;
    if (temp < min2) min2 = temp;
}

System.out.println("Mit for-each - Max: " + max2 + "°C, Min: " + min2 + "°C");
```
:::

### Element suchen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ElementSuchen.java
String[] staedte = {"Berlin", "Hamburg", "München", "Köln", "Frankfurt"};
String gesuchteStadt = Input.readString("Welche Stadt suchst du?");

boolean gefunden = false;
int position = -1;

for (int i = 0; i < staedte.length; i++) {
    if (staedte[i].equals(gesuchteStadt)) {
        gefunden = true;
        position = i;
        break;  // Schleife verlassen, weil gefunden
    }
}

if (gefunden) {
    System.out.println("✓ " + gesuchteStadt + " gefunden an Position " + position);
} else {
    System.out.println("✗ " + gesuchteStadt + " nicht in der Liste");
}

// Alle Städte anzeigen
System.out.println("Verfügbare Städte:");
for (int i = 0; i < staedte.length; i++) {
    System.out.println(i + ": " + staedte[i]);
}
```
:::

## Aufgabe: Rätsel (Nachvollziehen)

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Raetsel.java
int[] zahlen = new int[4];    //Das Feld zahlen hat 4 Werte, mit den Indizes 0, 1, 2, 3

zahlen[1] = 12;
zahlen[2] = 8;
zahlen[0] = zahlen[2] * 3;
zahlen[3] = zahlen[1] + zahlen[0];

for (int i = 0; i < 4; i++) {
   System.out.println(i + ": " + zahlen[i]);
}
```
:::

**Aufgabe**: Führe das Programm schrittweise aus und notiere dir, welche Werte in welcher Reihenfolge zugewiesen werden.

:::collapsible{title="Lösung" id="raetsel_lösung"}
```
0: 24  (zahlen[0] = zahlen[2] * 3 = 8 * 3 = 24)
1: 12  (zahlen[1] = 12)
2: 8   (zahlen[2] = 8)
3: 36  (zahlen[3] = zahlen[1] + zahlen[0] = 12 + 24 = 36)
```
:::

## Übung: Notenverwaltung

:::snippet{#aufgabe}

Erstelle ein Programm zur Verwaltung von Schulnoten:
1. Erstelle ein Array für 5 Noten
2. Fülle es mit Noten von 1.0 bis 6.0
3. Berechne den Notendurchschnitt
4. Finde die beste und schlechteste Note
5. Zähle, wie viele Noten besser als 3.0 sind

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Notenverwaltung.java
// Deine Lösung hier:
double[] noten = new double[5];

// Noten eingeben (oder direkt zuweisen)
noten[0] = 2.3;
noten[1] = 1.7;
noten[2] = 3.1;
noten[3] = 2.8;
noten[4] = 1.9;

// Deine Berechnungen hier...

```
:::

## Teste-Dich-Projekt 1: Zahlen-Statistik

:::snippet{#aufgabe}

Erstelle ein Programm, das:
1. Ein Array mit 10 zufälligen Zahlen zwischen 1 und 100 erstellt
2. Diese Zahlen ausgibt
3. Folgende Statistiken berechnet:
   - Durchschnitt
   - Maximum und Minimum
   - Anzahl der geraden Zahlen
   - Anzahl der Zahlen über 50

**Tipp**: Für Zufallszahlen verwende: `(int)(Math.random() * 100) + 1`

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ZahlenStatistik.java
int[] zahlen = new int[10];

// Array mit Zufallszahlen füllen
for (int i = 0; i < zahlen.length; i++) {
    zahlen[i] = (int)(Math.random() * 100) + 1;
}

// Deine Lösung hier:

```
:::

### Testfälle
- Array mit 10 Zahlen zwischen 1 und 100
- Korrekte Berechnung von Durchschnitt, Max, Min
- Richtige Zählung von geraden Zahlen und Zahlen > 50

## Teste-Dich-Projekt 2: Einkaufsliste

:::snippet{#aufgabe}

Erstelle eine interaktive Einkaufsliste:
1. Array für 5 Artikel-Namen (String)
2. Array für 5 Preise (double)
3. Benutzer kann Artikel und Preise eingeben
4. Programm zeigt die komplette Liste an
5. Berechnet den Gesamtpreis
6. Findet das teuerste und billigste Produkt

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Einkaufsliste.java
String[] artikel = new String[5];
double[] preise = new double[5];

// Eingabe der Artikel und Preise
System.out.println("Gib 5 Artikel und ihre Preise ein:");
for (int i = 0; i < 5; i++) {
    artikel[i] = Input.readString("Artikel " + (i + 1) + ":");
    preise[i] = Input.readDouble("Preis für " + artikel[i] + ":");
}

// Deine Lösung für die Auswertung hier:

```
:::

## Häufige Fehler vermeiden

:::snippet{#merken}

**Typische Array-Fehler**:

1. **Index außerhalb des Bereichs**: 
   ```java
   int[] zahlen = new int[5];
   zahlen[5] = 10;  // FEHLER! Index geht nur von 0-4
   ```

2. **Verwechslung von length und length()**:
   ```java
   zahlen.length    // ✓ Richtig für Arrays
   text.length()    // ✓ Richtig für Strings
   ```

3. **Vergessen der Index-Initialisierung bei Schleifen**:
   ```java
   for (int i = 1; i <= zahlen.length; i++)  // FEHLER! 
   for (int i = 0; i < zahlen.length; i++)   // ✓ Richtig
   ```

:::

:::snippet{#brain}

**Erweiterte Aufgaben**:
- Implementiere Bubble Sort zum Sortieren eines Arrays
- Erstelle ein Programm, das Doppelte in einem Array findet
- Programmiere ein einfaches Lager-Verwaltungssystem mit Arrays
- Erstelle ein Quiz-Programm mit Fragen und Antworten in Arrays

:::

## Quellen

In Anlehnung an: https://www.learnj.de/doku.php?id=types:arrays:start