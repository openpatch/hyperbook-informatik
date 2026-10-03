/**
 * Ein Donut mit einer Stärke, die seine Größe bestimmt.
 */
public class Donut extends Sprite {

   private int staerke;
   protected double tempo = 1;

   public Donut(double pX, double pY, int pStaerke) {
      this.addCostume("donut", "assets/donut.png");
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
}
