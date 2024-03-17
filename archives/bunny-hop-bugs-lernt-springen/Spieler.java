import org.openpatch.scratch.*;
import org.openpatch.scratch.extensions.animation.*;

public class Spieler extends AnimatedSprite
{
    Boolean springt = false;
    Boolean faellt = false;
    float sprungGeschwindigkeit = 5;
    float sprungHoehe = -100;
    
    float fallGeschwindigkeit = 5;
    float bodenHoehe = 185;

    public Spieler()
    {
        this.addAnimation("gehen", "assets/Players/bunny1_walk%d.png", 2);
    }

    public void run() {
        this.playAnimation("gehen");
        
        if (springt) {
            changeY(-sprungGeschwindigkeit);
            if (getY() <= sprungHoehe) {
                faellt = true;
                springt = false;
                setY(sprungHoehe);
            }
        } else if (faellt) {
            changeY(fallGeschwindigkeit);
            if (getY() >= bodenHoehe) {
                faellt = false;
                setY(bodenHoehe);
            }
        }
        
        if (!faellt && !springt && isKeyPressed(KeyCode.VK_SPACE)) {
            springt = true;
        }
    }
}
