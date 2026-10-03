/**
 * Der Donut, den man mit der Maus steuert.
 */
public class SpielerDonut extends Donut {

   public SpielerDonut() {
      super(0, 0, 10);
   }

   public void run() {
      Vector2 richtung = this.getMouse().sub(this.getPosition());
      if (richtung.length() > tempo) {
         this.setPosition(this.getPosition().add(richtung.unitVector().multiply(tempo)));
      }
      super.run();
   }
}
