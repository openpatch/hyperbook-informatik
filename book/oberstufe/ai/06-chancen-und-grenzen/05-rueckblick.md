---
title: Rückblick
index: 5
permaid: ai-chancen-rueckblick
---

# Rückblick

Du hast den gesamten Lernpfad durchgearbeitet. Hier bildest du das Gelernte ab und prüfst, ob du alles verstanden hast.

## Das kann ich jetzt

- [ ] Ich kann diskriminative und generative KI-Systeme unterscheiden. (Kap. 1, 5)
- [ ] Ich kann die drei Arten des maschinellen Lernens nennen. (Kap. 1)
- [ ] Ich kann Trainings- und Testdaten aufteilen und die Trefferquote messen. (Kap. 2)
- [ ] Ich kann k-NN als Klassifikationsverfahren implementieren. (Kap. 2)
- [ ] Ich kann k-Means als Clusterbildungsverfahren implementieren. (Kap. 3)
- [ ] Ich kann Bias, Überanpassung, Unteranpassung, Präzision und Spezifität erklären. (Kap. 3)
- [ ] Ich kann die Grundlagen neuronaler Netze beschreiben. (Kap. 4)
- [ ] Ich kann Forward Propagation und die Grundidee der Backpropagation erklären. (Kap. 4)
- [ ] Ich kann ein Bigramm-Modell implementieren und den Unterschied zu LLMs erklären. (Kap. 5)
- [ ] Ich kann Prompts formulieren. (Kap. 5)
- [ ] Ich kann Möglichkeiten und Grenzen von KI-Systemen bewerten. (Kap. 6)
- [ ] Ich kann die Grundprinzipien der Datensicherheit und des Datenschutzes an Fallbeispielen anwenden. (Kap. 6)

## Das Wichtigste auf einen Blick

| Kapitel | Kernbegriff |
| --- | --- |
| 1: Was ist KI | diskriminativ/generativ, überwacht/unüberwacht/bestärkend |
| 2: Überwachtes Lernen | k-NN, Trainings-/Testdaten, Trefferquote |
| 3: Unüberwachtes Lernen | k-Means, Bias, Überanpassung, Unteranpassung, Präzision, Spezifität |
| 4: Neuronale Netze | Neuron, Schicht, Netz, Forward Propagation, Backpropagation, Lernrate |
| 5: Sprachmodelle | Tokenisierung, Bigramm, bedingte Wahrscheinlichkeit, LLM, Prompting |
| 6: Chancen und Grenzen | Halluzinationen, Datenschutz, Ethik, Projekt |

:::snippet{#merken}
Der Lernpfad hat die Grundbegriffe, zwei konkrete Verfahren (k-NN, k-Means), neuronale Netze, Sprachmodelle und gesellschaftliche Fragen abgedeckt. Die Programmierkompetenzen aus dem OOP-Lernpfad wurden dabei kontinuierlich angewendet und vertieft.
:::

## Gemischte Aufgaben

Diese beiden Aufgaben ziehen den ganzen Lernpfad zusammen — vom Begriff über das Verfahren bis zur Bewertung.

:::snippet{#aufgabe}
**Aufgabe 1: Ein System vollständig beurteilen**

Eine Stadt möchte ein KI-System einsetzen, das aus Bewerbungen für Sozialwohnungen die Dringlichkeit vorhersagt. Trainiert wird es mit 40 000 Bewerbungen der letzten 15 Jahre, bei denen jeweils vermerkt ist, ob damals eine Wohnung zugeteilt wurde.

a) Ist das System diskriminativ oder generativ? Welche Art des maschinellen Lernens liegt vor? Begründe.

b) Wie müssten die 40 000 Datensätze aufgeteilt werden, und warum?

c) Nach dem Training erreicht das System 94 % auf den Trainingsdaten und 71 % auf den Testdaten. Welches Problem liegt vor, und was würdest du dagegen tun?

d) Menschen aus einem bestimmten Stadtteil werden vom System systematisch als weniger dringlich eingestuft. Erkläre mit den Begriffen aus Kapitel 3, wie das zustande kommen kann, **ohne** dass der Stadtteil als Merkmal verwendet wird.

e) Nenne zwei Gründe, warum man die Entscheidung am Ende nicht dem System allein überlassen sollte.
:::

::::collapsible{title="Tipp 1: Reihenfolge"}

Geh die Kapitel der Reihe nach durch: a) ist Kapitel 1, b) ist Kapitel 2, c) ist Kapitel 3, d) ist Kapitel 3 und 6, e) ist Kapitel 6.
::::

::::collapsible{title="Tipp 2: zu d)"}

Ein Modell braucht das verbotene Merkmal nicht — es genügt ein anderes, das stark mit ihm zusammenhängt. Welche Angaben in einer Wohnungsbewerbung verraten indirekt den Stadtteil?
::::

:::protect{password="ai-6-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Diskriminativ**, denn das System erzeugt nichts Neues, sondern ordnet jede Bewerbung einer Kategorie beziehungsweise einer Dringlichkeitsstufe zu. Und **überwacht**, denn zu jedem Trainingsdatensatz gibt es ein Etikett: die damalige Entscheidung.

b) Etwa 80 % Trainings- und 20 % Testdaten, wobei die Testdaten beim Training **nicht** angefasst werden. Nur an ungesehenen Daten lässt sich ablesen, ob das System verallgemeinert hat statt auswendig zu lernen. Wer zusätzlich Werte einstellen will (etwa ein k), braucht einen dritten Teil als Validierungsdaten.

c) 94 % gegen 71 % ist das Muster der **Überanpassung**: Das Modell ist zu eng an die Trainingsdaten angepasst. Gegenmaßnahmen sind ein einfacheres Modell (beim k-NN: ein größeres k), mehr und vielfältigere Trainingsdaten sowie das Entfernen von Ausreißern und Rauschen.

d) Das ist **historischer Bias**. Die Etiketten sind die Entscheidungen der Vergangenheit — wenn dort bereits benachteiligt wurde, lernt das Modell diese Benachteiligung als „richtige Antwort". Den Stadtteil braucht es dafür nicht: Postleitzahl, Straßenname, Mietpreis, Schulbezirk oder Nachname können eng genug mit ihm zusammenhängen, um als **Ersatzmerkmal** zu dienen. Das Modell rechnet dann formal ohne den Stadtteil und benachteiligt trotzdem nach ihm. Genau deshalb genügt es nicht, ein sensibles Merkmal einfach wegzulassen; man muss die Ergebnisse **getrennt nach Gruppen** auswerten.

e) Zum Beispiel:

- **Verantwortung:** Eine Behörde muss ihre Entscheidungen begründen und jemand muss für sie geradestehen können. Ein Modell kann das nicht.
- **Nachvollziehbarkeit:** Die Betroffenen haben ein Recht darauf zu erfahren, warum sie abgelehnt wurden — und Widerspruch einlegen zu können.
- **Bias und Datengrundlage:** Das System kennt nur, was in den Daten steht. Eine ungewöhnliche Notlage, die in 15 Jahren nie vorkam, kann es nicht erkennen.

Vertretbar wäre das System als **Vorsortierung**, über die ein Mensch entscheidet — nicht als Entscheider.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Datenschutz am Fallbeispiel**

Eine Schule möchte einen Lern-Chatbot einführen. Er läuft auf dem Server eines Anbieters, merkt sich für jede Schülerin und jeden Schüler alle bisherigen Fragen und schlägt daraus passende Übungen vor. Die Lehrkräfte sollen einsehen können, wer welche Fragen gestellt hat.

a) Prüfe den Vorschlag an den fünf Grundprinzipien des Datenschutzes. Welche sind verletzt oder zumindest fraglich?

b) Formuliere drei konkrete Änderungen, die den Dienst datenschutzfreundlicher machen, ohne seinen Zweck aufzugeben.

c) Beurteile zusätzlich die drei Grundprinzipien der **Datensicherheit** für diesen Dienst.
:::

::::collapsible{title="Tipp"}

Nimm dir die beiden Definitionsblöcke aus Lektion 6.2 daneben und geh sie Punkt für Punkt durch. Frage bei jedem: Was genau wird hier gespeichert — und wer kommt daran?
::::

:::protect{password="ai-6-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die fünf Prinzipien:

- **Verbot mit Erlaubnisvorbehalt:** Es braucht eine Rechtsgrundlage. Eine „freiwillige" Einwilligung ist in der Schule heikel, weil zwischen Schule und Lernenden kein Gleichgewicht besteht — und bei Minderjährigen kommen die Eltern hinzu.
- **Datenminimierung:** Verletzt. Für Übungsvorschläge genügen die Themen der Fragen; der volle Wortlaut aller bisherigen Fragen ist dafür nicht nötig.
- **Zweckbindung:** Verletzt. Erhoben wird für Lernunterstützung, die Einsicht der Lehrkräfte in einzelne Fragen ist aber faktisch eine Leistungs- und Verhaltenskontrolle — ein anderer Zweck.
- **Transparenz:** Fraglich. Alle Beteiligten müssten vorher wissen, dass gespeichert wird, wie lange, und dass Lehrkräfte mitlesen können.
- **Erforderlichkeit:** Fraglich. Die namentliche Einsicht ist für den Lernzweck nicht erforderlich; eine anonyme Auswertung nach Themen würde denselben Nutzen bringen.

Besonders schwer wiegt der **abschreckende Effekt**: Wer weiß, dass die Lehrkraft jede Frage mitliest, fragt nicht mehr, was er nicht versteht — und damit ist der Zweck des Dienstes zerstört.

b) Drei Änderungen:

1. **Auswertung nur anonym und aggregiert:** Lehrkräfte sehen „12-mal wurde nach Schleifen gefragt", nicht, wer gefragt hat.
2. **Automatische Löschung:** Fragen werden nach der Sitzung oder nach wenigen Tagen gelöscht; für die Übungsvorschläge genügt ein Themenprofil ohne Wortlaut.
3. **Ohne Anmeldung nutzbar** oder mit Pseudonym, damit gar kein Personenbezug entsteht. Zusätzlich: ein Anbieter mit Serverstandort in der EU und ein Vertrag zur Auftragsverarbeitung.

c) Datensicherheit:

- **Vertraulichkeit:** Kritisch. Die Daten liegen bei einem externen Anbieter; es braucht Verschlüsselung bei Übertragung und Speicherung sowie ein enges Rechtekonzept.
- **Integrität:** Weniger kritisch, aber relevant: Verfälschte Lernprofile führen zu falschen Übungsvorschlägen.
- **Verfügbarkeit:** Am wenigsten kritisch. Fällt der Dienst aus, kann der Unterricht weiterlaufen — deshalb sollte er auch nie die einzige Lernquelle sein.
:::

<!-- KLP: Der Lernpfad deckt das Inhaltsfeld "Künstliche Intelligenz und
     maschinelles Lernen" (IF-INF-SEK2N-KIML) sowie Teile von "Informatik,
     Mensch und Gesellschaft" vollständig ab. -->

---

## Selbsttest

::::multievent

**1. Welche zwei Haupttypen von KI-Systemen hast du gelernt?**

{r1{!Diskriminative und generative KI.}}

{r1{Schnelle und langsame KI.}}

{r1{Gute und schlechte KI.}}

{r1{Deutsche und englische KI.}}

{h{Die Unterscheidung aus Kapitel 1 war: ordnen ein oder erzeugen neu.}}

{H{Richtig! Diskriminative KI ordnet ein, generative KI erzeugt neu.}}

**2. Welche zwei konkreten Verfahren hast du implementiert?** (Mehrfachauswahl)

{c1{!k-NN (Klassifizierung, überwacht)}}

{c1{!k-Means (Clusterbildung, unüberwacht)}}

{c1{k-Zufall (kein echtes Verfahren)}}

{c1{k-Chat (Prompting)}}

{h{k-NN und k-Means waren die beiden Verfahren aus Kapitel 2 und 3.}}

{H{Richtig! k-NN für überwachte Klassifikation, k-Means für unüberwachte Clusterbildung.}}

**3. Welche Bewertungskriterien für KI-Modelle hast du gelernt?** (Mehrfachauswahl)

{c1{!Bias}}

{c1{!Überanpassung}}

{c1{!Unteranpassung}}

{c1{!Präzision}}

{c1{!Spezifität}}

{c1{Lernrate}}

{h{Es waren fünf Kriterien aus Kapitel 3 — die Lernrate gehört zu Kapitel 4.}}

{H{Richtig! Bias, Überanpassung, Unteranpassung, Präzision und Spezifität sind die fünf Bewertungskriterien.}}

**4. Was ist die Grundidee, auf der Bigramm-Modell und LLM gemeinsam beruhen?**

{r2{!Das nächste Token nach Wahrscheinlichkeit vorhersagen.}}

{r2{Daten in Cluster einteilen.}}

{r2{Gewichte durch Backpropagation anpassen.}}

{r2{Bedingte Wahrscheinlichkeit ignorieren.}}

{h{Beide sagen voraus, welches Token als Nächstes kommt.}}

{H{Richtig! Beide Modelle sagen das nächste Token vorher — das LLM mit viel mehr Kontext.}}

::::
