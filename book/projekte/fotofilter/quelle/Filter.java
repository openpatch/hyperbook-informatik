public abstract class Filter {

    /** Liefert ein neues Bild. Das uebergebene bleibt unveraendert. */
    public abstract int[][] anwenden(int[][] pBild);

    /** Ein leeres Gitter in der Groesse des uebergebenen. */
    protected int[][] leeresWie(int[][] pBild) {
        return new int[pBild.length][pBild[0].length];
    }

    /** Haelt einen Wert zwischen 0 und 255. */
    protected int begrenzt(int pWert) {
        if (pWert < 0) {
            return 0;
        }
        if (pWert > 255) {
            return 255;
        }
        return pWert;
    }
}
