---
title: Präzision und Spezifität
index: 4
permaid: ai-praezision-spezifitaet
---

# Präzision und Spezifität

Die Trefferquote allein reicht nicht aus, um ein KI-Modell zu bewerten. Zwei weitere Kriterien sind wichtig: **:t[Präzision]{#praezision}** und **:t[Spezifität]{#spezifitaet}**.

## Die vier Möglichkeiten

Ein Klassifikator kann für jeden Testdatenpunkt zwei Entscheidungen treffen: „positiv" oder „negativ". Jede Entscheidung kann richtig oder falsch sein.

| | echt positiv | echt negativ |
| --- | --- | --- |
| **vorhersage positiv** | Richtig-Positiv (TP) | Falsch-Positiv (FP) |
| **vorhersage negativ** | Falsch-Negativ (FN) | Richtig-Negativ (TN) |

:::snippet{#definition}
**Präzision:** Von allen Punkten, die das Modell als „positiv" eingestuft hat, wie viele waren wirklich positiv?

$$\text{Präzision} = \frac{TP}{TP + FP}$$

**Spezifität:** Von allen Punkten, die wirklich negativ sind, wie viele hat das Modell korrekt als „negativ" eingestuft?

$$\text{Spezifität} = \frac{TN}{TN + FP}$$
:::

## Ein Beispiel: Spam-Filter

100 E-Mails: 20 sind Spam, 80 sind keine. Der Filter markiert 15 als Spam, davon sind 12 wirklich Spam und 3 sind keine.

| | echt Spam | echt kein Spam |
| --- | --- | --- |
| **markiert als Spam** | 12 (TP) | 3 (FP) |
| **markiert als kein Spam** | 8 (FN) | 77 (TN) |

- **Präzision** = 12 / (12 + 3) = 12 / 15 = **80 %**
- **Spezifität** = 77 / (77 + 3) = 77 / 80 = **96,25 %**

:::snippet{#merken}
- **Präzision** fragt: „Wenn der Filter Spam sagt, hat er recht?" Hohe Präzision = wenige Falsch-Positive (keine echten Mails im Spam-Ordner).
- **Spezifität** fragt: „Von den echten Nicht-Spam-Mails, wie viele erkennt der Filter korrekt?" Hohe Spezifität = wenige echte Mails werden fälschlich als Spam markiert.
:::

:::snippet{#aufgabe}
Ein medizinischer Test auf eine Krankheit hat folgende Ergebnisse:

| | echt krank | echt gesund |
| --- | --- | --- |
| **Test positiv** | 90 (TP) | 10 (FP) |
| **Test negativ** | 10 (FN) | 990 (TN) |

a) Berechne die Präzision.

b) Berechne die Spezifität.

c) Welche Bedeutung hat eine niedrige Präzision in diesem medizinischen Kontext?
:::

::::collapsible{title="Tipp 1: Welche Zahlen brauche ich?"}

Beide Formeln stehen in der Definition weiter oben. Schreibe zuerst auf, welche der vier Zahlen aus der Tabelle TP, FP, FN und TN sind — danach ist es nur noch Einsetzen.
::::

::::collapsible{title="Tipp 2: zu c)"}

Lies die Formel als Frage: „Von allen, bei denen der Test **positiv** anschlägt — wie viele sind wirklich krank?" Wer landet in der Gruppe, die den Rest ausmacht, und was passiert mit diesen Menschen als Nächstes?
::::

:::protect{password="ai-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Präzision** = 90 / (90 + 10) = **90 %**

b) **Spezifität** = 990 / (990 + 10) = **99 %**

c) Eine niedrige Präzision bedeutet, dass viele Gesunde fälschlich als krank eingestuft werden. Das führt zu unnötigen Behandlungen, Angst bei den Patienten und Kosten. In der Medizin ist eine hohe Spezifität besonders wichtig, um Gesunde nicht zu belasten.
:::

<!-- KLP Q-Phase: bewerten die Qualität eines KI-Modells auf Grundlage
     vorgegebener Kriterien (A) — Präzision, Spezifität -->

---

## Selbsttest

::::multievent

**1. Was misst die Präzision?**

{r1{!Den Anteil der richtig-positiven an allen als positiv eingestuften.}}

{r1{Den Anteil der richtig-positiven an allen tatsächlich positiven.}}

{r1{Den Anteil der richtig-negativen an allen als negativ eingestuften.}}

{r1{Die Gesamtzahl der korrekten Einstufungen.}}

{h{Präzision = TP / (TP + FP) — von den als „positiv" markierten, wie viele waren es wirklich?}}

{H{Richtig! Präzision misst: wenn das Modell „positiv" sagt, wie oft hat es recht?}}

**2. Was bedeutet eine niedrige Spezifität beim Spam-Filter?**

{r2{!Viele echte E-Mails werden fälschlich als Spam markiert.}}

{r2{Viele Spam-Mails werden nicht erkannt.}}

{r2{Der Filter ist zu langsam.}}

{r2{Der Filter markiert gar nichts als Spam.}}

{h{Spezifität = TN / (TN + FP) — wie viele der echten Nicht-Spam-Mails werden korrekt erkannt?}}

{H{Richtig! Niedrige Spezifität bedeutet: viele Falsch-Positive — echte Mails landen im Spam-Ordner.}}

**3. Ergänze: {t{Präzision}} ist der Anteil der richtig-positiven an allen als positiv eingestuften Fällen.**

{h{Das ist die Formel TP / (TP + FP).}}

{H{Richtig! Präzision misst die Zuverlässigkeit der positiven Vorhersagen.}}

::::
