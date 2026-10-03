import org.openpatch.scratch.*;

/// Die Figur, die du mit den Pfeiltasten steuerst. Sie schiebt Kisten vor sich her.
public class Spieler extends AnimatedSprite {

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
      this.addAnimation("unten", BILD, 4, 16, 16, 0, true);
      this.addAnimation("oben", BILD, 4, 16, 16, 1, true);
      this.addAnimation("links", BILD, 4, 16, 16, 2, true);
      this.addAnimation("rechts", BILD, 4, 16, 16, 3, true);
      this.setAnimationInterval(150);
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
