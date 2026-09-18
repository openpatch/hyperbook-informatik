---
title: Gewichte und Aktivierung
index: 2
permaid: ai-gewichte-aktivierung
---

# Gewichte und Aktivierung

Ein Neuron berechnet die gewichtete Summe — aber das allein reicht nicht. Die Summe kann jede Zahl sein, auch negativ oder sehr groß. Die **:t[Aktivierungsfunktion]{#aktivierungsfunktion}** wandelt die Summe in eine sinnvolle Ausgabe um.

## Die Sigmoid-Funktion

Die bekannteste Aktivierungsfunktion ist die **Sigmoid-Funktion**. Sie quetscht jede Zahl in den Bereich zwischen 0 und 1:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

- Sehr große Eingaben → Ausgabe nahe 1
- Sehr negative Eingaben → Ausgabe nahe 0
- Eingabe 0 → Ausgabe 0,5

:::snippet{#definition}
Die **Aktivierungsfunktion** entscheidet, ob und wie stark ein Neuron „feuert". Sie nimmt die gewichtete Summe und erzeugt eine Ausgabe, die an die nächste Schicht weitergegeben wird.

**Sigmoid** ist eine Aktivierungsfunktion, die Werte in den Bereich (0, 1) presst. Gut für Wahrscheinlichkeiten.

**ReLU** (Rectified Linear Unit) gibt negative Werte auf 0 zurück und lässt positive unverändert: $\text{ReLU}(x) = \max(0, x)$. Einfach und schnell.
:::

## Aktivierungsfunktionen als Polymorphie

Hier kommt ein Konzept aus dem OOP-Lernpfad ins Spiel: **Polymorphie**. Wir definieren eine Schnittstelle `Aktivierung` und zwei Implementierungen: `Sigmoid` und `ReLU`. Das Neuron bekommt seine Aktivierungsfunktion zur Laufzeit — es weiß nicht, welche, und muss es auch nicht wissen.

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    Neuron n1 = new Neuron(2, new Sigmoid());
    n1.setzeGewicht(0, 0.5);
    n1.setzeGewicht(1, -0.3);
    n1.setzeBias(0.1);

    Neuron n2 = new Neuron(2, new ReLU());
    n2.setzeGewicht(0, 0.5);
    n2.setzeGewicht(1, -0.3);
    n2.setzeBias(0.1);

    double[] eingabe = {1.0, 0.8};

    IO.println("Sigmoid: " + n1.berechne(eingabe));
    IO.println("ReLU:    " + n2.berechne(eingabe));

    IO.println("--- Negativer Bias ---");
    n1.setzeBias(-2.0);
    n2.setzeBias(-2.0);
    IO.println("Sigmoid: " + n1.berechne(eingabe));
    IO.println("ReLU:    " + n2.berechne(eingabe));
}
```

```java Neuron.java
public class Neuron {
    private double[] gewichte;
    private double bias;
    private Aktivierung aktivierung;

    public Neuron(int pAnzahlEingaben, Aktivierung pAktivierung) {
        gewichte = new double[pAnzahlEingaben];
        for (int i = 0; i < pAnzahlEingaben; i++) {
            gewichte[i] = 0.0;
        }
        bias = 0.0;
        aktivierung = pAktivierung;
    }

    public void setzeGewicht(int pIndex, double pWert) {
        gewichte[pIndex] = pWert;
    }

    public void setzeBias(double pWert) {
        bias = pWert;
    }

    public double berechne(double[] pEingabe) {
        double summe = bias;
        for (int i = 0; i < gewichte.length; i++) {
            summe = summe + gewichte[i] * pEingabe[i];
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

```java ReLU.java
public class ReLU implements Aktivierung {
    public double aktiviere(double pWert) {
        if (pWert < 0) {
            return 0.0;
        }
        return pWert;
    }
}
```

:::

:::snippet{#brain}
Bevor du das Programm ausführst: Bei Bias 0.1 ist die gewichtete Summe 0.36 (aus der letzten Lektion). Sigmoid davon: etwa 0.59. ReLU davon: 0.36.

Jetzt wird der Bias auf -2.0 gesetzt. **Achtung:** Der Bias wird nicht addiert, sondern **ersetzt** — rechne die Summe also neu aus, statt 2.0 von 0.36 abzuziehen. Was gibt dann Sigmoid, was gibt ReLU?
:::

::::collapsible{title="Tipp 1: die neue Summe"}

summe = bias + gewicht[0] · eingabe[0] + gewicht[1] · eingabe[1]
summe = -2.0 + 0.5 · 1.0 + (-0.3) · 0.8
summe = -2.0 + 0.5 - 0.24 = **-1.74**
::::

::::collapsible{title="Tipp 2: die beiden Ausgaben"}

Sigmoid(-1.74) = 1 / (1 + e^1.74) ≈ 1 / 6.70 ≈ **0.149**

ReLU(-1.74) = max(0, -1.74) = **0**
::::

:::snippet{#merken}
Die Aktivierungsfunktion ist ein **klassisches Beispiel für Polymorphie**: das Neuron hat eine Referenz vom Typ `Aktivierung`, und zur Laufzeit entscheidet der tatsächliche Objekttyp (`Sigmoid` oder `ReLU`), welche Berechnung läuft. Genau das hast du im OOP-Lernpfad bei den Schnittstellen gelernt — hier ist es kein konstruiertes Beispiel, sondern die echte Architektur eines neuronalen Netzes.
:::

:::snippet{#aufgabe}
a) Führe das Programm aus und vergleiche mit deiner Papierberechnung.

b) Tausche die Aktivierungsfunktion beider Neuronen: gib dem ersten `ReLU` und dem zweiten `Sigmoid`. Was ändert sich?

c) Was passiert, wenn du ein Neuron mit Sigmoid und sehr großem positivem Bias (z.B. 10.0) rechnen lässt? Und mit sehr großem negativem Bias (z.B. -10.0)?
:::

::::collapsible{title="Tipp zu c)"}

Sigmoid „sättigt": bei sehr großen Werten geht die Ausgabe gegen 1, bei sehr negativen gegen 0. Dazwischen reagiert sie kaum noch — das ist ein Grund, warum in vielen Netzen ReLU bevorzugt wird.
::::

:::protect{password="ai-4-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Mit Bias 0.1 ist die Summe 0.36: Sigmoid gibt ≈ 0.589, ReLU gibt 0.36. Mit Bias -2.0 ist die Summe -1.74: Sigmoid gibt ≈ 0.149, ReLU gibt 0.

b) Die Zahlen tauschen einfach die Plätze — welche Aktivierungsfunktion ein Neuron benutzt, ändert nichts an seiner gewichteten Summe, sondern nur daran, was es daraus macht. Genau das ist der Sinn der Schnittstelle `Aktivierung`: Die Berechnung der Summe steht **einmal** in `Neuron.berechne` und funktioniert für jede Aktivierungsfunktion, die es je geben wird.

c) Mit Bias 10.0 ist die Summe 10.26 und Sigmoid liefert ≈ 0.99996. Mit Bias -10.0 ist die Summe -9.74 und Sigmoid liefert ≈ 0.0000589.

In beiden Fällen ist die Ausgabe praktisch 1 bzw. 0, und — das ist das Entscheidende — sie ändert sich kaum noch, wenn man die Eingaben verändert. Die Funktion ist **gesättigt**. Beim Lernen ist das ein Problem: Wenn die Ausgabe auf Änderungen nicht mehr reagiert, bekommt das Netz kein Signal darüber, in welche Richtung es die Gewichte anpassen soll. ReLU hat diese Sättigung im positiven Bereich nicht — dort bleibt die Ausgabe proportional zur Summe.
:::

<!-- KLP Q-Phase: erläutern die Grundlagen künstlicher neuronaler Netze (A) —
     Gewichte, Aktivierungsfunktion -->

---

## Selbsttest

::::multievent

**1. Wozu dient die Aktivierungsfunktion?**

{r1{!Sie wandelt die gewichtete Summe in eine sinnvolle Ausgabe um.}}

{r1{Sie berechnet die Distanz zwischen Neuronen.}}

{r1{Sie teilt Neuronen in Cluster ein.}}

{r1{Sie bestimmt die Anzahl der Schichten.}}

{h{Ohne Aktivierungsfunktion wäre das Neuron nur eine gewichtete Summe.}}

{H{Richtig! Die Aktivierungsfunktion entscheidet, ob und wie stark das Neuron feuert.}}

**2. Welche Aussagen über Sigmoid und ReLU sind richtig?** (Mehrfachauswahl)

{c1{!Sigmoid erzeugt Werte zwischen 0 und 1.}}

{c1{!ReLU gibt negative Werte als 0 zurück.}}

{c1{Sigmoid erzeugt negative Werte.}}

{c1{ReLU erzeugt Werte zwischen 0 und 1.}}

{h{Sigmoid presst auf (0,1), ReLU schneidet Negatives ab.}}

{H{Richtig! Sigmoid liefert Werte in (0, 1), ReLU liefert max(0, x) — Negatives wird 0.}}

**3. Welches OOP-Konzept steckt hinter der Aktivierungsfunktion?**

{r2{!Polymorphie — das Neuron kennt nur die Schnittstelle, die Implementierung wird zur Laufzeit gewählt.}}

{r2{Vererbung — ReLU erbt von Sigmoid.}}

{r2{Kapselung — die Gewichte sind private.}}

{r2{Assoziation — das Neuron hat ein Feld.}}

{h{Die Schnittstelle Aktivierung hat zwei Implementierungen: Sigmoid und ReLU.}}

{H{Richtig! Das ist Polymorphie: das Neuron hat eine Referenz auf die Schnittstelle, und der Objekttyp entscheidet zur Laufzeit.}}

::::
