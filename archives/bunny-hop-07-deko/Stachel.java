import org.openpatch.scratch.*;

/// Ingo, der Stachelmann. Ihn zu berühren beendet das Spiel.
public class Stachel extends Sprite {

    private BunnyHop spiel;

    public Stachel(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("stehen", "spikeMan_stand");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.setX(450 + this.pickRandom(0, 300));
        }
    }
}
