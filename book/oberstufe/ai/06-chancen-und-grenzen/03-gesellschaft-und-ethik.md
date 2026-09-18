---
title: Gesellschaft und Ethik
index: 3
permaid: ai-gesellschaft-ethik
---

# Gesellschaft und Ethik

Der Einsatz von KI hat Auswirkungen auf die Gesellschaft, die über die technische Qualität hinausgehen. Hier lernst du, diese Auswirkungen zu bewerten.

## Auswirkungen des KI-Einsatzes

| Bereich | Positive Auswirkung | Risiko |
| --- | --- | --- |
| **Arbeitswelt** | Automatisierung von Routineaufgaben | Arbeitsplatzverlust, Umschulung nötig |
| **Medizin** | Schnellere Diagnose | Fehldiagnose durch Bias, Abhängigkeit von Daten |
| **Bildung** | Personalisierte Lernangebote | Überwachung, Datenmissbrauch |
| **Justiz** | Effizientere Fallanalyse | Voreingenommenheit durch historische Daten |
| **Information** | Schneller Zugang zu Wissen | Desinformation, Deepfakes (gefälschte Bilder, Stimmen und Videos), Halluzinationen |

## Ethische Fragen

:::snippet{#definition}
**Ethische Fragen beim KI-Einsatz:**
- **Verantwortung:** Wer ist verantwortlich, wenn ein KI-System einen Fehler macht?
- **Fairness:** Behandelt das System alle Gruppen gleich?
- **Transparenz:** Kann man nachvollziehen, wie das Modell entschieden hat?
- **Autonomie:** Nimmt das System Menschen die Entscheidungsfreiheit?
- **Nachvollziehbarkeit:** Kann man erklären, warum das Modell zu einem Ergebnis kam?
:::

:::snippet{#merken}
Die Bewertung eines KI-Systems umfasst nicht nur Trefferquote und Präzision, sondern auch seine **gesellschaftlichen Auswirkungen**. Ein System, das technisch gut funktioniert, aber unfair oder intransparent ist, ist kein gutes System.
:::

:::snippet{#aufgabe}
a) Ein autonomes Auto verursacht einen Unfall. Wer ist verantwortlich — der Hersteller, der Fahrer, das KI-System? Diskutiert in der Gruppe.

b) Ein Bewerbungs-KI sortiert Lebensläufe vor. Frauen werden seltener eingeladen, weil die Trainingsdaten aus einer Zeit stammen, in der fast nur Männer eingestellt wurden. Welches ethische Problem liegt vor? Welches Bewertungskriterium aus Kapitel 3?

c) Ein LLM erzeugt einen Text, der wie eine seriöse Nachrichtenmeldung klingt, aber komplett erfunden ist. Welche gesellschaftlichen Folgen hat das? Welche Gegenmaßnahmen gibt es?
:::

::::collapsible{title="Tipp zu b)"}

Die Trainingsdaten sind nicht falsch gemessen — sie bilden die Vergangenheit korrekt ab. Genau das ist das Problem. Schau in die Tabelle der Bias-Arten aus Lektion 3.2.
::::

:::protect{password="ai-6-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es gibt keine einfache Antwort — das ist der Punkt der Aufgabe. Vertretbare Positionen:

- **Der Hersteller** hat das System entwickelt, getestet und in Verkehr gebracht; nur er kennt seine Grenzen. Dafür spricht auch, dass nur er sie beheben kann.
- **Der Halter oder Fahrer** hat entschieden, das System in einer bestimmten Situation zu benutzen, und bleibt bei niedrigeren Automatisierungsstufen übernahmebereit.
- **Das KI-System selbst** kann nicht verantwortlich sein: Verantwortung setzt voraus, dass man anders hätte handeln können und für sein Handeln einstehen kann. Beides trifft auf ein Modell nicht zu.

Die eigentliche Gefahr ist die **Verantwortungslücke**: Wenn sich alle Beteiligten auf das System berufen, trägt am Ende niemand die Verantwortung. Deshalb verlangt die Regulierung, dass bei jedem automatisierten System eine benennbare natürliche oder juristische Person verantwortlich bleibt.

b) Es liegt **historischer Bias** vor (Lektion 3.2): Die Trainingsdaten sind nicht fehlerhaft erhoben, sie bilden eine vergangene Einstellungspraxis korrekt ab. Das Modell lernt daraus die Regel „erfolgreiche Bewerbung sieht aus wie die Bewerbungen der bisher Eingestellten" — und schreibt damit eine Ungerechtigkeit fort, statt sie zu korrigieren. Ethisch betroffen ist die **Fairness**, praktisch handelt es sich um eine mittelbare Diskriminierung, die auch dann vorliegt, wenn das Geschlecht gar nicht als Merkmal verwendet wird: Ersatzmerkmale wie Lücken im Lebenslauf oder der Name einer Schule genügen.

c) Folgen: Falschmeldungen lassen sich in beliebiger Menge und in vielen Varianten erzeugen, sodass Prüfen teurer wird als Verbreiten. Darüber hinaus leidet das Vertrauen in **echte** Meldungen — wenn alles gefälscht sein könnte, lässt sich auch Wahres bequem als Fälschung abtun.

Gegenmaßnahmen auf mehreren Ebenen: technisch Wasserzeichen und Herkunftsnachweise für Inhalte; bei den Plattformen Kennzeichnungspflichten und schnelle Korrekturwege; journalistisch belastbare Faktenprüfung; und bei den Leserinnen und Lesern die Gewohnheit, die **Quelle** zu prüfen statt der Plausibilität des Textes zu vertrauen. Keine dieser Maßnahmen genügt allein.
:::

<!-- KLP Q-Phase: bewerten Auswirkungen des Einsatzes von Informatiksystemen
     auch unter Berücksichtigung von künstlicher Intelligenz (A) -->

---

## Selbsttest

::::multievent

**1. Welche ethischen Fragen stellen sich beim KI-Einsatz?** (Mehrfachauswahl)

{c1{!Verantwortung bei Fehlern}}

{c1{!Fairness gegenüber allen Gruppen}}

{c1{!Transparenz der Entscheidungen}}

{c1{Geschwindigkeit des Systems}}

{h{Ethische Fragen betreffen Verantwortung, Fairness, Transparenz und Autonomie.}}

{H{Richtig! Verantwortung, Fairness und Transparenz sind zentrale ethische Fragen beim KI-Einsatz.}}

**2. Ein Bewerbungs-KI benachteiligt Frauen, weil die Trainingsdaten historisch voreingenommen sind. Welches Problem liegt vor?**

{r2{!Bias (Verzerrung durch unrepräsentative Daten)}}

{r2{Überanpassung}}

{r2{Unteranpassung}}

{r2{Halluzination}}

{h{Die Trainingsdaten spiegeln vergangene Ungerechtigkeiten wider.}}

{H{Richtig! Das ist ein historischer Bias — die Daten sind nicht repräsentativ.}}

**3. Warum ist ein KI-System, das technisch gut funktioniert, trotzdem problematisch?**

{r3{!Es kann unfair, intransparent oder gesellschaftlich schädlich sein.}}

{r3{Es ist immer problematisch, egal wie gut es funktioniert.}}

{r3{Es ist nie problematisch, wenn die Trefferquote hoch ist.}}

{r3{Technische Qualität reicht immer aus.}}

{h{Technische Qualität ist nur eine Dimension. Ethik und Gesellschaft sind die anderen.}}

{H{Richtig! Ein System kann technisch gut sein und trotzdem unfair oder intransparent.}}

::::
