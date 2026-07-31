---
title: Zweite Normalform
index: 3
---

# Zweite Normalform

Nach dem ersten Schritt sieht die Auftrittsliste so aus:

```
auftrittsliste(band, genre, datum, beginn, herkunftsland, buehne, buehnen_kapazitaet, dauer_min)
```

:t[Primärschlüssel]{#primaerschluessel}: `band`, `genre`, `datum`, `beginn`

Sie ist in der 1. :t[Normalform]{#normalform} – und schlechter als vorher. Das ändert dieser Schritt.

## Die Regel

:::snippet{#definition}
Ein :t[Relationenschema]{#relationenschema} ist in der **2. Normalform (2NF)**, wenn es in der 1. Normalform ist und jedes Nichtschlüsselattribut **voll** funktional vom Primärschlüssel abhängt.

Anders gesagt: Es darf keine **partielle** Abhängigkeit geben – kein Attribut darf schon von einem *Teil* des Schlüssels bestimmt sein.
:::

:::snippet{#merken}
**Wann ist eine :t[Relation]{#relation} automatisch in 2NF?**

Wenn der Primärschlüssel aus **einem einzigen Attribut** besteht. Ein Attribut hat keine echten Teilmengen außer der leeren – also kann es gar keine partielle Abhängigkeit geben.

Die 2. Normalform ist also nur bei **zusammengesetzten** Schlüsseln überhaupt ein Thema. Das ist eine nützliche Abkürzung bei der Prüfung.
:::

## Die Verstöße finden

:::snippet{#aufgabe}
Der Primärschlüssel ist `band`, `genre`, `datum`, `beginn`.

Prüfe für jedes Nichtschlüsselattribut, ob schon ein Teil des Schlüssels ausreicht:

`herkunftsland`, `buehne`, `buehnen_kapazitaet`, `dauer_min`
:::

::::collapsible{title="Tipp: So prüfst du"}

Nimm das Attribut und frage: „Kenne ich es schon, wenn ich nur die Band kenne?" Dann: „…nur das Genre?" Dann: „…nur Band und Datum?" Sobald eine Antwort ja lautet, liegt eine partielle Abhängigkeit vor.

::::

:::protect{password="db-6-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| Attribut | abhängig von | Verstoß? |
| --- | --- | --- |
| `herkunftsland` | `band` | **ja**, partiell |
| `buehne` | `band`, `datum`, `beginn` | nein, voll |
| `buehnen_kapazitaet` | `band`, `datum`, `beginn` | nein, voll |
| `dauer_min` | `band`, `datum`, `beginn` | nein, voll |

Zwei Verstöße auf einmal, wenn man genau hinsieht: Auch `buehne`, `buehnen_kapazitaet` und `dauer_min` hängen **nicht** von `genre` ab. Das Genre ist für alle drei überflüssig – es steht nur im Schlüssel, weil es dorthin verschoben wurde, als wir die 1. Normalform hergestellt haben.

Deshalb sind sie **doch** partiell abhängig: von der Teilmenge `band`, `datum`, `beginn`.

:::

## Die Überführung

:::snippet{#merken}
**So kommst du in die 2. Normalform:**

Für jede partielle Abhängigkeit `A → B`, bei der A ein echter Teil des Schlüssels ist:

1. Lege eine **neue Relation** mit den Attributen A und B an. A wird ihr Primärschlüssel.
2. **Entferne** B aus der ursprünglichen Relation. A bleibt dort als :t[Fremdschlüssel]{#fremdschluessel} stehen – es ist ja Teil des Schlüssels.

Wiederhole das, bis keine partielle Abhängigkeit mehr übrig ist.
:::

Angewandt auf die Auftrittsliste:

:::snippet{#beispiel}
**Schritt 1:** `band → herkunftsland` herausziehen.

```
band(band, herkunftsland)
```

**Schritt 2:** `band, datum, beginn → buehne, buehnen_kapazitaet, dauer_min` herausziehen.

```
auftritt(band→band, datum, beginn, buehne, buehnen_kapazitaet, dauer_min)
```

**Was bleibt übrig?** In der ursprünglichen Relation stehen jetzt nur noch die Schlüsselattribute:

```
band_genre(band→band, genre)
```

Ergebnis nach der 2. Normalform:

```
band(band, herkunftsland)
band_genre(band→band, genre)
auftritt(band→band, datum, beginn, buehne, buehnen_kapazitaet, dauer_min)
```
:::

:::snippet{#aufgabe}
a) Vergleiche die Zeilenzahlen: Die 1NF-Tabelle hatte 71 Zeilen. Wie viele Zeilen haben die drei neuen Relationen zusammen?

b) Steht das Herkunftsland einer Band jetzt noch mehrfach in der Datenbank?

c) Kann man jetzt eine Band eintragen, die noch keinen Auftritt hat? Welche Anomalie ist damit erledigt?
:::

:::protect{password="db-6-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 22 + 34 + 46 = **102 Zeilen** – also mehr als die 71 vorher. Die Zeilenzahl ist nicht das Maß; entscheidend ist, dass jede **Information** nur noch einmal dasteht.

b) Nein. `Deutschland` steht zwar 15-mal in `band`, aber jedes Mal für eine **andere** Band. Das ist keine Redundanz: Es sind 15 verschiedene Tatsachen, nicht 15 Kopien derselben.

Vorher stand *Nordlicht kommt aus Deutschland* sechsmal da – zwei Genres mal drei Auftritte. Das war Redundanz.

c) Ja, sie bekommt einfach eine Zeile in `band`. Damit ist die **Einfügeanomalie** erledigt. Und wird ihr letzter Auftritt gelöscht, bleibt sie erhalten – auch die **Löschanomalie** ist weg.

:::

## Ein zweites Beispiel

:::snippet{#aufgabe}
Eine Schule verwaltet Klausurergebnisse in einer Tabelle:

```
ergebnis(schueler_id, klausur_id, schuelername, klausurdatum, fach, punkte)
```

Primärschlüssel: `schueler_id`, `klausur_id`

a) Bestimme alle funktionalen Abhängigkeiten.

b) Welche verstoßen gegen die 2. Normalform?

c) Überführe das Schema in die 2. Normalform.

d) Nenne für jede der drei Anomalien einen konkreten Fall im ursprünglichen Schema.
:::

:::protect{password="db-6-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
schueler_id, klausur_id → punkte
schueler_id             → schuelername
klausur_id              → klausurdatum
klausur_id              → fach
```

b) Die letzten drei. `schuelername` hängt allein von `schueler_id` ab, `klausurdatum` und `fach` allein von `klausur_id`. Alle drei sind partiell.

c)

```
schueler(schueler_id, schuelername)
klausur(klausur_id, klausurdatum, fach)
ergebnis(schueler_id→schueler, klausur_id→klausur, punkte)
```

d)

- **Änderungsanomalie:** Eine Schülerin heiratet und ändert ihren Namen. Der Name steht in jeder ihrer Ergebniszeilen; wird eine übersehen, gibt es sie zweimal unter verschiedenen Namen.
- **Einfügeanomalie:** Eine neue Klausur ist terminiert, aber noch nicht geschrieben. Ohne Ergebnis gibt es keine Zeile – der Termin lässt sich nicht speichern.
- **Löschanomalie:** Werden die Ergebnisse einer Klausur gelöscht, verschwindet auch die Information, dass diese Klausur stattgefunden hat und in welchem Fach.

:::

<!--
KLP QPh, Daten und ihre Strukturierung: überführen Datenbankschemata in die
1. bis 3. Normalform (M).
-->

---

## Selbsttest

::::multievent

**1. Wann ist ein Schema in der 2. Normalform?**

{r1{wenn alle Werte atomar sind}}

{r1{!wenn es in 1NF ist und kein Nichtschlüsselattribut von einem Teil des Schlüssels abhängt}}

{r1{wenn der Schlüssel aus einem Attribut besteht}}

{r1{wenn es keine Fremdschlüssel gibt}}

{h{Die 2NF setzt die 1NF voraus und verbietet eine bestimmte Art von Abhängigkeit.}}
{H{Richtig – verboten sind partielle Abhängigkeiten.}}

**2. Eine Relation hat einen Primärschlüssel aus einem einzigen Attribut. Was folgt daraus?**

{r2{Sie ist automatisch in 3NF.}}

{r2{!Sie ist automatisch in 2NF, sofern sie in 1NF ist.}}

{r2{Sie verstößt gegen die 2NF.}}

{r2{Daraus folgt nichts.}}

{h{Eine partielle Abhängigkeit braucht einen Teil des Schlüssels, der kleiner ist als der Schlüssel.}}
{H{Richtig. Bei einem einteiligen Schlüssel gibt es so einen Teil nicht.}}

**3. Was passiert bei der Überführung in die 2. Normalform mit dem partiell abhängigen Attribut?**

{r3{Es wird gelöscht.}}

{r3{!Es wandert zusammen mit seinem Bestimmungsattribut in eine neue Relation.}}

{r3{Es wird zum Primärschlüssel.}}

{r3{Es bleibt, bekommt aber ein NOT NULL.}}

{h{Erinnere dich an band und herkunftsland.}}
{H{Richtig. In der alten Relation bleibt nur der Fremdschlüssel zurück.}}

**4. Nach der Normalisierung hat die Datenbank mehr Zeilen als vorher. Ist das ein Problem?**

{r4{Ja, Normalisierung soll Platz sparen.}}

{r4{!Nein, entscheidend ist, dass jede Information nur einmal dasteht.}}

{r4{Ja, mehr Zeilen bedeuten mehr Redundanz.}}

{r4{Das hängt vom Datenbanksystem ab.}}

{h{Deutschland steht in band 15-mal – ist das Redundanz?}}
{H{Richtig. 15 verschiedene Tatsachen sind keine 15 Kopien derselben.}}

**5. Welche Anomalien beseitigt der Schritt zur 2. Normalform im Beispiel?** (Mehrfachauswahl)

{c1{!die Einfügeanomalie}}

{c1{!die Löschanomalie}}

{c1{!die Änderungsanomalie}}

{c1{keine, er beseitigt nur mehrwertige Attribute}}

{h{Mehrwertige Attribute waren Sache der 1. Normalform.}}
{H{Richtig. Alle drei Anomalien hingen an der partiellen Abhängigkeit.}}

::::
