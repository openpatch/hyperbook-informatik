import org.openpatch.scratch.*;
import java.util.List;

public class Spieler extends AnimatedSprite
{
    private boolean springt = false;
    private boolean faellt = false;
    private boolean verloren = false;

    private float sprungGeschwindigkeit = 5;
    private float sprungHoehe = 40;

    private float fallGeschwindigkeit = 5;

    public Spieler()
    {
        this.addAnimation("gehen", "assets/grafiken/Players/bunny1_walk%d.png", 2);
        this.addCostume("verletzt", "assets/grafiken/Players/bunny1_hurt.png");
        this.addTimer("verloren");
    }

    public void verletzten() {
        this.verloren = true;
    }

    public boolean hatVerloren() {
        return this.verloren;
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
        List<Sprite> plattformen = this.getTouchingSprites(Plattform.class);
        for (Sprite plattform : plattformen) {
            ((Plattform) plattform).beruehren();
        }
        faellt = true;
        while(this.getY() < 320 && plattformen.size() > 0) {
            this.changeY(-0.1);
            faellt = false;
            for(int i = 0; i < plattformen.size(); i++) {
                Sprite p = plattformen.get(i);
              if (!p.isTouchingSprite(this)) {
                plattformen.remove(i);
              }
            }
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

            if (!faellt && !springt && isKeyPressed(KeyCode.VK_SPACE)) {
                springt = true;
            }
            if (this.getY() - this.getHeight() > 400) {
                this.verletzten();
            }
        } else {
            this.switchCostume("verletzt");
        }
    }
}
