---
name: Implementierung
index: 3
lang: de
permaid: java-warteschlange-implementierung
keywords:
  - java
  - qphase
  - lk
---

# Implementierung

:::alert{info}
**Nur Leistungskurs.** Die Operationen einer dynamischen Datenstruktur **selbst zu implementieren**, gehört zu den zusätzlichen Anforderungen des Leistungskurses. Im Grundkurs genügt es, den Aufbau der Warteschlange zu erläutern ([Aufbau und Funktionsweise](./aufbau-und-funktionsweise)) und sie über ihre [Dokumentation](./dokumentation) zu **benutzen** – so, wie es auch im Zentralabitur vorausgesetzt wird.
:::

<!-- KLP QPh LK, Algorithmen: "implementieren Operationen dynamischer Datenstrukturen (I)" ist nur im LK ausgewiesen.
     GK: "erläutern Operationen dynamischer Datenstrukturen (Stapel, Schlange, Liste, Baum) (A)" und
     "implementieren Algorithmen ... auch unter Verwendung von Datenstrukturen (... Stapel, Schlange, Liste, Baum) (I)"
     - also die Struktur benutzen, nicht bauen. -->

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
    private QueueNode<T> front;
    private QueueNode<T> tail;

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
    private QueueNode<T> nextNode;
    private T content;

    public QueueNode(T pContent) {
        content = pContent;
        nextNode = null;
    }

    public void setNext(QueueNode<T> pNext) {
        nextNode = pNext;
    }

    public QueueNode<T> getNext() {
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

::::collapsible{title="Hilfe: Code-Puzzle und Schreibtischtest" id="warteschlange-code-puzzle"}

Die Puzzles zeigen dieselben Methoden, die du oben schreiben sollst – in Einzelteilen. Der Schreibtischtest am Ende prüft, ob du den Ablauf im Kopf hast.

::bitflow{id="puzzle-warteschlange" src="code-puzzle.bitflow" height="820px"}

::::

::::collapsible{title="Tipp: Zwei Enden, zwei Verweise" id="schlange-tipp"}

Anders als der Stapel arbeitet die Warteschlange an **beiden** Enden: `enqueue` hinten, `front` und `dequeue` vorne. Deshalb gibt es zwei Verweise.

Zwei Sonderfälle entscheiden über richtig und falsch: Was ist, wenn die Schlange **leer** ist und der erste Knoten dazukommt? Und was, wenn der **letzte** Knoten entnommen wird?

::::

:::protect{password="java-q-4-ws-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
public void enqueue(T pContent) {
    QueueNode<T> neuerKnoten = new QueueNode<T>(pContent);
    if (isEmpty()) {
        front = neuerKnoten;     // erster Knoten: beide Verweise
        tail = neuerKnoten;
    } else {
        tail.setNext(neuerKnoten);
        tail = neuerKnoten;
    }
}

public void dequeue() {
    if (!isEmpty()) {
        front = front.getNext();
        if (front == null) {     // war der letzte Knoten
            tail = null;
        }
    }
}

public T front() {
    if (isEmpty()) {
        return null;
    }
    return front.getContent();
}

public boolean isEmpty() {
    return front == null;
}
```

Worauf es ankam:

- **Der erste Knoten ist der Sonderfall beim Einfügen.** Er ist gleichzeitig der erste und der letzte, also müssen `front` **und** `tail` auf ihn zeigen. Ohne diese Fallunterscheidung liefe `tail.setNext(...)` auf `null`.
- **Der letzte Knoten ist der Sonderfall beim Entnehmen.** Bleibt `tail` auf dem entfernten Knoten stehen, hängt das nächste `enqueue` den neuen Knoten an einen Knoten an, der gar nicht mehr in der Schlange ist.
- **Der Verweis `tail` ist der Grund, warum `enqueue` O(1) ist.** Ohne ihn müsste jedes Einfügen die ganze Schlange durchlaufen, um das Ende zu finden – das wäre O(n).

Eine Stolperstelle beim Lesen: Das Attribut heißt `front` und die Methode ebenfalls `front()`. Java kann beides auseinanderhalten – `front` ist der Knoten, `front()` der Aufruf –, für Menschen ist es trotzdem verwirrend. In eigenem Quelltext lohnt es sich, dem Attribut einen anderen Namen zu geben.

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
