---
name: Implementierung
index: 4
lang: de
permaid: java-liste-implementierung
---

# Implementierung

## Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: die Liste implementieren**

a) Implementiere die Methode next. Sie soll das Attribut current auf den nächsten Knoten setzen.

b) Implementiere die Methode removeFirst. Sie soll den ersten Knoten der Liste entfernen.

c) Implementiere die Methode append. Sie soll das Nachrichten-Objekt (pMessage) ans Ende der Liste anhängen.

d) Implementiere die Methode remove. Sie soll den aktuellen (current) Knoten der Liste entfernen.

Halte dich an die [Dokumentation](./dokumentation): next rückt nur weiter, wenn es ein aktuelles Objekt gibt, und remove tut nichts, wenn current auf null zeigt. Sag vor jedem Testlauf voraus, was die Ausgabe zeigen wird.
:::

:::alert{info}
Da in der Online-IDE bereits eine Klasse List existiert, benennen wir die Klasse in NRWList um.
:::

:::onlineide
```java Main.java
void main() {
    NRWList meineListe = new NRWList();
    meineListe.append(new Message("mike", "hallo", "2024-03-18"));
    meineListe.append(new Message("ada", "moin", "2024-03-19"));

    // Die Ausgabe funktioniert erst, wenn append und next stimmen.
    meineListe.toFirst();
    while (meineListe.hasAccess()) {
        IO.println(meineListe.getContent().getText());
        meineListe.next();
    }
}
```

```java NRWList.java
public class NRWList {
    private ListNode first;
    private ListNode last;
    private ListNode current;

    public void next() {

    }

    public void removeFirst() {

    }

    public void append(Message pMessage) {

    }

    public void remove() {

    }

    // Ab hier ist alles fertig - damit du deine Methoden ausprobieren kannst.

    public boolean isEmpty() {
        return first == null;
    }

    public boolean hasAccess() {
        return current != null;
    }

    public void toFirst() {
        current = first;
    }

    public Message getContent() {
        if (hasAccess()) {
            return current.getContentObject();
        }
        return null;
    }
}

```

```java ListNode.java
public class ListNode {
    private ListNode next;
    private Message contentObject;

    public void setContentObject(Message contentObject) {
        this.contentObject = contentObject;
    }

    public Message getContentObject() {
        return contentObject;
    }

    public ListNode getNextNode() {
        return next;
    }

    public void setNextNode(ListNode next) {
        this.next = next;
    }
}
```

```java Message.java
public class Message {
    private String username;
    private String text;
    private String date;

    public Message(String username, String text, String date) {
        this.username = username;
        this.text = text;
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public String getText() {
        return text;
    }

    public String getDate() {
        return date;
    }

}
```

:::

:::collapsible{title="Hilfe: Code-Puzzle und Schreibtischtest" id="liste-code-puzzle"}

Die Puzzles zeigen dieselben Methoden, die du oben schreiben sollst – in Einzelteilen. Der Schreibtischtest am Ende prüft, ob du den Ablauf im Kopf hast.

::bitflow{id="puzzle-liste" src="code-puzzle.bitflow" height="820px"}

:::

:::collapsible{title="Tipp 1: Die Grenzfälle zuerst" id="tipp-grenzfaelle-implementierung"}

Schreib dir für jede Methode auf, was in diesen drei Fällen passieren muss: leere Liste, Liste mit genau einem Knoten, letzter Knoten. Genau dort stehen die zusätzlichen if-Abfragen – der Normalfall ist meist eine Zeile.

:::

:::collapsible{title="Tipp 2: Den Vorgänger suchen" id="tipp-vorgaenger"}

Für remove brauchst du den Knoten **vor** current. Eine einfach verkettete Liste kennt nur den Weg nach vorne, also läufst du von first aus los:

```java
ListNode vorgaenger = first;
while (vorgaenger.getNextNode() != current) {
    vorgaenger = vorgaenger.getNextNode();
}
```

Danach hängst du den Verweis von vorgaenger um – und denkst daran, dass last neu gesetzt werden muss, wenn current der letzte Knoten war.

:::

::::protect{password="java-q-4-l-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

:::onlineide

```java Main.java
void main() {
    NRWList meineListe = new NRWList();
    meineListe.append(new Message("mike", "hallo", "2024-03-18"));
    meineListe.append(new Message("ada", "moin", "2024-03-19"));

    meineListe.toFirst();
    while (meineListe.hasAccess()) {
        IO.println(meineListe.getContent().getText());
        meineListe.next();
    }
}
```

```java NRWList.java
public class NRWList {
    private ListNode first;
    private ListNode last;
    private ListNode current;

    public void next() {
        // Ohne aktuelles Objekt passiert nichts.
        if (hasAccess()) {
            current = current.getNextNode();
        }
    }

    public void removeFirst() {
        // Eine leere Liste bleibt unveraendert.
        if (first == null) {
            return;
        }

        // Stand current auf dem ersten Knoten, wandert es zum Nachfolger.
        if (current == first) {
            current = first.getNextNode();
        }

        first = first.getNextNode();

        // Der einzige Knoten wurde entfernt - die Liste ist jetzt leer.
        if (first == null) {
            last = null;
        }
    }

    public void append(Message pMessage) {
        if (pMessage == null) {
            return;
        }

        ListNode neuerKnoten = new ListNode();
        neuerKnoten.setContentObject(pMessage);

        // Fall, dass die Liste leer ist: Der neue Knoten ist erster und letzter.
        if (first == null) {
            first = neuerKnoten;
            last = neuerKnoten;
        } else {
            last.setNextNode(neuerKnoten);
            last = neuerKnoten;
        }
    }

    public void remove() {
        // Ohne aktuelles Objekt passiert nichts.
        if (!hasAccess()) {
            return;
        }

        // Der erste Knoten ist ein Sonderfall - dafuer gibt es removeFirst.
        if (current == first) {
            removeFirst();
            return;
        }

        ListNode vorgaenger = first;
        while (vorgaenger.getNextNode() != current) {
            vorgaenger = vorgaenger.getNextNode();
        }

        ListNode nachfolger = current.getNextNode();
        vorgaenger.setNextNode(nachfolger);

        // War current der letzte Knoten, ist es jetzt sein Vorgaenger.
        if (current == last) {
            last = vorgaenger;
        }

        // Current wandert zum Nachfolger - gibt es keinen, wird hasAccess false.
        current = nachfolger;
    }

    public boolean isEmpty() {
        return first == null;
    }

    public boolean hasAccess() {
        return current != null;
    }

    public void toFirst() {
        current = first;
    }

    public Message getContent() {
        if (hasAccess()) {
            return current.getContentObject();
        }
        return null;
    }
}
```

```java ListNode.java
public class ListNode {
    private ListNode next;
    private Message contentObject;

    public void setContentObject(Message contentObject) {
        this.contentObject = contentObject;
    }

    public Message getContentObject() {
        return contentObject;
    }

    public ListNode getNextNode() {
        return next;
    }

    public void setNextNode(ListNode next) {
        this.next = next;
    }
}
```

```java Message.java
public class Message {
    private String username;
    private String text;
    private String date;

    public Message(String username, String text, String date) {
        this.username = username;
        this.text = text;
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public String getText() {
        return text;
    }

    public String getDate() {
        return date;
    }

}
```

:::

::::

---

## Selbsttest

::::multievent

**1. Welche Verweise braucht eine verkettete Liste mindestens?**

{r1{nur einen auf das erste Element}}

{r1{!je einen auf das erste, das letzte und das aktuelle Element}}

{r1{einen auf jedes Element}}

{h{Ohne den Verweis auf das letzte Element müsste append jedes Mal durchlaufen.}}
{H{Richtig!}}

**2. Was muss man beim Einfügen in eine leere Liste besonders beachten?**

{r2{nichts}}

{r2{!dass sowohl first als auch last auf den neuen Knoten zeigen müssen}}

{r2{dass zuerst toFirst aufgerufen werden muss}}

{h{Der einzige Knoten ist gleichzeitig der erste und der letzte.}}
{H{Richtig! Das ist der häufigste Sonderfall bei der Implementierung.}}

**3. Warum braucht das Entfernen eines Knotens den Vorgänger?**

{r3{um den Inhalt zu sichern}}

{r3{!weil dessen Verweis auf den übernächsten Knoten umgehängt werden muss}}

{r3{um die Länge zu aktualisieren}}

{h{Eine einfach verkettete Liste kennt nur den Weg nach vorne.}}
{H{Richtig! Deshalb muss man ihn von vorne suchen.}}

**4. Welche Sonderfälle gehören in jede Testliste einer Liste?** (Mehrfachauswahl)

{c1{!die leere Liste}}

{c1{!die Liste mit genau einem Element}}

{c1{!Entfernen ohne aktuelles Objekt}}

{c1{eine Liste mit genau 100 Elementen}}

{h{Die Zahl 100 ist kein Sonderfall, sondern ein Normalfall.}}
{H{Richtig!}}

::::
