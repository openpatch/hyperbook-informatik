---
name: Speichern von Daten in Tabellen
index: 2
---

# Speichern von Daten in Tabellen

Um Daten strukturiert zu speichern, verwendet man relationale Datenbanken. Diese speichern Daten in Tabellen, die aus Zeilen und Spalten bestehen.

:::snippet{#merken}
Eine **relationale Datenbank** ist im einfachsten Fall eine **Sammlung von Tabellen**.

Eine Datenbanktabelle besteht aus mehreren Elementen:

- einem eindeutigen Namen,
- einer Reihe von eindeutig benannten Spalten (**Attribute**),
- einem genau definierten Wertebereich (**Datentyp**) für jedes Attribut (Zahl, Text, Datum, etc.),
- beliebig vielen Zeilen (**Datensätze**). Jeder Datensatz besitzt Werte in den Attributen.
:::

![Begriffe Relationale Datenbank](./begriffe_tabelle.svg "Tabelle mit Begriffen - Urheber: TM - Lizenz: inf-schule.de")

Der Begriff "relational" kommt von einer mathematischen Betrachtung einer Datenbank in der sog. Relationenalgebra.

![Nicht atomare Werte](./nicht_atomare_werte.svg "Beispiel für nicht atomare Werte - Urheber: TM - Lizenz: inf-schule.de")-

Klassentabelle, die als Attribut jeweils eine Liste von Lehrern enthält.Ein Wert für ein Attribut in einem Datensatz soll **atomar** sein. Das bedeutet unter anderem, dass nur einfache Werte und keine Listen gespeichert werden dürfen. Das Beispiel einer Klassen-Tabelle rechts wäre also aufgrund der Lehrerliste nicht korrekt!

## Gleichzeitiger Zugriff

Tabellen kennst du ja auch von Tabellenkalkulationsprogrammen (z.B. OpenOffice Calc oder MS Excel). Warum dann eine Datenbank verwenden?

Vielleicht habt ihr bei der Bearbeitung der Aufgabe 2 aus dem Einstieg die folgende (oder eine ähnliche) Fehlermeldung bekommen:

![Zugriffkonflikt](./CalcZugriffskonflikt.png "Beispiel für Zugriffkonflikt - Urheber: TM - Lizenz: inf-schule.de")

Das Tabellenkalkulationsprogramm erlaubt immer nur einem Benutzer, die Daten zu verändern - alle anderen müssen warten oder dürfen das Dokument nur schreibgeschützt anschauen.
Stell' dir das einmal bei einem großen Informationssystem (z.B. bei TikTok) vor...

Echte Datenbanksysteme erlauben daher den **gleichzeitigen vollen Zugriff** mehrerer Benutzer auf die gleichen Daten.

## Datenbasis für unterschiedliche Programme

Denkt man z.B. an das Informationssystem der Bahn, dann wird klar, dass unterschiedliche Programme auf die gleichen Daten zugreifen müssen:

- Die Fahrplanauskunft im Internet
- Das Buchungsprogramm im Reisebüro
- Das Smartphone eines Schaffners, wenn er mögliche Anschlüsszüge durchgibt
- Vielleicht sogar die Infotafel im Bahnhof
- u.v.m.

![DB Informationssystem Bahn](./db_basis_infosystem.svg "Datenbankbasis - Urheber: TM - Lizenz: inf-schule.de")

Typisch für ein Datenbanksystem ist es, dass es zentral auf einem **Server** läuft und dass viele unterschiedliche Programme (**Clients**) auf die gleichen Daten zugreifen können.