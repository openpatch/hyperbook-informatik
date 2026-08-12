import org.openpatch.scratch.*;
public class Spieler extends AnimatedSprite {
    
    Level level;
    
    public Spieler(Level pLevel) {
        this.level = pLevel;
        this.addAnimation("gehen", "bunny1_walk%d", 2);
    }
    
    // Wird 60-mal in der Sekunde ausgeführt.
    public void run() {
        this.setAnimationInterval(Math.max(30, 120 - this.level.getGeschwindigkeit()));
        this.playAnimation("gehen");
    }
}