import org.openpatch.scratch.*;

public class Level extends Stage {

    private boolean pause;

    public Level() {
        Spieler bugs = new Spieler();
        bugs.setPosition(100, 250);
        this.add(bugs);
        
        Stachelball ball = new Stachelball(bugs);
        ball.setPosition(900, 250);
        this.add(ball);

    }

}