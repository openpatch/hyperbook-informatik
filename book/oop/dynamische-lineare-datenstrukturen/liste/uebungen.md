---
name: Übungen
index: 5
lang: de
---

# Übungen

Die folgenden Aufgaben sollen mit der Abiturklasse List bearbeitet werden.

## Aufgabe 1

Beantworte die folgenden Verständnisfragen (ohne Programmierung).

1. In einer Liste wurden bereits drei Elemente eingefügt. Wenn man das zweite Element in der Liste löschen möchte, welche Methoden (der Klasse List) ruft man dazu nacheinander auf?
2. Eine Liste hat drei Elemente. Wenn man zwischen dem ersten und zweiten Element der Liste ein weiteres Element einfügen möchte, welche Methoden ruft man dazu nacheinander auf?
3. In welchen Fällen liefert hasAccess() den Wert false? In welchen Fällen den Wert true? Liste alle denkbaren Fälle auf.
4. Warum kann man mit insert() kein Element am Ende der Liste einfügen? Wie kann man trotzdem ein Objekt ans Ende der Liste hängen?

## Aufgabe 2

Das folgende Beispielprogramm erzeugt eine Liste und fügt einige Elemente ein. Zeichne je ein Objektdiagramm der Situation 1., 2. und 3. Nutze dazu diese [Vorlage](https://jmp.openpatch.org/#pako:eNptUDsOwjAMvUtmBlg5A4Kha5ekuBBI48pxSwvK3XGSVkioQ2T7-X0iq0-tAmuGWh2l7aBDmkuPPVv0oQx3e4VKntEkQKtdgLir1Wjh1SNxIU1S9oLOS30jdtIeEvPpdAiwuJ1sWCSamawZeN00AxH4tCysM17la6JvLYUNWFz_0ZjifuNWiodpw6tBz2v2xTyg4cWsErW_bVuN2g2QJSsrZg1mg0zKh9JktXFFVRgjUJADp1tF9QWOZYeu). Speichere dir nach jeder Situation ein Bild (Download (PNG)).

```java
public class Beispiel {
    public void ausfuehren() {
        List<String>farbenListe = new List<>();
        // 1. Diagramm

        farbenListe.append("Rot");
        farbenListe.append("Blau");
        farbenListe.append("Gelb");
        // 2. Diagramm

        farbenListe.toFirst();
        farbenListe.next();
        farbenListe.remove();
        farbenListe.next();
        farbenListe.insert("Grün");
        farbenListe.append("Orange");
        // 3. Diagramm
    }
}

```

## Aufgabe 3

Lade dir das BlueJ Projekt herunter und bearbeite die nachfolgenden Aufgaben. Wahlweise kannst du die Aufgaben auch in der online IDE bearbeiten

::archive[BlueJ Projekt]{name="list-aufgabe-3"}

1. Deklariere und erzeuge eine Referenz für ein Objekt der Klasse List, welche Strings enthalten soll. Das Objekt soll im Konstruktor erzeugt werden.
2. Implementiere die Methode fuelle(). Sie fügt die Strings "Rot", "Blau", "Gelb" und "Grün" (in dieser Reihenfolge) in die Liste ein.
3. Implementiere die Methode vertauschen1(). Die Methode soll das zweite und das vierte Element der Liste vertauschen, ohne die Methode setContent zu benutzten - getContent() ist jedoch erlaubt und erfolderlich. Falls die Liste nicht genügend Elemente hat, soll die Methode nichts tun.
4. Implementiere die Methode vertauschen2(int pos1, int pos2). Die Methode vertauscht die Elemente der Liste an den Stellen pos1 und pos2. Beispiel: pos1 = 0 und pos2 = 2 vertauscht das erste und das dritte Element der Liste. Falls die Liste nicht genügend Elemente hat, geschieht nichts. Für diese Aufgabe darfst du die Methode setContent() benutzen, aber vielleicht schaffst du es auch ohne ;).


Online IDE
:::onlineide{id="List Aufgabe"}

```java NRWList.java
public class NRWList<T> {
    ListNode first;
    ListNode last;
    ListNode current;

 public NRWList() {
    first = null;
    last = null;
    current = null;
  }

  /**
   * Die Anfrage liefert den Wert true, wenn die Liste keine Objekte enthaelt,
   * sonst liefert sie den Wert false.
   * 
   * @return true, wenn die Liste leer ist, sonst false
   */
  public boolean isEmpty() {
    // Die Liste ist leer, wenn es kein erstes Element gibt.
    return first == null;
  }

  /**
   * Die Anfrage liefert den Wert true, wenn es ein aktuelles Objekt gibt,
   * sonst liefert sie den Wert false.
   * 
   * @return true, falls Zugriff moeglich, sonst false
   */
  public boolean hasAccess() {
    // Es gibt keinen Zugriff, wenn current auf kein Element verweist.
    return current != null; 
  }

  /**
   * Falls die Liste nicht leer ist, es ein aktuelles Objekt gibt und dieses
   * nicht das letzte Objekt der Liste ist, wird das dem aktuellen Objekt in
   * der Liste folgende Objekt zum aktuellen Objekt, andernfalls gibt es nach
   * Ausfuehrung des Auftrags kein aktuelles Objekt, d.h. hasAccess() liefert
   * den Wert false.
   */
  public void next() {
    if (this.hasAccess()) {
      current = current.getNextNode();
    }
  }

  /**
   * Falls die Liste nicht leer ist, wird das erste Objekt der Liste aktuelles
   * Objekt. Ist die Liste leer, geschieht nichts.
   */
  public void toFirst() {
    if (!isEmpty()) {
      current = first;
    }
  }

  /**
   * Falls die Liste nicht leer ist, wird das letzte Objekt der Liste
   * aktuelles Objekt. Ist die Liste leer, geschieht nichts.
   */
  public void toLast() {
    if (!isEmpty()) {
      current = last;
    }
  }

  /**
   * Falls es ein aktuelles Objekt gibt (hasAccess() == true), wird das
   * aktuelle Objekt zurueckgegeben, andernfalls (hasAccess() == false) gibt
   * die Anfrage den Wert null zurueck.
   * 
   * @return das aktuelle Objekt (vom Typ ContentType) oder null, wenn es
   *         kein aktuelles Objekt gibt
   */
  public ContentType getContent() {
    if (this.hasAccess()) {
      return current.getContentObject();
    } else {
      return null;
    }
  }

  /**
   * Falls es ein aktuelles Objekt gibt (hasAccess() == true) und pContent
   * ungleich null ist, wird das aktuelle Objekt durch pContent ersetzt. Sonst
   * geschieht nichts.
   * 
   * @param pContent
   *            das zu schreibende Objekt vom Typ ContentType
   */
  public void setContent(ContentType pContent) {
    // Nichts tun, wenn es keinen Inhalt oder kein aktuelles Element gibt.
    if (pContent != null && this.hasAccess()) { 
      current.setContentObject(pContent);
    }
  }

  /**
   * Falls es ein aktuelles Objekt gibt (hasAccess() == true), wird ein neues
   * Objekt vor dem aktuellen Objekt in die Liste eingefuegt. Das aktuelle
   * Objekt bleibt unveraendert. <br />
   * Wenn die Liste leer ist, wird pContent in die Liste eingefuegt und es
   * gibt weiterhin kein aktuelles Objekt (hasAccess() == false). <br />
   * Falls es kein aktuelles Objekt gibt (hasAccess() == false) und die Liste
   * nicht leer ist oder pContent gleich null ist, geschieht nichts.
   * 
   * @param pContent
   *            das einzufuegende Objekt vom Typ ContentType
   */
  public void insert(ContentType pContent) {
    if (pContent != null) { // Nichts tun, wenn es keinen Inhalt gibt.
      if (this.hasAccess()) { // Fall: Es gibt ein aktuelles Element.

        // Neuen Knoten erstellen.
        ListNode newNode = new ListNode(pContent); 

        if (current != first) { // Fall: Nicht an erster Stelle einfuegen.
          ListNode previous = this.getPrevious(current);
          newNode.setNextNode(previous.getNextNode());
          previous.setNextNode(newNode);
        } else { // Fall: An erster Stelle einfuegen.
          newNode.setNextNode(first);
          first = newNode;
        }

      } else { //Fall: Es gibt kein aktuelles Element.

        if (this.isEmpty()) { // Fall: In leere Liste einfuegen.

          // Neuen Knoten erstellen.
          ListNode newNode = new ListNode(pContent); 

          first = newNode;
          last = newNode;
        }

      }
    }
  }

  /**
   * Falls pContent gleich null ist, geschieht nichts.<br />
   * Ansonsten wird ein neues Objekt pContent am Ende der Liste eingefuegt.
   * Das aktuelle Objekt bleibt unveraendert. <br />
   * Wenn die Liste leer ist, wird das Objekt pContent in die Liste eingefuegt
   * und es gibt weiterhin kein aktuelles Objekt (hasAccess() == false).
   * 
   * @param pContent
   *            das anzuhaengende Objekt vom Typ ContentType
   */
  public void append(ContentType pContent) {
    if (pContent != null) { // Nichts tun, wenn es keine Inhalt gibt.

      if (this.isEmpty()) { // Fall: An leere Liste anfuegen.
        this.insert(pContent);
      } else { // Fall: An nicht-leere Liste anfuegen.

        // Neuen Knoten erstellen.
        ListNode newNode = new ListNode(pContent); 

        last.setNextNode(newNode);
        last = newNode; // Letzten Knoten aktualisieren.
      }

    }
  }

  /**
   * Falls pList null oder eine leere Liste ist, geschieht nichts.<br />
   * Ansonsten wird die Liste pList an die aktuelle Liste angehaengt.
   * Anschliessend wird pList eine leere Liste. Das aktuelle Objekt bleibt
   * unveraendert. Insbesondere bleibt hasAccess identisch.
   * 
   * @param pList
   *            die am Ende anzuhaengende Liste vom Typ List<ContentType>
   */
  public void concat(NRWList<ContentType> pList) {
    if (pList != null && !pList.isEmpty()) { // Nichts tun, wenn pList leer oder nicht existent.

      if (this.isEmpty()) { // Fall: An leere Liste anfuegen.
        this.first = pList.first;
        this.last = pList.last;
      } else { // Fall: An nicht-leere Liste anfuegen.
        this.last.setNextNode(pList.first);
        this.last = pList.last;
      }

      // Liste pList loeschen.
      pList.first = null;
      pList.last = null;
      pList.current = null;
    }
  }

  /**
   * Wenn die Liste leer ist oder es kein aktuelles Objekt gibt (hasAccess()
   * == false), geschieht nichts.<br />
   * Falls es ein aktuelles Objekt gibt (hasAccess() == true), wird das
   * aktuelle Objekt geloescht und das Objekt hinter dem geloeschten Objekt
   * wird zum aktuellen Objekt. <br />
   * Wird das Objekt, das am Ende der Liste steht, geloescht, gibt es kein
   * aktuelles Objekt mehr.
   */
  public void remove() {
    // Nichts tun, wenn es kein aktuelle Element gibt oder die Liste leer ist.
    if (this.hasAccess() && !this.isEmpty()) { 

      if (current == first) {
        first = first.getNextNode();
      } else {
        ListNode previous = this.getPrevious(current);
        if (current == last) {
          last = previous;
        }
        previous.setNextNode(current.getNextNode());
      }

      ListNode temp = current.getNextNode();
      current.setContentObject(null);
      current.setNextNode(null);
      current = temp;

      //Beim loeschen des letzten Elements last auf null setzen. 
      if (this.isEmpty()) {
        last = null;
      }
    }
  }

  /**
   * Liefert den Vorgaengerknoten des Knotens pNode. Ist die Liste leer, pNode
   * == null, pNode nicht in der Liste oder pNode der erste Knoten der Liste,
   * wird null zurueckgegeben.
   *
   * @param pNode
   *         der Knoten, dessen Vorgaenger zurueckgegeben werden soll
   * @return der Vorgaenger des Knotens pNode oder null, falls die Liste leer ist,
   *         pNode == null ist, pNode nicht in der Liste ist oder pNode der erste Knoten
   *         der Liste ist
   */
  private ListNode getPrevious(ListNode pNode) {
    if (pNode != null && pNode != first && !this.isEmpty()) {
      ListNode temp = first;
      while (temp != null && temp.getNextNode() != pNode) {
        temp = temp.getNextNode();
      }
      return temp;
    } else {
      return null;
    }
  }
}
```

```java ListNode.java
public class ListNode<ContentType> {

    private ContentType contentObject;
    private ListNode next;

    /**
     * Ein neues Objekt wird erschaffen. Der Verweis ist leer.
     * 
     * @param pContent das Inhaltsobjekt vom Typ ContentType
     */
    public ListNode(ContentType pContent) {
      contentObject = pContent;
      next = null;
    }

    /**
     * Der Inhalt des Knotens wird zurueckgeliefert.
     * 
     * @return das Inhaltsobjekt des Knotens
     */
    public ContentType getContentObject() {
      return contentObject;
    }

    /**
     * Der Inhalt dieses Kontens wird gesetzt.
     * 
     * @param pContent das Inhaltsobjekt vom Typ ContentType
     */
    public void setContentObject(ContentType pContent) {
      contentObject = pContent;
    }

    /**
     * Der Nachfolgeknoten wird zurueckgeliefert.
     * 
     * @return das Objekt, auf das der aktuelle Verweis zeigt
     */
    public ListNode getNextNode() {
      return this.next;
    }

    /**
     * Der Verweis wird auf das Objekt, das als Parameter uebergeben wird, gesetzt.
     * 
     * @param pNext der Nachfolger des Knotens
     */
    public void setNextNode(ListNode pNext) {
      this.next = pNext;
    }
  }
```

```java Aufgabe3.java
/*
 * Vertauscht zwei Elemente einer Liste
 * (Name, Datum)
 */
public class Aufgabe3
{
    // Deklaration der Liste

    public Aufgabe3()
    {
    }

    public void fuellen()
    {
    }

    /*
     * Vertauschen von 2 und 4
     */
    public void vertauschen1()
    {
    }

    /*
     * Vertauschen parametrisiert
     */
    public void vertauschen2(int pos1, int pos2)
    {
    }
}
```

:::