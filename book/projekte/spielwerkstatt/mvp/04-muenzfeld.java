void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      for (int z = 0; z < 4; z++) {
         for (int s = 0; s < 6; s++) {
            this.figur("coin_gold", -100 + s * 40, 70 - z * 40, 40);
         }
      }
   }
}
