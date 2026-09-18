---
title: Anwendungsbeispiele
index: 3
permaid: ai-anwendungsbeispiele
---

# Anwendungsbeispiele

Die Theorie ist kurz. Jetzt schauen wir uns an, wie KI-Systeme im Alltag aussehen — und dass viele von ihnen mehrere Ansätze gleichzeitig kombinieren.

## KI-Systeme im Überblick

| System | diskriminativ / generativ | Art des ML | Beschreibung |
| --- | --- | --- | --- |
| Spam-Erkennung | diskriminativ | überwacht | Klassifiziert E-Mails als „Spam" oder „kein Spam" anhand gelabelter Trainingsdaten |
| Gesichtserkennung | diskriminativ | überwacht | Ordnet ein Gesicht einer Person zu, trainiert mit markierten Fotos |
| ChatGPT | generativ | bestärkend + überwacht | Erzeugt neue Texte; trainiert zunächst überwacht, dann durch menschliche Rückmeldung (RLHF) optimiert |
| Bildgenerierung | generativ | überwacht | Erzeugt neue Bilder aus Textbeschreibungen, trainiert mit Bild-Text-Paaren |
| Empfehlungssysteme | diskriminativ | unüberwacht / überwacht | Schlägt Produkte vor, basierend auf Mustern im Nutzerverhalten |
| Autonomes Fahren | Mischform | alle drei | Erkennt Objekte (diskriminativ), plant Routen (bestärkend), simuliert Szenarien (generativ) |

:::snippet{#merken}
Viele echte KI-Systeme sind **Mischformen**. Sie kombinieren diskriminative und generative Anteile, überwachtes und unüberwachtes Lernen. Wenn du ein System in der Praxis analysierst, frage für jede Komponente einzeln: Was tut dieser Teil? Wie lernt er?
:::

## Spam-Erkennung im Detail

Jede E-Mail hat Merkmale: Wörter wie „gratis", „Angebot", „Klicken Sie hier". Der Spam-Filter wurde mit tausenden E-Mails trainiert, die als „Spam" oder „kein Spam" markiert waren. Bei einer neuen E-Mail entscheidet er: Spam oder nicht? Das ist **diskriminativ** und **überwacht** — eine Klassifikation mit gelabelten Daten.

## ChatGPT im Detail

ChatGPT wurde in zwei Phasen trainiert:

1. **Überwachtes Lernen:** Das Modell lernt, Texte fortzusetzen, anhand von Milliarden Textbeispielen.
2. **Bestärkendes Lernen durch menschliche Rückmeldung (RLHF):** Menschen bewerten Antworten. Das Modell lernt, Antworten zu bevorzugen, die positive Bewertungen bekommen.

Das Ergebnis ist **generativ** — das Modell erzeugt neue Texte, die es in genau dieser Form noch nicht gab.

## Autonomes Fahren: eine Mischform

Ein selbstfahrendes Auto nutzt:

- **Diskriminative KI** (überwacht): Erkennt Fußgänger, Autos, Ampeln — trainiert mit gelabelten Bildern.
- **Bestärkende KI**: Lernt, welche Fahrmanöver sicher sind, durch Simulation und Belohnung.
- **Generative KI**: Kann seltene Verkehrsszenarien simulieren, um das System zu trainieren, ohne echte Gefahr.

:::snippet{#aufgabe}
**Klassifiziere selbst.**

Ordne jedes der folgenden Systeme ein — diskriminativ oder generativ? Welche Art des ML passt?

a) Spracherkennung („Hey Siri") — wandelt gesprochene Sprache in Text um.

b) DeepL-Übersetzung — übersetzt einen deutschen Text ins Englische.

c) DALL-E — erzeugt ein Bild aus der Beschreibung „ein blauer Elefant im Weltraum".

d) Betrugserkennung bei Kreditkarten — markiert verdächtige Transaktionen.

e) Musikvorschläge bei Spotify — schlägt dir Lieder vor, die dir gefallen könnten.
:::

::::collapsible{title="Tipp"}

Stelle bei jedem System die zwei Fragen:

1. **Erzeugt es neue Daten** (generativ) oder **ordnet es vorhandene Daten ein** (diskriminativ)?
2. **Hat es gelabelte Trainingsdaten** (überwacht), **nur rohe Daten** (unüberwacht) oder **lernt es durch Belohnung** (bestärkend)?

Achtung: Bei der Übersetzung ist die Antwort nicht eindeutig — sie kann als diskriminativ (Quelle → Ziel-Kategorie) oder als generativ (neuen Text erzeugen) gesehen werden. Solche Grenzfälle sind in der Praxis normal.

::::

:::protect{password="ai-1-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Diskriminativ, überwacht** — ordnet jedem Audio-Segment einen Buchstaben oder ein Wort zu. Trainiert mit gelabelten Audio-Text-Paaren.

b) **Grenzfall, meist generativ betrachtet** — erzeugt einen neuen Text in der Zielsprache. Trainiert überwacht mit parallelen Textpaaren.

c) **Generativ** — erzeugt ein neues Bild, das es vorher nicht gab. Trainiert überwacht mit Bild-Text-Paaren.

d) **Diskriminativ, überwacht** — klassifiziert Transaktionen als „Betrug" oder „kein Betrug".

e) **Diskriminativ, unüberwacht/überwacht gemischt** — erkennt Muster im Hörverhalten und ordnet Nutzer Cluster zu (unüberwacht), kann aber auch mit explizitem „Gefällt mir"-Feedback lernen (überwacht).

:::

<!-- KLP EF: beschreiben vorgegebene Anwendungsbeispiele diskriminativer und generativer
     KI-Systeme (A). Q-Phase: erläutern die Unterschiede an vorgegebenen Beispielen (A) -->

---

## Selbsttest

::::multievent

**1. Welche der folgenden Aussagen über ChatGPT sind richtig?** (Mehrfachauswahl)

{c1{!ChatGPT ist ein generatives System.}}

{c1{!ChatGPT nutzt sowohl überwachtes als auch bestärkendes Lernen.}}

{c1{ChatGPT ist rein diskriminativ.}}

{c1{!ChatGPT erzeugt Texte, die es in genau dieser Form vorher nicht gab.}}

{h{Denk an die zwei Trainingsphasen und die Art der Ausgabe.}}

{H{Richtig! ChatGPT ist generativ, erzeugt neue Texte und nutzt überwachtes Lernen (Textfortsetzung) plus bestärkendes Lernen (RLHF). Nur die Aussage, es sei rein diskriminativ, ist falsch.}}

**2. Warum ist autonomes Fahren eine Mischform?**

{r2{!Es kombiniert diskriminative, generative und bestärkende Anteile}}

{r2{Es ist rein diskriminativ}}

{r2{Es ist rein generativ}}

{r2{Es nutzt nur unüberwachtes Lernen}}

{h{Ein Auto muss erkennen, planen und simulieren. Welche Arten des ML passen zu welchem Teil?}}

{H{Richtig! Objekterkennung ist diskriminativ, Routenplanung kann bestärkend sein, und Szenarien können generativ simuliert werden.}}

::::
