---
name: Circle Packing
index: 6
lang: de
permaid: genkunst-circle-packing
---

# Circle Packing

Wie viele Orangen passen in eine Kiste? Wie legt man Kreise so, dass sie
möglichst viel Fläche bedecken, ohne sich zu überlappen? Diese Fragen nach
dem **Packen von Kreisen** beschäftigen Mathematikerinnen und Mathematiker
seit Jahrhunderten – und sie ergeben schöne Bilder.

Unser Verfahren ist einfach: Setze einen winzigen Kreis an eine zufällige
freie Stelle. Lass ihn wachsen, bis er an einen anderen Kreis oder an den Rand
stößt. Wiederhole das ein paar hundert Mal.

:::snippet{#merken}
**Vorwissen:** [Klassen und Objekte](/oberstufe/oop/01-grundlagen/06-objektorientierung/01-klassen-und-objekte),
[eindimensionale Felder](/oberstufe/oop/01-grundlagen/05-felder) und – wie so
oft – der Satz des Pythagoras.
:::

## Kreise als Objekte

Ein Kreis hat eine Mitte (x, y) und einen Radius. Das ist ein Fall für eine
eigene Klasse `Kreis`. Alle Kreise, die schon auf der Leinwand liegen,
merken wir uns in einem Feld `kreise`. Weil wir vorher nicht wissen, wie viele
es werden, legen wir das Feld groß genug an und zählen in `anzahl` mit, wie
viele Plätze schon belegt sind.

Und wie zeichnet ein Stift, der nur gerade Linien kann, einen Kreis? Er
zeichnet ein **Vieleck** mit so vielen Ecken, dass man den Unterschied nicht
mehr sieht. Die Ecke Nummer i eines n-Ecks liegt beim Winkel 2π · i / n und hat
die Koordinaten

  x = mx + r · cos(winkel)  und  y = my + r · sin(winkel).

:::onlineide{libraries="scratch" height="640px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new CirclePacking());
}
```

```java CirclePacking.java
public class CirclePacking extends Stage {

   private static final int ANZAHL_KREISE = 30;
   private static final int ECKEN = 40;

   private Pen stift;
   private Kreis[] kreise = new Kreis[ANZAHL_KREISE];
   private int anzahl = 0;

   public CirclePacking() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      for (int i = 0; i < ANZAHL_KREISE; i++) {
         Kreis neu = new Kreis(Math.random() * 400 - 200, Math.random() * 400 - 200,
                               Math.random() * 50);
         kreise[anzahl] = neu;
         anzahl++;
      }

      for (int i = 0; i < anzahl; i++) {
         zeichneKreis(kreise[i]);
      }
   }

   /**
    * Zeichnet einen Kreis als Vieleck mit ECKEN Ecken.
    */
   private void zeichneKreis(Kreis pKreis) {
      stift.up();
      for (int i = 0; i <= ECKEN; i++) {
         double winkel = 2 * Math.PI * i / ECKEN;
         stift.setPosition(pKreis.getX() + pKreis.getRadius() * Math.cos(winkel),
                           pKreis.getY() + pKreis.getRadius() * Math.sin(winkel));
         stift.down();
      }
      stift.up();
   }
}
```

```java Kreis.java
public class Kreis {

   private double x;
   private double y;
   private double radius;

   public Kreis(double pX, double pY, double pRadius) {
      x = pX;
      y = pY;
      radius = pRadius;
   }

   public double getX() {
      return x;
   }

   public double getY() {
      return y;
   }

   public double getRadius() {
      return radius;
   }

   public void setRadius(double pRadius) {
      radius = pRadius;
   }
}
```

:::

:::snippet{#aufgabe}
a) Setze `ECKEN` auf 3, 4, 6 und 10. Ab wie vielen Ecken sieht ein kleiner
   Kreis rund aus? Und ein großer?

b) Die Schleife in `zeichneKreis` läuft bis `i <= ECKEN`, nicht bis
   `i < ECKEN`. Warum?

c) Das Programm legt erst alle Kreise im Feld ab und zeichnet sie danach. Das
   ginge auch in einer einzigen Schleife. Warum lohnt sich das Feld trotzdem?
   Die Antwort steht im nächsten Abschnitt.
:::

## Wachsen, bis es eng wird

Zwei Kreise überlappen sich, wenn der Abstand ihrer Mittelpunkte kleiner ist
als die Summe ihrer Radien. Den Abstand liefert der Satz des Pythagoras:

  abstand = √(dx² + dy²)  mit dx = x₁ − x₂ und dy = y₁ − y₂

Diese Prüfung gehört zum Kreis selbst, deshalb bekommt die Klasse `Kreis` zwei
neue Methoden: `ueberschneidet` vergleicht mit einem anderen Kreis,
`ragtUeberRand` prüft die Leinwand.

Der Ablauf für jeden neuen Kreis ist dann:

1. Würfle eine Stelle und probiere dort einen Kreis mit dem Radius
   `MIN_RADIUS`. Stößt er an, würfle neu – höchstens `VERSUCHE`-mal.
2. Lass den Kreis Bildpunkt für Bildpunkt wachsen, bis er anstößt oder
   `MAX_RADIUS` erreicht. Dann nimm den letzten Radius, bei dem noch Platz war.
3. Lege ihn ins Feld und zeichne ihn.

:::onlineide{libraries="scratch" height="720px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new CirclePacking());
}
```

```java CirclePacking.java
public class CirclePacking extends Stage {

   private static final int MIN_RADIUS = 2;
   private static final int MAX_RADIUS = 80;
   private static final int ANZAHL_KREISE = 200;
   private static final int VERSUCHE = 200;
   private static final int ECKEN = 40;

   private Pen stift;
   private Kreis[] kreise = new Kreis[ANZAHL_KREISE];
   private int anzahl = 0;

   public CirclePacking() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      for (int i = 0; i < ANZAHL_KREISE; i++) {
         erzeugeKreis();
      }
   }

   /**
    * Sucht eine freie Stelle, lässt dort einen Kreis wachsen und zeichnet ihn.
    */
   private void erzeugeKreis() {
      Kreis neu = null;
      for (int versuch = 0; versuch < VERSUCHE && neu == null; versuch++) {
         Kreis kandidat = new Kreis(Math.random() * 400 - 200, Math.random() * 400 - 200,
                                    MIN_RADIUS);
         if (!stoesstAn(kandidat)) {
            neu = kandidat;
         }
      }
      if (neu == null) {
         return;
      }

      for (int r = MIN_RADIUS; r <= MAX_RADIUS; r++) {
         neu.setRadius(r);
         if (stoesstAn(neu)) {
            neu.setRadius(r - 1);
            break;
         }
      }

      kreise[anzahl] = neu;
      anzahl++;
      zeichneKreis(neu);
   }

   /**
    * Prüft, ob pKreis über den Rand ragt oder einen der vorhandenen Kreise berührt.
    */
   private boolean stoesstAn(Kreis pKreis) {
      if (pKreis.ragtUeberRand()) {
         return true;
      }
      for (int i = 0; i < anzahl; i++) {
         if (pKreis.ueberschneidet(kreise[i])) {
            return true;
         }
      }
      return false;
   }

   /**
    * Zeichnet einen Kreis als Vieleck mit ECKEN Ecken.
    */
   private void zeichneKreis(Kreis pKreis) {
      stift.up();
      for (int i = 0; i <= ECKEN; i++) {
         double winkel = 2 * Math.PI * i / ECKEN;
         stift.setPosition(pKreis.getX() + pKreis.getRadius() * Math.cos(winkel),
                           pKreis.getY() + pKreis.getRadius() * Math.sin(winkel));
         stift.down();
      }
      stift.up();
   }
}
```

```java Kreis.java
public class Kreis {

   private double x;
   private double y;
   private double radius;

   public Kreis(double pX, double pY, double pRadius) {
      x = pX;
      y = pY;
      radius = pRadius;
   }

   public double getX() {
      return x;
   }

   public double getY() {
      return y;
   }

   public double getRadius() {
      return radius;
   }

   public void setRadius(double pRadius) {
      radius = pRadius;
   }

   /**
    * Prüft, ob sich dieser Kreis und pAnderer berühren oder überlappen.
    */
   public boolean ueberschneidet(Kreis pAnderer) {
      double dx = x - pAnderer.getX();
      double dy = y - pAnderer.getY();
      return Math.sqrt(dx * dx + dy * dy) <= radius + pAnderer.getRadius();
   }

   /**
    * Prüft, ob der Kreis über den Rand der Leinwand von -200 bis 200 hinausragt.
    */
   public boolean ragtUeberRand() {
      return x + radius >= 200 || x - radius <= -200
            || y + radius >= 200 || y - radius <= -200;
   }
}
```

:::

:::snippet{#aufgabe}
a) In `erzeugeKreis` steht `return;` mitten in der Methode. Wann wird es
   erreicht, und was bedeutet das für die Anzahl der Kreise im Bild?

b) Setze `MAX_RADIUS` auf 20 und auf 200. Wie verändert sich der Charakter
   des Bildes?

c) Füge in `stoesstAn` einen Zähler hinzu, der mitzählt, wie oft
   `ueberschneidet` aufgerufen wird, und gib ihn am Ende des Konstruktors mit
   `IO.println(...)` aus. Wie verändert sich die Zahl, wenn du
   `ANZAHL_KREISE` verdoppelst?

d) Begründe: Warum dauert der hundertste Kreis länger als der erste?
:::

::::collapsible{title="Tipp zu c)"}

Der Zähler muss ein **Attribut** sein, keine lokale Variable in `stoesstAn` –
sonst fängt er bei jedem Aufruf wieder bei 0 an.

::::

::::collapsible{title="Tipp zu d)"}

Schau dir die Schleife in `stoesstAn` an. Wie oft läuft sie, wenn schon 99
Kreise im Feld liegen? Und wie oft wird `stoesstAn` beim Wachsen eines
einzigen Kreises aufgerufen?

::::

## Weiterspielen

:::snippet{#challenge}
**Schneller wachsen.** Statt den Radius Bildpunkt für Bildpunkt zu vergrößern,
kann man ihn direkt **ausrechnen**: Der größte erlaubte Radius ist der
kleinste Wert aus „Abstand zum anderen Kreis minus dessen Radius“ über alle
Kreise – und dem Abstand zum nächsten Rand. Baue das ein und miss mit dem
Zähler aus Aufgabe c), wie viel du sparst.
:::

:::snippet{#challenge}
**Gefüllte Kreise.** Fülle jeden Kreis, indem du mehrere Kreise mit
abnehmendem Radius ineinander zeichnest. Gib großen und kleinen Kreisen
verschiedene Farben.
:::

:::snippet{#challenge}
**Kreise in Kreisen.** Erlaube, dass ein Kreis **innerhalb** eines großen
Kreises entsteht, solange er dessen Rand nicht berührt. Wann liegt ein Kreis
vollständig in einem anderen?
:::

:::snippet{#challenge}
**Form vorgeben.** Lass Kreise nur dort entstehen, wo eine Bedingung erfüllt
ist – etwa innerhalb eines großen Kreises, in der Form eines Buchstabens oder
in einem Herz. Der Rest der Leinwand bleibt leer.
:::

---

Nach dem Tutorial [Circle Packing](https://generativeartistry.com/tutorials/circle-packing/)
von Generative Artistry.
