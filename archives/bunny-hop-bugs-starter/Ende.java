import org.openpatch.scratch.*;

public class Ende extends Stage {
    private Text text;
    private BunnyHop spiel;
    
    public Ende(BunnyHop pSpiel) {
        spiel = pSpiel;
        text = new Text();
        text.setPosition(400, 200);
        this.add(text);
    }
    
    public void whenKeyPressed(KeyCode code) {
        if (code == KeyCode.R) {
            spiel.zuruecksetzen();
        }
    }
    
    public void run() {
        text.showText("Ende: " + spiel.getDistanz() + "\n(Drücke r für einen neuen Versuch!)");
    }
}