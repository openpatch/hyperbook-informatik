---
name: Aufbau und Funktionsweise
index: 1
lang: de
---

# Aufbau und Funktionsweise

![](/images/liste-crc-karten.png)

## Nachrichten anhängen

Die Methode append soll eine neue Nachricht ans Ende der Liste anhängen.

::jmp{id="liste-anhaengen" src="anhaengen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zur Methode append der Klasse List einen Algorithmus im :t[Pseudocode].
3. Tausche deinen Algortihmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
4. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-anhaengen"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Erste Nachricht entfernen

Die Methode remove soll den ersten Knoten der Liste entfernen.

::jmp{id="liste-ersten-entfernen" src="ersten-entfernen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Entwerfe zur Methode remove der Klasse List einen Algorithmus im :t[Pseudocode].
3. Tausche deinen Algortihmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
4. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-ersten-entfernen"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Aktuelle Nachricht entfernen

Die Methode remove soll erweitert werden, sodass der aktuelle Knoten (current) der Liste entfernt wird.

::jmp{id="liste-aktuellen-entfernen" src="aktuellen-entfernen.jmp"}

1. Setze die Schritte im Objektdiagramm um.
2. Erweitere deinen Algorithmus zum Entfernen von Nachrichten, sodass der aktuelle Knoten (current) entfernt wird.

3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-aktuellen-entfernen"}

- Gehe so lange ... bis ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

:::collapsible{title="Hilfe: Vorgehen" id="hilfe-vorgehen"}

Um den aktuellen (current) Knoten zu löschen, muss man den vorherigen Knoten kennen. Doch wie kommt man an den vorherigen Knoten?

:::

## Grenzfälle erkunden

Bis jetzt haben wir Knoten aus der Mitte entfernt und eine neue Nachricht ans Ende einer bereits gefüllte Liste angehängt. Doch man muss auch immer an Grenzfälle denken, wenn man einen Algorithmus formuliert.

### Aufgaben

1. Ermittle, welche Grenzfälle es in Bezug auf die Datenstruktur Liste gibt.
2. Modifiziere deine Algorithmen so, dass die Grenzfälle beachtet werden.

:::collapsible{title="Tipp: Grenzfälle finden" id="tipp-grenzfaelle"}

- Funktionieren deine Algortihmen z.B. für eine leere Liste?
- Funktioniert dein Algorithmus z.B. beim Entfernen des letzen Knotens?

:::


:::collapsible{title="Formulierungshilfe: Pseudocode" id="pseudocode-grenzfaelle"}

- Setze das Attribut / die Variable ... auf die Referenz ...
- Wenn ..., dann ...
- Gehe so lange ... bis ...

:::

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

{c1{!Einfügen in der Mitte kostet nur das Umhaengen von Verweisen.}}

{c1{Der Zugriff auf das n-te Element ist schneller.}}

{c1{Sie braucht weniger Speicher pro Element.}}

{h{Fuer jeden Knoten kommt ein zusaetzlicher Verweis dazu.}}
{H{Richtig! Der wahlfreie Zugriff ist beim Feld sogar deutlich schneller.}}

**4. Wie kommt man an das dritte Element einer verketteten Liste?**

{r3{über den Index 2}}

{r3{!indem man vom Anfang aus zweimal weitergeht}}

{r3{über die Methode toLast}}

{h{Es gibt keinen direkten Zugriff über einen Index.}}
{H{Richtig! Deshalb kostet der Zugriff auf das n-te Element linearen Aufwand.}}

::::
