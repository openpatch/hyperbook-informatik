 

import org.openpatch.scratch.*;

public class Ziel extends Sprite {

  public Ziel() {
    this.addCostume("target", "star");
    this.setHitbox(new Polygon(new double[] {36, 36, 92, 92}, new double[] {92, 36, 36, 92}));
  }
}
