---
name: Übungsstunde
index: 6
lang: de
permaid: java-warteschlange-ueben
scripts:
  - /wc/oop-stapel-schlange.js
---

# Übungsstunde

Aufbau und Handhabung der Schlange habt ihr gemeinsam erarbeitet. In dieser Stunde suchst du dir einen von zwei Wegen aus.

| Weg | Was du machst | Wohin |
| --- | --- | --- |
| **Sicher werden** | kleine Aufgaben ohne Projekt, Schritt für Schritt schwieriger, mit Tests zur Rückmeldung | weiter auf dieser Seite |
| **Im Spiel anwenden** | eine Mechanik mit einer Schlange in dein eigenes Spiel einbauen | [Spielwerkstatt: Meldungen der Reihe nach](/projekte/spielwerkstatt/20-meldungen) und die [Mechaniken mit einer Schlange](/projekte/spielwerkstatt/13-lineare-datenstrukturen#mechaniken-mit-einer-schlange) |

Beide Wege üben dasselbe: eine Schlange über ihre vier Methoden benutzen. Du kannst sie auch wechseln.

## Stufe 1: Zustand verfolgen

:::snippet{#aufgabe}
In beiden Schlangen stehen schon Namen. Sage für jede Folge voraus, was `front()` und `isEmpty()` liefern, trage es ein und lass die Folge ablaufen. Zeichne nach jedem Schritt auf, wer in der Schlange steht – vorne links.
:::

<oop-stapel-schlange id="schlange-ueben-1" modus="schlange" inhalt="Anna, Ben" folge='enqueue("Cem"); front(); dequeue(); front(); enqueue("Dora"); dequeue(); front(); isEmpty()'></oop-stapel-schlange>

<oop-stapel-schlange id="schlange-ueben-2" modus="schlange" inhalt="Emil" folge='dequeue(); isEmpty(); front(); enqueue("Fia"); enqueue("Gus"); dequeue(); front(); dequeue(); isEmpty()'></oop-stapel-schlange>

::::protect{password="java-q-4-ws-u-3" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Erste Folge:** `front()` liefert nacheinander **Anna**, **Ben** und **Cem**, `isEmpty()` am Ende **false**. Am Schluss stehen Cem und Dora in der Schlange.

**Zweite Folge:** Nach dem ersten `dequeue()` ist die Schlange leer: `isEmpty()` liefert **true**, `front()` liefert **null**. Danach liefert `front()` **Gus**, und das letzte `isEmpty()` liefert wieder **true**.

::::

## Stufe 2: Code und Struktogramme lesen

:::snippet{#aufgabe}
Die Schlange enthält vorne beginnend `"a"`, `"b"`, `"c"`.

a) Was liefert `raten(schlange)`? Beschreibe in einem Satz, was die Methode allgemein tut.

b) Ist die Schlange nach dem Aufruf noch dieselbe?

```java
String raten(Queue<String> pSchlange) {
    String ergebnis = "";
    while (!pSchlange.isEmpty()) {
        ergebnis = pSchlange.front() + ergebnis;
        pSchlange.dequeue();
    }
    return ergebnis;
}
```

c) In der Schlange stehen vorne beginnend Anna, Ben und Cem. Wie sieht sie aus, nachdem `drehen` aus dem Struktogramm **zweimal** aufgerufen wurde?

d) Schreibe `drehen` als Java-Methode `void drehen(Queue<String> pSchlange)`.
:::

:::struktolab{fontSize=15}
```
funktion drehen(pSchlange):
    falls nicht pSchlange.isEmpty():
        vorne = pSchlange.front()
        pSchlange.dequeue()
        pSchlange.enqueue(vorne)
    sonst:
```
:::

::::protect{password="java-q-4-ws-u-4" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `"cba"`. Jedes Element wird **vor** das bisherige Ergebnis gesetzt. Die Methode liefert also alle Elemente in umgekehrter Reihenfolge als eine Zeichenkette.

b) Nein. Die Methode arbeitet die Schlange ab, danach ist sie leer.

c) Cem, Anna, Ben. Jeder Aufruf schickt die vorderste Person ans Ende. Wer `drehen` so oft aufruft, wie die Schlange lang ist, hat wieder die Ausgangslage – ein zweiter Weg, eine Schlange zu durchlaufen, ohne sie zu zerstören.

d)

```java
void drehen(Queue<String> pSchlange) {
    if (!pSchlange.isEmpty()) {
        String vorne = pSchlange.front();
        pSchlange.dequeue();
        pSchlange.enqueue(vorne);
    }
}
```

Der leere Sonst-Zweig des Struktogramms braucht in Java kein `else`.

::::

## Stufe 3: Fehler finden

:::snippet{#aufgabe}
Jede der drei Methoden enthält genau einen Fehler. Beschreibe, was beim Aufruf mit der Schlange Anna, Ben, Cem passiert, und verbessere die Methode.

a) Die Methode soll alle Namen ausgeben.

```java
void ausgeben(Queue<String> pSchlange) {
    while (!pSchlange.isEmpty()) {
        IO.println(pSchlange.front());
    }
}
```

b) Die Methode soll die Anzahl liefern und die Schlange erhalten.

```java
int anzahl(Queue<String> pSchlange) {
    Queue<String> hilf = new Queue<String>();
    int zaehler = 0;
    while (!pSchlange.isEmpty()) {
        pSchlange.enqueue(pSchlange.front());
        pSchlange.dequeue();
        zaehler++;
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return zaehler;
}
```

c) Die Methode soll den vordersten Namen liefern und ihn aus der Schlange entfernen.

```java
String herausnehmen(Queue<String> pSchlange) {
    pSchlange.dequeue();
    return pSchlange.front();
}
```
:::

::::protect{password="java-q-4-ws-u-5" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es fehlt `pSchlange.dequeue();` in der Schleife. Die Schlange wird nie leer, das Programm gibt endlos `Anna` aus.

b) In der ersten Schleife wird in `pSchlange` statt in `hilf` eingereiht. Jedes Element wandert nur von vorne nach hinten, die Schlange wird nie leer – eine Endlosschleife. Richtig ist `hilf.enqueue(pSchlange.front());`.

c) Die Reihenfolge ist vertauscht. Anna wird entfernt, zurückgegeben wird Ben. Richtig ist: erst `front()` in einer Variablen merken, dann `dequeue()`, dann die Variable zurückgeben.

::::

## Stufe 4: Methoden schreiben

:::snippet{#aufgabe}
Implementiere die Methoden der Klasse `Uebungen`, bis alle Tests im Reiter **Testrunner** grün sind. Fang oben an – die Aufgaben werden nach unten schwieriger.

a) `int summe(Queue<Integer> pZahlen)` liefert die Summe aller Zahlen. Die Schlange darf dabei leer werden.

b) `int zaehle(Queue<String> pSchlange, String pGesucht)` liefert, wie oft `pGesucht` vorkommt. Die Schlange bleibt unverändert.

c) `void entferneAlle(Queue<String> pSchlange, String pWert)` entfernt jedes Vorkommen von `pWert`. Die Reihenfolge der übrigen Elemente bleibt erhalten.

d) `Queue<String> kopie(Queue<String> pSchlange)` liefert eine neue Schlange mit denselben Elementen. Die übergebene Schlange bleibt unverändert.

e) `void vordraengeln(Queue<String> pSchlange, String pName)` stellt `pName` ganz nach **vorne**. Die anderen behalten ihre Reihenfolge.
:::

:::snippet{#aufgabe}
f) Bevor du `vordraengeln` programmierst: Entwirf im Editor zuerst ein Struktogramm. Setze es danach um.
:::

:::struktolab{mode="edit" fontSize=15 id="schlange-struktogramm-vordraengeln"}
```
funktion vordraengeln(pSchlange, pName):
```
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="schlange-uebungen"}

```java Main.java
void main() {
    Queue<Integer> zahlen = new Queue<Integer>();
    zahlen.enqueue(3);
    zahlen.enqueue(8);
    zahlen.enqueue(5);

    Uebungen u = new Uebungen();
    IO.println("Summe: " + u.summe(zahlen));
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Uebungen.java
public class Uebungen {

    public int summe(Queue<Integer> pZahlen) {
        return 0; // ersetze diese Zeile
    }

    public int zaehle(Queue<String> pSchlange, String pGesucht) {
        return 0; // ersetze diese Zeile
    }

    public void entferneAlle(Queue<String> pSchlange, String pWert) {

    }

    public Queue<String> kopie(Queue<String> pSchlange) {
        return new Queue<String>(); // ersetze diese Zeile
    }

    public void vordraengeln(Queue<String> pSchlange, String pName) {

    }
}
```

```java UebungenTest.java
@Test
class UebungenTest {

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
    void testSumme() {
        Uebungen u = new Uebungen();
        Queue<Integer> zahlen = new Queue<Integer>();
        zahlen.enqueue(3);
        zahlen.enqueue(8);
        zahlen.enqueue(5);
        assertEquals(16, u.summe(zahlen), "3 + 8 + 5 = 16");
        assertEquals(0, u.summe(new Queue<Integer>()), "Die Summe der leeren Schlange ist 0.");
    }

    @Test
    void testZaehle() {
        Uebungen u = new Uebungen();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Anna", "Cem", "Anna"});
        assertEquals(3, u.zaehle(schlange, "Anna"), "Anna steht dreimal in der Schlange.");
        assertEquals("Anna, Ben, Anna, Cem, Anna", inhalt(schlange), "Nach zaehle muss die Schlange unveraendert sein.");
        assertEquals(0, u.zaehle(schlange, "Dora"), "Dora kommt nicht vor.");
        assertEquals(0, u.zaehle(new Queue<String>(), "Anna"), "In der leeren Schlange kommt niemand vor.");
    }

    @Test
    void testEntferneAlle() {
        Uebungen u = new Uebungen();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Anna", "Cem", "Anna"});
        u.entferneAlle(schlange, "Anna");
        assertEquals("Ben, Cem", inhalt(schlange), "Alle Annas sind weg, Ben und Cem behalten ihre Reihenfolge.");
        schlange = baue(new String[]{"Ben", "Cem"});
        u.entferneAlle(schlange, "Dora");
        assertEquals("Ben, Cem", inhalt(schlange), "Ohne Treffer bleibt die Schlange unveraendert.");
    }

    @Test
    void testKopie() {
        Uebungen u = new Uebungen();
        Queue<String> original = baue(new String[]{"Anna", "Ben", "Cem"});
        Queue<String> kopie = u.kopie(original);
        assertEquals("Anna, Ben, Cem", inhalt(kopie), "Die Kopie enthaelt dieselben Elemente.");
        assertEquals("Anna, Ben, Cem", inhalt(original), "Das Original ist unveraendert.");
        kopie.dequeue();
        assertEquals("Anna, Ben, Cem", inhalt(original), "Die Kopie ist eine eigene Schlange: Entfernen aus der Kopie aendert das Original nicht.");
    }

    @Test
    void testVordraengeln() {
        Uebungen u = new Uebungen();
        Queue<String> schlange = baue(new String[]{"Anna", "Ben", "Cem"});
        u.vordraengeln(schlange, "Dora");
        assertEquals("Dora, Anna, Ben, Cem", inhalt(schlange), "Dora steht jetzt vorne.");
        schlange = new Queue<String>();
        u.vordraengeln(schlange, "Dora");
        assertEquals("Dora", inhalt(schlange), "In der leeren Schlange steht Dora allein.");
    }
}
```

:::

::::collapsible{title="Tipp: Welches Muster brauche ich?" id="schlange-ueben-tipp-muster"}

Schau im [Werkzeugkasten](./handhabung) nach.

- **summe** darf die Schlange leeren – das Muster **Abarbeiten** genügt.
- **zaehle** und **kopie** sollen die Schlange erhalten – das Muster **Erhalten**. Bei `kopie` reihst du jedes Element in **zwei** Schlangen ein.
- **entferneAlle** ist das Muster **Erhalten** mit einer Bedingung: Was entfernt werden soll, kommt einfach nicht in die Hilfsschlange.
- **vordraengeln**: Die neue Person kommt **zuerst** in die Hilfsschlange, danach alle anderen.

::::

::::protect{password="java-q-4-ws-u-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Struktogramm zu `vordraengeln`:**

:::struktolab{fontSize=15}
```
funktion vordraengeln(pSchlange, pName):
    hilf = neue Schlange
    hilf.enqueue(pName)
    wiederhole solange nicht pSchlange.isEmpty():
        hilf.enqueue(pSchlange.front())
        pSchlange.dequeue()
    wiederhole solange nicht hilf.isEmpty():
        pSchlange.enqueue(hilf.front())
        hilf.dequeue()
```
:::

**Quelltext:**

```java
public int summe(Queue<Integer> pZahlen) {
    int summe = 0;
    while (!pZahlen.isEmpty()) {
        summe = summe + pZahlen.front();
        pZahlen.dequeue();
    }
    return summe;
}

public int zaehle(Queue<String> pSchlange, String pGesucht) {
    Queue<String> hilf = new Queue<String>();
    int anzahl = 0;
    while (!pSchlange.isEmpty()) {
        String vorne = pSchlange.front();
        pSchlange.dequeue();
        if (vorne.equals(pGesucht)) {
            anzahl++;
        }
        hilf.enqueue(vorne);
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return anzahl;
}

public void entferneAlle(Queue<String> pSchlange, String pWert) {
    Queue<String> hilf = new Queue<String>();
    while (!pSchlange.isEmpty()) {
        String vorne = pSchlange.front();
        pSchlange.dequeue();
        if (!vorne.equals(pWert)) {
            hilf.enqueue(vorne);
        }
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
}

public Queue<String> kopie(Queue<String> pSchlange) {
    Queue<String> hilf = new Queue<String>();
    Queue<String> kopie = new Queue<String>();
    while (!pSchlange.isEmpty()) {
        String vorne = pSchlange.front();
        pSchlange.dequeue();
        hilf.enqueue(vorne);
        kopie.enqueue(vorne);
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
    return kopie;
}

public void vordraengeln(Queue<String> pSchlange, String pName) {
    Queue<String> hilf = new Queue<String>();
    hilf.enqueue(pName);
    while (!pSchlange.isEmpty()) {
        hilf.enqueue(pSchlange.front());
        pSchlange.dequeue();
    }
    while (!hilf.isEmpty()) {
        pSchlange.enqueue(hilf.front());
        hilf.dequeue();
    }
}
```

Bei `kopie` ist der dritte Test der wichtigste: `return pSchlange;` würde die ersten beiden bestehen, liefert aber keine Kopie, sondern einen zweiten Verweis auf **dieselbe** Schlange.

::::

## Stufe 5: Knobelaufgabe

:::snippet{#aufgabe}
**Abzählreim.** Kinder stehen im Kreis. Reihum wird gezählt, und wer bei der letzten Silbe dran ist, scheidet aus. Danach wird beim nächsten Kind weitergezählt. Wer bleibt übrig?

Implementiere `String abzaehlen(Queue<String> pKinder, int pSilben)`. Für die Kinder Anna, Ben, Cem, Dora, Emil und einen Reim mit 3 Silben scheiden Cem, Anna, Emil und Ben aus – übrig bleibt **Dora**. Bei einer leeren Schlange liefert die Methode `null`.
:::

:::onlineide{libraries="nrw" height="560px" speed="1000000" id="schlange-abzaehlen"}

```java Main.java
void main() {
    Queue<String> kinder = new Queue<String>();
    kinder.enqueue("Anna");
    kinder.enqueue("Ben");
    kinder.enqueue("Cem");
    kinder.enqueue("Dora");
    kinder.enqueue("Emil");

    IO.println("Übrig bleibt: " + abzaehlen(kinder, 3));
}

String abzaehlen(Queue<String> pKinder, int pSilben) {
    return null; // ersetze diese Zeile
}
```

:::

::::collapsible{title="Tipp" id="schlange-abzaehlen-tipp"}

Der Kreis ist eine Schlange, bei der niemand wirklich ausscheidet, der nur gezählt wird: Wer eine Silbe abbekommt, wird vorne herausgenommen und **hinten wieder eingereiht** – genau wie bei `drehen` aus Stufe 2. Erst bei der letzten Silbe bleibt das Kind draußen.

Wer übrig bleibt, ist das Kind, das als **letztes** ausscheidet, wenn man einfach weiterzählt, bis die Schlange leer ist.

::::

:::protect{password="java-q-4-ws-u-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
String abzaehlen(Queue<String> pKinder, int pSilben) {
    String zuletzt = null;
    while (!pKinder.isEmpty()) {
        // Alle Silben bis auf die letzte: vorne raus, hinten wieder rein.
        for (int i = 1; i < pSilben; i++) {
            pKinder.enqueue(pKinder.front());
            pKinder.dequeue();
        }
        // Die letzte Silbe: Dieses Kind scheidet aus.
        zuletzt = pKinder.front();
        pKinder.dequeue();
    }
    return zuletzt;
}
```

Das Problem ist als *Josephus-Problem* bekannt. Mit einer Schlange wird es fast von selbst gelöst: Der Kreis entsteht dadurch, dass das Ende der Schlange wieder an den Anfang führt.

:::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Schlange) (I)".
     Differenzierung: Übungsweg "Sicher werden" neben dem Spielwerkstatt-Weg. -->

---

## Selbsttest

::::multievent

**1. In einer Schlange stehen Anna, Ben und Cem. Es wird einmal dequeue und einmal enqueue mit Dora ausgeführt. Wer steht vorne?**

{r1{Anna}}

{r1{!Ben}}

{r1{Dora}}

{h{Entfernt wird vorne, eingereiht hinten.}}
{H{Richtig!}}

**2. Eine Methode soll eine Schlange zählen und erhalten. Was braucht sie?**

{r2{nur eine Zählvariable}}

{r2{!eine Zählvariable und eine Hilfsschlange}}

{r2{einen Index wie bei einem Feld}}

{h{Ohne Zwischenablage sind die Elemente nach dem Durchgehen weg.}}
{H{Richtig!}}

**3. Was passiert, wenn man in der Schleife dequeue vergisst?**

{r3{Die Schleife endet sofort.}}

{r3{!Die Schleife läuft endlos.}}

{r3{Die Schlange wird geleert.}}

{h{Woran merkt die Schleifenbedingung, dass etwas passiert ist?}}
{H{Richtig! Die Schlange wird nie leer.}}

**4. Eine Methode kopie gibt einfach die übergebene Schlange zurück. Was ist daran falsch?**

{r4{nichts}}

{r4{!Beide Variablen verweisen auf dieselbe Schlange.}}

{r4{Die Reihenfolge dreht sich um.}}

{h{Denk an Referenzen: Wie viele Schlangen-Objekte gibt es danach?}}
{H{Richtig! Ändert man die eine, ändert sich die andere mit.}}

::::
