import org.openpatch.scratch.*;

/// Die Figur, die du mit den Pfeiltasten steuerst.
public class Spieler extends AnimatedSprite {

    /// So viele Pixel geht der Spieler in jedem Bild.
    public static final int TEMPO = 3;

    private static final String BILD = "assets/actor/character/boy/sprite-sheet.png";

    private Welt welt;

    public Spieler(Welt pWelt) {
        welt = pWelt;
        // Im Bild steht jede Blickrichtung in einer eigenen Spalte,
        // die vier Schritte untereinander.
        this.addAnimation("unten", BILD, 4, 16, 16, 0, true);
        this.addAnimation("oben", BILD, 4, 16, 16, 1, true);
        this.addAnimation("links", BILD, 4, 16, 16, 2, true);
        this.addAnimation("rechts", BILD, 4, 16, 16, 3, true);
        this.setAnimationInterval(150);
        this.setSize(250);
    }

    public void run() {
        double altX = this.getX();
        double altY = this.getY();

        if (this.isKeyPressed(KeyCode.RIGHT)) {
            this.changeX(TEMPO);
            this.playAnimation("rechts");
        } else if (this.isKeyPressed(KeyCode.LEFT)) {
            this.changeX(-TEMPO);
            this.playAnimation("links");
        } else if (this.isKeyPressed(KeyCode.UP)) {
            this.changeY(TEMPO);
            this.playAnimation("oben");
        } else if (this.isKeyPressed(KeyCode.DOWN)) {
            this.changeY(-TEMPO);
            this.playAnimation("unten");
        }

        // In eine Wand hineingelaufen? Dann zurück auf den alten Platz.
        if (this.getTouchingSprite(Wand.class) != null) {
            this.setPosition(altX, altY);
        }

        Muenze m = this.getTouchingSprite(Muenze.class);
        if (m != null) {
            m.einsammeln();
            welt.punkten();
        }
    }
}
