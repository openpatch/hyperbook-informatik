import org.openpatch.scratch.Stage;
import org.openpatch.scratch.KeyCode;
import org.openpatch.scratch.extensions.math.Random;

public class UnDeuxTrois extends Stage {

    private DrawingPen myPen; 
    private long seed;

    public UnDeuxTrois() {
        super(1000, 1000);
        seed = 1000;
        myPen = new DrawingPen();
        myPen.setSize(5);
        myPen.setColor(0, 0, 0);
        this.add(myPen);
    }

    public void whenKeyPressed(int keyCode) {
        if (keyCode == KeyCode.VK_SPACE) {
            seed += 1;
        }
    }


    public void run() {
        if (myPen == null) return;
        
        this.eraseAll();
        Random.randomSeed(seed);
    }
}
