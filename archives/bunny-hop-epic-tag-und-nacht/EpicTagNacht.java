import org.openpatch.scratch.*;

public class EpicTagNacht extends Window {
    public EpicTagNacht() {
        super(800, 400, "assets");
        this.addStage("level", new Level());
    }
}