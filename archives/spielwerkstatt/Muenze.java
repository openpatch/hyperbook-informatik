import org.openpatch.scratch.*;

/// Eine Münze, die sich dreht, bis jemand sie einsammelt.
public class Muenze extends AnimatedSprite {

    public Muenze() {
        // Vier Bilder zu je 10 × 10 Pixeln nebeneinander.
        this.addAnimation("drehen", "assets/items/treasure/coin2.png", 4, 10, 10);
        this.setAnimationInterval(150);
        this.setSize(300);
    }

    public void run() {
        this.playAnimation("drehen");
    }

    public void einsammeln() {
        this.remove();
    }
}
