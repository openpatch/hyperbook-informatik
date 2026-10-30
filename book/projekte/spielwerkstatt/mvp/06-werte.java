void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private int[] werte = { 5, 10, 50 };
   private int gesammelt = 0;
   private int punktzahl = 0;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: nächste Münze", 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && gesammelt < werte.length) {
         punktzahl = punktzahl + werte[gesammelt];
         gesammelt++;
         anzeige.showText("Münzen: " + gesammelt + " | Punkte: " + punktzahl);
      }
   }
}
