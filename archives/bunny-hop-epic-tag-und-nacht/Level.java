import org.openpatch.scratch.*;

public class Level extends Stage {

    private boolean tag = true;
    
    public Level() {
        Spieler bugs = new Spieler(this);
        bugs.setPosition(100, 250);
        this.add(bugs);
        this.add(new NachtFilter(this));
        this.addTimer("tag");
    }
    
    public void run() {
        if(this.getTimer("tag").intervalMillis(8000, 8000)) {
            this.setColor(173,230,255);
            tag = true;
        } else{
            this.setColor(10,11,15);
            tag = false;
        }
    }
    
    public boolean istTag() {
        return tag;
    }

}