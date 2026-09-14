---
name: Vertiefte Objektorientierung
index: 1
lang: de
permaid: java-vertiefung
---

# Vertiefte Objektorientierung

## Worum geht es hier?

In der Einführungsphase hast du gelernt, wie man Klassen schreibt und wie eine Unterklasse von einer Oberklasse erbt. Das waren **Sprachmittel**. In diesem Kapitel geht es um die Frage, die eine Stufe darüber liegt: **Wie entwirft man eine Klassenhierarchie, die trägt?**

Wann zieht man Gemeinsames nach oben – und wann wäre das ein Fehler? Warum darf man von manchen Klassen gar kein Objekt erzeugen? Und wieso läuft bei einem Aufruf, der überall gleich aussieht, bei jedem Objekt etwas anderes? Genau danach wird in der Qualifikationsphase gefragt, und zwar nicht nur mit „setze um", sondern mit **„begründe"** und **„beurteile"**.

## Für dieses Kapitel musst du …

- eine Klasse mit Attributen, Konstruktor und Methoden schreiben können ([6.1 Klassen und Objekte](../../01-grundlagen/06-objektorientierung/01-klassen-und-objekte)),
- wissen, warum Attribute `private` sind ([6.2 Geheimnisprinzip](../../01-grundlagen/06-objektorientierung/02-geheimnisprinzip)),
- mit `extends`, `super(...)` und überschriebenen Methoden umgehen können ([6.4 Vererbung](../../01-grundlagen/06-objektorientierung/04-vererbung)),
- ein Feld anlegen und durchlaufen können ([5.2 Felder durchlaufen](../../01-grundlagen/05-felder/02-felder-durchlaufen)).

Die optionale Seite **Im Spiel** arbeitet zusätzlich mit der Grafikbibliothek **Scratch for Java** aus der Einführungsphase. Du musst sie **nicht** kennen: Auf der Seite steht ein ausklappbarer Kasten mit allem, was du dort brauchst, und nachschlagen kannst du in der [Referenz](../09-referenz#scratch-for-java).

Ob das noch sitzt, findest du im [Check-in](../00-check-in) heraus. Er dauert eine Doppelstunde und sagt dir genau, welche Seite du gegebenenfalls noch einmal aufschlagen solltest.

## Hier lernst du …

- ein **Implementationsdiagramm** zu lesen und zu schreiben – vollständig, mit Datentypen und Sichtbarkeiten,
- was **Klassenattribute** und **Konstanten** sind und wozu man sie braucht,
- eine Vererbungshierarchie zu **entwerfen** und eine fremde zu **beurteilen**,
- was **Polymorphie** ist und warum sie Fallunterscheidungen überflüssig macht,
- wann eine Klasse **abstrakt** sein muss,
- *(nur Leistungskurs)* wann eine **Schnittstelle** die bessere Wahl ist als eine Oberklasse.

## So sind die Lektionen aufgebaut

:::snippet{#merken}
Jede Lektion dieses Kapitels hat denselben Zuschnitt – so wie der [Check-in](../00-check-in):

1. **Erarbeitung** – Erklärung, Merksätze und ein Programmierbereich, in dem etwas läuft, das du verändern kannst.
2. **Teil 1: Lesen** – Aufgaben **ohne Rechner**. Der Quelltext steht als normaler Textblock da; du sagst auf Papier voraus, was passiert, und prüfst es erst danach in der Online-IDE nach. Wenn Vorhersage und Ergebnis auseinandergehen, hast du gerade das Wichtigste gelernt.
3. **Teil 2: Schreiben** – Aufgaben am Rechner. Zu jeder liegen **Tests** bereit: Über den Reiter *Testrunner* siehst du selbst, ob deine Lösung stimmt.
4. **Zum Weiterdenken** – Aufgaben, die niemand braucht, um weiterzukommen. Sie führen an Fragen heran, die in der Informatik echte Entwurfsfragen sind.
5. **Selbsttest** – ein paar kurze Fragen über die Lektion.

**Lösungen sind mit einem Passwort geschützt.** Alle Passwörter stehen auf der Seite [Lösungspasswörter](/loesungen). Sieh dort erst nach, wenn du die Aufgabe wirklich versucht und die gestuften Tipps geöffnet hast – sonst misst du nur, wie gut du abschreiben kannst.
:::

## Die Lektionen

| | Lektion | Darum geht es |
| --- | --- | --- |
| 1.1 | [Implementationsdiagramme](./01-implementationsdiagramme) | Ein Diagramm, aus dem sich der Quelltext ohne Rückfrage schreiben lässt |
| 1.2 | [Klassenattribute und Konstanten](./02-klassenattribute-und-konstanten) | Was zur Klasse gehört statt zum einzelnen Objekt |
| 1.3 | [Generalisierung und Spezialisierung](./03-generalisierung-und-spezialisierung) | Hierarchien entwerfen – und erkennen, wann eine nicht trägt |
| 1.4 | [Polymorphie](./04-polymorphie) | Ein Aufruf, viele Wirkungen |
| 1.5 | [Abstrakte Klassen](./05-abstrakte-klassen) | Klassen, von denen es kein Objekt geben darf |
| 1.6 | [Schnittstellen](./06-schnittstellen) *(LK)* | Eine Zusicherung ohne gemeinsame Oberklasse |
| 1.7 | [Rückblick](./07-rueckblick) | Gemischte Aufgaben über das ganze Kapitel |
| | [Im Spiel: ein Typ für alle Objekte](./08-im-spiel) *(optional)* | Alles aus 1.2 bis 1.6 an einem Spiel angewandt |

<!--
Fuer Lehrkraefte: Das Kapitel deckt aus dem KLP QPh das Inhaltsfeld "Daten und
ihre Strukturierung" ab, soweit es die objektorientierte Modellierung betrifft:
Klassenmodellierungen und Implementationsdiagramme, Vererbungsbeziehungen im
Zusammenhang von Generalisierung, Spezialisierung, Polymorphie und abstrakten
Klassen; Schnittstellen nur LK.

Zeitbedarf: rund 14 Unterrichtsstunden im GK, 17 im LK.

Die Aufteilung in acht Lektionen ist bewusst feiner als der Lehrplantext:
Jede Lektion traegt genau einen Gedanken und ist in einer Stunde zu schaffen.

Die Seite "Im Spiel" steht bewusst **hinter** dem Rueckblick: Sie fuehrt keine
neue Kompetenz ein, sondern wendet 1.2 bis 1.6 am Abschlussprojekt der EF an
und ist damit die Bruecke zwischen den beiden Lernpfaden. Sie ist optional -
weder der Rueckblick noch spaetere Kapitel setzen sie voraus. Stufe 3 der
Seite ist LK (Schnittstellen).
1.3 ist die Lektion fuer die Anforderungsbereiche "begruenden" und
"beurteilen" (A) - dort wird nicht implementiert, sondern entschieden.
-->
