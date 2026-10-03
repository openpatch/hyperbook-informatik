/// Die Punkteregel des Spiels - ohne Bühne, ohne Figur, ohne Grafik.
/// Ab der dritten Münze in Folge zählt jede Münze doppelt, ab der sechsten dreifach.
/// Ein Treffer durch einen Gegner oder eine Falle setzt die Kombo zurück.
public class Punkteregel {

   public static final int KOMBO_DOPPELT = 3;
   public static final int KOMBO_DREIFACH = 6;

   private int punkte = 0;
   private int kombo = 0;

   public int getPunkte() {
      return punkte;
   }

   public int getKombo() {
      return kombo;
   }

   /// Eine Münze mit dem Grundwert pGrundwert wurde eingesammelt.
   public void treffer(int pGrundwert) {
      kombo = kombo + 1;
      punkte = punkte + pGrundwert * this.faktor();
   }

   /// Der Spieler wurde getroffen: Die Kombo ist dahin, die Punkte bleiben.
   public void fehler() {
      kombo = 0;
   }

   /// Der Vervielfacher für den aktuellen Treffer.
   public int faktor() {
      if (kombo >= KOMBO_DREIFACH) {
         return 3;
      }
      if (kombo >= KOMBO_DOPPELT) {
         return 2;
      }
      return 1;
   }
}
