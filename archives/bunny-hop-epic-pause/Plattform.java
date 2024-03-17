import org.openpatch.scratch.*;

public class Plattform extends Sprite {
    
    Level level;
    
    public Plattform(Level pLevel) {
        this.level = pLevel;
        this.addCostume("ganz", "assets/grafiken/ground_grass.png");
    }
    
    public void run() {
        if (this.level.istPausiert()) {
            // den Methodenaufruf an dieser Stelle beenden
            return;
        }
        this.changeX(-1);
        
        if (this.getX() + this.getWidth() < 0) {
            level.remove(this);
            level.neuePlattform();
        }
    }
}