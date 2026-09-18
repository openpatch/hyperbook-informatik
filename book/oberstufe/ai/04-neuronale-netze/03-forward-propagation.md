---
title: Forward Propagation
index: 3
permaid: ai-forward-propagation
scripts:
  - /wc/ki-neuron.js
---

# Forward Propagation

Jetzt verbindest du Neuronen zu Schichten und Schichten zu einem Netz. **:t[Forward Propagation]{#forward-propagation}** ist der Prozess, bei dem Daten von der Eingabeschicht durch das Netz zur Ausgabeschicht fließen.

## Die Schicht-Klasse

Eine Schicht ist eine Sammlung von Neuronen. Sie empfängt ein Feld von Eingaben und gibt ein Feld von Ausgaben zurück — eine pro Neuron.

:::onlineide{height="680px" speed="1000000"}

```java Main.java
void main() {
    // Eine Schicht mit 3 Neuronen, jedes empfängt 2 Eingaben
    Schicht schicht = new Schicht(3, 2, new Sigmoid());

    // Gewichte manuell setzen (normalerweise zufällig)
    // Neuron 0
    schicht.setzeGewicht(0, 0, 0.5); schicht.setzeGewicht(0, 1, -0.3);
    schicht.setzeBias(0, 0.1);
    // Neuron 1
    schicht.setzeGewicht(1, 0, 0.8); schicht.setzeGewicht(1, 1, 0.2);
    schicht.setzeBias(1, -0.5);
    // Neuron 2
    schicht.setzeGewicht(2, 0, -0.4); schicht.setzeGewicht(2, 1, 0.9);
    schicht.setzeBias(2, 0.3);

    double[] eingabe = {1.0, 0.8};
    double[] ausgabe = schicht.berechne(eingabe);

    IO.println("Ausgaben der Schicht:");
    for (int i = 0; i < ausgabe.length; i++) {
        IO.println("  Neuron " + i + ": " + ausgabe[i]);
    }
}
```

```java Schicht.java
public class Schicht {
    private Neuron[] neuronen;

    public Schicht(int pAnzahlNeuronen, int pAnzahlEingaben, Aktivierung pAktivierung) {
        neuronen = new Neuron[pAnzahlNeuronen];
        for (int i = 0; i < pAnzahlNeuronen; i++) {
            neuronen[i] = new Neuron(pAnzahlEingaben, pAktivierung);
        }
    }

    public void setzeGewicht(int pNeuron, int pEingabe, double pWert) {
        neuronen[pNeuron].setzeGewicht(pEingabe, pWert);
    }

    public void setzeBias(int pNeuron, double pWert) {
        neuronen[pNeuron].setzeBias(pWert);
    }

    public double[] berechne(double[] pEingabe) {
        double[] ausgabe = new double[neuronen.length];
        for (int i = 0; i < neuronen.length; i++) {
            ausgabe[i] = neuronen[i].berechne(pEingabe);
        }
        return ausgabe;
    }

    public int anzahlNeuronen() {
        return neuronen.length;
    }
}
```

```java Neuron.java
public class Neuron {
    private double[] gewichte;
    private double bias;
    private Aktivierung aktivierung;

    public Neuron(int pAnzahlEingaben, Aktivierung pAktivierung) {
        gewichte = new double[pAnzahlEingaben];
        for (int i = 0; i < pAnzahlEingaben; i++) { gewichte[i] = 0.0; }
        bias = 0.0;
        aktivierung = pAktivierung;
    }
    public void setzeGewicht(int pIndex, double pWert) { gewichte[pIndex] = pWert; }
    public void setzeBias(double pWert) { bias = pWert; }
    public double berechne(double[] pEingabe) {
        double summe = bias;
        for (int i = 0; i < gewichte.length; i++) {
            summe += gewichte[i] * pEingabe[i];
        }
        return aktivierung.aktiviere(summe);
    }
}
```

```java Aktivierung.java
public interface Aktivierung {
    double aktiviere(double pWert);
}
```

```java Sigmoid.java
public class Sigmoid implements Aktivierung {
    public double aktiviere(double pWert) {
        return 1.0 / (1.0 + Math.exp(-pWert));
    }
}
```

:::

:::snippet{#merken}
**Forward Propagation** ist der Datenfluss von Ein- zu Ausgabe: Die Eingabeschicht empfängt die Rohdaten, jede verdeckte Schicht berechnet ihre Ausgabe aus der vorherigen Schicht, und die Ausgabeschicht liefert das Ergebnis. Jedes Neuron berechnet: gewichtete Summe → Aktivierungsfunktion → Ausgabe.
:::

:::snippet{#aufgabe}
a) Führe das Programm aus. Notiere die drei Ausgabewerte.

b) Was passiert, wenn du die Eingabe auf {0.0, 0.0} änderst? Welche Ausgaben erwartest du?

c) Ändere die Aktivierungsfunktion der Schicht auf ReLU. Wie verändern sich die Ausgaben? (Du musst dafür die Klasse `ReLU.java` aus Lektion 4.2 als weitere Datei ergänzen.)
:::

::::collapsible{title="Tipp zu b)"}

Schau dir `berechne` im Neuron an: `summe` startet beim Bias, und jeder Summand ist `gewichte[i] * pEingabe[i]`. Was bleibt von der Summe übrig, wenn jede Eingabe 0 ist?
::::

:::protect{password="ai-4-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die drei Ausgaben für die Eingabe {1.0, 0.8}:

| Neuron | gewichtete Summe | Sigmoid-Ausgabe |
| --- | --- | --- |
| 0 | 0.36 | ≈ 0.589 |
| 1 | 0.46 | ≈ 0.613 |
| 2 | 0.62 | ≈ 0.650 |

b) Bei der Eingabe {0.0, 0.0} fallen alle Produkte `gewichte[i] * pEingabe[i]` weg. Übrig bleibt für jedes Neuron nur sein **Bias**:

| Neuron | Bias | Sigmoid-Ausgabe |
| --- | --- | --- |
| 0 | 0.1 | ≈ 0.525 |
| 1 | -0.5 | ≈ 0.378 |
| 2 | 0.3 | ≈ 0.574 |

Die Ausgaben sind trotz Null-Eingabe nicht 0.5 und auch nicht untereinander gleich — genau dafür gibt es den Bias.

c) Mit ReLU wird aus jeder Summe entweder sie selbst (wenn positiv) oder 0. Für {1.0, 0.8} sind das 0.36, 0.46 und 0.62 — also die rohen Summen, weil alle positiv sind. Für {0.0, 0.0} ergibt sich 0.1, **0** und 0.3: Neuron 1 mit dem negativen Bias -0.5 wird komplett abgeschaltet, während Sigmoid dort noch 0.378 geliefert hatte. Das ist der wesentliche Unterschied: ReLU schaltet Neuronen ganz ab, Sigmoid drückt sie nur nahe an 0.
:::

## Der Weg durch das Netz

Hier siehst du, was Forward Propagation bedeutet: Die Zahlen wandern von links nach rechts, und jede Ausgabe einer Schicht wird zur Eingabe der nächsten. Eingestellt sind die Gewichte aus dem Programm; über **Gewichte des Netzes** kannst du sie ändern.

<ki-neuron modus="netz" eingabe="1,0.8"></ki-neuron>

:::snippet{#aufgabe}
a) Drücke auf **Schritt für Schritt** und dann zweimal auf den blauen Knopf. Welche Schicht wird zuerst berechnet, welche danach? Vergleiche die drei Werte der verdeckten Schicht mit den Ausgaben aus deinem Programmlauf.

b) Stelle beide Eingaben auf 0. Unter der Zeichnung stehen die drei Rechnungen. Woraus besteht die Summe eines Neurons jetzt noch?

c) Schalte die Aktivierung auf **ReLU**. Welches der drei verdeckten Neuronen wird bei Eingabe (0 | 0) vollständig abgeschaltet?
:::

::::collapsible{title="Tipp zu c)"}

ReLU gibt für negative Summen genau 0 zurück. Schau in die drei Rechnungen: Welches Neuron hat einen negativen Bias?
::::

<!-- KLP Q-Phase: erläutern die Grundlagen künstlicher neuronaler Netze (A) —
     Grundidee der Forward Propagation -->

---

## Selbsttest

::::multievent

**1. Was ist Forward Propagation?**

{r1{!Der Datenfluss von der Eingabeschicht durch das Netz zur Ausgabeschicht.}}

{r1{Das Zurückrechnen des Fehlers von der Ausgabe zur Eingabe.}}

{r1{Das Trainieren des Netzes mit gelabelten Daten.}}

{r1{Das Teilen der Daten in Trainings- und Testdaten.}}

{h{„Forward" = vorwärts, also vom Eingang zum Ausgang.}}

{H{Richtig! Forward Propagation berechnet die Ausgabe des Netzes für gegebene Eingaben.}}

**2. Was berechnet ein Neuron bei der Forward Propagation?** (Mehrfachauswahl)

{c1{!Gewichtete Summe der Eingaben plus Bias}}

{c1{!Anwendung der Aktivierungsfunktion auf die Summe}}

{c1{Cluster-Zuordnung des Eingabepunkts}}

{c1{Distanz zu allen Trainingspunkten}}

{h{Das Neuron berechnet Summe und wendet dann die Aktivierungsfunktion an.}}

{H{Richtig! Ein Neuron berechnet die gewichtete Summe und wendet die Aktivierungsfunktion an.}}

**3. Eine Schicht mit 3 Neuronen empfängt 2 Eingaben. Wie viele Ausgaben hat sie?**

{r2{!3 — eine pro Neuron}}

{r2{2 — eine pro Eingabe}}

{r2{1 — die Summe aller Neuronen}}

{r2{6 — 3 Neuronen mal 2 Eingaben}}

{h{Jedes Neuron gibt eine Ausgabe. Wie viele Neuronen hat die Schicht?}}

{H{Richtig! Jedes der 3 Neuronen gibt eine Ausgabe, also 3 Ausgaben insgesamt.}}

::::
