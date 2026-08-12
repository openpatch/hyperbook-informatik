import org.openpatch.scratch.*;

/// Die Bühne: Sie baut die Welt auf.
public class BunnyHop extends Stage {

    /// So viele Plattformen liegen nebeneinander.
    public static final int PLATTFORMEN = 9;
    /// So breit ist eine Plattform.
    public static final int BREITE = 100;

    public BunnyHop() {
        this.setColor(140, 200, 235);

        Spieler bugs = new Spieler();
        this.add(bugs);
    }
}
