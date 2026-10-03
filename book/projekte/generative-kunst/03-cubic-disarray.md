---
name: Cubic Disarray
index: 3
lang: de
permaid: genkunst-cubic-disarray
---

# Cubic Disarray

Georg Nees (1926–2016) gehört zu den ersten Menschen überhaupt, die mit einem
Computer Kunst gemacht haben. Er arbeitete bei Siemens in Erlangen und ließ
seine Programme von einem Zeichentisch mit Stift ausführen. Sein bekanntestes
Bild heißt *Schotter*: Oben liegen Quadrate ordentlich in Reih und Glied,
nach unten hin geraten sie immer mehr durcheinander – als würde ein Mauerwerk
zerfallen.

Genau das bauen wir nach. Die eigentliche Arbeit steckt darin, ein Quadrat zu
**drehen** – denn der Stift kennt keine Drehung.

:::snippet{#merken}
**Vorwissen:** [verschachtelte Schleifen](/oberstufe/oop/01-grundlagen/03-kontrollstrukturen/06-verschachtelte-schleifen),
[Methoden mit Rückgabewert](/oberstufe/oop/01-grundlagen/04-methoden-und-modularisierung/02-rueckgabewerte)
und eindimensionale Felder. Sinus und Kosinus solltest du schon einmal gehört
haben – mehr nicht.
:::

## Einen Punkt drehen

Ein Quadrat mit der Mitte (0, 0) und der Seitenlänge 2·h hat die Ecken
(−h, −h), (h, −h), (h, h) und (−h, h). Drehen wir es um einen Winkel w, wandert
jede Ecke (x, y) an eine neue Stelle (x', y'):

:::snippet{#merken}
**Drehung um den Ursprung** um den Winkel w (gegen den Uhrzeigersinn):

- x' = x · cos(w) − y · sin(w)
- y' = x · sin(w) + y · cos(w)

`Math.sin` und `Math.cos` erwarten den Winkel im **Bogenmaß**, nicht in Grad.
`Math.toRadians(30)` rechnet 30° ins Bogenmaß um.
:::

Woher die Formel kommt, lernst du in der Oberstufe in Mathematik. Hier reicht
es, sie zu benutzen. Liegt die Mitte des Quadrats nicht bei (0, 0), sondern
bei (mx, my), drehen wir zuerst um den Ursprung und **verschieben danach**:
Wir zählen mx und my einfach dazu.

:::onlineide{libraries="scratch" height="620px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new CubicDisarray());
}
```

```java CubicDisarray.java
public class CubicDisarray extends Stage {

   private static final double WINKEL = 20;

   private Pen stift;

   public CubicDisarray() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      quadrat(0, 0, 200, 0);
      quadrat(0, 0, 200, WINKEL);
   }

   /**
    * Zeichnet ein gedrehtes Quadrat.
    * @param pMx x-Koordinate der Mitte
    * @param pMy y-Koordinate der Mitte
    * @param pWinkel Drehung in Grad gegen den Uhrzeigersinn
    */
   private void quadrat(double pMx, double pMy, double pSeite, double pWinkel) {
      double w = Math.toRadians(pWinkel);
      double h = pSeite / 2;
      double[] ex = {-h, h, h, -h, -h};
      double[] ey = {-h, -h, h, h, -h};

      stift.up();
      for (int i = 0; i < ex.length; i++) {
         double x = pMx + ex[i] * Math.cos(w) - ey[i] * Math.sin(w);
         double y = pMy + ex[i] * Math.sin(w) + ey[i] * Math.cos(w);
         stift.setPosition(x, y);
         stift.down();
      }
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Die Felder `ex` und `ey` haben fünf Einträge, obwohl ein Quadrat nur vier
   Ecken hat. Warum?

b) Setze `WINKEL` auf 45, 90 und −20. Sage vorher, was du siehst.

c) Zeichne mit einer Schleife 18 Quadrate um dieselbe Mitte, jedes um 5° weiter
   gedreht als das vorige.

d) Zeichne ein gedrehtes Quadrat mit der Mitte (100, 100). Es soll sich um
   seine **eigene** Mitte drehen, nicht um die Mitte der Leinwand.
:::

::::collapsible{title="Tipp zu a)"}

Der Stift fährt die Ecken nacheinander ab. Was passiert, wenn er nach der
vierten Ecke aufhört?

::::

## Ordnung, die zerfällt

Jetzt legen wir 12 × 12 Quadrate in ein Gitter. Jede Zeile bekommt einen Wert
`unordnung` zwischen 0 (oberste Zeile) und 1 (unterste Zeile). Mit diesem Wert
werden zwei Zufallszahlen multipliziert:

- die **Drehung**, höchstens `MAX_DREHUNG` Grad,
- der **Versatz** nach links oder rechts, höchstens `MAX_VERSATZ` Bildpunkte.

Oben ist `unordnung` 0, also bleibt dort alles gerade. Unten kann es bis zum
Höchstwert gehen. Ob nach links oder rechts, entscheidet ein zufälliges
Vorzeichen.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new CubicDisarray());
}
```

```java CubicDisarray.java
public class CubicDisarray extends Stage {

   private static final int SEITE = 30;
   private static final int ANZAHL = 12;
   private static final double MAX_VERSATZ = 15;
   private static final double MAX_DREHUNG = 20;

   private Pen stift;

   public CubicDisarray() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      for (int zeile = 0; zeile < ANZAHL; zeile++) {
         for (int spalte = 0; spalte < ANZAHL; spalte++) {
            double unordnung = zeile / (double) (ANZAHL - 1);
            double drehung = unordnung * zufallsVorzeichen() * Math.random() * MAX_DREHUNG;
            double versatz = unordnung * zufallsVorzeichen() * Math.random() * MAX_VERSATZ;

            double mx = -165 + spalte * SEITE + versatz;
            double my = 165 - zeile * SEITE;
            quadrat(mx, my, SEITE, drehung);
         }
      }
   }

   /**
    * Liefert zufällig 1 oder -1.
    */
   private int zufallsVorzeichen() {
      if (Math.random() < 0.5) {
         return -1;
      }
      return 1;
   }

   /**
    * Zeichnet ein gedrehtes Quadrat.
    * @param pMx x-Koordinate der Mitte
    * @param pMy y-Koordinate der Mitte
    * @param pWinkel Drehung in Grad gegen den Uhrzeigersinn
    */
   private void quadrat(double pMx, double pMy, double pSeite, double pWinkel) {
      double w = Math.toRadians(pWinkel);
      double h = pSeite / 2;
      double[] ex = {-h, h, h, -h, -h};
      double[] ey = {-h, -h, h, h, -h};

      stift.up();
      for (int i = 0; i < ex.length; i++) {
         double x = pMx + ex[i] * Math.cos(w) - ey[i] * Math.sin(w);
         double y = pMy + ex[i] * Math.sin(w) + ey[i] * Math.cos(w);
         stift.setPosition(x, y);
         stift.down();
      }
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Warum steht in der Berechnung von `unordnung` ein `(double)`? Lass es weg
   und starte das Programm.

b) Setze `MAX_DREHUNG` auf 90 und `MAX_VERSATZ` auf 0. Und dann umgekehrt.

c) Ändere die Berechnung von `unordnung` so, dass das Chaos **oben** liegt
   und die Ordnung unten.

d) Die Mitte des ersten Quadrats liegt bei −165. Wie kommt diese Zahl zustande?
:::

::::collapsible{title="Tipp zu a)"}

`zeile` und `ANZAHL - 1` sind beide `int`. Was ergibt 5 / 11 in Java, wenn
beide Zahlen ganzzahlig sind?

::::

::::collapsible{title="Tipp zu d)"}

12 Quadrate mit je 30 Bildpunkten sind zusammen 360 breit. Die Leinwand ist
400 breit. Wie viel bleibt links übrig, wenn das Gitter mittig liegt? Und wo
liegt dann die **Mitte** des ersten Quadrats?

::::

## Weiterspielen

:::snippet{#challenge}
**Von der Mitte aus.** Lass die Unordnung nicht von oben nach unten wachsen,
sondern von der Mitte nach außen. In der Mitte liegen die Quadrate gerade,
an den Rändern fliegen sie auseinander.

*Die Unordnung hängt jetzt vom Abstand zur Mitte der Leinwand ab. Den größten
möglichen Abstand brauchst du, damit am Ende eine Zahl zwischen 0 und 1
herauskommt.*
:::

:::snippet{#challenge}
**Schotter in Farbe.** Färbe die Quadrate je nach Drehung: gerade Quadrate
grau, stark gedrehte rot.
:::

:::snippet{#challenge}
**Andere Formen.** Ersetze das Quadrat durch ein Dreieck oder ein Sechseck.
Dafür musst du nur die Felder `ex` und `ey` ändern.

*Die Ecken eines regelmäßigen n-Ecks liegen auf einem Kreis. Ecke k hat den
Winkel k · 360° / n.*
:::

---

Nach dem Tutorial [Cubic Disarray](https://generativeartistry.com/tutorials/cubic-disarray/)
von Generative Artistry.
