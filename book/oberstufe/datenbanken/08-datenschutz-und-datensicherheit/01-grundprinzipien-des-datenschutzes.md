---
title: Grundprinzipien des Datenschutzes
index: 1
---

# Grundprinzipien des Datenschutzes

## Personenbezogene Daten

:::snippet{#definition}
**Personenbezogene Daten** sind alle Angaben, die sich auf eine bestimmte oder bestimmbare natürliche Person beziehen.

Entscheidend ist das Wort **bestimmbar**: Es kommt nicht darauf an, ob der Name dabeisteht, sondern ob sich mit vertretbarem Aufwand herausfinden lässt, um wen es geht.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Daten.sql
SELECT * FROM besucherin LIMIT 20;

SELECT besucher_id, geburtsjahr, plz FROM besucherin LIMIT 20;
```

:::

:::snippet{#aufgabe}
Die zweite Abfrage lässt Vorname, Nachname und E-Mail weg.

a) Sind die verbliebenen Daten noch personenbezogen? Begründe.

b) Wie viele Menschen in der Datenbank teilen sich dieselbe Kombination aus Geburtsjahr und Postleitzahl? Finde es mit einer Abfrage heraus.

c) Was folgt daraus für die Frage aus a)?
:::

::::collapsible{title="Tipp zu b)"}

Gruppiere nach beiden Spalten und zähle. Interessant sind die Gruppen mit genau einer Person.

::::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Eindeutig.sql
SELECT geburtsjahr, plz, COUNT(*) AS personen
  FROM besucherin
 GROUP BY geburtsjahr, plz
 ORDER BY personen DESC;

SELECT COUNT(*) AS eindeutige_kombinationen
  FROM (SELECT geburtsjahr, plz
          FROM besucherin
         GROUP BY geburtsjahr, plz
        HAVING COUNT(*) = 1) AS einzeln;
```

:::

:::protect{password="db-8-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ja. Geburtsjahr und Postleitzahl zusammen grenzen die Menge der infrage kommenden Personen stark ein. Wer zusätzlich weiß, wer aus dem Bekanntenkreis auf dem Festival war, kann Zeilen zuordnen.

b) Es gibt 115 verschiedene Kombinationen aus Geburtsjahr und Postleitzahl. Bei **110** davon gehört genau **eine** Person dazu. Für 110 der 120 Menschen ist die Zeile damit eindeutig – das Weglassen des Namens hat fast nichts bewirkt.

c) Das Entfernen von Namensspalten ist **keine** Anonymisierung. Man nennt das Ergebnis **pseudonymisiert**: Der direkte Bezug ist entfernt, der Rückschluss bleibt möglich.

Echte Anonymisierung erfordert, dass sich die Zeilen nicht mehr einzelnen Personen zuordnen lassen – zum Beispiel durch Vergröbern (Geburtsjahrzehnt statt Geburtsjahr, erste zwei Ziffern der Postleitzahl) oder durch Zusammenfassen zu Gruppen ab einer Mindestgröße.

:::

:::snippet{#brain}
Der bekannteste Fall dazu stammt aus den 1990er Jahren: Ein US-Bundesstaat veröffentlichte Krankenversicherungsdaten seiner Angestellten „anonymisiert" – ohne Namen und Adressen, aber mit Geburtsdatum, Geschlecht und Postleitzahl.

Die Informatikerin Latanya Sweeney kaufte für 20 Dollar das öffentliche Wählerverzeichnis, verband beide Datensätze über diese drei Merkmale und fand darin die Krankenakte des Gouverneurs. Ihre spätere Untersuchung ergab, dass sich ein großer Teil der US-Bevölkerung allein über Geburtsdatum, Geschlecht und Postleitzahl eindeutig bestimmen lässt.

Übertrage das auf die Festivaldatenbank: Welche zusätzliche Quelle bräuchte man, um die Bewertungen einzelnen Personen zuzuordnen?
:::

## Die fünf Grundprinzipien

:::snippet{#definition}
| Prinzip | Bedeutung |
| --- | --- |
| **Verbot mit Erlaubnisvorbehalt** | Die Verarbeitung personenbezogener Daten ist grundsätzlich verboten – erlaubt nur, wenn ein Gesetz sie gestattet oder die betroffene Person eingewilligt hat. |
| **Datenminimierung** | Es werden nur die Daten erhoben, die für den Zweck wirklich nötig sind. |
| **Zweckbindung** | Daten dürfen nur für den Zweck verwendet werden, für den sie erhoben wurden. |
| **Transparenz** | Betroffene müssen wissen, wer welche Daten über sie zu welchem Zweck verarbeitet. |
| **Erforderlichkeit** | Auch innerhalb eines erlaubten Zwecks darf nur so viel verarbeitet werden, wie zur Erreichung nötig ist – zeitlich und inhaltlich. |
:::

:::snippet{#merken}
Die Reihenfolge, in der man prüft:

1. **Gibt es überhaupt eine Rechtsgrundlage?** (Verbot mit Erlaubnisvorbehalt) – wenn nein, ist alles Weitere gegenstandslos.
2. **Welche Daten braucht der Zweck?** (Datenminimierung, Erforderlichkeit)
3. **Wird für etwas anderes verwendet?** (Zweckbindung)
4. **Wissen die Betroffenen davon?** (Transparenz)
:::

## Die Festivaldatenbank prüfen

:::snippet{#aufgabe}
Der Zweck der Datenerhebung ist: **Tickets verkaufen und Einlass gewähren.**

Gehe die Tabelle `besucherin` Spalte für Spalte durch. Ist jede Angabe für diesen Zweck erforderlich?

`vorname`, `nachname`, `geburtsjahr`, `plz`, `email`

Begründe bei jeder Spalte mit einem der fünf Prinzipien.
:::

:::protect{password="db-8-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Spalte | Beurteilung |
| --- | --- |
| `vorname`, `nachname` | **Erforderlich**, wenn Tickets personalisiert sind und am Einlass mit dem Ausweis abgeglichen werden. Bei nicht personalisierten Tickets wäre schon das zu viel. |
| `geburtsjahr` | **Nur teilweise erforderlich.** Für das Förderticket muss ein Alter nachgewiesen werden – dafür genügt aber die Angabe „unter 27: ja/nein" zum Kaufzeitpunkt. Das genaue Geburtsjahr aller Besucherinnen zu speichern verstößt gegen die Datenminimierung. |
| `plz` | **Nicht erforderlich.** Für Verkauf und Einlass spielt der Wohnort keine Rolle. Wird sie für die Planung des Shuttlebusses erhoben, ist das ein **anderer Zweck**, der eine eigene Grundlage braucht – und für den eine grobe Regionsangabe genügen würde. |
| `email` | **Erforderlich**, um das Ticket zuzustellen. |

Bemerkenswert: Die Spalte `plz` ist die einzige, die für den genannten Zweck vollständig überflüssig ist – und zugleich diejenige, die in Verbindung mit dem Geburtsjahr die Wiedererkennbarkeit erzeugt. Das ist typisch. Datenminimierung ist nicht nur eine rechtliche Pflicht, sondern der wirksamste technische Schutz: **Daten, die man nicht hat, kann niemand missbrauchen.**

:::

## Zweckbindung im Konflikt

:::snippet{#aufgabe}
Nach dem Festival kommen vier Vorschläge aus dem Organisationsteam. Beurteile jeden anhand der fünf Prinzipien. Nenne jeweils das verletzte Prinzip – oder begründe, warum der Vorschlag zulässig ist.

a) „Wir schicken allen Besucherinnen eine E-Mail mit dem Programm des nächsten Jahres."

b) „Wir werten aus, aus welchen Postleitzahlen die Leute kommen, und planen danach die Shuttlebusse."

c) „Ein Sponsor möchte die E-Mail-Adressen kaufen. Das Geld brauchen wir dringend."

d) „Wir behalten alle Daten, falls wir sie später einmal brauchen."
:::

::::collapsible{title="Tipp"}

Frage bei jedem Vorschlag: Für welchen Zweck wurden die Daten erhoben? Ist das hier derselbe?

::::

:::protect{password="db-8-1-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Verstoß gegen die Zweckbindung.** Die Adresse wurde zur Ticketzustellung erhoben, nicht zur Werbung. Zulässig wird es nur mit einer gesonderten Einwilligung, die beim Kauf ausdrücklich und getrennt eingeholt wurde – nicht versteckt in einem Häkchen für die AGB.

b) **Verstoß gegen die Zweckbindung**, aber ein heilbarer. Die Auswertung ist nachvollziehbar und im Interesse der Besucherinnen. Sauber wäre: den Zweck „Planung der Anreise" **vorher** nennen (Transparenz) und nur eine grobe Regionsangabe erheben (Datenminimierung). Für eine reine Bedarfsplanung reichen anonymisierte, aggregierte Zahlen völlig – dafür braucht es die Zuordnung zu einzelnen Personen gar nicht.

c) **Verstoß gegen Zweckbindung und Verbot mit Erlaubnisvorbehalt.** Der Verkauf von Kontaktdaten an Dritte hat mit dem Erhebungszweck nichts zu tun und ist ohne ausdrückliche Einwilligung unzulässig. Die finanzielle Lage ist keine Rechtsgrundlage.

d) **Verstoß gegen die Erforderlichkeit.** Daten dürfen nur so lange gespeichert werden, wie der Zweck es verlangt. Ein Zweck, den man noch nicht kennt, ist kein Zweck. Nach der Veranstaltung und Ablauf der steuerlichen Aufbewahrungsfristen sind die Daten zu löschen.

:::

<!--
KLP QPh, Informatik, Mensch und Gesellschaft: beurteilen Fallbeispiele auf
Grundlage der Grundprinzipien der Datensicherheit und des Datenschutzes (A).
Inhaltlicher Schwerpunkt: Verbot mit Erlaubnisvorbehalt, Datenminimierung,
Zweckbindung, Transparenz, Erforderlichkeit.
-->

---

## Selbsttest

::::multievent

**1. Wann sind Daten personenbezogen?**

{r1{wenn ein Name darin vorkommt}}

{r1{!wenn sich die Person damit bestimmen lässt}}

{r1{wenn sie in einer Datenbank stehen}}

{r1{wenn sie eine E-Mail-Adresse enthalten}}

{h{Geburtsjahr und Postleitzahl allein reichten in unserem Beispiel fast immer aus.}}
{H{Richtig. Es kommt auf die Bestimmbarkeit an, nicht auf den Namen.}}

**2. Was bedeutet „Verbot mit Erlaubnisvorbehalt"?**

{r2{Alles ist erlaubt, was nicht verboten ist.}}

{r2{!Die Verarbeitung ist verboten, außer ein Gesetz oder eine Einwilligung erlaubt sie.}}

{r2{Man braucht für jede Abfrage eine Erlaubnis.}}

{r2{Daten dürfen nur mit Passwort verarbeitet werden.}}

{h{Was ist der Ausgangspunkt – Erlaubnis oder Verbot?}}
{H{Richtig. Ohne Rechtsgrundlage geht gar nichts.}}

**3. Ein Festival schickt Werbung an Adressen, die für die Ticketzustellung erhoben wurden. Welches Prinzip ist verletzt?**

{r3{Datenminimierung}}

{r3{!Zweckbindung}}

{r3{Transparenz}}

{r3{Verbot mit Erlaubnisvorbehalt}}

{h{Die Daten sind da und wurden rechtmäßig erhoben – aber wofür?}}
{H{Richtig. Ein neuer Zweck braucht eine neue Grundlage.}}

**4. Warum ist Datenminimierung auch technisch der beste Schutz?**

{r4{Weil weniger Daten schneller abgefragt sind.}}

{r4{!Weil Daten, die es nicht gibt, auch nicht missbraucht werden können.}}

{r4{Weil kleine Datenbanken sicherer verschlüsselt sind.}}

{r4{Weil das Gesetz es so vorschreibt.}}

{h{Was kann bei einem Einbruch aus einer Spalte gestohlen werden, die es nicht gibt?}}
{H{Richtig. Kein Schutzmechanismus ist so zuverlässig wie ein fehlendes Datenfeld.}}

**5. Was ist der Unterschied zwischen anonymisiert und pseudonymisiert?**

{r5{Es gibt keinen.}}

{r5{!Bei pseudonymisierten Daten ist der Rückschluss auf die Person noch möglich.}}

{r5{Anonymisierte Daten sind verschlüsselt.}}

{r5{Pseudonymisierte Daten enthalten keine Namen mehr, anonymisierte schon.}}

{h{Was hat das Weglassen der Namensspalten in unserem Beispiel gebracht?}}
{H{Richtig – bei 110 von 120 Zeilen fast nichts.}}

**6. Welche Spalte der Tabelle besucherin ist für den Zweck „Tickets verkaufen und Einlass gewähren" am ehesten überflüssig?**

{r6{email}}

{r6{nachname}}

{r6{!plz}}

{r6{vorname}}

{h{Welche Angabe braucht man weder zur Zustellung noch am Einlass?}}
{H{Richtig – und ausgerechnet sie erzeugt zusammen mit dem Geburtsjahr die Wiedererkennbarkeit.}}

::::
