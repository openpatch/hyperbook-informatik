void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] sprueche = {
      "Schöner Tag!",
      "Hinter dem Felsen liegt etwas.",
      "Heute alles ausverkauft."
   };
   private Sprite haendler;

   public Beispiel() {
      haendler = this.figur("bunny1_stand", 0, -40, 30);
      this.sprich();
   }

   private void sprich() {
      int index = (int) (Math.random() * sprueche.length);
      haendler.say(sprueche[index]);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) this.sprich();
   }
}
