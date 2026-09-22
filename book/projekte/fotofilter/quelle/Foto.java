public class Foto {

    private static final String DATEINAME = "fotofilter.png";

    private int[][] farben;

    /** Laedt das Foto und liest seine Bildpunkte in ein Gitter ein. */
    public Foto() {
        Bitmap bild = new Bitmap(DATEINAME);
        int hoehe = bild.getResolutionY();
        int breite = bild.getResolutionX();
        farben = new int[hoehe][breite];

        for (int zeile = 0; zeile < hoehe; zeile++) {
            for (int spalte = 0; spalte < breite; spalte++) {
                farben[zeile][spalte] = bild.getColorAsInt(spalte, zeile);
            }
        }

        // Das Bitmap wird nur zum Einlesen gebraucht. Angezeigt werden spaeter
        // die Gitter, die die Filter aus seinen Bildpunkten berechnen.
        bild.destroy();
    }

    /** Die Breite des Fotos in Bildpunkten. */
    public int breite() {
        return farben[0].length;
    }

    /** Die Hoehe des Fotos in Bildpunkten. */
    public int hoehe() {
        return farben.length;
    }

    /**
     * Liefert einen Farbkanal als Gitter von Werten zwischen 0 und 255.
     * @param pVersatz 16 fuer rot, 8 fuer gruen, 0 fuer blau
     */
    private int[][] kanal(int pVersatz) {
        int[][] werte = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {
            for (int spalte = 0; spalte < breite(); spalte++) {
                werte[zeile][spalte] =
                    (farben[zeile][spalte] >> pVersatz) & 255;
            }
        }
        return werte;
    }

    /** Der rote Kanal des Fotos, 0 bis 255. */
    public int[][] rot() {
        return kanal(16);
    }

    /** Der gruene Kanal des Fotos, 0 bis 255. */
    public int[][] gruen() {
        return kanal(8);
    }

    /** Der blaue Kanal des Fotos, 0 bis 255. */
    public int[][] blau() {
        return kanal(0);
    }

    /**
     * Das Foto als Graustufen, 0 ist schwarz und 255 ist weiss.
     * Gruen zaehlt am meisten, blau am wenigsten - so sieht das Auge.
     */
    public int[][] graustufen() {
        int[][] r = rot();
        int[][] g = gruen();
        int[][] b = blau();
        int[][] grau = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {
            for (int spalte = 0; spalte < breite(); spalte++) {
                grau[zeile][spalte] =
                    (r[zeile][spalte] * 30 + g[zeile][spalte] * 59 + b[zeile][spalte] * 11) / 100;
            }
        }
        return grau;
    }
}
