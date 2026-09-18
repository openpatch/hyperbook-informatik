---
name: LLM
lang: de
---

# LLM

Ein LLM (Large Language Model, großes Sprachmodell) ist ein :t[generatives]{#generative-ki} KI-System, das auf sehr großen Textmengen trainiert wurde und auf der **Transformer**-Architektur beruht.

Die Grundidee teilt es mit dem :t[Bigramm-Modell]{#bigramm}: das nächste :t[Token]{#token} nach Wahrscheinlichkeit vorhersagen. Die Unterschiede sind Kontext (Tausende Tokens statt einem), Architektur (Transformer statt Häufigkeitstabelle) und Größe (Milliarden Parameter statt Dutzenden).

Der **Attention**-Mechanismus sorgt dafür, dass das Modell lernt, welche vorherigen Tokens für die nächste Vorhersage wichtig sind.

Weil ein LLM Wahrscheinlichkeit und nicht Wahrheit abbildet, kann es :t[halluzinieren]{#halluzination}.
