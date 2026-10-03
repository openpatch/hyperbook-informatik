import org.openpatch.scratch.*;

/// Etwas, das auf einem Feld des Plans liegt und etwas tut, wenn der Spieler es berührt.
/// Was genau, legt jede Unterklasse selbst fest.
public abstract class Gegenstand extends AnimatedSprite {

   /// Das Feld im Plan, auf dem der Gegenstand liegt.
   private int zeile;
   private int spalte;

   public Gegenstand() {
      this.setSize(300);
   }

   /// Wird aufgerufen, wenn der Spieler diesen Gegenstand berührt.
   public abstract void beruehrtVon(Welt pWelt);

   /// Wird aufgerufen, solange der Spieler auf einem Nachbarfeld steht. Normalerweise passiert nichts.
   public void inDerNaehe() {
   }

   public void setFeld(int pZeile, int pSpalte) {
      zeile = pZeile;
      spalte = pSpalte;
   }

   public int getZeile() {
      return zeile;
   }

   public int getSpalte() {
      return spalte;
   }
}
