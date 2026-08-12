---
title: Rückblick
index: 4
---

# Rückblick

Dieses Kapitel verlangt etwas anderes als die vorigen: kein richtiges Ergebnis, sondern ein **begründetes Urteil**. Bewertet wird nicht, zu welchem Schluss du kommst, sondern ob du die Schritte gegangen bist, die dorthin führen.

## Das kann ich jetzt

- [ ] Ich kann entscheiden, ob eine Angabe **personenbezogen** ist – auch in Grenzfällen. ([8.1](./01-grundprinzipien-des-datenschutzes))
- [ ] Ich kann die **fünf Grundprinzipien** benennen und auf einen Fall anwenden. ([8.1](./01-grundprinzipien-des-datenschutzes))
- [ ] Ich kann die drei **Schutzziele** unterscheiden und zeigen, dass sie miteinander in Konflikt stehen. ([8.2](./02-datensicherheit))
- [ ] Ich kann erklären, was **Rechte** und **Sichten** zur Vertraulichkeit beitragen. ([8.2](./02-datensicherheit))
- [ ] Ich kann sagen, wozu **Transaktionen** dienen und welches Schutzziel sie sichern. ([8.2](./02-datensicherheit))
- [ ] Ich kann einen Fall nach dem **Prüfschema** durcharbeiten und mit einer Abwägung abschließen. ([8.3](./03-fallbeispiele-beurteilen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Der Fall Mensa-Chip**

> Eine Schule führt ein bargeldloses Bezahlsystem für die Mensa ein. Jede Schülerin bekommt einen Chip. Gespeichert werden Name, Klasse, Guthaben und **jede einzelne Buchung** mit Datum, Uhrzeit und gekauftem Gericht. Die Daten bleiben bis zum Schulabschluss gespeichert. Die Schulleitung möchte die Auswertung nutzen, um zu erkennen, „welche Gerichte gut ankommen". Ein Lehrer schlägt zusätzlich vor, auffällige Essgewohnheiten an die Schulsozialarbeit zu melden. Die Datenbank liegt auf einem Server im Sekretariat; alle Lehrkräfte haben dasselbe Passwort.

Arbeite den Fall mit dem Prüfschema aus Lektion 8.3 durch. Geh dabei auf alle sieben Schritte ein und schließe mit einer Abwägung ab.
:::

::::collapsible{title="Tipp 1: Trenne die Zwecke"}

Im Text stecken **drei** verschiedene Zwecke: bezahlen, das Essensangebot planen und auf Auffälligkeiten reagieren. Prüfe jeden einzeln – die Antwort fällt für die drei unterschiedlich aus.

::::

::::collapsible{title="Tipp 2: Fragen, die weiterhelfen"}

- Braucht das Bezahlen wirklich die Angabe, **was** gekauft wurde – oder nur, **wie viel** es gekostet hat?
- Braucht die Speiseplanung Personenbezug, oder genügt eine Strichliste je Gericht?
- Was folgt aus dem gemeinsamen Passwort für die Schritte 5 und 6?

::::

:::protect{password="db-8-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**1. Welche Daten?** Name, Klasse, Guthaben und eine vollständige Kaufhistorie – durchweg personenbezogen. Das Gericht ist zudem heikler, als es aussieht: Aus der Wahl lassen sich Rückschlüsse auf Religion (kein Schweinefleisch), Gesundheit (glutenfrei) und finanzielle Lage (nur das billigste Gericht) ziehen. Damit sind besonders schützenswerte Daten im Spiel, ohne dass sie je erhoben wurden.

**2. Welcher Zweck?** Erhoben wird zum **Bezahlen**. Die Speiseplanung und die Meldung an die Sozialarbeit sind **andere** Zwecke.

**3. Rechtsgrundlage?** Für das Bezahlen: Vertrag beziehungsweise Einwilligung – tragfähig. Für die Speiseplanung: allenfalls mit Einwilligung, und dafür bräuchte es keinen Personenbezug. Für die Meldung an die Sozialarbeit: **keine**. Eine Einwilligung dafür wäre in der Schule ohnehin fragwürdig, weil sie kaum freiwillig zu erklären ist.

**4. Erforderlich und minimal?** Nein.

- Zum Bezahlen genügt der **Betrag**; das gekaufte Gericht muss nicht gespeichert bleiben.
- Zur Speiseplanung genügt eine **Zählung je Gericht und Tag** ganz ohne Personenbezug.
- Die Speicherdauer „bis zum Schulabschluss" ist bei Bezahlvorgängen nicht zu begründen. Nach Abrechnung und Widerspruchsfrist sind die Einzelbuchungen zu löschen.

**5. Transparent?** Aus dem Text nicht ersichtlich. Die Auswertungsabsicht ist den Betroffenen offenbar nicht mitgeteilt worden. Der Vorschlag, Auffälligkeiten zu melden, ist noch weniger transparent – er würde hinter dem Rücken der Betroffenen geschehen.

**6. Sicher?** Schwach. Ein **gemeinsames Passwort** für alle Lehrkräfte verletzt die Vertraulichkeit (jede kann alles sehen) und die Integrität (nach einer Änderung ist nicht mehr feststellbar, wer sie vorgenommen hat). Nötig wären persönliche Zugänge mit abgestuften Rechten und eine Sicht, die dem Mensapersonal nur Name und Guthaben zeigt. Zur Verfügbarkeit steht nichts – Sicherungskopien wären zu klären.

**7. Abwägung.** Das Bezahlsystem selbst ist vertretbar und praktisch. Nicht vertretbar sind die **Erweiterungen**: Die Speiseplanung erreicht ihr Ziel ohne Personenbezug, und die Meldung an die Sozialarbeit hat keine Rechtsgrundlage. Sie wäre auch inhaltlich fragwürdig, weil aus einem Kaufverhalten keine belastbaren Schlüsse auf eine Notlage folgen – und ein Fehlalarm eine Schülerin unter einen Verdacht stellt, den sie nicht ausräumen kann.

**Besserer Entwurf:** Buchungen nur mit Betrag speichern, eine getrennte anonyme Zählung je Gericht führen, Einzelbuchungen nach der Abrechnung löschen, persönliche Zugänge mit Rollen einrichten, die Speicherung im Voraus schriftlich erläutern.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Schutzziele auseinanderhalten**

Sag für jeden Vorfall, welches der drei Schutzziele **hauptsächlich** verletzt ist, und nenne eine technische Maßnahme dagegen.

a) Eine Praktikantin kann in der Festivaldatenbank die E-Mail-Adressen aller Besucherinnen lesen, obwohl sie nur Auftrittszeiten pflegen soll.

b) Beim Übertragen einer Ticketbuchung fällt der Server aus. Das Geld ist abgebucht, das Ticket aber nicht eingetragen.

c) Die Festplatte mit der Datenbank geht am Freitag vor dem Festival kaputt.

d) Jemand ändert nachträglich die Zuschauerzahl eines Auftritts, und niemand kann sagen, wer es war oder welcher Wert vorher dort stand.

e) Die tägliche Sicherungskopie liegt unverschlüsselt auf einer USB-Festplatte im unverschlossenen Büro.
:::

:::protect{password="db-8-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Vertraulichkeit.** Maßnahme: abgestufte Rechte, dazu eine Sicht, die nur die für ihre Aufgabe nötigen Spalten enthält – die Adressspalte kommt darin gar nicht vor.

b) **Integrität.** Der Datenbestand ist in einem widersprüchlichen Zwischenzustand. Maßnahme: eine **Transaktion** – beide Schritte gelten nur gemeinsam, sonst wird zurückgerollt.

c) **Verfügbarkeit.** Maßnahme: Sicherungskopien, und zwar getestete – eine Sicherung, deren Wiederherstellung nie erprobt wurde, ist keine.

d) **Integrität**, im Kern die Frage der Nachvollziehbarkeit. Maßnahme: persönliche Zugänge und ein Änderungsprotokoll. Das Protokoll ist allerdings selbst wieder personenbezogen – ein Beispiel dafür, dass eine Sicherheitsmaßnahme neue Datenschutzfragen aufwirft.

e) Wieder **Vertraulichkeit** – und zwar der häufigste Fall dieser Art in der Praxis. Die Datenbank mag geschützt sein, die Kopie ist es nicht. Maßnahme: Verschlüsselung und ein verschlossener Aufbewahrungsort. Merke: **Eine Sicherungskopie ist eine vollständige Kopie aller Daten** und braucht denselben Schutz wie das Original.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Der Widerspruch aushalten**

> „Wenn wir alles speichern, können wir später mehr auswerten. Löschen vernichtet Wissen. Also speichern wir sicherheitshalber alles und entscheiden hinterher, was wir brauchen."

a) Nenne den Grundsatz, gegen den diese Haltung verstößt, und erkläre ihn in eigenen Worten.

b) Nenne trotzdem zwei Situationen, in denen das Argument einen wahren Kern hat.

c) Formuliere eine Regel für den Umgang mit Daten, die beiden Seiten gerecht wird.

d) Ein Mitschüler sagt: „Ich habe nichts zu verbergen." Entgegne mit **zwei** Argumenten, von denen mindestens eines nicht auf ihn selbst zielt, sondern auf andere.
:::

:::protect{password="db-8-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Gegen die **Datenminimierung** – und mit der Formulierung „entscheiden hinterher" zugleich gegen die **Zweckbindung**. Der Zweck steht vor der Erhebung fest, nicht danach. Was man ohne Zweck sammelt, kann man nicht rechtfertigen, und was nicht gespeichert ist, kann weder gestohlen noch missbraucht werden.

b) Zum Beispiel:

- In der **Forschung** und bei Sicherungskopien lassen sich künftige Fragen tatsächlich nicht alle vorhersehen; deshalb gibt es dafür eigene Regeln, etwa Anonymisierung.
- **Historische Werte** wie die Lieferadresse einer alten Bestellung müssen erhalten bleiben, weil sie eine andere Tatsache festhalten als der heutige Stand. Das ist kein Sammeln auf Vorrat.

c) Etwa: „So viel erheben, wie der Zweck erfordert – so grob wie möglich, so lange wie nötig, und mit einer Löschfrist, die schon beim Anlegen feststeht." Der entscheidende Teil ist der letzte: Eine Löschfrist, die man später festlegen will, legt niemand fest.

d) Zwei mögliche Argumente:

- **Es geht nicht nur um dich.** In jeder Datenbank stehen auch Daten anderer – Kontakte, Mitschülerinnen, abgebildete Personen. Über deren Schutz entscheidest du mit, und sie wurden nicht gefragt.
- **Was harmlos ist, entscheidest nicht du allein und nicht für immer.** Datenbestände werden zusammengeführt, Zwecke ändern sich, und Angaben, die heute belanglos wirken, können in einem anderen Zusammenhang – bei einer Bewerbung, einer Versicherung, in einem anderen Land – erhebliche Folgen haben.
- Auch möglich: Datenschutz ist kein Schutz vor Entdeckung, sondern das Recht, selbst zu bestimmen, wer was über einen weiß. Wer nichts zu verbergen hat, hat trotzdem etwas zu entscheiden.

:::

<!--
Rückblick zum Inhaltsfeld Informatik, Mensch und Gesellschaft: Datenschutz und
Datensicherheit. Aufgabe 1 ist die vollständige Beurteilungsaufgabe (A) und
eignet sich als Leistungsnachweis; Aufgabe 3 zielt auf die Abwägung.
-->

---

## Selbsttest

::::multievent

**1. Welches Prinzip besagt, dass Daten nur für den Zweck verwendet werden dürfen, für den sie erhoben wurden?**

{r1{Datenminimierung}}

{r1{!Zweckbindung}}

{r1{Transparenz}}

{r1{Erforderlichkeit}}

{h{Der Name nennt das Wort Zweck.}}
{H{Richtig.}}

**2. Womit beginnt die Prüfung eines Falls?**

{r2{mit der Frage nach der Sicherheit}}

{r2{!mit der Frage, ob es überhaupt eine Rechtsgrundlage gibt}}

{r2{mit der Frage nach der Speicherdauer}}

{r2{mit der Abwägung}}

{h{Verarbeitung ist grundsätzlich verboten – was folgt daraus für die Reihenfolge?}}
{H{Richtig. Ohne Rechtsgrundlage ist alles Weitere gegenstandslos.}}

**3. Ein Mensasystem speichert, wer wann welches Gericht gekauft hat. Was ist das Hauptproblem?**

{r3{Die Datenbank wird zu groß.}}

{r3{!Für den Zweck des Bezahlens genügt der Betrag – das Gericht zu speichern ist nicht erforderlich und lässt Rückschlüsse zu.}}

{r3{Die Preise könnten sich ändern.}}

{r3{Es fehlt ein Primärschlüssel.}}

{h{Frag dich, was der Zweck wirklich braucht.}}
{H{Richtig – und aus der Gerichtewahl folgen Rückschlüsse auf Religion, Gesundheit und Geldbeutel.}}

**4. Ordne zu: Ein Serverausfall am Festivaltag verletzt welches Schutzziel?**

{r4{Vertraulichkeit}}

{r4{Integrität}}

{r4{!Verfügbarkeit}}

{r4{keines, das ist kein Sicherheitsproblem}}

{h{Befugte kommen an die Daten nicht heran.}}
{H{Richtig – Verfügbarkeit ist ein Schutzziel wie die anderen beiden.}}

**5. Wozu dient eine Transaktion?**

{r5{Sie beschleunigt Abfragen.}}

{r5{!Sie sorgt dafür, dass mehrere Anweisungen nur gemeinsam gelten oder gar nicht.}}

{r5{Sie verschlüsselt die Verbindung.}}

{r5{Sie legt eine Sicherungskopie an.}}

{h{Denk an die Buchung, bei der das Geld abgebucht, das Ticket aber nicht eingetragen wurde.}}
{H{Richtig – sie schützt die Integrität.}}

**6. Welche Maßnahmen erhöhen die Vertraulichkeit? Wähle alle zutreffenden aus.**

{c1{!persönliche Zugänge statt eines gemeinsamen Passworts}}

{c1{!eine Sicht, die nur die nötigen Spalten enthält}}

{c1{!eine verschlüsselte Sicherungskopie}}

{c1{eine zweite Kopie der Datenbank auf einem offenen Netzlaufwerk}}

{h{Eine der Maßnahmen macht das Gegenteil von dem, was sie soll.}}
{H{Richtig. Jede Kopie muss so gut geschützt sein wie das Original.}}

**7. Warum ist ein gemeinsames Passwort für alle Lehrkräfte auch ein Problem für die Integrität?**

{r6{Weil Passwörter regelmäßig gewechselt werden müssen.}}

{r6{!Weil sich nach einer Änderung nicht mehr feststellen lässt, wer sie vorgenommen hat.}}

{r6{Weil die Datenbank dadurch langsamer wird.}}

{r6{Weil es die Verfügbarkeit senkt.}}

{h{Integrität schließt die Nachvollziehbarkeit ein.}}
{H{Richtig.}}

::::
