import org.openpatch.scratch.*;

/// Deine Spielwelt. Hier stellst du alles auf, was im Spiel vorkommt.
public class Welt extends Spielwelt {

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

      Text titel = new Text("Sammle alle Münzen!", 0, 200, 400);
      titel.setTextSize(20);
      titel.setTextColor(255, 255, 255);
      this.add(titel);

      Spieler held = new Spieler("boy");
      held.setPosition(-300, 0);
      this.add(held);
   }

   // Die beiden Blöcke hier unten brauchst du ab dem Kapitel über Variablen.
   // Sie funktionieren wie die Ereignisblöcke in Scratch.

   /// Wird jedes Mal ausgeführt, wenn der Spieler eine Münze einsammelt.
   public void wennMuenzeEingesammelt() {
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
   }
}
