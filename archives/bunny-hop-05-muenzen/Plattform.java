import org.openpatch.scratch.*;

/// Ein Stück Boden. Es wandert nach links und kommt rechts wieder herein.
public class Plattform extends Sprite {

    private BunnyHop spiel;

    public Plattform(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("gras", "ground_grass_small");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.changeX(BunnyHop.PLATTFORMEN * BunnyHop.BREITE);
        }
    }
}
