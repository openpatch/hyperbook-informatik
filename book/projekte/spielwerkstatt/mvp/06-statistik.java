void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private double[] dauer = new double[3];
   private int anzahl = 0;
   private double seitLetzter = 0;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: Münze sammeln (3 Stück)", 80);
   }

   public void run() {
      seitLetzter = seitLetzter + 1.0 / 60;
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && anzahl < dauer.length) {
         dauer[anzahl] = seitLetzter;
         seitLetzter = 0;
         anzahl++;
         if (anzahl == dauer.length) {
            double summe = 0;
            double maximum = 0;
            for (int i = 0; i < dauer.length; i++) {
               summe = summe + dauer[i];
               if (dauer[i] > maximum) maximum = dauer[i];
            }
            anzeige.showText("Gesamt: " + (int) summe + " s | längste Suche: " + (int) maximum + " s");
         }
      }
   }
}
