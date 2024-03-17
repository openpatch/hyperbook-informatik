import org.openpatch.scratch.*;

public class EpicHintergrundObjekte extends Window {
    public EpicHintergrundObjekte() {
        super(800, 400, "assets");
        
        this.addStage("level", new Level());
    }
}