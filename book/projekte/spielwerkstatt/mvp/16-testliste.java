void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   // Manuelle Testliste:
   // 1. Pfeil bis zum Rand: Figur bleibt sichtbar.
   // 2. T: Zwei Treffer im selben Bild kosten zusammen nur ein Leben.
   // 3. G: Letzte Münze und letztes Leben gleichzeitig -> Verloren.
   // 4. Leertaste im laufenden Spiel: kein Neustart; nach Ende: Neustart.
   private Sprite held;
   private int leben = 3;
   private int muenzen = 0;
   private boolean laeuft = true;
   private boolean trefferImBild = false;
   private Text anzeige;

   public Beispiel() {
      this.neustart();
   }

   private void neustart() {
      this.removeAll();
      leben = 3;
      muenzen = 0;
      laeuft = true;
      held = this.figur("bunny1_stand", 0, 0, 20);
      anzeige = this.text("T: Doppel-Treffer | G: Grenzfall", 150);
   }

   private void treffer() {
      if (!trefferImBild) {
         leben--;
         trefferImBild = true;
      }
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && !laeuft) this.neustart();
      else if (laeuft && pTaste == KeyCode.T) {
         this.treffer();
         this.treffer();
      } else if (laeuft && pTaste == KeyCode.G) {
         leben = 1;
         this.treffer();
         muenzen = 3;
      }
   }

   public void run() {
      if (laeuft) {
         this.steuere(held, 3);
         if (leben <= 0) {
            laeuft = false;
            anzeige.showText("Verloren");
         } else if (muenzen == 3) {
            laeuft = false;
            anzeige.showText("Gewonnen");
         } else anzeige.showText("Leben: " + leben + " | T: Doppel-Treffer | G: Grenzfall");
      }
      trefferImBild = false;
   }
}
