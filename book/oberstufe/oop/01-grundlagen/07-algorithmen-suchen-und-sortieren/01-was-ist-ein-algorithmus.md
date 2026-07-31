---
title: Was ist ein Algorithmus?
index: 1
---

# Was ist ein Algorithmus?

Du hast in diesem Lernpfad längst Algorithmen geschrieben – die Maximumsuche, den Palindromtest, den euklidischen Algorithmus. Jetzt klären wir, was ein Algorithmus eigentlich ist. Und vor allem: was **keiner** ist.

## Vier Beispiele

:::snippet{#aufgabe}
Lies die vier Handlungsanweisungen. Entscheide bei jeder, ob sie sich einem Rechner übergeben ließe. Begründe.

**A – Spielkarten sortieren**
> Gegeben sind drei Karten mit den Werten a, b, c.
> Wenn a größer als b ist, vertausche a und b.
> Wenn b größer als c ist, vertausche b und c.
> Wenn a größer als b ist, vertausche a und b.

**B – Tee kochen**
> Setze etwas Wasser auf. Warte, bis es heiß genug ist.
> Gib den Tee dazu und lass ihn eine Weile ziehen.

**C – Wurzel einschachteln**
> Gesucht ist die Wurzel aus x.
> Starte mit dem Intervall von 0 bis x.
> Halbiere das Intervall und behalte die Hälfte, in der die Wurzel liegt.
> Wiederhole das, bis das Intervall kürzer als 0,001 ist.

**D – Kreisquadratur**
> Zeichne mit Zirkel und Lineal ein Quadrat, das denselben Flächeninhalt hat wie ein gegebener Kreis.
:::

::::collapsible{title="Auflösung"}

**A** ist ein Algorithmus. Jeder Schritt ist eindeutig, es sind endlich viele, und jeder ist ausführbar.

**B** ist keiner: „etwas Wasser“, „heiß genug“, „eine Weile“ – nichts davon ist **eindeutig**. Zwei Menschen kämen zu verschiedenen Ergebnissen.

**C** ist einer. Er ist eindeutig, jeder Schritt ist ausführbar, und er **endet**, weil sich die Intervalllänge in jedem Schritt halbiert und irgendwann unter 0,001 fällt.

Hätte die Abbruchbedingung „bis das Intervall die Länge 0 hat“ gelautet, wäre es **kein** Algorithmus mehr – er würde nie enden.

**D** ist keiner. Die Quadratur des Kreises ist mit Zirkel und Lineal beweisbar **nicht ausführbar**.

::::

## Die Definition

:::snippet{#definition}
Ein **Algorithmus** ist eine eindeutige und endliche Beschreibung von in endlicher Zeit ausführbaren Handlungsschritten zur Lösung einer Klasse von Problemen.
:::

:::snippet{#merken}
Vier Eigenschaften muss ein Algorithmus haben:

| Eigenschaft | bedeutet | Gegenbeispiel |
| --- | --- | --- |
| **Eindeutigkeit** | Jeder Schritt ist unmissverständlich. | „lass es eine Weile ziehen“ |
| **Endlichkeit** | Die Beschreibung ist endlich lang **und** endet nach endlich vielen Schritten. | „wiederhole, bis das Intervall die Länge 0 hat“ |
| **Ausführbarkeit** | Jeder Schritt ist tatsächlich durchführbar. | „quadriere den Kreis“ |
| **Ein- und Ausgabe** | Es ist klar, was hineingeht und was herauskommt. | „mach irgendwas mit den Zahlen“ |

Der Zusatz „einer **Klasse** von Problemen“ ist wichtig: Ein Algorithmus löst nicht ein einzelnes Problem, sondern alle Probleme derselben Bauart – die Maximumsuche funktioniert für jedes Feld, nicht nur für ein bestimmtes.
:::

## Sauber formulieren

:::snippet{#aufgabe}
Drei Schülerinnen sollen den Kartensortier-Algorithmus in Worten formulieren. Beurteile jede Fassung.

**Fassung 1**
> Man schaut sich die Karten an und legt sie in die richtige Reihenfolge.

**Fassung 2**
> Vergleiche die erste mit der zweiten Karte, tausche wenn nötig. Vergleiche die zweite mit der dritten, tausche wenn nötig. Fertig.

**Fassung 3**
> Vergleiche die erste mit der zweiten Karte und tausche sie, falls die erste größer ist. Vergleiche dann die zweite mit der dritten und tausche sie, falls die zweite größer ist. Vergleiche zum Schluss noch einmal die erste mit der zweiten und tausche sie, falls die erste größer ist.
:::

::::collapsible{title="Auflösung"}

**Fassung 1** ist keine Handlungsanweisung, sondern eine Beschreibung des Ziels. Sie sagt nicht, *wie* man dorthin kommt. Nicht eindeutig.

**Fassung 2** ist eindeutig, aber **falsch**. Probiere sie mit den Karten 3, 1, 2 aus: Nach dem ersten Tausch liegt 1, 3, 2, nach dem zweiten 1, 2, 3 – das klappt. Jetzt 3, 2, 1: Nach dem ersten Tausch 2, 3, 1, nach dem zweiten 2, 1, 3. Falsch.

**Fassung 3** ist eindeutig und korrekt. Der dritte Vergleich ist genau der, der in Fassung 2 fehlt.

Merke: **Eindeutig heißt nicht richtig.** Ein Algorithmus kann sauber formuliert und trotzdem falsch sein. Deshalb testet man ihn – am besten zuerst mit Papier und Karten.

::::

## Drei Darstellungsformen

Denselben Algorithmus kannst du auf drei Arten aufschreiben – und du solltest zwischen ihnen wechseln können.

<!-- KLP EF, übergeordnet DI: stellen in informatischen Zusammenhängen Daten, Beziehungen und Abläufe in unterschiedlichen Darstellungen (textuell, grafisch) dar -->

**Als Pseudocode** – sprachlich, aber strukturiert:

```
gegeben: Feld werte
maximum ← werte[0]
für jeden Index i von 1 bis werte.length - 1
    wenn werte[i] > maximum dann
        maximum ← werte[i]
gib maximum zurück
```

**Als Struktogramm** – grafisch:

```
┌──────────────────────────────────────────┐
│ maximum ← werte[0]                       │
├──────────────────────────────────────────┤
│ für i von 1 bis werte.length - 1         │
│ ┌────────────────────────────────────┐   │
│ │        werte[i] > maximum          │   │
│ │     ja   ╱──────────╲   nein       │   │
│ ├─────────────────────┬──────────────┤   │
│ │ maximum ← werte[i]  │      ∅       │   │
│ └─────────────────────┴──────────────┘   │
├──────────────────────────────────────────┤
│ gib maximum zurück                       │
└──────────────────────────────────────────┘
```

**Als Java-Programm** – ausführbar:

:::onlineide{height="480px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {40, 60, 20, 100, 80};
    IO.println("Maximum: " + maximum(werte));
}

/**
 * Liefert den größten Wert eines nichtleeren Feldes.
 * @param pWerte das zu durchsuchende Feld
 * @return der größte enthaltene Wert
 */
int maximum(int[] pWerte) {
    int maximum = pWerte[0];
    for (int i = 1; i < pWerte.length; i++) {
        if (pWerte[i] > maximum) {
            maximum = pWerte[i];
        }
    }
    return maximum;
}
```

:::

:::snippet{#merken}
Pseudocode steht zwischen Sprache und Programm. Er ist nicht an eine Programmiersprache gebunden und lässt Nebensächlichkeiten weg – gerade richtig, um einen Algorithmus zu **besprechen**, bevor man ihn umsetzt.

Eine feste Syntax gibt es nicht. Verbreitet sind der Zuweisungspfeil `←` und die Einrückung statt geschweifter Klammern.
:::

## Aufgabe 1: Die gefälschte Münze

:::snippet{#aufgabe}
Vor dir liegen **acht** gleich aussehende Goldmünzen. Genau eine davon ist eine Fälschung: Sie ist **leichter** als die anderen. Du hast eine Balkenwaage.

a) Entwickle einen Algorithmus, der die Fälschung findet. Notiere ihn als **Pseudocode**.

b) Wie viele Wägungen braucht dein Algorithmus im schlimmsten Fall?

c) Geht es auch mit weniger?
:::

::textinput{placeholder="a) Pseudocode ... b) Wägungen: ... c) ..."}

::::collapsible{title="Tipp 1: Die naive Idee"}

Lege je eine Münze links und rechts auf und vergleiche. Wie viele Wägungen brauchst du damit im schlimmsten Fall?

::::

::::collapsible{title="Tipp 2: Die bessere Idee"}

Du musst nicht einzeln wiegen. Was passiert, wenn du **vier gegen vier** legst?

::::

::::collapsible{title="Auflösung"}

**Der naive Algorithmus** vergleicht paarweise: 1 gegen 2, 3 gegen 4, 5 gegen 6. Im schlimmsten Fall braucht er drei Wägungen (danach weiß er, dass 7 oder 8 die Fälschung ist, und braucht eine vierte).

**Der bessere Algorithmus** halbiert:

```
solange mehr als eine Münze übrig ist
    teile den Stapel in zwei gleich große Hälften
    lege beide Hälften auf die Waage
    wenn eine Seite leichter ist
        behalte diese Hälfte
    sonst
        behalte irgendeine Hälfte (bei ungerader Anzahl: die übrige Münze prüfen)
gib die verbliebene Münze aus
```

8 → 4 → 2 → 1: **drei Wägungen**, garantiert.

Bei 16 Münzen wären es vier, bei 1024 Münzen zehn. Bei jeder Verdopplung kommt genau **eine** Wägung dazu. Dieses Prinzip heißt **Teilen und Herrschen** – im Lernpfad *Erweiterungen* siehst du es wieder, dort bei der binären Suche.

::::

## Aufgabe 2: Vom Pseudocode zum Programm

:::snippet{#aufgabe}
Gegeben ist folgender Pseudocode:

```
gegeben: Feld werte
anzahl ← 0
summe ← 0
für jeden Index i von 0 bis werte.length - 1
    wenn werte[i] gerade ist dann
        anzahl ← anzahl + 1
        summe ← summe + werte[i]
wenn anzahl = 0 dann
    gib 0 zurück
sonst
    gib summe geteilt durch anzahl zurück
```

a) Beschreibe **in einem Satz**, was der Algorithmus berechnet.

b) Warum wird der Fall `anzahl = 0` gesondert behandelt?

c) Setze ihn um, sodass die Tests grün werden.
:::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Algo.java
public class Algo {

    /**
     * Liefert den Mittelwert aller geraden Werte des Feldes.
     * Enthält das Feld keinen geraden Wert, wird 0 geliefert.
     */
    public double mittelwertDerGeraden(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }
}
```

```java AlgoTest.java
@Test
class AlgoTest {

    @Test
    void testMittelwertDerGeraden() {
        Algo a = new Algo();
        assertEquals(4.0, a.mittelwertDerGeraden(new int[]{2, 3, 5, 6}), "2 und 6 ergeben im Mittel 4.");
        assertEquals(0.0, a.mittelwertDerGeraden(new int[]{1, 3, 5}), "Ohne gerade Werte kommt 0 heraus.");
        assertEquals(0.0, a.mittelwertDerGeraden(new int[]{}), "Beim leeren Feld kommt 0 heraus.");
        assertEquals(10.0, a.mittelwertDerGeraden(new int[]{10}), "Bei einem geraden Wert ist dieser der Mittelwert.");
    }
}
```

:::

::::collapsible{title="Auflösung zu a) und b)"}

a) Er berechnet den Mittelwert aller geraden Zahlen im Feld.

b) Ohne die Sonderbehandlung würde durch 0 geteilt. Bei ganzen Zahlen wäre das ein Laufzeitfehler, bei Kommazahlen käme der unsinnige Wert „nicht definiert“ heraus.

Solche **Sonderfälle** zu erkennen und ausdrücklich zu behandeln ist ein Kernteil des Algorithmenentwurfs – und ein Testfall dafür gehört immer dazu.

::::

:::protect{password="java-ef-7-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Algo.java
public class Algo {

    public double mittelwertDerGeraden(int[] pWerte) {
        int anzahl = 0;
        int summe = 0;

        for (int i = 0; i < pWerte.length; i++) {
            if (pWerte[i] % 2 == 0) {
                anzahl++;
                summe = summe + pWerte[i];
            }
        }

        if (anzahl == 0) {
            return 0.0;
        }
        return (double) summe / anzahl;
    }
}
```

:::

## Zusatzaufgabe: Stille Post

:::snippet{#brain}
Diese Aufgabe braucht mindestens drei Personen und funktioniert am besten in der ganzen Lerngruppe.

1. **Runde 1:** Jede Person zeichnet auf Papier ein einfaches Bild aus geraden Linien – ohne es jemandem zu zeigen. Gib das Blatt nach rechts weiter.
2. **Runde 2:** Entwickle zu dem Bild, das du bekommen hast, ein **Struktogramm**, das dieses Bild zeichnet. Lege das Originalbild weg und gib nur das Struktogramm weiter.
3. **Runde 3:** Setze das Struktogramm, das du bekommen hast, mit dem Stift in Scratch for Java um.
4. Vergleicht am Ende die Originalbilder mit den Ergebnissen.

Wo sind Unterschiede entstanden? An welcher Stelle in der Kette waren die Beschreibungen **nicht eindeutig**?
:::

---

## Selbsttest

::::multievent

**1. Welche Eigenschaften muss ein Algorithmus haben?** (Mehrfachauswahl)

{c1{!Eindeutigkeit}}

{c1{!Endlichkeit}}

{c1{!Ausführbarkeit}}

{c1{Er muss in Java geschrieben sein.}}

{h{Ein Algorithmus ist unabhängig von der Programmiersprache.}}
{H{Richtig! Dazu kommt noch, dass Ein- und Ausgabe geklärt sein müssen.}}

**2. Warum ist die Anweisung, den Tee eine Weile ziehen zu lassen, kein gültiger Schritt?**

{r1{weil sie zu lange dauert}}

{r1{!weil sie nicht eindeutig ist}}

{r1{weil sie nicht ausführbar ist}}

{h{Zwei Menschen würden unterschiedlich lange warten.}}
{H{Richtig!}}

**3. Ein Verfahren ist sauber und eindeutig formuliert. Ist es damit richtig?**

{r2{ja, immer}}

{r2{!nein, es kann trotzdem falsche Ergebnisse liefern}}

{r2{nur wenn es endet}}

{h{Denk an die zweite Fassung des Kartensortierens.}}
{H{Richtig! Deshalb muss man Algorithmen auch testen.}}

**4. Wie viele Wägungen braucht man bei acht Münzen mit dem Halbierungsverfahren?**

{z{3}}

{h{8 wird zu 4, dann zu 2, dann zu 1.}}
{H{Richtig! Bei jeder Verdopplung der Münzzahl kommt genau eine Wägung dazu.}}

**5. Was bedeutet der Zusatz, dass ein Algorithmus eine Klasse von Problemen löst?**

{r3{dass er in einer Klasse programmiert wird}}

{r3{!dass er für alle Probleme derselben Bauart funktioniert}}

{r3{dass er im Unterricht behandelt wird}}

{h{Die Maximumsuche funktioniert für jedes Feld.}}
{H{Richtig!}}

::::
