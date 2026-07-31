---
title: Chancen und Risiken
index: 3
---

# Chancen und Risiken

Bis hierher ging es darum, was man **darf**. Jetzt geht es darum, was man **will** – und was das für andere bedeutet.

## Warum überhaupt eine eigene Seite?

:::snippet{#brain}
Man kann alles, was auf einer eigenen Homepage steht, auch in einem sozialen Netzwerk veröffentlichen. Es ist bequemer, es erreicht mehr Leute, und man muss kein :t[HTML]{#html} können.

Trotzdem gibt es Gründe für die eigene Seite:

| | eigene Seite | soziales Netzwerk |
| --- | --- | --- |
| **Wem gehören die Inhalte?** | dir | dir – aber die Plattform darf sie weitreichend nutzen |
| **Wer entscheidet, wer sie sieht?** | jeder, der die Adresse kennt | ein Empfehlungsverfahren, das du nicht kennst |
| **Was passiert bei einer Sperrung?** | nichts, es gibt keine | alles ist weg, oft ohne Begründung |
| **Wie lange gibt es sie?** | solange du willst | solange es die Plattform gibt |
| **Aufwand** | hoch | niedrig |
| **Reichweite** | gering | hoch |

Es gibt keine richtige Antwort. Aber es gibt einen Unterschied zwischen *ich habe mich entschieden* und *ich habe nie darüber nachgedacht*.
:::

## Wer kann deine Seite benutzen?

:::snippet{#aufgabe}
Auf einer Webseite treffen sehr unterschiedliche Menschen zusammen. Überlege für jede der folgenden Personen: Was braucht sie, damit deine Seite für sie funktioniert?

a) Jemand, der blind ist und sich die Seite vorlesen lässt.

b) Jemand mit einer Rot-Grün-Sehschwäche.

c) Jemand mit einer alten Mobilfunkverbindung.

d) Jemand, der die Maus nicht benutzen kann und nur die Tastatur hat.

e) Jemand, der die Sprache der Seite gerade lernt.
:::

::::collapsible{title="Tipp"}

Fast alle Antworten sind Dinge, die du in diesem Lernpfad schon gelernt hast.

::::

:::protect{password="web-5-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Alternativtexte** bei Bildern, richtige **Überschriftenstufen**, **semantische Elemente** und sprechende **Linktexte**. Alles aus [Kapitel 2](../02-html-inhalte-auszeichnen).

b) Informationen dürfen **nicht allein an Farbe** hängen. Ein rot markierter Pflichttext muss zusätzlich ein Wort oder ein Zeichen tragen. Und die Farben brauchen genug **Kontrast** – die Entwicklerwerkzeuge zeigen den Kontrastwert an, wenn man eine Farbe anklickt.

c) **Kleine Dateien.** Ein Foto in voller Kameraauflösung ist schnell 5 MB groß und braucht auf einer langsamen Verbindung eine halbe Minute. Bilder gehören vorher verkleinert, `loading="lazy"` hilft zusätzlich.

d) Alles muss sich **mit der Tabulatortaste** erreichen lassen, und es muss zu sehen sein, wo man gerade ist. Wer echte `<a>`- und `<button>`-Elemente verwendet, bekommt das geschenkt. Wer stattdessen ein `<div>` anklickbar macht, verliert es.

e) **Einfache Sätze**, ein gesetztes `lang`-Attribut und eine klare Gliederung. Übersetzungsprogramme arbeiten mit gut ausgezeichnetem HTML besser.

**Der gemeinsame Nenner:** Zugänglichkeit ist fast nie eine Zusatzarbeit am Ende. Sie ergibt sich aus sauberem HTML – oder sie ist verloren.

:::

## Was von dir im Netz bleibt

:::snippet{#merken}
Alles, was du veröffentlichst, kann:

- **kopiert** werden, bevor du es löschst
- von **Suchmaschinen** aufgenommen und noch Monate später angezeigt werden
- von **Archivdiensten** dauerhaft gespeichert werden
- in einen **Zusammenhang gestellt** werden, den du nicht vorhergesehen hast

Das ist nicht nur ein Risiko. Dieselben Eigenschaften machen das Web zu dem, was es ist: Ein Text bleibt auffindbar, auch wenn seine Autorin ihn vergessen hat.

Die Frage ist nicht „soll ich überhaupt etwas veröffentlichen", sondern: **Will ich, dass genau das in fünf Jahren noch auffindbar ist?**
:::

:::snippet{#aufgabe}
Vier Angaben stehen zur Wahl für deine Projektseite. Beurteile jede: Was spricht dafür, was dagegen? Was würdest du tun?

a) Dein vollständiger Name

b) Ein Foto von dir

c) Deine Schule und deine Klasse

d) Deine E-Mail-Adresse
:::

:::protect{password="web-5-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Es gibt hier kein Richtig und kein Falsch – wohl aber gute und schlechte Begründungen.

a) **Dafür:** Wer etwas Eigenes gemacht hat, darf dafür stehen. Für ein Portfolio, das man später zeigen will, ist der Name nötig. **Dagegen:** Der Name ist über Suchmaschinen dauerhaft mit dieser Seite verknüpft – auch mit dem, was du in fünf Jahren peinlich findest. **Häufiger Kompromiss:** Vorname und erster Buchstabe des Nachnamens.

b) **Dafür:** Es macht die Seite persönlicher. **Dagegen:** Ein Bild lässt sich per Bildersuche wiederfinden und mit anderen Vorkommen verknüpfen. Bei Minderjährigen ist zusätzlich die Einwilligung der Erziehungsberechtigten nötig. **Kompromiss:** ein selbst gezeichnetes Bild.

c) **Dafür:** Es ordnet das Projekt ein. **Dagegen:** Zusammen mit dem Namen ergibt sich daraus, wo du dich jeden Tag aufhältst. Das ist die Angabe mit dem **schlechtesten Verhältnis** von Nutzen zu Risiko.

d) **Dafür:** Ohne Kontaktmöglichkeit kann niemand auf dich zugehen. **Dagegen:** Adressen auf öffentlichen Seiten werden automatisch eingesammelt und bekommen Werbepost. **Kompromiss:** eine eigene Adresse nur für diesen Zweck, oder die Adresse der Schule.

**Die Prüffrage, die weiterhilft:** Wozu ist die Angabe da? Was ginge ohne sie nicht? Wenn dir dazu nichts einfällt, gehört sie nicht auf die Seite – das ist die Datenminimierung aus der [letzten Lektion](./02-impressum-und-datenschutz), angewandt auf dich selbst.

:::

## Abschließende Abwägung

:::snippet{#aufgabe}
Schreibe einen kurzen Text von etwa einer halben Seite:

**Sollte unsere Klasse eine eigene Webseite veröffentlichen?**

Nenne mindestens zwei Chancen und zwei Risiken. Nimm am Ende begründet Stellung und beschreibe, unter welchen Bedingungen du zustimmen würdest.
:::

::::collapsible{title="Tipp: Woran denken?"}

Für die Chancen: Wer hätte etwas davon? Was ginge damit, was ohne nicht geht?

Für die Risiken: Wessen Daten stehen darauf? Wer entscheidet, was hinaufkommt? Was passiert, wenn jemand später etwas gelöscht haben will? Wer pflegt die Seite in zwei Jahren?

Für die Bedingungen: Wer darf etwas veröffentlichen? Wer prüft es? Wie kommt man wieder heraus?

::::

<!--
UV 10.2, Inhaltsfeld Informatik, Mensch und Gesellschaft: Chancen und Risiken
der Nutzung von Informatiksystemen. Konkretisierte Kompetenzerwartung:
erläutern rechtliche Rahmenbedingungen für die Veröffentlichung von
Inhalten (A).

Die Abschlussaufgabe eignet sich als schriftliche Leistungsüberprüfung oder
als Grundlage einer Diskussion im Plenum.
-->

---

## Selbsttest

::::multievent

**1. Was ist ein Vorteil einer eigenen Seite gegenüber einem sozialen Netzwerk?**

{r1{höhere Reichweite}}

{r1{!du entscheidest allein, was darauf steht und wie lange}}

{r1{weniger Aufwand}}

{r1{bessere Bildqualität}}

{h{Was passiert mit deinen Inhalten, wenn ein Konto gesperrt wird?}}
{H{Richtig – dafür ist die Reichweite geringer und der Aufwand höher.}}

**2. Was braucht jemand, der sich die Seite vorlesen lässt?** (Mehrfachauswahl)

{c1{!Alternativtexte bei Bildern}}

{c1{!richtige Überschriftenstufen}}

{c1{!sprechende Linktexte}}

{c1{eine besonders große Schrift}}

{h{Alle drei richtigen Antworten stammen aus Kapitel 2.}}
{H{Richtig. Zugänglichkeit entsteht aus sauberem HTML.}}

**3. Warum darf eine Information nicht allein an einer Farbe hängen?**

{r2{Weil Farben auf jedem Bildschirm anders aussehen.}}

{r2{!Weil Menschen mit einer Sehschwäche sie nicht unterscheiden können.}}

{r2{Weil Farben Speicherplatz kosten.}}

{r2{Weil CSS Farben nicht zuverlässig darstellt.}}

{h{Denk an eine Rot-Grün-Sehschwäche.}}
{H{Richtig – es braucht zusätzlich ein Wort oder ein Zeichen.}}

**4. Warum ist die Kombination aus Name, Foto und Schule besonders heikel?**

{r3{Weil sie viel Speicherplatz braucht.}}

{r3{!Weil sich daraus ergibt, wer jemand ist und wo er sich täglich aufhält.}}

{r3{Weil Schulen keine Webseiten erlauben.}}

{r3{Weil Fotos immer urheberrechtlich geschützt sind.}}

{h{Jede Angabe für sich ist harmlos. Zusammen ergeben sie mehr.}}
{H{Richtig – deshalb prüft man jede Angabe einzeln auf ihren Nutzen.}}

**5. Warum hilft es wenig, eine Angabe später zu löschen?**

{r4{Weil Löschen technisch nicht möglich ist.}}

{r4{!Weil bis dahin Kopien in Suchmaschinen und Archiven entstanden sein können.}}

{r4{Weil das Impressum es verbietet.}}

{r4{Weil der Server sich weigert.}}

{h{Was passiert mit etwas, das öffentlich abrufbar war?}}
{H{Richtig. Deshalb gehört die Entscheidung vor die Veröffentlichung.}}

**6. Welche Prüffrage hilft bei jeder Angabe auf einer Seite?**

{r5{Sieht es gut aus?}}

{r5{!Wozu ist die Angabe da – was ginge ohne sie nicht?}}

{r5{Ist es technisch möglich?}}

{r5{Machen das andere auch so?}}

{h{Es ist die Datenminimierung, angewandt auf sich selbst.}}
{H{Richtig. Fällt dir kein Zweck ein, gehört sie nicht auf die Seite.}}

::::
