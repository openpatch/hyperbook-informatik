---
title: Laufzeit und Komplexität
index: 2
---

# Laufzeit und Komplexität

In der Einführungsphase hast du Operationen gezählt und Wachstumsklassen kennengelernt. Jetzt formalisieren wir das – und nehmen den **Speicherbedarf** dazu.

<!-- KLP QPh, Algorithmen: beurteilen Algorithmen unter Berücksichtigung des Speicherbedarfs und der Zahl der Operationen (A) -->

## Warum man Größenordnungen betrachtet

:::snippet{#aufgabe}
Drei Verfahren lösen dasselbe Problem. Ihre Vergleichszahlen sind:

- Verfahren A: 100 · n
- Verfahren B: n² / 2
- Verfahren C: 5 · n · log₂ n

a) Welches ist bei n = 10 am schnellsten? Bei n = 100? Bei n = 10 000?

b) Ab welchem n ist A besser als B?

c) Was folgt daraus für die Frage, welches Verfahren „das beste“ ist?
:::

::::collapsible{title="Auflösung"}

| n | A = 100n | B = n²/2 | C = 5n·log₂n |
| --- | --- | --- | --- |
| 10 | 1 000 | **50** | 166 |
| 100 | 10 000 | 5 000 | **3 322** |
| 1 000 | **100 000** | 500 000 | **49 829** |
| 10 000 | **1 000 000** | 50 000 000 | 664 386 |

b) A ist besser als B, sobald 100n < n²/2, also ab n = 200.

c) Für **kleine** Eingaben gewinnt B, obwohl es die schlechteste Wachstumsklasse hat. Der Vorfaktor 100 bei A ist bei kleinen n erdrückend.

Für **große** Eingaben spielen Vorfaktoren keine Rolle mehr – dort entscheidet allein die Wachstumsklasse.

Deshalb betrachtet man Größenordnungen: Sie beantworten die Frage, die bei großen Datenmengen wirklich zählt. Für kleine Datenmengen muss man messen.

::::

## Die Schreibweise

:::snippet{#definition}
Man schreibt **O(f(n))** für: „der Aufwand wächst höchstens so schnell wie f(n)“.

Dabei lässt man Vorfaktoren und kleinere Summanden weg. Aus n²/2 − n/2 wird **O(n²)**, aus 100n wird **O(n)**.

Man spricht von der **Komplexität** des Verfahrens.
:::

:::snippet{#merken}
| Klasse | Name | Beispiel |
| --- | --- | --- |
| O(1) | konstant | Zugriff auf ein Feldelement, Auflegen auf einen Stapel |
| O(log n) | logarithmisch | binäre Suche, Suche im ausgeglichenen Binärbaum |
| O(n) | linear | lineare Suche, Summe eines Feldes |
| O(n · log n) | linear-logarithmisch | Quicksort im Mittel, Mergesort |
| O(n²) | quadratisch | Sortieren durch Auswählen, Einfügen, Bubblesort |
| O(n³) | kubisch | Multiplikation zweier n-mal-n-Matrizen |
| O(2ⁿ) | exponentiell | alle Teilmengen durchprobieren, Backtracking im schlechtesten Fall |
:::

## Komplexität aus dem Quelltext ablesen

:::snippet{#merken}
Drei Faustregeln reichen für fast alle Fälle:

1. **Anweisungen nacheinander:** Die größte Klasse gewinnt. O(n) gefolgt von O(n²) ergibt O(n²).
2. **Schleifen:** Die Klasse des Rumpfs mal die Anzahl der Durchläufe. Eine Schleife über n Elemente mit konstantem Rumpf ist O(n).
3. **Verschachtelte Schleifen:** Die Klassen multiplizieren sich. Zwei Schleifen über je n Elemente ergeben O(n²).

Bei Rekursion fragt man: Wie viele Ebenen gibt es, und wie viel Arbeit fällt pro Ebene an? Bei Mergesort sind das log n Ebenen mal O(n) Arbeit, also O(n · log n).
:::

:::snippet{#aufgabe}
Bestimme für jede Methode die Komplexität. Begründe mit den drei Regeln.
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 2, 8, 1, 9};
    IO.println("A: " + a(werte));
    IO.println("B: " + b(werte));
    IO.println("C: " + c(werte));
    IO.println("D: " + d(werte));
}

int a(int[] pWerte) {
    return pWerte[0] + pWerte[pWerte.length - 1];
}

int b(int[] pWerte) {
    int summe = 0;
    for (int i = 0; i < pWerte.length; i++) {
        summe = summe + pWerte[i];
    }
    return summe;
}

int c(int[] pWerte) {
    int paare = 0;
    for (int i = 0; i < pWerte.length; i++) {
        for (int j = i + 1; j < pWerte.length; j++) {
            if (pWerte[i] == pWerte[j]) {
                paare++;
            }
        }
    }
    return paare;
}

int d(int[] pWerte) {
    int summe = 0;
    for (int i = 0; i < pWerte.length; i++) {
        summe = summe + pWerte[i];
    }
    for (int i = 0; i < pWerte.length; i++) {
        for (int j = 0; j < pWerte.length; j++) {
            summe = summe + 1;
        }
    }
    return summe;
}
```

:::

::::collapsible{title="Auflösung"}

| Methode | Komplexität | Begründung |
| --- | --- | --- |
| `a` | **O(1)** | zwei Zugriffe, unabhängig von der Feldgröße |
| `b` | **O(n)** | eine Schleife über n Elemente mit konstantem Rumpf |
| `c` | **O(n²)** | zwei verschachtelte Schleifen. Dass die innere bei `i + 1` beginnt, halbiert die Anzahl – ändert aber die Klasse nicht |
| `d` | **O(n²)** | O(n) gefolgt von O(n²). Nach Regel 1 gewinnt die größere Klasse |

Bei `c` lohnt sich der genauere Blick: Die genaue Zahl ist n(n−1)/2, also n²/2 − n/2. Der Vorfaktor ½ wird weggelassen, der kleinere Summand ebenfalls. Übrig bleibt O(n²).

::::

## Der Speicherbedarf

Zeit ist nicht das Einzige, was ein Verfahren kostet. Ein Algorithmus, der doppelt so schnell ist, aber den vierfachen Speicher braucht, ist nicht automatisch der bessere.

:::snippet{#merken}
Man zählt nur den **zusätzlichen** Speicher – die Eingabe selbst zählt nicht mit.

| Verfahren | Zeit | zusätzlicher Speicher |
| --- | --- | --- |
| lineare Suche | O(n) | O(1) – ein paar Zählvariablen |
| binäre Suche, iterativ | O(log n) | O(1) |
| binäre Suche, rekursiv | O(log n) | **O(log n)** – der Aufrufstapel |
| Sortieren durch Einfügen | O(n²) | O(1) |
| Quicksort | O(n·log n) | O(log n) – der Aufrufstapel |
| Mergesort | O(n·log n) | **O(n)** – das Hilfsfeld |

**Rekursion kostet Speicher.** Jede Ebene legt einen Eintrag auf den Aufrufstapel. Bei log n Ebenen ist das harmlos, bei n Ebenen nicht.
:::

:::snippet{#aufgabe}
a) Warum braucht die rekursive binäre Suche O(log n) Speicher, die iterative aber nur O(1)?

b) Ein Verfahren sortiert eine Milliarde Zahlen. Warum kommt Mergesort dafür möglicherweise nicht in Frage?

c) Nenne eine Situation, in der man ein **langsameres** Verfahren wählt, weil es weniger Speicher braucht.
:::

::::collapsible{title="Auflösung"}

a) Die rekursive Fassung legt für jede Halbierung einen Eintrag auf den Aufrufstapel. Bei n = 1 000 000 sind das 20 Einträge. Die iterative Fassung merkt sich nur zwei Grenzen, egal wie groß das Feld ist.

b) Mergesort braucht ein Hilfsfeld in der Größe der Eingabe. Bei einer Milliarde `int`-Werten sind das zusätzliche 4 Gigabyte. Wenn die Daten ohnehin knapp in den Speicher passen, ist das nicht machbar.

c) Zum Beispiel auf einem Mikrocontroller mit wenigen Kilobyte Speicher. Dort sortiert man auch größere Datenmengen mit Sortieren durch Einfügen – es braucht keinen zusätzlichen Speicher.

Ein anderes Beispiel: eingebettete Systeme in Autos oder Medizingeräten, bei denen der Speicherbedarf **vorab garantiert** sein muss.

::::

## Aufgabe: Beurteilen

:::snippet{#aufgabe}
Für jedes Szenario: Welches Verfahren würdest du wählen? Begründe unter Berücksichtigung von **Zeit und Speicher**.

a) Ein Programm sucht in einer Liste von 20 Kontakten nach einem Namen. Die Liste ändert sich ständig.

b) Ein Wörterbuch mit 500 000 Einträgen wird einmal geladen und dann millionenfach abgefragt.

c) Eine Messreihe von 10 000 Werten kommt fast sortiert an und soll sortiert werden.

d) Ein Steuergerät mit 8 Kilobyte Arbeitsspeicher soll 500 Messwerte sortieren.

e) Ein Server sortiert nachts 50 Millionen Datensätze. Die Laufzeit muss garantiert unter einer Stunde bleiben.
:::

::textinput{placeholder="a) ... b) ... c) ... d) ... e) ..."}

::::collapsible{title="Auflösung"}

a) **Lineare Suche.** Bei 20 Einträgen lohnt sich kein Sortieren – erst recht nicht, wenn die Liste sich ständig ändert und nach jeder Änderung neu sortiert werden müsste.

b) **Einmal sortieren, dann binäre Suche.** Die Sortierkosten fallen einmal an, jede der Millionen Abfragen kostet dann nur 19 statt 250 000 Vergleiche.

c) **Sortieren durch Einfügen.** Bei fast sortierten Daten ist es O(n) und schlägt damit sogar Quicksort. Und es braucht keinen zusätzlichen Speicher.

d) **Sortieren durch Einfügen.** 500² / 4 sind etwa 62 500 Vergleiche – auf einem Mikrocontroller in Millisekunden erledigt. Mergesort schiede wegen des Hilfsfelds aus, Quicksort wegen des unvorhersehbaren Aufrufstapels.

e) **Mergesort.** Hier zählt die **Garantie**: Quicksort ist im Mittel schneller, könnte aber bei ungünstigen Daten quadratisch werden – und 50 Millionen² ist keine Stunde, sondern Jahre. Mergesort hat diesen Fall nicht.

Merke dir das letzte Beispiel: Manchmal wählt man ein Verfahren nicht, weil es schneller ist, sondern weil es **verlässlicher** ist.

::::

## Zusatzaufgabe

:::snippet{#brain}
Führe eine vollständige experimentelle Untersuchung durch.

a) Implementiere alle fünf Sortierverfahren dieses Lernpfads in einem Programm.

b) Miss für jedes die Anzahl der Vergleiche bei n = 500, 1000, 2000 und 4000 – jeweils auf zufälligen, sortierten und rückwärts sortierten Daten.

c) Berechne für jede Reihe den Faktor beim Verdoppeln von n und ordne daraus die Komplexitätsklasse zu.

d) Stelle die Ergebnisse als Säulendiagramm mit Scratch for Java dar. Nutze eine **logarithmische** Skala – sonst sind die schnellen Verfahren nicht mehr zu erkennen.

e) Schreibe eine kurze Auswertung: Welches Verfahren empfiehlst du wofür?
:::

---

## Selbsttest

::::multievent

**1. Was lässt man bei der Angabe einer Komplexitätsklasse weg?** (Mehrfachauswahl)

{c1{!Vorfaktoren}}

{c1{!kleinere Summanden}}

{c1{den Term mit dem stärksten Wachstum}}

{c1{die Abhängigkeit von n}}

{h{Genau der stärkste Term bleibt ja stehen.}}
{H{Richtig!}}

**2. Welche Komplexität haben zwei verschachtelte Schleifen über je n Elemente?**

{r1{O von n}}

{r1{!O von n zum Quadrat}}

{r1{O von n mal log n}}

{h{Die Anzahlen multiplizieren sich.}}
{H{Richtig!}}

**3. Wie viel zusätzlichen Speicher braucht Mergesort?**

{r2{konstant viel}}

{r2{logarithmisch viel}}

{r2{!linear viel}}

{h{Das Verschmelzen geht nicht ohne Hilfsfeld.}}
{H{Richtig! Deshalb scheidet es aus, wenn der Speicher knapp ist.}}

**4. Warum braucht eine rekursive Methode mehr Speicher als eine iterative?**

{r3{weil Rekursion langsamer ist}}

{r3{!weil jede Ebene einen Eintrag auf dem Aufrufstapel belegt}}

{r3{weil sie mehr Variablen deklariert}}

{h{Bei log n Ebenen ist das harmlos, bei n Ebenen nicht.}}
{H{Richtig!}}

**5. Warum kann bei sehr großen Datenmengen ein im Mittel langsameres Verfahren die bessere Wahl sein?**

{r4{weil es weniger Quelltext braucht}}

{r4{!weil es eine Garantie für den schlechtesten Fall gibt}}

{r4{weil es immer stabil sortiert}}

{h{Denk an das Beispiel mit den 50 Millionen Datensätzen über Nacht.}}
{H{Richtig!}}

::::
