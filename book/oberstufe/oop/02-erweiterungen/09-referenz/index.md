---
name: Referenz
index: 9
---

# Referenz

Ein Nachschlagewerk für die Qualifikationsphase. Die Grundlagen findest du in der [Referenz des Grundlagenpfads](../../01-grundlagen/09-referenz).

## Vertiefte Objektorientierung

### Konstanten

```java
public static final int MAX_GROESSE = 100;
```

`final` verhindert Änderungen, `static` sorgt dafür, dass es den Wert nur einmal gibt – unabhängig von der Zahl der Objekte. Angesprochen wird sie über den Klassennamen: `Konto.MAX_GROESSE`.

### Abstrakte Klassen

```java
public abstract class Form {

    protected String bezeichnung;

    public Form(String pBezeichnung) {
        bezeichnung = pBezeichnung;
    }

    /** Muss von jeder konkreten Unterklasse festgelegt werden. */
    public abstract double flaeche();

    /** Kann von allen Unterklassen unverändert benutzt werden. */
    public String beschreibung() {
        return bezeichnung + " mit Fläche " + flaeche();
    }
}
```

Von einer abstrakten Klasse lässt sich **kein Objekt erzeugen**. Jede nicht-abstrakte Unterklasse **muss** alle abstrakten Methoden überschreiben.

### Schnittstellen

```java
public interface Bezahlbar {
    double betrag();
    String bezeichnung();
}

public class Angestellter extends Mitarbeiter implements Bezahlbar {
    ...
}
```

Erst `extends`, dann `implements`. Eine Klasse erbt von **einer** Klasse, implementiert aber **beliebig viele** Schnittstellen.

| | abstrakte Klasse | Schnittstelle |
| --- | --- | --- |
| Attribute | ja | nein |
| Konstruktor | ja | nein |
| Methodenrümpfe | ja | nein |
| Anzahl pro Klasse | genau eine | beliebig viele |
| Beziehung | „ist ein“ | „kann etwas“ |

### Polymorphie

| Begriff | Bedeutung |
| --- | --- |
| **statischer Typ** | der Typ der Variablen. Entscheidet, **welche Methoden man aufrufen darf** |
| **dynamischer Typ** | der tatsächliche Typ des Objekts. Entscheidet, **welche Fassung ausgeführt wird** |

```java
Konto k = new Girokonto("Alan", 500.0);
k.hebeAb(400.0);        // die Fassung aus Girokonto greift
// k.getDispolimit();   // Fehler: Konto kennt diese Methode nicht
```

### Diagrammnotation

| Zeichen | Bedeutung |
| --- | --- |
| `-` | `private` |
| `#` | `protected` |
| `+` | `public` |
| unterstrichen | `static` |
| *kursiv* | abstrakt |
| `<<interface>>` | Schnittstelle |
| Pfeil mit leerem Dreieck | Vererbung |
| **gestrichelter** Pfeil mit leerem Dreieck | implementiert eine Schnittstelle |
| einfacher Pfeil | Assoziation |

## Felder und Referenzen

### Zweidimensionale Felder

```java
int[][] gitter = new int[3][4];   // 3 Zeilen, 4 Spalten
gitter[1][2] = 7;                 // erst Zeile, dann Spalte
gitter.length                     // Anzahl der Zeilen
gitter[0].length                  // Anzahl der Spalten in Zeile 0

for (int z = 0; z < gitter.length; z++) {
    for (int s = 0; s < gitter[z].length; s++) {
        ...
    }
}
```

### Referenzen

| | elementarer Typ | Objekttyp |
| --- | --- | --- |
| in der Variablen steht | der Wert | eine Referenz |
| beim Methodenaufruf wird kopiert | der Wert | die Referenz |
| Methode kann das Original ändern | nein | **ja** |
| `==` vergleicht | den Wert | die **Identität** |

**Flache Kopie:** neues Feld, dieselben Objekte.
**Tiefe Kopie:** neues Feld, neue Objekte.

### Generische Klassen

```java
public class Behaelter<T> {

    private T[] inhalt;

    public Behaelter(int pMax) {
        inhalt = new T[pMax];
    }

    public T gib(int pI) {
        return inhalt[pI];
    }
}

Behaelter<String> b = new Behaelter<String>(5);
```

:::alert{info}
`new T[n]` funktioniert in dieser Umgebung, in echtem Java **nicht**. Dort behilft man sich mit einem `Object[]` und einer Typumwandlung. Der Cast `(T) objekt` geht hier umgekehrt **nicht**.
:::

Ein Typparameter muss ein **Objekttyp** sein: `Integer` statt `int`, `Double` statt `double`, `Boolean` statt `boolean`.

Einschränkung: `class Rechner<E extends Zahlartig>` erlaubt nur Typen, die von `Zahlartig` erben.

## Rekursion

```java
int fakultaet(int pN) {
    if (pN <= 1) {       // Basisfall
        return 1;
    }
    return pN * fakultaet(pN - 1);   // Rekursionsschritt
}
```

Jede rekursive Methode braucht **beides**: einen Basisfall ohne Selbstaufruf und einen Schritt, der ihm näher kommt.

Jeder Aufruf belegt einen Eintrag auf dem **Aufrufstapel**. Rekursion kostet also Speicher.

| Strategie | zerlegt in | Beispiele |
| --- | --- | --- |
| **Modularisierung** | verschiedenartige Teilaufgaben | Methoden bilden |
| **Teilen und Herrschen** | gleichartige kleinere Teilprobleme | binäre Suche, Quicksort, Mergesort |
| **Backtracking** | Entscheidung, Rekursion, Rücknahme | Labyrinth, n Damen, Sudoku |

Das Backtracking-Muster:

```
boolean loese(Zustand):
    wenn Lösung:   gib true zurück
    wenn ungültig: gib false zurück
    für jede Entscheidung:
        treffe sie
        wenn loese(neuer Zustand): gib true zurück
        nimm sie zurück
    gib false zurück
```

## Die NRW-Klassenbibliothek

Wird über `libraries="nrw"` geladen. Es sind dieselben Klassen, die im Zentralabitur vorausgesetzt werden.

:::alert{info}
Die Namen `List`, `Stack` und `Queue` sind in der Online-IDE bereits durch eigene Klassen belegt. Wenn du sie **selbst** implementierst, nenne deine Klassen deshalb `NRWList`, `NRWStack` und `NRWQueue`.
:::

### List

```java
List<ContentType>
```

| Methode | Wirkung |
| --- | --- |
| `boolean isEmpty()` | ob die Liste leer ist |
| `boolean hasAccess()` | ob es ein aktuelles Objekt gibt |
| `void toFirst()` / `toLast()` | setzt den Zeiger auf das erste bzw. letzte Objekt |
| `void next()` | rückt einen Schritt weiter |
| `ContentType getContent()` | das aktuelle Objekt, sonst `null` |
| `void setContent(ContentType pContent)` | ersetzt das aktuelle Objekt |
| `void insert(ContentType pContent)` | fügt **vor** dem aktuellen Objekt ein |
| `void append(ContentType pContent)` | hängt am Ende an |
| `void concat(List<ContentType> pList)` | hängt eine ganze Liste an |
| `void remove()` | entfernt das aktuelle Objekt |

### Stack

```java
Stack<ContentType>
```

| Methode | Wirkung |
| --- | --- |
| `boolean isEmpty()` | ob der Stapel leer ist |
| `void push(ContentType pContent)` | legt oben auf |
| `void pop()` | entfernt das oberste Objekt |
| `ContentType top()` | liefert das oberste Objekt, ohne es zu entfernen |

Wer zuletzt kam, geht zuerst.

### Queue

```java
Queue<ContentType>
```

| Methode | Wirkung |
| --- | --- |
| `boolean isEmpty()` | ob die Schlange leer ist |
| `void enqueue(ContentType pContent)` | hängt hinten an |
| `void dequeue()` | entfernt das vorderste Objekt |
| `ContentType front()` | liefert das vorderste Objekt, ohne es zu entfernen |

Wer zuerst kam, geht zuerst.

### BinaryTree

```java
BinaryTree<ContentType>
```

| Methode | Wirkung |
| --- | --- |
| `BinaryTree()` | erzeugt einen leeren Baum |
| `BinaryTree(ContentType pContent)` | erzeugt einen Baum mit Inhalt und zwei leeren Nachfolgern |
| `BinaryTree(ContentType pContent, BinaryTree<ContentType> pLeft, BinaryTree<ContentType> pRight)` | mit vorgegebenen Teilbäumen |
| `boolean isEmpty()` | ob der Knoten leer ist |
| `ContentType getContent()` / `void setContent(...)` | Inhalt lesen und setzen |
| `BinaryTree<ContentType> getLeftTree()` / `getRightTree()` | die beiden Teilbäume |
| `void setLeftTree(...)` / `setRightTree(...)` | Teilbäume setzen |

### BinarySearchTree

```java
BinarySearchTree<ContentType extends ComparableContent<ContentType>>
```

| Methode | Wirkung |
| --- | --- |
| `void insert(ContentType pContent)` | fügt sortiert ein |
| `void remove(ContentType pContent)` | entfernt |
| `ContentType search(ContentType pContent)` | sucht, liefert `null` bei Misserfolg |
| `BinarySearchTree<ContentType> getLeftTree()` / `getRightTree()` | die Teilbäume |
| `ContentType getContent()`, `boolean isEmpty()` | wie beim Binärbaum |

Der Inhaltstyp muss die Schnittstelle `ComparableContent` erfüllen:

```java
public interface ComparableContent<ContentType> {
    boolean isGreater(ContentType pContent);
    boolean isLess(ContentType pContent);
    boolean isEqual(ContentType pContent);
}
```

### Graph, Vertex und Edge

| Klasse | wichtige Methoden |
| --- | --- |
| `Vertex` | `getID()`, `isMarked()`, `setMark(boolean)` |
| `Edge` | `getVertices()`, `getWeight(...)`, `setWeight(double)`, `isMarked()`, `setMark(boolean)` |
| `Graph` | `addVertex`, `addEdge`, `removeVertex`, `removeEdge`, `getVertex(String)`, `getVertices()`, `getEdges()`, `getNeighbours(Vertex)`, `getEdge(Vertex, Vertex)`, `setAllVertexMarks(boolean)`, `allVerticesMarked()`, `isEmpty()` |

## Sortieren und Suchen im Überblick

| Verfahren | mittlerer Fall | schlechtester Fall | Zusatzspeicher | erkennt sortierte Daten |
| --- | --- | --- | --- | --- |
| lineare Suche | O(n) | O(n) | O(1) | – |
| binäre Suche, iterativ | O(log n) | O(log n) | O(1) | setzt Sortierung voraus |
| binäre Suche, rekursiv | O(log n) | O(log n) | O(log n) | setzt Sortierung voraus |
| Sortieren durch Auswählen | O(n²) | O(n²) | O(1) | nein |
| Bubblesort | O(n²) | O(n²) | O(1) | ja |
| Sortieren durch Einfügen | O(n²) | O(n²) | O(1) | ja |
| Quicksort | O(n·log n) | **O(n²)** | O(log n) | – |
| Mergesort | O(n·log n) | **O(n·log n)** | **O(n)** | – |

## Komplexitätsklassen

| Klasse | wenn n sich verdoppelt … |
| --- | --- |
| O(1) | ändert sich nichts |
| O(log n) | kommt ein Schritt dazu |
| O(n) | verdoppelt sich der Aufwand |
| O(n·log n) | etwas mehr als das Doppelte |
| O(n²) | vervierfacht sich der Aufwand |
| O(n³) | verachtfacht sich der Aufwand |
| O(2ⁿ) | quadriert sich der Aufwand |

**Ablesen aus dem Quelltext:**

1. Anweisungen nacheinander → die größte Klasse gewinnt.
2. Schleife → Klasse des Rumpfs mal Anzahl der Durchläufe.
3. Verschachtelte Schleifen → die Klassen multiplizieren sich.
4. Rekursion → Anzahl der Ebenen mal Arbeit pro Ebene.

## Testen

```java
@Test
class RechnerTest {

    @Test
    void testMaximum() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(3, 9), "maximum(3, 9) muss 9 sein.");
        assertTrue(r.istGerade(4), "4 ist gerade.");
        assertFalse(r.istGerade(5), "5 ist ungerade.");
    }
}
```

Vier Sorten von Testfällen gehören zu jeder Methode:

| Sorte | Frage |
| --- | --- |
| **Normalfall** | Was ist der typische Einsatz? |
| **Randfall** | Was passiert an den Grenzen? |
| **Sonderfall** | Was ist die kleinstmögliche Eingabe? |
| **Fehlerfall** | Was passiert bei unzulässiger Eingabe? |

**Grenzwertanalyse:** An jeder Bereichsgrenze den **letzten gültigen** und den **ersten ungültigen** Wert prüfen. Dort stecken die meisten Fehler.

## Nebenläufigkeit

```java
public class Zaehler implements Runnable {
    public void run() { ... }
}

Thread t = new Thread(new Zaehler());
t.start();      // nicht run() aufrufen!
```

Gemeinsame Daten absichern:

```java
private Semaphore schloss = new Semaphore(1);

public void zahleEin() {
    schloss.acquire();
    stand = stand + 1;      // kritischer Abschnitt
    schloss.release();
}
```

| Begriff | Bedeutung |
| --- | --- |
| **nebenläufig** | in unbestimmter Reihenfolge ausführbar |
| **parallel** | tatsächlich gleichzeitig, braucht mehrere Kerne |
| **kritischer Abschnitt** | Codebereich, in dem auf gemeinsame Daten zugegriffen wird |
| **wechselseitiger Ausschluss** | im kritischen Abschnitt ist immer nur ein Thread |
| **Wettlaufsituation** | das Ergebnis hängt von der zufälligen Reihenfolge ab |
| **Verklemmung** | zwei Threads warten für immer aufeinander |

Nebenläufigkeit lohnt sich, wenn die Teilaufgaben **unabhängig** sind. Sobald sie sich Daten teilen, kostet die Absicherung Zeit – und bringt eine Klasse schwer zu findender Fehler mit.
