import org.openpatch.scratch.*;

/// Die Bühne: Sie baut die Welt auf.
public class BunnyHop extends Stage {

    /// So viele Plattformen liegen nebeneinander.
    public static final int PLATTFORMEN = 9;
    /// So breit ist eine Plattform.
    public static final int BREITE = 100;

    private Text anzeige;
    private int punkte = 0;
    private double geschwindigkeit = 3;

    public BunnyHop() {
        this.setColor(140, 200, 235);

        for (int i = 0; i < PLATTFORMEN; i++) {
            Plattform p = new Plattform(this);
            p.setPosition(-400 + i * BREITE, -120);
            this.add(p);
        }

        for (int i = 0; i < 3; i++) {
            Muenze m = new Muenze(this);
            m.setPosition(100 + i * 260, 10);
            this.add(m);
        }

        Spieler bugs = new Spieler(this);
        this.add(bugs);

        anzeige = new Text();
        anzeige.setPosition(-380, 160);
        anzeige.setAlign(TextAlign.LEFT);
        anzeige.setTextSize(20);
        anzeige.setTextColor(40, 40, 40);
        this.add(anzeige);
    }

    public void run() {
        anzeige.showText("Punkte: " + punkte);
    }

    /// Wie schnell die Welt an Bugs vorbeizieht.
    public double getGeschwindigkeit() {
        return geschwindigkeit;
    }

    /// Zählt eine eingesammelte Münze.
    public void punkten() {
        punkte = punkte + 1;
        geschwindigkeit = geschwindigkeit + 0.2;
    }
}
