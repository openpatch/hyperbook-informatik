---
title: Rückblick
index: 6
---

# Rückblick

Die Normalisierung ist das Handwerk, mit dem sich ein Entwurf **überprüfen** lässt. Modellieren beruht auf Erfahrung und Augenmaß – normalisieren dagegen folgt Regeln, die man nachrechnen kann. Deshalb ist sie ein beliebter Prüfungsgegenstand.

## Das kann ich jetzt

- [ ] Ich kann eine **funktionale Abhängigkeit** aufschreiben und in Worten erklären, was sie behauptet. ([6.1](./01-funktionale-abhaengigkeiten))
- [ ] Ich kann **volle** und **partielle** Abhängigkeit unterscheiden. ([6.1](./01-funktionale-abhaengigkeiten))
- [ ] Ich kann prüfen, ob eine Relation in der **1. Normalform** ist, und sie hineinbringen. ([6.2](./02-erste-normalform))
- [ ] Ich kann Verstöße gegen die **2. Normalform** finden und beseitigen. ([6.3](./03-zweite-normalform))
- [ ] Ich kann **transitive Abhängigkeiten** erkennen und die **3. Normalform** herstellen. ([6.4](./04-dritte-normalform))
- [ ] Ich kann sagen, was die Normalisierung kostet, und begründen, wann man bewusst davon abweicht. ([6.5](./05-normalisierung-beurteilen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Vom Rohzustand zur dritten Normalform**

Ein Musikverlag führt seine Aufnahmen in einer einzigen Relation:

```
aufnahme(titel_nr, studio, studio_ort, studio_telefon,
         interpretin, interpretin_land, instrumente, datum, dauer_sek)
```

- `titel_nr` ist die eindeutige Nummer einer Aufnahme.
- In `instrumente` stehen alle beteiligten Instrumente durch Kommas getrennt, etwa `Gitarre, Bass, Schlagzeug`.
- Ein Studio hat genau einen Ort und eine Telefonnummer.
- Eine Interpretin stammt aus genau einem Land.
- Jede Aufnahme entsteht in genau einem Studio mit genau einer Interpretin.

a) Ist die Relation in der 1. Normalform? Begründe und stelle sie gegebenenfalls her.

b) Schreib alle funktionalen Abhängigkeiten auf, die aus dem Text hervorgehen.

c) Prüfe die 2. Normalform. Begründe deine Antwort mit dem Schlüssel.

d) Prüfe die 3. Normalform. Nenne die transitiven Abhängigkeiten und beseitige sie.

e) Gib das fertige Schema an, mit Primär- und Fremdschlüsseln.
:::

::::collapsible{title="Tipp 1: zu c)"}

Die 2. Normalform kann nur dann verletzt sein, wenn der Schlüssel **zusammengesetzt** ist. Sieh dir also zuerst an, woraus der Primärschlüssel dieser Relation besteht – und zieh daraus den Schluss, bevor du zu suchen anfängst.

::::

::::collapsible{title="Tipp 2: zu d)"}

Eine transitive Abhängigkeit erkennst du an einer Kette:

```
Schlüssel → A → B
```

wobei A selbst kein Schlüssel ist. Such nach Attributen, die nicht von der Aufnahme abhängen, sondern von etwas anderem, das seinerseits in der Tabelle steht.

::::

:::protect{password="db-6-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Nein.** In `instrumente` steht mehr als ein Wert je Feld – das verletzt die 1. Normalform. Da eine Aufnahme mehrere Instrumente hat und ein Instrument in vielen Aufnahmen vorkommt, ist es eine n:m-Beziehung. Sie wird zu einer eigenen Relation:

```
instrument(instrument_id, bezeichnung)
besetzung(titel_nr → aufnahme, instrument_id → instrument)
```

b)

```
titel_nr → studio, interpretin, datum, dauer_sek
studio   → studio_ort, studio_telefon
interpretin → interpretin_land
```

c) **Ja, die 2. Normalform ist erfüllt.** Der Primärschlüssel ist `titel_nr` und besteht aus **einem** Attribut. Eine partielle Abhängigkeit kann es nur von einem Teil eines zusammengesetzten Schlüssels geben – hier gibt es keinen solchen Teil. Beachte aber: In der neuen Relation `besetzung` ist der Schlüssel zusammengesetzt; dort wäre die Frage erneut zu stellen. Da `besetzung` außer den beiden Schlüsselattributen nichts enthält, ist auch sie in der 2. Normalform.

d) **Nein.** Es gibt zwei transitive Abhängigkeiten:

```
titel_nr → studio → studio_ort, studio_telefon
titel_nr → interpretin → interpretin_land
```

`studio` und `interpretin` sind keine Schlüssel. Beide Ketten werden aufgelöst, indem die abhängigen Attribute in eigene Relationen wandern.

e)

```
studio(studio_id, name, ort, telefon)
interpretin(interpretin_id, name, land)
aufnahme(titel_nr, datum, dauer_sek,
         studio_id → studio, interpretin_id → interpretin)
instrument(instrument_id, bezeichnung)
besetzung(titel_nr → aufnahme, instrument_id → instrument)
```

Statt der künstlichen Schlüssel dürfen auch `studio` und `interpretin` selbst als Schlüssel dienen, solange die Namen eindeutig sind. Ein künstlicher Schlüssel ist trotzdem die bessere Wahl – Namen ändern sich, und ein Primärschlüssel sollte das nicht tun.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Die Auftrittsliste erklären**

Im Übungsbereich liegt die unnormalisierte Tabelle `auftrittsliste` mit 46 Zeilen – dieselben Auftritte, die in der Klangwiese-Datenbank auf sieben Tabellen verteilt sind.

a) Führe die erste Abfrage aus. Wie oft steht die Angabe zur Bühnenkapazität dort insgesamt, wie oft in der normalisierten Datenbank?

b) Welche Normalform verletzt die Spalte `genres`? Begründe.

c) Zeige an dieser Tabelle je einen Fall von Einfüge-, Änderungs- und Löschanomalie.

d) Nenne eine Frage, die sich mit `auftrittsliste` **schneller** beantworten lässt als mit der normalisierten Datenbank. Begründe.
:::

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="500px"}

```mysql Rohdaten.sql
SELECT band, buehne, buehnen_kapazitaet, genres FROM auftrittsliste LIMIT 12;

SELECT COUNT(*) AS zeilen, COUNT(DISTINCT buehne) AS buehnen FROM auftrittsliste;
```

:::

:::protect{password="db-6-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) In `auftrittsliste` steht die Kapazität **46-mal**, einmal je Auftritt – obwohl es nur **4** Bühnen gibt. In der normalisierten Datenbank steht sie viermal, in `buehne`. Das ist Redundanz in Reinform: dieselbe Tatsache 42-mal zu viel.

b) Die **1. Normalform**. In `genres` steht bei manchen Bands mehr als ein Wert, etwa `Indie, Elektro`. Ein Feld darf aber nur einen Wert enthalten.

c)

- **Einfügeanomalie:** Eine neue Bühne, auf der noch niemand gespielt hat, lässt sich nicht eintragen – es gäbe keinen Auftritt für die Zeile.
- **Änderungsanomalie:** Wird die Hauptbühne auf 9000 Plätze vergrößert, sind 14 Zeilen zu ändern. Wird eine vergessen, widerspricht sich die Tabelle.
- **Löschanomalie:** Löscht man alle Auftritte der Seebühne, verschwindet mit ihnen die Information, dass es diese Bühne gibt und wie groß sie ist.

d) Zum Beispiel „Welche Band spielte wann auf welcher Bühne?" – dafür genügt hier ein einfaches `SELECT` ohne jeden Verbund. In der normalisierten Datenbank sind drei Tabellen zu verbinden. Genau das ist der Preis der Normalisierung: weniger Redundanz, dafür mehr Verbünde. Bei sehr großen Datenbeständen, die nur ausgewertet und nicht mehr geändert werden, nimmt man Redundanz deshalb manchmal bewusst in Kauf.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Beurteilen statt normalisieren**

Entscheide für jeden Fall, ob hier ein Verstoß gegen eine Normalform vorliegt, und begründe. Wo keiner vorliegt, sag, warum die Angabe trotzdem doppelt vorkommt.

a) In `rechnungsposten` stehen `menge`, `einzelpreis` **und** `gesamtpreis`, wobei der Gesamtpreis das Produkt der beiden anderen ist.

b) In `bestellung` steht bei jeder Bestellung die Lieferadresse, obwohl die Kundin auch eine Adresse in `kundin` hat.

c) In `mitarbeiterin` steht die Abteilungsbezeichnung neben der Abteilungsnummer.

d) In `auftritt` steht sowohl `beginn` als auch `dauer_min`, obwohl sich daraus das Ende berechnen ließe – das aber nicht gespeichert wird.
:::

:::protect{password="db-6-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Kein Verstoß gegen eine Normalform**, aber trotzdem Redundanz: Der Gesamtpreis ist eine **berechnete** Angabe. Sie kann von den anderen abweichen, wenn jemand nur einen der Werte ändert. Normalformen erfassen diesen Fall nicht – man löst ihn, indem man den Wert weglässt und bei Bedarf berechnet. In der Praxis speichert man ihn manchmal trotzdem, um Rechenzeit zu sparen.

b) **Kein Verstoß, und die Doppelung ist gewollt.** Die Lieferadresse einer Bestellung ist ein **historischer Wert**: Sie soll festhalten, wohin damals geliefert wurde. Zieht die Kundin um, darf sich die alte Bestellung nicht rückwirkend ändern. Das ist keine Redundanz, sondern eine andere Tatsache, die zufällig gerade gleich lautet.

c) **Verstoß gegen die 3. Normalform.** Es gilt `personalnummer → abteilungsnummer → abteilungsbezeichnung`, und die Abteilungsnummer ist kein Schlüssel der Relation. Die Bezeichnung gehört in eine eigene Relation `abteilung`.

d) **Kein Verstoß.** Hier wird gerade **nichts** doppelt gespeichert: Das Ende steht nirgends, es wird bei Bedarf gerechnet. Genau so soll es sein.

**Der rote Faden:** Normalformen finden eine bestimmte Sorte von Redundanz – die, die aus funktionalen Abhängigkeiten entsteht. Sie finden weder berechnete Werte noch die Frage, ob eine Doppelung inhaltlich gewollt ist. Dafür braucht es immer noch ein Urteil.

:::

<!--
Rückblick zum Inhaltsfeld Daten und ihre Strukturierung: funktionale
Abhängigkeiten, 1.-3. Normalform, Beurteilung der Normalisierung (A).
Aufgabe 3 zielt bewusst auf die Grenzen des Verfahrens.
-->

---

## Selbsttest

::::multievent

**1. Was behauptet die funktionale Abhängigkeit A nach B?**

{r1{B kommt in der Tabelle häufiger vor als A.}}

{r1{!Zu jedem Wert von A gehört genau ein Wert von B.}}

{r1{A und B sind beide Schlüssel.}}

{r1{B lässt sich aus A berechnen.}}

{h{Denk an: Postleitzahl bestimmt den Ort.}}
{H{Richtig – zu jedem A-Wert gibt es genau einen B-Wert.}}

**2. Was verlangt die erste Normalform?**

{r2{Es darf keine Redundanz geben.}}

{r2{!Jedes Feld enthält genau einen Wert.}}

{r2{Der Schlüssel darf nicht zusammengesetzt sein.}}

{r2{Alle Attribute hängen vom Schlüssel ab.}}

{h{Es geht um den Inhalt eines einzelnen Feldes.}}
{H{Richtig – kommagetrennte Listen sind der klassische Verstoß.}}

**3. Wann kann die zweite Normalform überhaupt verletzt sein?**

{r3{immer}}

{r3{!nur bei einem zusammengesetzten Primärschlüssel}}

{r3{nur bei einem künstlichen Schlüssel}}

{r3{nur wenn Fremdschlüssel vorkommen}}

{h{Es geht um Abhängigkeiten von einem Teil des Schlüssels.}}
{H{Richtig – bei einem einteiligen Schlüssel gibt es keinen Teil.}}

**4. Wie sieht eine transitive Abhängigkeit aus?**

{r4{Schlüssel bestimmt A und Schlüssel bestimmt B}}

{r4{!Schlüssel bestimmt A, und A bestimmt B, wobei A kein Schlüssel ist}}

{r4{A bestimmt den Schlüssel}}

{r4{zwei Attribute bestimmen sich gegenseitig}}

{h{Es ist eine Kette über einen Umweg.}}
{H{Richtig – der Umweg über A ist das Kennzeichen.}}

**5. Ordne die Verstöße den Normalformen zu: welcher Verstoß gehört zur 3. Normalform?**

{r5{ein Feld mit mehreren Werten}}

{r5{ein Attribut, das nur vom halben Schlüssel abhängt}}

{r5{!ein Attribut, das von einem Nichtschlüsselattribut abhängt}}

{r5{ein fehlender Primärschlüssel}}

{h{Die dritte Normalform kümmert sich um Abhängigkeiten zwischen Nichtschlüsselattributen.}}
{H{Richtig.}}

**6. Was ist der Preis der Normalisierung?**

{c1{!Abfragen brauchen mehr Verbünde.}}

{c1{!Der Entwurf wird unübersichtlicher, weil es mehr Tabellen gibt.}}

{c1{Die Daten werden ungenauer.}}

{c1{Es lassen sich weniger Fragen beantworten.}}

{h{Zwei der Angebote treffen zu – zwei sind schlicht falsch.}}
{H{Richtig. Beantworten lässt sich hinterher mehr, nicht weniger.}}

**7. Eine Bestellung speichert die Lieferadresse, obwohl die Kundin schon eine Adresse hat. Ist das Redundanz?**

{r6{Ja, ein klarer Verstoß gegen die 3. Normalform.}}

{r6{!Nein, es ist ein historischer Wert – er soll sich beim Umzug nicht mitändern.}}

{r6{Ja, aber sie wird in Kauf genommen.}}

{r6{Nur wenn beide Adressen gleich lauten.}}

{h{Frag dich, was passieren soll, wenn die Kundin nächstes Jahr umzieht.}}
{H{Richtig. Zwei Angaben, die gerade gleich lauten, sind nicht dieselbe Tatsache.}}

::::
