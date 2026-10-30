void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int[][] minen = { { 0, 0, 0, 0, 0 }, { 0, 0, 0, 1, 0 }, { 0, 0, 0, 0, 0 }, { 0, 1, 0, 0, 0 } };
   private boolean[][] offen = new boolean[4][5];

   public Beispiel() {
      this.zeige();
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         this.deckeAuf(0, 0);
         this.zeige();
      }
   }

   private int nachbarn(int z, int s) {
      int n = 0;
      for (int i = Math.max(0, z - 1); i <= Math.min(3, z + 1); i++) {
         for (int j = Math.max(0, s - 1); j <= Math.min(4, s + 1); j++) n += minen[i][j];
      }
      return n;
   }

   private void deckeAuf(int z, int s) {
      if (z < 0 || z >= 4 || s < 0 || s >= 5 || offen[z][s] || minen[z][s] == 1) return;
      offen[z][s] = true;
      if (this.nachbarn(z, s) == 0) {
         for (int i = z - 1; i <= z + 1; i++) {
            for (int j = s - 1; j <= s + 1; j++) this.deckeAuf(i, j);
         }
      }
   }

   private void zeige() {
      this.removeAll();
      String[] bild = new String[4];
      for (int z = 0; z < 4; z++) {
         bild[z] = "";
         for (int s = 0; s < 5; s++) {
            if (offen[z][s]) bild[z] += this.nachbarn(z, s);
            else bild[z] += "#";
         }
      }
      this.karte(bild);
   }
}
