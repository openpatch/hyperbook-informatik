void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      for (int z = 0; z < 5; z++) {
         for (int s = 0; s < 9; s++) {
            if (s != 3) this.figur("boxCrate", -160 + s * 40, 80 - z * 40, 25);
         }
      }
   }
}
