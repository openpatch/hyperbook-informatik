import org.openpatch.scratch.*;

public class Level extends Stage {
    private Spieler bugs;
    private BunnyHop spiel;
    private StachelFeind ingo;
    private Plattform letzte;

    public Level(BunnyHop pSpiel)
    {
        this.setColor(183,230,255);
        spiel = pSpiel;
        bugs = new Spieler();
        bugs.setPosition(80, 180);
        this.add(bugs);

        ingo = new StachelFeind(bugs);
        ingo.setPosition(750, 210);
        this.add(ingo);

        letzte = new Plattform(this, bugs, false);
        letzte.setPosition(0, 340);
        
        for (int i = 0; i < 10; i++) {
            Plattform p = new Plattform(this, bugs, this.pickRandom(1, 10) > 5);
            p.setPosition(letzte.getX() + letzte.getWidth() / 2 + p.getWidth() / 2, 340);
            letzte = p;
            this.add(p);
        }
        
        this.addTimer("ende");
    }

    public Plattform getLetzte() {
        return this.letzte;
    }

    public void setLetzte(Plattform pLetzte) {
        this.letzte = pLetzte;
    }

    public void run() {
        if (bugs.hatVerloren()) {
            this.setColor(120, 120, 120);
            if (this.getTimer("ende").afterMillis(1000)) {
               spiel.switchStage("ende"); 
            }  
        } else {
            spiel.veraendereDistanz(1);
            this.display("Punkte: " + spiel.getDistanz());
        }
    }
}