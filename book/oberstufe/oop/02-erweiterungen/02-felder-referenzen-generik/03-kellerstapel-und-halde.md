---
title: Kellerstapel und Halde
index: 3
permaid: java-generik-speichermodell
---

# Kellerstapel und Halde

Auf der vorigen Seite stand ein Satz, über den man leicht hinwegliest: Bei einem Objekttyp steht in der Variablen „ein Verweis auf das Objekt **im Speicher**“.

Welcher Speicher? Und wo steht dann die Variable selbst?

Java teilt den Arbeitsspeicher eines laufenden Programms in **zwei Bereiche** auf, die sich völlig unterschiedlich verhalten. Wer sie einmal auseinanderhält, kann von da an drei Fragen beantworten, die vorher Glückssache waren: warum lokale Variablen nach dem Methodenaufruf weg sind, warum Objekte es nicht sind, und warum ein fehlender Basisfall bei Rekursion ausgerechnet einen *Stapel*überlauf auslöst.

<!-- KLP QPh, Daten und ihre Strukturierung: Datentypen - elementare Datentypen, Objekttypen -->

## Die beiden Bereiche

:::snippet{#merken}
- Der **Kellerstapel** (englisch *call stack*, auch *Aufrufstapel*) verwaltet die **Methodenaufrufe**. Für jeden laufenden Aufruf liegt dort genau ein **Kellerrahmen** (englisch *stack frame*). Er enthält die Parameter und die lokalen Variablen dieses einen Aufrufs sowie die Stelle, an die nach dem `return` zurückgesprungen wird.
- Die **Halde** (englisch *heap*) verwaltet die **Objekte**. Alles, was mit `new` entsteht – auch jedes Feld –, liegt dort.

Eine Variable vom Objekttyp liegt also im Kellerrahmen; das Objekt, auf das sie zeigt, liegt auf der Halde. Der Pfeil zwischen beiden ist die Referenz.
:::

Der Name „Keller“ ist kein Zufall: Es ist derselbe Datentyp, den du als [Stapel](../04-lineare-datenstrukturen/stapel) noch selbst implementieren wirst. Wer zuletzt kam, geht zuerst – ein Aufruf kann nur zurückkehren, wenn alle Aufrufe, die er selbst gestartet hat, schon zurückgekehrt sind.

## Das Beispiel

:::snippet{#aufgabe}
Sage **ohne Rechner** voraus, was ausgegeben wird. Achte dabei besonders auf die Variable `neuer` in `erzeuge`: Sie existiert nach dem `return` nicht mehr. Was ist dann mit dem Punkt?
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    Punkt p = erzeuge(3, 4);
    verschiebeUm(p, 10);
    IO.println("p: " + p.alsText());
}

/** Legt einen neuen Punkt an und gibt ihn zurück. */
Punkt erzeuge(int pX, int pY) {
    Punkt neuer = new Punkt(pX, pY);
    return neuer;
}

/** Verschiebt den übergebenen Punkt um denselben Betrag in beide Richtungen. */
void verschiebeUm(Punkt pPunkt, int pDelta) {
    pPunkt.verschiebe(pDelta, pDelta);
}
```

```java Punkt.java
public class Punkt {

    private int x;
    private int y;

    public Punkt(int pX, int pY) {
        x = pX;
        y = pY;
    }

    public void verschiebe(int pDx, int pDy) {
        x = x + pDx;
        y = y + pDy;
    }

    public String alsText() {
        return "(" + x + ", " + y + ")";
    }
}
```

:::

::::collapsible{title="Auflösung"}

```
p: (13, 14)
```

Der Punkt entsteht in `erzeuge`, überlebt das Ende dieser Methode und wird danach von `verschiebeUm` verändert. Drei Methodenaufrufe waren beteiligt, alle drei sind längst beendet – das Objekt gibt es trotzdem noch.

Genau das ist der Unterschied zwischen den beiden Bereichen: **Der Kellerrahmen ist an den Aufruf gebunden, das Objekt nicht.**

::::

Setze die Schritte im Diagramm um.

::jmp{id="kellerstapel-und-halde" src="kellerstapel-und-halde.jmp" height="700px"}

## Warum die lokale Variable verschwindet und das Objekt nicht

:::snippet{#merken}
Beim Aufruf einer Methode legt Java einen Kellerrahmen **auf** den Stapel, bei `return` nimmt es ihn wieder **herunter**. Alles, was im Rahmen stand, ist damit weg – Parameter wie lokale Variablen.

Weg ist damit aber nur die **Variable**, nicht das Objekt. Das liegt auf der Halde und wird nicht mit abgeräumt. Solange irgendeine Referenz darauf zeigt, bleibt es.

Deshalb kann eine Methode ein Objekt zurückgeben, das sie selbst angelegt hat – eine lokale *Zahl* könnte sie ebenfalls zurückgeben, aber nur als Kopie ihres Wertes.
:::

:::snippet{#aufgabe}
a) In `erzeuge` steht `Punkt neuer = new Punkt(pX, pY);`. Benenne genau, welcher Teil dieser Zeile im Kellerrahmen landet und welcher auf der Halde.

b) `verschiebeUm` gibt nichts zurück und verändert den Punkt trotzdem sichtbar. Erkläre das mit den beiden Speicherbereichen.

c) Warum wäre es ein Fehler, wenn Java beim `return` auch das Objekt abräumen würde, auf das eine lokale Variable zeigt?
:::

::::collapsible{title="Auflösung"}

a) Im Kellerrahmen von `erzeuge` landet die Variable `neuer` – sie ist vier oder acht Byte groß und enthält nur die Referenz. Auf der Halde landet das, was `new Punkt(...)` erzeugt: ein Objekt mit den beiden Attributen `x` und `y`.

b) `pPunkt` ist eine **Kopie der Referenz**, kein zweites Objekt. Sie liegt in einem eigenen Kellerrahmen, zeigt aber auf dasselbe Objekt auf der Halde. `verschiebe` ändert die Attribute **dort** – und dorthin zeigt auch `p` in `main`.

c) Dann könnte keine Methode je ein Objekt zurückgeben. `erzeuge` würde eine Referenz auf etwas liefern, das im selben Moment gelöscht wurde. Objekte müssen ihren Erzeuger überleben können, sonst ließen sich keine Datenstrukturen bauen – eine Liste entsteht schließlich Knoten für Knoten in Methodenaufrufen, die alle längst beendet sind.

::::

## Was mit Objekten passiert, die niemand mehr braucht

Die Halde wächst also, während der Kellerstapel auf und ab geht. Läuft sie irgendwann über?

:::snippet{#merken}
Nein – dafür sorgt die **Speicherbereinigung** (englisch *garbage collection*). Java erkennt selbstständig, auf welche Objekte **keine Referenz mehr** zeigt, und gibt deren Platz wieder frei. Um wen sich das dreht, entscheidet allein die Erreichbarkeit: Ein Objekt, zu dem kein Pfeil mehr führt, kann das Programm auch nie wieder benutzen.

In Sprachen wie C muss man jedes Objekt von Hand wieder freigeben. Vergisst man es, wächst der Verbrauch immer weiter – man nennt das ein **Speicherleck**.
:::

:::snippet{#brain}
```java
void main() {
    Punkt p = new Punkt(1, 1);
    p = new Punkt(2, 2);
}
```

Nach der zweiten Zeile gibt es zwei Objekte auf der Halde, aber nur eine Variable. Erkläre, was mit dem ersten Punkt geschieht und warum das Programm ihn nicht wiederfinden kann – auch nicht, wenn es wollte.
:::

## Und der Stapelüberlauf?

:::snippet{#merken}
Der Kellerstapel ist **begrenzt**. Jeder noch nicht zurückgekehrte Aufruf belegt einen Rahmen; passt kein weiterer mehr darauf, bricht das Programm mit einem **Stapelüberlauf** ab (`StackOverflowError`).

Im Normalfall merkt man davon nichts: Ein paar hundert verschachtelte Aufrufe sind kein Problem. Gefährlich wird es erst, wenn eine Methode sich selbst aufruft und nicht aufhört – dann wächst der Stapel, bis nichts mehr geht.
:::

Diesem Fehler begegnest du im [nächsten Kapitel](../03-rekursion-und-problemloesestrategien/01-rekursion) wieder. Er ist dort kein Unglück, sondern die zuverlässigste Rückmeldung, die es gibt: Eine Rekursion ohne Basisfall meldet sich sofort, statt stumm hängenzubleiben.

## Die beiden Bereiche im Überblick

| | Kellerstapel | Halde |
| --- | --- | --- |
| Was liegt dort? | Kellerrahmen: Parameter, lokale Variablen, Rücksprungstelle | Objekte, also alles aus `new` – auch Felder |
| Wer legt an? | jeder Methodenaufruf | jedes `new` |
| Wann wird aufgeräumt? | beim `return`, sofort und automatisch | wenn keine Referenz mehr zeigt, durch die Speicherbereinigung |
| Reihenfolge | streng: zuletzt angelegt, zuerst abgeräumt | beliebig |
| Größe | begrenzt, daher der Stapelüberlauf | wesentlich größer |

:::alert{info}
Diese Aufteilung ist keine Eigenheit von Java. Fast jede Programmiersprache trennt so – die Begriffe *stack* und *heap* begegnen dir überall wieder, ebenso wie der Stapelüberlauf.
:::

## Warum das wichtig wird

:::snippet{#merken}
Das Modell trägt durch den ganzen Lernpfad:

- Bei der **Rekursion** erklärt es, warum jeder Aufruf seine eigenen Werte hat und wo die Grenze liegt.
- Beim **Beurteilen von Algorithmen** ist der zusätzliche Speicherbedarf eines rekursiven Verfahrens genau die Höhe des Kellerstapels.
- Bei den **dynamischen Datenstrukturen** liegen alle Knoten auf der Halde, verbunden durch Referenzen. Deshalb kann eine Liste wachsen, ohne dass vorher jemand ihre Größe kennt.
:::

---

## Selbsttest

::::multievent

**1. Wo liegen die Parameter und lokalen Variablen eines Methodenaufrufs?**

{r1{auf der Halde}}

{r1{!in einem Kellerrahmen auf dem Kellerstapel}}

{r1{in der Klasse}}

{r1{im Objekt}}

{h{Sie gehören zu genau einem Aufruf und verschwinden mit ihm.}}
{H{Richtig!}}

**2. Wo liegt ein Objekt, das mit new erzeugt wurde?**

{r2{im Kellerrahmen der Methode, die es erzeugt hat}}

{r2{!auf der Halde}}

{r2{in der Variablen, der es zugewiesen wird}}

{h{Sonst könnte es das Ende dieser Methode nicht überleben.}}
{H{Richtig!}}

**3. Was geschieht beim return mit dem Kellerrahmen?**

{r3{er bleibt bis zum Programmende erhalten}}

{r3{!er wird vom Stapel heruntergenommen}}

{r3{er wandert auf die Halde}}

{h{Der Stapel arbeitet nach dem Prinzip: wer zuletzt kam, geht zuerst.}}
{H{Richtig!}}

**4. Wann gibt die Speicherbereinigung ein Objekt frei?**

{r4{sobald die Methode endet, die es erzeugt hat}}

{r4{!sobald keine Referenz mehr darauf zeigt}}

{r4{sobald es nicht mehr verändert wird}}

{h{Entscheidend ist allein, ob das Programm noch hinkommt.}}
{H{Richtig!}}

**5. Warum führt eine Rekursion ohne Basisfall zum Stapelüberlauf?**

{r5{weil die Halde voll läuft}}

{r5{!weil jeder Aufruf einen Rahmen belegt und keiner zurückkehrt}}

{r5{weil die Speicherbereinigung nicht hinterherkommt}}

{h{Abgeräumt wird ein Rahmen erst beim return - und das kommt nie.}}
{H{Richtig!}}

**6. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Eine Variable vom Objekttyp liegt im Kellerrahmen, das Objekt auf der Halde.}}

{c1{!Zwei Kellerrahmen können Referenzen auf dasselbe Objekt enthalten.}}

{c1{!Ein Objekt kann die Methode überleben, die es angelegt hat.}}

{c1{Der Kellerstapel wird von der Speicherbereinigung aufgeräumt.}}

{h{Ein Rahmen verschwindet schon beim return - dafür braucht es niemanden.}}
{H{Richtig!}}

::::
