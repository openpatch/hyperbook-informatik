import org.openpatch.scratch.*;

public class EpicPause extends Window {
    public EpicPause() {
        super(800, 400, "assets");
        
        this.addStage("level", new Level());
    }
}