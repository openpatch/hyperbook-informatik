import org.openpatch.scratch.*;

/// Ein Monster, das sich von selbst bewegt. Wie, legt jede Unterklasse in bewege() fest.
public abstract class Gegner extends Sprite {

   /// pBild ist ein Bild aus assets/actor/monster/ im Aufbau der Figuren: eine Spalte je Blickrichtung.
   public Gegner(String pBild) {
      this.addAnimation("laufen", pBild, 16, 16, 0, 4, 8, 12);
      this.setAnimationInterval(0.2);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(new Polygon(new double[] {4, 12, 12, 4}, new double[] {10, 10, 16, 16}));
   }

   public void run() {
      this.playAnimation("laufen");
      this.bewege();
   }

   /// Bewegt den Gegner um einen Schritt.
   protected abstract void bewege();
}
