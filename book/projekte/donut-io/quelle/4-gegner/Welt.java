/**
 * Das Spielfeld.
 */
public class Welt extends Stage {

   private static final int ANZAHL_GEGNER = 5;
   private static final int MAX_VERSUCHE = 20;

   private SpielerDonut spieler;

   public Welt() {
      this.setColor(250, 245, 235);
      Gitter gitter = new Gitter(3000);
      gitter.zeichneAuf(this);

      spieler = new SpielerDonut();
      this.add(spieler);

      for (int i = 0; i < ANZAHL_GEGNER; i++) {
         VerfolgerDonut gegner = new VerfolgerDonut(0, 0, Random.randomInt(10, 20), spieler);
         this.add(gegner);
         do {
            gegner.setPosition(Random.random(-2000, 2000), Random.random(-3000, 3000));
         } while (gegner.isTouchingSprite(spieler));
      }

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
    * Findet sich nach MAX_VERSUCHE Würfen keine freie Stelle, fällt das Futter aus.
    */
   private void erzeugeFutter() {
      Donut futter = new Donut(0, 0, Random.randomInt(2, 5));
      this.add(futter);
      Camera kamera = this.getCamera();
      double faktor = 100 / kamera.getZoom();
      int versuche = 0;
      do {
         futter.setPosition(kamera.getX() + Random.random(-400, 400) * faktor,
                            kamera.getY() + Random.random(-300, 300) * faktor);
         versuche++;
      } while (futter.isTouchingSprite(spieler) && versuche < MAX_VERSUCHE);

      if (futter.isTouchingSprite(spieler)) {
         futter.remove();
      }
   }
}
