import org.openpatch.scratch.*;

public class Level extends Stage {

    private Plattform letzte;
    private boolean pause;
    private int anzahlPlattformen = 0;

    public Level() {
        Spieler bugs = new Spieler(this);
        bugs.setPosition(100, 250);
        this.add(bugs);

        letzte = new Plattform(this);
        letzte.setPosition(0, 340);

        for(int i = 0; i < 20; i++) {
            this.neuePlattform();
        }
    }

    public void neuePlattform() {
        anzahlPlattformen += 1;
        Plattform p = new Plattform(this);
        // Die neue Plattform an die Letzte anreihen.
        int luecke = 0;
        // Alle 5 Plattformen soll eine Lücke generiert werden.
        if (anzahlPlattformen % 5 == 0) {
            luecke= this.pickRandom(50, 150);
        }
        p.setPosition(
            letzte.getX() + letzte.getWidth() / 2 + p.getWidth() /2 + luecke, 
            340);
        // die neue Plattform der Bühne (Stage) hinzufügen            
        this.add(p);
        // die neue Plattform soll nun unsere neue letzte Plattform sein
        letzte = p;
    }
}