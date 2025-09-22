import org.openpatch.scratch.Stage;
import org.openpatch.scratch.KeyCode;
import org.openpatch.scratch.extensions.math.Random;

public class TiledLines extends Stage {

    private DrawingPen myPen; 
    private double step;
    private long seed;

    public TiledLines() {
        super(1000, 1000);
        step = 80;
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

    public void drawInBox(double x, double y, double width, double height) {
        var leftToRight = Random.random() >= 0.5;
        if (leftToRight) {
            myPen.drawLine(x, y, x + width, y + height);
        } else {
            myPen.drawLine(x + width, y, x, y + height);
        }
    }

    public void run() {
        if (myPen == null) return;
        
        this.eraseAll();
        Random.randomSeed(seed);

        for (int x = -400; x < 400; x += step) {
            for (int y = -400; y < 400; y += step) {
                drawInBox(x, y, step, step);
            }
        }
    }
}
