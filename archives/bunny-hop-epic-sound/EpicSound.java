import org.openpatch.scratch.*;

public class EpicSound extends Window {
    public EpicSound() {
        super(800, 400, "assets");
        this.addStage("level", new Level());
    }
}