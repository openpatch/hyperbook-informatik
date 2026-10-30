void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite[][] gitter = new Sprite[3][5];
   private Text anzeige;

   public Beispiel() {
      Sprite muenze = this.figur("coin_gold", 0, 0, 40);
      gitter[1][2] = muenze;
      anzeige = this.text("Leertaste: Was liegt in [1][2]?", 140);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         if (gitter[1][2] == null) anzeige.showText("Das Feld ist leer");
         else anzeige.showText("Münze gefunden mit einem Feldzugriff");
      }
   }
}
