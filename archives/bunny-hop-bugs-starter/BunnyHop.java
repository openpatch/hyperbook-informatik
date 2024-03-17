import org.openpatch.scratch.*;
import org.openpatch.scratch.extensions.*;

public class BunnyHop extends Window
{
    private int distanz = 0;

    public BunnyHop() {
        super(800, 400, "assets");
        this.setDebug(false);
        this.addStage("level", new Level(this));
        this.addStage("ende", new Ende(this));
    }

    public void zuruecksetzen() {
        this.removeStage("level");
        this.distanz = 0;
        this.addStage("level", new Level(this));
        this.switchStage("level");
    }

    public int getDistanz() {
        return distanz;
    }

    public void veraendereDistanz(int wert) {
        distanz += wert;
    }
}
