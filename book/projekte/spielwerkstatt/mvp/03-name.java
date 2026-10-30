void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Zaehler());
}

class Zaehler extends Stage {
   private String name = "Lea";
   private int punkte = 0;
   private Text anzeige = new Text(name + " startet! Kürzel: " + name.charAt(0), 0, 100, 460);

   public Zaehler() {
      this.add(anzeige);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      punkte = punkte + 1;
      anzeige.showText(name.toUpperCase() + " hat " + punkte + " Münzen.");
   }
}
