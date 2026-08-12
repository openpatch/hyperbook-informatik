---
title: Rückblick
index: 4
---

# Rückblick

Dieses Kapitel hat noch kaum SQL gebracht, dafür das Fundament: **warum** man Daten auf mehrere Tabellen verteilt und **wie** diese Tabellen zusammenhängen. Wer das sicher hat, dem fällt alles Weitere leichter.

## Das kann ich jetzt

- [ ] Ich kann die drei **Anomalien** benennen und an einer gegebenen Tabelle zeigen. ([1.1](./01-warum-datenbanken))
- [ ] Ich kann erklären, was **Redundanz** ist und warum sie das eigentliche Problem ist. ([1.1](./01-warum-datenbanken))
- [ ] Ich kann die Begriffe :t[Relation]{#relation}, :t[Tupel]{#tupel}, Attribut und Wertebereich zuordnen. ([1.2](./02-aufbau-einer-relationalen-datenbank))
- [ ] Ich kann ein :t[Relationenschema]{#relationenschema} lesen und selbst notieren. ([1.2](./02-aufbau-einer-relationalen-datenbank))
- [ ] Ich kann **Schlüsselkandidaten** finden und begründet einen :t[Primärschlüssel]{#primaerschluessel} auswählen. ([1.2](./02-aufbau-einer-relationalen-datenbank))
- [ ] Ich kann erklären, was ein :t[Fremdschlüssel]{#fremdschluessel} sichert – und was er nicht sichert. ([1.2](./02-aufbau-einer-relationalen-datenbank))
- [ ] Ich finde mich im Schema der **Klangwiese** zurecht und weiß, welche Tabelle welche Angaben enthält. ([1.3](./03-die-festivaldatenbank))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Eine Tabelle, die alles enthält**

Ein Sportverein führt seine Kurse in einer einzigen Tabelle:

| kurs | trainerin | trainerin_telefon | teilnehmerin | beitrag | halle |
| --- | --- | --- | --- | --- | --- |
| Volleyball | Nowak | 0201 55512 | Ayse Kilic | 60 | Halle A |
| Volleyball | Nowak | 0201 55512 | Ben Sommer | 60 | Halle A |
| Yoga | Wehner | 0201 55598 | Ayse Kilic | 45 | Halle B |
| Klettern | Nowak | 0201 55512 | Chiara Rossi | 80 | Kletterturm |

a) Nenne alle Stellen, an denen dieselbe Angabe mehrfach gespeichert ist.

b) Zeige für **jede** der drei Anomalien einen konkreten Fall an dieser Tabelle. Formuliere dabei jeweils eine Handlung, die schiefgeht.

c) Frau Nowak bekommt eine neue Telefonnummer. Wie viele Zeilen sind zu ändern, und was passiert, wenn eine davon vergessen wird?

d) Zerlege die Tabelle in drei Relationen. Notiere die Relationenschemata, unterstreiche die Primärschlüssel und kennzeichne die Fremdschlüssel.
:::

::::collapsible{title="Tipp zu b)"}

Geh die drei Anomalien der Reihe nach durch und such dir jeweils eine passende Handlung:

- **Einfügen:** Was ist mit einem Kurs, für den sich noch niemand angemeldet hat?
- **Ändern:** Was ist mit einer Angabe, die in mehreren Zeilen steht?
- **Löschen:** Was verschwindet mit, wenn die letzte Teilnehmerin eines Kurses austritt?

::::

::::collapsible{title="Tipp zu d)"}

Frag dich: Über welche **Dinge** wird hier überhaupt etwas gesagt? Es sind drei Sorten von Dingen – und die Zeilen der Ausgangstabelle verbinden je zwei davon.

::::

:::protect{password="db-1-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Mehrfach gespeichert sind: Trainerinnenname und Telefonnummer (dreimal Nowak), der Beitrag und die Halle je Kurs (zweimal bei Volleyball), der Name „Ayse Kilic" (zweimal, weil sie in zwei Kursen ist).

b)

- **Einfügeanomalie:** Ein neuer Kurs *Judo* mit Halle und Beitrag lässt sich nicht speichern, solange sich niemand angemeldet hat – es gäbe keine Teilnehmerin für die Zeile. Man müsste Felder frei lassen.
- **Änderungsanomalie:** Zieht Volleyball in Halle C um, sind zwei Zeilen zu ändern. Ändert man nur eine, steht in der Tabelle, dass derselbe Kurs in zwei Hallen stattfindet.
- **Löschanomalie:** Tritt Chiara Rossi aus, verschwindet mit ihrer Zeile die letzte Information darüber, dass es den Kurs *Klettern* überhaupt gibt – samt Beitrag und Halle.

c) Drei Zeilen. Wird eine vergessen, stehen zwei verschiedene Nummern für dieselbe Person in der Datenbank, und niemand kann entscheiden, welche stimmt. Das ist die Änderungsanomalie: Redundanz führt zu **Widersprüchen**.

d) Zum Beispiel:

```
trainerin(trainerin_id, name, telefon)
kurs(kurs_id, bezeichnung, beitrag, halle, trainerin_id → trainerin)
teilnahme(kurs_id → kurs, teilnehmerin_id → teilnehmerin)
teilnehmerin(teilnehmerin_id, vorname, nachname)
```

Unterstrichen sind `trainerin_id`, `kurs_id`, `teilnehmerin_id` und in `teilnahme` die **Kombination** beider Spalten. Es sind vier Relationen geworden statt drei – wer die Teilnehmerinnen als eigene Relation erkannt hat, hat mehr gesehen als verlangt war. Mit nur drei Relationen bleibt die Zuordnung Kurs–Teilnehmerin unmöglich, sobald jemand in zwei Kursen ist.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Schlüssel begründen**

Gegeben ist diese Relation:

```
tickets(ticketnummer, besucher_id, kategorie, preis, kaufdatum, email)
```

a) Welche Attribute kommen als **Schlüsselkandidat** infrage? Begründe für jedes, warum es geeignet ist oder warum nicht.

b) Wähle einen Primärschlüssel und begründe die Wahl.

c) Warum ist `email` selbst dann kein guter Primärschlüssel, wenn im Moment keine Adresse doppelt vorkommt?

d) Was sichert der Fremdschlüssel `besucher_id` zu – und was sichert er **nicht** zu?
:::

:::protect{password="db-1-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `ticketnummer` ist geeignet: Sie wird beim Verkauf einmalig vergeben. `email` wäre nur dann geeignet, wenn jede Person höchstens ein Ticket kauft – das ist nicht zugesichert. `besucher_id` scheidet aus, weil eine Person mehrere Tickets kaufen kann. `kategorie`, `preis` und `kaufdatum` wiederholen sich naturgemäß.

b) `ticketnummer`. Sie ist eindeutig, ändert sich nie und ist kurz.

c) Weil ein Schlüssel für **alle möglichen** Datenbestände eindeutig sein muss, nicht nur für den heutigen. Dass gerade keine Adresse doppelt vorkommt, ist Zufall. Dazu kommt: Adressen ändern sich – und ein Primärschlüssel, der sich ändert, zieht Änderungen in allen Tabellen nach sich, die auf ihn verweisen.

d) Er sichert die **referenzielle Integrität** zu: In `besucher_id` kann kein Wert stehen, zu dem es keine Besucherin gibt, und eine Besucherin lässt sich nicht löschen, solange noch Tickets auf sie verweisen. Er sichert **nicht** zu, dass der Wert der *richtige* ist – wird ein Ticket versehentlich der falschen Person zugeordnet, merkt das System davon nichts.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Das Schema lesen**

Beantworte allein anhand des Schemas der Klangwiese – ohne eine Abfrage zu schreiben:

a) In welcher Tabelle steht, **wie lange** ein Auftritt dauert?

b) Welche Tabellen müsste man verbinden, um die Frage „Welche Band spielt auf welcher Bühne?" zu beantworten?

c) Warum gibt es die Tabelle `band_genre`? Was ginge ohne sie nicht?

d) `bewertung` hat einen zusammengesetzten Primärschlüssel aus `besucher_id` und `auftritt_id`. Welche Regel für die Wirklichkeit steckt darin?

e) Prüfe deine Antwort auf a) im Übungsbereich, indem du dir die ersten Zeilen der betreffenden Tabelle ansiehst.
:::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Nachsehen.sql
-- UNGEPRUEFT: Sieh dir hier die Tabellen an, ueber die du nachdenkst.
SELECT * FROM auftritt LIMIT 5;
```

:::

:::protect{password="db-1-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) In `auftritt`, Attribut `dauer_min`.

b) `band` und `buehne` – aber **nicht** direkt miteinander. Verbunden werden sie über `auftritt`, weil dort beide Fremdschlüssel zusammenkommen. Das ist genau der Fall, den [Kapitel 3](../03-mehrere-tabellen) behandelt.

c) Weil eine Band mehreren Genres angehören kann und ein Genre viele Bands hat. Ein Fremdschlüssel in `band` könnte nur **ein** Genre je Band festhalten. Ohne `band_genre` ginge also die Angabe „Elster ist Indie **und** Elektro" verloren.

d) Dass jede Besucherin **je Auftritt höchstens eine** Bewertung abgibt. Die Datenbank verhindert damit, dass jemand denselben Auftritt zweimal bewertet.

:::

<!--
Rückblick zum Inhaltsfeld Daten und ihre Strukturierung: Datenbanken.
Bündelt Redundanz und Anomalien, Relationenschema, Schlüssel und
referenzielle Integrität über alle drei Lektionen des Kapitels.
-->

---

## Selbsttest

::::multievent

**1. Welche Anomalie liegt vor, wenn man einen neuen Kurs erst anlegen kann, sobald sich jemand angemeldet hat?**

{r1{!Einfügeanomalie}}

{r1{Änderungsanomalie}}

{r1{Löschanomalie}}

{r1{keine, das ist normal}}

{h{Es geht darum, dass sich etwas gar nicht erst speichern lässt.}}
{H{Richtig.}}

**2. Was ist die eigentliche Ursache aller drei Anomalien?**

{r2{zu viele Tabellen}}

{r2{!dieselbe Angabe steht mehrfach in der Datenbank}}

{r2{fehlende Sortierung}}

{r2{zu wenig Speicherplatz}}

{h{Ein Wort mit R.}}
{H{Richtig – Redundanz.}}

**3. Wie heißt eine Zeile einer Relation mit Fachbegriff?**

{r3{Attribut}}

{r3{!Tupel}}

{r3{Wertebereich}}

{r3{Schema}}

{h{Die Spalte heißt Attribut – gesucht ist die Zeile.}}
{H{Richtig.}}

**4. Welche Eigenschaften muss ein Primärschlüssel haben? Wähle alle zutreffenden aus.**

{c1{!Er identifiziert jedes Tupel eindeutig.}}

{c1{!Kein Teil von ihm darf leer bleiben.}}

{c1{!Er sollte sich möglichst nie ändern.}}

{c1{Er muss aus genau einem Attribut bestehen.}}

{c1{Er muss die erste Spalte der Tabelle sein.}}

{h{Zwei der Angebote sind Gewohnheiten, keine Anforderungen.}}
{H{Richtig – ein Schlüssel darf durchaus aus mehreren Attributen zusammengesetzt sein.}}

**5. Was verhindert ein Fremdschlüssel?**

{r4{dass eine Spalte leer bleibt}}

{r4{!dass ein Verweis auf ein Tupel zeigt, das es nicht gibt}}

{r4{dass zwei Zeilen gleich sind}}

{r4{dass falsche Werte eingegeben werden}}

{h{Er sichert die referenzielle Integrität – nicht die inhaltliche Richtigkeit.}}
{H{Richtig. Ob der Verweis auf die richtige Zeile zeigt, prüft er nicht.}}

**6. Warum reicht ein Fremdschlüssel für die Zuordnung von Bands und Genres nicht aus?**

{r5{Weil Genres keinen Primärschlüssel haben.}}

{r5{!Weil eine Band mehreren Genres angehören kann und umgekehrt.}}

{r5{Weil Fremdschlüssel nur Zahlen enthalten dürfen.}}

{r5{Weil die Tabelle sonst zu groß würde.}}

{h{In einer Spalte steht genau ein Wert.}}
{H{Richtig – deshalb braucht es eine eigene Zuordnungstabelle.}}

**7. In der Tabelle bewertung ist die Kombination aus besucher_id und auftritt_id der Primärschlüssel. Was folgt daraus?**

{r6{Jede Besucherin darf nur einen Auftritt bewerten.}}

{r6{!Jede Besucherin darf jeden Auftritt höchstens einmal bewerten.}}

{r6{Jeder Auftritt bekommt genau eine Bewertung.}}

{r6{Bewertungen lassen sich nicht ändern.}}

{h{Eindeutig ist das Paar – nicht jeder Teil für sich.}}
{H{Richtig.}}

::::
