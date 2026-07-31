---
title: Wie schnell ist das?
index: 6
---

# Wie schnell ist das?

Du hast dreimal gehört, ein Verfahren sei „quadratisch“. Jetzt prüfen wir das nach – auf vier verschiedene Arten. Das ist Absicht: Jede Zugangsweise zeigt etwas anderes, und keine allein reicht.

## Zugang 1: Nachrechnen

Das haben wir schon getan. Sortieren durch Auswählen macht

$$\frac{n \cdot (n-1)}{2} = \frac{n^2}{2} - \frac{n}{2}$$

Vergleiche. Für große `n` fällt der zweite Summand kaum ins Gewicht – bei n = 1000 stehen 500 000 gegen 500.

:::snippet{#merken}
Bei Laufzeitbetrachtungen interessiert nur, **wie schnell der Aufwand wächst**, nicht der exakte Wert. Deshalb lässt man Vorfaktoren und kleinere Summanden weg und sagt: der Aufwand wächst wie n².
:::

## Zugang 2: Ein Bild

Zeichne ein Quadrat aus n mal n Kästchen. Die Vergleiche von Sortieren durch Auswählen sind genau die Kästchen **unterhalb der Diagonalen**:

```
      j: 0  1  2  3  4
i: 0     .  x  x  x  x
i: 1     .  .  x  x  x
i: 2     .  .  .  x  x
i: 3     .  .  .  .  x
i: 4     .  .  .  .  .
```

Zehn Kreuze bei n = 5 – genau die Zahl, die wir ausgerechnet haben. Und man sieht sofort: Es ist ungefähr die **halbe Fläche** des Quadrats. Wächst die Seitenlänge auf das Doppelte, wächst die Fläche auf das Vierfache.

## Zugang 3: Messen

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    IO.println("      n | Vergleiche |   Dauer in ms");
    IO.println("--------|------------|--------------");

    messe(1000);
    messe(2000);
    messe(4000);
    messe(8000);
}

/** Sortiert ein Zufallsfeld der Größe pN und gibt die Messwerte aus. */
void messe(int pN) {
    int[] werte = zufallsfeld(pN);

    long start = System.nanoTime();
    long vergleiche = sortiereUndZaehle(werte);
    long ende = System.nanoTime();

    IO.println(pN + " | " + vergleiche + " | " + (ende - start) / 1000000);
}

/** Erzeugt ein Feld mit pAnzahl Zufallszahlen. */
int[] zufallsfeld(int pAnzahl) {
    int[] feld = new int[pAnzahl];
    for (int i = 0; i < feld.length; i++) {
        feld[i] = Random.randint(1, 100000);
    }
    return feld;
}

/** Sortiert durch Auswählen und liefert die Anzahl der Vergleiche. */
long sortiereUndZaehle(int[] pWerte) {
    long vergleiche = 0;

    for (int i = 0; i < pWerte.length - 1; i++) {
        int kleinstesIndex = i;
        for (int j = i + 1; j < pWerte.length; j++) {
            vergleiche++;
            if (pWerte[j] < pWerte[kleinstesIndex]) {
                kleinstesIndex = j;
            }
        }
        int merker = pWerte[i];
        pWerte[i] = pWerte[kleinstesIndex];
        pWerte[kleinstesIndex] = merker;
    }
    return vergleiche;
}
```

:::

:::snippet{#aufgabe}
a) Führe das Programm aus und trage die Werte in eine Tabelle ein.

b) Berechne für jede Zeile den **Faktor** zur Zeile darüber – sowohl bei den Vergleichen als auch bei der Dauer. Was erwartest du, was misst du?

c) Führe das Programm **mehrfach** aus. Schwanken die Zeiten? Schwanken die Vergleiche? Erkläre den Unterschied.
:::

::::collapsible{title="Auflösung"}

b) Bei jeder Verdopplung von n sollte sich die Anzahl der Vergleiche **vervierfachen**. Das tut sie sehr genau – die Formel n·(n−1)/2 gilt exakt.

Bei den Zeiten sieht man denselben Trend, aber ungenauer. Der Faktor liegt meist zwischen 3 und 5.

c) Die **Vergleiche schwanken nicht**: Sortieren durch Auswählen macht immer gleich viele, unabhängig von den Daten. Die **Zeiten schwanken** – der Browser macht nebenher anderes, die Zwischenspeicher des Rechners sind mal besser gefüllt, mal schlechter.

Genau deshalb zählt man in der Informatik Operationen und misst nicht Sekunden. Die Messung bestätigt die Rechnung, sie ersetzt sie nicht.

::::

## Zugang 4: Die Klassen im Überblick

:::snippet{#merken}
| Wachstum | Name | wenn n sich verdoppelt … | Beispiel |
| --- | --- | --- | --- |
| konstant | konstant | ändert sich nichts | auf `feld[0]` zugreifen |
| log n | logarithmisch | kommt **ein** Schritt dazu | Goldmünzen halbieren |
| n | linear | verdoppelt sich der Aufwand | lineare Suche |
| n² | quadratisch | vervierfacht sich der Aufwand | die drei Sortierverfahren |
| n³ | kubisch | verachtfacht sich der Aufwand | Matrizen multiplizieren |
| 2ⁿ | exponentiell | **quadriert** sich der Aufwand | alle Teilmengen durchprobieren |

Die Namen kennst du aus dem Matheunterricht – es sind dieselben Funktionsklassen.
:::

:::snippet{#aufgabe}
Ein Verfahren braucht bei n = 1000 genau eine Sekunde. Wie lange braucht es bei n = 1 000 000?

Rechne es für jede der Klassen aus. Das Ergebnis für den exponentiellen Fall solltest du dir merken.
:::

::::collapsible{title="Auflösung"}

Die Anzahl wächst um den Faktor 1000.

| Klasse | Dauer bei n = 1 000 000 |
| --- | --- |
| logarithmisch | etwa 2 Sekunden |
| linear | etwa 17 Minuten |
| quadratisch | etwa 11,6 Tage |
| kubisch | etwa 32 000 Jahre |
| exponentiell | unvorstellbar lange – mehr als es Atome im Universum gibt |

Der Sprung von quadratisch zu kubisch ist gewaltig. Der Sprung zu exponentiell ist eine andere Kategorie: Solche Verfahren sind für große Eingaben **prinzipiell** unbrauchbar, egal wie schnell die Rechner werden.

Deshalb ist die Frage nach dem Aufwand keine akademische Spielerei. Sie entscheidet, ob ein Problem überhaupt lösbar ist.

::::

## Aufgabe 1: Verfahren einordnen

:::snippet{#aufgabe}
Ordne jedes der folgenden Verfahren einer Wachstumsklasse zu und begründe kurz.

a) Das Maximum eines Feldes bestimmen

b) Prüfen, ob ein Feld ein Duplikat enthält, indem man jedes Element mit jedem vergleicht

c) Die gefälschte Goldmünze durch Halbieren finden

d) Auf den ersten Wert eines Feldes zugreifen

e) Ein Feld mit Bubblesort sortieren, wenn es schon sortiert ist
:::

::textinput{placeholder="a) ... b) ... c) ... d) ... e) ..."}

::::collapsible{title="Auflösung"}

a) **linear** – ein Durchlauf über alle Elemente.

b) **quadratisch** – für jedes Element ein Durchlauf über alle anderen.

c) **logarithmisch** – bei jeder Verdopplung der Münzzahl kommt eine Wägung dazu.

d) **konstant** – der Zugriff dauert immer gleich lang, egal wie groß das Feld ist.

e) **linear** – ein einziger Durchlauf stellt fest, dass nichts zu tun ist.

::::

## Aufgabe 2: Die drei Verfahren messen

:::snippet{#aufgabe}
Baue die Messung so um, dass sie alle **drei** Sortierverfahren auf demselben Zufallsfeld vergleicht.

Achte darauf, dass jedes Verfahren dieselben Ausgangsdaten bekommt – ein sortiertes Feld noch einmal zu sortieren, wäre kein fairer Vergleich. Du brauchst also eine **Kopie**.

a) Vergleiche die gemessenen Zeiten bei n = 4000.

b) Wiederhole die Messung mit einem **bereits sortierten** Feld. Was ändert sich, und warum?

c) Beurteile: Welches Verfahren würdest du wofür empfehlen?
:::

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    int[] original = zufallsfeld(4000);

    // Dein Code hier: für jedes Verfahren eine Kopie anlegen,
    // sortieren, Zeit messen und ausgeben.

}

/** Erzeugt ein Feld mit pAnzahl Zufallszahlen. */
int[] zufallsfeld(int pAnzahl) {
    int[] feld = new int[pAnzahl];
    for (int i = 0; i < feld.length; i++) {
        feld[i] = Random.randint(1, 100000);
    }
    return feld;
}

/** Liefert eine unabhängige Kopie des Feldes. */
int[] kopie(int[] pWerte) {
    int[] neu = new int[pWerte.length];
    for (int i = 0; i < pWerte.length; i++) {
        neu[i] = pWerte[i];
    }
    return neu;
}
```

:::

::::collapsible{title="Tipp: Warum braucht man überhaupt eine Kopie?"}

Weil ein Feld ein **Objekttyp** ist. Übergibst du dasselbe Feld an drei Methoden, sortiert die erste es – und die anderen beiden bekommen bereits sortierte Daten.

Das hast du in Kapitel 5 schon einmal beobachtet, als `tausche` das Feld des Aufrufers verändert hat.

::::

:::protect{password="java-ef-7-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Ein möglicher Aufbau des Hauptprogramms:

```java Main.java
void main() {
    int[] original = zufallsfeld(4000);

    int[] a = kopie(original);
    long start = System.nanoTime();
    sortiereDurchAuswaehlen(a);
    IO.println("Auswählen: " + (System.nanoTime() - start) / 1000000 + " ms");

    int[] b = kopie(original);
    start = System.nanoTime();
    bubblesort(b);
    IO.println("Bubblesort: " + (System.nanoTime() - start) / 1000000 + " ms");

    int[] c = kopie(original);
    start = System.nanoTime();
    sortiereDurchEinfuegen(c);
    IO.println("Einfügen: " + (System.nanoTime() - start) / 1000000 + " ms");
}
```

Zu den Beobachtungen:

**a)** Bei Zufallsdaten liegen alle drei in derselben Größenordnung. Bubblesort ist meist am langsamsten, weil es die meisten Vertauschungen macht.

**b)** Bei einem bereits sortierten Feld werden Bubblesort und Einfügen **schlagartig** schnell – beide erkennen die Sortierung und brauchen nur einen linearen Durchlauf. Sortieren durch Auswählen bleibt genauso langsam wie vorher.

**c)** Eine vertretbare Empfehlung:

- **Fast sortierte Daten** → Einfügen. Es ist dann linear und schiebt nur, wo nötig.
- **Teure Vertauschungen** (große Objekte, langsamer Speicher) → Auswählen. Es macht garantiert höchstens n − 1 davon.
- **Große Datenmengen** → keines der drei. Dafür braucht man die Verfahren aus dem Lernpfad *Erweiterungen*.

:::

## Zusatzaufgabe

:::snippet{#brain}
Bei den Messungen oben hast du nur einen einzigen Wert je Größe erhoben. Das ist wissenschaftlich unsauber.

a) Erweitere das Programm so, dass es jede Messung **zehnmal** wiederholt und den Mittelwert ausgibt.

b) Gib zusätzlich den kleinsten und den größten gemessenen Wert aus. Wie stark schwanken die Messungen?

c) Beurteile: Welche der vier Zugangsweisen aus dieser Lektion ist die verlässlichste? Begründe – und überlege, warum man trotzdem alle vier kennen sollte.
:::

---

## Selbsttest

::::multievent

**1. Warum lässt man bei Laufzeitbetrachtungen Vorfaktoren und kleinere Summanden weg?**

{r1{weil sie zu schwer zu berechnen sind}}

{r1{!weil nur zählt, wie schnell der Aufwand wächst}}

{r1{weil sie immer null sind}}

{h{Bei n gleich 1000 stehen 500000 gegen 500.}}
{H{Richtig!}}

**2. Was passiert bei einem quadratischen Verfahren, wenn sich die Datenmenge verzehnfacht?**

{r2{der Aufwand verzehnfacht sich}}

{r2{!der Aufwand wird hundertmal so groß}}

{r2{der Aufwand verdoppelt sich}}

{h{Zehn zum Quadrat.}}
{H{Richtig!}}

**3. Welche Aussagen über das Messen von Laufzeiten stimmen?** (Mehrfachauswahl)

{c1{!Gemessene Zeiten schwanken von Durchlauf zu Durchlauf.}}

{c1{!Die Anzahl der Vergleiche schwankt beim Sortieren durch Auswählen nicht.}}

{c1{!Messungen bestätigen die Rechnung, ersetzen sie aber nicht.}}

{c1{Gemessene Zeiten sind aussagekräftiger als gezählte Operationen.}}

{h{Gemessene Zeiten hängen vom Rechner und von der Umgebung ab.}}
{H{Richtig!}}

**4. Welche Wachstumsklasse hat die lineare Suche?**

{r3{konstant}}

{r3{logarithmisch}}

{r3{!linear}}

{r3{quadratisch}}

{h{Der Name verrät es.}}
{H{Richtig!}}

**5. Warum sind exponentielle Verfahren für große Eingaben prinzipiell unbrauchbar?**

{r4{weil sie zu viel Speicher brauchen}}

{r4{!weil der Aufwand so schnell wächst, dass auch viel schnellere Rechner nicht helfen}}

{r4{weil sie falsche Ergebnisse liefern}}

{h{Denk an das Ergebnis der Rechnung für n gleich einer Million.}}
{H{Richtig!}}

::::
