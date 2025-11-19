---
name: Implementierung
index: 3
lang: de
---

# Implementierung

## Aufgaben

1. Implementiere die Methode enqueue. Sie soll das Content-Objekt (pContent) ans Ende der Warteschlange anhängen.
2. Implementiere die Methode dequeue. Sie soll den ersten Knoten der warteschlange entfernen.
3. Implementiere die Methode front. Sie soll den Inhalt des ersten Knotens zurückgeben.
4. Implementiere die Methode isEmpty. Sie soll zurückgeben, ob die Warteschlange leer ist.

:::alert{info}
Da in der Online-IDE bereits eine Klasse Queue existiert, benennen wir die Klasse in NRWQueue um.
:::

:::onlineide{id="queue-geruest"}

```java Main.java
NRWQueue<Message> notifications = new NRWQueue<Message>();
notifications.enqueue(new Message("mike", "hallo", "2024-01-24"));
```

```java NRWQueue.java
public class NRWQueue<T> {
    private QueueNode front;
    private QueueNode tail;

    public void enqueue(T pContent) {

    }

    public void dequeue() {

    }

    public T front() {

    }

    public boolean isEmpty() {

    }
}
```

```java QueueNode.java
public class QueueNode<T> {
    private QueueNode nextNode;
    private T content;

    public QueueNode(T pContent) {
        content = pContent;
        nextNode = null;
    }

    public void setNext(QueueNode pNext) {
        nextNode = pNext;
    }

    public QueueNode getNext() {
        return nextNode;
    }

    public T getContent() {
        return content;
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