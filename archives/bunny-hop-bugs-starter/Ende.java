import org.openpatch.scratch.*;
import org.openpatch.scratch.extensions.text.*;

public class Ende extends Stage {
    private Text text;
    private BunnyHop spiel;
    
    public Ende(BunnyHop pSpiel) {
        spiel = pSpiel;
        text = new Text();
        text.setPosition(400, 200);
        this.add(text);
    }
    
    public void whenKeyPressed(int code) {
        if (code == KeyCode.VK_R) {
            spiel.zuruecksetzen();
            spiel.switchStage("level");
        }
    }
    
    public void run() {
        text.showText("Ende: " + spiel.getDistanz() + "\n(Drücke r für einen neuen Versuch!)");
    }
}