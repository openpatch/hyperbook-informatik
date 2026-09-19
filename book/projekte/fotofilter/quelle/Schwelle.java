public class Schwelle extends Filter {

    private int grenze;

    public Schwelle(int pGrenze) {
        grenze = pGrenze;
    }

    public int[][] anwenden(int[][] pBild) {
        int[][] neu = leeresWie(pBild);
        for (int zeile = 0; zeile < pBild.length; zeile++) {
            for (int spalte = 0; spalte < pBild[zeile].length; spalte++) {
                if (pBild[zeile][spalte] >= grenze) {
                    neu[zeile][spalte] = 255;
                } else {
                    neu[zeile][spalte] = 0;
                }
            }
        }
        return neu;
    }
}
