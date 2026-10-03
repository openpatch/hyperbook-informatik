---
name: Mit der Liste arbeiten
index: 4
lang: de
permaid: java-liste-handhabung
---

# Mit der Liste arbeiten

Im Abitur benutzt du die Liste über die Methoden aus der [Dokumentation](./dokumentation). In der Online-IDE steht die Abiturklasse `List` bereit, sobald ein Block die NRW-Bibliothek lädt.

Anders als bei Schlange und Stapel **zerstört** das Durchlaufen eine Liste nicht: Man bewegt nur das aktuelle Element weiter. Eine Hilfsstruktur zum Wiederauffüllen braucht man deshalb nicht.

:::snippet{#merken}
**Werkzeugkasten: zwei Muster**

Das **Durchlaufen** beginnt mit `toFirst` und rückt mit `next` weiter, bis es kein aktuelles Element mehr gibt.

```java
pListe.toFirst();
while (pListe.hasAccess()) {
    String aktuell = pListe.getContent();
    // aktuell verarbeiten
    pListe.next();
}
```

Das **Entfernen beim Durchlaufen** braucht eine Fallunterscheidung: Nach `remove` ist schon der Nachfolger das aktuelle Element. Ein zusätzliches `next` würde ihn überspringen.

```java
pListe.toFirst();
while (pListe.hasAccess()) {
    if (/* aktuelles Element soll weg */) {
        pListe.remove();   // der Nachfolger wird aktuell
    } else {
        pListe.next();
    }
}
```
:::

## Aufgabe 1: Die Methoden verstehen

:::snippet{#aufgabe}
Beantworte die Fragen ohne Programmierung. Nimm die [Dokumentation](./dokumentation) zu Hilfe.

a) In einer Liste stehen drei Elemente. Welche Methoden ruft man nacheinander auf, um das **zweite** zu löschen?

b) Welche Methoden ruft man auf, um zwischen dem ersten und dem zweiten Element ein neues einzufügen?

c) In welchen Fällen liefert `hasAccess()` den Wert `false`? Nenne alle Fälle.

d) Warum kann man mit `insert` kein Element **am Ende** der Liste einfügen? Wie geht es stattdessen?
:::

::::protect{password="java-q-4-l-h-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `toFirst()`, `next()`, `remove()`.

b) `toFirst()`, `next()`, `insert(...)`. `insert` fügt **vor** dem aktuellen Element ein – also vor dem zweiten.

c) Wenn die Liste leer ist, wenn noch nie `toFirst` oder `toLast` aufgerufen wurde, wenn `next` am letzten Element aufgerufen wurde und wenn das letzte Element mit `remove` entfernt wurde.

d) `insert` fügt immer **vor** dem aktuellen Element ein. Hinter dem letzten Element gibt es kein aktuelles Element, vor dem man einfügen könnte. Ans Ende hängt `append` an.

::::

## Aufgabe 2: Alle Vorkommen entfernen

Das Struktogramm beschreibt die Methode `entferneAlle`. Sie entfernt jedes Vorkommen von `pWert` aus der Liste.

:::struktolab{fontSize=15}
```
funktion entferneAlle(pListe, pWert):
    pListe.toFirst()
    wiederhole solange pListe.hasAccess():
        falls pListe.getContent().equals(pWert):
            pListe.remove()
        sonst:
            pListe.next()
```
:::

:::snippet{#aufgabe}
a) Verfolge das Struktogramm für die Liste Anna, Anna, Ben, Anna und `pWert = "Anna"`. Notiere nach jedem Schleifendurchlauf die Liste und das aktuelle Element.

b) Begründe, warum `next()` im Sonst-Zweig steht und nicht hinter der Verzweigung.

c) Setze das Struktogramm in der Klasse `Listenwerkzeug` unten als Methode `void entferneAlle(List<String> pListe, String pWert)` in Java um. Prüfe mit dem Reiter **Testrunner**.
:::

## Aufgabe 3: Sortiert einfügen – erst das Struktogramm

:::snippet{#aufgabe}
In einer Liste stehen Namen alphabetisch sortiert. Die Methode `void sortiertEinfuegen(List<String> pListe, String pName)` soll `pName` so einfügen, dass die Liste sortiert bleibt.

a) Überlege, an welcher Stelle der neue Name hingehört. Welche Fälle musst du unterscheiden?

b) Entwirf im Editor ein Struktogramm für `sortiertEinfuegen`.

c) Setze es in der Klasse `Listenwerkzeug` um, bis die Tests zu `sortiertEinfuegen` grün sind.
:::

:::struktolab{mode="edit" fontSize=15 id="liste-struktogramm-sortiert"}
```
funktion sortiertEinfuegen(pListe, pName):
```
:::

::::collapsible{title="Tipp: Namen vergleichen" id="liste-tipp-compareto"}

`a.compareTo(b)` liefert eine Zahl **kleiner 0**, wenn `a` im Alphabet vor `b` steht, **0**, wenn beide gleich sind, und eine Zahl **größer 0**, wenn `a` nach `b` steht.

Lauf also so lange weiter, wie das aktuelle Element **vor** dem neuen Namen steht. Dort, wo du stehen bleibst, gehört der neue Name **davor**. Bleibst du nirgends stehen, gehört er ans Ende.

::::

:::snippet{#brain}
**Weiterdenken:**

d) `int position(List<String> pListe, String pGesucht)` liefert die Stelle des ersten Vorkommens, gezählt ab 0, oder `-1`, wenn `pGesucht` nicht vorkommt.

e) `boolean istSortiert(List<String> pListe)` liefert, ob die Liste alphabetisch sortiert ist.
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="liste-werkzeug"}

```java Main.java
void main() {
    List<String> liste = new List<String>();
    liste.append("Anna");
    liste.append("Ben");
    liste.append("Anna");

    Listenwerkzeug werkzeug = new Listenwerkzeug();
    werkzeug.entferneAlle(liste, "Anna");

    liste.toFirst();
    while (liste.hasAccess()) {
        IO.println(liste.getContent());
        liste.next();
    }
}
```

```java Listenwerkzeug.java
public class Listenwerkzeug {

    /** Entfernt jedes Vorkommen von pWert. */
    public void entferneAlle(List<String> pListe, String pWert) {

    }

    /** Fuegt pName so ein, dass die Liste alphabetisch sortiert bleibt. */
    public void sortiertEinfuegen(List<String> pListe, String pName) {

    }

    /** Weiterdenken: liefert die Stelle des ersten Vorkommens ab 0, sonst -1. */
    public int position(List<String> pListe, String pGesucht) {
        return 0; // ersetze diese Zeile
    }

    /** Weiterdenken: liefert true, wenn die Liste alphabetisch sortiert ist. */
    public boolean istSortiert(List<String> pListe) {
        return false; // ersetze diese Zeile
    }
}
```

```java ListenwerkzeugTest.java
@Test
class ListenwerkzeugTest {

    List<String> baue(String[] pNamen) {
        List<String> liste = new List<String>();
        for (int i = 0; i < pNamen.length; i++) {
            liste.append(pNamen[i]);
        }
        return liste;
    }

    // Liest die Liste von vorne nach hinten als Text aus.
    String inhalt(List<String> pListe) {
        String text = "";
        pListe.toFirst();
        while (pListe.hasAccess()) {
            if (!text.equals("")) {
                text = text + ", ";
            }
            text = text + pListe.getContent();
            pListe.next();
        }
        return text;
    }

    @Test
    void testEntferneAlle() {
        Listenwerkzeug w = new Listenwerkzeug();
        List<String> liste = baue(new String[]{"Anna", "Anna", "Ben", "Anna"});
        w.entferneAlle(liste, "Anna");
        assertEquals("Ben", inhalt(liste), "Alle Annas sind weg - auch zwei direkt hintereinander.");
        liste = baue(new String[]{"Ben", "Cem"});
        w.entferneAlle(liste, "Dora");
        assertEquals("Ben, Cem", inhalt(liste), "Ohne Treffer bleibt die Liste unveraendert.");
        liste = new List<String>();
        w.entferneAlle(liste, "Anna");
        assertTrue(liste.isEmpty(), "Die leere Liste bleibt leer.");
    }

    @Test
    void testSortiertEinfuegen() {
        Listenwerkzeug w = new Listenwerkzeug();
        List<String> liste = baue(new String[]{"Anna", "Cem", "Emil"});
        w.sortiertEinfuegen(liste, "Dora");
        assertEquals("Anna, Cem, Dora, Emil", inhalt(liste), "Dora gehoert zwischen Cem und Emil.");
        w.sortiertEinfuegen(liste, "Ali");
        assertEquals("Ali, Anna, Cem, Dora, Emil", inhalt(liste), "Ali gehoert ganz nach vorne.");
        w.sortiertEinfuegen(liste, "Zoe");
        assertEquals("Ali, Anna, Cem, Dora, Emil, Zoe", inhalt(liste), "Zoe gehoert ans Ende.");
        liste = new List<String>();
        w.sortiertEinfuegen(liste, "Ben");
        assertEquals("Ben", inhalt(liste), "In die leere Liste kommt Ben allein.");
    }

    @Test
    void testPosition() {
        Listenwerkzeug w = new Listenwerkzeug();
        List<String> liste = baue(new String[]{"Anna", "Ben", "Cem", "Ben"});
        assertEquals(0, w.position(liste, "Anna"), "Anna steht an Stelle 0.");
        assertEquals(1, w.position(liste, "Ben"), "Gesucht ist das erste Vorkommen.");
        assertEquals(-1, w.position(liste, "Dora"), "Dora kommt nicht vor.");
        assertEquals(-1, w.position(new List<String>(), "Anna"), "In der leeren Liste kommt niemand vor.");
    }

    @Test
    void testIstSortiert() {
        Listenwerkzeug w = new Listenwerkzeug();
        assertTrue(w.istSortiert(baue(new String[]{"Anna", "Ben", "Ben", "Cem"})), "Gleiche Namen hintereinander sind erlaubt.");
        assertFalse(w.istSortiert(baue(new String[]{"Anna", "Cem", "Ben"})), "Ben steht hinter Cem.");
        assertTrue(w.istSortiert(new List<String>()), "Die leere Liste ist sortiert.");
    }
}
```

:::

::::protect{password="java-q-4-l-h-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Aufgabe 2 a)**

| Durchlauf | Liste (aktuelles Element **fett**) |
| --- | --- |
| Start | **Anna**, Anna, Ben, Anna |
| 1: remove | **Anna**, Ben, Anna |
| 2: remove | **Ben**, Anna |
| 3: next | Ben, **Anna** |
| 4: remove | Ben – kein aktuelles Element |

**Aufgabe 2 b)** Nach `remove` ist der Nachfolger schon das aktuelle Element. Ein `next` danach würde ihn überspringen, ohne ihn zu prüfen. Bei Anna, Anna bliebe die zweite Anna stehen.

**Aufgabe 3 a)** Drei Fälle: Der Name gehört **vor** ein vorhandenes Element (auch ganz nach vorne), er gehört **ans Ende**, oder die Liste ist **leer**. Die letzten beiden lassen sich zusammenfassen: Gibt es nach dem Suchen kein aktuelles Element, wird angehängt.

**Aufgabe 3 b)** Ein mögliches Struktogramm:

:::struktolab{fontSize=15}
```
funktion sortiertEinfuegen(pListe, pName):
    pListe.toFirst()
    wiederhole solange pListe.hasAccess() und pListe.getContent().compareTo(pName) < 0:
        pListe.next()
    falls pListe.hasAccess():
        pListe.insert(pName)
    sonst:
        pListe.append(pName)
```
:::

**Quelltext zu allen Methoden:**

```java
public void entferneAlle(List<String> pListe, String pWert) {
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().equals(pWert)) {
            pListe.remove();
        } else {
            pListe.next();
        }
    }
}

public void sortiertEinfuegen(List<String> pListe, String pName) {
    pListe.toFirst();
    while (pListe.hasAccess() && pListe.getContent().compareTo(pName) < 0) {
        pListe.next();
    }
    if (pListe.hasAccess()) {
        pListe.insert(pName);
    } else {
        pListe.append(pName);
    }
}

public int position(List<String> pListe, String pGesucht) {
    int stelle = 0;
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().equals(pGesucht)) {
            return stelle;
        }
        stelle++;
        pListe.next();
    }
    return -1;
}

public boolean istSortiert(List<String> pListe) {
    pListe.toFirst();
    if (!pListe.hasAccess()) {
        return true;
    }
    String vorher = pListe.getContent();
    pListe.next();
    while (pListe.hasAccess()) {
        if (vorher.compareTo(pListe.getContent()) > 0) {
            return false;
        }
        vorher = pListe.getContent();
        pListe.next();
    }
    return true;
}
```

Worauf es ankam:

- **Die Reihenfolge der Bedingung in `sortiertEinfuegen`.** `hasAccess()` muss vor `getContent()` geprüft werden. Weil `&&` bei `false` aufhört, wird `getContent()` am Ende der Liste gar nicht erst aufgerufen.
- **`return` mitten in der Schleife ist bei der Liste kein Problem.** Anders als bei Schlange und Stapel ist dabei nichts zerstört worden.
- **`istSortiert` merkt sich das vorige Element.** Die Liste hat nur ein aktuelles Element – an den Vorgänger kommt man nicht mehr heran, wenn man ihn sich nicht selbst gemerkt hat.

::::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Liste) (I)".
     Aufgabenformat wie im Zentralabitur: Methode mit übergebener Struktur. -->

---

## Selbsttest

::::multievent

**1. Womit beginnt jeder Durchlauf durch eine Liste?**

{r1{mit next}}

{r1{!mit toFirst}}

{r1{mit hasAccess}}

{h{Vorher gibt es womöglich gar kein aktuelles Element.}}
{H{Richtig!}}

**2. Was passiert, wenn man nach remove zusätzlich next aufruft?**

{r2{nichts Besonderes}}

{r2{!das nächste Element wird übersprungen}}

{r2{die Liste wird leer}}

{h{Welches Element ist nach remove das aktuelle?}}
{H{Richtig!}}

**3. Warum braucht man beim Durchlaufen einer Liste keine Hilfsliste?**

{r3{weil die Liste sortiert ist}}

{r3{!weil das Durchlaufen nur das aktuelle Element bewegt und nichts entfernt}}

{r3{weil man eine Kopie zurückgibt}}

{h{Vergleiche mit dem Abarbeiten einer Schlange.}}
{H{Richtig!}}

**4. Wo landet ein Name, wenn sortiertEinfuegen kein größeres Element findet?**

{r4{ganz vorne}}

{r4{!am Ende}}

{r4{gar nicht}}

{h{Nach der Schleife gibt es dann kein aktuelles Element mehr.}}
{H{Richtig! Deshalb append statt insert.}}

::::
