---
name: Dokumentation
lang: de
index: 2
---

# Dokumentation der Abiturklasse Stack

Die Dokumentation, die du auch im Abitur bekommst, kannst du hier herunterladen: https://www.schulentwicklung.nrw.de/lehrplaene/upload/klp_SII/if/Dokumentation_ZA-IF_GK-LK_ab_2018_2021_12_22.pdf

Die Implementation der Klassen fürs Abitur kannst du hier herunterladen: https://www.schulentwicklung.nrw.de/lehrplaene/upload/klp_SII/if/MaterialZABI/2020-03-11_Implementationen_von_Klassen_fuer_das_Zentralabitur_ab_2018.zip

Zur Vereinfachung kannst du die Dokumentation der Klasse Stack im Folgenden finden, sodass du nicht immer auf das PDF zurückgreifen musst.

## Klassendiagramm

```mermaid
classDiagram
    direction LR
    class Stack~ContentType~ {
        +Stack()
        +isEmpty() boolean
        +push(pContent: ContentType)
        +pop()
        +top() ContentType
    }

    class StackNode~ContentType~ {
        +StackNode(pContent: ContentType)
        +getNext() StackNode
        +setNext(pNext: StackNode)
        +getContent() ContentType
    }

    Stack~ContentType~ --> StackNode~ContentType~:head 
    Stack~ContentType~ --> StackNode~ContentType~: tail
    StackNode~ContentType~ --> StackNode~ContentType~: next
    StackNode~ContentType~ --> ContentType: content

    class ContentType {

    }

```

## Methoden

### Stack() (Konstruktor)
Ein leerer Stapel wird erzeugt. Objekte, die in diesem Stapel verwaltet werden, müssen vom
Typ ContentType sein.

### boolean isEmpty()
Die Anfrage liefert den Wert true, wenn der Stapel keine Objekte enthält, sonst liefert sie
den Wert false.

### void push(ContentType pContent)
Das Objekt pContent wird oben auf den Stapel gelegt. Falls pContent gleich null ist,
bleibt der Stapel unverändert.

### void pop()
Das zuletzt eingefügte Objekt wird von dem Stapel entfernt. Falls der Stapel leer ist, bleibt
er unverändert.

### ContentType top()
Die Anfrage liefert das oberste Stapelobjekt. Der Stapel bleibt unverändert. Falls der Stapel
leer ist, wird null zurückgegeben.

---

## Selbsttest

::::multievent

**1. Welche Methode legt ein Element auf den Stapel?**

{r1{!push}}

{r1{pop}}

{r1{top}}

{h{Der englische Name bedeutet schieben.}}
{H{Richtig!}}

**2. Was ist der Unterschied zwischen pop und top?**

{r2{keiner}}

{r2{!pop entfernt das oberste Element, top liefert es nur}}

{r2{pop liefert das unterste Element}}

{h{Eine der beiden verändert den Stapel, die andere nicht.}}
{H{Richtig!}}

**3. Was liefert top bei einem leeren Stapel?**

{r3{einen Fehler}}

{r3{!den Wert null}}

{r3{das zuletzt entfernte Element}}

{h{Die Dokumentation legt das ausdruecklich fest.}}
{H{Richtig!}}

**4. Warum sollte man vor jedem pop mit isEmpty pruefen?**

{r4{weil pop sonst langsam ist}}

{r4{!weil ein pop auf dem leeren Stapel nichts Sinnvolles tun kann}}

{r4{weil isEmpty den Stapel zurücksetzt}}

{h{Sonderfälle gehören immer geprueft.}}
{H{Richtig!}}

::::
