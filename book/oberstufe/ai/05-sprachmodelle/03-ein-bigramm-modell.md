---
title: Ein Bigramm-Modell
index: 3
permaid: ai-bigramm-modell
scripts:
  - /wc/ki-bigramm.js
---

# Ein Bigramm-Modell

Jetzt baust du ein Bigramm-Modell in Java. Es trainiert auf einem kleinen Korpus und erzeugt dann neuen Text Token für Token.

## Die Idee

1. **Training:** Zähle alle Bigramme im Korpus.
2. **Erzeugung:** Wähle das nächste Token zufällig nach Wahrscheinlichkeit.
3. **Wiederholung:** Bis genügend Tokens erzeugt sind.

:::snippet{#brain}
Bevor du das Programm ausführst: Lies den Korpus im Programm unten. Welche Wörter kommen nach „die"? Welches ist am häufigsten? Schreibe deine Vermutung auf.
:::

:::onlineide{height="780px" speed="1000000"}

```java Main.java
void main() {
    String korpus = "die Katze schläft die Katze jagt die Maus schläft die Maus jagt die Katze schläft die Maus schläft";

    BigrammModell modell = new BigrammModell();
    modell.trainiere(korpus);

    IO.println("--- Text erzeugen ---");
    String text = modell.erzeugeText("die", 12);
    IO.println(text);
}
```

```java BigrammModell.java
public class BigrammModell {
    private String[] tokens;
    private int[][] haeufigkeit;
    private String[] vokabular;
    private int vocabSize;

    public void trainiere(String pKorpus) {
        // Tokenisierung
        String[] alleTokens = pKorpus.split(" ");
        tokens = alleTokens;

        // Vokabular aufbauen (eindeutige Tokens)
        vocabSize = 0;
        vokabular = new String[alleTokens.length];
        for (int i = 0; i < alleTokens.length; i++) {
            boolean gefunden = false;
            for (int j = 0; j < vocabSize; j++) {
                if (vokabular[j].equals(alleTokens[i])) {
                    gefunden = true;
                    break;
                }
            }
            if (!gefunden) {
                vokabular[vocabSize] = alleTokens[i];
                vocabSize++;
            }
        }

        // Häufigkeitstabelle aufbauen
        haeufigkeit = new int[vocabSize][vocabSize];
        for (int i = 0; i < alleTokens.length - 1; i++) {
            int a = indexVon(alleTokens[i]);
            int b = indexVon(alleTokens[i + 1]);
            haeufigkeit[a][b]++;
        }
    }

    private int indexVon(String pToken) {
        for (int i = 0; i < vocabSize; i++) {
            if (vokabular[i].equals(pToken)) {
                return i;
            }
        }
        return -1;
    }

    public String erzeugeText(String pStart, int pLaenge) {
        String ergebnis = pStart;
        String aktuell = pStart;

        for (int i = 0; i < pLaenge; i++) {
            int idx = indexVon(aktuell);
            if (idx < 0) { break; }

            // Gesamthäufigkeit des aktuellen Tokens
            int summe = 0;
            for (int j = 0; j < vocabSize; j++) {
                summe += haeufigkeit[idx][j];
            }
            if (summe == 0) { break; }

            // Zufällige Auswahl nach Wahrscheinlichkeit
            int zufall = Random.randint(1, summe);
            int kumuliert = 0;
            int gewaehlt = 0;
            for (int j = 0; j < vocabSize; j++) {
                kumuliert += haeufigkeit[idx][j];
                if (zufall <= kumuliert) {
                    gewaehlt = j;
                    break;
                }
            }

            aktuell = vokabular[gewaehlt];
            ergebnis = ergebnis + " " + aktuell;
        }

        return ergebnis;
    }
}
```

:::

:::snippet{#aufgabe}
a) Führe das Programm mehrmals aus. Kommt jedes Mal derselbe Text heraus? Warum?

b) Ändere das Startwort auf „Katze". Was passiert?

c) Erweitere den Korpus um weitere Sätze (z.B. „die Katze frisst die Maus"). Wie verändert sich der erzeugte Text?
:::

::::collapsible{title="Tipp zu a)"}

Das Modell wählt das nächste Token zufällig nach Wahrscheinlichkeit. Jeder Durchlauf kann einen anderen Text erzeugen, weil `Random.randint` unterschiedliche Werte liefert.
::::

::::collapsible{title="Tipp zu b)"}

Schau ins Vokabular: Es enthält genau fünf verschiedene Tokens. Welche davon können überhaupt auf „Katze" folgen — und was passiert, wenn du ein Startwort wählst, das im Korpus gar nicht vorkommt?
::::

:::protect{password="ai-5-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Nein**, meistens kommt jedes Mal ein anderer Text heraus. In `erzeugeText` fällt die Entscheidung über `Random.randint(1, summe)` — bei jedem Aufruf neu. Nach „die" stehen im Korpus 3-mal „Katze" und 3-mal „Maus", das Modell wirft dort also gewissermaßen eine Münze. Bei einem Token mit nur einer möglichen Fortsetzung (nach „schläft" folgt immer „die") gibt es dagegen nichts zu würfeln.

Das ist kein Fehler, sondern Absicht: Ein generatives Modell, das immer denselben Text liefert, wäre eine Datenbank, kein Sprachmodell.

b) Mit „Katze" als Startwort funktioniert es genauso — nur beginnt der Text eben dort. Nach „Katze" folgt 2-mal „schläft" und 1-mal „jagt", also mit 2/3 „schläft". Wählst du dagegen ein Startwort, das im Korpus **nicht** vorkommt (z.B. „Hund"), liefert `indexVon` den Wert -1, die Schleife bricht sofort ab, und du bekommst nur das Startwort zurück. Ein Bigramm-Modell kann mit unbekannten Tokens nichts anfangen.

c) Der neue Satz fügt weitere Bigramme hinzu und verschiebt damit die Wahrscheinlichkeiten. Mit „die Katze frisst die Maus" kommt „frisst" ins Vokabular, und nach „Katze" ist „frisst" plötzlich eine mögliche Fortsetzung. Je mehr Text du hinzufügst, desto mehr verschiedene Sätze kann das Modell erzeugen — die Sätze werden dadurch aber **nicht** sinnvoller, weil das Modell weiterhin nur ein einziges Token weit zurückschaut. Genau daran setzt Lektion 5.4 an.
:::

:::snippet{#merken}
Das Bigramm-Modell ist ein **generatives KI-System**: Es erzeugt neuen Text, den es in genau dieser Form noch nicht gab.

Beim Trainieren hat niemand Labels vergeben — der Korpus ist einfach roher Text. Das Modell erzeugt sich seine „richtigen Antworten" selbst, indem es jedes Token als Vorhersageziel für das vorhergehende benutzt. Man nennt das **selbstüberwachtes Lernen**: Es sieht von innen aus wie überwachtes Lernen (es gibt für jede Eingabe eine richtige Antwort), aber die Beschriftung kostet keine Handarbeit, sondern steckt schon im Text. Genau deshalb lassen sich Sprachmodelle auf so gewaltigen Textmengen trainieren.

Der erzeugte Text ist nicht sinnvoll wie bei ChatGPT — aber das Prinzip ist dasselbe: das nächste Token nach Wahrscheinlichkeit wählen.
:::

## Token für Token erzeugen

Derselbe Korpus wie im Programm. Mit **Nächstes Token** siehst du bei jedem einzelnen Schritt, aus welcher Verteilung gewürfelt wurde.

<ki-bigramm id="ai-bigramm-erzeugen" ansicht="erzeugen"></ki-bigramm>

:::snippet{#aufgabe}
a) Drücke fünfmal auf **Neu** und dann jeweils auf **10 Tokens**. Kommt derselbe Text heraus? Vergleiche mit deiner Antwort zu a) von oben.

b) Nimm den Haken bei **zufällig nach Wahrscheinlichkeit** heraus. Jetzt wird immer das häufigste Wort gewählt. Was passiert mit dem Text nach wenigen Schritten?

c) Stelle das Startwort auf **schläft**. Warum endet der Text sofort?

d) Ergänze im Korpus den Satz „die Katze frisst die Maus" und erzeuge erneut Text. Welches neue Wort taucht auf, und wie wahrscheinlich ist es nach „Katze"?
:::

:::protect{password="ai-5-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

b) Der Text läuft in eine **Schleife**. Ohne Zufall hängt das nächste Token nur vom aktuellen ab, und sobald ein Token zum zweiten Mal auftaucht, wiederholt sich alles ab dort endlos. Der Zufall ist also nicht nur Beiwerk — er ist der Grund, warum überhaupt verschiedene Texte entstehen.

c) „schläft" steht am Ende des Korpus. Dieses letzte Vorkommen hat keinen Nachfolger, und an keiner anderen Stelle folgt etwas auf „schläft" — die Zeile in der Häufigkeitstabelle ist leer. Das Modell kennt also kein einziges Wort, das danach kommen könnte.

d) Neu ist **frisst**. Nach „Katze" gibt es jetzt vier Fortsetzungen: zweimal „schläft", einmal „jagt" und einmal „frisst". $P(\text{frisst} \mid \text{Katze}) = 1/4 = 25\,\%$.
:::

<!-- KLP EF/Q-Phase: (erläutern) die Unterschiede zwischen diskriminativen
     und generativen KI-Systemen (A) -->

---

## Selbsttest

::::multievent

**1. Ist das Bigramm-Modell diskriminativ oder generativ?**

{r1{!Generativ — es erzeugt neuen Text.}}

{r1{Diskriminativ — es klassifiziert Text.}}

{r1{Beides.}}

{r1{Weder.}}

{h{Das Modell produziert neuen Text, den es vorher nicht gab.}}

{H{Richtig! Das Bigramm-Modell ist generativ — es erzeugt neuen Inhalt.}}

**2. Warum erzeugt das Modell bei jedem Durchlauf einen anderen Text?**

{r2{!Weil das nächste Token zufällig nach Wahrscheinlichkeit gewählt wird.}}

{r2{Weil das Modell bei jedem Durchlauf neu trainiert.}}

{r2{Weil die Trainingsdaten sich ändern.}}

{r2{Weil der Zufallsgenerator kaputt ist.}}

{h{Random.randint liefert bei jedem Aufruf andere Werte.}}

{H{Richtig! Die zufällige Auswahl nach Wahrscheinlichkeit sorgt dafür, dass jeder Durchlauf anders ist.}}

**3. Was lernt das Bigramm-Modell beim Training?**

{r3{!Die Häufigkeit aller Bigramme im Korpus.}}

{r3{Die Bedeutung jedes Wortes.}}

{r3{Die Grammatikregeln der Sprache.}}

{r3{Die Übersetzung zwischen Sprachen.}}

{h{Training bedeutet hier: Bigramme zählen und Wahrscheinlichkeiten speichern.}}

{H{Richtig! Das Modell lernt, welche Wörter im Korpus aufeinander folgen und wie oft.}}

::::
