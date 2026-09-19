---
name: Implementierung
index: 3
lang: de
permaid: java-stapel-implementierung
keywords:
  - java
  - qphase
  - lk
---

# Implementierung

:::alert{info}
**Nur Leistungskurs.** Die Operationen einer dynamischen Datenstruktur **selbst zu implementieren**, gehört zu den zusätzlichen Anforderungen des Leistungskurses. Im Grundkurs genügt es, den Aufbau des Stapels zu erläutern ([Aufbau und Funktionsweise](./aufbau-und-funktionsweise)) und ihn über seine [Dokumentation](./dokumentation) zu **benutzen** – so, wie es auch im Zentralabitur vorausgesetzt wird.
:::

<!-- KLP QPh LK, Algorithmen: "implementieren Operationen dynamischer Datenstrukturen (I)" ist nur im LK ausgewiesen.
     GK: "erläutern Operationen dynamischer Datenstrukturen (Stapel, Schlange, Liste, Baum) (A)" und
     "implementieren Algorithmen ... auch unter Verwendung von Datenstrukturen (... Stapel, Schlange, Liste, Baum) (I)"
     - also die Struktur benutzen, nicht bauen. -->

## Aufgaben

1. Implementiere die Methode push. Sie soll das Content-Objekt (pContent) auf den Stapel legen.
2. Implementiere die Methode pop. Sie soll den ersten Knoten des Stapels entfernen.
3. Implementiere die Methode top. Sie soll den Inhalt des ersten Knotens zurückgeben.
4. Implementiere die Methode isEmpty. Sie soll zurückgeben, ob der Stapel leer ist.

:::alert{info}
Da in der Online-IDE bereits eine Klasse Stack existiert, benennen wir die Klasse in NRWStack um.
:::

:::onlineide
```java Main.java
void main() {
    NRWStack<Message> notifications = new NRWStack<Message>();
    notifications.push(new Message("mike", "hallo", "2024-01-24"));
}
```

```java NRWStack.java
public class NRWStack<T> {
    private StackNode<T> head;

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
    private StackNode<T> nextNode;
    private T content;

    public StackNode(T pContent) {
        content = pContent;
        nextNode = null;
    }

    public void setNext(StackNode<T> pNext) {
        nextNode = pNext;
    }

    public StackNode<T> getNext() {
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

::::collapsible{title="Hilfe: Code-Puzzle und Schreibtischtest" id="stapel-code-puzzle"}

Die Puzzles zeigen dieselben Methoden, die du oben schreiben sollst – in Einzelteilen. Der Schreibtischtest am Ende prüft, ob du den Ablauf im Kopf hast.

::bitflow{id="puzzle-stapel" src="code-puzzle.bitflow" height="820px"}

::::

::::collapsible{title="Tipp: An welchem Ende wird gearbeitet?" id="stapel-tipp"}

Beim Stapel wird **immer oben** angesetzt, und „oben" ist hier `head`. Es gibt keinen zweiten Verweis und kein Durchlaufen – deshalb kommt in keiner der vier Methoden eine Schleife vor.

`push` hängt den neuen Knoten **vor** den bisherigen `head` und macht ihn dann selbst zum `head`. Die Reihenfolge dieser beiden Schritte ist entscheidend: Wer zuerst `head` überschreibt, hat den Rest des Stapels verloren.

::::

:::protect{password="java-q-4-st-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
public void push(T pContent) {
    StackNode<T> neuerKnoten = new StackNode<T>(pContent);
    neuerKnoten.setNext(head);   // erst anhängen ...
    head = neuerKnoten;          // ... dann umbiegen
}

public void pop() {
    if (!isEmpty()) {
        head = head.getNext();
    }
}

public T top() {
    if (isEmpty()) {
        return null;
    }
    return head.getContent();
}

public boolean isEmpty() {
    return head == null;
}
```

Worauf es ankam:

- **Die Reihenfolge in `push`.** Stünde `head = neuerKnoten;` zuerst, zeigte danach nichts mehr auf den alten Stapel – er wäre weg.
- **`pop` und `top` prüfen auf den leeren Stapel.** Ohne die Prüfung bricht `head.getNext()` mit einer `NullPointerException` ab. Die Dokumentation legt ausdrücklich fest, dass `pop` auf einem leeren Stapel **nichts** tut.
- **`pop` gibt nichts zurück.** Wer den Inhalt braucht, holt ihn sich vorher mit `top`. Das ist die Aufteilung aus der Dokumentation – und der Grund für die Frage auf der Seite [Aufbau und Funktionsweise](./aufbau-und-funktionsweise).
- **Keine Schleife, nirgends.** Alle vier Methoden sind O(1): Sie fassen nur den obersten Knoten an, egal wie hoch der Stapel ist.

:::

---

## Selbsttest

::::multievent

**1. Welchen Verweis braucht ein Stapel mindestens?**

{r1{einen auf das unterste Element}}

{r1{!einen auf das oberste Element}}

{r1{je einen auf oben und unten}}

{h{Eingefügt und entfernt wird nur an einer Stelle.}}
{H{Richtig! Deshalb ist der Stapel einfacher als die Liste.}}

**2. Was passiert beim Auflegen mit dem bisherigen obersten Knoten?**

{r2{er wird gelöscht}}

{r2{!der neue Knoten verweist auf ihn}}

{r2{er wandert nach unten ans Ende}}

{h{Der neue Knoten wird davorgehängt.}}
{H{Richtig!}}

**3. Woran erkennt die Implementierung, dass der Stapel leer ist?**

{r3{an einem Zähler}}

{r3{!daran, dass der Verweis auf das oberste Element null ist}}

{r3{an der Länge}}

{h{Man braucht dafür kein zusätzliches Attribut.}}
{H{Richtig!}}

**4. Welche Aussagen über die Implementierung stimmen?** (Mehrfachauswahl)

{c1{!Alle Operationen brauchen konstanten Aufwand.}}

{c1{!Der Stapel kann beliebig wachsen.}}

{c1{!Die Knoten sind untereinander verkettet.}}

{c1{Man braucht ein Feld fester Größe.}}

{h{Genau das vermeidet die verkettete Umsetzung.}}
{H{Richtig!}}

::::
