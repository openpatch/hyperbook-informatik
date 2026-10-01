import org.openpatch.scratch.*;

/// Ein Raum der Spielwelt. Wie er aussieht, steht im Plan: ein Zeichen je Kachel.
public class Welt extends Stage {

    /// So viele Kacheln liegen nebeneinander.
    public static final int SPALTEN = 16;
    /// So viele Kacheln liegen untereinander.
    public static final int ZEILEN = 9;
    /// So viele Pixel ist eine Kachel auf der Bühne breit und hoch.
    public static final int KACHEL = 48;

    /// `#` Stein, `.` Gras, `K` Kiste, `M` Münze, `S` Startplatz,
    /// `T` Heiltrank, `R` Feuerrolle, `O` Reisbällchen
    private static final String[] PLAN = {
        "################",
        "#......M.....T.#",
        "#..S...........#",
        "#.....##...M...#",
        "#..M..##.......#",
        "#..R......K....#",
        "#....M......M..#",
        "#.........O....#",
        "################"
    };

    private Spieler spieler;
    private Text anzeige;
    private int punkte = 0;

    /// Was der Spieler aufgehoben hat, in der Reihenfolge des Aufhebens.
    /// Das aktuelle Element der Liste ist das ausgewählte Fundstück.
    private List<Fundstueck> inventar = new List<Fundstueck>();

    public Welt() {
        this.addSound("muenze", "assets/audio/sounds/bonus/coin.ogg");

        spieler = new Spieler(this);
        // Erst der Boden: Unter allem liegt Gras. Was später hinzukommt,
        // liegt oben - so verschwindet nichts unter dem Boden.
        for (int z = 0; z < ZEILEN; z++) {
            for (int s = 0; s < SPALTEN; s++) {
                this.setze(new Gras(), s, z);
            }
        }
        // Dann alles, was darauf steht.
        for (int z = 0; z < ZEILEN; z++) {
            for (int s = 0; s < SPALTEN; s++) {
                char zeichen = PLAN[z].charAt(s);
                if (zeichen == '#') {
                    this.setze(new Stein(), s, z);
                } else if (zeichen == 'K') {
                    this.setze(new Kiste(), s, z);
                } else if (zeichen == 'M') {
                    this.setze(new Muenze(), s, z);
                } else if (zeichen == 'T') {
                    this.setze(new Fundstueck("Heiltrank", "assets/items/potion/life-pot.png"), s, z);
                } else if (zeichen == 'R') {
                    this.setze(new Fundstueck("Feuerrolle", "assets/items/scroll/scroll-fire.png"), s, z);
                } else if (zeichen == 'O') {
                    this.setze(new Fundstueck("Reisbällchen", "assets/items/food/onigiri.png"), s, z);
                } else if (zeichen == 'S') {
                    spieler.setPosition(zuX(s), zuY(z));
                }
            }
        }
        // Der Spieler kommt zuletzt, damit er über allem läuft.
        this.add(spieler);

        anzeige = new Text("", 0, 196, 600);
        anzeige.setTextSize(20);
        anzeige.setTextColor(255, 255, 255);
        anzeige.setStrokeColor(0, 0, 0);
        this.add(anzeige);
        this.zeigePunkte();
    }

    /// Legt eine Figur auf die Kachel in Spalte pSpalte und Zeile pZeile.
    public void setze(Sprite pFigur, int pSpalte, int pZeile) {
        pFigur.setPosition(zuX(pSpalte), zuY(pZeile));
        this.add(pFigur);
    }

    /// Die x-Koordinate der Mitte einer Spalte. Spalte 0 liegt ganz links.
    public static double zuX(int pSpalte) {
        return -SPALTEN * KACHEL / 2 + KACHEL / 2 + pSpalte * KACHEL;
    }

    /// Die y-Koordinate der Mitte einer Zeile. Zeile 0 liegt ganz oben.
    public static double zuY(int pZeile) {
        return ZEILEN * KACHEL / 2 - KACHEL / 2 - pZeile * KACHEL;
    }

    /// Legt ein Fundstück hinten ins Inventar. Ist noch nichts ausgewählt,
    /// wird es ausgewählt.
    public void nimm(Fundstueck pFund) {
        pFund.kommtInsInventar();
        // nach vorn, sonst läge es unten unter den Steinen
        pFund.goToFrontLayer();
        inventar.append(pFund);
        if (!inventar.hasAccess()) {
            inventar.toLast();
        }
        this.zeigeInventar();
    }

    /// E wählt das nächste Fundstück, die Leertaste benutzt das ausgewählte.
    public void whenKeyPressed(KeyCode pTaste) {
        if (inventar.isEmpty()) {
            return;
        }
        if (pTaste == KeyCode.E) {
            inventar.next();
            if (!inventar.hasAccess()) {
                inventar.toFirst();
            }
        } else if (pTaste == KeyCode.SPACE && inventar.hasAccess()) {
            Fundstueck f = inventar.getContent();
            inventar.remove();
            f.remove();
            spieler.say(f.getName() + " benutzt!", 1500);
            if (!inventar.hasAccess()) {
                inventar.toFirst();
            }
        }
        this.zeigeInventar();
    }

    /// Stellt die Fundstücke unten in eine Reihe, das ausgewählte größer.
    private void zeigeInventar() {
        // Der Durchlauf verschiebt das aktuelle Element - also merken ...
        Fundstueck gewaehlt = null;
        if (inventar.hasAccess()) {
            gewaehlt = inventar.getContent();
        }
        int platz = 0;
        inventar.toFirst();
        while (inventar.hasAccess()) {
            Fundstueck f = inventar.getContent();
            f.setPosition(zuX(1 + platz), zuY(ZEILEN - 1));
            if (f == gewaehlt) {
                f.setSize(400);
            } else {
                f.setSize(300);
            }
            platz = platz + 1;
            inventar.next();
        }
        // ... und danach wiederfinden.
        inventar.toFirst();
        while (inventar.hasAccess() && inventar.getContent() != gewaehlt) {
            inventar.next();
        }
    }

    /// Zählt eine eingesammelte Münze.
    public void punkten() {
        punkte = punkte + 1;
        this.playSound("muenze");
        this.zeigePunkte();
    }

    private void zeigePunkte() {
        anzeige.showText("Münzen: " + punkte);
    }
}
