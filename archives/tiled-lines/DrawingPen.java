import org.openpatch.scratch.extensions.pen.Pen;

public class DrawingPen extends Pen {
     public void drawLine(double x1, double y1, double x2, double y2) {
         this.up();
         this.setPosition(x1, y1);
         this.down();
         this.setPosition(x2, y2);
     }
}