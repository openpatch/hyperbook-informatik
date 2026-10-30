/// Eine große Pflanze oder ein Felsen, 32 × 32 Pixel aus dem Natur-Kachelbild.
/// pBildX und pBildY geben die linke obere Ecke im Kachelbild an.
public class Pflanze extends Hindernis {

   public Pflanze(int pBildX, int pBildY) {
      this.addCostume("pflanze", "assets/backgrounds/tilesets/tileset-nature.png", pBildX, pBildY, 32, 32);
   }
}
