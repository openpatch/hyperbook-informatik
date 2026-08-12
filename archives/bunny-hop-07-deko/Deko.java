import org.openpatch.scratch.*;

/// Kakteen, Gras und Pilze im Hintergrund. Sie ziehen langsamer vorbei.
public class Deko extends Sprite {

    private BunnyHop spiel;

    public Deko(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("kaktus", "cactus");
        this.addCostume("gras", "grass1");
        this.addCostume("pilz-rot", "mushroom_red");
        this.addCostume("pilz-braun", "mushroom_brown");
        this.setSize(50);

        for (int i = 0; i < this.pickRandom(0, 3); i++) {
            this.nextCostume();
        }
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit() / 2);

        if (this.getX() < -450) {
            this.setX(450);
        }
    }
}
