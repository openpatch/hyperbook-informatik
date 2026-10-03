---
name: Un Deux Trois
index: 5
lang: de
permaid: genkunst-un-deux-trois
---

# Un Deux Trois

Vera Molnár (1924–2023) war eine ungarisch-französische Malerin und eine der
ersten Frauen, die mit dem Computer Kunst gemacht haben. Lange bevor sie
einen Computer benutzen durfte, arbeitete sie schon wie einer: Sie dachte
sich Regeln aus und führte sie von Hand aus. Sie nannte das ihre „maschine
imaginaire“ – ihre eingebildete Maschine.

Das Bild *Un Deux Trois* („eins, zwei, drei“) ist einer ihrer Arbeiten
nachempfunden. In jeder Zelle eines Gitters liegt ein Bündel aus Strichen,
jedes zufällig gedreht. Im oberen Drittel ist es ein
Strich, in der Mitte sind es zwei, unten drei. Das Bild wird nach unten
hin dichter und dunkler.

:::snippet{#merken}
**Vorwissen:** [eindimensionale Felder](/oberstufe/oop/01-grundlagen/05-felder),
die Methode `linie` aus [Tiled Lines](./01-tiled-lines) und das Drehen eines
Punktes aus [Cubic Disarray](./03-cubic-disarray).
:::

## Striche in Zellen

Wie viele Striche in einer Zelle liegen und wo, beschreiben wir mit einem
**Feld von Positionen**. Jede Position ist ein Anteil der Zellenbreite:
0 ist der linke Rand, 1 der rechte, 0.5 die Mitte.

| Drittel | Feld | Striche |
| --- | --- | --- |
| oben | `{0.5}` | einer in der Mitte |
| Mitte | `{0.2, 0.8}` | zwei, nahe an den Rändern |
| unten | `{0.1, 0.5, 0.9}` | drei, gleichmäßig verteilt |

Die Methode `zeichne` bekommt das passende Feld als Parameter und zieht für
jede Position einen senkrechten Strich durch die Zelle. Sie muss dafür nicht
wissen, wie viele Striche es sind – `pPositionen.length` verrät es ihr.

:::onlineide{libraries="scratch" height="640px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new UnDeuxTrois());
}
```

```java UnDeuxTrois.java
public class UnDeuxTrois extends Stage {

   private static final int SCHRITT = 20;

   private Pen stift;

   public UnDeuxTrois() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(4);

      double[] eins = {0.5};
      double[] zwei = {0.2, 0.8};
      double[] drei = {0.1, 0.5, 0.9};
      double drittel = 400 / 3.0;

      for (int y = 200 - SCHRITT; y > -200 + SCHRITT; y -= SCHRITT) {
         for (int x = -200 + SCHRITT; x < 200 - SCHRITT; x += SCHRITT) {
            if (y > 200 - drittel) {
               zeichne(x, y, SCHRITT, eins);
            } else if (y > 200 - 2 * drittel) {
               zeichne(x, y, SCHRITT, zwei);
            } else {
               zeichne(x, y, SCHRITT, drei);
            }
         }
      }
   }

   /**
    * Zeichnet senkrechte Striche in eine Zelle.
    * @param pX x-Koordinate der linken oberen Ecke
    * @param pY y-Koordinate der linken oberen Ecke
    * @param pPositionen Lage der Striche als Anteil der Zellenbreite
    */
   private void zeichne(double pX, double pY, double pGroesse, double[] pPositionen) {
      for (int i = 0; i < pPositionen.length; i++) {
         double x = pX + pPositionen[i] * pGroesse;
         linie(x, pY, x, pY - pGroesse);
      }
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
a) Ohne Drehung ist das Bild langweilig, aber man erkennt das Prinzip. Wie
   viele Zellen hat das Gitter, und wie viele Striche werden gezeichnet?

b) Lege ein viertes Feld `vier` an und teile die Leinwand in **Viertel** statt
   in Drittel.

c) Die äußere Schleife zählt `y` **herunter**. Warum ist `y` die obere und
   nicht die untere Kante der Zelle?
:::

## Jede Zelle dreht sich

Jetzt bekommt jede Zelle einen zufälligen Winkel, und alle ihre Striche
drehen sich gemeinsam um die **Mitte der Zelle**. Das ist genau das Verfahren
aus [Cubic Disarray](./03-cubic-disarray): Wir rechnen die Endpunkte jedes
Strichs zuerst relativ zur Zellenmitte aus, drehen sie um den Ursprung und
verschieben sie danach an die richtige Stelle.

Diesmal stecken die beiden Formeln in eigenen Methoden `drehX` und `drehY`.
Der Winkel ist schon im Bogenmaß: `Math.random() * 5` ergibt einen Winkel
zwischen 0 und 5, und 5 im Bogenmaß sind fast eine volle Umdrehung.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new UnDeuxTrois());
}
```

```java UnDeuxTrois.java
public class UnDeuxTrois extends Stage {

   private static final int SCHRITT = 20;

   private Pen stift;

   public UnDeuxTrois() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(4);

      double[] eins = {0.5};
      double[] zwei = {0.2, 0.8};
      double[] drei = {0.1, 0.5, 0.9};
      double drittel = 400 / 3.0;

      for (int y = 200 - SCHRITT; y > -200 + SCHRITT; y -= SCHRITT) {
         for (int x = -200 + SCHRITT; x < 200 - SCHRITT; x += SCHRITT) {
            if (y > 200 - drittel) {
               zeichne(x, y, SCHRITT, eins);
            } else if (y > 200 - 2 * drittel) {
               zeichne(x, y, SCHRITT, zwei);
            } else {
               zeichne(x, y, SCHRITT, drei);
            }
         }
      }
   }

   /**
    * Zeichnet zufällig gedrehte Striche in eine Zelle.
    * @param pX x-Koordinate der linken oberen Ecke
    * @param pY y-Koordinate der linken oberen Ecke
    * @param pPositionen Lage der Striche als Anteil der Zellenbreite
    */
   private void zeichne(double pX, double pY, double pGroesse, double[] pPositionen) {
      double mx = pX + pGroesse / 2;
      double my = pY - pGroesse / 2;
      double winkel = Math.random() * 5;

      for (int i = 0; i < pPositionen.length; i++) {
         double x = (pPositionen[i] - 0.5) * pGroesse;
         double oben = pGroesse / 2;
         double unten = -pGroesse / 2;
         linie(mx + drehX(x, oben, winkel), my + drehY(x, oben, winkel),
               mx + drehX(x, unten, winkel), my + drehY(x, unten, winkel));
      }
   }

   /**
    * Liefert die x-Koordinate des Punktes (pX, pY) nach einer Drehung um den Ursprung.
    */
   private double drehX(double pX, double pY, double pWinkel) {
      return pX * Math.cos(pWinkel) - pY * Math.sin(pWinkel);
   }

   /**
    * Liefert die y-Koordinate des Punktes (pX, pY) nach einer Drehung um den Ursprung.
    */
   private double drehY(double pX, double pY, double pWinkel) {
      return pX * Math.sin(pWinkel) + pY * Math.cos(pWinkel);
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
a) In `zeichne` steht `(pPositionen[i] - 0.5) * pGroesse`. Was berechnet
   dieser Ausdruck? Welche Werte kommen für die Positionen 0.1, 0.5 und 0.9
   bei einer Zellengröße von 20 heraus?

b) Ersetze `Math.random() * 5` durch `Math.random() * 0.3`. Wie verändert sich
   die Stimmung des Bildes?

c) Lass den Winkel von oben nach unten wachsen: oben fast 0, unten bis zu 5.
   Jetzt wird das Bild nach unten nicht nur dichter, sondern auch unruhiger.
:::

::::collapsible{title="Tipp zu a)"}

Die Drehung geschieht um den Ursprung. Damit sie um die **Mitte** der Zelle
geschieht, muss die Zellenmitte vorübergehend der Ursprung sein. Eine Position
von 0.5 muss also 0 ergeben.

::::

## Weiterspielen

:::snippet{#challenge}
**Vier, fünf, sechs.** Erweitere die Reihe. Statt die Felder von Hand
anzulegen, kannst du sie auch ausrechnen: Bei n Strichen liegt Strich k bei
(k + 0.5) / n.
:::

:::snippet{#challenge}
**Zwei Achsen.** Lass die Anzahl der Striche von oben nach unten wachsen und
die Drehung von links nach rechts. Links ist alles gerade, rechts chaotisch.
:::

:::snippet{#challenge}
**Molnárs Farben.** Vera Molnár hat oft nur eine einzige Farbe neben Schwarz
benutzt. Färbe in jeder Zelle mit einer kleinen Wahrscheinlichkeit, etwa 5 %,
alle Striche rot.
:::

---

Nach dem Tutorial [Un Deux Trois](https://generativeartistry.com/tutorials/un-deux-trois/)
von Generative Artistry.
