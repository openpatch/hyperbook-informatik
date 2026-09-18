---
title: "Text als Daten: Tokenisierung"
index: 1
permaid: ai-tokenisierung
---

# Text als Daten: Tokenisierung

Bevor ein Sprachmodell Text verarbeiten kann, muss der Text in kleine Einheiten zerlegt werden — die **:t[Tokens]{#token}**. Dieser Schritt heißt **Tokenisierung**.

## Was ist ein Token?

Ein Token kann ein Wort, ein Zeichen oder ein Wortteil sein. Die einfachste Form der Tokenisierung zerlegt einen Text in Wörter anhand von Leerzeichen.

:::snippet{#definition}
**Tokenisierung** ist der Prozess, Text in einzelne verarbeitbare Einheiten (Tokens) zu zerlegen. Ein Token kann ein Wort, ein Zeichen oder ein Teilwort sein. Die Wahl der Tokenisierung bestimmt, was das Modell als „Einheit" sieht.
:::

## Ein einfacher Tokenizer

:::onlineide{height="500px" speed="1000000"}

```java Main.java
void main() {
    String text = "Der Apfel ist süß und rot";

    Tokenizer tokenizer = new Tokenizer();
    String[] tokens = tokenizer.zerlege(text);

    IO.println("Anzahl Tokens: " + tokens.length);
    for (int i = 0; i < tokens.length; i++) {
        IO.println("  Token " + i + ": " + tokens[i]);
    }
}
```

```java Tokenizer.java
public class Tokenizer {
    public String[] zerlege(String pText) {
        // Zerlege an Leerzeichen
        return pText.split(" ");
    }
}
```

:::

:::snippet{#brain}
Bevor du das Programm ausführst: Wie viele Tokens hat der Text „Der Apfel ist süß und rot"? Zähle die Wörter.
:::

:::snippet{#aufgabe}
a) Führe das Programm aus und vergleiche mit deiner Zählung.

b) Was passiert bei einem Text mit doppelten Leerzeichen, z.B. „Der  Apfel  ist  süß"?

c) Ändere den Text so, dass ein Satzzeichen am Ende steht: „Der Apfel ist süß." Was passiert mit dem Punkt?
:::

::::collapsible{title="Tipp zu b)"}

Zwischen zwei Leerzeichen steht eine Zeichenkette — nämlich die **leere**. Zähle in der Ausgabe nach, wie viele Tokens herauskommen, und schau dir an, wie die zusätzlichen aussehen.
::::

::::collapsible{title="Tipp zu c)"}

`split(" ")` zerlegt nur an Leerzeichen. Der Punkt bleibt am letzten Token hängen: „süß." statt „süß" und „.". Das ist ein Problem, das echte Tokenizer lösen müssen.
::::

:::protect{password="ai-5-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Der Text „Der Apfel ist süß und rot" ergibt **6 Tokens**: `Der`, `Apfel`, `ist`, `süß`, `und`, `rot`.

b) Bei „Der  Apfel  ist  süß" mit doppelten Leerzeichen kommen **7 Tokens** heraus statt 4: zwischen den Wörtern steht jeweils zusätzlich ein **leeres** Token. `split(" ")` trennt bei jedem einzelnen Leerzeichen, und zwischen zwei aufeinanderfolgenden Leerzeichen liegt eben nichts. Ein Sprachmodell würde diese leeren Tokens mitlernen und Wahrscheinlichkeiten für sie berechnen — ein reiner Formatierungszufall im Text würde so Teil des Modells.

c) Aus „Der Apfel ist süß." werden 4 Tokens, das letzte heißt `süß.` — mit Punkt. Für das Modell sind `süß` und `süß.` damit **zwei völlig verschiedene Wörter**, die nichts miteinander zu tun haben. Dasselbe gilt für `süß,` und `Süß`. Das Vokabular bläht sich auf, und jede Variante muss einzeln gelernt werden.

Deshalb trennen echte Tokenizer Satzzeichen ab, vereinheitlichen Groß- und Kleinschreibung und zerlegen seltene Wörter in häufige Teilstücke.
:::

:::snippet{#merken}
Tokenisierung ist der erste Schritt jedes Sprachmodells. Die einfache Wort-Tokenisierung an Leerzeichen ist ein Anfang, aber sie hat Grenzen: Satzzeichen bleiben hängen, und zusammengesetzte Wörter werden nicht getrennt. Echte LLMs nutzen komplexere Tokenisierer, die Wörter weiter in Silben oder Zeichen zerlegen.
:::

<!-- KLP Q-Phase: erläutern die Grundlagen generativer KI-Systeme (A) -->

---

## Selbsttest

::::multievent

**1. Was ist Tokenisierung?**

{r1{!Das Zerlegen von Text in verarbeitbare Einheiten (Tokens).}}

{r1{Das Übersetzen von Text in eine andere Sprache.}}

{r1{Das Komprimieren von Text.}}

{r1{Das Verschlüsseln von Text.}}

{h{Ein Token ist die kleinste Einheit, die das Modell verarbeitet.}}

{H{Richtig! Tokenisierung zerlegt Text in Tokens — meist Wörter oder Wortteile.}}

**2. Welches Problem hat die einfache Wort-Tokenisierung mit split(" ")?**

{r2{!Satzzeichen bleiben am letzten Wort hängen.}}

{r2{Sie ist zu langsam.}}

{r2{Sie kann nicht mit Großbuchstaben umgehen.}}

{r2{Sie löscht alle Wörter.}}

{h{Denk an den Punkt am Ende des Satzes aus der Aufgabe.}}

{H{Richtig! split(" ") zerlegt nur an Leerzeichen — Satzzeichen wie Punkt oder Komma bleiben am vorherigen Token kleben.}}

**3. Ergänze: Ein {t{Token}} ist die kleinste Einheit, die ein Sprachmodell verarbeitet.**

{h{Das ist der Grundbegriff der Tokenisierung.}}

{H{Richtig! Ein Token kann ein Wort, ein Zeichen oder ein Wortteil sein.}}

::::
