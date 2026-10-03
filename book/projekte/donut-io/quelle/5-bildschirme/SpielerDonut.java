/**
 * Der Donut, den man mit der Maus steuert.
 */
public class SpielerDonut extends Donut {

   public SpielerDonut() {
      super(0, 0, 10);
   }

   public void run() {
      this.bewegeZu(this.getMouse());
      super.run();
   }
}
