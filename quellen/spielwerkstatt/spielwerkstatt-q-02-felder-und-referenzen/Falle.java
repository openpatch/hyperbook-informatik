/// Eine Stachelfalle. Sie ist versteckt, bis der Spieler direkt daneben steht,
/// bleibt dann sichtbar und kostet jedes Mal ein Leben.
public class Falle extends Gegenstand {

   public Falle() {
      this.addCostume("falle", "assets/backgrounds/tilesets/tileset-dungeon.png", 64, 16, 16, 16);
      this.hide();
   }

   public void beruehrtVon(Welt pWelt) {
      pWelt.verletze();
   }

   public void inDerNaehe() {
      this.show();
   }
}
