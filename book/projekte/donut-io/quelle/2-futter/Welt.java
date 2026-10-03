/**
 * Das Spielfeld.
 */
public class Welt extends Stage {

   private static final int MAX_VERSUCHE = 20;

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
    * Findet sich nach MAX_VERSUCHE Würfen keine freie Stelle, fällt das Futter aus.
    */
   private void erzeugeFutter() {
      Donut futter = new Donut(0, 0, Random.randomInt(2, 5));
      this.add(futter);
      int versuche = 0;
      do {
         futter.setPosition(Random.random(-400, 400), Random.random(-300, 300));
         versuche++;
      } while (futter.isTouchingSprite(spieler) && versuche < MAX_VERSUCHE);

      if (futter.isTouchingSprite(spieler)) {
         futter.remove();
      }
   }
}
