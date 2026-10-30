void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Uhr());
}

class Uhr extends Stage {
   private double zeit = 30;
   private Text anzeige = new Text("", 0, 100, 460);

   public Uhr() {
      this.add(anzeige);
   }

   public void run() {
      zeit = zeit - 1.0 / 60;
      anzeige.showText("Zeit: " + (int) zeit);
   }
}
