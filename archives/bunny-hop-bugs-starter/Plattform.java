import org.openpatch.scratch.*;

public class Plattform extends Sprite
{
    private boolean istKaputt;
    private boolean beruehrt = false;
    private Spieler spieler;
    private Level level;

    public Plattform(Level pLevel, Spieler pSpieler, boolean pIstKaputt)
    {
        level = pLevel;
        spieler = pSpieler;
        istKaputt = pIstKaputt;
        this.addCostume("ganz", "assets/grafiken/Environment/ground_grass_small.png");
        this.addCostume("kaputt", "assets/grafiken/Environment/ground_grass_small_broken.png");
        this.addTimer("verschwinden");

        if (istKaputt) {
            this.switchCostume("kaputt");
        } else {
            this.switchCostume("ganz");
        }
    }

    public void beruehren() {
        beruehrt = true;
    }

    public void run() {
        this.changeX(-2);
        if (istKaputt && beruehrt && this.getTimer("verschwinden").afterMillis(500)) {
            this.hide();
        }
        if (this.getX() + this.getWidth() < 0) {
            Plattform letzte = level.getLetzte();
            this.setX(letzte.getX() + letzte.getWidth() / 2 + this.getWidth() / 2);
            beruehrt = false;
            this.show();
            level.setLetzte(this);
        }
    }

}
