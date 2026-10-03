/**
 * Ein Bildschirm mit Text über dem Gitter. Die Leertaste startet ein Level.
 */
public class Bildschirm extends Stage {

   private int naechstesLevel;

   public Bildschirm(int pNaechstesLevel) {
      naechstesLevel = pNaechstesLevel;
      this.setColor(250, 245, 235);
      Hintergrund hintergrund = new Hintergrund();
      hintergrund.setTransparency(50);
      this.add(hintergrund);
   }

   /**
    * Schreibt eine Zeile Text mittig auf die Höhe pY.
    */
   public void schreibe(String pText, int pGroesse, double pY) {
      Text text = new Text();
      text.setTextSize(pGroesse);
      text.setTextColor(200, 100, 100);
      text.setWidth(700);
      text.showText(pText);
      text.setPosition(0, pY);
      this.add(text);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         Window.getInstance().transitionToStage(new Welt(naechstesLevel), 500);
      }
   }
}
