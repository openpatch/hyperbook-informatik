---
name: Wiederholungen
lang: de
index: 2
---

# Wiederholungen (Schleifen)

Schleifen ermöglichen es, Code mehrfach auszuführen, ohne ihn mehrfach schreiben zu müssen. Das spart Zeit und macht Programme übersichtlicher!

:::snippet{#beispiel}

**Stell dir vor**: Du sollst 100 Mal "Ich mache meine Hausaufgaben" schreiben. Würdest du das wirklich 100 Mal tippen? 

Mit Schleifen sagst du dem Computer einfach: "Wiederhole diese Aktion 100 Mal!"

:::

In Java gibt es verschiedene Arten von Schleifen:
1. **while-Schleife** (kopfgesteuert)
2. **for-Schleife** (zählergesteuert)
3. **do-while-Schleife** (fußgesteuert)

## Die while-Schleife

Die :t[kopfgesteuerte-schleife]{#kopfgesteuerte-schleife} (while-loop) prüft **vor** jedem Durchgang, ob die Bedingung noch erfüllt ist.

### Falscher Ansatz (ohne Schleife)

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java OhneSchleife.java
// So solltest du es NICHT machen:
System.out.println("Hallo Welt!");
System.out.println("Hallo Welt!");
System.out.println("Hallo Welt!");
System.out.println("Hallo Welt!");
System.out.println("Hallo Welt!");
// ... noch 95 Mal ...
```
:::

### Richtiger Ansatz (mit while-Schleife)

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java MitWhileSchleife.java
int zaehler = 1;

while (zaehler <= 10) {
    System.out.println("Hallo Welt! (zum " + zaehler + "-ten Mal)");
    zaehler = zaehler + 1;  // oder: zaehler++;
}

System.out.println("Fertig! Alle " + (zaehler - 1) + " Wiederholungen abgeschlossen.");
```
:::

### Aufbau einer while-Schleife

```java
while (Bedingung) {
    // Code, der wiederholt wird
    // Wichtig: Bedingung muss irgendwann false werden!
}
```

:::snippet{#merken}

**Wichtig**: Die Bedingung muss irgendwann `false` werden, sonst läuft die Schleife unendlich!

:::

### Praktisches Beispiel: Passwort-Eingabe

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java PasswortSchleife.java
String korrektesPIN = "1234";
String eingabe = "";
int versuche = 0;

while (!eingabe.equals(korrektesPIN)) {
    versuche++;
    eingabe = Input.readString("Versuch " + versuche + " - Gib das Passwort ein:");
    
    if (eingabe.equals(korrektesPIN)) {
        System.out.println("✓ Korrekt! Du warst beim " + versuche + ". Versuch erfolgreich.");
    } else {
        System.out.println("✗ Falsch! Versuche es nochmal.");
    }
    
    if (versuche >= 3 && !eingabe.equals(korrektesPIN)) {
        System.out.println("Zu viele Versuche! Zugang gesperrt.");
        break;  // Schleife verlassen
    }
}
```
:::

## Die for-Schleife

Die :t[zählergesteuerte-schleife]{#zaehlergesteuerte-schleife} (for-loop) ist perfekt, wenn du weißt, wie oft etwas wiederholt werden soll.

### Aufbau einer for-Schleife

```java
for (Initialisierung; Bedingung; Aktualisierung) {
    // Code, der wiederholt wird
}
```

### Vergleich: while vs. for

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java WhileVsFor.java
// Mit while-Schleife:
System.out.println("Mit while-Schleife:");
int i = 1;
while (i <= 5) {
    System.out.println("Durchgang " + i);
    i++;
}

System.out.println();

// Mit for-Schleife (kompakter):
System.out.println("Mit for-Schleife:");
for (int j = 1; j <= 5; j++) {
    System.out.println("Durchgang " + j);
}
```
:::

### Praktische for-Schleifen-Beispiele

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ForBeispiele.java
// 1. Countdown
System.out.println("Countdown:");
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}
System.out.println("Start! 🚀");

System.out.println();

// 2. Nur gerade Zahlen
System.out.println("Gerade Zahlen von 2 bis 20:");
for (int i = 2; i <= 20; i = i + 2) {
    System.out.println(i);
}

System.out.println();

// 3. Multiplikationstabelle
int zahl = 7;
System.out.println("Multiplikationstabelle für " + zahl + ":");
for (int i = 1; i <= 10; i++) {
    System.out.println(zahl + " × " + i + " = " + (zahl * i));
}
```
:::

## Verschachtelte Schleifen

Du kannst Schleifen ineinander verwenden - das nennt man "verschachteln":

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java VerschachtelteSchleifen.java
// Multiplikationstabelle von 1 bis 5
System.out.println("Kleine Multiplikationstabelle:");
for (int zeile = 1; zeile <= 5; zeile++) {
    for (int spalte = 1; spalte <= 5; spalte++) {
        int ergebnis = zeile * spalte;
        System.out.print(ergebnis + "\t");  // \t = Tabulator
    }
    System.out.println();  // Neue Zeile
}

System.out.println();

// Sterne-Dreieck
System.out.println("Sterne-Dreieck:");
for (int zeile = 1; zeile <= 5; zeile++) {
    for (int stern = 1; stern <= zeile; stern++) {
        System.out.print("★");
    }
    System.out.println();
}
```
:::

## Nützliche Schleifenmuster

### Summen berechnen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Summenberechnung.java
// Summe der Zahlen von 1 bis 100
int summe = 0;
for (int i = 1; i <= 100; i++) {
    summe = summe + i;
}
System.out.println("Summe von 1 bis 100: " + summe);

// Summe der geraden Zahlen von 2 bis 50
int geradeZahlenSumme = 0;
for (int i = 2; i <= 50; i = i + 2) {
    geradeZahlenSumme += i;
}
System.out.println("Summe der geraden Zahlen von 2 bis 50: " + geradeZahlenSumme);

// Fakultät berechnen (5! = 5 × 4 × 3 × 2 × 1)
int n = 5;
int fakultaet = 1;
for (int i = 1; i <= n; i++) {
    fakultaet = fakultaet * i;
}
System.out.println(n + "! = " + fakultaet);
```
:::

### Maximum/Minimum finden

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java MaxMinFinden.java
int anzahlZahlen = 5;
int maximum = Integer.MIN_VALUE;  // Kleinstmöglicher int-Wert
int minimum = Integer.MAX_VALUE;  // Größtmöglicher int-Wert

System.out.println("Gib " + anzahlZahlen + " Zahlen ein:");

for (int i = 1; i <= anzahlZahlen; i++) {
    int zahl = Input.readInt("Zahl " + i + ":");
    
    if (zahl > maximum) {
        maximum = zahl;
    }
    
    if (zahl < minimum) {
        minimum = zahl;
    }
}

System.out.println("Maximum: " + maximum);
System.out.println("Minimum: " + minimum);
```
:::

## Besondere Schleifenbefehle

### break - Schleife vorzeitig verlassen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java BreakBeispiel.java
// Zahlenraten-Spiel
int geheimeZahl = 42;
int maxVersuche = 5;

for (int versuch = 1; versuch <= maxVersuche; versuch++) {
    int tipp = Input.readInt("Versuch " + versuch + " - Rate die Zahl (1-100):");
    
    if (tipp == geheimeZahl) {
        System.out.println("🎉 Richtig! Du hast die Zahl in " + versuch + " Versuchen erraten!");
        break;  // Schleife verlassen
    } else if (tipp < geheimeZahl) {
        System.out.println("Zu klein!");
    } else {
        System.out.println("Zu groß!");
    }
    
    if (versuch == maxVersuche) {
        System.out.println("💀 Leider verloren! Die Zahl war " + geheimeZahl);
    }
}
```
:::

### continue - Aktuellen Durchlauf überspringen

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ContinueBeispiel.java
// Nur ungerade Zahlen ausgeben
System.out.println("Ungerade Zahlen von 1 bis 20:");
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) {  // Wenn gerade
        continue;  // Überspringe den Rest und gehe zum nächsten Durchlauf
    }
    System.out.println(i);
}
```
:::

## Übung: Primzahlen finden

:::snippet{#aufgabe}

Eine Primzahl ist eine Zahl, die nur durch 1 und sich selbst teilbar ist.
Schreibe ein Programm, das prüft, ob eine eingegebene Zahl eine Primzahl ist.

**Tipp**: Prüfe, ob die Zahl durch irgendetwas zwischen 2 und der Zahl-1 teilbar ist.

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java Primzahlentest.java
int zahl = Input.readInt("Gib eine Zahl ein:");

// Deine Lösung hier:
// Verwende eine Schleife, um zu prüfen, ob die Zahl teilbar ist

```
:::

:::collapsible{title="Lösung" id="primzahl_lösung"}
```java
boolean istPrimzahl = true;

if (zahl <= 1) {
    istPrimzahl = false;
} else {
    for (int i = 2; i < zahl; i++) {
        if (zahl % i == 0) {
            istPrimzahl = false;
            break;
        }
    }
}

if (istPrimzahl) {
    System.out.println(zahl + " ist eine Primzahl");
} else {
    System.out.println(zahl + " ist keine Primzahl");
}
```
:::

## Teste-Dich-Projekt 1: Zahlen-Pyramide

:::snippet{#aufgabe}

Erstelle ein Programm, das eine Zahlen-Pyramide ausgibt:
```
1
12
123
1234
12345
```

Die Höhe der Pyramide soll vom Benutzer eingegeben werden.

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ZahlenPyramide.java
int hoehe = Input.readInt("Wie hoch soll die Pyramide sein?");

// Deine Lösung hier:

```
:::

### Testfälle
- Höhe 3: 
  ```
  1
  12
  123
  ```
- Höhe 5: Wie oben gezeigt

## Teste-Dich-Projekt 2: Domino-Steine

:::snippet{#aufgabe}

Gib alle Dominosteine ohne Dopplungen aus. Domino-Steine haben zwei Seiten mit Zahlen von 0 bis 6.

**Ausgabe soll so aussehen**:
```
(0|0)(0|1)(0|2)(0|3)(0|4)(0|5)(0|6) 
     (1|1)(1|2)(1|3)(1|4)(1|5)(1|6) 
          (2|2)(2|3)(2|4)(2|5)(2|6) 
               (3|3)(3|4)(3|5)(3|6) 
                    (4|4)(4|5)(4|6) 
                         (5|5)(5|6) 
                              (6|6)
```

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java DominoSteine.java
// Deine Lösung hier:
// Tipp: Verwende verschachtelte for-Schleifen
// Die äußere Schleife geht von 0 bis 6 (erste Zahl)
// Die innere Schleife geht von der ersten Zahl bis 6 (zweite Zahl)

```
:::

:::collapsible{title="Lösung" id="domino_lösung"}
```java
for (int erste = 0; erste <= 6; erste++) {
    // Leerzeichen für die Einrückung
    for (int leer = 0; leer < erste; leer++) {
        System.out.print("     ");
    }
    
    // Dominosteine der aktuellen Zeile
    for (int zweite = erste; zweite <= 6; zweite++) {
        System.out.print("(" + erste + "|" + zweite + ")");
    }
    
    System.out.println();  // Neue Zeile
}
```
:::

## Expertenbereich

:::snippet{#brain}

**Erweiterte Aufgaben**:
- Erstelle ein Programm, das das kleine 1×1 (Multiplikationstabelle bis 10×10) übersichtlich ausgibt
- Programmiere ein Muster aus Sternen, das ein Herz ♥ darstellt
- Erstelle einen ASCII-Art-Generator, der Text in großen Buchstaben ausgibt

:::

:::onlineide{url="https://nrw.onlineide.openpatch.org"}
```java ExpertenAufgaben.java
// Hier kannst du die erweiterten Aufgaben bearbeiten

```
:::
