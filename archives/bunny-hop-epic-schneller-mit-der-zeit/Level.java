import org.openpatch.scratch.*;

public class Level extends Stage {

    private Plattform letzte;
    private int geschwindigkeit = 1;

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
    
    public void whenKeyPressed(int pKeyCode) {
        if(pKeyCode == KeyCode.VK_M) {
            this.geschwindigkeit += 2;
        } else if (pKeyCode == KeyCode.VK_N) {
            this.geschwindigkeit -= 2;
        }
    }
    
    public int getGeschwindigkeit() {
        return this.geschwindigkeit;
    }

    public void neuePlattform() {
        Plattform p = new Plattform(this);
        // die neue Plattform an die Letzte anreihen
        p.setPosition(letzte.getX() + letzte.getWidth() / 2 + p.getWidth() /2, 340);
        // die neue Plattform der Bühne (Stage) hinzufügen            
        this.add(p);
        // die neue Plattform soll nun unsere neue letzte Plattform sein
        letzte = p;
    }
    
    public void run() {
        if(this.getTimer().everyMillis(1000)) {
            this.geschwindigkeit += 0.5;
        }
        this.display("Schneller (n). Langsamer (m).");
    }
}   