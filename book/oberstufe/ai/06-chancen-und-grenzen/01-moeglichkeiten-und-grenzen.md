---
title: Möglichkeiten und Grenzen
index: 1
permaid: ai-moeglichkeiten-grenzen
---

# Möglichkeiten und Grenzen

KI-Systeme können beeindruckende Leistungen erbringen — aber sie haben systematische Grenzen, die man kennen muss, um sie sinnvoll einzusetzen.

## Möglichkeiten

| Bereich | Was KI kann | Beispiel |
| --- | --- | --- |
| **Klassifikation** | Daten in Kategorien einordnen | Spam-Erkennung, Gesichtserkennung |
| **Texterzeugung** | Neue Texte verfassen | ChatGPT, DeepL |
| **Bildanalyse** | Muster in Bildern erkennen | Medizinische Diagnose, Autonomes Fahren |
| **Vorhersage** | Trends aus Daten ableiten | Wetter, Aktien |
| **Spracherkennung** | Gesprochene Sprache in Text | Siri, Alexa |

## Grenzen

:::snippet{#definition}
**Grenzen von KI-Systemen:**
- **Kein echtes Verständnis** — das Modell erkennt Muster, versteht aber keine Bedeutung.
- **Abhängig von Trainingsdaten** — was nicht in den Daten war, kann das Modell nicht.
- **:t[Halluzinationen]{#halluzination}** — LLMs erzeugen oft Text, der plausibel klingt, aber faktisch falsch ist.
- **Keine kausale Argumentation** — das Modell sieht Korrelationen, nicht Ursache-Wirkung.
- **Begrenzter Kontext** — jedes Modell hat ein maximales Kontextfenster.
:::

:::snippet{#merken}
Ein KI-System kann Muster erkennen, aber es **versteht** nichts. Es kann Texte erzeugen, die richtig klingen, aber **faktisch falsch** sind (Halluzinationen). Es ist so gut wie seine **Trainingsdaten** — und es kann nicht sagen, was es nicht weiß.
:::

:::snippet{#aufgabe}
a) Suche ein Beispiel für eine „KI-Halluzination" — ein Text, den ein LLM erzeugt hat, der plausibel klingt aber falsch ist. Notiere ihn und erkläre, warum er falsch ist.

b) Ein Spam-Filter hat eine Trefferquote von 95 % auf Trainingsdaten und 60 % auf Testdaten. Welche Schlussfolgerung ziehst du? Welches Problem aus Kapitel 3 liegt vor?

c) Diskutiert in der Gruppe: Warum kann ein LLM nicht zuverlässig sagen, ob eine Aussage wahr oder falsch ist?
:::

::::collapsible{title="Tipp zu b)"}

Vergleiche die beiden Zahlen so, wie du es in Lektion 3.3 gelernt hast: Auf welchen Daten ist das Modell gut, auf welchen schlecht — und welcher der beiden Fehler sieht genau so aus?
::::

::::collapsible{title="Tipp zu c)"}

Erinnere dich an Lektion 5.3: Woher nimmt ein Sprachmodell das nächste Token? Prüft es dabei irgendwo, ob das Ergebnis mit der Wirklichkeit übereinstimmt?
::::

:::protect{password="ai-6-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Typische Beispiele sind erfundene Literaturangaben, erfundene Gerichtsurteile oder frei erfundene Funktionsnamen in Programmbibliotheken. Sie sehen deshalb so überzeugend aus, weil das Modell die **Form** korrekt gelernt hat — eine Quellenangabe mit Autor, Jahr und Titel, eine Methode mit plausiblem Namen und plausiblen Parametern. Nur der Inhalt hat kein Vorbild in der Wirklichkeit.

b) 95 % auf Trainingsdaten, 60 % auf Testdaten: Das ist **Überanpassung**. Das Modell hat die Trainingsdaten weitgehend auswendig gelernt, statt zu verallgemeinern. Im Alltag wäre der Filter unbrauchbar, obwohl seine Trainingsquote hervorragend aussieht. Genau deshalb darf man ein Modell nie an der Trainingsquote messen.

c) Ein LLM sagt Token für Token voraus, welche Fortsetzung **wahrscheinlich** ist — gemessen an den Texten, die es gelesen hat. Wahrscheinlich und wahr sind aber zwei verschiedene Dinge: Ein häufig wiederholter Irrtum ist wahrscheinlich, eine richtige, aber selten aufgeschriebene Aussage ist es nicht. Das Modell hat keine Instanz, an der es seine Ausgabe mit der Wirklichkeit abgleichen könnte, und es hat auch kein Maß dafür, wie sicher es sich ist. Deshalb klingt eine Halluzination genauso selbstbewusst wie eine richtige Antwort — und deshalb muss man Aussagen eines LLM an einer unabhängigen Quelle prüfen.
:::

<!-- KLP Q-Phase: beurteilen Möglichkeiten und Grenzen des Problemlösens mit
     Informatiksystemen (A) -->

---

## Selbsttest

::::multievent

**1. Welche Grenze haben alle KI-Systeme gemeinsam?**

{r1{!Sie sind abhängig von ihren Trainingsdaten und verstehen keine Bedeutung.}}

{r1{Sie sind zu langsam.}}

{r1{Sie können nur Englisch.}}

{r1{Sie brauchen immer das Internet.}}

{h{KI-Systeme erkennen Muster, aber sie verstehen nicht, was die Muster bedeuten.}}

{H{Richtig! KI-Systeme sind auf ihre Trainingsdaten beschränkt und haben kein echtes Verständnis.}}

**2. Was ist eine Halluzination bei LLMs?**

{r2{!Ein Text, der plausibel klingt, aber faktisch falsch ist.}}

{r2{Ein Text, der besonders kreativ ist.}}

{r2{Ein Text, der zu lang ist.}}

{r2{Ein Text, der gar keine Fehler enthält.}}

{h{Das Modell erzeugt etwas, das aussieht wie eine richtige Antwort, aber nicht stimmt.}}

{H{Richtig! Eine Halluzination ist ein scheinbar korrekter, aber faktisch falscher Text.}}

**3. Ein Modell hat 95 % Trefferquote auf Trainingsdaten, aber 60 % auf Testdaten. Was liegt vor?**

{r3{!Überanpassung (Overfitting)}}

{r3{Unteranpassung (Underfitting)}}

{r3{Bias}}

{r3{Eine Halluzination}}

{h{Großer Unterschied zwischen Trainings- und Testquote = das Modell hat auswendig gelernt.}}

{H{Richtig! Die hohe Trainings- und niedrige Testquote ist ein klares Zeichen für Überanpassung.}}

::::
