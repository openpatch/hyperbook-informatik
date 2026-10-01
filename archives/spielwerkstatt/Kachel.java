import org.openpatch.scratch.*;

/// Eine Kachel des Raums, 16 × 16 Pixel aus einem Kachelbild, dreifach vergrößert.
public abstract class Kachel extends Sprite {

    /// Schneidet die Kachel an Stelle (pX, pY) aus dem Bild pBild aus.
    public Kachel(String pBild, int pX, int pY) {
        this.addCostume("kachel", pBild, pX, pY, 16, 16);
        this.setSize(300);
    }
}
