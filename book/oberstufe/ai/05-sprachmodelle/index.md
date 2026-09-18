---
name: Sprachmodelle
index: 5
lang: de
permaid: ai-sprachmodelle
---

# Sprachmodelle

Große Sprachmodelle (LLMs) wie ChatGPT sind die bekanntesten generativen KI-Systeme. Du baust ein einfaches Bigramm-Modell, das Texte Token für Token erzeugt, und verstehst so, wie ein LLM grundsätzlich funktioniert. Außerdem lernst du, was **Prompting** bedeutet.

:::snippet{#merken}
**Voraussetzungen aus dem OOP-Lernpfad:**
- [Klassen und Objekte](/oberstufe/oop/01-grundlagen/06-objektorientierung) — Tokenizer und BigrammModell sind eigene Klassen
- [String-Methoden](/oberstufe/oop/01-grundlagen/02-variablen-und-datentypen/04-zeichenketten) — `charAt`, `substring`, `split`, `equals`
- [Felder](/oberstufe/oop/01-grundlagen/05-felder) — Tokenlisten sind Felder
- [Methoden](/oberstufe/oop/01-grundlagen/04-methoden-und-modularisierung) — Training und Erzeugung sind separate Methoden
:::

## Die Lektionen

1. **Text als Daten: Tokenisierung** – wie Text in verarbeitbare Einheiten zerlegt wird
2. **Wahrscheinlichkeiten für Wörter** – wie das Modell lernt, welches Wort wahrscheinlich folgt
3. **Ein Bigramm-Modell** – ein einfaches Sprachmodell, das Texte erzeugt
4. **Vom Bigramm zum LLM** – was ein LLM anders macht
5. **Prompting** – wie man Eingaben formuliert, um gute Ergebnisse zu bekommen
6. **Rückblick** – das Wichtigste auf einen Blick

<!-- KLP EF/Q-Phase: (erläutern) die Unterschiede zwischen diskriminativen
     und generativen KI-Systemen (A); formulieren Prompts für ein generatives
     KI-System bei der Entwicklung von informatischen Problemlösungen (I);
     beurteilen Möglichkeiten zur reflektierten Nutzung von generativen
     KI-Systemen (A) -->
