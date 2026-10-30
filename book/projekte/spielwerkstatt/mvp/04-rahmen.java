void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      for (int x = -200; x <= 200; x = x + 40) {
         this.figur("boxCrate", x, 120, 30);
         this.figur("boxCrate", x, -120, 30);
      }
      for (int y = -80; y <= 80; y = y + 40) {
         this.figur("boxCrate", -200, y, 30);
         this.figur("boxCrate", 200, y, 30);
      }
   }
}
