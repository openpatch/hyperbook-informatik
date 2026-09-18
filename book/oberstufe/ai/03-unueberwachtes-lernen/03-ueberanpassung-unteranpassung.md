---
title: Überanpassung und Unteranpassung
index: 3
permaid: ai-ueberunteranpassung
scripts:
  - /wc/ki-punktwolke.js
---

# Überanpassung und Unteranpassung

Ein KI-Modell kann zu einfach oder zu komplex sein. Beides führt zu schlechten Ergebnissen — aber auf unterschiedliche Weise.

## Die zwei Extreme

:::snippet{#definition}
**:t[Überanpassung]{#ueberanpassung}** (Overfitting): Das Modell lernt die Trainingsdaten zu genau — inklusive Rauschen und Zufallseffekten. Es funktioniert perfekt auf Trainingsdaten, aber schlecht auf Testdaten.

**:t[Unteranpassung]{#unteranpassung}** (Underfitting): Das Modell ist zu einfach, um die wirklichen Muster in den Daten zu erfassen. Es funktioniert schlecht auf Trainings- **und** Testdaten.
:::

| | Trainingsdaten | Testdaten | Ursache |
| --- | --- | --- | --- |
| **Überanpassung** | sehr gut | schlecht | Modell zu komplex |
| **Unteranpassung** | schlecht | schlecht | Modell zu einfach |
| **Gutes Modell** | gut | gut | Komplexität passt |

## Überanpassung beim k-NN

Beim k-NN bedeutet **k = 1** Überanpassung: Jeder Testpunkt wird nach einem einzigen Nachbarn beurteilt — inklusive Ausreißern. **k zu groß** bedeutet Unteranpassung: Die Mehrheit der Trainingsdaten dominiert immer, feine Muster gehen verloren. Das Programm unten misst deshalb beide Quoten — auf den Trainingsdaten **und** auf den Testdaten. Erst der Vergleich der beiden verrät, welcher der zwei Fehler vorliegt.

:::snippet{#brain}
Bevor du das Programm ausführst: Bei k = 1 ist jeder Trainingspunkt sein eigener nächster Nachbar — seine Distanz zu sich selbst ist 0. Was bedeutet das für die Trefferquote **auf den Trainingsdaten**? Überlege, bevor du weiterliest.
:::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    Datenpunkt[] training = {
        new Datenpunkt(10, 5, "A"),
        new Datenpunkt(11, 6, "A"),
        new Datenpunkt(12, 5, "A"),
        new Datenpunkt(13, 6, "A"),
        new Datenpunkt(11, 4, "A"),
        new Datenpunkt(50, 5, "B"),
        new Datenpunkt(51, 6, "B"),
        new Datenpunkt(52, 5, "B"),
        new Datenpunkt(53, 6, "B"),
        new Datenpunkt(51, 4, "B"),
        new Datenpunkt(15, 5, "B")    // Ausreisser: ein B mitten im A-Gebiet
    };

    Datenpunkt[] test = {
        new Datenpunkt(10, 6, "A"),
        new Datenpunkt(51, 5, "B"),
        new Datenpunkt(14, 5, "A")    // liegt dicht am Ausreisser
    };

    IO.println("k = 1 (Überanpassung):");
    teste(training, test, 1);

    IO.println("k = 3 (gut):");
    teste(training, test, 3);

    IO.println("k = 11 (alle Punkte — Unteranpassung):");
    teste(training, test, 11);
}

void teste(Datenpunkt[] pTraining, Datenpunkt[] pTest, int pK) {
    IO.println("  auf den Trainingsdaten: " + quote(pTraining, pTraining, pK));
    IO.println("  auf den Testdaten:      " + quote(pTraining, pTest, pK));
    IO.println();
}

String quote(Datenpunkt[] pTraining, Datenpunkt[] pDaten, int pK) {
    KNNKlassifikator knn = new KNNKlassifikator(pTraining);
    int richtig = 0;
    for (int i = 0; i < pDaten.length; i++) {
        String vorhersage = knn.klassifiziere(pDaten[i], pK);
        if (vorhersage.equals(pDaten[i].gibName())) { richtig++; }
    }
    return richtig + "/" + pDaten.length;
}
```

```java KNNKlassifikator.java
public class KNNKlassifikator {
    private Datenpunkt[] training;
    public KNNKlassifikator(Datenpunkt[] pTraining) { training = pTraining; }
    public String klassifiziere(Datenpunkt pPunkt, int pK) {
        double[] distanzen = new double[training.length];
        for (int i = 0; i < training.length; i++) { distanzen[i] = pPunkt.distanzZu(training[i]); }
        int[] nachbarn = new int[training.length];
        for (int i = 0; i < training.length; i++) { nachbarn[i] = i; }
        for (int i = 0; i < pK && i < training.length; i++) {
            int minIdx = i;
            for (int j = i + 1; j < training.length; j++) {
                if (distanzen[nachbarn[j]] < distanzen[nachbarn[minIdx]]) { minIdx = j; }
            }
            int tmp = nachbarn[i]; nachbarn[i] = nachbarn[minIdx]; nachbarn[minIdx] = tmp;
        }
        int a = 0; int b = 0;
        for (int i = 0; i < pK && i < training.length; i++) {
            if (training[nachbarn[i]].gibName().equals("A")) { a++; } else { b++; }
        }
        return a > b ? "A" : "B";
    }
}
```

```java Datenpunkt.java
public class Datenpunkt {
    private double gewicht;
    private double suessigkeit;
    private String label;
    public Datenpunkt(double pGewicht, double pSuessigkeit, String pLabel) {
        gewicht = pGewicht; suessigkeit = pSuessigkeit; label = pLabel;
    }
    public double gibGewicht() { return gewicht; }
    public double gibSuessigkeit() { return suessigkeit; }
    public String gibName() { return label; }
    public double distanzZu(Datenpunkt pOther) {
        double dg = pOther.gibGewicht() - gewicht;
        double ds = pOther.gibSuessigkeit() - suessigkeit;
        return Math.sqrt(dg * dg + ds * ds);
    }
}
```

:::

:::snippet{#aufgabe}
a) Führe das Programm aus und trage die sechs Werte in eine Tabelle ein: Trainings- und Testquote für k = 1, k = 3 und k = 11.

b) Bei k = 1 ist die Trainingsquote perfekt, die Testquote aber nicht. Warum ist genau dieses Muster das Kennzeichen von Überanpassung?

c) Bei k = 11 sind **beide** Quoten schlecht. Rechne nach, warum: Wie viele A und wie viele B gibt es in den Trainingsdaten, und was folgt daraus für jede einzelne Vorhersage?

d) Entferne den Ausreißer (15, 5, „B") aus den Trainingsdaten und führe das Programm erneut aus. Welche Quoten verbessern sich dadurch?
:::

::::collapsible{title="Tipp 1: Woran erkennt man die beiden Fehler?"}

Schau nicht auf eine einzelne Zahl, sondern auf den **Abstand zwischen** Trainings- und Testquote:

- Trainingsquote hoch, Testquote deutlich niedriger → Überanpassung.
- Beide Quoten niedrig → Unteranpassung.
::::

::::collapsible{title="Tipp 2: zu c)"}

Bei k = 11 stimmen alle elf Trainingspunkte ab — bei jedem Testpunkt dieselben elf. Das Ergebnis hängt dann gar nicht mehr davon ab, **wo** der Punkt liegt.
::::

:::protect{password="ai-3-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| k | Trainingsdaten | Testdaten | Diagnose |
| --- | --- | --- | --- |
| 1 | 11/11 = 100 % | 2/3 = 67 % | Überanpassung |
| 3 | 10/11 = 91 % | 3/3 = 100 % | gut |
| 11 | 6/11 = 55 % | 1/3 = 33 % | Unteranpassung |

b) Bei k = 1 ist der nächste Nachbar eines Trainingspunkts immer **er selbst** (Distanz 0). Auf den Trainingsdaten kann das Modell deshalb gar nicht danebenliegen — 100 % sind garantiert und sagen nichts aus. Auf den Testdaten zeigt sich die Wahrheit: Der Testpunkt (14, 5) ist ein A, sein nächster Nachbar ist aber der Ausreißer (15, 5) mit dem Label B. Das Modell hat den Ausreißer **auswendig gelernt**, statt die Gruppe zu verallgemeinern. Genau dieses Muster — perfekt auf Trainingsdaten, schlechter auf Testdaten — ist Überanpassung.

c) In den Trainingsdaten stehen **5 A** und **6 B**. Bei k = 11 stimmen immer alle ab, also gewinnt bei jedem Punkt „B" mit 6 zu 5. Das Modell sagt für jede Eingabe „B" — es hat aufgehört, überhaupt hinzusehen. Auf den Trainingsdaten stimmen damit nur die 6 B (55 %), auf den Testdaten nur der eine B-Punkt (33 %). Beide Quoten sind schlecht: Unteranpassung.

d) Ohne den Ausreißer wird der Testpunkt (14, 5) auch bei k = 1 richtig als A erkannt — die Testquote bei k = 1 steigt auf 3/3. Die Trainingsquote bei k = 3 steigt ebenfalls auf 10/10, weil der Ausreißer, der dort als einziger falsch lag, verschwunden ist. Überanpassung ist also kein reines k-Problem: Sie entsteht dort, wo **Rauschen in den Trainingsdaten** steckt.
:::

:::snippet{#merken}
- **Überanpassung** (k zu klein): Das Modell merkt sich jedes Detail, auch Ausreißer. Gute Trainingsquote, schlechte Testquote.
- **Unteranpassung** (k zu groß): Das Modell ist zu grob. Schlechte Trainings- und Testquote.
- **Ziel:** Ein k finden, das weder zu klein noch zu groß ist — die „goldene Mitte".
:::

## Überanpassung sehen

Dieselben elf Trainingspunkte und drei Testpunkte wie im Programm. **Gefüllt sind die Trainingsdaten, hohl die Testdaten.** Unter der Zeichnung stehen beide Quoten nebeneinander.

<ki-punktwolke id="ai-ueberanpassung" bearbeitbar k="1"
  punkte="10,5,A;11,6,A;12,5,A;13,6,A;11,4,A;50,5,B;51,6,B;52,5,B;53,6,B;51,4,B;15,5,B"
  testdaten="10,6,A;51,5,B;14,5,A"
  x-min="0" x-max="60" y-min="3" y-max="7"
  x-label="Merkmal 1" y-label="Merkmal 2"></ki-punktwolke>

:::snippet{#aufgabe}
a) Stelle k auf 1, 3 und 11 und lies jeweils beide Quoten ab. Es müssen dieselben sechs Werte herauskommen wie in deiner Tabelle.

b) Stelle k auf 1. Die B-Fläche reicht weit nach links, bis dicht an die A-Gruppe heran — obwohl dort nur **ein** einziger B-Punkt liegt, der Ausreißer bei (15 | 5). Klicke mit dem Werkzeug **Testpunkt** genau auf den hohlen Punkt bei (14 | 5). Welches Label sagt der Klassifikator, und welcher Nachbar steht dafür in der Tabelle?

c) Stelle k auf 3. Die Grenze springt nach rechts, und der Ausreißer liegt jetzt selbst im A-Gebiet — du siehst ihn als andersfarbigen Punkt mitten in der A-Fläche. Was passiert dadurch mit den beiden Quoten? **Das ist der Kern von Überanpassung:** Bei k = 1 hat sich das Modell den einen Punkt gemerkt, bei k = 3 verallgemeinert es die Gruppe.

d) Wähle das Werkzeug **Löschen** und klicke auf den Ausreißer (15 | 5). Stelle k wieder auf 1. Was passiert mit der Grenze und mit den beiden Quoten? Vergleiche mit Aufgabe d) von oben.

e) Stelle k auf 11. Erkläre, warum die Fläche einfarbig wird und beide Quoten gleichzeitig sinken.
:::

:::protect{password="ai-3-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

b) Der Klassifikator sagt **B**, obwohl (14 | 5) in Wirklichkeit ein A ist. In der Tabelle steht als nächster Nachbar der Ausreißer (15 | 5) mit der Distanz 1,00 — die nächsten echten A-Punkte liegen mit 1,41 und 2,00 weiter weg. Ein einziger Punkt reicht, um die Grenze über 35 Einheiten weit nach links zu ziehen. Genau dieser Testpunkt ist der eine, der in der Testquote von 2 von 3 fehlt.

c) Die Trainingsquote **sinkt** von 100 % auf 91 %, die Testquote **steigt** von 67 % auf 100 %. Das ist der entscheidende Punkt: Das schlechtere Ergebnis auf den Trainingsdaten ist hier das bessere Modell. Der eine Trainingspunkt, der jetzt falsch liegt, ist genau der Ausreißer — und den soll ein gutes Modell falsch klassifizieren.

d) Die Grenze rückt in die Mitte zwischen die beiden Gruppen, wo sie hingehört. Beide Quoten stehen danach auf 100 %. Überanpassung ist also kein reines k-Problem: Sie entsteht dort, wo Rauschen in den Trainingsdaten steckt.

e) Bei k = 11 stimmen immer alle elf Trainingspunkte ab — bei jedem Punkt dieselben elf. Das Ergebnis hängt gar nicht mehr davon ab, wo der Punkt liegt, deshalb gibt es keine Grenze mehr. 6 B schlagen 5 A, das Modell sagt überall „B". Richtig liegt es damit nur noch bei den B-Punkten: 6 von 11 und 1 von 3.
:::

:::snippet{#merken}
Bei k = 1 ist der nächste Nachbar eines Trainingspunkts immer er selbst. Die Trainingsquote ist deshalb **immer** 100 % — sie sagt in diesem Fall gar nichts über das Modell aus. Nur die Testquote zählt.
:::

<!-- KLP Q-Phase: bewerten die Qualität eines KI-Modells auf Grundlage
     vorgegebener Kriterien (A) — Überanpassung, Unteranpassung -->

---

## Selbsttest

::::multievent

**1. Was bedeutet Überanpassung (Overfitting)?**

{r1{!Das Modell lernt die Trainingsdaten zu genau, inklusive Ausreißern.}}

{r1{Das Modell ist zu einfach und lernt gar nichts.}}

{r1{Das Modell hat zu wenig Trainingsdaten.}}

{r1{Das Modell ist perfekt und macht keine Fehler.}}

{h{Bei Überanpassung funktioniert das Modell auf Trainingsdaten gut, auf Testdaten aber schlecht.}}

{H{Richtig! Überanpassung bedeutet: das Modell hat die Trainingsdaten auswendig gelernt, statt zu verallgemeinern.}}

**2. Wann liegt Unteranpassung (Underfitting) vor?**

{r2{!Das Modell ist zu einfach und erfasst die Muster in den Daten nicht.}}

{r2{Das Modell hat zu viele Trainingsdaten.}}

{r2{Das Modell ist zu komplex.}}

{r2{Die Testdaten sind falsch.}}

{h{Unteranpassung: Trainings- und Testquote sind beide schlecht.}}

{H{Richtig! Unteranpassung heißt: das Modell ist zu grob, um die echten Muster zu erkennen.}}

**3. Beim k-NN: Welcher Wert führt zur Überanpassung?**

{r3{!k = 1}}

{r3{k = 3}}

{r3{k = 5}}

{r3{k = 11}}

{h{Je kleiner k, desto mehr Gewicht hat ein einzelner Nachbar — inklusive Ausreißer.}}

{H{Richtig! Bei k = 1 entscheidet ein einziger Nachbar, was zu Überanpassung führt.}}

::::
