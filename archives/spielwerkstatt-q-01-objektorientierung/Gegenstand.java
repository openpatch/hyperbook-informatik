import org.openpatch.scratch.*;

/// Etwas, das auf dem Boden liegt und etwas tut, wenn der Spieler es berührt.
/// Was genau, legt jede Unterklasse selbst fest.
public abstract class Gegenstand extends AnimatedSprite {

   public Gegenstand() {
      this.setSize(300);
   }

   /// Wird aufgerufen, wenn der Spieler diesen Gegenstand berührt.
   public abstract void beruehrtVon(Welt pWelt);
}
