import org.openpatch.scratch.*;

/// Fertig für dich: eine Münze, die sich dreht, bis der Spieler sie einsammelt.
public class Muenze extends Sprite {

   public Muenze() {
      // Vier Bilder zu je 10 × 10 Pixeln nebeneinander.
      this.addAnimation("drehen", "assets/items/treasure/coin2.png", 10, 10, 0, 1, 2, 3);
      this.setAnimationInterval(0.15);
      this.setSize(300);
   }

   public void run() {
      this.playAnimation("drehen");
   }
}
