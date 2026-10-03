/// Eine Stachelfalle. Sie bleibt liegen und kostet jedes Mal ein Leben.
public class Falle extends Gegenstand {

   public Falle() {
      this.addCostume("falle", "assets/backgrounds/tilesets/tileset-dungeon.png", 64, 16, 16, 16);
   }

   public void beruehrtVon(Welt pWelt) {
      pWelt.verletze();
   }
}
