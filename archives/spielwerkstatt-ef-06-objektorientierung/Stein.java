/// Ein Stein für Mauern, 16 × 16 Pixel aus dem Dungeon-Kachelbild.
public class Stein extends Hindernis {

   public Stein() {
      this.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      // Steine bilden die Mauer am Rand: Sie halten mit dem ganzen Bild auf, nicht nur unten.
      this.setHitbox(0, 0, 16, 0, 16, 16, 0, 16);
   }
}
