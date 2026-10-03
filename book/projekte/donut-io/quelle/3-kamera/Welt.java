/**
 * Das Spielfeld.
 */
public class Welt extends Stage {

   private SpielerDonut spieler;

   public Welt() {
      this.setColor(250, 245, 235);
      Gitter gitter = new Gitter(3000);
      gitter.zeichneAuf(this);

      spieler = new SpielerDonut();
      this.add(spieler);

      this.getCamera().setZoomLimit(30, 200);
   }

   public void run() {
      if (this.getTimer().everyMillis(1000)) {
         this.erzeugeFutter();
      }

      Camera kamera = this.getCamera();
      double zielZoom = 1000.0 / spieler.getStaerke();
      if (kamera.getZoom() > zielZoom) {
         kamera.changeZoom(-0.1);
      }
      kamera.setPosition(spieler.getPosition());
   }

   /**
    * Setzt einen kleinen Donut irgendwo in den sichtbaren Bereich, aber nicht auf den Spieler.
    */
   private void erzeugeFutter() {
      Donut futter = new Donut(0, 0, Random.randomInt(2, 5));
      this.add(futter);
      Camera kamera = this.getCamera();
      do {
         futter.setPosition(kamera.getX() + Random.random(-400, 400),
                            kamera.getY() + Random.random(-300, 300));
      } while (futter.isTouchingSprite(spieler));
   }
}
