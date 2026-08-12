---
title: Rückblick
index: 3
---

# Rückblick

Quicksort und Mergesort lösen dieselbe Aufgabe wie die Verfahren aus der Einführungsphase – nur eben nicht in `n²`, sondern in `n · log n` Schritten. Der Unterschied ist keine Kleinigkeit: Er entscheidet darüber, ob eine Million Datensätze in Sekunden oder in Stunden sortiert sind.

## Das kann ich jetzt

- [ ] Ich kann **Quicksort** erklären: Pivot wählen, aufteilen, rekursiv weitermachen. ([6.1](./01-quicksort))
- [ ] Ich kann **Mergesort** erklären: halbieren, sortieren, verschmelzen. ([6.2](./02-mergesort))
- [ ] Ich kann das Verschmelzen zweier sortierter Folgen selbst implementieren. ([6.2](./02-mergesort))
- [ ] Ich kann beide Verfahren nach Aufwand und Speicherbedarf vergleichen.
- [ ] Ich kann begründen, warum beide dem Prinzip **Teilen und Herrschen** folgen.

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Schritt für Schritt**

Gegeben ist die Folge `7 2 9 4 1 8 3`.

a) Führ **Quicksort** auf Papier durch. Wähle als Pivot jeweils das **letzte** Element des betrachteten Abschnitts. Notiere nach jeder Aufteilung den Zustand des Feldes und markiere, welcher Abschnitt als Nächstes drankommt.

b) Führ **Mergesort** auf Papier durch. Zeichne den Baum des Halbierens nach unten und das Verschmelzen nach oben.

c) Wie tief wird die Rekursion bei Mergesort für sieben Elemente? Wie tief bei Quicksort in deiner Rechnung aus a)?

d) Bei welchem der beiden Verfahren hängt die Tiefe von den **Daten** ab? Warum?
:::

::::collapsible{title="Tipp zu a)"}

Nach der Aufteilung steht das Pivot an seinem **endgültigen** Platz: Links davon liegt alles Kleinere, rechts alles Größere. Beide Seiten sind für sich noch unsortiert – auf sie wird dasselbe Verfahren angewandt.

::::

:::protect{password="java-q-6-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Mit dem jeweils letzten Element als Pivot:

| Tiefe | Pivot | Feld nach der Aufteilung |
| --- | --- | --- |
| 0 | 3 | `2 1` **3** `4 7 8 9` |
| 1 | 1 | **1** `2` — 3 — `4 7 8 9` |
| 1 | 9 | `1 2 3` — `4 7 8` **9** |
| 2 | 8 | `1 2 3 4 7` **8** `9` |
| 3 | 7 | `1 2 3 4` **7** `8 9` |

Ergebnis: `1 2 3 4 7 8 9`.

b) Mergesort halbiert **unabhängig von den Werten**:

```
        7 2 9 4 1 8 3
        /           \
    7 2 9 4       1 8 3
    /     \       /    \
  7 2     9 4    1 8    3
  / \     / \    / \
 7   2   9   4  1   8
```

Nach oben wird verschmolzen: `2 7`, `4 9`, `1 8` – dann `2 4 7 9` und `1 3 8` – zuletzt `1 2 3 4 7 8 9`.

c) Bei Mergesort **drei** Ebenen, denn 7 Elemente lassen sich dreimal halbieren (⌈log₂ 7⌉ = 3). Bei Quicksort waren es in a) **vier** Ebenen, weil die Aufteilung ungleichmäßig ausfiel.

d) Nur bei **Quicksort**. Die Aufteilung hängt davon ab, wo das Pivot landet: Trifft es die Mitte, sind beide Hälften gleich groß; ist es das Minimum oder Maximum, bleibt auf einer Seite alles übrig. Mergesort halbiert dagegen stur in der Mitte – die Struktur des Baums steht schon vor dem ersten Vergleich fest.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Verschmelzen**

Schreib die Methode `int[] verschmelze(int[] pLinks, int[] pRechts)`, die zwei **bereits sortierte** Felder zu einem sortierten Feld zusammenführt.

a) Erkläre in Worten, warum dafür ein einziger Durchlauf über beide Felder genügt – und warum das bei unsortierten Feldern nicht ginge.

b) Implementiere die Methode.

c) Was passiert, wenn eines der Felder früher zu Ende ist als das andere? Wie fängst du das ab?

d) Wie viele Vergleiche braucht das Verschmelzen von zwei Feldern der Längen `n` und `m` höchstens?

e) Warum braucht Mergesort im Gegensatz zu Quicksort **zusätzlichen Speicher**?
:::

::::collapsible{title="Tipp: Drei Zeiger"}

Du brauchst drei Positionen: eine im linken Feld, eine im rechten und eine im Ergebnis. In jedem Schritt vergleichst du die beiden vordersten Elemente, übernimmst das kleinere und rückst **nur dort** weiter.

::::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    int[] links = {2, 4, 7, 9};
    int[] rechts = {1, 3, 8};

    int[] ergebnis = verschmelze(links, rechts);

    String ausgabe = "";
    for (int i = 0; i < ergebnis.length; i++) {
        ausgabe = ausgabe + ergebnis[i] + " ";
    }
    IO.println(ausgabe);
}

int[] verschmelze(int[] pLinks, int[] pRechts) {
    // Deine Loesung:

    return new int[0];
}
```

:::

:::protect{password="java-q-6-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Weil bei sortierten Feldern das kleinste noch nicht übernommene Element **immer** eines der beiden vordersten ist. Man muss also nie zurückschauen und nie suchen. Bei unsortierten Feldern gäbe es diese Zusicherung nicht – dort könnte das Kleinste ganz hinten liegen, und man müsste jedes Mal alles absuchen.

b)

```java
int[] verschmelze(int[] pLinks, int[] pRechts) {
    int[] ergebnis = new int[pLinks.length + pRechts.length];
    int i = 0;
    int j = 0;
    int k = 0;

    while (i < pLinks.length && j < pRechts.length) {
        if (pLinks[i] <= pRechts[j]) {
            ergebnis[k] = pLinks[i];
            i++;
        } else {
            ergebnis[k] = pRechts[j];
            j++;
        }
        k++;
    }

    while (i < pLinks.length) {
        ergebnis[k] = pLinks[i];
        i++;
        k++;
    }

    while (j < pRechts.length) {
        ergebnis[k] = pRechts[j];
        j++;
        k++;
    }

    return ergebnis;
}
```

Ergebnis: `1 2 3 4 7 8 9`.

c) Genau dafür sind die beiden `while`-Schleifen am Ende da: Sie hängen den **Rest** des noch nicht erschöpften Feldes an. Wer sie vergisst, verliert Elemente – und zwar unbemerkt, denn das Ergebnis ist trotzdem sortiert, nur zu kurz. Nur eine der beiden Schleifen läuft je überhaupt.

d) Höchstens `n + m − 1`. Jeder Vergleich übernimmt genau ein Element; ist nur noch eines übrig, braucht es keinen Vergleich mehr.

e) Weil das Ergebnis in ein **neues** Feld geschrieben wird – man kann nicht an Ort und Stelle verschmelzen, ohne Werte zu überschreiben, die noch gebraucht werden. Mergesort braucht deshalb zusätzlich Platz in der Größe der Eingabe. Quicksort arbeitet dagegen **im Feld selbst**: Es tauscht nur und braucht außer dem Aufrufstapel keinen nennenswerten Zusatzspeicher.

**Der Vergleich in einem Satz:** Beide brauchen im Mittel `n · log n` Schritte. Mergesort ist dabei zuverlässig, kostet aber Speicher; Quicksort ist sparsam und in der Praxis schneller, kann bei ungünstiger Pivotwahl aber auf `n²` abrutschen.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Beurteilen**

a) Ein Feld ist bereits sortiert. Was tut Quicksort mit dem letzten Element als Pivot? Wie viele Ebenen entstehen, und wie viel Aufwand ist das insgesamt?

b) Wie lässt sich dieser Fall entschärfen? Nenne zwei Möglichkeiten.

c) Zwei Datensätze haben denselben Sortierschlüssel. Ein Verfahren heißt **stabil**, wenn ihre ursprüngliche Reihenfolge erhalten bleibt. Warum ist Stabilität bei einer Tabelle wichtig, die man nacheinander nach zwei Spalten sortiert?

d) Für 1000 Elemente braucht ein `n²`-Verfahren rund 500 000 Vergleiche. Wie viele braucht ein `n · log n`-Verfahren ungefähr? Um welchen Faktor unterscheiden sie sich?

e) Wann würdest du trotzdem Sortieren durch Einfügen wählen?
:::

:::protect{password="java-q-6-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Das Pivot ist dann immer das **größte** Element des Abschnitts. Die Aufteilung liefert links alles und rechts nichts – der Abschnitt schrumpft je Ebene nur um eins. Es entstehen `n` Ebenen statt log₂(n), der Aufwand steigt auf `n²`. Ausgerechnet der bereits sortierte Fall ist damit der **ungünstigste**, was viele überrascht.

b) Zum Beispiel:

- Das Pivot **nicht** fest an einer Position wählen, sondern zufällig – dann ist der schlechte Fall unwahrscheinlich statt vorhersagbar.
- Den **Median von drei** Werten nehmen (erstes, mittleres, letztes Element) – billig zu berechnen und in der Praxis sehr wirksam.

c) Weil das zweistufige Sortieren sonst nicht funktioniert. Sortiert man eine Kursliste erst nach dem Vornamen und dann nach dem Nachnamen, sollen Personen mit gleichem Nachnamen weiterhin nach Vornamen geordnet sein. Ein instabiles Verfahren würfelt diese Reihenfolge durcheinander, und die erste Sortierung war umsonst. Mergesort lässt sich stabil implementieren, Quicksort in seiner üblichen Form nicht.

d) 1000 · log₂(1000) ≈ 1000 · 10 = **10 000** Vergleiche. Das ist rund **fünfzigmal** weniger. Bei einer Million Elementen sind es 5 · 10¹¹ gegenüber 2 · 10⁷ – ein Faktor von etwa 25 000.

e) Bei **kleinen** Feldern und bei **fast sortierten** Daten. Sortieren durch Einfügen hat kaum Verwaltungsaufwand und braucht bei vorsortierten Daten nur `n` Vergleiche – da ist es schneller als jedes Teilen und Herrschen. Deshalb schalten gute Bibliotheksimplementierungen unterhalb einer Größe von etwa 10 bis 20 Elementen auf genau dieses Verfahren um.

:::

<!--
Rückblick zum Inhaltsfeld Algorithmen: iterative und rekursive Sortierverfahren
implementieren (I) und nach Speicherbedarf sowie Zahl der Operationen
beurteilen (A).
-->

---

## Selbsttest

::::multievent

**1. Was geschieht bei Quicksort mit dem Pivot nach der Aufteilung?**

{r1{Es wandert ans Ende des Feldes.}}

{r1{!Es steht an seinem endgültigen Platz.}}

{r1{Es wird entfernt.}}

{r1{Es wird im nächsten Schritt erneut aufgeteilt.}}

{h{Links davon liegt alles Kleinere, rechts alles Größere – wo gehört es dann hin?}}
{H{Richtig – deshalb wird es in den Teilaufrufen ausgespart.}}

**2. Wovon hängt die Rekursionstiefe bei Mergesort ab?**

{r2{von den Werten}}

{r2{!nur von der Anzahl der Elemente}}

{r2{von der Wahl des Pivots}}

{r2{von der Sortierrichtung}}

{h{Mergesort halbiert stur in der Mitte.}}
{H{Richtig – deshalb ist sein Aufwand verlässlich.}}

**3. Welche Voraussetzung braucht das Verschmelzen?**

{r3{beide Felder sind gleich lang}}

{r3{!beide Felder sind bereits sortiert}}

{r3{beide Felder enthalten nur positive Zahlen}}

{r3{keine}}

{h{Warum genügt der Blick auf die beiden vordersten Elemente?}}
{H{Richtig.}}

**4. Warum braucht Mergesort zusätzlichen Speicher?**

{r4{Weil es rekursiv ist.}}

{r4{!Weil das Verschmelzen in ein neues Feld schreibt.}}

{r4{Weil es die Daten kopiert, bevor es beginnt.}}

{r4{Es braucht keinen.}}

{h{Was passiert mit Werten, die man überschreiben würde?}}
{H{Richtig – Quicksort tauscht dagegen im Feld selbst.}}

**5. Welcher Fall ist für Quicksort mit dem letzten Element als Pivot der ungünstigste?**

{r5{ein zufällig gemischtes Feld}}

{r5{!ein bereits sortiertes Feld}}

{r5{ein Feld mit lauter gleichen Werten in der Mitte}}

{r5{ein Feld der Länge 1}}

{h{Wo landet das Pivot, wenn es immer das größte Element ist?}}
{H{Richtig – ausgerechnet der scheinbar einfachste Fall.}}

**6. Was bedeutet, dass ein Sortierverfahren stabil ist?**

{r6{Es stürzt nicht ab.}}

{r6{!Datensätze mit gleichem Schlüssel behalten ihre ursprüngliche Reihenfolge.}}

{r6{Es braucht immer gleich lange.}}

{r6{Es funktioniert für alle Datentypen.}}

{h{Denk an eine Liste, die erst nach Vorname und dann nach Nachname sortiert wird.}}
{H{Richtig.}}

**7. Wie viele Vergleiche braucht ein Verfahren mit n mal log n bei 1000 Elementen ungefähr?**

{z{10000}}

{h{Zweierlogarithmus von 1000 ist etwa 10.}}
{H{Richtig – rund fünfzigmal weniger als ein quadratisches Verfahren.}}

::::
