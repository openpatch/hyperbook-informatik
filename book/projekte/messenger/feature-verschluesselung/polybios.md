---
name: Polybios
index: 3
lang: de
---

# Polybios-Verschlüsselung

Die Caesar- und Vigenere-Verschlüsselung sind noch nicht sicher genug. Deshalb soll im Messenger noch eine dritte Möglichkeit zur Verschlüsselung bereitgestellt werden - die Polybios-Verschlüsselung.

## Das Verfahren

Zu allen Zeiten bedienten sich Staatsmänner, Botschafter, Geheimdienstler der Kryptografie (Geheimschrift) und verschickten verschlüsselte Nachrichten in der Hoffnung, vom Gegner unentdeckt zu bleiben.

Schon der griechische Geschichtsschreiber Polybios (etwa 200 v. Chr.) erwähnte einen Code, der die Buchstaben des Alphabetes durch zweistellige Zahlen ersetzt. Die Buchstaben des Alphabetes werden dazu in eine Matrix aus 5 Zeilen und 5 Spalten eingetragen.

```
  1 2 3 4 5
1 A B C D E
2 F G H I K
3 L M N O P
4 Q R S T U
5 V W X Y Z
```

Da das Alphabet aus 26 Buchstaben besteht, besetzen die Buchstaben "I" und "J" denselben Platz. Beim Verschlüsseln wird dann jeder Buchstabe durch ein Zahlenpaar ersetzt, das sich aus seiner Position mittels Zeilen- und Spaltennummer ergibt. Der Buchstabe "D" wird also durch die Zahl 14, der Buchstabe "R" durch 42 ersetzt.

### Aufgaben

1. Verschlüssele folgende Sätze: NUR MUT ! INFORMATIK IST SCHOEN. KRYPTOLOGIE MACHT SPASS.

2. Entschlüssele:  15331431241323 211542241533 !

## Schlüssel-Alphabet

Anstelle des normalen Alphabets, kann auch ein sogenanntes Schlüssel-Alphabet verwendet werden. Dazu wird zunächst ein Schlüssel festgelegt - zum Beispiel: Apfelstrudel. Die Buchstaben des Schlüssels werden dann die ersten Zeichen in der Matrix:

```
  1 2 3 4 5
1 A P F E L
2 S T R U D
3 B C G H I
4 K M N O Q
5 V W X Y Z
```

### Aufgaben

1. Verschlüssele TREFFEN2015ADLERSTR56

:::collapsible{id="safjkf" title="Lösung"}

22 23 14 13 13 14 43 11 25 15 14 23 21 22 23

:::

2. Erfinde ein eigenes Schlüsselwort, verschlüssele einen Text und gib diesen an deinen Sitznachbar/deine Sitznachbarin zum Entschlüsseln.

## Polybios verbessern

Auch die Polybios-Verschlüsselung ist nicht sicher und es können in der normalen Version auch nicht alle Zeichen verschlüsselt werden.

Ein Computer ist nicht an die Grenzen von Menschen geknüpft. Zum Beispiel muss der Schlüssel für Computer keinen Sinn ergeben, um ihn sich zu merken. Außerdem kann der Computer auch leicht mit größeren Matrizen umgehen.

### Aufgaben

1. Erweitere die Polybios-Verschlüsselung so, dass Umlaute (äöü), das scharfe S (ß), die Satzzeichen (!,.?) und das Leerzeichen verschlüsselt werden können.

2. Teste deine Erweiterung mit dem Schlüssel: "!NFORMATIK" und dem Klartext: "VERSCHLÜSSELN MACHT SPAß!".

3. Erkläre, warum die Eindeutigkeit der Verschlüsselung ab 82 Zeichen im Alphabet nicht mehr gegeben ist und entwickele eine Lösung.

4. Beschreibe eine Erweiterung der Polybios-Verschlüsselung, sodass alle Zeichen des Datentyps char verschlüsselt werden können.

5. Beschreibe ein Verfahren mit dem ein sicherer Schlüssel generiert werden kann.

## Implementierung

Jetzt kannst du die Polybios-Verschlüsselung in das frglib-Projekt integrieren. Gehe dazu anhand der Aufgaben vor.

### Aufgaben

1. Ein Programmierer hat sich folgendes Quelltextgerüst zur Implementierung der Verschlüsselung überlegt. Nutze das Quelltextgerüst und vervollständige es.

```java
public class PolybiosCipher {

    private char[][] matrix;

    /**
     * @param key die Polybios-Matrix als String kodiert.
     */
    public PolybiosCipher(String key) {
    }

    /**
     * Die Methode verschüsselt einen gegebenen Text in der Form:
     *
     * ZEILE#SPALTE ZEILE#SPALTE ...
     *
     * @param text der zu verschlüsselende Text
     * @return der verschlüsselte Text
     */
    public String encrypt(String text) {
        return null;
    }

    /**
     * Die Methode entschülsselt einen gegebenen Text der Form:
     *
     * ZEILE#SPALTE ZEILE#SPALTE ...
     *
     * @param text der zu entschlüsselnde Text
     * @return der entschlüsselte Text
     */
    public String decrypt(String text) {
        return null;
    }
}
```

:::collapsible{id="asjkfjajf" title="Lösung: String zu Matrix"}

```java
    // wir wollen eine quadratische Matrix erstellen und brauchen daher
    // die benötigte Anzahl der Spalten und Zeilen
    var n = (int) Math.ceil(Math.sqrt(key.length()));
    this.matrix = new char[n][n];

    for (int i = 0; i < key.length(); i++) {
        int y = i / n;
        int x = i % n;
        this.matrix[y][x] = key.charAt(i);
    }
```

:::
