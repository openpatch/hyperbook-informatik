import org.openpatch.scratch.*;

public class EpicDodge extends Window {
    public EpicDodge() {
        super(800, 400, "assets");
        this.addStage("level", new Level());
    }
}