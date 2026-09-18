---
title: Rückblick
index: 4
permaid: ai-begriffe-rueckblick
---

# Rückblick

Vier Lektionen — und damit hast du das begriffliche Fundament für alles, was im Lernpfad noch kommt. In den Kapiteln 2 bis 5 baust du Systeme selbst nach. Hier hast du gelernt, wie man sie einordnet.

## Das kann ich jetzt

- [ ] Ich kann den Unterschied zwischen **diskriminativer** und **generativer** KI erklären. ([1.1](./01-diskriminativ-oder-generativ))
- [ ] Ich kann Beispielen ansehen, ob sie diskriminativ oder generativ sind. ([1.1](./01-diskriminativ-oder-generativ))
- [ ] Ich kann die drei **Arten des maschinellen Lernens** nennen und unterscheiden. ([1.2](./02-arten-des-maschinellen-lernens))
- [ ] Ich kann für ein Beispiel sagen, welche Art des ML es nutzt. ([1.2](./02-arten-des-maschinellen-lernens))
- [ ] Ich kann **Anwendungsbeispiele** einordnen und Mischformen erkennen. ([1.3](./03-anwendungsbeispiele))

## Das Wichtigste auf einen Blick

| Begriff | Bedeutung | Beispiel |
| --- | --- | --- |
| **Diskriminative KI** | Ordnet Daten einer Kategorie zu | Spam-Filter |
| **Generative KI** | Erzeugt neue Daten | Textgenerator |
| **Überwachtes Lernen** | Lernt mit gelabelten Daten | Obst-Klassifikation |
| **Unüberwachtes Lernen** | Sucht Muster ohne Labels | Kundensegmentierung |
| **Bestärkendes Lernen** | Lernt durch Belohnung und Bestrafung | Spiel-KI |
| **Mischform** | Kombiniert mehrere Ansätze | Autonomes Fahren |

:::snippet{#merken}
Die **erste Frage** bei jedem KI-System lautet: Was tut es — ordnet es ein oder erzeugt es etwas Neues? Die **zweite Frage** lautet: Wie lernt es — mit Labels, ohne Labels oder durch Belohnung? Diese beiden Fragen reichen aus, um jedes System im Lernpfad einzuordnen.
:::

## Gemischte Aufgaben

Diese Aufgaben verlangen mehrere Lektionen auf einmal — genau das wird in einer Klausur gefordert.

:::snippet{#aufgabe}
**Aufgabe 1: Eine App zerlegen**

Eine Pflanzen-App tut dreierlei:

1. Du fotografierst eine Blume, die App nennt dir ihren Namen.
2. Die App schlägt dir Pflanzen vor, die zu deinem Standort passen, ohne dass jemand vorher Kategorien festgelegt hat.
3. Auf Wunsch schreibt die App einen kurzen Steckbrief-Text über die erkannte Pflanze.

Bestimme für **jede der drei Funktionen** einzeln: diskriminativ oder generativ? Welche Art des maschinellen Lernens? Begründe jeweils in einem Satz.
:::

::::collapsible{title="Tipp 1: Die beiden Fragen"}

Stelle bei jeder Funktion nacheinander die zwei Fragen aus dem Merksatz: Was tut sie — einordnen oder etwas Neues erzeugen? Und: Woher weiß sie, was richtig ist — aus Labels, aus Belohnung oder aus gar nichts?
::::

::::collapsible{title="Tipp 2: zu Funktion 2"}

„ohne dass jemand vorher Kategorien festgelegt hat" ist der entscheidende Halbsatz. Welche der drei Arten des Lernens kommt ohne vorgegebene Kategorien aus?
::::

:::protect{password="ai-1-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Funktion | Typ | Art des ML | Begründung |
| --- | --- | --- | --- |
| 1 Blume erkennen | diskriminativ | überwacht | Das Foto wird einer Kategorie (Pflanzenart) zugeordnet; trainiert wurde mit Fotos, die bereits mit dem Artnamen beschriftet waren. |
| 2 Vorschläge | diskriminativ | unüberwacht | Es wird nichts Neues erzeugt, sondern gruppiert; die Gruppen gibt niemand vor, das System findet sie selbst in den Standortdaten. |
| 3 Steckbrief | generativ | selbstüberwacht (aus Texten) | Es entsteht ein Text, den es in dieser Form vorher nicht gab. |

Die App als Ganzes ist damit eine **Mischform** — wie fast jedes echte KI-System. Wer sie als Ganzes einordnen will, scheitert; erst die Zerlegung in Funktionen macht die Einordnung möglich.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Das passende Verfahren wählen**

Für jede der folgenden Aufgaben ist zu entscheiden, welche Art des maschinellen Lernens geeignet ist — und was man dafür an Daten bräuchte.

a) Ein Verlag hat 200 000 unsortierte Leserbriefe und möchte wissen, über welche Themen die Leute überhaupt schreiben.

b) Ein Verlag hat 5 000 Leserbriefe, die Mitarbeitende bereits als „Lob", „Kritik" oder „Frage" markiert haben, und möchte die restlichen automatisch einordnen.

c) Ein Programm soll lernen, das Spiel *Vier gewinnt* zu gewinnen. Niemand kann für jede Stellung angeben, welcher Zug der beste ist.
:::

::::collapsible{title="Tipp"}

Frage bei jedem Fall: **Was liegt schon vor?** Fertige Antworten zu jedem Datensatz, gar nichts, oder nur eine Rückmeldung am Ende („gewonnen" / „verloren")?
::::

:::protect{password="ai-1-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Unüberwachtes Lernen.** Es gibt keine Labels, und die Themen sind ja gerade das Gesuchte — würde man sie vorgeben, hätte man die Frage schon beantwortet. Gebraucht werden nur die Texte selbst; heraus kommen Cluster, die ein Mensch anschließend benennen muss.

b) **Überwachtes Lernen.** Die 5 000 markierten Briefe sind die Trainingsdaten, das Etikett ist „Lob", „Kritik" oder „Frage". Wichtig: Ein Teil davon muss als **Testdaten** zurückgehalten werden, sonst lässt sich die Qualität nicht beurteilen.

c) **Bestärkendes Lernen.** Es gibt keine gelabelten Züge, wohl aber eine Rückmeldung am Ende der Partie: gewonnen oder verloren. Das Programm spielt sehr viele Partien und lernt daraus, welche Züge häufiger zum Sieg führen.

Die drei Fälle unterscheiden sich nicht in der Aufgabe, sondern **in dem, was an Daten vorhanden ist**. Das ist in der Praxis meist die erste und wichtigste Frage.
:::

<!-- KLP EF: beschreiben vorgegebene Anwendungsbeispiele diskriminativer und generativer
     KI-Systeme (A); beschreiben die grundlegenden Funktionsweisen der Arten des
     maschinellen Lernens (A). Rückblick fasst beide Kompetenzen zusammen. -->

---

## Selbsttest

::::multievent

**1. Was ist der Unterschied zwischen diskriminativer und generativer KI?**

{r1{!Diskriminative KI ordnet ein, generative KI erzeugt neu.}}

{r1{Diskriminative KI ist langsamer als generative KI.}}

{r1{Diskriminative KI braucht keine Daten, generative schon.}}

{r1{Es gibt keinen Unterschied.}}

{h{Stelle dir die Frage, die das System beantwortet: „Was ist das?" oder „Mach etwas Neues?"}}

{H{Richtig! Diskriminativ = einordnen, generativ = erzeugen.}}

**2. Welche Art des maschinellen Lernens nutzt gelabelte Trainingsdaten?** (Mehrfachauswahl)

{c1{!Überwachtes Lernen}}

{c1{Unüberwachtes Lernen}}

{c1{Bestärkendes Lernen}}

{c1{Keine der drei Arten}}

{h{Das Wort „überwacht" bezieht sich auf die Labels, die wie ein Lehrer wirken.}}

{H{Richtig! Nur überwachtes Lernen arbeitet mit gelabelten Daten. Unüberwacht hat keine Labels, bestärkend lernt durch Belohnung.}}

**3. Welches Beispiel gehört zum unüberwachten Lernen?**

{r2{E-Mails als „Spam" markieren und ein System darauf trainieren}}

{r2{!Kundenprofile ohne Vorgaben in Gruppen einteilen}}

{r2{Einer Spiel-KI beibringen, durch Belohnung zu gewinnen}}

{r2{Einem System gelabelte Bilder von Äpfeln und Birnen zeigen}}

{h{Unüberwachtes Lernen hat keine Labels und keine Belohnung — nur rohe Daten.}}

{H{Richtig! Kundensegmentierung ohne Vorgaben ist unüberwacht.}}

**4. Warum ist autonomes Fahren eine Mischform?**

{r3{!Es kombiniert diskriminative, generative und bestärkende Anteile in einem System}}

{r3{Es wechselt je nach Verkehrslage zwischen zwei Herstellern}}

{r3{Es ist eigentlich nur überwachtes Lernen}}

{r3{Es nutzt gar kein maschinelles Lernen}}

{h{Ein selbstfahrendes Auto muss erkennen, planen und simulieren.}}

{H{Richtig! Objekterkennung ist diskriminativ, Routenplanung kann bestärkend sein, und Szenarien können generativ simuliert werden.}}

::::
