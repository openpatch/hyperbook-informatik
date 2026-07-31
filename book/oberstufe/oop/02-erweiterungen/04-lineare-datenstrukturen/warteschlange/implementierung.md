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

:::onlineide

```java Main.java
void main() {
    NRWQueue<Message> notifications = new NRWQueue<Message>();
    notifications.enqueue(new Message("mike", "hallo", "2024-01-24"));
}
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
        return null; // ersetze diese Zeile
    }

    public boolean isEmpty() {
        return false; // ersetze diese Zeile
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

---

## Selbsttest

::::multievent

**1. Welche Verweise braucht eine Schlange?**

{r1{nur einen auf das vorderste Element}}

{r1{!je einen auf das vorderste und das hinterste Element}}

{r1{einen auf jedes Element}}

{h{An beiden Enden wird gearbeitet.}}
{H{Richtig!}}

**2. Was muss beim Einfügen in eine leere Schlange beachtet werden?**

{r2{nichts}}

{r2{!beide Verweise müssen auf den neuen Knoten zeigen}}

{r2{es muss zuerst front aufgerufen werden}}

{h{Der einzige Knoten ist gleichzeitig der vorderste und der hinterste.}}
{H{Richtig!}}

**3. Was muss beim Entfernen des letzten verbliebenen Elements beachtet werden?**

{r3{nichts}}

{r3{!auch der Verweis auf das hinterste Element muss auf null gesetzt werden}}

{r3{die Schlange muss neu erzeugt werden}}

{h{Sonst zeigt der hintere Verweis noch auf einen entfernten Knoten.}}
{H{Richtig! Das ist der häufigste Fehler bei dieser Implementierung.}}

**4. Welche Aufwandsklasse haben alle Operationen der Schlange?**

{r4{linear}}

{r4{!konstant}}

{r4{logarithmisch}}

{h{Es wird nur an den beiden Enden gearbeitet, nie durchlaufen.}}
{H{Richtig!}}

::::
