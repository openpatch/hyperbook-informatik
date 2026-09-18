---
name: Referenz
index: 7
lang: de
permaid: ai-referenz
---

# Referenz

Ein Nachschlagewerk für die Klassen und Konzepte dieses Lernpfads.

## Datenpunkt

```java
public class Datenpunkt {
    private double gewicht;
    private double suessigkeit;
    private String label;

    public Datenpunkt(double pGewicht, double pSuessigkeit, String pLabel) { ... }
    public double gibGewicht() { ... }
    public double gibSuessigkeit() { ... }
    public String gibName() { ... }
    public double distanzZu(Datenpunkt pOther) { ... }
    public void schreibe() { ... }
}
```

| Methode | Wirkung |
| --- | --- |
| `distanzZu(pOther)` | Euklidische Distanz zu einem anderen Datenpunkt |
| `schreibe()` | Gibt Gewicht, Süßigkeit und Label auf einer Zeile aus |

## KNNKlassifikator

```java
KNNKlassifikator knn = new KNNKlassifikator(training);
String label = knn.klassifiziere(testPunkt, 3);
```

| Methode | Wirkung |
| --- | --- |
| `klassifiziere(pPunkt, pK)` | Klassifiziert den Punkt nach den k nächsten Nachbarn |

## KMeans

```java
KMeans kmeans = new KMeans(punkte, 3);
kmeans.trainiere(10);
int cluster = kmeans.clusterVon(i);
Datenpunkt zentroid = kmeans.schwerpunkt(c);
```

| Methode | Wirkung |
| --- | --- |
| `trainiere(pMaxIterationen)` | Führt k-Means iterativ aus |
| `clusterVon(pIndex)` | Gibt die Cluster-Zugehörigkeit eines Punkts zurück |
| `schwerpunkt(pCluster)` | Gibt den Zentroiden eines Clusters zurück |

## Neuron

```java
Neuron n = new Neuron(2, new Sigmoid());
n.setzeGewicht(0, 0.5);
n.setzeBias(0.1);
double ausgabe = n.berechne(eingabe);
```

| Methode | Wirkung |
| --- | --- |
| `setzeGewicht(pIndex, pWert)` | Setzt ein Gewicht |
| `setzeBias(pWert)` | Setzt den Bias |
| `berechne(pEingabe)` | Berechnet die Ausgabe (Summe + Aktivierung) |

## Schicht

```java
Schicht s = new Schicht(3, 2, new Sigmoid());
s.setzeGewicht(0, 0, 0.5);
s.setzeBias(0, 0.1);
double[] ausgabe = s.berechne(eingabe);
```

| Methode | Wirkung |
| --- | --- |
| `setzeGewicht(pNeuron, pEingabe, pWert)` | Setzt ein Gewicht eines Neurons |
| `setzeBias(pNeuron, pWert)` | Setzt den Bias eines Neurons |
| `berechne(pEingabe)` | Berechnet alle Ausgaben der Schicht |
| `anzahlNeuronen()` | Gibt die Anzahl der Neuronen zurück |

## Netz

```java
Netz netz = new Netz(new int[]{2, 3, 1}, new Sigmoid());
netz.setzeGewicht(1, 0, 0, 0.5);
netz.setzeBias(1, 0, 0.1);
double[] ausgabe = netz.berechne(eingabe);
```

| Methode | Wirkung |
| --- | --- |
| `setzeGewicht(pSchicht, pNeuron, pEingabe, pWert)` | Setzt ein Gewicht |
| `setzeBias(pSchicht, pNeuron, pWert)` | Setzt einen Bias |
| `berechne(pEingabe)` | Forward Propagation durch das gesamte Netz |

## Aktivierungsfunktionen

```java
public interface Aktivierung {
    double aktiviere(double pWert);
}

public class Sigmoid implements Aktivierung {
    public double aktiviere(double pWert) {
        return 1.0 / (1.0 + Math.exp(-pWert));
    }
}

public class ReLU implements Aktivierung {
    public double aktiviere(double pWert) {
        if (pWert < 0) {
            return 0.0;
        }
        return pWert;
    }
}
```

| Funktion | Bereich | Eigenschaft |
| --- | --- | --- |
| **Sigmoid** | (0, 1) | Glatt, gut für Wahrscheinlichkeiten |
| **ReLU** | [0, ∞) | Einfach, schnell, schneidet Negatives ab |

## BigrammModell

```java
BigrammModell modell = new BigrammModell();
modell.trainiere(korpus);
String text = modell.erzeugeText("die", 12);
```

| Methode | Wirkung |
| --- | --- |
| `trainiere(pKorpus)` | Zählt alle Bigramme im Korpus |
| `erzeugeText(pStart, pLaenge)` | Erzeugt Text durch zufällige Auswahl nach Wahrscheinlichkeit |

## Bewertungskriterien

| Kriterium | Formel | Bedeutung |
| --- | --- | --- |
| **Trefferquote** | richtig / alle | Anteil korrekter Vorhersagen |
| **Präzision** | TP / (TP + FP) | Zuverlässigkeit der positiven Vorhersagen |
| **Spezifität** | TN / (TN + FP) | Korrekte Erkennung der negativen Fälle |
| **Bias** | — | Systematische Verzerrung durch unrepräsentative Daten |
| **Überanpassung** | — | Modell zu komplex; gut auf Trainingsdaten, schlecht auf Testdaten |
| **Unteranpassung** | — | Modell zu einfach; schlecht auf beide |
