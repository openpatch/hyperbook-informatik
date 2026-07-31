---
name: Aufbau und Funktionsweise
index: 1
lang: de
---

# Aufbau und Funktionsweise

Objekte der Klasse BinaryTree stellen die Knoten dar. Die Methoden der Klasse BinaryTree sind
auch die Schnittstelle für andere Programmierer. Der Grund dafür ist, dass viele Algorithmen für
Binärbäume rekursiv arbeiten. In einer Rekursion kann man jeden beliebigen Knoten eines
Binärbaums (mit seinen Nachfolgern) auch wieder als Binärbaum verstehen, und darauf die
Methoden der Klasse BinaryTree anwenden.

## Objekte der Klasse BinaryTree

Wie List ist auch die Klasse BinaryTree „generisch“. Man kann also Objekte beliebiger Klassen als
Inhalt mit den Knoten verbinden. Welche Klasse für die Inhalte verwendet wird, legt man bei der
Deklaration eines BinaryTree-Objekts fest. Wie bei der Liste kann man innerhalb eines Binärbaums
nur Objekte einer Klasse verwenden.

Jedes BinaryTree-Objekt hat genau ein Inhalts-Objekt, sowie zwei Referenzen auf weitere
BinaryTree-Objekte – left und right, für den linken bzw. rechten Nachfolge-Knoten.

Ein „leerer Knoten“ hat kein Inhalts-Objekt und auch keine Nachfolger.
Sobald ein BinaryTree-Objekt jedoch ein Inhalts-Objekt hat, werden automatisch zwei weitere
BinaryTree-Objekte als dessen Nachfolger erzeugt (die dann zunächst leere Knoten sind).

## Aufgabe 1

1. Lies die Beschreibung des Konstruktors BinaryTree() in der Dokumentation. Er erzeugt einen „leeren Knoten“. Wie sieht dieser leere Knoten in einem Objektdiagramm aus?
2. Lies die Beschreibung der Methode setContent(…) in der Dokumentation. Wie sieht ein zuvor leerer Knoten aus, nachdem man mit setContent einen Inhalt (z.B. einen String) eingefügt hat?

## Aufgabe 2

1. Zeichne ein Objektdiagram, das die Situation am Ende der Methode füllen() darstellt. Nutze dazu dieses [Objektdiagramm](https://jmp.openpatch.org/#pako:eNptUL0SgjAMfpfODro6-gIOOLKkGKBaGi4tKHp9d9MWBu8YevmSfD-Xqm-tfICAtToLHHAgXgqmMRhyvjS9uWMlTwPLoAXrMR5qNRt8jcShkN5SjjJd1vohGgSeEvNpwXtc3S7GAS83xjUWQmCjp7DtLbbJ8p8oJmy6fnfRkAvoyuqqH9gIjCm2EmPX7afMYCfMko0Vs4ayQSblG4ENaFtUhTEje_mbdGZUP4-acBM).
2. Erläutere, wozu die Referenzen wurzel, aktuell und neu benutzt werden. Was würde am Ende der Methode füllen() passieren, wenn wurzel auch lokal deklariert wäre?

```java
public class Beispiel
{
    BinaryTree<String> wurzel;

    public Beispiel()
    {
        wurzel = new BinaryTree();
    }

    public void füllen()
    {
        BinaryTree<String> aktuell, neu;
        wurzel.setContent("Müller");
        neu = new BinaryTree("Günther");
        wurzel.setLeftTree(neu);
        neu = new BinaryTree("Peters");
        wurzel.setRightTree(neu);
        aktuell = wurzel.getLeftTree();
        neu = new BinaryTree("Albrecht");
        aktuell.setLeftTree(neu);
        aktuell = wurzel.getRightTree();
        neu = new BinaryTree("Neumann");
        aktuell.setLeftTree(neu);
    }
}
```

---

## Selbsttest

::::multievent

**1. Wie viele Nachfolger hat ein Knoten in einem Binaerbaum höchstens?**

{z{2}}

{h{Der Name verraet es.}}
{H{Richtig!}}

**2. Was passiert, sobald ein BinaryTree-Objekt ein Inhaltsobjekt bekommt?**

{r1{nichts weiter}}

{r1{!es entstehen automatisch zwei leere Nachfolgerknoten}}

{r1{der Baum wird sortiert}}

{h{So kann man auf jedem Nachfolger wieder dieselben Methoden aufrufen.}}
{H{Richtig!}}

**3. Warum arbeiten die meisten Baumalgorithmen rekursiv?**

{r2{weil Rekursion schneller ist}}

{r2{!weil jeder Teilbaum selbst wieder ein Baum ist}}

{r2{weil Bäume keine Schleifen erlauben}}

{h{Die Datenstruktur ist selbst rekursiv aufgebaut.}}
{H{Richtig!}}

**4. Welche Aussagen über die Klasse BinaryTree stimmen?** (Mehrfachauswahl)

{c1{!Sie ist generisch.}}

{c1{!Jeder Knoten hat genau ein Inhaltsobjekt.}}

{c1{!Ein leerer Knoten hat weder Inhalt noch Nachfolger.}}

{c1{Ein Baum kann Inhalte verschiedener Klassen mischen.}}

{h{Wie bei der Liste legt man den Typ bei der Deklaration fest.}}
{H{Richtig!}}

::::
