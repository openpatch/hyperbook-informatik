void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int[][] faesser = { { 1, 1, 0, 0, 1 }, { 0, 1, 1, 0, 1 }, { 0, 0, 0, 0, 1 } };

   public Beispiel() {
      this.zeige();
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         this.zuende(0, 0);
         this.zeige();
      }
   }

   private void zuende(int z, int s) {
      if (z < 0 || z >= faesser.length || s < 0 || s >= faesser[z].length) return;
      if (faesser[z][s] != 1) return;
      faesser[z][s] = 2;
      this.zuende(z - 1, s);
      this.zuende(z + 1, s);
      this.zuende(z, s - 1);
      this.zuende(z, s + 1);
   }

   private void zeige() {
      this.removeAll();
      for (int z = 0; z < faesser.length; z++) {
         for (int s = 0; s < faesser[z].length; s++) {
            if (faesser[z][s] > 0) {
               Sprite f = this.figur("boxCrate", -100 + s * 50, 50 - z * 50, 30);
               if (faesser[z][s] == 2) f.setTint(255, 60, 30);
            }
         }
      }
   }
}
