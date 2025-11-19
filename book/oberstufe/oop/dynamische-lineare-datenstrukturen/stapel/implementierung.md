---
name: Implementierung
index: 3
lang: de
---

# Implementierung

## Aufgaben

1. Implementiere die Methode push. Sie soll das Content-Objekt (pContent) auf den Stapel legen.
2. Implementiere die Methode pop. Sie soll den ersten Knoten des Stapels entfernen.
3. Implementiere die Methode top. Sie soll den Inhalt des ersten Knotens zurückgeben.
4. Implementiere die Methode isEmpty. Sie soll zurückgeben, ob der Stapel leer ist.

:::alert{info}
Da in der Online-IDE bereits eine Klasse Stack existiert, benennen wir die Klasse in NRWStack um.
:::

:::onlineide{id="nrw-stack"}
```java Main.java
NRWStack<Message> notifications = new NRWStack<Message>();
notifications.push(new Message("mike", "hallo", "2024-01-24"));
```

```java NRWStack.java
public class NRWStack<T> {
    private StackNode head;

    public void push(T pContent) {

    }

    public void pop() {

    }

    public T top() {
        return null;
    }

    public boolean isEmpty() {
        return false;
    }
}
```

```java StackNode.java
public class StackNode<T> {
    private StackNode nextNode;
    private T content;

    public StackNode(T pContent) {
        content = pContent;
        nextNode = null;
    }

    public void setNext(StackNode pNext) {
        nextNode = pNext;
    }

    public StackNode getNext() {
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
