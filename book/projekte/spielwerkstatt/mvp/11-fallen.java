void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite[][] fallen = new Sprite[5][9];
   private Sprite held;
   private int zeile = 2;
   private int spalte = 0;

   public Beispiel() {
      held = this.figur("bunny1_stand", -160, 0, 15);
      fallen[1][5] = this.figur("gemRed", 40, 40, 20);
      fallen[1][5].hide();
      fallen[3][7] = this.figur("gemRed", 120, -40, 20);
      fallen[3][7].hide();
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.RIGHT) spalte = Math.min(8, spalte + 1);
      if (pTaste == KeyCode.LEFT) spalte = Math.max(0, spalte - 1);
      if (pTaste == KeyCode.DOWN) zeile = Math.min(4, zeile + 1);
      if (pTaste == KeyCode.UP) zeile = Math.max(0, zeile - 1);
      held.setPosition(-160 + spalte * 40, 80 - zeile * 40);
      for (int z = zeile - 1; z <= zeile + 1; z++) {
         for (int s = spalte - 1; s <= spalte + 1; s++) {
            if (z >= 0 && z < fallen.length && s >= 0 && s < fallen[z].length) {
               if (fallen[z][s] != null) fallen[z][s].show();
            }
         }
      }
   }
}
