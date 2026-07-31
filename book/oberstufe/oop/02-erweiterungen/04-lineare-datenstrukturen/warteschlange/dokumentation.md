---
name: Dokumentation
lang: de
index: 2
---

# Dokumentation der Abiturklasse Queue

Die Dokumentation, die du auch im Abitur bekommst, kannst du hier herunterladen: https://www.schulentwicklung.nrw.de/lehrplaene/upload/klp_SII/if/Dokumentation_ZA-IF_GK-LK_ab_2018_2021_12_22.pdf

Die Implementation der Klassen fürs Abitur kannst du hier herunterladen: https://www.schulentwicklung.nrw.de/lehrplaene/upload/klp_SII/if/MaterialZABI/2020-03-11_Implementationen_von_Klassen_fuer_das_Zentralabitur_ab_2018.zip

Zur Vereinfachung kannst du die Dokumentation der Klasse Queue im Folgenden finden, sodass du nicht immer auf das PDF zurückgreifen musst.

## Klassendiagramm

```mermaid
classDiagram
    direction LR
    class Queue~ContentType~ {
        +Queue()
        +isEmpty() boolean
        +enqueue(pContent: ContentType)
        +dequeue()
        +front() ContentType
    }

    class QueueNode~ContentType~ {
        +QueueNode(pContent: ContentType)
        +getNext() QueueNode
        +setNext(pNext: QueueNode)
        +getContent() ContentType
    }

    Queue~ContentType~ --> QueueNode~ContentType~:head 
    Queue~ContentType~ --> QueueNode~ContentType~: tail
    QueueNode~ContentType~ --> QueueNode~ContentType~: next
    QueueNode~ContentType~ --> ContentType: content

    class ContentType {

    }

```

## Methoden

### Queue() (Konstruktor)
Eine leere Schlange wird erzeugt. Objekte, die in dieser Schlange verwaltet werden, müssen vom Typ ContentType sein.

### boolean isEmpty()
Die Anfrage liefert den Wert true, wenn die Schlange keine Objekte enthält, sonst liefert sie den Wert false.

### void enqueue(ContentType pContent)
Das Objekt pContent wird an die Schlange angehängt. Falls pContent gleich null ist, bleibt die Schlange unverändert.

### void dequeue()
Das erste Objekt wird aus der Schlange entfernt. Falls die Schlange leer ist, wird sie nicht verändert.

### ContentType front()
Die Anfrage liefert das erste Objekt der Schlange. Die Schlange bleibt unverändert. Falls die Schlange leer ist, wird null zurückgegeben.

---

## Selbsttest

::::multievent

**1. Welche Methode haengt ein Element hinten an?**

{r1{!enqueue}}

{r1{dequeue}}

{r1{front}}

{h{Der Name bedeutet einreihen.}}
{H{Richtig!}}

**2. Was liefert front?**

{r2{das zuletzt eingefügte Element}}

{r2{!das vorderste Element, ohne es zu entfernen}}

{r2{die Anzahl der Elemente}}

{h{Zum Entfernen gibt es eine eigene Methode.}}
{H{Richtig!}}

**3. Was liefert dequeue zurück?**

{r3{das entfernte Element}}

{r3{!nichts, die Methode entfernt nur}}

{r3{die neue Länge}}

{h{Um an das Element zu kommen, muss man vorher front aufrufen.}}
{H{Richtig! Das ist bei der Abiturklasse ausdruecklich so festgelegt.}}

**4. In welcher Reihenfolge ruft man die Methoden auf, um das vorderste Element zu verarbeiten?**

{r4{erst dequeue, dann front}}

{r4{!erst front, dann dequeue}}

{r4{nur dequeue}}

{h{Nach dem Entfernen kommt man an das Element nicht mehr heran.}}
{H{Richtig!}}

::::
