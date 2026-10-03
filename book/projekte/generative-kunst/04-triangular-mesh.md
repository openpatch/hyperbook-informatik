---
name: Triangular Mesh
index: 4
lang: de
permaid: genkunst-triangular-mesh
---

# Triangular Mesh

Ein Netz aus Dreiecken in verschiedenen Grautönen sieht aus wie zerknittertes
Papier oder ein Gebirge aus der Luft. Dreiecksnetze sind aber mehr als
Dekoration: **Jede** 3D-Figur in einem Computerspiel besteht aus Dreiecken.
Die Grafikkarte kann eigentlich nur eines – sehr viele Dreiecke sehr schnell
füllen.

Wir bauen das Netz in zwei Schritten: erst die Punkte, dann die Dreiecke
dazwischen.

:::snippet{#merken}
**Vorwissen:** [zweidimensionale Felder](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik/01-zweidimensionale-felder),
Objekte und die Methode `linie` aus [Tiled Lines](./01-tiled-lines).
:::

## Die Punkte

Die Punkte liegen in Zeilen. Damit später gleichmäßige Dreiecke entstehen
können, ist jede zweite Zeile um einen halben Abstand nach rechts versetzt –
so wie die Steine in einer Mauer. Danach wackeln wir jeden Punkt ein wenig
zufällig hin und her.

Jeder Punkt hat eine x- und eine y-Koordinate. Wir speichern ihn als Objekt
der Klasse `Vector2` aus der Scratch-Bibliothek:

| Aufruf | Bedeutung |
| --- | --- |
| `new Vector2(x, y)` | ein neuer Punkt |
| `p.getX()`, `p.getY()` | seine Koordinaten |
| `p.distance(q)` | der Abstand zum Punkt `q` |

Alle Punkte zusammen stehen in einem zweidimensionalen Feld
`Vector2[][] punkte` – eine Zeile im Feld ist eine Zeile auf der Leinwand.

:::onlineide{libraries="scratch" height="640px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new TriangularMesh());
}
```

```java TriangularMesh.java
public class TriangularMesh extends Stage {

   private static final int ABSTAND = 50;
   private static final int ZEILEN = 9;
   private static final int SPALTEN = 10;
   private static final double WACKELN = 0.4;

   private Pen stift;

   public TriangularMesh() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(16);

      Vector2[][] punkte = new Vector2[ZEILEN][SPALTEN];
      for (int zeile = 0; zeile < ZEILEN; zeile++) {
         for (int spalte = 0; spalte < SPALTEN; spalte++) {
            double x = -225 + spalte * ABSTAND + zufall() * ABSTAND;
            double y = 200 - zeile * ABSTAND + zufall() * ABSTAND;
            if (zeile % 2 == 1) {
               x = x + ABSTAND / 2;
            }
            punkte[zeile][spalte] = new Vector2(x, y);
         }
      }

      for (int zeile = 0; zeile < ZEILEN; zeile++) {
         for (int spalte = 0; spalte < SPALTEN; spalte++) {
            punkt(punkte[zeile][spalte]);
         }
      }
   }

   /**
    * Liefert eine Zufallszahl zwischen -WACKELN und WACKELN.
    */
   private double zufall() {
      return Math.random() * 2 * WACKELN - WACKELN;
   }

   /**
    * Setzt einen Punkt an die Stelle pP.
    */
   private void punkt(Vector2 pP) {
      stift.up();
      stift.setPosition(pP);
      stift.down();
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Setze `WACKELN` auf 0. Jetzt siehst du das Gitter ohne Zufall. Erkennst du
   die versetzten Zeilen?

b) Die erste Spalte beginnt bei x = −225, also **außerhalb** der Leinwand.
   Warum ist das sinnvoll? Tipp: Schau dir an, was mit `WACKELN = 0.4` am
   linken Rand passiert, wenn du −225 durch −175 ersetzt.

c) Was würde passieren, wenn `WACKELN` größer als 0.5 wäre?
:::

## Die Dreiecke

Zwischen zwei Zeilen liegt ein Streifen aus Dreiecken. Nimmt man die Punkte
beider Zeilen **abwechselnd** – einen von oben, einen von unten, wieder einen
von oben … – entsteht eine Zickzack-Folge. Je drei aufeinanderfolgende Punkte
dieser Folge bilden ein Dreieck:

```text
 o1     o2     o3            Zickzack: u1 o1 u2 o2 u3 o3 ...
   \   /  \   /  \
    \ /    \ /    \          Dreiecke: (u1 o1 u2)
     u1-----u2-----u3                  (o1 u2 o2)
                                       (u2 o2 u3) ...
```

Weil jede zweite Zeile versetzt ist, muss man bei jeder zweiten Zeile mit dem
oberen Punkt anfangen statt mit dem unteren.

Bleibt das Füllen. Der Stift kann keine Flächen füllen, also malen wir das
Dreieck aus wie mit einem Filzstift: Von einer Ecke A ziehen wir Linien zu
vielen Punkten auf der gegenüberliegenden Seite BC – so dicht, dass keine
Lücke bleibt. Ein Punkt auf der Strecke von B nach C ist

  B + (C − B) · anteil   mit anteil zwischen 0 und 1.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new TriangularMesh());
}
```

```java TriangularMesh.java
public class TriangularMesh extends Stage {

   private static final int ABSTAND = 50;
   private static final int ZEILEN = 9;
   private static final int SPALTEN = 10;
   private static final double WACKELN = 0.4;

   private Pen stift;

   public TriangularMesh() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);

      Vector2[][] punkte = new Vector2[ZEILEN][SPALTEN];
      for (int zeile = 0; zeile < ZEILEN; zeile++) {
         for (int spalte = 0; spalte < SPALTEN; spalte++) {
            double x = -225 + spalte * ABSTAND + zufall() * ABSTAND;
            double y = 200 - zeile * ABSTAND + zufall() * ABSTAND;
            if (zeile % 2 == 1) {
               x = x + ABSTAND / 2;
            }
            punkte[zeile][spalte] = new Vector2(x, y);
         }
      }

      for (int zeile = 0; zeile < ZEILEN - 1; zeile++) {
         Vector2[] zickzack = new Vector2[2 * SPALTEN];
         for (int spalte = 0; spalte < SPALTEN; spalte++) {
            if (zeile % 2 == 0) {
               zickzack[2 * spalte] = punkte[zeile + 1][spalte];
               zickzack[2 * spalte + 1] = punkte[zeile][spalte];
            } else {
               zickzack[2 * spalte] = punkte[zeile][spalte];
               zickzack[2 * spalte + 1] = punkte[zeile + 1][spalte];
            }
         }
         for (int i = 0; i < zickzack.length - 2; i++) {
            dreieck(zickzack[i], zickzack[i + 1], zickzack[i + 2]);
         }
      }
   }

   /**
    * Liefert eine Zufallszahl zwischen -WACKELN und WACKELN.
    */
   private double zufall() {
      return Math.random() * 2 * WACKELN - WACKELN;
   }

   /**
    * Füllt das Dreieck ABC in einem zufälligen Grauton und umrandet es.
    */
   private void dreieck(Vector2 pA, Vector2 pB, Vector2 pC) {
      int grau = (int) (Math.random() * 16) * 17;
      stift.setColor(grau, grau, grau);
      stift.setSize(2);
      double laenge = pB.distance(pC);
      for (double t = 0; t <= laenge; t += 1) {
         double anteil = t / laenge;
         double x = pB.getX() + (pC.getX() - pB.getX()) * anteil;
         double y = pB.getY() + (pC.getY() - pB.getY()) * anteil;
         linie(pA.getX(), pA.getY(), x, y);
      }

      stift.setColor(30, 30, 30);
      stift.setSize(1);
      linie(pA.getX(), pA.getY(), pB.getX(), pB.getY());
      linie(pB.getX(), pB.getY(), pC.getX(), pC.getY());
      linie(pC.getX(), pC.getY(), pA.getX(), pA.getY());
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
a) Die Zickzack-Folge einer Zeile hat 20 Punkte. Wie viele Dreiecke entstehen
   daraus? Und wie viele im ganzen Bild?

b) In `dreieck` steht `t += 1`. Ändere es auf `t += 5` und auf `t += 0.2`.
   Was siehst du, und was bedeutet das für die Laufzeit?

c) `(int) (Math.random() * 16) * 17` ergibt 16 verschiedene Grautöne. Welche
   sind das? Warum gerade 17?

d) Lass die Umrandung weg. Wirkt das Bild dann flacher oder räumlicher?
:::

::::collapsible{title="Tipp zu c)"}

`(int) (Math.random() * 16)` ist eine ganze Zahl von 0 bis 15. Was ergibt
15 · 17?

::::

## Weiterspielen

:::snippet{#challenge}
**Licht von oben.** Statt zufälliger Grautöne: Mach jedes Dreieck umso heller,
je weiter oben es liegt – mit ein wenig Zufall dazu. Das Netz bekommt dann
eine Richtung, als würde es von oben beleuchtet.

*Die y-Koordinate des Schwerpunkts eines Dreiecks ist der Mittelwert der drei
y-Koordinaten.*
:::

:::snippet{#challenge}
**Farbpalette.** Lege ein Feld mit vier oder fünf Farben an, die gut
zusammenpassen, und wähle für jedes Dreieck zufällig eine davon.
:::

:::snippet{#challenge}
**Wellen.** Verschiebe die Punkte nicht zufällig, sondern mit einer
Sinuswelle: `y + Math.sin(x / 40) * 15`. Kombiniere Welle und Zufall.
:::

---

Nach dem Tutorial [Triangular Mesh](https://generativeartistry.com/tutorials/triangular-mesh/)
von Generative Artistry.
