void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private boolean laeuft = true;
   private Sprite held;
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
      anzeige = this.text("G: gewinnen | V: verlieren", 150);
   }

   public void run() {
      if (laeuft) this.steuere(held, 3);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (laeuft && pTaste == KeyCode.G) this.beende("Gewonnen!");
      if (laeuft && pTaste == KeyCode.V) this.beende("Verloren!");
   }

   private void beende(String pMeldung) {
      laeuft = false;
      anzeige.showText(pMeldung);
   }
}
