---
title: Rückblick
index: 6
permaid: ai-netze-rueckblick
---

# Rückblick

Du hast ein komplettes neuronales Netz in Java gebaut — mit Neuronen, Schichten, Aktivierungsfunktionen und Forward Propagation — und die Grundidee der Backpropagation kennengelernt.

## Das kann ich jetzt

- [ ] Ich kann die Bestandteile eines neuronalen Netzes nennen. ([4.1](./01-neuronen-und-schichten))
- [ ] Ich kann die Rolle der Aktivierungsfunktion erklären. ([4.2](./02-gewichte-und-aktivierung))
- [ ] Ich kann Forward Propagation beschreiben. ([4.3](./03-forward-propagation))
- [ ] Ich kann die Grundidee der Backpropagation und die Rolle der Lernrate erklären. ([4.4](./04-grundidee-der-backpropagation))
- [ ] Ich kann die OO-Struktur eines neuronalen Netzes beschreiben (Neuron → Schicht → Netz). ([4.5](./05-ein-einfaches-netz))

## Das Wichtigste auf einen Blick

| Begriff | Bedeutung |
| --- | --- |
| **Neuron** | Berechnet gewichtete Summe + Bias, wendet Aktivierungsfunktion an |
| **Gewichte** | Bestimmen, wie stark jede Eingabe zählt |
| **Aktivierungsfunktion** | Wandelt Summe in Ausgabe um (Sigmoid, ReLU) |
| **Eingabeschicht** | Empfängt die Rohdaten |
| **Verdeckte Schicht** | Verarbeitet die Daten (nicht von außen sichtbar) |
| **Ausgabeschicht** | Liefert das Ergebnis |
| **Forward Propagation** | Daten fließen vorwärts durch das Netz |
| **Backpropagation** | Fehler wird rückwärts gereicht, Gewichte werden angepasst |
| **Lernrate** | Bestimmt die Schrittgröße der Gewichtsanpassung |

:::snippet{#merken}
Ein neuronales Netz ist eine **Kette von 1:n-Assoziationen**: Netz hat Schichten, Schichten haben Neuronen, Neuronen haben eine Aktivierungsfunktion (Polymorphie). Forward Propagation ist der Vorwärtsdurchlauf, Backpropagation ist das Zurückrechnen des Fehlers. Die Lernrate steuert, wie schnell das Netz lernt.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Forward Propagation auf dem Papier**

Ein Netz hat zwei Eingaben, zwei verdeckte Neuronen und ein Ausgabeneuron. Überall wird **ReLU** als Aktivierungsfunktion verwendet.

| Neuron | Gewichte | Bias |
| --- | --- | --- |
| verdeckt 0 | 1,0 und −1,0 | 0,5 |
| verdeckt 1 | 0,5 und 0,5 | −1,0 |
| Ausgabe | 2,0 und −1,0 | 0,0 |

a) Berechne die Ausgabe des Netzes für die Eingabe (2,0 | 1,0). Notiere alle Zwischenwerte.

b) Berechne die Ausgabe für die Eingabe (0,0 | 3,0).

c) Bei einer der beiden Eingaben ist ein verdecktes Neuron vollständig abgeschaltet. Bei welcher, und was heißt das für die Ausgabe?

d) Wie viele Gewichte und wie viele Bias-Werte hat dieses Netz insgesamt? Wie viele Zahlen müssten beim Training also angepasst werden?
:::

::::collapsible{title="Tipp 1: Reihenfolge"}

Rechne **schichtweise**: erst beide verdeckten Neuronen vollständig (Summe, dann ReLU), dann erst das Ausgabeneuron. Dessen Eingaben sind die beiden ReLU-Ausgaben, nicht die ursprünglichen Zahlen.
::::

::::collapsible{title="Tipp 2: ReLU"}

ReLU(x) = x, wenn x positiv ist, sonst 0. Vergiss den Bias nicht — er wird **addiert**, bevor ReLU angewendet wird.
::::

:::protect{password="ai-4-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Eingabe (2,0 | 1,0):

| Schritt | Rechnung | Ergebnis |
| --- | --- | --- |
| verdeckt 0, Summe | 0,5 + 1,0 · 2,0 + (−1,0) · 1,0 | 1,5 |
| verdeckt 0, ReLU | ReLU(1,5) | **1,5** |
| verdeckt 1, Summe | −1,0 + 0,5 · 2,0 + 0,5 · 1,0 | 0,5 |
| verdeckt 1, ReLU | ReLU(0,5) | **0,5** |
| Ausgabe, Summe | 0,0 + 2,0 · 1,5 + (−1,0) · 0,5 | 2,5 |
| Ausgabe, ReLU | ReLU(2,5) | **2,5** |

b) Eingabe (0,0 | 3,0):

| Schritt | Rechnung | Ergebnis |
| --- | --- | --- |
| verdeckt 0, Summe | 0,5 + 0 + (−1,0) · 3,0 | −2,5 |
| verdeckt 0, ReLU | ReLU(−2,5) | **0** |
| verdeckt 1, Summe | −1,0 + 0 + 0,5 · 3,0 | 0,5 |
| verdeckt 1, ReLU | ReLU(0,5) | **0,5** |
| Ausgabe, Summe | 0,0 + 2,0 · 0 + (−1,0) · 0,5 | −0,5 |
| Ausgabe, ReLU | ReLU(−0,5) | **0** |

c) Bei der Eingabe (0,0 | 3,0) ist **verdecktes Neuron 0** abgeschaltet: Seine Summe ist negativ, ReLU macht daraus glatt 0. Damit trägt es zur Ausgabe überhaupt nichts mehr bei — das Ausgabeneuron sieht nur noch das zweite verdeckte Neuron. Weil dessen Gewicht negativ ist, wird auch die Ausgabe negativ und von ReLU ebenfalls auf 0 gesetzt. Das Netz gibt 0 aus. Genau so entstehen in großen Netzen mit ReLU „tote" Neuronen, die für bestimmte Eingaben gar nicht mitrechnen.

d) Jedes verdeckte Neuron hat 2 Gewichte, das Ausgabeneuron ebenfalls 2 — zusammen **6 Gewichte**. Dazu kommen **3 Bias-Werte**, einer pro Neuron. Beim Training müssten also **9 Zahlen** angepasst werden. Zum Vergleich: Ein großes Sprachmodell hat Milliarden davon.
:::

:::snippet{#aufgabe}
**Aufgabe 2: Das Netz erweitern**

Nimm das Programm aus Lektion 4.5 als Ausgangspunkt.

a) Ergänze die Klasse `Netz` um eine Methode `int anzahlGewichte()`, die zurückgibt, wie viele Gewichte und Bias-Werte das Netz insgesamt hat. Du brauchst dafür in `Schicht` und `Neuron` jeweils eine passende Hilfsmethode.

b) Baue ein zweites Netz mit der Struktur `{2, 4, 4, 1}` und lass dir für beide Netze die Anzahl ausgeben.

c) Erkläre, warum `berechne` in der Klasse `Netz` **nicht** geändert werden muss, obwohl das Netz jetzt eine Schicht mehr hat.
:::

::::collapsible{title="Tipp 1: Wo zählt man?"}

Nur das `Neuron` kennt seine Gewichte. Gib ihm eine Methode, die `gewichte.length + 1` zurückliefert (das +1 ist der Bias). `Schicht` addiert über ihre Neuronen, `Netz` über seine Schichten.
::::

::::collapsible{title="Tipp 2: zu c)"}

Schau dir die Schleife in `Netz.berechne` genau an. Woher weiß sie, wie viele Durchläufe sie machen muss?
::::

:::protect{password="ai-4-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Je eine Methode pro Klasse:

```java
// in Neuron
public int anzahlGewichte() {
    return gewichte.length + 1;   // +1 fuer den Bias
}

// in Schicht
public int anzahlGewichte() {
    int summe = 0;
    for (int i = 0; i < neuronen.length; i++) {
        summe = summe + neuronen[i].anzahlGewichte();
    }
    return summe;
}

// in Netz
public int anzahlGewichte() {
    int summe = 0;
    for (int i = 0; i < schichten.length; i++) {
        summe = summe + schichten[i].anzahlGewichte();
    }
    return summe;
}
```

Jede Klasse zählt nur, was sie selbst kennt, und fragt die darunterliegende. Genau dafür ist die 1:n-Assoziation da.

b) Im Hauptprogramm:

```java
Netz klein = new Netz(new int[]{2, 3, 1}, new Sigmoid());
Netz gross = new Netz(new int[]{2, 4, 4, 1}, new Sigmoid());
IO.println("klein: " + klein.anzahlGewichte());
IO.println("gross: " + gross.anzahlGewichte());
```

Das kleine Netz hat **13**: die verdeckte Schicht 3 · (2 + 1) = 9, die Ausgabeschicht 1 · (3 + 1) = 4.
Das große Netz hat **37**: 4 · (2 + 1) = 12, dann 4 · (4 + 1) = 20, dann 1 · (4 + 1) = 5.

Eine Schicht mehr und ein Neuron mehr pro Schicht — und die Zahl der anzupassenden Werte verdreifacht sich fast. So kommen große Netze zu ihren Milliarden Parametern.

c) Weil `berechne` über `schichten.length` läuft und nicht über eine feste Zahl:

```java
for (int i = 0; i < schichten.length; i++) {
    werte = schichten[i].berechne(werte);
}
```

Die Methode nimmt das Ergebnis der einen Schicht als Eingabe der nächsten, egal wie viele es sind. Die Struktur steht ausschließlich im Feld `pStruktur`, das dem Konstruktor übergeben wird. Genau das ist der Gewinn der objektorientierten Zerlegung: Eine tiefere Architektur kostet keine einzige Änderung am Rechenweg.
:::

<!-- KLP Q-Phase: erläutern die Grundlagen künstlicher neuronaler Netze (A):
     Neuronen, Eingabeschicht, verdeckte Schichten, Ausgabeschicht, Gewichte,
     Grundidee der Forward Propagation, Grundidee der Backpropagation -->

---

## Selbsttest

::::multievent

**1. Welche Bestandteile hat ein Neuron?** (Mehrfachauswahl)

{c1{!Gewichte}}

{c1{!Bias}}

{c1{!Aktivierungsfunktion}}

{c1{Cluster-Zuordnung}}

{h{Ein Neuron rechnet: gewichtete Summe + Bias → Aktivierungsfunktion.}}

{H{Richtig! Gewichte, Bias und eine Aktivierungsfunktion sind die Bestandteile eines Neurons.}}

**2. Was ist die Grundidee der Forward Propagation?**

{r2{!Daten fließen von der Eingabeschicht durch das Netz zur Ausgabeschicht.}}

{r2{Der Fehler wird rückwärts durch das Netz gereicht.}}

{r2{Die Trainingsdaten werden in Cluster eingeteilt.}}

{r2{Die Gewichte werden zufällig gesetzt.}}

{h{„Forward" bedeutet vorwärts — vom Eingang zum Ausgang.}}

{H{Richtig! Forward Propagation berechnet die Ausgabe des Netzes für eine Eingabe.}}

**3. Welche OO-Beziehung gilt zwischen Netz, Schicht und Neuron?**

{r3{!Netz „hat" Schichten, Schicht „hat" Neuronen — alles Assoziation (1:n).}}

{r3{Netz „ist ein" Schicht, Schicht „ist ein" Neuron — alles Vererbung.}}

{r3{Netz, Schicht und Neuron sind unabhängig voneinander.}}

{r3{Neuron „hat" Schichten, Schicht „hat" Netze.}}

{h{„Hat ein" = Assoziation, „ist ein" = Vererbung.}}

{H{Richtig! Netz hat Schichten, Schicht hat Neuronen — das sind alles 1:n-Assoziationen.}}

**4. Warum braucht das Netz eine Lernrate?**

{r4{!Sie steuert, wie stark die Gewichte bei jedem Lernschritt angepasst werden.}}

{r4{Sie bestimmt, wie viele Schichten das Netz hat.}}

{r4{Sie bestimmt die Aktivierungsfunktion.}}

{r4{Ohne Lernrate kann das Netz nicht rechnen.}}

{h{Die Lernrate ist ein Faktor bei der Gewichtsanpassung.}}

{H{Richtig! Die Lernrate steuert die Schrittgröße — zu klein: langsam, zu groß: instabil.}}

::::
