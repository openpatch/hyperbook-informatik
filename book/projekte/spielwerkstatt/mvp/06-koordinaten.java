void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      int[] xs = { -160, -80, 0, 80, 160 };
      int[] ys = { -80, -20, 60, -20, -80 };
      for (int i = 0; i < xs.length; i++) {
         this.figur("coin_gold", xs[i], ys[i], 40);
      }
   }
}
