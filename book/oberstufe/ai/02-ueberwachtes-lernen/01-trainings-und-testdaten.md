---
title: Trainings- und Testdaten
index: 1
permaid: ai-trainings-testdaten
---

# Trainings- und Testdaten

Ein KI-System soll auf **neue** Daten gut reagieren, nicht nur auf die, die es schon kennt. Deshalb teilt man seine Daten in zwei Gruppen: **:t[Trainingsdaten]{#trainingsdaten}**, an denen es lernt, und **:t[Testdaten]{#testdaten}**, an denen man prüft, ob es wirklich gelernt hat.

## Warum aufteilen?

Stell dir vor, du lernst für eine Mathearbeit, indem du alle 20 Übungsaufgaben auswendig lernst — jede Zahl, jeden Schritt. In der Arbeit kommen genau diese 20 Aufgaben. Du schreibst eine 1. Aber kommst du zurecht, wenn die Aufgaben andere Zahlen haben? Das Auswendiglernen hat dich nicht auf neue Aufgaben vorbereitet.

Genau das passiert einem KI-System, das auf denselben Daten trainiert und getestet wird, auf denen es trainiert wurde. Es hat die Antworten „auswendig gelernt" und sieht gut aus — bis es neue Daten sieht.

:::snippet{#definition}
**Trainingsdaten** sind die Daten, an denen das KI-System lernt. Jeder Datensatz trägt ein Etikett (Label) mit der richtigen Antwort.

**Testdaten** sind separate Daten, die das System **nicht** beim Training gesehen hat. Sie werden verwendet, um zu prüfen, ob das System verallgemeinert hat — also auch auf unbekannte Daten die richtigen Antworten gibt.
:::

:::snippet{#merken}
Trainiert und testet man auf denselben Daten, misst man **Auswendiglernen**, nicht **Verallgemeinerung**. Die Trefferquote wäre irreführend hoch. Erst die Trefferquote auf ungesehenen Testdaten sagt, wie gut das System wirklich ist.
:::

## Die Aufteilung in der Praxis

Typischerweise teilt man die Daten so:

- **Trainingsdaten:** ca. 80 % der Daten
- **Testdaten:** ca. 20 % der Daten

Die Testdaten werden beim Training **nicht** verwendet. Erst wenn das Modell fertig ist, testet man einmal mit den Testdaten und notiert die Trefferquote.

## Eine Datenpunkt-Klasse

Wir brauchen zuerst eine Klasse für einen einzelnen Datenpunkt. Jeder Datenpunkt hat **Merkmale** (hier: zwei Zahlen, z.B. Gewicht und Süßigkeit einer Frucht) und ein **Label** (z.B. „Apfel" oder „Birne").

:::onlineide{height="500px" speed="1000000"}

```java Main.java
void main() {
    Datenpunkt apfel1 = new Datenpunkt(150, 7, "Apfel");
    Datenpunkt apfel2 = new Datenpunkt(180, 8, "Apfel");
    Datenpunkt birne1 = new Datenpunkt(120, 4, "Birne");
    Datenpunkt birne2 = new Datenpunkt(100, 3, "Birne");

    apfel1.schreibe();
    apfel2.schreibe();
    birne1.schreibe();
    birne2.schreibe();
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

    public void schreibe() {
        IO.println(gewicht + " g, Süßigkeit " + suessigkeit + " → " + label);
    }
}
```

:::

:::snippet{#aufgabe}
a) Ergänze das Programm um einen dritten Apfel (200 g, Süßigkeit 6) und eine dritte Birne (110 g, Süßigkeit 5). Gib alle sechs Punkte aus.

b) Was passiert, wenn du die Reihenfolge der Konstruktorparameter vertauschst — z.B. `new Datenpunkt("Apfel", 150, 7)`? Überlege zuerst, dann probiere es aus.
:::

::::collapsible{title="Tipp zu b)"}

Der Konstruktor erwartet drei Parameter in der Reihenfolge `double, double, String`. Wenn du als erstes Argument einen String übergibst, passt das nicht zum Typ `double`. Die Online-IDE meldet einen Fehler.
::::

:::protect{password="ai-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    Datenpunkt apfel1 = new Datenpunkt(150, 7, "Apfel");
    Datenpunkt apfel2 = new Datenpunkt(180, 8, "Apfel");
    Datenpunkt apfel3 = new Datenpunkt(200, 6, "Apfel");
    Datenpunkt birne1 = new Datenpunkt(120, 4, "Birne");
    Datenpunkt birne2 = new Datenpunkt(100, 3, "Birne");
    Datenpunkt birne3 = new Datenpunkt(110, 5, "Birne");

    apfel1.schreibe();
    apfel2.schreibe();
    apfel3.schreibe();
    birne1.schreibe();
    birne2.schreibe();
    birne3.schreibe();
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

    public void schreibe() {
        IO.println(gewicht + " g, Süßigkeit " + suessigkeit + " → " + label);
    }
}
```

Zu b): Die Typen stimmen nicht überein — `String` kann nicht als `double` übergeben werden. Die Online-IDE meldet einen Typfehler.
:::

<!-- KLP EF: erläutern den Unterschied von Trainings- und Testdaten (A) -->

---

## Selbsttest

::::multievent

**1. Warum teilt man Daten in Trainings- und Testdaten auf?**

{r1{!Um zu prüfen, ob das System verallgemeinert und nicht nur auswendig gelernt hat.}}

{r1{Weil man mehr Daten braucht.}}

{r1{Weil der KLP es vorschreibt.}}

{r1{Damit das Training schneller ist.}}

{h{Wenn man auf denselben Daten testet, auf denen man trainiert hat, misst man Auswendiglernen.}}

{H{Richtig! Die Testdaten prüfen, ob das System auf ungesehene Daten generalisiert.}}

**2. Welcher Anteil ist typisch für Trainingsdaten?**

{r2{!Etwa 80 %}}

{r2{Etwa 20 %}}

{r2{Etwa 50 %}}

{r2{100 % — man testet auf denselben Daten}}

{h{Der größere Teil trainiert, der kleinere testet.}}

{H{Richtig! Typischerweise 80 % Training, 20 % Test.}}

**3. Ergänze: Ein {t{Label}} ist das Etikett, das die richtige Antwort für einen Trainingsdatensatz angibt.**

{h{Es ist der Begriff aus dem überwachten Lernen für die „richtige Antwort".}}

{H{Richtig! Das Label sagt dem System, was die richtige Ausgabe ist.}}

::::
