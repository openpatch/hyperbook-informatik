void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.baueRahmen();
      this.verteileMuenzen();
      this.stelleHeldAuf();
   }

   private void baueRahmen() {
      for (int x = -180; x <= 180; x += 40) this.figur("boxCrate", x, 100, 30);
   }

   private void verteileMuenzen() {
      for (int x = -120; x <= 120; x += 60) this.figur("coin_gold", x, 0, 40);
   }

   private void stelleHeldAuf() {
      this.figur("bunny1_stand", 0, -100, 20);
   }
}
