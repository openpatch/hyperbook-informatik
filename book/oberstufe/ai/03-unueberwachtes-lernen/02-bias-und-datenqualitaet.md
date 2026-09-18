---
title: Bias und Datenqualität
index: 2
permaid: ai-bias
scripts:
  - /wc/ki-punktwolke.js
---

# Bias und Datenqualität

Ein KI-System ist nur so gut wie die Daten, aus denen es lernt. Wenn die Daten verzerrt sind, wird auch das Modell verzerrt. Das nennt man **:t[Bias]{#bias}**.

## Was ist Bias?

:::snippet{#definition}
**Bias** (Verzerrung) bedeutet, dass ein KI-System systematisch bestimmte Gruppen oder Ergebnisse bevorzugt oder benachteiligt, weil die Trainingsdaten nicht repräsentativ sind.
:::

Ein Beispiel: Ein Spam-Filter wird nur mit englischen E-Mails trainiert. Wenn er nun eine deutsche E-Mail sieht, stuft er sie möglicherweise als Spam ein — nicht weil sie Spam ist, sondern weil sie „anders" aussieht als das, was er gelernt hat. Das ist Bias durch unrepräsentative Daten.

## Arten von Bias

| Art | Ursache | Beispiel |
| --- | --- | --- |
| **Auswahl-Bias** | Trainingsdaten sind nicht repräsentativ | Spam-Filter nur mit englischen Mails |
| **Mess-Bias** | Merkmale werden verzerrt gemessen | Kamera erkennt nur helle Gesichter |
| **Historischer Bias** | Daten spiegeln vergangene Ungerechtigkeiten | Bewerbungs-KI bevorzugt Männer |
| **Bestätigungs-Bias** | Daten wurden so ausgewählt, dass sie eine Erwartung bestätigen | Nur positive Bewertungen werden gesammelt |

## Bias im k-Means-Beispiel

:::snippet{#brain}
Bevor du das Programm ausführst: Die Daten haben 7 Punkte nahe (10–16, 19–22) und 2 Punkte nahe (50–51, 60–61). Wie werden sich die 2 Cluster aufteilen?
:::

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    // Verzerrte Daten: viele Punkte in einem Bereich, wenige im anderen
    Datenpunkt[] punkte = {
        new Datenpunkt(10, 20, ""),
        new Datenpunkt(11, 21, ""),
        new Datenpunkt(12, 22, ""),
        new Datenpunkt(13, 19, ""),
        new Datenpunkt(14, 20, ""),
        new Datenpunkt(15, 21, ""),
        new Datenpunkt(16, 22, ""),
        new Datenpunkt(50, 60, ""),
        new Datenpunkt(51, 61, "")
    };

    KMeans kmeans = new KMeans(punkte, 2);
    kmeans.trainiere(10);

    IO.println("--- Cluster-Größen ---");
    int[] groessen = new int[2];
    for (int i = 0; i < punkte.length; i++) {
        groessen[kmeans.clusterVon(i)]++;
    }
    IO.println("Cluster 0: " + groessen[0] + " Punkte");
    IO.println("Cluster 1: " + groessen[1] + " Punkte");
}
```

```java KMeans.java
public class KMeans {
    private Datenpunkt[] punkte;
    private Datenpunkt[] zentroide;
    private int[] cluster;
    private int k;

    public KMeans(Datenpunkt[] pPunkte, int pK) {
        punkte = pPunkte;
        k = pK;
        zentroide = new Datenpunkt[k];
        cluster = new int[pPunkte.length];
        for (int i = 0; i < k; i++) {
            zentroide[i] = new Datenpunkt(pPunkte[i].gibGewicht(), pPunkte[i].gibSuessigkeit(), "");
        }
    }

    public void trainiere(int pMaxIterationen) {
        for (int iter = 0; iter < pMaxIterationen; iter++) {
            boolean veraendert = false;
            for (int i = 0; i < punkte.length; i++) {
                int bester = 0;
                double minDist = punkte[i].distanzZu(zentroide[0]);
                for (int c = 1; c < k; c++) {
                    double d = punkte[i].distanzZu(zentroide[c]);
                    if (d < minDist) { minDist = d; bester = c; }
                }
                if (cluster[i] != bester) { cluster[i] = bester; veraendert = true; }
            }
            for (int c = 0; c < k; c++) {
                double sumX = 0; double sumY = 0; int anzahl = 0;
                for (int i = 0; i < punkte.length; i++) {
                    if (cluster[i] == c) {
                        sumX += punkte[i].gibGewicht(); sumY += punkte[i].gibSuessigkeit(); anzahl++;
                    }
                }
                if (anzahl > 0) { zentroide[c] = new Datenpunkt(sumX / anzahl, sumY / anzahl, ""); }
            }
            if (!veraendert) { break; }
        }
    }

    public int clusterVon(int pIndex) { return cluster[pIndex]; }
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
a) Führe das Programm aus. Wie groß sind die Cluster?

b) Ändere k auf 3 und passe die Feldgröße von `groessen` sowie die Ausgabe an. Wie verteilen sich die 9 Punkte jetzt? Was fällt auf, wenn du die große und die kleine Gruppe vergleichst?

c) Cluster 1 stützt sich auf **zwei** Datenpunkte. Ein Unternehmen möchte daraus eine Aussage über „diesen Kundentyp" ableiten. Warum ist das heikel?

d) Nenne zwei Maßnahmen, mit denen man dem Problem aus c) begegnen kann.
:::

::::collapsible{title="Tipp 1: zu b)"}

Du musst an drei Stellen von 2 auf 3 gehen: im Aufruf `new KMeans(punkte, 2)`, bei `new int[2]` und in den Ausgabezeilen. Am einfachsten schreibst du die Ausgabe als Schleife über alle Cluster.
::::

::::collapsible{title="Tipp 2: zu b)"}

Zähle nach, wie viele Punkte die **große** Gruppe (die sieben um (10–16, 19–22)) bekommt und wie viele die **kleine** (die zwei um (50–51, 60–61)). Bekommt jede Gruppe gleich viele Cluster?
::::

:::protect{password="ai-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Cluster 0 hat **7** Punkte, Cluster 1 hat **2** Punkte. Die Aufteilung ist inhaltlich richtig — die Daten bestehen tatsächlich aus einer großen und einer kleinen Gruppe.

b) Bei k = 3 entstehen Cluster mit **3, 4 und 2** Punkten. Die große Gruppe wird in **zwei** Cluster zerlegt, die kleine bleibt ein einziger. Das ist der Kern des Problems: Das Modell beschreibt die überrepräsentierte Gruppe immer feiner, während die unterrepräsentierte Gruppe eine grobe Sammelkategorie bleibt. Genau so entsteht Bias — nicht dadurch, dass der Algorithmus falsch rechnet, sondern dadurch, dass er der Mehrheit mehr Auflösung schenkt.

c) Zwei Punkte sind keine Stichprobe. Der Schwerpunkt bei (50,5 / 60,5) ist der Mittelwert aus genau zwei Messungen — ein einziger fehlerhafter Wert verschiebt ihn um die Hälfte des Fehlers. Über die Streuung innerhalb dieser Gruppe weiß man gar nichts. Eine Aussage über „diesen Kundentyp" hat damit keine Grundlage, sieht aber genauso selbstbewusst aus wie die Aussage über die große Gruppe. Dass ein Ergebnis aus einem Programm kommt, macht es nicht belastbar.

d) Zum Beispiel:

- **Mehr Daten aus der kleinen Gruppe erheben**, bis beide Gruppen ähnlich stark vertreten sind.
- **Die Clustergrößen mit ausgeben** und Aussagen über sehr kleine Cluster ausdrücklich als unsicher kennzeichnen.
- Alternativ: die kleine Gruppe beim Trainieren **stärker gewichten**, damit sie nicht untergeht.
:::

:::snippet{#merken}
Bias entsteht schon in den Daten, nicht erst im Algorithmus. Wenn die Trainingsdaten eine Gruppe über- oder unterrepräsentieren, wird auch das Modell diese Verzerrung reproduzieren. **Gegenmaßnahme:** Daten sorgfältig sammeln, auf Repräsentativität prüfen, und Bias bewusst dokumentieren.
:::

## Verzerrte Daten im Bild

Sieben Punkte dicht beieinander, zwei Punkte weit weg — dieselben Daten wie im Programm.

<ki-punktwolke id="ai-bias-kmeans" modus="kmeans" k="2" bearbeitbar
  punkte="10,20;11,21;12,22;13,19;14,20;15,21;16,22;50,60;51,61"
  x-min="0" x-max="60" y-min="0" y-max="80"
  x-label="Merkmal 1" y-label="Merkmal 2"></ki-punktwolke>

:::snippet{#aufgabe}
a) Lasse k-Means mit k = 2 bis zum Ende laufen. Wie viele Punkte hat jedes Cluster?

b) Stelle k auf 3. Die große Gruppe wird zerlegt, die kleine nicht. Schau dir die Spalte **Punkte** an: Wie viele Datenpunkte stützen jedes Cluster?

c) Setze mit dem Werkzeug fünf weitere Punkte in die Nähe von (50 | 60), bis beide Gruppen ähnlich groß sind. Lasse k-Means mit k = 3 noch einmal laufen. Was ändert sich?
:::

:::protect{password="ai-3-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

c) Jetzt wird auch die zweite Gruppe aufgeteilt, statt als grobe Sammelkategorie stehen zu bleiben. Der Algorithmus ist derselbe geblieben — verändert hast du nur die Daten. Genau das ist gemeint, wenn es heißt, Bias entstehe in den Daten und nicht im Algorithmus.
:::

<!-- KLP Q-Phase: bewerten die Qualität eines KI-Modells auf Grundlage
     vorgegebener Kriterien (A) — Bias -->

---

## Selbsttest

::::multievent

**1. Was ist Bias bei KI-Systemen?**

{r1{!Eine systematische Verzerrung durch unrepräsentative Trainingsdaten.}}

{r1{Ein zufälliger Fehler im Algorithmus.}}

{r1{Wenn das System zu langsam ist.}}

{r1{Wenn k zu groß gewählt wurde.}}

{h{Bias bedeutet, dass das System systematisch bestimmte Ergebnisse bevorzugt.}}

{H{Richtig! Bias kommt aus den Daten — wenn sie nicht repräsentativ sind, wird das Modell verzerrt.}}

**2. Welche Art von Bias entsteht, wenn ein Gesichtserkennungssystem nur mit hellen Gesichtern trainiert wird?**

{r2{!Auswahl-Bias — die Trainingsdaten sind nicht repräsentativ.}}

{r2{Bestätigungs-Bias — die Erwartung wird bestätigt.}}

{r2{Mess-Bias — die Kamera misst falsch.}}

{r2{Kein Bias — das System lernt trotzdem richtig.}}

{h{Die Daten sind so ausgewählt, dass eine Gruppe fehlt.}}

{H{Richtig! Wenn eine Gruppe in den Trainingsdaten fehlt, spricht man von Auswahl-Bias.}}

**3. Ergänze: {t{Bias}} ist eine systematische Verzerrung, die aus unrepräsentativen Trainingsdaten entsteht.**

{h{Das Wort kommt aus dem Englischen und bedeutet „Voreingenommenheit".}}

{H{Richtig! Bias ist eine der wichtigsten Bewertungskriterien für KI-Modelle.}}

::::
