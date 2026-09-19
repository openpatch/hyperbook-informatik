---
name: Struktogramm
lang: de
---

# Struktogramm

Ein **Struktogramm** (englisch *Nassi-Shneiderman diagram* oder *structogram*) stellt einen Algorithmus als ineinandergeschachtelte Kästen dar. Anders als der :t[Programmablaufplan]{#programmablaufplan} kennt es **keine Pfeile** – schon die Bauweise verhindert Sprünge, die sich nicht sauber programmieren lassen.

Die Notation ist die von [StruktoLab](https://struktolab.openpatch.org). Sie legt nur die **Form** der Kästen fest; die Inhalte dürfen umgangssprachlich formuliert werden.

## Die Bausteine

:::snippet{#merken}
| Baustein | Aussehen | Pseudocode | in Java |
| --- | --- | --- | --- |
| **Anweisung** | ein Kasten mit Text | `ergebnis = 1` | eine Anweisung |
| **Eingabe** | Kasten mit `▶` davor | `eingabe("Zahl n")` | einlesen |
| **Ausgabe** | Kasten mit `◀` davor | `ausgabe(ergebnis)` | ausgeben |
| **Sequenz** | Kästen untereinander | Zeilen untereinander | nacheinander |
| **Verzweigung** | Kasten mit Schrägen, darunter zwei Spalten | `falls …:` / `sonst:` | `if` / `else` |
| **Mehrfachverzweigung** | Kasten mit mehreren Spalten | `unterscheide …:` / `fall …:` | `switch` / `case` |
| **Zählergesteuerte Schleife** | Kasten, der oben und links um den Rumpf greift | `wiederhole für i = 1 bis n:` | `for` |
| **Kopfgesteuerte Schleife** | Kasten, der oben und links um den Rumpf greift | `wiederhole solange …:` | `while` |
| **Fußgesteuerte Schleife** | Kasten, der unten und links um den Rumpf greift | `wiederhole:` … `solange …` | `do-while` |
| **Funktion** | umschließender Kasten mit Kopfzeile | `funktion name(parameter):` | eine :t[Methode]{#methode} |

Die beiden Zweige einer Verzweigung sind mit **Wahr** und **Falsch** beschriftet. Ein leerer Zweig wird mit einem Strich oder dem Zeichen ∅ markiert – so ist klar, dass er nicht vergessen wurde.
:::

## Der Pseudocode

In StruktoLab lässt sich dasselbe Struktogramm als Bild oder als Text bearbeiten; beide Darstellungen bleiben synchron. Die Einrückung bestimmt, was in welchem Kasten liegt.

```
eingabe("Zahl n")
ergebnis = 1
wiederhole für i = 1 bis n:
    ergebnis = ergebnis * i
ausgabe(ergebnis)
```

Eine Verzweigung:

```
falls x > 0:
    ausgabe("positiv")
sonst:
    ausgabe("nicht positiv")
```

Eine fußgesteuerte Schleife – die Bedingung steht **hinter** dem Rumpf, ohne Doppelpunkt:

```
wiederhole:
    eingabe("Zahl")
solange eingabe != 0
```

Eine Mehrfachverzweigung:

```
unterscheide farbe:
    fall "rot":
        ausgabe("Stopp")
    fall "grün":
        ausgabe("Weiter")
    sonst:
        ausgabe("Unbekannt")
```

:::snippet{#merken}
Die Schlüsselwörter im Überblick:

| deutsch | englisch |
| --- | --- |
| `falls` / `sonst` | `if` / `else` |
| `wiederhole` / `solange` / `für` | `repeat` / `while` / `for` |
| `unterscheide` / `fall` | `switch` / `case` |
| `funktion` | `function` |
| `eingabe` / `ausgabe` | `input` / `output` |
| `versuche` / `fange` | `try` / `catch` |
| `Wahr` / `Falsch` | `True` / `False` |
:::

:::alert{info}
Für die Wertzuweisung schreibt StruktoLab `=`, nicht den Pfeil `←`, den manche Bücher verwenden. Aus einem fertigen Struktogramm erzeugt StruktoLab auf Knopfdruck Java, Python oder JavaScript.
:::
