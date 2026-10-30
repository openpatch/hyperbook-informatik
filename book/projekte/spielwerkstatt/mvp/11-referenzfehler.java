void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite[][] gitter = new Sprite[1][1];
   private Text anzeige;
   private boolean aufBuehne = true;

   public Beispiel() {
      gitter[0][0] = this.figur("coin_gold", 0, 0, 60);
      anzeige = this.text("Leertaste: nur Bühne | R: auch Gitter", 140);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && aufBuehne) {
         gitter[0][0].remove();
         aufBuehne = false;
         anzeige.showText("Bühne leer, Gitter noch belegt: " + (gitter[0][0] != null));
      }
      if (pTaste == KeyCode.R) {
         if (aufBuehne) gitter[0][0].remove();
         aufBuehne = false;
         gitter[0][0] = null;
         anzeige.showText("Jetzt sind beide Verweise entfernt");
      }
   }
}
