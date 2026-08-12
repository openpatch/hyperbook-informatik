import org.openpatch.scratch.*;

/// Ein Stück Boden.
public class Plattform extends Sprite {

    public Plattform() {
        this.addCostume("gras", "ground_grass_small");
        this.setSize(50);
    }
}
