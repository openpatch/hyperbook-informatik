import org.openpatch.scratch.*;
public class BunnyHop extends Window
{
    private int distanz = 0;

    public BunnyHop() {
        super(800, 400);
        this.setDebug(false);
        this.setStage(new Level(this));
    }

    public void zuruecksetzen() {
        this.distanz = 0;
        this.setStage(new Level(this));
    }

    public int getDistanz() {
        return distanz;
    }

    public void veraendereDistanz(int wert) {
        distanz += wert;
    }
}
