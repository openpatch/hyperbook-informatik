import org.openpatch.scratch.*;

public class Plattform extends Sprite
{
    boolean istKaputt;
    
    public Plattform(boolean pIstKaputt)
    {
        istKaputt = pIstKaputt;
        this.addCostume("ganz", "ground_grass_small");
        this.addCostume("kaputt", "ground_grass_small_broken");
        
        if (istKaputt) {
            this.switchCostume("kaputt");
        } else {
            this.switchCostume("ganz");
        }
    }
}
