import org.openpatch.scratch.*;

public class NachtFilter extends Sprite {
    
    private Level level;
    
    public NachtFilter(Level pLevel) {
        this.level = pLevel;
        this.addCostume("nacht", "assets/grafiken/nacht.png");
        this.setTransparency(160);
    }
    
    public void run() {
        if (level.istTag()) {
            this.hide();
        } else {
            this.show();
        }
    }
}