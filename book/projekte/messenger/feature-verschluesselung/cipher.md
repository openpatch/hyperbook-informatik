---
name: Abstrakte Klasse Cipher
index: 5
lang: de
---

# Aufgabe

Die verschiedenen Verschlüsselungsalogrithmen sollen unter einer abstrakten Klasse zusammengefasst werden.

1. Modelliere eine abstrakte Klasse Cipher

## Unsere Modellierung

```mermaid
classDiagram

    class Cipher {
        +verschluesseln(pText: String, pSchluessel: String) String*
        +entschluesseln(pText: String, pSchluessel: String) String*
    }

    CaesarCipher --|> Cipher
    VigenereCipher --|> Cipher
    PolybiosCipher --|> Cipher

    class CaesarCipher {
        +verschluesseln(pText: String, pSchluessel: String) String
        +entschluesseln(pText: String, pSchluessel: String) String
    }

    class VigenereCipher {
        +verschluesseln(pText: String, pSchluessel: String) String
        +entschluesseln(pText: String, pSchluessel: String) String
    }

    class PolybiosCipher {
        -matrix: char[][]
        +verschluesseln(pText: String, pSchluessel: String) String
        +entschluesseln(pText: String, pSchluessel: String) String
        -matrixomat(pSchluessel: String)
    }
```
