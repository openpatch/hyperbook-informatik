void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Sprite held;
   public double eileNoch = 0;
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
      anzeige = this.text("Leertaste: Trank trinken", 150);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         Gegenstand trank = new Eiletrank();
         trank.beruehrtVon(this);
      }
   }

   public void run() {
      eileNoch = Math.max(0, eileNoch - 1.0 / 60);
      int tempo = 2;
      if (eileNoch > 0) tempo = 6;
      this.steuere(held, tempo);
      anzeige.showText("Tempo: " + tempo);
   }
}

abstract class Gegenstand {
   public abstract void beruehrtVon(Beispiel pWelt);
}

class Eiletrank extends Gegenstand {
   public void beruehrtVon(Beispiel pWelt) {
      pWelt.eileNoch = 3;
   }
}
