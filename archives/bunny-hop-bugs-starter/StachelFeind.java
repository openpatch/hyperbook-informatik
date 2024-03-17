import org.openpatch.scratch.*;

public class StachelFeind extends Sprite {

    private Spieler spieler;
    private int fallGeschwindigkeit = 5;

    public StachelFeind(Spieler pSpieler) {
        this.spieler = pSpieler;
        this.addCostume("stehen", "assets/grafiken/Enemies/spikeMan_stand.png");
        this.setHitbox(0, 77, 0, 32, 22, 0, 45, 33, 45, 77);

    }

    public void run() {
        this.changeX(-2);
        if (this.isTouchingSprite(spieler)) {
            spieler.verletzten();
        }
        this.changeY(fallGeschwindigkeit);
        while(this.isTouchingSprite(Plattform.class)) {
            this.changeY(-0.1);
        }
        if (this.getX() + this.getWidth() < 0) {
            this.setX(900);
        }
    }
}
