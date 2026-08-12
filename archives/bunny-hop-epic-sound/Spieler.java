import org.openpatch.scratch.*;
public class Spieler extends AnimatedSprite {

    boolean verletzt;

    public Spieler() {
        this.addAnimation("schmerzen", "bunny1_hurt", 1);
        this.addAnimation("gehen", "bunny1_walk%d", 2);

        this.addSound("gehen", "footstep_grass_000");
        this.addSound("verloren", "jingles_NES09");
    }

    public void verletzen() {
        verletzt = true;
        this.playSound("verloren");
    }

    // Wird 60-mal in der Sekunde ausgeführt.
    public void run() {
        if (verletzt) {
            this.playAnimation("schmerzen");
            
        } else {
            this.playAnimation("gehen");
            this.playSound("gehen");
        }
    }
}