public class Weichzeichnen extends Filter {

    public int[][] anwenden(int[][] pBild) {
        int[][] neu = leeresWie(pBild);
        for (int zeile = 1; zeile < pBild.length - 1; zeile++) {
            for (int spalte = 1; spalte < pBild[zeile].length - 1; spalte++) {
                int summe = 0;
                for (int dz = -1; dz <= 1; dz++) {
                    for (int ds = -1; ds <= 1; ds++) {
                        summe = summe + pBild[zeile + dz][spalte + ds];
                    }
                }
                neu[zeile][spalte] = summe / 9;
            }
        }
        return neu;
    }
}
