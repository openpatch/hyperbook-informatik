import org.openpatch.scratch.*;

public class Spieler extends AnimatedSprite
{
    Boolean springt = false;
    Boolean faellt = false;
    Boolean verloren = false;
    float sprungGeschwindigkeit = 5;
    float sprungHoehe = -100;

    float fallGeschwindigkeit = 5;
    float bodenHoehe = 185;

    public Spieler()
    {
        this.addAnimation("gehen", "bunny1_walk%d", 2);
        this.addCostume("verletzt", "bunny1_hurt");
    }

    public void verletzten() {
        this.verloren = true;
    }

    public void springen() {
        changeY(-sprungGeschwindigkeit);
        if (getY() <= sprungHoehe) {
            faellt = true;
            springt = false;
            setY(sprungHoehe);
        }
    }
    
    public void gravitation() {
        this.changeY(fallGeschwindigkeit);
        while(this.isTouchingSprite(Plattform.class)) {
            this.changeY(-0.1);
            faellt = false;
        }
    }

    public void run() {

        if (!verloren) {
            this.playAnimation("gehen");
            if (springt) {
                this.springen();
            } else {
                this.gravitation();
            }

            if (!faellt && !springt && isKeyPressed(KeyCode.SPACE)) {
                springt = true;
            }
        } else {
            this.switchCostume("verletzt");
        }
    }
}
