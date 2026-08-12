import org.openpatch.scratch.*;

/// Die Bühne: Sie baut die Welt auf.
public class BunnyHop extends Stage {

    /// So viele Plattformen liegen nebeneinander.
    public static final int PLATTFORMEN = 9;
    /// So breit ist eine Plattform.
    public static final int BREITE = 100;

    private double geschwindigkeit = 3;

    public BunnyHop() {
        this.setColor(140, 200, 235);

        for (int i = 0; i < PLATTFORMEN; i++) {
            Plattform p = new Plattform(this);
            p.setPosition(-400 + i * BREITE, -120);
            this.add(p);
        }

        Spieler bugs = new Spieler();
        this.add(bugs);
    }

    /// Wie schnell die Welt an Bugs vorbeizieht.
    public double getGeschwindigkeit() {
        return geschwindigkeit;
    }
}
