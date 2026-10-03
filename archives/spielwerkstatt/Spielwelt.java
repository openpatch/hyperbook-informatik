import org.openpatch.scratch.*;

/// Fertig für dich: die Wiese als Hintergrund und die Reihenfolge, in der gezeichnet wird.
public class Spielwelt extends Stage {

   /// So viele Pixel ist eine Kachel auf der Bühne breit und hoch.
   public static final int KACHEL = 48;

   public Spielwelt() {
      // Die Wiese ist ein einziges Bild, so groß wie die Bühne.
      this.addBackdrop("wiese", "assets/backgrounds/wiese.png");

      // Wer weiter unten steht, ist näher am Betrachter: Er wird später gezeichnet
      // und verdeckt, was hinter ihm steht. So läuft man hinter Bäumen vorbei.
      this.getSorting().byY();
   }
}
