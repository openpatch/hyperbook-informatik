import org.openpatch.scratch.*;
public class Spieler extends AnimatedSprite
{
    String zustand = "laufen";

    public Spieler()
    {
        this.addAnimation("gehen", "bunny1_walk%d", 2);
    }

    public void run() {
        this.playAnimation("gehen");
    }
}
