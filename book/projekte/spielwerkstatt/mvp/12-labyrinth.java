void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private char[][] plan = new char[9][15];

   public Beispiel() {
      for (int z = 0; z < 9; z++) for (int s = 0; s < 15; s++) plan[z][s] = '#';
      this.grabe(1, 1);
      String[] bild = new String[9];
      for (int z = 0; z < 9; z++) {
         bild[z] = "";
         for (int s = 0; s < 15; s++) bild[z] += plan[z][s];
      }
      this.karte(bild);
   }

   private void grabe(int z, int s) {
      plan[z][s] = '.';
      int[] dz = { -2, 2, 0, 0 };
      int[] ds = { 0, 0, -2, 2 };
      int[] reihenfolge = { 0, 1, 2, 3 };
      for (int i = 3; i > 0; i--) {
         int j = (int) (Math.random() * (i + 1));
         int t = reihenfolge[i];
         reihenfolge[i] = reihenfolge[j];
         reihenfolge[j] = t;
      }
      for (int i = 0; i < 4; i++) {
         int r = reihenfolge[i];
         int nz = z + dz[r];
         int ns = s + ds[r];
         if (nz > 0 && nz < 8 && ns > 0 && ns < 14 && plan[nz][ns] == '#') {
            plan[z + dz[r] / 2][s + ds[r] / 2] = '.';
            this.grabe(nz, ns);
         }
      }
   }
}
