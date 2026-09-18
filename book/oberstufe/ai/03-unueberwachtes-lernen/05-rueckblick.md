---
title: Rückblick
index: 5
permaid: ai-unueberwacht-rueckblick
---

# Rückblick

Du hast ein konkretes Verfahren des unüberwachten Lernens (k-Means) implementiert und alle fünf Bewertungskriterien des KLP kennengelernt: Bias, Überanpassung, Unteranpassung, Präzision und Spezifität.

## Das kann ich jetzt

- [ ] Ich kann die Funktionsweise von k-Means beschreiben. ([3.1](./01-clusterbildung-mit-k-means))
- [ ] Ich kann k-Means in Java implementieren. ([3.1](./01-clusterbildung-mit-k-means))
- [ ] Ich kann erklären, was Bias ist und wie er entsteht. ([3.2](./02-bias-und-datenqualitaet))
- [ ] Ich kann Überanpassung und Unteranpassung unterscheiden. ([3.3](./03-ueberanpassung-unteranpassung))
- [ ] Ich kann Präzision und Spezifität berechnen. ([3.4](./04-praezision-und-spezifitaet))

## Das Wichtigste auf einen Blick

| Begriff | Bedeutung |
| --- | --- |
| **k-Means** | Iteratives Verfahren, teilt Daten in k Cluster ohne Labels |
| **Bias** | Systematische Verzerrung durch unrepräsentative Daten |
| **Überanpassung** | Modell zu komplex; perfekt auf Trainingsdaten, schlecht auf Testdaten |
| **Unteranpassung** | Modell zu einfach; schlecht auf Trainings- und Testdaten |
| **Präzision** | TP / (TP + FP) — Zuverlässigkeit der positiven Vorhersagen |
| **Spezifität** | TN / (TN + FP) — korrekte Erkennung der negativen Fälle |

:::snippet{#merken}
k-Means ist ein **konkretes Verfahren zur Clusterbildung** beim unüberwachten Lernen. Die fünf Bewertungskriterien — Bias, Überanpassung, Unteranpassung, Präzision, Spezifität — erlauben es, die Qualität eines KI-Modells systematisch zu beurteilen.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: k-Means auf dem Papier**

Gegeben sind sechs Punkte: (1, 1), (2, 1), (1, 2), (8, 8), (9, 8), (8, 9). Gesucht sind **zwei** Cluster. Als Startschwerpunkte werden — wie in unserer Implementierung — die **ersten beiden Punkte** genommen, also (1, 1) und (2, 1).

a) Führe die erste Iteration durch: Ordne jeden Punkt dem näheren Schwerpunkt zu und berechne beide Schwerpunkte neu.

b) Führe die zweite Iteration durch. Was ändert sich?

c) Nach welcher Iteration meldet das Programm „stabil"? Begründe.

d) Der Schwerpunkt von Cluster 1 liegt nach der ersten Iteration bei (6,75 / 6,5) — dort liegt gar kein Datenpunkt. Ist das ein Fehler?
:::

::::collapsible{title="Tipp 1: Vorgehen"}

Lege eine Tabelle mit sechs Zeilen an und trage für jeden Punkt die Distanz zu beiden Schwerpunkten ein. Der Schwerpunkt eines Clusters ist der **Mittelwert** seiner Punkte, getrennt für x und y.
::::

::::collapsible{title="Tipp 2: zu a)"}

Achte auf den Punkt (2, 1): Er ist der zweite Startschwerpunkt, hat also zu sich selbst die Distanz 0 und landet damit zwangsläufig in Cluster 1 — zusammen mit den drei weit entfernten Punkten.
::::

:::protect{password="ai-3-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Iteration 1**, Schwerpunkte $Z_0 = (1, 1)$ und $Z_1 = (2, 1)$:

| Punkt | Distanz zu $Z_0$ | Distanz zu $Z_1$ | Cluster |
| --- | --- | --- | --- |
| (1, 1) | 0 | 1,00 | 0 |
| (2, 1) | 1,00 | 0 | 1 |
| (1, 2) | 1,00 | 1,41 | 0 |
| (8, 8) | 9,90 | 9,22 | 1 |
| (9, 8) | 10,63 | 9,90 | 1 |
| (8, 9) | 10,63 | 10,00 | 1 |

Neue Schwerpunkte: $Z_0 = (1{,}0 \mid 1{,}5)$ aus zwei Punkten, $Z_1 = (6{,}75 \mid 6{,}5)$ aus vier Punkten.

b) **Iteration 2:** Jetzt wechselt (2, 1) zu Cluster 0 — zum neuen $Z_0$ sind es nur noch 1,12, zum weit weggewanderten $Z_1$ dagegen 7,27. Die Aufteilung ist damit 3 zu 3, wie man es von Anfang an erwartet hätte. Neue Schwerpunkte: $Z_0 = (1{,}33 \mid 1{,}33)$ und $Z_1 = (8{,}33 \mid 8{,}33)$.

c) Nach der **dritten** Iteration. In Iteration 3 wechselt kein Punkt mehr den Cluster, also bleibt `veraendert` auf `false` und das Programm bricht ab. Wichtig: Der Algorithmus braucht immer **einen Durchlauf mehr**, als Änderungen stattfinden — er merkt erst daran, dass nichts passiert ist, dass er fertig ist.

d) Nein, das ist kein Fehler, sondern die Definition: Ein Schwerpunkt ist der **Mittelwert** seiner Punkte und muss selbst kein Datenpunkt sein. Aussagekräftig ist er in diesem Zwischenschritt allerdings nicht — er liegt im leeren Raum zwischen zwei Gruppen, weil die Zuordnung noch falsch ist. Genau deshalb iteriert das Verfahren weiter.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Ein Modell beurteilen**

Eine Fabrik prüft Bauteile automatisch auf Risse. Von 1000 geprüften Teilen sind 50 tatsächlich defekt. Das Modell meldet 60 Teile als defekt; 40 davon sind es wirklich.

a) Stelle die Vierfeldertafel auf (TP, FP, FN, TN).

b) Berechne Trefferquote, Präzision und Spezifität.

c) Die Firma wirbt mit „97 % Genauigkeit". Warum ist diese Zahl irreführend?

d) Zehn defekte Teile gehen durch die Prüfung. Welche Kennzahl macht das sichtbar — und welche nicht?
:::

::::collapsible{title="Tipp 1: Die Tafel füllen"}

Du kennst drei Zahlen: 1000 insgesamt, 50 wirklich defekt, 60 gemeldet, davon 40 richtig. Fülle zuerst TP und FP, dann ergeben sich FN und TN durch Subtraktion.
::::

::::collapsible{title="Tipp 2: zu c)"}

Rechne aus, welche Trefferquote ein Modell hätte, das einfach **jedes** Teil für in Ordnung erklärt und gar nicht rechnet.
::::

:::protect{password="ai-3-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Vierfeldertafel:

| | echt defekt | echt in Ordnung |
| --- | --- | --- |
| **als defekt gemeldet** | 40 (TP) | 20 (FP) |
| **als in Ordnung gemeldet** | 10 (FN) | 930 (TN) |

b)

- Trefferquote = (40 + 930) / 1000 = **97,0 %**
- Präzision = 40 / (40 + 20) = 40/60 = **66,7 %**
- Spezifität = 930 / (930 + 20) = 930/950 = **97,9 %**

c) Weil nur 5 % der Teile überhaupt defekt sind. Ein Modell, das **ohne jede Rechnung** immer „in Ordnung" sagt, käme schon auf 950/1000 = 95 % Trefferquote. Die 97 % liegen also nur zwei Prozentpunkte über dem Nichtstun. Bei stark ungleich verteilten Klassen sagt die Trefferquote fast nichts aus — die Präzision von 66,7 % zeigt dagegen deutlich, dass jede dritte Aussortierung ein Fehlalarm ist.

d) Sichtbar macht es keine der drei berechneten Kennzahlen: Die 10 falsch-negativen Teile gehen in der Trefferquote unter, und in Präzision wie Spezifität kommt FN gar nicht vor. Man braucht dafür die **Sensitivität** (auch Recall) = TP / (TP + FN) = 40/50 = **80 %** — jedes fünfte defekte Teil wird übersehen. Welche Kennzahl wichtig ist, hängt davon ab, welcher Fehler mehr kostet: ein unnötig aussortiertes Teil (FP) oder ein defektes Teil beim Kunden (FN).
:::

<!-- KLP Q-Phase: erläutern die Funktionsweise eines konkreten Verfahrens zur
     Clusterbildung beim unüberwachten Lernen (A); bewerten die Qualität
     eines KI-Modells auf Grundlage vorgegebener Kriterien (A) -->

---

## Selbsttest

::::multievent

**1. Was ist der Hauptunterschied zwischen überwachtem und unüberwachtem Lernen?**

{r1{!Überwachtes Lernen nutzt Labels, unüberwachtes nicht.}}

{r1{Überwachtes Lernen ist langsamer.}}

{r1{Unüberwachtes Lernen braucht mehr Daten.}}

{r1{Es gibt keinen Unterschied.}}

{h{Das Wort „überwacht" bezieht sich auf die Labels, die wie ein Lehrer wirken.}}

{H{Richtig! Überwachtes Lernen hat gelabelte Daten, unüberwachtes hat nur rohe Daten.}}

**2. Welche Bewertungskriterien hast du in diesem Kapitel gelernt?** (Mehrfachauswahl)

{c1{!Bias}}

{c1{!Überanpassung}}

{c1{!Unteranpassung}}

{c1{!Präzision}}

{c1{!Spezifität}}

{c1{Lernrate}}

{h{Es waren fünf Kriterien — keine Lernrate.}}

{H{Richtig! Die fünf Kriterien sind Bias, Überanpassung, Unteranpassung, Präzision und Spezifität.}}

**3. Ergänze: {t{k-Means}} ist ein iteratives Verfahren, das Daten ohne Labels in k Cluster einteilt.**

{h{Welches Verfahren aus diesem Kapitel findet Cluster ohne Labels?}}

{H{Richtig! k-Means ist das konkrete Verfahren zur Clusterbildung beim unüberwachten Lernen.}}

**4. Welche Formel gibt die Präzision an?**

{r2{!TP / (TP + FP)}}

{r2{TN / (TN + FP)}}

{r2{TP / (TP + FN)}}

{r2{(TP + TN) / alle}}

{h{Präzision fragt: von den als positiv Markierten, wie viele waren es wirklich?}}

{H{Richtig! Präzision = TP / (TP + FP).}}

::::
