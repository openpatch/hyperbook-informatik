import org.openpatch.scratch.*;

/// Deine Spielwelt. Hier stellst du alles auf, was im Spiel vorkommt.
public class Welt extends Spielwelt {

   /// So viele Münzen hat der Spieler schon eingesammelt.
   private int punkte = 0;
   /// So viele Münzen liegen insgesamt in der Welt.
   private int anzahlMuenzen = 0;
   /// So viele Sekunden bleiben noch.
   private double zeit = 30;
   /// Solange das true ist, läuft das Spiel noch.
   private boolean laeuft = true;
   /// Die Anzeige oben links.
   private Text anzeige;
   /// Die Spielfigur. Sie ist eine Variable der Welt, damit run() sie anhalten kann.
   private Spieler held;

   /// Der Plan der Welt: jede Zeichenkette eine Zeile, jedes Zeichen ein Feld von 48 × 48 Pixeln.
   /// `#` Stein, `B` Baum, `T` Tanne, `F` Fels, `M` Münze, `S` Start, `.` Wiese
   private String[] plan = {
      "################",
      "#S.....M.......#",
      "#..B.......F...#",
      "#......M.......#",
      "#.M.....T....M.#",
      "#..............#",
      "#..M..B....M...#",
      "#.........M....#",
      "################"
   };

   public Welt() {
      held = new Spieler("boy");

      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            char zeichen = plan[z].charAt(s);
            double x = this.zuX(s);
            double y = this.zuY(z);
            if (zeichen == '#') {
               this.setzeStein(x, y);
            } else if (zeichen == 'B') {
               this.setzePflanze(0, 0, x, y);
            } else if (zeichen == 'T') {
               this.setzePflanze(32, 0, x, y);
            } else if (zeichen == 'F') {
               this.setzePflanze(256, 128, x, y);
            } else if (zeichen == 'M') {
               this.setzeMuenze(x, y);
            } else if (zeichen == 'S') {
               held.setPosition(x, y);
            }
         }
      }

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      this.add(held);
   }

   /// Die x-Koordinate der Mitte von Spalte pSpalte. Spalte 0 liegt ganz links.
   private double zuX(int pSpalte) {
      return -360 + pSpalte * 48;
   }

   /// Die y-Koordinate der Mitte von Zeile pZeile. Zeile 0 liegt ganz oben.
   private double zuY(int pZeile) {
      return 192 - pZeile * 48;
   }

   /// Setzt einen Stein, 16 × 16 Pixel groß, an die Stelle (pX, pY).
   private void setzeStein(double pX, double pY) {
      Hindernis stein = new Hindernis();
      stein.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      stein.setPosition(pX, pY);
      this.add(stein);
   }

   /// Setzt eine große Pflanze oder einen Felsen an die Stelle (pX, pY).
   /// pBildX und pBildY geben die linke obere Ecke im Kachelbild an, das Stück ist 32 × 32 Pixel groß.
   private void setzePflanze(int pBildX, int pBildY, double pX, double pY) {
      Hindernis pflanze = new Hindernis();
      pflanze.addCostume("pflanze", "assets/backgrounds/tilesets/tileset-nature.png", pBildX, pBildY, 32, 32);
      pflanze.setPosition(pX, pY);
      this.add(pflanze);
   }

   /// Legt eine Münze an die Stelle (pX, pY) und zählt sie mit.
   private void setzeMuenze(double pX, double pY) {
      Muenze m = new Muenze();
      m.setPosition(pX, pY);
      this.add(m);
      anzahlMuenzen = anzahlMuenzen + 1;
   }

   /// Liefert true, wenn alle Münzen eingesammelt sind.
   private boolean istGewonnen() {
      return punkte == anzahlMuenzen;
   }

   /// Hält das Spiel an und zeigt pMeldung an.
   private void beende(String pMeldung) {
      laeuft = false;
      held.setTempo(0);
      anzeige.showText(pMeldung);
   }

   /// Wird jedes Mal ausgeführt, wenn der Spieler eine Münze einsammelt.
   public void wennMuenzeEingesammelt() {
      punkte = punkte + 1;
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      if (laeuft) {
         zeit = zeit - 1.0 / 60;

         if (this.istGewonnen()) {
            this.beende("Gewonnen! Noch " + (int) zeit + " Sekunden übrig.");
         } else if (zeit <= 0) {
            this.beende("Die Zeit ist um! " + punkte + " von " + anzahlMuenzen + " Münzen.");
         } else {
            anzeige.showText("Münzen: " + punkte + " von " + anzahlMuenzen + "   Zeit: " + (int) zeit);
         }
      }
   }
}
