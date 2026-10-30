void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Zaehler());
}

class Zaehler extends Stage {
   private int punkte = 0;
   private Text anzeige = new Text("Münzen: " + punkte, 0, 100, 460);

   public Zaehler() {
      this.add(anzeige);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      punkte = punkte + 1;
      anzeige.showText("Münzen: " + punkte);
   }
}
