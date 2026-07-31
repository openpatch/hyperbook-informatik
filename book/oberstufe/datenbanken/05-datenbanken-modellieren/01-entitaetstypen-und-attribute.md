---
title: Entitätstypen und Attribute
index: 1
---

# Entitätstypen und Attribute

Am Anfang jeder Datenbank steht ein Text: die Beschreibung dessen, was gespeichert werden soll. Der erste Schritt besteht darin, aus diesem Text die Bausteine herauszulesen.

## Der Ausgangstext

:::snippet{#beispiel}
**Die Klangwiese, wie das Organisationsteam sie beschrieben hat**

„Auf unserem Festival treten **Bands** auf. Zu jeder Band merken wir uns den Namen, das Gründungsjahr und das Herkunftsland. In einer Band spielen mehrere **Personen** mit Vorname, Nachname, Geburtsjahr und Land; wir halten fest, welches Instrument jemand in welcher Band spielt und seit wann.

Jede Band gehört zu einem oder mehreren **Genres**, und zu einem Genre gehören natürlich viele Bands.

Das Festival hat vier **Bühnen** mit Namen, Fassungsvermögen und der Angabe, ob sie überdacht sind. Ein **Auftritt** findet an einem Datum zu einer Uhrzeit auf einer Bühne statt, dauert eine bestimmte Zahl von Minuten, und wir zählen die Zuschauer."
:::

## Entitäten und Entitätstypen

:::snippet{#definition}
Eine **Entität** ist ein einzelnes Ding der realen Welt, über das Daten gespeichert werden sollen – die Band *Nordlicht*, die Waldbühne, Amira Yildiz.

Ein **Entitätstyp** fasst alle gleichartigen Entitäten zusammen: *Band*, *Bühne*, *Person*. Aus einem Entitätstyp wird später eine Tabelle.

Ein **Attribut** ist eine Eigenschaft, die alle Entitäten eines Typs haben: der Name einer Band, das Fassungsvermögen einer Bühne.
:::

:::snippet{#merken}
**Faustregel für den ersten Durchgang:**

- **Substantive** im Plural, über die mehreres gespeichert wird → Kandidaten für Entitätstypen
- **Eigenschaften** dieser Substantive → Attribute
- **Verben**, die zwei Substantive verbinden → Beziehungen (nächste Lektion)

Die Regel ist ein Startpunkt, kein Automatismus. Nicht jedes Substantiv wird ein Entitätstyp, und manches Attribut entpuppt sich später als eigener Typ.
:::

:::snippet{#aufgabe}
Gehe den Ausgangstext oben durch.

a) Unterstreiche alle Substantive, die Entitätstypen sein könnten.

b) Ordne jedem gefundenen Entitätstyp seine Attribute zu.

c) Bei einer Angabe ist unklar, wohin sie gehört: das Instrument. Zu welchem Entitätstyp würdest du es zuordnen – und welches Problem entsteht dabei?
:::

::::collapsible{title="Tipp: Wie prüfe ich, ob ein Attribut richtig sitzt?"}

Frage: „Hat **jede** Entität dieses Typs genau **einen** Wert dafür?" Wenn die Antwort „nein, das hängt davon ab" lautet, sitzt das Attribut falsch.

::::

:::protect{password="db-5-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b)

| Entitätstyp | Attribute |
| --- | --- |
| Band | Name, Gründungsjahr, Herkunftsland |
| Person | Vorname, Nachname, Geburtsjahr, Land |
| Genre | Name |
| Bühne | Name, Fassungsvermögen, überdacht |
| Auftritt | Datum, Uhrzeit, Dauer, Zuschauer |

c) Das Instrument gehört **weder** zur Person noch zur Band.

- Als Attribut von *Person* geht es schief, sobald jemand in zwei Bands verschiedene Instrumente spielt.
- Als Attribut von *Band* ergibt es keinen Sinn – eine Band spielt nicht *ein* Instrument.

Das Instrument ist eine Eigenschaft der **Verbindung** zwischen Person und Band. Solche Attribute heißen **Beziehungsattribute**; wo sie hingehören, klärt die nächste Lektion.

:::

## Ist Auftritt ein Entitätstyp?

:::snippet{#brain}
Bei *Auftritt* lohnt ein zweiter Blick. Man kann ihn auf zwei Arten sehen:

- als **Beziehung** zwischen Band und Bühne („diese Band spielt auf jener Bühne") oder
- als eigenen **Entitätstyp** mit Datum, Uhrzeit, Dauer und Zuschauerzahl.

Beides ist vertretbar. Sobald eine Beziehung eigene Attribute mitbringt und man sie einzeln ansprechen will – etwa um sie zu bewerten –, ist der Entitätstyp die klarere Wahl. Genau so ist die Klangwiese-Datenbank gebaut: `auftritt` hat einen eigenen :t[Primärschlüssel]{#primaerschluessel}, auf den `bewertung` verweisen kann.
:::

## Was **kein** Entitätstyp wird

:::snippet{#merken}
Nicht alles, was im Text vorkommt, gehört ins Modell:

- **Berechenbares.** Die Gesamtdauer aller Auftritte einer Band ist kein Attribut, sondern eine Abfrage. Was man ausrechnen kann, speichert man nicht.
- **Einmaliges.** „Das Festival" selbst braucht keinen Entitätstyp, solange es nur eines gibt. Sobald es das Festival auch in anderen Städten gibt, ändert sich das.
- **Was niemanden interessiert.** Ein Modell bildet nicht die Welt ab, sondern den Ausschnitt, den die Anwendung braucht. Die Haarfarbe der Bandmitglieder steht nicht im Text – also gehört sie nicht ins Modell.
:::

## Ein zweites Beispiel zum Üben

:::snippet{#aufgabe}
**Der Fahrradverleih**

„Unser Verleih hat mehrere **Stationen** in der Stadt, jede mit Namen, Adresse und Anzahl der Stellplätze. Zu jedem **Fahrrad** merken wir uns die Rahmennummer, den Typ (Rad oder Lastenrad) und das Anschaffungsjahr. Ein Fahrrad ist immer genau einer Station zugeordnet.

**Kundinnen und Kunden** melden sich mit Name, Geburtsdatum und E-Mail an. Eine **Ausleihe** hat einen Startzeitpunkt, einen Endzeitpunkt und einen Preis; sie betrifft genau ein Fahrrad und genau eine Person."

a) Bestimme die Entitätstypen und ihre Attribute.

b) Welche Angabe im Text ist eine **Beziehung** und kein Attribut?

c) Der Preis einer Ausleihe ergibt sich aus der Dauer und einem festen Minutentarif. Sollte er trotzdem gespeichert werden? Begründe.
:::

::::collapsible{title="Tipp zu c)"}

Was passiert mit alten Ausleihen, wenn der Tarif erhöht wird?

::::

:::protect{password="db-5-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Entitätstyp | Attribute |
| --- | --- |
| Station | Name, Adresse, Stellplätze |
| Fahrrad | Rahmennummer, Typ, Anschaffungsjahr |
| Kundin | Name, Geburtsdatum, E-Mail |
| Ausleihe | Startzeitpunkt, Endzeitpunkt, Preis |

b) „Ein Fahrrad ist genau einer Station zugeordnet" – das ist eine Beziehung zwischen *Fahrrad* und *Station*, kein Attribut von *Fahrrad*. Im Schema wird daraus später ein :t[Fremdschlüssel]{#fremdschluessel}.

c) **Ja, gespeichert werden sollte er.** Zwar ist er im Moment berechenbar – aber nur mit dem *aktuellen* Tarif. Wird der Tarif erhöht, wären auf einen Schlag alle alten Rechnungen falsch.

Die Regel „Berechenbares speichert man nicht" gilt für Werte, die sich aus dem **aktuellen** Datenbestand ergeben. Ein Preis ist dagegen eine Tatsache über einen Vorgang in der Vergangenheit. Genauso ist es beim Preis eines Tickets in der Festivaldatenbank.

:::

<!--
KLP QPh, Daten und ihre Strukturierung: modellieren relationale Datenbanken (M);
inhaltlicher Schwerpunkt Datenbankmodellierungen (Attribute, Entitätstypen).
-->

---

## Selbsttest

::::multievent

**1. Was ist ein Entitätstyp?**

{r1{ein einzelnes Ding der realen Welt}}

{r1{!die Zusammenfassung aller gleichartigen Dinge}}

{r1{eine Eigenschaft eines Dings}}

{r1{eine Beziehung zwischen zwei Dingen}}

{h{Die Waldbühne ist eine Entität. Und alle Bühnen zusammen?}}
{H{Richtig. Aus einem Entitätstyp wird später eine Tabelle.}}

**2. Woran erkennt man im Ausgangstext meistens einen Entitätstyp?**

{r2{an Verben}}

{r2{!an Substantiven, über die mehreres gespeichert wird}}

{r2{an Zahlenangaben}}

{r2{an Adjektiven}}

{h{Verben verbinden meistens zwei Dinge miteinander.}}
{H{Richtig – Verben deuten dagegen auf Beziehungen hin.}}

**3. Warum gehört das Instrument weder zu Person noch zu Band?**

{r3{Weil es kein Substantiv ist.}}

{r3{!Weil es von beiden zusammen abhängt.}}

{r3{Weil es sich berechnen lässt.}}

{r3{Weil es mehrfach vorkommt.}}

{h{Was ist, wenn jemand in zwei Bands verschiedene Instrumente spielt?}}
{H{Richtig. Solche Angaben heißen Beziehungsattribute.}}

**4. Welche Angaben gehören **nicht** ins Modell?** (Mehrfachauswahl)

{c1{!die Gesamtzahl der Auftritte einer Band}}

{c1{!die durchschnittliche Bewertung einer Band}}

{c1{das Gründungsjahr einer Band}}

{c1{die Zuschauerzahl eines Auftritts}}

{h{Was lässt sich jederzeit aus den vorhandenen Daten ausrechnen?}}
{H{Richtig. Berechenbares speichert man nicht – es würde nur veralten.}}

**5. Der Preis einer abgeschlossenen Ausleihe lässt sich aus Dauer und Tarif berechnen. Soll er gespeichert werden?**

{r4{!Ja, weil sich der Tarif ändern kann und alte Rechnungen gültig bleiben müssen.}}

{r4{Nein, Berechenbares wird grundsätzlich nicht gespeichert.}}

{r4{Nur wenn die Datenbank sehr groß ist.}}

{h{Was passiert mit den Rechnungen des letzten Jahres, wenn der Tarif steigt?}}
{H{Richtig. Ein historischer Wert ist eine Tatsache, keine Ableitung.}}

::::
