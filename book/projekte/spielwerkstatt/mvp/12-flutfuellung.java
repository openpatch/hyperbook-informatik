void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] plan = { "#########", "#...#..M#", "#...#...#", "#M..#...#", "#########" };
   private boolean[][] besucht = new boolean[5][9];

   public Beispiel() {
      this.markiere(1, 1);
      String[] bild = new String[plan.length];
      for (int z = 0; z < plan.length; z++) {
         bild[z] = "";
         for (int s = 0; s < plan[z].length(); s++) {
            if (besucht[z][s]) bild[z] += "+";
            else bild[z] += plan[z].charAt(s);
         }
      }
      this.karte(bild);
   }

   private void markiere(int z, int s) {
      if (z < 0 || z >= plan.length || s < 0 || s >= plan[z].length()) return;
      if (plan[z].charAt(s) == '#' || besucht[z][s]) return;
      besucht[z][s] = true; // Vor den rekursiven Aufrufen markieren!
      this.markiere(z - 1, s);
      this.markiere(z + 1, s);
      this.markiere(z, s - 1);
      this.markiere(z, s + 1);
   }
}
