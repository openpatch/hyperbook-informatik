---
name: Nebenläufigkeit
index: 8
keywords:
  - java
  - qphase
  - lk
---

# Nebenläufigkeit

:::alert{info}
**Nur Leistungskurs.** Dieses Kapitel gehört zu den zusätzlichen Anforderungen des Leistungskurses. Im Grundkurs kannst du es überspringen.
:::

<!-- KLP QPh LK, Algorithmen: erläutern das Prinzip der Nebenläufigkeit (A) -->

## Warum überhaupt?

Alle Programme dieses Lernpfads liefen **sequenziell**: eine Anweisung nach der anderen. Das entspricht nicht mehr der Wirklichkeit heutiger Rechner.

:::snippet{#merken}
Ein moderner Prozessor hat mehrere **Kerne**. Ein sequenzielles Programm benutzt davon genau einen – der Rest steht still.

Außerdem gibt es Wartezeiten: auf eine Netzwerkantwort, auf die Festplatte, auf eine Eingabe. Während das Programm wartet, könnte es längst etwas anderes tun.
:::

:::snippet{#definition}
**Nebenläufig** heißen Abläufe, die **unabhängig voneinander** stattfinden können – deren Reihenfolge also nicht festgelegt ist.

Ein **Thread** ist ein Ausführungsstrang innerhalb eines Programms. Mehrere Threads teilen sich denselben Speicher, haben aber je einen eigenen Aufrufstapel.

**Parallel** heißen Abläufe, die tatsächlich **gleichzeitig** ausgeführt werden – dafür braucht man mehrere Kerne. Nebenläufigkeit ist die Voraussetzung für Parallelität, aber nicht dasselbe: Auf einem Kern wechselt das Betriebssystem zwischen den Threads hin und her.
:::

## Zwei Threads

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    Zaehler a = new Zaehler("A", 5);
    Zaehler b = new Zaehler("B", 5);

    Thread t1 = new Thread(a);
    Thread t2 = new Thread(b);

    t1.start();
    t2.start();

    IO.println("Das Hauptprogramm läuft weiter.");
}
```

```java Zaehler.java
/**
 * Zählt in einem eigenen Thread von 1 bis zu einer Obergrenze.
 */
public class Zaehler implements Runnable {

    private String name;
    private int bis;

    public Zaehler(String pName, int pBis) {
        name = pName;
        bis = pBis;
    }

    /** Wird ausgeführt, wenn der Thread gestartet wird. */
    public void run() {
        for (int i = 1; i <= bis; i++) {
            IO.println(name + ": " + i);
        }
    }
}
```

:::

:::snippet{#aufgabe}
a) Führe das Programm **mehrmals** aus. Ist die Ausgabe jedes Mal gleich?

b) Was bedeutet das für das Testen nebenläufiger Programme?
:::

::::collapsible{title="Auflösung"}

a) Die Ausgaben von A und B mischen sich, und die genaue Verschränkung kann sich von Lauf zu Lauf unterscheiden. Wann welcher Thread zum Zug kommt, entscheidet das Betriebssystem.

b) Nebenläufige Programme sind **nicht deterministisch**: Derselbe Eingang kann verschiedene Abläufe erzeugen. Ein Test, der einmal durchläuft, beweist damit deutlich weniger als bei einem sequenziellen Programm.

Fehler in nebenläufigen Programmen zeigen sich oft erst nach Tagen – und lassen sich dann nicht mehr nachstellen. Das macht sie zu den unangenehmsten Fehlern überhaupt.

::::

:::snippet{#merken}
Der Ablauf in Java:

1. Eine Klasse implementiert die Schnittstelle `Runnable` und damit die Methode `run()`.
2. `new Thread(objekt)` erzeugt einen Ausführungsstrang dafür.
3. `start()` startet ihn. Das Hauptprogramm läuft **sofort weiter** – es wartet nicht.

Ein häufiger Anfängerfehler: `run()` direkt aufzurufen statt `start()`. Dann läuft die Methode einfach im aufrufenden Thread, und es passiert gar nichts Nebenläufiges.
:::

## Das Kernproblem: gemeinsame Daten

:::snippet{#aufgabe}
Zwei Threads erhöhen dieselbe Zählvariable je 10 000 Mal. Am Ende sollten 20 000 dastehen.

Sage voraus, was herauskommt. Führe das Programm dann **mehrmals** aus.
:::

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    Konto k = new Konto();

    Einzahler a = new Einzahler(k, 10000);
    Einzahler b = new Einzahler(k, 10000);

    Thread t1 = new Thread(a);
    Thread t2 = new Thread(b);

    t1.start();
    t2.start();

    Thread.sleep(2000);

    IO.println("Erwartet: 20000");
    IO.println("Tatsächlich: " + k.getStand());
}
```

```java Konto.java
public class Konto {

    private int stand;

    public Konto() {
        stand = 0;
    }

    /** Erhöht den Stand um eins. */
    public void zahleEin() {
        stand = stand + 1;
    }

    public int getStand() {
        return stand;
    }
}
```

```java Einzahler.java
public class Einzahler implements Runnable {

    private Konto konto;
    private int anzahl;

    public Einzahler(Konto pKonto, int pAnzahl) {
        konto = pKonto;
        anzahl = pAnzahl;
    }

    public void run() {
        for (int i = 0; i < anzahl; i++) {
            konto.zahleEin();
        }
    }
}
```

:::

::::collapsible{title="Auflösung"}

Häufig kommt weniger als 20 000 heraus – und bei jedem Lauf etwas anderes.

Der Grund steckt in einer einzigen Zeile: `stand = stand + 1;`

Das sieht aus wie ein Schritt, sind aber **drei**:

1. den aktuellen Wert von `stand` lesen,
2. eins dazuzählen,
3. das Ergebnis zurückschreiben.

Passiert nun Folgendes:

| Zeit | Thread 1 | Thread 2 | stand |
| --- | --- | --- | --- |
| 1 | liest 100 | | 100 |
| 2 | | liest 100 | 100 |
| 3 | rechnet 101 | | 100 |
| 4 | | rechnet 101 | 100 |
| 5 | schreibt 101 | | 101 |
| 6 | | schreibt 101 | **101** |

Zwei Einzahlungen, aber nur eine ist angekommen. Eine ist **verloren gegangen**.

::::

:::snippet{#definition}
Eine solche Situation heißt **Wettlaufsituation** (englisch *race condition*): Das Ergebnis hängt davon ab, welcher Thread zufällig zuerst fertig wird.

Der Abschnitt, in dem auf gemeinsame Daten zugegriffen wird, heißt **kritischer Abschnitt**. In ihm darf immer nur ein Thread gleichzeitig sein – diese Eigenschaft nennt man **wechselseitigen Ausschluss**.
:::

## Die Lösung

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    Konto k = new Konto();

    Thread t1 = new Thread(new Einzahler(k, 10000));
    Thread t2 = new Thread(new Einzahler(k, 10000));

    t1.start();
    t2.start();

    Thread.sleep(3000);

    IO.println("Erwartet: 20000");
    IO.println("Tatsächlich: " + k.getStand());
}
```

```java Konto.java
public class Konto {

    private int stand;
    private Semaphore schloss;

    public Konto() {
        stand = 0;
        schloss = new Semaphore(1);
    }

    /**
     * Erhöht den Stand um eins.
     * Der kritische Abschnitt ist gegen gleichzeitigen Zugriff gesichert.
     */
    public void zahleEin() {
        schloss.acquire();
        stand = stand + 1;
        schloss.release();
    }

    public int getStand() {
        return stand;
    }
}
```

```java Einzahler.java
public class Einzahler implements Runnable {

    private Konto konto;
    private int anzahl;

    public Einzahler(Konto pKonto, int pAnzahl) {
        konto = pKonto;
        anzahl = pAnzahl;
    }

    public void run() {
        for (int i = 0; i < anzahl; i++) {
            konto.zahleEin();
        }
    }
}
```

:::

:::snippet{#merken}
Ein **Semaphor** ist ein Zähler mit zwei Operationen:

- `acquire()` – „ich betrete den Abschnitt“. Ist er belegt, wartet der Thread.
- `release()` – „ich bin fertig“. Ein wartender Thread darf hinein.

`new Semaphore(1)` erlaubt genau **einen** Thread gleichzeitig. Solche Semaphore heißen auch **Schloss** oder *mutex*.

Wichtig ist die Regel: **Was zwischen `acquire` und `release` steht, sollte so kurz wie möglich sein.** Je länger der kritische Abschnitt, desto mehr Zeit verbringen die anderen Threads mit Warten – und desto weniger bringt die Nebenläufigkeit.
:::

## Der Preis

:::snippet{#aufgabe}
a) Miss, wie lange die gesicherte und die ungesicherte Fassung brauchen. Was fällt auf?

b) Angenommen, du sicherst nicht nur die eine Zeile, sondern die **ganze Schleife** in `run` ab. Was wäre das Ergebnis, und was der Nachteil?

c) Nenne einen Fall, in dem zwei Threads sich **gegenseitig** blockieren.
:::

::::collapsible{title="Auflösung"}

a) Die gesicherte Fassung ist deutlich **langsamer**. Jedes `acquire` und `release` kostet Zeit, und die Threads warten regelmäßig aufeinander.

Das ist der Grundkonflikt der Nebenläufigkeit: **Korrektheit kostet Geschwindigkeit.** Wer alles absichert, ist am Ende langsamer als ein sequenzielles Programm.

b) Das Ergebnis wäre korrekt – aber die Threads liefen faktisch nacheinander. Der zweite wartete, bis der erste seine 10 000 Durchläufe fertig hat. Man hätte den ganzen Aufwand betrieben, ohne etwas zu gewinnen.

c) Ein **Verklemmung** (englisch *deadlock*): Thread 1 hält Schloss A und wartet auf B, Thread 2 hält B und wartet auf A. Beide warten für immer.

Ein Alltagsbild: Zwei Autos an einer schmalen Stelle, jedes wartet darauf, dass das andere zurücksetzt.

::::

## Nebenläufigkeit, die du längst benutzt hast

:::snippet{#merken}
Jedes Scratch-for-Java-Programm dieses Lernpfads war nebenläufig – nur hat die Bibliothek dir die Arbeit abgenommen.

Die Methode `run()` **jedes** Sprites wird etwa 60-mal pro Sekunde aufgerufen. Aus Sicht der Programmierung laufen alle Figuren gleichzeitig: Der Spieler bewegt sich, die Gegner bewegen sich, die Münzen drehen sich.

Die Bibliothek sorgt dafür, dass diese Aufrufe sich nicht in die Quere kommen. Deshalb konntest du `run()` schreiben, ohne je über Semaphore nachzudenken.

Das ist ein verbreitetes Muster: Nebenläufigkeit wird in eine Bibliothek oder einen Rahmen verpackt, und die Anwendung bleibt einfach.
:::

## Aufgabe: Beurteilen

:::snippet{#aufgabe}
Entscheide für jede Situation, ob Nebenläufigkeit sinnvoll ist. Begründe.

a) Ein Programm sortiert ein Feld mit 20 Werten.

b) Eine Anwendung lädt beim Start Daten aus dem Netz und soll dabei bedienbar bleiben.

c) Ein Programm berechnet für 10 000 Bilder unabhängig voneinander die Helligkeit.

d) Ein Programm berechnet die Fibonacci-Folge, bei der jeder Wert von den beiden vorherigen abhängt.

e) Mehrere Kassen buchen auf dasselbe Lagerbestandskonto.
:::

::textinput{placeholder="a) ... b) ... c) ... d) ... e) ..."}

::::collapsible{title="Auflösung"}

a) **Nein.** Bei 20 Werten kostet die Verwaltung der Threads mehr als die Sortierung.

b) **Ja.** Das Laden gehört in einen eigenen Thread, damit die Oberfläche nicht einfriert. Das ist der häufigste Einsatzzweck überhaupt.

c) **Ja, ideal.** Die 10 000 Berechnungen sind vollständig unabhängig – es gibt keine gemeinsamen Daten und damit kein Sicherungsproblem. Auf acht Kernen wird es fast achtmal so schnell.

d) **Nein.** Jeder Wert braucht die beiden vorherigen. Die Abhängigkeit erzwingt die Reihenfolge – hier ist nichts nebenläufig.

e) **Ja, aber mit Absicherung.** Genau der Fall aus dem Beispiel oben. Ohne wechselseitigen Ausschluss gehen Buchungen verloren.

**Die Faustregel:** Nebenläufigkeit lohnt sich, wenn die Teilaufgaben **unabhängig** sind. Sobald sie sich gemeinsame Daten teilen, kommt der Aufwand für die Absicherung dazu – und mit ihm eine ganze Klasse schwer zu findender Fehler.

::::

## Zusatzaufgabe

:::snippet{#brain}
Das **Erzeuger-Verbraucher-Problem**: Ein Thread erzeugt Daten und legt sie in einen Puffer, ein anderer nimmt sie heraus und verarbeitet sie.

a) Welche zwei Situationen müssen abgesichert werden? Denk an einen vollen und an einen leeren Puffer.

b) Setze es mit deiner Schlange aus dem Kapitel über lineare Datenstrukturen um.

c) Was passiert ohne Absicherung? Baue es absichtlich falsch und beobachte.

d) Beurteile: Ab welcher Puffergröße bringt die Nebenläufigkeit einen messbaren Gewinn?
:::

---

## Selbsttest

::::multievent

**1. Was unterscheidet nebenläufig von parallel?**

{r1{nichts, es ist dasselbe}}

{r1{!nebenläufig heißt in unbestimmter Reihenfolge, parallel heißt tatsächlich gleichzeitig}}

{r1{parallel bezieht sich nur auf Netzwerke}}

{h{Auf einem einzigen Kern kann man nebenläufig, aber nicht parallel arbeiten.}}
{H{Richtig!}}

**2. Warum ist die Erhöhung einer Variablen um eins nicht sicher?**

{r2{weil sie zu lange dauert}}

{r2{!weil sie aus drei Schritten besteht, zwischen denen ein anderer Thread eingreifen kann}}

{r2{weil Java Zahlen nicht sperren kann}}

{h{Lesen, rechnen, schreiben.}}
{H{Richtig! Zwischen Lesen und Schreiben kann ein anderer Thread denselben alten Wert lesen.}}

**3. Wie heißt die Situation, in der das Ergebnis von der zufälligen Reihenfolge abhängt?**

{r3{Verklemmung}}

{r3{!Wettlaufsituation}}

{r3{kritischer Abschnitt}}

{h{Die Threads wetteifern darum, wer zuerst fertig wird.}}
{H{Richtig!}}

**4. Welche Aussagen über Semaphore stimmen?** (Mehrfachauswahl)

{c1{!Sie sichern einen kritischen Abschnitt ab.}}

{c1{!Ein Semaphor mit dem Wert 1 lässt genau einen Thread hinein.}}

{c1{!Der abgesicherte Abschnitt sollte möglichst kurz sein.}}

{c1{Sie machen das Programm schneller.}}

{h{Absicherung kostet immer Zeit.}}
{H{Richtig! Korrektheit kostet Geschwindigkeit.}}

**5. Wann lohnt sich Nebenläufigkeit besonders?**

{r4{wenn die Teilaufgaben aufeinander aufbauen}}

{r4{!wenn die Teilaufgaben unabhängig voneinander sind}}

{r4{wenn die Datenmenge klein ist}}

{h{Denk an die 10000 unabhängigen Bilder.}}
{H{Richtig! Ohne gemeinsame Daten gibt es auch kein Sicherungsproblem.}}

::::
