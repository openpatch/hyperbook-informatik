---
name: Erste Dokumentation
index: 0
lang: de
---

# Dokumentation

Damit die Entwicklung des Messengers auch in Zukunft von anderen übernommen werden kann oder du dich nach eine Pause schnell in das Projekt einfinden kannst, soll das Projekt dokumentiert werden.

Zur Dokumentation werden wir drei Methoden verwenden.

1. Ein UML-Klassendiagramm
2. Ein Programmablaufplan
3. Ein kommentierter Quelltext

## Aufgabe: UML-Klassendiagramm

Das UML-Klassendiagramm zum Messenger solltest du bereits erstellt haben. 

1. Überprüfe, ob es noch zum aktuellen Quelltext passt und ergänze es gegebenfalls.

## Aufgabe: Programmablaufplan

Ein Programmablaufplan dokumentiert grafisch welche Schritte in welcher Reihenfolge ablaufen.

1. Lies den Informationstext zum :t[Programmablaufplan]
2. Erstelle einen Programmablaufplan für den Messeneger

## Aufgabe: Kommentare

Bisher sind nicht alle Methoden der Klasse App dokumentiert. Das wollen wir nun ändern.

1. Gegeben sind die folgenden Kommentare zu einer fiktiven Methode zum Suchen eines Kontakes. Vergleiche die beiden Kommentare und entscheide dich begründet, welchen du für geeigneter hälst.

```java
/**
 * Die Methode sucht einen Kontakt anhand des Namens. Dabei muss der Name nicht
 * komplett übereinstimmen, sondern es wird der Kontakt gefunden, dessen Namen
 * am ähnlichsten zum übergebenen Namen ist.
 */
public Contact fuzzySearch(String name) {
    // ...
}
```

```java
/**
 * In der Methode wird zuerst toFirst aufgerufen. Danach wird mit einer
 * while-Schleife die Liste contacts durchlaufen bis hasAccess false ist. Dabei
 * wird überprüft wie genau der Parameter name und der Name des Kontakts
 * übereinstimmen. Der Kontakt mit der besten Übereinstimmung wird in der
 * Variablen bestContact zwischengespeichert. Abschließend wird bestContact 
 * zurückgegeben.
 */
public Contact fuzzySearch(String name) {
    ...
}
```

2. Schreibe zu jeder Methode einen Kommentar. Orientiere dich dabei an den Kommentaren zu den Methoden `receive` und `send`.

