/// Ein Schiebezug, wie er vor dem Schieben aussah: wo die Kiste und wo der
/// Spieler standen. Daten, keine Figur - deshalb kann man ihn aufheben.
public class Zug {

    private Kiste kiste;
    private double kisteX;
    private double kisteY;
    private double spielerX;
    private double spielerY;

    public Zug(Kiste pKiste, double pKisteX, double pKisteY, double pSpielerX, double pSpielerY) {
        kiste = pKiste;
        kisteX = pKisteX;
        kisteY = pKisteY;
        spielerX = pSpielerX;
        spielerY = pSpielerY;
    }

    public Kiste getKiste() {
        return kiste;
    }

    public double getKisteX() {
        return kisteX;
    }

    public double getKisteY() {
        return kisteY;
    }

    public double getSpielerX() {
        return spielerX;
    }

    public double getSpielerY() {
        return spielerY;
    }
}
