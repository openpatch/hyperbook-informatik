 

import org.openpatch.scratch.*;

public class SmartRocket extends Window {
  public SmartRocket() {
    super(800, 600, "SmartRocket/assets");
    this.setStage(new Level());
  }

  public static void main(String[] args) {
    new SmartRocket();
  }
}
