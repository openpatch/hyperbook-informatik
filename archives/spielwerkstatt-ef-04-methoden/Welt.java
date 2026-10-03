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

   public Welt() {
      this.baueRahmen();

      this.setzePflanze(0, 0, -120, 90);      // Baum
      this.setzePflanze(32, 0, 140, -40);     // Tanne
      this.setzePflanze(256, 128, 220, 110);  // Fels

      for (int x = -160; x <= 160; x = x + 80) {
         this.setzeMuenze(x, -130);
      }
      this.setzeMuenze(300, 140);

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      held = new Spieler("boy");
      held.setPosition(-280, 0);
      this.add(held);
   }

   /// Umgibt die Wiese mit einem Rahmen aus Steinen.
   private void baueRahmen() {
      for (int x = -360; x <= 360; x = x + 48) {
         this.setzeStein(x, 192);
         this.setzeStein(x, -192);
      }
      for (int y = -144; y <= 144; y = y + 48) {
         this.setzeStein(-360, y);
         this.setzeStein(360, y);
      }
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
