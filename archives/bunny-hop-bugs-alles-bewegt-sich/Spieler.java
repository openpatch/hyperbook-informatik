import org.openpatch.scratch.extensions.animation.*;

public class Spieler extends AnimatedSprite
{
    String zustand = "laufen";

    public Spieler()
    {
        this.addAnimation("gehen", "assets/Players/bunny1_walk%2d.png", 2);
    }

    public void run() {
        this.playAnimation("gehen");
    }
}
