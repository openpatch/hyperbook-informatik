---
title: Rückblick
index: 4
---

# Rückblick

Methoden bringen keine neue Fähigkeit – alles, was du mit ihnen schreibst, ginge auch ohne. Sie bringen **Ordnung**. Und Ordnung ist der Unterschied zwischen einem Programm, das man nach zwei Wochen noch ändern kann, und einem, das man wegwirft.

## Das kann ich jetzt

- [ ] Ich kann eigene Methoden mit und ohne **Parameter** schreiben und aufrufen. ([4.1](./01-eigene-methoden))
- [ ] Ich kann Methoden mit **Rückgabewert** schreiben und den Unterschied zu `void` erklären. ([4.2](./02-rueckgabewerte))
- [ ] Ich weiß, was **Überladen** bedeutet und wonach Java die passende Methode auswählt. ([4.2](./02-rueckgabewerte))
- [ ] Ich erkenne, wann ein Stück Programm eine eigene Methode werden sollte. ([4.3](./03-modularisierung))
- [ ] Ich kann begründen, warum eine Methode besser **einen** Zweck hat als drei. ([4.3](./03-modularisierung))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Was gibt das Programm aus?**

```java
void main() {
    int zahl = 5;

    verdopple(zahl);
    IO.println("nach verdopple: " + zahl);

    zahl = gibVerdoppelt(zahl);
    IO.println("nach gibVerdoppelt: " + zahl);

    IO.println(rechne(3, 4));
    IO.println(rechne(3.0, 4.0));
}

void verdopple(int pZahl) {
    pZahl = pZahl * 2;
}

int gibVerdoppelt(int pZahl) {
    return pZahl * 2;
}

int rechne(int pA, int pB) {
    return pA + pB;
}

double rechne(double pA, double pB) {
    return pA * pB;
}
```

a) Sag die vier Ausgabezeilen voraus.

b) Warum ändert `verdopple` den Wert von `zahl` nicht? Erkläre mit dem Wort *Kopie*.

c) Woran entscheidet Java, welche der beiden `rechne`-Methoden aufgerufen wird?

d) Was passierte, wenn die zweite `rechne`-Methode `int rechne(int pA, int pB)` mit `double`-Rückgabe hieße?
:::

:::onlineide{height="720px"}

```java Main.java
void main() {
    int zahl = 5;

    verdopple(zahl);
    IO.println("nach verdopple: " + zahl);

    zahl = gibVerdoppelt(zahl);
    IO.println("nach gibVerdoppelt: " + zahl);

    IO.println(rechne(3, 4));
    IO.println(rechne(3.0, 4.0));
}

void verdopple(int pZahl) {
    pZahl = pZahl * 2;
}

int gibVerdoppelt(int pZahl) {
    return pZahl * 2;
}

int rechne(int pA, int pB) {
    return pA + pB;
}

double rechne(double pA, double pB) {
    return pA * pB;
}
```

:::

:::protect{password="java-ef-4-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
nach verdopple: 5
nach gibVerdoppelt: 10
7
12.0
```

b) Beim Aufruf bekommt der Parameter `pZahl` eine **Kopie** des Wertes. Die Methode verändert nur diese Kopie; die Variable `zahl` im Hauptprogramm bleibt unberührt. Wer ein Ergebnis zurückhaben will, braucht ein `return` – und muss das Ergebnis auch **entgegennehmen**, wie in der Zeile `zahl = gibVerdoppelt(zahl);`.

c) An **Anzahl und Typen der Argumente**. `rechne(3, 4)` sind zwei `int`, also greift die erste Methode; `rechne(3.0, 4.0)` sind zwei `double`, also die zweite. Deshalb kommt einmal die Summe 7 und einmal das Produkt 12.0 heraus – die beiden Methoden tun absichtlich Verschiedenes, damit man den Unterschied sieht. Im Ernstfall sollten überladene Methoden natürlich dasselbe tun.

d) Das wäre ein **Fehler**. Der Rückgabetyp gehört nicht zur Unterscheidung; zwei Methoden mit gleichem Namen und gleicher Parameterliste kann Java nicht auseinanderhalten.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Methodenköpfe beurteilen**

Sag für jede Methode: Ist sie richtig? Wenn nicht, was fehlt?

```java
// a)
int quadrat(int pZahl) {
    IO.println(pZahl * pZahl);
}

// b)
void groesser(int pA, int pB) {
    if (pA > pB) {
        return pA;
    }
    return pB;
}

// c)
int maximum(int pA, int pB) {
    if (pA > pB) {
        return pA;
    }
}

// d)
double mittelwert(int pA, int pB) {
    return (pA + pB) / 2;
}
```

Eine der vier übersetzt fehlerfrei und liefert trotzdem falsche Werte. Welche, und warum?
:::

::::collapsible{title="Tipp zu d)"}

Setz `pA = 3` und `pB = 4` ein und rechne von Hand nach, in welcher Reihenfolge Java arbeitet. Welchen Typ hat der Ausdruck in der Klammer?

::::

:::protect{password="java-ef-4-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Falsch.** Der Kopf verspricht einen `int` zurückzugeben, die Methode gibt aber nur etwas aus. Entweder `return pZahl * pZahl;` schreiben oder den Rückgabetyp auf `void` ändern. Beides zugleich – rechnen *und* ausgeben – ist meist schlechter Stil: Eine Methode, die rechnet, sollte das Ergebnis zurückgeben und die Ausgabe dem Aufrufer überlassen.

b) **Falsch.** Der Kopf sagt `void`, die Methode gibt aber Werte zurück. Richtig ist `int groesser(...)`.

c) **Falsch.** Es gibt einen Weg durch die Methode, auf dem kein `return` erreicht wird – nämlich wenn `pA` nicht größer ist. Java verlangt, dass **jeder** Weg mit einem Rückgabewert endet. Ein `else`-Zweig oder ein abschließendes `return pB;` behebt es.

d) **Übersetzt fehlerfrei und rechnet falsch.** `pA + pB` ist ein `int`, und die Division zweier `int`-Werte ist eine Ganzzahldivision: Aus (3 + 4) / 2 wird 3, nicht 3.5. Dass der Rückgabetyp `double` ist, kommt zu spät – da ist schon gerundet. Richtig: `return (pA + pB) / 2.0;`

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ein Programm aufräumen**

Dieses Programm funktioniert, ist aber schlecht gebaut.

```java
void main() {
    IO.println("=================");
    IO.println("   Notenspiegel  ");
    IO.println("=================");

    int p1 = 88;
    double n1 = 1.0 + 5.0 * (100 - p1) / 100.0;
    IO.println("Amira: " + p1 + " Punkte, Note " + n1);

    int p2 = 64;
    double n2 = 1.0 + 5.0 * (100 - p2) / 100.0;
    IO.println("Ben: " + p2 + " Punkte, Note " + n2);

    int p3 = 41;
    double n3 = 1.0 + 5.0 * (100 - p3) / 100.0;
    IO.println("Chiara: " + p3 + " Punkte, Note " + n3);

    IO.println("=================");
}
```

a) Nenne die drei Stellen, an denen sich etwas wiederholt.

b) Bau das Programm um: Schreib eine Methode für die Notenberechnung, eine für die Ausgabe einer Zeile und eine für die Trennlinie. Das Hauptprogramm soll danach höchstens acht Zeilen lang sein.

c) Die Notenformel soll geändert werden: Ab jetzt gibt es für 100 Punkte die Note 1,0 und für 0 Punkte die Note 6,0. An wie vielen Stellen musst du in deiner Fassung ändern, an wie vielen in der ursprünglichen?

d) Erkläre an diesem Beispiel, was mit „eine Methode hat genau einen Zweck" gemeint ist.
:::

::::collapsible{title="Tipp 1: Welche Methoden?"}

Drei Köpfe, mehr brauchst du nicht:

```java
double berechneNote(int pPunkte) { ... }
void zeigeZeile(String pName, int pPunkte) { ... }
void zeigeTrennlinie() { ... }
```

Überleg bei jedem: Welche Angaben braucht die Methode von außen? Genau die werden Parameter.

::::

::::collapsible{title="Tipp 2: Wer ruft wen?"}

`zeigeZeile` braucht die Note – aber sie soll sie nicht selbst ausrechnen, sondern `berechneNote` aufrufen. Methoden dürfen einander benutzen, und genau dadurch bleibt jede einzelne kurz.

::::

:::onlineide{height="520px"}

```java Main.java
void main() {
    // Dein aufgeräumtes Hauptprogramm:

}

// Deine Methoden:
```

:::

:::protect{password="java-ef-4-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Trennlinie steht dreimal wortgleich da, die Notenformel dreimal, und der Aufbau der Ausgabezeile dreimal.

b)

```java
void main() {
    zeigeTrennlinie();
    IO.println("   Notenspiegel  ");
    zeigeTrennlinie();

    zeigeZeile("Amira", 88);
    zeigeZeile("Ben", 64);
    zeigeZeile("Chiara", 41);

    zeigeTrennlinie();
}

double berechneNote(int pPunkte) {
    return 1.0 + 5.0 * (100 - pPunkte) / 100.0;
}

void zeigeZeile(String pName, int pPunkte) {
    IO.println(pName + ": " + pPunkte + " Punkte, Note " + berechneNote(pPunkte));
}

void zeigeTrennlinie() {
    IO.println("=================");
}
```

c) In der aufgeräumten Fassung an **einer** Stelle – im Rumpf von `berechneNote`. In der ursprünglichen an **drei**. Bei dreißig Schülerinnen wären es dreißig, und die eine vergessene Stelle merkt niemand.

d) `berechneNote` **rechnet** und gibt nichts aus. `zeigeZeile` **gibt aus** und rechnet nicht selbst, sondern fragt. Diese Trennung erlaubt es, die Note woanders zu verwenden – etwa um den Durchschnitt zu bilden – ohne dass dabei ungewollt etwas auf dem Bildschirm erscheint. Eine Methode, die beides täte, ließe sich nur für genau einen Zweck einsetzen.

:::

<!--
Rückblick zu KLP EF, Algorithmen: Modularisierung (M); Daten und ihre
Strukturierung: Methoden mit Parametern und Rückgaben. Aufgabe 3 ist die
Refactoring-Aufgabe des Kapitels.
-->

---

## Selbsttest

::::multievent

**1. Eine Methode hat den Rückgabetyp void. Was folgt daraus?**

{r1{Sie darf keine Parameter haben.}}

{r1{!Sie gibt keinen Wert zurück, sondern wirkt nur durch das, was sie tut.}}

{r1{Sie kann nur einmal aufgerufen werden.}}

{r1{Sie muss im Hauptprogramm stehen.}}

{h{void heißt leer.}}
{H{Richtig – typisch für Methoden, die etwas ausgeben oder zeichnen.}}

**2. Was passiert, wenn eine Methode einen Parameter verändert?**

{r2{Die Variable des Aufrufers ändert sich mit.}}

{r2{!Nur die Kopie innerhalb der Methode ändert sich.}}

{r2{Es entsteht ein Übersetzungsfehler.}}

{r2{Der Wert wird auf null gesetzt.}}

{h{Was bekommt die Methode beim Aufruf übergeben – die Variable selbst oder ihren Wert?}}
{H{Richtig. Wer ein Ergebnis zurückwill, braucht return.}}

**3. Wonach entscheidet Java bei überladenen Methoden?**

{c1{!nach der Anzahl der Argumente}}

{c1{!nach den Typen der Argumente}}

{c1{nach dem Rückgabetyp}}

{c1{nach der Reihenfolge im Quelltext}}

{h{Zwei Angebote sind richtig – und der Rückgabetyp gehört nicht dazu.}}
{H{Richtig. Zwei Methoden, die sich nur im Rückgabetyp unterscheiden, sind ein Fehler.}}

**4. Warum meldet Java einen Fehler, wenn ein Weg durch die Methode ohne return endet?**

{r3{Weil jede Methode genau ein return haben darf.}}

{r3{!Weil der Aufrufer sonst in diesem Fall keinen Wert bekäme.}}

{r3{Weil return immer am Ende stehen muss.}}

{r3{Das meldet Java gar nicht.}}

{h{Denk an den Aufrufer: Er rechnet mit einem Ergebnis.}}
{H{Richtig.}}

**5. Was ergibt die Rechnung Klammer auf 3 plus 4 Klammer zu geteilt durch 2, wenn beide Zahlen int sind?**

{z{3}}

{h{Der Rückgabetyp der Methode ändert daran nichts – gerechnet wird vorher.}}
{H{Richtig. Mit 2.0 statt 2 käme 3.5 heraus.}}

**6. Woran erkennst du, dass ein Stück Programm eine eigene Methode werden sollte?**

{c1{!Es kommt mehrfach fast gleich vor.}}

{c1{!Man kann ihm einen Namen geben, der sagt, was es tut.}}

{c1{Es ist länger als drei Zeilen.}}

{c1{Es enthält eine Schleife.}}

{h{Zwei der Angebote sind gute Gründe, zwei sind bloße Äußerlichkeiten.}}
{H{Richtig – der Name ist das beste Anzeichen. Wer keinen findet, hat den falschen Schnitt gewählt.}}

::::
