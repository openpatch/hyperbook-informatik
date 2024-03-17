import org.openpatch.scratch.*;

public class EpicStartbildschirm extends Window {
    public EpicStartbildschirm() {
        super(800, 400, "assets");
        
        this.addStage("startbildschirm", new Startbildschirm(this));
        this.addStage("level", new Level(this));
    }
}