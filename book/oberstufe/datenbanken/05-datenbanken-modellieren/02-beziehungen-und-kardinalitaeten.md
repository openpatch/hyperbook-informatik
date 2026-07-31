---
title: Beziehungen und Kardinalitäten
index: 2
---

# Beziehungen und Kardinalitäten

Entitätstypen allein ergeben noch keine Datenbank. Interessant wird es durch das, was zwischen ihnen liegt.

## Beziehungstypen

:::snippet{#definition}
Ein **Beziehungstyp** verbindet zwei (selten mehr) Entitätstypen. Im Ausgangstext steckt er meist in einem Verb:

- Eine Band **tritt auf** einer Bühne **auf**.
- Eine Person **spielt in** einer Band.
- Eine Band **gehört zu** einem Genre.

Ein **Beziehungsattribut** ist eine Eigenschaft der Verbindung selbst – zum Beispiel das *Instrument*, das eine Person in einer bestimmten Band spielt.
:::

## Kardinalitäten

Die entscheidende Frage bei jeder Beziehung lautet: **Wie viele?**

:::snippet{#definition}
Die **:t[Kardinalität]{#kardinalitaet}** gibt an, mit wie vielen Entitäten der einen Seite eine Entität der anderen Seite in Beziehung stehen kann.

| Kurzform | Name | Beispiel |
| --- | --- | --- |
| 1:1 | eins zu eins | Jede Bühne hat genau einen Bühnenmanager, jeder Manager genau eine Bühne. |
| 1:n | eins zu viele | Eine Station hat viele Fahrräder, ein Fahrrad steht an genau einer Station. |
| n:m | viele zu viele | Eine Band hat mehrere Genres, ein Genre umfasst mehrere Bands. |
:::

:::snippet{#merken}
**So bestimmst du eine Kardinalität – immer in beide Richtungen fragen:**

1. „Zu **einer** Band – wie viele Genres?" → mehrere
2. „Zu **einem** Genre – wie viele Bands?" → mehrere

Beide Antworten „mehrere" → **n:m**. Eine Antwort „genau eins" → **1:n**. Beide „genau eins" → **1:1**.

Der häufigste Modellierungsfehler ist, nur in **eine** Richtung zu fragen.
:::

:::snippet{#aufgabe}
Bestimme für jede Beziehung die Kardinalität. Schreibe zu jeder beide Fragen und beide Antworten auf.

a) Band – Auftritt

b) Bühne – Auftritt

c) Person – Band (über die Mitgliedschaft)

d) Besucherin – Ticket

e) Besucherin – Auftritt (über die Bewertung)

f) Land – Hauptstadt
:::

:::protect{password="db-5-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **1:n.** Eine Band hat mehrere Auftritte; ein Auftritt gehört zu genau einer Band.

b) **1:n.** Eine Bühne trägt mehrere Auftritte; ein Auftritt findet auf genau einer Bühne statt.

c) **n:m.** Eine Person kann in mehreren Bands spielen; in einer Band spielen mehrere Personen.

d) **1:n.** Eine Besucherin kann mehrere Tickets kaufen; ein Ticket gehört zu genau einer Besucherin.

e) **n:m.** Eine Besucherin bewertet mehrere Auftritte; ein Auftritt wird von mehreren Besucherinnen bewertet.

f) **1:1.** Ein Land hat genau eine Hauptstadt; eine Stadt ist Hauptstadt von höchstens einem Land.

:::

## Die genauere Schreibweise: (min, max)

Die Angabe 1:n verschweigt eine wichtige Information: Muss es mindestens einen geben, oder darf es auch keinen sein?

:::snippet{#definition}
Die **(min, max)-Notation** schreibt an jede Seite der Beziehung ein Zahlenpaar. Es sagt, an wie vielen Beziehungen eine einzelne Entität dieser Seite **mindestens** und **höchstens** beteiligt ist.

- `(0,n)` – kann an beliebig vielen beteiligt sein, auch an keiner
- `(1,n)` – muss an mindestens einer beteiligt sein
- `(1,1)` – genau eine
- `(0,1)` – höchstens eine
:::

:::snippet{#beispiel}
Für *Band tritt auf Bühne auf*:

- Seite **Band**: `(0,n)` – eine Band kann mehrere Auftritte haben, eine neu verpflichtete Band aber auch noch keinen.
- Seite **Bühne**: `(1,n)` – jede Bühne wird mindestens einmal bespielt, sonst hätte man sie nicht aufgebaut.

Und für *Auftritt findet statt auf Bühne*, vom Auftritt aus gesehen: `(1,1)` – ein Auftritt ohne Bühne gibt es nicht.
:::

:::snippet{#merken}
Die Minimalangabe ist die praktisch wichtigere Hälfte: Aus `min = 1` wird später ein `NOT NULL` in der Tabelle, aus `min = 0` nicht. Wer sie überspringt, entscheidet diese Frage nicht – sondern überlässt sie dem Zufall.
:::

:::snippet{#aufgabe}
Gib für den Fahrradverleih aus der [letzten Lektion](./01-entitaetstypen-und-attribute) zu jeder Beziehung beide Zahlenpaare an und begründe jede Minimalangabe.

a) Station – Fahrrad

b) Fahrrad – Ausleihe

c) Kundin – Ausleihe
:::

::::collapsible{title="Tipp"}

Frage bei der Minimalangabe konkret: „Kann es ein Fahrrad geben, das noch nie ausgeliehen wurde?" – „Kann es eine Ausleihe ohne Fahrrad geben?"

::::

:::protect{password="db-5-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Station (0,n) – Fahrrad (1,1).**
Eine frisch eröffnete Station kann leer sein, also min = 0. Ein Fahrrad ist laut Text *immer genau einer* Station zugeordnet, also (1,1).

b) **Fahrrad (0,n) – Ausleihe (1,1).**
Ein neues Fahrrad wurde noch nie ausgeliehen. Eine Ausleihe ohne Fahrrad ist sinnlos.

c) **Kundin (0,n) – Ausleihe (1,1).**
Man kann sich anmelden, ohne je zu fahren. Eine Ausleihe gehört immer zu genau einer Person.

**Auffällig:** Auf der Seite der Ausleihe steht zweimal `(1,1)`. Das ist typisch für einen Entitätstyp, der aus einer Beziehung entstanden ist – er hängt an beiden Enden fest.

:::

## Warum 1:1 selten ist

:::snippet{#brain}
Eine 1:1-Beziehung ist fast immer ein Hinweis darauf, dass man genauer hinsehen sollte. Wenn jede Bühne genau einen Manager hat und jeder Manager genau eine Bühne, warum sind das dann zwei Tabellen? Man könnte den Managernamen einfach als Attribut in `buehne` führen.

Es gibt gute Gründe für eine echte 1:1-Beziehung: wenn ein Teil der Daten besonders schützenswert ist und getrennt liegen soll, oder wenn eine Seite optional ist – nicht jede Bühne hat einen Manager, aber wenn, dann genau einen. Ohne solchen Grund ist die Trennung meist überflüssig.
:::

<!--
KLP QPh, Daten und ihre Strukturierung: modellieren relationale Datenbanken (M);
inhaltlicher Schwerpunkt Beziehungstypen und Kardinalitäten.
-->

---

## Selbsttest

::::multievent

**1. Wie bestimmt man die Kardinalität einer Beziehung?**

{r1{Man zählt die Zeilen beider Tabellen.}}

{r1{!Man fragt für beide Seiten, mit wie vielen der anderen Seite eine Entität in Beziehung steht.}}

{r1{Man sieht im Datenbankschema nach.}}

{r1{Man legt sie beim Entwurf willkürlich fest.}}

{h{Der häufigste Fehler ist, nur in eine Richtung zu fragen.}}
{H{Richtig. Beide Richtungen, dann ergibt sich die Kardinalität von selbst.}}

**2. Eine Person kann in mehreren Bands spielen, in einer Band spielen mehrere Personen. Welche Kardinalität ist das?**

{r2{1:1}}

{r2{1:n}}

{r2{!n:m}}

{h{Beide Antworten lauten „mehrere".}}
{H{Richtig. Dafür braucht man später eine Zuordnungstabelle.}}

**3. Was sagt die Angabe (1,1) auf der Seite eines Auftritts aus?**

{r3{Es gibt genau einen Auftritt.}}

{r3{!Jeder Auftritt gehört zu genau einer Bühne.}}

{r3{Jede Bühne hat genau einen Auftritt.}}

{r3{Es gibt höchstens einen Auftritt je Bühne.}}

{h{Das Zahlenpaar steht immer für eine einzelne Entität dieser Seite.}}
{H{Richtig – mindestens eine, höchstens eine.}}

**4. Woraus wird beim Umsetzen ins Schema ein NOT NULL?**

{r4{aus der Maximalangabe n}}

{r4{!aus einer Minimalangabe von 1}}

{r4{aus einer Minimalangabe von 0}}

{r4{aus jeder 1:n-Beziehung}}

{h{„Mindestens eine" heißt: Der Wert darf nicht fehlen.}}
{H{Richtig. Deshalb lohnt es sich, die Minimalangaben ernst zu nehmen.}}

**5. Was ist ein Beziehungsattribut?**

{r5{ein Attribut des Primärschlüssels}}

{r5{!eine Eigenschaft der Verbindung zweier Entitäten}}

{r5{ein Attribut, das in zwei Tabellen vorkommt}}

{r5{ein Fremdschlüssel}}

{h{Denk an das Instrument.}}
{H{Richtig. Es hängt von Person und Band gemeinsam ab.}}

**6. Welche Aussagen über 1:1-Beziehungen stimmen?** (Mehrfachauswahl)

{c1{!Sie sind selten.}}

{c1{!Oft lassen sich die Daten stattdessen in einer Tabelle führen.}}

{c1{!Ein guter Grund für die Trennung ist ein besonderer Schutzbedarf einer Seite.}}

{c1{Sie sind in relationalen Datenbanken nicht darstellbar.}}

{h{Darstellbar sind sie ohne Weiteres – die Frage ist, ob sie sinnvoll sind.}}
{H{Richtig.}}

::::
