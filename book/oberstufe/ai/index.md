---
name: Künstliche Intelligenz und maschinelles Lernen
index: 4
lang: de
permaid: ai
keywords:
  - java
  - ai
  - ki
  - ml
  - qphase
---

# Künstliche Intelligenz und maschinelles Lernen

In diesem Lernpfad lernst du, wie Systeme der :t[künstlichen Intelligenz]{#kuenstliche-intelligenz} funktionieren — nicht aus der Ferne, sondern am Code. Du baust einen Klassifikator, ein neuronales Netz und ein Sprachmodell selbst nach und verstehst so, was hinter Begriffen wie überwachtes Lernen, Forward Propagation und Prompting steckt.

<!--
Für Lehrkräfte: Der Lernpfad deckt das Inhaltsfeld "Künstliche Intelligenz
und maschinelles Lernen" des Kernlehrplans Informatik SII (Entwurf, 31.07.2025)
ab. Die Zuordnung steht am Ende dieser Datei.
-->

## Was du brauchst

Diesen Lernpfad kannst du **parallel zu den Erweiterungen der Programmierung** durcharbeiten. Jedes Kapitel sagt zu Beginn, was es voraussetzt. Die konzeptionellen Kapitel 1 und 6 brauchen keine Programmierkenntnisse über die EF-Grundlagen hinaus.

Die wichtigsten Voraussetzungen:

| Aus dem Lernpfad | Kapitel | Brauchst du in |
|---|---|---|
| Grundlagen: Klassen und Objekte | [OOP 1.6](/oberstufe/oop/01-grundlagen/06-objektorientierung) | Kapitel 2–5 |
| Grundlagen: Felder | [OOP 1.5](/oberstufe/oop/01-grundlagen/05-felder) | Kapitel 2–5 |
| Grundlagen: Methoden | [OOP 1.4](/oberstufe/oop/01-grundlagen/04-methoden-und-modularisierung) | Kapitel 2–5 |
| Grundlagen: Suchen und Sortieren | [OOP 1.7](/oberstufe/oop/01-grundlagen/07-algorithmen-suchen-und-sortieren) | Kapitel 2 (k-NN) |
| Erweiterungen: 2D-Felder | [OOP 2.2](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik) | Kapitel 2–4 (empfohlen, nicht zwingend) |
| Erweiterungen: Polymorphie und Schnittstellen | [OOP 2.1](/oberstufe/oop/02-erweiterungen/01-vertiefte-objektorientierung) | Kapitel 4 (empfohlen; Alternativen im Text) |

:::snippet{#merken}
Fehlt dir ein Konzept aus den Erweiterungen (z.B. Schnittstellen), gibt der Text an der Stelle eine kurze Erklärung. Du kommst auch ohne das OOP-Erweiterungen-Kapitel durch, aber mit ihm werden die Kapitel 4 und 5 leichter.
:::

## Wie du mit diesem Lernpfad arbeitest

:::snippet{#merken}
- **Programmierbereiche** kannst du direkt im Browser ausführen. Du musst nichts installieren.
- **Verändere die Beispiele!** Du kannst nichts kaputt machen. Lade die Seite neu, wenn du von vorne anfangen möchtest.
- **Tipps** sind eingeklappt. Öffne sie erst, wenn du wirklich nicht weiterkommst – und immer nur den nächsten.
- **Lösungen** sind mit einem Passwort geschützt. Alle Passwörter stehen auf der Seite [Lösungspasswörter](/loesungen) – sieh dort erst nach, wenn du die Aufgabe wirklich versucht und die Tipps geöffnet hast.
- Bei vielen Aufgaben liegt eine Datei mit **Tests** dabei. Über den Reiter *Testrunner* prüfst du damit selbst, ob deine Lösung stimmt.
- Am Ende jeder Lektion findest du einen **Selbsttest**. Damit prüfst du, ob du das Wichtigste verstanden hast.
:::

:::snippet{#brain}
Eine Regel begleitet dich durch den ganzen Lernpfad: **Erst denken, dann Rechner.** Bei vielen Aufgaben sollst du zuerst auf Papier vorhersagen, was das Programm ausgibt – und es erst danach ausführen. Wenn Vorhersage und Ergebnis auseinandergehen, hast du gerade am meisten gelernt.
:::

## Die Kapitel

1. **Was ist KI?** – diskriminativ oder generativ, Arten des maschinellen Lernens, Anwendungsbeispiele
2. **Überwachtes Lernen** – Trainings- und Testdaten, Klassifizierung mit k-NN
3. **Unüberwachtes Lernen und Modellqualität** – Clusterbildung mit k-Means, Bias, Überanpassung, Präzision
4. **Neuronale Netze** – Neuronen, Schichten, Gewichte, Forward Propagation, Backpropagation
5. **Sprachmodelle** – Tokenisierung, Wahrscheinlichkeiten, Bigramm-Modell, Prompting
6. **Chancen und Grenzen** – Möglichkeiten, Datenschutz, Ethik, Projekt
7. **Referenz** – Nachschlagewerk für die Klassen dieses Lernpfads

<!--
Bezug zum Kernlehrplan (nur für Lehrkräfte, erscheint nicht im Hyperbook)

Der Lernpfad entwickelt Kompetenzen im Inhaltsfeld
"Künstliche Intelligenz und maschinelles Lernen" (IF-INF-SEK2N-KIML)
sowie im Inhaltsfeld "Informatik, Mensch und Gesellschaft".

EF-Kompetenzen (beschreiben-Niveau):

| Kompetenzerwartung (verkürzt) | Kapitel |
| --- | --- |
| beschreiben vorgegebene Anwendungsbeispiele diskriminativer und generativer KI-Systeme (A) | 1, 5 |
| beschreiben die grundlegenden Funktionsweisen der Arten des maschinellen Lernens (A) | 1, 2 |
| erläutern den Unterschied von Trainings- und Testdaten (A) | 2 |
| erläutern Möglichkeiten und Grenzen eines KI-Systems bei der Lösung von informatischen Problemstellungen (A) | 6 |

Q-Phase-GK-Kompetenzen (erläutern/bewerten-Niveau):

| Kompetenzerwartung (verkürzt) | Kapitel |
| --- | --- |
| erläutern die Unterschiede zwischen diskriminativen und generativen KI-Systemen an vorgegebenen Beispielen (A) | 1, 5 |
| erläutern die grundlegenden Funktionsweisen der Arten des maschinellen Lernens (A) | 2, 3 |
| erläutern die Funktionsweise eines konkreten Verfahrens zur Klassifizierung beim überwachten Lernen (A) | 2 |
| erläutern die Funktionsweise eines konkreten Verfahrens zur Clusterbildung beim unüberwachten Lernen (A) | 3 |
| erläutern die Grundlagen künstlicher neuronaler Netze (A) | 4 |
| bewerten die Qualität eines KI-Modells auf Grundlage vorgegebener Kriterien (A) | 3, 6 |
| formulieren Prompts für ein generatives KI-System bei der Entwicklung von informatischen Problemlösungen (I) | 5 |
| beurteilen Möglichkeiten zur reflektierten Nutzung von generativen KI-Systemen (A) | 5, 6 |
| bewerten Auswirkungen des Einsatzes von Informatiksystemen auch unter Berücksichtigung von künstlicher Intelligenz (A) | 6 |
| beurteilen Fallbeispiele auf Grundlage der Grundprinzipien der Datensicherheit und des Datenschutzes (A) | 6 |
-->
