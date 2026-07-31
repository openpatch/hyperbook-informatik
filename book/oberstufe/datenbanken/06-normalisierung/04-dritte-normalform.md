---
title: Dritte Normalform
index: 4
---

# Dritte Normalform

Stand nach dem zweiten Schritt:

```
band(band, herkunftsland)
band_genre(band→band, genre)
auftritt(band→band, datum, beginn, buehne, buehnen_kapazitaet, dauer_min)
```

Ein Rest Redundanz ist geblieben. Sieh dir `auftritt` genau an: Neben jeder Bühne steht ihre Kapazität – 14-mal die 8000 der Hauptbühne.

## Die Regel

:::snippet{#definition}
Ein :t[Relationenschema]{#relationenschema} ist in der **3. :t[Normalform]{#normalform} (3NF)**, wenn es in der 2. Normalform ist und kein Nichtschlüsselattribut **transitiv** vom :t[Primärschlüssel]{#primaerschluessel} abhängt.

Eine **transitive Abhängigkeit** liegt vor, wenn es eine Kette gibt:

```
Schlüssel → X → Y
```

wobei X **kein** Schlüsselattribut ist. Dann hängt Y zwar vom Schlüssel ab – aber nur auf dem Umweg über X.
:::

:::snippet{#merken}
Die Kurzfassung, die man sich merken kann:

> Jedes Nichtschlüsselattribut hängt vom Schlüssel ab, vom ganzen Schlüssel und von nichts als dem Schlüssel.

- „vom Schlüssel" → 1NF
- „vom **ganzen** Schlüssel" → 2NF
- „von **nichts als** dem Schlüssel" → 3NF
:::

## Der Verstoß

:::snippet{#aufgabe}
In `auftritt(band, datum, beginn, buehne, buehnen_kapazitaet, dauer_min)`:

a) Finde die transitive Abhängigkeit. Schreibe die Kette auf.

b) Welche der drei Anomalien ist damit noch möglich? Nenne einen konkreten Fall.

c) Ist `dauer_min` auch transitiv abhängig? Begründe.
:::

::::collapsible{title="Tipp"}

Suche ein Nichtschlüsselattribut, das ein anderes Nichtschlüsselattribut bestimmt.

::::

:::protect{password="db-6-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
band, datum, beginn → buehne → buehnen_kapazitaet
```

`buehne` ist ein Nichtschlüsselattribut und bestimmt `buehnen_kapazitaet`.

b) **Alle drei sind noch möglich:**

- *Änderung:* Die Waldbühne wird auf 3000 Plätze erweitert. Die Zahl steht in 13 Zeilen; wird eine übersehen, widerspricht sich die Datenbank.
- *Einfügen:* Eine neue Bühne ist gebaut, aber noch nicht bespielt. Ohne Auftritt gibt es keine Zeile – ihre Kapazität lässt sich nicht speichern.
- *Löschen:* Wird der letzte Auftritt auf der Seebühne gelöscht, verschwindet die Information, dass es diese Bühne gibt und wie groß sie ist.

c) Nein. `dauer_min` hängt direkt vom vollständigen Schlüssel ab und wird von keinem anderen Nichtschlüsselattribut bestimmt. Aus `buehne` folgt keine Dauer, aus dem Datum auch nicht.

:::

## Die Überführung

:::snippet{#merken}
**So kommst du in die 3. Normalform:**

Für jede transitive Abhängigkeit `Schlüssel → X → Y`:

1. Lege eine **neue :t[Relation]{#relation}** mit X und Y an. X wird ihr Primärschlüssel.
2. **Entferne** Y aus der ursprünglichen Relation. X bleibt dort als :t[Fremdschlüssel]{#fremdschluessel} stehen.

Das ist dasselbe Vorgehen wie bei der 2. Normalform – nur ist X diesmal kein Schlüsselteil, sondern ein gewöhnliches Attribut.
:::

:::snippet{#beispiel}
`buehne → buehnen_kapazitaet` herausziehen:

```
buehne(buehne, kapazitaet)
auftritt(band→band, datum, beginn, buehne→buehne, dauer_min)
```

Das vollständige Ergebnis nach allen drei Schritten:

```
band(band, herkunftsland)
band_genre(band→band, genre)
buehne(buehne, kapazitaet)
auftritt(band→band, datum, beginn, buehne→buehne, dauer_min)
```

Vergleiche das mit der Klangwiese-Datenbank, mit der du seit Kapitel 1 arbeitest. Bis auf die künstlichen Schlüsselnummern ist es dasselbe Schema – einmal durch Modellierung entstanden, einmal durch Normalisierung.
:::

:::snippet{#aufgabe}
Prüfe das Ergebnis: Ist jetzt jede Relation in der 3. Normalform? Gehe alle vier durch und begründe jeweils in einem Satz.
:::

:::protect{password="db-6-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

- `band(band, herkunftsland)`: Einteiliger Schlüssel, also 2NF; nur ein Nichtschlüsselattribut, das nichts weiter bestimmen kann, also 3NF.
- `band_genre(band, genre)`: Besteht nur aus Schlüsselattributen – es gibt kein Nichtschlüsselattribut, das gegen etwas verstoßen könnte.
- `buehne(buehne, kapazitaet)`: Wie `band`.
- `auftritt(band, datum, beginn, buehne, dauer_min)`: Beide Nichtschlüsselattribute hängen voll vom dreiteiligen Schlüssel ab; `buehne` bestimmt `dauer_min` nicht und umgekehrt.

Alle vier sind in der 3. Normalform.

:::

## Übung

:::snippet{#aufgabe}
Ein Onlineshop verwaltet Bestellpositionen:

```
position(bestell_id, artikel_id, kundennummer, kundenname, artikelname,
         kategorie_id, kategoriename, menge, einzelpreis)
```

Primärschlüssel: `bestell_id`, `artikel_id`

a) Schreibe alle funktionalen Abhängigkeiten auf.

b) Überführe schrittweise in die 1., 2. und 3. Normalform. Notiere nach jedem Schritt das vollständige Schema.

c) Der `einzelpreis` steht in der Bestellposition und nicht beim Artikel. Ist das ein Verstoß gegen die 3. Normalform? Begründe.
:::

::::collapsible{title="Tipp 1: Womit fängst du an?"}

Prüfe zuerst, ob die 1. Normalform überhaupt verletzt ist. Wenn alle Werte atomar sind, ist Schritt 1 schon erledigt.

::::

::::collapsible{title="Tipp 2: zu c)"}

Frage: Ändert sich der Preis eines Artikels im Lauf der Zeit? Und was soll dann auf einer alten Rechnung stehen?

::::

:::protect{password="db-6-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
bestell_id, artikel_id → menge, einzelpreis
bestell_id            → kundennummer
kundennummer          → kundenname
artikel_id            → artikelname, kategorie_id
kategorie_id          → kategoriename
```

b)

**1NF:** schon erfüllt – alle Werte sind atomar. Das Schema bleibt unverändert.

**2NF:** Die partiellen Abhängigkeiten `bestell_id → kundennummer` und `artikel_id → artikelname, kategorie_id` herausziehen:

```
bestellung(bestell_id, kundennummer, kundenname)
artikel(artikel_id, artikelname, kategorie_id, kategoriename)
position(bestell_id→bestellung, artikel_id→artikel, menge, einzelpreis)
```

**3NF:** Zwei transitive Abhängigkeiten sind übrig:

- in `bestellung`: `bestell_id → kundennummer → kundenname`
- in `artikel`: `artikel_id → kategorie_id → kategoriename`

Beide herausziehen:

```
kunde(kundennummer, kundenname)
kategorie(kategorie_id, kategoriename)
bestellung(bestell_id, kundennummer→kunde)
artikel(artikel_id, artikelname, kategorie_id→kategorie)
position(bestell_id→bestellung, artikel_id→artikel, menge, einzelpreis)
```

c) **Kein Verstoß.** Es sieht nur so aus. Ein Verstoß läge vor, wenn `artikel_id → einzelpreis` gälte – wenn also der Preis eine Eigenschaft des Artikels wäre.

Das ist er nicht: Der Einzelpreis ist der Preis, zu dem dieser Artikel **in dieser Bestellung** verkauft wurde. Er hängt vom vollständigen Schlüssel ab und muss dort stehen, damit alte Rechnungen bei einer Preisänderung gültig bleiben.

Beim Artikel steht daneben oft ein zweiter Preis, der aktuelle Verkaufspreis. Dass zwei Spalten „Preis" heißen, macht sie nicht zum selben Datum. Genau derselbe Fall wie beim Ausleihpreis in [Kapitel 5](../05-datenbanken-modellieren/01-entitaetstypen-und-attribute).

:::

<!--
KLP QPh, Daten und ihre Strukturierung: überführen Datenbankschemata in die
1. bis 3. Normalform (M).
-->

---

## Selbsttest

::::multievent

**1. Was verbietet die 3. Normalform?**

{r1{mehrwertige Attribute}}

{r1{partielle Abhängigkeiten}}

{r1{!transitive Abhängigkeiten}}

{r1{zusammengesetzte Schlüssel}}

{h{Gemeint ist die Kette über ein Nichtschlüsselattribut.}}
{H{Richtig. Partielle Abhängigkeiten verbietet die 2. Normalform.}}

**2. Vervollständige den Merksatz: „Jedes Nichtschlüsselattribut hängt ab vom Schlüssel, vom ganzen Schlüssel und von {t{nichts}} als dem Schlüssel."**

**3. Welche Kette ist eine transitive Abhängigkeit?**

{r2{schluessel → a und schluessel → b}}

{r2{!schluessel → a → b, wobei a kein Schlüsselattribut ist}}

{r2{a → schluessel}}

{r2{ein Teil des Schlüssels → a}}

{h{Der Umweg führt über ein gewöhnliches Attribut.}}
{H{Richtig. Führt der Umweg über ein Schlüsselattribut, ist es keine transitive Abhängigkeit im Sinne der 3NF.}}

**4. Eine Relation besteht nur aus Schlüsselattributen. In welcher Normalform ist sie?**

{r3{nur in der 1.}}

{r3{nur in der 1. und 2.}}

{r3{!in allen dreien}}

{r3{in keiner}}

{h{Woran könnte ein Nichtschlüsselattribut scheitern, wenn es gar keines gibt?}}
{H{Richtig – zum Beispiel band_genre.}}

**5. Der Einzelpreis in einer Bestellposition hängt nicht vom Artikel allein ab. Warum nicht?**

{r4{Weil Preise nie in Datenbanken gespeichert werden.}}

{r4{!Weil es der Preis zum Zeitpunkt dieser Bestellung ist und der Artikelpreis sich ändern kann.}}

{r4{Weil der Artikel keinen Preis hat.}}

{r4{Weil der Preis berechnet wird.}}

{h{Was soll auf einer Rechnung von vor zwei Jahren stehen?}}
{H{Richtig. Zwei Spalten mit demselben Namen sind nicht dasselbe Datum.}}

**6. Wie viele Relationen entstehen aus der Bestellposition nach vollständiger Normalisierung?**

{z{5}}

{h{Kunde, Kategorie, Bestellung, Artikel und die Position selbst.}}
{H{Richtig!}}

::::
