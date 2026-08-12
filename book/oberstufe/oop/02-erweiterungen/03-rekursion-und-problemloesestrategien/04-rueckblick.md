---
title: Rückblick
index: 4
---

# Rückblick

Rekursion ist der Punkt, an dem viele aussteigen – nicht weil sie schwer wäre, sondern weil sie ungewohnt ist. Die Prüfung, ob du sie beherrschst, ist einfach: Kannst du zu einem Problem den **Basisfall** und den **Rekursionsschritt** angeben? Alles andere folgt daraus.

## Das kann ich jetzt

- [ ] Ich kann eine rekursive Methode lesen und ihre Aufrufe von Hand nachvollziehen. ([3.1](./01-rekursion))
- [ ] Ich kann zu einem Problem **Basisfall** und **Rekursionsschritt** angeben. ([3.1](./01-rekursion))
- [ ] Ich kann erklären, warum eine fehlende Abbruchbedingung das Programm zum Absturz bringt. ([3.1](./01-rekursion))
- [ ] Ich kann das Prinzip **Teilen und Herrschen** an einem Beispiel erläutern. ([3.2](./02-teilen-und-herrschen))
- [ ] Ich kann **Backtracking** als systematisches Ausprobieren mit Zurücknehmen beschreiben. ([3.3](./03-backtracking))

:::alert{info}
Aufgabe 3 gehört zum **Leistungskurs**.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Aufrufe zählen**

```java
int fib(int pN) {
    if (pN <= 1) {
        return pN;
    }
    return fib(pN - 1) + fib(pN - 2);
}
```

a) Zeichne den vollständigen Aufrufbaum für `fib(5)` auf Papier.

b) Wie viele Aufrufe von `fib` sind das insgesamt? Zähle im Baum nach.

c) Wie oft wird dabei `fib(2)` berechnet? Was fällt dir auf?

d) Zähle im Programm unten mit, wie viele Aufrufe `fib(10)`, `fib(15)` und `fib(20)` brauchen. Beschreib das Wachstum.

e) Warum ist diese Fassung trotz ihrer Eleganz eine schlechte Lösung? Was müsste man ändern?
:::

::::collapsible{title="Tipp zu a)"}

Die Wurzel ist `fib(5)`. Sie hat zwei Kinder: `fib(4)` und `fib(3)`. Zeichne so weiter, bis nur noch `fib(1)` und `fib(0)` an den Blättern stehen – die rufen nichts mehr auf.

::::

:::onlineide{height="520px" speed="1000000"}

```java Main.java
int aufrufe = 0;

void main() {
    aufrufe = 0;
    IO.println("fib(10) = " + fib(10) + " mit " + aufrufe + " Aufrufen");

    aufrufe = 0;
    IO.println("fib(15) = " + fib(15) + " mit " + aufrufe + " Aufrufen");

    aufrufe = 0;
    IO.println("fib(20) = " + fib(20) + " mit " + aufrufe + " Aufrufen");
}

int fib(int pN) {
    aufrufe++;
    if (pN <= 1) {
        return pN;
    }
    return fib(pN - 1) + fib(pN - 2);
}
```

:::

:::protect{password="java-q-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b) Der Baum hat **15** Knoten, also 15 Aufrufe für `fib(5)`. Das Ergebnis ist 5.

c) `fib(2)` wird **dreimal** berechnet, `fib(3)` zweimal, `fib(1)` fünfmal. Der Baum rechnet dieselben Teilergebnisse immer wieder aus, ohne sie sich zu merken.

d)

| n | Aufrufe |
| --- | --- |
| 10 | 177 |
| 15 | 1 973 |
| 20 | 21 891 |

Alle fünf Schritte etwa das **Elffache**. Das Wachstum ist exponentiell: Für `fib(40)` wären es bereits über 300 Millionen Aufrufe.

e) Weil dieselben Teilprobleme unzählige Male gelöst werden. Zwei Auswege:

- **Iterativ** rechnen: Man merkt sich die beiden letzten Werte und läuft einmal hoch – `n` Schritte statt exponentiell vieler.
- Die berechneten Werte **speichern** und beim nächsten Aufruf nachsehen. Diese Technik heißt Memoisierung.

Die Lehre daraus: Rekursion ist ein Ausdrucksmittel, keine Garantie für eine gute Lösung. Elegant heißt nicht effizient.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Rekursiv formulieren**

Gib für jede Aufgabe **Basisfall** und **Rekursionsschritt** in Worten an und schreib dann die Methode.

a) `int summe(int[] pWerte, int pIndex)` – die Summe aller Werte ab `pIndex`.

b) `String umgekehrt(String pText)` – der Text rückwärts.

c) `int potenz(int pBasis, int pExponent)` – die Potenz, ohne `Math.pow`.

d) Für welche dieser drei Aufgaben ist eine Schleife die bessere Lösung? Begründe.
:::

::::collapsible{title="Tipp: Immer dieselben zwei Fragen"}

1. **Wann ist es trivial?** Das ist der Basisfall – beim leeren Rest, beim einzelnen Zeichen, beim Exponenten 0.
2. **Wie komme ich einen Schritt näher heran?** Ein Element weniger, ein Zeichen weniger, ein Exponent weniger.

Fehlt Punkt 1, läuft die Rekursion endlos und das Programm bricht mit einem Überlauf des Aufrufstapels ab.

::::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {4, 8, 15, 16};

    IO.println(summe(werte, 0));
    IO.println(umgekehrt("Informatik"));
    IO.println(potenz(2, 10));
}

int summe(int[] pWerte, int pIndex) {
    // Deine Loesung. Die Rueckgabewerte sind nur Platzhalter,
    // damit das Programm von Anfang an laeuft.
    return 0;
}

String umgekehrt(String pText) {
    // Deine Loesung.
    return pText;
}

int potenz(int pBasis, int pExponent) {
    // Deine Loesung.
    return 1;
}
```

:::

:::protect{password="java-q-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Basisfall:** Ist der Index hinter dem letzten Element, ist die Summe 0. **Schritt:** Das Element am Index plus die Summe des Restes.

```java
int summe(int[] pWerte, int pIndex) {
    if (pIndex >= pWerte.length) {
        return 0;
    }
    return pWerte[pIndex] + summe(pWerte, pIndex + 1);
}
```

b) **Basisfall:** Ein Text mit höchstens einem Zeichen bleibt, wie er ist. **Schritt:** Der umgekehrte Rest, danach das erste Zeichen.

```java
String umgekehrt(String pText) {
    if (pText.length() <= 1) {
        return pText;
    }
    return umgekehrt(pText.substring(1)) + pText.charAt(0);
}
```

c) **Basisfall:** Jede Zahl hoch 0 ist 1. **Schritt:** Basis mal Basis hoch (Exponent − 1).

```java
int potenz(int pBasis, int pExponent) {
    if (pExponent == 0) {
        return 1;
    }
    return pBasis * potenz(pBasis, pExponent - 1);
}
```

Ergebnisse: `43`, `kitamrofnI`, `1024`.

d) Für **alle drei** ginge eine Schleife genauso gut, bei a) und c) sogar sparsamer, weil kein Aufrufstapel entsteht. Rekursion lohnt sich dort, wo die Struktur des Problems selbst verzweigt ist – bei **Bäumen**, beim Sortieren durch Teilen und Herrschen, beim Backtracking. Bei einer geraden Kette von Schritten ist sie hübsch, aber überflüssig.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Zwei Strategien unterscheiden** *(LK)*

a) Beschreib **Teilen und Herrschen** in drei Schritten – so allgemein, dass die Beschreibung auf Mergesort **und** auf die binäre Suche passt.

b) Warum ist die binäre Suche nur auf **sortierten** Daten möglich? Was ginge verloren, wenn die Daten unsortiert wären?

c) Beschreib das Vorgehen beim **Backtracking** in eigenen Worten. Welcher Schritt kommt darin vor, den es bei Teilen und Herrschen nicht gibt?

d) Ordne zu: Labyrinth durchsuchen, Zahlenfolge sortieren, Sudoku lösen, in einem Telefonbuch nachschlagen, alle Wege eines Damenproblems finden.

e) Beim Backtracking spricht man vom „Beschneiden" des Suchbaums. Erkläre, was damit gemeint ist und warum es den Unterschied zwischen „läuft" und „läuft nie fertig" ausmachen kann.
:::

:::protect{password="java-q-3-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 1. **Teilen:** Das Problem in kleinere Teilprobleme derselben Art zerlegen. 2. **Herrschen:** Die Teile lösen – rekursiv, bis sie trivial sind. 3. **Zusammenfügen:** Aus den Teillösungen die Gesamtlösung bauen. Bei der binären Suche fällt Schritt 3 weg, weil nur **eine** Hälfte weiterverfolgt wird; das ist der Grund, warum sie so billig ist.

b) Weil der Vergleich mit dem mittleren Element sonst nichts aussagt. Auf sortierten Daten schließt er die halbe Menge aus – auf unsortierten schließt er gar nichts aus, und man müsste doch alles durchsehen.

c) Man baut eine Lösung **schrittweise** auf. Nach jedem Schritt prüft man, ob der bisherige Teil noch gültig sein kann. Wenn nicht, **nimmt man den letzten Schritt zurück** und probiert die nächste Möglichkeit. Genau dieses Zurücknehmen gibt es bei Teilen und Herrschen nicht: Dort werden Teilprobleme gelöst und zusammengefügt, aber nie verworfen.

d)

| Problem | Strategie |
| --- | --- |
| Labyrinth durchsuchen | Backtracking |
| Zahlenfolge sortieren | Teilen und Herrschen (Mergesort, Quicksort) |
| Sudoku lösen | Backtracking |
| im Telefonbuch nachschlagen | Teilen und Herrschen (binäre Suche) |
| alle Lösungen des Damenproblems | Backtracking |

e) Gemeint ist, dass ein Teilbaum der Möglichkeiten gar nicht erst betreten wird, weil schon feststeht, dass dort keine Lösung liegen kann – etwa wenn zwei Damen einander bereits bedrohen. Ohne Beschneiden probiert das Verfahren **alle** Stellungen durch; beim Damenproblem auf einem 8×8-Brett wären das Milliarden. Mit Beschneiden bleiben wenige Tausend. Genau darin liegt der Unterschied zwischen einem Programm, das in einer Sekunde antwortet, und einem, auf das man vergeblich wartet.

:::

<!--
Rückblick zu KLP QPh, Algorithmen: Rekursion, Teilen und Herrschen;
Backtracking nur LK. Aufgabe 1 zielt auf die Beurteilung nach der Zahl der
Operationen (A).
-->

---

## Selbsttest

::::multievent

**1. Was gehört zwingend zu jeder rekursiven Methode?**

{c1{!ein Basisfall, in dem nicht weiter aufgerufen wird}}

{c1{!ein Schritt, der dem Basisfall näher kommt}}

{c1{eine Schleife}}

{c1{ein Feld als Parameter}}

{h{Zwei Bestandteile sind unverzichtbar – die anderen beiden kommen vor, sind aber nicht nötig.}}
{H{Richtig.}}

**2. Was passiert, wenn der Basisfall fehlt?**

{r1{Die Methode gibt null zurück.}}

{r1{!Die Aufrufe hören nicht auf, bis der Aufrufstapel überläuft und das Programm abbricht.}}

{r1{Der Übersetzer meldet einen Fehler.}}

{r1{Die Methode wird einmal ausgeführt.}}

{h{Jeder Aufruf legt etwas auf einen Stapel, der nicht unbegrenzt ist.}}
{H{Richtig – und gemeldet wird es erst zur Laufzeit.}}

**3. Wie viele Aufrufe braucht die naive Fibonacci-Rekursion für n gleich 5?**

{z{15}}

{h{Zeichne den Baum und zähle die Knoten.}}
{H{Richtig – und für n gleich 20 sind es schon fast 22 000.}}

**4. Warum ist die naive Fibonacci-Rekursion ineffizient?**

{r2{Weil Rekursion grundsätzlich langsam ist.}}

{r2{!Weil dieselben Teilergebnisse immer wieder neu berechnet werden.}}

{r2{Weil sie zu viel Speicher braucht.}}

{r2{Weil sie falsche Ergebnisse liefert.}}

{h{Sieh dir im Aufrufbaum an, wie oft fib von 2 vorkommt.}}
{H{Richtig.}}

**5. Welche drei Schritte kennzeichnen Teilen und Herrschen?**

{S1{das Problem in kleinere Teile derselben Art zerlegen}}

{S1{die Teile rekursiv lösen}}

{S1{die Teillösungen zur Gesamtlösung zusammenfügen}}

{h{Der Name nennt die ersten beiden Schritte schon.}}
{H{Richtig – bei der binären Suche entfällt der dritte, weil nur eine Hälfte weiterverfolgt wird.}}

**6. Welcher Schritt gehört zum Backtracking, nicht aber zu Teilen und Herrschen?**

{r3{das Zerlegen des Problems}}

{r3{!das Zurücknehmen eines Schrittes, der in eine Sackgasse führt}}

{r3{der rekursive Aufruf}}

{r3{das Zusammenfügen der Teillösungen}}

{h{Der Name sagt es: zurück auf der Spur.}}
{H{Richtig.}}

**7. Wozu dient das Beschneiden des Suchbaums beim Backtracking?**

{r4{Es macht die Lösung kürzer.}}

{r4{!Teilbäume, in denen keine Lösung liegen kann, werden gar nicht erst betreten.}}

{r4{Es sortiert die Möglichkeiten.}}

{r4{Es verhindert Endlosschleifen.}}

{h{Beim Damenproblem: Wozu weitersuchen, wenn zwei Damen sich schon bedrohen?}}
{H{Richtig – das entscheidet über Sekunden oder vergebliches Warten.}}

::::
