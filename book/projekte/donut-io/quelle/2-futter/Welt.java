/**
 * Das Spielfeld.
 */
public class Welt extends Stage {

   private SpielerDonut spieler;

   public Welt() {
      this.setColor(250, 245, 235);
      spieler = new SpielerDonut();
      this.add(spieler);
   }

   public void run() {
      if (this.getTimer().everyMillis(1000)) {
         this.erzeugeFutter();
      }
   }

   /**
    * Setzt einen kleinen Donut irgendwo auf die Bühne, aber nicht auf den Spieler.
    */
   private void erzeugeFutter() {
      Donut futter = new Donut(0, 0, Random.randomInt(2, 5));
      this.add(futter);
      do {
         futter.setPosition(Random.random(-400, 400), Random.random(-300, 300));
      } while (futter.isTouchingSprite(spieler));
   }
}
