/**
 * Ein Donut, der den Spieler jagt.
 */
public class VerfolgerDonut extends Donut {

   private SpielerDonut beute;

   public VerfolgerDonut(double pX, double pY, int pStaerke, SpielerDonut pBeute) {
      super(pX, pY, pStaerke);
      beute = pBeute;
   }

   public void run() {
      this.bewegeZu(beute.getPosition());
      super.run();
   }
}
