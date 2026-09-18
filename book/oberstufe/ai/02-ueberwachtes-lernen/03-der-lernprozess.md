---
title: Der Lernprozess
index: 3
permaid: ai-lernprozess
scripts:
  - /wc/ki-punktwolke.js
---

# Der Lernprozess

Beim überwachten Lernen durchläuft das System einen Trainings- und einen Testzyklus. Hier lernst du, wie man die Trefferquote misst und was „lernen" beim k-NN bedeutet.

## Was bedeutet „lernen" beim k-NN?

k-NN ist faul (lazy learning) — es speichert nur die Trainingsdaten. Trotzdem können wir sagen, dass es „gelernt" hat, wenn es die Testdaten korrekt klassifiziert. Das „Lernen" besteht hier aus zwei Dingen:

1. **Welche Trainingsdaten** haben wir ihm gegeben?
2. **Welches k** haben wir gewählt?

Beides kann man variieren und dann die Trefferquote auf den Testdaten messen.

## Trefferquote berechnen

Die Trefferquote ist der Anteil der korrekt klassifizierten Testdaten:

$$\text{Trefferquote} = \frac{\text{richtige Klassifizierungen}}{\text{alle Testdaten}} \times 100\,\%$$

:::snippet{#brain}
Bevor du das Programm ausführst: In den Trainingsdaten steht ein ungewöhnlich kleiner Apfel bei (115, 4) — direkt zwischen den Birnen. Der fünfte Testpunkt (116, 4) liegt dicht daneben und ist in Wirklichkeit eine Birne. Wird er richtig klassifiziert? Schreibe deine Vermutung auf.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    // Trainingsdaten
    Datenpunkt[] training = {
        new Datenpunkt(150, 7, "Apfel"),
        new Datenpunkt(180, 8, "Apfel"),
        new Datenpunkt(200, 6, "Apfel"),
        new Datenpunkt(160, 9, "Apfel"),
        new Datenpunkt(115, 4, "Apfel"),   // ein ungewoehnlich kleiner Apfel
        new Datenpunkt(120, 4, "Birne"),
        new Datenpunkt(100, 3, "Birne"),
        new Datenpunkt(110, 5, "Birne"),
        new Datenpunkt(90, 2, "Birne")
    };

    // Testdaten (mit bekanntem Label, um prüfen zu können)
    Datenpunkt[] test = {
        new Datenpunkt(170, 7, "Apfel"),
        new Datenpunkt(105, 4, "Birne"),
        new Datenpunkt(140, 8, "Apfel"),
        new Datenpunkt(95, 3, "Birne"),
        new Datenpunkt(116, 4, "Birne")    // liegt dicht am kleinen Apfel
    };

    KNNKlassifikator knn = new KNNKlassifikator(training);

    int richtig = 0;
    for (int i = 0; i < test.length; i++) {
        String vorhersage = knn.klassifiziere(test[i], 3);
        String echt = test[i].gibName();
        boolean stimmt = vorhersage.equals(echt);
        IO.println("Test " + (i + 1) + ": " + vorhersage + " (echt: " + echt + ") " + (stimmt ? "richtig" : "FALSCH"));
        if (stimmt) {
            richtig++;
        }
    }

    double quote = (double) richtig / test.length * 100;
    IO.println("Trefferquote: " + richtig + "/" + test.length + " = " + quote + " %");
}
```

```java KNNKlassifikator.java
public class KNNKlassifikator {
    private Datenpunkt[] training;

    public KNNKlassifikator(Datenpunkt[] pTraining) {
        training = pTraining;
    }

    public String klassifiziere(Datenpunkt pPunkt, int pK) {
        double[] distanzen = new double[training.length];
        for (int i = 0; i < training.length; i++) {
            distanzen[i] = pPunkt.distanzZu(training[i]);
        }

        int[] nachbarn = new int[training.length];
        for (int i = 0; i < training.length; i++) {
            nachbarn[i] = i;
        }
        for (int i = 0; i < pK; i++) {
            int minIdx = i;
            for (int j = i + 1; j < training.length; j++) {
                if (distanzen[nachbarn[j]] < distanzen[nachbarn[minIdx]]) {
                    minIdx = j;
                }
            }
            int tmp = nachbarn[i];
            nachbarn[i] = nachbarn[minIdx];
            nachbarn[minIdx] = tmp;
        }

        int apfel = 0;
        int birne = 0;
        for (int i = 0; i < pK; i++) {
            String label = training[nachbarn[i]].gibName();
            if (label.equals("Apfel")) {
                apfel++;
            } else {
                birne++;
            }
        }

        if (apfel > birne) {
            return "Apfel";
        } else {
            return "Birne";
        }
    }
}
```

```java Datenpunkt.java
public class Datenpunkt {
    private double gewicht;
    private double suessigkeit;
    private String label;

    public Datenpunkt(double pGewicht, double pSuessigkeit, String pLabel) {
        gewicht = pGewicht;
        suessigkeit = pSuessigkeit;
        label = pLabel;
    }

    public double gibGewicht() {
        return gewicht;
    }

    public double gibSuessigkeit() {
        return suessigkeit;
    }

    public String gibName() {
        return label;
    }

    public double distanzZu(Datenpunkt pOther) {
        double dg = pOther.gibGewicht() - gewicht;
        double ds = pOther.gibSuessigkeit() - suessigkeit;
        return Math.sqrt(dg * dg + ds * ds);
    }
}
```

:::

:::alert{info}
**Die Ausgabe der Trefferquote sieht anders aus, als du sie auf Papier schreibst.** Die Online-IDE gibt Kommazahlen ohne `.0` aus: Aus 100.0 wird auf dem Bildschirm `100`, aus 80.0 wird `80`. Wenn du also `80 %` liest, obwohl du `80.0 %` erwartet hast, ist alles in Ordnung.
:::

:::alert{info}
**k darf nicht größer sein als die Anzahl der Trainingsdaten.** In diesem Programm gibt es 9 Trainingspunkte, also sind Werte von 1 bis 9 erlaubt. Bei einem größeren k greift `klassifiziere` über das Ende des Feldes hinaus und das Programm bricht ab.
:::

:::snippet{#aufgabe}
a) Führe das Programm aus. Wie hoch ist die Trefferquote bei k = 3?

b) Ändere k auf 1. Welcher Testpunkt wird jetzt falsch klassifiziert — und warum gerade dieser?

c) Ändere k auf 9, also auf **alle** Trainingsdaten. Was passiert mit der Trefferquote, und woran liegt es?

d) Entferne den Ausreißer (115, 4) aus den Trainingsdaten und teste noch einmal mit k = 1. Was ändert sich?
:::

::::collapsible{title="Tipp 1: Wo soll ich hinschauen?"}

Das Programm schreibt für jeden Testpunkt eine Zeile mit `richtig` oder `FALSCH`. Notiere dir für jedes k, **welche** Zeile umspringt — nicht nur, wie viele.
::::

::::collapsible{title="Tipp 2: zu c)"}

Bei k = 9 stimmen alle Trainingspunkte ab, egal wie weit sie entfernt sind. Zähle nach: Wie viele Äpfel und wie viele Birnen gibt es insgesamt? Dann steht das Ergebnis für **jeden** Testpunkt schon vorher fest.
::::

:::protect{password="ai-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

| k | Trefferquote | falsch klassifiziert |
| --- | --- | --- |
| 1 | 4/5 = 80 % | (116, 4) → Apfel |
| 3 | 5/5 = 100 % | — |
| 5 | 5/5 = 100 % | — |
| 9 | 2/5 = 40 % | (105, 4), (95, 3) und (116, 4) → alle Apfel |

a) Bei k = 3 werden alle fünf Testpunkte richtig klassifiziert: **100 %**.

b) Bei k = 1 entscheidet allein der nächste Nachbar. Für den Testpunkt (116, 4) ist das der kleine Apfel bei (115, 4) mit einer Distanz von 1 — die nächste Birne (120, 4) liegt mit 4 weiter weg. Ein einziger untypischer Trainingspunkt reicht also, um die Vorhersage zu kippen. Das ist der Grund, warum k = 1 als anfällig für Ausreißer gilt.

c) Bei k = 9 stimmen alle Trainingsdaten mit ab: 5 Äpfel gegen 4 Birnen. Die Mehrheit ist damit **immer** „Apfel", unabhängig vom Testpunkt. Alle drei Birnen im Testsatz werden falsch klassifiziert, die Trefferquote fällt auf 40 %. Ein zu großes k macht den Klassifikator blind für die Umgebung des Testpunkts.

d) Ohne den Ausreißer ist der nächste Nachbar von (116, 4) die Birne bei (120, 4). Die Trefferquote bei k = 1 steigt wieder auf **100 %**. Ein größeres k ist also nicht die einzige Gegenmaßnahme — **bessere Trainingsdaten** sind die andere.
:::

:::snippet{#merken}
Die Trefferquote hängt ab von:
- **Qualität und Menge der Trainingsdaten** — schlecht verteilte Daten führen zu schlechten Vorhersagen
- **Wahl von k** — zu klein: anfällig für Ausreißer; zu groß: Mehrheit dominiert immer
- **Verteilung der Testdaten** — Testdaten, die weit von allen Trainingspunkten entfernt liegen, sind schwer zu klassifizieren
:::

## Trainings- und Testdaten im Bild

Hier stehen dieselben neun Trainingspunkte und dieselben fünf Testpunkte wie im Programm. **Gefüllte Formen sind Trainingsdaten, hohle Formen sind Testdaten.** Die Testdaten stimmen nie mit ab — sie werden nur klassifiziert und gezählt.

<ki-punktwolke id="ai-lernprozess-quoten"
  punkte="150,7,Apfel;180,8,Apfel;200,6,Apfel;160,9,Apfel;115,4,Apfel;120,4,Birne;100,3,Birne;110,5,Birne;90,2,Birne"
  testdaten="170,7,Apfel;105,4,Birne;140,8,Apfel;95,3,Birne;116,4,Birne"
  x-min="80" x-max="220" y-min="0" y-max="10" k="3"></ki-punktwolke>

:::snippet{#aufgabe}
a) Stelle k nacheinander auf 1, 3 und 9 und lies die **Trefferquote auf den Testdaten** ab. Es müssen dieselben Werte herauskommen wie in der Tabelle der Lösung.

b) Darüber steht die Trefferquote auf den Trainingsdaten. Bei k = 1 ist sie 100 %, ganz gleich, wie die Daten aussehen. Woran liegt das — und was folgt daraus für ihre Aussagekraft?

c) Der kleine Apfel bei (115 | 4) liegt mitten in den Birnen. Suche bei k = 1 die Stelle, an der die Grenze eine kleine Insel um ihn herum bildet. Welcher Testpunkt liegt in dieser Insel?

d) Stelle k auf 9. Die Fläche hat nur noch eine Farbe. Erkläre mit Aufgabe c) von oben, warum.
:::

:::protect{password="ai-2-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

b) Der nächste Nachbar eines Trainingspunkts ist bei k = 1 immer **er selbst**, mit der Distanz 0. Auf den Trainingsdaten kann das Modell deshalb gar nicht danebenliegen. Die 100 % sind garantiert und sagen nichts über die Güte des Modells aus — nur die Testquote tut das.

c) Der Testpunkt (116 | 4) — eine Birne — liegt genau in der Apfel-Insel um den Ausreißer. Deshalb wird er bei k = 1 als Apfel klassifiziert. Die Insel ist die Überanpassung, die du im Programm nur als Wort „FALSCH" gesehen hast.

d) Bei k = 9 stimmen immer alle neun Trainingspunkte ab, ganz gleich, wo der Punkt liegt. 5 Äpfel schlagen 4 Birnen — und zwar überall. Eine Grenze gibt es dann gar nicht mehr, weil die Entscheidung nicht mehr vom Ort abhängt.
:::

<!-- KLP EF: erläutern den Unterschied von Trainings- und Testdaten (A).
     Q-Phase: bewerten die Qualität eines KI-Modells (A) -->

---

## Selbsttest

::::multievent

**1. Wie berechnet man die Trefferquote?**

{r1{!Richtige Klassifizierungen geteilt durch alle Testdaten, mal 100.}}

{r1{Trainingsdaten geteilt durch Testdaten.}}

{r1{Anzahl der Trainingsdaten mal k.}}

{r1{Anzahl der Klassen geteilt durch k.}}

{h{Die Trefferquote ist ein Prozentsatz: wie viel Prozent der Testdaten waren richtig?}}

{H{Richtig! Trefferquote = richtige / alle × 100 %.}}

**2. Was passiert, wenn k zu klein gewählt wird (z.B. k = 1)?**

{r2{!Der Klassifikator wird anfällig für Ausreißer.}}

{r2{Der Klassifikator wird sehr langsam.}}

{r2{Der Klassifikator ignoriert alle Trainingsdaten.}}

{r2{Der Klassifikator kann nur eine Klasse ausgeben.}}

{h{Bei k = 1 entscheidet ein einziger Nachbar — auch wenn das ein Ausreißer ist.}}

{H{Richtig! Bei k = 1 kann ein einzelner Ausreißer das Ergebnis verfälschen.}}

**3. Was bedeutet „lernen" beim k-NN?**

{r3{!Die Trainingsdaten werden gespeichert und k wird festgelegt.}}

{r3{Ein komplexes Modell wird schrittweise optimiert.}}

{r3{Die Gewichte eines neuronalen Netzes werden angepasst.}}

{r3{Die Distanzformel wird verändert.}}

{h{k-NN ist „lazy learning" — was passiert beim Training?}}

{H{Richtig! Beim k-NN besteht das „Lernen" nur darin, die Daten zu speichern und k zu wählen. Die eigentliche Arbeit passiert erst bei der Klassifizierung.}}

::::
