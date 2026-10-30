void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int punkte = 0;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: sammeln", 80);
   }

   private boolean istGewonnen() {
      return punkte >= 3;
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) punkte++;
      if (this.istGewonnen()) anzeige.showText("Gewonnen!");
      else anzeige.showText("Noch nicht: " + punkte + " Münzen");
   }
}
