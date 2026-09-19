public class Leinwand {

    /* Diese Klasse gehoert zum Werkzeug, nicht zum Lernstoff. Sie nimmt
       Gitter entgegen und zeichnet sie nebeneinander - mehr nicht. Du musst
       sie nicht verstehen, um das Projekt zu bearbeiten, aber du darfst
       hineinsehen. */

    private static final int ZELLE_BREITE = 280;
    private static final int ZELLE_HOEHE = 210;
    private static final int RAND = 10;

    private int spalten;
    private int naechste;

    /** Legt eine Buehne an, auf der pAnzahl Bilder Platz haben. */
    public Leinwand(int pAnzahl) {
        // Mehr als drei Bilder nebeneinander passen nicht in den Ausgabe-
        // bereich. Ab vieren werden sie deshalb auf zwei Reihen verteilt.
        spalten = pAnzahl;
        if (pAnzahl > 3) {
            spalten = (pAnzahl + 1) / 2;
        }
        int reihen = (pAnzahl + spalten - 1) / spalten;

        World welt = new World(
            spalten * (ZELLE_BREITE + RAND) + RAND,
            reihen * (ZELLE_HOEHE + RAND) + RAND);
        // Heller Hintergrund: sonst ist ein schwarzer Bildrand, wie ihn jeder
        // Nachbarschaftsfilter hinterlaesst, vom Rand der Buehne nicht zu
        // unterscheiden.
        welt.setBackgroundColor(0xEEEEEE);
        naechste = 0;
    }

    /** Zeigt ein Graustufengitter an der naechsten freien Stelle. */
    public void zeige(int[][] pGrau) {
        zeige(pGrau, pGrau, pGrau);
    }

    /** Zeigt ein Farbbild aus drei Kanaelen an der naechsten freien Stelle. */
    public void zeige(int[][] pRot, int[][] pGruen, int[][] pBlau) {
        int hoehe = pRot.length;
        int breite = pRot[0].length;

        // Das Bild fuellt die Zelle, behaelt aber sein Seitenverhaeltnis -
        // ein hochkant gedrehtes Bild wird sonst in die Breite gezerrt.
        int zeigeBreite = ZELLE_BREITE;
        int zeigeHoehe = hoehe * ZELLE_BREITE / breite;
        if (zeigeHoehe > ZELLE_HOEHE) {
            zeigeHoehe = ZELLE_HOEHE;
            zeigeBreite = breite * ZELLE_HOEHE / hoehe;
        }

        int zelleLinks = RAND + (naechste % spalten) * (ZELLE_BREITE + RAND);
        int zelleOben = RAND + (naechste / spalten) * (ZELLE_HOEHE + RAND);
        int links = zelleLinks + (ZELLE_BREITE - zeigeBreite) / 2;
        int oben = zelleOben + (ZELLE_HOEHE - zeigeHoehe) / 2;

        Bitmap bild = new Bitmap(breite, hoehe, links, oben, zeigeBreite, zeigeHoehe);
        for (int zeile = 0; zeile < hoehe; zeile++) {
            for (int spalte = 0; spalte < breite; spalte++) {
                bild.setColor(spalte, zeile, farbe(
                    pRot[zeile][spalte], pGruen[zeile][spalte], pBlau[zeile][spalte]));
            }
        }
        naechste = naechste + 1;
    }

    /** Die Farbe eines Bildpunkts aus seinen drei Anteilen. */
    private int farbe(int pRot, int pGruen, int pBlau) {
        int wert = Color.fromRGB(begrenzt(pRot), begrenzt(pGruen), begrenzt(pBlau));
        // Die Zahl 0 bedeutet fuer ein Bitmap "keine Farbe": der Bildpunkt
        // bliebe durchsichtig und man saehe den Hintergrund. Ein Hauch ueber
        // Null sieht genauso schwarz aus und wird gezeichnet.
        if (wert == 0) {
            return 0x010101;
        }
        return wert;
    }

    /**
     * Haelt einen Wert zwischen 0 und 255. Filter rechnen leicht darueber
     * hinaus - dann wird hier abgeschnitten, statt eine Farbe zu erfinden.
     */
    private int begrenzt(int pWert) {
        if (pWert < 0) {
            return 0;
        }
        if (pWert > 255) {
            return 255;
        }
        return pWert;
    }
}
