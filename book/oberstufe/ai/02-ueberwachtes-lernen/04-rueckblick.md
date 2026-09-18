---
title: Rückblick
index: 4
permaid: ai-ueberwacht-rueckblick
---

# Rückblick

Du hast deinen ersten KI-Klassifikator gebaut, Trainings- und Testdaten aufgeteilt und die Trefferquote gemessen.

## Das kann ich jetzt

- [ ] Ich kann erklären, warum man Daten in Trainings- und Testdaten aufteilt. ([2.1](./01-trainings-und-testdaten))
- [ ] Ich kann die Funktionsweise von k-NN beschreiben. ([2.2](./02-klassifizierung-mit-k-nn))
- [ ] Ich kann k-NN in Java implementieren. ([2.2](./02-klassifizierung-mit-k-nn))
- [ ] Ich kann die Trefferquote berechnen und interpretieren. ([2.3](./03-der-lernprozess))
- [ ] Ich kann einschätzen, wie die Wahl von k das Ergebnis beeinflusst. ([2.3](./03-der-lernprozess))

## Das Wichtigste auf einen Blick

| Begriff | Bedeutung |
| --- | --- |
| **Trainingsdaten** | Daten mit Labels, an denen das System lernt |
| **Testdaten** | Ungesehene Daten, mit denen die Qualität geprüft wird |
| **k-NN** | Klassifiziert nach den k nächsten Nachbarn (Mehrheitsentscheidung) |
| **Trefferquote** | Anteil der korrekt klassifizierten Testdaten in Prozent |
| **Lazy learning** | Training = Speichern; Arbeit passiert erst bei der Klassifizierung |
| **Distanz** | Euklidische Distanz: $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ |

:::snippet{#merken}
k-NN ist ein **konkretes Verfahren zur Klassifizierung** beim überwachten Lernen. Es ist diskriminativ (ordnet ein), überwacht (braucht Labels) und faul (speichert nur). Die Wahl von k und die Qualität der Trainingsdaten bestimmen die Trefferquote.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: k-NN auf dem Papier**

Gegeben sind diese Trainingsdaten:

| Punkt | Label |
| --- | --- |
| (1, 1) | A |
| (2, 2) | A |
| (1, 3) | A |
| (4, 3) | B |
| (8, 6) | B |
| (8, 8) | B |
| (9, 7) | B |

Klassifiziert werden soll der Punkt **(3, 3)**. Sein wahres Label ist **A**.

a) Berechne die Distanz von (3, 3) zu allen sieben Trainingspunkten und ordne sie der Größe nach.

b) Welches Label liefert k-NN für k = 1, k = 3 und k = 5?

c) Bei genau einem dieser k-Werte liegt der Klassifikator falsch. Bei welchem, und warum gerade dort?
:::

::::collapsible{title="Tipp 1: Rechenweg"}

$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. Du darfst die Wurzeln stehen lassen — zum Sortieren genügt es, die Werte **unter** der Wurzel zu vergleichen.
::::

::::collapsible{title="Tipp 2: zu c)"}

Schau dir an, welcher Punkt der allernächste ist und welches Label er trägt. Passt er zu seiner Umgebung?
::::

:::protect{password="ai-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Sortiert nach Distanz:

| Punkt | Label | Distanz |
| --- | --- | --- |
| (4, 3) | B | 1,00 |
| (2, 2) | A | 1,41 |
| (1, 3) | A | 2,00 |
| (1, 1) | A | 2,83 |
| (8, 6) | B | 5,83 |
| (8, 8) | B | 7,07 |
| (9, 7) | B | 7,21 |

b) **k = 1 → B**, **k = 3 → A** (1× B, 2× A), **k = 5 → A** (2× B, 3× A).

c) Falsch liegt der Klassifikator bei **k = 1**. Der nächste Nachbar ist (4, 3) mit dem Label B — ein Punkt, der weit von allen anderen B-Punkten entfernt mitten im A-Gebiet liegt, also ein **Ausreißer**. Bei k = 1 entscheidet er allein; ab k = 3 wird er von den beiden nächsten A-Punkten überstimmt. Das ist genau der Grund, warum man k selten auf 1 setzt.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Das beste k automatisch finden**

Bisher hast du k von Hand verändert und die Trefferquote abgelesen. Das soll das Programm selbst erledigen.

Schreibe eine Methode

```java
int besteK(Datenpunkt[] pTraining, Datenpunkt[] pTest, int pMaxK)
```

die alle ungeraden Werte von k zwischen 1 und `pMaxK` durchprobiert, für jedes die Trefferquote auf den Testdaten berechnet, jede Quote ausgibt und am Ende das k mit der höchsten Trefferquote zurückgibt.

a) Schreibe die Methode und probiere sie mit den Daten aus Lektion 2.3 aus.

b) Warum werden nur **ungerade** k-Werte geprüft?

c) Das gefundene k ist auf den Testdaten das beste. Warum darf man daraus **nicht** schließen, dass das Modell mit diesem k genau so gut auf ganz neue Daten sein wird?
:::

::::collapsible{title="Tipp 1: Aufbau"}

Du brauchst zwei ineinanderliegende Schleifen: außen über k, innen über die Testdaten. Die innere Schleife steht schon fertig in der `main` von Lektion 2.3 — verschiebe sie in eine eigene Methode.
::::

::::collapsible{title="Tipp 2: Gerüst"}

```java
int besteK(Datenpunkt[] pTraining, Datenpunkt[] pTest, int pMaxK) {
    KNNKlassifikator knn = new KNNKlassifikator(pTraining);
    int bestesK = 1;
    int besteAnzahl = -1;
    for (int k = 1; k <= pMaxK; k = k + 2) {
        int richtig = 0;
        // ... Testdaten durchgehen und zaehlen ...
        IO.println("k = " + k + ": " + richtig + "/" + pTest.length);
        if (richtig > besteAnzahl) {
            besteAnzahl = richtig;
            bestesK = k;
        }
    }
    return bestesK;
}
```
::::

:::protect{password="ai-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Methode:

```java
int besteK(Datenpunkt[] pTraining, Datenpunkt[] pTest, int pMaxK) {
    KNNKlassifikator knn = new KNNKlassifikator(pTraining);
    int bestesK = 1;
    int besteAnzahl = -1;

    for (int k = 1; k <= pMaxK; k = k + 2) {
        int richtig = 0;
        for (int i = 0; i < pTest.length; i++) {
            String vorhersage = knn.klassifiziere(pTest[i], k);
            if (vorhersage.equals(pTest[i].gibName())) {
                richtig++;
            }
        }
        IO.println("k = " + k + ": " + richtig + "/" + pTest.length);
        if (richtig > besteAnzahl) {
            besteAnzahl = richtig;
            bestesK = k;
        }
    }
    return bestesK;
}
```

Mit den Daten aus Lektion 2.3 (9 Trainings-, 5 Testpunkte) und `pMaxK = 9` kommt heraus: k = 1 → 4/5, k = 3 → 5/5, k = 5 → 5/5, k = 7 → 5/5, k = 9 → 2/5. Zurückgegeben wird **k = 3**, weil bei Gleichstand das erste und damit kleinste k gewinnt.

b) Bei geradem k kann die Abstimmung **unentschieden** ausgehen — bei k = 4 etwa 2 zu 2. Das Verfahren müsste den Gleichstand dann willkürlich auflösen; in unserem Code gewinnt in diesem Fall immer „Birne", weil die Bedingung `apfel > birne` lautet. Mit ungeradem k und zwei Klassen kann das nicht passieren.

c) Weil das k nun **an den Testdaten angepasst** wurde. Sobald man die Testdaten benutzt, um eine Entscheidung über das Modell zu treffen, sind sie keine ungesehenen Daten mehr — die gemessene Quote ist zu optimistisch, aus demselben Grund, aus dem man nicht auf den Trainingsdaten testet. In der Praxis teilt man deshalb in **drei** Teile: Trainingsdaten zum Lernen, Validierungsdaten zum Einstellen von Werten wie k, und Testdaten, die man erst ganz am Ende ein einziges Mal anfasst.
:::

<!-- KLP EF: erläutern den Unterschied von Trainings- und Testdaten (A).
     Q-Phase: erläutern die Funktionsweise eines konkreten Verfahrens zur
     Klassifizierung beim überwachten Lernen (A); bewerten die Qualität
     eines KI-Modells (A) -->

---

## Selbsttest

::::multievent

**1. Woraus besteht das „Training" beim k-NN?**

{r1{!Trainingsdaten speichern und k festlegen.}}

{r1{Gewichte schrittweise anpassen.}}

{r1{Ein Modell durch Gradientenabstieg optimieren.}}

{r1{Die Distanzformel verändern.}}

{h{k-NN ist lazy learning — was passiert beim Training?}}

{H{Richtig! Beim k-NN wird beim Training nur gespeichert und k gewählt. Die Arbeit passiert erst bei der Klassifizierung.}}

**2. Warum trennt man Trainings- und Testdaten?** (Mehrfachauswahl)

{c1{!Um zu prüfen, ob das System verallgemeinert hat.}}

{c1{!Weil sonst die Trefferquote irreführend hoch wäre.}}

{c1{Weil das System sonst zu langsam lernt.}}

{c1{Weil der KLP es verlangt.}}

{h{Ohne separate Testdaten misst man Auswendiglernen, nicht Verallgemeinerung.}}

{H{Richtig! Nur mit ungesehenen Testdaten kann man beurteilen, ob das System wirklich gelernt hat.}}

**3. Welcher Wert von k macht k-NN am anfälligsten für Ausreißer?**

{r2{!k = 1}}

{r2{k = 3}}

{r2{k = 10}}

{r2{k = 100}}

{h{Je kleiner k, desto mehr Gewicht hat ein einzelner Nachbar — auch ein Ausreißer.}}

{H{Richtig! Bei k = 1 entscheidet ein einziger Punkt, und wenn das ein Ausreißer ist, ist das Ergebnis falsch.}}

**4. Ergänze: Die {t{Trefferquote}} ist der Anteil der korrekt klassifizierten Testdaten in Prozent.**

{h{Sie wird berechnet als: richtige / alle × 100.}}

{H{Richtig! Die Trefferquote misst, wie gut das System auf ungesehenen Daten funktioniert.}}

::::
