void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite[] figuren = new Sprite[2];
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", -10, -50, 40);
      figuren[0] = this.figur("boxCrate", 20, 0, 60);
      figuren[1] = held;
      anzeige = this.text("", 155);
   }

   public void run() {
      this.steuere(held, 2);
      int verschiebungen = 0;
      for (int i = 1; i < figuren.length; i++) {
         Sprite aktuell = figuren[i];
         int j = i;
         while (j > 0 && figuren[j - 1].getY() < aktuell.getY()) {
            figuren[j] = figuren[j - 1];
            j--;
            verschiebungen++;
         }
         figuren[j] = aktuell;
      }
      for (int i = 0; i < figuren.length; i++) figuren[i].goToFrontLayer();
      anzeige.showText("Verschiebungen in diesem Bild: " + verschiebungen);
   }
}
