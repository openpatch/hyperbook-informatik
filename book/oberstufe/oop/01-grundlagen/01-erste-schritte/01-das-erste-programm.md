---
title: Das erste Programm
index: 1
---

# Das erste Programm

Ein Programm ist eine Folge von Anweisungen, die ein Rechner der Reihe nach abarbeitet. Damit er sie versteht, müssen sie in einer **Programmiersprache** formuliert sein. Wir verwenden **Java**.

Alles, was du in diesem Lernpfad brauchst, läuft direkt im Browser. Du musst nichts installieren.

## So sieht ein Java-Programm aus

:::onlineide{height="320px"}

```java Main.java
void main() {
    IO.println("Hallo Welt!");
}
```

:::

Starte das Programm über den Pfeil ▷ **neben `Main.java`** in der Dateiliste. Die Ausgabe erscheint rechts.

:::snippet{#merken}
| Bestandteil | Bedeutung |
| --- | --- |
| `void main() { ... }` | Das **Hauptprogramm**. Hier startet die Ausführung. Alles zwischen den geschweiften Klammern wird von oben nach unten abgearbeitet. |
| `IO.println("Hallo Welt!");` | Eine **Anweisung**. Sie gibt den Text in Anführungszeichen aus und macht danach einen Zeilenumbruch. |
| `;` | Jede Anweisung endet mit einem **Semikolon**. Das ist Pflicht. |
| `{ }` | Geschweifte Klammern fassen Anweisungen zu einem **Block** zusammen. |
:::

:::snippet{#aufgabe}
Verändere das Programm so, dass es **drei** Zeilen ausgibt: deinen Namen, deine Lieblingsfarbe und deine Lieblingszahl.
:::

::::collapsible{title="Tipp: Wie bekomme ich mehr Zeilen?"}

Jede Ausgabe braucht eine eigene Anweisung. Schreibe also drei Zeilen `IO.println(...)` untereinander – jede mit ihrem eigenen Semikolon am Ende.

::::

:::protect{password="java-ef-1-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    IO.println("Ada Lovelace");
    IO.println("Grün");
    IO.println(42);
}
```

Beachte: Bei der Zahl stehen **keine** Anführungszeichen. Text kommt in Anführungszeichen, Zahlen nicht.

:::

## Fehlermeldungen lesen

Programme, die nicht laufen, sind der Normalfall – auch bei Profis. Entscheidend ist, dass du die Fehlermeldung liest, statt sie wegzuklicken.

:::snippet{#aufgabe}
Das folgende Programm läuft nicht. Es steht hier **nur als Abbildung** – die IDE bekommst du gleich.

a) Finde **auf Papier**, was nicht stimmt. Notiere zu jeder Zeile, was du bemängelst.

b) Formuliere für jeden Fund einen Satz: Was hätte dort stehen müssen?
:::

```java
void main() {
    IO.println("Zeile eins")
    IO.println(Zeile zwei);
    IO.println("Zeile drei");
}
```

::::collapsible{title="Tipp: Woran erkennt Java einen Text?"}

Java erkennt einen Text nur an den **doppelten Anführungszeichen**. Fehlen sie, sucht Java nach einer Variablen mit diesem Namen.

::::

::::collapsible{title="Auflösung"}

1. In Zeile 2 fehlt das **Semikolon** am Ende.
2. In Zeile 3 fehlen die **Anführungszeichen** um `Zeile zwei`.
3. Und damit hängt zusammen: `Zeile zwei` besteht aus zwei Wörtern mit einem Leerzeichen – selbst als Variablenname wäre das nicht erlaubt.

::::

### Jetzt die IDE

:::snippet{#aufgabe}
Hier ist dasselbe Programm zum Anfassen.

a) Öffne den Reiter *Fehler* unter dem Editor. Vergleiche die Meldungen mit deiner Notiz von eben. Hat die IDE mehr, weniger oder anderes gefunden als du?

b) Repariere das Programm. Beobachte dabei, wie sich die Fehlerliste verändert.
:::

:::onlineide{height="360px"}

```java Main.java
void main() {
    IO.println("Zeile eins")
    IO.println(Zeile zwei);
    IO.println("Zeile drei");
}
```

:::

:::snippet{#merken}
Die IDE zeigt dir Fehler an, **während** du tippst – du musst sie nicht suchen. Die eigentliche Arbeit ist eine andere: die Meldung zu **verstehen**.

Drei Dinge helfen dabei:

- Jede Meldung nennt **Zeile und Spalte**, zum Beispiel `[2/28]`.
- Fang immer beim **obersten** Fehler an. Ein einziger Tippfehler erzeugt oft mehrere Folgemeldungen, die von selbst verschwinden.
- Die Meldung beschreibt, was die IDE **erwartet** hat – nicht unbedingt, was du falsch gemacht hast. „Strichpunkt hier einfügen“ steht meist eine Zeile **nach** der Zeile, in der das Semikolon fehlt.
:::

## Kommentare

Mit Kommentaren erklärst du dein Programm für Menschen. Der Rechner ignoriert sie vollständig.

:::onlineide{height="340px"}

```java Main.java
void main() {
    // Eine einzelne Zeile wird mit zwei Schrägstrichen auskommentiert.
    IO.println("Diese Zeile wird ausgeführt.");

    /* Über mehrere Zeilen
       geht es so. */
    IO.println("Diese auch.");
}
```

:::

:::snippet{#merken}
Kommentare sind kein Beiwerk, sondern Teil eines guten Programms. Ein guter Kommentar erklärt nicht, *was* dort steht – das sieht man –, sondern **warum**.

<!-- KLP EF, Daten und ihre Strukturierung: dokumentieren Methoden durch Kommentare im Quellcode (A) -->
:::

## Eine andere Schreibweise, die du kennen solltest

In Büchern und im Netz findest du sehr oft diese Form:

```java
public class HalloWelt {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}
```

Das ist dasselbe Programm in der älteren, ausführlicheren Schreibweise. Sie funktioniert auch hier. Wir benutzen im Lernpfad durchgängig die kurze Form mit `void main()`, damit du dich am Anfang auf das Wesentliche konzentrieren kannst. Wenn du später auf `public static void main(String[] args)` triffst, weißt du: gemeint ist genau dasselbe.

---

## Selbsttest

::::multievent

**1. Womit endet in Java jede einzelne Anweisung?**

{r1{mit einem Punkt}}

{r1{!mit einem Semikolon}}

{r1{mit einer geschweiften Klammer}}

{r1{mit einem Zeilenumbruch}}

{h{Schau dir noch einmal an, welches Zeichen in jeder Zeile des ersten Programms ganz hinten steht.}}
{H{Richtig! Ohne Semikolon meldet die IDE einen Fehler.}}

**2. Was macht der Rechner mit einem Kommentar?**

{r2{Er gibt ihn aus.}}

{r2{!Er ignoriert ihn vollständig.}}

{r2{Er bricht mit einem Fehler ab.}}

{h{Kommentare sind für Menschen gedacht, nicht für den Rechner.}}
{H{Genau. Kommentare ändern am Ablauf des Programms gar nichts.}}

**3. Welche Aussagen über das Hauptprogramm stimmen?** (Mehrfachauswahl)

{c1{!Es heißt main.}}

{c1{!Seine Anweisungen werden von oben nach unten abgearbeitet.}}

{c1{Es muss immer in einer Klasse stehen.}}

{c1{Es darf höchstens eine Anweisung enthalten.}}

{h{Denk an die kurze Schreibweise, die wir hier benutzen, und an die Reihenfolge der Ausgaben.}}
{H{Richtig! In der kurzen Schreibweise braucht main keine Klasse, und die Anweisungen laufen der Reihe nach.}}

**4. Ergänze: Der Befehl {t{println}} gibt einen Wert aus und macht danach einen Zeilenumbruch.**

**5. Wie viele Fehler hatte das fehlerhafte Programm aus dieser Lektion?**

{z{3}}

{h{Zähle noch einmal nach: fehlendes Semikolon und fehlende Anführungszeichen.}}
{H{Richtig!}}

::::
