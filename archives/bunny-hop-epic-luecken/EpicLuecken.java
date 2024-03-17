import org.openpatch.scratch.*;

public class EpicLuecken extends Window {
    public EpicLuecken() {
        super(800, 400, "assets");
        
        this.addStage("level", new Level());
    }
}