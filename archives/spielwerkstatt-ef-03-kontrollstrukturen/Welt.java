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
      // Ein Rahmen aus Steinen, damit niemand aus dem Bild läuft:
      // oben und unten je eine Reihe ...
      for (int x = -360; x <= 360; x = x + 48) {
         Hindernis oben = new Hindernis();
         oben.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
         oben.setPosition(x, 192);
         this.add(oben);

         Hindernis unten = new Hindernis();
         unten.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
         unten.setPosition(x, -192);
         this.add(unten);
      }
      // ... und links und rechts je eine Spalte.
      for (int y = -144; y <= 144; y = y + 48) {
         Hindernis links = new Hindernis();
         links.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
         links.setPosition(-360, y);
         this.add(links);

         Hindernis rechts = new Hindernis();
         rechts.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
         rechts.setPosition(360, y);
         this.add(rechts);
      }

      Hindernis baum = new Hindernis();
      baum.addCostume("baum", "assets/backgrounds/tilesets/tileset-nature.png", 0, 0, 32, 32);
      baum.setPosition(-120, 90);
      this.add(baum);

      Hindernis tanne = new Hindernis();
      tanne.addCostume("tanne", "assets/backgrounds/tilesets/tileset-nature.png", 32, 0, 32, 32);
      tanne.setPosition(140, -40);
      this.add(tanne);

      Hindernis fels = new Hindernis();
      fels.addCostume("fels", "assets/backgrounds/tilesets/tileset-nature.png", 256, 128, 32, 32);
      fels.setPosition(220, 110);
      this.add(fels);

      // Eine Reihe aus fünf Münzen am unteren Rand.
      for (int x = -160; x <= 160; x = x + 80) {
         Muenze m = new Muenze();
         m.setPosition(x, -130);
         this.add(m);
         anzahlMuenzen = anzahlMuenzen + 1;
      }

      Muenze versteck = new Muenze();
      versteck.setPosition(300, 140);
      this.add(versteck);
      anzahlMuenzen = anzahlMuenzen + 1;

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      held = new Spieler("boy");
      held.setPosition(-280, 0);
      this.add(held);
   }

   /// Wird jedes Mal ausgeführt, wenn der Spieler eine Münze einsammelt.
   public void wennMuenzeEingesammelt() {
      punkte = punkte + 1;
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      if (laeuft) {
         zeit = zeit - 1.0 / 60;

         if (punkte == anzahlMuenzen) {
            laeuft = false;
            held.setTempo(0);
            anzeige.showText("Gewonnen! Noch " + (int) zeit + " Sekunden übrig.");
         } else if (zeit <= 0) {
            laeuft = false;
            held.setTempo(0);
            anzeige.showText("Die Zeit ist um! " + punkte + " von " + anzahlMuenzen + " Münzen.");
         } else {
            anzeige.showText("Münzen: " + punkte + " von " + anzahlMuenzen + "   Zeit: " + (int) zeit);
         }
      }
   }
}
