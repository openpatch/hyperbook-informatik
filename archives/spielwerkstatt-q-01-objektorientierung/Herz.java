/// Ein Herz gibt ein Leben zurück und verschwindet.
public class Herz extends Gegenstand {

   public Herz() {
      this.addCostume("herz", "assets/items/potion/heart.png");
   }

   public void beruehrtVon(Welt pWelt) {
      this.remove();
      pWelt.heile();
   }
}
