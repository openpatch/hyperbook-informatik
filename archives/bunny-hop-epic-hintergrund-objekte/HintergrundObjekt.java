import org.openpatch.scratch.*;

public class HintergrundObjekt extends Sprite {
    public HintergrundObjekt() {
        this.addCostume("kaktus", "assets/grafiken/cactus.png");
        this.addCostume("grass1", "assets/grafiken/grass1.png");
        this.addCostume("pilz-braun", "assets/grafiken/mushroom_brown.png");
        this.addCostume("pilz-rot", "assets/grafiken/mushroom_red.png");
        
        // wähle ein zufälliges Kostüm
        for (int i = 0; i < this.pickRandom(0, 4); i++) {
            this.nextCostume();
        }
    }
}