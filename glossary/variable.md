---
name: Variable
lang: de
---

Eine Variable ist ein grundlegendes Konzept in der Programmierung, das dazu dient, Daten oder Informationen zu speichern und in einem Computerprogramm zu verwenden.

Hier sind einige wichtige Merkmale und Konzepte im Zusammenhang mit Variablen:

1. Speicherplatz: Eine Variable ist wie ein Etikett oder ein Name für einen Speicherplatz im Computer, in dem Daten gespeichert werden können. Diese Daten können Zahlen, Texte, Wahrheitswerte (wie "wahr" oder "falsch") oder andere Arten von Informationen sein.
1. Namen: Jede Variable hat einen Namen, der es ermöglicht, auf sie zuzugreifen. Dieser Name wird verwendet, um auf den Wert der Variable zuzugreifen oder ihn zu ändern. Zum Beispiel könnte eine Variable namens "alter" dazu verwendet werden, das Alter einer Person zu speichern.
1. Datentyp: Jede Variable hat einen :t[Datentyp]{#datentyp}, der angibt, welche Art von Daten in ihr gespeichert werden kann. Zum Beispiel kann eine Variable vom Datentyp "int" (:t[Integer]{#integer}) nur ganze Zahlen speichern, während eine Variable vom Datentyp :t[String]{#string} Texte speichert.
1. Wertzuweisung: Um einer Variable einen Wert zuzuweisen, wird in der Regel eine Zuweisungsoperation verwendet. Zum Beispiel kann der Ausdruck "alter = 25" verwendet werden, um der Variable "alter" den Wert 25 zuzuweisen.

:::onlineide{id="235944"}

```java Beispiel.java

// Deklarieren (Speicherplatz zuweisen) und später einen Wert zuweisen.
String name;
name = "Marie";

// Deklarieren und Initialisieren
int alter = 27;
boolean machtSport = false;

// Wert ändern
machtSport = true;

// Wert lesen
System.out.println(alter);
```

:::