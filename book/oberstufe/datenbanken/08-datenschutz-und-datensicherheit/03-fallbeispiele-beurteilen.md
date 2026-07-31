---
title: Fallbeispiele beurteilen
index: 3
---

# Fallbeispiele beurteilen

Die Prinzipien zu kennen ist das eine. Sie auf einen konkreten Fall anzuwenden ist eine eigene Fertigkeit – und die lässt sich üben.

## Ein Prüfschema

:::snippet{#merken}
**Schritt für Schritt durch einen Fall:**

1. **Welche Daten?** Sind sie personenbezogen? Sind sie besonders schützenswert (Gesundheit, Herkunft, politische Meinung)?
2. **Welcher Zweck?** Wofür wurden sie erhoben, wofür sollen sie jetzt verwendet werden? Ist das derselbe Zweck?
3. **Welche Rechtsgrundlage?** Gesetz, Vertrag oder Einwilligung – oder keine?
4. **Erforderlich und minimal?** Ginge es mit weniger Daten, gröberen Daten oder ganz ohne Personenbezug?
5. **Transparent?** Wissen die Betroffenen davon? Können sie widersprechen?
6. **Sicher?** Wie steht es um Vertraulichkeit, Integrität und Verfügbarkeit?
7. **Abwägung und Urteil.** Welche Interessen stehen gegeneinander? Wie lautet dein Urteil – und was wäre eine bessere Lösung?

Schritt 7 ist der eigentliche Kern. Wer nur Verstöße aufzählt, hat beschrieben, nicht beurteilt.
:::

## Fall 1: Die Schul-App

:::snippet{#aufgabe}
Eine Schule führt eine App ein, über die Lehrkräfte Hausaufgaben und Noten eintragen. Eltern und Schülerinnen sehen ihre eigenen Daten.

Aus dem Datenbankschema der App:

```
schueler(schueler_id, name, geburtsdatum, adresse, telefon, foto, religionszugehoerigkeit)
note(note_id, schueler_id→schueler, fach, wert, datum, kommentar)
zugriff(zugriff_id, schueler_id→schueler, lehrkraft_id, zeitpunkt, aktion)
```

Der Anbieter der App sitzt in den USA und wertet die Nutzungsdaten aus, „um das Produkt zu verbessern".

Beurteile den Fall mit dem Prüfschema. Gehe besonders auf ein:

a) die Spalte `religionszugehoerigkeit`

b) die Tabelle `zugriff`

c) die Auswertung durch den Anbieter
:::

::::collapsible{title="Tipp zu b)"}

Die Tabelle `zugriff` ist zwiespältig. Frage dich: Welchem Schutzziel dient sie – und welches Problem schafft sie?

::::

:::protect{password="db-8-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Die Religionszugehörigkeit ist eine besondere Kategorie personenbezogener Daten** und darf nur unter engen Voraussetzungen verarbeitet werden.

Für eine Hausaufgaben- und Notenapp ist sie in keiner Weise erforderlich. Selbst wenn die Schule sie für die Zuordnung zum Religionsunterricht benötigt: Diese Zuordnung gehört in die Schulverwaltung, nicht in eine App, die Eltern und Lehrkräfte täglich öffnen. **Verstoß gegen Datenminimierung und Erforderlichkeit.**

Das bessere Modell: Statt der Religionszugehörigkeit ein Attribut `kursbelegung` – die App muss wissen, dass jemand in Kurs 12 ist, nicht warum.

b) `zugriff` protokolliert, welche Lehrkraft wann was angesehen hat. Das ist **zweischneidig**:

- **Dafür:** Es dient der Integrität und der Vertraulichkeit. Ein Missbrauch – etwa das Nachschlagen von Noten fremder Klassen – lässt sich nachweisen. Ohne Protokoll ist eine Rechtevergabe kaum durchsetzbar.
- **Dagegen:** Es entsteht ein vollständiges Verhaltensprofil der Lehrkräfte. Wer wann wie lange arbeitet, ist daraus ablesbar. Das sind ihrerseits personenbezogene Daten, und eine Leistungskontrolle wäre ein neuer Zweck.

**Urteil:** Das Protokoll ist begründbar, braucht aber (1) eine kurze Löschfrist, (2) eine ausdrückliche Zweckbindung „nur zur Aufklärung konkreter Missbrauchsverdachtsfälle", (3) Transparenz gegenüber den Lehrkräften und (4) ein Vier-Augen-Prinzip beim Zugriff auf das Protokoll selbst.

c) **Verstoß gegen Zweckbindung und wahrscheinlich gegen das Verbot mit Erlaubnisvorbehalt.** „Produktverbesserung" ist kein hinreichend bestimmter Zweck. Bei Daten von Minderjährigen gelten zudem strengere Maßstäbe.

Hinzu kommt der Drittlandtransfer: Eine Übermittlung in die USA braucht eine eigene Rechtsgrundlage. Und selbst wo sie zulässig ist, bleibt die Frage der Vertraulichkeit – die Schule gibt die Kontrolle über die Daten aus der Hand.

**Insgesamt:** Die App ist in dieser Form nicht einsetzbar. Der Weg zu einer zulässigen Variante ist aber kurz: Religionszugehörigkeit streichen, Protokoll begrenzen und löschen, Vertrag mit dem Anbieter, der jede Nutzung außerhalb des Schulzwecks ausschließt – oder ein Anbieter, der in der EU hostet.

:::

## Fall 2: Das Festival-Bändchen

:::snippet{#aufgabe}
Für das nächste Jahr plant die Klangwiese Bändchen mit Funkchip. Jedes Bändchen ist einem Ticket zugeordnet. Damit sollen Besucherinnen bargeldlos bezahlen und den Einlass passieren.

Das Team schlägt vor, zusätzlich zu speichern, **wann wer welche Bühne betreten hat** – „damit wir nächstes Jahr die Bühnen besser planen können".

a) Beurteile den Vorschlag mit dem Prüfschema.

b) Entwirf eine Variante, die den Planungszweck erfüllt, aber datensparsam ist. Gib das :t[Relationenschema]{#relationenschema} an.

c) Nenne für deine Variante je ein Beispiel, wie Vertraulichkeit, Integrität und Verfügbarkeit gefährdet sein könnten.
:::

::::collapsible{title="Tipp zu b)"}

Frage: Braucht die Bühnenplanung wirklich die Information *wer*, oder genügt *wie viele*?

::::

:::protect{password="db-8-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

1. **Daten:** Bewegungsdaten, verknüpft mit einem personalisierten Ticket – also personenbezogen. Bewegungsprofile sind besonders eingriffsintensiv: Aus „war bei Band X und Y, nicht bei Z" lassen sich Rückschlüsse auf Vorlieben und auf Begleitpersonen ziehen.
2. **Zweck:** Bühnenplanung. Erhoben wurden die Daten für Ticketverkauf und Einlass – ein **anderer** Zweck.
3. **Rechtsgrundlage:** Ohne ausdrückliche, freiwillige Einwilligung keine. Freiwillig ist sie nur, wenn man auch ohne Bändchen aufs Festival kommt.
4. **Erforderlich?** **Nein.** Für die Bühnenplanung braucht man Besucherzahlen je Bühne und Zeitfenster – nicht, welche Person wo war. Der Personenbezug leistet für den genannten Zweck **gar nichts**.
5. **Transparenz:** Müsste vor dem Kauf klar erkennbar sein, nicht in der Datenschutzerklärung vergraben.
6. **Sicherheit:** Ein vollständiges Bewegungsprofil aller Besucherinnen ist ein hochattraktives Angriffsziel.
7. **Urteil:** Der Vorschlag ist in dieser Form abzulehnen. Er verarbeitet personenbezogene Daten für einen Zweck, der ohne Personenbezug genauso gut erreichbar ist. Das ist der klarste denkbare Verstoß gegen die Erforderlichkeit.

b) Zählen statt zuordnen:

```
buehnenzaehlung(buehne_id→buehne, zeitfenster, anzahl_eintritte)
```

Das Lesegerät zählt nur hoch, ohne die Bändchennummer zu speichern. Ein Zeitfenster von 15 Minuten genügt für die Planung.

Das ist keine Anonymisierung im Nachhinein, sondern der bessere Fall: Der Personenbezug entsteht **gar nicht erst**. Man kann keine Daten verlieren, die man nie hatte.

c)

- **Vertraulichkeit:** Selbst diese Zahlen können heikel sein, wenn ein Zeitfenster nur einen einzigen Eintritt zählt – dann ist die Person über andere Quellen wieder bestimmbar. Abhilfe: Zeitfenster oder Zählwerte erst ab einer Mindestgröße ausgeben.
- **Integrität:** Ein defektes Lesegerät zählt doppelt oder gar nicht. Die Planung des nächsten Jahres beruht dann auf falschen Zahlen, ohne dass es jemand merkt. Abhilfe: Plausibilitätsprüfungen gegen die verkauften Tickets.
- **Verfügbarkeit:** Fällt das Zahlungssystem der Bändchen aus, kann niemand mehr etwas kaufen. Abhilfe: ein Rückfallverfahren, das ohne Datenbank auskommt – zum Beispiel Barzahlung.

:::

## Fall 3: Die eigene Datenbank

:::snippet{#aufgabe}
Sieh dir die Festivaldatenbank noch einmal insgesamt an.

a) Erstelle eine Übersicht: Welche Tabellen enthalten personenbezogene Daten, welche nicht?

b) Formuliere für die Klangwiese ein **Löschkonzept**: Welche Daten werden wann gelöscht, welche dürfen bleiben? Begründe jede Frist.

c) Welche der Auswertungen aus [Kapitel 4](../04-gruppieren-und-auswerten) ließen sich auch nach Umsetzung deines Löschkonzepts noch durchführen?
:::

:::protect{password="db-8-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Tabelle | personenbezogen? |
| --- | --- |
| `band`, `genre`, `band_genre`, `buehne`, `auftritt` | nein – Angaben über Organisationen und Veranstaltungen |
| `person`, `mitgliedschaft` | ja – Musikerinnen und Musiker |
| `besucherin`, `ticket`, `bewertung` | ja – Besucherinnen und Besucher |

Bemerkenswert: `bewertung` enthält keinen Namen, aber über `besucher_id` einen direkten Bezug. Die Tabelle ist damit genauso personenbezogen wie `besucherin` selbst.

b) Ein möglicher Vorschlag:

| Daten | Frist | Begründung |
| --- | --- | --- |
| `besucherin.email` | 4 Wochen nach dem Festival | wird nur zur Ticketzustellung gebraucht |
| `besucherin.plz`, `geburtsjahr` | sofort nach dem Kauf | für Verkauf und Einlass nicht erforderlich; das Alter wird beim Kauf geprüft, nicht gespeichert |
| `besucherin.vorname`, `nachname` | 4 Wochen nach dem Festival | Einlasskontrolle ist abgeschlossen |
| `ticket` mit Preis und Kaufdatum | 10 Jahre | steuerliche Aufbewahrungsfrist – aber **ohne** Personenbezug, `besucher_id` wird entfernt |
| `bewertung` | sofort nach dem Festival vom Personenbezug trennen | für die Auswertung genügt die Auftrittsnummer |
| `person`, `mitgliedschaft` | solange die Zusammenarbeit besteht | Vertragsdaten |
| alle übrigen Tabellen | unbegrenzt | kein Personenbezug |

Der Kern des Konzepts: Nicht alles wird gelöscht, aber der **Personenbezug** wird so früh wie möglich gekappt.

c) Fast alle. Auftritte je Bühne, Bewertungsdurchschnitt je Band, Umsatz je Ticketkategorie, Zuschauerzahlen – nichts davon braucht die Zuordnung zu einzelnen Menschen.

Nicht mehr möglich wären: „Wie viele Tickets hat eine einzelne Person gekauft?" und „Welche Bands mögen die unter 30-Jährigen?". Beim zweiten lohnt die Nachfrage, ob man die Altersangabe nicht **beim Kauf** in eine grobe Gruppe einordnen könnte – dann bliebe die Auswertung möglich, ohne dass ein Geburtsjahr gespeichert wird.

**Genau das ist die Denkrichtung, auf die es ankommt:** nicht „welche Daten müssen wir löschen", sondern „welche brauchen wir wirklich in dieser Genauigkeit".

:::

<!--
KLP QPh, Informatik, Mensch und Gesellschaft: beurteilen Fallbeispiele auf
Grundlage der Grundprinzipien der Datensicherheit und des Datenschutzes (A).
Diese Lektion ist der zentrale Ort für diese Kompetenzerwartung.
-->

---

## Selbsttest

::::multievent

**1. Was ist der wichtigste Schritt beim Beurteilen eines Fallbeispiels?**

{r1{alle Verstöße aufzählen}}

{r1{!die widerstreitenden Interessen abwägen und ein begründetes Urteil formulieren}}

{r1{die betroffenen Tabellen benennen}}

{r1{das Gesetz zitieren}}

{h{Wer nur Verstöße aufzählt, hat beschrieben.}}
{H{Richtig. Zum Beurteilen gehört das Urteil – und ein Vorschlag, wie es besser ginge.}}

**2. Warum ist ein Bewegungsprofil für die Bühnenplanung nicht erforderlich?**

{r2{Weil Bewegungsdaten immer verboten sind.}}

{r2{!Weil der Zweck nur Zahlen braucht, nicht die Zuordnung zu Personen.}}

{r2{Weil die Datenbank dafür zu klein ist.}}

{r2{Weil die Funkchips zu ungenau sind.}}

{h{Was leistet der Personenbezug für die Frage „wie voll wird die Waldbühne"?}}
{H{Richtig – gar nichts. Genau das prüft die Erforderlichkeit.}}

**3. Warum ist die Tabelle bewertung personenbezogen, obwohl kein Name darin steht?**

{r3{Weil Punkte persönliche Meinungen sind.}}

{r3{!Weil besucher_id direkt auf eine Person verweist.}}

{r3{Weil sie viele Zeilen hat.}}

{r3{Sie ist nicht personenbezogen.}}

{h{Ein Verbund mit besucherin genügt.}}
{H{Richtig. Ein Fremdschlüssel auf eine Person macht die Tabelle personenbezogen.}}

**4. Welche Vorteile hat es, den Personenbezug gar nicht erst entstehen zu lassen?** (Mehrfachauswahl)

{c1{!Man kann keine Daten verlieren, die man nie hatte.}}

{c1{!Es braucht keine Löschfristen für etwas, das nicht gespeichert wird.}}

{c1{!Ein Einbruch in die Datenbank erbeutet nichts Personenbezogenes.}}

{c1{Die Auswertung wird dadurch genauer.}}

{h{Gröbere Daten sind nicht genauer – sie reichen nur für den Zweck aus.}}
{H{Richtig.}}

**5. Ein Zugriffsprotokoll schützt die Integrität und schafft zugleich ein Problem. Welches?**

{r4{Es verbraucht Speicherplatz.}}

{r4{!Es enthält selbst personenbezogene Daten und erlaubt ein Verhaltensprofil.}}

{r4{Es verlangsamt die Datenbank.}}

{r4{Es lässt sich fälschen.}}

{h{Wer wird in dem Protokoll erfasst?}}
{H{Richtig. Deshalb braucht es kurze Fristen, klare Zweckbindung und Transparenz.}}

**6. Was gehört in ein Löschkonzept?** (Mehrfachauswahl)

{c2{!für jede Datenart eine Frist}}

{c2{!eine Begründung für jede Frist}}

{c2{!die Unterscheidung zwischen Löschen und Entfernen des Personenbezugs}}

{c2{eine Liste der Zugriffsberechtigten}}

{h{Die Berechtigten gehören in ein Rechtekonzept, nicht ins Löschkonzept.}}
{H{Richtig.}}

::::
