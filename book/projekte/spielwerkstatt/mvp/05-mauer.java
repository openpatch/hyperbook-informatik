void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.setzeMauer(-160, 80, 8);
      this.setzeMauer(-160, 40, 4, false);
   }

   private void setzeMauer(double pX, double pY, int pAnzahl) {
      this.setzeMauer(pX, pY, pAnzahl, true);
   }

   private void setzeMauer(double pX, double pY, int pAnzahl, boolean pWaagerecht) {
      for (int i = 0; i < pAnzahl; i++) {
         double x = pX;
         double y = pY;
         if (pWaagerecht) x = x + i * 40;
         else y = y - i * 40;
         this.figur("boxCrate", x, y, 30);
      }
   }
}
