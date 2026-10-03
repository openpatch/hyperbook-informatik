---
name: Piet Mondrian
index: 8
lang: de
permaid: genkunst-piet-mondrian
---

# Piet Mondrian

Piet Mondrian (1872–1944) war ein niederländischer Maler. Seine bekanntesten
Bilder kommen mit erstaunlich wenig aus: schwarze, waagerechte und senkrechte
Balken, weiße Flächen dazwischen und ein paar Felder in Rot, Blau und Gelb.
Mondrian hat nie einen Computer benutzt – aber seine Bilder sehen so aus,
als folgten sie einer Regel. Wir suchen eine.

Unsere Regel: Beginne mit einem einzigen Rechteck, der ganzen Leinwand. Geh
dann an festen Stellen entlang und schneide jedes Rechteck, das dort liegt,
**mit einer Wahrscheinlichkeit von 50 %** in zwei Teile. Zum Schluss färbe drei
zufällige Rechtecke ein.

:::snippet{#merken}
**Vorwissen:** [Klassen und Objekte](/oberstufe/oop/01-grundlagen/06-objektorientierung/01-klassen-und-objekte),
[eindimensionale Felder](/oberstufe/oop/01-grundlagen/05-felder) und die
Methode `linie` aus [Tiled Lines](./01-tiled-lines).
:::

## Rechtecke teilen

Ein Rechteck merkt sich seine linke untere Ecke (x, y), seine Breite und seine
Höhe. Es kann außerdem zwei Dinge selbst beantworten:

- Liegt eine senkrechte Schnittlinie bei `pX` **innerhalb** von mir?
  (`enthaeltX`, entsprechend `enthaeltY`)
- Wie sehen meine beiden Teile aus, wenn man mich dort schneidet?
  (`linkerTeil` und `rechterTeil`, entsprechend `untererTeil` und `obererTeil`)

Alle Rechtecke stehen in einem Feld. Wird eines geteilt, ersetzt der erste Teil
das alte Rechteck an seinem Platz, und der zweite Teil wird hinten angehängt.
Die Schleife läuft dabei nur über die Rechtecke, die es **vor** dem Teilen
schon gab – die Anzahl merkt sie sich am Anfang in `bisher`.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new Mondrian());
}
```

```java Mondrian.java
public class Mondrian extends Stage {

   private static final double SCHRITT = 400 / 6.0;

   private Pen stift;
   private Rechteck[] rechtecke = new Rechteck[100];
   private int anzahl = 0;

   public Mondrian() {
      this.setColor(242, 245, 241);
      stift = new Pen();
      this.add(stift);

      rechtecke[0] = new Rechteck(-200, -200, 400, 400);
      anzahl = 1;

      for (double i = -200; i < 200; i += SCHRITT) {
         teileWaagerecht(i);
         teileSenkrecht(i);
      }

      for (int i = 0; i < anzahl; i++) {
         umrande(rechtecke[i]);
      }
   }

   /**
    * Teilt jedes Rechteck, durch das die senkrechte Linie bei pX geht, mit 50 % Wahrscheinlichkeit.
    */
   private void teileSenkrecht(double pX) {
      int bisher = anzahl;
      for (int i = 0; i < bisher; i++) {
         Rechteck r = rechtecke[i];
         if (r.enthaeltX(pX) && Math.random() > 0.5) {
            rechtecke[i] = r.linkerTeil(pX);
            rechtecke[anzahl] = r.rechterTeil(pX);
            anzahl++;
         }
      }
   }

   /**
    * Teilt jedes Rechteck, durch das die waagerechte Linie bei pY geht, mit 50 % Wahrscheinlichkeit.
    */
   private void teileWaagerecht(double pY) {
      int bisher = anzahl;
      for (int i = 0; i < bisher; i++) {
         Rechteck r = rechtecke[i];
         if (r.enthaeltY(pY) && Math.random() > 0.5) {
            rechtecke[i] = r.untererTeil(pY);
            rechtecke[anzahl] = r.obererTeil(pY);
            anzahl++;
         }
      }
   }

   /**
    * Zeichnet einen dicken schwarzen Rand um das Rechteck.
    */
   private void umrande(Rechteck pR) {
      stift.setColor(20, 20, 20);
      stift.setSize(8);
      double x = pR.getX();
      double y = pR.getY();
      stift.up();
      stift.setPosition(x, y);
      stift.down();
      stift.setPosition(x + pR.getBreite(), y);
      stift.setPosition(x + pR.getBreite(), y + pR.getHoehe());
      stift.setPosition(x, y + pR.getHoehe());
      stift.setPosition(x, y);
      stift.up();
   }
}
```

```java Rechteck.java
public class Rechteck {

   private double x;
   private double y;
   private double breite;
   private double hoehe;

   public Rechteck(double pX, double pY, double pBreite, double pHoehe) {
      x = pX;
      y = pY;
      breite = pBreite;
      hoehe = pHoehe;
   }

   public double getX() {
      return x;
   }

   public double getY() {
      return y;
   }

   public double getBreite() {
      return breite;
   }

   public double getHoehe() {
      return hoehe;
   }

   public boolean enthaeltX(double pX) {
      return pX > x && pX < x + breite;
   }

   public boolean enthaeltY(double pY) {
      return pY > y && pY < y + hoehe;
   }

   public Rechteck linkerTeil(double pX) {
      return new Rechteck(x, y, pX - x, hoehe);
   }

   public Rechteck rechterTeil(double pX) {
      return new Rechteck(pX, y, x + breite - pX, hoehe);
   }

   public Rechteck untererTeil(double pY) {
      return new Rechteck(x, y, breite, pY - y);
   }

   public Rechteck obererTeil(double pY) {
      return new Rechteck(x, pY, breite, y + hoehe - pY);
   }
}
```

:::

:::snippet{#aufgabe}
a) Gib am Ende des Konstruktors mit `IO.println(anzahl)` aus, wie viele
   Rechtecke entstanden sind. Starte mehrmals. Was ist die kleinste, was die
   größte mögliche Anzahl?

b) Ersetze `Math.random() > 0.5` durch `Math.random() > 0.2` und durch
   `Math.random() > 0.8`.

c) Ersetze in `teileSenkrecht` die Zeile `for (int i = 0; i < bisher; i++)`
   durch `for (int i = 0; i < anzahl; i++)`. Jetzt prüft die Schleife auch die
   frisch angehängten Teile. Ändert sich dadurch etwas am Bild? Begründe mit
   der Methode `enthaeltX`.

d) Das Feld hat 100 Plätze. Reicht das immer? Begründe mit deiner Antwort
   aus a).
:::

::::collapsible{title="Tipp zu a)"}

Die Schnittlinien liegen bei −200 + k · 400/6. Bei −200 selbst wird nie
geschnitten – warum nicht? Es bleiben fünf senkrechte und fünf waagerechte
Linien. Wie viele Felder entstehen, wenn **jedes** Mal geschnitten wird?

::::

## Farbe ins Bild

Jetzt bekommt jedes Rechteck eine Farbe. Am Anfang ist sie das warme Weiß
von Mondrians Leinwänden. Drei zufällige Rechtecke werden danach rot, blau
und gelb.

Gefüllt wird wieder mit vielen Linien: Für jede Höhe von unten nach oben zieht
der Stift eine waagerechte Linie durch das ganze Rechteck. Erst wenn alle
Rechtecke gefüllt sind, kommen die schwarzen Ränder darüber.

:::onlineide{libraries="scratch" height="700px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new Mondrian());
}
```

```java Mondrian.java
public class Mondrian extends Stage {

   private static final double SCHRITT = 400 / 6.0;

   private Pen stift;
   private Rechteck[] rechtecke = new Rechteck[100];
   private int anzahl = 0;

   public Mondrian() {
      stift = new Pen();
      this.add(stift);

      rechtecke[0] = new Rechteck(-200, -200, 400, 400);
      anzahl = 1;

      for (double i = -200; i < 200; i += SCHRITT) {
         teileWaagerecht(i);
         teileSenkrecht(i);
      }

      Color[] farben = {new Color(212, 9, 32), new Color(19, 86, 162), new Color(247, 216, 66)};
      for (int i = 0; i < farben.length; i++) {
         int zufall = (int) (Math.random() * anzahl);
         rechtecke[zufall].setFarbe(farben[i]);
      }

      for (int i = 0; i < anzahl; i++) {
         fuelle(rechtecke[i]);
      }
      for (int i = 0; i < anzahl; i++) {
         umrande(rechtecke[i]);
      }
   }

   /**
    * Teilt jedes Rechteck, durch das die senkrechte Linie bei pX geht, mit 50 % Wahrscheinlichkeit.
    */
   private void teileSenkrecht(double pX) {
      int bisher = anzahl;
      for (int i = 0; i < bisher; i++) {
         Rechteck r = rechtecke[i];
         if (r.enthaeltX(pX) && Math.random() > 0.5) {
            rechtecke[i] = r.linkerTeil(pX);
            rechtecke[anzahl] = r.rechterTeil(pX);
            anzahl++;
         }
      }
   }

   /**
    * Teilt jedes Rechteck, durch das die waagerechte Linie bei pY geht, mit 50 % Wahrscheinlichkeit.
    */
   private void teileWaagerecht(double pY) {
      int bisher = anzahl;
      for (int i = 0; i < bisher; i++) {
         Rechteck r = rechtecke[i];
         if (r.enthaeltY(pY) && Math.random() > 0.5) {
            rechtecke[i] = r.untererTeil(pY);
            rechtecke[anzahl] = r.obererTeil(pY);
            anzahl++;
         }
      }
   }

   /**
    * Füllt das Rechteck mit waagerechten Linien in seiner Farbe.
    */
   private void fuelle(Rechteck pR) {
      stift.setColor(pR.getFarbe());
      stift.setSize(2);
      for (double y = pR.getY(); y <= pR.getY() + pR.getHoehe(); y += 1) {
         linie(pR.getX(), y, pR.getX() + pR.getBreite(), y);
      }
   }

   /**
    * Zeichnet einen dicken schwarzen Rand um das Rechteck.
    */
   private void umrande(Rechteck pR) {
      stift.setColor(20, 20, 20);
      stift.setSize(8);
      double x = pR.getX();
      double y = pR.getY();
      stift.up();
      stift.setPosition(x, y);
      stift.down();
      stift.setPosition(x + pR.getBreite(), y);
      stift.setPosition(x + pR.getBreite(), y + pR.getHoehe());
      stift.setPosition(x, y + pR.getHoehe());
      stift.setPosition(x, y);
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

```java Rechteck.java
public class Rechteck {

   private double x;
   private double y;
   private double breite;
   private double hoehe;
   private Color farbe;

   public Rechteck(double pX, double pY, double pBreite, double pHoehe) {
      x = pX;
      y = pY;
      breite = pBreite;
      hoehe = pHoehe;
      farbe = new Color(242, 245, 241);
   }

   public double getX() {
      return x;
   }

   public double getY() {
      return y;
   }

   public double getBreite() {
      return breite;
   }

   public double getHoehe() {
      return hoehe;
   }

   public Color getFarbe() {
      return farbe;
   }

   public void setFarbe(Color pFarbe) {
      farbe = pFarbe;
   }

   public boolean enthaeltX(double pX) {
      return pX > x && pX < x + breite;
   }

   public boolean enthaeltY(double pY) {
      return pY > y && pY < y + hoehe;
   }

   public Rechteck linkerTeil(double pX) {
      return new Rechteck(x, y, pX - x, hoehe);
   }

   public Rechteck rechterTeil(double pX) {
      return new Rechteck(pX, y, x + breite - pX, hoehe);
   }

   public Rechteck untererTeil(double pY) {
      return new Rechteck(x, y, breite, pY - y);
   }

   public Rechteck obererTeil(double pY) {
      return new Rechteck(x, pY, breite, y + hoehe - pY);
   }
}
```

:::

:::snippet{#aufgabe}
a) Manchmal sind im fertigen Bild nur zwei farbige Felder zu sehen statt drei.
   Woran liegt das? Ändere das Programm so, dass es immer drei sind.

b) Vertausche die beiden letzten Schleifen im Konstruktor, sodass zuerst
   umrandet und danach gefüllt wird. Was passiert?

c) Die geteilten Rechtecke übernehmen ihre Farbe nicht. Warum ist das hier
   egal?
:::

::::collapsible{title="Tipp zu a)"}

`Math.random()` kann zweimal hintereinander dieselbe Zahl `zufall` liefern.
Du kannst so lange neu würfeln, bis du ein Rechteck triffst, das noch weiß ist.
Wie erkennst du das? Vergleiche Farben mit `equals`, nicht mit `==`.

::::

## Weiterspielen

:::snippet{#challenge}
**Echte Mondrians sind nicht gleichmäßig.** In seinen Bildern liegen die
Linien nicht in festen Abständen. Wähle die Schnittstellen zufällig, statt
`SCHRITT` zu benutzen.
:::

:::snippet{#challenge}
**Große Flächen färben.** Mondrian hat selten winzige Felder eingefärbt. Färbe
nur Rechtecke, deren Fläche größer als ein bestimmter Wert ist – oder färbe
gezielt das größte.
:::

:::snippet{#challenge}
**Eigene Palette.** Ersetze Rot, Blau und Gelb durch andere Farben, etwa die
Farben deiner Schule oder deines Lieblingsvereins. Ist es dann noch ein
Mondrian?
:::

:::snippet{#challenge}
**Rekursiv teilen.** Ganz anders, aber genauso schön: Teile die Leinwand an
einer zufälligen Stelle und teile **jede Hälfte** wieder mit derselben
Methode – bis die Teile zu klein werden. Das ist Rekursion wie auf der Seite
[Hypnotic Squares](./07-hypnotic-squares).
:::

---

Nach dem Tutorial [Piet Mondrian](https://generativeartistry.com/tutorials/piet-mondrian/)
von Generative Artistry.
