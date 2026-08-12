import org.openpatch.scratch.*;

public class Hintergrund extends Sprite {
    
    Level level;
    
    public Hintergrund(Level pLevel, int ebene) {
        this.level = pLevel;
        this.addCostume("ebene1","background");
        this.addCostume("ebene2","cloud");
        this.addCostume("ebene3","sun1");
        
        if (ebene == 1) {
            this.switchCostume("ebene1");
        } else if (ebene == 2) {
            this.switchCostume("ebene2");
        } else if (ebene == 3) {
            this.switchCostume("ebene3");
        }
    }
    
    public void run() {
        this.changeX(-0.8);
        
        if (this.getX() + this.getWidth() < 0) {
            level.remove(this);
            level.neuerHintergrund();
        }
    }
}