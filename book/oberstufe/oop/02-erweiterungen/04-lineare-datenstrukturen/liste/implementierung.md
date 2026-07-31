---
name: Implementierung
index: 4
lang: de
---

# Implementierung

## Aufgaben

1. Implementiere die Method next. Sie soll das Attribut current auf den nächsten Knoten setzen.
2. Implementiere die Methode removeFirst. Sie soll den ersten Knoten der List entfernen.
3. Implementiere die Methode append. Sie soll das Nachrichten-Objekt (pMessages) ans Ende der Liste anhängen.
4. Implementiere die Methode remove. Sie soll den aktuellen (current) Knoten der List entfernen.

:::alert{info}
Da in der Online-IDE bereits eine Klasse List existiert, benennen wir die Klasse in NRWList um.
:::

:::onlineide
```java Main.java
void main() {
    NRWList meineListe = new NRWList();
    meineListe.append(new Message("mike", "hallo", "2024-03-18"));
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

::::collapsible{title="Lösung: List" id="jkasdjkafdjk"}

:::onlineide

```java Main.java
void main() {
    NRWList liste = new NRWList();
    liste.append(new Message("mike", "hallo", "2024-03-18"));
    liste.append(new Message("ada", "moin", "2024-03-19"));

    liste.toFirst();
    while (liste.hasAccess()) {
        IO.println(liste.getContent().getText());
        liste.next();
    }
}
```

```java NRWList.java
public class NRWList {
    ListNode first;
    ListNode last;
    ListNode current;

    public void next() {
        if (current == null) {
            current = first;
        } else {
            current = current.getNextNode();
        }
    }

    public void removeFirst() {
        if (current == first) {
            current = null;
        }
        if (first != null) {
            first = first.getNextNode();
        } else if (first == last) {
            first = null;
            last = null;
        }
    }

    public void append(Message pMessage) {
        ListNode tmp = new ListNode();
        tmp.setContentObject(pMessage);

        // Fall, dass die Liste leer ist
        if (first == null) {
            first = tmp;
            last = tmp;
        } else {
            last.setNextNode(tmp);
            last = tmp;
        }
    }

    public void remove() {
        ListNode removeObj = this.current;
        ListNode previous = this.first;

        if (removeObj == this.first) {
            removeFirst();
        } else {

            while(previous.getNextNode() != removeObj) {
                previous = previous.getNextNode();
            }

            previous.setNextNode(removeObj.getNextNode());

            if (removeObj == this.last) {
                previous.setNextNode(null);
                last = previous;
            }
        }
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
