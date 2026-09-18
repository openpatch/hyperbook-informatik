---
name: Bigramm
lang: de
---

# Bigramm

Ein Bigramm ist ein Paar aus zwei aufeinanderfolgenden :t[Tokens]{#token}.

Ein **Bigramm-Modell** zählt, wie oft welches Token auf welches folgt, und erzeugt daraus neuen Text: Es wählt das nächste Token zufällig nach seiner Wahrscheinlichkeit. Damit ist es ein :t[generatives]{#generative-ki} Modell.

Es sieht immer nur **ein** Token zurück. Deshalb wirken seine Texte über zwei Wörter hinweg sinnlos — genau der Punkt, an dem ein :t[LLM]{#llm} ansetzt.
