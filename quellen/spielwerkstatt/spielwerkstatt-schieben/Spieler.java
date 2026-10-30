import org.openpatch.scratch.*;

/// Die Figur, die du mit den Pfeiltasten steuerst. Sie schiebt Kisten vor sich her.
public class Spieler extends Sprite {

   /// So viele Pixel geht der Spieler in jedem Bild.
   public static final int TEMPO = 3;

   private static final String BILD = "assets/actor/character/boy/sprite-sheet.png";

   private Welt welt;
   /// Ob der Spieler im letzten Bild schon eine Kiste geschoben hat.
   private boolean schiebtGerade = false;

   public Spieler(Welt pWelt) {
      welt = pWelt;
      // Im Bild steht jede Blickrichtung in einer eigenen Spalte,
      // die vier Schritte untereinander.
      this.addAnimation("unten", BILD, 16, 16, 0, 4, 8, 12);
      this.addAnimation("oben", BILD, 16, 16, 1, 5, 9, 13);
      this.addAnimation("links", BILD, 16, 16, 2, 6, 10, 14);
      this.addAnimation("rechts", BILD, 16, 16, 3, 7, 11, 15);
      this.setAnimationInterval(0.15);
      this.setSize(250);
   }

   public void run() {
      double altX = this.getX();
      double altY = this.getY();
      double dx = 0;
      double dy = 0;

      if (this.isKeyPressed(KeyCode.RIGHT)) {
         dx = TEMPO;
         this.playAnimation("rechts");
      } else if (this.isKeyPressed(KeyCode.LEFT)) {
         dx = -TEMPO;
         this.playAnimation("links");
      } else if (this.isKeyPressed(KeyCode.UP)) {
         dy = TEMPO;
         this.playAnimation("oben");
      } else if (this.isKeyPressed(KeyCode.DOWN)) {
         dy = -TEMPO;
         this.playAnimation("unten");
      }
      this.changePosition(dx, dy);

      // Steht eine Kiste im Weg, wird sie mitgeschoben - wenn sie kann.
      boolean schiebt = false;
      Kiste k = this.getTouchingSprite(Kiste.class);
      if (k != null && (dx != 0 || dy != 0)) {
         double kisteX = k.getX();
         double kisteY = k.getY();
         if (k.schiebe(dx, dy)) {
            schiebt = true;
            // Ein neuer Zug beginnt, wenn vorher nicht geschoben wurde.
            if (!schiebtGerade) {
               welt.merke(new Zug(k, kisteX, kisteY, altX, altY));
            }
         } else {
            this.setPosition(altX, altY);
         }
      }
      schiebtGerade = schiebt;

      // In eine Wand hineingelaufen? Dann zurück auf den alten Platz.
      if (this.getTouchingSprite(Wand.class) != null) {
         this.setPosition(altX, altY);
      }

      Muenze m = this.getTouchingSprite(Muenze.class);
      if (m != null) {
         m.einsammeln();
         welt.punkten();
      }
   }
}
