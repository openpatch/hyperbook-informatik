void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private boolean[][] erkundet = new boolean[5][9];
   private Sprite[][] nebel = new Sprite[5][9];
   private Sprite held;
   private int z = 2;
   private int s = 4;

   public Beispiel() {
      for (int i = 0; i < 5; i++) {
         for (int j = 0; j < 9; j++) {
            nebel[i][j] = this.figur("boxCrate", -160 + j * 40, 80 - i * 40, 30);
            nebel[i][j].setTint(40, 40, 70);
         }
      }
      held = this.figur("bunny1_stand", 0, 0, 15);
      this.erkunde();
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.RIGHT) s = Math.min(8, s + 1);
      if (pTaste == KeyCode.LEFT) s = Math.max(0, s - 1);
      if (pTaste == KeyCode.DOWN) z = Math.min(4, z + 1);
      if (pTaste == KeyCode.UP) z = Math.max(0, z - 1);
      this.erkunde();
   }

   private void erkunde() {
      held.setPosition(-160 + s * 40, 80 - z * 40);
      for (int i = Math.max(0, z - 1); i <= Math.min(4, z + 1); i++) {
         for (int j = Math.max(0, s - 1); j <= Math.min(8, s + 1); j++) {
            erkundet[i][j] = true;
            nebel[i][j].hide();
         }
      }
   }
}
