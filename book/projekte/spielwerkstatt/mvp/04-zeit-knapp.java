void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private double zeit = 12;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("", 80);
   }

   public void run() {
      if (zeit > 0) zeit = Math.max(0, zeit - 1.0 / 60);
      anzeige.showText("Zeit: " + (int) zeit);
      if (zeit <= 10) anzeige.setTextColor(220, 40, 40);
      else anzeige.setTextColor(25, 35, 45);
   }
}
