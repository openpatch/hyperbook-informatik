import org.openpatch.scratch.*;

public class EpicAnimierterHintergrund extends Window {
    public EpicAnimierterHintergrund() {
        super(800, 400, "assets");
        
        this.addStage("level", new Level());
    }
}