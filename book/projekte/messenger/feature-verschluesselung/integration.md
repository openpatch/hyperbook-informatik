---
name: Integration in den Messenger
index: 5
lang: de
---

# Integration in den Messenger

Die Caesar- und die Vigenere-Verschlüsselung sollen nun im Messenger integriert werden.

Dazu sollen folgende Anforderungen erfüllt sein:

- Beim Starten des Messengers soll der Benutzer zwischen der Caesar und der Vignere-Verschlüsselung wählen können.
- Nach der Wahl soll der Benutzer den Schlüssel eingeben können.
- Die Nachrichten sollen bis zur Anzeige (logHistory) verschlüsselt verwaltet werden.

## Aufgaben

1. Erstelle ein Klassendiagramm zum Messenger.
1. Erweitere das Klassendiagramm so, dass die Anforderungen erfüllt werden können.
2. Stellt einander eure Klassendiagramme vor und geht darauf ein wofür die neuen Attribute, Methode und/oder Klassen benötigt werden.
3. Einigt euch auf eine Modellierung.

:::alert{info}

Die Klassen zur Caesar- und Vigenere-Verschlüsselung können aus dem frglib-Projekt eingebunden werden (siehe unten).

:::

## Die FRG-Lib

Wir möchten die FRG-Lib in unserem Messenger-Projekt verwenden. Dazu können wir sie als JAR-Datei exportieren und in unser Messenger-Projekt importieren.

Gehe dazu wie folgt vor:

- frglib-Projekt: Gehe auf Projekt "als jar-Archiv" speichern
- Explorer: Erstelle ein Verzeichnis "+libs" im Verzeichnis des Messenger-Projekts
- Explorer: Kopiere das jar-Archiv in dieses Verzeichnis
- messenger-Projekt: Gehe auf Werkzeuge "Java Virtuelle Maschine zurücksetzen"

Nun solltest du die Klassen des frglib-Projektes verwenden können. Sollte dir bei den Klassen ein Fehler auffallen musst du den Prozess wiederholen.

:::alert{info}

Dies ist die übliche Methode, um Projekte von anderen in das eigene zu integrieren. Das Maven Repository https://mvnrepository.com ist ein Sammelplatz für solche Jar-Archive. Zum Beispiel für die berühmte Bibliothek [Log4j](https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core), die bei vielen Programmen zu Sicherheitslücken geführt hat (siehe [BSI](https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Cyber-Sicherheitslage/Schwachstelle-log4Shell-Java-Bibliothek/log4j_node.html)).

:::


### Aufgaben

1. Implementiere die Modellierung, sodass die Anfoderungen erfüllt sind.

:::alert{info}

Verwende die Scanner-Klasse zum Einlesen von Benutzereingaben

```java
Scanner scanner = new Scanner(System.in);

System.out.println("Wie ist dein wunderbarer Name?");

String name = scanner.nextLine();
System.out.println("Dein Name ist " +  name + ", schöner Name!");
```

:::
