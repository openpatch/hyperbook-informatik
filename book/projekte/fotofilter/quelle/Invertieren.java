public class Invertieren extends Filter {

    public int[][] anwenden(int[][] pBild) {
        int[][] neu = leeresWie(pBild);
        for (int zeile = 0; zeile < pBild.length; zeile++) {
            for (int spalte = 0; spalte < pBild[zeile].length; spalte++) {
                neu[zeile][spalte] = 255 - pBild[zeile][spalte];
            }
        }
        return neu;
    }
}
