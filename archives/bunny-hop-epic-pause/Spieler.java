import org.openpatch.scratch.extensions.animation.*;

public class Spieler extends AnimatedSprite {
    
    Level level;
    
    public Spieler(Level pLevel) {
        this.level = pLevel;
        this.addAnimation("gehen", "assets/grafiken/bunny1_walk%d.png", 2);
    }
    
    // Wird 60-mal in der Sekunde ausgeführt.
    public void run() {
        if (this.level.istPausiert()) {
            // den Methodenaufruf an dieser Stelle beenden
            return;
        }
        this.playAnimation("gehen");
    }
}