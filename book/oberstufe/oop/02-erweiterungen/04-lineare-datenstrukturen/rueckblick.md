---
name: Rückblick
index: 4
lang: de
permaid: java-datenstrukturen-rueckblick
---

# Rückblick

Schlange, Stapel und Liste unterscheiden sich nicht darin, **was** sie speichern, sondern darin, **wer als Nächstes drankommt**: der Erste, der kam, der Letzte, der kam, oder der, den man auswählt. Genau diese Frage muss man bei einer Anwendung stellen – nicht die nach dem Speicherplatz.

## Das kann ich jetzt

- [ ] Ich kann das **FIFO**-Prinzip der Schlange erklären und ihre Operationen benennen. ([Schlange](./warteschlange/einstieg))
- [ ] Ich kann das **LIFO**-Prinzip des Stapels erklären und seine Operationen benennen. ([Stapel](./stapel/einstieg))
- [ ] Ich kann erklären, wie man mit dem **aktuellen Element** einer Liste arbeitet. ([Liste](./liste/einstieg))
- [ ] Ich kann am Objektdiagramm erläutern, was beim Einfügen und Entfernen mit den Verweisen passiert – auch in den Grenzfällen. ([Schlange](./warteschlange/aufbau-und-funktionsweise), [Stapel](./stapel/aufbau-und-funktionsweise), [Liste](./liste/aufbau-und-funktionsweise))
- [ ] Ich kann zu einem Anwendungsfall die passende Struktur begründet auswählen.
- [ ] Ich kann Methoden schreiben, die eine Struktur über ihre **Dokumentation** benutzen – und sie dabei erhalten, wenn das verlangt ist. ([Schlange](./warteschlange/handhabung), [Stapel](./stapel/handhabung), [Liste](./liste/handhabung))
- [ ] Ich kann ein Struktogramm in Java umsetzen und zu einer Methode selbst ein Struktogramm entwerfen.
- [ ] *(LK)* Ich kann die Operationen einer Struktur selbst implementieren. ([Schlange](./warteschlange/implementierung), [Stapel](./stapel/implementierung), [Liste](./liste/implementierung))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Wer kommt als Nächstes dran?**

a) Auf einen leeren Stapel werden nacheinander `push("A")`, `push("B")`, `push("C")` ausgeführt. Danach zweimal `pop()`, dann `push("D")`, dann einmal `pop()`. Was liefert `top()` jetzt, und was liegt noch auf dem Stapel?

b) Dieselbe Folge mit einer Schlange: `enqueue("A")`, `enqueue("B")`, `enqueue("C")`, zweimal `dequeue()`, `enqueue("D")`, einmal `dequeue()`. Was liefert `front()` jetzt?

c) In einer Liste stehen A, B, C. Es wird `toFirst()`, `next()`, `remove()`, `insert("D")` und `toLast()` ausgeführt. Was liefert `getContent()` jetzt, und welche Elemente stehen in der Liste?

d) `pop()` und `dequeue()` liefern in den Abiturklassen nichts zurück. Wie kommt man trotzdem an das Element, das entfernt wird?

e) Welche Vorkehrung muss man treffen, bevor man mit dem Ergebnis von `top()` weiterarbeitet, etwa `top().equals(...)`? Was passiert sonst?
:::

::::protect{password="java-q-4-r-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Schritt | Stapel (oben zuerst) |
| --- | --- |
| `push("A")`, `push("B")`, `push("C")` | C, B, A |
| `pop()` | B, A |
| `pop()` | A |
| `push("D")` | D, A |
| `pop()` | A |

`top()` liefert **A**, und nur A liegt noch auf dem Stapel. Das ist **LIFO**: Was zuletzt kam, geht zuerst.

b)

| Schritt | Schlange (vorne zuerst) |
| --- | --- |
| `enqueue("A")`, `enqueue("B")`, `enqueue("C")` | A, B, C |
| `dequeue()` | B, C |
| `dequeue()` | C |
| `enqueue("D")` | C, D |
| `dequeue()` | D |

`front()` liefert **D**. Das ist **FIFO**: Wer zuerst kam, geht zuerst.

c) Nach `toFirst()` und `next()` ist B aktuell. `remove()` entfernt B, C wird aktuell. `insert("D")` fügt D **vor** C ein. `toLast()` macht C aktuell. `getContent()` liefert **C**, in der Liste stehen A, D, C.

d) Man holt es sich **vorher** mit `top()` beziehungsweise `front()` und entfernt es erst danach.

e) Man muss mit `isEmpty()` prüfen, ob überhaupt etwas da ist. Auf einem leeren Stapel liefert `top()` den Wert `null`, und `null.equals(...)` bricht zur **Laufzeit** mit einer `NullPointerException` ab.

::::

:::snippet{#aufgabe}
**Aufgabe 2: Welche Struktur passt?**

Wähle für jeden Fall die passende Struktur und begründe mit dem Zugriffsprinzip.

a) Ein Browser hat einen Zurück- **und** einen Vorwärts-Knopf. Wie viele Strukturen braucht man, und welche?

b) Eine Arztpraxis ruft in der Reihenfolge der Ankunft auf – Notfälle kommen aber immer zuerst dran.

c) Eine Bestenliste, in die neue Ergebnisse an der richtigen Stelle einsortiert werden.

d) Ein Labyrinth soll so durchsucht werden, dass zuerst der zuletzt betretene Weg weiterverfolgt wird.
:::

::::collapsible{title="Tipp"}

Stell für jeden Fall genau eine Frage: **Wer kommt als Nächstes dran – der Neueste, der Älteste oder der, den ich auswähle?** Manchmal braucht man mehr als eine Struktur.

::::

::::protect{password="java-q-4-r-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Zwei Stapel.** Jede besuchte Seite kommt auf den Zurück-Stapel. „Zurück“ nimmt die oberste Seite herunter und legt die aktuelle auf den Vorwärts-Stapel; „Vorwärts“ macht es umgekehrt. Wer eine neue Seite aufruft, leert den Vorwärts-Stapel.

b) **Zwei Schlangen** – eine für Notfälle, eine für alle anderen. Aufgerufen wird aus der Notfallschlange, solange sie nicht leer ist, sonst aus der anderen. Innerhalb jeder Schlange gilt FIFO.

c) **Liste.** Eingefügt wird an beliebiger Stelle – genau das `sortiertEinfuegen` aus [Mit der Liste arbeiten](./liste/handhabung).

d) **Stapel.** Der zuletzt betretene Weg wird zuerst weiterverfolgt – das ergibt die Tiefensuche. Nimmt man stattdessen eine Schlange, entsteht die Breitensuche, die zuerst alle Nachbarn absucht. Dieselbe Suche, andere Struktur, anderes Verhalten: eines der schönsten Beispiele dafür, dass die Wahl der Datenstruktur den Algorithmus bestimmt.

::::

:::snippet{#aufgabe}
**Aufgabe 3: Strukturen kombinieren**

a) `void umdrehen(Queue<String> pSchlange)` soll die Reihenfolge einer Schlange umkehren. Benutze dazu einen Stapel. Entwirf zuerst im Editor ein Struktogramm, setze es dann um.

b) `boolean istPalindrom(String pWort)` soll prüfen, ob ein Wort vorwärts und rückwärts gleich gelesen wird, etwa `otto` oder `anna`. Benutze dazu einen Stapel **und** eine Schlange.
:::

:::struktolab{mode="edit" fontSize=15 id="rueckblick-struktogramm-umdrehen"}
```
funktion umdrehen(pSchlange):
```
:::

:::snippet{#brain}
**Weiterdenken:**

c) `Queue<String> alsSchlange(List<String> pListe)` liefert eine neue Schlange mit den Elementen der Liste in derselben Reihenfolge.
:::

::::collapsible{title="Tipp: istPalindrom" id="rueckblick-tipp-palindrom"}

Leg jeden Buchstaben sowohl auf den Stapel als auch in die Schlange. Danach kommen sie aus dem Stapel **rückwärts** und aus der Schlange **vorwärts** heraus. Vergleiche sie paarweise.

::::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="rueckblick-kombinieren"}

```java Main.java
void main() {
    Kombination k = new Kombination();
    IO.println("otto:  " + k.istPalindrom("otto"));
    IO.println("regal: " + k.istPalindrom("regal"));
}
```

```java Kombination.java
public class Kombination {

    public void umdrehen(Queue<String> pSchlange) {

    }

    public boolean istPalindrom(String pWort) {
        return false; // ersetze diese Zeile
    }

    /** Weiterdenken */
    public Queue<String> alsSchlange(List<String> pListe) {
        return new Queue<String>(); // ersetze diese Zeile
    }
}
```

```java KombinationTest.java
@Test
class KombinationTest {

    // Liest die Schlange als Text aus und stellt sie danach wieder her.
    String inhalt(Queue<String> pSchlange) {
        Queue<String> hilf = new Queue<String>();
        String text = "";
        while (!pSchlange.isEmpty()) {
            if (!text.equals("")) {
                text = text + ", ";
            }
            text = text + pSchlange.front();
            hilf.enqueue(pSchlange.front());
            pSchlange.dequeue();
        }
        while (!hilf.isEmpty()) {
            pSchlange.enqueue(hilf.front());
            hilf.dequeue();
        }
        return text;
    }

    @Test
    void testUmdrehen() {
        Kombination k = new Kombination();
        Queue<String> schlange = new Queue<String>();
        schlange.enqueue("Anna");
        schlange.enqueue("Ben");
        schlange.enqueue("Cem");
        k.umdrehen(schlange);
        assertEquals("Cem, Ben, Anna", inhalt(schlange), "Cem steht jetzt vorne.");
        Queue<String> leer = new Queue<String>();
        k.umdrehen(leer);
        assertTrue(leer.isEmpty(), "Die leere Schlange bleibt leer.");
    }

    @Test
    void testIstPalindrom() {
        Kombination k = new Kombination();
        assertTrue(k.istPalindrom("otto"), "otto ist ein Palindrom.");
        assertTrue(k.istPalindrom("anna"), "anna ist ein Palindrom.");
        assertTrue(k.istPalindrom("a"), "Ein einzelner Buchstabe ist ein Palindrom.");
        assertTrue(k.istPalindrom(""), "Das leere Wort ist ein Palindrom.");
        assertFalse(k.istPalindrom("regal"), "regal rückwärts ist lager.");
        assertFalse(k.istPalindrom("ab"), "ab rückwärts ist ba.");
    }

    @Test
    void testAlsSchlange() {
        Kombination k = new Kombination();
        List<String> liste = new List<String>();
        liste.append("Anna");
        liste.append("Ben");
        assertEquals("Anna, Ben", inhalt(k.alsSchlange(liste)), "Die Reihenfolge bleibt erhalten.");
        assertTrue(k.alsSchlange(new List<String>()).isEmpty(), "Aus der leeren Liste wird eine leere Schlange.");
    }
}
```

:::

::::protect{password="java-q-4-r-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Struktogramm zu `umdrehen`:**

:::struktolab{fontSize=15}
```
funktion umdrehen(pSchlange):
    stapel = neuer Stapel
    wiederhole solange nicht pSchlange.isEmpty():
        stapel.push(pSchlange.front())
        pSchlange.dequeue()
    wiederhole solange nicht stapel.isEmpty():
        pSchlange.enqueue(stapel.top())
        stapel.pop()
```
:::

**Quelltext:**

```java
public void umdrehen(Queue<String> pSchlange) {
    Stack<String> stapel = new Stack<String>();
    while (!pSchlange.isEmpty()) {
        stapel.push(pSchlange.front());
        pSchlange.dequeue();
    }
    while (!stapel.isEmpty()) {
        pSchlange.enqueue(stapel.top());
        stapel.pop();
    }
}

public boolean istPalindrom(String pWort) {
    Stack<String> stapel = new Stack<String>();
    Queue<String> schlange = new Queue<String>();
    for (int i = 0; i < pWort.length(); i++) {
        String zeichen = pWort.substring(i, i + 1);
        stapel.push(zeichen);
        schlange.enqueue(zeichen);
    }
    while (!stapel.isEmpty()) {
        if (!stapel.top().equals(schlange.front())) {
            return false;
        }
        stapel.pop();
        schlange.dequeue();
    }
    return true;
}

public Queue<String> alsSchlange(List<String> pListe) {
    Queue<String> schlange = new Queue<String>();
    pListe.toFirst();
    while (pListe.hasAccess()) {
        schlange.enqueue(pListe.getContent());
        pListe.next();
    }
    return schlange;
}
```

Beide Hauptaufgaben nutzen dieselbe Eigenschaft: Ein Stapel **dreht die Reihenfolge um**, eine Schlange **erhält sie**. Wer beide nebeneinander befüllt, hat das Wort einmal vorwärts und einmal rückwärts.

::::

<!--
Rückblick zum Inhaltsfeld Daten und ihre Strukturierung: Schlange, Stapel,
Liste; Operationen dynamischer Datenstrukturen anwenden (I) und die passende
Struktur begründet auswählen (A/M).
-->

---

## Selbsttest

::::multievent

**1. Was bedeutet LIFO?**

{r1{Wer zuerst kommt, geht zuerst.}}

{r1{!Was zuletzt hineinkam, kommt zuerst heraus.}}

{r1{Die Elemente sind sortiert.}}

{r1{Jedes Element kennt seinen Nachfolger.}}

{h{Last in, first out.}}
{H{Richtig – das ist der Stapel.}}

**2. Auf einen leeren Stapel kommen A, B und C. Was liefert danach top?**

{r2{A}}

{r2{B}}

{r2{!C}}

{r2{das lässt sich nicht sagen}}

{h{Das zuletzt Gelegte liegt oben.}}
{H{Richtig.}}

**3. Dieselbe Folge bei einer Schlange. Was liefert danach front?**

{r3{!A}}

{r3{B}}

{r3{C}}

{r3{das lässt sich nicht sagen}}

{h{Wer zuerst kam, geht zuerst.}}
{H{Richtig – dieselben Eingaben, ein anderes Ergebnis.}}

**4. Welche Struktur verwaltet die Rücksprungstellen rekursiver Aufrufe?**

{r4{!ein Stapel}}

{r4{eine Schlange}}

{r4{eine Liste}}

{r4{ein Baum}}

{h{Warum heißt der Absturz bei fehlendem Basisfall wohl Stapelüberlauf?}}
{H{Richtig.}}

**5. Was liefert pop in der Abiturklasse Stack zurück?**

{r5{das entfernte Element}}

{r5{!nichts}}

{r5{die neue Höhe des Stapels}}

{r5{true oder false}}

{h{Zum Lesen gibt es eine eigene Methode.}}
{H{Richtig – deshalb erst top, dann pop.}}

**6. Was muss man prüfen, bevor man mit dem Ergebnis von top weiterarbeitet?**

{r6{ob die Struktur sortiert ist}}

{r6{!ob sie überhaupt ein Element enthält}}

{r6{ob genug Speicher frei ist}}

{r6{nichts}}

{h{Was liefert top auf einem leeren Stapel?}}
{H{Richtig – dafür gibt es isEmpty.}}

**7. Für welche Aufgabe passt eine Liste, aber weder Stapel noch Schlange?**

{r7{die Rückgängig-Funktion}}

{r7{der Druckauftrag}}

{r7{!eine Reihenfolge, in die an beliebiger Stelle eingefügt werden soll}}

{r7{der Aufrufstapel}}

{h{Stapel und Schlange lassen nur an den Enden zu.}}
{H{Richtig.}}

::::
