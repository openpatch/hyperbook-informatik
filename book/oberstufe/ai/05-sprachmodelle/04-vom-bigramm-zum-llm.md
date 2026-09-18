---
title: Vom Bigramm zum LLM
index: 4
permaid: ai-bigramm-llm
---

# Vom Bigramm zum LLM

Dein Bigramm-Modell funktioniert — aber der erzeugte Text ist nicht sonderlich sinnvoll. Was machen große Sprachmodelle (:t[LLMs]{#llm}) anders?

## Die Unterschiede

| | Bigramm-Modell | LLM (z.B. ChatGPT) |
| --- | --- | --- |
| **Kontext** | Nur das letzte Token | Hunderte bis Tausende Tokens |
| **Architektur** | Häufigkeitstabelle | Transformer-Netzwerk |
| **Trainingsdaten** | Ein kleiner Korpus | Milliarden Texte aus dem Internet |
| **Parameter** | Dutzende | Milliarden |
| **Ergebnis** | Zufällige Aneinanderreihung | Zusammenhängende, sinnvolle Texte |

:::snippet{#definition}
Ein **LLM** (Large Language Model) ist ein großes Sprachmodell, das auf Milliarden Texten trainiert ist und auf der **Transformer**-Architektur basiert. Der wesentliche Unterschied zum Bigramm-Modell ist der **Kontext**: ein LLM betrachtet nicht nur das letzte Token, sondern den gesamten vorherigen Text, um das nächste Token vorherzusagen.
:::

## Der Schlüssel: Attention

Die Transformer-Architektur nutzt **Attention** (Aufmerksamkeit): das Modell lernt, welche vorherigen Tokens für die Vorhersage des nächsten Tokens wichtig sind. Wenn der Satz „die Katze jagt die ..." heißt, weiß das LLM durch Attention, dass „Katze" das Subjekt ist und „die" das Objekt einleitet — das nächste Token ist wahrscheinlich „Maus".

## Skalierung

Ein Bigramm-Modell mit 10 Tokens im Vokabular hat eine 10×10-Tabelle — 100 Werte. Ein LLM mit 50.000 Tokens im Vokabular und Milliarden Parametern hat eine Vielzahl von Schichten, Gewichten und Attention-Köpfen. Die Grundidee ist dieselbe: das nächste Token vorherzusagen. Aber die Kapazität, Muster zu lernen, ist um Größenordnungen größer.

:::snippet{#merken}
Das Bigramm-Modell ist die **kürzestmögliche Implementierung** der Grundidee, auf der auch LLMs beruhen: das nächste Token nach Wahrscheinlichkeit vorhersagen. Der Unterschied ist **Kontext** (nur 1 Token vs. Tausende), **Architektur** (Tabelle vs. Transformer) und **Skalierung** (Dutzende vs. Milliarden Parameter).
:::

:::snippet{#aufgabe}
a) Vergleiche: Führe dein Bigramm-Modell aus Kapitel 5.3 mit einem ChatGPT-Prompt aus, der denselben Korpus als Kontext bekommt. Worin unterscheiden sich die Ergebnisse?

b) Warum kann ein Bigramm-Modell keine längeren Zusammenhänge erkennen? (Denke an den Satz „die Katze, die gestern im Garten war, schläft jetzt".)

c) Überlege: Was passiert, wenn ein LLM ein Token sieht, das in seinen Trainingsdaten nie vorkam? (Tipp: Tokenisierung)
:::

::::collapsible{title="Tipp zu b)"}

Schreibe den Satz auf und streiche alles bis auf die **letzten zwei** Wörter. Genau so viel sieht das Bigramm-Modell in dem Moment, in dem es das nächste Wort wählen muss. Reicht das, um zu wissen, ob es „schläft" oder „schlafen" heißen muss?
::::

::::collapsible{title="Tipp zu c)"}

Denk zurück an Lektion 5.1: Echte Tokenizer zerlegen seltene Wörter in **Teilstücke**. Was bedeutet das für ein Wort, das das Modell noch nie gesehen hat?
::::

:::protect{password="ai-5-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Das Bigramm-Modell reiht Wörter aneinander, die im Korpus schon einmal nebeneinander standen — grammatisch oft zufällig richtig, inhaltlich beliebig, und ohne jeden Bezug zur gestellten Aufgabe. ChatGPT beantwortet dagegen die Frage, hält sich an den Kontext und liefert zusammenhängende Sätze. Beide sagen das nächste Token vorher; der Unterschied liegt darin, **wie viel** sie dabei berücksichtigen.

b) Im Satz „die Katze, die gestern im Garten war, schläft jetzt" hängt „schläft" (Einzahl) von „die Katze" ab — dazwischen liegen aber sieben Wörter. Wenn das Bigramm-Modell an dieser Stelle entscheidet, sieht es ausschließlich das Wort „war". Alles davor ist für es nicht vorhanden. Es kann deshalb grundsätzlich keine Beziehung erfassen, die über einen Wortabstand von 1 hinausgeht — egal, wie viele Trainingsdaten man ihm gibt. Das ist keine Frage der Datenmenge, sondern der Architektur.

c) Genau dieses Problem löst die Tokenisierung: Weil echte LLMs Wörter in häufige **Teilstücke** zerlegen, gibt es unbekannte Tokens praktisch nicht. Ein nie gesehenes Wort wie „Quastenflosserfuttermittel" wird in bekannte Bausteine zerlegt, und das Modell kann damit weiterrechnen. Ein Bigramm-Modell auf Wortebene bricht dagegen ab (siehe Aufgabe b) in Lektion 5.3). Die Kehrseite: Dass das Modell ein Wort verarbeiten kann, heißt nicht, dass es etwas darüber weiß.
:::

<!-- KLP EF/Q-Phase: (erläutern) die Unterschiede zwischen diskriminativen
     und generativen KI-Systemen (A) -->

---

## Selbsttest

::::multievent

**1. Was ist der wichtigste Unterschied zwischen einem Bigramm-Modell und einem LLM?**

{r1{!Das LLM betrachtet den gesamten Kontext, das Bigramm-Modell nur das letzte Token.}}

{r1{Das LLM ist schneller.}}

{r1{Das Bigramm-Modell ist genauer.}}

{r1{Es gibt keinen Unterschied.}}

{h{„Bi" = zwei. Ein Bigramm sieht nur zwei Tokens. Ein LLM sieht hunderte.}}

{H{Richtig! Das LLM hat einen viel größeren Kontext — es sieht den gesamten vorherigen Text.}}

**2. Welche Architektur nutzen LLMs?**

{r2{!Transformer}}

{r2{k-NN}}

{r2{k-Means}}

{r2{Decision Tree}}

{h{Das ist die Architektur, die 2017 von Google veröffentlicht wurde.}}

{H{Richtig! LLMs basieren auf der Transformer-Architektur mit Attention-Mechanismus.}}

**3. Warum erzeugt ein LLM sinnvollere Texte als ein Bigramm-Modell?** (Mehrfachauswahl)

{c1{!Es hat einen größeren Kontext.}}

{c1{!Es hat Milliarden Parameter statt einer kleinen Tabelle.}}

{c1{!Es nutzt Attention, um wichtige Tokens zu gewichten.}}

{c1{Es trainiert mit gelabelten Bildern.}}

{h{Kontext, Parameterzahl und Attention sind die drei Schlüsselfaktoren.}}

{H{Richtig! Größerer Kontext, mehr Parameter und Attention führen zu zusammenhängenden Texten.}}

::::
