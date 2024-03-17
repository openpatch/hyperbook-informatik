import org.openpatch.scratch.*;

public class Startbildschirm extends Stage {
    
    private Window window;
    
    public Startbildschirm(Window pWindow) {
        this.window = pWindow;        
    }
    
    public void whenKeyPressed(int keyCode) {
        if (keyCode == KeyCode.VK_ENTER) {
            this.window.switchStage("level");
        }
    }
    
    public void run() {
        this.display("Drücke Enter, um zu starten");
    }
}