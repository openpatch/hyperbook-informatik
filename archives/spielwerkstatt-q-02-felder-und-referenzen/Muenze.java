/// Eine Münze, die sich dreht, bis der Spieler sie einsammelt.
public class Muenze extends Gegenstand {

   public Muenze() {
      // Vier Bilder zu je 10 × 10 Pixeln nebeneinander.
      this.addAnimation("drehen", "assets/items/treasure/coin2.png", 4, 10, 10);
      this.setAnimationInterval(150);
   }

   public void run() {
      this.playAnimation("drehen");
   }

   public void beruehrtVon(Welt pWelt) {
      pWelt.entferne(this);
      pWelt.muenzeEingesammelt();
   }
}
