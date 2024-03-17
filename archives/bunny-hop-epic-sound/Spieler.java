import org.openpatch.scratch.extensions.animation.*;

public class Spieler extends AnimatedSprite {

    boolean verletzt;

    public Spieler() {
        this.addAnimation("schmerzen", "assets/grafiken/bunny1_hurt.png", 1);
        this.addAnimation("gehen", "assets/grafiken/bunny1_walk%d.png", 2);

        this.addSound("gehen", "assets/sounds/gehen.wav");
        this.addSound("verloren", "assets/sounds/verloren.wav");
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