import org.openpatch.scratch.*;

/// Ein Schleim, der hin und her kriecht. Stößt er an ein Hindernis, kehrt er um.
public class Gegner extends AnimatedSprite {

   /// So viele Pixel kriecht der Schleim in jedem Bild, nach rechts positiv, nach links negativ.
   private int tempo = 2;

   public Gegner() {
      this.addAnimation("kriechen", "assets/actor/monster/slime/slime.png", 4, 16, 16, 0, true);
      this.setAnimationInterval(200);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(4, 10, 12, 10, 12, 16, 4, 16);
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
