---
title: Warum Datenbanken?
index: 1
---

# Warum Datenbanken?

Ein Musikfestival muss viel verwalten: welche Band wann auf welcher Bühne spielt, wer in welcher Band Bass spielt, wer ein Ticket gekauft hat. Das Organisationsteam der *Klangwiese* hat damit angefangen, wie fast alle anfangen – mit einer einzigen großen Tabelle.

## Eine Tabelle für alles

So sah der Spielplan im ersten Jahr aus:

| band | herkunftsland | genres | buehne | buehnen_kapazitaet | datum | beginn | dauer_min |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Elster | Deutschland | Indie | Hauptbuehne | 8000 | 2026-07-16 | 18:00 | 60 |
| Zwoelf Grad | Deutschland | Indie, Elektro | Hauptbuehne | 8000 | 2026-07-16 | 20:00 | 75 |
| Nordlicht | Deutschland | Indie, Rock | Hauptbuehne | 8000 | 2026-07-16 | 22:00 | 90 |
| Papierflieger | Deutschland | Indie, Folk | Waldbuehne | 2500 | 2026-07-16 | 17:30 | 45 |
| … | | | | | | | |

Das lässt sich lesen, sortieren und ausdrucken. Und es geht trotzdem schief.

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="420px"}

```mysql Spielplan.sql
SELECT * FROM auftrittsliste;
```

:::

:::snippet{#aufgabe}
Sieh dir die vollständige Tabelle an. Beantworte auf Papier:

a) Wie oft steht in dieser Tabelle, dass *Elster* aus Deutschland kommt?

b) Die Waldbühne wird umgebaut und fasst künftig 3000 Menschen. Wie viele Zellen musst du ändern?

c) Eine neue Band wird für das nächste Jahr verpflichtet, hat aber noch keinen Auftrittstermin. Wo trägst du sie ein?

d) Der Auftritt von *Kaltfront* fällt aus und die Zeile wird gelöscht. Welche Information geht dabei nebenbei verloren?
:::

::::collapsible{title="Auflösung"}

a) Dreimal – *Elster* hat drei Auftritte, und in jeder Zeile steht das Herkunftsland erneut.

b) In allen 13 Zeilen, die die Waldbühne betreffen. Vergisst du eine, steht in der Tabelle zweimal etwas Verschiedenes über dieselbe Bühne.

c) Gar nicht. Ohne Auftritt gibt es keine Zeile – und ohne Zeile keinen Platz für die Band.

d) Dass es die Band *Kaltfront* überhaupt gibt und dass sie aus Norwegen kommt. Diese Information hing nur an dieser einen Zeile.

::::

## Die drei Anomalien

Was du gerade gefunden hast, hat Namen. Die Ursache ist immer dieselbe: **Redundanz**.

:::snippet{#definition}
**Redundanz** liegt vor, wenn dieselbe Information mehrfach gespeichert ist. Redundanz ist nicht nur Platzverschwendung, sondern die Quelle von drei typischen Problemen:

| Anomalie | Was passiert |
| --- | --- |
| **Änderungsanomalie** | Eine Information ändert sich, aber nicht alle Kopien werden angepasst. Die Datenbank widerspricht sich selbst. |
| **Einfügeanomalie** | Eine Information lässt sich nicht speichern, weil andere Angaben fehlen, die die Zeile verlangt. |
| **Löschanomalie** | Beim Löschen einer Zeile geht nebenbei eine Information verloren, die man behalten wollte. |
:::

:::snippet{#aufgabe}
Ordne deine vier Antworten von eben den drei Anomalien zu. Eine der Antworten beschreibt keine Anomalie, sondern nur ihre Ursache – welche?
:::

::::collapsible{title="Auflösung"}

- b) → Änderungsanomalie
- c) → Einfügeanomalie
- d) → Löschanomalie
- a) beschreibt keine Anomalie, sondern die **Redundanz** selbst. Sie ist die Ursache der anderen drei.

::::

## Was ein Datenbanksystem anders macht

Ein **Datenbanksystem** ist ein Programm, das Daten verwaltet und dabei mehr leistet als eine Datei:

:::snippet{#merken}
| Eigenschaft | Was das bedeutet |
| --- | --- |
| **Trennung von Daten und Programm** | Die Daten liegen einmal zentral. Verschiedene Programme greifen darauf zu, ohne dass jedes sein eigenes Format braucht. |
| **Mehrbenutzerbetrieb** | Viele Menschen arbeiten gleichzeitig mit denselben Daten, ohne sich gegenseitig zu überschreiben. |
| **Integritätsbedingungen** | Das System selbst wacht darüber, dass keine widersprüchlichen Daten entstehen – zum Beispiel kein Auftritt einer Band, die es nicht gibt. |
| **Abfragesprache** | Man beschreibt, **was** man wissen will, nicht **wie** der Rechner es findet. |
| **Datenschutz und Rechte** | Nicht jede Person darf alles sehen. |
:::

Die Sprache, mit der man mit einem relationalen Datenbanksystem redet, heißt **SQL**. Ein Vorgeschmack:

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="450px"}

```mysql Erste_Abfrage.sql
SELECT band, buehne, beginn
  FROM auftrittsliste
 WHERE datum = '2026-07-18'
 ORDER BY beginn;
```

:::

:::snippet{#aufgabe}
Führe die Abfrage aus.

a) Wie viele Auftritte gab es am 18. Juli?

b) Ändere das Datum auf den 16. Juli. Wie viele sind es dort?

c) Beschreibe in einem Satz, was die drei Zeilen der Abfrage jeweils tun.
:::

::::collapsible{title="Tipp: Wo steht die Anzahl?"}

Über der Ergebnistabelle steht eine Angabe wie *1-13/13*. Die letzte Zahl ist die Anzahl der Zeilen im Ergebnis.

::::

:::protect{password="db-1-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 13 Auftritte.

b) 10 Auftritte.

c) `SELECT` legt fest, **welche Spalten** im Ergebnis stehen. `FROM` legt fest, **aus welcher Tabelle** die Zeilen kommen. `WHERE` legt fest, **welche Zeilen** übernommen werden. `ORDER BY` legt die Reihenfolge fest.

:::

## Und jetzt?

Die Tabelle `auftrittsliste` ist ein schlechtes Beispiel – absichtlich. In [Kapitel 6](../06-normalisierung) wirst du sie systematisch zerlegen, bis alle Anomalien verschwunden sind. Vorher lernst du, wie eine ordentlich gebaute Datenbank aussieht und wie man sie abfragt.

<!--
KLP QPh, Daten und ihre Strukturierung: beurteilen Datenbankmodellierungen und
Datenbankschemata (A). Die Anomalien werden hier zunächst nur benannt und in
Kapitel 6 mit den Normalformen systematisch behandelt.
-->

---

## Selbsttest

::::multievent

**1. Was versteht man unter Redundanz?**

{r1{Dass Daten regelmäßig gesichert werden.}}

{r1{!Dass dieselbe Information mehrfach gespeichert ist.}}

{r1{Dass eine Tabelle sehr viele Spalten hat.}}

{r1{Dass eine Abfrage mehrere Ergebnisse liefert.}}

{h{Denk an das Herkunftsland von Elster: Wie oft stand es in der Tabelle?}}
{H{Genau. Redundanz ist die Ursache aller drei Anomalien.}}

**2. Eine Bühne wird vergrößert, aber nur in zwei von dreizehn Zeilen eingetragen. Wie heißt dieses Problem?**

{r2{!Änderungsanomalie}}

{r2{Einfügeanomalie}}

{r2{Löschanomalie}}

{h{Es wurde etwas geändert – aber nicht überall.}}
{H{Richtig. Danach widerspricht sich die Datenbank selbst.}}

**3. Eine Band ohne Auftrittstermin lässt sich nicht eintragen. Wie heißt dieses Problem?**

{r3{Änderungsanomalie}}

{r3{!Einfügeanomalie}}

{r3{Löschanomalie}}

{h{Man will etwas Neues speichern und kann es nicht.}}
{H{Richtig. Die Zeile verlangt Angaben, die es noch gar nicht gibt.}}

**4. Welche Aussagen über Datenbanksysteme stimmen?** (Mehrfachauswahl)

{c1{!Mehrere Personen können gleichzeitig mit denselben Daten arbeiten.}}

{c1{!Das System kann selbst dafür sorgen, dass keine widersprüchlichen Daten entstehen.}}

{c1{!Man beschreibt, was man wissen will, nicht wie es gefunden wird.}}

{c1{Ein Datenbanksystem verhindert, dass die Daten redundant gespeichert werden.}}

{h{Beim letzten Punkt: Wer entscheidet darüber, wie die Tabellen aufgebaut sind?}}
{H{Richtig. Gegen Redundanz hilft kein System, sondern nur ein guter Entwurf – daran arbeitest du in Kapitel 5 und 6.}}

**5. Ergänze: Die Sprache, mit der man ein relationales Datenbanksystem abfragt, heißt {t{SQL}}.**

::::
