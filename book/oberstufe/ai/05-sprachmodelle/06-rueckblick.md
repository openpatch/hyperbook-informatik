---
title: Rückblick
index: 6
permaid: ai-sprachmodelle-rueckblick
---

# Rückblick

Du hast ein Bigramm-Modell gebaut, verstanden, wie LLMs auf derselben Grundidee basieren, und gelernt, wie man Prompts formuliert.

## Das kann ich jetzt

- [ ] Ich kann erklären, was Tokenisierung ist. ([5.1](./01-text-als-daten-tokenisierung))
- [ ] Ich kann Bigramme und bedingte Wahrscheinlichkeiten erklären. ([5.2](./02-wahrscheinlichkeiten-fuer-woerter))
- [ ] Ich kann ein Bigramm-Modell in Java implementieren. ([5.3](./03-ein-bigramm-modell))
- [ ] Ich kann die Unterschiede zwischen Bigramm-Modell und LLM nennen. ([5.4](./04-vom-bigramm-zum-llm))
- [ ] Ich kann gute Prompts formulieren. ([5.5](./05-prompting))

## Das Wichtigste auf einen Blick

| Begriff | Bedeutung |
| --- | --- |
| **Tokenisierung** | Text in verarbeitbare Einheiten zerlegen |
| **Bigramm** | Paar aus zwei aufeinanderfolgenden Tokens |
| **Bedingte Wahrscheinlichkeit** | $P(B \mid A)$ — wie wahrscheinlich ist B nach A |
| **Bigramm-Modell** | Generatives Modell, erzeugt Text Token für Token |
| **LLM** | Large Language Model, Transformer-Architektur, großer Kontext |
| **Attention** | LLM lernt, welche Tokens wichtig sind |
| **Prompt** | Eingabe an ein generatives KI-System |
| **Prompt Engineering** | Systematische Formulierung von Eingaben |

:::snippet{#merken}
Das Bigramm-Modell und ein LLM beruhen auf derselben Grundidee: das nächste Token nach Wahrscheinlichkeit vorhersagen. Der Unterschied ist Kontext, Architektur und Skalierung. Prompting steuert die Ausgabe — und ist selbst eine Kompetenz, die man lernen kann.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Vom Text zum Modell**

Gegeben ist der Korpus:

```
ich sehe den Hund ich sehe die Katze ich höre den Hund
```

a) Zerlege ihn mit `split(" ")` in Tokens. Wie viele Tokens sind es, und wie groß ist das Vokabular?

b) Bestimme alle Bigramme, die mit „ich" beginnen, und berechne $P(\text{sehe} \mid \text{ich})$ und $P(\text{höre} \mid \text{ich})$.

c) Das Modell startet bei „ich" und soll vier Tokens erzeugen. Welche Texte sind überhaupt möglich? Welcher ist am wahrscheinlichsten?

d) Warum kann dieses Modell den Satz „ich sehe die Katze" erzeugen, obwohl er im Korpus vorkommt — aber auch „ich höre die Katze", obwohl dieser Satz **nicht** im Korpus steht?
:::

::::collapsible{title="Tipp 1: Tabelle anlegen"}

Schreibe die zwölf Tokens durchnummeriert untereinander und bilde die Paare (Token 1, Token 2), (Token 2, Token 3) und so weiter. Es gibt immer genau ein Bigramm weniger als Tokens.
::::

::::collapsible{title="Tipp 2: zu c)"}

Geh den Baum durch: Nach „ich" gibt es zwei Möglichkeiten, nach jeder von ihnen wieder. Zeichne ihn auf, statt zu raten. Die Wahrscheinlichkeit eines Pfades ist das **Produkt** der Wahrscheinlichkeiten seiner Schritte.
::::

:::protect{password="ai-5-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **12 Tokens**, das Vokabular umfasst **7** verschiedene: `ich`, `sehe`, `den`, `Hund`, `die`, `Katze`, `höre`.

b) „ich" kommt dreimal vor, danach folgt zweimal „sehe" und einmal „höre":

$$P(\text{sehe} \mid \text{ich}) = \frac{2}{3} \approx 0{,}67 \qquad P(\text{höre} \mid \text{ich}) = \frac{1}{3} \approx 0{,}33$$

c) Die übrigen Wahrscheinlichkeiten: nach „sehe" folgt einmal „den" und einmal „die" (je 1/2), nach „höre" immer „den", nach „den" immer „Hund", nach „die" immer „Katze". Damit sind vier Texte möglich:

| Text | Wahrscheinlichkeit |
| --- | --- |
| ich sehe den Hund | 2/3 · 1/2 = **1/3** |
| ich sehe die Katze | 2/3 · 1/2 = **1/3** |
| ich höre den Hund | 1/3 · 1 = **1/3** |
| ich höre die Katze | 1/3 · 0 = **0** |

Die ersten drei sind gleich wahrscheinlich; der vierte ist unmöglich.

d) Die Antwort steckt in der letzten Zeile: „ich höre die Katze" kann das Modell **nicht** erzeugen, denn nach „höre" steht im Korpus ausschließlich „den". Was es dagegen erzeugen kann, sind Kombinationen wie „ich sehe die Katze" — hier zufällig auch ein Satz aus dem Korpus.

Der entscheidende Punkt: Das Modell kennt keine Sätze, sondern nur **Paare**. Es setzt Übergänge neu zusammen und kann dabei Sätze bilden, die nie im Korpus standen — aber nur entlang von Paaren, die es gesehen hat. Deshalb wirken Bigramm-Texte lokal richtig und über mehrere Wörter hinweg sinnlos.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Einen Prompt reparieren**

Eine Schülerin möchte ihren k-NN-Klassifikator aus Kapitel 2 verbessern lassen und schreibt an ein LLM:

> mach meinen code besser

a) Nenne drei Gründe, warum dieser Prompt schlechte Ergebnisse liefern wird.

b) Schreibe den Prompt so um, dass er die vier Merkmale eines guten Prompts erfüllt.

c) Das LLM antwortet mit einer Methode `Arrays.sort(distanzen)`. Warum ist diese Antwort für unsere Online-IDE unbrauchbar, und was sagt das über die reflektierte Nutzung von LLMs?
:::

::::collapsible{title="Tipp zu c)"}

Schlag in den Notizen zur Online-IDE nach, welche Methoden die Klasse `Arrays` dort überhaupt kennt. Woher könnte das Modell seine Antwort haben?
::::

:::protect{password="ai-5-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Drei Gründe:

1. **Der Code fehlt.** Das Modell hat nichts, worauf es sich beziehen könnte, und wird sich etwas ausdenken.
2. **„besser" ist nicht definiert.** Schneller? Kürzer? Lesbarer? Robuster? Ohne Kriterium optimiert das Modell irgendetwas.
3. **Kein Kontext.** Weder Sprache noch Umgebung noch Zielgruppe sind genannt — dass es sich um die eingeschränkte Online-IDE handelt, kann das Modell nicht wissen.

b) Zum Beispiel:

> Du bist Informatiklehrer. Hier ist eine Java-Klasse, die k-nächste Nachbarn klassifiziert (Code folgt unten). Sie läuft in einer eingeschränkten Java-Umgebung **ohne** `Arrays.sort`, ohne `import` und ohne Bibliotheken — alle Hilfsmethoden müssen selbst geschrieben sein. Nenne mir höchstens fünf Verbesserungen zu Lesbarkeit und Korrektheit, jeweils mit Zeilennummer und einer Begründung in einem Satz. Schreibe den Code nicht um. Zielgruppe ist eine Schülerin der Q1.
>
> ```java
> … hier der vollständige Code …
> ```

Enthalten sind damit alle vier Merkmale: klare Anweisung, Kontext, Rollenzuweisung — und mit „höchstens fünf Punkte, mit Zeilennummer und Begründung" eine Vorgabe für die Form der Antwort.

c) `Arrays.sort` gibt es in der Online-IDE nicht; dort kennt `Arrays` nur `asList`. Der Vorschlag sieht trotzdem völlig richtig aus, denn in normalem Java **ist** er richtig — und normales Java ist das, was in den Trainingsdaten des Modells steht. Das Modell hat also nicht gelogen, sondern die häufigste Fortsetzung geliefert.

Daraus folgt die Grundregel für den Umgang mit LLMs: Ein Vorschlag ist erst dann eine Lösung, wenn man ihn **ausprobiert oder nachgeschlagen** hat. Das Modell kennt die Besonderheiten der eigenen Umgebung nicht — und es sagt einem auch nicht, dass es sie nicht kennt. Wer die Grenzen seiner Werkzeuge kennt (Kapitel 6.1), erkennt solche Antworten sofort.
:::

<!-- KLP EF/Q-Phase: (erläutern) die Unterschiede zwischen diskriminativen
     und generativen KI-Systemen (A); formulieren Prompts für ein generatives
     KI-System (I); beurteilen Möglichkeiten zur reflektierten Nutzung (A) -->

---

## Selbsttest

::::multievent

**1. Worin besteht die Grundidee, die Bigramm-Modell und LLM gemeinsam haben?**

{r1{!Das nächste Token nach Wahrscheinlichkeit vorhersagen.}}

{r1{Cluster bilden nach Distanz.}}

{r1{Gewichte durch Backpropagation anpassen.}}

{r1{Daten in Trainings- und Testdaten teilen.}}

{h{Beide Modelle sagen voraus, welches Token als Nächstes kommt.}}

{H{Richtig! Beide sagen das nächste Token vorher — das LLM nur mit viel mehr Kontext und Kapazität.}}

**2. Welche Faktoren machen ein LLM besser als ein Bigramm-Modell?** (Mehrfachauswahl)

{c1{!Größerer Kontext (Tausende statt 1 Token)}}

{c1{!Milliarden Parameter statt einer kleinen Tabelle}}

{c1{!Attention-Mechanismus}}

{c1{Längere Trainingszeit mit demselben Korpus}}

{h{Kontext, Parameter und Attention sind die Schlüsselfaktoren. Mehr Rechenzeit auf demselben kleinen Korpus bringt nichts dazu.}}

{H{Richtig! Mehr Kontext, mehr Parameter und Attention führen zu zusammenhängenden Texten. Längeres Training auf demselben Korpus fügt dem Modell dagegen keine neue Information hinzu.}}

**3. Was ist ein Prompt?**

{r2{!Die Eingabe an ein generatives KI-System.}}

{r2{Die Ausgabe des Systems.}}

{r2{Ein Trainingsdatensatz.}}

{r2{Ein Bewertungskriterium.}}

{h{Du schreibst einen Prompt, damit das Modell eine Aufgabe löst.}}

{H{Richtig! Der Prompt ist die Eingabe, die das Modell verarbeitet und beantwortet.}}

**4. Ergänze: {t{Tokenisierung}} ist das Zerlegen von Text in verarbeitbare Einheiten.**

{h{Das ist der erste Schritt jedes Sprachmodells.}}

{H{Richtig! Ohne Tokenisierung kann das Modell Text nicht verarbeiten.}}

::::
