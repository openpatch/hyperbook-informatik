---
title: Modellierungen beurteilen
index: 5
---

# Modellierungen beurteilen

Zu einer Aufgabenstellung gibt es nie nur ein richtiges Modell. Es gibt aber sehr wohl **bessere und schlechtere** – und man kann begründen, welches welches ist.

## Woran man ein gutes Modell erkennt

:::snippet{#merken}
| Kriterium | Frage |
| --- | --- |
| **Vollständigkeit** | Lässt sich jede Angabe aus der Aufgabenstellung speichern? |
| **Redundanzfreiheit** | Steht jede Information genau einmal? |
| **Korrekte Kardinalitäten** | Passen alle Fälle hinein, auch die seltenen? |
| **Erweiterbarkeit** | Was muss man ändern, wenn eine naheliegende Anforderung dazukommt? |
| **Angemessenheit** | Ist das Modell so einfach wie möglich – und nicht einfacher? |

Die ersten drei Kriterien sind hart: Ein Verstoß ist ein Fehler. Die letzten beiden sind Abwägungen; dort gibt es begründete Meinungsverschiedenheiten.
:::

## Vier Entwürfe für dieselbe Aufgabe

Eine Schulbibliothek möchte ihre Ausleihen verwalten: Bücher, Schülerinnen und Schüler, Ausleihvorgänge.

:::snippet{#aufgabe}
Beurteile die vier Entwürfe. Nenne zu jedem mindestens einen konkreten Fall, der schiefgeht oder gut funktioniert.

**Entwurf A**

```
ausleihe(ausleih_id, buchtitel, autor, isbn, schuelername, klasse, ausleihdatum, rueckgabedatum)
```

**Entwurf B**

```
buch(isbn, titel, autor)
schueler(schueler_id, name, klasse)
ausleihe(ausleih_id, isbn→buch, schueler_id→schueler, ausleihdatum, rueckgabedatum)
```

**Entwurf C**

```
buch(buch_id, isbn, titel, autor, ausgeliehen_an→schueler, ausleihdatum)
schueler(schueler_id, name, klasse)
```

**Entwurf D**

```
titel(isbn, titel)
buch(buch_id, isbn→titel, exemplarnummer)
autor(autor_id, name)
titel_autor(isbn→titel, autor_id→autor)
klasse(klasse_id, bezeichnung)
schueler(schueler_id, name, klasse_id→klasse)
ausleihe(ausleih_id, buch_id→buch, schueler_id→schueler, ausleihdatum, rueckgabedatum)
```
:::

::::collapsible{title="Tipp 1: Prüfe jeden Entwurf an konkreten Fällen"}

- Zwei Exemplare desselben Buches.
- Ein Buch, das zweimal nacheinander ausgeliehen wird.
- Ein Buch mit zwei Autorinnen.
- Ein Buch, das noch nie ausgeliehen wurde.

::::

::::collapsible{title="Tipp 2: Bei D lautet die Frage anders"}

Bei D ist nichts falsch. Die Frage ist, ob der Aufwand zum Zweck passt – und das hängt davon ab, was die Bibliothek tatsächlich braucht.

::::

:::protect{password="db-5-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Entwurf A – untauglich.** Eine einzige Tabelle mit voller Redundanz. Titel und Autor stehen bei jeder Ausleihe erneut; ein Schreibfehler in einem Autornamen ist nicht auffindbar. Ein Buch, das nie ausgeliehen wurde, lässt sich nicht erfassen (Einfügeanomalie). Wird die letzte Ausleihe eines Buches gelöscht, verschwindet das Buch (Löschanomalie). Genau die drei Probleme aus [Kapitel 1](../01-daten-in-tabellen/01-warum-datenbanken).

**Entwurf B – solide.** Erfüllt alle drei harten Kriterien. Zwei Schwächen bleiben:

- Die ISBN identifiziert einen **Titel**, nicht ein **Exemplar**. Hat die Bibliothek drei Exemplare desselben Buches, lassen sie sich nicht unterscheiden – und man kann nicht sehen, ob noch eines verfügbar ist.
- Nur ein Autor je Buch. Bei zwei Autorinnen bleibt nur, beide in ein Textfeld zu schreiben – ein Verstoß gegen die Atomarität.

Für eine kleine Bibliothek ist B trotzdem eine vertretbare Wahl.

**Entwurf C – falsch.** Der Ausleihvorgang wird als Attribut des Buches modelliert. Damit kennt die Datenbank immer nur die **aktuelle** Ausleihe; die Geschichte geht bei jeder Rückgabe verloren. Fragen wie „Wer hatte dieses Buch im letzten Halbjahr?" sind nicht beantwortbar.

Die :t[Kardinalität]{#kardinalitaet} ist schlicht falsch bestimmt: Zwischen Buch und Schüler besteht keine 1:n-, sondern eine n:m-Beziehung – über die Zeit betrachtet leiht jedes Buch an mehrere Personen aus und jede Person leiht mehrere Bücher.

**Entwurf D – korrekt, aber aufwendig.** Trennt sauber zwischen Titel und Exemplar, erlaubt mehrere Autorinnen je Titel und führt die Klasse als eigene :t[Relation]{#relation}.

Ob das angemessen ist, hängt vom Zweck ab: Für eine Schulbibliothek mit 2000 Bänden ist die Autorentabelle vermutlich zu viel des Guten – für eine Stadtbibliothek genau richtig. Die Trennung zwischen Titel und Exemplar dagegen lohnt sich auch in der Schule, weil ohne sie die häufigste Frage überhaupt nicht beantwortbar ist: „Ist noch eines da?"

:::

## Schlüsselkandidaten bestimmen

Ein Teil der Beurteilung ist die Frage, ob die Schlüssel richtig gewählt sind.

:::snippet{#merken}
**So prüfst du, ob eine Attributmenge ein Schlüsselkandidat ist:**

1. **Eindeutigkeit:** Können zwei verschiedene Entitäten dieselben Werte haben? Denk dabei an alle *möglichen* Daten, nicht nur an die vorhandenen.
2. **Minimalität:** Lässt sich ein Attribut weglassen, ohne die Eindeutigkeit zu verlieren? Dann war es überflüssig.

Erst wenn 1 erfüllt und 2 nicht mehr möglich ist, liegt ein Schlüsselkandidat vor.
:::

:::snippet{#aufgabe}
Untersuche Entwurf B.

a) In `buch`: Ist `isbn` als Schlüssel geeignet? Wäre `titel` geeignet?

b) In `schueler`: Ist `name` geeignet? Ist `name`, `klasse` geeignet?

c) In `ausleihe`: Wäre `isbn`, `schueler_id` als :t[Primärschlüssel]{#primaerschluessel} geeignet – statt der künstlichen `ausleih_id`?
:::

:::protect{password="db-5-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `isbn` ist geeignet: Sie ist weltweit eindeutig je Titel. `titel` ist ungeeignet – zwei verschiedene Bücher können gleich heißen.

b) `name` ist ungeeignet: Zwei Menschen können gleich heißen. `name`, `klasse` ist besser, aber immer noch unsicher – zwei gleichnamige Personen in einer Klasse sind selten, aber möglich. Und beim Klassenwechsel würde sich der Schlüssel **ändern**, was man einem Primärschlüssel nie zumuten sollte. Deshalb die künstliche `schueler_id`.

c) **Nein.** Mit `isbn`, `schueler_id` als Schlüssel könnte dieselbe Person dasselbe Buch nur **einmal** ausleihen – ein zweites Mal im nächsten Schuljahr wäre unmöglich.

Man könnte `ausleihdatum` in den Schlüssel aufnehmen. Dann sind aber zwei Ausleihen desselben Buches durch dieselbe Person am selben Tag ausgeschlossen, und der Schlüssel wird zu einem sperrigen Gebilde aus drei Attributen, auf das andere Tabellen verweisen müssten. Die künstliche Nummer ist die klar bessere Wahl.

**Als Regel:** Ein natürlicher Schlüssel ist gut, wenn er unveränderlich, kurz und wirklich eindeutig ist – wie die ISBN. Trifft eines davon nicht zu, nimm eine Nummer.

:::

## Beurteilen heißt begründen

:::snippet{#merken}
Eine Beurteilung besteht nicht aus „gut" oder „schlecht", sondern aus drei Teilen:

1. **Kriterium nennen** – „Der Entwurf ist nicht redundanzfrei."
2. **Beleg am Modell** – „Der Autorname steht in jeder Ausleihzeile erneut."
3. **Folge benennen** – „Ein Tippfehler bleibt unentdeckt, und eine Namensänderung müsste an vielen Stellen nachgezogen werden."

Ohne Teil 2 und 3 ist es keine Beurteilung, sondern eine Meinung.
:::

<!--
KLP QPh, Daten und ihre Strukturierung: beurteilen Datenbankmodellierungen und
Datenbankschemata (A); Schlüsselkandidaten als inhaltlicher Schwerpunkt.
-->

---

## Selbsttest

::::multievent

**1. Was ist an Entwurf C grundsätzlich falsch?**

{r1{Es fehlt ein Primärschlüssel.}}

{r1{!Die Ausleihe steht als Attribut am Buch, dadurch geht die Geschichte verloren.}}

{r1{Es gibt zu viele Tabellen.}}

{r1{Die ISBN ist kein guter Schlüssel.}}

{h{Was passiert bei der Rückgabe mit dem alten Eintrag?}}
{H{Richtig. Die Kardinalität wurde falsch bestimmt: Über die Zeit ist es eine n:m-Beziehung.}}

**2. Welche Kriterien sind hart, das heißt, ein Verstoß ist ein Fehler?** (Mehrfachauswahl)

{c1{!Vollständigkeit}}

{c1{!Redundanzfreiheit}}

{c1{!korrekte Kardinalitäten}}

{c1{Angemessenheit des Aufwands}}

{h{Über eines der vier kann man begründet verschiedener Meinung sein.}}
{H{Richtig. Beim Aufwand hängt die Antwort vom Zweck ab.}}

**3. Wann ist ein natürlicher Schlüssel wie die ISBN einem künstlichen vorzuziehen?**

{r2{immer}}

{r2{nie}}

{r2{!wenn er unveränderlich, kurz und wirklich eindeutig ist}}

{r2{wenn die Tabelle klein ist}}

{h{Warum war der Schülername als Schlüssel ungeeignet?}}
{H{Richtig. Trifft eines der drei nicht zu, nimm eine Nummer.}}

**4. Warum ist isbn, schueler_id kein guter Primärschlüssel für die Ausleihe?**

{r3{Weil er aus zwei Attributen besteht.}}

{r3{!Weil dieselbe Person dasselbe Buch dann nur einmal ausleihen könnte.}}

{r3{Weil Fremdschlüssel nicht Primärschlüssel sein dürfen.}}

{r3{Weil die ISBN nicht eindeutig ist.}}

{h{Was ist mit einer zweiten Ausleihe im nächsten Schuljahr?}}
{H{Richtig. Der Schlüssel würde einen zulässigen Vorgang verbieten.}}

**5. Bringe die drei Teile einer vollständigen Beurteilung in die richtige Reihenfolge.**

{S1{Kriterium nennen}}
{S1{Beleg am Modell}}
{S1{Folge benennen}}

{h{Erst sagen, woran man misst; dann zeigen, wo es sichtbar wird; dann sagen, was daraus folgt.}}
{H{Richtig. Ohne die letzten beiden Teile ist es eine Meinung.}}

::::
