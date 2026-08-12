---
title: Rückblick
index: 3
---

# Rückblick

Testen und Laufzeitbetrachtung sind die beiden Werkzeuge, mit denen man ein Programm **beurteilt**, statt es nur zu schreiben. Beide beantworten Fragen, die der Übersetzer nicht stellt: Stimmt es auch in den Randfällen? Und bleibt es brauchbar, wenn die Daten wachsen?

## Das kann ich jetzt

- [ ] Ich kann Testfälle systematisch auswählen: Normalfall, Grenzfälle, Sonderfälle. ([7.1](./01-systematisch-testen))
- [ ] Ich kann einen Test mit `assertEquals` schreiben und eine brauchbare Meldung dazu formulieren. ([7.1](./01-systematisch-testen))
- [ ] Ich kann begründen, warum „sieht plausibel aus" kein Test ist. ([7.1](./01-systematisch-testen))
- [ ] Ich kann die Komplexitätsklassen benennen und einem Algorithmus zuordnen. ([7.2](./02-laufzeit-und-komplexitaet))
- [ ] Ich kann aus dem Aufbau eines Programms auf seine Klasse schließen. ([7.2](./02-laufzeit-und-komplexitaet))
- [ ] Ich kann Zeitbedarf und Speicherbedarf getrennt beurteilen. ([7.2](./02-laufzeit-und-komplexitaet))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Testfälle finden**

Diese Methode soll das Maximum eines Feldes liefern:

```java
public int maximum(int[] pWerte) {
    int groesster = 0;
    for (int i = 0; i < pWerte.length; i++) {
        if (pWerte[i] > groesster) {
            groesster = pWerte[i];
        }
    }
    return groesster;
}
```

a) Nenne **fünf** Testfälle: einen Normalfall, zwei Grenzfälle und zwei Sonderfälle.

b) Bei welchem deiner Testfälle liefert die Methode ein falsches Ergebnis? Warum?

c) Berichtige die Methode.

d) Schreib die Testklasse mit `@Test` und lass sie im Testrunner laufen. Alle Tests müssen grün sein.

e) Ein Sonderfall lässt sich nicht durch Berichtigen retten. Welcher, und wie geht man damit um?
:::

::::collapsible{title="Tipp zu a): Wo suche ich Testfälle?"}

Immer an denselben Stellen:

- **Normalfall:** ein typisches Feld mit verschiedenen Werten.
- **Grenzfälle:** das Maximum steht ganz vorn; es steht ganz hinten; das Feld hat genau ein Element.
- **Sonderfälle:** alle Werte negativ; alle Werte gleich; ein leeres Feld.

::::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    Rechner r = new Rechner();
    IO.println(r.maximum(new int[]{3, 9, 1}));
    IO.println(r.maximum(new int[]{-5, -2, -9}));
}
```

```java Rechner.java
public class Rechner {

    public int maximum(int[] pWerte) {
        int groesster = 0;
        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] > groesster) {
                groesster = pWerte[i];
            }
        }
        return groesster;
    }
}
```

```java RechnerTest.java
@Test
class RechnerTest {

    @Test
    void testNormalfall() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(new int[]{3, 9, 1}),
                     "Das Maximum von 3, 9 und 1 ist 9.");
    }

    // Deine weiteren Tests:
}
```

:::

:::protect{password="java-q-7-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b)

| Testfall | Eingabe | erwartet | tatsächlich |
| --- | --- | --- | --- |
| Normalfall | `{3, 9, 1}` | 9 | 9 ✓ |
| Grenzfall vorn | `{9, 3, 1}` | 9 | 9 ✓ |
| Grenzfall ein Element | `{7}` | 7 | 7 ✓ |
| Sonderfall negativ | `{-5, -2, -9}` | −2 | **0** ✗ |
| Sonderfall leer | `{}` | ? | 0 |

Der Fehler steckt im Startwert `0`. Er ist stillschweigend eine Behauptung: „Kein Wert ist kleiner als 0." Bei lauter negativen Zahlen ist keiner größer als 0, und die Methode liefert eine Zahl, die im Feld gar nicht vorkommt.

c)

```java
public int maximum(int[] pWerte) {
    int groesster = pWerte[0];
    for (int i = 1; i < pWerte.length; i++) {
        if (pWerte[i] > groesster) {
            groesster = pWerte[i];
        }
    }
    return groesster;
}
```

d)

```java RechnerTest.java
@Test
class RechnerTest {

    @Test
    void testNormalfall() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(new int[]{3, 9, 1}),
                     "Das Maximum von 3, 9 und 1 ist 9.");
    }

    @Test
    void testMaximumVorn() {
        Rechner r = new Rechner();
        assertEquals(9, r.maximum(new int[]{9, 3, 1}),
                     "Auch wenn das Maximum vorne steht, muss 9 herauskommen.");
    }

    @Test
    void testEinElement() {
        Rechner r = new Rechner();
        assertEquals(7, r.maximum(new int[]{7}),
                     "Bei einem einzigen Element ist dieses das Maximum.");
    }

    @Test
    void testNurNegative() {
        Rechner r = new Rechner();
        assertEquals(-2, r.maximum(new int[]{-5, -2, -9}),
                     "Das Maximum von -5, -2 und -9 ist -2, nicht 0.");
    }
}
```

e) Das **leere Feld**. Die berichtigte Fassung greift mit `pWerte[0]` daneben und bricht ab. Retten lässt sich das nicht durch einen anderen Startwert, denn das Maximum einer leeren Menge **gibt es nicht**. Möglichkeiten: die Methode darf einen Fehler auslösen, sie liefert einen dokumentierten Sonderwert, oder man legt in der Dokumentation fest, dass das Feld nicht leer sein darf. Wichtig ist allein, dass die Entscheidung **getroffen und aufgeschrieben** wird – der schlimmste Fall ist der, in dem niemand darüber nachgedacht hat.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Klassen zuordnen**

Bestimme für jeden Ausschnitt die Komplexitätsklasse in Abhängigkeit von `n`. Begründe mit einer der drei Faustregeln.

```java
// a)
for (int i = 0; i < n; i++) {
    summe = summe + i;
}

// b)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        IO.println(i + " " + j);
    }
}

// c)
for (int i = 0; i < n; i++) {
    summe = summe + i;
}
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        produkt = produkt * 2;
    }
}

// d)
int i = n;
while (i > 1) {
    i = i / 2;
}

// e)
for (int i = 0; i < n; i++) {
    int j = n;
    while (j > 1) {
        j = j / 2;
    }
}
```

Ordne danach zu: lineare Suche, binäre Suche, Bubblesort, Mergesort, Zugriff auf ein Feldelement.
:::

:::protect{password="java-q-7-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **O(n)** – eine Schleife über `n` Elemente mit konstantem Rumpf (Regel 2).

b) **O(n²)** – zwei verschachtelte Schleifen über je `n`, die Klassen multiplizieren sich (Regel 3).

c) **O(n²)** – nacheinander O(n) und O(n²); die größere Klasse gewinnt (Regel 1). Das ist der Kern der Notation: Der kleinere Anteil verschwindet, weil er für große `n` nicht mehr ins Gewicht fällt.

d) **O(log n)** – `i` wird in jedem Schritt halbiert. Von 1000 bis 1 sind das rund zehn Schritte, von einer Million rund zwanzig.

e) **O(n · log n)** – eine äußere Schleife über `n`, in der jeweils ein logarithmischer Vorgang abläuft.

Die Zuordnung:

| Verfahren | Klasse | passt zu |
| --- | --- | --- |
| Zugriff auf ein Feldelement | O(1) | – |
| binäre Suche | O(log n) | d) |
| lineare Suche | O(n) | a) |
| Mergesort | O(n · log n) | e) |
| Bubblesort | O(n²) | b) und c) |

:::

:::snippet{#aufgabe}
**Aufgabe 3: Beurteilen und entscheiden**

a) Ein Programm braucht für 1000 Datensätze 2 Sekunden. Wie lange braucht es für 10 000, wenn es in O(n), in O(n · log n) und in O(n²) läuft? Rechne für jede Klasse.

b) Warum ist O(n²) für 1000 Elemente meist völlig unproblematisch, für 100 000 aber nicht mehr? Nenne konkrete Zahlen.

c) Ein Verfahren ist in O(n), braucht aber zusätzlichen Speicher in O(n). Ein anderes ist in O(n · log n) und braucht O(1) zusätzlichen Speicher. Wann würdest du welches wählen? Nenne je eine Situation.

d) Eine Kollegin sagt: „Mein Algorithmus ist O(n), der andere O(n²) – meiner ist also immer schneller." Nimm Stellung.

e) Warum ist eine gemessene Laufzeit allein kein guter Beleg für die Güte eines Verfahrens? Nenne zwei Gründe.
:::

::::collapsible{title="Tipp zu a)"}

Rechne mit Verhältnissen. Wird `n` verzehnfacht, dann wächst

- O(n) um den Faktor 10,
- O(n²) um den Faktor 100,
- O(n · log n) um etwa 10 · (log 10 000 / log 1000) ≈ 13.

::::

:::protect{password="java-q-7-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Klasse | Faktor | Zeit für 10 000 |
| --- | --- | --- |
| O(n) | 10 | 20 Sekunden |
| O(n · log n) | rund 13 | rund 27 Sekunden |
| O(n²) | 100 | 200 Sekunden, also gut 3 Minuten |

b) Bei 1000 Elementen sind n² = 10⁶ Operationen – für einen heutigen Rechner Bruchteile einer Sekunde. Bei 100 000 sind es 10¹⁰, also **zehntausendmal** so viele; bei 10⁸ Operationen je Sekunde wären das rund 100 Sekunden statt 0,01. Die Klasse ändert sich nicht, aber ab einer bestimmten Größe wird aus „merkt niemand" ein „unbenutzbar". Genau deshalb fragt man nach dem Wachstum und nicht nach der Zeit für einen einzelnen Fall.

c) Das schnellere Verfahren mit dem hohen Speicherbedarf, wenn genug Speicher da ist und es auf Geschwindigkeit ankommt – etwa beim Sortieren im Arbeitsspeicher. Das speichersparsame, wenn der Speicher knapp ist: auf einem Mikrocontroller, bei sehr großen Datenmengen oder wenn mehrere Vorgänge gleichzeitig laufen. Es gibt keine allgemein bessere Wahl; die Frage ist immer, **was knapp ist**.

d) Die Aussage ist zu absolut. Die Komplexitätsklasse beschreibt das **Wachstum für große n**, nicht die Zeit für ein bestimmtes `n`. Konstante Faktoren fallen aus der Notation heraus: Ein O(n)-Verfahren mit einem hohen Vorfaktor kann für kleine Eingaben langsamer sein als ein O(n²)-Verfahren mit sehr kleinem Aufwand je Schritt. Genau darum schalten Sortierbibliotheken unterhalb weniger Dutzend Elemente auf Sortieren durch Einfügen um. Richtig ist die Aussage in dieser Form: „Ab einer bestimmten Größe ist meiner schneller, und der Abstand wächst dann immer weiter."

e) Zum Beispiel:

- Eine Messung gilt für **diesen** Rechner, diese Datenmenge und diesen Augenblick. Ein anderer Rechner, ein anderer Datensatz oder ein gerade laufendes Hintergrundprogramm liefern andere Zahlen.
- Sie sagt nichts über das **Wachstum**. Zwei Verfahren, die bei 1000 Elementen gleich schnell sind, können bei 100 000 um den Faktor 1000 auseinanderliegen.

Deshalb misst man mit **mehreren** Größen und sieht sich an, wie die Zeit wächst – oder man zählt gleich die Operationen.

:::

<!--
Rückblick zum Inhaltsfeld Algorithmen: Testen mit Sonderfällen (I),
Beurteilung nach Speicherbedarf und Zahl der Operationen (A). Aufgabe 1
verlangt eine Testanwendung und ist damit zugleich LK-tauglich.
-->

---

## Selbsttest

::::multievent

**1. Welche Testfälle gehören zu einer systematischen Auswahl? Wähle alle zutreffenden aus.**

{c1{!ein typischer Normalfall}}

{c1{!die Grenzen des Wertebereichs}}

{c1{!Sonderfälle wie leere Eingaben}}

{c1{möglichst viele zufällige Eingaben}}

{h{Drei Sorten sind gemeint – die vierte ersetzt Nachdenken durch Menge.}}
{H{Richtig.}}

**2. Warum ist der Startwert 0 beim Suchen des Maximums gefährlich?**

{r1{Weil 0 nicht im Feld vorkommt.}}

{r1{!Weil bei lauter negativen Werten ein Wert herauskommt, den es im Feld gar nicht gibt.}}

{r1{Weil die Schleife dann nicht läuft.}}

{r1{Er ist nicht gefährlich.}}

{h{Probier das Feld mit minus 5, minus 2 und minus 9 durch.}}
{H{Richtig – der Startwert behauptet stillschweigend, kein Wert sei kleiner als 0.}}

**3. Wozu dient die Meldung in assertEquals?**

{r2{Sie wird immer ausgegeben.}}

{r2{!Sie erscheint beim Fehlschlag und soll erklären, was erwartet wurde.}}

{r2{Sie benennt den Test.}}

{r2{Sie ist nur Kommentar.}}

{h{Wer sie liest, hat gerade einen roten Test vor sich.}}
{H{Richtig – Fehler hilft niemandem, eine erklärende Meldung schon.}}

**4. Welche Klasse hat eine Schleife über n Elemente, in der eine Halbierung stattfindet?**

{r3{O(n)}}

{r3{O(n²)}}

{r3{!O(n log n)}}

{r3{O(log n)}}

{h{Äußere Schleife mal innerer Vorgang.}}
{H{Richtig.}}

**5. Nacheinander laufen ein O(n)-Abschnitt und ein O(n²)-Abschnitt. Welche Klasse hat das Ganze?**

{r4{O(n)}}

{r4{!O(n²)}}

{r4{O(n³)}}

{r4{O(n log n)}}

{h{Bei Anweisungen nacheinander gewinnt die größte Klasse.}}
{H{Richtig – der kleinere Anteil fällt für große n nicht ins Gewicht.}}

**6. Ein O(n²)-Programm braucht bei 1000 Elementen 2 Sekunden. Wie lange etwa bei 10 000?**

{r5{20 Sekunden}}

{r5{!200 Sekunden}}

{r5{2 Sekunden}}

{r5{2000 Sekunden}}

{h{Zehnfaches n bedeutet hundertfacher Aufwand.}}
{H{Richtig.}}

**7. Ein Verfahren ist O(n), ein anderes O(n²). Welche Aussage stimmt?**

{r6{Das erste ist immer schneller.}}

{r6{!Ab einer bestimmten Größe ist das erste schneller, und der Abstand wächst danach immer weiter.}}

{r6{Beide sind gleich schnell.}}

{r6{Das lässt sich ohne Messung gar nicht sagen.}}

{h{Konstante Faktoren fallen aus der Notation heraus – was heißt das für kleine Eingaben?}}
{H{Richtig. Deshalb schalten Bibliotheken bei kleinen Feldern auf einfache Verfahren um.}}

::::
