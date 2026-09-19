---
name: Aufbau und Funktionsweise
index: 1
lang: de
permaid: java-liste-aufbau
---

# Aufbau und Funktionsweise

Stapel und Warteschlange können jeweils genau eine Sache. Für einen Nachrichtenverlauf reicht das nicht: Dort will man **durchblättern**, eine bestimmte Nachricht löschen und eine neue an einer beliebigen Stelle einfügen.

Ein Feld könnte das – aber schlecht. Seine Größe steht beim Anlegen fest, und wer vorne etwas entfernt, muss alles Übrige aufrücken lassen.

:::snippet{#definition}
Eine **verkettete Liste** besteht aus **Knoten**. Jeder Knoten enthält

- ein **Inhaltsobjekt** und
- eine **Referenz auf den nächsten Knoten**.

Der letzte Knoten verweist auf `null`; daran erkennt man das Ende. Die Liste selbst merkt sich den **ersten** Knoten – und in der Abiturklasse zusätzlich den **letzten** sowie einen beweglichen Verweis `current` auf den gerade betrachteten Knoten.
:::

:::snippet{#merken}
Der Unterschied zum Feld in einem Satz: **Ein Feld liegt am Stück, eine Liste hängt aneinander.**

| | Feld | verkettete Liste |
| --- | --- | --- |
| Größe | beim Anlegen festgelegt | wächst beliebig mit |
| Zugriff auf das n-te Element | sofort über den Index | n Schritte vom Anfang aus |
| Einfügen in der Mitte | alles Dahinterliegende aufrücken | zwei Verweise umhängen |
| Speicher pro Element | nur der Inhalt | Inhalt **und** ein Verweis |

Keine der beiden Strukturen ist besser. Sie sind an verschiedenen Stellen gut – und genau das ist die Frage, die du in [Kapitel 7](../../07-testen-und-laufzeit) beurteilen lernst.
:::

![](/images/liste-crc-karten.png)

## Nachrichten anhängen

Die Methode append soll eine neue Nachricht ans Ende der Liste anhängen.

::jmp{id="liste-anhaengen" src="anhaengen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zur Methode append der Klasse List einen Algorithmus im :t[Pseudocode].
3. Tausche deinen Algorithmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
4. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-anhaengen"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Erste Nachricht entfernen

Die Methode remove soll den ersten Knoten der Liste entfernen.

::jmp{id="liste-ersten-entfernen" src="ersten-entfernen.jmp"}

Unter dem Diagramm stehen vier Zuweisungen. Nur eine davon entfernt den ersten Knoten – die anderen drei zerstören die Liste auf je eigene Weise.

1. Sage für **jede** der vier Zuweisungen voraus, was sie am Diagramm ändern würde.
2. Führe sie aus und prüfe deine Vorhersage. Mit **Von vorn** setzt du das Diagramm zurück.
3. Entwerfe zur Methode remove der Klasse List einen Algorithmus im :t[Pseudocode].
4. Tausche deinen Algorithmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
5. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-ersten-entfernen"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Aktuelle Nachricht entfernen

Die Methode remove soll erweitert werden, sodass der aktuelle Knoten (current) der Liste entfernt wird.

::jmp{id="liste-aktuellen-entfernen" src="aktuellen-entfernen.jmp"}

Hier kommt es nicht nur darauf an, **welche** Zuweisungen du ausführst, sondern in **welcher Reihenfolge**. Die Zuweisungen werden in dem Moment ausgewertet, in dem du sie anklickst – ein Ausdruck wie `messages.current.next` liefert also das, worauf `current` gerade jetzt zeigt.

1. Führe die Zuweisungen so aus, dass der aktuelle Knoten aus der Liste verschwindet, und prüfe.
2. Setze zurück und führe **dieselben** Zuweisungen in einer anderen Reihenfolge aus. Beschreibe, was schiefgeht und warum.
3. Formuliere daraus eine Regel: Welche Referenz muss man zuerst lesen, bevor man sie überschreibt?
4. Erweitere deinen Algorithmus zum Entfernen von Nachrichten, sodass der aktuelle Knoten (current) entfernt wird.
5. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-aktuellen-entfernen"}

- Gehe so lange ... bis ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

:::collapsible{title="Hilfe: Vorgehen" id="hilfe-vorgehen"}

Um den aktuellen (current) Knoten zu löschen, muss man den vorherigen Knoten kennen. Doch wie kommt man an den vorherigen Knoten?

:::

## Grenzfälle erkunden

Bis hierher hast du Knoten aus der Mitte entfernt und eine Nachricht ans Ende einer bereits gefüllten Liste angehängt – beides der bequeme Fall. Ein Algorithmus ist aber erst fertig, wenn er auch an den Rändern stimmt.

:::snippet{#aufgabe}
a) Ermittle, welche Grenzfälle es bei der Liste gibt. Geh dafür systematisch vor: Welche **Größen** kann eine Liste haben, und an welchen **Stellen** kann man arbeiten?

b) Prüfe jeden deiner Algorithmen an jedem Grenzfall und notiere, wo er fehlschlägt.

c) Modifiziere die Algorithmen so, dass die Grenzfälle beachtet werden.
:::

:::collapsible{title="Tipp: Grenzfälle finden" id="tipp-grenzfaelle"}

- Funktionieren deine Algorithmen z.B. für eine leere Liste?
- Funktioniert dein Algorithmus z.B. beim Entfernen des letzten Knotens?

:::


:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-grenzfaelle"}

- Setze das Attribut / die Variable ... auf die Referenz ...
- Wenn ..., dann ...
- Gehe so lange ... bis ...

:::

::::collapsible{title="Auflösung zu a)" id="liste-grenzfaelle-aufloesung"}

Die Grenzfälle ergeben sich aus zwei Fragen.

**Wie groß ist die Liste?**

| Fall | Was ist heikel |
| --- | --- |
| leer | `first` ist `null`. Jeder Zugriff auf `first.getContent()` bricht ab. |
| genau ein Knoten | Er ist **gleichzeitig** erster und letzter. Wer ihn entfernt, muss `first` **und** `last` auf `null` setzen. |
| mehrere Knoten | der bequeme Fall |

**An welcher Stelle wird gearbeitet?**

| Fall | Was ist heikel |
| --- | --- |
| am Anfang | Es gibt keinen Vorgänger, dessen Verweis man umhängen könnte – `first` muss direkt geändert werden. |
| in der Mitte | der bequeme Fall |
| am Ende | `last` muss auf den neuen letzten Knoten nachgezogen werden. |
| `current` zeigt auf `null` | Es gibt kein aktuelles Objekt; `remove` und `getContent` dürfen dann **nichts** tun bzw. `null` liefern. |

Das Muster dahinter ist allgemein und kommt in [7.1 Systematisch testen](../../07-testen-und-laufzeit/01-systematisch-testen) wieder: Grenzfälle sind die **kleinstmögliche Eingabe** und die **Ränder** des Bereichs, auf dem man arbeitet.

::::

---

## Selbsttest

::::multievent

**1. Woraus besteht eine verkettete Liste?**

{r1{aus einem Feld fester Größe}}

{r1{!aus Knoten, von denen jeder auf den nächsten verweist}}

{r1{aus zwei parallelen Feldern}}

{h{Genau das unterscheidet sie vom Feld.}}
{H{Richtig! Deshalb kann sie beliebig wachsen.}}

**2. Woran erkennt man das Ende einer verketteten Liste?**

{r2{an einem besonderen Endknoten}}

{r2{!daran, dass der Verweis auf den nächsten Knoten null ist}}

{r2{an der Länge}}

{h{Es gibt kein length wie beim Feld.}}
{H{Richtig!}}

**3. Welchen Vorteil hat die Liste gegenüber einem Feld?** (Mehrfachauswahl)

{c1{!Sie wächst beliebig mit.}}

{c1{!Einfügen in der Mitte kostet nur das Umhängen von Verweisen.}}

{c1{Der Zugriff auf das n-te Element ist schneller.}}

{c1{Sie braucht weniger Speicher pro Element.}}

{h{Für jeden Knoten kommt ein zusätzlicher Verweis dazu.}}
{H{Richtig! Der wahlfreie Zugriff ist beim Feld sogar deutlich schneller.}}

**4. Wie kommt man an das dritte Element einer verketteten Liste?**

{r3{über den Index 2}}

{r3{!indem man vom Anfang aus zweimal weitergeht}}

{r3{über die Methode toLast}}

{h{Es gibt keinen direkten Zugriff über einen Index.}}
{H{Richtig! Deshalb kostet der Zugriff auf das n-te Element linearen Aufwand.}}

::::
