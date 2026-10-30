void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<String> meldungen = new Queue<String>();
   private double restzeit = 0;
   private int nummer = 0;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: Meldung einreihen", 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         nummer++;
         meldungen.enqueue("Fund Nummer " + nummer);
      }
   }

   public void run() {
      restzeit = Math.max(0, restzeit - 1.0 / 60);
      if (restzeit == 0 && !meldungen.isEmpty()) {
         anzeige.showText(meldungen.front());
         meldungen.dequeue();
         restzeit = 2;
      }
   }
}
