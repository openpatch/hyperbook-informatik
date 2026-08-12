import org.openpatch.scratch.*;

/// Eine Münze. Wer sie berührt, bekommt einen Punkt.
public class Muenze extends Sprite {

    private BunnyHop spiel;

    public Muenze(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("gold", "coin_gold");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.setX(450);
            this.setY(this.pickRandom(-20, 60));
            this.show();
        }
    }

    /// Lässt die Münze verschwinden, bis sie rechts wieder auftaucht.
    public void einsammeln() {
        this.hide();
    }
}
