---
title: Datenschutz und KI
index: 2
permaid: ai-datenschutz
---

# Datenschutz und KI

KI-Systeme verarbeiten oft große Mengen personenbezogener Daten. Die Grundprinzipien der Datensicherheit und des Datenschutzes sind deshalb besonders wichtig.

## Grundprinzipien der Datensicherheit

:::snippet{#definition}
Die drei Grundprinzipien der Datensicherheit:

- **Vertraulichkeit:** Daten sind nur für befugte Personen zugänglich.
- **Integrität:** Daten sind korrekt und unverfälscht.
- **Verfügbarkeit:** Daten sind zugänglich, wenn sie gebraucht werden.
:::

## Grundprinzipien des Datenschutzes

:::snippet{#definition}
Die fünf Grundprinzipien des Datenschutzes:

- **Verbot mit Erlaubnisvorbehalt:** Alles ist verboten, außer es ist ausdrücklich erlaubt.
- **Datenminimierung:** Nur die Daten sammeln, die wirklich nötig sind.
- **Zweckbindung:** Daten nur für den Zweck verwenden, für den sie erhoben wurden.
- **Transparenz:** Betroffene müssen wissen, welche Daten wie verwendet werden.
- **Erforderlichkeit:** Der Eingriff in die Privatsphäre muss verhältnismäßig sein.
:::

## KI und Datenschutz im Konflikt

KI-Systeme brauchen viele Daten — je mehr, desto besser. Datenschutz verlangt Datenminimierung. Dieser Konflikt ist zentral beim Einsatz von KI:

| KI-Anforderung | Datenschutz-Prinzip | Konflikt |
| --- | --- | --- |
| Viele Trainingsdaten | Datenminimierung | KI will mehr, Datenschutz will weniger |
| Daten aus vielen Quellen | Zweckbindung | Daten aus Kontext A in Kontext B verwenden |
| Automatische Vorhersagen | Transparenz | Wie das Modell entscheidet, ist oft unklar |
| Personenbezogene Daten | Verbot mit Erlaubnisvorbehalt | Wurde eingewilligt? |

:::snippet{#aufgabe}
a) Ein Unternehmen möchte Gesichtserkennung im Firmengebäude einsetzen. Welche Datenschutz-Prinzipien sind betroffen? Was muss das Unternehmen beachten?

b) Ein Schul-Chatbot soll Schülerfragen beantworten. Welche Daten fallen an? Wie kann man Datenminimierung umsetzen?

c) Diskutiert: Was sprechen die Prinzipien Zweckbindung und Transparenz dagegen, medizinische Daten, die für das Training eines Diagnosesystems erhoben wurden, anschließend für Werbung zu nutzen?
:::

::::collapsible{title="Tipp"}

Geh die fünf Datenschutzprinzipien der Reihe nach durch und frage bei jedem: Ist es hier überhaupt berührt? Wenn ja — was müsste getan werden, damit es eingehalten ist?
::::

:::protect{password="ai-6-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Betroffen sind vor allem:

- **Verbot mit Erlaubnisvorbehalt:** Biometrische Daten sind besonders geschützt. Ohne Rechtsgrundlage — Einwilligung oder Betriebsvereinbarung — ist der Einsatz verboten, nicht etwa erlaubt, solange niemand widerspricht.
- **Erforderlichkeit:** Gibt es ein milderes Mittel, das denselben Zweck erfüllt? Ein Chipkartenschloss leistet fast dasselbe und erfasst keine biometrischen Merkmale. Dann ist Gesichtserkennung nicht verhältnismäßig.
- **Datenminimierung:** Falls doch, dann ohne Speicherung der Bilder — ein Abgleich mit einer Prüfsumme genügt.
- **Transparenz:** Alle Beschäftigten müssen wissen, dass und wie erfasst wird.
- **Zweckbindung:** Die Daten dürfen nur für die Zugangskontrolle verwendet werden, nicht für Anwesenheits- oder Leistungskontrolle.

Eine freiwillige Einwilligung ist im Arbeitsverhältnis zudem schwierig, weil zwischen Betrieb und Beschäftigten kein Gleichgewicht besteht.

b) Anfallen können: die Frage selbst, Zeitpunkt, Name oder Login, Klasse, Kurs, frühere Fragen — und, wenn ein externer Dienst genutzt wird, zusätzlich IP-Adresse und Gerätedaten beim Anbieter. Datenminimierung heißt hier zum Beispiel: keine Anmeldung verlangen, Fragen nicht dauerhaft speichern, Protokolle nach kurzer Zeit löschen, keine Zuordnung zwischen Frage und Person anlegen. Wichtig ist auch, wo der Dienst läuft: Wird die Frage an einen externen Anbieter geschickt, verlässt sie die Schule.

c) **Zweckbindung:** Die Daten wurden für die medizinische Behandlung beziehungsweise für ein Diagnosesystem erhoben. Werbung ist ein völlig anderer Zweck; die ursprüngliche Einwilligung deckt ihn nicht ab. Für den neuen Zweck bräuchte es eine neue, ausdrückliche Einwilligung.

**Transparenz:** Die Betroffenen müssten wissen und nachvollziehen können, wer ihre Gesundheitsdaten wofür verwendet. Bei einer Weitergabe an Werbetreibende ist genau das nicht mehr gegeben — und Gesundheitsdaten gehören zu den sensibelsten Daten überhaupt, weil sich aus ihnen Rückschlüsse auf Krankheiten, Lebenserwartung und Kreditwürdigkeit ziehen lassen.
:::

:::snippet{#merken}
KI und Datenschutz stehen oft im Konflikt: KI will mehr Daten, Datenschutz will weniger. Die Grundprinzipien — Vertraulichkeit, Integrität, Verfügbarkeit, Verbot mit Erlaubnisvorbehalt, Datenminimierung, Zweckbindung, Transparenz, Erforderlichkeit — sind der Rahmen, in dem KI-Systeme bewertet werden müssen.
:::

<!-- KLP Q-Phase: beurteilen Fallbeispiele auf Grundlage der Grundprinzipien
     der Datensicherheit und des Datenschutzes (A) -->

---

## Selbsttest

::::multievent

**1. Was sind die drei Grundprinzipien der Datensicherheit?** (Mehrfachauswahl)

{c1{!Vertraulichkeit}}

{c1{!Integrität}}

{c1{!Verfügbarkeit}}

{c1{Geschwindigkeit}}

{h{Die drei klassischen Prinzipien heißen CIA-Prinzip (Confidentiality, Integrity, Availability).}}

{H{Richtig! Vertraulichkeit, Integrität und Verfügbarkeit sind die drei Grundprinzipien.}}

**2. Was besagt das Prinzip der Datenminimierung?**

{r2{!Nur die Daten sammeln, die wirklich nötig sind.}}

{r2{So viele Daten wie möglich sammeln.}}

{r2{Daten so klein wie möglich machen.}}

{r2{Daten löschen, wenn sie nicht mehr gebraucht werden.}}

{h{„Minimierung" bezieht sich auf die Menge der gesammelten Daten.}}

{H{Richtig! Datenminimierung heißt: nur sammeln, was unbedingt nötig ist.}}

**3. Welcher Konflikt besteht zwischen KI und Datenschutz?**

{r3{!KI will viele Daten, Datenschutz fordert Datenminimierung.}}

{r3{KI ist schneller als Datenschutz.}}

{r3{KI und Datenschutz haben keinen Konflikt.}}

{r3{Datenschutz macht KI überflüssig.}}

{h{KI braucht Daten zum Lernen; Datenschutz will Daten begrenzen.}}

{H{Richtig! KI-Systeme profitieren von vielen Daten, während Datenschutz Datenminimierung fordert.}}

::::
