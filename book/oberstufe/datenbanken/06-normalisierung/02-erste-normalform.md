---
title: Erste Normalform
index: 2
---

# Erste Normalform

Die erste :t[Normalform]{#normalform} stellt sicher, dass die Tabelle überhaupt eine :t[Relation]{#relation} ist.

## Die Regel

:::snippet{#definition}
Ein :t[Relationenschema]{#relationenschema} ist in der **1. Normalform (1NF)**, wenn alle Attributwerte **atomar** sind – in jeder Zelle steht genau ein Wert.

Verstöße sind:

- **Mehrwertige Attribute:** `'Indie, Rock'` in einer Zelle
- **Zusammengesetzte Attribute:** `'Musterstr. 5, 45127 Essen'` in einem Feld `adresse`
- **Wiederholungsgruppen:** die Spalten `genre_1`, `genre_2`, `genre_3`
:::

## Der Verstoß in der Auftrittsliste

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="420px"}

```mysql Verstoss.sql
SELECT band, genres FROM auftrittsliste ORDER BY band;
```

:::

In `genres` steht bei vielen Bands mehr als ein Wert. Was daran praktisch stört, merkt man beim Abfragen:

:::sqlide{db="/datenbanken/klangwiese-roh.sqlite" height="530px"}

```mysql Probleme.sql
-- Versuch: alle Indie-Bands finden
SELECT DISTINCT band, genres FROM auftrittsliste WHERE genres LIKE '%Indie%';

-- Versuch: zaehlen, wie viele Bands es je Genre gibt
SELECT genres, COUNT(DISTINCT band) FROM auftrittsliste GROUP BY genres;
```

:::

:::snippet{#aufgabe}
a) Führe beide Abfragen aus. Die erste liefert ein brauchbares Ergebnis – warum ist sie trotzdem gefährlich?

b) Die zweite ist schlicht falsch. Was zählt sie tatsächlich?

c) Nenne eine dritte Frage an die Daten, die sich mit dieser Tabelle **gar nicht** beantworten lässt.
:::

::::collapsible{title="Tipp zu a)"}

Was passiert, wenn eines Tages ein Genre namens *Indietronica* dazukommt?

::::

:::protect{password="db-6-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `LIKE '%Indie%'` sucht nach einer **Zeichenkette**, nicht nach einem Wert. Ein Genre namens *Indietronica* oder *Post-Indie* würde mitgefunden. Und `LIKE '%Rock%'` fände auch *Postrock* und *Punkrock*. Der Treffer ist zufällig richtig, nicht verlässlich.

b) Sie zählt Bands je **Genre-Kombination**, nicht je Genre. `Indie, Rock` und `Indie` sind für die Datenbank zwei verschiedene Werte. *Nordlicht* taucht damit weder in der Zeile `Indie` noch in der Zeile `Rock` auf.

c) Zum Beispiel: „Welche Genres gibt es überhaupt?" Man müsste dafür die Zellen selbst zerlegen – mit SQL geht das nicht. Ebenso wenig: „Wie viele Genres hat jede Band?" oder „Welche Bands teilen sich mindestens ein Genre?"

:::

## Die Überführung

:::snippet{#merken}
**So kommst du in die 1. Normalform:**

Jeder mehrwertige Attributwert wird zu einer **eigenen Zeile**. Das mehrwertige Attribut wandert in den Schlüssel.

Anschließend prüfst du, ob dadurch neue Redundanz entstanden ist – meistens ja. Die beseitigen die 2. und 3. Normalform.
:::

Aus

```
auftrittsliste(band, herkunftsland, genres, buehne, buehnen_kapazitaet, datum, beginn, dauer_min)
```

wird

```
auftrittsliste(band, genre, datum, beginn, herkunftsland, buehne, buehnen_kapazitaet, dauer_min)
```

mit dem :t[Primärschlüssel]{#primaerschluessel} `band`, `genre`, `datum`, `beginn`.

:::snippet{#beispiel}
Aus einer Zeile

| band | genres | datum | beginn |
| --- | --- | --- | --- |
| Nordlicht | Indie, Rock | 2026-07-16 | 22:00 |

werden zwei:

| band | genre | datum | beginn |
| --- | --- | --- | --- |
| Nordlicht | Indie | 2026-07-16 | 22:00 |
| Nordlicht | Rock | 2026-07-16 | 22:00 |
:::

:::snippet{#aufgabe}
a) Die Auftrittsliste hat 46 Zeilen. Wie viele werden es nach der Überführung in die 1. Normalform? Rechne es aus.

b) Was passiert dabei mit `dauer_min` und `zuschauer`? Beurteile, ob das ein Problem ist.

c) Warum ist die 1. Normalform trotz dieses Nachteils der richtige erste Schritt?
:::

::::collapsible{title="Tipp zu a)"}

Zähle für jeden Auftritt, wie viele Genres seine Band hat, und summiere.

::::

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="450px"}

```mysql Nachzaehlen.sql
-- Zaehlt, wie viele Zeilen die Auftrittsliste in 1NF haette
SELECT COUNT(*) AS zeilen_in_1nf
  FROM auftritt AS a
  JOIN band_genre AS bg ON bg.band_id = a.band_id;
```

:::

:::protect{password="db-6-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **71 Zeilen.** Jeder Auftritt wird so oft vervielfacht, wie seine Band Genres hat.

b) Die Dauer eines Auftritts steht jetzt mehrfach da – bei *Nordlicht* zweimal, einmal je Genre. Das ist **neue Redundanz**, die vorher nicht existierte: Die 1. Normalform hat ein Problem gelöst und ein anderes geschaffen.

Schlimmer noch: Eine Korrektur der Dauer müsste in beiden Zeilen erfolgen. Genau die Änderungsanomalie, die man loswerden wollte.

c) Weil sich die neue Redundanz mit den nächsten beiden Schritten wieder auflösen lässt, die alte aber nicht. Solange mehrere Werte in einer Zelle stehen, **kann** man gar nicht sinnvoll weiterarbeiten – man kann nicht einmal die funktionalen Abhängigkeiten sauber aufschreiben.

Die 1. Normalform ist deshalb keine Verbesserung um ihrer selbst willen, sondern die Voraussetzung dafür, dass die anderen Schritte überhaupt greifen.

:::

## Grenzfälle

:::snippet{#brain}
Wann ist ein Wert eigentlich atomar? Die Antwort hängt davon ab, **was man mit den Daten vorhat**.

- Ein Feld `adresse` mit `'Musterstr. 5, 45127 Essen'` ist unproblematisch, solange man Adressen nur ausdruckt. Sobald man nach Postleitzahlen gruppieren will, ist es ein Verstoß gegen die 1NF.
- Ein Geburtsdatum `2009-03-14` besteht aus Tag, Monat und Jahr – trotzdem käme niemand auf die Idee, es aufzuteilen. Datenbanksysteme bringen für Datumsangaben eigene Funktionen mit, man kommt also auch so an die Bestandteile heran.
- Ein Freitextfeld `beschreibung` ist selbstverständlich atomar, obwohl es aus vielen Wörtern besteht.

„Atomar" heißt nicht „unteilbar", sondern: **nicht weiter zerlegt, weil die Anwendung die Teile nicht einzeln braucht.**
:::

<!--
KLP QPh, Daten und ihre Strukturierung: überführen Datenbankschemata in die
1. bis 3. Normalform (M).
-->

---

## Selbsttest

::::multievent

**1. Wann ist ein Schema in der 1. Normalform?**

{r1{wenn es einen Primärschlüssel hat}}

{r1{!wenn alle Attributwerte atomar sind}}

{r1{wenn es keine Fremdschlüssel gibt}}

{r1{wenn keine Zeile doppelt vorkommt}}

{h{Es geht um den Inhalt der einzelnen Zelle.}}
{H{Richtig. Genau ein Wert je Zelle.}}

**2. Welche der folgenden Konstruktionen verstoßen gegen die 1. Normalform?** (Mehrfachauswahl)

{c1{!eine Spalte genres mit dem Wert Indie, Rock}}

{c1{!die Spalten telefon_1, telefon_2, telefon_3}}

{c1{eine Spalte beschreibung mit einem längeren Text}}

{c1{eine Spalte geburtsdatum mit dem Wert 2009-03-14}}

{h{Frage bei jeder: Braucht die Anwendung die Teile einzeln – und kann SQL an sie heran?}}
{H{Richtig. Datum und Freitext sind für die Anwendung ein Wert.}}

**3. Was passiert bei der Überführung in die 1. Normalform mit der Zeilenzahl?**

{r2{Sie bleibt gleich.}}

{r2{Sie sinkt.}}

{r2{!Sie steigt.}}

{r2{Das hängt vom Datenbanksystem ab.}}

{h{Aus einer Zeile mit zwei Genres werden zwei.}}
{H{Richtig – und damit entsteht zunächst neue Redundanz.}}

**4. Warum ist die 1. Normalform trotz der neuen Redundanz der richtige erste Schritt?**

{r3{Weil sie Speicherplatz spart.}}

{r3{!Weil ohne atomare Werte die weiteren Schritte gar nicht möglich sind.}}

{r3{Weil sie vom Datenbanksystem erzwungen wird.}}

{r3{Weil sie die Abfragen beschleunigt.}}

{h{Kann man funktionale Abhängigkeiten aufschreiben, wenn in einer Zelle mehrere Werte stehen?}}
{H{Richtig. 2NF und 3NF räumen die neue Redundanz wieder ab.}}

**5. Warum ist WHERE genres LIKE '%Rock%' keine verlässliche Suche?**

{r4{Weil LIKE langsam ist.}}

{r4{!Weil es auf Zeichenketten passt und auch Postrock oder Punkrock findet.}}

{r4{Weil LIKE keine Großbuchstaben kennt.}}

{r4{Weil das Prozentzeichen falsch gesetzt ist.}}

{h{LIKE vergleicht Text, nicht Werte.}}
{H{Richtig. Nach der Normalisierung fragt man den Genrenamen direkt ab.}}

::::
