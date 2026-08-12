import org.openpatch.scratch.*;

/// Bugs. Er läuft auf der Stelle und springt, wenn du die Leertaste drückst.
public class Spieler extends AnimatedSprite {

    /// Auf dieser Höhe stehen Bugs' Füße auf dem Boden.
    public static final int BODEN = -45;

    private double steiggeschwindigkeit = 0;
    private boolean amBoden = true;

    private BunnyHop spiel;

    public Spieler(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addAnimation("gehen", "bunny1_walk%d", 2);
        this.addCostume("springen", "bunny1_jump");
        this.addSound("sprung", "cloth3");
        this.addSound("muenze", "handleCoins");
        this.setSize(50);
        this.setAnimationInterval(120);
        this.setPosition(-250, BODEN);
    }

    public void run() {
        if (amBoden && this.isKeyPressed(KeyCode.SPACE)) {
            steiggeschwindigkeit = 9;
            amBoden = false;
            this.playSound("sprung");
        }

        if (amBoden) {
            this.playAnimation("gehen");
        } else {
            this.switchCostume("springen");
            this.changeY(steiggeschwindigkeit);
            steiggeschwindigkeit = steiggeschwindigkeit - 0.5;

            if (this.getY() <= BODEN) {
                this.setY(BODEN);
                steiggeschwindigkeit = 0;
                amBoden = true;
            }
        }

        Muenze m = this.getTouchingSprite(Muenze.class);
        if (m != null) {
            m.einsammeln();
            this.playSound("muenze");
            spiel.punkten();
        }
    }
}
