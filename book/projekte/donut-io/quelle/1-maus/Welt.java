/**
 * Das Spielfeld.
 */
public class Welt extends Stage {

   public Welt() {
      this.setColor(250, 245, 235);
      SpielerDonut spieler = new SpielerDonut();
      this.add(spieler);
   }
}
