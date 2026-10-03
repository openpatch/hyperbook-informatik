---
name: Hypnotic Squares
index: 7
lang: de
permaid: genkunst-hypnotic-squares
---

# Hypnotic Squares

William Kolomyjec gehört wie Georg Nees und Vera Molnár zu den frühen
Computerkünstlern. Seine Bilder bestehen aus ganz einfachen Formen, die in
Kacheln angeordnet sind und sich in sich selbst wiederholen. In *Hypnotic
Squares* steckt in jedem Quadrat ein kleineres Quadrat, darin ein noch
kleineres – und alle rutschen ein wenig zur Seite, sodass man in einen Tunnel
zu schauen glaubt.

„Ein Quadrat, in dem wieder so etwas steckt“ – das ist eine Beschreibung, die
sich selbst enthält. In der Informatik heißt so etwas **Rekursion**.

:::snippet{#merken}
**Vorwissen:** [Rekursion](/oberstufe/oop/02-erweiterungen/03-rekursion-und-problemloesestrategien/01-rekursion)
und verschachtelte Schleifen.
:::

## Quadrate in Quadraten

Die Methode `zeichne` zeichnet ein Quadrat. Solange noch Schritte übrig sind,
rechnet sie die Größe des nächstkleineren Quadrats aus, setzt es in die Mitte
und ruft **sich selbst** damit auf – mit einem Schritt weniger.

Die Größe nimmt dabei gleichmäßig ab: Beim ersten Aufruf ist sie fast so groß
wie die Kachel, beim letzten nur noch `ENDGROESSE`. Damit das innere Quadrat
mittig sitzt, muss es um die Hälfte des Größenunterschieds nach rechts und
oben rücken.

:::onlineide{libraries="scratch" height="640px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new HypnoticSquares());
}
```

```java HypnoticSquares.java
public class HypnoticSquares extends Stage {

   private static final int STUFEN = 6;
   private static final double ENDGROESSE = 3;

   private Pen stift;
   private double startGroesse;

   public HypnoticSquares() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      startGroesse = 300;
      zeichne(-150, -150, startGroesse, STUFEN - 1);
   }

   /**
    * Zeichnet ein Quadrat und darin rekursiv immer kleinere Quadrate.
    * @param pX x-Koordinate der linken unteren Ecke
    * @param pY y-Koordinate der linken unteren Ecke
    * @param pSchritte wie viele Quadrate noch hineinkommen
    */
   private void zeichne(double pX, double pY, double pGroesse, int pSchritte) {
      quadrat(pX, pY, pGroesse);

      if (pSchritte >= 0) {
         double neueGroesse = startGroesse * pSchritte / STUFEN + ENDGROESSE;
         double neuX = pX + (pGroesse - neueGroesse) / 2;
         double neuY = pY + (pGroesse - neueGroesse) / 2;
         zeichne(neuX, neuY, neueGroesse, pSchritte - 1);
      }
   }

   /**
    * Zeichnet ein Quadrat mit der linken unteren Ecke (pX, pY).
    */
   private void quadrat(double pX, double pY, double pSeite) {
      stift.up();
      stift.setPosition(pX, pY);
      stift.down();
      stift.setPosition(pX + pSeite, pY);
      stift.setPosition(pX + pSeite, pY + pSeite);
      stift.setPosition(pX, pY + pSeite);
      stift.setPosition(pX, pY);
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Wie viele Quadrate siehst du bei `STUFEN = 6`? Zähle nach und erkläre die
   Zahl mit dem Code.

b) Was ist hier die **Abbruchbedingung**, was der **rekursive Aufruf**?

c) Setze `STUFEN` auf 1, 2 und 20.

d) Entferne `- 1` aus dem rekursiven Aufruf. Was passiert – und warum meldet
   die Online-IDE irgendwann einen Fehler?
:::

::::collapsible{title="Tipp zu a)"}

Der erste Aufruf bekommt `STUFEN - 1`, also 5. Jeder Aufruf zeichnet ein
Quadrat. Neue Aufrufe gibt es, solange `pSchritte >= 0` gilt – also für
welche Werte?

::::

## Der Tunnel kippt

Jetzt schieben wir jedes innere Quadrat zusätzlich ein Stück nach links oder
rechts und nach oben oder unten. Die Richtung kommt aus dem Feld
`{-1, 0, 1}`: −1 heißt nach links (bzw. unten), 0 bleibt in der Mitte, 1 heißt
nach rechts (bzw. oben). Je tiefer die Rekursion, desto weiter rutscht das
Quadrat – so entsteht der Eindruck eines Tunnels, der zur Seite wegknickt.

Dann legen wir 7 × 7 solcher Kacheln nebeneinander, jede mit zufälliger
Richtung und zufälliger Anzahl von Stufen. Die Anzahl der Stufen muss sich
`zeichne` jetzt merken können, deshalb steht sie in einem Attribut.

:::onlineide{libraries="scratch" height="720px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new HypnoticSquares());
}
```

```java HypnoticSquares.java
public class HypnoticSquares extends Stage {

   private static final int KACHELN = 7;
   private static final double RAND = 4;
   private static final double ENDGROESSE = 3;

   private Pen stift;
   private double startGroesse;
   private int stufen;

   public HypnoticSquares() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);
      stift.setSize(2);

      startGroesse = (400 - 2 * RAND) / KACHELN;
      int[] richtungen = {-1, 0, 1};

      for (int spalte = 0; spalte < KACHELN; spalte++) {
         for (int zeile = 0; zeile < KACHELN; zeile++) {
            double x = -200 + RAND + spalte * startGroesse;
            double y = -200 + RAND + zeile * startGroesse;
            stufen = 3 + (int) (Math.random() * 3);
            int richtungX = richtungen[(int) (Math.random() * 3)];
            int richtungY = richtungen[(int) (Math.random() * 3)];
            zeichne(x, y, startGroesse, richtungX, richtungY, stufen - 1);
         }
      }
   }

   /**
    * Zeichnet ein Quadrat und darin rekursiv immer kleinere, verschobene Quadrate.
    * @param pX x-Koordinate der linken unteren Ecke
    * @param pY y-Koordinate der linken unteren Ecke
    * @param pRichtungX -1, 0 oder 1: wohin die inneren Quadrate waagerecht rutschen
    * @param pRichtungY -1, 0 oder 1: wohin die inneren Quadrate senkrecht rutschen
    * @param pSchritte wie viele Quadrate noch hineinkommen
    */
   private void zeichne(double pX, double pY, double pGroesse,
                        int pRichtungX, int pRichtungY, int pSchritte) {
      quadrat(pX, pY, pGroesse);

      if (pSchritte >= 0) {
         double neueGroesse = startGroesse * pSchritte / stufen + ENDGROESSE;
         double neuX = pX + (pGroesse - neueGroesse) / 2;
         double neuY = pY + (pGroesse - neueGroesse) / 2;

         neuX = neuX - (pX - neuX) / (pSchritte + 2) * pRichtungX;
         neuY = neuY - (pY - neuY) / (pSchritte + 2) * pRichtungY;

         zeichne(neuX, neuY, neueGroesse, pRichtungX, pRichtungY, pSchritte - 1);
      }
   }

   /**
    * Zeichnet ein Quadrat mit der linken unteren Ecke (pX, pY).
    */
   private void quadrat(double pX, double pY, double pSeite) {
      stift.up();
      stift.setPosition(pX, pY);
      stift.down();
      stift.setPosition(pX + pSeite, pY);
      stift.setPosition(pX + pSeite, pY + pSeite);
      stift.setPosition(pX, pY + pSeite);
      stift.setPosition(pX, pY);
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) `pX - neuX` ist der Abstand zwischen der linken Kante des äußeren und der
   des inneren Quadrats – mit negativem Vorzeichen. Warum rutscht das innere
   Quadrat bei `pRichtungX = 1` nach **rechts**?

b) Warum wird durch `pSchritte + 2` geteilt und nicht durch `pSchritte`?
   Probiere es aus.

c) Ersetze das Feld `{-1, 0, 1}` durch `{-1, 1}`. Früher oder später bricht
   das Programm mit einem Fehler ab. Finde heraus, warum, und behebe es so,
   dass das Programm mit **jedem** Feld von Richtungen funktioniert. Was fehlt
   danach im Bild?

d) Setze `KACHELN` auf 3 und auf 15.
:::

::::collapsible{title="Tipp zu b)"}

Beim letzten rekursiven Aufruf ist `pSchritte` gleich 0.

::::

::::collapsible{title="Tipp zu c)"}

`(int) (Math.random() * 3)` ist 0, 1 oder 2. Welche Indizes hat ein Feld mit
zwei Einträgen? Statt der 3 kann dort etwas stehen, das sich nach dem Feld
richtet.

::::

## Weiterspielen

:::snippet{#challenge}
**Kreise statt Quadrate.** Ersetze die Quadrate durch Kreise. Wie man einen
Kreis aus Linien zeichnet, steht auf der Seite [Circle Packing](./06-circle-packing).
:::

:::snippet{#challenge}
**Ein Fluchtpunkt.** Lass alle Tunnel in Richtung einer gemeinsamen Stelle
kippen, zum Beispiel zur Mitte der Leinwand. Statt −1, 0 oder 1 brauchst du
dann für jede Kachel eine Kommazahl, die von ihrer Lage abhängt.
:::

:::snippet{#challenge}
**Tiefe als Farbe.** Färbe jedes Quadrat abhängig von `pSchritte`: die
äußeren hell, die inneren dunkel. Der Tunnel bekommt dadurch Tiefe.
:::

---

Nach dem Tutorial [Hypnotic Squares](https://generativeartistry.com/tutorials/hypnotic-squares/)
von Generative Artistry.
