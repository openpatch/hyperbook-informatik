import org.openpatch.scratch.extensions.animation.*;

public class Stachelball extends AnimatedSprite {

    private Spieler spieler;
    
    public Stachelball(Spieler pSpieler) {
        this.spieler = pSpieler;
        this.addAnimation("rollen", "assets/grafiken/spikeBall_%d.png", 2);
    }
    
    public void ueberpruefeKollision() {
        if (this.isTouchingSprite(this.spieler)) {
            this.spieler.verletzen();
        }
    }
    
    public void teleportiereZumStart() {
        if(this.getX() < -200) {
            this.setX(900);
        }
    }
    
    public void run() {
        this.changeX(-2);
        this.playAnimation("rollen");
        this.ueberpruefeKollision();
        this.teleportiereZumStart();
    }
}