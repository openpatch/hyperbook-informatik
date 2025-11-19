---
name: Implementierung
index: 3
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

:::onlineide{id="list-geruest"}
```java Main.java
NRWList meineListe = new NRWList();
meineListe.append(new Message("mike", "hallo", "2024-03-18"));
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

:::onlineide{id="list-loesung"}

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
