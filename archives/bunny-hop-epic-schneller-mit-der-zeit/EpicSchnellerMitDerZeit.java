import org.openpatch.scratch.*;

public class EpicSchnellerMitDerZeit extends Window {
    public EpicSchnellerMitDerZeit() {
        super(800, 400, "assets");
        
        this.addStage("level", new Level());
    }
}