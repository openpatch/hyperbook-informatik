---
title: Prompting
index: 5
permaid: ai-prompting
---

# Prompting

Ein **:t[Prompt]{#prompt}** ist die Eingabe, die du einem generativen KI-System gibst. Die Formulierung des Prompts entscheidet darüber, was das Modell erzeugt. Das nennt man **Prompt Engineering** — eine zentrale Kompetenz im Umgang mit generativer KI.

## Was ist ein Prompt?

Ein Prompt ist der Text, den du einem LLM wie ChatGPT übergibst, damit es eine Aufgabe löst. Das kann eine Frage, ein Befehl oder ein Kontext mit Anweisung sein.

:::snippet{#definition}
Ein **Prompt** ist die Eingabe an ein generatives KI-System. Das **Prompt Engineering** ist das bewusste Formulieren von Eingaben, um die Qualität der Ausgabe zu steuern. Dazu gehören: klare Anweisung, Kontext, Beispiele und Rollenzuweisung.
:::

## Gute und schlechte Prompts

| Schlecht | Besser |
| --- | --- |
| „Schreibe über Äpfel." | „Erkläre einem Siebtklässler, warum Äpfel braun werden, wenn man sie anschneidet. Verwende einfache Wörter und drei Absätze." |
| „Code" | „Schreibe eine Java-Methode `istGerade(int n)`, die true zurückgibt, wenn n gerade ist. Kommentiere die Methode." |
| „Zusammenfassung" | „Fasse den folgenden Text in drei Sätzen zusammen: [Text]" |

:::snippet{#merken}
Ein guter Prompt hat vier Eigenschaften:
1. **Klare Anweisung** — was genau soll das Modell tun?
2. **Kontext** — für wen, in welchem Stil, wie lang?
3. **Beispiele** — zeige, was du erwartest („few-shot prompting").
4. **Rollenzuweisung** — „Du bist ein Lehrer", „Du bist ein Programmierer".
:::

:::snippet{#aufgabe}
a) Formuliere drei verschiedene Prompts für ChatGPT, um eine Erklärung des Begriffs „neuronales Netz" zu bekommen. Variiere: (1) ohne Kontext, (2) mit Zielgruppe „Schüler der 10. Klasse", (3) mit Beispiel und Rollenzuweisung „Du bist ein Informatiklehrer".

b) Vergleiche die drei Ausgaben. Welcher Prompt liefert das beste Ergebnis?

c) Schreibe einen Prompt, der ChatGPT bittet, ein Java-Code-Snippet zu bewerten und zu verbessern. Was muss im Prompt stehen, damit die Bewertung hilfreich wird?
:::

::::collapsible{title="Tipp zu c)"}

Gib ChatGPT:
- Den Code, den es bewerten soll
- Die Kriterien (z.B. Lesbarkeit, Korrektheit, Stil)
- Die Anweisung, Verbesserungen vorzuschlagen, nicht den Code umzuschreiben
- Die Zielgruppe (z.B. „Informatik-Anfänger")
::::

:::protect{password="ai-5-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Drei mögliche Prompts:

1. *ohne Kontext:* „Was ist ein neuronales Netz?"
2. *mit Zielgruppe:* „Erkläre einer Schülerin der 10. Klasse, was ein neuronales Netz ist. Benutze höchstens 150 Wörter und ein Alltagsbeispiel."
3. *mit Rolle und Beispiel:* „Du bist Informatiklehrer. Erkläre den Begriff *neuronales Netz* so, wie du den Begriff *Klasse* erklären würdest: zuerst ein Satz zur Idee, dann ein konkretes Beispiel, dann die Fachdefinition. Höchstens 150 Wörter."

b) Prompt 1 liefert meist eine korrekte, aber allgemeine Antwort in unbekannter Länge und auf unklarem Niveau. Prompt 2 trifft das Niveau, weil Zielgruppe und Umfang festgelegt sind. Prompt 3 ist am zuverlässigsten, weil er zusätzlich den **Aufbau** vorgibt — das Ergebnis lässt sich damit auch mit anderen Antworten vergleichen.

Die Regel dahinter: Je mehr Entscheidungen der Prompt schon trifft, desto weniger trifft sie das Modell nach eigenem Ermessen.

c) Ein brauchbarer Prompt enthält vier Dinge:

- **den Code selbst**, vollständig und in einem Codeblock;
- **die Kriterien**, nach denen bewertet werden soll (z.B. Korrektheit, Lesbarkeit, Namensgebung, Java-Konventionen);
- **die gewünschte Form** der Antwort („nenne höchstens fünf Punkte, jeweils mit Zeilennummer und Begründung");
- **was nicht passieren soll** („schreibe den Code nicht um, sondern schlage die Änderungen vor").

Der letzte Punkt ist der wichtigste: Ohne ihn liefert das Modell meist eine fertige Neufassung, aus der man nicht mehr lernt, weil man nicht sieht, **was** warum geändert wurde.
:::

:::snippet{#brain}
Bevor du ChatGPT fragst: Überlege, was du als Ergebnis erwartest. Schreibe den Prompt so, dass ein Mensch, der die Aufgabe nicht kennt, das Gewünschte liefern könnte. Dieselbe Regel gilt für die Maschine.
:::

<!-- KLP EF/Q-Phase: formulieren Prompts für ein generatives KI-System bei
     der Entwicklung von informatischen Problemlösungen (I);
     beurteilen Möglichkeiten zur reflektierten Nutzung von generativen
     KI-Systemen (A) -->

---

## Selbsttest

::::multievent

**1. Was ist ein Prompt?**

{r1{!Die Eingabe an ein generatives KI-System.}}

{r1{Die Ausgabe des KI-Systems.}}

{r1{Ein Trainingsdatensatz.}}

{r1{Ein Bewertungskriterium.}}

{h{Der Prompt ist das, was du dem System gibst, damit es etwas erzeugt.}}

{H{Richtig! Ein Prompt ist die Eingabe, die das Modell verarbeitet.}}

**2. Welche Eigenschaften zeichnen einen guten Prompt aus?** (Mehrfachauswahl)

{c1{!Klare Anweisung}}

{c1{!Kontext (für wen, wie lang, welcher Stil)}}

{c1{!Beispiele (few-shot prompting)}}

{c1{Möglichst kurz und vage}}

{h{Je mehr Kontext das Modell hat, desto besser kann es liefern.}}

{H{Richtig! Klare Anweisung, Kontext, Beispiele und Rollenzuweisung machen einen guten Prompt aus.}}

**3. Ergänze: {t{Prompt Engineering}} ist das bewusste Formulieren von Eingaben, um die Qualität der Ausgabe zu steuern.**

{h{Das ist der Begriff für die systematische Prompt-Gestaltung.}}

{H{Richtig! Prompt Engineering ist eine zentrale Kompetenz beim Umgang mit generativer KI.}}

::::
