import org.openpatch.scratch.*;

public class BunnyHop extends Stage
{
    Spieler bugs;
    StachelFeind ingo;
    Plattform p1;
    Plattform p2;
    Plattform p3;
    Plattform p4;

    public BunnyHop()
    {
        this.setDebug(false);
        this.setSize(800, 400);
        
        bugs = new Spieler();
        bugs.setPosition(80, 180);
        this.add(bugs);
        
        ingo = new StachelFeind();
        ingo.setPosition(750, 210);
        this.add(ingo);
        
        p1 = new Plattform(false);
        p1.setPosition(100, 340);
        this.add(p1);
        
        p2 = new Plattform(false);
        p2.setPosition(300, 340);
        this.add(p2);
        
        p3 = new Plattform(false);
        p3.setPosition(500, 340);
        this.add(p3);
        
        p4 = new Plattform(true);
        p4.setPosition(700, 340);
        this.add(p4);
    }
}
