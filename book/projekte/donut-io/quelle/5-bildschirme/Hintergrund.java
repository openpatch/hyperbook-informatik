/**
 * Ein Gitter, das immer unter der Kamera liegt.
 */
public class Hintergrund extends Sprite {

   public Hintergrund() {
      this.addCostume("gitter", "assets/grid.png");
   }

   public void run() {
      Camera kamera = this.getStage().getCamera();
      this.setPosition(kamera.getX() - kamera.getX() % 40, kamera.getY() - kamera.getY() % 40);
   }
}
