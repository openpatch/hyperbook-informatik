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
    private boolean vorbei = false;

    public BunnyHop() {
        this.setColor(140, 200, 235);

        for (int i = 0; i < 6; i++) {
            Deko d = new Deko(this);
            d.setPosition(-400 + i * 160, -75);
            this.add(d);
        }

        anzeige = new Text();

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

        for (int i = 0; i < 2; i++) {
            Stachel s = new Stachel(this);
            s.setPosition(250 + i * 420, -56);
            this.add(s);
        }

        Spieler bugs = new Spieler(this);
        this.add(bugs);

        anzeige.setPosition(-380, 160);
        anzeige.setAlign(TextAlign.LEFT);
        anzeige.setTextSize(20);
        anzeige.setTextColor(40, 40, 40);
        this.add(anzeige);
    }

    public void run() {
        if (!vorbei) {
            anzeige.showText("Punkte: " + punkte);
        }
    }

    public void whenKeyPressed(KeyCode taste) {
        if (vorbei && taste == KeyCode.R) {
            Window.getInstance().setStage(new BunnyHop());
        }
    }

    /// Wie schnell die Welt an Bugs vorbeizieht.
    public double getGeschwindigkeit() {
        if (vorbei) {
            return 0;
        }
        return geschwindigkeit;
    }

    /// Zählt eine eingesammelte Münze.
    public void punkten() {
        punkte = punkte + 1;
        geschwindigkeit = geschwindigkeit + 0.2;
    }

    /// Beendet das Spiel.
    public void spielEnde() {
        vorbei = true;
        anzeige.showText("Ende! Punkte: " + punkte + " - drücke r für ein neues Spiel");
    }

    public boolean istVorbei() {
        return vorbei;
    }
}
