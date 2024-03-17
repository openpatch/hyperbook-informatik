import org.openpatch.scratch.*;

public class Hintergrund extends Sprite {
    
    Level level;
    
    public Hintergrund(Level pLevel, int ebene) {
        this.level = pLevel;
        this.addCostume("ebene1","assets/grafiken/bg_layer2.png");
        this.addCostume("ebene2","assets/grafiken/bg_layer3.png");
        this.addCostume("ebene3","assets/grafiken/bg_layer4.png");
        
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