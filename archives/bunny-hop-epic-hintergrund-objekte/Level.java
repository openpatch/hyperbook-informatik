import org.openpatch.scratch.*;

public class Level extends Stage {

    private Plattform letztePlattform;

    public Level() {

        Spieler bugs = new Spieler(this);
        bugs.setPosition(100, 290);
        this.add(bugs);

        letztePlattform = new Plattform(this);
        letztePlattform.setPosition(0, 370);

        for(int i = 0; i < 20; i++) {
            this.neuePlattform();
        }

    }

    public void neuePlattform() {
        Plattform p = new Plattform(this);
        // die neue Plattform an die Letzte anreihen
        p.setPosition(
            letztePlattform.getX() + letztePlattform.getWidth() / 2 + p.getWidth() /2,
            letztePlattform.getY()
        );
        // die neue Plattform der Bühne (Stage) hinzufügen            
        this.add(p);
        // die neue Plattform soll nun unsere neue letzte Plattform sein
        letztePlattform = p;
    }
}