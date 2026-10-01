import org.openpatch.scratch.*;

/// Eine Holzkiste, die der Spieler schieben kann.
public class Kiste extends Kachel {

    public Kiste() {
        super("assets/backgrounds/tilesets/tileset-dungeon.png", 32, 16);
    }

    /// Schiebt die Kiste um (pDx, pDy). Stößt sie dabei an eine Wand oder an
    /// eine andere Kiste, bleibt sie stehen. Liefert, ob sie sich bewegt hat.
    public boolean schiebe(double pDx, double pDy) {
        this.changePosition(pDx, pDy);
        if (this.getTouchingSprite(Wand.class) != null || this.getTouchingSprite(Kiste.class) != null) {
            this.changePosition(-pDx, -pDy);
            return false;
        }
        return true;
    }
}
