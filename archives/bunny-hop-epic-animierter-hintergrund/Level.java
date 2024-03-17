import org.openpatch.scratch.*;

public class Level extends Stage {

    private Plattform letztePlattform;
    private Hintergrund letzterHintergrund;

    public Level() {

        Spieler bugs = new Spieler(this);
        bugs.setPosition(100, 290);
        this.add(bugs);

        // Erstelle einen ersten Ankerhintergrund.
        // An diesem werden sich die weiteren Hintergründe orientieren
        // Der Ankerhintergrund soll sich außerhalb des Bildschirms befinden,
        // damit keine Lücken entstehen.
        letzterHintergrund = new Hintergrund(this, 3);
        letzterHintergrund.setPosition(-2000, 150);
        for (int i = 0; i < 4; i++) {
            this.neuerHintergrund();
        }

        letztePlattform = new Plattform(this);
        letztePlattform.setPosition(0, 370);

        for(int i = 0; i < 20; i++) {
            this.neuePlattform();
        }

    }

    public void neuerHintergrund() {
        Hintergrund aktuellLetzter = letzterHintergrund;
        
        // die drei Hintergrundebenen sollen immer zusammen erstellt werden
        for (int i = 3; i >= 1; i--) {
            Hintergrund h = new Hintergrund(this, i);
            h.setPosition(
                aktuellLetzter.getX() + aktuellLetzter.getWidth() / 2 + h.getWidth() / 2,
                aktuellLetzter.getY()
            );
            this.add(h);
            h.goToBackLayer();
            letzterHintergrund = h;
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