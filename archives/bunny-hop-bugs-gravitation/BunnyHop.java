import org.openpatch.scratch.*;

public class BunnyHop extends Stage
{
    Spieler bugs;
    StachelFeind ingo;
    Plattform p1;
    Plattform p2;
    Plattform p3;
    Plattform p4;
    Plattform p5;

    public BunnyHop()
    {
        super(800, 400);
        this.setDebug(true);

        bugs = new Spieler();
        bugs.setPosition(80, 180);
        this.add(bugs);

        ingo = new StachelFeind(bugs);
        ingo.setPosition(750, 210);
        this.add(ingo);

        p1 = new Plattform(false);
        p1.setPosition(100, 340);
        this.add(p1);

        p2 = new Plattform(false);
        p2.setPosition(100 + 201, 340);
        this.add(p2);

        p3 = new Plattform(false);
        p3.setPosition(100 + 201 * 2, 340);
        this.add(p3);

        p4 = new Plattform(true);
        p4.setPosition(100 + 201 * 3, 340);
        this.add(p4);

        p5 = new Plattform(true);
        p5.setPosition(100 + 201 * 4, 340);

        this.add(p5);
    }
}
