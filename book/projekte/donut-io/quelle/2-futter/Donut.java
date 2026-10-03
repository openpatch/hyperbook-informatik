/**
 * Ein Donut, der kleinere Donuts frisst und dabei wächst.
 */
public class Donut extends Sprite {

   private int staerke;
   protected double tempo = 1;

   public Donut(double pX, double pY, int pStaerke) {
      this.addCostume("donut", "assets/donut.png");
      this.setHitbox(new Ellipse(0, 0, 512, 480));
      this.setPosition(pX, pY);
      this.setStaerke(pStaerke);
      this.setTint(Random.randomInt(240), Random.randomInt(240), Random.randomInt(240));
   }

   public int getStaerke() {
      return staerke;
   }

   /**
    * Setzt die Stärke. Die Größe in Prozent wächst mit.
    */
   public void setStaerke(int pStaerke) {
      staerke = pStaerke;
      this.setSize(pStaerke);
   }

   /**
    * Frisst einen berührten Donut, wenn er nicht stärker ist.
    */
   public void run() {
      Donut anderer = this.getTouchingSprite(Donut.class);
      if (anderer != null && staerke >= anderer.getStaerke()) {
         this.setStaerke(staerke + anderer.getStaerke());
         anderer.remove();
      }
   }
}
