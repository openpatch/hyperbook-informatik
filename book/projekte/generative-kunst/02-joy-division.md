---
name: Joy Division
index: 2
lang: de
permaid: genkunst-joy-division
---

# Joy Division

1979 veröffentlichte die britische Band Joy Division ihr Album *Unknown
Pleasures*. Auf dem schwarzen Cover sind nur weiße Linien zu sehen, die sich
in der Mitte zu einem Gebirge auftürmen. Das Bild ist keine Erfindung eines
Grafikers, sondern **Messdaten**: Jede Linie zeigt einen einzelnen Funkimpuls
des Pulsars CP 1919, eines Sterns, der in gleichmäßigem Takt Radiowellen
aussendet. Die Impulse wurden untereinander gestapelt – so sieht man, dass
sie sich ähneln, aber nie ganz gleich sind.

Wir haben keine Pulsardaten. Wir nehmen Zufall.

:::snippet{#merken}
**Vorwissen:** [zweidimensionale Felder](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik/01-zweidimensionale-felder)
und die Methode `linie` aus [Tiled Lines](./01-tiled-lines).
:::

## Die Linien als Gitter

Jede Linie besteht aus 39 Punkten im Abstand von 10 Bildpunkten. Von jedem
Punkt merken wir uns nur, **wie weit er über seiner Grundlinie liegt**. Für 39
Linien mit je 39 Punkten ist das ein zweidimensionales Feld:

```java
double[][] hoehen = new double[39][39];
// hoehen[i][j]: Punkt j auf Linie i
```

Damit sich das Gebirge in der Mitte auftürmt, darf ein Punkt umso höher
ausschlagen, je näher er an der Mitte liegt. Ganz außen ist sein
**Spielraum** 0 – dort bleibt die Linie flach:

| x-Koordinate | Abstand zur Mitte | Spielraum `max(150 - abstand, 0)` |
| --- | --- | --- |
| 0 | 0 | 150 |
| ±100 | 100 | 50 |
| ±150 und weiter außen | 150 und mehr | 0 |

Die tatsächliche Höhe ist dann eine Zufallszahl zwischen 0 und dem halben
Spielraum.

:::onlineide{libraries="scratch" height="600px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new JoyDivision());
}
```

```java JoyDivision.java
public class JoyDivision extends Stage {

   private static final int SCHRITT = 10;

   private Pen stift;

   public JoyDivision() {
      this.setColor(10, 10, 10);
      stift = new Pen();
      this.add(stift);
      stift.setColor(240, 240, 240);
      stift.setSize(2);

      int anzahl = 400 / SCHRITT - 1;
      double[][] hoehen = new double[anzahl][anzahl];

      for (int i = 0; i < anzahl; i++) {
         for (int j = 0; j < anzahl; j++) {
            double x = -200 + SCHRITT + j * SCHRITT;
            double spielraum = Math.max(150 - Math.abs(x), 0);
            hoehen[i][j] = Math.random() * spielraum / 2;
         }
      }

      for (int i = 5; i < anzahl; i++) {
         double grundlinie = 200 - SCHRITT - i * SCHRITT;
         zeichneLinie(hoehen[i], grundlinie);
      }
   }

   /**
    * Verbindet alle Punkte einer Linie.
    * @param pHoehe Höhe jedes Punktes über der Grundlinie
    */
   private void zeichneLinie(double[] pHoehe, double pGrundlinie) {
      stift.up();
      for (int j = 0; j < pHoehe.length; j++) {
         double x = -200 + SCHRITT + j * SCHRITT;
         stift.setPosition(x, pGrundlinie + pHoehe[j]);
         stift.down();
      }
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Die Methode `zeichneLinie` bekommt `hoehen[i]` übergeben. Was ist das für
   ein Datentyp – und was steht darin?

b) Die Zeichenschleife beginnt bei `i = 5`, nicht bei 0. Ändere es auf 0 und
   erkläre, was dann oben passiert.

c) Ersetze die 150 in der Formel für den Spielraum durch 50 und durch 200.
:::

::::collapsible{title="Tipp zu a)"}

`hoehen` ist ein Feld von Feldern. Gibt man nur **einen** Index an, bekommt
man eine ganze Zeile – also ein eindimensionales Feld `double[]` mit den 39
Höhen einer einzigen Linie.

::::

## Wer hinten liegt, wird verdeckt

Das Bild ist noch zu wirr: Die Berge der unteren Linien schneiden sich mit den
Linien darüber. Auf dem Cover dagegen **verdeckt** jede Linie das, was hinter
ihr liegt.

Ein Maler löst das Problem so: Er malt zuerst den Hintergrund, dann das, was
davor steht, und zuletzt den Vordergrund. Was später kommt, übermalt das
Frühere. Genau so heißt das Verfahren auch in der Informatik:
**Maleralgorithmus** (englisch *painter's algorithm*). Jedes 3D-Computerspiel
musste lange Zeit auf diese Weise entscheiden, was man sieht.

Für uns heißt das: Wir zeichnen von oben (hinten) nach unten (vorne). Und
bevor wir eine Linie zeichnen, übermalen wir die Fläche zwischen ihr und
ihrer Grundlinie **in der Hintergrundfarbe**. Der Stift kann keine Flächen
füllen – also ziehen wir viele senkrechte Striche dicht nebeneinander.

Eine zweite Verbesserung macht die Berge weicher: Wir **glätten** jede Linie,
indem wir jeden Punkt durch den Mittelwert aus ihm und seinen beiden
Nachbarn ersetzen. Dafür brauchen wir eine Kopie – sonst würde der zweite
Punkt schon mit dem geänderten ersten rechnen.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new JoyDivision());
}
```

```java JoyDivision.java
public class JoyDivision extends Stage {

   private static final int SCHRITT = 10;
   private static final int GLAETTEN = 2;

   private Pen stift;

   public JoyDivision() {
      this.setColor(10, 10, 10);
      stift = new Pen();
      this.add(stift);

      int anzahl = 400 / SCHRITT - 1;
      double[][] hoehen = new double[anzahl][anzahl];

      for (int i = 0; i < anzahl; i++) {
         for (int j = 0; j < anzahl; j++) {
            double x = -200 + SCHRITT + j * SCHRITT;
            double spielraum = Math.max(150 - Math.abs(x), 0);
            hoehen[i][j] = Math.random() * spielraum / 2;
         }
         for (int g = 0; g < GLAETTEN; g++) {
            glaette(hoehen[i]);
         }
      }

      for (int i = 5; i < anzahl; i++) {
         double grundlinie = 200 - SCHRITT - i * SCHRITT;
         verdecke(hoehen[i], grundlinie);
         zeichneLinie(hoehen[i], grundlinie);
      }
   }

   /**
    * Ersetzt jeden inneren Wert durch den Mittelwert aus ihm und seinen Nachbarn.
    */
   private void glaette(double[] pWerte) {
      double[] kopie = new double[pWerte.length];
      for (int j = 0; j < pWerte.length; j++) {
         kopie[j] = pWerte[j];
      }
      for (int j = 1; j < pWerte.length - 1; j++) {
         pWerte[j] = (kopie[j - 1] + kopie[j] + kopie[j + 1]) / 3;
      }
   }

   /**
    * Übermalt die Fläche zwischen Grundlinie und Linie in der Hintergrundfarbe.
    */
   private void verdecke(double[] pHoehe, double pGrundlinie) {
      stift.setColor(10, 10, 10);
      stift.setSize(3);
      for (int j = 0; j < pHoehe.length - 1; j++) {
         double x = -200 + SCHRITT + j * SCHRITT;
         for (int k = 0; k < SCHRITT; k += 2) {
            double anteil = k / (double) SCHRITT;
            double y = pGrundlinie + pHoehe[j] + (pHoehe[j + 1] - pHoehe[j]) * anteil;
            linie(x + k, pGrundlinie, x + k, y - 1);
         }
      }
   }

   /**
    * Verbindet alle Punkte einer Linie.
    * @param pHoehe Höhe jedes Punktes über der Grundlinie
    */
   private void zeichneLinie(double[] pHoehe, double pGrundlinie) {
      stift.setColor(240, 240, 240);
      stift.setSize(2);
      stift.up();
      for (int j = 0; j < pHoehe.length; j++) {
         double x = -200 + SCHRITT + j * SCHRITT;
         stift.setPosition(x, pGrundlinie + pHoehe[j]);
         stift.down();
      }
      stift.up();
   }

   /**
    * Zieht eine gerade Linie von (pX1, pY1) nach (pX2, pY2).
    */
   private void linie(double pX1, double pY1, double pX2, double pY2) {
      stift.up();
      stift.setPosition(pX1, pY1);
      stift.down();
      stift.setPosition(pX2, pY2);
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Setze `GLAETTEN` auf 0, 1, 5 und 20. Was passiert mit den Bergen?

b) Ändere in `verdecke` die Farbe von `(10, 10, 10)` auf Rot. Jetzt siehst du,
   welche Fläche übermalt wird.

c) Kehre die Zeichenreihenfolge um, sodass die Schleife von unten nach oben
   läuft. Warum funktioniert der Maleralgorithmus dann nicht mehr?

d) In `glaette` steht eine Kopie des Feldes. Lass sie weg und rechne direkt
   mit `pWerte`. Sieht man einen Unterschied? Erkläre, warum das Ergebnis
   trotzdem falsch ist.
:::

::::collapsible{title="Tipp zu b)"}

In `verdecke` steht ein `stift.setColor(10, 10, 10)`. Das ist die
Hintergrundfarbe der Bühne aus dem Konstruktor. Mit `stift.setColor(200, 0, 0)`
werden die übermalten Flächen sichtbar.

::::

::::collapsible{title="Tipp zu c)"}

Überleg dir, welche Linie beim umgekehrten Zeichnen **zuletzt** gemalt wird
– und ob das die vorderste ist.

::::

## Weiterspielen

:::snippet{#challenge}
**Zwei Gebirge.** Lass die Berge nicht nur in der Mitte entstehen, sondern an
zwei Stellen, etwa bei x = −80 und x = 80.

*Der Spielraum hängt jetzt vom Abstand zur **näheren** der beiden Stellen ab.*
:::

:::snippet{#challenge}
**Rauschen statt Zufall.** Die Scratch-Bibliothek kennt `Random.noise(x, y)`.
Das liefert Zufallszahlen zwischen −1 und 1, die sich zwischen benachbarten
Stellen nur wenig unterscheiden. Ersetze `Math.random()` durch
`(Random.noise(j * 0.2, i * 0.2) + 1) / 2` – und lass das Glätten weg. Was
bewirkt der Faktor 0.2? Und warum kommt jetzt bei jedem Start dasselbe Bild
heraus?

*Mit `Random.noiseSeed(...)` am Anfang wählst du ein anderes Rauschen.*
:::

:::snippet{#challenge}
**Farbverlauf.** Gib jeder Linie eine eigene Farbe, die von oben nach unten
langsam wechselt – zum Beispiel von Dunkelblau nach Orange wie bei einem
Sonnenuntergang über einem Gebirge.
:::

:::snippet{#challenge}
**Eigene Daten.** Statt Zufallszahlen kannst du echte Messwerte nehmen: die
Temperatur jedes Tages eines Jahres, eine Linie pro Woche. Oder die
Lautstärke eines Liedes. Was für Daten kennst du, die sich lohnen würden?
:::

---

Nach dem Tutorial [Joy Division](https://generativeartistry.com/tutorials/joy-division/)
von Generative Artistry.
