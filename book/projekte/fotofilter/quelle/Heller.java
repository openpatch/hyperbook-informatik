public class Heller extends Filter {

    private int stufen;

    public Heller(int pStufen) {
        stufen = pStufen;
    }

    public int[][] anwenden(int[][] pBild) {
        int[][] neu = leeresWie(pBild);
        for (int zeile = 0; zeile < pBild.length; zeile++) {
            for (int spalte = 0; spalte < pBild[zeile].length; spalte++) {
                neu[zeile][spalte] = begrenzt(pBild[zeile][spalte] + stufen);
            }
        }
        return neu;
    }
}
