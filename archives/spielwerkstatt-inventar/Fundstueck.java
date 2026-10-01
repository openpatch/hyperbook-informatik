import org.openpatch.scratch.*;

/// Etwas, das der Spieler aufheben und später benutzen kann.
public class Fundstueck extends Sprite {

    private String name;
    private boolean imInventar = false;

    public Fundstueck(String pName, String pBild) {
        name = pName;
        this.addCostume(pName, pBild);
        this.setSize(300);
    }

    public String getName() {
        return name;
    }

    /// Ob das Fundstück schon im Inventar liegt.
    public boolean istImInventar() {
        return imInventar;
    }

    public void kommtInsInventar() {
        imInventar = true;
    }
}
