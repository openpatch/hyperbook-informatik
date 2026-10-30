void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int punkte;
   private boolean laeuft;
   private Text anzeige;

   public Beispiel() {
      this.neueRunde();
   }

   private void neueRunde() {
      this.removeAll();
      punkte = 0;
      laeuft = true;
      for (int i = 0; i < 3; i++) this.figur("coin_gold", -80 + i * 80, 0, 40);
      anzeige = this.text("Leertaste: sammeln", 130);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         if (!laeuft) this.neueRunde();
         else {
            punkte++;
            anzeige.showText("Münzen: " + punkte);
            if (punkte == 3) {
               laeuft = false;
               anzeige.showText("Fertig! Leertaste: neue Runde");
            }
         }
      }
   }
}
