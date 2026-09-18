---
title: Wahrscheinlichkeiten für Wörter
index: 2
permaid: ai-wahrscheinlichkeiten
scripts:
  - /wc/ki-bigramm.js
---

# Wahrscheinlichkeiten für Wörter

Ein Sprachmodell lernt: Welches Wort folgt wahrscheinlich auf ein gegebenes Wort? Die einfachste Version zählt, welche Wörter in den Trainingsdaten aufeinander gefolgt sind.

## Bigramme

Ein **:t[Bigramm]{#bigramm}** ist ein Paar aus zwei aufeinanderfolgenden Tokens. Der Satz „Der Apfel ist süß" hat die Bigramme:

| Bigramm | |
| --- | --- |
| Der → Apfel | |
| Apfel → ist | |
| ist → süß | |

:::snippet{#definition}
Ein **Bigramm** ist ein Paar aus zwei aufeinanderfolgenden Tokens. Ein **Bigramm-Modell** lernt die Wahrscheinlichkeit, dass Token B auf Token A folgt, indem es die Häufigkeit der Bigramme in den Trainingsdaten zählt.
:::

## Wahrscheinlichkeit berechnen

Wenn im Trainingskorpus „Apfel" 10-mal vorkommt und danach 7-mal „ist", 2-mal „rot" und 1-mal „schmeckt", dann ist:

$$P(\text{ist} \mid \text{Apfel}) = \frac{7}{10} = 0{,}7$$

$$P(\text{rot} \mid \text{Apfel}) = \frac{2}{10} = 0{,}2$$

$$P(\text{schmeckt} \mid \text{Apfel}) = \frac{1}{10} = 0{,}1$$

:::snippet{#merken}
Die **bedingte Wahrscheinlichkeit** $P(B \mid A)$ gibt an, wie wahrscheinlich Token B ist, wenn Token A gerade vorausging. Sie wird berechnet als: Häufigkeit von (A → B) geteilt durch Häufigkeit von A.
:::

:::snippet{#brain}
In einem Korpus kommt „der" 20-mal vor, danach 12-mal „Apfel" und 8-mal „Birne". Wie groß ist $P(\text{Apfel} \mid \text{der})$?
:::

::::collapsible{title="Tipp"}

$P(\text{Apfel} \mid \text{der}) = \frac{12}{20} = 0{,}6$

::::

:::snippet{#aufgabe}
Ein Korpus enthält folgende Sätze:

- „die Katze schläft"
- „die Katze jagt"
- „die Maus schläft"
- „die Maus jagt die Katze"

a) Zähle alle Bigramme, die mit „die" beginnen.

b) Berechne $P(\text{Katze} \mid \text{die})$ und $P(\text{Maus} \mid \text{die})$.

c) Was ist das wahrscheinlichste Wort nach „die"?
:::

:::protect{password="ai-5-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) „die" kommt insgesamt **5-mal** vor. Geht man die vier Sätze der Reihe nach durch:

| Satz | Bigramme mit „die" |
| --- | --- |
| die Katze schläft | die → Katze |
| die Katze jagt | die → Katze |
| die Maus schläft | die → Maus |
| die Maus jagt die Katze | die → Maus **und** die → Katze |

Der letzte Satz liefert zwei Bigramme, weil „die" darin zweimal vorkommt. Gezählt ergibt das:

- die → Katze: **3-mal**
- die → Maus: **2-mal**
- Summe: 5

b) $P(\text{Katze} \mid \text{die}) = \frac{3}{5} = 0{,}6$. $P(\text{Maus} \mid \text{die}) = \frac{2}{5} = 0{,}4$.

c) „Katze" ist am wahrscheinlichsten (60 %).
:::

## Die Bigramme nachzählen lassen

Im Textfeld stehen die vier Sätze aus der Aufgabe hintereinander. Die Tabelle zählt jedes Bigramm: In der Zeile steht das erste Token, in der Spalte das zweite, in der Zelle die Häufigkeit. Ganz rechts steht, wie oft das Zeilen-Token überhaupt einen Nachfolger hat.

<ki-bigramm id="ai-bigramm-tabelle" ansicht="tabelle"
  korpus="die Katze schläft die Katze jagt die Maus schläft die Maus jagt die Katze"></ki-bigramm>

:::snippet{#aufgabe}
a) Klicke links in der Tabelle auf **die**. Darunter erscheinen die bedingten Wahrscheinlichkeiten. Stimmen sie mit deiner Rechnung aus b) überein?

b) Welche Zeile der Tabelle ist leer? Was bedeutet das für dieses Token?

c) Hänge den Satz „die Maus frisst" an den Korpus an. Wie verändert sich $P(\text{Maus} \mid \text{die})$? Rechne den neuen Wert erst auf Papier aus.
:::

:::snippet{#brain}
Die Komponente hängt die vier Sätze zu **einem** Text zusammen. Dadurch entstehen Bigramme über die Satzgrenze hinweg, zum Beispiel „schläft → die". Warum stören sie die Aufgabe nicht — und wann würden sie stören?
:::

::::collapsible{title="Tipp"}

Gefragt ist nur nach Bigrammen, die **mit „die" beginnen**. Ein Bigramm über die Satzgrenze endet auf „die", beginnt aber mit einem anderen Token.
::::

<!-- KLP Q-Phase: erläutern die Grundlagen generativer KI-Systeme (A) -->

---

## Selbsttest

::::multievent

**1. Was ist ein Bigramm?**

{r1{!Ein Paar aus zwei aufeinanderfolgenden Tokens.}}

{r1{Ein einzelnes Token.}}

{r1{Ein Paar aus drei Tokens.}}

{r1{Eine Datei mit Trainingsdaten.}}

{h{„Bi" = zwei, „Gramm" = Einheit.}}

{H{Richtig! Ein Bigramm besteht aus zwei aufeinanderfolgenden Tokens.}}

**2. Wie wird die bedingte Wahrscheinlichkeit P(B | A) berechnet?**

{r2{!Häufigkeit von (A → B) geteilt durch Häufigkeit von A.}}

{r2{Häufigkeit von A geteilt durch Häufigkeit von B.}}

{r2{Häufigkeit von (A → B) geteilt durch Gesamtzahl aller Tokens.}}

{r2{Häufigkeit von B geteilt durch Häufigkeit von A.}}

{h{P(B | A) fragt: wenn A da war, wie wahrscheinlich ist B als Nächstes?}}

{H{Richtig! Man zählt, wie oft B nach A kommt, und teilt durch die Häufigkeit von A.}}

**3. Ergänze: Die {t{bedingte Wahrscheinlichkeit}} gibt an, wie wahrscheinlich ein Token ist, wenn ein bestimmtes Token vorausging.**

{h{Das ist die Formel P(B | A).}}

{H{Richtig! Die bedingte Wahrscheinlichkeit ist die Grundlage eines Bigramm-Modells.}}

::::
