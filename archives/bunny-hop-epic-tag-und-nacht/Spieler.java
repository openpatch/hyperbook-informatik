import org.openpatch.scratch.*;
public class Spieler extends AnimatedSprite {
    
    private Level level;
    
    public Spieler(Level pLevel) {
        this.level = pLevel;
        this.addAnimation("gehen", "bunny1_walk%d", 2);
      
    }

    
    // Wird 60-mal in der Sekunde ausgeführt.
    public void run() {
        this.playAnimation("gehen");
        if(this.level.istTag()) {
            this.think("So ein schöner Tag!");
        } else {
            this.think("Hoffentlich wird es bald hell!");
        }
    }
}