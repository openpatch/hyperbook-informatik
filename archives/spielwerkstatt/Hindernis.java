import org.openpatch.scratch.*;

/// Fertig für dich: eine Figur, durch die der Spieler nicht hindurchlaufen kann.
/// Ein Hindernis ist ein Sprite wie jedes andere. Sein Kostüm gibst du ihm selbst.
public class Hindernis extends Sprite {

   public Hindernis() {
      // Die Bilder sind winzig. Dreifach vergrößert passen sie zum Spieler.
      this.setSize(300);
   }

   /// Wie addCostume von Sprite. Zusätzlich hält nur die untere Hälfte des Bildes auf,
   /// also der Stamm eines Baums oder der Fuß eines Felsens. Hinter dem Rest kann man vorbeigehen.
   public void addCostume(String pName, String pBild, int pX, int pY, int pBreite, int pHoehe) {
      super.addCostume(pName, pBild, pX, pY, pBreite, pHoehe);
      this.setHitbox(0, pHoehe / 2.0, pBreite, pHoehe / 2.0, pBreite, pHoehe, 0, pHoehe);
   }
}
