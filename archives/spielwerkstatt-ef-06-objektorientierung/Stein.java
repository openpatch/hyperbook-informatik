/// Ein Stein für Mauern, 16 × 16 Pixel aus dem Dungeon-Kachelbild.
public class Stein extends Hindernis {

   public Stein() {
      this.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
   }
}
