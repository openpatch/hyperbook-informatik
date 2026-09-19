public class Kanten extends Filter {

    public int[][] anwenden(int[][] pBild) {
        int[][] neu = leeresWie(pBild);
        for (int zeile = 1; zeile < pBild.length; zeile++) {
            for (int spalte = 1; spalte < pBild[zeile].length; spalte++) {
                int w = pBild[zeile][spalte] - pBild[zeile][spalte - 1];
                int s = pBild[zeile][spalte] - pBild[zeile - 1][spalte];
                neu[zeile][spalte] = begrenzt((int) Math.sqrt(w * w + s * s));
            }
        }
        return neu;
    }
}
