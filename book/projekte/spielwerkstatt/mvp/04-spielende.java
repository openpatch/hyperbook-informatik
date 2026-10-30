void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int punkte = 0;
   private double zeit = 5;
   private boolean laeuft = true;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: Münze sammeln", 120);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && laeuft) punkte++;
   }

   public void run() {
      if (laeuft) {
         zeit = zeit - 1.0 / 60;
         if (punkte == 3) {
            laeuft = false;
            anzeige.showText("Gewonnen!");
         } else if (zeit <= 0) {
            laeuft = false;
            anzeige.showText("Verloren!");
         } else anzeige.showText("Münzen: " + punkte + "/3 | Zeit: " + (int) zeit);
      }
   }
}
