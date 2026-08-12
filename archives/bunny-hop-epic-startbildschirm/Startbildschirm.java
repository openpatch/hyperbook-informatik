import org.openpatch.scratch.*;

public class Startbildschirm extends Stage {
    
    private Window window;
    
    public Startbildschirm(Window pWindow) {
        this.window = pWindow;        
    }
    
    public void whenKeyPressed(KeyCode keyCode) {
        if (keyCode == KeyCode.ENTER) {
            this.window.setStage(new Level(this.window));
        }
    }
    
    public void run() {
        this.display("Drücke Enter, um zu starten");
    }
}