---
name: Mit der Schlange arbeiten
index: 4
lang: de
permaid: java-warteschlange-handhabung
---

# Mit der Schlange arbeiten

Im Abitur baust du die Schlange nicht nach, sondern **benutzt** sie: Du bekommst eine Schlange übergeben und schreibst eine Methode, die etwas mit ihr macht. Dafür gibt es nur vier Werkzeuge – `enqueue`, `front`, `dequeue` und `isEmpty` aus der [Dokumentation](./dokumentation).

In der Online-IDE steht die Abiturklasse `Queue` bereit, sobald ein Block die NRW-Bibliothek lädt. Du musst sie nicht selbst schreiben.

:::snippet{#merken}
**Werkzeugkasten: zwei Muster**

Das **Abarbeiten** nimmt vorne heraus, bis nichts mehr da ist. Danach ist die Schlange **leer**.

```java
while (!pSchlange.isEmpty()) {
    String vorne = pSchlange.front();   // erst nachsehen ...
    pSchlange.dequeue();                // ... dann entfernen
    // vorne verarbeiten
}
```

Das **Erhalten** reiht jedes Element zusätzlich in eine Hilfsschlange ein und füllt die Schlange am Ende daraus wieder auf. Danach ist die Schlange **wie vorher**.

```java
Queue<String> hilf = new Queue<String>();
while (!pSchlange.isEmpty()) {
    String vorne = pSchlange.front();
    pSchlange.dequeue();
    // vorne verarbeiten
    hilf.enqueue(vorne);
}
while (!hilf.isEmpty()) {
    pSchlange.enqueue(hilf.front());
    hilf.dequeue();
}
```

Steht in einer Aufgabe „die Schlange soll danach unverändert sein“, brauchst du das zweite Muster.
:::

## Aufgabe 1: Abarbeiten

:::snippet{#aufgabe}
a) Sage voraus, was das Programm ausgibt. Führe es dann aus.

b) Ergänze am Ende eine Zeile, die ausgibt, ob `wartende` jetzt leer ist. Was ist mit Anna, Ben und Cem passiert?

c) Vertausche die beiden Zeilen in der Schleife, sodass `dequeue()` vor `front()` steht. Sage voraus, was nun ausgegeben wird, und prüfe.
:::

:::onlineide{libraries="nrw" height="420px" id="schlange-abarbeiten"}

```java Main.java
void main() {
    Queue<String> wartende = new Queue<String>();
    wartende.enqueue("Anna");
    wartende.enqueue("Ben");
    wartende.enqueue("Cem");

    while (!wartende.isEmpty()) {
        IO.println("Dran ist: " + wartende.front());
        wartende.dequeue();
    }
}
```

:::

::::protect{password="java-q-4-ws-h-2" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `Dran ist: Anna`, `Dran ist: Ben`, `Dran ist: Cem` – in der Reihenfolge des Einreihens.

b) Die Ausgabe ist `true`. Die Schlange ist leer, die drei Namen sind aus ihr verschwunden. Das Abarbeiten **verbraucht** die Schlange.

c) `Dran ist: Ben`, `Dran ist: Cem`, `Dran ist: null`. Anna wird entfernt, bevor jemand nachgesehen hat, und beim letzten Durchlauf liefert `front()` auf der leeren Schlange `null`. Die Regel: **erst `front`, dann `dequeue`.**

::::

## Aufgabe 2: Zählen, ohne zu zerstören

Das Struktogramm beschreibt die Methode `anzahl`. Die übergebene Schlange soll danach **unverändert** sein.

:::struktolab{fontSize=15}
```
funktion anzahl(pSchlange):
    hilf = neue Schlange
    zaehler = 0
    wiederhole solange nicht pSchlange.isEmpty():
        hilf.enqueue(pSchlange.front())
        pSchlange.dequeue()
        zaehler = zaehler + 1
    wiederhole solange nicht hilf.isEmpty():
        pSchlange.enqueue(hilf.front())
        hilf.dequeue()
    gib zaehler zurück
```
:::

:::snippet{#aufgabe}
a) Erläutere, wozu die zweite Schleife da ist. Was wäre ohne sie nach dem Aufruf mit der Schlange?

b) Setze das Struktogramm in der Klasse `Schlangenwerkzeug` unten als Methode `int anzahl(Queue<String> pSchlange)` in Java um. Prüfe mit dem Reiter **Testrunner**.
:::

## Aufgabe 3: Suchen – erst das Struktogramm

:::snippet{#aufgabe}
Die Methode `boolean enthaelt(Queue<String> pSchlange, String pGesucht)` soll liefern, ob `pGesucht` in der Schlange vorkommt. Auch hier soll die Schlange danach **unverändert** sein.

a) Entwirf im Editor ein Struktogramm für `enthaelt`. Orientiere dich am Struktogramm von `anzahl`.

b) Setze dein Struktogramm in der Klasse `Schlangenwerkzeug` um, bis die Tests zu `enthaelt` grün sind.
:::

:::struktolab{mode="edit" fontSize=15 id="schlange-struktogramm-enthaelt"}
```
funktion enthaelt(pSchlange, pGesucht):
```
:::

:::snippet{#brain}
**Weiterdenken:**

c) `String letztes(Queue<String> pSchlange)` liefert das hinterste Element, bei einer leeren Schlange `null`. Die Schlange bleibt unverändert.

d) `Queue<String> reissverschluss(Queue<String> pErste, Queue<String> pZweite)` liefert eine neue Schlange, in der die Elemente abwechselnd aus beiden Schlangen kommen – erst aus `pErste`, dann aus `pZweite`, dann wieder aus `pErste` und so weiter. Ist eine der beiden leer, kommt der Rest der anderen hinten an. Die beiden übergebenen Schlangen dürfen dabei leer werden.
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="schlange-werkzeug"}

```java Main.java
void main() {
    Queue<String> wartende = new Queue<String>();
    wartende.enqueue("Anna");
    wartende.enqueue("Ben");
    wartende.enqueue("Cem");

    Schlangenwerkzeug werkzeug = new Schlangenwerkzeug();
    IO.println("Anzahl: " + werkzeug.anzahl(wartende));
    IO.println("Ben wartet: " + werkzeug.enthaelt(wartende, "Ben"));
    IO.println("Vorne steht noch: " + wartende.front());
}
```

```java Schlangenwerkzeug.java
public class Schlangenwerkzeug {

    /** Liefert die Anzahl der Elemente. Die Schlange bleibt unveraendert. */
    public int anzahl(Queue<String> pSchlange) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert true, wenn pGesucht vorkommt. Die Schlange bleibt unveraendert. */
    public boolean enthaelt(Queue<String> pSchlange, String pGesucht) {
        return false; // ersetze diese Zeile
    }

    /** Weiterdenken: liefert das hinterste Element oder null. */
    public String letztes(Queue<String> pSchlange) {
        return null; // ersetze diese Zeile
    }

    /** Weiterdenken: liefert die Elemente beider Schlangen abwechselnd. */
    public Queue<String> reissverschluss(Queue<String> pErste, Queue<String> pZweite) {
        return new Queue<String>(); // ersetze diese Zeile
    }
}
```

```java SchlangenwerkzeugTest.java
@Test
class SchlangenwerkzeugTest {

    Queue<String> baue(String[] pNamen) {
        Queue<String> schlange = new Queue<String>();
        for (int i = 0; i < pNamen.length; i++) {
            schlange.enqueue(pNamen[i]);
        }
        return schlange;
    }

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
    void testAnzahl() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        assertEquals(3, w.anzahl(baue(new String[]{"Anna", "Ben", "Cem"})), "In der Schlange stehen drei Namen.");
        assertEquals(1, w.anzahl(baue(new String[]{"Anna"})), "In der Schlange steht ein Name.");
        assertEquals(0, w.anzahl(new Queue<String>()), "Die leere Schlange hat null Elemente.");
    }

    @Test
    void testAnzahlErhaeltSchlange() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Cem"});
        w.anzahl(schlange);
        assertEquals("Anna, Ben, Cem", inhalt(schlange), "Nach anzahl muss die Schlange unveraendert sein.");
    }

    @Test
    void testEnthaelt() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        assertTrue(w.enthaelt(baue(new String[]{"Anna", "Ben", "Cem"}), "Ben"), "Ben steht in der Schlange.");
        assertTrue(w.enthaelt(baue(new String[]{"Anna", "Ben", "Cem"}), "Cem"), "Cem steht ganz hinten.");
        assertFalse(w.enthaelt(baue(new String[]{"Anna", "Ben"}), "Dora"), "Dora steht nicht in der Schlange.");
        assertFalse(w.enthaelt(new Queue<String>(), "Anna"), "In der leeren Schlange steht niemand.");
    }

    @Test
    void testEnthaeltErhaeltSchlange() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Cem"});
        w.enthaelt(schlange, "Ben");
        assertEquals("Anna, Ben, Cem", inhalt(schlange), "Auch nach einem Treffer muss die Schlange vollstaendig sein.");
    }

    @Test
    void testLetztes() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Cem"});
        assertEquals("Cem", w.letztes(schlange), "Cem wurde zuletzt eingereiht.");
        assertEquals("Anna, Ben, Cem", inhalt(schlange), "Nach letztes muss die Schlange unveraendert sein.");
        assertEquals(null, w.letztes(new Queue<String>()), "Die leere Schlange hat kein letztes Element.");
    }

    @Test
    void testReissverschluss() {
        Schlangenwerkzeug w = new Schlangenwerkzeug();
        Queue<String> ergebnis = w.reissverschluss(baue(new String[]{"A", "C", "E"}), baue(new String[]{"B", "D"}));
        assertEquals("A, B, C, D, E", inhalt(ergebnis), "Die Elemente kommen abwechselnd.");
        ergebnis = w.reissverschluss(baue(new String[]{"A"}), baue(new String[]{"B", "C", "D"}));
        assertEquals("A, B, C, D", inhalt(ergebnis), "Der Rest der laengeren Schlange kommt hinten an.");
        ergebnis = w.reissverschluss(new Queue<String>(), baue(new String[]{"B"}));
        assertEquals("B", inhalt(ergebnis), "Ist die erste leer, kommt nur die zweite.");
    }
}
```

:::

::::collapsible{title="Tipp: enthaelt" id="schlange-tipp-enthaelt"}

Die Versuchung ist groß, bei einem Treffer sofort `return true` zu schreiben. Dann bleibt aber alles, was schon in der Hilfsschlange steht, dort liegen – die Schlange ist danach unvollständig. Merk dir den Treffer in einer Variablen `gefunden` und gib sie erst am Ende zurück.

Zum Vergleichen von Zeichenketten: `vorne.equals(pGesucht)`, nicht `==`.

::::

::::protect{password="java-q-4-ws-h-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Aufgabe 2 a)** Die erste Schleife leert die Schlange und legt jedes Element in der Hilfsschlange ab. Erst die zweite Schleife füllt die Schlange daraus wieder auf – in derselben Reihenfolge, weil auch die Hilfsschlange nach FIFO arbeitet. Ohne sie wäre die Schlange nach dem Zählen **leer**.

**Aufgabe 3 a)** Ein mögliches Struktogramm:

:::struktolab{fontSize=15}
```
funktion enthaelt(pSchlange, pGesucht):
    hilf = neue Schlange
    gefunden = falsch
    wiederhole solange nicht pSchlange.isEmpty():
        vorne = pSchlange.front()
        pSchlange.dequeue()
        falls vorne.equals(pGesucht):
            gefunden = wahr
        sonst:
        hilf.enqueue(vorne)
    wiederhole solange nicht hilf.isEmpty():
        pSchlange.enqueue(hilf.front())
        hilf.dequeue()
    gib gefunden zurück
```
:::

**Quelltext zu allen Methoden:**

```java
public int anzahl(Queue<String> pSchlange) {
    Queue<String> hilf = new Queue<String>();
    int zaehler = 0;
    while (!pSchlange.isEmpty()) {
        hilf.enqueue(pSchlange.front());
        pSchlange.dequeue();
        zaehler++;
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return zaehler;
}

public boolean enthaelt(Queue<String> pSchlange, String pGesucht) {
    Queue<String> hilf = new Queue<String>();
    boolean gefunden = false;
    while (!pSchlange.isEmpty()) {
        String vorne = pSchlange.front();
        pSchlange.dequeue();
        if (vorne.equals(pGesucht)) {
            gefunden = true;
        }
        hilf.enqueue(vorne);
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return gefunden;
}

public String letztes(Queue<String> pSchlange) {
    Queue<String> hilf = new Queue<String>();
    String hinterstes = null;
    while (!pSchlange.isEmpty()) {
        hinterstes = pSchlange.front();
        hilf.enqueue(hinterstes);
        pSchlange.dequeue();
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return hinterstes;
}

public Queue<String> reissverschluss(Queue<String> pErste, Queue<String> pZweite) {
    Queue<String> ergebnis = new Queue<String>();
    while (!pErste.isEmpty() || !pZweite.isEmpty()) {
        if (!pErste.isEmpty()) {
            ergebnis.enqueue(pErste.front());
            pErste.dequeue();
        }
        if (!pZweite.isEmpty()) {
            ergebnis.enqueue(pZweite.front());
            pZweite.dequeue();
        }
    }
    return ergebnis;
}
```

Worauf es ankam:

- **Zurückgeben erst nach dem Wiederauffüllen.** Ein `return` mitten in der ersten Schleife lässt die Schlange halb leer zurück. Der Test `testEnthaeltErhaeltSchlange` fängt genau diesen Fehler.
- **`letztes` merkt sich bei jedem Durchlauf das aktuelle Element.** Was nach der Schleife in der Variablen steht, war das hinterste. Bei einer leeren Schlange läuft die Schleife nie, und es bleibt bei `null`.
- **`reissverschluss` prüft in jedem Durchlauf beide Schlangen einzeln.** So kommt der Rest der längeren Schlange von selbst hinten an.

::::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Schlange) (I)".
     Aufgabenformat wie im Zentralabitur: Methode mit übergebener Struktur, Struktur soll unverändert bleiben. -->

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge ruft man die Methoden auf, um das vorderste Element zu verarbeiten?**

{r1{erst dequeue, dann front}}

{r1{!erst front, dann dequeue}}

{r1{nur dequeue}}

{h{Nach dem Entfernen kommt man an das Element nicht mehr heran.}}
{H{Richtig!}}

**2. Wie bleibt eine Schlange erhalten, wenn man sie durchgehen muss?**

{r2{gar nicht, das geht bei einer Schlange nicht}}

{r2{!man reiht alle Elemente in eine Hilfsschlange ein und füllt am Ende zurück}}

{r2{man setzt front zurück an den Anfang}}

{h{Eine Schlange hat keinen Zeiger, den man zurücksetzen könnte.}}
{H{Richtig!}}

**3. Eine Methode durchsucht eine Schlange und gibt bei einem Treffer sofort true zurück. Was ist das Problem?**

{r3{Sie findet das Element nicht.}}

{r3{!Die Schlange ist danach unvollständig.}}

{r3{Sie läuft endlos.}}

{h{Was steht zum Zeitpunkt des Treffers in der Hilfsschlange?}}
{H{Richtig! Zurückgegeben wird erst nach dem Wiederauffüllen.}}

**4. Woran erkennt die Schleife, dass alle Elemente abgearbeitet sind?**

{r4{!isEmpty liefert true}}

{r4{front liefert eine leere Zeichenkette}}

{r4{dequeue liefert false}}

{h{Die Abiturklasse hat dafür eine eigene Anfrage.}}
{H{Richtig!}}

::::
