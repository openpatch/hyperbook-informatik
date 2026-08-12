import org.openpatch.scratch.*;

public class HintergrundObjekt extends Sprite {
    public HintergrundObjekt() {
        this.addCostume("kaktus", "cactus");
        this.addCostume("grass1", "grass1");
        this.addCostume("pilz-braun", "mushroom_brown");
        this.addCostume("pilz-rot", "mushroom_red");
        
        // wähle ein zufälliges Kostüm
        for (int i = 0; i < this.pickRandom(0, 4); i++) {
            this.nextCostume();
        }
    }
}