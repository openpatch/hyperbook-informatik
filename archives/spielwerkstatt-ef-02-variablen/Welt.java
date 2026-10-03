import org.openpatch.scratch.*;

/// Deine Spielwelt. Hier stellst du alles auf, was im Spiel vorkommt.
public class Welt extends Spielwelt {

   /// So viele Münzen hat der Spieler schon eingesammelt.
   private int punkte = 0;
   /// So viele Sekunden bleiben noch.
   private double zeit = 30;
   /// Die Anzeige oben links.
   private Text anzeige;

   public Welt() {
      Hindernis baum = new Hindernis();
      baum.addCostume("baum", "assets/backgrounds/tilesets/tileset-nature.png", 0, 0, 32, 32);
      baum.setPosition(-120, 90);
      this.add(baum);

      Hindernis tanne = new Hindernis();
      tanne.addCostume("tanne", "assets/backgrounds/tilesets/tileset-nature.png", 32, 0, 32, 32);
      tanne.setPosition(140, -80);
      this.add(tanne);

      Hindernis fels = new Hindernis();
      fels.addCostume("fels", "assets/backgrounds/tilesets/tileset-nature.png", 256, 128, 32, 32);
      fels.setPosition(220, 110);
      this.add(fels);

      Muenze m1 = new Muenze();
      m1.setPosition(-200, -120);
      this.add(m1);

      Muenze m2 = new Muenze();
      m2.setPosition(40, 150);
      this.add(m2);

      Muenze m3 = new Muenze();
      m3.setPosition(300, -150);
      this.add(m3);

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      Spieler held = new Spieler("boy");
      held.setPosition(-300, 0);
      this.add(held);
   }

   /// Wird jedes Mal ausgeführt, wenn der Spieler eine Münze einsammelt.
   public void wennMuenzeEingesammelt() {
      punkte = punkte + 1;
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      // 60-mal in der Sekunde ein Sechzigstel abziehen: nach einer Sekunde ist eine weg.
      zeit = zeit - 1.0 / 60;
      anzeige.showText("Münzen: " + punkte + "   Zeit: " + (int) zeit);
   }
}
