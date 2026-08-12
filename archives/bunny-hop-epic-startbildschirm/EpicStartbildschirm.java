import org.openpatch.scratch.*;

public class EpicStartbildschirm extends Window {
    public EpicStartbildschirm() {
        super(800, 400);
        
        this.setStage(new Startbildschirm(this));
    }
}