/**
 * Ein Gitter aus Linien, das mit einem Stift auf eine Bühne gezeichnet wird.
 */
public class Gitter {

   private static final int ABSTAND = 40;

   private int grenze;

   /**
    * @param pGrenze das Gitter reicht von -pGrenze bis pGrenze, waagerecht wie senkrecht
    */
   public Gitter(int pGrenze) {
      grenze = pGrenze;
   }

   /**
    * Zeichnet das Gitter und einen dicken Rand auf pBuehne.
    */
   public void zeichneAuf(Stage pBuehne) {
      Pen stift = new Pen();
      pBuehne.add(stift);

      stift.setColor(210, 205, 195);
      stift.setSize(2);
      for (int i = -grenze; i <= grenze; i += ABSTAND) {
         this.linie(stift, i, -grenze, i, grenze);
         this.linie(stift, -grenze, i, grenze, i);
      }

      stift.setColor(200, 100, 100);
      stift.setSize(8);
      stift.setPosition(-grenze, -grenze);
      stift.down();
      stift.setPosition(grenze, -grenze);
      stift.setPosition(grenze, grenze);
      stift.setPosition(-grenze, grenze);
      stift.setPosition(-grenze, -grenze);
      stift.up();
   }

   private void linie(Pen pStift, double pX1, double pY1, double pX2, double pY2) {
      pStift.up();
      pStift.setPosition(pX1, pY1);
      pStift.down();
      pStift.setPosition(pX2, pY2);
      pStift.up();
   }
}
