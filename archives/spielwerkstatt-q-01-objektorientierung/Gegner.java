import org.openpatch.scratch.*;

/// Ein Monster, das sich von selbst bewegt. Wie, legt jede Unterklasse in bewege() fest.
public abstract class Gegner extends AnimatedSprite {

   /// pBild ist ein Bild aus assets/actor/monster/ im Aufbau der Figuren: eine Spalte je Blickrichtung.
   public Gegner(String pBild) {
      this.addAnimation("laufen", pBild, 4, 16, 16, 0, true);
      this.setAnimationInterval(200);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(4, 10, 12, 10, 12, 16, 4, 16);
   }

   public void run() {
      this.playAnimation("laufen");
      this.bewege();
   }

   /// Bewegt den Gegner um einen Schritt.
   protected abstract void bewege();
}
