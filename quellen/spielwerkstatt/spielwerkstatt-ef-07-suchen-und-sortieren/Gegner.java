import org.openpatch.scratch.*;

/// Ein Schleim, der hin und her kriecht. Stößt er an ein Hindernis, kehrt er um.
public class Gegner extends Sprite {

   /// So viele Pixel kriecht der Schleim in jedem Bild, nach rechts positiv, nach links negativ.
   private int tempo = 2;

   public Gegner() {
      this.addAnimation("kriechen", "assets/actor/monster/slime/slime.png", 16, 16, 0, 4, 8, 12);
      this.setAnimationInterval(0.2);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(new Polygon(new double[] {4, 12, 12, 4}, new double[] {10, 10, 16, 16}));
   }

   public void run() {
      this.playAnimation("kriechen");
      this.changeX(tempo);
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.changeX(-tempo);
         tempo = -tempo;
      }
   }
}
