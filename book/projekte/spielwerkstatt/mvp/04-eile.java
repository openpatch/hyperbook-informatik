void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private double eileNoch = 0;
   private Sprite held;
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
      anzeige = this.text("Leertaste: Eile", 150);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) eileNoch = 3;
   }

   public void run() {
      int tempo = 2;
      if (eileNoch > 0) {
         eileNoch = eileNoch - 1.0 / 60;
         tempo = 6;
      }
      this.steuere(held, tempo);
      anzeige.showText("Tempo: " + tempo + " | Eile: " + Math.max(0, (int) eileNoch));
   }
}
